import Contacts from "@/components/Contacts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Контакты и адрес клуба | CyberX Новокосино | Москва",
    description: "Наш адрес: г. Москва, ул. Новокосинская, 32. ТЦ 'Новокосино', 2 этаж. Работаем круглосуточно 24/7. 5 минут от метро Новокосино. Телефон: +7 985 128 95 38.",
    keywords: ["адрес CyberX Новокосино", "компьютерный клуб метро Новокосино", "как пройти в CyberX", "телефон киберклуб Новокосино"],
    alternates: {
        canonical: "https://cyberx-novokosino.ru/contacts",
    },
};

export default function ContactsPage() {
    return (
        <main className="min-h-screen flex flex-col bg-[#050505] text-white">
            <Header />
            <div className="pt-32 pb-20 overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-4 md:px-10 mb-12">
                    <h1 className="font-tactic font-black text-4xl md:text-7xl uppercase mb-4 text-[#FF2E63]">
                        Бункер: Новокосино
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="h-[2px] w-20 bg-[#FF2E63]" />
                        <p className="font-chakra font-bold text-sm text-gray-500 uppercase tracking-widest">
                            г. Москва, ул. Новокосинская, 32
                        </p>
                    </div>
                </div>

                {/* Основной компонент контактов (содержит карту и инфо) */}
                <Contacts />

                {/* Дополнительный блок "Как нас найти" специально для SEO и удобства */}
                <section className="max-w-[1400px] mx-auto px-4 md:px-10 mt-12 pb-20">
                    <div className="bg-[#111] border border-white/5 p-8 md:p-12 rounded-[2rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF2E63]/5 blur-[100px] group-hover:bg-[#FF2E63]/10 transition-colors" />

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="md:col-span-2">
                                <h2 className="font-tactic font-bold text-3xl uppercase mb-6 flex items-center gap-4">
                                    <span className="text-[#FF2E63]">01.</span> Как нас найти?
                                </h2>
                                <div className="font-inter text-gray-400 text-lg leading-relaxed mb-6">
                                    Мы находимся в <span className="text-white font-bold">ТЦ &quot;Новокосино&quot;</span> на 2 этаже.
                                    Заходите через центральный вход, поднимайтесь по лестнице на 2 этаж.
                                    Наш клуб расположен рядом с магазином электроники DNS.
                                    <div className="mt-4">
                                        <Link href="/prices" className="text-[#FF2E63] font-chakra font-bold uppercase text-xs border-b border-[#FF2E63]/30 hover:border-[#FF2E63] transition-all">
                                            Посмотреть прайс-лист →
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 text-[10px] font-chakra font-bold uppercase text-[#FF2E63] tracking-widest">2 этаж // Новокосинская 32</div>
                                    <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 text-[10px] font-chakra font-bold uppercase text-[#00F0FF] tracking-widest">5 мин от метро</div>
                                    <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 text-[10px] font-chakra font-bold uppercase text-white tracking-widest">24/7 Режим работы</div>
                                </div>
                            </div>

                            <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col justify-center text-center">
                                <h3 className="font-chakra font-bold text-white uppercase mb-2">Ориентир</h3>
                                <p className="text-xs text-gray-500 mb-6 font-inter leading-relaxed">Вход в CYBERX рядом с магазином DNS. Работаем на всей площади этажа.</p>
                                <a
                                    href="https://yandex.ru/maps/-/CLhuNRiq"
                                    target="_blank"
                                    className="py-4 bg-[#FF2E63] rounded-xl font-chakra font-black text-sm uppercase tracking-wider hover:shadow-[0_0_20px_rgba(255,46,99,0.5)] transition-all active:scale-95"
                                >
                                    Открыть карту
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
