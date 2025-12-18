"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Monitor, RefreshCw, Zap, AlertCircle, CheckCircle, Gamepad2, Disc, Info, Smartphone } from "lucide-react";
import { getClubStatus, ClubZone } from "@/app/lib/langame";

export default function ClubMap() {
  const [zones, setZones] = useState<ClubZone[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    const data = await getClubStatus();
    if (data) {
      setZones(data);
      setLastUpdate(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // Автообновление отключено по запросу
  }, []);

  const totalFree = zones?.reduce((acc, z) => acc + z.free_pc_count, 0) || 0;
  const totalPc = zones?.reduce((acc, z) => acc + z.pc_count, 0) || 0;

  return (
    // ДОБАВИЛ ID="MAP" ДЛЯ НАВИГАЦИИ
    <section id="map" className="relative w-full py-20 bg-[#050505] border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
           <div className="text-center md:text-left">
             <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30">
                <span className="relative flex h-2 w-2">
                  <span className={`absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75 ${loading ? 'animate-ping' : ''}`}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
                </span>
                <span className="font-mono text-[10px] text-[#00F0FF] uppercase tracking-widest">
                  Live Status • {lastUpdate}
                </span>
             </div>
             <h2 className="font-tactic font-black text-4xl md:text-5xl text-white uppercase tracking-wide">
               МОНИТОРИНГ <span className="text-[#00F0FF]">МЕСТ</span>
             </h2>
           </div>

           <div className="flex items-center gap-6 bg-[#111] border border-white/10 px-6 py-4 rounded-2xl">
              <div className="text-right">
                 <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Всего Свободно</div>
                 <div className="font-tactic font-bold text-3xl text-white leading-none">
                   <span className="text-[#00F0FF]">{totalFree}</span> / {totalPc}
                 </div>
              </div>
              <button 
                onClick={fetchData} 
                disabled={loading}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors disabled:opacity-50 group"
                title="Обновить данные"
              >
                <RefreshCw size={20} className={`group-hover:text-[#00F0FF] transition-colors ${loading ? "animate-spin text-[#00F0FF]" : ""}`} />
              </button>
           </div>
        </div>

        {/* ZONES GRID */}
        {loading && !zones ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
             {[1,2,3,4,5,6].map(i => (
               <div key={i} className="h-32 bg-[#111] rounded-2xl animate-pulse border border-white/5" />
             ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {zones?.map((zone, idx) => {
              const loadPercent = Math.round(((zone.pc_count - zone.free_pc_count) / zone.pc_count) * 100);
              const isFull = zone.free_pc_count === 0;
              
              let isLow = false;
              
              if (zone.pc_count >= 10) {
                 if (!isFull && zone.free_pc_count < 7) {
                    isLow = true;
                 }
              } 
              else if (zone.pc_count > 2) {
                 if (!isFull && zone.free_pc_count <= 2) {
                    isLow = true;
                 }
              }
              else if (zone.pc_count === 2 && zone.title.toLowerCase().includes("duo")) {
                  if (!isFull && zone.free_pc_count === 1) {
                      isLow = true;
                  }
              }
              
              let statusColor = "text-green-500";
              let statusBg = "bg-green-500/10";
              let statusText = "Свободно";
              let borderColor = "border-white/10 hover:border-green-500/30";
              let progressColor = "bg-green-500";
              let Icon = CheckCircle;

              if (zone.title.toLowerCase().includes("ps")) Icon = Gamepad2;
              else if (zone.title.toLowerCase().includes("sim")) Icon = Disc;
              else Icon = Monitor;
              
              if (isFull) {
                statusColor = "text-red-500";
                statusBg = "bg-red-500/10";
                statusText = "Заполнен";
                borderColor = "border-red-900/30 bg-[#1a0505]";
                progressColor = "bg-red-600";
                Icon = Zap;
              } else if (isLow) {
                statusColor = "text-orange-500";
                statusBg = "bg-orange-500/10";
                statusText = "Мало мест";
                borderColor = "border-orange-500/30 hover:border-orange-500/50";
                progressColor = "bg-orange-500";
                Icon = AlertCircle;
              }

              return (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`
                    relative p-6 rounded-2xl border transition-all duration-300 overflow-hidden group bg-[#111]
                    ${borderColor}
                  `}
                >
                  <div className="absolute bottom-0 left-0 h-1 bg-[#1a1a1a] w-full">
                    <div 
                      className={`h-full transition-all duration-1000 ${progressColor}`} 
                      style={{ width: `${loadPercent}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-chakra font-bold text-lg text-white uppercase tracking-wide">{zone.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-[10px] ${statusBg} ${statusColor} px-2 py-0.5 rounded font-bold uppercase`}>
                          {statusText}
                        </span>
                      </div>
                    </div>
                    <div className={`p-2 rounded-lg ${statusBg} ${statusColor}`}>
                      <Icon size={20} />
                    </div>
                  </div>

                  <div className="flex items-end justify-between mt-auto">
                     <div className="flex flex-col">
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Свободно</span>
                        <div className="text-2xl font-tactic font-bold text-white leading-none">
                           {zone.free_pc_count} <span className="text-sm text-gray-600 font-sans font-normal">/ {zone.pc_count}</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Загрузка</span>
                        <div className={`text-xl font-mono font-bold ${statusColor}`}>
                           {loadPercent}%
                        </div>
                     </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

        {/* INFO BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-gradient-to-r from-[#111] to-[#1a1a1a] border border-[#FF2E63]/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(255,46,99,0.05)]"
        >
           <div className="flex items-start gap-4 max-w-xl">
              <div className="p-3 bg-[#FF2E63]/10 rounded-xl text-[#FF2E63] shrink-0">
                 <Info size={24} />
              </div>
              <div>
                 <h3 className="font-chakra font-bold text-lg text-white uppercase mb-1">
                   Данные в реальном времени
                 </h3>
                 <p className="font-inter text-sm text-gray-400 leading-relaxed">
                   Это текущая загрузка клуба. Чтобы гарантированно сесть за любимый ПК, рекомендуем бронировать место заранее через приложение.
                 </p>
              </div>
           </div>
           
           <div className="flex flex-col items-center gap-3 shrink-0">
             <a 
               href="https://redirect.appmetrica.yandex.com/serve/965634439310753772" 
               target="_blank"
               className="flex items-center gap-3 px-8 py-3 bg-[#FF2E63] text-white font-chakra font-bold text-sm uppercase rounded-xl hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,46,99,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] whitespace-nowrap"
             >
               <Smartphone size={18} />
               Бронь со скидкой
             </a>
             
             {/* Platform Icons */}
             <div className="flex items-center gap-4 text-xs text-gray-500 font-mono uppercase tracking-widest opacity-60">
                <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                   <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74s2.57-.9 3.87-.75c.52.01 2.52.19 3.75 1.92-2.9 1.4-2.22 5.16.59 6.34-.69 1.76-1.53 3.29-3.29 4.72zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                   </svg>
                   <span>iOS</span>
                </div>
                <div className="w-[1px] h-3 bg-gray-700"></div>
                <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                   <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                      <path d="M3.609 13.201c.17 2.772 2.373 4.975 5.234 5.302l-1.393 2.414a.78.78 0 0 0 .285 1.066.78.78 0 0 0 1.066-.285l1.453-2.516h3.492l1.453 2.516a.78.78 0 0 0 1.066.285.78.78 0 0 0 .285-1.066l-1.393-2.414c2.86-.327 5.064-2.53 5.234-5.302.19-3.13-2.305-5.752-5.46-5.752H9.07c-3.155 0-5.65 2.622-5.46 5.752zm5.39-1.953a.977.977 0 1 1 0-1.953.977.977 0 0 1 0 1.953zm6 0a.977.977 0 1 1 0-1.953.977.977 0 0 1 0 1.953zM16.563 3.61a.78.78 0 0 0-1.106.31l-.813 1.41a9.29 9.29 0 0 0-5.288 0l-.813-1.41a.78.78 0 1 0-1.352.778l.836 1.45a7.8 7.8 0 0 0-3.87 3.328h15.687a7.8 7.8 0 0 0-3.87-3.329l.836-1.45a.78.78 0 0 0-.246-1.086z"/>
                   </svg>
                   <span>Android</span>
                </div>
             </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
}