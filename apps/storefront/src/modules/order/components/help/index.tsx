import { Heading } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = () => {
  return (
    <div className="mt-12 pt-8 border-t border-zinc-100">
      <Heading level="h3" className="text-lg font-semibold text-zinc-900 mb-4">
        Precisa de ajuda?
      </Heading>
      
      <div className="text-base text-zinc-600">
        <ul className="space-y-3">
          <li>
            <LocalizedClientLink 
              href="/contact" 
              className="hover:text-orange-600 transition-colors"
            >
              Fale conosco
            </LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink 
              href="/contact" 
              className="hover:text-orange-600 transition-colors"
            >
              Trocas e Devoluções
            </LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink 
              href="/suporte" 
              className="hover:text-orange-600 transition-colors"
            >
              Central de Suporte
            </LocalizedClientLink>
          </li>
        </ul>
      </div>

      <p className="text-sm text-zinc-500 mt-6">
        Estamos aqui para ajudar. Respostas rápidas em até 24h.
      </p>
    </div>
  )
}

export default Help