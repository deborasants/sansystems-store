"use client"

import {
  deleteCustomerAddress,
  updateCustomerAddress,
} from "@lib/data/customer"
import useToggleState from "@lib/hooks/use-toggle-state"
import { PencilSquare as Edit, Trash } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import CountrySelect from "@modules/checkout/components/country-select"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import { Button, Heading, clx } from "@modules/common/components/ui"
import Spinner from "@modules/common/icons/spinner"
import React, { useActionState, useEffect, useState } from "react"

type EditAddressProps = {
  region: HttpTypes.StoreRegion
  address: HttpTypes.StoreCustomerAddress
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  isActive = false,
}) => {
  const [removing, setRemoving] = useState(false)
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(updateCustomerAddress, {
    success: false,
    error: null,
  } as { success: boolean; error: string | null })

  const close = () => {
    setSuccessState(false)
    closeModal()
  }

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  const removeAddress = async () => {
    if (!confirm("Tem certeza que deseja excluir este endereço?")) return

    setRemoving(true)
    await deleteCustomerAddress(address.id)
    setRemoving(false)
  }

  return (
    <>
      <div
        className={clx(
          "border border-zinc-200 rounded-2xl p-6 h-full w-full flex flex-col justify-between hover:shadow-sm transition-all",
          {
            "border-orange-500 bg-orange-50/50": isActive,
          }
        )}
        data-testid="address-container"
      >
        <div className="flex flex-col gap-3">
          <Heading className="text-lg font-semibold" data-testid="address-name">
            {address.first_name} {address.last_name}
          </Heading>

          {address.company && (
            <p className="text-sm text-zinc-500" data-testid="address-company">
              {address.company}
            </p>
          )}

          <div className="text-sm text-zinc-600 leading-relaxed">
            <p data-testid="address-address">
              {address.address_1}
              {address.address_2 && `, ${address.address_2}`}
            </p>
            <p data-testid="address-postal-city">
              {address.postal_code}, {address.city}
            </p>
            <p data-testid="address-province-country">
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-x-4 pt-4">
          <button
            className="flex items-center gap-x-2 text-sm text-gray-600 hover:text-orange-700 transition-colors"
            onClick={open}
            data-testid="address-edit-button"
          >
            <Edit size={18} />
            Editar
          </button>

          <button
            className="flex items-center gap-x-2 text-sm text-red-600 hover:text-red-700 transition-colors"
            onClick={removeAddress}
            data-testid="address-delete-button"
          >
            {removing ? <Spinner /> : <Trash size={18} />}
            Excluir
          </button>
        </div>
      </div>

      {/* Modal de Edição */}
      <Modal isOpen={state} close={close} data-testid="edit-address-modal">
        <Modal.Title>
          <Heading className="mb-2">Editar Endereço</Heading>
        </Modal.Title>

        <form action={formAction}>
          <input type="hidden" name="addressId" value={address.id} />

          <Modal.Body>
            <div className="grid grid-cols-1 gap-y-4">
              <div className="grid grid-cols-2 gap-x-4">
                <Input
                  label="Nome"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  defaultValue={address.first_name || undefined}
                  data-testid="first-name-input"
                />
                <Input
                  label="Sobrenome"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  defaultValue={address.last_name || undefined}
                  data-testid="last-name-input"
                />
              </div>

              <Input
                label="Empresa (opcional)"
                name="company"
                autoComplete="organization"
                defaultValue={address.company || undefined}
                data-testid="company-input"
              />

              <Input
                label="Endereço"
                name="address_1"
                required
                autoComplete="address-line1"
                defaultValue={address.address_1 || undefined}
                data-testid="address-1-input"
              />

              <Input
                label="Complemento"
                name="address_2"
                autoComplete="address-line2"
                defaultValue={address.address_2 || undefined}
                data-testid="address-2-input"
              />

              <div className="grid grid-cols-[140px_1fr] gap-x-4">
                <Input
                  label="CEP"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  defaultValue={address.postal_code || undefined}
                  data-testid="postal-code-input"
                />
                <Input
                  label="Cidade"
                  name="city"
                  required
                  autoComplete="locality"
                  defaultValue={address.city || undefined}
                  data-testid="city-input"
                />
              </div>

              <Input
                label="Estado"
                name="province"
                autoComplete="address-level1"
                defaultValue={address.province || undefined}
                data-testid="state-input"
              />

              <CountrySelect
                name="country_code"
                region={region}
                required
                autoComplete="country"
                defaultValue={address.country_code || undefined}
                data-testid="country-select"
              />

              <Input
                label="Telefone"
                name="phone"
                type="tel"
                autoComplete="phone"
                defaultValue={address.phone || undefined}
                data-testid="phone-input"
              />
            </div>

            {formState.error && (
              <div className="text-rose-500 text-sm py-3">
                {formState.error}
              </div>
            )}
          </Modal.Body>

          <Modal.Footer>
            <div className="flex gap-3 mt-4">
              <Button
                type="reset"
                variant="secondary"
                onClick={close}
                className="h-11"
                data-testid="cancel-button"
              >
                Cancelar
              </Button>
              <SubmitButton data-testid="save-button">Salvar Alterações</SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default EditAddress