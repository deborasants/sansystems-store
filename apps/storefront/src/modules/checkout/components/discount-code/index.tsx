"use client"

import { Badge } from "@modules/common/components/ui"
import React from "react"

import { applyPromotions } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import Trash from "@modules/common/icons/trash"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")

  const { promotions = [] } = cart

  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter((p) => p.code !== code)
    await applyPromotions(validPromotions.filter((p) => p.code).map((p) => p.code!))
  }

  const addPromotionCode = async (formData: FormData) => {
    setErrorMessage("")
    const code = formData.get("code")?.toString().trim()
    if (!code) return

    const input = document.getElementById("promotion-input") as HTMLInputElement
    const currentCodes = promotions.filter((p) => p.code).map((p) => p.code!)

    try {
      await applyPromotions([...currentCodes, code])
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : String(e))
    }

    if (input) input.value = ""
  }

  return (
    <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6">
      <div className="font-medium mb-4 text-gray-900">Código de desconto</div>

      <form action={addPromotionCode} className="space-y-4">
        <div className="flex gap-3">
          <input
            id="promotion-input"
            name="code"
            type="text"
            placeholder="Digite o código"
            className="flex-1 bg-white border border-gray-200 rounded-2xl px-5 py-3 focus:outline-none focus:border-orange-500 text-sm"
            data-testid="discount-input"
          />
          <SubmitButton
            variant="secondary"
            className="px-8 font-medium rounded-2xl"
            data-testid="discount-apply-button"
          >
            Aplicar
          </SubmitButton>
        </div>

        <ErrorMessage error={errorMessage} data-testid="discount-error-message" />
      </form>

      {/* Códigos aplicados */}
      {promotions.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-3">Códigos aplicados:</p>
          <div className="space-y-3">
            {promotions.map((promotion) => (
              <div
                key={promotion.id}
                className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Badge color={promotion.is_automatic ? "green" : "orange"}>
                    {promotion.code}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {promotion.application_method?.value !== undefined &&
                      (promotion.application_method.type === "percentage"
                        ? `${promotion.application_method.value}%`
                        : convertToLocale({
                            amount: +promotion.application_method.value,
                            currency_code: promotion.application_method.currency_code!,
                          }))}
                  </span>
                </div>

                {!promotion.is_automatic && (
                  <button
                    onClick={() => promotion.code && removePromotionCode(promotion.code)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DiscountCode