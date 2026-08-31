import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GeoFaq from "@/components/GeoFaq";
import SchemaMarkup from "@/components/SchemaMarkup";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Компьютерный клуб в Косино и на Салтыковской — CyberX Новокосино",
    description:
        "Киберклуб рядом с Косино-Ухтомским и Салтыковской: ул. Новокосинская, 32. Час от 150 ₽, пакеты на 3 и 5 часов, сутки, абонементы. RTX 4060–5070, PS5, автосимулятор. Круглосуточно.",
    keywords: [
        "компьютерный клуб Косино",
        "компьютерный клуб Салтыковская",
        "киберклуб Косино-Ухтомский",
        "игровой клуб Косино",
        "компьютерный клуб восток Москвы",
    ],
    alternates: { canonical: "https://cyberx-novokosino.ru/kompyuterny-klub/kosino" },
};

export const dynamic = "force-static";

const faq = [
    {
        q: "Сколько стоит час в клубе?",
        a: "Общий зал в будни утром и днём — 150 ₽ в час, вечером и ночью — 170 ₽. Пакет на 3 часа днём — 410 ₽, то есть около 137 ₽ за час. Чем длиннее пакет, тем дешевле выходит час.",
    },
    {
        q: "Есть ли что-то дешевле почасовой оплаты?",
        a: "Да, два варианта. Пакеты на 3 и 5 часов и на сутки — для длинных заездов. Абонементы на 50 и 100 часов — если играете регулярно: часы списываются постепенно и не сгорают за один визит.",
    },
    {
        q: "Далеко ли от Косино-Ухтомского?",
        a: "Косино-Ухтомский граничит с Новокосино, это соседние районы на востоке Москвы. Клуб — на улице Новокосинской, 32, рядом со станцией метро «Новокосино». Точный маршрут удобно построить по карте на странице контактов.",
    },
    {
        q: "А если ехать со стороны Салтыковской?",
        a: "Салтыковская — восточное направление за МКАД, в сторону Балашихи. Обычно приезжают на машине: Новокосинская, 32 находится в первом жилом массиве сразу за кольцевой, парковка рядом.",
    },
    {
        q: "Нужно ли что-то с собой?",
        a: "Только документ для оформления. Периферия, гарнитуры и коврики — в клубе, аккаунты можно завести на месте. Свою мышку или наушники приносить можно, многие так и делают.",
    },
];

const priceRows = [
    { zone: "Общий зал", spec: "RTX 4060 · 144 Гц", day: "150 ₽", night: "170 ₽" },
    { zone: "Bootcamp", spec: "5 мест · RTX 4060", day: "170 ₽", night: "190 ₽" },
    { zone: "VIP & DUO", spec: "RTX 4070 · 240 Гц", day: "190 ₽", night: "220 ₽" },
    { zone: "Solo Rooms", spec: "RTX 5070 · до 400 Гц", day: "230 ₽", night: "270 ₽" },
];

