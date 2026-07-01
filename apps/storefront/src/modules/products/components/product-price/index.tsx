import { clx } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="h-10 w-32 bg-zinc-100 animate-pulse rounded" />
  }

  const isOnSale = selectedPrice.price_type === "sale"

  return (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-2">
        <span
          className={clx("text-3xl font-semibold text-zinc-900", {
            "text-orange-600": isOnSale,
          })}
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>

        {!variant && <span className="text-sm text-zinc-500">a partir de</span>}
      </div>

      {isOnSale && (
        <div className="flex items-center gap-3 text-sm mt-1">
          <span className="line-through text-zinc-400" data-testid="original-product-price">
            {selectedPrice.original_price}
          </span>
          <span className="text-orange-600 font-medium">
            -{selectedPrice.percentage_diff}%
          </span>
        </div>
      )}
    </div>
  )
}