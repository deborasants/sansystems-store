import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import SectionHeader from "./section-header"
import { listProductsWithSort } from "@lib/data/products"

export default async function NewArrivals({
  region,
  limit = 6,
}: {
  region: HttpTypes.StoreRegion
  limit?: number
}) {
  const {
    response: { products },
  } = await listProductsWithSort({
    page: 1,
    sortBy: "created_at",
    countryCode: region.countries?.[0]?.iso_2 || "us",
    queryParams: {
      limit,
      fields: "*variants.calculated_price",
    } as any,
  })

  if (!products) return null

  return (
    <section className="content-container py-12 small:py-24">
      <SectionHeader
        title="Novidades"
        href="/collections"
        viewAllLabel="Explore tudo"
        subtitle="Produtos recém-chegados"
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