export default function KosinoPage() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SportsActivityLocation",
        name: "CyberX Новокосино — компьютерный клуб рядом с Косино",
        description:
            "Киберспортивный клуб на востоке Москвы рядом с Косино-Ухтомским: игровые ПК RTX 4060–5070, PS5, автосимулятор. Час от 150 ₽, работает круглосуточно.",
        address: {
            "@type": "PostalAddress",
            streetAddress: "ул. Новокосинская, 32",
            addressLocality: "Москва",
            postalCode: "111673",
            addressCountry: "RU",
        },
        areaServed: [
            { "@type": "Place", name: "Косино-Ухтомский" },
            { "@type": "Place", name: "Салтыковская" },
        ],
        telephone: "+79851289538",
        openingHours: "Mo-Su 00:00-23:59",
        url: "https://cyberx-novokosino.ru/kompyuterny-klub/kosino",
    };

    return (
        <main className="min-h-screen flex flex-col bg-[#050505] text-white">
            <SchemaMarkup schema={schema} />
            <Header />
            <div className="pt-32 px-4 md:px-10 max-w-[1400px] mx-auto w-full flex-grow">
                <section className="mb-16">
                    <p className="font-chakra font-bold text-sm uppercase tracking-[0.2em] text-[#FF2E63] mb-4">
                        Косино-Ухтомский · Салтыковская
                    </p>
                    <h1 className="font-tactic font-black text-4xl md:text-7xl uppercase mb-6">
                        Компьютерный клуб <br /> в соседнем районе
                    </h1>
                    <p className="font-inter text-base md:text-lg text-gray-400 max-w-3xl leading-relaxed">
                        Косино-Ухтомский граничит с Новокосино, а Салтыковская — сразу за
                        МКАД по тому же направлению. CyberX стоит на улице Новокосинской, 32
                        и работает круглосуточно. Ниже — сколько это стоит, без звонков
                        и уточнений.
                    </p>
                </section>

                {/* Цена вынесена вперёд: это первое, что спрашивают из соседних районов */}
                <section className="mb-20">
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase mb-8">
                        Сколько стоит час
                    </h2>
                    <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[520px]">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="font-chakra font-bold text-xs uppercase tracking-widest text-white/40 px-6 py-4">
                                            Зона
                                        </th>
                                        <th className="font-chakra font-bold text-xs uppercase tracking-widest text-white/40 px-6 py-4">
                                            Утро и день
                                        </th>
                                        <th className="font-chakra font-bold text-xs uppercase tracking-widest text-white/40 px-6 py-4">
                                            Вечер и ночь
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {priceRows.map((row) => (
                                        <tr
                                            key={row.zone}
                                            className="border-b border-white/5 last:border-b-0"
                                        >
                                            <td className="px-6 py-5">
                                                <span className="block font-chakra font-bold text-base uppercase">
                                                    {row.zone}
                                                </span>
                                                <span className="block font-inter text-xs text-gray-500">
                                                    {row.spec}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 font-tactic font-black text-lg text-[#FF2E63] tabular-nums">
                                                {row.day}
                                            </td>
                                            <td className="px-6 py-5 font-tactic font-black text-lg text-white/70 tabular-nums">
                                                {row.night}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <p className="font-inter text-sm text-gray-500 mt-4">
                        Цены за один час в будни. Пакеты на 3 и 5 часов и сутки выходят
                        дешевле в пересчёте на час.{" "}
                        <Link href="/prices" className="text-[#FF2E63] hover:underline">
                            Полный прайс
                        </Link>
                        .
                    </p>
                </section>

                <section className="mb-20">
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase mb-8">
                        Не только ПК
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
                            <h3 className="font-chakra font-bold text-xl uppercase mb-3">
                                PS5 на 4K-телевизоре
                            </h3>
                            <p className="font-inter text-sm text-gray-500 leading-relaxed mb-5">
                                FIFA 26 и UFC 5 вдвоём на большом экране. От 340 ₽ в час.
                            </p>
                            <Link
                                href="/playstation"
                                className="text-[#FF2E63] font-chakra font-bold uppercase text-sm border-b border-[#FF2E63]/30 hover:border-[#FF2E63] transition-all"
                            >
                                Про зону PS5
                            </Link>
                        </div>
                        <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
                            <h3 className="font-chakra font-bold text-xl uppercase mb-3">
                                Автосимулятор
                            </h3>
                            <p className="font-inter text-sm text-gray-500 leading-relaxed mb-5">
                                Кокпит, руль с прямым приводом, 4K-экран. От 580 ₽ в час.
                            </p>
                            <Link
                                href="/simracing"
                                className="text-[#FF2E63] font-chakra font-bold uppercase text-sm border-b border-[#FF2E63]/30 hover:border-[#FF2E63] transition-all"
                            >
                                Про симрейсинг
                            </Link>
                        </div>
                    </div>
                </section>

                <GeoFaq items={faq} title="Что спрашивают из Косино" />
            </div>
            <Footer />
        </main>
    );
}
