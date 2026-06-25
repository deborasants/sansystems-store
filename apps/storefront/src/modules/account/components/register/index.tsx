"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div className="max-w-md w-full mx-auto pt-8 pb-6">
      {/* Badge */}
      <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-medium text-orange-700 mb-8">
        E-COMMERCE DE SOFTWARES
      </div>

      <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-3">
        Crie sua conta
      </h1>
      <p className="text-gray-600 text-lg mb-10">
        Cadastre-se e tenha acesso completo aos softwares Sansystems.
      </p>

      {message?.state === "verification_required" && (
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-2xl text-sm text-blue-800">
          Enviamos um link de verificação para <strong>{message.email}</strong>.<br />
          Verifique seu e-mail e depois faça login.
        </div>
      )}

      <form className="space-y-6" action={formAction}>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nome"
            name="first_name"
            required
            autoComplete="given-name"
          />
          <Input
            label="Sobrenome"
            name="last_name"
            required
            autoComplete="family-name"
          />
        </div>

        <Input
          label="E-mail"
          name="email"
          required
          type="email"
          autoComplete="email"
        />
        <Input
          label="Telefone"
          name="phone"
          type="tel"
          autoComplete="tel"
        />
        <Input
          label="Senha"
          name="password"
          required
          type="password"
          autoComplete="new-password"
        />

        <ErrorMessage
          error={message?.state === "error" ? message.error : null}
        />

        <span className="text-sm text-gray-600 block text-center">
          Ao criar uma conta, você concorda com nossos{" "}
          <LocalizedClientLink href="/content/privacy-policy" className="text-orange-600 hover:underline">
            Termos de Uso
          </LocalizedClientLink>{" "}
          e{" "}
          <LocalizedClientLink href="/content/terms-of-use" className="text-orange-600 hover:underline">
            Política de Privacidade
          </LocalizedClientLink>.
        </span>

        <SubmitButton className="w-full h-14 text-base font-semibold bg-orange-600 hover:bg-orange-700 transition-colors rounded-2xl">
          Cadastrar
        </SubmitButton>
      </form>

      <div className="mt-8 text-center">
        <span className="text-gray-600">
          Já tem uma conta?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="text-orange-600 hover:text-orange-700 font-medium underline"
          >
            Entrar
          </button>
        </span>
      </div>

      {/* Trust signals */}
      <div className="flex items-center justify-center gap-8 mt-10 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
          Compra 100% segura
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">⚡</div>
          Acesso imediato
        </div>
      </div>
    </div>
  )
}

export default Register