import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"

import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Endereços",
  description: "Gerencie seus endereços de entrega",
}

export default async function Addresses(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-zinc-900">Meus Endereços</h1>
        <p className="text-zinc-600 mt-3 text-[17px]">
          Gerencie seus endereços de entrega. Você pode cadastrar quantos quiser. 
          Eles ficarão disponíveis durante o checkout.
        </p>
      </div>

      <AddressBook customer={customer} region={region} />
    </div>
  )
}