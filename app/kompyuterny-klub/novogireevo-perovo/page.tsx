import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GeoFaq from "@/components/GeoFaq";
import SchemaMarkup from "@/components/SchemaMarkup";
import { Metadata } from "next";
import Link from "next/link";
import { Moon, Sunrise } from "lucide-react";

export const metadata: Metadata = {
    title: "Компьютерный клуб в Новогиреево и Перово — CyberX, без пересадок",
    description:
        "Киберклуб от Новогиреево и Перово — по прямой на Калининской линии, без пересадок. RTX 4060–5070, 240 Гц, PS5, автосимулятор. Круглосуточно, час от 150 ₽.",
    keywords: [
        "компьютерный клуб Новогиреево",
        "компьютерный клуб Перово",
        "киберклуб Новогиреево",
        "игровой клуб Перово",
        "компьютерный клуб ВАО",
    ],
    alternates: {
        canonical: "https://cyberx-novokosino.ru/kompyuterny-klub/novogireevo-perovo",
    },
};

export const dynamic = "force-static";

const faq = [
    {
        q: "Как добраться до клуба из Новогиреево?",
        a: "«Новогиреево» и «Новокосино» — соседние станции Калининской линии. Ехать одну остановку в сторону конечной, без пересадок, дальше несколько минут пешком до улицы Новокосинской, 32.",
    },
    {
        q: "А из Перово?",
        a: "От «Перово» до «Новокосино» — две остановки по прямой, тоже без пересадок. Это одна из причин, почему к нам едут из Перово: своей ветки менять не нужно.",
    },
    {
        q: "Работает ли клуб ночью?",
        a: "Да, круглосуточно и без выходных. Есть вечерне-ночной тариф и пакеты на 3, 5 часов и целые сутки. Метро ночью не ходит, поэтому ночные гости обычно берут пакет подольше и уезжают утром.",
    },
    {
        q: "Что выгоднее, если приезжать регулярно?",
        a: "Абонементы на 50 и 100 часов: часы списываются по мере игры и выходят заметно дешевле разовой оплаты. Подходит, если заезжаете раз в неделю и чаще.",
    },
    {
        q: "Какое железо в клубе?",
        a: "Общий зал — RTX 4060 и мониторы 144 Гц. VIP и DUO — RTX 4070 и 240 Гц. Solo Rooms — RTX 5070, версия Pro с матрицей 400 Гц. Плюс зона PS5 и отдельный автосимулятор с кокпитом.",
    },
];

