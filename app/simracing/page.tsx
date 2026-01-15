import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { Metadata } from "next";
import { Car, Disc, Tv, Gauge, Zap, Cpu, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Автосимуляторы и Симрейсинг в Новокосино | CyberX | Москва",
    description: "Профессиональные автосимуляторы в CyberX Новокосино. Рули с обратной связью, кокпиты, 4K мониторы. Почувствуй драйв симрейсинга в Москве (ВАО). Режим работы 24/7.",
    keywords: ["автосимулятор Новокосино", "симрейсинг Москва", "гоночные симуляторы", "где поиграть на руле Москва", "симрейсинг ВАО"],
    alternates: {
        canonical: "https://cyberx-novokosino.ru/simracing",
    },
};

export default function SimracingPage() {
    return (
        <main className="min-h-screen flex flex-col bg-[#050505] text-white">
            <Header />
            <div className="pt-32 px-4 md:px-10 max-w-[1400px] mx-auto w-full flex-grow">
                <section className="mb-20">
                    <h1 className="font-tactic font-black text-4xl md:text-7xl uppercase mb-6 text-[#FF2E63]">
                        Симрейсинг <br /> в Новокосино
                    </h1>
                    <p className="font-chakra font-bold text-lg md:text-xl text-white/70 max-w-3xl mb-12 uppercase tracking-wide">
                        Профессиональные гоночные кокпиты и рули с Direct Drive. Испытай реальный драйв в CyberX Новокосино.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        <HardwareItem icon={<Disc />} title="DD Рули" desc="Прямая обратная связь для передачи каждой детали трассы." />
                        <HardwareItem icon={<Tv />} title="4K Гейминг" desc="Высокое разрешение и мгновенный отклик для полного погружения." />
                        <HardwareItem icon={<Car />} title="Кокпит" desc="Жесткий каркас и спортивное сиденье для правильной посадки." />
                    </div>

                    <div className="bg-[#111] p-8 md:p-12 rounded-3xl border border-[#FF2E63]/30 relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="max-w-xl">
                                <h2 className="font-tactic font-bold text-3xl uppercase mb-4">Узнать больше о CyberRacing</h2>
                                <p className="font-inter text-gray-400 mb-6">
                                    Мы используем передовые технологии сети CyberX. Подробные технические характеристики, список поддерживаемых игр и глобальные турниры доступны на официальной странице направления.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/prices" className="text-[#FF2E63] font-chakra font-bold uppercase text-sm border-b border-[#FF2E63]/30 hover:border-[#FF2E63] transition-all">Смотреть цены</Link>
                                    <Link href="/contacts" className="text-white/50 font-chakra font-bold uppercase text-sm border-b border-white/10 hover:border-white transition-all">Как нас найти</Link>
                                </div>
                            </div>
                            <a
                                href="https://cyberx.moscow/cyberracing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-10 py-5 bg-[#FF2E63] text-white font-chakra font-black text-xl uppercase tracking-wider rounded-xl hover:shadow-[0_0_40px_rgba(255,46,99,0.6)] transition-all duration-300 transform -skew-x-12 group"
                            >
                                <span className="block transform skew-x-12 flex items-center gap-3">
                                    Перейти на сайт
                                    <ExternalLink size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </span>
                            </a>
                        </div>
                    </div>
                </section>

                <FAQ />
            </div>
            <Footer />
        </main>
    );
}

function HardwareItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl hover:border-[#FF2E63]/30 transition-colors">
            <div className="text-[#FF2E63] mb-4 scale-125 origin-left">{icon}</div>
            <h3 className="font-chakra font-bold text-xl uppercase mb-2">{title}</h3>
            <p className="font-inter text-sm text-gray-500 leading-relaxed">{desc}</p>
        </div>
    );
}
