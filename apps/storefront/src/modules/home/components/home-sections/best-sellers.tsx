import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import SectionHeader from "./section-header"
import { listProducts } from "@lib/data/products"

export default async function BestSellers({
  region,
  limit = 6,
}: {
  region: HttpTypes.StoreRegion
  limit?: number
}) {
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit,
      fields: "*variants.calculated_price",
    } as any,
  })

  if (!products) return null

  return (
    <section className="content-container py-12 small:py-24">
      <SectionHeader
        title="Mais vendidos"
        href="/collections"
        viewAllLabel="Ver todos"
        subtitle="Os queridinhos dos clientes"
      />

      <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-24 small:gap-y-36">
        {products.slice(0, limit).map((product: any) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </section>
  )
}
