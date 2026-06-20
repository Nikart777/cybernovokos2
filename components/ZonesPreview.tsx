'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';

import { Monitor, Users, Tv, Gauge, ChevronRight, Gamepad2, Crown, Star, Clock } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { PricingData } from '@/app/lib/types';


type ClubZone = {
  id: number;
  title: string;
  pc_count: number;
  free_pc_count: number;
  color?: string;
};

// Fetch from our API route
async function getClubStatus(): Promise<ClubZone[] | null> {
  try {
    const res = await fetch('/api/club-status', {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error('Club Status API Error:', e);
    return null;
  }
}

interface ZoneWithPrice {
    id: string;
    name: string;
    langameTitle: string;
    description: string;
    image: string;
    images: string[];
    icon: any;
    color: string;
    specs: string[];
    prices: {
        oneHour: { week: number; end: number };
        threeHours: { week: number; end: number };
        fiveHours: { week: number; end: number };
        night?: { week: number; end: number };
    };
    isPopular?: boolean;
    isNew?: boolean;
    isSimRacing?: boolean;
    isCommon?: boolean;
}

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

export default function ZonesPreview({ pricingData }: { pricingData?: PricingData }) {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });
    
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

    const [activePriceTab, setActivePriceTab] = useState<'week' | 'end'>('week');
    const [clubZones, setClubZones] = useState<ClubZone[] | null>(null);
    
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const [isWeekend, setIsWeekend] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now);
            const day = now.getDay();
            
            setIsWeekend(day === 0 || day === 6);
            setActivePriceTab((day === 0 || day === 6) ? 'end' : 'week');
        };
        
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getClubStatus();
            if (data) {
                setClubZones(data);
            }
        };
        
        fetchData();
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, []);

    const getZoneStatus = (langameTitle: string): ClubZone | undefined => {
        if (!clubZones) return undefined;
        return clubZones.find(z => z.title.toLowerCase() === langameTitle.toLowerCase());
    };

    const getPricesForZone = (zoneId: string) => {
        if (!pricingData?.zones) return null;
        
        const zone = pricingData.zones.find(z => {
            if (zoneId === 'solo-premium' || zoneId === 'solo-pro') return z.id === 'solo';
            if (zoneId === 'duo') return z.id === 'vip_duo';
            if (zoneId === 'bootcamp' || zoneId === 'vip-bootcamp') return z.id === 'bootcamp';
            if (zoneId === 'ps5') return z.id === 'tv';
            if (zoneId === 'simracing') return z.id === 'simracing';
            if (zoneId === 'common') return z.id === 'common';
            return z.id === zoneId;
        });
        
        if (!zone) return null;

        if (zone.subZones && zoneId === 'ps5') {
            const subZone = zone.subZones.find(s => s.name === 'TV STANDARD');
            if (subZone?.categories?.[0]?.items) {
                const items = subZone.categories[0].items;
                return {
                    oneHour: { week: items[0]?.week || 0, end: items[0]?.end || 0 },
                    threeHours: { week: items[1]?.week || 0, end: items[1]?.end || 0 },
                    fiveHours: { week: items[2]?.week || 0, end: items[2]?.end || 0 },
                };
            }
        }

        if (!zone.categories?.[0]?.items) return null;
        
        const items = zone.categories[0].items;
        const eveningItems = zone.categories[1]?.items || items;
        
        return {
            oneHour: { week: items[0]?.week || 0, end: items[0]?.end || 0 },
            threeHours: { week: items[1]?.week || 0, end: items[1]?.end || 0 },
            fiveHours: { week: items[2]?.week || 0, end: items[2]?.end || 0 },
            night: eveningItems.find((i: any) => i.isNight) || undefined,
        };
    };

    const getCurrentPrice = (prices: any) => {
        if (!prices) return { price: 0, appPrice: 0, label: '1 час' };
        const basePrice = activePriceTab === 'week' ? prices.oneHour.week : prices.oneHour.end;
        return { 
            price: basePrice, 
            appPrice: calculateAppPrice(basePrice), 
            label: '1 час' 
        };
    };

    const zones: ZoneWithPrice[] = [
        {
            id: 'common',
            name: 'ОБЩИЙ ЗАЛ',
            langameTitle: 'Общий зал',
            description: 'База клуба - 25 рабочих мест',
            image: '/zones/common-1.webp',
            images: ['/zones/common-1.webp', '/zones/common-2.webp', '/zones/common-3.webp'],
            icon: Monitor,
            color: '#FFFFFF',
            specs: ['RTX 4060', '144 Гц', '24.5"'],
            prices: getPricesForZone('common') || { oneHour: { week: 150, end: 170 }, threeHours: { week: 410, end: 470 }, fiveHours: { week: 630, end: 730 } },
            isCommon: true,
        },
        {
            id: 'solo-premium',
            name: 'SOLO PREMIUM',
            langameTitle: 'Solo Premium',
            description: 'Уединенный комфорт с RTX 5070',
            image: '/zones/solo-premium-1.webp',
            images: ['/zones/solo-premium-1.webp', '/zones/solo-premium-2.webp', '/zones/solo-premium-3.webp'],
            icon: Monitor,
            color: '#FF2E63',
            specs: ['RTX 5070 12GB', '240 Гц / 2K', 'Logitech G Pro'],
            prices: getPricesForZone('solo-premium') || { oneHour: { week: 230, end: 280 }, threeHours: { week: 630, end: 690 }, fiveHours: { week: 950, end: 1050 } },
            isNew: true,
        },
        {
            id: 'solo-pro',
            name: 'SOLO PRO',
            langameTitle: 'Solo Pro',
            description: 'Киберспорт уровень',
            image: '/zones/solo-pro-1.webp',
            images: ['/zones/solo-pro-1.webp', '/zones/solo-pro-2.webp', '/zones/solo-pro-3.webp'],
            icon: Gamepad2,
            color: '#00F0FF',
            specs: ['RTX 5070 12GB', '400 Гц BenQ', 'G Pro Superlight'],
            prices: getPricesForZone('solo-pro') || { oneHour: { week: 230, end: 280 }, threeHours: { week: 630, end: 690 }, fiveHours: { week: 950, end: 1050 } },
            isPopular: true,
        },
        {
            id: 'duo',
            name: 'DUO ZONE',
            langameTitle: 'Duo',
            description: 'Играем вдвоем',
            image: '/zones/duo-1.webp',
            images: ['/zones/duo-1.webp', '/zones/duo-2.webp', '/zones/duo-3.webp'],
            icon: Users,
            color: '#B900FF',
            specs: ['RTX 4060', '240 Гц IPS', 'Зона для двоих'],
            prices: getPricesForZone('duo') || { oneHour: { week: 190, end: 210 }, threeHours: { week: 520, end: 580 }, fiveHours: { week: 780, end: 890 } },
        },
        {
            id: 'bootcamp',
            name: 'BOOTCAMP',
            langameTitle: 'Bootcamp',
            description: 'Приватная комната для команды',
            image: '/zones/bootcamp-std-1.webp',
            images: ['/zones/bootcamp-std-1.webp', '/zones/bootcamp-std-2.webp', '/zones/bootcamp-std-3.webp'],
            icon: Crown,
            color: '#FF7A00',
            specs: ['RTX 4060', '144 Гц', '5 мест'],
            prices: getPricesForZone('bootcamp') || { oneHour: { week: 170, end: 190 }, threeHours: { week: 460, end: 520 }, fiveHours: { week: 700, end: 800 } },
        },
        {
            id: 'vip-bootcamp',
            name: 'VIP BOOTCAMP',
            langameTitle: 'VIP Bootcamp',
            description: 'Приватная комната для команды',
            image: '/zones/bootcamp-1.webp',
            images: ['/zones/bootcamp-1.webp', '/zones/bootcamp-2.webp', '/zones/bootcamp-3.webp', '/zones/bootcamp-4.webp', '/zones/bootcamp-5.webp'],
            icon: Crown,
            color: '#FFD700',
            specs: ['RTX 4070', '240 Гц', '5 мест в ряд'],
            prices: getPricesForZone('vip_duo') || { oneHour: { week: 190, end: 210 }, threeHours: { week: 520, end: 580 }, fiveHours: { week: 780, end: 890 } },
        },
        {
            id: 'ps5',
            name: 'PS5 LOUNGE',
            langameTitle: 'PS5 Lounge',
            description: 'Зона PlayStation 5',
            image: '/zones/ps5-3.webp',
            images: ['/zones/ps5-3.webp', '/zones/ps5-4.webp', '/zones/ps5-5.webp'],
            icon: Tv,
            color: '#0072CE',
            specs: ['70" 4K Ultra HD', 'FC26 / UFC 5', 'Атмосфера'],
            prices: getPricesForZone('ps5') || { oneHour: { week: 340, end: 400 }, threeHours: { week: 780, end: 960 }, fiveHours: { week: 1180, end: 1420 } },
        },
        {
            id: 'ps5-vip',
            name: 'PS5 VIP',
            langameTitle: 'PS5 VIP Комната',
            description: 'Личный кинотеатр',
            image: '/zones/ps5-1.webp',
            images: ['/zones/ps5-1.webp', '/zones/ps5-2.webp'],
            icon: Tv,
            color: '#FFFFFF',
            specs: ['70" 4K', 'Диван и пуфы', 'Приватность'],
            prices: { oneHour: { week: 390, end: 460 }, threeHours: { week: 910, end: 1100 }, fiveHours: { week: 1350, end: 1640 } },
        },
        {
            id: 'simracing',
            name: 'АВТОСИМУЛЯТОР',
            langameTitle: 'Автосимулятор',
            description: 'Профессиональный гоночный симулятор',
            image: '/zones/sim-1.webp',
            images: ['/zones/sim-1.webp', '/zones/sim-2.webp', '/zones/sim-3.webp', '/zones/sim-4.webp'],
            icon: Gauge,
            color: '#FF8C00',
            specs: ['Moza R12', '55" 4K 120Hz', 'Гоночный кокпит'],
            prices: getPricesForZone('simracing') || { oneHour: { week: 580, end: 850 }, threeHours: { week: 980, end: 1290 }, fiveHours: { week: 1350, end: 1650 } },
            isSimRacing: true,
        },
    ];

    return (
        <section ref={targetRef} className="relative md:h-[600vh] bg-[#050505]" id="zones">
            <div className="md:sticky md:top-0 md:h-screen w-full flex flex-col justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[#050505] pointer-events-none" />
                
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)',
                        backgroundSize: '72px 72px',
                    }}
                />

                <div className="container mx-auto px-4 relative z-10 flex flex-col xl:flex-row items-center xl:items-end justify-between mb-6 md:mb-10 mt-8 md:mt-12 shrink-0 gap-6 xl:gap-8">
                    
                    {/* Compact Title Section */}
                    <div className="flex flex-col items-center xl:items-start relative w-full xl:w-auto overflow-hidden">
                        <div className="flex items-center gap-4 sm:gap-6">
                            {/* 9 */}
                            <motion.div 
                                initial={{ x: "-100%", skewX: -20, opacity: 0 }}
                                whileInView={{ x: 0, skewX: 0, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="flex items-end font-tactic font-black uppercase italic leading-none"
                            >
                                <span className="text-[5.5rem] md:text-[7rem] lg:text-[8rem] text-[#FF2E63] drop-shadow-[0_0_20px_rgba(255,46,99,0.5)]">9</span>
                            </motion.div>

                            {/* ИГРОВЫХ ПЛОЩАДОК */}
                            <motion.div 
                                initial={{ x: "100%", skewX: 20, opacity: 0 }}
                                whileInView={{ x: 0, skewX: 0, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                                className="flex flex-col justify-center font-tactic font-black uppercase italic leading-none mt-2"
                            >
                                <span className="text-2xl sm:text-3xl md:text-4xl text-[#00F0FF] drop-shadow-[0_0_15px_rgba(0,240,255,0.3)] mb-1">ИГРОВЫХ</span>
                                <span className="text-2xl sm:text-3xl md:text-4xl text-white">ПЛОЩАДОК</span>
                            </motion.div>
                        </div>
                        
                        {/* Speed Line Divider */}
                        <motion.div 
                            initial={{ scaleX: 0, opacity: 0 }}
                            whileInView={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "circOut", delay: 0.3 }}
                            className="w-full h-[3px] bg-gradient-to-r from-[#FF2E63] via-[#00F0FF] to-transparent shadow-[0_0_10px_#00F0FF] origin-left mt-2 md:mt-4"
                        />
                    </div>

                    {/* Filters Section */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full xl:w-auto shrink-0">
                        <div className="flex items-center gap-3 px-5 h-12 bg-[#111] border-2 border-white/10 w-full sm:w-auto justify-center skew-x-[-12deg]">
                            <div className="skew-x-[12deg] flex items-center gap-3">
                                <Clock size={16} className="text-[#FF2E63]" />
                                <span className="font-chakra font-bold text-xs text-white/60 uppercase">
                                    {isWeekend ? 'Выходной' : 'Будний день'}
                                </span>
                                <div className="w-[2px] h-3 bg-white/20" />
                                <span className="font-chakra font-bold text-xs text-white">
                                    {currentTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>

                        <div className="bg-[#111] p-1 border-2 border-white/10 flex relative h-12 w-full sm:w-[240px] items-center shrink-0 skew-x-[-12deg]">
                            <motion.div
                                className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-[#FF2E63] z-0"
                                initial={false}
                                animate={{ x: activePriceTab === 'end' ? '100%' : '0%' }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                            <button onClick={() => setActivePriceTab('week')} className={`flex-1 relative z-10 h-full text-xs font-chakra font-black uppercase tracking-wider transition-colors skew-x-[12deg] ${activePriceTab === 'week' ? 'text-white' : 'text-gray-500 hover:text-white'}`}>Будни</button>
                            <button onClick={() => setActivePriceTab('end')} className={`flex-1 relative z-10 h-full text-xs font-chakra font-black uppercase tracking-wider transition-colors skew-x-[12deg] ${activePriceTab === 'end' ? 'text-white' : 'text-gray-500 hover:text-white'}`}>Выходные</button>
                        </div>
                    </div>
                </div>

                {/* MOBILE TRACK: cards stacked vertically */}
                <div className="md:hidden relative w-full z-20 flex flex-col pb-20 px-4 gap-6 pt-4">
                    {zones.map((zone, idx) => (
                        <div key={zone.id} className="w-full">
                            <ZoneCard 
                                zone={zone} 
                                idx={idx + 1}
                                status={getZoneStatus(zone.langameTitle)} 
                                activePriceTab={activePriceTab} 
                                getCurrentPrice={getCurrentPrice} 
                            />
                        </div>
                    ))}
                </div>

                {/* DESKTOP TRACK: Framer Motion Sticky Scroll */}
                <div className="hidden md:flex relative w-full z-20 items-center mb-10 md:mb-0 pb-24 md:pb-0 h-[65vh] min-h-[500px] max-h-[800px]">
                    <motion.div style={{ x }} className="flex gap-8 md:gap-12 px-4 md:px-10 h-full w-max items-center will-change-transform transform-gpu">
                        {zones.map((zone, idx) => (
                            <div key={zone.id} className="w-[90vw] md:w-[75vw] lg:w-[65vw] max-w-[1100px] h-[95%] shrink-0 flex items-center">
                                <ZoneCard 
                                    zone={zone} 
                                    idx={idx + 1}
                                    status={getZoneStatus(zone.langameTitle)} 
                                    activePriceTab={activePriceTab} 
                                    getCurrentPrice={getCurrentPrice} 
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function ZoneCard({ 
    zone, 
    idx,
    status,
    activePriceTab,
    getCurrentPrice
}: { 
    zone: ZoneWithPrice;
    idx: number;
    status: ClubZone | undefined;
    activePriceTab: 'week' | 'end';
    getCurrentPrice: (prices: any) => { price: number; appPrice: number; label: string };
}) {
    const [imgIdx, setImgIdx] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setImgIdx((prev) => (prev + 1) % zone.images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [zone.images.length]);

    const totalPc = status?.pc_count || 0;
    const freePc = status?.free_pc_count || 0;
    const isFull = totalPc > 0 && freePc === 0;
    const isAllFree = totalPc > 0 && freePc === totalPc;

    const statusColor = isFull ? '#FF2E63' : isAllFree ? '#00FF7F' : '#FF8C00';
    const statusLabel = isFull ? 'ПИТ-СТОП ЗАНЯТ' : 'СВОБОДНО';

    return (
        <div className="relative w-full h-auto md:h-full bg-[#0A0A0A] border-2 border-white/10 group flex flex-col md:flex-row transform-gpu overflow-hidden">
            {/* Картинка: Жесткий диагональный срез на десктопе */}
            <div className="relative w-full h-[220px] md:w-[55%] md:h-full shrink-0 z-0">
                <div className="absolute inset-0 md:[clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]">
                    {zone.images.map((src, i) => (
                        <div 
                            key={src}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === imgIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            <Image src={src} alt={zone.name} fill className="object-cover" />
                        </div>
                    ))}
                    {/* Градиент для затемнения подложки номера */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 md:hidden z-20" />
                </div>
                
                {/* Номер зоны поверх картинки */}
                <div className="absolute top-4 left-4 z-30 flex items-center">
                    <div className="bg-[#FF2E63] text-black font-tactic italic font-black text-3xl px-3 py-1 skew-x-[-12deg]">
                        <span className="block skew-x-[12deg] leading-none">{String(idx).padStart(2, '0')}</span>
                    </div>
                    {zone.isNew && <div className="ml-2 bg-[#00F0FF] text-black font-chakra font-black text-[10px] px-2 py-1 skew-x-[-12deg] uppercase"><span className="block skew-x-[12deg]">NEW</span></div>}
                    {zone.isPopular && <div className="ml-2 bg-[#FFD700] text-black font-chakra font-black text-[10px] px-2 py-1 skew-x-[-12deg] uppercase"><span className="block skew-x-[12deg] flex items-center gap-1"><Star size={10}/>HIT</span></div>}
                </div>
            </div>

            {/* Контент (Панель телеметрии) */}
            <div className="relative z-20 flex flex-col justify-between w-full md:w-[45%] h-auto md:h-full p-4 md:p-6 lg:p-8 bg-[#0A0A0A] md:-ml-[10%]">
                
                {/* Заголовок */}
                <div className="mb-4">
                    <h3 className="font-tactic font-black text-3xl sm:text-4xl lg:text-5xl uppercase text-white leading-none italic group-hover:text-[#FF2E63] transition-colors">{zone.name}</h3>
                    <p className="font-chakra font-bold tracking-widest text-[10px] md:text-xs text-white/50 uppercase mt-2 border-l-2 border-[#FF2E63] pl-2">{zone.description}</p>
                </div>
                
                {/* Телеметрия (Характеристики) */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {zone.specs.map((spec, i) => (
                        <div key={i} className="bg-[#111] border border-white/5 p-2 flex flex-col justify-center skew-x-[-6deg]">
                            <span className="skew-x-[6deg] font-chakra font-bold text-[9px] text-white/40 uppercase tracking-widest">SPEC 0{i+1}</span>
                            <span className="skew-x-[6deg] font-tactic text-sm text-white uppercase italic mt-1 truncate">{spec}</span>
                        </div>
                    ))}
                </div>

                {/* Табло свободных мест (STATUS) */}
                <div className="border border-white/10 bg-[#111] p-3 md:p-4 mb-4 flex items-center justify-between skew-x-[-6deg]">
                    <div className="skew-x-[6deg] flex flex-col">
                        <span className="font-chakra font-black text-[10px] uppercase text-white/40 tracking-widest">STATUS</span>
                        <span className="font-tactic text-xs italic mt-1" style={{ color: statusColor }}>{statusLabel}</span>
                    </div>
                    <div className="skew-x-[6deg] flex items-end gap-1">
                        <span className="font-tactic font-black text-3xl leading-none" style={{ color: statusColor }}>{status ? freePc : '-'}</span>
                        <span className="font-chakra text-xs text-white/30 font-bold mb-1">/ {status ? totalPc : '-'}</span>
                    </div>
                </div>

                {/* Табло цен (PIT STOP TARIFFS) */}
                <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-[2px] flex-1 bg-white/10" />
                        <span className="font-chakra font-bold text-[9px] tracking-[0.2em] text-white/30 uppercase">ТАРИФЫ / {activePriceTab === 'week' ? 'БУДНИ' : 'ВЫХОДНЫЕ'}</span>
                        <div className="h-[2px] flex-1 bg-white/10" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { label: '1 ЧАС', key: 'oneHour' },
                            { label: '3 ЧАСА', key: 'threeHours' },
                            { label: '5 ЧАСОВ', key: 'fiveHours' }
                        ].map((pkg, i) => {
                            const p = zone.prices?.[pkg.key as keyof typeof zone.prices]?.[activePriceTab] || 0;
                            let appP = p;
                            if (p > 0) {
                                if (p <= 300) appP = p - 20;
                                else if (p <= 800) appP = p - 50;
                                else appP = p - 100;
                            }
                            
                            const isMain = i === 0;
                            return (
                                <div key={pkg.key} className={`py-2 px-1 flex flex-col items-center justify-between border-b-2 skew-x-[-6deg] h-full ${isMain ? 'bg-gradient-to-t from-[#FF2E63]/20 to-transparent border-[#FF2E63]' : 'bg-[#111] border-white/20'}`}>
                                    <div className="skew-x-[6deg] w-full flex flex-col items-center h-full">
                                        {/* Label */}
                                        <span className={`font-chakra font-black text-[10px] md:text-[11px] uppercase tracking-widest mb-2 text-center ${isMain ? 'text-[#FF2E63]' : 'text-white/40'}`}>
                                            {pkg.label}
                                        </span>
                                        
                                        {/* App Price */}
                                        <div className="flex flex-col items-center mb-2">
                                            <span className="bg-[#FF2E63] text-white font-chakra font-bold text-[7px] px-1.5 py-[2px] uppercase rounded-sm tracking-wider mb-1.5 leading-none shadow-[0_0_10px_rgba(255,46,99,0.3)]">
                                                В приложении
                                            </span>
                                            <span className={`font-tactic font-black text-xl md:text-2xl leading-none ${isMain ? 'text-white' : 'text-white/80'}`}>
                                                {appP}₽
                                            </span>
                                        </div>
                                        
                                        {/* Cashier Price */}
                                        {p > 0 ? (
                                            <div className="flex flex-col items-center opacity-50 mt-auto pt-1.5 border-t border-white/10 w-[80%] mx-auto">
                                                <span className="font-chakra font-bold text-[7px] text-white uppercase tracking-wider mb-1 leading-none">
                                                    На кассе
                                                </span>
                                                <span className="font-tactic font-bold text-xs text-white line-through decoration-[#FF2E63] leading-none">
                                                    {p}₽
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="mt-auto h-[22px] w-full"></div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
            
            {/* Декоративные диагональные полосы в стиле гоночного трека */}
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20 hidden md:block">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0L100 50V100L0 0H50Z" fill="url(#stripes)"/>
                    <defs>
                        <pattern id="stripes" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                            <line x1="0" y="0" x2="0" y2="10" stroke="white" strokeWidth="4"/>
                        </pattern>
                    </defs>
                </svg>
            </div>
        </div>
    );
}
