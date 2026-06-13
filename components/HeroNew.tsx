'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  ChevronsDown,
  Clock3,
  Cpu,
  Gamepad2,
  MapPin,
  MonitorUp,
  Smartphone,
  Trophy,
} from 'lucide-react';
import Image from 'next/image';

const zones = [
  { title: 'Соло', text: 'мощный ПК и фокус', image: '/zones/solo-premium-1.webp', color: '#00F0FF' },
  { title: 'Компания', text: 'буткемп и общие зоны', image: '/zones/bootcamp-3.webp', color: '#FF2E63' },
  { title: 'PS5', text: 'лаунж для отдыха', image: '/zones/ps5-2.webp', color: '#B900FF' },
  { title: 'Симрейсинг', text: 'руль, кокпит, скорость', image: '/zones/sim-3.webp', color: '#51F0AD' },
];

const specs = [
  { label: 'RTX 5070', text: 'топовая графика', icon: Cpu, color: '#00F0FF' },
  { label: '400 Гц', text: 'мониторы для точной игры', icon: MonitorUp, color: '#FF2E63' },
  { label: '24/7', text: 'можно прийти ночью', icon: Clock3, color: '#00F0FF' },
  { label: '400 бонусов', text: 'на первый визит', icon: Trophy, color: '#FF2E63' },
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
          className="absolute left-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent"
          style={{ top: `${top}%`, width: `${26 + index * 7}%` }}
          animate={{ x: ['-45vw', '120vw'], opacity: [0, 0.48, 0] }}
          transition={{
            duration: 5.6 + index * 0.4,
            repeat: Infinity,
            ease: 'linear',
            delay: index * 0.42,
          }}
        />
      ))}
    </>
  );
}

function ZoneCard({
  zone,
  index,
}: {
  zone: (typeof zones)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative min-h-[150px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] shadow-2xl sm:min-h-[200px] lg:min-h-[230px]"
    >
      <Image
        src={zone.image}
        alt={zone.title}
        fill
        sizes="(max-width: 1024px) 45vw, 280px"
        className="object-cover opacity-80 transition-transform duration-700 hover:scale-105 hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5 pointer-events-none">
        <div
          className="mb-3 h-1 w-12 md:mb-4 md:w-16"
          style={{ backgroundColor: zone.color, boxShadow: `0 0 22px ${zone.color}` }}
        />
        <div className="font-tactic text-xl font-black uppercase leading-none text-white md:text-3xl">
          {zone.title}
        </div>
        <div className="mt-2 font-inter text-xs text-white/62 md:text-base">{zone.text}</div>
      </div>
    </motion.div>
  );
}

function SpecCard({
  item,
  index,
}: {
  item: (typeof specs)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="rounded-2xl border border-white/10 bg-white/[0.045] p-3 backdrop-blur-md sm:p-4 md:p-5 transition-colors hover:bg-white/[0.08]"
    >
      <item.icon className="mb-4 h-4 w-4 sm:mb-5 sm:h-5 sm:w-5" style={{ color: item.color }} />
      <div className="font-tactic text-xl font-black uppercase leading-none sm:text-2xl md:text-3xl" style={{ color: item.color }}>
        {item.label}
      </div>
      <div className="mt-2 font-inter text-xs text-white/56 sm:text-sm">{item.text}</div>
    </motion.div>
  );
}

