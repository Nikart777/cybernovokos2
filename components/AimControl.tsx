"use client";

import { motion } from "framer-motion";
import { Crosshair, Zap, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link"; // Импорт Link для перехода

export default function AimControl() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#050505] overflow-hidden border-t border-white/5">
      
      {/* Background Grid & Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#FF2E63]/20 blur-[100px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-10 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           
           {/* TEXT CONTENT */}
           <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="flex flex-col items-start text-left"
           >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF2E63]/10 border border-[#FF2E63]/30 rounded-full mb-6">
                 <Crosshair size={14} className="text-[#FF2E63] animate-[spin_3s_linear_infinite]" />
                 <span className="font-mono text-[10px] text-[#FF2E63] uppercase tracking-widest">Aim Challenge v1.0</span>
              </div>

              <h2 className="font-tactic font-black text-5xl md:text-7xl text-white uppercase leading-[0.9] mb-6">
                ПРОВЕРЬ <br />
                <span className="text-transparent" style={{ WebkitTextStroke: "1px #FF2E63" }}>СВОЙ AIM</span>
              </h2>

              <p className="font-inter text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
                Запусти тренажер прямо в браузере, покажи лучший результат и получи скидку на игровое время.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                 <Link
                   href="/aim" // ССЫЛКА НА НОВУЮ СТРАНИЦУ
                   className="group relative px-8 py-4 bg-[#FF2E63] text-white font-chakra font-bold text-lg uppercase tracking-widest overflow-hidden skew-x-[-12deg] hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-3"
                 >
                    <div className="skew-x-[12deg] flex items-center gap-3">
                       <Zap size={20} className="fill-current" />
                       Начать игру
                    </div>
                    {/* Shine Effect */}
                    <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[25deg] group-hover:animate-[shine_0.75s_infinite]" />
                 </Link>
                 
                 <div className="px-8 py-4 border border-white/20 text-white font-chakra font-bold text-lg uppercase tracking-widest skew-x-[-12deg] flex items-center justify-center gap-3 opacity-60 cursor-not-allowed" title="Скоро">
                    <div className="skew-x-[12deg] flex items-center gap-3">
                       <Trophy size={20} />
                       Лидерборд
                    </div>
                 </div>
              </div>
              
              <div className="mt-6 flex items-center gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
                 <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Browser Game</span>
                 <span className="w-px h-3 bg-gray-700" />
                 <span>Max Reward: 300₽</span>
              </div>

           </motion.div>

           {/* VISUAL / MOCKUP */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative h-[400px] md:h-[500px] bg-gradient-to-b from-[#111] to-[#0A0A0A] rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden group"
           >
              {/* Fake UI Elements */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
                 <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                 </div>
                 <div className="font-mono text-[10px] text-gray-600">TARGET_PRACTICE.EXE</div>
              </div>

              {/* Grid Target Animation */}
              <div className="relative w-full h-full flex items-center justify-center">
                 {/* Crosshair Center */}
                 <div className="relative z-10">
                    <Crosshair size={48} className="text-[#FF2E63] opacity-80" strokeWidth={1} />
                    <div className="absolute inset-0 bg-[#FF2E63]/20 blur-xl animate-pulse" />
                 </div>
                 
                 {/* Moving Targets (Decorative) */}
                 {[1,2,3].map((_, i) => (
                   <div 
                     key={i}
                     className="absolute w-8 h-8 border border-[#FF2E63]/40 rounded-full flex items-center justify-center animate-[ping_3s_infinite]"
                     style={{ 
                       top: `${20 + Math.random() * 60}%`, 
                       left: `${20 + Math.random() * 60}%`,
                       animationDelay: `${i}s` 
                     }}
                   >
                      <div className="w-1 h-1 bg-[#FF2E63] rounded-full" />
                   </div>
                 ))}

                 {/* Phone Frame Hint */}
                 <div className="absolute bottom-8 text-center">
                    <p className="font-tactic font-bold text-2xl text-white tracking-widest">300 ₽</p>
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.2em] mt-1">Главный приз</p>
                 </div>
              </div>

              {/* Scanline */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-10 pointer-events-none" />
           </motion.div>

        </div>

      </div>
    </section>
  );
}