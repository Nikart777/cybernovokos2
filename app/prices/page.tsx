import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Prices from "@/components/Prices";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { PricingData } from "../lib/types";
import SchemaMarkup from "@/components/SchemaMarkup";
import { Zap, Smartphone } from "lucide-react";

export const metadata: Metadata = {
    title: "Цены на услуги киберклуба в Новокосино | Москва",
    description: "Актуальные цены и тарифы компьютерного клуба CyberX Новокосино. Пакеты «Утро», «День», «Вечер» и «Ночь». Работаем 24/7.",
    keywords: ["цены компьютерный клуб Новокосино", "тарифы CyberX", "стоимость игры в приставку Москва", "ночные пакеты киберклуб"],
    alternates: {
        canonical: "https://cyberx-novokosino.ru/prices",
    },
};

// ISR: Revalidate every 60 seconds for fresh pricing data while maintaining SEO-friendly HTML
export const revalidate = 60;

const faqItems = [
    {
        iconKey: 'zap',
        question: "Есть ли наценки в выходные дни?",
        answer: "В выходные и праздничные дни действует отдельный тариф. Как правило, стоимость часа на 20-30 рублей выше, чем в будни. Переключение между тарифами происходит автоматически в полночь пятницы."
    },
    {
        iconKey: 'clock',
        question: "Что такое 'Ночной пакет'?",
        answer: "Это специальный тариф с фиксированной стоимостью за 10 часов игры (с 22:00 до 08:00). Ночной пакет является самым выгодным предложением для длительных сессий. Продление игры после 08:00 возможно по дневному тарифу."
    }
];

export default async function PricesPage() {
    // Читаем данные из JSON на сервере
    const filePath = path.join(process.cwd(), "data", "prices.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    const pricingData: PricingData = JSON.parse(jsonData);

    const pricesSchema = {
        "@context": "https://schema.org",
        "@type": "PriceSheet",
        "name": "Прайс-лист CyberX Новокосино",
        "description": "Цены на игровое время, пакеты и абонементы",
        "offers": pricingData.zones.map(zone => ({
            "@type": "Offer",
            "itemOffered": {
                "@type": "Service",
                "name": zone.name,
                "description": zone.desc
            },
            "priceSpecification": zone.categories?.flatMap(cat => cat.items.map(item => ({
                "@type": "PriceSpecification",
                "name": `${cat.title} - ${item.time}`,
                "price": item.week,
                "priceCurrency": "RUB",
                "eligibleQuantity": {
                    "@type": "QuantitativeValue",
                    "value": parseInt(item.hours) || 1,
                    "unitCode": "HUR"
                }
            })))
        }))
    };

    return (
        <main className="min-h-screen flex flex-col bg-[#050505] text-white">
            <SchemaMarkup schema={pricesSchema} />
            <Header />
            <div className="pt-24 md:pt-32 px-4 md:px-10 max-w-[1400px] mx-auto w-full flex-grow">
                <section className="mb-8 md:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF2E63]/20 border border-[#FF2E63]/40 text-[#FF2E63] text-[11px] font-chakra font-bold uppercase tracking-wider mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E63] animate-pulse" />
                            Клуб CyberX Новокосино · 24/7
                        </div>
                        <h1 className="font-tactic font-black text-3xl sm:text-4xl md:text-7xl uppercase mb-3 text-[#FF2E63] leading-none">
                            Прайс-лист
                        </h1>
                        <p className="font-chakra font-bold text-sm sm:text-base md:text-lg text-white/70 max-w-2xl uppercase tracking-wide leading-relaxed">
                            Выбирай свою зону и врывайся в игру. Лучшее железо в Новокосино по доступным ценам.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <a
                            href="https://booking.langame.ru/YWo4q8XN"
                            title="Быстрое онлайн-бронирование без регистрации в приложении — нужен только email для получения кода бронирования"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-4 bg-[#FF2E63] hover:bg-[#e02655] text-white font-chakra font-black text-sm uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(255,46,99,0.5)] hover:shadow-[0_0_35px_rgba(255,46,99,0.8)] transition-all"
                        >
                            <Zap size={16} className="fill-white" />
                            <span>Быстрая онлайн-бронь (код на email)</span>
                        </a>
                        <a
                            href="/download"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-4 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 font-chakra font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
                        >
                            <Smartphone size={16} />
                            <span>В приложении (+400 бонусов)</span>
                        </a>
                    </div>
                </section>

                {/* Передаем данные в клиентский компонент */}
                <Prices data={pricingData} />

                <FAQ items={faqItems} />
            </div>
            <Footer />
        </main>
    );
}
