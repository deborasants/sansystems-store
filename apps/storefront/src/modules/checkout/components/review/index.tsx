"use client"

import { CheckCircleSolid } from "@medusajs/icons"
import { clx } from "@modules/common/components/ui"
import { useSearchParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import PaymentButton from "../payment-button"

const Review = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const searchParams = useSearchParams()
  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard = !!(
    (cart as any)?.gift_cards?.length > 0 && cart?.total === 0
  )

  const previousStepsCompleted =
    cart.shipping_address &&
    (cart.shipping_methods?.length ?? 0) > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-gray-900">Revisão do Pedido</h2>
          {!isOpen && previousStepsCompleted && (
            <CheckCircleSolid className="text-green-500 w-7 h-7" />
          )}
        </div>
      </div>

      {isOpen && previousStepsCompleted ? (
        <div className="space-y-8">
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 text-sm text-amber-800 leading-relaxed">
            Ao clicar em <strong>Finalizar Compra</strong>, você confirma que leu, entendeu e aceita nossos 
            <span className="underline mx-1">Termos de Uso</span>, 
            <span className="underline mx-1">Termos de Venda</span> e 
            <span className="underline mx-1">Política de Devolução</span>, 
            e que leu nossa <span className="underline mx-1">Política de Privacidade</span>.
          </div>

          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </div>
      ) : (
        <div className="text-gray-500 text-center py-8">
          Complete as etapas anteriores para revisar seu pedido.
        </div>
      )}
    </div>
  )
}

export default Review