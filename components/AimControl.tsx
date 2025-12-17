"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function AimControl() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[60vh] min-h-[500px] flex flex-col items-center justify-center overflow-hidden bg-[#050505] border-t border-b border-[#FF2E63]/20"
    >
      {/* --- BACKGROUND GRID --- */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{ 
          backgroundImage: `linear-gradient(rgba(255, 46, 99, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 46, 99, 0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }}
      />
      
      <div className="absolute inset-0 z-0 bg-radial-gradient from-transparent via-[#050505]/80 to-[#050505]" />

      {/* --- SCREEN CORNERS (UI) --- */}
      <div className="absolute top-8 left-8 w-10 h-10 border-l-2 border-t-2 border-[#FF2E63]/60 rounded-tl-lg pointer-events-none z-10" />
      <div className="absolute top-8 right-8 w-10 h-10 border-r-2 border-t-2 border-[#FF2E63]/60 rounded-tr-lg pointer-events-none z-10" />
      <div className="absolute bottom-8 left-8 w-10 h-10 border-l-2 border-b-2 border-[#FF2E63]/60 rounded-bl-lg pointer-events-none z-10" />
      <div className="absolute bottom-8 right-8 w-10 h-10 border-r-2 border-b-2 border-[#FF2E63]/60 rounded-br-lg pointer-events-none z-10" />

      {/* --- REC INDICATOR --- */}
      <div className="absolute top-10 right-24 flex items-center gap-2 font-mono text-xs text-white z-10 animate-pulse">
        <div className="w-2.5 h-2.5 bg-red-600 rounded-full shadow-[0_0_10px_red]" />
        REC
      </div>

      {/* --- ANIMATED TARGETS --- */}
      <Target x="20%" y="30%" delay={0} />
      <Target x="80%" y="25%" delay={1.5} />
      <Target x="70%" y="70%" delay={0.8} />
      <Target x="30%" y="65%" delay={2.2} />

      {/* --- CONTENT --- */}
      <div className="relative z-20 flex flex-col items-center text-center px-4">
        
        {/* Title */}
        <motion.h2 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="font-tactic font-black text-6xl md:text-8xl uppercase text-white leading-none mb-6 drop-shadow-[0_0_30px_rgba(255,46,99,0.5)]"
        >
          AIM <span className="text-transparent" style={{ WebkitTextStroke: "2px #fff" }}>CONTROL</span>
        </motion.h2>

        {/* Description */}
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-inter text-sm md:text-lg text-gray-300 max-w-lg mb-10 leading-relaxed"
        >
          Проверь реакцию в нашем Telegram-боте.<br />
          Чем быстрее выстрел — тем больше приз.
          <span className="ml-3 inline-block px-3 py-1 border border-[#FF2E63] text-[#FF2E63] rounded font-bold text-xs shadow-[0_0_15px_rgba(255,46,99,0.2)]">
            MAX 800₽
          </span>
        </motion.p>

        {/* Scope Button */}
        <motion.a 
          href="https://t.me/your_cyberx_novokosino_bot" 
          target="_blank"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative group w-[280px] h-[80px] flex items-center justify-center cursor-pointer"
        >
          {/* Button Corners */}
          <div className="absolute top-0 left-0 w-6 h-6 border-l-[3px] border-t-[3px] border-white group-hover:border-[#FF2E63] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
          <div className="absolute top-0 right-0 w-6 h-6 border-r-[3px] border-t-[3px] border-white group-hover:border-[#FF2E63] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-l-[3px] border-bottom-[3px] border-b-[3px] border-white group-hover:border-[#FF2E63] group-hover:-translate-x-1 group-hover:translate-y-1 transition-all duration-300" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-r-[3px] border-bottom-[3px] border-b-[3px] border-white group-hover:border-[#FF2E63] group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300" />

          {/* Button Body */}
          <div className="absolute inset-2 bg-white/5 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#FF2E63] transition-colors duration-300">
             <span className="font-tactic font-black text-2xl tracking-[0.2em] text-white uppercase group-hover:tracking-[0.4em] transition-all duration-300">
               START GAME
             </span>
          </div>
        </motion.a>

      </div>
    </section>
  );
}

// Компонент мишени
function Target({ x, y, delay }: { x: string, y: string, delay: number }) {
  return (
    <motion.div
      className="absolute w-12 h-12 border border-dashed border-[#FF2E63]/60 rounded-full flex items-center justify-center z-10 pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: [0, 1, 1, 1.5],
        opacity: [0, 1, 1, 0]
      }}
      transition={{ 
        duration: 3, 
        repeat: Infinity, 
        delay: delay,
        ease: "easeInOut",
        times: [0, 0.2, 0.8, 1]
      }}
    >
      <div className="w-1.5 h-1.5 bg-[#FF2E63] rounded-full shadow-[0_0_10px_#FF2E63]" />
    </motion.div>
  );
}