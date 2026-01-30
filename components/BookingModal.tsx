"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, MessageCircle, Gamepad2, Check, Coins, Phone } from "lucide-react";
import Image from "next/image";

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-booking", handleOpen);
    return () => window.removeEventListener("open-booking", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[850px] bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)] flex flex-col md:flex-row max-h-[90vh]"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-white text-white hover:text-black p-2 rounded-full transition-colors border border-white/10"
            >
              <X size={20} />
            </button>

            {/* ЛЕВАЯ КОЛОНКА: КАРТИНКА */}
            <div className="relative w-full md:w-[40%] h-[220px] md:h-auto md:min-h-full bg-gradient-to-br from-[#1a1a2e] to-black overflow-hidden flex items-start justify-center pt-8 md:pt-10">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[150px] bg-[#FF2E63] blur-[80px] opacity-40" />

              <img
                src="/popup.webp"
                alt="CyberX App"
                className="relative z-10 w-[65%] md:w-[85%] h-auto object-contain object-top drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* ПРАВАЯ КОЛОНКА: КОНТЕНТ */}
            <div className="w-full md:w-[60%] p-6 md:p-10 flex flex-col justify-center bg-[#111] overflow-y-auto">

              {/* Обновленный бейдж */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 border border-[#00F0FF] rounded-full text-[#00F0FF] text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                  Приложение CYBERX
                </span>
              </div>

              <h3 className="font-tactic font-black text-3xl md:text-4xl text-white uppercase leading-none mb-6">
                Бронируй<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] to-[#B900FF]">
                  в 1 клик
                </span>
              </h3>

              {/* Features Grid */}
              <div className="grid grid-cols-1 gap-3 mb-8">
                <div className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="bg-[#FF2E63]/20 p-2 rounded-lg text-[#FF2E63] shrink-0">
                    <Gamepad2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-chakra font-bold text-white text-sm uppercase mb-1">Без звонков</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Выбирай место на схеме зала и бронируй за 10 секунд.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="bg-[#00F0FF]/20 p-2 rounded-lg text-[#00F0FF] shrink-0">
                    <Check size={20} />
                  </div>
                  <div>
                    <h4 className="font-chakra font-bold text-white text-sm uppercase mb-1">Скидка 5%</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Действует на все пакеты при оплате через приложение.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="bg-[#B900FF]/20 p-2 rounded-lg text-[#B900FF] shrink-0">
                    <Coins size={20} />
                  </div>
                  <div>
                    <h4 className="font-chakra font-bold text-white text-sm uppercase mb-1">Оплата бонусами</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Используйте бонусы для оплаты игрового времени.</p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3 mt-auto">
                <div>
                  <a
                    href="https://redirect.appmetrica.yandex.com/serve/965634439310753772"
                    target="_blank"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-[#FF0055] to-[#CC0099] text-white font-chakra font-bold text-sm md:text-base uppercase rounded-xl hover:shadow-[0_0_30px_rgba(255,0,85,0.4)] hover:scale-[1.01] transition-all duration-300"
                  >
                    <Smartphone size={20} />
                    Скачать приложение
                  </a>
                  {/* Подпись платформ */}
                  <div className="flex justify-center items-center gap-4 mt-2 text-[#666]">
                    <div className="flex items-center gap-1.5">
                      <svg viewBox="0 0 384 512" fill="currentColor" className="w-3 h-3"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" /></svg>
                      <span className="text-[10px] font-bold uppercase tracking-wider">iOS</span>
                    </div>
                    <div className="w-[1px] h-3 bg-[#333]"></div>
                    <div className="flex items-center gap-1.5">
                      <svg viewBox="0 0 576 512" fill="currentColor" className="w-3 h-3"><path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10l-48.54,84.07a301.25,301.25,0,0,0-246.56,0l-48.54-84.07a10,10,0,1,0-17.27,10l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55" /></svg>
                      <span className="text-[10px] font-bold uppercase tracking-wider">Android</span>
                    </div>
                  </div>
                </div>

                {/* Быстрая бронь + Телеграм */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+79851289538"
                    className="flex flex-col items-center justify-center p-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl transition-all duration-300"
                  >
                    <Phone size={20} className="mb-1 text-[#FF2E63]" />
                    <span className="font-chakra font-bold text-xs uppercase">Позвонить</span>
                  </a>

                  <a
                    href="https://t.me/CyberXNovokos"
                    target="_blank"
                    className="flex flex-col items-center justify-center p-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl transition-all duration-300"
                  >
                    <MessageCircle size={20} className="mb-1 text-[#0088cc]" />
                    <span className="font-chakra font-bold text-xs uppercase">Telegram</span>
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