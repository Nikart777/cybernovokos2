"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Smartphone, ChevronRight } from "lucide-react";
import { PricingData, PriceItem } from "@/app/lib/types";
import Image from "next/image";

const zonePhotos: Record<string, string[]> = {
  common: ["/zones/common-1.webp", "/zones/common-2.webp", "/zones/common-3.webp"],
  bootcamp: ["/zones/bootcamp-std-1.webp", "/zones/bootcamp-std-2.webp", "/zones/bootcamp-1.webp"],
  vip_duo: ["/zones/bootcamp-1.webp", "/zones/duo-1.webp", "/zones/duo-2.webp"],
  solo: ["/zones/solo-premium-1.webp", "/zones/solo-pro-1.webp", "/zones/solo-premium-2.webp"],
  tv: ["/zones/ps5-3.webp", "/zones/ps5-1.webp", "/zones/ps5-4.webp"],
  simracing: ["/zones/sim-1.webp", "/zones/sim-2.webp", "/zones/sim-3.webp"],
};

// --- ХЕЛПЕРЫ ---
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

export default function Prices({ data }: { data: PricingData }) {
  const [activeZoneId, setActiveZoneId] = useState(data.zones[0]?.id || "common");
  const [isWeekend, setIsWeekend] = useState(false);
  const [showAbonnements, setShowAbonnements] = useState(false);

  const activeZone = data.zones.find(z => z.id === activeZoneId) || data.zones[0];

  return (
    <section className="relative w-full bg-[#050505] pb-16 md:pb-20">
      <div className="max-w-[1200px] mx-auto">

        {/* --- TABS (NAVIGATION) --- */}
        <div className="-mx-4 px-4 md:mx-0 md:px-0 flex md:flex-wrap md:justify-center gap-2 mb-6 md:mb-8 overflow-x-auto md:overflow-visible pb-2 scrollbar-hide snap-x">
          {data.zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => {
                setActiveZoneId(zone.id);
                setShowAbonnements(false);
              }}
              className={`
                relative shrink-0 snap-start px-4 md:px-5 py-3 rounded-xl font-chakra font-bold text-xs md:text-sm uppercase tracking-wider transition-all duration-300
                ${activeZoneId === zone.id && !showAbonnements
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  : "bg-[#111] text-gray-500 hover:text-white border border-white/10 hover:border-white/30"}
              `}
            >
              {zone.name}
            </button>
          ))}
          {data.abonnements && data.abonnements.length > 0 && (
            <button
              onClick={() => setShowAbonnements(true)}
              className={`
                relative shrink-0 snap-start px-4 md:px-5 py-3 rounded-xl font-chakra font-bold text-xs md:text-sm uppercase tracking-wider transition-all duration-300
                ${showAbonnements
                  ? "bg-[#FF2E63] text-white shadow-[0_0_20px_rgba(255,46,99,0.3)]"
                  : "bg-[#111] text-[#FF2E63] hover:text-white border border-[#FF2E63]/20 hover:border-[#FF2E63]/40"}
              `}
            >
              АБОНЕМЕНТЫ
            </button>
          )}
        </div>

        {!showAbonnements ? (
          <>
            {/* --- SWITCHER (WEEKDAY / WEEKEND) --- */}
            <div className="flex justify-center mb-8 md:mb-12">
              <div className="bg-[#111] p-1 rounded-full border border-white/10 flex relative w-[240px] max-w-full">
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
            <div className="text-center mb-6 md:mb-8">
              <h2 className="sr-only">Цены на услуги компьютерного клуба в Новокосино</h2>
              <h3 className="font-tactic font-black text-2xl sm:text-3xl md:text-5xl text-white uppercase mb-2 drop-shadow-lg leading-none">
                {activeZone.name}
              </h3>
              <p className="font-mono text-[10px] sm:text-xs md:text-sm text-[#FF2E63] tracking-[0.12em] md:tracking-[0.2em] uppercase opacity-90 leading-relaxed">
                {activeZone.desc}
              </p>
            </div>

            <ZoneGallery zoneId={activeZone.id} zoneName={activeZone.name} />

            {/* --- PRICE GRID --- */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeZoneId + (isWeekend ? '-end' : '-week')}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {activeZone.subZones ? (
                  <div className="space-y-8 md:space-y-16">
                    {activeZone.subZones.map((section, idx) => (
                      <div key={idx} className="border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-8 bg-[#0e0e0e]">
                        <h4 className="font-tactic font-bold text-xl md:text-2xl text-white uppercase tracking-wide mb-5 md:mb-8 text-center border-b border-white/10 pb-4">
                          {section.name}
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-16">
                          {section.categories.map((cat, cIdx) => (
                            <PriceColumn key={cIdx} title={cat.title} items={cat.items} isWeekend={isWeekend} color={cat.color} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-16">
                    {activeZone.categories?.map((cat, idx) => (
                      <PriceColumn key={idx} title={cat.title} items={cat.items} isWeekend={isWeekend} color={cat.color} />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          /* --- ABONNEMENTS GRID --- */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          >
            {data.abonnements.map((abon, idx) => (
              <div key={idx} className="bg-[#0A0A0A] border border-[#FF2E63]/30 rounded-2xl md:rounded-3xl p-5 md:p-8 flex flex-col items-center text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF2E63]/5 blur-3xl group-hover:bg-[#FF2E63]/10 transition-colors" />
                <span className="font-mono text-[10px] text-[#FF2E63] uppercase tracking-[0.3em] mb-4">Abonnement</span>
                <h4 className="font-tactic font-black text-3xl text-white mb-2">{abon.name}</h4>

                <div className="w-full space-y-4 my-6 py-4 border-y border-white/5">
                  {abon.prices.map((p, pIdx) => (
                    <div key={pIdx} className="flex justify-between items-center group/price">
                      <span className="font-chakra font-bold text-[10px] uppercase text-gray-500 group-hover/price:text-white transition-colors">
                        {p.zone}
                      </span>
                      <span className="font-tactic font-black text-2xl text-white">
                        {p.value}₽
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1 text-gray-500 font-chakra font-bold text-xs uppercase tracking-widest mb-8">
                  <span>Срок действия: {abon.validity}</span>
                </div>
                <div className="w-full py-4 bg-white/5 border border-white/10 rounded-xl font-chakra font-bold text-[10px] uppercase tracking-[0.2em] text-gray-500">
                  Доступно только в клубе
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* --- APP BANNER --- */}
        <div className="mt-12 md:mt-20 relative overflow-hidden rounded-2xl border border-[#FF2E63]/30 bg-[#111]">
          <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-[#FF2E63]/10 to-transparent" />

          <div className="flex flex-col md:flex-row items-center justify-between p-5 sm:p-8 md:p-10 gap-6 md:gap-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6">
              <div className="bg-[#FF2E63] p-4 rounded-2xl text-white shadow-[0_0_30px_#FF2E63]">
                <Smartphone size={36} />
              </div>
              <div className="text-center md:text-left">
                <h4 className="font-tactic font-black text-xl sm:text-2xl md:text-3xl text-white uppercase mb-2 leading-tight">
                  Скидка 5% в приложении
                </h4>
                <p className="font-inter text-sm text-gray-400 max-w-md mb-4 md:mb-0">
                  Цены в прайсе указаны без учета скидки. В приложении дешевле + копятся бонусы.
                </p>

                <div className="flex items-center justify-center md:justify-start gap-4 text-white/50 text-[10px] font-bold uppercase tracking-wider mt-2">
                  <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <svg viewBox="0 0 384 512" fill="currentColor" className="w-3 h-3"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" /></svg>
                    iOS
                  </div>
                  <div className="w-[1px] h-3 bg-white/20"></div>
                  <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <svg viewBox="0 0 576 512" fill="currentColor" className="w-3 h-3"><path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10l-48.54,84.07a301.25,301.25,0,0,0-246.56,0l-48.54-84.07a10,10,0,1,0-17.27,10l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55" /></svg>
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

function ZoneGallery({ zoneId, zoneName }: { zoneId: string; zoneName: string }) {
  const photos = zonePhotos[zoneId] || zonePhotos.common;

  return (
    <motion.div
      key={zoneId}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-2 md:grid-cols-3 grid-rows-[190px_110px] md:grid-rows-1 gap-2 md:gap-3 mb-8 md:mb-12"
    >
      {photos.map((photo, index) => (
        <div
          key={photo}
          className={`relative overflow-hidden border border-white/10 bg-[#111] ${
            index === 0
              ? "col-span-2 md:col-span-1 row-span-1 md:h-[230px] rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
              : `h-[110px] md:h-[230px] ${index === 2 ? "rounded-br-2xl md:rounded-r-2xl" : "rounded-bl-2xl md:rounded-none"}`
          }`}
        >
          <Image
            src={photo}
            alt={`${zoneName} — фото игровой зоны ${index + 1}`}
            fill
            sizes={index === 0 ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 50vw, 33vw"}
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          <span className="absolute bottom-2 left-3 font-chakra font-black text-[9px] text-white/70 uppercase tracking-[0.18em]">
            0{index + 1}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

function PriceColumn({ title, items, isWeekend, color }: { title: string, items: PriceItem[], isWeekend: boolean, color: string }) {
  return (
    <div className={`bg-[#0A0A0A] border border-white/5 rounded-2xl p-4 sm:p-5 md:p-8 ${!items ? 'hidden' : ''}`}>
      <div className="flex items-center gap-3 mb-5 md:mb-8">
        <div className="p-2 rounded-lg bg-opacity-10" style={{ backgroundColor: `${color}20`, color: color }}>
          <Clock size={20} />
        </div>
        <h4 className="font-tactic font-bold text-lg md:text-xl text-white uppercase tracking-wide leading-tight">{title}</h4>
      </div>

      <div className="space-y-3 md:space-y-4">
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
      relative group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3 sm:p-4 rounded-xl border transition-all duration-300
      ${item.isNight
        ? "bg-gradient-to-r from-[#1a0510] to-transparent border-[#FF2E63]/30 hover:border-[#FF2E63]"
        : "bg-[#111] border-white/5 hover:border-white/20"}
    `}>
      {/* Time Info */}
      <div className="flex flex-col">
        <span className={`font-tactic font-black text-base sm:text-xl uppercase leading-none ${item.isNight ? 'text-[#FF2E63]' : 'text-white'}`}>
          {item.time}
        </span>
        <span className="font-chakra font-bold text-[10px] sm:text-xs text-gray-500 mt-1.5 flex items-center gap-2 whitespace-nowrap">
          {item.hours}
          {item.isNight && <span className="bg-[#FF2E63] text-white text-[9px] px-1.5 rounded font-bold">HIT</span>}
        </span>
      </div>

      {/* Price Info */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">

        {/* Старая цена */}
        <div className="flex flex-col items-end opacity-50">
          <span className="font-inter text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">В клубе</span>
          <span className="font-chakra font-bold text-sm sm:text-lg text-gray-300 decoration-red-500/50 line-through decoration-2">
            {basePrice}₽
          </span>
        </div>

        {/* Разделитель */}
        <div className="w-[1px] h-8 bg-white/10 shrink-0" />

        {/* Новая цена */}
        <div className="flex flex-col items-end relative">
          {/* Badge -5% */}
          <div className="absolute -top-3 -right-2 bg-[#FF2E63] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(255,46,99,0.3)] transform rotate-3">
            -5%
          </div>

          {/* Убрали слово "App", оставили только цифры */}
          <span className="font-tactic font-black text-xl sm:text-2xl text-white whitespace-nowrap">
            {appPrice}₽
          </span>
        </div>

      </div>
    </div>
  )
}
