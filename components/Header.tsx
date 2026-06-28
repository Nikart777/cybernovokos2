'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Smartphone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const desktopNavLinks = [
    { name: 'Игровые зоны', href: '/#zones' },
    { name: 'Цены', href: '/prices' },
    { name: 'Промокод', href: '/promo' },
    { name: 'Блог', href: '/blog' },
    { name: 'Контакты', href: '/contacts' },
];

const mobileNavLinks = [
    { name: 'Игровые зоны', href: '/#zones' },
    { name: 'Цены', href: '/prices' },
    { name: 'Промокод', href: '/promo' },
    { name: 'Сертификаты', href: '/certificate' },
    { name: 'Контакты', href: '/contacts' },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const openChat = () => {
        window.dispatchEvent(new CustomEvent('open-chat'));
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-[100] transition-[background-color,border-color,padding] duration-300 ${scrolled
                    ? 'bg-[#050505] border-b-2 border-[#FF2E63]/20 py-3'
                    : 'bg-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-4 flex items-center justify-between max-w-[1400px]">
                    <Link href="/" className="relative z-[110] flex items-center group">
                        <Image
                            src="/logo new.png"
                            alt="CyberX Novokosino"
                            width={200}
                            height={50}
                            className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-10">
                        <ul className="flex items-center gap-8">
                            {desktopNavLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="relative font-chakra font-black text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300 group/link"
                                    >
                                        {link.name}
                                        <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#FF2E63] transition-[width] duration-300 group-hover/link:w-full" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="h-6 w-[2px] bg-white/10 mx-2 skew-x-[-12deg]" />
                        <button
                            onClick={openChat}
                            className="hidden xl:flex items-center gap-2 font-chakra font-black text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-[#00F0FF] transition-colors mr-2 group/chat"
                        >
                            <MessageSquare size={14} className="group-hover/chat:scale-110 transition-transform" />
                            Чат с админом
                        </button>
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
                            className="group relative flex items-center justify-center bg-[#FF2E63] shadow-border-accent px-6 py-3 skew-x-[-12deg] transition-[transform,background-color,box-shadow] duration-150 ease-out hover:bg-[#FF2E63]/80 hover:shadow-[0_0_20px_rgba(255,46,99,0.5)] active:scale-[0.96]"
                        >
                            <div className="skew-x-[12deg] flex items-center gap-2">
                                <Smartphone size={16} className="text-white group-hover:rotate-12 transition-transform" />
                                <span className="font-tactic font-black text-[11px] uppercase italic text-white leading-none mt-1">
                                    ЗАБРОНИРОВАТЬ
                                </span>
                            </div>
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden relative z-[110] p-2 bg-[#111] shadow-border text-white hover:shadow-border-hover hover:text-[#FF2E63] active:scale-[0.96] transition-[transform,color,box-shadow] duration-150 ease-out skew-x-[-6deg]"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="skew-x-[6deg]">
                            <AnimatePresence initial={false} mode="wait">
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ opacity: 0, rotate: -90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 90 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={24} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ opacity: 0, rotate: 90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: -90 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={24} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </button>
                </div>
            </header>

            {/* Mobile Menu - Full Screen Overlay */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[99] bg-[#050505] lg:hidden"
                    >
                        {/* Background Grid Pattern */}
                        <div 
                            className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{
                                backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                                backgroundSize: '40px 40px',
                            }}
                        />

                        {/* Menu Content */}
                        <div className="h-full flex flex-col justify-center px-6 pt-20 pb-10 relative z-10">
                            {/* Logo */}
                            <motion.div
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="mb-10 flex justify-center"
                            >
                                <Image
                                    src="/logo new.png"
                                    alt="CyberX Novokosino"
                                    width={200}
                                    height={50}
                                    className="h-10 w-auto object-contain"
                                />
                            </motion.div>

                            {/* Navigation Links */}
                            <nav className="flex-1 flex flex-col justify-center items-start gap-6 w-full max-w-sm mx-auto">
                                {mobileNavLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.06 }}
                                        className="w-full border-b-2 border-white/5 pb-2"
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block font-tactic font-black text-2xl sm:text-3xl text-white uppercase italic hover:text-[#FF2E63] transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Bottom Section */}
                            <div className="w-full max-w-sm mx-auto space-y-4 mt-8">
                                {/* Booking Button */}
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    onClick={() => {
                                        setIsOpen(false);
                                        window.dispatchEvent(new CustomEvent('open-booking'));
                                    }}
                                    className="w-full flex items-center justify-center bg-[#FF2E63] shadow-border-accent py-4 skew-x-[-6deg] active:scale-[0.96] transition-transform duration-150 ease-out"
                                >
                                    <div className="skew-x-[6deg] flex items-center gap-3">
                                        <Smartphone size={18} className="text-white" />
                                        <span className="font-tactic font-black text-sm uppercase italic text-white mt-1">
                                            ЗАБРОНИРОВАТЬ МЕСТО
                                        </span>
                                    </div>
                                </motion.button>

                                {/* Chat Button */}
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    onClick={() => {
                                        setIsOpen(false);
                                        openChat();
                                    }}
                                    className="w-full flex items-center justify-center bg-[#111] shadow-border py-4 skew-x-[-6deg] active:scale-[0.96] transition-[transform,box-shadow] duration-150 ease-out hover:shadow-border-hover"
                                >
                                    <div className="skew-x-[6deg] flex items-center gap-3">
                                        <MessageSquare size={18} className="text-[#00F0FF]" />
                                        <span className="font-tactic font-black text-sm uppercase italic text-white mt-1">
                                            ЧАТ С АДМИНАМИ
                                        </span>
                                    </div>
                                </motion.button>

                                {/* Contact Info */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="grid grid-cols-2 gap-3"
                                >
                                    <div className="flex flex-col items-center gap-2 p-3 bg-[#111] shadow-border skew-x-[-6deg]">
                                        <div className="skew-x-[6deg] flex flex-col items-center">
                                            <MapPin className="text-[#FF2E63] mb-1" size={16} />
                                            <p className="text-[8px] text-white/50 font-chakra font-black uppercase tracking-widest">ЛОКАЦИЯ</p>
                                            <p className="text-xs text-white font-chakra font-bold">НОВОКОСИНО, 32</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 p-3 bg-[#111] shadow-border skew-x-[-6deg]">
                                        <div className="skew-x-[6deg] flex flex-col items-center">
                                            <Clock className="text-[#00F0FF] mb-1" size={16} />
                                            <p className="text-[8px] text-white/50 font-chakra font-black uppercase tracking-widest">РЕЖИМ РАБОТЫ</p>
                                            <p className="text-xs text-white font-chakra font-bold">24 / 7</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
