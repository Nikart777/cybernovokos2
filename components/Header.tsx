"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Send, Monitor, Crosshair, Trophy } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showArenaPromo, setShowArenaPromo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "ARENA", href: "/arena", isHot: true },
    { name: "Зоны", href: "/#about" },
    { name: "Свободные места", href: "/#map", isNew: true },
    { name: "Цены", href: "/#price" },
    { name: "Акции", href: "/#special" },
    { name: "Отзывы", href: "/#otzyv" },
    { name: "FAQ", href: "/#faq" },
    { name: "Контакты", href: "/#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/5 ${scrolled
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
            {navLinks.map((link) => {
              if (link.href === '/arena') {
                return (
                  <button
                    key={link.name}
                    onClick={() => setShowArenaPromo(true)}
                    className={`font-chakra font-bold text-xs uppercase tracking-widest transition-colors relative group flex items-center gap-2 ${link.isHot ? 'text-purple-500 hover:text-white drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]' : 'text-white/80 hover:text-[#FF2E63]'
                      }`}
                  >
                    <Crosshair size={14} />
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                  </button>
                )
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-chakra font-bold text-xs uppercase tracking-widest transition-colors relative group flex items-center gap-2 ${link.isNew ? 'text-[#00F0FF] hover:text-white' : 'text-white/80 hover:text-[#FF2E63]'
                    }`}
                >
                  {link.isNew && <Monitor size={14} />}
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${link.isNew ? 'bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]' : 'bg-[#FF2E63] shadow-[0_0_10px_#FF2E63]'
                      }`}
                  />
                </Link>
              );
            })}
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

            <Link
              href="/#aim-control"
              className="group relative px-5 py-2 bg-transparent outline-none transform -skew-x-12 cursor-pointer inline-block"
            >
              <div className="absolute inset-0 bg-[#FF2E63] opacity-90 group-hover:opacity-100 group-hover:bg-white transition-all duration-300 border border-[#FF2E63] shadow-[0_0_15px_rgba(255,46,99,0.4)]" />
              <span className="relative z-10 flex items-center gap-2 font-chakra font-bold text-xs uppercase tracking-wider text-white group-hover:text-black transition-colors duration-300 transform skew-x-12">
                <Crosshair size={14} />
                Забрать 1200Б
              </span>
            </Link>
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
                {navLinks.map((link, idx) => {
                  const isArena = link.href === '/arena';

                  if (isArena) {
                    return (
                      <button
                        key={link.name}
                        onClick={() => { setShowArenaPromo(true); setIsOpen(false); }}
                        className="group flex items-baseline gap-4 text-left"
                      >
                        <span className="text-xs font-mono text-[#FF2E63] opacity-60 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                        <span className="font-tactic font-bold text-xl uppercase transition-all duration-300 text-purple-500 group-hover:text-white">
                          {link.name}
                        </span>
                      </button>
                    )
                  }

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-4 text-left"
                    >
                      <span className="text-xs font-mono text-[#FF2E63] opacity-60 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                      <span className={`font-tactic font-bold text-xl uppercase transition-all duration-300 ${link.isNew ? 'text-[#00F0FF]' : 'text-white group-hover:text-[#FF2E63] group-hover:translate-x-2'
                        }`}>
                        {link.name}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                <Link
                  href="/#map"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3.5 bg-[#00F0FF]/10 border border-[#00F0FF]/50 rounded-xl flex items-center justify-center gap-3 text-[#00F0FF] font-chakra font-bold text-sm uppercase tracking-widest active:scale-95 transition-transform"
                >
                  <Monitor size={18} />
                  Карта загрузки
                </Link>

                <Link
                  href="/#aim-control"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3.5 bg-[#FF2E63]/10 border border-[#FF2E63]/50 rounded-xl flex items-center justify-center gap-3 text-[#FF2E63] font-chakra font-bold text-sm uppercase tracking-widest active:scale-95 transition-transform"
                >
                  <Crosshair size={18} />
                  Забрать 1200 Бонусов
                </Link>

                <a
                  href="https://t.me/CyberXNovokos"
                  target="_blank"
                  className="flex items-center justify-center gap-3 w-full py-3.5 bg-[#0088cc]/10 border border-[#0088cc]/30 text-[#0088cc] font-chakra font-bold text-sm uppercase rounded-xl hover:bg-[#0088cc] hover:text-white transition-all duration-300"
                >
                  <Send size={18} />
                  Telegram
                </a>

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

      <AnimatePresence>
        {showArenaPromo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0A0A0A] border border-[#FF2E63] rounded-2xl w-full max-w-2xl relative shadow-[0_0_50px_rgba(255,46,99,0.3)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF2E63] blur-[100px] opacity-20 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B900FF] blur-[100px] opacity-20 pointer-events-none"></div>

              <button
                onClick={() => setShowArenaPromo(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="p-8 md:p-12 text-center relative z-0">
                <Trophy className="w-20 h-20 text-[#FF2E63] mx-auto mb-6 drop-shadow-[0_0_15px_rgba(255,46,99,0.6)]" />

                <h2 className="text-4xl md:text-5xl font-tactic text-white mb-4 uppercase leading-none">
                  CLUB <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] to-[#B900FF]">ARENA</span>
                </h2>

                <p className="text-xl text-gray-300 font-bold mb-8 max-w-lg mx-auto">
                  Локальные микро-турниры 24/7.
                  <br />
                  <span className="text-[#00F0FF]">Приходи и выигрывай</span> бар или опустошай баланс соперников!
                </p>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => window.location.href = '/arena'}
                    className="w-full py-5 bg-gradient-to-r from-[#FF2E63] to-[#B900FF] hover:from-[#d62552] hover:to-[#9600d1] rounded-xl font-tactic text-2xl uppercase tracking-widest text-white shadow-[0_0_20px_rgba(255,46,99,0.4)] hover:shadow-[0_0_40px_rgba(255,46,99,0.6)] transition-all transform hover:-translate-y-1"
                  >
                    Ворваться в игру
                  </button>
                  <button
                    onClick={() => setShowArenaPromo(false)}
                    className="text-gray-500 hover:text-white font-bold uppercase text-sm tracking-widest transition-colors"
                  >
                    Я пока просто посмотрю
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}