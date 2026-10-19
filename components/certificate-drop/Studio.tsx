"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, ImagePlus, Loader2, Sparkles } from "lucide-react";
import s from "./drop.module.css";
import HoloCard, { MiniCert } from "./HoloCard";
import { BuyButton } from "./ui";
import {
    digitGroups,
    GiftConfig,
    MESSAGE_MAX,
    NAME_MAX,
    nextRarity,
    NOMINAL_MAX,
    NOMINAL_MIN,
    NOMINAL_PRESETS,
    NOMINAL_STEP,
    OCCASION_MAX,
    OCCASIONS,
    Rates,
    rarityOf,
    SKINS,
    spendCombo,
    barMix,
    track,
    WISH_PRESETS,
} from "./model";

type Update = (patch: Partial<GiftConfig>) => void;

const MOTES = [
    { left: "18%", delay: "0s" },
    { left: "30%", delay: "1.6s" },
    { left: "44%", delay: "3.1s" },
    { left: "57%", delay: "0.8s" },
    { left: "69%", delay: "2.4s" },
    { left: "81%", delay: "4.0s" },
    { left: "36%", delay: "4.6s" },
    { left: "63%", delay: "3.7s" },
];

/* ── Small controls ──────────────────────────────────────────────────── */

const chip =
    "inline-flex h-10 shrink-0 items-center justify-center rounded-full border px-4 font-inter text-[14px] font-semibold transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";
const chipOn = "border-transparent bg-[#F1EEFF] text-[#0d0a1c]";
const chipOff = "border-white/12 bg-white/[0.03] text-[#d9d3f5] hover:border-white/30 hover:bg-white/[0.07]";

const input =
    "h-12 w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 font-inter text-[16px] text-white placeholder:text-[#7d76a3] transition-colors focus:border-white/40 focus:bg-white/[0.07] focus:outline-none";

function FieldLabel({ children, htmlFor, aside }: { children: React.ReactNode; htmlFor?: string; aside?: React.ReactNode }) {
    return (
        <div className="mb-2.5 flex items-baseline justify-between gap-3">
            <label htmlFor={htmlFor} className="font-inter text-[13px] font-semibold text-[#c8c1ea]">
                {children}
            </label>
            {aside}
        </div>
    );
}

export function NominalChips({ cfg, update, compact = false }: { cfg: GiftConfig; update: Update; compact?: boolean }) {
    return (
        <div role="radiogroup" aria-label="Номинал" className={`flex gap-2 ${compact ? "flex-wrap lg:shrink-0 lg:flex-nowrap" : "-mx-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none]"}`}>
            {NOMINAL_PRESETS.map((n) => {
                const on = cfg.nominal === n;
                return (
                    <button
                        key={n}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => update({ nominal: n })}
                        className={`${chip} ${on ? chipOn : chipOff}`}
                        style={on ? { boxShadow: `0 0 0 2px ${rarityOf(n).color}` } : undefined}
                    >
                        {digitGroups(n).join(" ")}&nbsp;₽
                    </button>
                );
            })}
        </div>
    );
}

/* ── Panels ──────────────────────────────────────────────────────────── */

