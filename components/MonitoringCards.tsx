'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Monitor, Cpu, MousePointer2, Thermometer, Zap, Shield, Tv, Gamepad2, Users, Users2, Trophy, Coffee, Clock, User, Gauge, Info, Armchair } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PricingData, PriceItem } from '@/app/lib/types';
import { getClubStatus, ClubZone } from '@/app/lib/langame';

// --- CONFIGURATION ---
const CARDS_CONFIG = [
    {
        id: 'solo-premium',
        langameTitle: 'Solo Premium',
        name: 'SOLO PREMIUM',
        subtitle: 'Уединенный комфорт',
        priceId: 'solo',
        features: [
            { label: 'Видеокарта', value: 'RTX 5070 12GB', icon: Cpu },
            { label: 'Монитор', value: '240 Гц / 2K', icon: Monitor },
            { label: 'Периферия', value: 'Logitech G Pro', icon: MousePointer2 },
            { label: 'Комфорт', value: 'Кронштейн + Кресло', icon: Shield },
        ],
        images: [
            '/zones/solo-premium-1.webp',
            '/zones/solo-premium-2.webp',
            '/zones/solo-premium-3.webp'
        ],
        color: '#FF2E63'
    },
    {
        id: 'solo-pro',
        langameTitle: 'Solo Pro',
        name: 'SOLO PRO',
        subtitle: 'Киберспорт уровень',
        priceId: 'solo',
        features: [
            { label: 'Мощность', value: 'RTX 5070 12GB', icon: Cpu },
            { label: 'Экраны', value: '400 Гц BenQ Zowie', icon: Monitor },
            { label: 'Мышь', value: 'Logitech G Pro Superlight', icon: MousePointer2 },
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
        langameTitle: 'Duo',
        name: 'DUO ZONE',
        subtitle: 'Играем вдвоем',
        priceId: 'vip_duo',
        features: [
            { label: 'FPS', value: 'RTX 4060', icon: Cpu },
            { label: 'Картинка', value: '240 Гц IPS / 24"', icon: Monitor },
            { label: 'Приватность', value: 'Зона для двоих', icon: Users2 },
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
        langameTitle: 'VIP Bootcamp',
        name: 'VIP BOOTCAMP',
        subtitle: 'Приватная комната для команды',
        priceId: 'vip_duo',
        features: [
            { label: 'Видеокарта', value: 'RTX 4070', icon: Cpu },
            { label: 'Монитор', value: '240 Гц с кронштейном', icon: Monitor },
            { label: 'Команда', value: '5 Мест в ряд', icon: Users },
            { label: 'Комфорт', value: 'Свой климат-контроль', icon: Thermometer },
        ],
        images: [
            '/zones/bootcamp-1.webp',
            '/zones/bootcamp-2.webp',
            '/zones/bootcamp-3.webp',
            '/zones/bootcamp-4.webp',
            '/zones/bootcamp-5.webp',
        ],
        color: '#FF7A00'
    },
    {
        id: 'bootcamp',
        langameTitle: 'Bootcamp',
        name: 'BOOTCAMP',
        subtitle: 'Тренировочная база',
        priceId: 'bootcamp',
        features: [
            { label: 'Видеокарта', value: 'RTX 4060', icon: Cpu },
            { label: 'Монитор', value: '144 Гц', icon: Monitor },
            { label: 'Атмосфера', value: 'Закрытая зона', icon: Shield },
            { label: 'Посадка', value: 'В ряд', icon: Users },
        ],
        images: [
            '/zones/bootcamp-std-1.webp',
            '/zones/bootcamp-std-2.webp',
        ],
        color: '#FF2E63'
    },
    {
        id: 'ps5-lounge',
        langameTitle: 'PS5 Lounge',
        name: 'PS5 LOUNGE',
        subtitle: 'Зона PlayStation 5',
        priceId: 'tv',
        priceSubZone: 'TV STANDARD',
        features: [
            { label: 'Экран', value: '70 Дюймов 4K Ultra HD', icon: Tv },
            { label: 'Хиты', value: 'FC26 / UFC 5', icon: Gamepad2 },
            { label: 'Для двоих', value: 'MK 1 / NHL', icon: Users2 },
            { label: 'Комфорт', value: 'Лучшая атмосфера', icon: Shield },
        ],
        images: [
            '/zones/ps5-3.webp',
            '/zones/ps5-4.webp',
            '/zones/ps5-5.webp',
        ],
        color: '#0072CE'
    },
    {
        id: 'ps5-vip',
        langameTitle: 'PS5 VIP Комната',
        name: 'PS5 VIP',
        subtitle: 'Личный кинотеатр',
        description: 'Премиальная комната с огромным экраном и полной приватностью. Идеально для просмотра кино, матчей или игры в своей компании.',
        priceId: 'tv',
        priceSubZone: 'TV VIP (комната)',
        features: [
            { label: 'Экран', value: '4K 70 дюймов', icon: Tv },
            { label: 'Удобно', value: 'диван и пуфы', icon: Armchair },
            { label: 'Приватность', value: 'Полная изоляция', icon: Shield },
            { label: 'Сервис', value: 'Обслуживание в рум', icon: User },
        ],
        images: [
            '/zones/ps5-1.webp',
            '/zones/ps5-2.webp',
        ],
        color: '#FFFFFF'
    },
    {
        id: 'simracing',
        langameTitle: 'Автосимулятор',
        name: 'АВТОСИМУЛЯТОР',
        subtitle: 'Полное погружение',
        priceId: 'simracing',
        link: '/simracing', // Link for button
        features: [
            { label: 'Руль', value: 'Pro / Force Feedback', icon: Gauge },
            { label: 'Картинка', value: '55" 4K 120Hz', icon: Tv },
            { label: 'Кокпит', value: 'Гоночный каркас', icon: Shield },
            { label: 'Драйв', value: 'Вибрация и отдача', icon: Trophy },
        ],
        images: [
            '/zones/sim-1.webp',
            '/zones/sim-2.webp',
        ],
        color: '#00F0FF'
    },
    {
        id: 'common',
        langameTitle: 'Общий зал',
        name: 'ОБЩИЙ ЗАЛ',
        subtitle: 'База клуба',
        priceId: 'common',
        features: [
            { label: 'Парк', value: '25 Рабочих лошадок', icon: Monitor },
            { label: 'Бар', value: 'Снеки и напитки', icon: Coffee },
            { label: 'График', value: 'Работаем 24/7', icon: Clock },
            { label: 'Сервис', value: 'Помощь админов', icon: User },
        ],
        images: [
            '/zones/common-1.webp',
            '/zones/common-2.webp',
            '/zones/common-3.webp'
        ],
        color: '#555555'
    }
];

function calculateAppPrice(basePrice: number): number {
    const discountPrice = basePrice * 0.95;
    const rounded = Math.round(discountPrice);
    const lastDigit = rounded % 10;

    if (lastDigit > 6) {
        return rounded + (10 - lastDigit);
    } else {
        return rounded - lastDigit;
    }
}

type ExtendedPriceItem = {
    time: string;
    week: number;
    end: number;
    hours: string;
    isNight?: boolean;
}

type PriceGroup = {
    title: string;
    items: ExtendedPriceItem[];
}

function getPrices(pricingData: PricingData, config: typeof CARDS_CONFIG[0]): PriceGroup[] {
    const zoneData = pricingData.zones.find(z => z.id === config.priceId);
    if (!zoneData) return [];

    let categories = zoneData.categories;

    // Handle subZones
    if (zoneData.subZones && config.priceSubZone) {
        const sub = zoneData.subZones.find(s => s.name === config.priceSubZone);
        if (sub) categories = sub.categories;
    }

    if (!categories || categories.length === 0) return [];

    // Group items by category title (Morning/Day vs Evening/Night)
    const groups: PriceGroup[] = [];
    const targetGroups = ['Утро и День', 'Вечер и Ночь', 'Тарифы']; // Added 'Тарифы' for SimRacing

    targetGroups.forEach(targetTitle => {
        const cat = categories.find(c => c.title.toLowerCase().includes(targetTitle.toLowerCase()));
        if (cat) {
            const items: ExtendedPriceItem[] = [];
            const priority = ['1 ЧАС', '2 ЧАСА', '3 ЧАСА', '5 ЧАСОВ', 'НОЧЬ']; // Priority order

            priority.forEach(p => {
                const item = cat.items.find(i => i.time.toUpperCase().includes(p));
                if (item) {
                    items.push({
                        time: p,
                        week: item.week,
                        end: item.end,
                        hours: item.hours,
                        isNight: item.isNight
                    });
                }
            });

            if (items.length > 0) {
                groups.push({
                    title: targetTitle === 'Тарифы' ? 'Прайс' : targetTitle,
                    items: items
                });
            }
        }
    });

    return groups;
}


function MonitoringCard({ config, prices, status, idx }: { config: typeof CARDS_CONFIG[0], prices: PriceGroup[], status?: ClubZone, idx: number }) {
    const [currentImage, setCurrentImage] = useState(0);
    const [isWeekend, setIsWeekend] = useState(false);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImage((prev) => (prev + 1) % config.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImage((prev) => (prev - 1 + config.images.length) % config.images.length);
    };

    const openBooking = () => {
        window.dispatchEvent(new CustomEvent('open-booking'));
    };

    const totalPc = status?.pc_count || 0;
    const freePc = status?.free_pc_count || 0;
    const isFull = totalPc > 0 && freePc === 0;

    let statusColor = "text-[#00F0FF]";
    let statusBg = "bg-[#00F0FF]/10";
    let statusBorder = "border-[#00F0FF]/20";

    if (isFull) {
        statusColor = "text-[#FF2E63]";
        statusBg = "bg-[#FF2E63]/10";
        statusBorder = "border-[#FF2E63]/20";
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="group relative rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col h-full min-h-[680px]"
        >
            {/* IMAGE AREA */}
            <div className="relative h-[240px] shrink-0 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={config.images[currentImage]}
                            alt={`Игровая зона ${config.name} в CyberX Новокосино - ${config.subtitle}`}
                            fill
                            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-20">
                    <div className={`backdrop-blur-md px-3 py-1.5 rounded-full border ${statusBorder} ${statusBg} flex items-center gap-2`}>
                        <div className={`w-2 h-2 rounded-full ${isFull ? 'bg-[#FF2E63]' : 'bg-[#00F0FF]'} ${!isFull ? 'animate-pulse' : ''}`} />
                        <span className={`font-mono text-xs font-bold ${statusColor} uppercase tracking-wider`}>
                            {status ? `${freePc} СВОБОДНО` : 'ЗАГРУЗКА...'}
                        </span>
                    </div>
                </div>

                {config.images.length > 1 && (
                    <>
                        <button onClick={prevImage} className="absolute top-1/2 left-2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={nextImage} className="absolute top-1/2 right-2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}
            </div>

            {/* CONTENT AREA */}
            <div className="flex-1 p-5 relative flex flex-col">
                <div
                    className="absolute top-0 left-5 w-12 h-1 rounded-full"
                    style={{ backgroundColor: config.color }}
                />

                <div className="mb-3 mt-1">
                    <h3 className="font-tactic font-black text-2xl uppercase italic text-white leading-none mb-1 truncate">
                        {config.name}
                    </h3>
                    <p className="font-chakra font-bold text-[10px] uppercase text-white/40 tracking-[0.2em] truncate">
                        {config.subtitle}
                    </p>
                    {/* NEW DESCRIPTION */}
                    {/* @ts-ignore */}
                    {config.description && (
                        // @ts-ignore
                        <p className="mt-2 text-[11px] text-gray-400 leading-relaxed border-l-2 border-white/10 pl-2">
                            {/* @ts-ignore */}
                            {config.description}
                        </p>
                    )}
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {config.features.map((f, i) => (
                        <div key={i} className="flex flex-col">
                            <div className="flex items-center gap-1.5 mb-0.5">
                                <f.icon size={10} className="text-[#FF2E63]" />
                                <span className="text-[8px] font-chakra font-black text-white/30 uppercase tracking-wider">{f.label}</span>
                            </div>
                            <span className="text-[10px] font-bold text-gray-300 uppercase truncate">{f.value}</span>
                        </div>
                    ))}
                </div>

                {/* Pricing Grid */}
                <div className="mt-auto bg-white/5 rounded-xl p-3 border border-white/5 relative overflow-hidden flex flex-col gap-2">
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <div className="bg-[#111] p-0.5 rounded flex relative">
                            <motion.div
                                className="absolute top-0.5 bottom-0.5 w-[50%] bg-[#FF2E63] rounded-sm z-0"
                                initial={false}
                                animate={{ x: isWeekend ? "100%" : "0%" }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                            <button
                                onClick={() => setIsWeekend(false)}
                                className={`relative z-10 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider transition-colors duration-200 ${!isWeekend ? 'text-white' : 'text-gray-500 hover:text-white'}`}
                            >
                                Будни
                            </button>
                            <button
                                onClick={() => setIsWeekend(true)}
                                className={`relative z-10 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider transition-colors duration-200 ${isWeekend ? 'text-white' : 'text-gray-500 hover:text-white'}`}
                            >
                                Выходные
                            </button>
                        </div>

                        <div className="flex flex-col items-end gap-0.5">
                            <div className="text-[8px] font-bold text-gray-500 uppercase tracking-wider">
                                Клуб <span className="text-[#00F0FF]">/ APP -5%</span>
                            </div>
                        </div>
                    </div>

                    {prices.length > 0 ? prices.map((group, gIdx) => (
                        <div key={gIdx} className={`${gIdx > 0 ? 'mt-3 pt-3 border-t border-white/5' : ''}`}>
                            <div className="text-[10px] md:text-xs text-[#FF2E63] font-bold uppercase tracking-wider mb-3 text-center opacity-90">{group.title}</div>
                            <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 items-start`}>
                                {group.items.map((p, i) => {
                                    const basePrice = isWeekend ? p.end : p.week;
                                    const appPrice = calculateAppPrice(basePrice);

                                    return (
                                        <div key={i} className="flex flex-col items-center text-center bg-black/20 rounded-lg p-2 border border-white/5 mx-auto w-full">
                                            <div className={`text-[10px] md:text-xs font-chakra font-black uppercase mb-1 ${p.isNight ? 'text-[#FF2E63]' : 'text-white/60'}`}>
                                                {p.time}
                                            </div>

                                            <div className="flex flex-col items-center leading-none my-1">
                                                <div className="text-xl md:text-2xl font-tactic font-black text-[#00F0FF] mb-1 drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]">
                                                    {appPrice}
                                                </div>
                                                <div className="text-[10px] md:text-xs font-bold text-white/30 line-through decoration-white/20">
                                                    {basePrice}
                                                </div>
                                            </div>
                                            <div className="text-[9px] md:text-[10px] text-white/30 font-mono mt-1 leading-none whitespace-nowrap">
                                                {p.hours.replace(/ /g, '')}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )) : (
                        <div className="text-center text-sm text-white/30 py-6">Цены уточняются</div>
                    )}

                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2">
                    <button
                        onClick={openBooking}
                        className="flex-1 py-2.5 rounded-xl bg-[#FF2E63] hover:bg-[#FF2E63]/80 text-white transition-all font-chakra font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(255,46,99,0.3)] hover:shadow-[0_0_25px_rgba(255,46,99,0.5)]"
                    >
                        Забронировать
                    </button>
                    {/* @ts-ignore */}
                    {config.link && (
                        <Link
                            // @ts-ignore
                            href={config.link}
                            className="w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all"
                        >
                            <Info size={16} className="text-[#00F0FF]" />
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function MonitoringCards({ pricingData }: { pricingData?: PricingData }) {
    const [clubZones, setClubZones] = useState<ClubZone[] | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        const data = await getClubStatus();
        if (data) {
            setClubZones(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, []);

    const getZoneStatus = (title: string) => {
        if (!clubZones) return undefined;
        return clubZones.find(z => z.title.toLowerCase() === title.toLowerCase());
    };

    return (
        <section className="py-24 bg-[#050505] relative overflow-hidden" id="monitoring">
            {/* Header */}
            <div className="container mx-auto px-4 mb-16 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#FF2E63]/10 border border-[#FF2E63]/30">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF2E63] opacity-75 animate-ping"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF2E63]"></span>
                            </span>
                            <span className="font-mono text-[10px] text-[#FF2E63] uppercase tracking-widest">
                                Live Monitoring
                            </span>
                        </div>
                        <h2 className="font-tactic font-black text-4xl md:text-6xl uppercase italic text-white leading-none mb-6">
                            Игровые <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] to-[#B900FF]">Зоны</span>
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed max-w-xl">
                            9 уникальных игровых площадок. От демократичного общего зала до эксклюзивных Solo Premium комнат.
                        </p>

                        <div className="mt-8">
                            <Link
                                href="/prices"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#FF2E63]/50 transition-all group"
                            >
                                <span className="font-chakra font-bold text-sm uppercase tracking-wider text-white group-hover:text-[#FF2E63] transition-colors">
                                    Смотреть все цены
                                </span>
                                <ChevronRight size={16} className="text-gray-500 group-hover:text-[#FF2E63] transition-colors group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                        <div className="bg-[#111] border border-white/10 px-6 py-4 rounded-xl text-right min-w-[200px]">
                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Свободно мест</div>
                            <div className="font-tactic font-black text-4xl text-white leading-none flex items-baseline justify-end gap-2">
                                {clubZones ? clubZones.reduce((acc, z) => acc + z.free_pc_count, 0) : '...'}
                                <span className="text-sm font-bold text-white/20">/ {clubZones ? clubZones.reduce((acc, z) => acc + z.pc_count, 0) : '...'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="container mx-auto px-4 relative z-10">
                {loading && !clubZones && !pricingData ? (
                    <div className="text-white text-center py-20 font-mono">Загрузка данных...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CARDS_CONFIG.map((card, idx) => (
                            <MonitoringCard
                                key={card.id}
                                config={card}
                                idx={idx}
                                prices={pricingData ? getPrices(pricingData, card) : []}
                                status={getZoneStatus(card.langameTitle)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[800px] bg-[#FF2E63] blur-[300px] opacity-[0.03] rounded-full pointer-events-none" />
        </section>
    );
}
