import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="bg-white py-8 small:py-12">
      <div className="content-container">
        {/* Header da Página */}
        <div className="mb-12 text-center small:text-left">
          <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-medium text-orange-700 mb-6">
            E-COMMERCE DE SOFTWARES
          </div>

          <h1 className="text-4xl small:text-5xl font-bold text-gray-900 mb-4">
            Todos os Softwares
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto small:mx-0">
            Encontre a solução ideal para sua empresa. Explore nossos softwares 
            de gestão, CRM, PDV e muito mais.
          </p>
        </div>

        <div className="flex flex-col small:flex-row small:items-start gap-8 small:gap-10">
          {/* Filtros Laterais */}
          <div className="small:w-64 flex-shrink-0">
            <RefinementList sortBy={sort} />
          </div>

          {/* Área de Produtos */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <p className="text-sm text-gray-500">
                Mostrando todos os softwares disponíveis
              </p>
              {/* Sort já vem dentro do RefinementList, mas podemos melhorar depois */}
            </div>

            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                countryCode={countryCode}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate