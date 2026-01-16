'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Monitor, Cpu, Gauge, MousePointer2, Thermometer, Zap, Shield, Tv, Gamepad2, Users, Users2, Trophy, Coffee, Clock, User, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const zones = [
    {
        id: 'solo-premium',
        name: 'SOLO PREMIUM',
        subtitle: 'Уединенный комфорт',
        price: 'от 220₽',
        features: [
            { label: 'Видеокарта', value: 'RTX 5070 12GB', icon: Cpu },
            { label: 'Монитор', value: '240 Гц / 2K', icon: Monitor },
            { label: 'Периферия', value: 'Logitech G Pro', icon: MousePointer2 },
            { label: 'Климат', value: 'Кондиционер', icon: Thermometer },
            { label: 'Зарядка', value: 'Type-C / Lightning', icon: Zap },
            { label: 'Комфорт', value: 'Кронштейн + Кресло', icon: Shield },
        ],
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
        price: 'от 220₽',
        features: [
            { label: 'Мощность', value: 'RTX 5070 12GB', icon: Cpu },
            { label: 'Экраны', value: '400 Гц BenQ Zowie', icon: Monitor },
            { label: 'Мышь', value: 'Logitech G Pro Superlight', icon: MousePointer2 },
            { label: 'Холод', value: 'Кондиционер', icon: Thermometer },
            { label: 'Зарядка', value: 'Зарядка на столе', icon: Zap },
            { label: 'Настройка', value: 'Проф. кронштейн', icon: Gauge },
        ],
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
        price: 'от 180₽',
        features: [
            { label: 'FPS', value: 'RTX 4060', icon: Cpu },
            { label: 'Картинка', value: '240 Гц IPS / 24"', icon: Monitor },
            { label: 'Классика', value: 'Logitech G403', icon: MousePointer2 },
            { label: 'Приватность', value: 'Зона для двоих', icon: Users2 },
            { label: 'Удобство', value: 'Игровые кресла', icon: Shield },
            { label: 'Атмосфера', value: 'Своя вентиляция', icon: Thermometer },
        ],
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
        price: 'от 180₽',
        features: [
            { label: 'Места', value: '5 Игровых мест', icon: Users },
            { label: 'Флагманы', value: 'RTX 4070', icon: Cpu },
            { label: 'Эргономика', value: '240 Гц на кронштейнах', icon: Monitor },
            { label: 'Тишина', value: 'Шумоизоляция', icon: Shield },
            { label: 'Периферия', value: 'Топовый сет', icon: MousePointer2 },
            { label: 'Сервис', value: 'VIP Обслуживание', icon: Trophy },
        ],
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
        price: 'от 320₽',
        features: [
            { label: 'Экран', value: '70 Дюймов 4K Ultra HD', icon: Tv },
            { label: 'Хиты', value: 'FC26 / UFC 5', icon: Gamepad2 },
            { label: 'Для двоих', value: 'MK 1 / NHL', icon: Users2 },
            { label: 'Отдых', value: 'Диваны и пуфы', icon: Coffee },
            { label: 'Парам', value: 'It Takes Two', icon: Zap },
            { label: 'Комфорт', value: 'Лучшая атмосфера', icon: Shield },
        ],
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
        price: 'от 300₽',
        features: [
            { label: 'Руль', value: 'Pro / Force Feedback', icon: Gauge },
            { label: 'Картинка', value: '55" 4K 120Hz', icon: Tv },
            { label: 'Кокпит', value: 'Гоночный каркас', icon: Shield },
            { label: 'Педали', value: 'Металлические', icon: Zap },
            { label: 'Драйв', value: 'Вибрация и отдала', icon: Trophy },
            { label: 'Графика', value: 'Топовый ПК / Ультра', icon: Cpu },
        ],
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
        price: 'от 140₽',
        features: [
            { label: 'Парк', value: '25 Рабочих лошадок', icon: Monitor },
            { label: 'Бар', value: 'Снеки и напитки', icon: Coffee },
            { label: 'График', value: 'Работаем 24/7', icon: Clock },
            { label: 'Сервис', value: 'Помощь админов', icon: User },
            { label: 'Девайсы', value: 'Logitech', icon: MousePointer2 },
            { label: 'Сеть', value: 'Стабильный Low Ping', icon: Zap },
        ],
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

    const openBooking = () => {
        window.dispatchEvent(new CustomEvent('open-booking'));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="group relative h-[620px] rounded-[40px] overflow-hidden bg-neutral-900 border border-white/5 transition-all duration-500 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
            {/* Background & Slider */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={zone.images[currentImage]}
                            alt={zone.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-[2s] opacity-50 grayscale group-hover:grayscale-0"
                        />
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent" />

                {/* Dots Navigation */}
                {zone.images.length > 1 && (
                    <div className="absolute top-8 left-8 z-20 flex gap-2">
                        {zone.images.map((_, i) => (
                            <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentImage ? 'bg-white w-4' : 'bg-white/20'}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Arrow Controls - Outside background container for proper z-index */}
            {zone.images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute top-1/2 left-4 z-30 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute top-1/2 right-4 z-30 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black"
                    >
                        <ChevronRight size={16} />
                    </button>
                </>
            )}

            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                {/* Header Decoration */}
                <div
                    className="w-16 h-1 mb-6 rounded-full"
                    style={{ backgroundColor: zone.color }}
                />

                <div className="mb-2">
                    <h3 className="font-tactic font-black text-3xl uppercase italic text-white leading-tight tracking-tight drop-shadow-lg">
                        {zone.name}
                    </h3>
                    <p className="font-chakra font-bold text-xs uppercase text-white/40 tracking-[0.2em] mt-1 drop-shadow-md">
                        {zone.subtitle}
                    </p>
                </div>

                <div className="font-tactic font-black text-[#FF2E63] text-3xl mb-8 uppercase tracking-wider flex items-baseline gap-1">
                    <span className="text-sm font-chakra text-white/50 lowercase">от</span>
                    {zone.price.replace('от ', '')}
                </div>

                {/* Features Grid - Modernized */}
                <div className="grid grid-cols-2 gap-y-5 gap-x-4 mb-8 border-t border-white/10 pt-8">
                    {zone.features.slice(0, 4).map((feature, fIdx) => (
                        <div key={fIdx} className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-md bg-white/5 group-hover:bg-white/10 transition-colors">
                                    <feature.icon size={12} className="text-[#FF2E63]" />
                                </div>
                                <span className="text-[9px] font-chakra font-black uppercase text-white/30 tracking-[0.1em]">{feature.label}</span>
                            </div>
                            <div className="text-[11px] font-chakra font-bold uppercase text-white leading-tight truncate">
                                {feature.value}
                            </div>
                        </div>
                    ))}
                </div>

                {zone.id === 'simracing' ? (
                    <Link
                        href="/simracing"
                        className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-chakra font-black text-xs uppercase tracking-[0.25em] text-white hover:bg-white hover:text-black transition-all relative overflow-hidden group/btn"
                    >
                        <span className="relative z-10 transition-colors">Подробнее</span>
                        <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-expo" />
                    </Link>
                ) : (
                    <button
                        onClick={openBooking}
                        className="w-full py-4 rounded-2xl bg-[#FF2E63] border border-[#FF2E63] flex items-center justify-center font-chakra font-black text-xs uppercase tracking-[0.25em] text-white hover:bg-white hover:text-black hover:border-white transition-all relative overflow-hidden group/btn shadow-[0_15px_30px_rgba(255,46,99,0.3)]"
                    >
                        <span className="relative z-10 transition-colors">Забронировать</span>
                        <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-expo" />
                    </button>
                )}
            </div>

            {/* Premium Decor corners */}
            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-10 group-hover:opacity-40 transition-opacity duration-1000">
                <div className="absolute top-12 right-12 w-12 h-[1px] bg-gradient-to-l from-white to-transparent" />
                <div className="absolute top-12 right-12 h-12 w-[1px] bg-gradient-to-t from-white to-transparent" />
            </div>
        </motion.div>
    );
}

export default function Zones() {
    return (
        <section id="zones" className="py-24 bg-[#050505] relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[#FF2E63]/30 bg-[#FF2E63]/5 text-[#FF2E63] text-[10px] font-black uppercase tracking-[0.3em]"
                        >
                            Игровые площадки
                        </motion.div>
                        <h2 className="font-tactic font-black text-4xl md:text-8xl uppercase italic text-white leading-[0.9] mb-8">
                            ВЫБЕРИ СВОЙ <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] to-[#B900FF] drop-shadow-[0_0_15px_rgba(255,46,99,0.3)]">
                                LEVEL UP
                            </span>
                        </h2>
                        <p className="font-chakra font-bold text-white/50 uppercase tracking-[0.15em] leading-relaxed text-sm md:text-base border-l-4 border-[#FF2E63] pl-6 py-2">
                            Семь уникальных игровых площадок. От демократичного <br className="hidden md:block" /> общего зала до эксклюзивных Solo Premium комнат.
                        </p>
                    </div>
                    <Link href="/prices" className="flex items-center gap-3 font-chakra font-black text-sm uppercase tracking-[0.25em] text-[#FF2E63] hover:text-white transition-all duration-500 group border-b border-[#FF2E63]/20 pb-2 hover:border-white">
                        Смотреть все цены
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <ChevronRight size={22} className="group-hover:translate-x-1" />
                        </motion.div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {zones.map((zone, idx) => (
                        <ZoneCard key={zone.id} zone={zone} idx={idx} />
                    ))}
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF2E63] blur-[200px] opacity-[0.03] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#B900FF] blur-[200px] opacity-[0.03] rounded-full pointer-events-none" />
        </section>
    );
}
