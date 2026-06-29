import { convertToLocale } from "@lib/util/money"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    currency_code: string
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    tax_total,
    item_subtotal,
    shipping_subtotal,
    discount_subtotal,
  } = totals

  return (
    <div className="space-y-4 text-sm">
      <div className="flex justify-between text-gray-600">
        <span>Subtotal</span>
        <span data-testid="cart-subtotal">
          {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
        </span>
      </div>

      <div className="flex justify-between text-gray-600">
        <span>Frete</span>
        <span data-testid="cart-shipping">
          {convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}
        </span>
      </div>

      {!!discount_subtotal && (
        <div className="flex justify-between text-emerald-600">
          <span>Desconto</span>
          <span data-testid="cart-discount">
            - {convertToLocale({ amount: discount_subtotal ?? 0, currency_code })}
          </span>
        </div>
      )}

      <div className="flex justify-between text-gray-600">
        <span>Impostos</span>
        <span data-testid="cart-taxes">
          {convertToLocale({ amount: tax_total ?? 0, currency_code })}
        </span>
      </div>

      <div className="h-px bg-gray-200 my-4" />

      <div className="flex justify-between text-lg font-semibold text-gray-900">
        <span>Total</span>
        <span data-testid="cart-total" className="font-bold">
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
    </div>
  )
}

export default CartTotals