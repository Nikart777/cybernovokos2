"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Quote, MapPin, Gamepad2, Clock, Trophy, Star, ChevronRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Denis_AWP",
    avatar: "/reviews/user-1.webp",
    source: "Яндекс.Карты",
    text: "Искал мощный компьютерный клуб в Новокосино для CS2 на 360 Гц. Железо топовое, FPS стабильный. Кресла Knight очень удобные.",
    stats: { game: "CS 2", rank: "ЗОЛОТО", hours: "280ч" },
    color: "#FFD700" // Gold
  },
  {
    id: 2,
    name: "Maria_Gamer",
    avatar: "/reviews/user-2.webp",
    source: "Google Maps",
    text: "Лучшая аренда PS5! Брали VIP-комнату. Экран огромный, джойстики чистые. Респект админам за помощь с настройкой.",
    stats: { game: "UFC 5", rank: "СЕРЕБРО", hours: "120ч" },
    color: "#C0C0C0" // Silver
  },
  {
    id: 3,
    name: "Spirit_Fan",
    avatar: "/reviews/user-3.webp",
    source: "2GIS",
    text: "Буткемп CyberX — лучший для тренировок. 5 компов, шумоизоляция. Для турниров по Dota 2 условия идеальные.",
    stats: { game: "Dota 2", rank: "БРИЛЛИАНТ", hours: "850ч" },
    color: "#FF2E63" // Diamond (Red)
  },
  {
    id: 4,
    name: "Alex_Sim",
    avatar: "/reviews/user-4.webp",
    source: "Яндекс.Карты",
    text: "Автосимулятор Moza R12 — космос! Руль с обратной связью, педали металл. Погонял в Assetto Corsa, полный эффект присутствия.",
    stats: { game: "Racing", rank: "БРОНЗА", hours: "40ч" },
    color: "#CD7F32" // Bronze
  },
  {
    id: 5,
    name: "Ksenia_V",
    avatar: "/reviews/user-5.webp",
    source: "2GIS",
    text: "Чисто и уютно. Вкусный кофе. Для девушек-геймеров комфортно и безопасно. Часто захожу в Genshin на ультрах.",
    stats: { game: "Genshin", rank: "ПЛАТИНА", hours: "400ч" },
    color: "#00F0FF" // Platinum (Cyan)
  }
];

