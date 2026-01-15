"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ZoneHeader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Параллакс для водяного знака (цифра 01 будет двигаться медленнее скролла)
  const yWatermark = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacityWatermark = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.1, 0]);

  return (
    <section
      id="about" // Добавлен ID для навигации
      ref={containerRef}
      className="relative w-full py-32 md:py-40 flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* --- BACKGROUND GRID (Subtle Tech Pattern) --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 46, 99, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 46, 99, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Radial Glow in center */}
      <div className="absolute inset-0 bg-radial-gradient from-[#FF2E63]/5 via-transparent to-transparent opacity-50" />

      {/* --- WATERMARK "01" --- */}
      <motion.div
        style={{ y: yWatermark, opacity: opacityWatermark }}
        className="absolute z-0 select-none pointer-events-none"
      >
        <span className="font-tactic font-black text-[30vw] text-white leading-none opacity-50 blur-sm">
          01
        </span>
      </motion.div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">

        {/* Animated Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="w-24 h-1 bg-[#FF2E63] mb-8 shadow-[0_0_20px_#FF2E63]"
        />

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-tactic font-black text-5xl md:text-7xl lg:text-8xl uppercase text-white tracking-wide mb-4 drop-shadow-2xl"
        >
          ИГРОВЫЕ ЗОНЫ
        </motion.h2>

        {/* Subtitle / Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-3 md:gap-6 font-chakra font-bold text-sm md:text-lg tracking-[0.3em] uppercase text-white/60"
        >
          <span>PC</span>
          <span className="text-[#FF2E63]">{'//'}</span>
          <span>PS5</span>
          <span className="text-[#FF2E63]">{'//'}</span>
          <span>SIM</span>
        </motion.div>

      </div>
    </section>
  );
}