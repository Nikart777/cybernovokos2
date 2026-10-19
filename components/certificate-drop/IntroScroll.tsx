"use client";

import React, { useRef, useState } from "react";
import { motion, MotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Gift } from "lucide-react";
import s from "./drop.module.css";
import HoloCard from "./HoloCard";
import { DEFAULT_CONFIG, GiftConfig, rarityOf, SkinId, track } from "./model";

// Scroll-driven intro, built on the idea of the main /certificate page hero:
// the card turns, its nominal climbs through the rarity grades, it flips
// through the designs, and finally bursts into photos of the club's zones.

const NOMS = [1000, 2000, 3000, 5000, 10000];
const SKIN_SEQ: SkinId[] = ["holo", "neon", "carbon", "pixel", "midnight", "gold", "glitch", "ice", "lava"];

const NOM_FROM = 0.18;
const NOM_TO = 0.42;
const SKIN_FROM = 0.44;
const SKIN_TO = 0.66;
const ZONES_FROM = 0.68;

const STEPS = ["Подарок", "Номинал", "Дизайн", "Что внутри"];

/** Zig-zag collage in % of the collage box (4:3 photos). Upper pieces sit on top so captions stay readable. */
const ZONES = [
    { id: "hall", name: "Общий зал", note: "игра в компании", l: 0, t: 0, w: 48, r: -3, z: 7 },
    { id: "solo", name: "Solo-комнаты", note: "приватно и тихо", l: 52, t: 12.5, w: 48, r: 4, z: 6 },
    { id: "ps5", name: "PS5 Lounge", note: "диваны и большой экран", l: 3, t: 25, w: 48, r: 2, z: 5 },
    { id: "sim", name: "Автосимулятор", note: "руль, педали, кокпит", l: 50, t: 37.5, w: 48, r: -3, z: 4 },
    { id: "duo", name: "Duo", note: "вдвоём с другом", l: 0, t: 50, w: 48, r: -2, z: 3 },
    { id: "bootcamp", name: "Bootcamp", note: "команда на 5 ПК", l: 52, t: 62.5, w: 48, r: 3, z: 2 },
    { id: "bar", name: "Бар", note: "энергетики, снеки, сэндвичи", l: 4, t: 75, w: 48, r: -2, z: 1 },
];
const PIECE_H = 0.585;

const pick = <T,>(list: T[], v: number, from: number, to: number) => {
    const k = Math.min(0.999, Math.max(0, (v - from) / (to - from)));
    return list[Math.floor(k * list.length)];
};

function Caption({ p, range, children, className = "" }: { p: MotionValue<number>; range: number[]; children: React.ReactNode; className?: string }) {
    const opacity = useTransform(p, range, range.length === 4 ? [0, 1, 1, 0] : [1, 1, 0]);
    const y = useTransform(p, range, range.length === 4 ? [36, 0, 0, -36] : [0, 0, -36]);
    const pointerEvents = useTransform(opacity, (o) => (o > 0.6 ? "auto" : "none"));
    return (
        <motion.div style={{ opacity, y, pointerEvents }} className={`absolute inset-0 flex flex-col justify-center ${className}`}>
            {children}
        </motion.div>
    );
}

