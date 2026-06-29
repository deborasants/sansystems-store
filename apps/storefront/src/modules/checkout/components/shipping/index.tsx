"use client"

import { CheckCircleSolid, Loader } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { setShippingMethod } from "@lib/data/cart"
import { calculatePriceForShippingOption } from "@lib/data/fulfillment"
import { convertToLocale } from "@lib/util/money"
import ErrorMessage from "@modules/checkout/components/error-message"
import Divider from "@modules/common/components/divider"
import MedusaRadio from "@modules/common/components/radio"
import { Button, Heading } from "@modules/common/components/ui"

const PICKUP_OPTION_ON = "__PICKUP_ON"
const PICKUP_OPTION_OFF = "__PICKUP_OFF"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

function formatAddress(address: HttpTypes.StoreCartAddress) {
  if (!address) return ""
  let ret = address.address_1 || ""
  if (address.address_2) ret += `, ${address.address_2}`
  if (address.postal_code) ret += `, ${address.postal_code} ${address.city || ""}`
  if (address.country_code) ret += `, ${address.country_code.toUpperCase()}`
  return ret.trim()
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)
  const [showPickupOptions, setShowPickupOptions] = useState<string>(PICKUP_OPTION_OFF)
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<Record<string, number>>({})
  const [error, setError] = useState<string | null>(null)
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const _shippingMethods = availableShippingMethods?.filter(
    (sm) => (sm as any).service_zone?.fulfillment_set?.type !== "pickup"
  )

  const _pickupMethods = availableShippingMethods?.filter(
    (sm) => (sm as any).service_zone?.fulfillment_set?.type === "pickup"
  )

  const hasPickupOptions = !!_pickupMethods?.length

  // Calcula preços dinâmicos
  useEffect(() => {
    if (!_shippingMethods?.length) return

    setIsLoadingPrices(true)

    const promises = _shippingMethods
      .filter((sm) => sm.price_type === "calculated")
      .map((sm) => calculatePriceForShippingOption(sm.id, cart.id))

    if (promises.length) {
      Promise.allSettled(promises).then((res) => {
        const pricesMap: Record<string, number> = {}
        res.forEach((r) => {
          if (r.status === "fulfilled" && r.value?.id) {
            pricesMap[r.value.id] = r.value.amount ?? 0
          }
        })
        setCalculatedPricesMap(pricesMap)
        setIsLoadingPrices(false)
      })
    } else {
      setIsLoadingPrices(false)
    }
  }, [availableShippingMethods])

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSetShippingMethod = async (id: string, variant: "shipping" | "pickup") => {
    setError(null)
    if (variant === "pickup") setShowPickupOptions(PICKUP_OPTION_ON)
    else setShowPickupOptions(PICKUP_OPTION_OFF)

    let previousId = shippingMethodId
    setIsLoading(true)
    setShippingMethodId(id)

    try {
      await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
    } catch (err: any) {
      setShippingMethodId(previousId)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleContinue = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Heading level="h2" className="text-3xl font-bold text-gray-900">
            Método de Entrega
          </Heading>
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
            <CheckCircleSolid className="text-green-500 w-7 h-7" />
          )}
        </div>

        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="text-orange-600 hover:text-orange-700 font-medium"
            data-testid="edit-delivery-button"
          >
            Editar
          </button>
        )}
      </div>

      {isOpen ? (
        <div className="space-y-10">
          {/* Opções de Entrega */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Escolha o método de entrega</h3>

            <div className="space-y-3">
              {_shippingMethods?.map((option) => {
                const price =
                  option.price_type === "flat"
                    ? option.amount
                    : calculatedPricesMap[option.id]

                const isDisabled = option.price_type === "calculated" && typeof price !== "number"

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSetShippingMethod(option.id, "shipping")}
                    disabled={isDisabled}
                    className={`w-full flex items-center justify-between p-5 border rounded-2xl transition-all hover:border-orange-300 ${shippingMethodId === option.id ? "border-orange-600 bg-orange-50" : "border-gray-200"}`}
                  >
                    <div className="flex items-center gap-4">
                      <MedusaRadio checked={shippingMethodId === option.id} />
                      <span className="text-base font-medium">{option.name}</span>
                    </div>
                    <span className="font-semibold">
                      {isDisabled ? (
                        <Loader className="w-5 h-5 animate-spin" />
                      ) : (
                        convertToLocale({ amount: price ?? 0, currency_code: cart.currency_code })
                      )}
                    </span>
                  </button>
                )
              })}

              {/* Pickup Options */}
              {hasPickupOptions && (
                <button
                  onClick={() => {
                    const pickupId = _pickupMethods?.[0]?.id
                    if (pickupId) handleSetShippingMethod(pickupId, "pickup")
                  }}
                  className={`w-full flex items-center justify-between p-5 border rounded-2xl transition-all hover:border-orange-300 ${showPickupOptions === PICKUP_OPTION_ON ? "border-orange-600 bg-orange-50" : "border-gray-200"}`}
                >
                  <div className="flex items-center gap-4">
                    <MedusaRadio checked={showPickupOptions === PICKUP_OPTION_ON} />
                    <span className="text-base font-medium">Retirada na loja</span>
                  </div>
                  <span className="font-semibold text-green-600">Grátis</span>
                </button>
              )}
            </div>
          </div>

          <ErrorMessage error={error} data-testid="delivery-option-error-message" />

          <Button
            onClick={handleContinue}
            disabled={!cart.shipping_methods?.[0]}
            className="w-full h-14 text-base font-semibold bg-orange-600 hover:bg-orange-700 rounded-2xl"
            isLoading={isLoading}
            data-testid="submit-delivery-option-button"
          >
            Continuar para Pagamento
          </Button>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-6">
          {cart.shipping_methods?.[0] && (
            <div>
              <p className="font-medium text-gray-900 mb-2">Método escolhido</p>
              <p className="text-gray-600">
                {cart.shipping_methods.at(-1)!.name} —{" "}
                {convertToLocale({
                  amount: cart.shipping_methods.at(-1)!.amount!,
                  currency_code: cart.currency_code,
                })}
              </p>
            </div>
          )}
        </div>
      )}

      <Divider className="mt-10" />
    </div>
  )
}

export default Shipping