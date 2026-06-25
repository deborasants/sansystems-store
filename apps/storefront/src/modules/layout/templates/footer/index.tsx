import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";
import { Text, clx } from "@modules/common/components/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { MessageCircle, BriefcaseBusiness, Globe } from "lucide-react";

export default async function Footer() {
    const { collections } = await listCollections({
        fields: "*products",
    });
    const productCategories = await listCategories();

    return (
        <footer className="bg-zinc-950 text-white border-t border-zinc-800">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    {/* Logo + Descrição */}
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded flex items-center justify-center text-white font-bold text-3xl">
                                <img
                                    src="/sansystems-logo.png"
                                    alt="Sansystems"
                                    className="w-10 h-10"
                                />
                            </div>
                            <span className="font-semibold text-3xl tracking-tight">Sansystems</span>
                        </div>

                        <p className="text-zinc-400 max-w-md text-lg">
                            Soluções completas de software para gestão, produtividade e automação empresarial.
                        </p>

                        <div className="mt-8 flex gap-3">
                            {/* WhatsApp */}
                            <a
                                href="https://wa.me/5519998000109"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full hover:bg-zinc-800 hover:text-green-500 transition"
                                title="WhatsApp"
                            >
                                <MessageCircle size={20} strokeWidth={1.8} />
                            </a>

                            {/* Workana */}
                            <a
                                href="https://www.workana.com/freelancer/e9eebe9565c9efd2a1d57af8bb5e5549"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full hover:bg-zinc-800 hover:text-orange-500 transition"
                                title="Workana"
                            >
                                <BriefcaseBusiness size={20} strokeWidth={1.8} />
                            </a>

                            {/* Site */}
                            <a
                                href="https://www.sansystems.com.br"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full hover:bg-zinc-800 hover:text-cyan-400 transition"
                                title="Sansystems"
                            >
                                <Globe size={20} strokeWidth={1.8} />
                            </a>
                        </div>
                    </div>

                    {/* Menu - Categorias */}
                    {productCategories && productCategories.length > 0 && (
                        <div className="md:col-span-3">
                            <span className="block text-orange-500 font-medium mb-6 text-sm tracking-widest uppercase">
                                Categorias
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 text-sm">
                                {productCategories.map((category) => {
                                    const children = category.category_children || [];

                                    return (
                                        <div key={category.id}>
                                            <LocalizedClientLink
                                                href={`/categories/${category.handle}`}
                                                className="font-medium hover:text-orange-500 transition-colors block mb-3"
                                            >
                                                {category.name}
                                            </LocalizedClientLink>

                                            {children.length > 0 && (
                                                <ul className="space-y-2 text-zinc-400 text-sm">
                                                    {children.map((child) => (
                                                        <li key={child.id}>
                                                            <LocalizedClientLink
                                                                href={`/categories/${child.handle}`}
                                                                className="hover:text-white transition-colors"
                                                            >
                                                                {child.name}
                                                            </LocalizedClientLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Menu - Softwares / Outros */}
                    <div className="md:col-span-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                            {collections && collections.length > 0 && (
                                <div>
                                    <span className="block text-orange-500 font-medium mb-6 text-sm tracking-widest uppercase">
                                        Softwares em Destaque
                                    </span>
                                    <ul className="space-y-3 text-sm text-zinc-400">
                                        {collections.slice(0, 8).map((collection) => (
                                            <li key={collection.id}>
                                                <LocalizedClientLink
                                                    href={`/collections/${collection.handle}`}
                                                    className="hover:text-white transition-colors"
                                                >
                                                    {collection.title}
                                                </LocalizedClientLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
                    <Text>
                        © {new Date().getFullYear()} Sansystems. Todos os direitos reservados.
                    </Text>
                </div>
            </div>
        </footer>
    );
}