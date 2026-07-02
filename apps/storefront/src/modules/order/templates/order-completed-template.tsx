import { Heading } from "@modules/common/components/ui"
import { cookies as nextCookies } from "next/headers"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()
  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="py-10 min-h-[calc(100vh-64px)] bg-zinc-50">
      <div className="content-container max-w-4xl mx-auto px-6">
        {isOnboarding && <OnboardingCta orderId={order.id} />}

        <div
          className="bg-white rounded-3xl shadow-sm p-8 md:p-12"
          data-testid="order-complete-container"
        >
          {/* Cabeçalho de Sucesso */}
          <div className="text-center mb-12">
            <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mb-6">
              ✓
            </div>
            <Heading level="h1" className="text-4xl font-semibold text-zinc-900">
              Obrigado pelo seu pedido!
            </Heading>
            <p className="text-xl text-zinc-600 mt-3">
              Seu pedido foi realizado com sucesso.
            </p>
          </div>

          <OrderDetails order={order} />

          <Heading level="h2" className="text-2xl font-semibold mt-12 mb-6">
            Resumo do Pedido
          </Heading>

          <Items order={order} />
          <CartTotals totals={order} />
          <ShippingDetails order={order} />
          <PaymentDetails order={order} />

          <Help />
        </div>
      </div>
    </div>
  )
}