import { Text } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // 🔒 proteção contra produto inválido (EVITA seu erro)
  if (!product?.id) return null

  const { cheapestPrice } = getProductPrice({ product })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block">
      <div
        data-testid="product-wrapper"
        className="
          rounded-2xl overflow-hidden
          border border-gray-100
          bg-white
          shadow-sm
          hover:shadow-xl
          transition-all duration-300
          group-hover:-translate-y-1
        "
      >
        {/* THUMBNAIL */}
        <div className="relative">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
        </div>

        {/* INFO */}
        <div className="p-4 flex items-start justify-between gap-4">
          
          {/* TITLE */}
          <div className="flex-1">
            <Text
              className="
                text-ui-fg-base
                font-medium
                leading-snug
                group-hover:text-orange-600
                transition-colors
              "
              data-testid="product-title"
            >
              {product.title}
            </Text>

            {/* opcional: subtitle / metadata futura */}
            {product.subtitle && (
              <p className="text-sm text-ui-fg-subtle mt-1 line-clamp-2">
                {product.subtitle}
              </p>
            )}
          </div>

          {/* PRICE */}
          <div className="flex items-center justify-end min-w-[90px]">
            {cheapestPrice ? (
              <div className="flex flex-col items-end">
                <div className="text-orange-600 font-bold text-base">
                  <PreviewPrice price={cheapestPrice} />
                </div>
              </div>
            ) : (
              <span className="text-sm text-gray-400">
                Indisponível
              </span>
            )}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}