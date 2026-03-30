'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { MousePointer2, Zap, Trophy, Smartphone, ChevronRight, Gamepad2, Crown, Target } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const stats = [
    { label: 'Мощных ПК', value: '40+', icon: MousePointer2, color: '#FF2E63' },
    { label: 'FPS в играх', value: '400+', icon: Zap, color: '#00F0FF' },
    { label: 'Турниров', value: '100+', icon: Trophy, color: '#B900FF' },
];

// Animated grid background component
function GridBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Primary grid */}
            <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />
            {/* Secondary finer grid */}
            <div 
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                }}
            />
        </div>
    );
}

// Floating tech elements
function TechElements() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#FF2E63]/20" />
            <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#00F0FF]/20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[#B900FF]/20" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#FF2E63]/20" />
            
            {/* Decorative lines */}
            <motion.div 
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/4 left-0 w-px h-24 bg-gradient-to-b from-transparent via-[#00F0FF]/30 to-transparent"
            />
            <motion.div 
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute top-1/3 right-0 w-px h-32 bg-gradient-to-b from-transparent via-[#FF2E63]/30 to-transparent"
            />
        </div>
    );
}

// Animated badge component
function HeroBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm mb-8"
        >
            <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F0FF]"></span>
            </span>
            <span className="font-chakra font-bold text-[10px] text-white/70 tracking-[0.2em] uppercase">
                CyberX Novokosino
            </span>
            <div className="w-px h-3 bg-white/10" />
            <span className="font-chakra font-bold text-[10px] text-[#00F0FF] tracking-wider uppercase">
                Online
            </span>
        </motion.div>
    );
}

