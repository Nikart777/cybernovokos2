"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Gamepad2, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";

export default function StickyBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const openBooking = () => {
    window.dispatchEvent(new CustomEvent("open-booking"));
  };

  const openChat = () => {
    window.dispatchEvent(new CustomEvent("open-chat"));
  };

  return (
    <AnimatePresence>
      {isVisible && (
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
              className="flex flex-col items-center justify-center w-[65px] bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 rounded-xl text-white active:scale-95 transition-transform hover:bg-white/10"
            >
              <Phone size={20} className="mb-[2px] text-white" />
              <span className="text-[9px] font-inter font-bold uppercase tracking-wide opacity-70">Звонок</span>
            </a>

            <button
              onClick={openChat}
              className="flex flex-col items-center justify-center w-[65px] bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 rounded-xl text-white active:scale-95 transition-transform hover:bg-white/10"
            >
              <MessageSquare size={20} className="mb-[2px] text-[#FF0055]" />
              <span className="text-[9px] font-inter font-bold uppercase tracking-wide opacity-70">Чат</span>
            </button>
          </div>

          <button
            onClick={openBooking}
            className="flex-grow relative overflow-hidden bg-gradient-to-r from-[#FF0055] to-[#CC0099] rounded-xl flex items-center justify-center gap-2 shadow-[0_5px_20px_rgba(255,0,85,0.4)] active:scale-95 transition-transform group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] translate-x-[-150%] animate-[shine_3s_infinite]" />
            <Gamepad2 size={24} className="text-white relative z-10 fill-white/20" />
            <span className="font-chakra font-black text-xl uppercase tracking-widest text-white relative z-10 text-shadow-sm">
              БРОНЬ
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}