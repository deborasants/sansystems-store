import { Heading } from "@modules/common/components/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CheckoutSummary = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  return (
    <div className="sticky top-8">
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <Heading level="h2" className="text-3xl font-bold text-gray-900 mb-8">
          Resumo do Carrinho
        </Heading>

        {/* Totais */}
        <CartTotals totals={cart} />

        <Divider className="my-8" />

        {/* Itens do Carrinho */}
        <div className="mb-8">
          <h3 className="font-medium text-gray-900 mb-4">Itens no carrinho</h3>
          <ItemsPreviewTemplate cart={cart} />
        </div>

        <Divider className="my-8" />

        {/* Código de Desconto */}
        <DiscountCode cart={cart} />
      </div>
    </div>
  )
}

export default CheckoutSummary