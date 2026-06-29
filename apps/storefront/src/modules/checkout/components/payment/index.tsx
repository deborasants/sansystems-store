"use client"

import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

import { initiatePaymentSession } from "@lib/data/cart"
import { isStripeLike, paymentInfoMap } from "@lib/constants"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer, { StripeCardContainer } from "@modules/checkout/components/payment-container"
import Divider from "@modules/common/components/divider"
import { Button, Heading } from "@modules/common/components/ui"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: HttpTypes.StoreCart
  availablePaymentMethods: { id: string }[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (session) => session.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const paidByGiftcard = !!(
    (cart as any)?.gift_cards?.length > 0 && cart?.total === 0
  )

  const paymentReady = (activeSession && (cart?.shipping_methods?.length ?? 0) > 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), { scroll: false })
  }

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)

    if (isStripeLike(method)) {
      await initiatePaymentSession(cart, { provider_id: method })
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const shouldInputCard = isStripeLike(selectedPaymentMethod) && !activeSession

      if (!activeSession || activeSession.provider_id !== selectedPaymentMethod) {
        await initiatePaymentSession(cart, { provider_id: selectedPaymentMethod })
      }

      if (!shouldInputCard) {
        router.push(pathname + "?" + createQueryString("step", "review"), { scroll: false })
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Heading level="h2" className="text-3xl font-bold text-gray-900">
            Pagamento
          </Heading>
          {!isOpen && paymentReady && <CheckCircleSolid className="text-green-500 w-7 h-7" />}
        </div>

        {!isOpen && paymentReady && (
          <button
            onClick={handleEdit}
            className="text-orange-600 hover:text-orange-700 font-medium"
            data-testid="edit-payment-button"
          >
            Editar
          </button>
        )}
      </div>

      {isOpen ? (
        <div className="space-y-8">
          {!paidByGiftcard && availablePaymentMethods?.length > 0 && (
            <div className="space-y-4">
              {availablePaymentMethods.map((method) => (
                <div key={method.id}>
                  {isStripeLike(method.id) ? (
                    <StripeCardContainer
                      paymentProviderId={method.id}
                      selectedPaymentOptionId={selectedPaymentMethod}
                      paymentInfoMap={paymentInfoMap}
                      setCardBrand={setCardBrand}
                      setError={setError}
                      setCardComplete={setCardComplete}
                    />
                  ) : (
                    <PaymentContainer
                      paymentInfoMap={paymentInfoMap}
                      paymentProviderId={method.id}
                      selectedPaymentOptionId={selectedPaymentMethod}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {paidByGiftcard && (
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
              <p className="font-medium text-green-800">Pagamento via Gift Card</p>
            </div>
          )}

          <ErrorMessage error={error} data-testid="payment-method-error-message" />

          <Button
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={
              (isStripeLike(selectedPaymentMethod) && !cardComplete) ||
              (!selectedPaymentMethod && !paidByGiftcard)
            }
            className="w-full h-14 text-base font-semibold bg-orange-600 hover:bg-orange-700 rounded-2xl"
            data-testid="submit-payment-button"
          >
            {isStripeLike(selectedPaymentMethod) && !activeSession
              ? "Inserir dados do cartão"
              : "Continuar para Revisão"}
          </Button>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-6">
          {paymentReady && activeSession && (
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-xl border border-gray-200">
                {paymentInfoMap[activeSession.provider_id]?.icon || <CreditCard className="w-6 h-6" />}
              </div>
              <div>
                <p className="font-medium">Método de Pagamento</p>
                <p className="text-gray-600">
                  {paymentInfoMap[activeSession.provider_id]?.title || activeSession.provider_id}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <Divider className="mt-10" />
    </div>
  )
}

export default Payment