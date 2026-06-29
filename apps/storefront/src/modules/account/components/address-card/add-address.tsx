"use client"

import { Plus } from "@medusajs/icons"
import { Button, Heading } from "@modules/common/components/ui"
import { useActionState, useEffect, useState } from "react"

import { addCustomerAddress } from "@lib/data/customer"
import useToggleState from "@lib/hooks/use-toggle-state"
import { HttpTypes } from "@medusajs/types"
import CountrySelect from "@modules/checkout/components/country-select"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"

const AddAddress = ({
  region,
  addresses,
}: {
  region: HttpTypes.StoreRegion
  addresses: HttpTypes.StoreCustomerAddress[]
}) => {
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(addCustomerAddress, {
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

  return (
    <>
      {/* Card para adicionar novo endereço */}
      <button
        className="border border-dashed border-zinc-300 hover:border-orange-500 rounded-2xl p-8 min-h-[260px] h-full w-full flex flex-col items-center justify-center gap-4 transition-all hover:bg-orange-50 group"
        onClick={open}
        data-testid="add-address-button"
      >
        <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
          <Plus className="text-orange-600" size={28} />
        </div>
        <div>
          <span className="text-lg font-medium text-zinc-900">Adicionar novo endereço</span>
          <p className="text-sm text-zinc-500 mt-1">Clique para cadastrar</p>
        </div>
      </button>

      {/* Modal */}
      <Modal isOpen={state} close={close} data-testid="add-address-modal">
        <Modal.Title>
          <Heading className="mb-2">Adicionar Endereço</Heading>
        </Modal.Title>

        <form action={formAction}>
          <Modal.Body>
            <div className="flex flex-col gap-y-4">
              <div className="grid grid-cols-2 gap-x-4">
                <Input
                  label="Nome"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  data-testid="first-name-input"
                />
                <Input
                  label="Sobrenome"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  data-testid="last-name-input"
                />
              </div>

              <Input
                label="Empresa (opcional)"
                name="company"
                autoComplete="organization"
                data-testid="company-input"
              />

              <Input
                label="Endereço"
                name="address_1"
                required
                autoComplete="address-line1"
                data-testid="address-1-input"
              />

              <Input
                label="Complemento (apartamento, sala, etc.)"
                name="address_2"
                autoComplete="address-line2"
                data-testid="address-2-input"
              />

              <div className="grid grid-cols-[140px_1fr] gap-x-4">
                <Input
                  label="CEP"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  data-testid="postal-code-input"
                />
                <Input
                  label="Cidade"
                  name="city"
                  required
                  autoComplete="locality"
                  data-testid="city-input"
                />
              </div>

              <Input
                label="Estado"
                name="province"
                autoComplete="address-level1"
                data-testid="state-input"
              />

              <CountrySelect
                region={region}
                name="country_code"
                required
                autoComplete="country"
                data-testid="country-select"
              />

              <Input
                label="Telefone"
                name="phone"
                type="tel"
                autoComplete="phone"
                data-testid="phone-input"
              />
            </div>

            {formState.error && (
              <div className="text-rose-500 text-sm py-3" data-testid="address-error">
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
              <SubmitButton data-testid="save-button">Salvar Endereço</SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AddAddress