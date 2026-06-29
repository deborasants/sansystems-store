"use client"

import React, { useEffect, useActionState } from "react";

import Input from "@modules/common/components/input"
import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfileEmail: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)

  // TODO: Atualização de email ainda não suportada pela Medusa
  const updateCustomerEmail = () => {
    return { success: false, error: "A alteração de email ainda não está disponível." }
  }

  const [state, formAction] = useActionState(updateCustomerEmail, {
    error: null as string | null,
    success: false,
  })

  const clearState = () => setSuccessState(false)

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={formAction} className="w-full">
      <AccountInfo
        label="Email"
        currentInfo={customer.email}
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error || undefined}
        clearState={clearState}
        data-testid="account-email-editor"
      >
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={customer.email}
          disabled
          data-testid="email-input"
        />
      </AccountInfo>
    </form>
  )
}

export default ProfileEmail