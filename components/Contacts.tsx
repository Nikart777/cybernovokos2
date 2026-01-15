"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Navigation, Send } from "lucide-react";

export default function Contacts() {
   return (
      <section id="contact" className="relative w-full py-24 md:py-32 bg-[#050505] overflow-hidden">

         {/* --- BACKGROUND --- */}
         <div className="absolute inset-0 pointer-events-none">
            {/* Grid */}
            <div
               className="absolute inset-0 opacity-10"
               style={{
                  backgroundImage: `linear-gradient(#FF2E63 1px, transparent 1px), linear-gradient(90deg, #FF2E63 1px, transparent 1px)`,
                  backgroundSize: '100px 100px',
                  maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
               }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
         </div>

         <div className="max-w-[1400px] mx-auto px-4 md:px-10 relative z-10">

            {/* --- HEADER --- */}
            <div className="flex flex-col items-center text-center mb-16">
               <span className="font-mono text-[10px] text-[#FF2E63] uppercase tracking-[0.3em] mb-4 bg-[#FF2E63]/10 px-3 py-1 rounded-full">
                  Location Data
               </span>
               <h2 className="font-tactic font-black text-5xl md:text-7xl text-white uppercase tracking-wide drop-shadow-[0_0_30px_rgba(255,46,99,0.3)]">
                  КОНТАКТЫ
               </h2>
            </div>

            {/* --- DASHBOARD GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

               {/* LEFT: MAP MODULE (7 cols) */}
               <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="lg:col-span-7 relative h-[400px] md:h-[500px] bg-[#111] rounded-3xl overflow-hidden border border-white/10 group"
               >
                  {/* Tech Overlay */}
                  <div className="absolute inset-0 z-10 pointer-events-none border-[10px] border-[#050505]/50 rounded-3xl" />
                  <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
                     <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse" />
                     <span className="font-mono text-[10px] text-white uppercase tracking-widest">Satellite View</span>
                  </div>

                  {/* Map Iframe (Filters for Cyberpunk Look) */}
                  <iframe
                     src="https://yandex.ru/map-widget/v1/?um=constructor%3A552a8b85f4afba29e9c8eafa82be3c60f7f80cfa0ac6e8cc3ab8b605aa91a897&source=constructor"
                     className="w-full h-full grayscale invert-[0.9] contrast-[1.2] opacity-80 group-hover:grayscale-0 group-hover:invert-0 group-hover:opacity-100 group-hover:contrast-100 transition-all duration-700"
                     style={{ border: 0 }}
                     allowFullScreen
                     loading="lazy"
                  />
               </motion.div>

               {/* RIGHT: INFO MODULE (5 cols) */}
               <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="lg:col-span-5 flex flex-col gap-6"
               >

                  {/* Info Card */}
                  <div className="flex-grow bg-[#111] border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                     {/* Bg Glow */}
                     <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#FF2E63]/10 blur-[80px]" />

                     {/* Phone */}
                     <div className="mb-10">
                        <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2 block">Связь с базой</span>
                        <a href="tel:+79851289538" className="font-tactic font-bold text-3xl md:text-5xl text-white hover:text-[#FF2E63] transition-colors">
                           +7 985 128 95 38
                        </a>
                     </div>

                     {/* Details List */}
                     <div className="space-y-6">
                        {/* Address */}
                        <div className="flex items-start gap-4">
                           <div className="p-3 bg-white/5 rounded-xl text-[#FF2E63]">
                              <MapPin size={24} />
                           </div>
                           <div>
                              <h4 className="font-chakra font-bold text-lg text-white uppercase">Адрес</h4>
                              <p className="font-inter text-sm text-gray-400 leading-relaxed">
                                 г. Москва, ул. Новокосинская, 32<br />
                                 <span className="text-white/30">ТЦ &quot;Новокосино&quot;, 2 этаж</span>
                              </p>
                           </div>
                        </div>

                        {/* Work Time */}
                        <div className="flex items-start gap-4">
                           <div className="p-3 bg-white/5 rounded-xl text-[#00F0FF]">
                              <Clock size={24} />
                           </div>
                           <div>
                              <h4 className="font-chakra font-bold text-lg text-white uppercase flex items-center gap-3">
                                 Режим работы
                                 <span className="text-[10px] bg-[#00F0FF]/10 text-[#00F0FF] px-2 py-0.5 rounded border border-[#00F0FF]/20 animate-pulse">OPEN</span>
                              </h4>
                              <p className="font-tactic font-bold text-2xl text-white mt-1">24 / 7</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Actions Row */}
                  <div className="grid grid-cols-2 gap-4">
                     <a
                        href="https://yandex.ru/maps/-/CLWXNB~k"
                        target="_blank"
                        className="flex items-center justify-center gap-3 bg-white text-black h-16 rounded-2xl font-chakra font-bold text-sm uppercase tracking-wider hover:bg-[#FF2E63] hover:text-white transition-all duration-300 group"
                     >
                        <Navigation size={18} className="group-hover:-translate-y-1 transition-transform" />
                        Маршрут
                     </a>

                     <div className="flex gap-2">
                        <a href="https://t.me/CyberXNovokos" target="_blank" className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-[#0088cc] hover:border-transparent transition-colors">
                           <Send size={24} />
                        </a>
                        <a href="https://vk.com/club224403383" target="_blank" className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-[#0077FF] hover:border-transparent transition-colors">
                           <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M15.684 0H8.316C1.592 0 0 1.63 0 8.516v6.968C0 22.37 1.592 24 8.316 24h7.368C22.408 24 24 22.37 24 15.484V8.516C24 1.63 22.408 0 15.684 0Zm3.692 17.58c-1.396 0-3.956-1.572-4.996-2.616-.276-.276-.6-.24-.732-.24-.432 0-.6.18-.6.588v2.04c0 .42-.12.648-1.044.648-3.696 0-6.432-3.792-6.432-3.792s-2.736-5.46-2.736-7.14c0-.216.084-.432.516-.432h2.52c.264 0 .42.12.54.384 0 0 .996 2.376 2.376 4.8.444.78.648.96.888.96.12 0 .276-.144.276-.948V9.3c-.072-1.68-1.02-1.824-1.02-2.424 0-.276.228-.564.6-.564h3.696c.504 0 .672.264.672.876v4.62c0 .504.228.684.384.684.3 0 .54-.156 1.092-1.092 1.272-2.22 1.656-3.876 1.656-3.876.084-.288.336-.444.792-.444h2.52c.744 0 .9.396.732.948 0 0-.876 2.22-4.224 5.376 0 0-1.008.972-1.224 1.344-.192.336.084.792.084.792s2.688 2.508 2.988 3.444c.096.3.012.744-.6.744Z" /></svg>
                        </a>
                     </div>
                  </div>

               </motion.div>

            </div>

         </div>
      </section>
   );
}