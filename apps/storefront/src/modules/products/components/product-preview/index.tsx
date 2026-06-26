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
    if (!product?.id) return null

    const { cheapestPrice } = getProductPrice({ product })

    return (
        <LocalizedClientLink
            href={`/products/${product.handle}`}
            className="group block h-full"
        >
            <div
                data-testid="product-wrapper"
                className="
          h-full
          rounded-2xl
          overflow-hidden
          border border-gray-100
          bg-white
          shadow-sm
          hover:shadow-xl
          transition-all
          duration-300
          group-hover:-translate-y-1
          flex
          flex-col
        "
            >
                {/* IMAGEM */}
                <div className="relative">
                    <Thumbnail
                        thumbnail={product.thumbnail}
                        images={product.images}
                        size="full"
                        isFeatured={isFeatured}
                    />
                </div>

                {/* INFORMAÇÕES */}
                <div className="p-4 flex-1 flex justify-between gap-4 min-h-[110px]">
                    <div className="flex flex-col flex-1 overflow-hidden">
                        <Text
                            className="
                text-ui-fg-base
                font-medium
                leading-snug
                group-hover:text-orange-600
                transition-colors
                line-clamp-2
                min-h-[48px]
              "
                            data-testid="product-title"
                        >
                            {product.title}
                        </Text>

                        {product.subtitle && (
                            <p className="text-sm text-ui-fg-subtle mt-1 line-clamp-2 min-h-[40px]">
                                {product.subtitle}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col justify-end items-end min-w-[110px]">
                        {cheapestPrice ? (
                            <div className="text-orange-600 font-bold text-base whitespace-nowrap">
                                <PreviewPrice price={cheapestPrice} />
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