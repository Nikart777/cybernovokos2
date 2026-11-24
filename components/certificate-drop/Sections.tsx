"use client";

import React, { forwardRef, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CupSoda, ExternalLink, Lock, MapPin, Phone, RotateCcw, Send, X } from "lucide-react";
import s from "./drop.module.css";
import HoloCard, { MiniCert, RollingNumber } from "./HoloCard";
import CaseReel from "./CaseReel";
import { NominalChips } from "./Studio";
import { BuyButton, Burst } from "./ui";
import { bonusLabel, Countdown, formatDeadline, useBonusDeadline } from "./bonus";
import {
    configToQuery,
    FAQ,
    digitGroups,
    MAPS_URL,
    GiftConfig,
    occasionLabel,
    PAGE_PATH,
    PHONE,
    PHONE_HUMAN,
    Rates,
    rarityOf,
    skinName,
    spendOf,
    telegramHelpUrl,
} from "./model";

type Update = (patch: Partial<GiftConfig>) => void;
type OnBuy = (place: string) => void;

const h2 = `${s.display} text-[clamp(1.75rem,4.4vw,3.25rem)] leading-[1.06] text-[#eef0f5]`;
const lead = "font-inter text-[15px] leading-relaxed text-[#a3a9b8] sm:text-[17px]";
const ruble = "font-inter font-normal";

/* ── Demo: open the case exactly as the recipient will ──────────────── */

