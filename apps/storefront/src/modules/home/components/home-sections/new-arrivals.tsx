import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import { listProductsWithSort } from "@lib/data/products"

export default async function NewArrivals({
  region,
  limit = 3,
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

  if (!products || products.length === 0) return null

  return (
    <section className="bg-gray-50 py-16 small:py-24">
      <div className="content-container">
        {/* Header no estilo da imagem */}
        <div className="text-center mb-12 small:mb-16">
          <span className="text-orange-600 text-sm font-medium tracking-widest uppercase">
            — NOSSOS DESTAQUES
          </span>
          
          <h2 className="text-4xl small:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Softwares mais vendidos
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Soluções completas para facilitar sua gestão e impulsionar resultados.
          </p>
        </div>

        {/* Grid de produtos */}
        <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-16 small:gap-y-20">
          {products.slice(0, limit).map((product: any) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}