/** One zone photo flying out of the card to its place in the collage. */
function Piece({ p, z, i }: { p: MotionValue<number>; z: (typeof ZONES)[number]; i: number }) {
    const start = ZONES_FROM + i * 0.02;
    const end = start + 0.07;
    const h = z.w * PIECE_H;
    const fromX = `${((50 - (z.l + z.w / 2)) / z.w) * 100}%`;
    const fromY = `${((45 - (z.t + h / 2)) / h) * 100}%`;
    const x = useTransform(p, [start, end], [fromX, "0%"]);
    const y = useTransform(p, [start, end], [fromY, "0%"]);
    const scale = useTransform(p, [start, end], [0.35, 1]);
    const rotate = useTransform(p, [start, end], [0, z.r]);
    const opacity = useTransform(p, [start, start + 0.025], [0, 1]);
    return (
        <motion.figure
            className={s.piece}
            style={{ left: `${z.l}%`, top: `${z.t}%`, width: `${z.w}%`, zIndex: z.z, x, y, scale, rotate, opacity }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/certificate-drop/zones/${z.id}.webp`} alt="" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            <figcaption className={s.pieceCap}>
                <b>{z.name}</b>
                <span>{z.note}</span>
            </figcaption>
        </motion.figure>
    );
}

export default function IntroScroll({ sectionRef }: { sectionRef?: React.Ref<HTMLElement> }) {
    const ref = useRef<HTMLElement | null>(null);
    const setRefs = (el: HTMLElement | null) => {
        ref.current = el;
        if (typeof sectionRef === "function") sectionRef(el);
        else if (sectionRef) (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
    };
    const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

    const [nominal, setNominal] = useState(NOMS[0]);
    const [skin, setSkin] = useState<SkinId>("holo");
    const [step, setStep] = useState(0);
    useMotionValueEvent(p, "change", (v) => {
        const n = pick(NOMS, v, NOM_FROM, NOM_TO);
        const sk = pick(SKIN_SEQ, v, SKIN_FROM, SKIN_TO);
        const st = v < NOM_FROM ? 0 : v < SKIN_FROM ? 1 : v < ZONES_FROM ? 2 : 3;
        setNominal((x) => (x === n ? x : n));
        setSkin((x) => (x === sk ? x : sk));
        setStep((x) => (x === st ? x : st));
    });

    const cfg: GiftConfig = { ...DEFAULT_CONFIG, nominal, skin, message: "Пусть каждая катка будет победной" };
    const rarity = rarityOf(nominal);

    // card motion: turns in, holds, then shrinks away as the zones burst out of it
    const rotateY = useTransform(p, [0, 0.16, 0.66, 0.74], [-34, 0, 0, 22]);
    const scale = useTransform(p, [0, 0.14, 0.66, 0.76], [0.84, 1, 1, 0.5]);
    const cardOpacity = useTransform(p, [0.68, 0.76], [1, 0]);
    const barOpacity = useTransform(p, [0.94, 0.995], [1, 0]);
    const finalOpacity = useTransform(p, [0.66, 0.72], [0, 1]);
    const finalY = useTransform(p, [0.66, 0.72], [30, 0]);
    const finalEvents = useTransform(finalOpacity, (o) => (o > 0.6 ? "auto" : "none"));

    const skip = () => {
        track("cert_drop_intro_skip", { step });
        document.getElementById("studio")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const side = "lg:left-[max(24px,calc((100vw-1280px)/2+24px))] lg:right-auto";
    const rightSide = "lg:left-auto lg:right-[max(24px,calc((100vw-1280px)/2+48px))]";

    return (
        <section ref={setRefs} aria-label="Что такое подарочный сертификат CyberX" className="relative z-[2] h-[360vh]" style={{ "--rar": rarity.color } as React.CSSProperties}>
            <div className="sticky top-0 h-[100svh] overflow-hidden">
                {/* card stage: centred low on phones, right column on desktop */}
                <div className={`absolute bottom-[12svh] left-1/2 w-[clamp(180px,min(58vw,calc(42svh*0.714)),300px)] -translate-x-1/2 lg:bottom-auto lg:top-1/2 lg:w-[min(30vw,390px)] lg:-translate-x-0 lg:-translate-y-[46%] ${rightSide}`}>
                    <div className={s.beam} aria-hidden />
                    <div className={s.beamCore} aria-hidden />
                    <motion.div style={{ opacity: cardOpacity }} className="relative">
                        <motion.div style={{ rotateY, scale, transformPerspective: 1200 }}>
                            <HoloCard cfg={cfg} />
                        </motion.div>
                        <div className={`${s.pedestal} mx-auto`} aria-hidden />
                    </motion.div>
                </div>

                {/* zone collage: between the heading and the button on phones, right side on desktop */}
                <div
                    className={`${s.collage} absolute left-1/2 top-[196px] h-[calc(100svh-336px)] w-[min(calc(100vw-24px),calc((100svh-336px)*0.78))] -translate-x-1/2 lg:top-1/2 lg:h-[min(78svh,660px)] lg:w-[calc(min(78svh,660px)*0.8)] lg:-translate-x-0 lg:-translate-y-1/2 ${rightSide}`}
                    aria-hidden={step < 3}
                >
                    {ZONES.map((z, i) => (
                        <Piece key={z.id} p={p} z={z} i={i} />
                    ))}
                </div>

                {/* captions: top on phones, left column on desktop */}
                <div className={`absolute inset-x-4 top-[88px] h-[33svh] sm:inset-x-8 lg:top-1/2 lg:h-[480px] lg:w-[min(46vw,600px)] lg:-translate-y-1/2 ${side}`}>
                    <Caption p={p} range={[0, 0.13, 0.18]} className="text-center lg:text-left">
                        <h1 className={`${s.display} text-[clamp(1.5rem,6.6vw,2.3rem)] leading-[1.06] text-white lg:text-[clamp(2.4rem,3.6vw,3.6rem)]`}>
                            Подарочный сертификат в компьютерный клуб CyberX Новокосино
                        </h1>
                        <p className="mx-auto mt-3 max-w-[44ch] font-inter text-[14px] leading-relaxed text-[#a39cc4] sm:text-[16px] lg:mx-0 lg:mt-5 lg:text-[18px]">
                            Игровые ПК, PS5, автосимулятор, снеки и напитки. Листайте вниз: покажем, каким он будет.
                        </p>
                    </Caption>

                    <Caption p={p} range={[0.16, 0.21, 0.4, 0.44]} className="text-center lg:text-left">
                        <h2 className={`${s.display} text-[clamp(1.5rem,6.6vw,2.3rem)] leading-[1.06] text-white lg:text-[clamp(2.2rem,3.3vw,3.3rem)]`}>
                            Любой номинал,
                            <br />
                            <span className="whitespace-nowrap">от 1{" "}000{" "}₽</span>
                        </h2>
                        <p className="mx-auto mt-3 max-w-[42ch] font-inter text-[14px] leading-relaxed text-[#a39cc4] sm:text-[16px] lg:mx-0 lg:text-[18px]">
                            Чем больше сумма, тем больше удовольствия.
                        </p>
                    </Caption>

                    <Caption p={p} range={[0.42, 0.47, 0.63, 0.67]} className="text-center lg:text-left">
                        <h2 className={`${s.display} text-[clamp(1.5rem,6.6vw,2.3rem)] leading-[1.06] text-white lg:text-[clamp(2.2rem,3.3vw,3.3rem)]`}>
                            Девять дизайнов или своё фото
                        </h2>
                        <p className="mx-auto mt-3 max-w-[42ch] font-inter text-[14px] leading-relaxed text-[#a39cc4] sm:text-[16px] lg:mx-0 lg:text-[18px]">
                            Голограмма, неон, карбон, лава… Или загрузите снимок с телефона, и мы подгоним его под сертификат.
                        </p>
                    </Caption>
                </div>

                {/* final step text + button: heading on top and button at the bottom on phones, left column on desktop */}
                <motion.div
                    style={{ opacity: finalOpacity, y: finalY, pointerEvents: finalEvents }}
                    className={`absolute inset-x-4 bottom-[68px] top-[84px] flex flex-col justify-between text-center sm:inset-x-8 lg:bottom-auto lg:top-1/2 lg:w-[min(42vw,540px)] lg:-translate-y-1/2 lg:justify-center lg:text-left ${side}`}
                >
                    <div>
                        <h2 className={`${s.display} text-[clamp(1.35rem,6vw,2.1rem)] leading-[1.06] text-white lg:text-[clamp(2.1rem,3.1vw,3.1rem)]`}>
                            Это баланс в компьютерном клубе
                        </h2>
                        <p className="mx-auto mt-2.5 max-w-[46ch] font-inter text-[14px] leading-relaxed text-[#a39cc4] sm:text-[16px] lg:mx-0 lg:mt-4 lg:text-[18px]">
                            Получатель тратит его где захочет: от общего зала и приватных комнат до PS5, автосимулятора и бара.
                        </p>
                    </div>
                    <div className="lg:mt-8">
                        <button
                            type="button"
                            onClick={skip}
                            className={`${s.buy} inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl px-7 font-inter text-[16px] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto`}
                        >
                            <Gift className="h-5 w-5" aria-hidden />
                            Собрать свой сертификат
                        </button>
                    </div>
                </motion.div>

                {/* progress + skip */}
                <motion.div
                    style={{ opacity: barOpacity }}
                    className="absolute inset-x-4 bottom-4 flex items-center gap-4 sm:inset-x-8 lg:bottom-7 lg:left-[max(24px,calc((100vw-1280px)/2+24px))] lg:right-[max(24px,calc((100vw-1280px)/2+24px))]"
                >
                    <ol className="flex flex-1 items-center gap-2" aria-label="Шаги рассказа">
                        {STEPS.map((label, i) => (
                            <li key={label} className="flex-1">
                                <span className={`block h-[3px] rounded-full transition-colors duration-300 ${i <= step ? "bg-white" : "bg-white/15"}`} />
                                <span className={`mt-2 hidden font-inter text-[12px] transition-colors duration-300 lg:block ${i === step ? "text-white" : "text-[#7d76a3]"}`}>{label}</span>
                            </li>
                        ))}
                    </ol>
                    <button
                        type="button"
                        onClick={skip}
                        className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-4 font-inter text-[13px] font-semibold text-[#d9d3f5] backdrop-blur transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:-mt-6"
                    >
                        К конструктору
                        <ChevronDown className="h-4 w-4" aria-hidden />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
