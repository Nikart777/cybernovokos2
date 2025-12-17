"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PriceHeader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Вращение элементов реактора при скролле
  const rotateClockwise = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const rotateCounter = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="price" 
      ref={containerRef}
      className="relative w-full py-24 flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* --- REACTOR CORE BACKGROUND (Неожиданный визуал) --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        
        {/* Ring 1: Dashed Large */}
        <motion.div 
          style={{ rotate: rotateClockwise }}
          className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] border border-white/10 rounded-full border-dashed"
        />
        
        {/* Ring 2: Accent Tech Ring */}
        <motion.div 
          style={{ rotate: rotateCounter }}
          className="absolute w-[250px] h-[250px] md:w-[380px] md:h-[380px] rounded-full border border-[#FF2E63]/20"
        >
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FF2E63] rounded-full shadow-[0_0_10px_#FF2E63]" />
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FF2E63] rounded-full shadow-[0_0_10px_#FF2E63]" />
        </motion.div>

        {/* Ring 3: Inner Hexagon (SVG) */}
        <motion.div style={{ rotate: rotateClockwise }} className="absolute text-[#B900FF]/20">
           <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
             <polygon points="50 5, 95 27, 95 73, 50 95, 5 73, 5 27" />
           </svg>
        </motion.div>

        {/* Central Glow */}
        <div className="absolute w-[100px] h-[100px] bg-[#FF2E63] blur-[80px] opacity-30 animate-pulse" />
      </div>

      {/* --- COMPACT CONTENT --- */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center gap-4 text-center px-4"
      >
        
        {/* Top Decor */}
        <div className="flex items-center gap-3">
           <div className="w-1 h-1 bg-[#FF2E63]" />
           <span className="font-mono text-[9px] text-[#FF2E63] tracking-[0.3em] uppercase">SYSTEM_PAYMENT</span>
           <div className="w-1 h-1 bg-[#FF2E63]" />
        </div>

        {/* Title */}
        <h2 className="font-tactic font-black text-6xl md:text-9xl lg:text-[10rem] uppercase text-white tracking-widest drop-shadow-[0_0_25px_rgba(255,46,99,0.4)]">
          ЦЕНЫ
        </h2>

        {/* Subtitle / Tech Specs */}
        <div className="flex items-center gap-6 font-chakra font-bold text-xs text-gray-500 tracking-[0.2em] uppercase">
          <span>1 ЧАС</span>
          <span className="w-1 h-1 bg-white/20 rounded-full" />
          <span>ПАКЕТЫ</span>
          <span className="w-1 h-1 bg-white/20 rounded-full" />
          <span>НОЧЬ</span>
        </div>

        {/* Bottom Line (Animated) */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#FF2E63] to-transparent mt-4" 
        />

      </motion.div>
    </section>
  );
}