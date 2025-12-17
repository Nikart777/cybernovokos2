"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Smartphone, ChevronRight, Apple } from "lucide-react";

// --- ТИПЫ И ДАННЫЕ ---

type PriceItem = {
  time: string;
  hours: string;
  week: number;
  end: number;
  isNight?: boolean;
};

type SubSection = {
  title: string;
  morning: PriceItem[];
  evening: PriceItem[];
};

type ZoneData = {
  id: string;
  name: string;
  desc: string;
  // Для обычных зон
  morning?: PriceItem[];
  evening?: PriceItem[];
  // Для зон с разделением (как TV)
  subSections?: SubSection[];
};

const pricingData: ZoneData[] = [
  {
    id: "common",
    name: "ОБЩИЙ ЗАЛ",
    desc: "RTX 4060 • 144 Hz • 24.5\"",
    morning: [
      { time: "1 ЧАС", hours: "08:00 - 17:00", week: 150, end: 170 },
      { time: "3 ЧАСА", hours: "08:00 - 16:00", week: 410, end: 470 },
      { time: "5 ЧАСОВ", hours: "08:00 - 14:00", week: 630, end: 730 },
    ],
    evening: [
      { time: "1 ЧАС", hours: "17:00 - 08:00", week: 170, end: 190 },
      { time: "3 ЧАСА", hours: "16:00 - 08:00", week: 470, end: 530 },
      { time: "5 ЧАСОВ", hours: "14:00 - 08:00", week: 730, end: 830 },
      { time: "НОЧЬ", hours: "22:00 - 08:00", week: 700, end: 750, isNight: true },
    ]
  },
  {
    id: "bootcamp",
    name: "BOOTCAMP",
    desc: "5 МЕСТ • RTX 4060 • 144 Hz",
    morning: [
      { time: "1 ЧАС", hours: "08:00 - 17:00", week: 170, end: 190 },
      { time: "3 ЧАСА", hours: "08:00 - 16:00", week: 460, end: 520 },
      { time: "5 ЧАСОВ", hours: "08:00 - 14:00", week: 700, end: 800 },
    ],
    evening: [
      { time: "1 ЧАС", hours: "17:00 - 08:00", week: 190, end: 210 },
      { time: "3 ЧАСА", hours: "16:00 - 08:00", week: 520, end: 580 },
      { time: "5 ЧАСОВ", hours: "14:00 - 08:00", week: 790, end: 900 },
      { time: "НОЧЬ", hours: "22:00 - 08:00", week: 850, end: 950, isNight: true },
    ]
  },
  {
    id: "vip_duo",
    name: "VIP & DUO",
    desc: "RTX 4070 • 240 Hz",
    morning: [
      { time: "1 ЧАС", hours: "08:00 - 17:00", week: 190, end: 210 },
      { time: "3 ЧАСА", hours: "08:00 - 16:00", week: 520, end: 580 },
      { time: "5 ЧАСОВ", hours: "08:00 - 14:00", week: 780, end: 890 },
    ],
    evening: [
      { time: "1 ЧАС", hours: "17:00 - 08:00", week: 210, end: 230 },
      { time: "3 ЧАСА", hours: "16:00 - 08:00", week: 580, end: 640 },
      { time: "5 ЧАСОВ", hours: "14:00 - 08:00", week: 880, end: 980 },
      { time: "НОЧЬ", hours: "22:00 - 08:00", week: 950, end: 1050, isNight: true },
    ]
  },
  {
    id: "solo",
    name: "SOLO ROOMS",
    desc: "PREMIUM: RTX 5070 2K • PRO: RTX 5070 400Hz",
    morning: [
      { time: "1 ЧАС", hours: "08:00 - 17:00", week: 230, end: 250 },
      { time: "3 ЧАСА", hours: "08:00 - 16:00", week: 630, end: 690 },
      { time: "5 ЧАСОВ", hours: "08:00 - 14:00", week: 950, end: 1050 },
    ],
    evening: [
      { time: "1 ЧАС", hours: "17:00 - 08:00", week: 250, end: 270 },
      { time: "3 ЧАСА", hours: "16:00 - 08:00", week: 690, end: 750 },
      { time: "5 ЧАСОВ", hours: "14:00 - 08:00", week: 1050, end: 1150 },
      { time: "НОЧЬ", hours: "22:00 - 08:00", week: 1150, end: 1250, isNight: true },
    ]
  },
  {
    id: "tv",
    name: "TV & PS5",
    desc: "FIFA 26 • UFC 5 • 4K TV",
    subSections: [
      {
        title: "TV STANDARD",
        morning: [
          { time: "1 ЧАС", hours: "08:00 - 17:00", week: 340, end: 400 },
          { time: "3 ЧАСА", hours: "08:00 - 16:00", week: 780, end: 960 },
          { time: "5 ЧАСОВ", hours: "08:00 - 14:00", week: 1180, end: 1420 },
        ],
        evening: [
          { time: "1 ЧАС", hours: "17:00 - 08:00", week: 380, end: 450 },
          { time: "3 ЧАСА", hours: "16:00 - 08:00", week: 890, end: 1060 },
          { time: "5 ЧАСОВ", hours: "14:00 - 08:00", week: 1330, end: 1620 },
          { time: "НОЧЬ", hours: "22:00 - 08:00", week: 1800, end: 2125, isNight: true },
        ]
      },
      {
        title: "TV VIP (комната)",
        morning: [
          { time: "1 ЧАС", hours: "08:00 - 17:00", week: 390, end: 460 },
          { time: "3 ЧАСА", hours: "08:00 - 16:00", week: 910, end: 1100 },
          { time: "5 ЧАСОВ", hours: "08:00 - 14:00", week: 1350, end: 1640 },
        ],
        evening: [
          { time: "1 ЧАС", hours: "17:00 - 08:00", week: 440, end: 520 },
          { time: "3 ЧАСА", hours: "16:00 - 08:00", week: 1060, end: 1300 },
          { time: "5 ЧАСОВ", hours: "14:00 - 08:00", week: 1540, end: 1880 },
          { time: "НОЧЬ", hours: "22:00 - 08:00", week: 2075, end: 2450, isNight: true },
        ]
      }
    ]
  }
];

