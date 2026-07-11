'use client';

import React, { useRef } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { Clock3, Cpu, MonitorUp, Smartphone, Trophy } from 'lucide-react';
import Image from 'next/image';
import ScrollSequence from '@/components/ScrollSequence';
import { useSectionProgress } from '@/components/hooks/useSectionProgress';

const specs = [
  { label: 'RTX 5070', text: 'УЛЬТРА ГРАФИКА', icon: Cpu, color: '#00F0FF' },
  { label: '400 Гц', text: 'КИБЕРСПОРТ МОНИТОРЫ', icon: MonitorUp, color: '#FF2E63' },
  { label: '24/7', text: 'РАБОТАЕМ КРУГЛОСУТОЧНО', icon: Clock3, color: '#B900FF' },
  { label: '400 БОНУСОВ', text: 'НА ПЕРВЫЙ ВИЗИТ', icon: Trophy, color: '#FFD700' },
];

/** One telemetry tile that snaps in during its own slice of the scroll. */
function SpecTile({ p, spec, i }: { p: MotionValue<number>; spec: (typeof specs)[0]; i: number }) {
  const start = 0.36 + i * 0.06;
  const opacity = useTransform(p, [start, start + 0.06], [0, 1]);
  const y = useTransform(p, [start, start + 0.06], [46, 0]);
  const Icon = spec.icon;

  return (
    <motion.div
      style={{ opacity, y }}
      className="bg-[#111]/90 shadow-border p-4 md:p-6 flex flex-col justify-center skew-x-[-6deg] backdrop-blur-sm"
    >
      <div className="skew-x-[6deg] flex flex-col">
        <div className="mb-2 flex items-center gap-2">
          <Icon size={16} style={{ color: spec.color }} />
          <span className="font-chakra text-[9px] font-bold uppercase tracking-widest text-white/40">
            SPEC 0{i + 1}
          </span>
        </div>
        <span className="font-tactic text-xl md:text-3xl uppercase italic leading-none text-white">
          {spec.label}
        </span>
        <span className="mt-1.5 font-chakra text-[9px] md:text-xs font-bold uppercase tracking-wider leading-tight text-white/60">
          {spec.text}
        </span>
      </div>
    </motion.div>
  );
}

