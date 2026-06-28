"use client";

import { motion } from "framer-motion";
import { Moon, Trophy, Users, ChevronRight, Gift, Zap } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const promotions = [
  {
    id: "newbie",
    label: "ПРОМОКОД",
    title: "400₽ НА СТАРТ",
    desc: "Дарим 400 бонусов за регистрацию.",
    icon: Gift,
    color: "#FF2E63",
    btn: "УСЛОВИЯ",
    action: "open-promo-newbie"
  },
  {
    id: "friend",
    label: "РЕФЕРАЛКА",
    title: "ПРИВЕДИ ДРУГА",
    desc: "Твой друг получит 800 бонусов, а ты — 5% кэшбэка вечно.",
    icon: Users,
    color: "#FF7A00",
    btn: "МЕХАНИКА",
    action: "open-promo-friend"
  },
  {
    id: "night",
    label: "ВЫГОДА",
    title: "НОЧНЫЕ ПАКЕТЫ",
    desc: "Отдаем ночные часы по себестоимости.",
    icon: Moon,
    color: "#B900FF",
    btn: "ЦЕНЫ",
    action: "open-promo-night"
  },
  {
    id: "cashback",
    label: "ЛОЯЛЬНОСТЬ",
    title: "КЭШБЭК ДО 20%",
    desc: "Больше играешь — круче статус и выше процент.",
    icon: Trophy,
    color: "#00F0FF",
    btn: "РАНГИ",
    action: "open-promo-cashback"
  }
];

export default function PromotionsNew() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleOpen = (action: string) => {
    window.dispatchEvent(new CustomEvent(action));
  };

  return (
    <section id="promotions" className="relative w-full py-24 md:py-32 bg-[#050505] overflow-hidden border-t-2 border-white/5">
      <div className="absolute inset-0 bg-[#050505] pointer-events-none" />
      
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 bg-[#00F0FF]" />
            <span className="font-chakra font-bold text-xs text-white/40 tracking-widest uppercase">
              Акции и Бонусы
            </span>
          </div>
          
          <h2 className="font-tactic font-black text-4xl sm:text-5xl md:text-7xl uppercase leading-[0.85] text-white italic text-balance">
            ЛУТАЙ <span className="text-transparent" style={{ WebkitTextStroke: '2px #00F0FF' }}>БОНУСЫ</span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {promotions.map((promo, i) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredId(promo.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative bg-[#0a0a0a] shadow-border p-6 flex flex-col skew-x-[-6deg] transition-[box-shadow] duration-150 ease-out hover:shadow-border-hover h-full"
            >
              <div className="skew-x-[6deg] flex flex-col h-full">
                  {/* Color Line Top */}
                  <div className="absolute top-0 left-0 w-full h-1 opacity-50 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: promo.color }} />

                  {/* Icon & Label */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 bg-[#111] border border-white/5 flex items-center justify-center skew-x-[-6deg] group-hover:bg-white/5 transition-colors">
                        <promo.icon size={24} style={{ color: promo.color }} className="skew-x-[6deg] group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="font-chakra text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors">
                      {promo.label}
                    </span>
                  </div>

                  {/* Text */}
                  <h3 className="font-tactic font-black text-2xl text-white uppercase italic leading-none mb-3 text-balance">
                    {promo.title}
                  </h3>
                  <p className="font-chakra text-xs text-white/50 leading-relaxed font-bold uppercase mb-8 flex-grow text-pretty">
                    {promo.desc}
                  </p>

                  {/* Button */}
                  <button
                    onClick={() => handleOpen(promo.action)}
                    className="mt-auto flex items-center justify-between w-full bg-[#111] shadow-border px-4 py-3 group-hover:shadow-border-hover transition-[transform,box-shadow] duration-150 ease-out active:scale-[0.96]"
                  >
                    <span className="font-tactic font-black text-sm uppercase italic text-white/80 group-hover:text-white">
                      {promo.btn}
                    </span>
                    <ChevronRight size={16} style={{ color: promo.color }} className="group-hover:translate-x-1 transition-transform" />
                  </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex justify-end">
          <Link
            href="/promo"
            className="group mr-4 flex items-center gap-3 bg-[#111] shadow-border px-6 py-4 skew-x-[-12deg] hover:shadow-border-hover transition-[transform,box-shadow] duration-150 ease-out active:scale-[0.96]"
          >
            <div className="skew-x-[12deg] flex items-center gap-3">
                <Gift size={20} className="text-[#00F0FF]" />
                <span className="font-tactic font-black text-sm uppercase italic text-white">Все условия</span>
            </div>
          </Link>
          <a
            href="https://redirect.appmetrica.yandex.com/serve/965634439310753772"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-[#111] shadow-border px-6 py-4 skew-x-[-12deg] hover:shadow-border-hover transition-[transform,box-shadow] duration-150 ease-out active:scale-[0.96]"
          >
            <div className="skew-x-[12deg] flex items-center gap-3">
                <Zap size={20} className="text-[#FF2E63] group-hover:animate-pulse" />
                <span className="font-tactic font-black text-sm uppercase italic text-white">Скачать приложение</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
