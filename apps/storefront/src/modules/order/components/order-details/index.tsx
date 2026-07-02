import { HttpTypes } from "@medusajs/types"
import { Text } from "@modules/common/components/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus = true }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")
    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div className="space-y-4 text-zinc-600">
      <Text>
        Enviamos os detalhes da confirmação do pedido para{" "}
        <span className="font-semibold text-zinc-900" data-testid="order-email">
          {order.email}
        </span>
        .
      </Text>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-zinc-500">Data do pedido:</span>{" "}
          <span data-testid="order-date" className="font-medium text-zinc-900">
            {new Date(order.created_at).toLocaleDateString("pt-BR")}
          </span>
        </div>

        <div>
          <span className="text-zinc-500">Número do pedido:</span>{" "}
          <span data-testid="order-id" className="font-semibold text-orange-600">
            #{order.display_id}
          </span>
        </div>
      </div>

      {showStatus && (
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm mt-6 pt-6 border-t border-zinc-100">
          <div>
            <span className="text-zinc-500">Status do pedido: </span>
            <span className="font-medium text-zinc-900" data-testid="order-status">
              {formatStatus(order.fulfillment_status)}
            </span>
          </div>

          <div>
            <span className="text-zinc-500">Status do pagamento: </span>
            <span className="font-medium text-zinc-900" data-testid="order-payment-status">
              {formatStatus(order.payment_status)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderDetails