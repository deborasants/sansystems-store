"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Informações do Produto",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Envio e Devoluções",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple" defaultOpen={["Informações do Produto"]}>
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-base py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <div className="flex flex-col gap-y-6">
          <div>
            <span className="font-semibold block text-zinc-500 text-sm mb-1">Material</span>
            <p className="text-zinc-900">{product.material || "Não informado"}</p>
          </div>
          <div>
            <span className="font-semibold block text-zinc-500 text-sm mb-1">País de Origem</span>
            <p className="text-zinc-900">{product.origin_country || "Não informado"}</p>
          </div>
          <div>
            <span className="font-semibold block text-zinc-500 text-sm mb-1">Tipo</span>
            <p className="text-zinc-900">{product.type?.value || "Não informado"}</p>
          </div>
        </div>

        <div className="flex flex-col gap-y-6">
          <div>
            <span className="font-semibold block text-zinc-500 text-sm mb-1">Peso</span>
            <p className="text-zinc-900">{product.weight ? `${product.weight} g` : "Não informado"}</p>
          </div>
          <div>
            <span className="font-semibold block text-zinc-500 text-sm mb-1">Dimensões</span>
            <p className="text-zinc-900">
              {product.length && product.width && product.height
                ? `${product.length}cm L x ${product.width}cm W x ${product.height}cm H`
                : "Não informado"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-base py-8">
      <div className="space-y-10">
        <div className="flex gap-x-5">
          <FastDelivery className="mt-1 flex-shrink-0" />
          <div>
            <span className="font-semibold text-zinc-900">Entrega Rápida</span>
            <p className="text-zinc-600 mt-1 leading-relaxed">
              Seu pacote chega em até 3-5 dias úteis no local de retirada ou no conforto da sua casa.
            </p>
          </div>
        </div>

        <div className="flex gap-x-5">
          <Refresh className="mt-1 flex-shrink-0" />
          <div>
            <span className="font-semibold text-zinc-900">Trocas Simples</span>
            <p className="text-zinc-600 mt-1 leading-relaxed">
              O produto não serviu? Sem problemas — realizamos a troca por um novo.
            </p>
          </div>
        </div>

        <div className="flex gap-x-5">
          <Back className="mt-1 flex-shrink-0" />
          <div>
            <span className="font-semibold text-zinc-900">Devoluções Fáceis</span>
            <p className="text-zinc-600 mt-1 leading-relaxed">
              Devolva o produto e reembolsamos o valor integral. Sem complicações.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs