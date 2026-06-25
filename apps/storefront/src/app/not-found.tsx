import { ArrowUpRightMini } from "@medusajs/icons"
import Link from "next/link"

export const metadata = {
  title: "Página não encontrada",
  description: "A página que você está procurando não existe.",
}

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-medium text-orange-700 mb-8 mx-auto">
          E-COMMERCE DE SOFTWARES
        </div>

        {/* 404 Number */}
        <h1 className="text-[120px] font-bold leading-none text-gray-900 mb-2 tracking-tighter">
          404
        </h1>

        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Ops! Página não encontrada
        </h2>

        <p className="text-gray-600 text-lg mb-10 max-w-xs mx-auto">
          A página que você está procurando não existe ou foi movida.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 transition-colors text-white font-semibold text-base h-14 px-10 rounded-2xl group"
        >
          Voltar para a página inicial
          <ArrowUpRightMini 
            className="group-hover:rotate-45 transition-transform duration-200" 
          />
        </Link>

        {/* Trust / Extra info */}
        <div className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
            Compra segura
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">⚡</div>
            Suporte rápido
          </div>
        </div>
      </div>
    </div>
  )
}