// --- ХЕЛПЕРЫ ---

// Функция округления: >6 -> вверх до 10, иначе вниз до 10
function calculateAppPrice(basePrice: number): number {
  const discountPrice = basePrice * 0.95; // Скидка 5%
  const rounded = Math.round(discountPrice); // Округляем до целого
  const lastDigit = rounded % 10;

  if (lastDigit > 6) {
    return rounded + (10 - lastDigit); // Округляем вверх до 10
  } else {
    return rounded - lastDigit; // Округляем вниз до 10
  }
}

export default function Prices() {
  const [activeZoneId, setActiveZoneId] = useState("common");
  const [isWeekend, setIsWeekend] = useState(false);

  const activeZone = pricingData.find(z => z.id === activeZoneId) || pricingData[0];

  return (
    <section className="relative w-full bg-[#050505] pb-20 px-4 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        
        {/* --- TABS (NAVIGATION) --- */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {pricingData.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setActiveZoneId(zone.id)}
              className={`
                relative px-5 py-3 rounded-xl font-chakra font-bold text-sm uppercase tracking-wider transition-all duration-300
                ${activeZoneId === zone.id 
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                  : "bg-[#111] text-gray-500 hover:text-white border border-white/10 hover:border-white/30"}
              `}
            >
              {zone.name}
            </button>
          ))}
        </div>

        {/* --- SWITCHER (WEEKDAY / WEEKEND) --- */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#111] p-1 rounded-full border border-white/10 flex relative w-[240px]">
            {/* Active Indicator */}
            <motion.div 
              className="absolute top-1 bottom-1 w-[116px] bg-[#FF2E63] rounded-full z-0 shadow-[0_0_15px_#FF2E63]"
              initial={false}
              animate={{ x: isWeekend ? 116 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            
            <button
              onClick={() => setIsWeekend(false)}
              className={`relative z-10 w-1/2 py-3 text-center font-chakra font-black text-sm uppercase tracking-wider transition-colors duration-300 ${!isWeekend ? 'text-white' : 'text-gray-500 hover:text-white'}`}
            >
              БУДНИ
            </button>
            <button
              onClick={() => setIsWeekend(true)}
              className={`relative z-10 w-1/2 py-3 text-center font-chakra font-black text-sm uppercase tracking-wider transition-colors duration-300 ${isWeekend ? 'text-white' : 'text-gray-500 hover:text-white'}`}
            >
              ВЫХОДНЫЕ
            </button>
          </div>
        </div>

        {/* --- ACTIVE ZONE INFO --- */}
        <div className="text-center mb-12">
          <h3 className="font-tactic font-black text-3xl md:text-5xl text-white uppercase mb-2 drop-shadow-lg">
            {activeZone.name}
          </h3>
          <p className="font-mono text-xs md:text-sm text-[#FF2E63] tracking-[0.2em] uppercase opacity-90">
            {activeZone.desc}
          </p>
        </div>

        {/* --- PRICE GRID --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeZoneId + (isWeekend ? '-end' : '-week')}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {activeZone.subSections ? (
              // Рендерим подразделы (для TV)
              <div className="space-y-16">
                {activeZone.subSections.map((section, idx) => (
                  <div key={idx} className="border border-white/5 rounded-3xl p-6 md:p-8 bg-[#0e0e0e]">
                    <h4 className="font-tactic font-bold text-2xl text-white uppercase tracking-wide mb-8 text-center border-b border-white/10 pb-4">
                      {section.title}
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                      <PriceColumn title="Утро и День" items={section.morning} isWeekend={isWeekend} color="#FF2E63" />
                      <PriceColumn title="Вечер и Ночь" items={section.evening} isWeekend={isWeekend} color="#B900FF" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Стандартный рендер
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                <PriceColumn title="Утро и День" items={activeZone.morning!} isWeekend={isWeekend} color="#FF2E63" />
                <PriceColumn title="Вечер и Ночь" items={activeZone.evening!} isWeekend={isWeekend} color="#B900FF" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* --- APP BANNER --- */}
        <div className="mt-20 relative overflow-hidden rounded-2xl border border-[#FF2E63]/30 bg-[#111]">
           <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-[#FF2E63]/10 to-transparent" />
           
           <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-10 gap-8 relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                 <div className="bg-[#FF2E63] p-4 rounded-2xl text-white shadow-[0_0_30px_#FF2E63]">
                    <Smartphone size={36} />
                 </div>
                 <div className="text-center md:text-left">
                    <h4 className="font-tactic font-black text-2xl md:text-3xl text-white uppercase mb-2">
                      Скидка 5% в приложении
                    </h4>
                    <p className="font-inter text-sm text-gray-400 max-w-md mb-4 md:mb-0">
                      Цены в прайсе указаны без учета скидки. В приложении дешевле + копятся бонусы.
                    </p>
                    
                    {/* iOS / Android Icons */}
                    <div className="flex items-center justify-center md:justify-start gap-4 text-white/50 text-[10px] font-bold uppercase tracking-wider mt-2">
                       <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                         <svg viewBox="0 0 384 512" fill="currentColor" className="w-3 h-3"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/></svg>
                         iOS
                       </div>
                       <div className="w-[1px] h-3 bg-white/20"></div>
                       <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                         <svg viewBox="0 0 576 512" fill="currentColor" className="w-3 h-3"><path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10l-48.54,84.07a301.25,301.25,0,0,0-246.56,0l-48.54-84.07a10,10,0,1,0-17.27,10l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"/></svg>
                         Android
                       </div>
                    </div>
                 </div>
              </div>
              
              <a 
                href="https://redirect.appmetrica.yandex.com/serve/965634439310753772"
                target="_blank"
                className="flex items-center gap-3 px-8 py-4 bg-white text-black font-chakra font-black text-lg uppercase tracking-wider rounded-xl hover:bg-[#FF2E63] hover:text-white hover:shadow-[0_0_30px_#FF2E63] transition-all duration-300 w-full md:w-auto justify-center"
              >
                Скачать
                <ChevronRight size={20} />
              </a>
           </div>
        </div>

      </div>
    </section>
  );
}

// --- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ---

function PriceColumn({ title, items, isWeekend, color }: { title: string, items: PriceItem[], isWeekend: boolean, color: string }) {
  return (
    <div className={`bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 md:p-8 ${!items ? 'hidden' : ''}`}>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-opacity-10" style={{ backgroundColor: `${color}20`, color: color }}>
          <Clock size={20} />
        </div>
        <h4 className="font-tactic font-bold text-xl text-white uppercase tracking-wide">{title}</h4>
      </div>
      
      <div className="space-y-4">
        {items?.map((item, idx) => (
          <PriceRow key={idx} item={item} isWeekend={isWeekend} />
        ))}
      </div>
    </div>
  )
}

function PriceRow({ item, isWeekend }: { item: PriceItem, isWeekend: boolean }) {
  const basePrice = isWeekend ? item.end : item.week;
  const appPrice = calculateAppPrice(basePrice);

  return (
    <div className={`
      relative group flex items-center justify-between p-4 rounded-xl border transition-all duration-300
      ${item.isNight 
        ? "bg-gradient-to-r from-[#1a0510] to-transparent border-[#FF2E63]/30 hover:border-[#FF2E63]" 
        : "bg-[#111] border-white/5 hover:border-white/20"}
    `}>
      {/* Time Info */}
      <div className="flex flex-col">
        <span className={`font-tactic font-black text-xl uppercase ${item.isNight ? 'text-[#FF2E63]' : 'text-white'}`}>
          {item.time}
        </span>
        <span className="font-chakra font-bold text-xs text-gray-500 mt-1 flex items-center gap-2">
          {item.hours}
          {item.isNight && <span className="bg-[#FF2E63] text-white text-[9px] px-1.5 rounded font-bold">HIT</span>}
        </span>
      </div>

      {/* Price Info */}
      <div className="flex items-center gap-6">
        
        {/* Старая цена */}
        <div className="flex flex-col items-end opacity-50">
          <span className="font-inter text-[10px] font-bold text-gray-400 uppercase tracking-wider">В клубе</span>
          <span className="font-chakra font-bold text-lg text-gray-300 decoration-red-500/50 line-through decoration-2">
            {basePrice}₽
          </span>
        </div>

        {/* Разделитель */}
        <div className="w-[1px] h-8 bg-white/10" />

        {/* Новая цена */}
        <div className="flex flex-col items-end relative">
          {/* Badge -5% */}
          <div className="absolute -top-3 -right-2 bg-[#FF2E63] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(255,46,99,0.3)] transform rotate-3">
            -5%
          </div>
          
          {/* Убрали слово "App", оставили только цифры */}
          <span className="font-tactic font-black text-2xl text-white">
            {appPrice}₽
          </span>
        </div>

      </div>
    </div>
  )
}