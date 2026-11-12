"use client";

import { useState } from "react";
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
// Вопросы в обычном регистре: заглавные рисует CSS (uppercase), а в разметке FAQPage и в
// ответах нейросетей текст остаётся нормальным. Цены — из data/prices.json, правила — из
// data/legal/rules.txt, автосимуляторы — из app/simracing/simracingData.ts: меняются там — меняйте и здесь.
const faqData = [
  {
    question: "Есть ли промокод на первое посещение?",
    answer: "Да. Новичкам — 400 бонусов за регистрацию в приложении CyberX или за компьютером в клубе, 1 бонус = 1 ₽. Бонусами можно оплатить до 20% игрового времени, кроме автосимуляторов.",
    iconKey: "zap"
  },
  {
    question: "Как работает бонусный счёт и сколько стоит 1 бонус?",
    answer: "1 бонус = 1 ₽. Бонусы приходят кэшбэком с каждой игры: чем больше часов наиграно, тем выше уровень и процент, от 3% до 20%. Ими можно оплатить до 20% игрового времени.",
    iconKey: "credit-card"
  },
  {
    question: "Сколько стоит 1 час игры и какие есть тарифы?",
    answer: "В общем зале — от 150 ₽ за час днём в будни (дневной тариф с 4:00 до 16:00). Есть пакеты на 3 и 5 часов и ночь с 22:00 до 11:00 — от 700 ₽. Час в Solo-комнате — от 230 ₽, на PS5 — от 340 ₽, на автосимуляторе — от 580 ₽. Цены по всем зонам и дням — на странице «Цены».",
    iconKey: "terminal"
  },
  {
    question: "Как забронировать компьютер или зону?",
    answer: "Быстрее всего — через быстрое онлайн-бронирование на сайте (https://booking.langame.ru/YWo4q8XN) без регистрации в приложении: понадобится только ваш email, на который сразу придёт код бронирования. Также можно забронировать место через мобильное приложение CYBERX (с бонусом +400 ₽ за регистрацию), по телефону +7 (985) 128-95-38 или написав в Telegram.",
    iconKey: "message-square"
  },
  {
    question: "Чем отличаются зоны Solo Pro и Solo Premium?",
    answer: "Обе — отдельные комнаты на одного с RTX 5070. Solo Pro — для шутеров: монитор BenQ Zowie на 400 Гц. Solo Premium — для красивой картинки: 2K-монитор на 240 Гц.",
    iconKey: "mouse"
  },
  {
    question: "Есть ли у вас автосимуляторы и рули?",
    answer: "Да, четыре кокпита. Руль MOZA R12 с прямым приводом до 12 Нм, педали Load Cell, коробка передач и ручник, у каждого свой экран 55″ 4K. Свои серверы Assetto Corsa и BeamNG.drive, есть Forza Horizon. Час — от 580 ₽ в будни.",
    iconKey: "zap"
  },
  {
    question: "Какое железо установлено в клубе?",
    answer: "В общем зале — RTX 4060 и мониторы 144 Гц. В Solo-комнатах — RTX 5070 и мониторы на 240 или 400 Гц. Процессоры Intel Core, железо регулярно обновляем.",
    iconKey: "shield"
  },
  {
    question: "Можно прийти подростку?",
    answer: "Да. До 18 лет без родителей можно с 9:00 до 22:00, после 22:00 — только со взрослым. Младше 16 лет — только вместе со взрослым. Администратор может попросить документ с датой рождения.",
    iconKey: "clock"
  },
  {
    question: "Есть еда и напитки?",
    answer: "Да, в баре напитки, снеки, шоколадки и сэндвичи. Заказать можно прямо к компьютеру через приложение.",
    iconKey: "coffee"
  },
  {
    question: "Где именно вы находитесь в Новокосино?",
    answer: "Мы находимся по адресу: г. Москва, ул. Новокосинская, 32, 2 этаж — здание на кольце у метро Новокосино, внизу круглосуточный «Магнит». Это всего в 5 минутах пешком от метро. Заходите через главный вход и поднимайтесь на второй этаж, клуб рядом с магазином DNS.",
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
          {/* Ответ всегда в HTML, свёрнут только визуально: поисковики и нейросети видят
              все ответы, а не один открытый (раньше остальные были лишь в JSON-LD). */}
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          >
            <div className="overflow-hidden">
              <div className="px-4 md:px-6 pb-6 pt-0">
                <div className="h-[2px] w-full bg-[#FF2E63]/20 mb-4" />
                <p className="font-chakra font-bold text-xs md:text-sm text-white/60 uppercase tracking-wider leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
