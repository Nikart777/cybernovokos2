'use client';

import { motion } from 'framer-motion';
import { Gauge, ChevronRight, Zap, Trophy, Timer, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface SimRacingCardProps {
    images: string[];
    specs: string[];
    price: {
        oneHour: number;
        twoHours: number;
        threeHours: number;
    };
    status?: {
        free: number;
        total: number;
    };
}

export default function SimRacingCard({ images, specs, price, status }: SimRacingCardProps) {
    const [currentImage, setCurrentImage] = useState(0);
    const isAvailable = status ? status.free > 0 : true;

    // Auto-advance slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [images.length]);

    const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] border border-[#FF8C00]/30 shadow-[0_0_60px_rgba(255,140,0,0.2)]"
        >
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        background: [
                            'radial-gradient(circle at 30% 50%, rgba(255,140,0,0.15), transparent 50%)',
                            'radial-gradient(circle at 70% 50%, rgba(255,140,0,0.25), transparent 50%)',
                            'radial-gradient(circle at 30% 50%, rgba(255,140,0,0.15), transparent 50%)',
                        ],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0"
                />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row">
                {/* Image Section with Auto Slider */}
                <div className="relative w-full lg:w-1/2 h-64 lg:h-auto overflow-hidden group">
                    <div className="relative w-full h-full">
                        {images.map((src, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: currentImage === idx ? 1 : 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={src}
                                    alt={`Автосимулятор ${idx + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    priority={idx === 0}
                                />
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent lg:bg-gradient-to-r" />
                    
                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-10"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-10"
                            >
                                <ChevronRightIcon size={20} />
                            </button>
                        </>
                    )}

                    {/* Progress Indicators */}
                    {images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImage(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        idx === currentImage ? 'bg-[#FF8C00] w-6' : 'bg-white/40'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                    
                    {/* Status Badge */}
                    {status && (
                        <div className={`absolute top-4 left-4 px-4 py-2 rounded-full backdrop-blur-md border ${
                            status.free > 0 
                                ? 'bg-[#00FF7F]/20 border-[#00FF7F]/30 text-[#00FF7F]' 
                                : 'bg-[#FF2E63]/20 border-[#FF2E63]/30 text-[#FF2E63]'
                        }`}>
                            <span className="text-xs font-chakra font-black uppercase tracking-wider">
                                {status.free > 0 ? `Свободно: ${status.free}/${status.total}` : 'Занято'}
                            </span>
                        </div>
                    )}

                    {/* PRO Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#FF8C00]/20 border border-[#FF8C00]/30 text-[#FF8C00] backdrop-blur-md">
                        <span className="text-xs font-chakra font-black uppercase tracking-wider">PRO Equipment</span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 lg:p-8 flex flex-col">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/30 mb-4">
                            <Gauge size={14} className="text-[#FF8C00]" />
                            <span className="text-[10px] font-chakra font-bold text-[#FF8C00] uppercase tracking-wider">
                                Racing Simulator
                            </span>
                        </div>
                        <h3 className="font-tactic font-black text-2xl lg:text-3xl uppercase text-white mb-2">
                            Автосимулятор
                        </h3>
                        <p className="font-inter text-sm text-white/60">
                            Профессиональный гоночный симулятор для полного погружения
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="p-2 rounded-lg bg-[#FF8C00]/20">
                                <Gauge size={16} className="text-[#FF8C00]" />
                            </div>
                            <div>
                                <p className="text-[8px] text-white/40 uppercase">Руль</p>
                                <p className="text-xs font-chakra font-bold text-white">Moza R12</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="p-2 rounded-lg bg-[#00F0FF]/20">
                                <Zap size={16} className="text-[#00F0FF]" />
                            </div>
                            <div>
                                <p className="text-[8px] text-white/40 uppercase">Экран</p>
                                <p className="text-xs font-chakra font-bold text-white">55" 4K 120Hz</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="p-2 rounded-lg bg-[#B900FF]/20">
                                <Trophy size={16} className="text-[#B900FF]" />
                            </div>
                            <div>
                                <p className="text-[8px] text-white/40 uppercase">Кокпит</p>
                                <p className="text-xs font-chakra font-bold text-white">Гоночный</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="p-2 rounded-lg bg-[#FF2E63]/20">
                                <Timer size={16} className="text-[#FF2E63]" />
                            </div>
                            <div>
                                <p className="text-[8px] text-white/40 uppercase">Force</p>
                                <p className="text-xs font-chakra font-bold text-white">Feedback</p>
                            </div>
                        </div>
                    </div>

                    {/* Prices */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                        <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-[8px] text-white/40 uppercase mb-1">1 час</p>
                            <p className="font-tactic font-black text-lg text-[#FF8C00]">{price.oneHour}₽</p>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-[8px] text-white/40 uppercase mb-1">2 часа</p>
                            <p className="font-tactic font-black text-lg text-[#FF8C00]">{price.twoHours}₽</p>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-[8px] text-white/40 uppercase mb-1">3 часа</p>
                            <p className="font-tactic font-black text-lg text-[#FF8C00]">{price.threeHours}₽</p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                        href="/simracing"
                        className="group flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#FF8C00]/80 text-black font-chakra font-black text-sm uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(255,140,0,0.4)] transition-all duration-300"
                    >
                        <Gauge size={18} className="group-hover:rotate-[-10deg] transition-transform" />
                        Страница симулятора
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
