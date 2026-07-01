"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

// Ícones
import { ShoppingCart } from "lucide-react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(undefined)
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems)

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) clearTimeout(activeTimer)
    open()
  }

  useEffect(() => {
    return () => {
      if (activeTimer) clearTimeout(activeTimer)
    }
  }, [activeTimer])

  const pathname = usePathname()

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    itemRef.current = totalItems
  }, [totalItems, pathname])

  return (
    <div className="h-full z-50" onMouseEnter={openAndCancel} onMouseLeave={close}>
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <LocalizedClientLink
            href="/cart"
            className="p-2 rounded-full hover:bg-zinc-100 transition relative flex items-center justify-center hover:text-ui-fg-base"
            data-testid="nav-cart-link"
          >
            <ShoppingCart size={20} strokeWidth={1.8} />

            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-zinc-900 text-white text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </LocalizedClientLink>
        </PopoverButton>

        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border border-zinc-200 w-[440px] shadow-xl rounded-b-2xl overflow-hidden"
            data-testid="nav-cart-dropdown"
          >
            <div className="p-5 border-b">
              <h3 className="font-semibold text-lg">Seu Carrinho</h3>
            </div>

            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-auto max-h-[380px] p-5 grid grid-cols-1 gap-y-8 no-scrollbar">
                  {cartState.items
                    .sort((a, b) => (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1)
                    .map((item) => (
                      <div
                        className="grid grid-cols-[110px_1fr] gap-x-4"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink href={`/products/${item.product_handle}`}>
                          <Thumbnail
                            thumbnail={item.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                          />
                        </LocalizedClientLink>

                        <div className="flex flex-col justify-between">
                          <div>
                            <LocalizedClientLink
                              href={`/products/${item.product_handle}`}
                              className="font-medium line-clamp-2"
                            >
                              {item.title}
                            </LocalizedClientLink>
                            <LineItemOptions variant={item.variant} />
                            <p className="text-sm text-zinc-500 mt-1">
                              Quantidade: {item.quantity}
                            </p>
                          </div>

                          <div className="flex justify-between items-end mt-3">
                            <LineItemPrice
                              item={item}
                              style="tight"
                              currencyCode={cartState.currency_code}
                            />
                            <DeleteButton id={item.id} className="text-red-600 text-sm">
                              Remover
                            </DeleteButton>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="p-5 border-t bg-zinc-50">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-semibold" data-testid="cart-subtotal">
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>

                  <LocalizedClientLink href="/cart">
                    <Button className="w-full" size="large">
                      Ir para o Carrinho
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-5xl mb-4">🛒</div>
                <p className="font-medium text-lg">Seu carrinho está vazio</p>
                <p className="text-zinc-500 mt-2">Que tal adicionar alguns softwares?</p>

                <LocalizedClientLink href="/store" className="mt-6">
                  <Button onClick={close} variant="secondary">
                    Explorar Softwares
                  </Button>
                </LocalizedClientLink>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown