import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  return (
    <div className="bg-white py-8 small:py-12">
      <div className="content-container">
        {/* Header da Categoria */}
        <div className="mb-12">
          <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-medium text-orange-700 mb-6">
            E-COMMERCE DE SOFTWARES
          </div>

          {/* Breadcrumb */}
          {parents.length > 0 && (
            <div className="flex items-center text-sm text-gray-500 mb-4">
              {parents.map((parent, index) => (
                <span key={parent.id}>
                  <LocalizedClientLink
                    href={`/categories/${parent.handle}`}
                    className="hover:text-orange-600 transition-colors"
                  >
                    {parent.name}
                  </LocalizedClientLink>
                  <span className="mx-2">/</span>
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl small:text-5xl font-bold text-gray-900 mb-4">
            {category.name}
          </h1>

          {category.description && (
            <p className="text-gray-600 text-lg max-w-3xl">
              {category.description}
            </p>
          )}
        </div>

        <div className="flex flex-col small:flex-row small:items-start gap-8 small:gap-10">
          {/* Filtros Laterais */}
          <div className="small:w-64 flex-shrink-0">
            <RefinementList sortBy={sort} data-testid="sort-by-container" />
          </div>

          {/* Área de Produtos */}
          <div className="flex-1">
            {category.category_children && category.category_children.length > 0 && (
              <div className="mb-10">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                  Subcategorias
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {category.category_children.map((c) => (
                    <li key={c.id}>
                      <InteractiveLink
                        href={`/categories/${c.handle}`}
                        className="inline-block bg-gray-100 hover:bg-orange-50 hover:text-orange-700 transition-colors px-5 py-2.5 rounded-2xl text-sm font-medium"
                      >
                        {c.name}
                      </InteractiveLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Suspense
              fallback={
                <SkeletonProductGrid
                  numberOfProducts={category.products?.length ?? 8}
                />
              }
            >
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                categoryId={category.id}
                countryCode={countryCode}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}