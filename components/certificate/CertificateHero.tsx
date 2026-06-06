"use client";
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function CertificateHero() {
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const springConfig = { damping: 25, stiffness: 100 };
    const mouseXSpring = useSpring(mouseX, springConfig);
    const mouseYSpring = useSpring(mouseY, springConfig);

    const translateX = useTransform(mouseXSpring, [0, 1], ["-1.5%", "1.5%"]);
    const translateY = useTransform(mouseYSpring, [0, 1], ["-1.5%", "1.5%"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <section 
            className="relative w-full min-h-[90svh] md:min-h-[85vh] flex flex-col justify-start md:justify-center pt-[100px] md:pt-20 pb-16 md:pb-20 overflow-hidden bg-[#FF0033]"
            onMouseMove={handleMouseMove}
        >
            {/* Background Layer with Parallax */}
            <motion.div 
                className="absolute inset-0 z-0"
                style={{ x: translateX, y: translateY }}
            >
                <motion.div
                    animate={{ scale: [1.04, 1.08, 1.04] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full origin-center"
                >
                    <Image 
                        src="/certificates.webp" 
                        alt="Подарочный сертификат CyberX"
                        fill
                        className="object-cover object-[85%_center] lg:object-[85%_center]"
                        priority
                    />
                    
                    {/* Cyberpunk Scanlines (Desktop only) */}
                    <div 
                        className="absolute inset-0 opacity-[0.12] hidden md:block pointer-events-none"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, #000 2px, #000 4px)'
                        }}
                    />
                </motion.div>
            </motion.div>
            
            {/* Cinematic Vignette */}
            <div className="absolute inset-0 hidden md:block z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_150%)]" />
            
            {/* Mobile readability gradient - darkens top for text, keeps face clear at bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FF0033]/95 via-[#FF0033]/80 to-transparent md:hidden z-10 pointer-events-none" />

            {/* Seamless transition to the next dark section */}
            <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 lg:h-80 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none" />

            <div className="relative z-20 container mx-auto px-6 max-w-7xl pointer-events-none">
                <div className="max-w-2xl pointer-events-auto">
                    <div className="space-y-6 md:space-y-8 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block text-white font-chakra font-bold text-[10px] sm:text-xs md:text-base tracking-widest uppercase bg-black px-3 md:px-5 py-1.5 md:py-2.5 rounded-full shadow-xl mb-5 md:mb-6">
                                Оригинальный подарок
                            </span>
                            <h1 className="max-w-full text-[2rem] min-[390px]:text-[2.12rem] sm:text-5xl md:text-7xl lg:text-[6rem] font-tactic italic uppercase font-black leading-[0.95] tracking-normal sm:tracking-tighter text-white drop-shadow-xl">
                                ПОДАРОЧНЫЙ
                                <br />
                                <span className="text-black drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)] md:drop-shadow-md">
                                    СЕРТИФИКАТ
                                </span>
                            </h1>
                            <h2 className="text-xl sm:text-3xl md:text-5xl lg:text-5xl font-tactic italic uppercase font-black leading-tight tracking-normal sm:tracking-tighter text-white mt-4 md:mt-4 drop-shadow-xl">
                                НА КАТКИ В CYBER<span className="text-black">X</span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-white text-base md:text-xl font-inter font-semibold leading-relaxed max-w-lg drop-shadow-md"
                        >
                            Для друга, брата, парня, коллеги. Подари эмоции, которые он точно оценит! Выбирай номинал и оформляй онлайн.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="pt-6 md:pt-4"
                        >
                            <Link href="#calculator" onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                            }}>
                                <button className="group relative px-6 md:px-8 py-3 md:py-4 bg-black text-white font-tactic italic font-black uppercase tracking-widest text-base md:text-lg overflow-hidden flex items-center gap-4 transition-transform hover:scale-105 active:scale-95 rounded-full shadow-2xl">
                                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                                        Выбрать номинал
                                    </span>
                                    <ArrowDown className="relative z-10 group-hover:text-black transition-colors duration-300 animate-bounce" />
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
