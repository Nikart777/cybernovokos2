'use client';

import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from 'framer-motion';
import { Monitor, Users, Tv, Gauge, ChevronRight, Gamepad2, Crown, Star, ArrowRight, Clock, Heart, X } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const [activePriceTab, setActivePriceTab] = useState<'week' | 'end'>('week');
    const [clubZones, setClubZones] = useState<ClubZone[] | null>(null);
    
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const [currentPeriod, setCurrentPeriod] = useState<'day' | 'evening' | 'night'>('day');
    const [isWeekend, setIsWeekend] = useState(false);

    // Tinder-style state
    const [currentIndex, setCurrentIndex] = useState(0);
    const [likedZones, setLikedZones] = useState<ZoneWithPrice[]>([]);
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

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

    const handleSwipe = (direction: 'left' | 'right', zone: ZoneWithPrice) => {
        setSwipeDirection(direction);
        if (direction === 'right') {
            setLikedZones(prev => [...prev, zone]);
        }
        setCurrentIndex(prev => prev + 1);
    };

    const restartSwiping = () => {
        setCurrentIndex(0);
        setLikedZones([]);
        setSwipeDirection(null);
    };

    return (
        <section ref={containerRef} className="relative min-h-[100dvh] flex flex-col justify-center py-6 md:py-12 bg-[#050505] overflow-hidden" id="zones">
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505]" />
            
            <div className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)',
                    backgroundSize: '72px 72px',
                }}
            />
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0,240,255,0.75) 1px, transparent 1px), linear-gradient(90deg, rgba(255,46,99,0.55) 1px, transparent 1px)',
                    backgroundSize: '18px 18px',
                }}
            />

            <motion.div style={{ y }} className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B900FF]/10 blur-[200px] rounded-full" />
            <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }} className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF2E63]/10 blur-[200px] rounded-full" />

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="mb-4 md:mb-6 flex flex-col items-center text-center"
                >
                    <h2 className="font-tactic font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.85] text-white italic">
                        9 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] to-[#B900FF]">Площадок</span>
                    </h2>
                </motion.div>

                {/* Controls and Toggles Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6 w-full max-w-2xl"
                >
                    {/* Time Badge */}
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

                    {/* Price Toggle */}
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
                </motion.div>

                {/* Slider Stack OR Matches View */}
                <div className={`relative w-full max-w-md md:max-w-3xl lg:max-w-4xl mx-auto perspective-[1200px] ${currentIndex < zones.length ? 'h-[450px] md:h-[450px] lg:h-[500px]' : 'h-auto min-h-[450px] lg:min-h-[500px]'}`}>
                    {currentIndex < zones.length ? (
                        <>
                            <AnimatePresence custom={swipeDirection}>
                                {zones.map((zone, index) => {
                                    if (index < currentIndex) return null;
                                    const isFront = index === currentIndex;
                                    return (
                                        <SwipeableCard 
                                            key={zone.id} 
                                            zone={zone} 
                                            index={index} 
                                            currentIndex={currentIndex} 
                                            isFront={isFront}
                                            onSwipe={handleSwipe}
                                            swipeDirection={swipeDirection}
                                            status={getZoneStatus(zone.langameTitle)}
                                            activePriceTab={activePriceTab}
                                            getCurrentPrice={getCurrentPrice}
                                        />
                                    );
                                }).reverse()}
                            </AnimatePresence>

                            {/* Action Buttons for Desktop */}
                            <div className="absolute -bottom-24 left-0 right-0 flex flex-col items-center z-[200] md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-auto md:-right-32 lg:-right-36 md:w-24">
                                <span className="font-chakra font-bold text-[10px] md:text-xs text-white/50 uppercase tracking-widest mb-3 text-center">Свайпай <br className="hidden md:block" />или жми</span>
                                <div className="flex gap-6 md:flex-col md:gap-6">
                                    <button 
                                        onClick={() => handleSwipe('left', zones[currentIndex])}
                                        className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-[#111] border border-white/10 text-white/50 hover:bg-white/5 hover:text-white hover:border-white/30 hover:scale-105 active:scale-95 transition-all shadow-xl"
                                    >
                                        <X size={28} />
                                    </button>
                                    <button 
                                        onClick={() => handleSwipe('right', zones[currentIndex])}
                                        className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#FF2E63] to-[#B900FF] text-white hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,46,99,0.4)]"
                                    >
                                        <Heart size={28} fill="currentColor" />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            className="relative w-full h-full bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 flex flex-col items-center text-center shadow-2xl"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF2E63] to-[#B900FF] flex items-center justify-center mb-4 shrink-0">
                                <Heart size={32} fill="currentColor" className="text-white" />
                            </div>
                            <h3 className="font-tactic font-black text-2xl md:text-3xl lg:text-4xl uppercase text-white mb-2 shrink-0">Твои Мэтчи</h3>
                            
                            {likedZones.length > 0 ? (
                                <p className="text-white/60 text-sm md:text-base mb-6 font-inter shrink-0">Вот зоны, которые тебе понравились. Выбирай и бронируй!</p>
                            ) : (
                                <p className="text-white/60 text-sm md:text-base mb-6 font-inter shrink-0">Похоже, ничего не приглянулось. Можешь посмотреть весь список или попробовать снова.</p>
                            )}

                            <div className="w-full flex flex-col md:flex-row md:flex-wrap md:justify-center gap-4 mb-6">
                                {(likedZones.length > 0 ? likedZones : zones).map((zone) => (
                                    <div key={zone.id} className="flex items-center gap-3 bg-white/5 rounded-2xl p-3 border border-white/10 hover:bg-white/10 transition-colors text-left w-full md:w-auto md:flex-1 md:min-w-[200px] md:max-w-xs">
                                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0">
                                            <Image src={zone.images[0]} alt={zone.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-tactic font-black text-base md:text-lg text-white truncate">{zone.name}</h4>
                                            <p className="text-[9px] md:text-[10px] font-chakra font-bold text-white/50 uppercase tracking-wider mb-2 truncate">{zone.specs.join(' • ')}</p>
                                            <button onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))} className="text-[10px] md:text-xs font-chakra font-bold text-[#00F0FF] uppercase flex items-center gap-1 hover:text-white transition-colors">
                                                Забронировать <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button 
                                onClick={restartSwiping}
                                className="mt-auto px-6 py-3 rounded-full bg-white/10 text-white font-chakra font-bold uppercase text-xs tracking-wider hover:bg-white/20 transition-all w-full md:w-auto md:min-w-[200px]"
                            >
                                Попробовать снова
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}

function SwipeableCard({ 
    zone, 
    index, 
    currentIndex, 
    isFront, 
    onSwipe, 
    swipeDirection,
    status,
    activePriceTab,
    getCurrentPrice
}: { 
    zone: ZoneWithPrice;
    index: number;
    currentIndex: number;
    isFront: boolean;
    onSwipe: (dir: 'left' | 'right', zone: ZoneWithPrice) => void;
    swipeDirection: 'left' | 'right' | null;
    status: ClubZone | undefined;
    activePriceTab: 'week' | 'end';
    getCurrentPrice: (prices: any) => { price: number; appPrice: number; label: string };
}) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-10, 10]);

    // Stack positioning
    const offset = index - currentIndex;
    const scale = isFront ? 1 : 1 - offset * 0.05;
    const yOffset = isFront ? 0 : offset * 24;
    const opacity = isFront ? 1 : 1 - offset * 0.2;

    const handleDragEnd = (event: any, info: any) => {
        if (info.offset.x > 100) {
            onSwipe('right', zone);
        } else if (info.offset.x < -100) {
            onSwipe('left', zone);
        }
    };

    // Auto image slider
    const [imgIdx, setImgIdx] = useState(0);
    useEffect(() => {
        if (!isFront) return;
        const interval = setInterval(() => {
            setImgIdx((prev) => (prev + 1) % zone.images.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [isFront, zone.images.length]);

    const totalPc = status?.pc_count || 0;
    const freePc = status?.free_pc_count || 0;
    const isFull = totalPc > 0 && freePc === 0;
    const isAllFree = totalPc > 0 && freePc === totalPc;

    let statusBg = isFull ? 'bg-[#FF2E63]/20' : isAllFree ? 'bg-[#00FF7F]/20' : 'bg-[#FF8C00]/20';
    let statusText = isFull ? 'text-[#FF2E63]' : isAllFree ? 'text-[#00FF7F]' : 'text-[#FF8C00]';

    const currentPriceInfo = getCurrentPrice(zone.prices);

    return (
        <motion.div
            style={{ x, rotate, scale, y: yOffset, opacity, zIndex: 100 - index }}
            drag={isFront ? "x" : false}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.95, opacity: 0, y: 50 }}
            animate={{ scale, y: yOffset, opacity }}
            exit={(customDirection: 'left' | 'right') => ({
                x: customDirection === 'left' ? -300 : 300,
                opacity: 0,
                scale: 0.9,
                transition: { duration: 0.3 }
            })}
            custom={swipeDirection}
            className={`absolute w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden ${isFront ? 'cursor-grab active:cursor-grabbing shadow-xl' : 'pointer-events-none'} border border-white/10 bg-[#050505]`}
        >
            {/* Auto-playing Images */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={imgIdx}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.5 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 md:left-[30%] lg:left-[40%]"
                >
                    <Image src={zone.images[imgIdx]} alt={zone.name} fill className="object-cover md:object-center" />
                </motion.div>
            </AnimatePresence>

            {/* Gradient Overlay for Text Visibility */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#050505] via-[#050505]/95 to-transparent h-[80%] md:h-full w-full md:w-[70%] lg:w-[65%] top-auto md:top-0" />

            {/* Top Info */}
            <div className="absolute top-4 left-4 right-4 md:top-8 md:left-8 md:w-1/2 flex justify-between items-start z-10 pointer-events-none">
                <div className="p-3 rounded-2xl bg-black/60 border border-white/10">
                    <zone.icon size={24} style={{ color: zone.color }} />
                </div>
                <div className="flex gap-2 flex-col items-end md:flex-row md:items-start">
                    {zone.isNew && <div className="px-3 py-1.5 rounded-full text-[10px] font-chakra font-black uppercase bg-[#00F0FF]/30 text-[#00F0FF] border border-[#00F0FF]/20">NEW</div>}
                    {zone.isPopular && <div className="px-3 py-1.5 rounded-full text-[10px] font-chakra font-black uppercase bg-[#FF2E63]/30 text-[#FF2E63] border border-[#FF2E63]/20 flex items-center gap-1"><Star size={10} fill="currentColor"/>HIT</div>}
                    {zone.isSimRacing && <div className="px-3 py-1.5 rounded-full text-[10px] font-chakra font-black uppercase bg-[#FF8C00]/30 text-[#FF8C00] border border-[#FF8C00]/20">PRO</div>}
                </div>
            </div>

            {/* Bottom Content Container */}
            <div className="absolute bottom-0 left-0 right-0 md:w-[50%] lg:w-[45%] md:h-full p-6 md:p-8 z-10 flex flex-col md:justify-end pointer-events-none">
                <h3 className="font-tactic font-black text-3xl md:text-4xl lg:text-5xl uppercase text-white mb-2 md:mb-4 leading-tight">{zone.name}</h3>
                <p className="font-inter text-xs md:text-sm lg:text-base text-white/70 mb-4 md:mb-6 leading-relaxed max-w-sm">{zone.description}</p>

                {/* Specs */}
                <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                    {zone.specs.map((spec, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-xl bg-white/[0.1] border border-white/[0.15] text-[10px] md:text-xs font-chakra font-bold uppercase tracking-wider text-white">{spec}</span>
                    ))}
                </div>

                <div className="flex flex-col gap-3 mb-2 md:mb-0 max-w-sm w-full">
                    {/* Availability */}
                    <div className={`px-4 py-3 rounded-2xl border border-white/5 flex items-center justify-between ${statusBg}`}>
                        <span className="text-[10px] md:text-xs font-chakra font-bold uppercase tracking-wider text-white/50">Свободно ПК</span>
                        <div className="flex items-baseline gap-1">
                            <span className={`font-tactic font-black text-xl md:text-2xl ${statusText}`}>
                                {status ? freePc : '-'}
                            </span>
                            <span className="font-chakra font-bold text-xs text-white/40">
                                / {status ? totalPc : '-'}
                            </span>
                        </div>
                    </div>

                    {/* Prices Grid */}
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
                                <div key={pkg.key} className={`p-2 md:p-3 rounded-xl border flex flex-col justify-center items-center text-center ${isMain ? 'border-[#00F0FF]/20 bg-gradient-to-br from-[#00F0FF]/15 to-[#B900FF]/15' : 'border-white/5 bg-white/[0.03]'}`}>
                                    <span className={`text-[8px] md:text-[9px] font-chakra font-bold uppercase tracking-wider mb-1 ${isMain ? 'text-[#00F0FF]/70' : 'text-white/40'}`}>
                                        {pkg.label}
                                    </span>
                                    <span className={`font-tactic font-black text-base md:text-lg leading-none mb-1 ${isMain ? 'text-[#00F0FF] drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]' : 'text-white'}`}>
                                        {appP}₽
                                    </span>
                                    <span className="text-[9px] font-bold text-white/30 line-through leading-none">
                                        {p}₽
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            
            {/* Overlay indicators for drag */}
            <motion.div 
                style={{ opacity: useTransform(x, [0, 150], [0, 1]) }}
                className="absolute top-8 right-8 z-20 font-tactic text-4xl md:text-6xl text-[#00F0FF] uppercase border-4 border-[#00F0FF] rounded-2xl md:rounded-3xl px-4 py-2 rotate-12 backdrop-blur-sm shadow-[0_0_30px_rgba(0,240,255,0.4)]"
            >
                БЕРУ
            </motion.div>
            <motion.div 
                style={{ opacity: useTransform(x, [-150, 0], [1, 0]) }}
                className="absolute top-8 left-8 z-20 font-tactic text-4xl md:text-6xl text-[#FF2E63] uppercase border-4 border-[#FF2E63] rounded-2xl md:rounded-3xl px-4 py-2 -rotate-12 backdrop-blur-sm shadow-[0_0_30px_rgba(255,46,99,0.4)]"
            >
                СКИП
            </motion.div>
        </motion.div>
    );
}
