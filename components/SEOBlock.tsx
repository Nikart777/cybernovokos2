"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Trophy, Shield, Cpu, MapPin } from "lucide-react";

export default function SEOBlock() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative hidden md:block w-full py-16 md:py-24 bg-[#050505] border-t-2 border-white/5 overflow-hidden">
      
      {/* Background Tech Grid */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto max-w-[1000px] px-4 relative z-10">
        
        {/* Header */}
        <div className="mb-10 text-center">
            <h2 className="font-tactic font-black text-2xl md:text-4xl text-white uppercase italic leading-none mb-3">
                CYBER<span className="text-[#FF2E63]">X</span> НОВОКОСИНО
            </h2>
            <p className="font-chakra text-[10px] text-white/40 uppercase tracking-widest font-bold">
                ПРЕМИАЛЬНЫЙ КИБЕРСПОРТИВНЫЙ КЛУБ В ВАО
            </p>
        </div>

        {/* Content Box */}
        <div className="bg-[#0A0A0A] border-2 border-white/10 p-6 md:p-10 skew-x-[-2deg]">
          <div className="skew-x-[2deg]">
            <div className="prose prose-invert max-w-none font-inter text-sm md:text-base text-white/60 leading-relaxed">
                <p className="mb-4">
                <strong>CyberX Новокосино</strong> — это не просто компьютерный клуб, это флагманская киберспортивная арена на востоке Москвы. 
                Мы создали пространство, где топовое железо встречается с максимальным комфортом. Ищете компьютерный клуб рядом с метро Новокосино, Реутов или Ивановское? 
                Наша арена работает 24/7 и предлагает лучшие условия для геймеров любого уровня.
                </p>
                <p className="mb-6">
                В нашем арсенале мощные игровые ПК на базе <strong>RTX 5070</strong> и <strong>RTX 4060</strong>, 
                мониторы с частотой обновления до <strong>400 Гц</strong> от Zowie и премиальная периферия от Logitech, Razer и HyperX. 
                Играйте в CS 2, Dota 2, Valorant или Apex Legends с максимальным FPS и минимальным пингом.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                    <div className="flex items-start gap-3 border border-white/5 p-4 bg-[#111]">
                        <Cpu className="text-[#00F0FF] shrink-0 mt-1" size={20} />
                        <div>
                            <div className="font-tactic text-white text-sm uppercase italic mb-1">МОЩНОЕ ЖЕЛЕЗО</div>
                            <div className="font-inter text-xs text-white/50">RTX 4060 / 5070, Intel Core, 16-32GB RAM</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 border border-white/5 p-4 bg-[#111]">
                        <Shield className="text-[#FF2E63] shrink-0 mt-1" size={20} />
                        <div>
                            <div className="font-tactic text-white text-sm uppercase italic mb-1">ПРИВАТНОСТЬ</div>
                            <div className="font-inter text-xs text-white/50">VIP-комнаты и буткемпы с шумоизоляцией</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 border border-white/5 p-4 bg-[#111]">
                        <Trophy className="text-[#B900FF] shrink-0 mt-1" size={20} />
                        <div>
                            <div className="font-tactic text-white text-sm uppercase italic mb-1">ТУРНИРЫ</div>
                            <div className="font-inter text-xs text-white/50">Регулярные ланы по CS2 и Dota 2 с призами</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 border border-white/5 p-4 bg-[#111]">
                        <MapPin className="text-[#FFD700] shrink-0 mt-1" size={20} />
                        <div>
                            <div className="font-tactic text-white text-sm uppercase italic mb-1">ЛОКАЦИЯ</div>
                            <div className="font-inter text-xs text-white/50">5 мин от м. Новокосино, удобная парковка</div>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <div className="prose prose-invert max-w-none font-inter text-sm md:text-base text-white/60 leading-relaxed pt-4 border-t border-white/10">
                    <h3 className="font-tactic font-black text-white text-xl uppercase italic mt-6 mb-4">
                        Разнообразие игровых зон
                    </h3>
                    <p className="mb-4">
                        Мы предлагаем несколько форматов посадки. <strong>Standard</strong> — отличный выбор для повседневной игры. 
                        <strong>Bootcamp</strong> — изолированные комнаты на 5 человек для тренировок команд. 
                        А для любителей консолей у нас оборудована комфортная лаунж-зона с <strong>PlayStation 5</strong> и огромными 4K телевизорами.
                    </p>
                    <h3 className="font-tactic font-black text-white text-xl uppercase italic mt-6 mb-4">
                        Автосимуляторы в ВАО
                    </h3>
                    <p className="mb-4">
                        Гордость клуба — профессиональные автосимуляторы на базе базы Moza R12. 
                        Прямой привод руля, металлические педали и гоночный кокпит подарят незабываемые эмоции от Assetto Corsa Competizione и F1.
                        Аналогов такого оборудования в киберклубах Новокосино просто нет.
                    </p>
                    <p>
                        Бронируйте время через приложение, копите кэшбэк до 20% и участвуйте в жизни комьюнити. 
                        CyberX Новокосино — твой билет в киберспорт!
                    </p>
                    </div>
                </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-8 flex justify-center">
                <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 font-chakra font-bold text-xs uppercase tracking-widest text-[#FF2E63] hover:text-white transition-colors"
                >
                {isExpanded ? "СВЕРНУТЬ ТЕКСТ" : "ЧИТАТЬ ПОЛНОСТЬЮ"}
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown size={16} />
                </motion.div>
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
