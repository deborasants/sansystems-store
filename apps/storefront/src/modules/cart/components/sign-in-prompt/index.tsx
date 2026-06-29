import { Button } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-orange-50 border border-orange-100 rounded-3xl p-8 flex flex-col small:flex-row small:items-center justify-between gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Já tem uma conta?</h2>
        <p className="text-gray-600 mt-2">
          Faça login para ter uma experiência personalizada e acompanhar seus pedidos.
        </p>
      </div>
      <LocalizedClientLink href="/account">
        <Button className="h-12 px-8 bg-white border border-gray-300 hover:bg-white text-black-900 font-medium">
          <p className="text-gray-600">Entrar na conta</p>
        </Button>
      </LocalizedClientLink>
    </div>
  )
}

export default SignInPrompt