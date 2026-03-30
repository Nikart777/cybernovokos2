'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Smartphone, MapPin, Clock, ChevronRight, MessageSquare, Star } from 'lucide-react';
import { useRef } from 'react';

export default function CTASection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section ref={containerRef} className="relative py-24 md:py-32 bg-[#030303] overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#0a0a0a] to-[#030303]" />
            
            {/* Animated Grid */}
            <div 
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Gradient Orbs */}
            <motion.div 
                style={{ y: y1 }}
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FF2E63]/15 blur-[180px] rounded-full"
            />
            <motion.div 
                style={{ y: y2 }}
                className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#B900FF]/15 blur-[200px] rounded-full"
            />

            <div className="container mx-auto px-4 relative z-10">
                {/* Main CTA Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-[2.5rem] overflow-hidden mb-16"
                >
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF2E63]/30 via-[#B900FF]/20 to-[#00F0FF]/30" />
                    <div className="absolute inset-[1px] bg-[#0a0a0a] rounded-[2.4rem]" />
                    
                    {/* Inner Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF2E63]/10 via-transparent to-[#00F0FF]/10 rounded-[2.4rem]" />

                    {/* Content */}
                    <div className="relative z-10 p-8 md:p-16 text-center">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-md"
                        >
                            <div className="flex text-[#FFD700]">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={14} fill="currentColor" />
                                ))}
                            </div>
                            <span className="font-chakra font-bold text-xs text-white/80 tracking-wide uppercase">
                                Рейтинг 5.0
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="font-tactic font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.85] text-white mb-6 italic"
                        >
                            Готов к <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] via-[#B900FF] to-[#00F0FF]">победе</span>?
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="font-inter text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
                        >
                            Забронируй место прямо сейчас и получи <span className="text-white font-semibold">промокод на первое посещение</span>. 
                            Твой лучший игровой опыт начинается здесь.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex flex-wrap justify-center gap-4 mb-12"
                        >
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
                                className="group relative flex items-center gap-3 bg-gradient-to-r from-[#FF2E63] to-[#FF2E63]/80 px-10 py-5 rounded-full font-chakra font-black text-sm uppercase tracking-[0.2em] text-white transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,46,99,0.5)] hover:scale-105 active:scale-95 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Smartphone size={18} className="group-hover:rotate-12 transition-transform" />
                                    Забронировать место
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </button>
                            
                            <a
                                href="https://t.me/CyberXNovokos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 px-10 py-5 rounded-full bg-white/10 border border-white/20 font-chakra font-black text-sm uppercase tracking-[0.2em] text-white hover:bg-white/15 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300"
                            >
                                <MessageSquare size={18} className="group-hover:scale-110 transition-transform" />
                                Написать в Telegram
                            </a>
                        </motion.div>

                        {/* Info Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
                        >
                            {/* Address */}
                            <a
                                href="https://yandex.ru/maps/-/CPA4UJ~I"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-300"
                            >
                                <div className="flex items-center justify-center gap-3 mb-3">
                                    <div className="p-2.5 rounded-xl bg-[#FF2E63]/15">
                                        <MapPin size={20} className="text-[#FF2E63]" />
                                    </div>
                                </div>
                                <h4 className="font-chakra font-bold text-sm uppercase text-white/60 mb-1">Адрес</h4>
                                <p className="font-tactic font-bold text-white">ул. Новокосинская, 32</p>
                            </a>

                            {/* Hours */}
                            <div className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-300">
                                <div className="flex items-center justify-center gap-3 mb-3">
                                    <div className="p-2.5 rounded-xl bg-[#00F0FF]/15">
                                        <Clock size={20} className="text-[#00F0FF]" />
                                    </div>
                                </div>
                                <h4 className="font-chakra font-bold text-sm uppercase text-white/60 mb-1">Режим работы</h4>
                                <p className="font-tactic font-bold text-white">Круглосуточно 24/7</p>
                            </div>

                            {/* Phone */}
                            <a
                                href="tel:+79851289538"
                                className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-300"
                            >
                                <div className="flex items-center justify-center gap-3 mb-3">
                                    <div className="p-2.5 rounded-xl bg-[#B900FF]/15">
                                        <Smartphone size={20} className="text-[#B900FF]" />
                                    </div>
                                </div>
                                <h4 className="font-chakra font-bold text-sm uppercase text-white/60 mb-1">Телефон</h4>
                                <p className="font-tactic font-bold text-white">+7 (985) 128-95-38</p>
                            </a>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Bottom Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="flex flex-wrap justify-center items-center gap-6 md:gap-8"
                >
                    <a
                        href="/prices"
                        className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors"
                    >
                        <span className="font-chakra font-bold text-sm uppercase tracking-wider">Цены</span>
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    
                    <div className="w-[1px] h-4 bg-white/10" />
                    
                    <a
                        href="/contacts"
                        className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors"
                    >
                        <span className="font-chakra font-bold text-sm uppercase tracking-wider">Контакты</span>
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    
                    <div className="w-[1px] h-4 bg-white/10" />
                    
                    <a
                        href="/#promotions"
                        className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors"
                    >
                        <span className="font-chakra font-bold text-sm uppercase tracking-wider">Акции</span>
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
