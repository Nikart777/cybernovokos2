"use client";

import React from "react";
import { motion, MotionValue } from "framer-motion";
import { Gamepad2 } from "lucide-react";

/**
 * Pure presentational CyberX gift card. No motion logic of its own — the
 * parent drives 3D rotation/scale on its wrapper. `nominalText` is the
 * (already formatted) value shown; `glareX` optionally animates the specular
 * sweep. Deliberately free of infinite CSS animations.
 */
export default function CertCard({
    nominalText,
    glareX,
}: {
    nominalText: string;
    glareX?: MotionValue<string>;
}) {
    return (
        <div className="relative h-full w-full overflow-hidden rounded-[26px] border border-white/15 bg-gradient-to-br from-[#1A0A0E] via-[#2A0815] to-[#0A0205] shadow-[0_30px_80px_rgba(255,46,99,0.35)] flex flex-col justify-between p-6 md:p-8">
            {/* carbon texture */}
            <div
                aria-hidden
                className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 5px)",
                }}
            />
            <div
                aria-hidden
                className="absolute -top-10 -right-6 text-[130px] font-tactic italic leading-none text-[#FF2E63]/10 pointer-events-none select-none"
            >
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

            {/* Specular glare sweep (only if driven) */}
            {glareX && (
                <motion.div
                    aria-hidden
                    style={{ x: glareX }}
                    className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                />
            )}
        </div>
    );
}
