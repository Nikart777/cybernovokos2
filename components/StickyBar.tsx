"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, Gamepad2, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";

export default function StickyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkBottom = () => {
      const scrollBottom = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      setIsNearBottom(pageHeight - scrollBottom < 200);
    };

    window.addEventListener('scroll', checkBottom, { passive: true });
    checkBottom();
    return () => window.removeEventListener('scroll', checkBottom);
  }, []);

  const openBooking = () => {
    window.dispatchEvent(new CustomEvent("open-booking"));
  };

  const openChat = () => {
    window.dispatchEvent(new CustomEvent("open-chat"));
  };

  return (
    <AnimatePresence>
      {isVisible && !isNearBottom && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-4 left-3 right-3 z-50 md:hidden flex items-stretch gap-2 h-[65px]"
        >
          <div className="flex gap-2">
            <a
              href="tel:+79851289538"
              className="flex flex-col items-center justify-center w-[65px] bg-[#111] border-2 border-white/10 skew-x-[-6deg] text-white active:scale-95 transition-transform"
            >
              <div className="skew-x-[6deg] flex flex-col items-center">
                <Phone size={18} className="mb-1 text-white/70" />
                <span className="text-[8px] font-chakra font-black uppercase tracking-widest text-white/70">Звонок</span>
              </div>
            </a>

            <button
              onClick={openChat}
              className="flex flex-col items-center justify-center w-[65px] bg-[#111] border-2 border-white/10 skew-x-[-6deg] text-white active:scale-95 transition-transform"
            >
              <div className="skew-x-[6deg] flex flex-col items-center">
                <MessageSquare size={18} className="mb-1 text-[#FF2E63]" />
                <span className="text-[8px] font-chakra font-black uppercase tracking-widest text-white/70">Чат</span>
              </div>
            </button>
          </div>

          <button
            onClick={openBooking}
            className="flex-grow relative overflow-hidden bg-[#FF2E63] border-2 border-[#FF2E63] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,46,99,0.4)] active:scale-95 transition-transform skew-x-[-6deg]"
          >
            <div className="absolute inset-0 bg-white/20 skew-x-[-20deg] translate-x-[-150%] animate-[shine_3s_infinite]" />
            <div className="skew-x-[6deg] flex items-center gap-2">
                <Gamepad2 size={24} className="text-white relative z-10" />
                <span className="font-tactic font-black italic text-lg uppercase tracking-wide text-white relative z-10 mt-1">
                БРОНЬ
                </span>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}