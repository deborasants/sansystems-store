"use client"

import { Button, Heading } from "@modules/common/components/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
      <Heading level="h2" className="text-3xl font-bold mb-8">
        Resumo do Pedido
      </Heading>

      <DiscountCode cart={cart} />
      <Divider className="my-8" />
      <CartTotals totals={cart} />

      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
        className="block mt-8"
      >
        <Button className="w-full h-14 text-base font-semibold bg-orange-600 hover:bg-orange-700 rounded-2xl">
          Finalizar Compra
        </Button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary