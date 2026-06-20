"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle, MessageSquare, Terminal, Zap, Shield, Clock, CreditCard, Mouse, Coffee, Smartphone } from "lucide-react";

// --- ICONS MAPPING ---
const IconMap: { [key: string]: any } = {
  'zap': Zap,
  'credit-card': CreditCard,
  'terminal': Terminal,
  'message-square': MessageSquare,
  'mouse': Mouse,
  'shield': Shield,
  'help-circle': HelpCircle,
  'clock': Clock,
  'coffee': Coffee,
  'smartphone': Smartphone
};

// --- DATA ---
const faqData = [
  {
    question: "ЕСТЬ ЛИ ПРОМОКОД НА ПЕРВОЕ ПОСЕЩЕНИЕ?",
    answer: "Для новых игроков в CyberX Новокосино регулярно действуют приветственные бонусы. Актуальные промокоды и условия акций вы можете уточнить в нашем мобильном приложении или у администратора клуба. Обычно это бонусные часы при первом пополнении баланса.",
    iconKey: "zap"
  },
  {
    question: "КАК РАБОТАЕТ БОНУСНЫЙ СЧЕТ И 1 БОНУС ЭТО СКОЛЬКО?",
    answer: "В нашей сети действует система лояльности. За каждое пополнение и время в игре вам начисляются бонусы. 1 бонус эквивалентен 1 рублю (если не указано иное в условиях конкретной акции). Бонусами можно оплачивать часть стоимости игрового времени через приложение.",
    iconKey: "credit-card"
  },
  {
    question: "СКОЛЬКО СТОИТ 1 ЧАС ИГРЫ И КАКИЕ ЕСТЬ ТАРИФЫ?",
    answer: "Стоимость часа начинается от 100 рублей в общем зале. У нас есть выгодные пакеты на 3, 5 часов и ночные тарифы (с 22:00 до 08:00). Точные цены зависят от зоны (Standard, Solo, Bootcamp) и дня недели. Полный прайс доступен в разделе 'Цены' на сайте или в нашем приложении.",
    iconKey: "terminal"
  },
  {
    question: "КАК ЗАБРОНИРОВАТЬ КОМПЬЮТЕР ИЛИ ЗОНУ?",
    answer: "Забронировать место можно тремя способами: через мобильное приложение CYBERX, по телефону +7 (985) 128-95-38 или написав в Telegram. Рекомендуем бронировать заранее, особенно на выходные и на ночные пакеты.",
    iconKey: "message-square"
  },
  {
    question: "ЧЕМ ОТЛИЧАЮТСЯ ЗОНЫ SOLO PRO И SOLO PREMIUM?",
    answer: "Зона Solo Pro оснащена мониторами 400 Гц BenQ Zowie для киберспорта. Solo Premium — это уединенные комнаты с 2K мониторами 240 Гц и RTX 5070 для тех, кто ищет максимальную приватность и топовую графику. В обеих зонах — премиальные кресла и девайсы.",
    iconKey: "mouse"
  },
  {
    question: "ЕСТЬ ЛИ У ВАС АВТОСИМУЛЯТОРЫ И РУЛИ?",
    answer: "Да! В CyberX Новокосино установлены профессиональные автосимуляторы (кокпиты) с рулями с прямой обратной связью (Force Feedback) и 4K экранами. Идеально для Assetto Corsa, Forza и F1.",
    iconKey: "zap"
  },
  {
    question: "КАКОЕ ЖЕЛЕЗО УСТАНОВЛЕНО В КЛУБЕ?",
    answer: "Наши ПК оснащены видеокартами последних поколений, включая RTX 5070 и RTX 4060, процессорами Intel Core и мониторами до 400 Гц. Мы постоянно обновляем 'железо', чтобы вы играли на ультра-настройках с низким пингом.",
    iconKey: "shield"
  },
  {
    question: "ГДЕ ИМЕННО ВЫ НАХОДИТЕСЬ В НОВОКОСИНО?",
    answer: "Мы находимся по адресу: г. Москва, ул. Новокосинская, 32, ТЦ 'Новокосино', 2 этаж. Это всего в 5 минутах пешком от метро Новокосино. Заходите через главный вход и поднимайтесь на второй этаж.",
    iconKey: "help-circle"
  }
];

