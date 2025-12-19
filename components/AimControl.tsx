"use client";

import { motion } from "framer-motion";
import { Crosshair, Zap, Play, MousePointer2 } from "lucide-react";
import Link from "next/link"; 

export default function AimControl() {
  return (
    <section id="aim-control" className="relative w-full py-24 md:py-32 bg-[#050505] overflow-hidden border-t border-white/5">
      
      {/* Background Grid & Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#FF2E63]/20 blur-[100px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-10 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           
           {/* TEXT CONTENT (LEFT) */}
           <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="flex flex-col items-start text-left"
           >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF2E63]/10 border border-[#FF2E63]/30 rounded-full mb-6">
                 <Crosshair size={14} className="text-[#FF2E63] animate-[spin_3s_linear_infinite]" />
                 <span className="font-mono text-[10px] text-[#FF2E63] uppercase tracking-widest">Проверка реакции</span>
              </div>

              <h2 className="font-tactic font-black text-5xl md:text-7xl text-white uppercase leading-[0.9] mb-6">
                ПРОВЕРЬ <br />
                <span className="text-transparent" style={{ WebkitTextStroke: "1px #FF2E63" }}>СВОЙ AIM</span>
              </h2>

              <p className="font-inter text-gray-400 text-lg mb-8 max-w-md leading-relaxed">
                Покажи свой скилл и забери бонус на первое посещение! Чем быстрее реакция — тем крупнее приз на баланс. Конвертируй свою точность в игровое время прямо сейчас.
              </p>

              {/* Badges */}
              <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-3 text-sm font-mono text-gray-300 uppercase tracking-widest">
                     <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#00FF00]" /> 
                     Онлайн игра
                 </div>
                 <div className="flex items-center gap-3 text-sm font-mono text-gray-300 uppercase tracking-widest">
                     <div className="w-2 h-2 bg-[#FFD700] rounded-full shadow-[0_0_10px_#FFD700]" /> 
                     Макс. приз: 1200 Бонусов
                 </div>
              </div>

           </motion.div>

           {/* VISUAL / GAME PREVIEW (RIGHT) */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative h-[400px] md:h-[450px] bg-[#0A0A0A] rounded-3xl border border-white/10 flex flex-col overflow-hidden group shadow-2xl hover:border-[#FF2E63]/50 transition-colors duration-500"
           >
              {/* Fake Game HUD Header */}
              <div className="h-14 bg-[#050505]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-20">
                 <div className="flex flex-col items-center">
                    <span className="text-[8px] text-[#FF2E63] uppercase font-bold tracking-widest">Time</span>
                    <span className="font-mono text-lg font-bold text-white">00:45</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <span className="text-[8px] text-[#00F0FF] uppercase font-bold tracking-widest">Score</span>
                    <span className="font-tactic font-bold text-lg text-white tracking-widest">0000</span>
                 </div>
              </div>

              {/* Game Area Preview */}
              <div className="flex-grow relative flex items-center justify-center bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#000_100%)] overflow-hidden">
                 
                 {/* Grid */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

                 {/* Center START Button (Game Style) */}
                 <div className="relative z-30 flex flex-col items-center">
                    <Link href="/aim" className="group/btn relative">
                        <div className="px-12 py-5 bg-white text-black font-chakra font-black text-2xl uppercase tracking-widest skew-x-[-10deg] hover:bg-[#FF2E63] hover:text-white transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,46,99,0.6)] flex items-center gap-3 cursor-pointer">
                           <span className="skew-x-[10deg] flex items-center gap-3">
                             <Play size={24} className="fill-current" />
                             START GAME
                           </span>
                        </div>
                    </Link>
                    <div className="mt-4 text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] animate-pulse">
                       Нажми чтобы начать
                    </div>
                 </div>

                 {/* Decorative Floating Targets */}
                 {[1, 2, 3].map((i) => (
                    <motion.div
                       key={i}
                       animate={{ 
                          y: [0, -20, 0],
                          scale: [1, 1.1, 1],
                          opacity: [0.3, 0.7, 0.3]
                       }}
                       transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          delay: i * 0.8,
                          ease: "easeInOut"
                       }}
                       className="absolute w-16 h-16 rounded-full border-2 border-[#00F0FF]/30 flex items-center justify-center pointer-events-none"
                       style={{
                          top: `${20 + i * 15}%`,
                          left: `${10 + i * 25}%`,
                       }}
                    >
                       <div className="w-10 h-10 bg-gradient-to-br from-[#00F0FF] to-blue-600 rounded-full opacity-20" />
                    </motion.div>
                 ))}

                 {/* Cursor Hint */}
                 <motion.div
                    animate={{ x: [40, -40, 40], y: [20, -20, 20] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute z-20 pointer-events-none drop-shadow-xl opacity-80"
                    style={{ top: '60%', left: '60%' }}
                 >
                    <MousePointer2 size={32} className="fill-white text-black stroke-[1.5px]" />
                 </motion.div>

              </div>
           </motion.div>

        </div>

      </div>
    </section>
  );
}