import { Button, Container, Text } from "@modules/common/components/ui"
import { cookies as nextCookies } from "next/headers"

async function ProductOnboardingCta() {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  if (!isOnboarding) {
    return null
  }

  return (
    <Container className="max-w-4xl h-full bg-orange-50 border border-orange-100 w-full p-8 rounded-2xl">
      <div className="flex flex-col gap-y-4 items-center text-center">
        <div className="text-4xl mb-2">🎉</div>
        
        <Text className="text-2xl font-semibold text-zinc-900">
          Produto de demonstração criado com sucesso!
        </Text>
        
        <Text className="text-zinc-600 max-w-md">
          Você pode continuar configurando sua loja no painel administrativo.
        </Text>

        <a 
          href="http://localhost:7001/a/orders?onboarding_step=create_order_nextjs" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="mt-4 px-8" size="lg">
            Continuar configuração no Admin
          </Button>
        </a>
      </div>
    </Container>
  )
}

export default ProductOnboardingCta