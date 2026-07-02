import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@modules/common/components/ui"
import Divider from "@modules/common/components/divider"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div>
      <Heading level="h2" className="text-2xl font-semibold mb-8">
        Entrega
      </Heading>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Endereço de Entrega */}
        <div data-testid="shipping-address-summary">
          <Text className="font-semibold text-zinc-900 mb-3">Endereço de Entrega</Text>
          <div className="text-sm text-zinc-600 space-y-1">
            <p>
              {order.shipping_address?.first_name} {order.shipping_address?.last_name}
            </p>
            <p>{order.shipping_address?.address_1}</p>
            {order.shipping_address?.address_2 && (
              <p>{order.shipping_address.address_2}</p>
            )}
            <p>
              {order.shipping_address?.postal_code}, {order.shipping_address?.city}
            </p>
            <p className="uppercase">
              {order.shipping_address?.country_code}
            </p>
          </div>
        </div>

        {/* Contato */}
        <div data-testid="shipping-contact-summary">
          <Text className="font-semibold text-zinc-900 mb-3">Contato</Text>
          <div className="text-sm text-zinc-600 space-y-1">
            <p>{order.shipping_address?.phone}</p>
            <p>{order.email}</p>
          </div>
        </div>

        {/* Método de Envio */}
        <div data-testid="shipping-method-summary">
          <Text className="font-semibold text-zinc-900 mb-3">Método de Envio</Text>
          <div className="text-sm text-zinc-600">
            <p>
              {(order.shipping_methods?.[0] as { name?: string })?.name}
            </p>
            <p className="font-medium text-zinc-900 mt-1">
              {convertToLocale({
                amount: order.shipping_methods?.[0]?.total ?? 0,
                currency_code: order.currency_code,
              })}
            </p>
          </div>
        </div>
      </div>

      <Divider className="mt-12" />
    </div>
  )
}

export default ShippingDetails