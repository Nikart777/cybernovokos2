"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, 
  Cpu, Monitor, Mouse, Wind, Armchair, 
  Zap, Users, Lock, Trophy, Headset, 
  Gamepad2, Tv, Car, Gauge, Disc, 
  Coffee, Clock, Wifi
} from "lucide-react";

// --- DATA ---
// Я добавил поле 'imageCount' на основе твоих файлов в public/zones.
// Теперь слайдер работает мгновенно, без подгрузок и проверок.
const zones = [
  {
    id: "solo-premium",
    title: "SOLO PREMIUM",
    subtitle: "Уединенный комфорт",
    price: "от 150₽",
    imageCount: 6, // У тебя лежит 6 файлов
    features: [
      { icon: Cpu, label: "RTX 5070 12GB", sub: "Видеокарта" },
      { icon: Monitor, label: "240 Гц / 2K", sub: "Gigabyte 27\"" },
      { icon: Mouse, label: "Logitech G Pro", sub: "Беспроводная" },
      { icon: Wind, label: "Свой климат", sub: "Кондиционер" },
      { icon: Zap, label: "Быстрая зарядка", sub: "Type-C / Lightning" },
      { icon: Armchair, label: "Комфорт", sub: "Кронштейн + Кресло" },
    ]
  },
  {
    id: "solo-pro",
    title: "SOLO PRO",
    subtitle: "Киберспорт уровень",
    price: "от 130₽",
    imageCount: 3, // У тебя лежит 3 файла
    features: [
      { icon: Cpu, label: "RTX 5070 12GB", sub: "Мощность" },
      { icon: Monitor, label: "400 Гц BenQ", sub: "Zowie Esports" },
      { icon: Mouse, label: "Logitech G Pro", sub: "Superlight" },
      { icon: Wind, label: "Кондиционер", sub: "Личный холод" },
      { icon: Zap, label: "All Charge", sub: "Зарядка на столе" },
      { icon: Monitor, label: "Кронштейн", sub: "Настройка экрана" },
    ]
  },
  {
    id: "duo",
    title: "DUO ZONE",
    subtitle: "Играем вдвоем",
    price: "от 120₽",
    imageCount: 3, // У тебя лежит 3 файла
    features: [
      { icon: Cpu, label: "RTX 4060", sub: "Стабильный FPS" },
      { icon: Monitor, label: "240 Гц IPS", sub: "24 дюйма" },
      { icon: Mouse, label: "Logitech G403", sub: "Классика" },
      { icon: Users, label: "Приватность", sub: "Зона для двоих" },
      { icon: Armchair, label: "Удобство", sub: "Игровые кресла" },
      { icon: Wind, label: "Атмосфера", sub: "Своя вентиляция" },
    ]
  },
  {
    id: "bootcamp",
    title: "VIP BOOTCAMP",
    subtitle: "Для команд на 5 ПК",
    price: "от 110₽",
    imageCount: 5, // У тебя лежит 5 файлов
    features: [
      { icon: Users, label: "5 Игровых мест", sub: "Командная зона" },
      { icon: Cpu, label: "RTX 4070", sub: "Флагманы" },
      { icon: Monitor, label: "240 Гц", sub: "На кронштейнах" },
      { icon: Lock, label: "Шумоизоляция", sub: "Никто не мешает" },
      { icon: Mouse, label: "Периферия", sub: "Топовый сет" },
      { icon: Headset, label: "VIP Сервис", sub: "Обслуживание" },
    ]
  },
  {
    id: "ps5",
    title: "PS5 LOUNGE",
    subtitle: "PlayStation 5 Zone",
    price: "от 250₽",
    imageCount: 5, // У тебя лежит 5 файлов
    features: [
      { icon: Tv, label: "70 Дюймов", sub: "4K Ultra HD" },
      { icon: Gamepad2, label: "FC26 / UFC 5", sub: "Игры на двоих" },
      { icon: Trophy, label: "MK 1 / NHL", sub: "Файтинги и спорт" },
      { icon: Armchair, label: "Для компаний", sub: "Диваны и пуфы" },
      { icon: Users, label: "It Takes Two", sub: "Игры для пар" },
      { icon: Zap, label: "Атмосфера", sub: "Лучшая в районе" },
    ]
  },
  {
    id: "sim",
    title: "АВТОСИМУЛЯТОР",
    subtitle: "Полное погружение",
    price: "от 300₽",
    imageCount: 5, // У тебя лежит 5 файлов
    accent: "orange",
    link: "https://cyberx.moscow/cyberracing", 
    btnText: "Подробнее", 
    features: [
      { icon: Disc, label: "Pro Руль", sub: "Force Feedback" },
      { icon: Tv, label: "55\" 4K 120Hz", sub: "Плавная картинка" },
      { icon: Car, label: "Кокпит", sub: "Гоночный каркас" },
      { icon: Gauge, label: "Педали", sub: "Металлические" },
      { icon: Zap, label: "Ощущения", sub: "Вибрация и драйв" },
      { icon: Cpu, label: "Топовый ПК", sub: "Графика Ультра" },
    ]
  },
  {
    id: "common",
    title: "ОБЩИЙ ЗАЛ",
    subtitle: "База клуба",
    price: "от 100₽",
    imageCount: 5, // У тебя лежит 5 файлов
    features: [
      { icon: Monitor, label: "25 ПК", sub: "Рабочие лошадки" },
      { icon: Coffee, label: "Бар и Снеки", sub: "Подкрепиться" },
      { icon: Clock, label: "24/7", sub: "Работаем всегда" },
      { icon: Headset, label: "Админы", sub: "Помогут во всем" },
      { icon: Mouse, label: "Периферия", sub: "Logitech" },
      { icon: Wifi, label: "Стабильность", sub: "Low Ping" },
    ]
  }
];

