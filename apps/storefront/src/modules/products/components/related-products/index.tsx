import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import Product from "../product-preview"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) return null

  const queryParams: HttpTypes.StoreProductListParams = {
    region_id: region.id,
    collection_id: product.collection_id ? [product.collection_id] : undefined,
    tag_id: product.tags?.map((t) => t.id).filter(Boolean) as string[],
    is_giftcard: false,
  }

  const { response } = await listProducts({ queryParams, countryCode })

  const relatedProducts = response.products.filter(
    (p) => p.id !== product.id
  )

  if (!relatedProducts.length) return null

  return (
    <div className="product-page-constraint py-16">
      <div className="flex flex-col items-center text-center mb-12">
        <span className="text-sm uppercase tracking-widest text-orange-600 font-medium">
          Você também pode gostar
        </span>
        <p className="text-3xl font-semibold text-zinc-900 mt-3">
          Produtos relacionados
        </p>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <li key={product.id}>
            <Product region={region} product={product} />
          </li>
        ))}
      </ul>
    </div>
  )
}