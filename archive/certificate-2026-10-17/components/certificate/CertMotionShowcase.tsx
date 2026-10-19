"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Gamepad2 } from "lucide-react";

/**
 * Scroll-scrub showcase (twinbru-style), adapted to CyberX's real product.
 *
 * A tall section pins to the viewport; a single `progress` value (0→1) is driven
 * by a plain scroll listener + the section's own position — NOT framer's internal
 * scroll source, which proved unreliable on this project. Everything else
 * (3D rotation, glare sweep, nominal counter, captions) is a `useTransform` of
 * that spring-smoothed progress. No 3rd-party libs, no pre-rendered frames.
 */
export default function CertMotionShowcase() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const progress = useMotionValue(0);
    const p = useSpring(progress, { damping: 30, stiffness: 180, mass: 0.5 });

    useEffect(() => {
        const onScroll = () => {
            const el = sectionRef.current;
            if (!el) return;
            const total = el.offsetHeight - window.innerHeight;
            const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), Math.max(total, 0));
            progress.set(total > 0 ? scrolled / total : 0);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [progress]);

    // --- Card 3D choreography ---------------------------------------------
    const rotateY = useTransform(p, [0, 0.6, 1], [-118, 10, 20]);
    const rotateX = useTransform(p, [0, 0.5, 1], [16, 0, -8]);
    const scale = useTransform(p, [0, 0.45, 1], [0.62, 1.06, 0.96]);
    const cardY = useTransform(p, [0, 0.45, 1], [60, 0, -40]);
    const cardOpacity = useTransform(p, [0, 0.08], [0, 1]);
    const glowOpacity = useTransform(p, [0, 0.4, 1], [0.15, 0.55, 0.35]);
    // Specular light sweep travelling across the card.
    const glareX = useTransform(p, [0, 1], ["-60%", "160%"]);

    // --- Nominal counter (1000 → 5000, rendered as text) -------------------
    const nominal = useTransform(p, [0.12, 0.9], [1000, 5000]);
    const [nominalText, setNominalText] = useState("1000");
    useEffect(() => {
        const fmt = new Intl.NumberFormat("ru-RU");
        const unsub = nominal.on("change", (v) => setNominalText(fmt.format(Math.round(v / 100) * 100)));
        return () => unsub();
    }, [nominal]);

    // --- Stage captions ----------------------------------------------------
    const cap1 = useTransform(p, [0.0, 0.06, 0.26, 0.32], [0, 1, 1, 0]);
    const cap2 = useTransform(p, [0.34, 0.4, 0.6, 0.66], [0, 1, 1, 0]);
    const cap3 = useTransform(p, [0.68, 0.74, 1, 1], [0, 1, 1, 1]);
    const cap1y = useTransform(p, [0.0, 0.32], [30, -30]);
    const cap2y = useTransform(p, [0.34, 0.66], [30, -30]);
    const cap3y = useTransform(p, [0.68, 1], [30, 0]);

    const rail = useTransform(p, [0, 1], [0, 1]);

    return (
        <section ref={sectionRef} className="relative h-[320vh] bg-[#050505]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Ambient glow (single element, follows progress — cheap) */}
                <motion.div
                    aria-hidden
                    style={{ opacity: glowOpacity }}
                    className="pointer-events-none absolute h-[560px] w-[560px] rounded-full bg-[#FF2E63] blur-[120px]"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                        backgroundSize: "26px 26px",
                    }}
                />

                {/* Stage captions (stacked, cross-fading) */}
                <div className="pointer-events-none absolute top-[12vh] left-0 right-0 z-20 px-6 text-center">
                    <motion.p
                        style={{ opacity: cap1, y: cap1y }}
                        className="absolute inset-x-0 font-tactic italic uppercase font-black text-3xl md:text-5xl text-white leading-tight"
                    >
                        Подарок — не вещь,<br className="hidden md:block" /> а вечер в клубе
                    </motion.p>
                    <motion.p
                        style={{ opacity: cap2, y: cap2y }}
                        className="absolute inset-x-0 font-tactic italic uppercase font-black text-3xl md:text-5xl text-white leading-tight"
                    >
                        Выбери <span className="text-[#FF2E63]">номинал</span>
                    </motion.p>
                    <motion.p
                        style={{ opacity: cap3, y: cap3y }}
                        className="absolute inset-x-0 font-tactic italic uppercase font-black text-3xl md:text-5xl text-white leading-tight"
                    >
                        Пополним аккаунт —<br className="hidden md:block" /> играй где хочешь
                    </motion.p>
                </div>

                {/* The 3D card */}
                <div className="relative z-10" style={{ perspective: "1400px" }}>
                    <motion.div
                        style={{
                            rotateY,
                            rotateX,
                            scale,
                            y: cardY,
                            opacity: cardOpacity,
                            transformStyle: "preserve-3d",
                        }}
                        className="relative w-[86vw] max-w-[460px] aspect-[1.586/1]"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-[26px] border border-white/15 bg-gradient-to-br from-[#1A0A0E] via-[#2A0815] to-[#0A0205] shadow-[0_30px_80px_rgba(255,46,99,0.35)] flex flex-col justify-between p-6 md:p-8">
                            {/* subtle carbon texture */}
                            <div
                                className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                                style={{
                                    backgroundImage:
                                        "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 5px)",
                                }}
                            />
                            {/* Big decorative X */}
                            <div className="absolute -top-10 -right-6 text-[130px] font-tactic italic leading-none text-[#FF2E63]/10 pointer-events-none select-none">
                                X
                            </div>

                            {/* Header */}
                            <div className="relative z-10 flex items-start justify-between">
                                <div className="flex flex-col">
                                    <img src="/logo new.png" alt="CyberX" className="h-5 w-auto object-contain mb-1" />
                                    <span className="font-tactic italic uppercase text-white/70 text-[8px] md:text-[9px] tracking-[0.2em]">
                                        Подарочный сертификат
                                    </span>
                                </div>
                                <div className="rounded-xl border border-white/20 bg-white/10 p-2 backdrop-blur-md">
                                    <Gamepad2 className="h-6 w-6 text-[#FF2E63]" />
                                </div>
                            </div>

                            {/* Nominal */}
                            <div className="relative z-10 flex flex-grow flex-col items-center justify-center py-2">
                                <div className="flex items-baseline font-tactic italic font-black leading-none tracking-tighter drop-shadow-[0_0_20px_rgba(255,46,99,0.45)]">
                                    <span className="text-[3.4rem] md:text-[4.6rem] text-white tabular-nums">{nominalText}</span>
                                    <span className="ml-1 text-[2rem] md:text-[2.6rem] text-[#FF2E63]">₽</span>
                                </div>
                                <div className="mt-2 font-chakra font-bold uppercase tracking-[0.28em] text-white/85 text-[9px] md:text-xs">
                                    CyberX Novokosino
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="relative z-10 flex items-end justify-between">
                                <div className="flex flex-col">
                                    <span className="font-chakra uppercase tracking-widest text-white/45 text-[8px] md:text-[10px]">
                                        Valid for all zones
                                    </span>
                                    <span className="font-chakra uppercase tracking-[0.2em] font-bold text-white/80 text-[10px] md:text-xs">
                                        No. 0001
                                    </span>
                                </div>
                                <div className="h-7 w-11 overflow-hidden rounded-md border border-white/30 bg-gradient-to-br from-yellow-200/25 via-yellow-500/25 to-yellow-700/25 flex flex-col justify-evenly px-1">
                                    <div className="h-px w-full bg-white/30" />
                                    <div className="h-px w-full bg-white/30" />
                                </div>
                            </div>

                            {/* Specular glare sweep */}
                            <motion.div
                                aria-hidden
                                style={{ x: glareX }}
                                className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Progress rail + scroll hint */}
                <div className="absolute bottom-10 left-0 right-0 z-20 flex flex-col items-center gap-3 px-6">
                    <div className="h-[3px] w-full max-w-xs overflow-hidden rounded-full bg-white/10">
                        <motion.div
                            style={{ scaleX: rail }}
                            className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#00F0FF] to-[#FF2E63]"
                        />
                    </div>
                    <span className="font-chakra uppercase tracking-[0.3em] text-white/40 text-[10px]">
                        Листай вниз
                    </span>
                </div>
            </div>
        </section>
    );
}
