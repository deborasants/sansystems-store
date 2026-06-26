import { ShieldCheck, Zap, Headphones, RefreshCw } from "lucide-react"

const TrustBar = () => {
    const benefits = [
        {
            icon: <ShieldCheck className="w-8 h-8" />,
            title: "Compra 100% segura",
            description: "Seus dados e pagamentos protegidos.",
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Entrega imediata",
            description: "Receba seu software na hora após a confirmação.",
        },
        {
            icon: <Headphones className="w-8 h-8" />,
            title: "Suporte especializado",
            description: "Nossa equipe está pronta para te ajudar.",
        },
        {
            icon: <RefreshCw className="w-8 h-8" />,
            title: "Atualizações inclusas",
            description: "Sempre a versão mais nova do seu software.",
        },
    ]

    return (
        <section className="bg-gray-50 py-12">
            <div className="content-container">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 small:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 small:gap-10">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex gap-5 group"
                            >
                                <div className="text-orange-600 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                                    {benefit.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900 mb-1.5">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TrustBar