// Main title with staggered animation
function HeroTitle() {
    const words = [
        { text: 'НОВОКОСИНО', color: 'text-white' },
        { text: 'КОМПЬЮТЕРНЫЙ', color: 'text-white/80' },
        { text: 'КЛУБ', color: 'text-[#FF2E63]' },
    ];

    return (
        <div className="mb-6">
            {words.map((word, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className={`font-tactic font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-[0.85] tracking-tight italic ${word.color}`}
                >
                    {word.text}
                </motion.div>
            ))}
            
            {/* CYBERX gradient text */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative mt-4"
            >
                <span className="font-tactic font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase leading-none tracking-tight italic text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] via-[#B900FF] to-[#00F0FF] drop-shadow-[0_0_60px_rgba(255,46,99,0.5)]">
                    CYBER<span className="text-white">X</span>
                </span>
                {/* Glow effect behind */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-[#FF2E63]/20 via-[#B900FF]/20 to-[#00F0FF]/20 blur-3xl -z-10" />
            </motion.div>
        </div>
    );
}

// Subtitle with typewriter effect simulation
function HeroSubtitle() {
    return (
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="font-inter text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed"
        >
            Топовый киберклуб в Москве:{' '}
            <span className="text-white font-semibold border-b border-[#00F0FF]/30">RTX 5070</span>,{' '}
            мониторы <span className="text-white font-semibold border-b border-[#00F0FF]/30">400 Гц</span>,{' '}
            приватные VIP комнаты и профессиональный автосимулятор.{' '}
            <span className="text-[#00F0FF] font-semibold">Работаем 24/7</span>.
        </motion.p>
    );
}

// CTA Buttons with enhanced effects
function HeroButtons({ onBook }: { onBook: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full sm:w-auto"
        >
            {/* Primary button */}
            <button
                onClick={onBook}
                className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-gradient-to-r from-[#FF2E63] to-[#FF2E63]/90 px-10 py-5 font-chakra font-black text-sm uppercase tracking-[0.25em] text-white transition-all duration-500 hover:shadow-[0_0_60px_rgba(255,46,99,0.6)] hover:scale-105 active:scale-95"
            >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {/* Inner glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/20 to-transparent" />
                
                <span className="relative z-10 flex items-center justify-center gap-3">
                    <Smartphone size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                    Забронировать
                </span>
            </button>
            
            {/* Secondary button */}
            <a
                href="/prices"
                className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white/[0.02] border border-white/[0.08] font-chakra font-black text-sm uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.15] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:text-white"
            >
                Цены
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
        </motion.div>
    );
}

// Stats with enhanced animations
function HeroStats() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="relative"
        >
            {/* Top border line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="grid grid-cols-3 gap-4 md:gap-12 pt-8 w-full max-w-2xl">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        className="flex flex-col items-center gap-3 group cursor-default"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                        {/* Icon with glow */}
                        <div className="relative">
                            <div 
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ 
                                    backgroundColor: stat.color,
                                    filter: 'blur(20px)',
                                }}
                            />
                            <div
                                className="relative p-3 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                style={{ backgroundColor: `${stat.color}15` }}
                            >
                                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                            </div>
                        </div>
                        
                        {/* Text */}
                        <div className="text-center">
                            <motion.div 
                                className="font-tactic font-black text-2xl md:text-3xl text-white"
                                whileHover={{ scale: 1.1 }}
                            >
                                {stat.value}
                            </motion.div>
                            <div className="font-chakra font-bold text-[9px] uppercase text-white/40 tracking-[0.2em] mt-1">
                                {stat.label}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            {/* Bottom border line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>
    );
}

export default function HeroNew() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });
    
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set((e.clientX / window.innerWidth - 0.5) * 40);
            mouseY.set((e.clientY / window.innerHeight - 0.5) * 40);
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const openBooking = () => {
        window.dispatchEvent(new CustomEvent('open-booking'));
    };

    return (
        <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030303] pt-20">
            {/* Scroll progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF2E63] via-[#B900FF] to-[#00F0FF] origin-left z-[100]"
                style={{ scaleX }}
            />

            {/* Background Image with enhanced parallax */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    style={{
                        x: useSpring(mouseX, { stiffness: 50, damping: 20 }),
                        y: useSpring(mouseY, { stiffness: 50, damping: 20 }),
                    }}
                    className="absolute inset-0"
                >
                    <Image
                        src="/main.webp"
                        alt="Интерьер компьютерного клуба CyberX Новокосино"
                        fill
                        priority
                        className="object-cover opacity-20 mix-blend-luminosity scale-110"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#030303]/95 to-[#030303]" />
            </div>

            {/* Grid background */}
            <GridBackground />
            
            {/* Tech decorative elements */}
            <TechElements />

            {/* Animated gradient orbs - enhanced */}
            <motion.div
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.3, 1],
                    x: [0, 40, 0],
                    y: [0, 30, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[15%] left-[15%] w-[600px] h-[600px] bg-[#FF2E63]/15 blur-[200px] rounded-full"
            />
            <motion.div
                animate={{
                    opacity: [0.15, 0.35, 0.15],
                    scale: [1, 1.4, 1],
                    x: [0, -40, 0],
                    y: [0, -30, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-[15%] right-[15%] w-[700px] h-[700px] bg-[#00F0FF]/12 blur-[220px] rounded-full"
            />
            <motion.div
                animate={{
                    opacity: [0.15, 0.35, 0.15],
                    scale: [1, 1.2, 1],
                    y: [0, 50, 0],
                    x: [0, -30, 0],
                }}
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#B900FF]/12 blur-[240px] rounded-full"
            />

            {/* Floating particles - enhanced */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {Array.from({ length: 60 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ 
                            opacity: 0, 
                            y: Math.random() * 100 + '%',
                            x: Math.random() * 100 + '%',
                        }}
                        animate={{
                            opacity: [0, 0.6, 0],
                            y: [0, -150 - Math.random() * 250],
                        }}
                        transition={{
                            duration: 6 + Math.random() * 6,
                            repeat: Infinity,
                            delay: Math.random() * 4,
                            ease: 'easeInOut',
                        }}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            bottom: `${Math.random() * 100}%`,
                            background: i % 3 === 0 ? '#FF2E63' : i % 3 === 1 ? '#00F0FF' : '#B900FF',
                            boxShadow: `0 0 10px ${i % 3 === 0 ? '#FF2E63' : i % 3 === 1 ? '#00F0FF' : '#B900FF'}`,
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                    <HeroBadge />
                    <HeroTitle />
                    <HeroSubtitle />
                    <HeroButtons onBook={openBooking} />
                    <HeroStats />
                </div>
            </div>

            {/* Parallax watermark */}
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
                className="absolute bottom-[-5%] right-[-5%] font-tactic font-black text-[15vw] md:text-[20vw] leading-none text-white/[0.02] uppercase italic pointer-events-none select-none z-0"
            >
                CYBERX
            </motion.div>
        </section>
    );
}
