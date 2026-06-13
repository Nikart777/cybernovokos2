'use client';

import { motion } from 'framer-motion';
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
    const scrollContainerRef = useRef<HTMLDivElement>(null);
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

    // Поддержка горизонтального скролла колесиком мыши на десктопе
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            // Если крутим колесико по вертикали, скроллим по горизонтали
            if (e.deltaY !== 0 && Math.abs(e.deltaX) === 0) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
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
            color: '#555555',
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
        <section className="relative bg-[#050505] py-16 md:py-24 overflow-hidden" id="zones">
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505] pointer-events-none" />
            
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)',
                    backgroundSize: '72px 72px',
                }}
            />

            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B900FF]/10 blur-[200px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center mb-8 shrink-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-4 md:mb-6 flex flex-col items-center text-center"
                >
                    <h2 className="font-tactic font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.85] text-white italic drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        9 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] to-[#B900FF] drop-shadow-[0_0_30px_rgba(255,46,99,0.8)]">Площадок</span>
                    </h2>
                    <p className="mt-4 text-[#00F0FF] font-chakra font-bold tracking-widest uppercase text-sm animate-pulse flex items-center gap-2 bg-[#00F0FF]/10 px-4 py-2 rounded-full border border-[#00F0FF]/30">
                        Свайпайте зоны <ChevronRight size={16} />
                    </p>
                </motion.div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full max-w-2xl mt-4">
                    <div className="flex items-center gap-3 px-5 h-12 rounded-full bg-[#111] border border-white/10 w-full sm:w-auto justify-center">
                        <Clock size={16} className="text-[#00F0FF]" />
                        <span className="font-chakra font-bold text-xs text-white/60 uppercase">
                            {isWeekend ? 'Выходной' : 'Будний день'}
                        </span>
                        <div className="w-[1px] h-3 bg-white/10" />
                        <span className="font-chakra font-bold text-xs text-white">
                            {currentTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>

                    <div className="bg-[#111] p-1 rounded-full border border-white/10 flex relative h-12 w-full sm:w-[240px] items-center shrink-0">
                        <motion.div
                            className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-[#FF2E63] rounded-full z-0 shadow-[0_0_15px_#FF2E63]"
                            initial={false}
                            animate={{ x: activePriceTab === 'end' ? '100%' : '0%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                        <button onClick={() => setActivePriceTab('week')} className={`flex-1 relative z-10 h-full text-xs font-chakra font-black uppercase tracking-wider transition-colors ${activePriceTab === 'week' ? 'text-white' : 'text-gray-500 hover:text-white'}`}>Будни</button>
                        <button onClick={() => setActivePriceTab('end')} className={`flex-1 relative z-10 h-full text-xs font-chakra font-black uppercase tracking-wider transition-colors ${activePriceTab === 'end' ? 'text-white' : 'text-gray-500 hover:text-white'}`}>Выходные</button>
                    </div>
                </div>
            </div>

            <div className="relative w-full z-20">
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-4 md:gap-8 px-4 md:px-8 w-full overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 pt-4"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {zones.map((zone) => (
                        <div key={zone.id} className="snap-center shrink-0 w-[90vw] md:w-[85vw] lg:w-[85vw] max-w-[1200px] h-[580px] md:h-[650px] lg:h-[700px]">
                            <ZoneCard 
                                zone={zone} 
                                status={getZoneStatus(zone.langameTitle)} 
                                activePriceTab={activePriceTab} 
                                getCurrentPrice={getCurrentPrice} 
                            />
                        </div>
                    ))}
                    {/* Пустой блок для отступа в конце скролла */}
                    <div className="shrink-0 w-4 md:w-8" />
                </div>
            </div>
        </section>
    );
}