export const DemoSection = forwardRef<HTMLElement, { cfg: GiftConfig; trigger: number; onDone: () => void }>(function DemoSection(
    { cfg, trigger, onDone },
    ref,
) {
    return (
        <section ref={ref} id="open" className="relative z-[2] overflow-hidden border-t border-white/[0.06] py-16 lg:py-20">
            <div className="relative mx-auto max-w-[1280px] px-4 text-center sm:px-6 lg:text-left">
                <div className={s.demoIntro}>
                    <h2 className={h2}>Вот как откроется подарок</h2>
                    <p className={`${lead} mx-auto mt-3 max-w-[52ch] lg:mx-0 xl:mt-0`}>
                        После оплаты придёт ссылка. Отправьте её тому, кому дарите: по ней откроется такой же кейс с вашим дизайном и промокодом.
                    </p>
                </div>
            </div>

            <div className="relative mt-7 lg:mt-8">
                <CaseReel cfg={cfg} trigger={trigger} onDone={onDone} place="demo" />
            </div>

            <div className="relative mx-auto mt-2 flex max-w-[1280px] justify-center px-4">
                <a
                    href={`${PAGE_PATH}?${configToQuery(cfg, { gift: "1" })}`}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex h-12 items-center gap-2 rounded-[10px] px-4 font-inter text-[15px] font-medium text-[#a3a9b8] transition-colors hover:bg-white/[0.06] hover:text-[#eef0f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                    <ExternalLink className="h-4 w-4" aria-hidden />
                    Открыть страницу подарка
                </a>
            </div>
        </section>
    );
});

/* ── Reveal after the case stops ─────────────────────────────────────── */

export function RevealModal({
    cfg,
    open,
    onClose,
    onRespin,
    onBuy,
}: {
    cfg: GiftConfig;
    open: boolean;
    onClose: () => void;
    onRespin: () => void;
    onBuy: OnBuy;
}) {
    const rarity = rarityOf(cfg.nominal);
    const buyRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        const t = window.setTimeout(() => buyRef.current?.focus({ preventScroll: true }), 500);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            window.clearTimeout(t);
            document.body.style.overflow = prev;
        };
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="cd-reveal-title"
                    className="fixed inset-0 z-[130] flex items-center justify-center overflow-y-auto p-4 py-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ "--rar": rarity.color } as React.CSSProperties}
                >
                    <div className="fixed inset-0 bg-[#07080d]/90" onClick={onClose} aria-hidden />
                    <Burst colors={[rarity.color, "#eef0f5", "#a3a9b8"]} seed={cfg.nominal} count={40} />

                    <motion.div
                        className="relative z-[2] grid w-full max-w-[920px] items-center gap-8 md:grid-cols-[minmax(0,330px)_1fr] md:gap-12"
                        initial={{ scale: 0.96, y: 12, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.98, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="mx-auto w-[min(60vw,300px)] md:w-full">
                            <HoloCard cfg={cfg} />
                        </div>
                        <div className="text-center md:text-left">
                            <p className="font-inter text-[15px] text-[#a3a9b8]">
                                Выпало <span className="font-medium" style={{ color: rarity.color }}>{rarity.name.toLowerCase()}</span>
                            </p>
                            <h3 id="cd-reveal-title" className={`${s.display} mt-2 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.06] text-[#eef0f5]`}>
                                Сертификат на {digitGroups(cfg.nominal).join(" ")}
                                <span className={ruble}>&nbsp;₽</span>
                            </h3>
                            <p className={`${lead} mx-auto mt-4 max-w-[46ch] md:mx-0`}>{cfg.to.trim() ? `Такой кейс откроет ${cfg.to.trim()}.` : "Такой кейс откроют по вашей ссылке."}</p>
                            <p className="mx-auto mt-3 inline-flex items-center gap-2 rounded-[10px] border border-white/10 bg-[#11141c] px-3 py-2 font-inter text-[14px] text-[#a3a9b8] md:mx-0">
                                <Lock className="h-4 w-4 shrink-0 text-[#7a8296]" aria-hidden />
                                Промокод на карте откроется после оплаты
                            </p>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-start">
                                <BuyButton ref={buyRef} nominal={cfg.nominal} place="reveal" onBuy={onBuy} size="lg" />
                                <button
                                    type="button"
                                    onClick={onRespin}
                                    className="inline-flex h-[52px] items-center justify-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.03] px-6 font-inter text-[15px] font-medium text-[#eef0f5] transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                >
                                    <RotateCcw className="h-4 w-4" aria-hidden />
                                    Открыть ещё раз
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Закрыть"
                        className="fixed right-4 top-4 z-[3] grid h-11 w-11 place-items-center rounded-[10px] border border-white/10 bg-[#11141c] text-[#eef0f5] transition-colors hover:bg-[#1a1e28] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ── What the nominal turns into ─────────────────────────────────────── */

const SPEND_ALT: Record<string, string> = {
    hall: "Общий зал компьютерного клуба CyberX Новокосино",
    night: "Игровые ПК в компьютерном клубе CyberX Новокосино",
    sim: "Автосимулятор в компьютерном клубе CyberX Новокосино",
    ps5: "PS5 в компьютерном клубе CyberX Новокосино",
};

export function SpendSection({ cfg, update, rates }: { cfg: GiftConfig; update: Update; rates: Rates }) {
    const items = spendOf(cfg.nominal, rates).filter((it) => it.value > 0);
    return (
        <section className="relative z-[2] border-t border-white/[0.06] py-20 lg:py-28">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <h2 className={h2}>
                            На что хватит{" "}
                            <span className="whitespace-nowrap">
                                <RollingNumber value={cfg.nominal} />
                                <span className={ruble}>&nbsp;₽</span>
                            </span>
                        </h2>
                        <p className={`${lead} mt-4 max-w-[54ch]`}>
                            Любой из вариантов, и ещё останется на напитки, шоколадки и сэндвичи из бара.
                        </p>
                    </div>
                    <NominalChips cfg={cfg} update={update} compact />
                </div>

                <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                    {items.map((it) => (
                        <figure key={it.id} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#11141c] sm:aspect-[3/4]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={it.img}
                                alt={SPEND_ALT[it.id] ?? "Компьютерный клуб CyberX Новокосино"}
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 h-full w-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d14] via-[#0b0d14]/60 to-transparent" aria-hidden />
                            <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                                <div className={`${s.display} flex items-baseline gap-2 text-[clamp(2.25rem,6vw,3.5rem)] leading-none text-[#eef0f5]`}>
                                    <RollingNumber value={it.value} />
                                    <span className="font-inter text-[0.42em] font-normal text-[#a3a9b8]">{it.unit}</span>
                                </div>
                                <p className="mt-2 font-inter text-[13px] font-medium leading-snug text-[#eef0f5] sm:text-[15px]">{it.label}</p>
                                {it.bar > 0 && (
                                    <p className="mt-2 flex items-start gap-2 font-inter text-[13px] leading-snug text-[#a3a9b8] sm:text-[14px]">
                                        <CupSoda className="mt-0.5 h-4 w-4 shrink-0 text-[#7a8296]" aria-hidden />
                                        <span>+ {it.barText}</span>
                                    </p>
                                )}
                            </figcaption>
                        </figure>
                    ))}
                </div>

            </div>
        </section>
    );
}

/* ── Who it suits: the page's answer to «необычный подарок …» searches ─ */

const GIFT_FOR = [
    {
        title: "Мужчине и парню",
        text: "Если не знаете, что подарить мужчине на день рождения: вечер в Solo-комнате, ночь за игровым ПК или заезд на автосимуляторе с рулём и педалями.",
    },
    {
        title: "Девушке",
        text: "Для той, кто любит игры или давно хотела попробовать: PS5 на большом экране с диванами, Duo-комната на двоих, снеки и напитки из бара.",
    },
    {
        title: "Другу-геймеру",
        text: "Тому, у кого всё есть: часы за игровым ПК. Место можно заранее забронировать в приложении CyberX.",
    },
    {
        title: "На двоих и компанией",
        text: "Duo-комната на двоих или Bootcamp на 5 ПК, чтобы прийти всей командой. Клуб открыт круглосуточно, время найдётся у всех.",
    },
];

export function GiftIdeasSection() {
    return (
        <section className="relative z-[2] border-t border-white/[0.06] py-20 lg:py-28">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
                <h2 className={h2}>Необычный подарок, который не&nbsp;ляжет на&nbsp;полку</h2>
                <p className={`${lead} mt-4 max-w-[60ch]`}>
                    Это подарок-впечатление: не нужно угадывать размер и вкус. Где играть, когда и с кем, человек решит сам.
                </p>
                <ul className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    {GIFT_FOR.map((g) => (
                        <li key={g.title} className="border-t border-white/10 pt-6">
                            <h3 className="font-inter text-[18px] font-medium text-[#eef0f5]">{g.title}</h3>
                            <p className="mt-2 max-w-[38ch] font-inter text-[15px] leading-relaxed text-[#a3a9b8]">{g.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

/* ── How ordering works (a real sequence, so it is numbered) ─────────── */

const STEPS = [
    { title: "Соберите сертификат", text: "Выберите сумму, повод, дизайн или своё фото и напишите пожелание." },
    { title: "Посмотрите, как он откроется", text: "Откройте кейс сами и поправьте, если что-то не нравится." },
    { title: "Оплатите и вручите ссылку", text: "Картой или через СБП. Сразу после оплаты получите промокод и ссылку, которую можно отправить в подарок." },
];

export function StepsSection({ onOpenCase }: { onOpenCase: () => void }) {
    return (
        <section className="relative z-[2] border-t border-white/[0.06] py-20 lg:py-28">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
                <h2 className={h2}>Три шага до подарка</h2>
                <ol className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
                    {STEPS.map((st, i) => (
                        <li key={st.title} className="relative border-t border-white/10 pt-6">
                            <span className={`${s.display} block text-[2.5rem] leading-none tabular-nums text-[#7a8296]`} aria-hidden>
                                {i + 1}
                            </span>
                            <h3 className="mt-4 font-inter text-[18px] font-medium text-[#eef0f5]">{st.title}</h3>
                            <p className="mt-2 max-w-[36ch] font-inter text-[15px] leading-relaxed text-[#a3a9b8]">{st.text}</p>
                            {i === 1 && (
                                <button
                                    type="button"
                                    onClick={onOpenCase}
                                    className="mt-3 inline-flex items-center gap-2 rounded-md font-inter text-[15px] font-medium text-[#eef0f5] underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                >
                                    Открыть кейс
                                </button>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

/* ── FAQ ─────────────────────────────────────────────────────────────── */


export function FaqSection() {
    return (
        <section className="relative z-[2] border-t border-white/[0.06] py-20 lg:py-28">
            <div className="mx-auto grid grid-cols-1 max-w-[1280px] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                <h2 className={h2}>Частые вопросы</h2>
                <div className="divide-y divide-white/10 border-y border-white/10">
                    {FAQ.map((f) => (
                        <details key={f.q} className="group">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-inter text-[16px] font-medium text-[#eef0f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-[18px] [&::-webkit-details-marker]:hidden">
                                {f.q}
                                <ChevronDown className="h-[18px] w-[18px] shrink-0 text-[#7a8296] transition-transform duration-200 group-open:rotate-180" aria-hidden />
                            </summary>
                            <p className="max-w-[62ch] pb-6 font-inter text-[15px] leading-relaxed text-[#a3a9b8] sm:text-[16px]">{f.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── Final summary + action ──────────────────────────────────────────── */

export const FinalSection = forwardRef<HTMLElement, { cfg: GiftConfig; onEdit: () => void; onBuy: OnBuy }>(function FinalSection(
    { cfg, onEdit, onBuy },
    ref,
) {
    const bonus = useBonusDeadline();
    const rows: { k: string; v: string; extra?: React.ReactNode }[] = [
        { k: "Кому", v: cfg.to.trim() || "имя можно не указывать" },
        {
            k: "Номинал",
            v: `${digitGroups(cfg.nominal).join(" ")} ₽`,
            extra:
                bonus.active && bonus.until ? (
                    <span className="mt-1 block text-[14px] font-normal text-[#a3a9b8]">
                        {bonusLabel} до {formatDeadline(bonus.until)}
                    </span>
                ) : null,
        },
        { k: "Дизайн", v: skinName(cfg.skin) },
        { k: "Повод", v: occasionLabel(cfg) },
    ];
    return (
        <section ref={ref} className="relative z-[2] overflow-hidden border-t border-white/[0.06] py-20 lg:py-28">
            <div className="relative mx-auto grid grid-cols-1 max-w-[1120px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-20">
                <div className="mx-auto w-[min(64vw,320px)] lg:w-full">
                    <HoloCard cfg={cfg} />
                </div>
                <div>
                    <p className="font-inter text-[15px] text-[#a3a9b8]">Компьютерный клуб CyberX Новокосино</p>
                    <h2 className={`${h2} mt-2`}>Осталось оплатить, и промокод ваш</h2>
                    <dl className="mt-8 divide-y divide-white/10 border-y border-white/10 font-inter">
                        {rows.map((r) => (
                            <div key={r.k} className="flex items-baseline justify-between gap-6 py-3">
                                <dt className="text-[14px] text-[#7a8296]">{r.k}</dt>
                                <dd className="text-right text-[15px] font-medium tabular-nums text-[#eef0f5] sm:text-[16px]">
                                    {r.v}
                                    {r.extra}
                                </dd>
                            </div>
                        ))}
                    </dl>
                    <div className="mt-8 flex flex-col items-stretch sm:items-start">
                        <BuyButton nominal={cfg.nominal} place="final" onBuy={onBuy} size="lg" />
                        {bonus.active && (
                            <div className="mt-3 rounded-xl border border-white/10 bg-[#11141c] p-4">
                                <p className="font-inter text-[15px] font-medium text-[#eef0f5]">{bonusLabel} к этому сертификату</p>
                                <p className="mt-1 font-inter text-[13px] text-[#a3a9b8]">Оформите до конца акции: бонусы начислятся при регистрации в приложении</p>
                                <div className="mt-3">
                                    <Countdown left={bonus.left} />
                                </div>
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={onEdit}
                            className="mt-2 inline-flex h-12 items-center justify-center self-center rounded-[10px] px-4 font-inter text-[15px] font-medium text-[#a3a9b8] underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#eef0f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:self-start"
                        >
                            Изменить сертификат
                        </button>
                    </div>
                    <p className="mt-6 font-inter text-[14px] leading-relaxed text-[#7a8296]">
                        Есть вопросы? Пишите в{" "}
                        <a href={telegramHelpUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-[#eef0f5] underline decoration-white/25 underline-offset-4 hover:decoration-white/60">
                            <Send className="h-3.5 w-3.5 text-[#7a8296]" aria-hidden />
                            Telegram
                        </a>{" "}
                        или звоните{" "}
                        <a href={`tel:${PHONE}`} className="inline-flex items-center gap-1 font-medium tabular-nums text-[#eef0f5] underline decoration-white/25 underline-offset-4 hover:decoration-white/60">
                            <Phone className="h-3.5 w-3.5 text-[#7a8296]" aria-hidden />
                            {PHONE_HUMAN}
                        </a>
                    </p>
                    <a
                        href={MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-4 inline-flex items-start gap-3 rounded-xl border border-white/10 bg-[#11141c] p-4 pr-5 transition-colors hover:bg-[#1a1e28] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                        <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#7a8296]" aria-hidden />
                        <span className="font-inter">
                            <b className="block text-[15px] font-medium text-[#eef0f5] underline decoration-white/25 underline-offset-4 group-hover:decoration-white/60">
                                Москва, Новокосинская, 32
                            </b>
                            <span className="text-[13px] text-[#a3a9b8]">2 этаж, вход рядом с DNS. Работаем круглосуточно. Открыть на карте</span>
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
});

/* ── Floating buy bar ────────────────────────────────────────────────── */

export function BuyBar({ cfg, visible, onBuy }: { cfg: GiftConfig; visible: boolean; onBuy: OnBuy }) {
    const rarity = rarityOf(cfg.nominal);
    return (
        <div className="pointer-events-none fixed inset-x-3 bottom-3 z-[95] flex justify-center lg:bottom-6">
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ y: 24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 24, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="pointer-events-auto flex w-full max-w-[560px] items-center gap-3 rounded-2xl border border-white/10 bg-[#11141c] p-2 pl-3 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.8)]"
                    >
                        <MiniCert skin={cfg.skin} image={cfg.image} label={false} nominal={cfg.nominal} className="h-[52px] w-[37px] shrink-0 rounded-md" />
                        <div className="min-w-0 flex-1">
                            <div className="font-inter text-[17px] font-medium leading-none tabular-nums text-[#eef0f5]">
                                {digitGroups(cfg.nominal).join(" ")}
                                &nbsp;₽
                            </div>
                            <div className="mt-1 truncate font-inter text-[12px] text-[#a3a9b8]">
                                {rarity.name}, {skinName(cfg.skin).toLowerCase()}
                            </div>
                        </div>
                        <BuyButton nominal={cfg.nominal} place="bar" onBuy={onBuy} size="md" withPrice={false} className="px-5" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
