"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, ImagePlus, Loader2, Package } from "lucide-react";
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


/* ── Small controls ──────────────────────────────────────────────────── */

const chip =
    "inline-flex h-10 shrink-0 items-center justify-center rounded-lg border px-4 font-inter text-[14px] font-medium tabular-nums transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";
const chipOn = "border-transparent bg-[#eef0f5] text-[#0b0d14]";
const chipOff = "border-white/10 bg-white/[0.03] text-[#a3a9b8] hover:border-white/20 hover:bg-white/[0.06] hover:text-[#eef0f5]";

const input =
    "h-12 w-full rounded-[10px] border border-white/10 bg-[#11141c] px-4 font-inter text-[16px] text-[#eef0f5] placeholder:text-[#7a8296] transition-colors focus:border-white/30 focus:bg-[#1a1e28] focus:outline-none";

function FieldLabel({ children, htmlFor, aside }: { children: React.ReactNode; htmlFor?: string; aside?: React.ReactNode }) {
    return (
        <div className="mb-2 flex items-baseline justify-between gap-3">
            <label htmlFor={htmlFor} className="font-inter text-[13px] font-medium text-[#a3a9b8]">
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
                                placeholder="Например: с защитой диплома"
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
                    <span className="font-inter text-[15px] font-medium tabular-nums text-[#eef0f5]">
                        {digitGroups(cfg.nominal).join(" ")}
                        &nbsp;₽
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
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 font-inter text-[13px] text-[#a3a9b8]">
                <span className="inline-flex items-center gap-2">
                    <i className="h-2 w-2 rounded-full" style={{ background: rarity.color }} aria-hidden />
                    Редкость: <b className="font-medium text-[#eef0f5]">{rarity.name}</b>
                </span>
                {next && (
                    <button
                        type="button"
                        onClick={() => update({ nominal: next.min })}
                        className="rounded-md tabular-nums underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#eef0f5] hover:decoration-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
        <div className="col-span-full">
            <button
                type="button"
                role="radio"
                aria-checked={on}
                aria-busy={busy}
                disabled={busy}
                onClick={onClick}
                className={`group flex w-full items-center gap-4 rounded-xl border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    on ? "border-[#eef0f5] bg-[#1a1e28]" : "border-white/10 bg-[#11141c] hover:border-white/20"
                }`}
            >
                <span className={`relative block w-[46px] shrink-0 rounded-[10px] p-[2px] transition-colors ${on ? "bg-white" : "bg-white/10 group-hover:bg-white/30"}`}>
                    {cfg.image ? (
                        <MiniCert skin="photo" image={cfg.image} label={false} className="aspect-[5/7] w-full rounded-[8px]" />
                    ) : (
                        <span className="grid aspect-[5/7] w-full place-items-center rounded-[8px] border border-dashed border-white/30 bg-[#1a1e28]">
                            <ImagePlus className="h-5 w-5 text-[#a3a9b8]" aria-hidden />
                        </span>
                    )}
                    {busy && (
                        <span className="absolute inset-[2px] grid place-items-center rounded-[8px] bg-black/60">
                            <Loader2 className="h-5 w-5 animate-spin text-[#eef0f5]" aria-hidden />
                        </span>
                    )}
                </span>
                <span className="min-w-0">
                    <span className="block font-inter text-[15px] font-medium leading-snug text-[#eef0f5]">{cfg.image ? "Своё фото" : "Загрузить своё фото"}</span>
                    <span className={`mt-1 block font-inter text-[13px] leading-snug ${error ? "text-[#e5484d]" : "text-[#a3a9b8]"}`} aria-live="polite">
                        {hint}
                    </span>
                </span>
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
        </div>
    );
}

function SkinPanel({ cfg, update }: { cfg: GiftConfig; update: Update; idp?: string }) {
    const current = cfg.skin === "photo" ? { hint: "Ваше фото на сертификате" } : SKINS.find((x) => x.id === cfg.skin);
    return (
        <div>
            <FieldLabel aside={<span className="font-inter text-[13px] text-[#a3a9b8]">{current?.hint}</span>}>Дизайн</FieldLabel>
            <div role="radiogroup" aria-label="Дизайн" className="grid grid-cols-3 gap-2.5 sm:gap-3 lg:grid-cols-5 lg:gap-2.5">
                <PhotoTile cfg={cfg} update={update} />
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
                            <span className={`font-inter text-[12px] font-medium leading-none ${on ? "text-[#eef0f5]" : "text-[#7a8296]"}`}>{sk.name}</span>
                        </button>
                    );
                })}
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
                    <span className="font-inter text-[12px] tabular-nums text-[#7a8296]">
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
            <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:flex-wrap">
                {WISH_PRESETS.map((w) => (
                    <button
                        key={w}
                        type="button"
                        onClick={() => update({ message: w })}
                        aria-pressed={cfg.message === w}
                        className={`${chip} h-9 px-3 text-[13px] ${cfg.message === w ? chipOn : chipOff}`}
                    >
                        {w}
                    </button>
                ))}
            </div>
        </div>
    );
}


