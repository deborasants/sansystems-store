import { Metadata } from "next"

import ProfilePhone from "@modules/account/components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"
import { notFound } from "next/navigation"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Perfil",
  description: "Visualize e edite suas informações pessoais.",
}

export default async function Profile() {
  const customer = await retrieveCustomer()
  const regions = await listRegions()

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-zinc-900">Meu Perfil</h1>
        <p className="text-zinc-600 mt-2 text-lg">
          Gerencie suas informações pessoais, endereço de cobrança e preferências.
        </p>
      </div>

      <div className="space-y-12">
        <ProfileName customer={customer} />
        
        <Divider />
        
        <ProfileEmail customer={customer} />
        
        <Divider />
        
        <ProfilePhone customer={customer} />
        
        <Divider />
        
        <ProfileBillingAddress customer={customer} regions={regions} />
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className="w-full h-px bg-zinc-200 my-4" />
}