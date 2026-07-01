import { Text, clx } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  if (!product?.id) return null

  const { cheapestPrice } = getProductPrice({ product })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block h-full"
    >
      <div className="h-full flex flex-col bg-white border border-zinc-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
        {/* Imagem */}
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />

        {/* Informações */}
        <div className="p-5 flex-1 flex flex-col">
          <Text
            className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors"
            data-testid="product-title"
          >
            {product.title}
          </Text>

          {product.subtitle && (
            <Text className="text-sm text-zinc-500 mt-2 line-clamp-2">
              {product.subtitle}
            </Text>
          )}

          <div className="mt-auto pt-4">
            {cheapestPrice ? (
              <div className="text-xl font-bold text-orange-600">
                <PreviewPrice price={cheapestPrice} />
              </div>
            ) : (
              <span className="text-sm text-zinc-400">Indisponível</span>
            )}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}