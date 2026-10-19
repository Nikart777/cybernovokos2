"use client";

import React, { forwardRef, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Gift, Link2 } from "lucide-react";
import s from "./drop.module.css";
import { digitGroups, mulberry32, track } from "./model";

/* ── Primary action: open the checkout ───────────────────────────────── */

type BuyProps = {
    nominal: number;
    place: string;
    onBuy: (place: string) => void;
    size?: "sm" | "md" | "lg";
    label?: string;
    withPrice?: boolean;
    className?: string;
};

export const BuyButton = forwardRef<HTMLButtonElement, BuyProps>(function BuyButton(
    { nominal, place, onBuy, size = "md", label = "Оформить", withPrice = true, className = "" },
    ref,
) {
    const sizes = {
        sm: "h-11 px-4 text-[14px] gap-2 rounded-xl",
        md: "h-14 px-6 text-[16px] gap-2.5 rounded-2xl",
        lg: "h-16 px-8 text-[17px] sm:text-[18px] gap-3 rounded-2xl",
    };
    return (
        <button
            ref={ref}
            type="button"
            onClick={() => {
                track("cert_drop_buy_open", { place, nominal });
                onBuy(place);
            }}
            className={`${s.buy} inline-flex items-center justify-center font-inter font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0a1c] ${sizes[size]} ${className}`}
        >
            <Gift className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} aria-hidden />
            <span>
                {label}
                {withPrice && (
                    <span className="font-semibold opacity-90">
                        {" "}за {digitGroups(nominal).join(" ")}&nbsp;₽
                    </span>
                )}
            </span>
        </button>
    );
});

/* ── Copy (or share on phones) a link ────────────────────────────────── */

export function CopyLink({
    url,
    label,
    doneLabel = "Ссылка скопирована",
    goal,
    className = "",
    icon = "link",
}: {
    url: string;
    label: string;
    doneLabel?: string;
    goal?: string;
    className?: string;
    icon?: "link" | "copy";
}) {
    const [done, setDone] = useState(false);
    const copy = async () => {
        if (goal) track(goal);
        const absolute = url.startsWith("http") ? url : `${window.location.origin}${url}`;
        try {
            if (icon === "link" && navigator.share && window.matchMedia("(pointer: coarse)").matches) {
                await navigator.share({ title: "Тебе подарок в CyberX", url: absolute });
                return;
            }
            await navigator.clipboard.writeText(absolute);
        } catch {
            window.prompt("Скопируйте", absolute);
            return;
        }
        setDone(true);
        window.setTimeout(() => setDone(false), 2200);
    };
    const Icon = icon === "copy" ? Copy : Link2;
    return (
        <button
            type="button"
            onClick={copy}
            className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 font-inter text-[15px] font-semibold text-white transition-colors hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${className}`}
        >
            {done ? <Check className="h-4 w-4 text-[#7CF5FF]" aria-hidden /> : <Icon className="h-4 w-4" aria-hidden />}
            <span aria-live="polite">{done ? doneLabel : label}</span>
        </button>
    );
}

/* ── Confetti burst for the reveal ───────────────────────────────────── */

export function Burst({ colors, seed = 7, count = 64 }: { colors: string[]; seed?: number; count?: number }) {
    const reduce = useReducedMotion();
    const parts = useMemo(() => {
        const r = mulberry32(seed);
        return Array.from({ length: count }, (_, i) => ({
            x: (r() - 0.5) * 1100,
            up: -(r() * 380 + 140),
            fall: r() * 520 + 320,
            rot: (r() - 0.5) * 900,
            w: 6 + r() * 9,
            round: r() > 0.6,
            color: colors[i % colors.length],
            delay: r() * 0.15,
            dur: 1.7 + r() * 1.1,
        }));
    }, [seed, count, colors]);

    if (reduce) return null;
    return (
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[1]" aria-hidden>
            {parts.map((p, i) => (
                <motion.span
                    key={i}
                    style={{
                        position: "absolute",
                        width: p.w,
                        height: p.round ? p.w : p.w * 0.42,
                        background: p.color,
                        borderRadius: p.round ? "50%" : 2,
                    }}
                    initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.4 }}
                    animate={{ x: p.x, y: [0, p.up, p.up + p.fall], opacity: [1, 1, 0], rotate: p.rot, scale: 1 }}
                    transition={{
                        default: { duration: p.dur, delay: p.delay, ease: [0.15, 0.7, 0.3, 1] },
                        y: { duration: p.dur, delay: p.delay, times: [0, 0.32, 1], ease: ["easeOut", "easeIn"] },
                        opacity: { duration: p.dur, delay: p.delay, times: [0, 0.7, 1] },
                    }}
                />
            ))}
        </div>
    );
}

export const CONFETTI = ["#7CF5FF", "#B98CFF", "#FF8AD8", "#FFE68A", "#FF2E63", "#FFFFFF"];
