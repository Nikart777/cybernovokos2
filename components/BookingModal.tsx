"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MessageCircle, Phone, Smartphone, X, Zap, Sparkles } from "lucide-react";

export const ONLINE_BOOKING_URL = "https://booking.langame.ru/YWo4q8XN";
export const APP_DOWNLOAD_URL = "/download";

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const modalRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isSimracing = pathname === '/simracing';

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-booking", handleOpen);
    return () => window.removeEventListener("open-booking", handleOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    modalRef.current?.querySelector<HTMLButtonElement>('button[aria-label="Закрыть"]')?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key === 'Tab') {
        const controls = Array.from(
          modalRef.current?.querySelectorAll<HTMLElement>(
            'button:not([tabindex="-1"]), a[href]'
          ) || []
        ).filter(element => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (first && (!modalRef.current?.contains(document.activeElement) || (event.shiftKey && document.activeElement === first) || (!event.shiftKey && document.activeElement === last))) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
      trigger?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          ref={modalRef} 
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="booking-modal-title"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label="Закрыть окно бронирования"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 cursor-default bg-[#050505]/92 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative my-auto grid w-full max-w-[540px] rounded-[24px] sm:rounded-[28px] border border-white/15 bg-[#0c0c0e] shadow-[0_28px_100px_rgba(0,0,0,0.8),0_0_50px_rgba(255,46,99,0.15)] lg:max-w-[940px] lg:grid-cols-[0.85fr_1.15fr] overflow-hidden"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Закрыть"
              className="absolute right-3.5 top-3.5 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/15 bg-[#121214]/90 text-white transition hover:bg-[#FF2E63] hover:border-[#FF2E63] hover:text-white active:scale-[0.96]"
            >
              <X size={18} />
            </button>

            {/* Visual Left Column */}
            <div className="relative block h-[180px] sm:h-[220px] lg:h-auto lg:min-h-full overflow-hidden bg-black">
              <Image
                src={isSimracing ? '/zones/sim-1.webp' : '/zones/bootcamp-2.webp'}
                alt={isSimracing ? 'Автосимуляторы CyberX Новокосино' : 'Игровой клуб CyberX Новокосино'}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0c0c0e]" />
              
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#FF2E63]/40 bg-[#160d10]/90 px-3 py-1.5 font-chakra text-[10px] font-black uppercase tracking-[0.14em] text-[#FF2E63] backdrop-blur">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E63] animate-pulse" />
                  CyberX Новокосино 24/7
                </div>
                <div className="font-chakra font-bold text-xs text-white/80 mt-2 drop-shadow">
                  ул. Новокосинская, 32 · 2 этаж
                </div>
              </div>
            </div>

            {/* Right Column: 2 Booking Options */}
            <div className="p-5 sm:p-8 md:p-9 flex flex-col justify-between">
              <div>
                <div className="pr-8">
                  <span className="font-chakra text-[10px] font-black uppercase tracking-[0.18em] text-[#00F0FF]">
                    Бронирование мест
                  </span>
                  <h2 id="booking-modal-title" className="mt-1 font-tactic text-2xl sm:text-3xl lg:text-4xl font-black uppercase italic leading-[0.95] text-white">
                    Как удобнее забронировать?
                  </h2>
                </div>

                <div className="mt-5 space-y-3.5">
                  {/* ВАРИАНТ 1: ПРЯМАЯ ОНЛАЙН БРОНЬ БЕЗ РЕГИСТРАЦИИ (ОСНОВНОЙ) */}
                  <div className="relative rounded-2xl border-2 border-[#FF2E63] bg-gradient-to-br from-[#FF2E63]/15 via-white/[0.02] to-transparent p-4 sm:p-5 shadow-[0_0_30px_rgba(255,46,99,0.25)] group">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF2E63] text-white font-chakra font-black text-[9px] sm:text-[10px] uppercase tracking-wider">
                        <Zap size={11} className="animate-pulse" />
                        БЫСТРОЕ БРОНИРОВАНИЕ · БЕЗ ПРИЛОЖЕНИЯ
                      </span>
                      <span className="text-[10px] font-chakra font-bold text-[#00F0FF] uppercase tracking-wider">
                        ТОЛЬКО EMAIL
                      </span>
                    </div>

                    <div className="font-tactic font-black text-base sm:text-lg uppercase italic text-white mb-1">
                      Быстрое онлайн-бронирование
                    </div>
                    <p className="font-inter text-xs text-white/70 leading-relaxed mb-3.5">
                      Выберите свободный ПК, PS5 или кокпит автосимулятора на схеме клуба прямо в браузере без регистрации в приложении. Понадобится <strong className="text-white">только ваш email</strong> — туда сразу придёт код бронирования.
                    </p>

                    <a
                      href={ONLINE_BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between gap-2 px-5 py-3.5 rounded-xl bg-[#FF2E63] hover:bg-[#ff1e57] text-white font-chakra font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,46,99,0.4)] group/btn"
                    >
                      <span className="flex items-center gap-2">
                        <Zap size={16} />
                        <span>БЫСТРАЯ ОНЛАЙН-БРОНЬ</span>
                      </span>
                      <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>

                  {/* ВАРИАНТ 2: ЧЕРЕЗ ПРИЛОЖЕНИЕ С БОНУСАМИ (РЕЗЕРВНЫЙ) */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 p-4 sm:p-4.5 transition-colors">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 text-white/80 font-chakra font-black text-[9px] uppercase tracking-wider">
                        <Sparkles size={10} className="text-[#FF2E63]" />
                        +400 БОНУСОВ · КЭШБЭК ДО 20%
                      </span>
                      <span className="text-[10px] font-chakra font-bold text-white/40 uppercase">
                        РЕЗЕРВНЫЙ ВАРИАНТ
                      </span>
                    </div>

                    <div className="font-tactic font-black text-sm sm:text-base uppercase italic text-white mb-1">
                      Через приложение CyberX
                    </div>
                    <p className="font-inter text-xs text-white/60 leading-relaxed mb-3">
                      Для тех, кто хочет копить бонусы: начислим 400 бонусов (1 бонус = 1 ₽) на баланс сразу после регистрации для оплаты времени.
                    </p>

                    <a
                      href={APP_DOWNLOAD_URL}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 hover:border-white/30 text-white font-chakra font-bold text-xs uppercase tracking-wider transition-all group/btn2"
                    >
                      <span className="flex items-center gap-2">
                        <Smartphone size={15} className="text-[#00F0FF]" />
                        <span>СКАЧАТЬ CYBERX (+400 БОНУСОВ)</span>
                      </span>
                      <ArrowRight size={15} className="text-white/40 group-hover/btn2:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Support / Direct Contacts */}
              <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-chakra font-bold">
                <span className="text-white/40 uppercase tracking-wider text-[11px]">
                  Нужна помощь администратора?
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://t.me/CyberXNovokos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white/80 hover:text-[#00F0FF] transition-colors uppercase text-[11px]"
                  >
                    <MessageCircle size={14} className="text-[#00F0FF]" />
                    <span>Telegram</span>
                  </a>
                  <span className="text-white/20">·</span>
                  <a
                    href="tel:+79851289538"
                    className="inline-flex items-center gap-1.5 text-white/80 hover:text-[#FF2E63] transition-colors uppercase text-[11px]"
                  >
                    <Phone size={14} className="text-[#FF2E63]" />
                    <span>+7 (985) 128-95-38</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
