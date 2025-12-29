"use client";

export default function Footer() {
  const openPolicy = () => {
    window.dispatchEvent(new CustomEvent("open-privacy-policy"));
  };

  const openOffer = () => {
    window.dispatchEvent(new CustomEvent("open-public-offer"));
  };

  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 pt-12 pb-24 md:pb-12 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF2E63]/30 to-transparent" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#00F3FF]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-end gap-10">
        
        {/* LEFT COLUMN: BRANDING & STUDIO */}
        <div className="flex flex-col items-center md:items-start w-full md:w-auto">
           
           {/* --- ART.VISION BADGE --- */}
           {/* Добавили rel="noopener noreferrer", чтобы ссылка была безопасной */}
           <a 
             href="https://art-vision.online/" 
             target="_blank"
             rel="noopener noreferrer"
             className="group relative mb-8 inline-flex items-center gap-5 px-6 py-4 bg-[#0A0A0A] border border-[#00F3FF]/30 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,243,255,0.1)] hover:shadow-[0_0_40px_rgba(0,243,255,0.3)] hover:border-[#00F3FF] transition-all duration-300"
           >
              <div className="absolute top-0 left-[-150%] w-[100%] h-full bg-gradient-to-r from-transparent via-[#00F3FF]/10 to-transparent skew-x-[-20deg] animate-[shine_3s_infinite_linear]" />
              
              <div className="flex flex-col items-start relative z-10">
                 <span className="font-mono text-[9px] text-gray-400 uppercase tracking-[0.1em] mb-1">
                   Сайт разработан студией
                 </span>
                 <span className="font-tactic font-black text-2xl text-[#00F3FF] tracking-widest drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                   ART.VISION
                 </span>
              </div>
              
              <div className="relative w-2 h-2">
                 <div className="absolute inset-0 bg-[#00F3FF] rounded-full animate-ping opacity-75" />
                 <div className="relative w-2 h-2 bg-[#00F3FF] rounded-full shadow-[0_0_10px_#00F3FF]" />
              </div>

              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00F3FF]/50" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00F3FF]/50" />
           </a>

           {/* Copyright */}
           <div className="flex flex-col items-center md:items-start gap-1 opacity-40 hover:opacity-80 transition-opacity">
             <span className="font-chakra font-bold text-white uppercase tracking-widest text-xs">
               © 2025 CyberX Novokosino
             </span>
             <span className="font-mono text-[9px] text-gray-500">
               All rights reserved. System V.5.0
             </span>
           </div>
        </div>

        {/* RIGHT: LEGAL LINKS */}
        {/* ИСПРАВЛЕНО: Теперь это button, а не a href="#" */}
        <div className="flex flex-wrap justify-center gap-6 mb-2">
           <button 
             onClick={openPolicy} 
             className="text-xs text-gray-500 hover:text-[#FF2E63] transition-colors cursor-pointer font-medium uppercase tracking-wide bg-transparent border-none outline-none"
           >
             Политика конфиденциальности
           </button>
           <button 
             onClick={openOffer} 
             className="text-xs text-gray-500 hover:text-[#FF2E63] transition-colors cursor-pointer font-medium uppercase tracking-wide bg-transparent border-none outline-none"
           >
             Публичная оферта
           </button>
        </div>

      </div>
    </footer>
  );
}