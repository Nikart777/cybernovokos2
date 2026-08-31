import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GeoFaq from "@/components/GeoFaq";
import SchemaMarkup from "@/components/SchemaMarkup";
import { Metadata } from "next";
import Link from "next/link";
import { Train, Clock, Wallet, Monitor, Gamepad2, Car } from "lucide-react";

export const metadata: Metadata = {
    title: "Компьютерный клуб в Реутове — CyberX на Новокосинской",
    description:
        "Киберклуб рядом с Реутовом: RTX 4060–5070, 240 Гц, PS5 и автосимулятор. Круглосуточно, ул. Новокосинская, 32 — у метро «Новокосино», ближайшей станции к городу. Игровой час от 150 ₽.",
    keywords: [
        "компьютерный клуб Реутов",
        "киберклуб Реутов",
        "компьютерный клуб рядом с Реутовом",
        "поиграть в Реутове",
        "игровой клуб Реутов",
    ],
    alternates: { canonical: "https://cyberx-novokosino.ru/kompyuterny-klub/reutov" },
};

export const dynamic = "force-static";

const faq = [
    {
        q: "Есть ли компьютерный клуб в самом Реутове?",
        a: "CyberX находится в Москве, на улице Новокосинской, 32 — в районе Новокосино, который граничит с Реутовом. Это ближайший к городу клуб такого уровня: станция метро «Новокосино» — ближайшая станция московского метро к Реутову.",
    },
    {
        q: "Сколько стоит час игры?",
        a: "Общий зал — от 150 ₽ в час в утренние и дневные часы буднего дня. VIP и DUO — от 190 ₽, Solo Rooms с RTX 5070 — от 230 ₽. Зона TV и PS5 — от 340 ₽, автосимулятор — от 580 ₽. Актуальные тарифы всегда на странице цен.",
    },
    {
        q: "До скольки работает клуб?",
        a: "Клуб работает круглосуточно, без выходных. Приехать из Реутова можно в любое время, в том числе ночью — ночные тарифы и пакеты на 5 часов и сутки рассчитаны именно на такие визиты.",
    },
    {
        q: "Нужно ли бронировать место заранее?",
        a: "В будни днём места обычно свободны. На вечер пятницы и выходные, а также на буткемп-зону и автосимулятор место лучше забронировать заранее — по телефону +7 (985) 128-95-38 или через форму на сайте.",
    },
    {
        q: "Можно ли приехать компанией?",
        a: "Да. Для компаний есть зона Bootcamp на 5 мест — её берут целиком под командную игру или турнир. Для двоих подойдёт DUO, для консольных игр вдвоём — зона TV с PS5, FIFA 26 и UFC 5.",
    },
];

