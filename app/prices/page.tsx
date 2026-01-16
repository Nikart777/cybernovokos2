import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Prices from "@/components/Prices";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { PricingData } from "../lib/types";

export const metadata: Metadata = {
    title: "Цены на услуги киберклуба | CyberX Новокосино | Москва",
    description: "Актуальные цены и тарифы компьютерного клуба CyberX Новокосино. Пакеты 'Утро', 'День', 'Вечер' и 'Ночь'. Скидки за бронирование в приложении. Работаем 24/7.",
    keywords: ["цены компьютерный клуб Новокосино", "тарифы CyberX", "стоимость игры в приставку Москва", "ночные пакеты киберклуб"],
    alternates: {
        canonical: "https://cyberx-novokosino.ru/prices",
    },
};

const faqItems = [
    {
        iconKey: 'credit-card',
        question: "Как работает скидка 5% в приложении?",
        answer: "При бронировании игрового места через официальное мобильное приложение CyberX, система автоматически применяет скидку 5% к базовой стоимости любого тарифа или пакета. Цены в приложении всегда указаны уже со скидкой."
    },
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

    return (
        <main className="min-h-screen flex flex-col bg-[#050505] text-white">
            <Header />
            <div className="pt-32 px-4 md:px-10 max-w-[1400px] mx-auto w-full flex-grow">
                <section className="mb-12">
                    <h1 className="font-tactic font-black text-4xl md:text-7xl uppercase mb-6 text-[#FF2E63]">
                        Прайс-лист
                    </h1>
                    <p className="font-chakra font-bold text-lg md:text-xl text-white/70 max-w-3xl mb-8 uppercase tracking-wide">
                        Выбирай свою зону и врывайся в игру. Лучшее железо в Новокосино по доступным ценам.
                    </p>
                </section>

                {/* Передаем данные в клиентский компонент */}
                <Prices data={pricingData} />

                <FAQ initialItems={faqItems} />
            </div>
            <Footer />
        </main>
    );
}
