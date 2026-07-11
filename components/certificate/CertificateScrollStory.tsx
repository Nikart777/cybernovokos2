"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "framer-motion";
import CertCard from "./CertCard";
import { useSectionProgress } from "./useSectionProgress";

/**
 * Intro of the certificate page: the 3D card reveal + value captions, flowing
 * into the "what is a CyberX certificate" explainer that logically leads into
 * the zones section that follows. No zones / no final CTA here anymore.
 */
export default function CertificateScrollStory() {
    const ref = useRef<HTMLElement>(null);
    const p = useSectionProgress(ref);

    // Card (intro)
    const cardOpacity = useTransform(p, [0, 0.52, 0.6], [1, 1, 0]);
    const rotateY = useTransform(p, [0, 0.5], [-46, 14]);
    const rotateX = useTransform(p, [0, 0.5], [12, -4]);
    const cardScale = useTransform(p, [0, 0.36, 0.56], [0.8, 1.05, 0.9]);
    const glareX = useTransform(p, [0, 0.5], ["-60%", "160%"]);

    const nominalMV = useTransform(p, [0.28, 0.48], [1000, 5000]);
    const [nominalText, setNominalText] = useState("1000");
    useEffect(() => {
        const fmt = new Intl.NumberFormat("ru-RU");
        const unsub = nominalMV.on("change", (v) => setNominalText(fmt.format(Math.round(v / 100) * 100)));
        return () => unsub();
    }, [nominalMV]);

    // Captions
    const capIntro = useTransform(p, [0.0, 0.14, 0.18], [1, 1, 0]);
    const capValue = useTransform(p, [0.18, 0.22, 0.32, 0.36], [0, 1, 1, 0]);
    const capNominal = useTransform(p, [0.36, 0.4, 0.5, 0.56], [0, 1, 1, 0]);
    const capIntroY = useTransform(p, [0, 0.18], [0, -40]);
    const capValueY = useTransform(p, [0.18, 0.36], [40, -40]);
    const capNominalY = useTransform(p, [0.36, 0.56], [40, -20]);

    // "Что такое CyberX" — fades in while the card fades out (no black gap)
    const cxOpacity = useTransform(p, [0.5, 0.6, 1, 1], [0, 1, 1, 1]);
    const cxY = useTransform(p, [0.5, 0.62], [50, 0]);

    return (
        <section ref={ref} className="relative h-[480vh] bg-[#050505]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(55% 45% at 50% 28%, rgba(255,46,99,0.16), transparent 70%), radial-gradient(45% 40% at 82% 88%, rgba(185,0,255,0.12), transparent 70%)",
                    }}
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "26px 26px" }}
                />

                {/* Intro captions */}
                <div className="pointer-events-none absolute inset-x-0 top-[15vh] z-20 px-6 text-center">
                    {/* Caption 1 */}
                    <motion.h1
                        style={{ opacity: capIntro, y: capIntroY }}
                        className="absolute inset-x-0 font-tactic italic uppercase font-black text-white text-[2.7rem] sm:text-6xl md:text-7xl leading-[0.9]"
                    >
                        Подарочный<br /><span className="text-[#FF2E63]">сертификат</span>
                    </motion.h1>
                    {/* Caption 2 */}
                    <motion.p
                        style={{ opacity: capValue, y: capValueY }}
                        className="absolute inset-x-0 mx-auto max-w-4xl font-tactic italic uppercase font-black text-white text-3xl md:text-5xl leading-tight"
                    >
                        В компьютерный клуб<br className="md:hidden" /> Cyber<span className="text-[#FF2E63]">X</span> Новокосино
                    </motion.p>
                    {/* Caption 3 */}
                    <motion.p
                        style={{ opacity: capNominal, y: capNominalY }}
                        className="absolute inset-x-0 font-tactic italic uppercase font-black text-white text-3xl md:text-5xl leading-tight"
                    >
                        Оригинальный <span className="text-[#FF2E63]">подарок</span>
                    </motion.p>
                </div>

                {/* 3D card */}
                <motion.div style={{ opacity: cardOpacity }} className="absolute inset-0 z-10 flex items-center justify-center">
                    <div style={{ perspective: "1400px" }}>
                        <motion.div
                            style={{ rotateY, rotateX, scale: cardScale, transformStyle: "preserve-3d" }}
                            className="relative aspect-[1.586/1] w-[80vw] max-w-[400px]"
                        >
                            <CertCard nominalText={nominalText} glareX={glareX} />
                        </motion.div>
                    </div>
                </motion.div>

                {/* "Что такое сертификат CyberX" — lead-in to the zones */}
                <motion.div
                    style={{ opacity: cxOpacity, y: cxY }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
                >
                    <span className="mb-4 rounded-full border border-[#FF2E63]/30 bg-[#FF2E63]/5 px-4 py-1.5 font-chakra text-[10px] font-black uppercase tracking-[0.3em] text-[#FF2E63]">
                        Как это работает
                    </span>
                    <h2 className="font-tactic italic uppercase font-black text-white text-4xl md:text-6xl leading-[0.9]">
                        Что такое <span className="text-[#FF2E63]">сертификат</span> CyberX?
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl font-inter text-lg leading-relaxed text-slate-300">
                        Не вещь, а <span className="font-semibold text-[#00F0FF]">уникальные эмоции</span>. Всю сумму
                        переведём на аккаунт получателя в приложении клуба — и он потратит её на любую из зон клуба.
                    </p>
                    <div className="mt-9 grid w-full max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
                        {[
                            { icon: "🖥️", label: "Любые зоны" },
                            { icon: "🎮", label: "PS5" },
                            { icon: "🏎️", label: "Автосимулятор" },
                            { icon: "🍫", label: "Бар и снеки" },
                        ].map((it) => (
                            <div
                                key={it.label}
                                className="group relative overflow-hidden rounded-2xl border border-yellow-500/40 bg-gradient-to-br from-yellow-500/[0.12] via-white/[0.03] to-transparent p-5 text-center shadow-[0_0_30px_rgba(234,179,8,0.12)]"
                            >
                                {/* legendary sheen */}
                                <div
                                    aria-hidden
                                    className="pointer-events-none absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-yellow-400/25 blur-2xl"
                                />
                                <div className="relative z-10 mb-2 text-4xl drop-shadow-[0_2px_12px_rgba(234,179,8,0.35)] md:text-5xl">
                                    {it.icon}
                                </div>
                                <div className="relative z-10 font-tactic italic uppercase font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 to-yellow-400 text-sm">
                                    {it.label}
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="mt-10 font-chakra text-[10px] uppercase tracking-[0.3em] text-white/40">
                        Куда потратить ↓
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
