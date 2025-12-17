"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PromoHeader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 1. Эффект "Открытия Лутбокса": Скобки разъезжаются при скролле
  // Когда блок внизу экрана (0), скобки сжаты. Когда в центре (0.5) - идеальная позиция.
  const xBracketLeft = useTransform(scrollYProgress, [0.1, 0.5, 0.9], ["100%", "0%", "-50%"]);
  const xBracketRight = useTransform(scrollYProgress, [0.1, 0.5, 0.9], ["-100%", "0%", "50%"]);
  
  // 2. Прозрачность и масштаб для динамики
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.8, 1.1, 1]);

  // 3. Бегущие строки (Параллакс)
  const xTicker1 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const xTicker2 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      id="special" 
      ref={containerRef}
      className="relative w-full py-40 md:py-60 flex flex-col items-center justify-center overflow-hidden bg-[#050505] border-t border-white/5"
    >
      {/* --- BACKGROUND PARALLAX TICKERS --- */}
      <div className="absolute inset-0 flex flex-col justify-center items-center opacity-10 pointer-events-none select-none overflow-hidden gap-12">
         
         {/* Ticker 1 */}
         <motion.div style={{ x: xTicker1 }} className="whitespace-nowrap w-[200%] text-center">
            <span 
              className="font-tactic font-black text-[12vw] md:text-[12rem] uppercase leading-none text-transparent" 
              style={{ WebkitTextStroke: "2px rgba(255,255,255,0.1)" }}
            >
              BONUS DROP • SPECIAL OFFER • BONUS DROP • SPECIAL OFFER • 
            </span>
         </motion.div>

         {/* Ticker 2 */}
         <motion.div style={{ x: xTicker2 }} className="whitespace-nowrap w-[200%] text-center">
            <span 
              className="font-tactic font-black text-[12vw] md:text-[12rem] uppercase leading-none text-transparent" 
              style={{ WebkitTextStroke: "2px rgba(255,46,99,0.15)" }}
            >
              CYBERX PROMO • LOOT BOX • CYBERX PROMO • LOOT BOX • 
            </span>
         </motion.div>

      </div>

      {/* --- MAIN CONTENT (SCROLL DRIVEN) --- */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 flex flex-col items-center text-center px-4 w-full"
      >
        
        {/* Title Container with Animated Brackets */}
        <div className="flex items-center justify-center relative w-full max-w-6xl">
           
           {/* Left Bracket [ */}
           <motion.span 
             style={{ x: xBracketLeft }}
             className="text-[#FF2E63] text-[20vw] md:text-[16rem] font-tactic font-light leading-[0.8] relative z-20 pb-4"
           >
             [
           </motion.span>
           
           {/* Center Text */}
           <div className="relative mx-4 md:mx-12 z-10">
             {/* Glow Layer */}
             <h2 className="absolute inset-0 font-tactic font-black text-[12vw] md:text-[10rem] uppercase text-[#FF2E63] blur-[60px] opacity-60 select-none animate-pulse">
               АКЦИИ
             </h2>
             {/* Main Text */}
             <h2 className="font-tactic font-black text-[12vw] md:text-[10rem] uppercase text-white tracking-widest drop-shadow-[0_20px_50px_rgba(0,0,0,1)]">
               АКЦИИ
             </h2>
           </div>

           {/* Right Bracket ] */}
           <motion.span 
             style={{ x: xBracketRight }}
             className="text-[#FF2E63] text-[20vw] md:text-[16rem] font-tactic font-light leading-[0.8] relative z-20 pb-4"
           >
             ]
           </motion.span>
        </div>

        {/* Subtitle Badge */}
        <motion.div
          className="mt-6 md:mt-10 inline-flex items-center gap-4 px-8 py-3 border border-[#FF2E63]/50 rounded-full bg-black/80 backdrop-blur-xl shadow-[0_0_40px_rgba(255,46,99,0.3)]"
        >
          <div className="w-2 h-2 bg-[#FF2E63] rounded-full animate-pulse" />
          <span className="font-chakra font-bold text-xs md:text-base text-white uppercase tracking-[0.3em]">
            ЛУТАЙ БОНУСЫ
          </span>
          <div className="w-2 h-2 bg-[#FF2E63] rounded-full animate-pulse" />
        </motion.div>

      </motion.div>
    </section>
  );
}