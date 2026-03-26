'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { MousePointer2, Zap, Trophy, Smartphone } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const stats = [
    { label: 'Мощных ПК', value: '40+', icon: MousePointer2, color: '#FF2E63' },
    { label: 'FPS в играх', value: '400+', icon: Zap, color: '#00F0FF' },
    { label: 'Турниров', value: '100+', icon: Trophy, color: '#B900FF' },
];

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] pt-20">
            {/* Background with priority Next/Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/main.webp"
                    alt="Интерьер компьютерного клуба CyberX Новокосино - игровые зоны и мощные ПК"
                    fill
                    priority
                    className="object-cover opacity-40 mix-blend-luminosity scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
            </div>

            {/* Animated Elements */}
            <motion.div style={{ y: y1 }} className="absolute top-1/4 left-10 w-64 h-64 bg-[#FF2E63]/10 blur-[120px] rounded-full" />
            <motion.div style={{ y: y2 }} className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#00F0FF]/10 blur-[150px] rounded-full" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-tactic font-black text-4xl md:text-8xl uppercase leading-[0.9] tracking-normal text-white mb-6 italic"
                    >
                        <span className="block text-xl md:text-5xl mb-2 md:mb-4">НОВОКОСИНО</span>
                        <span className="block text-2xl md:text-6xl mb-2 md:mb-4">КОМПЬЮТЕРНЫЙ КЛУБ</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] via-[#B900FF] to-[#00F0FF] drop-shadow-[0_0_30px_rgba(255,46,99,0.3)]">
                            CYBER<span className="text-[#FF2E63]">X</span>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-chakra font-bold text-sm md:text-lg text-white/60 max-w-xl mb-8 md:mb-10 uppercase tracking-wide leading-relaxed mx-auto"
                    >
                        Топовый киберклуб в Новокосино: мощные ПК с RTX 5070, мониторы 400Hz и PS5 Lounge. Твой лучший киберспортивный опыт в Москве 24/7.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mb-10"
                    >
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
                            className="group relative flex items-center gap-3 bg-[#FF2E63] px-10 py-4 rounded-full font-chakra font-black text-sm uppercase tracking-[0.2em] transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,46,99,0.5)] active:scale-95 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Smartphone size={18} className="group-hover:rotate-12 transition-transform" />
                                Забронировать место
                            </span>
                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)' }} />
                        </button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        className="grid grid-cols-3 gap-6 md:gap-12 border-t border-white/5 pt-6 md:pt-8 w-full max-w-2xl"
                    >
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-2 md:gap-3 group">
                                <div
                                    className="p-2 md:p-3 rounded-xl md:rounded-2xl transition-all group-hover:scale-110"
                                    style={{ backgroundColor: `${stat.color}10`, color: stat.color }}
                                >
                                    <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <div className="text-center">
                                    <div className="font-tactic font-black text-lg md:text-xl text-white">{stat.value}</div>
                                    <div className="font-chakra font-bold text-[8px] md:text-[9px] uppercase text-white/30 tracking-[0.2em]">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Parallax Watermark */}
            <motion.div
                style={{ y: y1 }}
                className="absolute bottom-[-10%] right-[-5%] font-tactic font-black text-[20vw] leading-none text-white/[0.02] uppercase italic pointer-events-none select-none z-0"
            >
                CYBERX
            </motion.div>

        </section>
    );
}
