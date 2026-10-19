"use client";

import React, { useRef } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { useSectionProgress } from "./useSectionProgress";

const tiers = [
    {
        icon: "😊",
        title: "Рад",
        price: "~ 1 000 ₽",
        text: "Лёгкий знак внимания, который поднимет настроение на весь вечер.",
        color: "#FF2E63",
    },
    {
        icon: "❤️",
        title: "Очень счастлив",
        price: "~ 3 000 ₽",
        text: "Отличный подарок! Хватит на долгую катку с друзьями в хорошем зале.",
        color: "#B900FF",
    },
    {
        icon: "👑",
        title: "Готов носить на руках",
        price: "от 5 000 ₽",
        text: "Максимальный восторг. VIP-обслуживание, лучшие консоли и полное погружение.",
        color: "#EAB308",
    },
];

const T_START = 0.08;
const T_END = 1.0;

function TierLayer({ p, tier, i, n }: { p: MotionValue<number>; tier: (typeof tiers)[0]; i: number; n: number }) {
    const seg = (T_END - T_START) / n;
    const c = T_START + (i + 0.5) * seg;

    const opacity = useTransform(p, [c - seg * 0.55, c - seg * 0.28, c + seg * 0.28, c + seg * 0.55], [0, 1, 1, 0]);
    const scale = useTransform(p, [c - seg * 0.5, c, c + seg * 0.5], [0.86, 1, 0.9]);
    const y = useTransform(p, [c - seg * 0.5, c, c + seg * 0.5], [80, 0, -70]);
    const rotateX = useTransform(p, [c - seg * 0.5, c, c + seg * 0.5], [10, 0, -8]);

    return (
        <motion.div style={{ opacity }} className="absolute inset-0 flex items-center justify-center px-6">
            <div style={{ perspective: "1400px" }}>
                <motion.div
                    style={{ scale, y, rotateX, transformStyle: "preserve-3d" }}
                    className="relative w-[86vw] max-w-md overflow-hidden rounded-[32px] border p-10 text-center backdrop-blur-md"
                >
                    {/* accent glow */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
                        style={{ background: tier.color }}
                    />
                    <div
                        aria-hidden
                        className="absolute inset-0 rounded-[32px] border"
                        style={{ borderColor: `${tier.color}55`, boxShadow: `0 30px 80px ${tier.color}22` }}
                    />
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="mb-6 text-6xl">{tier.icon}</div>
                        <h3 className="font-tactic italic uppercase font-black text-white text-3xl md:text-4xl tracking-wide">
                            {tier.title}
                        </h3>
                        <div className="mt-3 font-chakra font-black tracking-widest text-lg" style={{ color: tier.color }}>
                            {tier.price}
                        </div>
                        <p className="mt-5 max-w-xs font-inter text-slate-300">{tier.text}</p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function CertificateTiers() {
    const ref = useRef<HTMLElement>(null);
    const p = useSectionProgress(ref);
    const headerOpacity = useTransform(p, [0, 0.04, 0.9, 1], [0, 1, 1, 0.4]);
    const rail = useTransform(p, [0, 1], [0, 1]);

    return (
        <section ref={ref} className="relative h-[360vh] bg-[#050505]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(50% 40% at 50% 20%, rgba(185,0,255,0.14), transparent 70%), radial-gradient(45% 40% at 50% 95%, rgba(255,46,99,0.10), transparent 70%)",
                    }}
                />

                {/* Header */}
                <motion.div
                    style={{ opacity: headerOpacity }}
                    className="pointer-events-none absolute inset-x-0 top-[12vh] z-20 px-6 text-center"
                >
                    <span className="mb-4 inline-block rounded-full border border-[#B900FF]/30 bg-[#B900FF]/5 px-4 py-1.5 font-chakra text-[10px] font-black uppercase tracking-[0.3em] text-[#B900FF]">
                        Сколько подарить
                    </span>
                    <h2 className="font-tactic italic uppercase font-black text-white text-4xl md:text-6xl leading-[0.9]">
                        Путь к сердцу <br /> <span className="text-[#FF2E63]">мужчины</span>
                    </h2>
                </motion.div>

                {/* Tier cards */}
                {tiers.map((t, i) => (
                    <TierLayer key={t.title} p={p} tier={t} i={i} n={tiers.length} />
                ))}

                {/* Progress rail */}
                <div className="absolute bottom-24 left-0 right-0 z-40 px-6">
                    <div className="mx-auto h-[3px] w-full max-w-xs overflow-hidden rounded-full bg-white/10">
                        <motion.div
                            style={{ scaleX: rail }}
                            className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#B900FF] to-[#FF2E63]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
