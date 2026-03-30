'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Smartphone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Главная', href: '/' },
    { name: 'Игровые зоны', href: '/#zones' },
    { name: 'Цены', href: '/prices' },
    { name: 'Акции', href: '/#promotions' },
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
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled
                    ? 'bg-[#050505]/95 backdrop-blur-xl py-3 border-b border-white/5 shadow-2xl'
                    : 'bg-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="relative z-[110] flex items-center group">
                        <Image
                            src="/logo new.png"
                            alt="CyberX Novokosino"
                            width={200}
                            height={50}
                            className="h-8 md:h-10 w-auto object-contain transition-all duration-300 group-hover:brightness-125 group-hover:drop-shadow-[0_0_15px_rgba(255,46,99,0.5)]"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-10">
                        <ul className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="relative font-chakra font-black text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all duration-300 group/link"
                                    >
                                        {link.name}
                                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#FF2E63] to-[#B900FF] transition-all duration-300 group-hover/link:w-full" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="h-6 w-[1px] bg-white/10 mx-2" />
                        <button
                            onClick={openChat}
                            className="hidden xl:flex items-center gap-2 font-chakra font-black text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-[#00F0FF] transition-all mr-2 group/chat"
                        >
                            <MessageSquare size={14} className="group-hover/chat:scale-110 transition-transform" />
                            Чат с админом
                        </button>
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
                            className="group relative flex items-center gap-3 bg-gradient-to-r from-[#FF2E63] to-[#FF2E63]/80 px-8 py-3 rounded-full font-chakra font-black text-xs uppercase tracking-[0.2em] text-white transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,46,99,0.5)] active:scale-95 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Smartphone size={16} className="group-hover:rotate-12 transition-transform" />
                                Забронировать
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
                            <style jsx>{`
                                .ease-expo { transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1); }
                            `}</style>
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden relative z-[110] p-3 rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 text-white hover:bg-[#FF2E63] active:scale-95 transition-all duration-200"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
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
                    </button>
                </div>
            </header>

            {/* Mobile Menu - Full Screen Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[99] bg-[#050505] lg:hidden"
                    >
                        {/* Close button - отдельная кнопка в углу */}
                        <div className="absolute top-4 right-4 z-[120]">
                            <motion.button
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{ duration: 0.3, type: 'spring' }}
                                onClick={() => setIsOpen(false)}
                                className="p-3 rounded-2xl bg-[#1a1a2e] border border-white/20 text-white hover:bg-[#FF2E63] active:scale-95 transition-all shadow-lg"
                            >
                                <X size={24} />
                            </motion.button>
                        </div>

                        {/* Menu Content */}
                        <div className="h-full flex flex-col justify-center items-center px-6 pt-20 pb-10">
                            {/* Logo - только в меню */}
                            <motion.div
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mb-8"
                            >
                                <Image
                                    src="/logo new.png"
                                    alt="CyberX Novokosino"
                                    width={200}
                                    height={50}
                                    className="h-12 w-auto object-contain"
                                />
                            </motion.div>

                            {/* Navigation Links */}
                            <nav className="flex-1 flex flex-col justify-center items-center gap-4 w-full max-w-md">
                                {navLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.08 }}
                                        className="w-full"
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block text-center font-tactic font-black text-2xl md:text-3xl text-white uppercase italic py-3 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#FF2E63] hover:to-[#B900FF] transition-all"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Bottom Section */}
                            <div className="w-full max-w-md space-y-4 mt-8">
                                {/* Booking Button */}
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    onClick={() => {
                                        setIsOpen(false);
                                        window.dispatchEvent(new CustomEvent('open-booking'));
                                    }}
                                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF2E63] to-[#B900FF] py-4 rounded-xl font-chakra font-black text-base uppercase tracking-wider active:scale-95 transition-transform shadow-[0_0_30px_rgba(255,46,99,0.3)]"
                                >
                                    <Smartphone size={20} />
                                    Забронировать место
                                </motion.button>

                                {/* Chat Button */}
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    onClick={() => {
                                        setIsOpen(false);
                                        openChat();
                                    }}
                                    className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-4 rounded-xl font-chakra font-black text-base uppercase tracking-wider active:scale-95 transition-all hover:bg-white/10"
                                >
                                    <MessageSquare size={20} className="text-[#00F0FF]" />
                                    Чат с админом
                                </motion.button>

                                {/* Contact Info */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="grid grid-cols-2 gap-3"
                                >
                                    <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
                                        <MapPin className="text-[#FF2E63]" size={18} />
                                        <div className="text-center">
                                            <p className="text-[9px] text-white/50 font-chakra font-bold uppercase">Адрес</p>
                                            <p className="text-sm text-white font-chakra font-bold">Новокосинская, 32</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
                                        <Clock className="text-[#00F0FF]" size={18} />
                                        <div className="text-center">
                                            <p className="text-[9px] text-white/50 font-chakra font-bold uppercase">Режим работы</p>
                                            <p className="text-sm text-white font-chakra font-bold">24/7</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Phone */}
                                <motion.a
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    href="tel:+79851289538"
                                    className="flex items-center justify-center gap-2 text-white/60 hover:text-white transition-colors py-2"
                                >
                                    <Smartphone size={16} className="text-[#B900FF]" />
                                    <span className="font-chakra font-bold text-sm">+7 (985) 128-95-38</span>
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
