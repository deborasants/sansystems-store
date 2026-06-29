import { Container } from "@modules/common/components/ui"

import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  return (
    <div data-testid="overview-page-wrapper">
      <div className="hidden small:block">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900">
              Olá, {customer?.first_name || "Cliente"}
            </h1>
            <p className="text-zinc-500 mt-1">
              Bem-vindo à sua conta
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-zinc-500">Conta conectada como:</p>
            <p className="font-medium text-zinc-900" data-testid="customer-email">
              {customer?.email}
            </p>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border border-zinc-200 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Perfil</h3>
            <div className="flex items-end gap-x-3">
              <span className="text-5xl font-semibold text-orange-600" data-testid="customer-profile-completion">
                {getProfileCompletion(customer)}%
              </span>
              <span className="text-zinc-500 pb-2">completo</span>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Endereços</h3>
            <div className="flex items-end gap-x-3">
              <span className="text-5xl font-semibold text-zinc-900" data-testid="addresses-count">
                {customer?.addresses?.length || 0}
              </span>
              <span className="text-zinc-500 pb-2">cadastrados</span>
            </div>
          </div>
        </div>

        {/* Pedidos Recentes */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-zinc-900">Pedidos Recentes</h3>
          </div>

          <ul className="space-y-4" data-testid="orders-wrapper">
            {orders && orders.length > 0 ? (
              orders.slice(0, 5).map((order) => (
                <li key={order.id} data-testid="order-wrapper">
                  <LocalizedClientLink
                    href={`/account/orders/details/${order.id}`}
                  >
                    <Container className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-2xl p-6 transition-all hover:shadow-sm flex justify-between items-center">
                      <div className="grid grid-cols-3 gap-x-8 flex-1 text-sm">
                        <div>
                          <p className="text-zinc-500 text-xs">DATA</p>
                          <p className="font-medium mt-1">
                            {new Date(order.created_at).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div>
                          <p className="text-zinc-500 text-xs">PEDIDO</p>
                          <p className="font-medium mt-1">#{order.display_id}</p>
                        </div>
                        <div>
                          <p className="text-zinc-500 text-xs">TOTAL</p>
                          <p className="font-medium mt-1">
                            {convertToLocale({
                              amount: order.total,
                              currency_code: order.currency_code,
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-orange-600">
                        <span className="text-sm font-medium">Ver detalhes</span>
                        <ChevronDown className="-rotate-90" size={18} />
                      </div>
                    </Container>
                  </LocalizedClientLink>
                </li>
              ))
            ) : (
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-12 text-center">
                <p className="text-zinc-500">Você ainda não possui pedidos.</p>
                <LocalizedClientLink
                  href="/store"
                  className="text-orange-600 hover:underline mt-4 inline-block"
                >
                  Começar a comprar →
                </LocalizedClientLink>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0
  if (!customer) return 0

  if (customer.email) count++
  if (customer.first_name && customer.last_name) count++
  if (customer.phone) count++

  const billingAddress = customer.addresses?.find((addr) => addr.is_default_billing)
  if (billingAddress) count++

  return Math.round((count / 4) * 100)
}

export default Overview