function ZoneCard({ 
    zone, 
    status,
    activePriceTab,
    getCurrentPrice
}: { 
    zone: ZoneWithPrice;
    status: ClubZone | undefined;
    activePriceTab: 'week' | 'end';
    getCurrentPrice: (prices: any) => { price: number; appPrice: number; label: string };
}) {
    const [imgIdx, setImgIdx] = useState(0);
    
    // Легкая анимация изображений
    useEffect(() => {
        const interval = setInterval(() => {
            setImgIdx((prev) => (prev + 1) % zone.images.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [zone.images.length]);

    const totalPc = status?.pc_count || 0;
    const freePc = status?.free_pc_count || 0;
    const isFull = totalPc > 0 && freePc === 0;
    const isAllFree = totalPc > 0 && freePc === totalPc;

    let statusBg = isFull ? 'bg-[#FF2E63]/30 border-[#FF2E63]/50' : isAllFree ? 'bg-[#00FF7F]/30 border-[#00FF7F]/50' : 'bg-[#FF8C00]/30 border-[#FF8C00]/50';
    let statusText = isFull ? 'text-[#FF2E63] drop-shadow-[0_0_10px_rgba(255,46,99,0.8)]' : isAllFree ? 'text-[#00FF7F] drop-shadow-[0_0_10px_rgba(0,255,127,0.8)]' : 'text-[#FF8C00] drop-shadow-[0_0_10px_rgba(255,140,0,0.8)]';

    return (
        <div className="relative w-full h-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border-2 border-white/10 bg-[#111] group shadow-2xl">
            {/* Оптимизированная смена изображений без тяжелых AnimatePresence */}
            {zone.images.map((src, idx) => (
                <div 
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === imgIdx ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
                >
                    <Image src={src} alt={zone.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent h-full" />

            <div className="absolute top-6 left-6 right-6 md:top-10 md:left-10 flex justify-between items-start z-10 pointer-events-none">
                <div className="p-4 md:p-6 rounded-3xl bg-black/60 border border-white/20 backdrop-blur-md shadow-lg">
                    <zone.icon size={40} className="md:w-12 md:h-12" style={{ color: zone.color }} />
                </div>
                <div className="flex gap-3 flex-col items-end">
                    {zone.isNew && <div className="px-5 py-2 md:py-3 rounded-full text-xs md:text-sm font-chakra font-black uppercase bg-[#00F0FF]/30 text-[#00F0FF] border border-[#00F0FF]/50 shadow-[0_0_20px_rgba(0,240,255,0.5)]">NEW</div>}
                    {zone.isPopular && <div className="px-5 py-2 md:py-3 rounded-full text-xs md:text-sm font-chakra font-black uppercase bg-[#FF2E63]/30 text-[#FF2E63] border border-[#FF2E63]/50 shadow-[0_0_20px_rgba(255,46,99,0.5)] flex items-center gap-2"><Star size={14} fill="currentColor"/>HIT</div>}
                    {zone.isSimRacing && <div className="px-5 py-2 md:py-3 rounded-full text-xs md:text-sm font-chakra font-black uppercase bg-[#FF8C00]/30 text-[#FF8C00] border border-[#FF8C00]/50 shadow-[0_0_20px_rgba(255,140,0,0.5)]">PRO</div>}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10 flex flex-col justify-end pointer-events-none h-full">
                <h3 className="font-tactic font-black text-4xl md:text-6xl lg:text-7xl uppercase text-white mb-3 md:mb-5 leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] group-hover:text-[#00F0FF] transition-colors">{zone.name}</h3>
                <p className="font-inter text-sm md:text-xl lg:text-2xl text-white/80 mb-6 md:mb-10 leading-relaxed max-w-3xl">{zone.description}</p>

                <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-10">
                    {zone.specs.map((spec, i) => (
                        <span key={i} className="px-4 py-2 md:px-6 md:py-3 rounded-xl bg-black/60 border border-white/20 text-xs md:text-base font-chakra font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-lg">{spec}</span>
                    ))}
                </div>

                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between w-full">
                    {/* Status Box */}
                    <div className={`px-6 py-5 md:py-6 md:px-8 rounded-3xl border flex flex-col justify-center backdrop-blur-md shadow-lg ${statusBg} md:w-1/3 shrink-0`}>
                        <span className="text-xs md:text-sm lg:text-base font-chakra font-bold uppercase tracking-widest text-white/80 mb-2">Свободно ПК</span>
                        <div className="flex items-baseline gap-2">
                            <span className={`font-tactic font-black text-4xl md:text-5xl lg:text-6xl ${statusText}`}>
                                {status ? freePc : '-'}
                            </span>
                            <span className="font-chakra font-bold text-sm md:text-xl text-white/60">
                                / {status ? totalPc : '-'}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 md:w-[60%] shrink-0">
                        <div className="grid grid-cols-3 gap-3 md:gap-4 backdrop-blur-md">
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
                                    <div key={pkg.key} className={`p-4 md:p-5 rounded-2xl border flex flex-col justify-center items-center text-center shadow-lg ${isMain ? 'border-[#00F0FF]/50 bg-gradient-to-br from-[#00F0FF]/20 to-[#B900FF]/20' : 'border-white/10 bg-black/60'}`}>
                                        <span className={`text-[10px] md:text-sm font-chakra font-bold uppercase tracking-widest mb-1.5 md:mb-2 ${isMain ? 'text-[#00F0FF]' : 'text-white/60'}`}>
                                            {pkg.label}
                                        </span>
                                        <span className={`font-tactic font-black text-2xl md:text-4xl leading-none mb-1 md:mb-2 ${isMain ? 'text-[#00F0FF] drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]' : 'text-white'}`}>
                                            {appP}₽
                                        </span>
                                        <span className="text-[10px] md:text-sm font-bold text-white/40 line-through leading-none">
                                            {p}₽
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        
                        <button 
                            onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
                            className="pointer-events-auto w-full py-5 md:py-6 rounded-2xl bg-white/10 hover:bg-[#FF2E63] border border-white/20 hover:border-[#FF2E63] font-chakra font-black text-sm md:text-lg uppercase tracking-widest text-white transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg hover:shadow-[0_0_30px_rgba(255,46,99,0.6)]"
                        >
                            ЗАБРОНИРОВАТЬ МЕСТО <ChevronRight size={24} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-3 transition-all duration-300" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
