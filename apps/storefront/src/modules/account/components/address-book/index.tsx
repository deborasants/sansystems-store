import React from "react"

import AddAddress from "../address-card/add-address"
import EditAddress from "../address-card/edit-address-modal"
import { HttpTypes } from "@medusajs/types"

type AddressBookProps = {
  customer: HttpTypes.StoreCustomer
  region: HttpTypes.StoreRegion
}

const AddressBook: React.FC<AddressBookProps> = ({ customer, region }) => {
  const { addresses } = customer

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-zinc-900">
          Endereços Cadastrados
        </h2>
        <span className="text-sm text-zinc-500">
          {addresses.length} endereço{addresses.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card para Adicionar Novo Endereço */}
        <AddAddress region={region} addresses={addresses} />

        {/* Lista de Endereços Existentes */}
        {addresses.map((address) => (
          <EditAddress 
            key={address.id} 
            region={region} 
            address={address} 
          />
        ))}

        {/* Mensagem quando não há endereços */}
        {addresses.length === 0 && (
          <div className="col-span-1 lg:col-span-2 bg-zinc-50 border border-dashed border-zinc-300 rounded-2xl p-12 text-center">
            <p className="text-zinc-500">Você ainda não possui endereços cadastrados.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddressBook