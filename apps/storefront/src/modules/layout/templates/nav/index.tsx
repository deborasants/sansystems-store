import { Suspense } from "react";
import { listLocales } from "@lib/data/locales";
import { getLocale } from "@lib/data/locale-actions";
import { listRegions } from "@lib/data/regions";
import { StoreRegion } from "@medusajs/types";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CartButton from "@modules/layout/components/cart-button";
import SideMenu from "@modules/layout/components/side-menu";
import logo from "next/image";
import { Search, User, ShoppingBag } from "lucide-react";

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions(),
    listLocales(),
    getLocale(),
  ]);

  return (
    <div className="sticky top-0 inset-x-0 z-50 bg-white border-b border-ui-border-base">
      <header className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded flex items-center justify-center text-white font-bold text-2xl">
              <img
                src="/sansystems-logo.png"
                alt="Sansystems"
                className="w-9 h-9"
              />
            </div>
            <span className="font-semibold text-2xl tracking-tight text-black">
              Sansystems
            </span>
          </div>
          {/* Direita - Ícones e Botão */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="p-2 rounded-full hover:bg-zinc-100 transition">
              <Search size={20} strokeWidth={1.8} />
            </button>

            {/* User */}
            <LocalizedClientLink
              href="/account"
              className="p-2 rounded-full hover:bg-zinc-100 transition"
            >
              <User size={20} strokeWidth={1.8} />
            </LocalizedClientLink>

            {/* Cart */}
            <Suspense
              fallback={
                <div className="p-2 rounded-full hover:bg-zinc-100 transition relative">
                  <ShoppingBag size={20} strokeWidth={1.8} />
                </div>
              }
            >
              <CartButton />
            </Suspense>

            {/* Entrar / Cadastrar (mantido igual) */}
            <LocalizedClientLink
              href="/account"
              className="bg-black hover:bg-zinc-900 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors hidden md:block"
            >
              Entrar / Cadastrar
            </LocalizedClientLink>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
