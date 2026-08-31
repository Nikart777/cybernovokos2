import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GeoFaq from "@/components/GeoFaq";
import SchemaMarkup from "@/components/SchemaMarkup";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Компьютерный клуб для Выхино и Жулебино — CyberX Новокосино",
    description:
        "Куда поехать поиграть из Выхино и Жулебино: CyberX на Новокосинской, 32. RTX 5070, 400 Гц, Solo Rooms, PS5, автосимулятор, буткемп на 5 мест. Круглосуточно, абонементы на 50 и 100 часов.",
    keywords: [
        "компьютерный клуб Выхино",
        "компьютерный клуб Жулебино",
        "киберклуб Выхино",
        "игровой клуб Жулебино",
        "компьютерный клуб ЮВАО",
    ],
    alternates: {
        canonical: "https://cyberx-novokosino.ru/kompyuterny-klub/vyhino-zhulebino",
    },
};

export const dynamic = "force-static";

const faq = [
    {
        q: "Как доехать из Выхино или Жулебино?",
        a: "Выхино и Жулебино — Таганско-Краснопресненская линия, а «Новокосино» — Калининская, так что на метро понадобится пересадка. Многие приезжают на машине или наземным транспортом: по прямой расстояние небольшое, это соседние части востока и юго-востока Москвы. Маршрут удобно построить по карте на странице контактов.",
    },
    {
        q: "Зачем ехать, если рядом есть клубы?",
        a: "За железом и форматом. Solo Rooms на RTX 5070 с матрицей до 400 Гц, отдельная зона PS5 с 4K-экраном и полноценный автосимулятор с кокпитом и рулём Direct Drive — набор, который редко встречается в одном зале.",
    },
    {
        q: "Можно ли приехать всей командой?",
        a: "Да, для этого есть Bootcamp — изолированная зона на 5 мест. Её берут целиком под тренировки, турниры или просто вечер вместе. На эту зону лучше бронировать заранее.",
    },
    {
        q: "Есть ли смысл в абонементе, если ехать далеко?",
        a: "Как раз да. Абонементы на 50 и 100 часов снижают стоимость часа, а часы не сгорают за один визит. При редких, но долгих заездах это выгоднее почасовой оплаты.",
    },
    {
        q: "До скольки работает клуб?",
        a: "Круглосуточно, каждый день. Есть пакеты на 3 и 5 часов и тариф на сутки — удобно, если приехали надолго и не хотите смотреть на часы.",
    },
];

export default function VyhinoZhulebinoPage() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SportsActivityLocation",
        name: "CyberX Новокосино — компьютерный клуб для Выхино и Жулебино",
        description:
            "Киберспортивный клуб на востоке Москвы: Solo Rooms на RTX 5070, буткемп на 5 мест, PS5, автосимулятор. Работает круглосуточно.",
        address: {
            "@type": "PostalAddress",
            streetAddress: "ул. Новокосинская, 32",
            addressLocality: "Москва",
            postalCode: "111673",
            addressCountry: "RU",
        },
        areaServed: [
            { "@type": "Place", name: "Выхино" },
            { "@type": "Place", name: "Жулебино" },
        ],
        telephone: "+79851289538",
        openingHours: "Mo-Su 00:00-23:59",
        url: "https://cyberx-novokosino.ru/kompyuterny-klub/vyhino-zhulebino",
    };

    return (
        <main className="min-h-screen flex flex-col bg-[#050505] text-white">
            <SchemaMarkup schema={schema} />
            <Header />
            <div className="pt-32 px-4 md:px-10 max-w-[1400px] mx-auto w-full flex-grow">
                <section className="mb-20">
                    <p className="font-chakra font-bold text-sm uppercase tracking-[0.2em] text-[#FF2E63] mb-4">
                        Выхино · Жулебино
                    </p>
                    <h1 className="font-tactic font-black text-4xl md:text-7xl uppercase mb-6">
                        Клуб, ради которого <br /> едут через район
                    </h1>
                    <p className="font-inter text-base md:text-lg text-gray-400 max-w-3xl leading-relaxed">
                        Скажем честно: Выхино и Жулебино — другая ветка метро, за пять минут
                        не доберётесь. Поэтому эта страница не про «ближайший клуб», а про то,
                        ради чего к нам едут с юго-востока: железо и форматы, которых рядом
                        обычно нет.
                    </p>
                </section>

                <section className="mb-20">
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase mb-8">
                        Ради чего ехать
                    </h2>
                    <div className="flex flex-col gap-4">
                        <Feature
                            num="01"
                            title="Solo Rooms на RTX 5070"
                            desc="Отдельные кабины, версия Pro — матрица до 400 Гц. Это уже не «игровой ПК», а конфигурация под соревновательные шутеры, где частота кадров решает."
                            price="от 230 ₽ / час"
                        />
                        <Feature
                            num="02"
                            title="Bootcamp на 5 мест"
                            desc="Изолированная зона, которую берут целиком: команда, турнир или просто вечер впятером без чужих людей за спиной."
                            price="от 170 ₽ / час"
                        />
                        <Feature
                            num="03"
                            title="Автосимулятор с кокпитом"
                            desc="Руль с прямым приводом, жёсткий каркас, 4K-экран. Формат, который сложно найти в шаговой доступности где бы то ни было."
                            price="от 580 ₽ / час"
                        />
                        <Feature
                            num="04"
                            title="PS5 на большом экране"
                            desc="FIFA 26 и UFC 5 на 4K-телевизоре. Вдвоём на диване — то, чего не даёт ни один домашний монитор."
                            price="от 340 ₽ / час"
                        />
                    </div>
                </section>

                <section className="mb-20">
                    <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 md:p-10">
                        <h2 className="font-tactic font-black text-2xl md:text-4xl uppercase mb-5">
                            Дорога и как её окупить
                        </h2>
                        <p className="font-inter text-gray-400 leading-relaxed max-w-3xl mb-6">
                            Раз дорога занимает время, логично приезжать не на час. Пакеты на
                            3 и 5 часов и тариф на сутки дешевле почасовой оплаты, а абонементы
                            на 50 и 100 часов снижают цену часа и не сгорают за один визит.
                            Клуб работает круглосуточно, так что подстраиваться под режим
                            не нужно — только под метро на обратную дорогу.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/prices"
                                className="text-[#FF2E63] font-chakra font-bold uppercase text-sm border-b border-[#FF2E63]/30 hover:border-[#FF2E63] transition-all"
                            >
                                Тарифы и абонементы
                            </Link>
                            <Link
                                href="/contacts"
                                className="text-white/50 font-chakra font-bold uppercase text-sm border-b border-white/10 hover:border-white transition-all"
                            >
                                Построить маршрут
                            </Link>
                        </div>
                    </div>
                </section>

                <GeoFaq items={faq} title="Вопросы с юго-востока" />
            </div>
            <Footer />
        </main>
    );
}

function Feature({
    num,
    title,
    desc,
    price,
}: {
    num: string;
    title: string;
    desc: string;
    price: string;
}) {
    return (
        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:border-[#FF2E63]/30 transition-colors">
            <span className="font-tactic font-black text-4xl text-white/10 shrink-0 leading-none">
                {num}
            </span>
            <div className="flex-grow">
                <h3 className="font-chakra font-bold text-xl uppercase mb-2">{title}</h3>
                <p className="font-inter text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
            <span className="font-tactic font-black text-lg text-[#FF2E63] whitespace-nowrap md:self-center">
                {price}
            </span>
        </div>
    );
}
