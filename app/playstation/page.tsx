import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GeoFaq from "@/components/GeoFaq";
import SchemaMarkup from "@/components/SchemaMarkup";
import { Metadata } from "next";
import Link from "next/link";
import { Tv, DoorClosed, Users, Moon, Zap, Smartphone, Phone, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
    title: "PlayStation 5 в клубе — поиграть на PS5 в Москве | CyberX Новокосино",
    description:
        "Где поиграть на PS5 в Москве: зона TV в CyberX Новокосино. FIFA 26, UFC 5 на 4K-телевизоре, отдельная VIP-комната с PlayStation 5. От 340 ₽ в час, круглосуточно, ул. Новокосинская, 32.",
    keywords: [
        "поиграть на PS5 Москва",
        "клуб PlayStation",
        "PlayStation 5 клуб",
        "аренда PS5 Москва",
        "где поиграть в пс5",
        "компьютерный клуб с PS5",
    ],
    alternates: { canonical: "https://cyberx-novokosino.ru/playstation" },
};

export const dynamic = "force-static";

const faq = [
    {
        q: "Сколько стоит час на PS5?",
        a: "Зона TV Standard — 340 ₽ в час утром и днём в будни, 380 ₽ вечером и ночью. Отдельная VIP-комната с PS5 — от 390 ₽ в час. В выходные тарифы выше. Ночной пакет на зону Standard — 1800 ₽ за всю ночь.",
    },
    {
        q: "В какие игры можно поиграть?",
        a: "В зоне PS5 стоят FIFA 26 и UFC 5 — то, во что чаще всего играют вдвоём на одном экране. Актуальный список игр всегда можно уточнить у администратора: библиотека пополняется.",
    },
    {
        q: "Можно ли играть вдвоём?",
        a: "Да, это основной сценарий зоны: большой 4K-телевизор, диван и два геймпада. FIFA и UFC как раз рассчитаны на игру друг против друга на одном экране.",
    },
    {
        q: "Чем VIP-комната отличается от обычной зоны?",
        a: "Standard — это зона в общем пространстве клуба. VIP — отдельная закрытая комната: никого постороннего рядом, можно шуметь и играть компанией, не мешая другим. Стоит дороже, от 390 ₽ в час.",
    },
    {
        q: "Нужно ли бронировать?",
        a: "На будний день обычно можно приехать без брони. На вечер пятницы, выходные и на VIP-комнату место лучше забронировать заранее по телефону +7 (985) 128-95-38.",
    },
    {
        q: "Можно ли остаться на всю ночь?",
        a: "Да. Клуб круглосуточный, а на зону TV есть отдельный ночной тариф: 1800 ₽ за ночь в Standard и 2075 ₽ в VIP-комнате в будни.",
    },
];

