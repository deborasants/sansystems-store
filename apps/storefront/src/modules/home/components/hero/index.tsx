'use client'; // ← Isso resolve o erro

import { Button, Heading, Text } from "@modules/common/components/ui";
import Link from "next/link";

const Hero = () => {
  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-zinc-50 to-white min-h-[85vh] flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo à esquerda */}
          <div className="space-y-8 pt-12 lg:pt-0">
            <div className="inline-flex items-center gap-2 bg-white border border-orange-200 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full">
              E-COMMERCE DE SOFTWARES
            </div>

            <div className="space-y-4">
              <Heading
                level="h1"
                className="text-6xl lg:text-7xl leading-[1.1] font-bold tracking-tighter text-zinc-900"
              >
                COMPRE SOFTWARES
                <span className="block text-orange-600">SANSYSTEMS</span>
              </Heading>

              <Heading
                level="h2"
                className="text-5xl lg:text-6xl leading-tight font-semibold text-orange-600"
              >
                E LEVE SUA EMPRESA PARA O PRÓXIMO NÍVEL.
              </Heading>
            </div>

            <Text className="text-xl text-zinc-600 max-w-md">
              Soluções completas para gestão, produtividade e automação. Escolha, compre e receba seu software online com segurança.
            </Text>

            <div className="flex flex-wrap gap-4">
              <Link href="/store">
                <Button
                  size="xl"
                  className="bg-black hover:bg-zinc-900 text-white px-10 py-4 text-lg font-medium rounded-full"
                >
                  Ver todos os softwares →
                </Button>
              </Link>

              <Link href="/store">
                <Button
                  variant="secondary"
                  size="xl"
                  className="px-8 py-4 text-lg font-medium rounded-full border-2 hover:bg-zinc-50"
                  onClick={scrollToHowItWorks}
                >
                  Destaques
                </Button>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-8 pt-6 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">🛡️</div>
                <div>
                  <div className="font-medium">Compra 100% segura</div>
                  <div className="text-zinc-500 text-xs">Seus dados protegidos</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">⚡</div>
                <div>
                  <div className="font-medium">Entrega imediata</div>
                  <div className="text-zinc-500 text-xs">Na hora após a compra</div>
                </div>
              </div>
            </div>
          </div>

          {/* Produtos em destaque */}
          <div className="relative lg:mt-12">
            <div className="relative z-10 grid grid-cols-1 gap-6">
              {/* ERP */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-xl flex items-center gap-6 hover:-translate-y-2 transition-transform">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-orange-600 text-2xl">■</div>
                    <span className="font-semibold text-xl">Sansystems</span>
                  </div>
                  <div className="text-4xl font-bold leading-none mb-2">ERP</div>
                  <p className="text-zinc-600">Gestão completa do seu negócio.</p>
                </div>
                <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center text-white text-6xl">
                  📊
                </div>
              </div>

              {/* CRM */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-xl flex items-center gap-6 hover:-translate-y-2 transition-transform -rotate-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-orange-600 text-2xl">■</div>
                    <span className="font-semibold text-xl">Sansystems</span>
                  </div>
                  <div className="text-3xl font-bold leading-none mb-2">CRM</div>
                  <p className="text-zinc-600 text-sm">Relacionamento que gera resultados.</p>
                </div>
                <div className="w-28 h-28 bg-gradient-to-br from-zinc-700 to-black rounded-2xl flex items-center justify-center text-white text-5xl">
                  👥
                </div>
              </div>

              {/* PDV */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-xl flex items-center gap-6 hover:-translate-y-2 transition-transform rotate-3 ml-auto w-5/6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-orange-600 text-2xl">■</div>
                    <span className="font-semibold text-xl">Sansystems</span>
                  </div>
                  <div className="text-3xl font-bold leading-none mb-2">PDV</div>
                  <p className="text-zinc-600 text-sm">Mais agilidade no seu ponto de venda.</p>
                </div>
                <div className="w-28 h-28 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl flex items-center justify-center text-white text-5xl">
                  🛒
                </div>
              </div>
            </div>

            <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 left-12 w-60 h-60 bg-orange-600/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;