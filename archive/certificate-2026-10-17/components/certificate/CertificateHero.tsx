"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import CertCard from "./CertCard";
import { useSectionProgress } from "./useSectionProgress";

export default function CertificateHero() {
    const ref = useRef<HTMLElement>(null);
    const p = useSectionProgress(ref);

    // Card 3D scrub — visible (angled) from the very first frame so the CTA and
    // headline stay above the fold while scrolling rewards with the reveal.
    const rotateY = useTransform(p, [0, 1], [-42, 16]);
    const rotateX = useTransform(p, [0, 0.5, 1], [12, 0, -6]);
    const scale = useTransform(p, [0, 0.5, 1], [0.86, 1.04, 1]);
    const glareX = useTransform(p, [0, 1], ["-60%", "160%"]);

    // Headline settles up slightly; never fully hidden.
    const headlineY = useTransform(p, [0, 1], [0, -40]);
    const headlineOpacity = useTransform(p, [0, 0.7, 1], [1, 1, 0.35]);

    // Nominal climbs 1000 → 5000 as the card turns to face us.
    const nominal = useTransform(p, [0.1, 0.85], [1000, 5000]);
    const [nominalText, setNominalText] = useState("1000");
    useEffect(() => {
        const fmt = new Intl.NumberFormat("ru-RU");
        const unsub = nominal.on("change", (v) => setNominalText(fmt.format(Math.round(v / 100) * 100)));
        return () => unsub();
    }, [nominal]);

    const scrollToCalc = () => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });

    return (
        <section ref={ref} className="relative h-[230vh] bg-[#050505]">
            <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden pt-[90px]">
                {/* Static ambient wash — no infinite animation */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(60% 50% at 50% 30%, rgba(255,46,99,0.18), transparent 70%), radial-gradient(50% 40% at 80% 90%, rgba(185,0,255,0.12), transparent 70%)",
                    }}
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "26px 26px" }}
                />

                {/* Headline */}
                <motion.div
                    style={{ y: headlineY, opacity: headlineOpacity }}
                    className="relative z-10 px-6 text-center"
                >
                    <span className="mb-4 inline-block rounded-full bg-black px-4 py-1.5 font-chakra text-[10px] font-bold uppercase tracking-[0.25em] text-white md:text-xs">
                        Оригинальный подарок
                    </span>
                    <h1 className="font-tactic italic uppercase font-black leading-[0.9] tracking-tight text-white text-[2.6rem] sm:text-6xl md:text-7xl">
                        Подарочный<br />
                        <span className="text-[#FF2E63]">сертификат</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-md font-inter text-sm text-slate-300 md:text-base">
                        Подари эмоции, а не вещь. Выбирай номинал и оформляй онлайн.
                    </p>
                </motion.div>

                {/* 3D card */}
                <div className="relative z-10 mt-8" style={{ perspective: "1400px" }}>
                    <motion.div
                        style={{ rotateY, rotateX, scale, transformStyle: "preserve-3d" }}
                        className="relative aspect-[1.586/1] w-[80vw] max-w-[400px]"
                    >
                        <CertCard nominalText={nominalText} glareX={glareX} />
                    </motion.div>
                </div>

                {/* CTA — always visible */}
                <div className="relative z-10 mt-8">
                    <button
                        onClick={scrollToCalc}
                        className="group flex items-center gap-3 rounded-full bg-white px-7 py-3.5 font-tactic italic font-black uppercase tracking-widest text-black transition-transform hover:scale-105 active:scale-95 md:text-lg"
                    >
                        Выбрать номинал
                        <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