export default function PlaystationPage() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SportsActivityLocation",
        name: "Зона PlayStation 5 — CyberX Новокосино",
        description:
            "Игровая зона с PlayStation 5 на 4K-телевизоре и отдельной VIP-комнатой. FIFA 26, UFC 5. Москва, ул. Новокосинская, 32. Круглосуточно.",
        address: {
            "@type": "PostalAddress",
            streetAddress: "ул. Новокосинская, 32",
            addressLocality: "Москва",
            postalCode: "111673",
            addressCountry: "RU",
        },
        telephone: "+79851289538",
        openingHours: "Mo-Su 00:00-23:59",
        url: "https://cyberx-novokosino.ru/playstation",
    };

    return (
        <main className="min-h-screen flex flex-col bg-[#050505] text-white">
            <SchemaMarkup schema={schema} />
            <Header />
            <div className="pt-32 px-4 md:px-10 max-w-[1400px] mx-auto w-full flex-grow">
                <section className="mb-20">
                    <p className="font-chakra font-bold text-sm uppercase tracking-[0.2em] text-[#FF2E63] mb-4">
                        Зона TV &amp; PS5
                    </p>
                    <h1 className="font-tactic font-black text-4xl md:text-7xl uppercase mb-6 text-[#FF2E63]">
                        Поиграть <br /> на PlayStation 5
                    </h1>
                    <p className="font-chakra font-bold text-lg md:text-xl text-white/70 max-w-3xl mb-6 uppercase tracking-wide">
                        4K-телевизор, диван, два геймпада. От 340 ₽ в час, круглосуточно.
                    </p>
                    <p className="font-inter text-base text-gray-400 max-w-3xl leading-relaxed">
                        Дома PS5 есть не у всех, а вдвоём на большом экране играть интереснее,
                        чем поодиночке на мониторах. В CyberX на Новокосинской, 32 под это
                        отведена отдельная зона — с обычными местами и закрытой VIP-комнатой.
                    </p>
                </section>

                <section className="mb-20">
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase mb-8">
                        Два формата
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 md:p-10 hover:border-[#FF2E63]/30 transition-colors">
                            <div className="text-[#FF2E63] mb-5 scale-125 origin-left">
                                <Tv />
                            </div>
                            <h3 className="font-tactic font-black text-2xl uppercase mb-2">
                                TV Standard
                            </h3>
                            <p className="font-inter text-sm text-gray-500 leading-relaxed mb-6">
                                Место в общем пространстве клуба: 4K-телевизор, PlayStation 5,
                                удобная посадка. Оптимально, если пришли вдвоём на пару часов.
                            </p>
                            <ul className="font-chakra text-sm uppercase font-bold tracking-wide space-y-2">
                                <PriceLi label="Час, утро и день" value="340 ₽" />
                                <PriceLi label="Час, вечер и ночь" value="380 ₽" />
                                <PriceLi label="3 часа днём" value="780 ₽" />
                                <PriceLi label="Вся ночь" value="1800 ₽" />
                            </ul>
                        </div>

                        <div className="bg-[#111] border border-[#FF2E63]/30 rounded-3xl p-8 md:p-10">
                            <div className="text-[#FF2E63] mb-5 scale-125 origin-left">
                                <DoorClosed />
                            </div>
                            <h3 className="font-tactic font-black text-2xl uppercase mb-2">
                                TV VIP — комната
                            </h3>
                            <p className="font-inter text-sm text-gray-500 leading-relaxed mb-6">
                                Отдельная закрытая комната с PS5. Никого постороннего рядом:
                                можно шуметь, звать компанию и отмечать день рождения.
                            </p>
                            <ul className="font-chakra text-sm uppercase font-bold tracking-wide space-y-2">
                                <PriceLi label="Час, утро и день" value="390 ₽" />
                                <PriceLi label="Час, вечер и ночь" value="500 ₽" />
                                <PriceLi label="3 часа днём" value="910 ₽" />
                                <PriceLi label="Вся ночь" value="2075 ₽" />
                            </ul>
                        </div>
                    </div>
                    <p className="font-inter text-sm text-gray-500 mt-5">
                        Цены указаны для будних дней. В выходные тарифы выше —{" "}
                        <Link href="/prices" className="text-[#FF2E63] hover:underline">
                            смотрите полный прайс
                        </Link>
                        .
                    </p>
                </section>

                <section className="mb-20">
                    <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase mb-8">
                        Кому подходит
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <UseCase
                            icon={<Users />}
                            title="Вдвоём"
                            desc="FIFA 26 и UFC 5 — игры про то, чтобы обыграть человека рядом, а не бота. Один экран, два геймпада."
                        />
                        <UseCase
                            icon={<DoorClosed />}
                            title="Компанией"
                            desc="VIP-комната берётся целиком: турнир по FIFA на вылет, день рождения или просто вечер без посторонних."
                        />
                        <UseCase
                            icon={<Moon />}
                            title="На всю ночь"
                            desc="Ночной тариф на зону TV — фиксированная сумма до утра, без счёта на часы."
                        />
                    </div>
                </section>

                <section className="mb-20">
                    <div className="bg-[#0A0A0A] border border-[#FF2E63]/30 rounded-3xl p-8 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-gradient-to-l from-[#FF2E63]/10 to-transparent pointer-events-none" />
                        <div className="max-w-2xl relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF2E63]/20 border border-[#FF2E63]/40 text-[#FF2E63] text-[11px] font-chakra font-bold uppercase tracking-wider mb-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E63] animate-pulse" />
                                Онлайн-бронирование без регистрации
                            </div>
                            <h2 className="font-tactic font-black text-2xl md:text-3xl uppercase mb-3">
                                Забронировать PS5 или VIP-комнату
                            </h2>
                            <p className="font-inter text-gray-400 leading-relaxed mb-4">
                                Москва, ул. Новокосинская, 32 — рядом с метро «Новокосино».
                                Клуб работает круглосуточно. На выходные и вечернее время зону с PlayStation 5 рекомендуем бронировать онлайн заранее.
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-white/50 text-xs font-chakra font-bold uppercase tracking-wider">
                                <span className="text-[#00F0FF]">⚡ Бронь за 30 сек</span>
                                <div className="w-[1px] h-3 bg-white/20" />
                                <span>Без скачивания приложений</span>
                                <div className="w-[1px] h-3 bg-white/20" />
                                <span>+400 ₽ при установке приложения</span>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 relative z-10 shrink-0 w-full sm:w-auto">
                            <a
                                href="https://langame.ru/cip/umfw9uiydje1ugq"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#FF2E63] hover:bg-[#e02655] text-white font-chakra font-black text-base uppercase tracking-wider rounded-xl shadow-[0_0_30px_rgba(255,46,99,0.5)] hover:shadow-[0_0_40px_rgba(255,46,99,0.8)] transition-all duration-300 group"
                            >
                                <Zap size={18} className="fill-white" />
                                <span>Забронировать онлайн</span>
                                <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                            </a>

                            <div className="flex items-center gap-2">
                                <a
                                    href="/download"
                                    target="_blank"
                                    rel="nofollow noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 font-chakra font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
                                >
                                    <Smartphone size={14} />
                                    <span>Приложение (+400 бонусов)</span>
                                </a>
                                <a
                                    href="tel:+79851289538"
                                    className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 font-chakra font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
                                    title="Позвонить в клуб"
                                >
                                    <Phone size={14} />
                                    <span>+7 985 128-95-38</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <GeoFaq items={faq} title="Вопросы про PS5" />
            </div>
            <Footer />
        </main>
    );
}

function PriceLi({ label, value }: { label: string; value: string }) {
    return (
        <li className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-2">
            <span className="text-white/50">{label}</span>
            <span className="text-[#FF2E63] font-tactic font-black text-base tabular-nums">
                {value}
            </span>
        </li>
    );
}

function UseCase({
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
