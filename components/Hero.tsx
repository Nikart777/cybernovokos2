"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Проверяем ширину экрана для отключения тяжелых эффектов
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Параллакс эффект только для десктопа
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 15;
    const y = (clientY / innerHeight - 0.5) * 15;
    setMousePosition({ x, y });
  };

  const scrollToZones = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { scrollY } = useScroll();
  // Отключаем параллакс по Y на мобильных (ставим 0), чтобы не дергалось
  const yBg = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : 150]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-between overflow-hidden bg-[#050505] text-white selection:bg-[#FF2E63] selection:text-white pt-24 md:py-0"
    >
      {/* --- SEO H1 (Скрыт от глаз, но виден Яндексу/Google) --- */}
      {/* Это самый важный элемент для ранжирования. Робот видит его первым. */}
      <h1 className="sr-only">
        Компьютерный клуб CyberX Новокосино
      </h1>

      {/* --- BACKGROUND LAYERS --- */}
<<<<<<< HEAD

      {/* 1. Main Image */}
      <motion.div
        style={{ y: yBg, x: isMobile ? 0 : mousePosition.x * -1, scale: 1.1 }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src="/main.webp"
          alt="Киберспортивный клуб CyberX Новокосино"
          fill
          priority
          className="object-cover brightness-[0.5] contrast-[1.2]"
          sizes="100vw"
=======
      
      {/* 1. Main Image (OPTIMIZED: img tag instead of css background for faster LCP) */}
      <motion.div 
        style={{ y: yBg, x: isMobile ? 0 : mousePosition.x * -1, scale: 1.1 }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <img 
            src="/main.webp" 
            alt="Интерьер компьютерного клуба CyberX Новокосино" 
            className="w-full h-full object-cover"
            style={{ 
              filter: 'brightness(0.5) contrast(1.2)' 
            }} 
            loading="eager" // Грузим картинку мгновенно
            decoding="sync"
>>>>>>> b9fcc27b24145455a93c33448f19977129ad833f
        />
      </motion.div>

      {/* 2. Fine Grain */}
      <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}
      />

      {/* 3. Vignette */}
      <div className="absolute inset-0 z-[2] bg-radial-gradient from-transparent via-[#050505]/40 to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#050505]/50 via-transparent to-[#050505] pointer-events-none" />

      {/* --- HUD DECORATIONS (Hidden on Mobile) --- */}
      <div className="absolute top-10 left-10 w-6 h-6 border-l-2 border-t-2 border-white/30 z-10 pointer-events-none hidden md:block" />
      <div className="absolute top-10 right-10 w-6 h-6 border-r-2 border-t-2 border-white/30 z-10 pointer-events-none hidden md:block" />
      <div className="absolute bottom-10 left-10 w-6 h-6 border-l-2 border-b-2 border-white/30 z-10 pointer-events-none hidden md:block" />
      <div className="absolute bottom-10 right-10 w-6 h-6 border-r-2 border-b-2 border-white/30 z-10 pointer-events-none hidden md:block" />
<<<<<<< HEAD

      {/* System Status / SEO HUD */}
=======
      
      {/* System Status / HUD Text */}
>>>>>>> b9fcc27b24145455a93c33448f19977129ad833f
      <div className="absolute top-24 right-5 md:top-28 md:right-10 z-10 hidden sm:flex flex-col items-end text-[9px] md:text-[10px] font-mono text-white/60 tracking-widest gap-2">
        <span className="border-b border-white/10 pb-1 mb-1">КОМПЬЮТЕРНЫЙ КЛУБ НОВОКОСИНО</span>
        <span>МОЩНЫЕ ПК RTX 4060 / 5070</span>
        <span>PS5 LOUNGE & SIM RACING</span>
        <span className="text-[#FF2E63] font-bold">РАБОТАЕМ 24/7</span>
      </div>

      {/* --- MAIN CONTENT WRAPPER --- */}
      {/* aria-hidden="true" говорит роботу пропустить этот блок текста, так как мы уже дали ему H1 выше */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-[1400px] px-4 flex-grow my-auto">
<<<<<<< HEAD

        {/* TAGLINE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8"
        >
          <div className="h-[2px] w-8 md:w-12 bg-[#FF2E63] shadow-[0_0_15px_#FF2E63]" />
          <span className="font-chakra font-bold text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/90 drop-shadow-[0_0_8px_rgba(255,46,99,0.8)] whitespace-nowrap">
            КОМПЬЮТЕРНЫЙ КЛУБ
          </span>
          <div className="h-[2px] w-8 md:w-12 bg-[#FF2E63] shadow-[0_0_15px_#FF2E63]" />
        </motion.div>

        {/* H1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-8 md:mb-16 w-full flex flex-col items-center text-center"
        >
          <h1 className="flex flex-col items-center w-full">
            <span className="font-tactic font-black text-[15vw] md:text-[10vw] lg:text-[150px] uppercase leading-[0.8] tracking-tight text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              CYBERX
            </span>

            <span className="font-tactic font-black text-[9vw] md:text-[6vw] lg:text-[90px] uppercase leading-[0.9] tracking-tight w-full drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)] mt-2 md:mt-0 text-[#FF2E63]">
              НОВОКОСИНО
            </span>

            <span className="sr-only">Компьютерный клуб CyberX Новокосино — Москва, метро Новокосино</span>
          </h1>
          <p className="mt-4 font-chakra font-bold text-sm md:text-lg text-white/70 uppercase tracking-widest max-w-2xl px-4">
            Топовый киберклуб в Москве (Новокосино). RTX 5070, 400 Гц, PS5 и Автосимуляторы 24/7.
          </p>
        </motion.div>
=======
        
        <div aria-hidden="true" className="flex flex-col items-center w-full">
            {/* TAGLINE */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8"
            >
              <div className="h-[2px] w-8 md:w-12 bg-[#FF2E63] shadow-[0_0_15px_#FF2E63]" />
              <span className="font-chakra font-bold text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/90 drop-shadow-[0_0_8px_rgba(255,46,99,0.8)] whitespace-nowrap">
                КОМПЬЮТЕРНЫЙ КЛУБ
              </span>
              <div className="h-[2px] w-8 md:w-12 bg-[#FF2E63] shadow-[0_0_15px_#FF2E63]" />
            </motion.div>

            {/* BIG LOGO (Visual Title) */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, ease: "easeOut" }} 
               className="relative mb-8 md:mb-16 w-full flex flex-col items-center text-center"
            >
               <div className="flex flex-col items-center w-full">
                 <span className="font-tactic font-black text-[15vw] md:text-[10vw] lg:text-[150px] uppercase leading-[0.8] tracking-tight text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                  CYBERX
                 </span>
                 
                 <span className="font-tactic font-black text-[9vw] md:text-[6vw] lg:text-[90px] uppercase leading-[0.9] tracking-tight w-full drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)] mt-2 md:mt-0 text-[#FF2E63]">
                   НОВОКОСИНО
                 </span>
               </div>
            </motion.div>
        </div>
>>>>>>> b9fcc27b24145455a93c33448f19977129ad833f

        {/* BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8 md:mb-20"
        >
          <button
            className="group relative inline-flex items-center justify-center px-10 py-4 md:px-12 md:py-6 bg-transparent outline-none cursor-pointer transform -skew-x-12 transition-transform duration-200 active:scale-95"
            onClick={scrollToZones}
          >
            <div className="absolute inset-0 bg-[#111] border-2 border-white/20 group-hover:bg-[#FF2E63] group-hover:border-[#FF2E63] transition-all duration-200 ease-out shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(255,46,99,0.6)]" />
            <span className="relative z-10 flex items-center justify-center gap-3 font-chakra font-black text-lg md:text-2xl tracking-[0.15em] uppercase transform skew-x-12 text-white group-hover:text-black transition-colors duration-200 whitespace-nowrap">
              ВРЫВАЙСЯ В ИГРУ
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-1 transition-transform duration-200"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </button>
        </motion.div>

      </div>

<<<<<<< HEAD
      {/* --- STATS (ИСПРАВЛЕНО: Relative на мобильных, Absolute на десктопе) --- */}
      {/* Это решает проблему наложения текста на кнопку */}
      <motion.div
=======
      {/* --- STATS --- */}
      <motion.div 
>>>>>>> b9fcc27b24145455a93c33448f19977129ad833f
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="w-full z-30 relative md:absolute md:bottom-0 md:left-0 pb-8 md:pb-0"
      >
<<<<<<< HEAD
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6 md:mb-12 hidden md:block" />

        <div className="w-full max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-6 md:gap-4 items-start justify-items-center text-center py-6 md:pb-12 bg-[#111]/50 md:bg-transparent rounded-2xl md:rounded-none border border-white/5 md:border-none backdrop-blur-md md:backdrop-blur-none">
            <HudItem icon={<GpuIcon />} value="RTX 5070" label="ВИДЕОКАРТЫ" />
            <HudItem icon={<MonitorIcon />} value="400 Гц" label="МОНИТОРЫ" />
            <HudItem icon={<GamepadIcon />} value="PS5 ZONE" label="БЕЗЛИМИТ" highlight />
            <HudItem icon={<SteeringIcon />} value="SIM RACING" label="АВТОСИМ" />

            <div className="col-span-2 md:col-span-1 w-full flex justify-center">
              <HudItem icon={<ClockIcon />} value="24 / 7" label="РЕЖИМ РАБОТЫ" />
            </div>
          </div>
        </div>
=======
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6 md:mb-12 hidden md:block" />

          <div className="w-full max-w-[1400px] mx-auto px-4">
             <div className="grid grid-cols-2 md:grid-cols-5 gap-y-6 md:gap-4 items-start justify-items-center text-center py-6 md:pb-12 bg-[#111]/50 md:bg-transparent rounded-2xl md:rounded-none border border-white/5 md:border-none backdrop-blur-md md:backdrop-blur-none">
                 <HudItem icon={<GpuIcon />} value="RTX 5070" label="ВИДЕОКАРТЫ" />
                 <HudItem icon={<MonitorIcon />} value="400 Гц" label="МОНИТОРЫ" />
                 <HudItem icon={<GamepadIcon />} value="PS5 ZONE" label="БЕЗЛИМИТ" highlight />
                 <HudItem icon={<SteeringIcon />} value="SIM RACING" label="АВТОСИМ" />
                 
                 <div className="col-span-2 md:col-span-1 w-full flex justify-center">
                   <HudItem icon={<ClockIcon />} value="24 / 7" label="РЕЖИМ РАБОТЫ" />
                 </div>
             </div>
          </div>
>>>>>>> b9fcc27b24145455a93c33448f19977129ad833f
      </motion.div>

    </section>
  );
}

// --- SUBCOMPONENTS ---

function HudItem({ value, label, icon, highlight = false }: { value: string, label: string, icon: React.ReactNode, highlight?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2 md:gap-3 group cursor-default w-full">
      <div className={`transition-transform duration-300 group-hover:-translate-y-1 ${highlight ? 'text-[#FF2E63]' : 'text-white/60 group-hover:text-white'}`}>
        {icon}
      </div>
      <div className="flex flex-col items-center">
        <div className={`font-chakra font-bold text-base md:text-xl leading-none mb-1 md:mb-2 ${highlight ? 'text-[#FF2E63]' : 'text-white group-hover:text-[#FF2E63]'} transition-colors`}>
          {value}
        </div>
        <div className="font-mono text-[8px] md:text-[10px] text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors duration-300">
          {label}
        </div>
      </div>
    </div>
  )
}

// Inline SVGs
const GpuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-[28px] md:h-[28px]">
    <path d="M2 15V9C2 5.68629 4.68629 3 8 3H16C19.3137 3 22 5.68629 22 9V15C22 18.3137 19.3137 21 16 21H8C4.68629 21 2 18.3137 2 15Z" />
    <path d="M6 9L6.01 9" />
    <path d="M6 15L6.01 15" />
    <path d="M10 6V18" />
    <path d="M14 6V18" />
    <path d="M18 9L18.01 9" />
    <path d="M18 15L18.01 15" />
  </svg>
)

const MonitorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-[28px] md:h-[28px]">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M12 17v4"></path>
    <path d="M8 21h8"></path>
  </svg>
)

const GamepadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-[28px] md:h-[28px]">
    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
    <path d="M6 12h4"></path>
    <path d="M8 10v4"></path>
    <path d="M15 13h.01"></path>
    <path d="M18 11h.01"></path>
  </svg>
)

const SteeringIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-[28px] md:h-[28px]">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 2v8"></path>
    <path d="M12 14v8"></path>
    <path d="M2 12h8"></path>
    <path d="M14 12h8"></path>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
)

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-[28px] md:h-[28px]">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
)