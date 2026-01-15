import Prices from "@/components/Prices";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { Metadata } from "next";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
    title: "Цены на услуги компьютерного клуба | CyberX Новокосино | Москва",
    description: "Узнайте стоимость игрового времени и ночных пакетов в CyberX Новокосино. Тарифы от 100 руб/час. Скидки в приложении, бонусы для новых игроков. Москва, Новокосино.",
    keywords: ["цены CyberX Новокосино", "сколько стоит час в компьютерном клубе", "тарифы киберклуб Москва", "ночной пакет компьютерный клуб"],
    alternates: {
        canonical: "https://cyberx-novokosino.ru/prices",
    },
};

const priceFaq = [
    {
        question: "Сколько стоит 1 час игры в CyberX Новокосино?",
        answer: "Тарифы начинаются от 100 рублей за час в Standard зоне при покупке пакета. Обычный часовой тариф в будни — от 120 рублей. Актуальная сетка цен всегда есть в нашем приложении.",
        iconKey: "clock"
    },
    {
        question: "Есть ли разница в цене между буднями и выходными?",
        answer: "Да, в пятницу (с вечера), субботу и воскресенье действуют тарифы выходного дня. Пакетные предложения (3 часа, 5 часов) также могут незначительно отличаться по стоимости.",
        iconKey: "terminal"
    },
    {
        question: "Какие условия для ночных пакетов?",
        answer: "Ночной пакет действует с 22:00 до 08:00. Это самый выгодный способ играть долго. Стоимость ночи в Solo зоне — около 600-700 рублей в зависимости от дня недели.",
        iconKey: "zap"
    },
    {
        question: "Как получить скидку 25% через приложение?",
        answer: "При пополнении баланса через официальное приложение CYBERX вы получаете дополнительные бонусы и кэшбэк, что эффективно снижает стоимость игрового времени до 25%.",
        iconKey: "smartphone"
    },
    {
        question: "Можно ли оплатить игру бонусами?",
        answer: "Да, накопленные бонусы на вашем аккаунте можно использовать для оплаты до 100% стоимости игрового времени (при наличии достаточного количества бонусов). 1 бонус = 1 рубль.",
        iconKey: "credit-card"
    },
    {
        question: "Какие способы оплаты вы принимаете?",
        answer: "Мы принимаем наличные, банковские карты, а также оплату через СБП (QR-код). Также вы можете пополнить баланс удаленно через приложение.",
        iconKey: "plus"
    }
];

export default function PricesPage() {
    const DATA_PATH = path.join(process.cwd(), 'data', 'prices.json');
    const fileContents = fs.readFileSync(DATA_PATH, 'utf8');
    const pricingData = JSON.parse(fileContents);

    return (
        <main className="min-h-screen flex flex-col bg-[#050505] text-white">
            <Header />
            <div className="pt-32">
                <Prices initialData={pricingData} />
                <FAQ items={priceFaq} />
            </div>
            <Footer />
        </main>
    );
}