export default function NovogireevoPerovoPage() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SportsActivityLocation",
        name: "CyberX Новокосино — компьютерный клуб для Новогиреево и Перово",
        description:
            "Киберспортивный клуб в ВАО Москвы: игровые ПК RTX 4060–5070, PS5, автосимулятор. От Новогиреево и Перово — по прямой без пересадок. Работает круглосуточно.",
        address: {
            "@type": "PostalAddress",
            streetAddress: "ул. Новокосинская, 32",
            addressLocality: "Москва",
            postalCode: "111673",
            addressCountry: "RU",
        },
        areaServed: [
            { "@type": "Place", name: "Новогиреево" },
            { "@type": "Place", name: "Перово" },
        ],
        telephone: "+79851289538",
        openingHours: "Mo-Su 00:00-23:59",
        url: "https://cyberx-novokosino.ru/kompyuterny-klub/novogireevo-perovo",
    };

    return (
        <main className="min-h-screen flex flex-col bg-[#050505] text-white">
            <SchemaMarkup schema={schema} />
            <Header />
            <div className="pt-32 px-4 md:px-10 max-w-[1400px] mx-auto w-full flex-grow">
                <section className="mb-16">
                    <p className="font-chakra font-bold text-sm uppercase tracking-[0.2em] text-[#FF2E63] mb-4">
                        Новогиреево · Перово · Калининская линия
                    </p>
                    <h1 className="font-tactic font-black text-4xl md:text-7xl uppercase mb-6">
                        Компьютерный клуб <br /> без пересадок
                    </h1>
                    <p className="font-inter text-base md:text-lg text-gray-400 max-w-3xl leading-relaxed">
                        От Новогиреево и Перово до клуба не нужно менять ветку: «Новокосино» —
                        конечная станция той же Калининской линии. Клуб — на улице
                        Новокосинской, 32, в нескольких минутах от выхода из метро.
                        Работает круглосуточно.
                    </p>
                </section>

                {/* Схема линии — главный аргумент страницы, поэтому идёт сразу под заголовком */}
                <section className="mb-20">
                    <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 md:p-12">
                        <h2 className="font-tactic font-black text-2xl md:text-4xl uppercase mb-10">
                            Сколько ехать
                        </h2>
                        <ol className="flex flex-col md:flex-row md:items-center gap-6 md:gap-0">
                            <Stop name="Перово" note="2 остановки" />
                            <Connector />
                            <Stop name="Новогиреево" note="1 остановка" />
                            <Connector />
                            <Stop name="Новокосино" note="клуб рядом" active />
                        </ol>
                        <p className="font-inter text-sm text-gray-500 leading-relaxed mt-10 max-w-2xl">
                            Все три станции — на одной линии, пересадки не нужны.
                            «Новокосино» конечная, так что в сторону клуба вагоны обычно
                            свободнее, чем в центр.
                        </p>
                    </div>
                </section>

                <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-[#111] border border-[#FF2E63]/30 rounded-3xl p-8 md:p-10">
                        <div className="text-[#FF2E63] mb-5 scale-125 origin-left">
                            <Sunrise />
                        </div>
                        <h2 className="font-tactic font-black text-2xl md:text-3xl uppercase mb-4">
                            Днём дешевле
                        </h2>
                        <p className="font-inter text-gray-400 leading-relaxed mb-6">
                            Утренний и дневной тариф в будни — самый выгодный: общий зал от
                            150 ₽ в час, пакет на 3 часа от 410 ₽. Если у вас свободное утро
                            или пары закончились рано, ехать одну-две остановки ради этого
                            заметно выгоднее, чем играть вечером.
                        </p>
                        <Link
                            href="/prices"
                            className="text-[#FF2E63] font-chakra font-bold uppercase text-sm border-b border-[#FF2E63]/30 hover:border-[#FF2E63] transition-all"
                        >
                            Посмотреть тарифы
                        </Link>
                    </div>

                    <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-10">
                        <div className="text-[#B900FF] mb-5 scale-125 origin-left">
                            <Moon />
                        </div>
                        <h2 className="font-tactic font-black text-2xl md:text-3xl uppercase mb-4">
                            Ночью до утра
                        </h2>
                        <p className="font-inter text-gray-400 leading-relaxed mb-6">
                            Клуб круглосуточный, а метро — нет. Поэтому ночные гости из
                            Новогиреево и Перово обычно берут пакет на 5 часов или сутки:
                            играете ночью, а уезжаете уже утром, когда линия открылась.
                        </p>
                        <Link
                            href="/contacts"
                            className="text-white/50 font-chakra font-bold uppercase text-sm border-b border-white/10 hover:border-white transition-all"
                        >
                            Как нас найти
                        </Link>
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase mb-8">
                        Зоны клуба
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <ZoneRow name="Общий зал" spec="RTX 4060 · 144 Гц" price="от 150 ₽" />
                        <ZoneRow name="Bootcamp" spec="5 мест · RTX 4060" price="от 170 ₽" />
                        <ZoneRow name="VIP & DUO" spec="RTX 4070 · 240 Гц" price="от 190 ₽" />
                        <ZoneRow name="Solo Rooms" spec="RTX 5070 · до 400 Гц" price="от 230 ₽" />
                        <ZoneRow name="TV & PS5" spec="FIFA 26 · UFC 5 · 4K" price="от 340 ₽" />
                        <ZoneRow name="Автосимулятор" spec="Direct Drive · кокпит" price="от 580 ₽" />
                    </div>
                </section>

                <GeoFaq items={faq} title="Вопросы про дорогу и тарифы" />
            </div>
            <Footer />
        </main>
    );
}

function Stop({ name, note, active }: { name: string; note: string; active?: boolean }) {
    return (
        <li className="flex md:flex-col items-center md:items-start gap-4 md:gap-2 md:flex-1">
            <span
                className={`w-4 h-4 rounded-full shrink-0 ${
                    active ? "bg-[#FF2E63]" : "bg-white/20"
                }`}
                aria-hidden="true"
            />
            <span>
                <span
                    className={`block font-chakra font-bold text-lg uppercase ${
                        active ? "text-[#FF2E63]" : "text-white"
                    }`}
                >
                    {name}
                </span>
                <span className="block font-inter text-xs text-gray-500 uppercase tracking-wider">
                    {note}
                </span>
            </span>
        </li>
    );
}

function Connector() {
    return (
        <span
            aria-hidden="true"
            className="hidden md:block h-px flex-1 bg-white/10 mx-2 -mt-6"
        />
    );
}

function ZoneRow({ name, spec, price }: { name: string; spec: string; price: string }) {
    return (
        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl px-5 py-4 flex items-center justify-between gap-4 hover:border-[#FF2E63]/30 transition-colors">
            <span>
                <span className="block font-chakra font-bold text-base uppercase">{name}</span>
                <span className="block font-inter text-xs text-gray-500">{spec}</span>
            </span>
            <span className="font-tactic font-black text-lg text-[#FF2E63] whitespace-nowrap">
                {price}
            </span>
        </div>
    );
}
