"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, MessageSquare, Terminal, Zap, Shield, Clock, CreditCard, Mouse, Coffee, Smartphone } from "lucide-react";

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
  'plus': Plus,
  'smartphone': Smartphone
};

// --- DATA ---
const faqData = [
  {
    question: "Есть ли промокод на первое посещение?",
    answer: "Для новых игроков в CyberX Новокосино регулярно действуют приветственные бонусы. Актуальные промокоды и условия акций вы можете уточнить в нашем мобильном приложении или у администратора клуба. Обычно это бонусные часы при первом пополнении баланса.",
    iconKey: "zap"
  },
  {
    question: "Как работает бонусный счет и 1 бонус это сколько?",
    answer: "В нашей сети действует система лояльности. За каждое пополнение и время в игре вам начисляются бонусы. 1 бонус эквивалентен 1 рублю (если не указано иное в условиях конкретной акции). Бонусами можно оплачивать часть стоимости игрового времени через приложение.",
    iconKey: "credit-card"
  },
  {
    question: "Сколько стоит 1 час игры и какие есть тарифы?",
    answer: "Стоимость часа начинается от 100 рублей в общем зале. У нас есть выгодные пакеты на 3, 5 часов и ночные тарифы (с 22:00 до 08:00). Точные цены зависят от зоны (Standard, Solo, Bootcamp) и дня недели. Полный прайс доступен в разделе 'Цены' на сайте или в нашем приложении.",
    iconKey: "terminal"
  },
  {
    question: "Как забронировать компьютер или зону?",
    answer: "Забронировать место можно тремя способами: через мобильное приложение CYBERX, по телефону +7 (985) 128-95-38 или написав в Telegram. Рекомендуем бронировать заранее, особенно на выходные и на ночные пакеты.",
    iconKey: "message-square"
  },
  {
    question: "Чем отличаются зоны Solo Pro и Solo Premium?",
    answer: "Зона Solo Pro оснащена мониторами 400 Гц BenQ Zowie для киберспорта. Solo Premium — это уединенные комнаты с 2K мониторами 240 Гц и RTX 5070 для тех, кто ищет максимальную приватность и топовую графику. В обеих зонах — премиальные кресла и девайсы.",
    iconKey: "mouse"
  },
  {
    question: "Есть ли у вас автосимуляторы и рули?",
    answer: "Да! В CyberX Новокосино установлены профессиональные автосимуляторы (кокпиты) с рулями с прямой обратной связью (Force Feedback) и 4K экранами. Идеально для Assetto Corsa, Forza и F1.",
    iconKey: "zap"
  },
  {
    question: "Какое железо установлено в клубе?",
    answer: "Наши ПК оснащены видеокартами последних поколений, включая RTX 5070 и RTX 4060, процессорами Intel Core и мониторами до 400 Гц. Мы постоянно обновляем 'железо', чтобы вы играли на ультра-настройках с низким пингом.",
    iconKey: "shield"
  },
  {
    question: "Где именно вы находитесь в Новокосино?",
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
    <section id="faq" className="relative w-full py-24 md:py-32 bg-[#050505] overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-0 w-[1px] h-full bg-white/5" />
        <div className="absolute right-[10%] top-0 w-[1px] h-full bg-white/5" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-10 relative z-10">

        {/* --- HEADER --- */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 bg-[#FF2E63] rounded-full animate-pulse" />
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Knowledge Base // CyberX Новокосино</span>
          </div>

          <h2 className="font-tactic font-black text-4xl md:text-7xl text-white uppercase tracking-wide drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            ВОПРОС / ОТВЕТ
          </h2>
          <p className="mt-4 font-chakra font-bold text-gray-500 uppercase tracking-widest text-xs md:text-sm text-center">
            Популярные вопросы о ценах, акциях и железе в Новокосино
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
          <a
            href="https://t.me/CyberXNovokos"
            target="_blank"
            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-transparent border border-[#FF2E63]/50 rounded-xl overflow-hidden hover:border-[#FF2E63] transition-colors"
          >
            <div className="absolute inset-0 bg-[#FF2E63]/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <MessageSquare size={24} className="text-[#FF2E63] relative z-10" />
            <div className="flex flex-col text-left relative z-10">
              <span className="font-chakra font-bold text-sm text-white uppercase tracking-wider">Не нашли ответа?</span>
              <span className="font-mono text-[10px] text-[#FF2E63] uppercase tracking-widest group-hover:text-white transition-colors">
                Написать администратору в Telegram
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
    <div
      className={`
        relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer
        ${isOpen
          ? "bg-[#111] border-[#FF2E63] shadow-[0_0_20px_rgba(255,46,99,0.15)]"
          : "bg-[#0A0A0A] border-white/10 active:scale-[0.98] md:hover:border-white/30"}
      `}
      onClick={onClick}
    >
      <div className="p-5 md:p-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 md:gap-4">
          <div className={`p-2 rounded-lg transition-colors ${isOpen ? 'bg-[#FF2E63]/20 text-[#FF2E63]' : 'bg-white/5 text-gray-500'}`}>
            {(() => {
              const Icon = IconMap[item.iconKey] || HelpCircle;
              return <Icon size={20} />;
            })()}
          </div>
          <h3 className={`font-chakra font-bold text-sm md:text-lg uppercase leading-tight transition-colors ${isOpen ? 'text-white' : 'text-gray-300'}`}>
            {item.question}
          </h3>
        </div>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-45 text-[#FF2E63]' : 'text-gray-500'}`}>
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
            <div className="px-5 md:px-6 pb-6 pt-0">
              <div className="h-[1px] w-full bg-white/10 mb-4" />
              <p className="font-inter text-sm md:text-base text-gray-400 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r transition-all duration-300 ${isOpen ? 'border-[#FF2E63]' : 'border-transparent'}`} />
      <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l transition-all duration-300 ${isOpen ? 'border-[#FF2E63]' : 'border-transparent'}`} />
    </div>
  );
}
