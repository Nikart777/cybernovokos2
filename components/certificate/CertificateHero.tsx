"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function CertificateHero() {
    return (
        <section className="relative px-6 py-16 md:py-24 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-10"></div>
                {/* Neon mesh background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#FF2E63]/20 to-[#00F0FF]/20 blur-[100px] rounded-full pointer-events-none" />
            </div>

            <div className="relative z-10 container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
                    
                    {/* Left: Typography */}
                    <div className="space-y-6 md:space-y-8 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block text-[#00F0FF] font-chakra font-bold text-sm md:text-base tracking-widest uppercase bg-[#00F0FF]/10 px-4 py-2 rounded-full border border-[#00F0FF]/20 shadow-[0_0_15px_rgba(0,240,255,0.2)] mb-6">
                                Оригинальный подарок
                            </span>
                            <h1 className="text-4xl md:text-7xl lg:text-[5.5rem] font-tactic italic uppercase font-black leading-[0.9] tracking-tighter text-white break-words sm:break-normal">
                                ПОДАРОЧНЫЙ
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] to-[#B900FF] drop-shadow-[0_0_20px_rgba(255,46,99,0.4)]">
                                    СЕРТИФИКАТ
                                </span>
                            </h1>
                            <h2 className="text-3xl md:text-6xl font-tactic italic uppercase font-black leading-tight tracking-tighter text-white/90 mt-2">
                                НА КАТКИ В CYBER<span className="text-[#FF2E63]">X</span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-slate-300 text-lg md:text-xl font-inter font-medium leading-relaxed max-w-lg"
                        >
                            Для друга, брата, парня, коллеги. Подари эмоции, которые он точно оценит! Выбирай номинал и оформляй онлайн.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="pt-4"
                        >
                            <Link href="#calculator" onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                            }}>
                                <button className="group relative px-8 py-4 bg-white text-black font-tactic italic font-black uppercase tracking-widest text-lg overflow-hidden flex items-center gap-4 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)] rounded-sm">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] to-[#FF2E63] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                                        Выбрать номинал
                                    </span>
                                    <ArrowDown className="relative z-10 group-hover:text-white transition-colors duration-300 animate-bounce" />
                                </button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right: 3D Interactive Card */}
                    <div className="relative flex justify-center items-center h-[500px] perspective-[1000px]">
                        <Certificate3DCard />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Certificate3DCard() {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
                y: [0, -15, 0],
                opacity: 1 
            }}
            transition={{
                y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                },
                opacity: { duration: 1 }
            }}
            className="w-full max-w-[480px] aspect-[1.586/1] relative cursor-pointer group"
        >
            {/* Shadows */}
            <div 
                className="absolute -inset-4 bg-[#FF2E63]/30 blur-2xl rounded-2xl transform transition-opacity group-hover:opacity-100 opacity-60" 
                style={{ transform: "translateZ(-50px)" }}
            />
            <div 
                className="absolute inset-0 bg-[#00F0FF]/20 blur-xl rounded-2xl transform translate-y-8 transition-opacity group-hover:opacity-100 opacity-60" 
                style={{ transform: "translateZ(-80px)" }}
            />

            {/* Card Body */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#050505] rounded-2xl border border-white/10 shadow-2xl overflow-hidden backdrop-blur-sm"
                 style={{ transform: "translateZ(0px)" }}>
                
                {/* Tech Grid Pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }}
                />

                {/* Glare effect */}
                <motion.div
                    className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
                    style={{
                        background: useTransform(
                            [mouseXSpring, mouseYSpring],
                            ([latestX, latestY]) => {
                                const percentageX = (Number(latestX) + 0.5) * 100;
                                const percentageY = (Number(latestY) + 0.5) * 100;
                                return `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(255,255,255,0.4) 0%, transparent 60%)`;
                            }
                        )
                    }}
                />

                {/* Content Layer (Hovering) */}
                <div className="relative h-full flex flex-col justify-between p-8" style={{ transform: "translateZ(40px)" }}>
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <span className="font-tactic font-black text-3xl tracking-tighter text-white uppercase italic leading-none drop-shadow-md">CYBER<span className="text-[#FF2E63]">X</span></span>
                            <span className="font-chakra text-[9px] font-bold tracking-[0.3em] text-white/50 uppercase mt-1 ml-1">Community</span>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md shadow-inner bg-white/5">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF2E63] to-[#00F0FF] animate-pulse shadow-[0_0_15px_rgba(255,46,99,0.8)]" />
                        </div>
                    </div>

                    <div className="flex justify-between items-end relative z-10">
                        <div className="space-y-1">
                            <div className="font-chakra font-black text-sm text-[#00F0FF] uppercase tracking-widest drop-shadow-sm">
                                Сертификат на катки
                            </div>
                            <div className="font-tactic italic font-black text-5xl text-white tracking-widest drop-shadow-md">
                                X ₽
                            </div>
                        </div>
                    </div>
                    
                    {/* Big X Logo in the background of the card */}
                    <div className="absolute right-[-20px] bottom-[-40px] opacity-20 pointer-events-none" style={{ transform: "translateZ(10px)" }}>
                        <span className="font-tactic italic font-black text-[180px] leading-none text-white drop-shadow-2xl">X</span>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
