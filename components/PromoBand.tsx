"use client";

import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";

const lines = [
    "RTX 5070 SUPER • 400Hz МОНИТОРЫ • PS5 LOUNGE",
    "24/7 NONSTOP • ТУРНИРЫ КАЖДУЮ НЕДЕЛЮ • CYBER ARENA",
];

export default function PromoBand() {
    return (
        <section
            className="relative w-full py-5 overflow-hidden cursor-pointer group"
            onClick={() => window.dispatchEvent(new CustomEvent("open-booking"))}
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E63] via-[#B900FF] to-[#FF2E63] animate-gradient-xy opacity-95 transition-all duration-300 group-hover:opacity-100" />

            {/* Row 1 */}
            <div className="relative z-10 flex items-center overflow-hidden mb-1">
                <motion.div
                    className="flex items-center gap-8 whitespace-nowrap"
                    animate={{ x: [0, -1200] }}
                    transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                >
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <Gamepad2 className="w-5 h-5 md:w-7 md:h-7 text-white/80" />
                            <span className="font-tactic font-black text-lg md:text-3xl text-white uppercase italic tracking-wide">
                                {lines[0]}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Row 2 — reverse direction */}
            <div className="relative z-10 flex items-center overflow-hidden">
                <motion.div
                    className="flex items-center gap-8 whitespace-nowrap"
                    animate={{ x: [-1200, 0] }}
                    transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
                >
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <span className="font-tactic font-black text-lg md:text-3xl text-white/60 uppercase italic tracking-wide">
                                {lines[1]}
                            </span>
                            <span className="text-white/40 text-lg">⚡</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            <style jsx global>{`
                @keyframes gradient-xy {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-xy {
                    background-size: 200% 200%;
                    animation: gradient-xy 6s ease infinite;
                }
            `}</style>
        </section>
    );
}
