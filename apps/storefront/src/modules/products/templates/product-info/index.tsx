"use client"

import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState } from "react"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false)

  const description = product.description || ""
  const isLongDescription = description.length > 280

  const displayedDescription = showFullDescription 
    ? description 
    : description.slice(0, 280) + (isLongDescription ? "..." : "")

  return (
    <div id="product-info" className="max-w-2xl">
      <div className="flex flex-col gap-y-6">
        {/* Coleção */}
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-sm uppercase tracking-widest text-orange-600 hover:text-orange-700 font-medium"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}

        {/* Título */}
        <Heading
          level="h1"
          className="text-4xl lg:text-5xl leading-tight font-semibold text-zinc-900"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        {/* Descrição com Ver Mais */}
        <div>
          <Text
            className="text-lg text-zinc-600 leading-relaxed whitespace-pre-line"
            data-testid="product-description"
          >
            {displayedDescription}
          </Text>

          {isLongDescription && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-3 text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-1 transition-colors"
            >
              {showFullDescription ? "Ver menos ↑" : "Ver mais ↓"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductInfo