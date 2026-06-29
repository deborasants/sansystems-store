"use client"

import { createTransferRequest } from "@lib/data/orders"
import { CheckCircleMiniSolid, XCircleSolid } from "@medusajs/icons"
import { Heading, IconButton, Input, Text } from "@modules/common/components/ui"
import { useActionState } from "react"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { useEffect, useState } from "react"

export default function TransferRequestForm() {
  const [showSuccess, setShowSuccess] = useState(false)

  const [state, formAction] = useActionState(createTransferRequest, {
    success: false,
    error: null,
    order: null,
  })

  useEffect(() => {
    if (state.success && state.order) {
      setShowSuccess(true)
    }
  }, [state.success, state.order])

  return (
    <div className="w-full bg-white border border-zinc-200 rounded-2xl p-8">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Texto Explicativo */}
        <div className="flex flex-col gap-y-2">
          <Heading level="h3" className="text-lg font-semibold text-zinc-900">
            Transferência de Pedido
          </Heading>
          <Text className="text-zinc-600">
            Não encontrou o pedido que está procurando?<br />
            Conecte um pedido à sua conta.
          </Text>
        </div>

        {/* Formulário */}
        <form action={formAction} className="flex flex-col gap-y-3">
          <Input
            name="order_id"
            placeholder="ID do Pedido (ex: #12345)"
            className="w-full"
          />
          
          <SubmitButton
            variant="secondary"
            className="w-full md:w-fit whitespace-nowrap"
          >
            Solicitar Transferência
          </SubmitButton>
        </form>
      </div>

      {/* Mensagem de Erro */}
      {!state.success && state.error && (
        <Text className="text-rose-600 text-sm mt-4">
          {state.error}
        </Text>
      )}

      {/* Mensagem de Sucesso */}
      {showSuccess && (
        <div className="mt-6 flex justify-between items-center p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
          <div className="flex gap-x-3 items-start">
            <CheckCircleMiniSolid className="w-5 h-5 text-emerald-600 mt-0.5" />
            <div>
              <Text className="font-medium text-emerald-900">
                Transferência solicitada para o pedido {state.order?.id}
              </Text>
              <Text className="text-sm text-emerald-700">
                Um email foi enviado para {state.order?.email}
              </Text>
            </div>
          </div>

          <IconButton
            onClick={() => setShowSuccess(false)}
            className="text-zinc-400 hover:text-zinc-600"
          >
            <XCircleSolid className="w-5 h-5" />
          </IconButton>
        </div>
      )}
    </div>
  )
}