"use client";

import { motion } from "framer-motion";
import { Moon, Trophy, Users, ChevronRight, Star, Gift, Zap, Sparkles } from "lucide-react";
import { useState } from "react";

const promotions = [
  {
    id: "newbie",
    label: "CYBERX ПРОМОКОД",
    title: "400₽ НА СТАРТ",
    desc: "Ищешь промокод на первое посещение? Всё проще: дарим 400 бонусов за регистрацию автоматически.",
    icon: Gift,
    color: "#FF2E63",
    gradient: "from-[#FF2E63] to-[#FF0055]",
    btn: "Условия",
    action: "open-promo-newbie"
  },
  {
    id: "friend",
    label: "РЕФЕРАЛКА",
    title: "ПРИВЕДИ ДРУГА",
    desc: "Твой друг получит 800 бонусов на старт, а ты — 5% с его пополнений вечно. Пассивный доход в бонусах.",
    icon: Users,
    color: "#FF7A00",
    gradient: "from-[#FF7A00] to-[#FF8C00]",
    btn: "Механика",
    action: "open-promo-friend"
  },
  {
    id: "night",
    label: "ВЫГОДА",
    title: "НОЧНЫЕ ПАКЕТЫ",
    desc: "Отдаем ночные часы по себестоимости. Играй до рассвета с максимальной выгодой.",
    icon: Moon,
    color: "#B900FF",
    gradient: "from-[#B900FF] to-[#7F00FF]",
    btn: "Цены",
    action: "open-promo-night"
  },
  {
    id: "cashback",
    label: "ЛОЯЛЬНОСТЬ",
    title: "КЭШБЭК ДО 20%",
    desc: "Копи баллы за каждую игру и оплачивай ими до 100% времени. Больше играешь — круче статус.",
    icon: Trophy,
    color: "#00F0FF",
    gradient: "from-[#00F0FF] to-[#0088FF]",
    btn: "Ранги",
    action: "open-promo-cashback"
  }
];

export default function PromotionsNew() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleOpen = (action: string) => {
    window.dispatchEvent(new CustomEvent(action));
  };

  return (
    <section id="promotions" className="relative w-full py-24 md:py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-[#0a0a0a]" />
      
      {/* Animated Grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Gradient Orbs */}
      <motion.div 
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FF2E63]/10 blur-[150px] rounded-full"
      />
      <motion.div 
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#B900FF]/10 blur-[150px] rounded-full"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
            <Sparkles size={16} className="text-[#FF2E63]" />
            <span className="font-chakra font-bold text-xs text-white/60 tracking-wide uppercase">
              Акции и Бонусы
            </span>
            <Sparkles size={16} className="text-[#00F0FF]" />
          </div>
          
          <h2 className="font-tactic font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.85] text-white mb-4 italic">
            Лутай <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] via-[#B900FF] to-[#00F0FF]">Бонусы</span>
          </h2>
          
          <p className="font-inter text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Максимальная выгода для твоих игр. Промокоды, кэшбэк, рефералка и ночные пакеты.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
          {promotions.map((promo, i) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredId(promo.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative bg-[#0f0f0f] border border-white/[0.08] rounded-3xl p-6 flex flex-col items-center text-center overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl h-full"
              style={{
                boxShadow: hoveredId === promo.id 
                  ? `0 20px 60px -15px ${promo.color}40` 
                  : '0 10px 40px -15px rgba(0,0,0,0.5)'
              }}
            >
              {/* Hover Glow Background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ 
                  background: `radial-gradient(circle at center, ${promo.color}20, transparent 70%)` 
                }}
              />

              {/* Animated Border Gradient */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className={`absolute inset-[1px] rounded-3xl bg-gradient-to-b ${promo.gradient} opacity-20`} />
              </div>

              {/* Top Glow Spot */}
              <div
                className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[150px] h-[150px] blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                style={{ backgroundColor: promo.color }}
              />

              {/* Icon Box */}
              <motion.div
                className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  backgroundColor: `${promo.color}15`,
                  borderColor: `${promo.color}30`,
                  color: promo.color
                }}
              >
                <promo.icon size={28} />
                <div className="absolute inset-0 blur-xl opacity-20" style={{ backgroundColor: promo.color }} />
                
                {/* Sparkle effect on hover */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={hoveredId === promo.id ? { scale: 1, opacity: 1 } : {}}
                  className="absolute -top-1 -right-1"
                >
                  <Star size={12} className="text-[#FFD700] fill-[#FFD700]" />
                </motion.div>
              </motion.div>

              {/* Label */}
              <span
                className="font-mono text-[9px] font-bold uppercase tracking-widest mb-3 opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ color: promo.color }}
              >
                {promo.label}
              </span>

              {/* Title */}
              <h3 className="font-tactic font-bold text-xl md:text-2xl text-white uppercase mb-3 leading-none break-words w-full">
                {promo.title}
              </h3>

              {/* Desc */}
              <p className="font-inter text-xs text-gray-400 leading-relaxed mb-6 line-clamp-4 flex-grow">
                {promo.desc}
              </p>

              {/* Button */}
              <button
                onClick={() => handleOpen(promo.action)}
                className="mt-auto relative px-6 py-3 rounded-xl border border-white/20 font-chakra font-bold text-xs uppercase tracking-wider text-white overflow-hidden transition-all duration-300 hover:border-transparent group/btn w-full"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${promo.color}, ${promo.color}dd)` }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-black transition-colors">
                  {promo.btn}
                  <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </button>

              {/* Floating particles on hover */}
              {hoveredId === promo.id && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        opacity: 0, 
                        y: '100%', 
                        x: Math.random() * 100 - 50 
                      }}
                      animate={{ 
                        opacity: [0, 1, 0], 
                        y: '-100%',
                      }}
                      transition={{ 
                        duration: 1 + Math.random(), 
                        delay: i * 0.1,
                        repeat: Infinity 
                      }}
                      className="absolute w-1 h-1 rounded-full"
                      style={{ 
                        left: `${30 + i * 10}%`, 
                        bottom: '10%',
                        backgroundColor: promo.color 
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="font-inter text-sm text-white/40 mb-4">
            Все акции доступны в мобильном приложении
          </p>
          <a
            href="https://redirect.appmetrica.yandex.com/serve/965634439310753772"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 font-chakra font-bold text-xs uppercase tracking-wider text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <Zap size={16} className="text-[#FF2E63]" />
            Скачать приложение
          </a>
        </motion.div>
      </div>
    </section>
  );
}
