'use client';

import {
  motion,
  type MotionValue,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ChevronsDown,
  ChevronRight,
  Clock3,
  Cpu,
  Gamepad2,
  MapPin,
  MonitorUp,
  Smartphone,
  Trophy,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

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

function SignalGrid({ progress }: { progress: MotionValue<number> }) {
  const scanY = useTransform(progress, [0, 1], ['-16%', '116%']);
  const gridOpacity = useTransform(progress, [0, 0.45, 1], [0.08, 0.12, 0.075]);

  return (
    <>
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: gridOpacity,
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
      <motion.div
        aria-hidden="true"
        className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#00F0FF]/20 to-transparent"
        style={{ top: scanY }}
      />
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
  progress,
}: {
  zone: (typeof zones)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.34 + index * 0.025;
  const end = start + 0.14;
  const opacity = useTransform(progress, [start, end, 0.66, 0.74], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end], [70, 0]);
  const rotate = useTransform(progress, [start, end], [-4, 0]);

  return (
    <motion.div
      style={{ opacity, y, rotate }}
      className="relative min-h-[150px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] shadow-2xl sm:min-h-[200px] lg:min-h-[230px] transform-gpu will-change-transform"
    >
      <Image
        src={zone.image}
        alt={zone.title}
        fill
        sizes="(max-width: 1024px) 45vw, 280px"
        className="object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5">
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
  progress,
}: {
  item: (typeof specs)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.66 + index * 0.025;
  const opacity = useTransform(progress, [start, start + 0.09], [0, 1]);
  const y = useTransform(progress, [start, start + 0.09], [34, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="rounded-2xl border border-white/10 bg-white/[0.045] p-3 backdrop-blur-md sm:p-4 md:p-5 transform-gpu will-change-transform"
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 1000 : 58,
    damping: reduceMotion ? 1000 : 22,
    restDelta: 0.001,
  });

  const mouseX = useMotionValue('0px');
  const mouseY = useMotionValue('0px');
  const springX = useSpring(mouseX, { stiffness: 70, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 24 });
  const spotlight = useMotionTemplate`radial-gradient(circle at calc(50% + ${springX}) calc(45% + ${springY}), rgba(0,240,255,0.16), transparent 34%)`;

  const bgScale = useTransform(progress, [0, 1], [1.14, 1.02]);
  const bgX = useTransform(progress, [0, 1], ['-28px', '12px']);
  const topDoorY = useTransform(progress, [0, 0.15], ['-76%', '-110%']);
  const bottomDoorY = useTransform(progress, [0, 0.15], ['76%', '110%']);
  const introOpacity = useTransform(progress, [0, 0.26, 0.34], [1, 1, 0]);
  const introY = useTransform(progress, [0, 0.16, 0.34], ['0px', '0px', '-26px']);
  const introBlur = useTransform(progress, [0, 0.28, 0.34], ['0px', '0px', '14px']);
  const introFilter = useMotionTemplate`blur(${introBlur})`;
  const choicesOpacity = useTransform(progress, [0.28, 0.4, 0.6, 0.68], [0, 1, 1, 0]);
  const choicesY = useTransform(progress, [0.28, 0.42, 0.68], ['28px', '0px', '-26px']);
  const finalOpacity = useTransform(progress, [0.62, 0.74], [0, 1]);
  const finalY = useTransform(progress, [0.62, 0.78], ['34px', '0px']);
  const timelineScale = useTransform(progress, [0, 1], [0, 1]);
  const scrollCueOpacity = useTransform(progress, [0, 0.11, 0.2], [1, 1, 0]);
  const scrollCueY = useTransform(progress, [0, 0.2], ['0px', '12px']);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(`${(event.clientX / window.innerWidth - 0.5) * 80}px`);
      mouseY.set(`${(event.clientY / window.innerHeight - 0.5) * 60}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, reduceMotion]);

  const openBooking = () => {
    window.dispatchEvent(new CustomEvent('open-booking'));
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[560svh] bg-[#050505] text-white"
    >
      <div className="sticky top-0 isolate h-[100svh] overflow-hidden px-4 pb-12 pt-24 sm:px-6 lg:px-8 lg:pt-28">
        <div className="absolute inset-0 z-0">
          <motion.div className="absolute inset-0" style={{ scale: bgScale, x: bgX }}>
            <Image
              src="/main.webp"
              alt="Интерьер компьютерного клуба CyberX Новокосино"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-38 saturate-125"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.92)_40%,rgba(5,5,5,0.52)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.78)_0%,rgba(5,5,5,0.24)_48%,#050505_100%)]" />
          <motion.div className="absolute inset-0" style={{ background: spotlight }} />
        </div>

        <SignalGrid progress={progress} />

        <motion.div
          aria-hidden="true"
          className="absolute left-0 right-0 top-0 z-30 h-1/2 border-b border-[#00F0FF]/35 bg-[#050505]"
          style={{ y: topDoorY }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 z-30 h-1/2 border-t border-[#FF2E63]/35 bg-[#050505]"
          style={{ y: bottomDoorY }}
        />

        <div className="container relative z-10 mx-auto h-full">
          <div className="relative h-full w-full">
            <motion.div
              className="pointer-events-none absolute inset-0 flex items-start pt-20 sm:items-center sm:pt-0"
              style={{ opacity: introOpacity, y: introY, filter: introFilter }}
            >
              <div className="max-w-4xl">
                <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-md">
                  <Image src="/logo new.png" alt="CyberX Новокосино" width={46} height={46} className="h-8 w-auto object-contain" />
                  <span className="font-chakra text-[10px] font-bold uppercase tracking-[0.24em] text-white/64">
                    компьютерный клуб 24/7
                  </span>
                </div>
                <h1 className="font-tactic text-[2.1rem] min-[380px]:text-[2.4rem] sm:text-[4.15rem] lg:text-[6.1rem] xl:text-[6.4rem] font-black uppercase italic leading-[1.05] sm:leading-[0.9] tracking-normal text-white">
                  Твой
                  <span className="block sm:inline"> вечер</span>
                  <span className="block text-[#00F0FF]">начинается</span>
                  <span className="block text-[#00F0FF]">здесь</span>
                </h1>
                <p className="mt-5 max-w-2xl font-inter text-base leading-7 text-white/72 sm:text-lg">
                  Мощные ПК, VIP-комнаты, PS5-зона и автосимуляторы рядом с метро Новокосино.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="pointer-events-none absolute inset-0 flex items-start pt-20 sm:items-center sm:pt-0 transform-gpu will-change-transform"
              style={{ opacity: choicesOpacity, y: choicesY }}
            >
              <div className="w-full">
                <div className="mb-4 grid items-end gap-4 lg:mb-6 lg:grid-cols-[1fr_420px]">
                  <div>
                    <div className="font-chakra text-[11px] font-black uppercase tracking-[0.32em] text-[#FF2E63]">
                      выбери свой формат
                    </div>
                    <div className="mt-3 font-tactic text-[clamp(2rem,4.4vw,4.7rem)] font-black uppercase italic leading-[0.92] text-white">
                      Выбери формат вечера
                    </div>
                  </div>
                  <p className="max-w-md font-inter text-sm leading-6 text-white/62 sm:text-base sm:leading-7">
                    Приходи один, собирай команду или бронируй отдельную зону под компанию.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                  {zones.map((zone, index) => (
                    <ZoneCard key={zone.title} zone={zone} index={index} progress={progress} />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0 grid items-start gap-6 pt-20 sm:items-center sm:pt-0 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.76fr)] lg:gap-12"
              style={{ opacity: finalOpacity, y: finalY }}
            >
              <div className="max-w-5xl">
                <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-md">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#00F0FF] shadow-[0_0_18px_#00F0FF]" />
                  <span className="font-chakra text-[10px] font-bold uppercase tracking-[0.24em] text-white/64">
                    Новокосинская, 32
                  </span>
                  <span className="h-3 w-px bg-white/12" />
                  <span className="font-chakra text-[10px] font-bold uppercase tracking-[0.24em] text-[#00F0FF]">
                    работаем 24/7
                  </span>
                </div>

                <h2 className="font-tactic text-[clamp(2.65rem,5.9vw,6.35rem)] font-black uppercase italic leading-[0.86] tracking-normal text-white">
                  Бронируй
                  <span className="block text-[#FF2E63]">место заранее</span>
                </h2>

                <p className="mt-6 max-w-2xl font-inter text-base leading-7 text-white/72 sm:text-lg">
                  Забронируй ПК, VIP-комнату, PS5-зону или автосимулятор заранее и приходи играть без ожидания.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    onClick={openBooking}
                    className="group relative inline-flex min-h-14 items-center justify-center overflow-hidden rounded-full bg-[#FF2E63] px-7 font-chakra text-xs font-black uppercase tracking-[0.22em] text-white shadow-[0_0_42px_rgba(255,46,99,0.3)] transition duration-300 hover:bg-[#ff3f72] hover:shadow-[0_0_64px_rgba(255,46,99,0.46)] active:scale-[0.98]"
                  >
                    <span className="absolute inset-y-0 -left-24 w-20 skew-x-[-18deg] bg-white/28 transition-transform duration-700 group-hover:translate-x-80" />
                    <span className="relative flex items-center gap-3">
                      <Smartphone className="h-4 w-4" />
                      Забронировать место
                    </span>
                  </button>
                  
                  <div className="group flex items-center justify-center sm:justify-start gap-3 px-4 py-2 font-chakra text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
                    <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                      <ChevronsDown className="h-5 w-5 text-[#00F0FF]" />
                    </motion.div>
                    <span className="text-left leading-relaxed">
                      или листай ниже, чтобы<br className="hidden sm:block" />узнать железо и цены
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 font-chakra text-[11px] font-bold uppercase tracking-[0.18em] text-white/48">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#00F0FF]" />
                    рядом с метро Новокосино
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Gamepad2 className="h-4 w-4 text-[#FF2E63]" />
                    соло, компания, PS5, симрейсинг
                  </span>
                </div>
              </div>

              <div className="hidden grid-cols-2 gap-3 sm:grid">
                {specs.map((item, index) => (
                  <SpecCard key={item.label} item={item} index={index} progress={progress} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-8 top-[25rem] z-40 flex translate-x-0 flex-col items-center gap-2 sm:bottom-8 sm:left-1/2 sm:right-auto sm:top-auto sm:-translate-x-1/2"
          style={{ opacity: scrollCueOpacity, y: scrollCueY }}
        >
          <motion.div
            className="grid h-12 w-12 place-items-center rounded-full border border-white/12 bg-black/30 text-[#00F0FF] shadow-[0_0_34px_rgba(0,240,255,0.12)] backdrop-blur-md"
            animate={{ y: [0, 6, 0], boxShadow: ['0 0 20px rgba(0,240,255,0.10)', '0 0 44px rgba(0,240,255,0.24)', '0 0 20px rgba(0,240,255,0.10)'] }}
            transition={{ duration: 1.55, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronsDown className="h-5 w-5" />
          </motion.div>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#FF2E63]/60 to-transparent" />
        </motion.div>

        <div className="absolute bottom-4 left-1/2 z-20 h-px w-44 -translate-x-1/2 bg-white/10">
          <motion.div className="h-full origin-left bg-gradient-to-r from-[#FF2E63] via-[#B900FF] to-[#00F0FF]" style={{ scaleX: timelineScale }} />
        </div>
      </div>
    </section>
  );
}