export default function HeroNew() {
  const reduceMotion = useReducedMotion();

  const openBooking = () => {
    window.dispatchEvent(new CustomEvent('open-booking'));
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <div className="bg-[#050505] text-white">
      {/* 1. Main Hero Section */}
      <section id="hero" className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <Image
            src="/main.webp"
            alt="Интерьер компьютерного клуба CyberX Новокосино"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30 saturate-125 scale-105"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.85)_40%,rgba(5,5,5,0.4)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.8)_0%,rgba(5,5,5,0.2)_48%,#050505_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,240,255,0.08),transparent_40%)]" />
        </div>

        <SignalGrid />

        <div className="container relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-md">
              <Image src="/logo new.png" alt="CyberX Новокосино" width={46} height={46} className="h-8 w-auto object-contain" />
              <span className="font-chakra text-[10px] font-bold uppercase tracking-[0.24em] text-white/64">
                компьютерный клуб 24/7
              </span>
            </div>
            
            <h1 className="font-tactic text-[2.5rem] min-[380px]:text-[3rem] sm:text-[4.5rem] lg:text-[6.5rem] font-black uppercase italic leading-[1.05] sm:leading-[0.95] tracking-normal text-white">
              Твой
              <span className="block sm:inline"> вечер</span>
              <span className="block text-[#00F0FF]">начинается</span>
              <span className="block text-[#00F0FF]">здесь</span>
            </h1>
            
            <p className="mt-6 max-w-2xl font-inter text-base leading-7 text-white/72 sm:text-lg">
              Мощные ПК, VIP-комнаты, PS5-зона и автосимуляторы рядом с метро Новокосино.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                onClick={openBooking}
                className="group relative inline-flex min-h-14 items-center justify-center overflow-hidden rounded-full bg-[#FF2E63] px-8 font-chakra text-sm font-black uppercase tracking-[0.22em] text-white shadow-[0_0_42px_rgba(255,46,99,0.4)] transition duration-300 hover:bg-[#ff3f72] hover:shadow-[0_0_64px_rgba(255,46,99,0.5)] active:scale-[0.98]"
              >
                <span className="absolute inset-y-0 -left-24 w-20 skew-x-[-18deg] bg-white/28 transition-transform duration-700 group-hover:translate-x-[400px]" />
                <span className="relative flex items-center gap-3">
                  <Smartphone className="h-5 w-5" />
                  Забронировать место
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Cue (Animated arrow pointing down) */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronsDown className="h-6 w-6 text-[#00F0FF]" />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Formats (Zones) Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#050505] z-10">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={reduceMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="mb-8 grid items-end gap-4 lg:mb-12 lg:grid-cols-[1fr_420px]"
          >
            <div>
              <div className="font-chakra text-[11px] font-black uppercase tracking-[0.32em] text-[#FF2E63]">
                выбери свой формат
              </div>
              <h2 className="mt-3 font-tactic text-[clamp(2.5rem,4.4vw,4.7rem)] font-black uppercase italic leading-[0.92] text-white">
                Форматы вечера
              </h2>
            </div>
            <p className="max-w-md font-inter text-sm leading-6 text-white/62 sm:text-base sm:leading-7">
              Приходи один, собирай команду или бронируй отдельную зону под компанию.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {zones.map((zone, index) => (
              <ZoneCard key={zone.title} zone={zone} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Specs Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-gradient-to-b from-[#050505] to-[#0a0a0a] z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <motion.div 
              initial={reduceMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
            >
              <div className="mb-6 inline-flex flex-wrap items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#00F0FF] shadow-[0_0_18px_#00F0FF]" />
                <span className="font-chakra text-[10px] font-bold uppercase tracking-[0.24em] text-white/64">
                  Новокосинская, 32
                </span>
                <span className="hidden h-3 w-px bg-white/12 sm:block" />
                <span className="font-chakra text-[10px] font-bold uppercase tracking-[0.24em] text-[#00F0FF]">
                  работаем 24/7
                </span>
              </div>

              <h2 className="font-tactic text-[clamp(2.65rem,5.9vw,6.35rem)] font-black uppercase italic leading-[0.86] tracking-normal text-white">
                Бронируй
                <span className="block text-[#FF2E63]">место заранее</span>
              </h2>

              <p className="mt-6 max-w-xl font-inter text-base leading-7 text-white/72 sm:text-lg">
                Забронируй ПК, VIP-комнату, PS5-зону или автосимулятор заранее и приходи играть без ожидания.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 font-chakra text-[11px] font-bold uppercase tracking-[0.18em] text-white/48">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#00F0FF]" />
                  рядом с метро
                </span>
                <span className="inline-flex items-center gap-2">
                  <Gamepad2 className="h-4 w-4 text-[#FF2E63]" />
                  любой формат отдыха
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 content-center">
              {specs.map((item, index) => (
                <SpecCard key={item.label} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
