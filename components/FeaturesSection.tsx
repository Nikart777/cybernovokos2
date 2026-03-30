'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Gamepad2, Zap, Crown, Headphones, Monitor, Trophy, Users, Clock } from 'lucide-react';
import { useRef } from 'react';
import Image from 'next/image';

const features = [
    {
        icon: Gamepad2,
        title: 'RTX 5070',
        subtitle: 'NVIDIA GeForce',
        description: 'Топовые видеокарты нового поколения для максимальной производительности в любых играх',
        color: '#FF2E63',
        image: '/zones/solo-premium-1.webp',
    },
    {
        icon: Zap,
        title: '400 Гц',
        subtitle: 'BenQ Zowie',
        description: 'Профессиональные киберспортивные мониторы с частотой обновления до 400 Гц',
        color: '#00F0FF',
        image: '/zones/solo-pro-1.webp',
    },
    {
        icon: Crown,
        title: 'VIP Зоны',
        subtitle: 'Приватность',
        description: 'Закрытые комнаты для команды с климат-контролем и шумоизоляцией',
        color: '#B900FF',
        image: '/zones/bootcamp-1.webp',
    },
    {
        icon: Headphones,
        title: 'Logitech G Pro',
        subtitle: 'Периферия',
        description: 'Профессиональные мыши, клавиатуры и гарнитуры топ-уровня',
        color: '#FFD700',
        image: '/zones/common-1.webp',
    },
];

const additionalFeatures = [
    {
        icon: Monitor,
        title: '2K / 4K Разрешение',
        description: 'Кристально чистая картинка на всех рабочих местах',
        color: '#00F0FF',
    },
    {
        icon: Trophy,
        title: 'Турниры',
        description: 'Еженедельные соревнования с призовым фондом',
        color: '#FF2E63',
    },
    {
        icon: Users,
        title: 'До 10 мест',
        description: 'Bootcamp зоны для командных тренировок',
        color: '#B900FF',
    },
    {
        icon: Clock,
        title: '24/7 Доступ',
        description: 'Работаем круглосуточно без выходных',
        color: '#FFD700',
    },
];

export default function FeaturesSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section ref={containerRef} className="relative py-24 md:py-32 bg-[#030303] overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#0a0a0a] to-[#030303]" />
            
            {/* Animated Grid Pattern */}
            <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Gradient Orbs */}
            <motion.div 
                style={{ y }}
                className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#FF2E63]/10 blur-[150px] rounded-full"
            />
            <motion.div 
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00F0FF]/10 blur-[150px] rounded-full"
            />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75 animate-ping"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
                        </span>
                        <span className="font-chakra font-bold text-xs text-white/60 tracking-wide uppercase">
                            Преимущества
                        </span>
                    </div>
                    
                    <h2 className="font-tactic font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.85] text-white mb-6 italic">
                        Почему <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] to-[#B900FF]">CyberX</span>
                    </h2>
                    
                    <p className="font-inter text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                        Мы создали пространство, где каждый геймер чувствует себя как дома. 
                        Топовое железо, комфорт и атмосфера киберспорта.
                    </p>
                </motion.div>

                {/* Main Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.1] rounded-3xl overflow-hidden backdrop-blur-sm"
                        >
                            {/* Image Background */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    fill
                                    className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
                                {/* Icon & Title */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div 
                                        className="p-3 rounded-2xl shrink-0"
                                        style={{ backgroundColor: `${feature.color}15` }}
                                    >
                                        <feature.icon size={28} style={{ color: feature.color }} />
                                    </div>
                                    <div>
                                        <h3 className="font-tactic font-black text-xl md:text-2xl uppercase text-white mb-1">
                                            {feature.title}
                                        </h3>
                                        <p className="font-chakra font-bold text-xs uppercase tracking-wider" style={{ color: feature.color }}>
                                            {feature.subtitle}
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="font-inter text-sm md:text-base text-white/60 leading-relaxed mb-4 flex-grow">
                                    {feature.description}
                                </p>

                                {/* Hover Arrow */}
                                <div className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors">
                                    <span className="font-chakra font-bold text-xs uppercase tracking-wider">Подробнее</span>
                                    <svg 
                                        className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Border Glow on Hover */}
                            <div 
                                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: `linear-gradient(135deg, ${feature.color}30, transparent 50%)`,
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Additional Features */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {additionalFeatures.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            whileHover={{ scale: 1.05, y: -4 }}
                            className="group p-4 md:p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-center hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300"
                        >
                            <div className="flex justify-center mb-3">
                                <div 
                                    className="p-3 rounded-xl group-hover:scale-110 transition-transform duration-300"
                                    style={{ backgroundColor: `${feature.color}15` }}
                                >
                                    <feature.icon size={24} style={{ color: feature.color }} />
                                </div>
                            </div>
                            <h4 className="font-chakra font-bold text-sm md:text-base uppercase text-white mb-1">
                                {feature.title}
                            </h4>
                            <p className="font-inter text-xs text-white/50 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
