'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Smartphone, MapPin, Clock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Главная', href: '/' },
    { name: 'Игровые зоны', href: '/#zones' },
    { name: 'Цены', href: '/prices' },
    { name: 'Акции', href: '/#promotions' },
    { name: 'Sim Racing', href: '/simracing' },
    { name: 'Контакты', href: '/contacts' },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
                    ? 'bg-[#050505]/80 backdrop-blur-xl py-3 border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
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
                            <span className="font-chakra font-bold text-[8px] text-[#00F0FF] tracking-[0.2em] uppercase mt-1 opacity-70">Gaming Universe</span>
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
                    className="lg:hidden relative z-[110] p-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-[#FF2E63] transition-all duration-300"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 z-[101] bg-black/90 backdrop-blur-md lg:hidden"
                            />
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                                className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] z-[102] bg-[#0A0A0A] border-l border-white/10 p-8 flex flex-col lg:hidden"
                            >
                                <div className="mt-20 flex flex-col gap-6">
                                    {navLinks.map((link, idx) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center justify-between group"
                                            >
                                                <span className="font-tactic font-black text-3xl uppercase tracking-tighter text-white group-hover:text-[#FF2E63] transition-colors italic">
                                                    {link.name}
                                                </span>
                                                <ChevronRight className="text-[#FF2E63] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-auto pt-10 border-t border-white/10">
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            window.dispatchEvent(new CustomEvent('open-booking'));
                                        }}
                                        className="w-full flex items-center justify-center gap-3 bg-[#FF2E63] py-5 rounded-2xl font-chakra font-black text-sm uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(255,46,99,0.3)] mb-8"
                                    >
                                        <Smartphone size={20} />
                                        Забронировать
                                    </button>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 group">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#00F0FF]/20 group-hover:border-[#00F0FF]/30 transition-all">
                                                <MapPin size={18} className="text-[#00F0FF]" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-chakra font-black text-white/30 uppercase tracking-widest">Адрес</p>
                                                <p className="text-sm font-chakra font-bold text-white uppercase tracking-wider">Новокосинская, 32</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 group">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#00F0FF]/20 group-hover:border-[#00F0FF]/30 transition-all">
                                                <Clock size={18} className="text-[#00F0FF]" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-chakra font-black text-white/30 uppercase tracking-widest">Режим работы</p>
                                                <p className="text-sm font-chakra font-bold text-white uppercase tracking-wider">Круглосуточно 24/7</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Decor */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF2E63] blur-[150px] opacity-[0.05] -z-10 rounded-full" />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
