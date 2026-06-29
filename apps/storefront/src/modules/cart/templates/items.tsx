import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading } from "@modules/common/components/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items

  return (
    <div>
      <div className="mb-8">
        <Heading className="text-4xl font-bold text-gray-900">Seu Carrinho</Heading>
        <p className="text-gray-500 mt-2">Revise seus itens antes de finalizar a compra</p>
      </div>

      <div className="space-y-6">
        {items && items.length > 0 ? (
          items
            .sort((a, b) => (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1)
            .map((item) => (
              <Item
                key={item.id}
                item={item}
                currencyCode={cart?.currency_code}
              />
            ))
        ) : (
          repeat(3).map((i) => <SkeletonLineItem key={i} />)
        )}
      </div>
    </div>
  )
}

export default ItemsTemplate