export default function HeroNew() {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);

  const openBooking = () => {
    window.dispatchEvent(new CustomEvent('open-booking'));
  };

  // Extra dim while the HUD assembles so tiles stay readable.
  const dimOpacity = useTransform(p, [0.22, 0.4, 0.85, 1], [0, 0.35, 0.35, 0.5]);

  // Act 1 — headline.
  const h1Opacity = useTransform(p, [0, 0.22, 0.3], [1, 1, 0]);
  const h1Y = useTransform(p, [0, 0.3], [0, -70]);

  // Act 2 — telemetry HUD assembles.
  const hudOpacity = useTransform(p, [0.28, 0.34, 0.62, 0.7], [0, 1, 1, 0]);
  const hudHeadY = useTransform(p, [0.28, 0.36], [30, 0]);

  // Act 3 — call to action (cross-fades with the HUD, no dead gap).
  const ctaOpacity = useTransform(p, [0.66, 0.76, 1, 1], [0, 1, 1, 1]);
  const ctaY = useTransform(p, [0.66, 0.8], [46, 0]);
  // The act-3 layer covers the screen; only let it catch clicks once visible.
  const ctaPointer = useTransform(p, (v) => (v > 0.66 ? 'auto' : 'none'));

  const rail = useTransform(p, [0, 1], [0, 1]);

  return (
    <section ref={ref} id="hero" className="relative h-[320vh] bg-[#050505] border-b-2 border-[#FF2E63]/20">
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden pt-[90px]">
        {/* Scroll-scrubbed frame sequence (twinbru-style) */}
        <div className="absolute inset-0 z-0">
          <ScrollSequence
            progress={p}
            base="/frames/hero/"
            count={140}
            className="absolute inset-0 h-full w-full opacity-90 image-outline-dark"
          />
          {/* Light readability gradients — keep the video visible */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.65)_0%,rgba(5,5,5,0.3)_45%,rgba(5,5,5,0.05)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.6)_0%,rgba(5,5,5,0)_40%,#050505_100%)]" />
          {/* Corner shade masking the AI watermark baked into the frames */}
          <div
            aria-hidden
            className="absolute bottom-0 right-0 h-[24rem] w-[30rem] bg-[radial-gradient(ellipse_at_bottom_right,rgba(5,5,5,0.98)_0%,rgba(5,5,5,0.85)_40%,transparent_72%)]"
          />
          <motion.div style={{ opacity: dimOpacity }} className="absolute inset-0 bg-[#050505]" />
        </div>

        {/* Address plate — always present, top-left */}
        <div className="container relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex max-w-[90vw] flex-wrap items-center gap-2 skew-x-[-12deg] bg-[#111] px-3 py-2 shadow-border sm:gap-3 sm:px-4">
            <div className="flex flex-wrap items-center gap-2 skew-x-[12deg] sm:gap-3">
              <Image src="/logo new.png" alt="CyberX Новокосино" width={32} height={32} className="h-4 w-auto shrink-0 object-contain sm:h-6" />
              <div className="hidden h-3 w-[2px] bg-[#FF2E63] min-[380px]:block sm:h-4" />
              <span className="whitespace-nowrap font-chakra text-[9px] font-black uppercase tracking-widest text-white sm:text-xs">
                Новокосинская, 32
              </span>
              <span className="whitespace-nowrap font-chakra text-[9px] font-black uppercase tracking-widest text-[#00F0FF] sm:text-xs">
                ● ONLINE 24/7
              </span>
            </div>
          </div>
        </div>

        {/* Act 1 — headline */}
        <motion.div
          style={{ opacity: h1Opacity, y: h1Y }}
          className="pointer-events-none container relative z-10 mx-auto flex max-w-7xl flex-1 flex-col justify-center px-4 sm:px-6 lg:px-8"
        >
          <h1 className="font-tactic text-[2.2rem] min-[360px]:text-[2.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7.5rem] font-black uppercase italic leading-[0.9] text-white text-balance drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            ТВОЙ ВЕЧЕР <br />
            <span className="hidden text-transparent md:inline" style={{ WebkitTextStroke: '2px #FF2E63' }}>НАЧИНАЕТСЯ</span>
            <span className="text-transparent md:hidden" style={{ WebkitTextStroke: '1px #FF2E63' }}>НАЧИНАЕТСЯ</span> <br />
            ЗДЕСЬ
          </h1>
          <p className="mt-5 max-w-md font-chakra text-xs font-bold uppercase tracking-[0.25em] text-white/50 md:text-sm">
            Компьютерный клуб CyberX · Новокосино
          </p>
        </motion.div>

        {/* Act 2 — telemetry HUD */}
        <motion.div
          style={{ opacity: hudOpacity }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-4 pt-[90px] sm:px-6"
        >
          <motion.div style={{ y: hudHeadY }} className="mb-8 text-center">
            <span className="mb-3 inline-block skew-x-[-12deg] bg-[#111] px-4 py-1.5 font-chakra text-[10px] font-black uppercase tracking-[0.3em] text-[#00F0FF] shadow-border">
              <span className="block skew-x-[12deg]">Телеметрия клуба</span>
            </span>
            <h2 className="font-tactic text-3xl font-black uppercase italic leading-[0.95] text-white md:text-5xl">
              Железо, которое <span className="text-[#FF2E63]">тащит</span>
            </h2>
          </motion.div>

          <div className="grid w-full max-w-3xl grid-cols-2 gap-3 md:gap-5">
            {specs.map((spec, i) => (
              <SpecTile key={spec.label} p={p} spec={spec} i={i} />
            ))}
          </div>
        </motion.div>

        {/* Act 3 — CTA */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY, pointerEvents: ctaPointer }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 pt-[90px] text-center sm:px-6"
        >
          <h2 className="font-tactic text-4xl font-black uppercase italic leading-[0.9] text-white md:text-7xl">
            Погнали?
          </h2>
          <p className="mt-4 font-chakra text-[10px] font-black uppercase tracking-[0.25em] text-white/50 md:text-xs">
            Автоматическая посадка · Без ожидания в очереди
          </p>
          <button
            onClick={openBooking}
            className="group relative mt-8 inline-flex h-14 skew-x-[-12deg] items-center justify-center bg-[#FF2E63] px-8 shadow-border-accent transition-[transform,background-color,box-shadow] duration-150 ease-out hover:bg-[#FF2E63]/80 hover:shadow-[0_0_40px_rgba(255,46,99,0.5)] active:scale-[0.96] md:h-16 md:px-10"
          >
            <div className="flex skew-x-[12deg] items-center gap-3">
              <Smartphone className="h-5 w-5 text-white" />
              <span className="mt-1 font-tactic text-sm font-black uppercase italic leading-none text-white md:text-lg">
                Забронировать место
              </span>
            </div>
          </button>
        </motion.div>

        {/* Progress rail */}
        <div className="absolute bottom-24 left-0 right-0 z-30 px-6 md:bottom-10">
          <div className="mx-auto h-[3px] w-full max-w-xs overflow-hidden rounded-full bg-white/10">
            <motion.div
              style={{ scaleX: rail }}
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#00F0FF] to-[#FF2E63]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
