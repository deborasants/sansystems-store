import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="py-12 bg-white">
      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Lista de Itens */}
            <div className="lg:col-span-7">
              {!customer && (
                <>
                  <SignInPrompt />
                  <Divider className="my-12" />
                </>
              )}
              <ItemsTemplate cart={cart} />
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-5">
              <div className="sticky top-8">
                {cart && cart.region && <Summary cart={cart} />}
              </div>
            </div>
          </div>
        ) : (
          <EmptyCartMessage />
        )}
      </div>
    </div>
  )
}

export default CartTemplate