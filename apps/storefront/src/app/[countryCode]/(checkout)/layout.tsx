import LocalizedClientLink from "@modules/common/components/localized-client-link";
import ChevronDown from "@modules/common/icons/chevron-down";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full bg-white relative min-h-screen">
      {/* Header Simplificado */}
      <div className="h-16 bg-white border-b border-ui-border-base">
        <nav className="max-w-7xl mx-auto px-6 h-full flex items-center">
          {/* Voltar - Esquerda */}
          <LocalizedClientLink
            href="/cart"
            className="text-sm font-medium text-ui-fg-subtle hover:text-ui-fg-base flex items-center gap-x-2 transition-colors flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="hidden small:block">Voltar para o carrinho</span>
            <span className="block small:hidden">Voltar</span>
          </LocalizedClientLink>

          {/* Logo - Centro */}
          <div className="flex justify-center flex-1 basis-0">
            <LocalizedClientLink href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded flex items-center justify-center text-white font-bold text-2xl overflow-hidden">
                <img
                  src="/sansystems-logo.png"
                  alt="Sansystems"
                  className="w-9 h-9 object-contain"
                />
              </div>
              <span className="font-semibold text-2xl tracking-tight text-black">
                Sansystems
              </span>
            </LocalizedClientLink>
          </div>

          {/* Espaço vazio à direita para balancear */}
          <div className="flex-1 basis-0" />
        </nav>
      </div>

      {/* Conteúdo do Checkout */}
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
    </div>
  );
}