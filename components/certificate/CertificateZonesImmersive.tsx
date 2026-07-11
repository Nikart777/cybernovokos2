"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useTransform, MotionValue } from "framer-motion";
import { Send } from "lucide-react";
import { useSectionProgress } from "./useSectionProgress";

const zones = [
    {
        name: "SOLO PREMIUM",
        subtitle: "Уединённый комфорт",
        desc: "Отдельная комната, где никто не будет мешать. Для тех, кто любит уходить в игру с головой.",
        tag: "Приватная комната",
        color: "#FF2E63",
        imgs: ["/zones/solo-premium-1.webp", "/zones/solo-premium-2.webp", "/zones/solo-premium-3.webp"],
    },
    {
        name: "SOLO PRO",
        subtitle: "Киберспорт-уровень",
        desc: "Всё для максимального комфорта и тишины. Высший уровень приватности для серьёзных игроков.",
        tag: "Про-периферия",
        color: "#00F0FF",
        imgs: ["/zones/solo-pro-1.webp", "/zones/solo-pro-2.webp", "/zones/solo-pro-3.webp"],
    },
    {
        name: "DUO ZONE",
        subtitle: "Играем вдвоём",
        desc: "Отдельный зал, чтобы прийти и поиграть с лучшим другом без посторонних.",
        tag: "2 места рядом",
        color: "#B900FF",
        imgs: ["/zones/duo-1.webp", "/zones/duo-2.webp", "/zones/duo-3.webp"],
    },
    {
        name: "VIP BOOTCAMP",
        subtitle: "Команда на 5 ПК",
        desc: "Закрытая комната на 5 компьютеров — если он играет своей проверенной командой.",
        tag: "5 ПК · закрыто",
        color: "#FF7A00",
        imgs: ["/zones/bootcamp-1.webp", "/zones/bootcamp-2.webp", "/zones/bootcamp-3.webp"],
    },
    {
        name: "PS5 LOUNGE",
        subtitle: "Зона PlayStation 5",
        desc: "Большой экран, мягкие диваны и любимые файтинги или футбол. Повод расслабиться.",
        tag: "PS5 · диваны",
        color: "#0072CE",
        imgs: ["/zones/ps5-1.webp", "/zones/ps5-2.webp", "/zones/ps5-3.webp"],
    },
    {
        name: "АВТОСИМУЛЯТОР",
        subtitle: "Полное погружение",
        desc: "Эмоции от вождения гоночного болида: адреналин, скорость и вибрация на руле.",
        tag: "Руль · педали",
        color: "#00F0FF",
        imgs: ["/zones/sim-1.webp", "/zones/sim-2.webp", "/zones/sim-3.webp"],
    },
    {
        name: "ОБЩИЙ ЗАЛ",
        subtitle: "База клуба",
        desc: "Рабочая лошадка киберспорта: огромный зал, крутая атмосфера и море эмоций в компании.",
        tag: "Атмосфера клуба",
        color: "#FF2E63",
        imgs: ["/zones/common-1.webp", "/zones/common-2.webp", "/zones/common-3.webp"],
    },
];

const Z_START = 0.05;
const Z_END = 1.0;

function hexToRgba(hex: string, a: number) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

