import { Container, Heading, Text } from "@modules/common/components/ui"

import { isStripeLike, paymentInfoMap } from "@lib/constants"
import Divider from "@modules/common/components/divider"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0]?.payments?.[0]

  return (
    <div>
      <Heading level="h2" className="text-2xl font-semibold mb-8">
        Pagamento
      </Heading>

      {payment && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Método de Pagamento */}
          <div>
            <Text className="font-semibold text-zinc-900 mb-3">Método de Pagamento</Text>
            <Text className="text-zinc-600" data-testid="payment-method">
              {paymentInfoMap[payment.provider_id]?.title || payment.provider_id}
            </Text>
          </div>

          {/* Detalhes do Pagamento */}
          <div>
            <Text className="font-semibold text-zinc-900 mb-3">Detalhes do Pagamento</Text>
            
            <div className="flex items-center gap-3">
              <Container className="flex items-center justify-center h-9 w-9 bg-zinc-100 rounded-lg">
                {paymentInfoMap[payment.provider_id]?.icon}
              </Container>

              <div className="text-sm text-zinc-600" data-testid="payment-amount">
                {isStripeLike(payment.provider_id) && payment.data?.card_last4 ? (
                  <>•••• •••• •••• {payment.data.card_last4}</>
                ) : (
                  <>
                    {convertToLocale({
                      amount: payment.amount,
                      currency_code: order.currency_code,
                    })}{" "}
                    pago em {new Date(payment.created_at ?? "").toLocaleDateString("pt-BR")}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Divider className="mt-12" />
    </div>
  )
}

export default PaymentDetails