export default function Reviews() {
  return (
    <section 
      id="otzyv" 
      className="relative w-full py-24 md:py-32 bg-[#050505] overflow-hidden"
    >
      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#FF2E63]/5 blur-[100px] md:blur-[150px] rounded-full mix-blend-screen" />
         <div className="absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#B900FF]/5 blur-[100px] md:blur-[150px] rounded-full mix-blend-screen" />
      </div>
      
      {/* --- HEADER --- */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-10 mb-10 md:mb-16 flex flex-col md:flex-row items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <span className="font-mono text-xs text-[#FF2E63] tracking-[0.2em] uppercase bg-[#FF2E63]/10 px-2 py-1 rounded">
               CyberX Community
             </span>
          </div>
          <h2 className="font-tactic font-black text-4xl md:text-7xl text-white uppercase leading-[0.85]">
            ЗАЛ СЛАВЫ <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}>ОТЗЫВЫ ГОСТЕЙ</span>
          </h2>
        </div>

        {/* Rating Badge */}
        <div className="flex items-center gap-5 bg-[#111]/80 backdrop-blur-md border border-white/10 px-6 py-4 rounded-2xl shadow-lg">
           <div className="text-right">
              <div className="font-chakra font-black text-3xl text-white leading-none">5.0</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide font-bold">Яндекс / 2GIS</div>
           </div>
           <div className="flex text-[#FFD700] gap-1">
              {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="currentColor" className="drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]" />)}
           </div>
        </div>
      </div>

      {/* --- CARDS SLIDER (NATIVE SCROLL) --- */}
      {/* ИСПРАВЛЕНИЕ: Используем нативный CSS скролл с snap-x для максимальной плавности на мобильных */}
      <div className="relative w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide pl-4 md:pl-10 pb-10">
        <div className="flex gap-4 md:gap-6 w-max pr-4 md:pr-10">
          {reviews.map((review) => (
            <div key={review.id} className="snap-center shrink-0">
               <ReviewCard review={review} />
            </div>
          ))}
          
          {/* CTA Card (Last item) */}
          <a 
            href="https://yandex.ru/maps/-/CLWX5MIq" 
            target="_blank"
            className="snap-center shrink-0 group relative w-[300px] md:w-[380px] bg-[#FF2E63] rounded-[30px] p-1 overflow-hidden flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-2"
          >
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
             <div className="relative z-10 w-full h-full bg-black/10 backdrop-blur-sm rounded-[28px] p-8 flex flex-col items-center justify-center border border-white/20">
               <div className="w-16 h-16 bg-white text-[#FF2E63] rounded-full flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
                  <Quote size={32} fill="currentColor" />
               </div>
               <h3 className="font-tactic font-bold text-3xl text-white uppercase mb-2">
                 Оставь отзыв
               </h3>
               <p className="font-chakra text-white/90 text-sm mb-8 leading-relaxed">
                 Поделись впечатлениями о клубе и получи <b className="text-white bg-black/20 px-1 rounded">+100₽</b> на баланс.
               </p>
               <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest bg-white text-[#FF2E63] px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors">
                 Написать <ChevronRight size={14} />
               </div>
             </div>
          </a>

        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: any }) {
  return (
    <div className="group relative w-[300px] md:w-[380px] min-h-[300px] perspective transform-gpu">
      {/* Glow Border Effect */}
      <div 
        className="absolute -inset-[1px] rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{ background: `linear-gradient(45deg, ${review.color}, transparent, ${review.color})` }}
      />
      
      <div className="relative h-full bg-[#0E0E0E] border border-white/5 rounded-[30px] p-6 md:p-8 flex flex-col transition-transform duration-300 group-hover:-translate-y-1 overflow-hidden">
        
        {/* Top Gradient Fade */}
        <div 
          className="absolute top-0 left-0 w-full h-[150px] opacity-10 pointer-events-none transition-opacity group-hover:opacity-20"
          style={{ background: `linear-gradient(to bottom, ${review.color}, transparent)` }}
        />

        {/* User Header */}
        <div className="flex items-center justify-between mb-6 relative z-10">
           <div className="flex items-center gap-4">
              <div className="relative">
                 {/* Avatar Ring */}
                 <div className="absolute inset-0 rounded-full border-2 border-dashed animate-[spin_10s_linear_infinite] opacity-30" 
                      style={{ borderColor: review.color }} />
                 <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-[#1a1a1a] shadow-lg relative z-10">
                    <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                 </div>
              </div>
              <div>
                 <div className="font-chakra font-bold text-white text-base tracking-wide">{review.name}</div>
                 <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase font-bold tracking-wider mt-0.5">
                    <MapPin size={10} />
                    {review.source}
                 </div>
              </div>
           </div>
           <Quote size={24} className="opacity-10 rotate-12 md:w-8 md:h-8" style={{ color: review.color }} />
        </div>

        {/* Text */}
        <p className="font-inter text-sm text-gray-300 leading-relaxed mb-8 flex-grow relative z-10 line-clamp-4">
          {review.text}
        </p>

        {/* Stats HUD */}
        <div className="relative z-10 bg-[#151515] rounded-2xl p-4 border border-white/5 group-hover:border-white/10 transition-colors">
           <div className="grid grid-cols-3 gap-2 divide-x divide-white/5">
              
              <div className="text-center px-1">
                 <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-1.5">Игра</div>
                 <div className="font-chakra font-bold text-xs text-white flex justify-center items-center gap-1.5">
                    <Gamepad2 size={12} style={{ color: review.color }} /> 
                    {review.stats.game}
                 </div>
              </div>

              <div className="text-center px-1">
                 <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-1.5">Ранг</div>
                 <div className="font-chakra font-bold text-xs text-white flex justify-center items-center gap-1.5">
                    <Trophy size={12} style={{ color: review.color }} /> 
                    <span style={{ color: review.color }}>{review.stats.rank}</span>
                 </div>
              </div>

              <div className="text-center px-1">
                 <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-1.5">Время</div>
                 <div className="font-chakra font-bold text-xs text-white flex justify-center items-center gap-1.5">
                    <Clock size={12} style={{ color: review.color }} /> 
                    {review.stats.hours}
                 </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  )
}