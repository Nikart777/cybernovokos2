'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Monitor, Users, Tv, Gauge, ChevronRight, Gamepad2, Crown, Zap, Star, ArrowRight, ChevronLeft, ChevronDown, Clock } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PricingData } from '@/app/lib/types';
import SimRacingCard from '@/components/SimRacingCard';

type ClubZone = {
  id: number;
  title: string;
  pc_count: number;
  free_pc_count: number;
  color?: string;
};

// Fetch from our API route (which uses server-side env vars)
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
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const [hoveredZone, setHoveredZone] = useState<number | null>(null);
    const [activePriceTab, setActivePriceTab] = useState<'week' | 'end'>('week');
    const [expandedZone, setExpandedZone] = useState<string | null>(null);
    const [clubZones, setClubZones] = useState<ClubZone[] | null>(null);
    const [totalFree, setTotalFree] = useState(0);
    const [totalPc, setTotalPc] = useState(0);
    
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const [currentPeriod, setCurrentPeriod] = useState<'day' | 'evening' | 'night'>('day');
    const [isWeekend, setIsWeekend] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now);
            const hours = now.getHours();
            const day = now.getDay();
            
            if (hours >= 22 || hours < 8) {
                setCurrentPeriod('night');
            } else if (hours >= 17) {
                setCurrentPeriod('evening');
            } else {
                setCurrentPeriod('day');
            }
            
            setIsWeekend(day === 0 || day === 6);
            setActivePriceTab((day === 0 || day === 6) ? 'end' : 'week');
        };
        
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    // Fetch Langame data
    useEffect(() => {
        const fetchData = async () => {
            const data = await getClubStatus();
            if (data) {
                setClubZones(data);
                const free = data.reduce((acc: number, z: ClubZone) => acc + z.free_pc_count, 0);
                const total = data.reduce((acc: number, z: ClubZone) => acc + z.pc_count, 0);
                setTotalFree(free);
                setTotalPc(total);
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
        
        // Always show 1 hour price as main price
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
            // VIP BOOTCAMP uses vip_duo prices from prices.json
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
        <section ref={containerRef} className="relative py-24 md:py-32 bg-[#0a0a0a] overflow-hidden" id="zones">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-[#0a0a0a]" />
            
            <div className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                }}
            />

            <motion.div style={{ y }} className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B900FF]/10 blur-[200px] rounded-full" />
            <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }} className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF2E63]/10 blur-[200px] rounded-full" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 md:mb-24"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75 animate-ping"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
                        </span>
                        <span className="font-chakra font-bold text-xs text-white/60 tracking-wide uppercase">
                            Live Статус
                        </span>
                    </div>
                    
                    {/* Title */}
                    <h2 className="font-tactic font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.85] text-white mb-4 italic">
                        9 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] to-[#B900FF]">Площадок</span>
                    </h2>
                    
                    {/* Description */}
                    <p className="font-inter text-base md:text-lg text-white/60 leading-relaxed mb-6 max-w-xl">
                        От демократичного общего зала до эксклюзивных Solo Premium комнат.
                    </p>

                    {/* CTA Button - Full width on mobile */}
                    <Link
                        href="/prices"
                        className="group inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-white/5 border border-white/10 font-chakra font-bold text-sm uppercase tracking-wider text-white hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 w-full sm:w-fit"
                    >
                        Все цены
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Time Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-8"
                >
                    <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#111] border border-white/10">
                        <Clock size={16} className="text-[#00F0FF]" />
                        <span className="font-chakra font-bold text-xs text-white/60 uppercase">
                            {isWeekend ? 'Выходной' : 'Будний день'}
                        </span>
                        <div className="w-[1px] h-3 bg-white/10" />
                        <span className="font-chakra font-bold text-xs text-white">
                            {currentTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase"
                            style={{
                                backgroundColor: currentPeriod === 'night' ? '#FF2E63/20' : currentPeriod === 'evening' ? '#B900FF/20' : '#00F0FF/20',
                                color: currentPeriod === 'night' ? '#FF2E63' : currentPeriod === 'evening' ? '#B900FF' : '#00F0FF',
                            }}
                        >
                            {currentPeriod === 'night' ? 'Ночь' : currentPeriod === 'evening' ? 'Вечер' : 'День'}
                        </span>
                    </div>
                </motion.div>

                {/* Price Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-8"
                >
                    <div className="bg-[#111] p-1 rounded-full border border-white/10 flex relative">
                        <motion.div
                            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#FF2E63] rounded-full z-0 shadow-[0_0_15px_#FF2E63]"
                            initial={false}
                            animate={{ x: activePriceTab === 'end' ? '100%' : '0%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                        <button onClick={() => setActivePriceTab('week')} className={`relative z-10 px-6 py-2 text-sm font-chakra font-black uppercase tracking-wider transition-colors ${activePriceTab === 'week' ? 'text-white' : 'text-gray-500 hover:text-white'}`}>Будни</button>
                        <button onClick={() => setActivePriceTab('end')} className={`relative z-10 px-6 py-2 text-sm font-chakra font-black uppercase tracking-wider transition-colors ${activePriceTab === 'end' ? 'text-white' : 'text-gray-500 hover:text-white'}`}>Выходные</button>
                    </div>
                </motion.div>

                {/* Zones Grid - Exclude SimRacing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {zones.filter(z => !z.isSimRacing).map((zone, idx) => {
                        const status = getZoneStatus(zone.langameTitle);
                        return (
                            <ZoneCard 
                                key={zone.id} 
                                zone={zone} 
                                idx={idx}
                                hoveredZone={hoveredZone}
                                setHoveredZone={setHoveredZone}
                                activePriceTab={activePriceTab}
                                currentPeriod={currentPeriod}
                                getCurrentPrice={getCurrentPrice}
                                status={status}
                                expandedZone={expandedZone}
                                setExpandedZone={setExpandedZone}
                                pricingData={pricingData}
                            />
                        );
                    })}
                </div>

                {/* SimRacing - Separate Full Width Card */}
                <div className="mb-12">
                    {(() => {
                        const simRacingZone = zones.find(z => z.isSimRacing);
                        const simRacingStatus = simRacingZone ? getZoneStatus(simRacingZone.langameTitle) : undefined;
                        const simRacingPrices = simRacingZone ? getPricesForZone('simracing') : null;
                        
                        return simRacingZone && simRacingPrices ? (
                            <SimRacingCard
                                images={simRacingZone.images}
                                specs={simRacingZone.specs}
                                price={{
                                    oneHour: activePriceTab === 'week' ? simRacingPrices.oneHour.week : simRacingPrices.oneHour.end,
                                    twoHours: activePriceTab === 'week' ? simRacingPrices.threeHours.week : simRacingPrices.threeHours.end,
                                    threeHours: activePriceTab === 'week' ? simRacingPrices.fiveHours.week : simRacingPrices.fiveHours.end,
                                }}
                                status={simRacingStatus ? { free: simRacingStatus.free_pc_count, total: simRacingStatus.pc_count } : undefined}
                            />
                        ) : null;
                    })()}
                </div>

                {/* CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-3xl overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF2E63]/20 via-[#B900FF]/20 to-[#00F0FF]/20" />
                    <div className="absolute inset-0 backdrop-blur-3xl" />
                    
                    <div className="relative z-10 p-8 md:p-12 text-center">
                        <h3 className="font-tactic font-black text-2xl sm:text-3xl md:text-4xl uppercase text-white mb-4">Не можешь выбрать?</h3>
                        <p className="font-inter text-sm md:text-base text-white/70 max-w-xl mx-auto mb-8">
                            Забронируй место онлайн или позвони нам — администраторы помогут подобрать идеальную зону.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-4">
                            <button onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))} className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-chakra font-black text-sm uppercase tracking-[0.2em] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105">
                                Забронировать
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <a href="tel:+79851289538" className="flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/20 font-chakra font-black text-sm uppercase tracking-[0.2em] text-white hover:bg-white/15 transition-all duration-300">
                                +7 (985) 128-95-38
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function ZoneCard({ 
    zone, 
    idx, 
    hoveredZone, 
    setHoveredZone,
    activePriceTab,
    currentPeriod,
    getCurrentPrice,
    status,
    expandedZone,
    setExpandedZone,
    pricingData
}: { 
    zone: ZoneWithPrice; 
    idx: number;
    hoveredZone: number | null;
    setHoveredZone: (n: number | null) => void;
    activePriceTab: 'week' | 'end';
    currentPeriod: 'day' | 'evening' | 'night';
    getCurrentPrice: (prices: any) => { price: number; appPrice: number; label: string };
    status?: ClubZone;
    expandedZone: string | null;
    setExpandedZone: (s: string | null) => void;
    pricingData?: PricingData;
}) {
    const getPrice = (priceObj: { week: number; end: number }) => activePriceTab === 'week' ? priceObj.week : priceObj.end;
    const [currentImage, setCurrentImage] = useState(0);
    const isExpanded = expandedZone === zone.id;
    
    const currentPriceInfo = getCurrentPrice(zone.prices);
    const totalPc = status?.pc_count || 0;
    const freePc = status?.free_pc_count || 0;
    const isFull = totalPc > 0 && freePc === 0;
    // Green if ALL free (100%), Orange if some free (1-80%), Red if full
    const percentFree = totalPc > 0 ? (freePc / totalPc) : 0;
    const isAllFree = totalPc > 0 && freePc === totalPc;
    const isLowAvailability = totalPc > 0 && freePc > 0 && !isAllFree;

    // Color based on availability percentage
    let statusColor = isFull ? '#FF2E63' : isAllFree ? '#00FF7F' : '#FF8C00';
    let statusBg = isFull ? 'bg-[#FF2E63]/10' : isAllFree ? 'bg-[#00FF7F]/10' : 'bg-[#FF8C00]/10';
    let statusBorder = isFull ? 'border-[#FF2E63]/30' : isAllFree ? 'border-[#00FF7F]/30' : 'border-[#FF8C00]/30';
    let statusText = isFull ? 'text-[#FF2E63]' : isAllFree ? 'text-[#00FF7F]' : 'text-[#FF8C00]';
    let statusDot = isFull ? 'bg-[#FF2E63]' : isAllFree ? 'bg-[#00FF7F]' : 'bg-[#FF8C00]';

    const nextImage = () => setCurrentImage((prev) => (prev + 1) % zone.images.length);
    const prevImage = () => setCurrentImage((prev) => (prev - 1 + zone.images.length) % zone.images.length);
    const toggleExpand = () => setExpandedZone(isExpanded ? null : zone.id);

    const getAllPrices = () => {
        if (!zone.prices) return [];
        const prices = [];
        prices.push({ name: '1 час', base: getPrice(zone.prices.oneHour), app: calculateAppPrice(getPrice(zone.prices.oneHour)) });
        prices.push({ name: '3 часа', base: getPrice(zone.prices.threeHours), app: calculateAppPrice(getPrice(zone.prices.threeHours)) });
        prices.push({ name: '5 часов', base: getPrice(zone.prices.fiveHours), app: calculateAppPrice(getPrice(zone.prices.fiveHours)) });
        if (zone.prices.night) {
            prices.push({ name: 'Ночь', base: getPrice(zone.prices.night), app: calculateAppPrice(getPrice(zone.prices.night)), isNight: true });
        }
        return prices;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.05 }}
            onMouseEnter={() => setHoveredZone(idx)}
            onMouseLeave={() => setHoveredZone(null)}
            className="group relative rounded-3xl overflow-hidden bg-[#0f0f0f] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-500"
        >
            {/* Image with Slider */}
            <div className="relative h-48 md:h-56 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                    >
                        <Image src={zone.images[currentImage]} alt={`${zone.name} - ${currentImage + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </motion.div>
                </AnimatePresence>
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/50 to-transparent" />
                
                <div className="absolute top-4 left-4 p-2.5 rounded-xl backdrop-blur-md" style={{ backgroundColor: `${zone.color}20` }}>
                    <zone.icon size={20} style={{ color: zone.color }} />
                </div>

                {/* Tags */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                    {zone.isNew && <div className="px-2 py-1 rounded-full text-[9px] font-chakra font-black uppercase bg-[#00F0FF]/20 text-[#00F0FF] backdrop-blur-md">NEW</div>}
                    {zone.isPopular && <div className="px-2 py-1 rounded-full text-[9px] font-chakra font-black uppercase bg-[#FF2E63]/20 text-[#FF2E63] backdrop-blur-md flex items-center gap-1"><Star size={8} fill="currentColor"/>HIT</div>}
                    {zone.isSimRacing && <div className="px-2 py-1 rounded-full text-[9px] font-chakra font-black uppercase bg-[#FF8C00]/20 text-[#FF8C00] backdrop-blur-md">PRO</div>}
                </div>

                {/* Slider Controls */}
                {zone.images.length > 1 && (
                    <>
                        <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"><ChevronLeft size={16} /></button>
                        <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"><ChevronRight size={16} /></button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {zone.images.map((_, i) => (
                                <button key={i} onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImage ? 'bg-white w-4' : 'bg-white/40'}`} />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-tactic font-black text-lg md:text-xl uppercase text-white mb-1">{zone.name}</h3>
                <p className="font-inter text-xs text-white/40 mb-3">{zone.description}</p>

                {/* Specs */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {zone.specs.map((spec, i) => (
                        <span key={i} className="px-2 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[9px] font-chakra font-bold uppercase tracking-wider text-white/60">{spec}</span>
                    ))}
                </div>

                {/* Availability Badge - Color Coded */}
                <div className={`w-full py-2 px-3 rounded-xl border flex items-center justify-between mb-3 ${statusBg} ${statusBorder}`}>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${statusDot} ${!isFull ? 'animate-pulse' : ''}`} />
                        <span className={`text-[10px] font-chakra font-black uppercase tracking-wider ${statusText}`}>Сейчас свободно</span>
                    </div>
                    <span className={`font-mono text-xs font-bold ${statusText}`}>
                        {status ? `${freePc} ИЗ ${totalPc}` : '...'}
                    </span>
                </div>

                {/* Current Price - 1 Hour Only */}
                <div className="relative p-4 rounded-2xl bg-gradient-to-br from-[#00F0FF]/10 to-[#B900FF]/10 border border-[#00F0FF]/20 mb-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-chakra font-bold text-[8px] uppercase text-[#00F0FF] tracking-wider mb-0.5">В приложении</p>
                            <div className="flex items-baseline gap-2">
                                <span className="font-tactic font-black text-3xl text-[#00F0FF] drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">{currentPriceInfo.appPrice}₽</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-chakra font-bold text-[8px] uppercase text-white/30 tracking-wider">Клуб</p>
                            <p className="font-tactic font-black text-lg text-white/50 line-through">{currentPriceInfo.price}₽</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#00F0FF]/20">
                        <span className="text-[8px] text-white/40 uppercase">{currentPriceInfo.label}</span>
                        <span className="text-[8px] text-[#FF2E63] font-bold">-5%</span>
                    </div>
                </div>

                {/* Expandable All Prices Dropdown */}
                <button onClick={toggleExpand} className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-colors mb-3">
                    <span className="font-chakra font-bold text-[9px] uppercase text-white/50 tracking-wider">Все тарифы</span>
                    <ChevronDown size={14} className={`text-white/40 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mb-3"
                        >
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] space-y-2">
                                {getAllPrices().map((p, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <span className={`text-[9px] font-chakra font-bold uppercase ${p.isNight ? 'text-[#FF2E63]' : 'text-white/60'}`}>{p.name}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[8px] text-white/30 line-through">{p.base}₽</span>
                                            <span className="text-sm font-tactic font-black text-[#00F0FF]">{p.app}₽</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Availability & Book Button */}
                <div className="flex gap-2">
                    <button onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2E63] to-[#FF2E63]/80 text-white font-chakra font-black text-[10px] uppercase tracking-[0.15em] hover:shadow-[0_0_20px_rgba(255,46,99,0.4)] transition-all">
                        Забронировать
                    </button>
                    {zone.isSimRacing && (
                        <Link href="/simracing" className="w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                            <ArrowRight size={16} className="text-[#FF8C00]" />
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
