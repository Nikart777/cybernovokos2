"use client";

import Link from "next/link";

export default function Footer() {
  const openPolicy = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-privacy-policy"));
  };

  const openOffer = (e: React.MouseEvent) => {
    e.preventDefault();
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

          {/* --- ART.VISION BADGE (ALWAYS GLOWING) --- */}
          <a
            href="https://art-vision.online/"
            target="_blank"
            className="group relative mb-8 inline-flex items-center gap-5 px-6 py-4 bg-[#0A0A0A] border border-[#00F3FF]/30 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,243,255,0.1)] hover:shadow-[0_0_40px_rgba(0,243,255,0.3)] hover:border-[#00F3FF] transition-all duration-300"
          >
            {/* Always Animated Scanline Background */}
            <div className="absolute top-0 left-[-150%] w-[100%] h-full bg-gradient-to-r from-transparent via-[#00F3FF]/10 to-transparent skew-x-[-20deg] animate-[shine_3s_infinite_linear]" />

            {/* Text Content */}
            <div className="flex flex-col items-start relative z-10">
              <span className="font-mono text-[9px] text-gray-400 uppercase tracking-[0.1em] mb-1">
                Сайт разработан студией
              </span>
              <span className="font-tactic font-black text-2xl text-[#00F3FF] tracking-widest drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                ART.VISION
              </span>
            </div>

            {/* Status Dot */}
            <div className="relative w-2 h-2">
              <div className="absolute inset-0 bg-[#00F3FF] rounded-full animate-ping opacity-75" />
              <div className="relative w-2 h-2 bg-[#00F3FF] rounded-full shadow-[0_0_10px_#00F3FF]" />
            </div>

            {/* Corner Accents */}
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

        {/* MAIN LINKS */}
        <div className="flex flex-wrap justify-center gap-8 mb-8 border-b border-white/5 pb-8">
          <Link href="/prices" className="font-chakra font-bold text-sm text-white/60 hover:text-[#FF2E63] transition-colors uppercase tracking-widest">Цены</Link>
          <Link href="/simracing" className="font-chakra font-bold text-sm text-white/60 hover:text-[#FF2E63] transition-colors uppercase tracking-widest">Симрейсинг</Link>
          <Link href="/contacts" className="font-chakra font-bold text-sm text-white/60 hover:text-[#FF2E63] transition-colors uppercase tracking-widest">Контакты</Link>
          <Link href="/aim" className="font-chakra font-bold text-sm text-white/60 hover:text-[#FF2E63] transition-colors uppercase tracking-widest">Aim Game</Link>
        </div>

        {/* RIGHT: LEGAL LINKS */}
        <div className="flex flex-wrap justify-center gap-6 mb-2">
          <a href="#" onClick={openPolicy} className="text-xs text-gray-500 hover:text-[#FF2E63] transition-colors cursor-pointer font-medium uppercase tracking-wide">
            Политика конфиденциальности CyberX
          </a>
          <a href="#" onClick={openOffer} className="text-xs text-gray-500 hover:text-[#FF2E63] transition-colors cursor-pointer font-medium uppercase tracking-wide">
            Публичная оферта клуба
          </a>
        </div>

      </div>
    </footer>
  );
}