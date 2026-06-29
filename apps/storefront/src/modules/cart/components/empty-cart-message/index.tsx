import { Heading, Text } from "@modules/common/components/ui"
import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div className="min-h-[70vh] py-20 px-4 flex flex-col justify-center items-center text-center bg-gray-50">
      <div className="max-w-md mx-auto">
        {/* Ícone grande */}
        <div className="w-28 h-28 mx-auto mb-8 bg-white rounded-3xl shadow-sm flex items-center justify-center border border-gray-100">
          <span className="text-6xl">🛒</span>
        </div>

        <Heading
          level="h1"
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Seu carrinho está vazio
        </Heading>

        <Text className="text-lg text-gray-600 mb-10 leading-relaxed">
          Você ainda não adicionou nenhum produto. 
          Vamos encontrar as melhores soluções para sua empresa?
        </Text>

        <InteractiveLink 
          href="/store"
          className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all active:scale-95 shadow-sm"
        >
          <p className="text-white">Explorar softwares</p>
        </InteractiveLink>

        <p className="text-sm text-gray-500 mt-12">
          Encontre ferramentas de CRM, ERP, PDV e muito mais.
        </p>
      </div>
    </div>
  )
}

export default EmptyCartMessage