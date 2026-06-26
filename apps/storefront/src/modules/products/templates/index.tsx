import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div className="bg-white py-8 small:py-12">
        <div
          className="content-container flex flex-col small:flex-row small:items-start gap-8 small:gap-12 relative"
          data-testid="product-container"
        >
          {/* Coluna Esquerda - Info */}
          <div className="small:sticky small:top-24 small:max-w-[300px] w-full flex-shrink-0 py-4">
            <ProductInfo product={product} />
            <div className="mt-8">
              <ProductTabs product={product} />
            </div>
          </div>

          {/* Galeria de Imagens - Centro */}
          <div className="flex-1 w-full min-w-0">
            <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
              <ImageGallery images={images} />
            </div>
          </div>

          {/* Coluna Direita - Ações de Compra */}
          <div className="small:sticky small:top-24 small:max-w-[320px] w-full flex-shrink-0 py-4">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
              <ProductOnboardingCta />
              
              <div className="mt-8">
                <Suspense
                  fallback={
                    <ProductActions
                      disabled={true}
                      product={product}
                      region={region}
                    />
                  }
                >
                  <ProductActionsWrapper id={product.id} region={region} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Produtos Relacionados */}
      <div className="content-container my-16 small:my-24">
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate