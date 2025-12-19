"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Send, Monitor, Crosshair } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Функция открытия попапа брони (для других кнопок)
  const openBooking = () => {
    window.dispatchEvent(new CustomEvent("open-booking"));
    setIsOpen(false);
  };

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: "Зоны", href: "about" },
    { name: "Свободные места", href: "map", isNew: true },
    { name: "Цены", href: "price" },
    { name: "Акции", href: "special" },
    { name: "Отзывы", href: "otzyv" },
    { name: "FAQ", href: "faq" },
    { name: "Контакты", href: "contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/5 ${
          scrolled
            ? "bg-[#050505]/90 backdrop-blur-md h-[70px]"
            : "bg-transparent h-[90px]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 h-full flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="group flex items-center gap-2 select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex flex-col items-start">
               <div className="flex items-center gap-1">
                  <span className="font-tactic font-black text-2xl tracking-wider text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">CYBER</span>
                  <span className="font-tactic font-black text-3xl text-[#FF2E63] transform -skew-x-12 group-hover:text-white group-hover:drop-shadow-[0_0_15px_#FF2E63] transition-all duration-300">X</span>
               </div>
               <span className="text-[10px] font-chakra font-bold text-[#888] tracking-[0.2em] uppercase group-hover:text-[#FF2E63] transition-colors">
                 НОВОКОСИНО
               </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`font-chakra font-bold text-xs uppercase tracking-widest transition-colors relative group flex items-center gap-2 ${
                  link.isNew ? 'text-[#00F0FF] hover:text-white' : 'text-white/80 hover:text-[#FF2E63]'
                }`}
              >
                {link.isNew && <Monitor size={14} />}
                {link.name}
                <span 
                  className={`absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                    link.isNew ? 'bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]' : 'bg-[#FF2E63] shadow-[0_0_10px_#FF2E63]'
                  }`} 
                />
              </button>
            ))}
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="https://t.me/CyberXNovokos" 
              target="_blank" 
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 text-white hover:bg-[#0088cc] hover:border-[#0088cc] transition-all duration-300 group"
              aria-label="Telegram"
            >
              <Send size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a href="tel:+79851289538" className="flex items-center gap-2 font-chakra font-bold text-sm hover:text-[#FF2E63] transition-colors group mr-2">
              <Phone size={16} className="group-hover:fill-[#FF2E63] transition-colors" />
              <span>+7 985 128 95 38</span>
            </a>
            
            {/* КНОПКА ЗАБРАТЬ 1200 (Якорь на AimControl) */}
            <button 
              onClick={() => scrollToSection('aim-control')} // ТЕПЕРЬ ВЕДЕТ НА ЯКОРЬ
              className="group relative px-5 py-2 bg-transparent outline-none transform -skew-x-12 cursor-pointer"
            >
               <div className="absolute inset-0 bg-[#FF2E63] opacity-90 group-hover:opacity-100 group-hover:bg-white transition-all duration-300 border border-[#FF2E63] shadow-[0_0_15px_rgba(255,46,99,0.4)]" />
               <span className="relative z-10 flex items-center gap-2 font-chakra font-bold text-xs uppercase tracking-wider text-white group-hover:text-black transition-colors duration-300 transform skew-x-12">
                 <Crosshair size={14} />
                 Забрать 1200Б
               </span>
            </button>
          </div>

          {/* MOBILE BURGER */}
          <button
            onClick={() => setIsOpen(true)}
            className="xl:hidden p-2 text-white border border-white/20 rounded-md bg-white/5 hover:border-[#FF2E63] hover:text-[#FF2E63] transition-colors"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-[#0A0A0A] border-l border-[#FF2E63]/30 z-[70] flex flex-col p-8 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] overflow-y-auto"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 border border-white/20 rounded hover:border-[#FF2E63] hover:text-[#FF2E63] transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mt-10 mb-8">
                 <span className="font-tactic font-black text-4xl text-white">CYBER<span className="text-[#FF2E63]">X</span></span>
                 <span className="block text-xs font-chakra font-bold text-[#888] tracking-[0.3em] uppercase mt-1">
                   НОВОКОСИНО
                 </span>
              </div>

              <nav className="flex flex-col gap-5 mb-8">
                {navLinks.map((link, idx) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="group flex items-baseline gap-4 text-left"
                  >
                    <span className="text-xs font-mono text-[#FF2E63] opacity-60 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                    <span className={`font-tactic font-bold text-xl uppercase transition-all duration-300 ${link.isNew ? 'text-[#00F0FF]' : 'text-white group-hover:text-[#FF2E63] group-hover:translate-x-2'}`}>
                      {link.name}
                    </span>
                  </button>
                ))}
              </nav>

              {/* ACTION BUTTONS LIST (VERTICAL STACK) */}
              <div className="mt-auto flex flex-col gap-3">
                
                {/* 1. Карта загрузки */}
                <button 
                   onClick={() => scrollToSection('map')}
                   className="w-full py-3.5 bg-[#00F0FF]/10 border border-[#00F0FF]/50 rounded-xl flex items-center justify-center gap-3 text-[#00F0FF] font-chakra font-bold text-sm uppercase tracking-widest active:scale-95 transition-transform"
                 >
                   <Monitor size={18} />
                   Карта загрузки
                 </button>

                 {/* 2. Забрать бонус */}
                 <button 
                    onClick={() => scrollToSection('aim-control')}
                    className="w-full py-3.5 bg-[#FF2E63]/10 border border-[#FF2E63]/50 rounded-xl flex items-center justify-center gap-3 text-[#FF2E63] font-chakra font-bold text-sm uppercase tracking-widest active:scale-95 transition-transform"
                  >
                    <Crosshair size={18} />
                    Забрать 1200 Бонусов
                  </button>

                 {/* 3. Telegram */}
                <a 
                  href="https://t.me/CyberXNovokos" 
                  target="_blank"
                  className="flex items-center justify-center gap-3 w-full py-3.5 bg-[#0088cc]/10 border border-[#0088cc]/30 text-[#0088cc] font-chakra font-bold text-sm uppercase rounded-xl hover:bg-[#0088cc] hover:text-white transition-all duration-300"
                >
                  <Send size={18} />
                  Telegram
                </a>

                {/* 4. Телефон */}
                <a 
                  href="tel:+79851289538" 
                  className="flex items-center justify-center gap-3 w-full py-3.5 bg-white/5 border border-white/10 text-white font-chakra font-bold text-sm uppercase rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <Phone size={18} />
                  +7 985 128 95 38
                </a>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}