function ZoneSlide({
    p,
    zone,
    i,
    n,
    telegramUrl,
    telegramText,
}: {
    p: MotionValue<number>;
    zone: (typeof zones)[0];
    i: number;
    n: number;
    telegramUrl: string;
    telegramText: string;
}) {
    const seg = (Z_END - Z_START) / n;
    const c = Z_START + (i + 0.5) * seg;

    const opacity = useTransform(p, [c - seg * 0.5, c - seg * 0.34, c + seg * 0.34, c + seg * 0.5], [0, 1, 1, 0]);
    const textX = useTransform(p, [c - seg * 0.44, c - seg * 0.2], [-44, 0]);
    const img0 = useTransform(p, [c - seg * 0.44, c - seg * 0.3], [0, 1]);
    const img0y = useTransform(p, [c - seg * 0.44, c - seg * 0.3], [40, 0]);
    const img1 = useTransform(p, [c - seg * 0.38, c - seg * 0.24], [0, 1]);
    const img1y = useTransform(p, [c - seg * 0.38, c - seg * 0.24], [40, 0]);
    const img2 = useTransform(p, [c - seg * 0.32, c - seg * 0.18], [0, 1]);
    const img2y = useTransform(p, [c - seg * 0.32, c - seg * 0.18], [40, 0]);

    const frame = "relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-2xl";

    return (
        <motion.div style={{ opacity }} className="absolute inset-0 flex items-center justify-center px-6">
            <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
                {/* Text */}
                <motion.div style={{ x: textX }} className="order-2 text-center lg:order-1 lg:text-left">
                    <span
                        className="mb-4 inline-block rounded-full border px-4 py-1.5 font-chakra text-[10px] font-black uppercase tracking-[0.25em]"
                        style={{ borderColor: hexToRgba(zone.color, 0.4), color: zone.color }}
                    >
                        {zone.tag}
                    </span>
                    <div className="mx-auto mb-4 h-1 w-16 rounded-full lg:mx-0" style={{ backgroundColor: zone.color }} />
                    <h3 className="font-tactic italic uppercase font-black text-white text-5xl md:text-6xl leading-[0.9]">
                        {zone.name}
                    </h3>
                    <p className="mt-2 font-chakra font-bold uppercase tracking-[0.3em] text-white/60 text-xs md:text-sm">
                        {zone.subtitle}
                    </p>
                    <p className="mx-auto mt-5 max-w-md font-inter text-base leading-relaxed text-slate-300 lg:mx-0">
                        {zone.desc}
                    </p>

                    <div className="mt-7 flex items-center justify-center gap-4 lg:justify-start">
                        <a
                            href={`${telegramUrl}?text=${telegramText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2.5 rounded-xl px-6 py-3 font-chakra italic font-black uppercase tracking-wide text-black transition-transform hover:scale-[1.04] active:scale-95"
                            style={{ backgroundColor: zone.color, boxShadow: `0 10px 30px ${hexToRgba(zone.color, 0.4)}` }}
                        >
                            <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            Оформить сюда
                        </a>
                        <span className="font-chakra text-[10px] uppercase tracking-[0.3em] text-white/35">
                            Зал {i + 1} / {n}
                        </span>
                    </div>
                </motion.div>

                {/* Image collage — full image (object-contain), aspect matched to photos */}
                <div className="order-1 grid grid-cols-2 gap-3 lg:order-2">
                    <motion.div style={{ opacity: img0, y: img0y }} className={`col-span-2 aspect-[16/9] ${frame}`}>
                        <Image src={zone.imgs[0]} alt={zone.name} fill className="object-contain" sizes="(max-width:1024px) 90vw, 45vw" />
                    </motion.div>
                    <motion.div style={{ opacity: img1, y: img1y }} className={`aspect-[16/11] ${frame}`}>
                        <Image src={zone.imgs[1]} alt={zone.name} fill className="object-contain" sizes="(max-width:1024px) 45vw, 22vw" />
                    </motion.div>
                    <motion.div style={{ opacity: img2, y: img2y }} className={`aspect-[16/11] ${frame}`}>
                        <Image src={zone.imgs[2]} alt={zone.name} fill className="object-contain" sizes="(max-width:1024px) 45vw, 22vw" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export default function CertificateZonesImmersive({
    telegramUrl,
    telegramText,
}: {
    telegramUrl: string;
    telegramText: string;
}) {
    const ref = useRef<HTMLElement>(null);
    const p = useSectionProgress(ref);
    const headerOpacity = useTransform(p, [0, 0.02, 0.05, 0.08], [1, 1, 1, 0]);
    const rail = useTransform(p, [0, 1], [0, 1]);

    return (
        <section ref={ref} className="relative h-[820vh] bg-[#050505]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(45% 40% at 15% 15%, rgba(0,240,255,0.08), transparent 70%), radial-gradient(45% 40% at 85% 85%, rgba(255,46,99,0.08), transparent 70%)",
                    }}
                />

                <motion.div
                    style={{ opacity: headerOpacity }}
                    className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
                >
                    <span className="mb-4 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/5 px-4 py-1.5 font-chakra text-[10px] font-black uppercase tracking-[0.3em] text-[#00F0FF]">
                        Залы клуба
                    </span>
                    <h2 className="font-tactic italic uppercase font-black text-white text-4xl md:text-6xl leading-[0.9]">
                        Где он будет играть
                    </h2>
                </motion.div>

                {zones.map((z, i) => (
                    <ZoneSlide key={z.name} p={p} zone={z} i={i} n={zones.length} telegramUrl={telegramUrl} telegramText={telegramText} />
                ))}

                <div className="absolute bottom-24 left-0 right-0 z-40 px-6">
                    <div className="mx-auto h-[3px] w-full max-w-xs overflow-hidden rounded-full bg-white/10">
                        <motion.div
                            style={{ scaleX: rail }}
                            className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#00F0FF] to-[#FF2E63]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
