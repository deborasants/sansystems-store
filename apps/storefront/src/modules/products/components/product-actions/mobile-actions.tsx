"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Button, clx } from "@modules/common/components/ui"
import React, { Fragment, useMemo } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"

import { getProductPrice } from "@lib/util/get-product-price"
import OptionSelect from "./option-select"
import { HttpTypes } from "@medusajs/types"
import { isSimpleProduct } from "@lib/util/product"

type MobileActionsProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  options: Record<string, string | undefined>
  updateOptions: (title: string, value: string) => void
  inStock?: boolean
  handleAddToCart: () => void
  isAdding?: boolean
  show: boolean
  optionsDisabled: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  options,
  updateOptions,
  inStock,
  handleAddToCart,
  isAdding,
  show,
  optionsDisabled,
}) => {
  const { state, open, close } = useToggleState()

  const price = getProductPrice({
    product: product,
    variantId: variant?.id,
  })

  const selectedPrice = useMemo(() => {
    if (!price) return null
    const { variantPrice, cheapestPrice } = price
    return variantPrice || cheapestPrice || null
  }, [price])

  const isSimple = isSimpleProduct(product)

  return (
    <>
      {/* Barra fixa inferior no mobile */}
      <div
        className={clx("lg:hidden inset-x-0 bottom-0 fixed z-50 bg-white border-t border-zinc-200", {
          "pointer-events-none": !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100 translate-y-0"
        >
          <div className="p-4 flex flex-col gap-y-3" data-testid="mobile-actions">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium truncate" data-testid="mobile-title">
                {product.title}
              </span>

              {selectedPrice && (
                <span
                  className={clx("font-semibold", {
                    "text-orange-600": selectedPrice.price_type === "sale",
                  })}
                >
                  {selectedPrice.calculated_price}
                </span>
              )}
            </div>

            <div className={clx("grid grid-cols-2 gap-3", { "!grid-cols-1": isSimple })}>
              {!isSimple && (
                <Button
                  onClick={open}
                  variant="secondary"
                  className="w-full"
                  data-testid="mobile-actions-button"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>
                      {variant
                        ? Object.values(options).join(" / ")
                        : "Escolher opções"}
                    </span>
                    <ChevronDown />
                  </div>
                </Button>
              )}

              <Button
                onClick={handleAddToCart}
                disabled={!inStock || !variant}
                className="w-full"
                isLoading={isAdding}
                data-testid="mobile-cart-button"
              >
                {!variant
                  ? "Escolha uma variante"
                  : !inStock
                  ? "Fora de estoque"
                  : "Adicionar ao carrinho"}
              </Button>
            </div>
          </div>
        </Transition>
      </div>

      {/* Modal de opções no mobile */}
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-10"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-10"
              >
                <Dialog.Panel className="w-full bg-white rounded-t-3xl max-h-[85vh] overflow-hidden flex flex-col">
                  <div className="flex justify-end p-4 border-b">
                    <button
                      onClick={close}
                      className="w-10 h-10 flex items-center justify-center"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="p-6 overflow-y-auto flex-1">
                    {(product.options?.length ?? 0) > 1 && (
                      <div className="flex flex-col gap-y-8">
                        {product.options?.map((option) => (
                          <OptionSelect
                            key={option.id}
                            option={option}
                            current={options[option.id]}
                            updateOption={updateOptions}
                            title={option.title ?? ""}
                            disabled={optionsDisabled}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileActions