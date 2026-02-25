'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Smartphone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Главная', href: '/' },
    { name: 'Игровые зоны', href: '/#monitoring' },
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

    // Lock body scroll when menu is open
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
                    ? 'bg-[#050505]/90 backdrop-blur-md py-3 border-b border-white/5 shadow-2xl'
                    : 'bg-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="relative z-[110] flex items-center group">
                        <div className="flex items-baseline gap-0">
                            <span className="font-tactic font-black text-2xl md:text-3xl tracking-tighter text-white uppercase italic group-hover:text-[#FF2E63] transition-colors duration-300">CYBER</span>
                            <div className="relative">
                                <span className="font-tactic font-black text-3xl md:text-5xl tracking-tighter text-[#FF2E63] italic -ml-1 transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(255,46,99,0.8)]">X</span>
                                <motion.div
                                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute inset-0 bg-[#FF2E63] blur-2xl -z-10 rounded-full"
                                />
                            </div>
                            <div className="flex flex-col ml-3 hidden md:flex">
                                <span className="font-chakra font-black text-[10px] text-white tracking-[0.4em] uppercase leading-none">НОВОКОСИНСКАЯ</span>
                            </div>
                        </div>
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
                                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF2E63] transition-all duration-300 group-hover/link:w-full" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="h-6 w-[1px] bg-white/10 mx-2" />
                        <button
                            onClick={openChat}
                            className="hidden xl:flex items-center gap-2 font-chakra font-black text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-[#FF2E63] transition-all mr-2 group/chat"
                        >
                            <MessageSquare size={14} className="group-hover/chat:scale-110 transition-transform" />
                            Чат с админом
                        </button>
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
                            className="group relative flex items-center gap-3 bg-[#FF2E63] px-8 py-3 rounded-full font-chakra font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,46,99,0.5)] active:scale-95 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Smartphone size={16} className="group-hover:rotate-12 transition-transform" />
                                Забронировать
                            </span>
                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
                            <style jsx>{`
                                .ease-expo { transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1); }
                            `}</style>
                            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden relative z-[110] p-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-[#FF2E63] active:scale-95 transition-all duration-200"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
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
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[99] bg-black lg:hidden"
                        style={{ backgroundColor: '#000000' }}
                    >
                        {/* Close button in top right */}
                        <div className="absolute top-0 right-0 p-4 z-[110]">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-3 rounded-2xl bg-white/10 border border-white/10 text-white hover:bg-[#FF2E63] active:scale-95 transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Menu Content */}
                        <div className="h-full flex flex-col justify-center items-center px-6 py-20">
                            {/* Navigation Links */}
                            <nav className="flex-1 flex flex-col justify-center items-center gap-6 w-full max-w-md">
                                {navLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="w-full"
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block text-center font-tactic font-black text-2xl sm:text-3xl text-white uppercase italic py-3 hover:text-[#FF2E63] transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Bottom Section */}
                            <div className="w-full max-w-md space-y-6 mt-8">
                                {/* Booking Button */}
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        window.dispatchEvent(new CustomEvent('open-booking'));
                                    }}
                                    className="w-full flex items-center justify-center gap-3 bg-[#FF2E63] py-4 rounded-xl font-chakra font-black text-base uppercase tracking-wider active:scale-95 transition-transform"
                                >
                                    <Smartphone size={20} />
                                    Забронировать
                                </button>

                                {/* Chat Button */}
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        openChat();
                                    }}
                                    className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-4 rounded-xl font-chakra font-black text-base uppercase tracking-wider active:scale-95 transition-all hover:bg-white/10"
                                >
                                    <MessageSquare size={20} className="text-[#FF2E63]" />
                                    Чат с админом
                                </button>

                                {/* Contact Info */}
                                <div className="grid grid-cols-1 gap-4 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <MapPin className="text-[#00F0FF]" size={20} />
                                        <div>
                                            <p className="text-xs text-white/50 font-chakra font-bold uppercase">Адрес</p>
                                            <p className="text-sm text-white font-chakra font-bold">Новокосинская, 32</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <Clock className="text-[#00F0FF]" size={20} />
                                        <div>
                                            <p className="text-xs text-white/50 font-chakra font-bold uppercase">Режим работы</p>
                                            <p className="text-sm text-white font-chakra font-bold">Круглосуточно 24/7</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