/* ── One question at a time, at every screen width ───────────────────── */

const WIZARD = [
    { id: "who", label: "Кому", title: "Кому дарим?", next: "Далее: дизайн" },
    { id: "skin", label: "Дизайн", title: "Какой дизайн?", next: "Далее: пожелание" },
    { id: "wish", label: "Пожелание", title: "Что пожелать?", next: "Далее: номинал" },
    { id: "nominal", label: "Сумма", title: "Какой номинал?", next: "" },
] as const;
const LAST = WIZARD.length - 1;

const primaryBtn =
    "inline-flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#eef0f5] px-4 font-inter text-[15px] font-semibold leading-tight text-[#0b0d14] transition-[background-color,transform] duration-150 hover:bg-white active:scale-[0.98] disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d14]";
const secondaryBtn =
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.03] font-inter font-medium text-[#eef0f5] transition-colors hover:bg-white/[0.06] active:bg-white/[0.08] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

function CertificateWizard({
    cfg,
    update,
    onBuy,
    onOpenCase,
    stageRef,
    ctaRef,
}: {
    cfg: GiftConfig;
    update: Update;
    onBuy: (place: string) => void;
    onOpenCase: () => void;
    stageRef: React.RefObject<HTMLDivElement>;
    ctaRef: React.Ref<HTMLDivElement>;
}) {
    const [step, setStep] = useState(0);
    const [dir, setDir] = useState(1);
    const [moving, setMoving] = useState(false);
    const [picked, setPicked] = useState(false); // nominal confirmed → buy buttons
    const boxRef = useRef<HTMLDivElement>(null);
    const current = useRef(0);
    const busy = useRef(false); // blocks a second tap before React has disabled the buttons
    const frame = useRef<number | null>(null);

    useEffect(
        () => () => {
            if (frame.current !== null) cancelAnimationFrame(frame.current);
        },
        [],
    );

    const go = (to: number) => {
        const from = current.current;
        if (busy.current || to < 0 || to > LAST || Math.abs(to - from) !== 1) return;
        busy.current = true;
        current.current = to;
        setMoving(true);
        setDir(to > from ? 1 : -1);
        setStep(to);
    };
    const next = (skipped = false) => {
        if (busy.current || step === LAST) return;
        track("cert_drop_step", { step: WIZARD[step].id, ...(skipped ? { skipped: true } : {}) });
        go(step + 1);
    };
    // When the new question has slid in, phones bring it right under the pinned card.
    // Waiting for the animation keeps the next tap from chasing a moving button.
    const settle = () => {
        if (!busy.current || current.current !== step) return;
        if (frame.current !== null) cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
            frame.current = null;
            if (current.current !== step) return;
            const el = boxRef.current;
            if (el && window.matchMedia("(max-width: 1023px)").matches) {
                const stage = stageRef.current;
                const pinned = (stage?.offsetHeight ?? 0) + (stage ? Math.max(0, parseFloat(getComputedStyle(stage).top) || 0) : 0) + 12;
                window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - pinned), behavior: "instant" });
            }
            busy.current = false;
            setMoving(false);
        });
    };
    const pick = () => {
        if (picked || busy.current) return;
        setPicked(true);
        track("cert_drop_step", { step: "nominal" });
    };

    const panel = (i: number) => {
        if (i === 0) return <WhoPanel cfg={cfg} update={update} idp="cd" />;
        if (i === 1) return <SkinPanel cfg={cfg} update={update} idp="cd" />;
        if (i === 2) return <WishPanel cfg={cfg} update={update} idp="cd" />;
        return <NominalPanel cfg={cfg} update={update} idp="cd" onPick={pick} />;
    };

    const st = WIZARD[step];
    const sum = `${digitGroups(cfg.nominal).join(" ")}\u00A0₽`;
    return (
        <div>
            <div ref={boxRef} className="overflow-hidden px-0.5 pb-0.5">
                <p className="sr-only" aria-live="polite">
                    Шаг {step + 1} из {WIZARD.length}
                </p>
                <ol className={`${s.configProgress} mb-7 grid grid-cols-4 gap-2`} aria-label="Шаги">
                    {WIZARD.map((item, i) => (
                        <li
                            key={item.id}
                            aria-current={i === step ? "step" : undefined}
                            data-done={i < step || undefined}
                            className="min-w-0 font-inter text-[11px] font-medium sm:text-[12px]"
                        >
                            <span className="mb-2 block h-0.5 rounded-full transition-colors" aria-hidden />
                            {item.label}
                        </li>
                    ))}
                </ol>
                <AnimatePresence mode="wait" initial={false} custom={dir}>
                    <motion.div
                        key={st.id}
                        custom={dir}
                        initial={{ x: dir * 48, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: dir * -48, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                        onAnimationComplete={settle}
                    >
                        <h3 className="mb-4 font-inter text-[22px] font-medium tracking-[-0.01em] text-[#eef0f5] sm:text-[24px]">{st.title}</h3>
                        {panel(step)}
                    </motion.div>
                </AnimatePresence>
                <div className="mt-5 flex items-stretch gap-2">
                    {step > 0 && (
                        <button type="button" disabled={moving} onClick={() => go(step - 1)} className={`${secondaryBtn} h-12 min-w-[92px] px-3 text-[14px]`}>
                            <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden />
                            Назад
                        </button>
                    )}
                    {step < LAST ? (
                        <button type="button" disabled={moving} onClick={() => next()} className={primaryBtn}>
                            <span>{st.next}</span>
                            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
                        </button>
                    ) : !picked ? (
                        <button type="button" disabled={moving} onClick={pick} className={primaryBtn}>
                            Оставить <span className="whitespace-nowrap">{sum}</span>
                        </button>
                    ) : (
                        <p className="self-center font-inter text-[14px] font-medium text-[#eef0f5]">Выбрано {sum}</p>
                    )}
                </div>
                {step < LAST && (
                    <button
                        type="button"
                        disabled={moving}
                        onClick={() => next(true)}
                        aria-label={`Пропустить шаг «${st.label}»`}
                        className="mt-1 inline-flex min-h-11 w-full items-center justify-center rounded-lg font-inter text-[14px] font-medium text-[#a3a9b8] underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#eef0f5] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                        Пропустить
                    </button>
                )}
            </div>

            <div ref={ctaRef} className="min-h-px">
                <AnimatePresence initial={false}>
                    {picked && step === LAST && !moving && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="mt-4"
                        >
                            <div className="flex flex-col gap-3">
                                <BuyButton nominal={cfg.nominal} place="wizard" onBuy={onBuy} size="lg" className="w-full" />
                                <button type="button" onClick={onOpenCase} className={`${secondaryBtn} h-12 px-6 text-[15px]`}>
                                    <Package className="h-4 w-4 text-[#a3a9b8]" aria-hidden />
                                    Посмотреть, как откроется подарок
                                </button>
                            </div>
                            <p className="mt-3 text-center font-inter text-[13px] leading-relaxed text-[#7a8296]">
                                Оплата картой или через СБП. Промокод и ссылка на подарок придут сразу после оплаты.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
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
                    <h2 className={`${s.display} text-[clamp(1.5rem,6vw,2.1rem)] leading-[1.08] text-[#eef0f5] sm:text-[2.4rem] lg:text-[clamp(2rem,2.7vw,2.8rem)]`}>
                        Соберите свой сертификат
                    </h2>
                </div>

                {/* Stage with the live card */}
                <div
                    ref={stageRef}
                    className={`${s.stage} ${s.stagePinned} relative mt-3 lg:sticky lg:top-24 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-2 lg:self-start`}
                >
                    {/* the card fades in the first time the constructor comes into view */}
                    <motion.div
                        initial={{ y: 12, opacity: 0 }}
                        animate={landed ? { y: 0, opacity: 1 } : undefined}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className={`relative z-[1] sm:w-[300px] lg:w-[min(100%,410px)] ${
                            typing ? "w-[132px]" : "w-[clamp(160px,min(54vw,calc(37svh*0.714)),250px)]"
                        }`}
                    >
                        <HoloCard cfg={cfg} />
                    </motion.div>
                    <div className={`${s.pedestal} ${typing ? "hidden lg:block" : ""}`} aria-hidden />

                    {solo.units > 0 && (
                        <p className={`relative z-[1] mt-1 text-center font-inter text-[12px] leading-snug text-[#a3a9b8] sm:mt-2 sm:text-[14px] ${typing ? "hidden lg:block" : ""}`}>
                            Хватит на <b className="font-medium text-[#eef0f5]">{solo.units} ч в соло-комнате</b>
                            {solo.bar > 0 && (
                                <>
                                    {soloBar.includes(" и ") ? ", " : " и "}
                                    <b className="font-medium text-[#eef0f5]">{soloBar}</b>
                                </>
                            )}
                        </p>
                    )}
                </div>

                {/* The same four steps on phones and desktops */}
                <div className="relative z-[1] mt-4 lg:col-start-2 lg:row-start-2 lg:mt-8" onFocus={onFormFocus} onBlur={onFormBlur}>
                    <CertificateWizard cfg={cfg} update={update} onBuy={onBuy} onOpenCase={onOpenCase} stageRef={stageRef} ctaRef={ctaRef} />
                </div>
            </div>
        </section>
    );
}
