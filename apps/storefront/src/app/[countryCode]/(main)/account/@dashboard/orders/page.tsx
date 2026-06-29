import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"
import Divider from "@modules/common/components/divider"
import TransferRequestForm from "@modules/account/components/transfer-request-form"

export const metadata: Metadata = {
  title: "Meus Pedidos",
  description: "Histórico dos seus pedidos",
}

export default async function Orders() {
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-zinc-900">Meus Pedidos</h1>
        <p className="text-zinc-600 mt-3 text-lg">
          Acompanhe o status dos seus pedidos anteriores. Aqui você também pode solicitar trocas ou devoluções.
        </p>
      </div>

      <div>
        <OrderOverview orders={orders} />
        
        <Divider className="my-12" />
        
        <TransferRequestForm />
      </div>
    </div>
  )
}