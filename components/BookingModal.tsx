"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarCheck, Gift, MessageCircle, ShieldCheck, Smartphone, Trophy, X } from "lucide-react";

const appLink = "/download";

const benefits = [
  {
    icon: Gift,
    title: "400 бонусов сразу",
    text: "Начислим автоматически после регистрации.",
  },
  {
    icon: Trophy,
    title: "До 20% стоимости - бонусами",
    text: "Используйте бонусы на игровое время с первого визита.",
  },
  {
    icon: CalendarCheck,
    title: "Бронь без звонков",
    text: "Выберите свободное место и время в приложении CyberX.",
  },
];

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-booking", handleOpen);
    return () => window.removeEventListener("open-booking", handleOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
          <motion.button
            type="button"
            aria-label="Закрыть окно бронирования"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 cursor-default bg-[#050505]/90 backdrop-blur-md"
          />

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid max-h-[calc(100dvh-2rem)] w-full max-w-[540px] overflow-y-auto rounded-[28px] border border-white/15 bg-[#0d0d0d] shadow-[0_28px_100px_rgba(0,0,0,0.62)] lg:max-w-[940px] lg:grid-cols-[0.9fr_1.1fr]"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Закрыть"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#101010]/90 text-white transition hover:bg-white hover:text-[#111] active:scale-[0.96]"
            >
              <X size={19} />
            </button>

            <div className="relative block h-[208px] overflow-hidden sm:h-[250px] lg:h-auto lg:min-h-full">
              <Image
                src="/zones/bootcamp-2.webp"
                alt="Игровая зона CyberX Новокосино"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.05),rgba(8,8,8,0.86)),linear-gradient(90deg,rgba(255,46,99,0.08),transparent)]" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#FF2E63]/45 bg-[#160d10]/90 px-3 py-2 font-chakra text-[10px] font-black uppercase tracking-[0.14em] text-[#FF2E63] backdrop-blur">
                  <Smartphone size={14} />
                  CyberX Новокосино
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-8 md:p-10">
              <div className="pr-12">
                <span className="font-chakra text-[10px] font-black uppercase tracking-[0.16em] text-[#FF2E63]">Ваш первый визит</span>
                <h2 id="booking-modal-title" className="mt-2 font-tactic text-3xl font-black uppercase italic leading-[0.95] text-white sm:text-4xl">
                  400 бонусов<br />на старт
                </h2>
                <p className="mt-3 max-w-lg font-chakra text-sm leading-relaxed text-white/65">
                  Получите их сразу после регистрации в приложении и используйте уже при первом посещении.
                </p>
              </div>

              <div className="mt-6 grid gap-2.5 lg:mt-7 lg:gap-3">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={benefit.title} className={`gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3 lg:gap-4 lg:p-4 ${index === 2 ? "hidden lg:flex" : "flex"}`}>
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FF2E63]/12 text-[#FF2E63] lg:h-10 lg:w-10">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 className="font-tactic text-sm font-black uppercase italic text-white lg:text-base">{benefit.title}</h3>
                        <p className="mt-0.5 font-chakra text-[11px] leading-relaxed text-white/55 lg:mt-1 lg:text-xs">{benefit.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 hidden items-start gap-3 rounded-2xl border border-white/10 bg-[#111] p-4 lg:flex">
                <ShieldCheck className="mt-0.5 shrink-0 text-[#FF2E63]" size={18} />
                <p className="font-chakra text-xs leading-relaxed text-white/60">
                  1 бонус = 1 ₽. Используйте бонусы сразу после регистрации для оплаты до 20% игрового времени. DRIVE X оплачивается основным балансом.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-7">
                <a
                  href={appLink}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#FF2E63] px-5 font-tactic text-sm font-black uppercase italic tracking-wide text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff4778] active:translate-y-0 active:scale-[0.98]"
                >
                  <Smartphone size={18} />
                  Получить 400 бонусов
                </a>
                <a
                  href="https://t.me/CyberXNovokos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-5 font-tactic text-sm font-black uppercase italic tracking-wide text-white transition duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.08] active:translate-y-0 active:scale-[0.98] sm:inline-flex"
                >
                  <MessageCircle size={18} />
                  Спросить в Telegram
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
