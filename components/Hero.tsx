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
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] pt-20">
            {/* Background with priority Next/Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/main.webp"
                    alt="CyberX Novokosino Interior"
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
                <div className="max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6 flex items-center gap-3"
                    >
                        <span className="h-[2px] w-12 bg-[#FF2E63]" />
                        <span className="font-chakra font-black text-[#FF2E63] uppercase tracking-[0.4em] text-xs md:text-sm">
                            Лучший компьютерный клуб в Новокосино
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-tactic font-black text-5xl md:text-9xl uppercase leading-[0.85] tracking-tighter text-white mb-8 italic"
                    >
                        ИГРАЙ <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] via-[#B900FF] to-[#00F0FF] drop-shadow-[0_0_30px_rgba(255,46,99,0.3)]">
                            В КИБЕРКЛУБЕ
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-chakra font-bold text-lg md:text-2xl text-white/60 max-w-2xl mb-12 uppercase tracking-wide leading-relaxed"
                    >
                        Топовый киберклуб в Новокосино: мощные ПК с RTX 5070, мониторы 400Hz и PS5 Lounge. Твой лучший киберспортивный опыт в Москве 24/7.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-6 mb-20"
                    >
                        <Link
                            href="/prices"
                            className="group relative px-10 py-5 bg-[#FF2E63] overflow-hidden rounded-2xl transition-all hover:scale-105 active:scale-95"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            <span className="relative z-10 font-tactic font-black text-lg uppercase italic tracking-wider text-white">Выбрать тариф</span>
                        </Link>
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
                            className="flex items-center justify-center gap-3 px-10 py-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-tactic font-black text-lg uppercase italic tracking-wider text-white"
                        >
                            <Smartphone size={24} className="text-[#00F0FF]" />
                            Приложение
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.8 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/5 pt-12"
                    >
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex items-center gap-4 group">
                                <div
                                    className="p-4 rounded-2xl transition-all group-hover:scale-110"
                                    style={{ backgroundColor: `${stat.color}10`, color: stat.color }}
                                >
                                    <stat.icon size={28} />
                                </div>
                                <div>
                                    <div className="font-tactic font-black text-2xl text-white">{stat.value}</div>
                                    <div className="font-chakra font-bold text-[10px] uppercase text-white/30 tracking-[0.2em]">{stat.label}</div>
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

            {/* Scroll indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="font-chakra text-[10px] uppercase font-bold text-white/20 tracking-[0.3em]">Листай вниз</span>
                <div className="w-[2px] h-12 bg-gradient-to-b from-[#FF2E63] to-transparent" />
            </motion.div>
        </section>
    );
}
