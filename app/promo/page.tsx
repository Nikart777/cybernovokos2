import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/SchemaMarkup";
import type { Metadata } from "next";
import Link from "next/link";
import { Gift, MessageSquare, Smartphone, Users, WalletCards, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Промокод CyberX на первое посещение в Новокосино",
    description:
        "Как получить промокод и приветственный бонус на первое посещение CyberX Новокосино: регистрация в приложении, реферальный код друга, условия начисления бонусов и контакты администратора.",
    keywords: [
        "cyberx промокод",
        "cyberx промокод на первое посещение",
        "кибер х промокод",
        "промокод cyberx",
        "CyberX Новокосино промокод",
        "компьютерный клуб первое посещение",
    ],
    alternates: {
        canonical: "https://cyberx-novokosino.ru/promo",
    },
    openGraph: {
        title: "Промокод CyberX Новокосино на первое посещение",
        description:
            "Актуальные приветственные бонусы, реферальный промокод друга и условия акций в CyberX Новокосино.",
        url: "https://cyberx-novokosino.ru/promo",
        type: "website",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Промокод CyberX Новокосино",
            },
        ],
    },
};

const steps = [
    {
        icon: Smartphone,
        title: "Установите приложение CyberX",
        text: "Зарегистрируйтесь до визита или прямо у стойки администратора. В приложении выберите клуб CyberX Новокосино.",
    },
    {
        icon: Gift,
        title: "Скажите, что вы впервые",
        text: "Администратор подскажет актуальный приветственный бонус и проверит, доступна ли акция на первое пополнение.",
    },
    {
        icon: Users,
        title: "Введите код друга, если он есть",
        text: "Реферальный промокод обычно нужно указывать при регистрации, поэтому лучше подготовить его заранее.",
    },
    {
        icon: WalletCards,
        title: "Пополните баланс и бронируйте место",
        text: "Бонусы можно использовать по условиям акции. Точные правила зависят от действующего предложения в приложении.",
    },
];

const faqs = [
    {
        question: "Есть ли промокод CyberX на первое посещение?",
        answer:
            "Да, для новых гостей CyberX Новокосино регулярно действуют приветственные бонусы. Актуальное условие лучше проверять в приложении CyberX или у администратора перед пополнением баланса.",
    },
    {
        question: "Где вводить промокод CyberX?",
        answer:
            "Если это реферальный код друга, его обычно вводят при регистрации в приложении CyberX. Если это акция клуба, администратор подскажет порядок активации перед оплатой.",
    },
    {
        question: "Промокод работает именно в Новокосино?",
        answer:
            "Выбирайте в приложении клуб CyberX Новокосино на ул. Новокосинская, 32. Акции сети и локальные предложения могут отличаться по условиям.",
    },
    {
        question: "Можно ли получить бонус без приложения?",
        answer:
            "Большинство бонусов привязано к аккаунту в приложении CyberX. Если приложение не установлено, администратор поможет зарегистрироваться на месте.",
    },
];