export default function Zones() {
  return (
    <section className="relative w-full bg-[#050505] pb-20 px-4 md:px-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {zones.map((zone, index) => (
          <ZoneCard key={zone.id} zone={zone} index={index} />
        ))}
      </div>
    </section>
  );
}

function ZoneCard({ zone, index }: { zone: any, index: number }) {
  // Генерируем массив картинок сразу при рендере, без useEffect и задержек
  const images = Array.from({ length: zone.imageCount }, (_, i) => `/zones/${zone.id}-${i + 1}.webp`);
  
  const [currentImage, setCurrentImage] = useState(0);
  const isAccent = zone.accent === 'orange';
  const accentColor = isAccent ? '#FF8C00' : '#FF2E63'; 

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
      className="group relative bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-opacity-50 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col transform-gpu"
      style={{ borderColor: isAccent ? 'rgba(255, 140, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)' }}
    >
      {/* --- IMAGE SLIDER --- */}
      {/* aspect-[4/3] жестко резервирует место под картинку, предотвращая прыжки */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-black isolate">
        <div className="absolute inset-0 w-full h-full">
            <Image 
              src={images[currentImage]} 
              alt={zone.title} 
              fill
              // sizes помогает браузеру выбрать правильный размер и не грузить лишнее
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              // Грузим первые две карточки мгновенно (LCP), остальные лениво
              priority={index < 2} 
            />
            {/* Градиент для читаемости текста цены */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-90 pointer-events-none" />
        </div>

        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage} 
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 z-20"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextImage} 
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 z-20"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 pointer-events-none">
              {images.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentImage ? 'bg-white' : 'bg-white/30'}`}
                />
              ))}
            </div>
          </>
        )}

        <div 
          className="absolute top-4 right-4 px-3 py-1 rounded-md font-chakra font-bold text-sm text-white shadow-lg backdrop-blur-md z-10"
          style={{ backgroundColor: isAccent ? 'rgba(255, 140, 0, 0.8)' : 'rgba(255, 46, 99, 0.8)' }}
        >
          {zone.price}
        </div>
      </div>

      {/* --- CONTENT --- */}
      <div className="p-6 flex flex-col flex-grow relative z-10 -mt-4 bg-[#111] rounded-t-2xl border-t border-white/5">
        
        <div className="mb-6">
          <h3 className="font-tactic font-bold text-2xl text-white uppercase tracking-wide mb-1">
            {zone.title}
          </h3>
          <p className="font-inter text-xs font-bold uppercase tracking-widest text-gray-500">
            {zone.subtitle}
          </p>
          <div className="w-12 h-[2px] mt-3" style={{ backgroundColor: accentColor }} />
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-5 mb-8">
          {zone.features.map((feat: any, i: number) => (
            <div key={i} className="flex items-start gap-3 group/feat">
              <div className="mt-0.5 opacity-70 group-hover/feat:opacity-100 transition-opacity" style={{ color: accentColor }}>
                <feat.icon size={18} />
              </div>
              <div>
                <div className="font-chakra font-bold text-sm text-white leading-tight">
                  {feat.label}
                </div>
                <div className="font-inter text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">
                  {feat.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        {zone.link && (
          <a
            href={zone.link}
            className="w-full py-4 mt-auto border rounded-xl font-chakra font-bold text-sm uppercase tracking-widest transition-all duration-300 relative overflow-hidden group/btn block text-center"
            style={{ 
              borderColor: isAccent ? 'rgba(255, 140, 0, 0.5)' : 'rgba(255,255,255,0.1)', 
              color: isAccent ? '#FF8C00' : '#fff' 
            }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: accentColor }}
            />
            <span className={`relative z-10 transition-colors flex items-center justify-center gap-2 ${isAccent ? 'group-hover/btn:text-black' : 'group-hover/btn:text-black'}`}>
              {zone.btnText || "Подробнее"}
              <ChevronRight size={16} />
            </span>
          </a>
        )}

      </div>
    </motion.div>
  );
}