"use client"

import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"

import { setAddresses } from "@lib/data/cart"
import useToggleState from "@lib/hooks/use-toggle-state"
import compareAddresses from "@lib/util/compare-addresses"
import Divider from "@modules/common/components/divider"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"

import BillingAddress from "../billing_address"
import ShippingAddress from "../shipping-address"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-x-3">
          <h2 className="text-3xl font-bold text-gray-900">Endereço de Entrega</h2>
          {!isOpen && <CheckCircleSolid className="text-green-500 w-7 h-7" />}
        </div>

        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
            data-testid="edit-address-button"
          >
            Editar
          </button>
        )}
      </div>

      {isOpen ? (
        <form action={formAction} className="space-y-10">
          <ShippingAddress
            customer={customer}
            checked={sameAsBilling}
            onChange={toggleSameAsBilling}
            cart={cart}
          />

          {!sameAsBilling && (
            <div className="pt-8 border-t border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Endereço de Cobrança
              </h3>
              <BillingAddress cart={cart} />
            </div>
          )}

          <SubmitButton
            className="w-full h-14 text-base font-semibold bg-orange-600 hover:bg-orange-700 rounded-2xl mt-6"
            data-testid="submit-address-button"
          >
            Continuar para Entrega
          </SubmitButton>

          <ErrorMessage error={message} data-testid="address-error-message" />
        </form>
      ) : (
        <div className="text-sm">
          {cart?.shipping_address ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-50 rounded-2xl p-8">
              {/* Endereço de Entrega */}
              <div>
                <p className="font-medium text-gray-900 mb-3">Endereço de Entrega</p>
                <div className="text-gray-600 space-y-1">
                  <p>
                    {cart.shipping_address.first_name} {cart.shipping_address.last_name}
                  </p>
                  <p>{cart.shipping_address.address_1}</p>
                  {cart.shipping_address.address_2 && <p>{cart.shipping_address.address_2}</p>}
                  <p>
                    {cart.shipping_address.postal_code}, {cart.shipping_address.city}
                  </p>
                  <p>{cart.shipping_address.country_code?.toUpperCase()}</p>
                </div>
              </div>

              {/* Contato */}
              <div>
                <p className="font-medium text-gray-900 mb-3">Contato</p>
                <div className="text-gray-600 space-y-1">
                  <p>{cart.shipping_address.phone}</p>
                  <p>{cart.email}</p>
                </div>
              </div>

              {/* Endereço de Cobrança */}
              <div>
                <p className="font-medium text-gray-900 mb-3">Endereço de Cobrança</p>
                <div className="text-gray-600 space-y-1">
                  {sameAsBilling ? (
                    <p className="italic">Mesmo endereço de entrega</p>
                  ) : (
                    <>
                      <p>
                        {cart.billing_address?.first_name} {cart.billing_address?.last_name}
                      </p>
                      <p>{cart.billing_address?.address_1}</p>
                      {cart.billing_address?.address_2 && <p>{cart.billing_address.address_2}</p>}
                      <p>
                        {cart.billing_address?.postal_code}, {cart.billing_address?.city}
                      </p>
                      <p>{cart.billing_address?.country_code?.toUpperCase()}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600" />
            </div>
          )}
        </div>
      )}

      <Divider className="mt-10" />
    </div>
  )
}

export default Addresses