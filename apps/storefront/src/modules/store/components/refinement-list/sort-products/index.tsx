"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = [
  {
    value: "created_at",
    label: "Mais recentes",
  },
  {
    value: "price_asc",
    label: "Menor preço",
  },
  {
    value: "price_desc",
    label: "Maior preço",
  },
]

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const handleChange = (value: string) => {
    setQueryParams("sortBy", value as SortOptions)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-4">
        Ordenar por
      </h3>

      <FilterRadioGroup
        title="Ordenar por"
        items={sortOptions}
        value={sortBy}
        handleChange={handleChange}
        data-testid={dataTestId}
      />
    </div>
  )
}

export default SortProducts