function WhoPanel({ cfg, update, idp }: { cfg: GiftConfig; update: Update; idp: string }) {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <FieldLabel htmlFor={`${idp}-to`}>Кому</FieldLabel>
                    <input
                        id={`${idp}-to`}
                        className={input}
                        value={cfg.to}
                        maxLength={NAME_MAX}
                        autoComplete="off"
                        placeholder="Имя"
                        onChange={(e) => update({ to: e.target.value })}
                    />
                </div>
                <div>
                    <FieldLabel htmlFor={`${idp}-from`}>От кого</FieldLabel>
                    <input
                        id={`${idp}-from`}
                        className={input}
                        value={cfg.from}
                        maxLength={NAME_MAX}
                        autoComplete="given-name"
                        placeholder="Ваше имя"
                        onChange={(e) => update({ from: e.target.value })}
                    />
                </div>
            </div>
            <div>
                <FieldLabel>Повод</FieldLabel>
                <div role="radiogroup" aria-label="Повод" className="flex flex-wrap gap-2">
                    {OCCASIONS.map((o) => {
                        const on = cfg.occasion === o.id;
                        return (
                            <button
                                key={o.id}
                                type="button"
                                role="radio"
                                aria-checked={on}
                                onClick={() => update({ occasion: o.id })}
                                className={`${chip} ${on ? chipOn : chipOff}`}
                            >
                                {o.label}
                            </button>
                        );
                    })}
                </div>
                <AnimatePresence initial={false}>
                    {cfg.occasion === "custom" && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                        >
                            <input
                                aria-label="Свой повод"
                                className={`${input} mt-3`}
                                value={cfg.occasionText}
                                maxLength={OCCASION_MAX}
                                autoFocus
                                autoComplete="off"
                                placeholder="Например: С защитой диплома!"
                                onChange={(e) => update({ occasionText: e.target.value })}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function NominalPanel({ cfg, update: rawUpdate, idp, onPick }: { cfg: GiftConfig; update: Update; idp: string; onPick?: () => void }) {
    const update: Update = (patch) => {
        rawUpdate(patch);
        onPick?.();
    };
    const rarity = rarityOf(cfg.nominal);
    const next = nextRarity(cfg.nominal);
    const fill = ((cfg.nominal - NOMINAL_MIN) / (NOMINAL_MAX - NOMINAL_MIN)) * 100;
    return (
        <div>
            <FieldLabel
                htmlFor={`${idp}-nominal`}
                aside={
                    <span className="font-tactic text-[15px] font-black tabular-nums text-white">
                        {digitGroups(cfg.nominal).join(" ")}
                        <span className="font-inter font-extrabold"> ₽</span>
                    </span>
                }
            >
                Номинал
            </FieldLabel>
            <NominalChips cfg={cfg} update={update} />
            <input
                id={`${idp}-nominal`}
                type="range"
                className={`${s.range} mt-3`}
                min={NOMINAL_MIN}
                max={NOMINAL_MAX}
                step={NOMINAL_STEP}
                value={cfg.nominal}
                aria-valuetext={`${cfg.nominal} рублей`}
                onChange={(e) => update({ nominal: Number(e.target.value) })}
                style={{ "--fill": `${fill}%` } as React.CSSProperties}
            />
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-inter text-[13px] text-[#a39cc4]">
                <span className="inline-flex items-center gap-2">
                    <i className="h-2.5 w-2.5 rounded-full" style={{ background: rarity.color, boxShadow: `0 0 10px ${rarity.color}` }} aria-hidden />
                    Редкость: <b className="font-semibold text-white">{rarity.name}</b>
                </span>
                {next && (
                    <button
                        type="button"
                        onClick={() => update({ nominal: next.min })}
                        className="rounded-md font-semibold underline decoration-dotted underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        style={{ color: next.color }}
                    >
                        До «{next.name}» ещё {digitGroups(next.min - cfg.nominal).join(" ")} ₽
                    </button>
                )}
            </div>
        </div>
    );
}

/** Phones hand over 5–12 MB photos; shrink before upload, the server does the real optimisation. */
async function shrink(file: File): Promise<Blob> {
    if (file.size < 2_500_000 || typeof createImageBitmap !== "function") return file;
    try {
        const bmp = await createImageBitmap(file);
        const k = Math.min(1, 2200 / Math.max(bmp.width, bmp.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(bmp.width * k);
        canvas.height = Math.round(bmp.height * k);
        canvas.getContext("2d")?.drawImage(bmp, 0, 0, canvas.width, canvas.height);
        return await new Promise<Blob>((res) => canvas.toBlob((b) => res(b || file), "image/jpeg", 0.9));
    } catch {
        return file;
    }
}

function PhotoTile({ cfg, update }: { cfg: GiftConfig; update: Update }) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const on = cfg.skin === "photo";

    const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file) return;
        setBusy(true);
        setError(null);
        try {
            const fd = new FormData();
            fd.append("file", await shrink(file), file.name || "photo.jpg");
            const res = await fetch("/api/gift/upload", { method: "POST", body: fd });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data.id) throw new Error(data.error || "Не получилось загрузить фото");
            update({ skin: "photo", image: data.id });
            track("cert_drop_photo");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Не получилось загрузить фото");
        } finally {
            setBusy(false);
        }
    };

    const onClick = () => {
        if (busy) return;
        if (cfg.image && !on) update({ skin: "photo" });
        else fileRef.current?.click();
    };

    const hint = busy
        ? "Загружаем и подгоняем под сертификат…"
        : error
          ? error
          : cfg.image
            ? on
                ? "Нажмите, чтобы заменить"
                : "Нажмите, чтобы вернуть своё фото"
            : "С телефона или компьютера, подгоним под сертификат";

    return (
        <div className="col-span-3 lg:col-span-1">
            <button
                type="button"
                role="radio"
                aria-checked={on}
                onClick={onClick}
                className="group flex w-full items-center gap-3 rounded-xl border border-dashed border-white/20 p-2 text-left transition-colors hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:flex-col lg:gap-1.5 lg:border-0 lg:p-0 lg:text-center"
            >
                <span
                    className={`relative block w-[46px] shrink-0 rounded-[10px] p-[2px] transition-colors lg:w-full ${on ? "bg-white" : "bg-white/10 group-hover:bg-white/30"}`}
                >
                    {cfg.image ? (
                        <MiniCert skin="photo" image={cfg.image} label={false} className="aspect-[5/7] w-full rounded-[8px]" />
                    ) : (
                        <span className="grid aspect-[5/7] w-full place-items-center rounded-[8px] border border-dashed border-white/30 bg-[#1e1840]">
                            <ImagePlus className="h-5 w-5 text-[#c8c1ea]" aria-hidden />
                        </span>
                    )}
                    {busy && (
                        <span className="absolute inset-[2px] grid place-items-center rounded-[8px] bg-black/60">
                            <Loader2 className="h-5 w-5 animate-spin text-white" aria-hidden />
                        </span>
                    )}
                </span>
                <span className="min-w-0">
                    <span className={`block font-inter text-[14px] font-semibold leading-none lg:text-[12px] ${on ? "text-white" : "text-[#d9d3f5] lg:text-[#8f88b3]"}`}>
                        Своё фото
                    </span>
                    <span className={`mt-1.5 block font-inter text-[12px] leading-snug lg:hidden ${error ? "text-[#ff8aa8]" : "text-[#8f88b3]"}`} aria-live="polite">
                        {hint}
                    </span>
                </span>
            </button>
            {error && <p className="mt-1.5 hidden font-inter text-[12px] leading-snug text-[#ff8aa8] lg:block">{error}</p>}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
        </div>
    );
}

function SkinPanel({ cfg, update }: { cfg: GiftConfig; update: Update; idp?: string }) {
    const current = cfg.skin === "photo" ? { hint: "Ваше фото на сертификате" } : SKINS.find((x) => x.id === cfg.skin);
    return (
        <div>
            <FieldLabel aside={<span className="font-inter text-[13px] text-[#a39cc4]">{current?.hint}</span>}>Дизайн</FieldLabel>
            <div role="radiogroup" aria-label="Дизайн" className="grid grid-cols-3 gap-2.5 sm:gap-3 lg:grid-cols-5 lg:gap-2.5">
                {SKINS.map((sk) => {
                    const on = cfg.skin === sk.id;
                    return (
                        <button
                            key={sk.id}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            aria-label={sk.name}
                            onClick={() => update({ skin: sk.id })}
                            className="group flex flex-col items-center gap-1.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                            <span
                                className={`block w-full rounded-[10px] p-[2px] transition-[background-color,transform] duration-150 group-active:scale-95 ${on ? "bg-white" : "bg-white/10 group-hover:bg-white/30"}`}
                            >
                                <MiniCert skin={sk.id} label={false} className="aspect-[4/5] w-full rounded-[8px] lg:aspect-[5/7]" />
                            </span>
                            <span className={`font-inter text-[12px] font-semibold leading-none ${on ? "text-white" : "text-[#8f88b3]"}`}>{sk.name}</span>
                        </button>
                    );
                })}
                <PhotoTile cfg={cfg} update={update} />
            </div>
        </div>
    );
}

function WishPanel({ cfg, update, idp }: { cfg: GiftConfig; update: Update; idp: string }) {
    return (
        <div>
            <FieldLabel
                htmlFor={`${idp}-msg`}
                aside={
                    <span className="font-inter text-[12px] tabular-nums text-[#7d76a3]">
                        {cfg.message.length}/{MESSAGE_MAX}
                    </span>
                }
            >
                Пожелание на сертификате
            </FieldLabel>
            <textarea
                id={`${idp}-msg`}
                rows={2}
                maxLength={MESSAGE_MAX}
                value={cfg.message}
                placeholder="Напишите своё или выберите готовое"
                onChange={(e) => update({ message: e.target.value })}
                className={`${input} h-auto resize-none py-3 leading-snug`}
            />
            <div className="-mx-1 mt-2.5 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:flex-wrap">
                {WISH_PRESETS.map((w) => (
                    <button
                        key={w}
                        type="button"
                        onClick={() => update({ message: w })}
                        className={`${chip} h-9 px-3.5 text-[13px] font-medium ${cfg.message === w ? chipOn : chipOff}`}
                    >
                        {w}
                    </button>
                ))}
            </div>
        </div>
    );
}


/* ── Phones: one question at a time, buttons lead forward ────────────── */

const WIZARD = [
    { id: "who", title: "Кому дарим?", next: "Далее: дизайн" },
    { id: "skin", title: "Какой дизайн?", next: "Далее: пожелание" },
    { id: "wish", title: "Что пожелать?", next: "Далее: номинал" },
    { id: "nominal", title: "Какой номинал?", next: "" },
] as const;
const LAST = WIZARD.length - 1;

function MobileWizard({
    cfg,
    update,
    onBuy,
    onOpenCase,
    stageRef,
}: {
    cfg: GiftConfig;
    update: Update;
    onBuy: (place: string) => void;
    onOpenCase: () => void;
    stageRef: React.RefObject<HTMLDivElement>;
}) {
    const [step, setStep] = useState(0);
    const [dir, setDir] = useState(1);
    const [picked, setPicked] = useState(false); // nominal chosen → final buttons
    const boxRef = useRef<HTMLDivElement>(null);
    const finalRef = useRef<HTMLDivElement>(null);
    const shownStep = useRef(step);

    // Each new question lands right under the pinned card.
    useEffect(() => {
        // compare with the last shown step (not a "first run" flag: StrictMode runs effects twice)
        if (shownStep.current === step) return;
        shownStep.current = step;
        const el = boxRef.current;
        if (!el) return;
        const stage = stageRef.current;
        const pinned = stage ? parseFloat(getComputedStyle(stage).top) + stage.offsetHeight + 8 : 120;
        window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - pinned), behavior: "smooth" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step]);

    const go = (to: number) => {
        setDir(to > step ? 1 : -1);
        setStep(to);
    };
    const next = () => {
        track("cert_drop_step", { step: WIZARD[step].id });
        go(step + 1);
    };
    const pick = () => {
        if (picked) return;
        setPicked(true);
        track("cert_drop_step", { step: "nominal" });
        window.setTimeout(() => finalRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 150);
    };

    const panel = (i: number) => {
        if (i === 0) return <WhoPanel cfg={cfg} update={update} idp="cm" />;
        if (i === 1) return <SkinPanel cfg={cfg} update={update} idp="cm" />;
        if (i === 2) return <WishPanel cfg={cfg} update={update} idp="cm" />;
        return <NominalPanel cfg={cfg} update={update} idp="cm" onPick={pick} />;
    };

    const st = WIZARD[step];
    return (
        <div>
            <div ref={boxRef} className="overflow-hidden rounded-[22px] border border-white/10 bg-[#151030]/80 p-4">
                <AnimatePresence mode="wait" initial={false} custom={dir}>
                    <motion.div
                        key={st.id}
                        custom={dir}
                        initial={{ x: dir * 48, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: dir * -48, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <h3 className="font-inter text-[18px] font-bold text-white">{st.title}</h3>
                            {step > 0 && (
                                <button
                                    type="button"
                                    onClick={() => go(step - 1)}
                                    className="inline-flex h-9 items-center gap-1 rounded-lg px-2 font-inter text-[13px] font-semibold text-[#a39cc4] transition-colors active:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                >
                                    <ChevronLeft className="h-4 w-4" aria-hidden />
                                    Назад
                                </button>
                            )}
                        </div>
                        {panel(step)}
                        {step < LAST ? (
                            <button
                                type="button"
                                onClick={next}
                                className="mt-5 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#F1EEFF] font-inter text-[16px] font-bold text-[#0d0a1c] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#151030]"
                            >
                                {st.next}
                                <ChevronRight className="h-5 w-5" aria-hidden />
                            </button>
                        ) : (
                            !picked && <p className="mt-4 font-inter text-[13px] text-[#a39cc4]">Выберите сумму, и появится кнопка оформления.</p>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <AnimatePresence initial={false}>
                {picked && step === LAST && (
                    <motion.div
                        ref={finalRef}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                    >
                        <div className="flex flex-col gap-3">
                            <BuyButton nominal={cfg.nominal} place="wizard" onBuy={onBuy} size="lg" className="w-full" />
                            <button
                                type="button"
                                onClick={onOpenCase}
                                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-2xl border border-white/15 bg-white/[0.04] px-6 font-inter text-[16px] font-semibold text-white transition-colors active:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                                <Sparkles className="h-5 w-5" style={{ color: "var(--rar)" }} aria-hidden />
                                Посмотреть, как откроется подарок
                            </button>
                        </div>
                        <p className="mt-3 text-center font-inter text-[13px] leading-relaxed text-[#8f88b3]">
                            Оплата картой или через СБП. Промокод и ссылка на подарок придут сразу после оплаты.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ── Hero ────────────────────────────────────────────────────────────── */

type StudioProps = {
    cfg: GiftConfig;
    update: Update;
    rates: Rates;
    onOpenCase: () => void;
    onBuy: (place: string) => void;
    ctaRef: React.Ref<HTMLDivElement>;
};

export default function Studio({ cfg, update, rates, onOpenCase, onBuy, ctaRef }: StudioProps) {
    const stageRef = useRef<HTMLDivElement>(null);
    const landed = useInView(stageRef, { once: true, amount: 0.35 });

    // Phones: the card stays pinned under the header while the form scrolls
    // beneath it; while the keyboard is open it shrinks so the field stays visible.
    const [typing, setTyping] = useState(false);
    const isTextField = (el: EventTarget) =>
        el instanceof HTMLTextAreaElement || (el instanceof HTMLInputElement && el.type !== "range" && el.type !== "file");
    const onFormFocus = (e: React.FocusEvent) => {
        if (isTextField(e.target) && window.matchMedia("(max-width: 1023px)").matches) setTyping(true);
    };
    const onFormBlur = (e: React.FocusEvent) => {
        if (isTextField(e.target)) setTyping(false);
    };
    const solo = spendCombo(cfg.nominal, rates.solo);
    // «Хватит на 8 ч в соло-комнате, 2 напитка, шоколадку и сэндвич»: one list, the form that follows «на».
    const soloBar = barMix(solo.bar, true);


    return (
        <section id="studio" className="relative z-[2] pb-14 pt-14 sm:pt-20 lg:pb-20 lg:pt-24">
            <div className="mx-auto grid grid-cols-1 max-w-[1280px] gap-x-16 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)]">
                {/* Headline */}
                <div className="text-center lg:col-start-2 lg:row-start-1 lg:text-left">
                    <h2 className={`${s.display} text-[clamp(1.4rem,6vw,2.1rem)] leading-[1.08] text-white sm:text-[2.4rem] lg:text-[clamp(2rem,2.7vw,2.8rem)]`}>
                        Соберите свой сертификат
                    </h2>
                    <p className="mx-auto mt-3 hidden max-w-[52ch] font-inter sm:block text-[14px] leading-relaxed text-[#a39cc4] sm:text-[16px] lg:mx-0 lg:mt-5 lg:text-[17px]">
                        Сумму можно потратить в компьютерном клубе CyberX Новокосино: на игровые ПК, PS5, автосимулятор, снеки и напитки.
                    </p>
                </div>

                {/* Stage with the live card */}
                <div
                    ref={stageRef}
                    className={`${s.stage} ${s.stagePinned} relative mt-3 lg:sticky lg:top-24 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-2 lg:self-start`}
                >
                    <div className={s.beam} aria-hidden />
                    <div className={s.beamCore} aria-hidden />
                    {MOTES.map((m, i) => <span key={i} className={s.mote} style={{ left: m.left, animationDelay: m.delay }} aria-hidden />)}

                    {/* the card drops onto the pedestal the first time the constructor comes into view */}
                    <motion.div
                        initial={{ y: -160, opacity: 0, rotate: -6 }}
                        animate={landed ? { y: 0, opacity: 1, rotate: 0 } : undefined}
                        transition={{ type: "spring", stiffness: 120, damping: 12, mass: 1.1 }}
                        className={`relative z-[1] transition-[width] duration-300 ease-out sm:w-[300px] lg:w-[min(100%,410px)] ${
                            typing ? "w-[132px]" : "w-[clamp(160px,min(54vw,calc(37svh*0.714)),250px)]"
                        }`}
                    >
                        <HoloCard cfg={cfg} />
                    </motion.div>
                    <div className={`${s.pedestal} ${typing ? "hidden lg:block" : ""}`} aria-hidden>
                        {landed && <span className={s.shock} />}
                    </div>

                    {solo.units > 0 && (
                        <p className={`relative z-[1] mt-1 text-center font-inter text-[12px] leading-snug text-[#a39cc4] sm:mt-2 sm:text-[14px] ${typing ? "hidden lg:block" : ""}`}>
                            Хватит на <b className="font-semibold text-white">{solo.units} ч в соло-комнате</b>
                            {solo.bar > 0 && (
                                <>
                                    {soloBar.includes(" и ") ? ", " : " и "}
                                    <b className="font-semibold text-[#FFE68A]">{soloBar}</b>
                                </>
                            )}
                        </p>
                    )}
                </div>

                {/* Controls: step-by-step wizard on phones, the full form on desktop */}
                <div className="relative z-[1] mt-4 lg:col-start-2 lg:row-start-2 lg:mt-8" onFocus={onFormFocus} onBlur={onFormBlur}>
                    <div className="lg:hidden">
                        <MobileWizard cfg={cfg} update={update} onBuy={onBuy} onOpenCase={onOpenCase} stageRef={stageRef} />
                    </div>

                    <div className="hidden lg:block">
                        <div className="space-y-7">
                            <WhoPanel cfg={cfg} update={update} idp="cd" />
                            <NominalPanel cfg={cfg} update={update} idp="cd" />
                            <SkinPanel cfg={cfg} update={update} idp="cd" />
                            <WishPanel cfg={cfg} update={update} idp="cd" />
                        </div>

                        <div ref={ctaRef} className="mt-8 flex flex-row gap-3">
                            <BuyButton nominal={cfg.nominal} place="hero" onBuy={onBuy} size="lg" />
                            <button
                                type="button"
                                onClick={onOpenCase}
                                className="inline-flex h-16 items-center justify-center gap-2.5 rounded-2xl border border-white/15 bg-white/[0.04] px-6 font-inter text-[16px] font-semibold text-white transition-colors hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                                <Sparkles className="h-5 w-5" style={{ color: "var(--rar)" }} aria-hidden />
                                Посмотреть, как откроется подарок
                            </button>
                        </div>
                        <p className="mt-3 font-inter text-[13px] leading-relaxed text-[#8f88b3]">
                            Оплата картой или через СБП. Промокод и ссылка на подарок придут сразу после оплаты.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
