import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <div className="flex-1 flex items-start justify-center pt-12 pb-8 p-6">
        <div className="max-w-md w-full">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-medium text-orange-700 mb-8">
            E-COMMERCE DE SOFTWARES
          </div>

          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-3">
            Bem-vindo de volta
          </h1>
          <p className="text-gray-600 text-lg mb-10">
            Acesse sua conta e continue transformando sua empresa.
          </p>

          {message?.state === "verification_required" && (
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-2xl text-sm text-blue-800">
              Enviamos um link de verificação para <strong>{message.email}</strong>.<br />
              Verifique seu e-mail e depois faça login.
            </div>
          )}

          <form className="space-y-6" action={formAction}>
            <Input
              label="E-mail"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
            <Input
              label="Senha"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />

            <ErrorMessage
              error={message?.state === "error" ? message.error : null}
            />

            <SubmitButton className="w-full h-14 text-base font-semibold bg-orange-600 hover:bg-orange-700 transition-colors rounded-2xl">
              Entrar
            </SubmitButton>
          </form>

          <div className="mt-8 text-center">
            <span className="text-gray-600">
              Ainda não tem conta?{" "}
              <button
                onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
                className="text-orange-600 hover:text-orange-700 font-medium underline"
              >
                Cadastre-se agora
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
      </div>
    </div>
  )
}

export default Login