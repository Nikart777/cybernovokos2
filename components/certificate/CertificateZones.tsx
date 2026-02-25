'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';

const zones = [
    {
        id: 'solo-premium',
        name: 'SOLO PREMIUM',
        subtitle: 'Уединенный комфорт',
        description: 'Отдельная комната, где никто не будет мешать. Идеальный вариант, если он любит погружаться в игру с головой.',
        images: [
            '/zones/solo-premium-1.webp',
            '/zones/solo-premium-2.webp',
            '/zones/solo-premium-3.webp',
            '/zones/solo-premium-4.webp',
            '/zones/solo-premium-5.webp',
            '/zones/solo-premium-6.webp'
        ],
        color: '#FF2E63'
    },
    {
        id: 'solo-pro',
        name: 'SOLO PRO',
        subtitle: 'Киберспорт уровень',
        description: 'Все для максимального комфорта и тишины. Высший уровень приватности для серьезных игроков.',
        images: [
            '/zones/solo-pro-1.webp',
            '/zones/solo-pro-2.webp',
            '/zones/solo-pro-3.webp'
        ],
        color: '#00F0FF'
    },
    {
        id: 'duo-zone',
        name: 'DUO ZONE',
        subtitle: 'Играем вдвоем',
        description: 'Отличный вариант, чтобы прийти поиграть с лучшим другом в отдельном зале без посторонних.',
        images: [
            '/zones/duo-1.webp',
            '/zones/duo-2.webp',
            '/zones/duo-3.webp'
        ],
        color: '#B900FF'
    },
    {
        id: 'vip-bootcamp',
        name: 'VIP BOOTCAMP',
        subtitle: 'Для команд на 5 ПК',
        description: 'Закрытая комната на 5 компьютеров — лучший выбор, если он играет своей проверенной командой.',
        images: [
            '/zones/bootcamp-1.webp',
            '/zones/bootcamp-2.webp',
            '/zones/bootcamp-3.webp',
            '/zones/bootcamp-4.webp',
            '/zones/bootcamp-5.webp'
        ],
        color: '#FF7A00'
    },
    {
        id: 'ps5-lounge',
        name: 'PS5 LOUNGE',
        subtitle: 'Зона PlayStation 5',
        description: 'Большой экран, мягкие диваны и любимые файтинги или футбол. Отличный повод расслабиться.',
        images: [
            '/zones/ps5-1.webp',
            '/zones/ps5-2.webp',
            '/zones/ps5-3.webp',
            '/zones/ps5-4.webp',
            '/zones/ps5-5.webp'
        ],
        color: '#0072CE'
    },
    {
        id: 'simracing',
        name: 'АВТОСИМУЛЯТОР',
        subtitle: 'Полное погружение',
        description: 'Потрясающие эмоции от вождения гоночного болида. Адреналин, скорость и вибрации на руле.',
        images: [
            '/zones/sim-1.webp',
            '/zones/sim-2.webp',
            '/zones/sim-3.webp',
            '/zones/sim-4.webp',
            '/zones/sim-5.webp'
        ],
        color: '#00F0FF'
    },
    {
        id: 'common',
        name: 'ОБЩИЙ ЗАЛ',
        subtitle: 'База клуба',
        description: 'Рабочая лошадка киберспорта. Огромный зал, крутая атмосфера и море эмоций в компании других игроков.',
        images: [
            '/zones/common-1.webp',
            '/zones/common-2.webp',
            '/zones/common-3.webp',
            '/zones/common-4.webp',
            '/zones/common-5.webp'
        ],
        color: '#555555'
    }
];

function ZoneCard({ zone, idx }: { zone: typeof zones[0], idx: number }) {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImage((prev) => (prev + 1) % zone.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImage((prev) => (prev - 1 + zone.images.length) % zone.images.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="group relative h-[450px] md:h-[500px] rounded-[40px] overflow-hidden bg-neutral-900 border border-white/5 transition-all duration-500 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] touch-action-pan-y"
        >
            {/* Background & Slider - Pointer events auto for swiping */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                            const swipe = info.offset.x;
                            if (swipe > 50) prevImage({ stopPropagation: () => { } } as any);
                            else if (swipe < -50) nextImage({ stopPropagation: () => { } } as any);
                        }}
                        className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
                    >
                        <Image
                            src={zone.images[currentImage]}
                            alt={zone.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-[2s] opacity-70 grayscale-[30%] group-hover:grayscale-0"
                        />
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/60 to-transparent" />
            </div>

            {/* Progress Indicators */}
            {zone.images.length > 1 && (
                <div className="absolute top-6 left-6 right-6 z-40 flex gap-1.5 p-1 rounded-full bg-black/10 backdrop-blur-sm">
                    {zone.images.map((_, i) => (
                        <div
                            key={i}
                            className="h-2 flex-1 overflow-hidden rounded-full bg-white/20 shadow-inner"
                        >
                            <motion.div
                                className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                                initial={false}
                                animate={{
                                    width: i <= currentImage ? "100%" : "0%",
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Arrow Controls */}
            {zone.images.length > 1 && (
                <div className="hidden lg:block">
                    <button
                        onClick={prevImage}
                        className="absolute top-1/2 left-4 z-40 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black hover:scale-110 active:scale-90 shadow-2xl"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute top-1/2 right-4 z-40 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black hover:scale-110 active:scale-90 shadow-2xl"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}

            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end pointer-events-none">
                {/* Header Decoration */}
                <div
                    className="w-16 h-1 mb-6 rounded-full"
                    style={{ backgroundColor: zone.color }}
                />

                <div className="mb-4">
                    <h3 className="font-tactic font-black text-3xl md:text-4xl uppercase italic text-white leading-tight tracking-tight drop-shadow-lg">
                        {zone.name}
                    </h3>
                    <p className="font-chakra font-bold text-sm uppercase text-white/60 tracking-[0.2em] mt-1 drop-shadow-md">
                        {zone.subtitle}
                    </p>
                </div>

                <div className="mb-2">
                    <p className="font-inter text-slate-300 text-sm md:text-base leading-relaxed drop-shadow-md bg-black/20 p-4 rounded-xl backdrop-blur-sm border-l-2" style={{ borderColor: zone.color }}>
                        {zone.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default function CertificateZones() {
    return (
        <section className="py-24 bg-[#050505] relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col mb-16 gap-6 items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/5 text-[#00F0FF] text-[10px] md:text-xs font-black uppercase tracking-[0.3em]"
                    >
                        Залы клуба
                    </motion.div>

                    <h2 className="font-tactic font-black text-4xl md:text-6xl lg:text-7xl uppercase italic text-white leading-[0.9]">
                        ГДЕ ОН БУДЕТ <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#FF2E63] drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                            ИГРАТЬ
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {zones.map((zone, idx) => (
                        <ZoneCard key={zone.id} zone={zone} idx={idx} />
                    ))}
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00F0FF] blur-[200px] opacity-[0.03] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#FF2E63] blur-[200px] opacity-[0.03] rounded-full pointer-events-none" />
        </section>
    );
}
