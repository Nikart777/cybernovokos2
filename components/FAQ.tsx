"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, MessageSquare, Terminal, Zap, Shield, Clock, CreditCard, Mouse, Coffee } from "lucide-react";

// --- DATA ---
const faqData = [
  {
    question: "Какие игры установлены?",
    answer: "У нас более 2000 клубных аккаунтов. Популярное предустановлено: CS 2 (Prime), Dota 2, PUBG, Apex, GTA V, Rust, Warzone 2.0, Minecraft и многие другие.",
    icon: Terminal
  },
  {
    question: "Можно со своей едой?",
    answer: "Да, конечно! Мы разрешаем приносить свои закуски и напитки (кроме алкоголя). Главное — аккуратность за игровым местом, чтобы не залить клавиатуру.",
    icon: Coffee
  },
  {
    question: "Можно со своими девайсами?",
    answer: "Безусловно. Если вы киберспортсмен и привыкли к своей мышке, клавиатуре или наушникам — берите. Администратор поможет всё подключить и настроить.",
    icon: Mouse
  },
  {
    question: "Есть зарядка для телефона?",
    answer: "В зонах SOLO есть встроенные проводные зарядки Type-C и Lightning. В общем зале вы всегда можете попросить зарядить устройство на ресепшене.",
    icon: Zap
  },
  {
    question: "Несовершеннолетние ночью?",
    answer: "Строго по закону РФ. После 22:00 нахождение гостей младше 18 лет возможно ТОЛЬКО в сопровождении родителей или законных опекунов.",
    icon: Shield
  },
  {
    question: "Можно ли спать в клубе?",
    answer: "Нет, спать на игровых местах запрещено регламентом сети. Мы за активный гейминг! Если устали — лучше возьмите паузу на кофе в зоне отдыха.",
    icon: HelpCircle
  },
  {
    question: "Что если я опоздал на бронь?",
    answer: "Бронь активируется строго по времени. Если вы опаздываете — не переживайте, ваше место будет закреплено за вами всё ваше забронированное время.",
    icon: Clock
  },
  {
    question: "Способы оплаты?",
    answer: "Принимаем всё: наличные, банковские карты, QR коды (SBP). А также вы можете оплатить игровое время бонусами в приложении CYBERX.",
    icon: CreditCard
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Первый открыт по умолчанию

  return (
    <section id="faq" className="relative w-full py-24 md:py-32 bg-[#050505] overflow-hidden">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Vertical Lines */}
         <div className="absolute left-[10%] top-0 w-[1px] h-full bg-white/5" />
         <div className="absolute right-[10%] top-0 w-[1px] h-full bg-white/5" />
         
         {/* Binary Noise */}
         <div className="absolute top-20 right-20 opacity-10 font-mono text-xs text-[#FF2E63] writing-vertical-rl select-none">
            01010101010101010101010101
         </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-10 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
           <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 bg-[#FF2E63] rounded-full animate-pulse" />
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Knowledge Base // Database</span>
           </div>
           
           <h2 className="font-tactic font-black text-5xl md:text-7xl text-white uppercase tracking-wide drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
             ВОПРОС / ОТВЕТ
           </h2>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {faqData.map((item, i) => (
             <FAQItem 
               key={i} 
               item={item} 
               isOpen={openIndex === i} 
               onClick={() => setOpenIndex(openIndex === i ? null : i)}
             />
           ))}
        </div>

        {/* --- FOOTER CTA --- */}
        <div className="mt-16 flex justify-center">
           <a 
             href="https://t.me/CyberXNovokos" 
             target="_blank"
             className="group relative inline-flex items-center gap-4 px-8 py-4 bg-transparent border border-[#FF2E63]/50 rounded-xl overflow-hidden hover:border-[#FF2E63] transition-colors"
           >
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-[#FF2E63]/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              
              <MessageSquare size={24} className="text-[#FF2E63] relative z-10" />
              <div className="flex flex-col text-left relative z-10">
                 <span className="font-chakra font-bold text-sm text-white uppercase tracking-wider">Не нашел ответ?</span>
                 <span className="font-mono text-[10px] text-[#FF2E63] uppercase tracking-widest group-hover:text-white transition-colors">
                   Написать админу в Telegram
                 </span>
              </div>
           </a>
        </div>

      </div>
    </section>
  );
}

function FAQItem({ item, isOpen, onClick }: { item: any, isOpen: boolean, onClick: () => void }) {
  return (
    <motion.div 
      initial={false}
      className={`
        relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer group
        ${isOpen 
          ? "bg-[#111] border-[#FF2E63] shadow-[0_0_30px_rgba(255,46,99,0.15)]" 
          : "bg-[#0A0A0A] border-white/10 hover:border-white/30"}
      `}
      onClick={onClick}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between gap-4">
         <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg transition-colors ${isOpen ? 'bg-[#FF2E63]/20 text-[#FF2E63]' : 'bg-white/5 text-gray-500 group-hover:text-white'}`}>
               <item.icon size={20} />
            </div>
            <h3 className={`font-chakra font-bold text-base md:text-lg uppercase transition-colors ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
              {item.question}
            </h3>
         </div>
         
         <div className={`transition-transform duration-300 ${isOpen ? 'rotate-45 text-[#FF2E63]' : 'text-gray-500'}`}>
            <Plus size={20} />
         </div>
      </div>

      {/* Body (Animate Height) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-0">
               <div className="h-[1px] w-full bg-white/10 mb-4" />
               <p className="font-inter text-sm md:text-base text-gray-400 leading-relaxed">
                 {item.answer}
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Corner */}
      <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r transition-all duration-300 ${isOpen ? 'border-[#FF2E63]' : 'border-transparent'}`} />
      <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l transition-all duration-300 ${isOpen ? 'border-[#FF2E63]' : 'border-transparent'}`} />

    </motion.div>
  );
}