export default function ReutovPage() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SportsActivityLocation",
        name: "CyberX Новокосино — компьютерный клуб рядом с Реутовом",
        description:
            "Киберспортивный клуб в шаговой доступности от Реутова: игровые ПК с RTX 4060–5070, PS5, автосимулятор. Работает круглосуточно.",
        address: {
            "@type": "PostalAddress",
            streetAddress: "ул. Новокосинская, 32",
            addressLocality: "Москва",
            postalCode: "111673",
            addressCountry: "RU",
        },
        areaServed: [
            { "@type": "City", name: "Реутов" },
            { "@type": "Place", name: "Новокосино" },
        ],
        telephone: "+79851289538",
        openingHours: "Mo-Su 00:00-23:59",
        url: "https://cyberx-novokosino.ru/kompyuterny-klub/reutov",
    };

    return (
        <main className="min-h-screen flex flex-col bg-[#050505] text-white">
            <SchemaMarkup schema={schema} />
            <Header />
            <div className="pt-32 px-4 md:px-10 max-w-[1400px] mx-auto w-full flex-grow">
                <section className="mb-20">
                    <p className="font-chakra font-bold text-sm uppercase tracking-[0.2em] text-[#FF2E63] mb-4">
                        Реутов · Новокосино
                    </p>
                    <h1 className="font-tactic font-black text-4xl md:text-7xl uppercase mb-6">
                        Компьютерный клуб <br /> рядом с Реутовом
                    </h1>
                    <p className="font-chakra font-bold text-lg md:text-xl text-white/70 max-w-3xl mb-6 uppercase tracking-wide">
                        Улица Новокосинская, 32. Круглосуточно. Игровой час от 150 ₽.
                    </p>
                    <p className="font-inter text-base text-gray-400 max-w-3xl leading-relaxed">
                        Реутов граничит с московским районом Новокосино, а станция «Новокосино» —
                        ближайшая к городу станция московского метро. Клуб стоит в пяти минутах
                        от неё, поэтому для жителей Реутова это ближайший киберклуб, где есть
                        и топовое железо, и консоли, и автосимулятор в одном зале.
                    </p>
                </section>

                <section className="mb-20">
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase mb-8">
                        Зачем ехать из Реутова
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Reason
                            icon={<Train />}
                            title="Ближайшее метро"
                            desc="«Новокосино» — ближайшая станция московского метро к Реутову. От неё до клуба несколько минут пешком."
                        />
                        <Reason
                            icon={<Clock />}
                            title="Круглосуточно"
                            desc="Клуб не закрывается. Можно приехать после смены, ночью или остаться до утра по пакету «Сутки»."
                        />
                        <Reason
                            icon={<Wallet />}
                            title="От 150 ₽ в час"
                            desc="Утренний и дневной тариф общего зала в будни. Есть абонементы на 50 и 100 часов."
                        />
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase mb-8">
                        Как добраться
                    </h2>
                    <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 md:p-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-chakra font-bold text-xl uppercase mb-3 text-[#FF2E63]">
                                    На метро
                                </h3>
                                <p className="font-inter text-gray-400 leading-relaxed">
                                    Станция «Новокосино» Калининской линии — конечная и ближайшая
                                    к Реутову. Дальше пешком до улицы Новокосинской, 32.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-chakra font-bold text-xl uppercase mb-3 text-[#FF2E63]">
                                    На машине
                                </h3>
                                <p className="font-inter text-gray-400 leading-relaxed">
                                    Из Реутова — через Носовихинское шоссе в сторону Новокосино.
                                    Точный маршрут и парковку удобно посмотреть на карте на
                                    странице контактов.
                                </p>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="/contacts"
                                className="text-[#FF2E63] font-chakra font-bold uppercase text-sm border-b border-[#FF2E63]/30 hover:border-[#FF2E63] transition-all"
                            >
                                Карта и контакты
                            </Link>
                            <a
                                href="tel:+79851289538"
                                className="text-white/50 font-chakra font-bold uppercase text-sm border-b border-white/10 hover:border-white transition-all"
                            >
                                +7 (985) 128-95-38
                            </a>
                        </div>
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase mb-8">
                        Что внутри
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Reason
                            icon={<Monitor />}
                            title="ПК-зоны"
                            desc="Общий зал на RTX 4060 и 144 Гц, VIP и DUO на RTX 4070 и 240 Гц, Solo Rooms на RTX 5070."
                        />
                        <Reason
                            icon={<Gamepad2 />}
                            title="PS5 и 4K"
                            desc="Зона TV с PlayStation 5, FIFA 26 и UFC 5 на большом 4K-экране."
                        />
                        <Reason
                            icon={<Car />}
                            title="Автосимулятор"
                            desc="Кокпит с рулём Direct Drive и 4K-экраном — редкость для района."
                        />
                    </div>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href="/prices"
                            className="text-[#FF2E63] font-chakra font-bold uppercase text-sm border-b border-[#FF2E63]/30 hover:border-[#FF2E63] transition-all"
                        >
                            Все тарифы
                        </Link>
                        <Link
                            href="/playstation"
                            className="text-white/50 font-chakra font-bold uppercase text-sm border-b border-white/10 hover:border-white transition-all"
                        >
                            Про PS5
                        </Link>
                        <Link
                            href="/simracing"
                            className="text-white/50 font-chakra font-bold uppercase text-sm border-b border-white/10 hover:border-white transition-all"
                        >
                            Про автосимулятор
                        </Link>
                    </div>
                </section>

                <GeoFaq items={faq} title="Вопросы жителей Реутова" />
            </div>
            <Footer />
        </main>
    );
}

function Reason({
    icon,
    title,
    desc,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
}) {
    return (
        <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl hover:border-[#FF2E63]/30 transition-colors">
            <div className="text-[#FF2E63] mb-4 scale-125 origin-left">{icon}</div>
            <h3 className="font-chakra font-bold text-xl uppercase mb-2">{title}</h3>
            <p className="font-inter text-sm text-gray-500 leading-relaxed">{desc}</p>
        </div>
    );
}