export default function PromoPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
            },
        })),
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <SchemaMarkup schema={faqSchema} />
            <Header />

            <section className="relative overflow-hidden px-4 pt-32 pb-20 md:px-10 md:pt-40">
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:54px_54px]" />
                <div className="relative mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
                    <div>
                        <div className="mb-5 inline-flex items-center gap-3 border border-[#FF2E63]/30 bg-[#FF2E63]/10 px-4 py-2 font-chakra text-[11px] font-black uppercase tracking-[0.24em] text-[#FF2E63]">
                            <Gift size={16} />
                            Первое посещение
                        </div>
                        <h1 className="font-tactic text-5xl font-black uppercase italic leading-none text-white md:text-7xl lg:text-8xl">
                            Промокод
                            <span className="block text-[#FF2E63]">CyberX</span>
                            <span className="block text-3xl text-white/55 md:text-5xl">Новокосино</span>
                        </h1>
                        <p className="mt-7 max-w-3xl font-inter text-base leading-relaxed text-white/65 md:text-xl">
                            Если вы ищете промокод CyberX на первое посещение, начните с официального пути: приложение CyberX, клуб Новокосино и администратор на связи. Так вы получите актуальный бонус без устаревших купонов из случайных тем и агрегаторов.
                        </p>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <a
                                href="https://redirect.appmetrica.yandex.com/serve/965634439310753772"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 bg-[#FF2E63] px-7 py-4 font-tactic text-sm font-black uppercase italic tracking-wider text-white transition hover:bg-[#ff4778]"
                            >
                                <Smartphone size={18} />
                                Скачать приложение
                            </a>
                            <a
                                href="https://t.me/CyberXNovokos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 border border-white/15 bg-white/[0.04] px-7 py-4 font-tactic text-sm font-black uppercase italic tracking-wider text-white transition hover:border-[#00F0FF]/60"
                            >
                                <MessageSquare size={18} />
                                Спросить администратора
                            </a>
                        </div>
                    </div>

                    <div className="border border-white/10 bg-white/[0.035] p-6 md:p-8">
                        <div className="mb-6 font-chakra text-[11px] font-black uppercase tracking-[0.24em] text-white/40">
                            Что можно получить
                        </div>
                        <div className="grid gap-4">
                            {[
                                "Приветственные бонусы за регистрацию",
                                "Реферальный бонус по коду друга",
                                "Скидку или бонусные часы по текущей акции",
                                "Кэшбэк и статусы лояльности после визита",
                            ].map((item) => (
                                <div key={item} className="flex items-start gap-3 border border-white/10 bg-black/25 p-4">
                                    <CheckCircle2 className="mt-0.5 shrink-0 text-[#00F0FF]" size={18} />
                                    <span className="font-chakra text-sm font-bold uppercase leading-relaxed text-white/70">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-white/10 px-4 py-16 md:px-10">
                <div className="mx-auto max-w-[1400px]">
                    <h2 className="mb-8 font-tactic text-3xl font-black uppercase italic text-white md:text-5xl">
                        Как активировать бонус
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {steps.map((step, index) => (
                            <article key={step.title} className="border border-white/10 bg-[#0A0A0A] p-6">
                                <div className="mb-7 flex items-center justify-between">
                                    <step.icon className="text-[#FF2E63]" size={26} />
                                    <span className="font-tactic text-3xl font-black italic text-white/15">
                                        0{index + 1}
                                    </span>
                                </div>
                                <h3 className="font-tactic text-xl font-black uppercase italic leading-tight text-white">
                                    {step.title}
                                </h3>
                                <p className="mt-4 font-inter text-sm leading-relaxed text-white/55">
                                    {step.text}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-white/10 px-4 py-16 md:px-10">
                <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                    <div>
                        <h2 className="font-tactic text-3xl font-black uppercase italic text-white md:text-5xl">
                            Частые вопросы
                        </h2>
                        <p className="mt-5 font-inter text-white/55">
                            Мы не публикуем случайные коды без срока действия: условия меняются, а бонус должен сработать именно в вашем аккаунте и именно в клубе Новокосино.
                        </p>
                    </div>
                    <div className="grid gap-4">
                        {faqs.map((item) => (
                            <article key={item.question} className="border border-white/10 bg-white/[0.035] p-5">
                                <h3 className="font-tactic text-lg font-black uppercase italic text-white">
                                    {item.question}
                                </h3>
                                <p className="mt-3 font-inter text-sm leading-relaxed text-white/60">
                                    {item.answer}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-white/10 px-4 py-16 md:px-10">
                <div className="mx-auto flex max-w-[1400px] flex-col gap-5 border border-[#FF2E63]/30 bg-[#FF2E63]/10 p-6 md:flex-row md:items-center md:justify-between md:p-8">
                    <div>
                        <h2 className="font-tactic text-2xl font-black uppercase italic text-white md:text-4xl">
                            Уже выбрали зону?
                        </h2>
                        <p className="mt-3 font-inter text-white/60">
                            Посмотрите цены и забронируйте место заранее: вечером и в выходные топовые зоны разбирают быстрее.
                        </p>
                    </div>
                    <Link
                        href="/prices"
                        className="inline-flex shrink-0 items-center justify-center bg-white px-7 py-4 font-tactic text-sm font-black uppercase italic tracking-wider text-[#050505] transition hover:bg-[#00F0FF]"
                    >
                        Смотреть цены
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
