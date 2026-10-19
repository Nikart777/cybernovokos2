"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import CertCard from "./CertCard";

export default function CertificateAbout({ telegramUrl, telegramText }: { telegramUrl: string; telegramText: string }) {
    return (
        <section className="relative z-10 w-full overflow-hidden px-4 py-20 md:px-6 md:py-28">
            {/* Static ambient wash — replaces the old pulsing blur blobs */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(45% 45% at 15% 20%, rgba(0,240,255,0.10), transparent 70%), radial-gradient(45% 45% at 85% 85%, rgba(185,0,255,0.10), transparent 70%)",
                }}
            />

            <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                {/* Text */}
                <div className="space-y-7 text-center lg:col-span-7 lg:text-left">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6 }}
                        className="font-tactic italic uppercase font-black leading-[0.95] text-white text-4xl md:text-6xl"
                    >
                        Что такое <br /> <span className="text-[#FF2E63]">сертификат</span> CyberX?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="mx-auto max-w-2xl font-inter text-lg leading-relaxed text-slate-300 lg:mx-0"
                    >
                        Это не вещь, а <span className="font-semibold text-[#00F0FF]">уникальные эмоции</span>. Мы переведём
                        всю сумму на аккаунт получателя в приложении клуба — и он потратит её на что захочет.
                    </motion.p>

                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:mx-0">
                        {[
                            {
                                emoji: "🖥️🎮🏎️",
                                title: "Любые игровые зоны",
                                text: "Мощные ПК, зона PS5 или адреналиновый автосимулятор.",
                                accent: "border-white/10",
                            },
                            {
                                emoji: "🥤🍫⚡",
                                title: "Бар, снеки, напитки",
                                text: "В стоимость входят энергетики, шоколадки и напитки в баре.",
                                accent: "border-[#00F0FF]/30",
                            },
                        ].map((c, i) => (
                            <motion.div
                                key={c.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                                className={`rounded-2xl border ${c.accent} bg-white/[0.04] p-5`}
                            >
                                <div className="mb-3 text-2xl">{c.emoji}</div>
                                <h4 className="mb-1 font-tactic italic uppercase tracking-wide text-white text-sm">{c.title}</h4>
                                <p className="font-inter text-xs leading-relaxed text-slate-400">{c.text}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="pt-2">
                        <a
                            href={`${telegramUrl}?text=${telegramText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#FF2E63] to-[#B900FF] px-9 py-4 font-chakra italic font-black uppercase text-white shadow-[0_10px_30px_rgba(255,46,99,0.35)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
                        >
                            <Send className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            Оформить в Telegram
                        </a>
                    </div>
                </div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex justify-center lg:col-span-5"
                    style={{ perspective: "1400px" }}
                >
                    <div className="relative aspect-[1.586/1] w-full max-w-[420px]">
                        <div className="absolute inset-0 rounded-[26px] bg-[#FF2E63] opacity-30 blur-2xl" aria-hidden />
                        <div className="relative h-full w-full">
                            <CertCard nominalText="3 000" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
