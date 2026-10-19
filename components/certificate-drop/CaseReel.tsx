"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { Package } from "lucide-react";
import s from "./drop.module.css";
import { MiniCert } from "./HoloCard";
import { GiftConfig, mulberry32, RARITIES, rarityOf, SkinId, SKINS, track } from "./model";

type Filler = { title: string; img?: string; position?: string; rarity: number; cert?: { skin: SkinId; nominal: number } };

const Z = (id: string) => `/certificate-drop/zones/${id}.webp`;
const FILLERS: Filler[] = [
    { title: "1 час в общем зале", img: Z("hall"), rarity: 0 },
    { title: "Напиток из бара", img: Z("bar"), rarity: 0 },
    { title: "Любимый снек", img: "/certificate-drop/prizes/snacks.webp", position: "50% 40%", rarity: 0 },
    { title: "PS5 на двоих, 2 часа", img: "/certificate-drop/prizes/gamepads.webp", position: "58% 50%", rarity: 1 },
    { title: "Ночной пакет", img: Z("night"), rarity: 1 },
    { title: "Duo-зал на вечер", img: Z("duo"), rarity: 2 },
    { title: "Solo-комната, 3 часа", img: Z("solo"), rarity: 2 },
    { title: "Автосимулятор, 1 час", img: Z("sim"), rarity: 3 },
    { title: "Bootcamp на команду", img: Z("bootcamp"), rarity: 3 },
];
const LENGTH = 48;
const WIN = 40;

function buildStrip(seed: number): Filler[] {
    const r = mulberry32(seed);
    const strip: Filler[] = [];
    let pool: Filler[] = [];
    while (strip.length < LENGTH) {
        if (!pool.length) {
            const skin = SKINS[Math.floor(r() * SKINS.length)].id;
            const nominal = [1000, 1500, 2000][Math.floor(r() * 3)];
            pool = [...FILLERS, { title: "Сертификат", rarity: nominal >= 1500 ? 1 : 0, cert: { skin, nominal } }];
        }
        // Every tile shows up before any repeats and never next to its last copy; the gift itself sits at WIN.
        const recent = strip.slice(-4).map((item) => item.title);
        const fresh = pool.filter((item) => !recent.includes(item.title));
        const choices = fresh.length ? fresh : pool;
        const item = choices[Math.floor(r() * choices.length)];
        strip.push(item);
        pool.splice(pool.indexOf(item), 1);
    }
    return strip;
}

type Props = {
    cfg: GiftConfig;
    /** Increment to start a spin from outside (e.g. the hero button). */
    trigger?: number;
    onStart?: () => void;
    onDone: () => void;
    place: string;
    showButton?: boolean;
    /** Spin as soon as the reel is on screen (recipient view). */
    autoStart?: boolean;
};

export default function CaseReel({ cfg, trigger = 0, onStart, onDone, place, showButton = true, autoStart = false }: Props) {
    const reduce = useReducedMotion();
    const viewRef = useRef<HTMLDivElement>(null);
    const stripRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const [seed, setSeed] = useState(73);
    const [spinning, setSpinning] = useState(false);
    const [active, setActive] = useState(-1);
    const items = useMemo(() => buildStrip(seed), [seed]);
    const geo = useRef({ w: 0, step: 0, item: 0 });
    const spinsRef = useRef(0);

    // Highlight whichever slot is under the marker.
    useEffect(() => {
        return x.on("change", (v) => {
            const { w, step } = geo.current;
            if (!step) return;
            const idx = Math.floor((w / 2 - v) / step);
            setActive((prev) => (prev === idx ? prev : idx));
        });
    }, [x]);

    const spin = useCallback(async () => {
        if (spinning || !viewRef.current || !stripRef.current) return;
        const first = stripRef.current.children[0] as HTMLElement | undefined;
        const second = stripRef.current.children[1] as HTMLElement | undefined;
        if (!first || !second) return;

        spinsRef.current += 1;
        setSpinning(true);
        onStart?.();
        track("cert_drop_case_open", { place, spin: spinsRef.current });

        const w = viewRef.current.clientWidth;
        const item = first.offsetWidth;
        const step = second.offsetLeft - first.offsetLeft;
        geo.current = { w, step, item };

        x.set(0);
        const r = mulberry32(Date.now() & 0xffff);
        const jitter = (r() - 0.5) * item * 0.7;
        const target = -(WIN * step + item / 2 - w / 2) + jitter;

        await animate(x, target, reduce ? { duration: 0.9, ease: "easeOut" } : { duration: 5.4, ease: [0.1, 0.72, 0.12, 1] });
        await new Promise((res) => setTimeout(res, reduce ? 100 : 450));
        setSpinning(false);
        onDone();
    }, [spinning, onStart, onDone, place, reduce, x]);

    // External trigger: reshuffle the strip, then spin once it has rendered.
    const lastTrigger = useRef(trigger);
    useEffect(() => {
        if (trigger === lastTrigger.current) return;
        lastTrigger.current = trigger;
        setSeed((v) => v + 1);
        const id = window.setTimeout(() => spin(), 60);
        return () => window.clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger]);

    useEffect(() => {
        if (!autoStart) return;
        const id = window.setTimeout(() => spin(), 300);
        return () => window.clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoStart]);

    const onButton = () => {
        setSeed((v) => v + 1);
        window.setTimeout(() => spin(), 40);
    };

    return (
        <div className={`relative ${place === "demo" ? s.reelDemo : ""}`}>
            <div ref={viewRef} className={s.reel}>
                <span className={s.marker} aria-hidden />
                <motion.div ref={stripRef} className={s.reelStrip} style={{ x }} aria-hidden>
                    {items.map((it, i) => {
                        const isWin = i === WIN;
                        const rc = isWin ? rarityOf(cfg.nominal).color : RARITIES[it.rarity].color;
                        return (
                            <div
                                key={`${seed}-${i}`}
                                className={`${s.reelItem} ${!isWin && !it.cert ? s.reelPrize : ""} ${active === i ? s.reelItemActive : ""}`}
                                style={{ "--rc": rc } as React.CSSProperties}
                            >
                                {isWin ? (
                                    <MiniCert skin={cfg.skin} image={cfg.image} nominal={cfg.nominal} className={`${s.reelCert} h-full w-full`} />
                                ) : it.cert ? (
                                    <MiniCert skin={it.cert.skin} nominal={it.cert.nominal} className={`${s.reelCert} h-full w-full`} />
                                ) : (
                                    <>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={it.img} alt="" loading="lazy" decoding="async" className={s.reelImg} style={{ objectPosition: it.position }} />
                                        <span className={s.reelLabel}>{it.title}</span>
                                    </>
                                )}
                                <span className={s.reelBar} />
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            {showButton && (
                <div className="mt-6 flex justify-center px-4">
                    <button
                        type="button"
                        onClick={onButton}
                        disabled={spinning}
                        className={`${s.buy} inline-flex h-14 w-full max-w-[420px] items-center justify-center gap-2.5 rounded-2xl px-8 font-inter text-[17px] font-bold disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto`}
                    >
                        <Package className="h-5 w-5" aria-hidden />
                        {spinning ? "Крутим…" : "Открыть кейс"}
                    </button>
                </div>
            )}
            <p className="sr-only" aria-live="polite">
                {spinning ? "Кейс открывается" : ""}
            </p>
        </div>
    );
}
