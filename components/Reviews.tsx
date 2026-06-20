"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Quote, MapPin, Gamepad2, Clock, Trophy, Star, ChevronRight } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "Skuf_Destroyer",
    avatar: "/images/social-hub/1.png",
    source: "Яндекс.Карты",
    text: "Искал мощный компьютерный клуб в Новокосино для CS2 на 360 Гц. Железо топовое, FPS стабильный. Кресла Knight очень удобные.",
    stats: { game: "CS 2", rank: "ЗОЛОТО", hours: "280ч" },
    color: "#FFD700" // Gold
  },
  {
    id: 2,
    name: "Cyber_Koshka",
    avatar: "/images/social-hub/5.png",
    source: "Google Maps",
    text: "Лучшая аренда PS5! Брали VIP-комнату. Экран огромный, джойстики чистые. Респект админам за помощь с настройкой.",
    stats: { game: "UFC 5", rank: "СЕРЕБРО", hours: "120ч" },
    color: "#C0C0C0" // Silver
  },
  {
    id: 3,
    name: "Legend_NVK",
    avatar: "/images/social-hub/7.png",
    source: "2GIS",
    text: "Буткемп CyberX — лучший для тренировок. 5 компов, шумоизоляция. Для турниров по Dota 2 условия идеальные.",
    stats: { game: "Dota 2", rank: "БРИЛЛИАНТ", hours: "850ч" },
    color: "#FF2E63" // Diamond (Red)
  },
  {
    id: 4,
    name: "Gigachad_Altuf",
    avatar: "/images/social-hub/10.png",
    source: "Яндекс.Карты",
    text: "Автосимулятор Moza R12 — космос! Руль с обратной связью, педали металл. Погонял в Assetto Corsa, полный эффект присутствия.",
    stats: { game: "Racing", rank: "БРОНЗА", hours: "40ч" },
    color: "#CD7F32" // Bronze
  },
  {
    id: 5,
    name: "Vibe_Master",
    avatar: "/images/social-hub/13.png",
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
      className="relative w-full py-24 md:py-32 bg-[#050505] overflow-hidden border-t-2 border-white/5"
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
            <span className="font-chakra font-black text-[10px] text-white/40 tracking-widest uppercase bg-[#111] border border-white/10 px-2 py-1 skew-x-[-6deg]">
              <span className="block skew-x-[6deg]">CyberX Community</span>
            </span>
          </div>
          <h2 className="font-tactic font-black text-4xl md:text-7xl text-white uppercase leading-[0.85] italic">
            ЗАЛ СЛАВЫ <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}>ОТЗЫВЫ ГОСТЕЙ</span>
          </h2>
        </div>

        {/* Rating Badge */}
        <div className="flex items-center gap-5 bg-[#111] border-2 border-white/10 px-6 py-4 skew-x-[-6deg]">
          <div className="skew-x-[6deg] flex items-center gap-5">
              <div className="text-right">
                <div className="font-tactic italic font-black text-4xl text-white leading-none">5.0</div>
                <div className="text-[10px] font-chakra text-white/50 uppercase tracking-widest font-black">Яндекс / 2GIS</div>
              </div>
              <div className="flex text-[#FF2E63] gap-1">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={20} fill="currentColor" />)}
              </div>
          </div>
        </div>
      </div>

      {/* --- CARDS SLIDER --- */}
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
            className="snap-center shrink-0 group relative w-[300px] md:w-[380px] h-full min-h-[300px] bg-[#FF2E63] p-1 flex flex-col skew-x-[-6deg] transition-transform hover:-translate-y-2"
          >
            <div className="relative z-10 w-full h-full bg-[#111] p-8 flex flex-col items-center justify-center border border-white/20">
              <div className="skew-x-[6deg] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-white text-[#FF2E63] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Quote size={32} fill="currentColor" />
                  </div>
                  <h3 className="font-tactic italic font-black text-3xl text-white uppercase mb-2">
                    Оставь отзыв
                  </h3>
                  <p className="font-chakra text-white/70 font-bold text-xs uppercase tracking-widest mb-8 leading-relaxed">
                    ПОДЕЛИСЬ ВПЕЧАТЛЕНИЯМИ О КЛУБЕ И ПОЛУЧИ <b className="text-[#FF2E63] bg-white/10 px-1">+100₽</b> НА БАЛАНС.
                  </p>
                  <div className="flex items-center gap-2 font-tactic italic text-sm font-black uppercase text-[#111] bg-white px-6 py-3 hover:bg-[#FF2E63] hover:text-white transition-colors">
                    Написать <ChevronRight size={16} />
                  </div>
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
    <div className="group relative w-[300px] md:w-[380px] min-h-[300px] transform-gpu">
      <div className="relative h-full bg-[#0A0A0A] border-2 border-white/10 p-6 md:p-8 flex flex-col skew-x-[-6deg] transition-colors duration-300 group-hover:border-white/30 overflow-hidden">
        
        {/* Color Line Top */}
        <div className="absolute top-0 left-0 w-full h-1 opacity-50 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: review.color }} />

        <div className="skew-x-[6deg] flex flex-col h-full relative z-10">
            {/* User Header */}
            <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
                <div className="relative">
                <div className="w-12 h-12 md:w-14 md:h-14 overflow-hidden border-2 shadow-lg relative z-10" style={{ borderColor: review.color }}>
                    <Image
                    src={review.avatar}
                    alt={review.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                    />
                </div>
                </div>
                <div>
                <div className="font-tactic italic text-white text-lg tracking-wide uppercase">{review.name}</div>
                <div className="flex items-center gap-1.5 text-[9px] text-white/40 uppercase font-black tracking-widest mt-0.5">
                    <MapPin size={10} style={{ color: review.color }} />
                    {review.source}
                </div>
                </div>
            </div>
            </div>

            {/* Text */}
            <p className="font-chakra text-xs text-white/60 font-bold uppercase tracking-wider leading-relaxed mb-8 flex-grow line-clamp-4">
            {review.text}
            </p>

            {/* Stats HUD */}
            <div className="relative z-10 bg-[#111] p-3 border border-white/10 group-hover:border-white/20 transition-colors">
                <div className="grid grid-cols-3 gap-2 divide-x divide-white/10">

                    <div className="text-center px-1">
                    <div className="text-[8px] text-white/30 uppercase font-black tracking-widest mb-1.5">GAME</div>
                    <div className="font-chakra font-black text-[10px] text-white flex justify-center items-center gap-1 uppercase tracking-wider">
                        <Gamepad2 size={12} style={{ color: review.color }} />
                        {review.stats.game}
                    </div>
                    </div>

                    <div className="text-center px-1">
                    <div className="text-[8px] text-white/30 uppercase font-black tracking-widest mb-1.5">RANK</div>
                    <div className="font-chakra font-black text-[10px] flex justify-center items-center gap-1 uppercase tracking-wider" style={{ color: review.color }}>
                        <Trophy size={12} style={{ color: review.color }} />
                        {review.stats.rank}
                    </div>
                    </div>

                    <div className="text-center px-1">
                    <div className="text-[8px] text-white/30 uppercase font-black tracking-widest mb-1.5">TIME</div>
                    <div className="font-chakra font-black text-[10px] text-white flex justify-center items-center gap-1 uppercase tracking-wider">
                        <Clock size={12} style={{ color: review.color }} />
                        {review.stats.hours}
                    </div>
                    </div>

                </div>
            </div>
        </div>

      </div>
    </div>
  )
}