export default function FAQ({ items }: { items?: { question: string, answer: string, iconKey: string }[] }) {
  const currentData = items || faqData;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // JSON-LD для FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": currentData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section id="faq" className="relative w-full py-24 md:py-32 bg-[#050505] overflow-hidden border-t-2 border-white/5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-0 w-[2px] h-full bg-white/5" />
        <div className="absolute right-[10%] top-0 w-[2px] h-full bg-white/5" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-10 relative z-10">

        {/* --- HEADER --- */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 border-2 border-white/10 bg-[#111] skew-x-[-12deg]">
            <div className="skew-x-[12deg] flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#FF2E63] animate-pulse" />
                <span className="font-chakra font-black text-[10px] text-white/40 uppercase tracking-widest">KNOWLEDGE BASE // CYBERX</span>
            </div>
          </div>

          <h2 className="font-tactic font-black text-4xl md:text-7xl text-white uppercase italic tracking-wide">
            ВОПРОС / <span className="text-transparent" style={{ WebkitTextStroke: '2px #FF2E63' }}>ОТВЕТ</span>
          </h2>
          <p className="mt-4 font-chakra font-bold text-white/40 uppercase tracking-widest text-xs md:text-sm text-center">
            ЧАСТЫЕ ВОПРОСЫ О ЦЕНАХ, АКЦИЯХ И ЖЕЛЕЗЕ
          </p>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {currentData.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* --- FOOTER CTA --- */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://t.me/CyberXNovokos"
              target="_blank"
              className="group relative inline-flex items-center justify-center gap-4 px-6 sm:px-8 py-4 bg-[#111] border-2 border-white/10 skew-x-[-12deg] hover:border-[#FF2E63] transition-colors"
            >
              <div className="skew-x-[12deg] flex items-center gap-4">
                  <MessageSquare size={20} className="text-[#FF2E63]" />
                  <div className="flex flex-col text-left">
                    <span className="font-tactic font-black italic text-sm text-white uppercase">ЕСТЬ ВОПРОСЫ?</span>
                    <span className="font-chakra text-[9px] text-[#FF2E63] font-bold uppercase tracking-widest">
                      НАПИСАТЬ В TELEGRAM
                    </span>
                  </div>
              </div>
            </a>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
              className="group relative inline-flex items-center justify-center gap-4 px-6 sm:px-8 py-4 bg-[#FF2E63] border-2 border-[#FF2E63] skew-x-[-12deg] hover:bg-[#FF2E63]/80 hover:shadow-[0_0_20px_rgba(255,46,99,0.4)] transition-all"
            >
              <div className="skew-x-[12deg] flex items-center gap-4">
                  <MessageSquare size={20} className="text-white" />
                  <div className="flex flex-col text-left">
                    <span className="font-tactic font-black italic text-sm text-white uppercase">ЧАТ НА САЙТЕ</span>
                    <span className="font-chakra text-[9px] text-white/70 font-bold uppercase tracking-widest">
                      АДМИН ОНЛАЙН
                    </span>
                  </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ item, isOpen, onClick }: { item: any, isOpen: boolean, onClick: () => void }) {
  return (
    <div
      className={`
        relative overflow-hidden border-2 transition-all duration-300 cursor-pointer skew-x-[-6deg]
        ${isOpen
          ? "bg-[#111] border-[#FF2E63] shadow-[0_0_20px_rgba(255,46,99,0.1)]"
          : "bg-[#0A0A0A] border-white/10 active:scale-[0.98] md:hover:border-white/30"}
      `}
      onClick={onClick}
    >
      <div className="skew-x-[6deg]">
          <div className="p-4 md:p-6 flex items-start md:items-center justify-between gap-4">
            <div className="flex items-start md:items-center gap-3 md:gap-4">
              <div className={`p-2 border transition-colors shrink-0 ${isOpen ? 'bg-[#FF2E63]/20 border-[#FF2E63]/50 text-[#FF2E63]' : 'bg-[#111] border-white/5 text-white/40'}`}>
                {(() => {
                  const Icon = IconMap[item.iconKey] || HelpCircle;
                  return <Icon size={20} />;
                })()}
              </div>
              <h3 className={`font-tactic italic font-black text-sm md:text-lg uppercase leading-tight transition-colors mt-1 md:mt-0 ${isOpen ? 'text-white' : 'text-white/60'}`}>
                {item.question}
              </h3>
            </div>
            <div className={`transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-45 text-[#FF2E63]' : 'text-white/40'}`}>
              <Plus size={20} />
            </div>
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 md:px-6 pb-6 pt-0">
                  <div className="h-[2px] w-full bg-[#FF2E63]/20 mb-4" />
                  <p className="font-chakra font-bold text-xs md:text-sm text-white/60 uppercase tracking-wider leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </div>
  );
}
