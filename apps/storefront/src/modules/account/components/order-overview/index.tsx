"use client"

import { Button } from "@modules/common/components/ui"
import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length > 0) {
    return (
      <div className="flex flex-col gap-y-8 w-full">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border-b border-zinc-200 pb-8 last:pb-0 last:border-none"
          >
            <OrderCard order={order} />
          </div>
        ))}
      </div>
    )
  }

  // Estado sem pedidos
  return (
    <div
      className="w-full flex flex-col items-center justify-center py-16 text-center"
      data-testid="no-orders-container"
    >
      <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
        📦
      </div>
      
      <h2 className="text-2xl font-semibold text-zinc-900 mb-3">
        Nenhum pedido encontrado
      </h2>
      
      <p className="text-zinc-600 max-w-md">
        Você ainda não realizou nenhum pedido.<br />
        Que tal explorarmos nossos softwares?
      </p>

      <div className="mt-10">
        <LocalizedClientLink href="/store" passHref>
          <Button 
            size="xl"           // Aumentado
            className="px-12 py-4 text-lg font-medium" 
            data-testid="continue-shopping-button"
          >
            Explorar Softwares
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderOverview