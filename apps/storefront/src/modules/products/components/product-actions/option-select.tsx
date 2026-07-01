import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  disabled,
  "data-testid": dataTestId,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm font-medium text-zinc-500">
        {title}
      </span>

      <div
        className="flex flex-wrap gap-3"
        data-testid={dataTestId}
      >
        {filteredOptions.map((value) => {
          const isSelected = value === current

          return (
            <button
              key={value}
              onClick={() => updateOption(option.id, value)}
              disabled={disabled}
              className={clx(
                "min-w-[100px] h-11 px-5 border rounded-xl text-sm font-medium transition-all",
                {
                  "border-orange-600 bg-orange-50 text-orange-700": isSelected,
                  "border-zinc-200 hover:border-zinc-400 bg-white": !isSelected,
                  "opacity-50 cursor-not-allowed": disabled,
                }
              )}
              data-testid="option-button"
            >
              {value}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect