'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  ChevronsDown,
  Clock3,
  Cpu,
  MonitorUp,
  Smartphone,
  Trophy,
} from 'lucide-react';
import Image from 'next/image';

const specs = [
  { label: 'RTX 5070', text: 'УЛЬТРА ГРАФИКА', icon: Cpu, color: '#00F0FF' },
  { label: '400 Гц', text: 'КИБЕРСПОРТ МОНИТОРЫ', icon: MonitorUp, color: '#FF2E63' },
  { label: '24/7', text: 'РАБОТАЕМ КРУГЛОСУТОЧНО', icon: Clock3, color: '#B900FF' },
  { label: '400 БОНУСОВ', text: 'НА ПЕРВЫЙ ВИЗИТ', icon: Trophy, color: '#FFD700' },
];

function SignalGrid() {
  return (
    <>
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,240,255,0.75) 1px, transparent 1px), linear-gradient(90deg, rgba(255,46,99,0.55) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />
      <div className="absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-transparent via-[#00F0FF]/10 to-transparent" />
      {[14, 31, 52, 75].map((top, index) => (
        <motion.div
          key={top}
          aria-hidden="true"
          className="absolute left-0 h-px bg-gradient-to-r from-transparent via-[#FF2E63] to-transparent"
          style={{ top: `${top}%`, width: `${26 + index * 7}%` }}
          animate={{ x: ['-45vw', '120vw'], opacity: [0, 0.8, 0] }}
          transition={{
            duration: 3.6 + index * 0.4,
            repeat: Infinity,
            ease: 'linear',
            delay: index * 0.42,
          }}
        />
      ))}
    </>
  );
}

export default function HeroNew() {
  const reduceMotion = useReducedMotion();

  const openBooking = () => {
    window.dispatchEvent(new CustomEvent('open-booking'));
  };

  return (
    <div className="bg-[#050505] text-white">
      <section id="hero" className="relative min-h-[85svh] md:min-h-[100svh] flex flex-col justify-center overflow-hidden px-4 pt-28 pb-20 md:pt-24 md:pb-16 sm:px-6 lg:px-8 border-b-2 border-[#FF2E63]/20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/main.webp"
            alt="Интерьер компьютерного клуба CyberX Новокосино"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40 saturate-125 scale-105 image-outline-dark"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.7)_40%,rgba(5,5,5,0.4)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.8)_0%,rgba(5,5,5,0.1)_48%,#050505_100%)]" />
        </div>

        <SignalGrid />

        <div className="container relative z-10 mx-auto max-w-7xl flex flex-col justify-center h-full">
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full"
          >
            {/* LOGO & STATUS */}
            <div className="mb-4 md:mb-6 inline-flex flex-wrap items-center gap-2 sm:gap-3 bg-[#111] shadow-border px-3 sm:px-4 py-2 skew-x-[-12deg] max-w-[90vw]">
              <div className="skew-x-[12deg] flex flex-wrap items-center gap-2 sm:gap-3">
                <Image src="/logo new.png" alt="CyberX Новокосино" width={32} height={32} className="h-4 sm:h-6 w-auto object-contain shrink-0" />
                <div className="w-[2px] h-3 sm:h-4 bg-[#FF2E63] hidden min-[380px]:block" />
                <span className="font-chakra text-[9px] sm:text-xs font-black uppercase tracking-widest text-white whitespace-nowrap">
                  Новокосинская, 32
                </span>
                <span className="flex items-center gap-1 font-chakra text-[9px] sm:text-xs font-black uppercase tracking-widest text-[#00F0FF] whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse shrink-0" />
                  ONLINE 24/7
                </span>
              </div>
            </div>
            
            {/* H1 HEADER */}
            <h1 className="font-tactic text-[1.8rem] min-[360px]:text-[2rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7.5rem] font-black uppercase italic leading-[0.9] tracking-normal text-white text-balance drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              ТВОЙ ВЕЧЕР <br/>
              <span className="text-transparent hidden md:inline" style={{ WebkitTextStroke: '2px #FF2E63' }}>НАЧИНАЕТСЯ</span>
              <span className="text-transparent md:hidden" style={{ WebkitTextStroke: '1px #FF2E63' }}>НАЧИНАЕТСЯ</span> <br/>
              ЗДЕСЬ
            </h1>
            
            {/* TELEMETRY HUD (SPECS) */}
            <div className="mt-6 mb-6 md:mb-8 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-5xl">
              {specs.map((spec, i) => (
                <div key={i} className="bg-[#111] shadow-border p-2 sm:p-3 md:p-4 flex flex-col justify-center skew-x-[-6deg] hover:shadow-border-hover transition-[box-shadow] duration-150 ease-out group">
                    <div className="skew-x-[6deg] flex flex-col">
                        <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                            <spec.icon size={14} style={{ color: spec.color }} className="group-hover:scale-110 transition-transform" />
                            <span className="font-chakra font-bold text-[9px] text-white/40 uppercase tracking-widest">SPEC 0{i+1}</span>
                        </div>
                        <span className="font-tactic text-base min-[380px]:text-lg md:text-2xl text-white uppercase italic leading-none">{spec.label}</span>
                        <span className="font-chakra text-[8px] min-[380px]:text-[10px] md:text-xs text-white/60 font-bold uppercase tracking-wider mt-1 leading-tight">{spec.text}</span>
                    </div>
                </div>
              ))}
            </div>

            {/* ACTION AREA */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 hidden md:flex">
              <button
                onClick={openBooking}
                className="group relative inline-flex h-12 min-[380px]:h-14 md:h-16 items-center justify-center bg-[#FF2E63] px-6 sm:px-8 shadow-border-accent skew-x-[-12deg] transition-[transform,background-color,box-shadow] duration-150 ease-out hover:bg-[#FF2E63]/80 hover:shadow-[0_0_40px_rgba(255,46,99,0.5)] active:scale-[0.96]"
              >
                <div className="skew-x-[12deg] flex items-center gap-2 sm:gap-3">
                  <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  <span className="font-tactic font-black text-xs min-[380px]:text-sm md:text-lg uppercase italic text-white leading-none mt-1">
                    ЗАБРОНИРОВАТЬ МЕСТО
                  </span>
                </div>
              </button>
              <div className="hidden sm:flex flex-col ml-2">
                <span className="font-chakra text-[9px] text-white/40 uppercase font-black tracking-widest border-l-2 border-[#FF2E63] pl-2 mb-1">
                  АВТОМАТИЧЕСКАЯ ПОСАДКА
                </span>
                <span className="font-chakra text-[9px] text-white/40 uppercase font-black tracking-widest border-l-2 border-[#00F0FF] pl-2">
                  БЕЗ ОЖИДАНИЯ В ОЧЕРЕДИ
                </span>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Scroll Cue */}
        <motion.div
          className="absolute bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronsDown className="h-6 w-6 text-[#FF2E63]" />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
