"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Gift, ArrowRight } from "lucide-react";

export default function CertificateBanner() {
    return (
        <section className="px-4 md:px-6 py-8 md:py-12 relative z-10 w-full overflow-hidden">
            <div className="container mx-auto max-w-7xl">
                <Link href="/certificate" className="block w-full group">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative w-full rounded-3xl overflow-hidden bg-[#FF2E63] p-5 sm:p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 shadow-[0_0_80px_rgba(255,46,99,0.4)] transition-all duration-500 hover:shadow-[0_0_100px_rgba(255,46,99,0.6)] group"
                    >
                        {/* Background subtle textures */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 pointer-events-none" />
                        <div 
                            className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
                            style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
                                backgroundSize: '24px 24px'
                            }}
                        />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left w-full md:w-3/5">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0f1a] mb-6">
                                <Gift size={16} className="text-[#FF2E63]" />
                                <span className="text-xs md:text-sm font-chakra font-bold uppercase tracking-widest text-white">
                                    Лучший подарок геймеру
                                </span>
                            </div>
                            
                            <h2 className="text-3xl min-[380px]:text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-tactic italic uppercase font-black tracking-tighter text-[#0a0f1a] leading-[0.85] mb-6 break-words w-full">
                                ПОДАРОЧНЫЙ <br />
                                <span className="text-[#0a0f1a]">
                                    СЕРТИФИКАТ
                                </span>
                            </h2>
                            
                            <p className="text-[#0a0f1a] font-inter text-base md:text-lg font-bold max-w-md">
                                Для друга, брата, парня, коллеги. Подари эмоции от топовых каток на RTX 5070, которые он точно оценит!
                            </p>
                        </div>

                        {/* Visual / Card */}
                        <div className="relative z-10 shrink-0 mt-8 md:mt-0 w-full md:w-2/5 flex flex-col items-center">
                            <div className="relative flex items-center justify-center w-64 h-40 md:w-80 md:h-52 mb-8 md:mb-0">
                                {/* Horizontal 3D-like Card */}
                                <div className="absolute inset-0 bg-[#0a0f1a] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-6 group-hover:-rotate-2 group-hover:scale-105 transition-all duration-500 flex flex-col p-6 overflow-hidden z-20">
                                    
                                    {/* Big X on card */}
                                    <div className="absolute -right-4 -bottom-8 opacity-90">
                                        <span className="font-tactic italic font-black text-9xl text-[#FF2E63]">X</span>
                                    </div>
                                    
                                    <div className="flex flex-col relative z-10">
                                        <span className="font-tactic font-black text-2xl text-white uppercase italic leading-none">CYBER<span className="text-[#FF2E63]">X</span></span>
                                        <span className="font-chakra text-[8px] font-bold tracking-[0.2em] text-white/50 uppercase mt-1">Community</span>
                                    </div>
                                    
                                    <div className="relative z-10 font-chakra font-black text-xs text-white/80 uppercase tracking-widest mt-auto">
                                        ПОДАРОЧНЫЙ СЕРТИФИКАТ
                                    </div>
                                </div>
                                {/* Second Card behind */}
                                <div className="absolute inset-0 bg-black/40 rounded-2xl transform rotate-3 group-hover:rotate-6 group-hover:scale-95 transition-all duration-500 z-10 blur-[2px]"></div>
                            </div>
                        </div>

                        {/* Mobile Button */}
                        <div className="relative z-10 md:hidden mt-4 w-full">
                            <div className="w-full flex justify-center items-center gap-3 bg-[#0a0f1a] text-white px-8 py-5 rounded-2xl font-tactic italic font-black uppercase tracking-widest text-lg active:scale-95 transition-transform">
                                Оформить
                                <ArrowRight size={24} />
                            </div>
                        </div>
                        
                        {/* Desktop Button */}
                        <div className="absolute right-8 bottom-8 z-30 hidden md:flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#0a0f1a] text-white transform opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl">
                            <span className="font-tactic italic font-black uppercase tracking-widest text-lg">Оформить</span>
                            <ArrowRight size={24} className="text-white" />
                        </div>
                    </motion.div>
                </Link>
            </div>
        </section>
    );
}
