"use client";

import { motion } from "framer-motion";
import { Moon, Trophy, Users, ChevronRight, Star, Gift, Zap } from "lucide-react";

const promotions = [
  {
    id: "newbie",
    label: "CYBERX ПРОМОКОД", // Ключевик здесь для акцента
    title: "400₽ НА СТАРТ",
    desc: "Ищешь промокод на первое посещение? Всё проще: дарим 400 бонусов за регистрацию автоматически.",
    icon: Gift,
    color: "#FF0055", // Яркий красный
    btn: "Условия",
    action: "open-promo-newbie"
  },
  {
    id: "friend",
    label: "Рефералка",
    title: "ПРИВЕДИ ДРУГА",
    desc: "Твой друг получит 800 бонусов на старт, а ты — 5% с его пополнений вечно. Пассивный доход в бонусах.",
    icon: Users,
    color: "#FF8C00", // Оранжевый
    btn: "Механика",
    action: "open-promo-friend"
  },
  {
    id: "night",
    label: "Выгода",
    title: "НОЧНЫЕ ПАКЕТЫ",
    desc: "Отдаем ночные часы по себестоимости. Играй до рассвета с максимальной выгодой.",
    icon: Moon,
    color: "#7F00FF", // Фиолетовый
    btn: "Цены",
    action: "open-promo-night"
  },
  {
    id: "cashback",
    label: "Лояльность",
    title: "КЭШБЭК ДО 20%",
    desc: "Копи баллы за каждую игру и оплачивай ими до 100% времени. Больше играешь — круче статус.",
    icon: Trophy,
    color: "#00F0FF", // Циан
    btn: "Ранги",
    action: "open-promo-cashback"
  }
];

export default function Promotions() {
  const handleOpen = (action: string) => {
    window.dispatchEvent(new CustomEvent(action));
  };

  return (
    <section id="promotions" className="relative w-full bg-[#050505] pb-32 px-4 md:px-10">
      {/* Изменили сетку: 1 колонка моб, 2 планшет, 4 десктоп */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {promotions.map((promo, i) => (
          <motion.div
            key={promo.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative bg-[#111] border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl h-full"
          >
            {/* Hover Glow Background */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(circle at center, ${promo.color}, transparent 70%)` }}
            />

            {/* Top Glow Spot */}
            <div
              className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[150px] h-[150px] blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              style={{ backgroundColor: promo.color }}
            />

            {/* Icon Box */}
            <div
              className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-300 group-hover:scale-110"
              style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.1)',
                color: promo.color
              }}
            >
              <promo.icon size={28} />
              <div className="absolute inset-0 blur-xl opacity-20" style={{ backgroundColor: promo.color }} />
            </div>

            {/* Label */}
            <span
              className="font-mono text-[9px] font-bold uppercase tracking-widest mb-3 opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ color: promo.color }}
            >
              {promo.label}
            </span>

            {/* Title */}
            <h3 className="font-tactic font-bold text-2xl text-white uppercase mb-3 leading-none break-words w-full">
              {promo.title}
            </h3>

            {/* Desc */}
            <p className="font-inter text-xs text-gray-400 leading-relaxed mb-6 line-clamp-4">
              {promo.desc}
            </p>

            {/* Button */}
            <button
              onClick={() => handleOpen(promo.action)}
              className="mt-auto relative px-6 py-3 rounded-xl border border-white/20 font-chakra font-bold text-xs uppercase tracking-wider text-white overflow-hidden transition-all duration-300 hover:border-transparent group/btn w-full"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: promo.color }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-black transition-colors">
                {promo.btn}
                <ChevronRight size={14} />
              </span>
            </button>

          </motion.div>
        ))}

      </div>
    </section>
  );
}