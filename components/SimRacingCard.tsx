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

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 4200);

        return () => clearInterval(timer);
    }, [images.length]);

    const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

    const featureItems = [
        { label: 'Руль', value: specs[0] || 'Moza R12', icon: Gauge, color: '#FF2E63' },
        { label: 'Экран', value: specs[1] || '55" 4K 120Hz', icon: Zap, color: '#00F0FF' },
        { label: 'Кокпит', value: specs[2] || 'Гоночный', icon: Trophy, color: '#B900FF' },
        { label: 'Отдача', value: 'Force Feedback', icon: Timer, color: '#51F0AD' },
    ];

    const prices = [
        { label: '1 час', value: price.oneHour },
        { label: '2 часа', value: price.twoHours },
        { label: '3 часа', value: price.threeHours },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#08080b]/92 shadow-[0_28px_120px_rgba(0,0,0,0.45)]"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,46,99,0.18),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(0,240,255,0.14),transparent_30%)]" />
            <div
                className="absolute inset-0 opacity-[0.055]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)',
                    backgroundSize: '52px 52px',
                }}
            />

            <div className="relative z-10 grid gap-0 lg:grid-cols-[0.98fr_1.02fr]">
                <div className="relative min-h-[300px] overflow-hidden rounded-t-3xl lg:min-h-[520px] lg:rounded-l-3xl lg:rounded-tr-none">
                    {images.map((src, idx) => (
                        <motion.div
                            key={src}
                            initial={false}
                            animate={{ opacity: currentImage === idx ? 1 : 0 }}
                            transition={{ duration: 0.55 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={src}
                                alt={`Автосимулятор ${idx + 1}`}
                                fill
                                className="object-cover saturate-125"
                                priority={idx === 0}
                            />
                        </motion.div>
                    ))}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080b] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#08080b]" />
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#08080b] to-transparent lg:hidden" />

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                aria-label="Предыдущее фото автосимулятора"
                                className="absolute left-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/45 text-white opacity-80 backdrop-blur-md transition hover:bg-black/70"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextImage}
                                aria-label="Следующее фото автосимулятора"
                                className="absolute right-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/45 text-white opacity-80 backdrop-blur-md transition hover:bg-black/70"
                            >
                                <ChevronRightIcon size={20} />
                            </button>
                        </>
                    )}

                    <div className="absolute left-5 top-5 flex flex-wrap gap-3">
                        {status && (
                            <div
                                className={`rounded-full border px-4 py-2 backdrop-blur-md ${
                                    isAvailable
                                        ? 'border-[#51F0AD]/30 bg-[#51F0AD]/15 text-[#51F0AD]'
                                        : 'border-[#FF2E63]/30 bg-[#FF2E63]/15 text-[#FF2E63]'
                                }`}
                            >
                                <span className="font-chakra text-[10px] font-black uppercase tracking-[0.18em]">
                                    {isAvailable ? `Свободно ${status.free}/${status.total}` : 'Занято'}
                                </span>
                            </div>
                        )}
                        <div className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-white/70 backdrop-blur-md">
                            <span className="font-chakra text-[10px] font-black uppercase tracking-[0.18em]">Drive X</span>
                        </div>
                    </div>

                    {images.length > 1 && (
                        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                            {images.map((src, idx) => (
                                <button
                                    key={src}
                                    onClick={() => setCurrentImage(idx)}
                                    aria-label={`Фото ${idx + 1}`}
                                    className={`h-1.5 rounded-full transition-all ${
                                        idx === currentImage ? 'w-8 bg-[#FF2E63]' : 'w-1.5 bg-white/35'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                    <div className="mb-7">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF2E63]/25 bg-[#FF2E63]/10 px-3 py-2">
                            <Gauge size={15} className="text-[#FF2E63]" />
                            <span className="font-chakra text-[10px] font-black uppercase tracking-[0.2em] text-[#FF2E63]">
                                автосимуляторы
                            </span>
                        </div>
                        <h3 className="font-tactic text-3xl font-black uppercase italic leading-none text-white sm:text-4xl lg:text-5xl">
                            Заезд как
                            <span className="block text-[#FF2E63]">отдельное событие</span>
                        </h3>
                        <p className="mt-4 max-w-xl font-inter text-sm leading-6 text-white/60 sm:text-base">
                            Гоночный кокпит, руль Moza и большой экран для Assetto Corsa, F1, Forza и вечерних заездов с друзьями.
                        </p>
                    </div>

                    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {featureItems.map((item) => (
                            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-md">
                                <div className="mb-4 flex items-center justify-between gap-3">
                                    <item.icon size={18} style={{ color: item.color }} />
                                    <span className="font-chakra text-[9px] font-black uppercase tracking-[0.2em] text-white/34">
                                        {item.label}
                                    </span>
                                </div>
                                <div className="font-chakra text-sm font-bold text-white">{item.value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mb-7 grid grid-cols-3 gap-3">
                        {prices.map((item) => (
                            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-4 text-center backdrop-blur-md">
                                <div className="font-chakra text-[9px] font-black uppercase tracking-[0.18em] text-white/38">
                                    {item.label}
                                </div>
                                <div className="mt-2 font-tactic text-xl font-black text-[#00F0FF] sm:text-2xl">
                                    {item.value}₽
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link
                        href="/simracing"
                        className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-white px-7 font-chakra text-xs font-black uppercase tracking-[0.22em] text-black transition duration-300 hover:bg-[#FF2E63] hover:text-white hover:shadow-[0_0_48px_rgba(255,46,99,0.36)]"
                    >
                        Подробнее про симрейсинг
                        <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
