"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, MessageCircle, Gamepad2, Check, Coins, Phone, Zap, Download, Star, Sparkles } from "lucide-react";

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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          />
          
          {/* Анимированные молнии на фоне */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ 
                  opacity: [0, 0.3, 0],
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 3 + Math.random() * 2,
                }}
                className="absolute h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent"
                style={{
                  top: `${20 + i * 15}%`,
                  width: `${100 + Math.random() * 200}px`,
                }}
              />
            ))}
          </div>

          {/* Модальное окно */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="relative w-full max-w-[900px] bg-[#0f0f1a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(255,46,99,0.3)] flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Градиентная рамка - на заднем плане */}
            <div className="absolute inset-0 rounded-[2.5rem] opacity-30 pointer-events-none -z-10"
              style={{
                background: 'linear-gradient(135deg, #FF2E63 0%, transparent 25%, #B900FF 50%, transparent 75%, #00F0FF 100%)',
                backgroundSize: '300% 300%',
                animation: 'gradient-rotate 4s ease infinite',
              }}
            />
            
            <style jsx>{`
              @keyframes gradient-rotate {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
              }
            `}</style>

            {/* Кнопка закрытия */}
            <motion.button
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 z-50 bg-[#1a1a2e] border border-white/20 p-2.5 rounded-full text-white hover:bg-[#FF2E63] transition-colors"
            >
              <X size={20} />
            </motion.button>

            {/* ЛЕВАЯ КОЛОНКА: ВИЗУАЛ */}
            <div className="relative w-full md:w-[45%] h-[280px] md:h-auto overflow-hidden flex items-center justify-center bg-[#1a1a2e]">
              {/* Сетка */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                  backgroundSize: '30px 30px',
                }}
              />

              {/* 3D Phone Mockup */}
              <motion.div
                initial={{ y: 50, opacity: 0, rotateX: -20 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.2, type: 'spring' }}
                className="relative z-10 w-[180px] md:w-[220px]"
              >
                {/* Свечение за телефоном */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF2E63] via-[#B900FF] to-[#00F0FF] blur-[50px] opacity-40" />
                
                {/* Телефон */}
                <div className="relative bg-[#0a0a1a] rounded-[2rem] p-1.5 border-2 border-white/10 shadow-2xl">
                  {/* Экран */}
                  <div className="bg-[#0f0f1a] rounded-[1.8rem] overflow-hidden h-[320px] md:h-[380px]">
                    {/* Статус бар */}
                    <div className="flex items-center justify-between px-4 py-2 text-[9px] text-white/40">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <span>📶</span>
                        <span>🔋</span>
                      </div>
                    </div>
                    
                    {/* Контент на экране */}
                    <div className="p-4">
                      {/* Логотип */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                        className="text-center mb-4"
                      >
                        <div className="text-2xl font-black bg-gradient-to-r from-[#FF2E63] via-[#B900FF] to-[#00F0FF] bg-clip-text text-transparent">
                          CYBERX
                        </div>
                        <div className="text-[7px] text-white/30 uppercase tracking-widest mt-1">Novokosino</div>
                      </motion.div>
                      
                      {/* Кнопки приложений */}
                      <div className="space-y-2">
                        {['SOLO PREMIUM', 'SOLO PRO', 'DUO ZONE', 'BOOTCAMP'].map((zone, i) => (
                          <motion.div
                            key={zone}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 + i * 0.1 }}
                            className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5"
                          >
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF2E63] to-[#B900FF] flex items-center justify-center">
                              <Gamepad2 size={12} className="text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="text-[7px] text-white font-bold">{zone}</div>
                              <div className="text-[5px] text-white/30">от {(230 + i * 50)}₽</div>
                            </div>
                            <Check size={10} className="text-[#00F0FF]" />
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* CTA на экране */}
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="mt-3 p-2.5 rounded-lg bg-gradient-to-r from-[#FF2E63] to-[#B900FF] text-center"
                      >
                        <div className="text-[7px] text-white font-bold uppercase">-5% в приложении</div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Плавающие иконки */}
              <motion.div
                animate={{ y: [-10, 10, -10], rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-20 left-8 p-2.5 rounded-xl bg-[#FF2E63]/20 border border-[#FF2E63]/30"
              >
                <Zap size={20} className="text-[#FF2E63]" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10], rotate: [0, -5, 0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-32 right-8 p-2.5 rounded-xl bg-[#00F0FF]/20 border border-[#00F0FF]/30"
              >
                <Star size={20} className="text-[#00F0FF]" />
              </motion.div>
            </div>

            {/* ПРАВАЯ КОЛОНКА: КОНТЕНТ */}
            <div className="w-full md:w-[55%] p-6 md:p-8 flex flex-col">
              {/* Бейдж */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-2 mb-6"
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF2E63]/10 border border-[#FF2E63]/30">
                  <Sparkles size={12} className="text-[#FF2E63]" />
                  <span className="text-[9px] font-chakra font-black text-white uppercase tracking-widest">
                    Мгновенная бронь
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30">
                  <Download size={12} className="text-[#00F0FF]" />
                  <span className="text-[9px] font-chakra font-black text-white uppercase tracking-widest">
                    -5% в приложении
                  </span>
                </div>
              </motion.div>

              {/* Заголовок */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                <h3 className="font-tactic font-black text-2xl md:text-4xl text-white uppercase leading-[0.9] mb-2">
                  Забирай своё
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] via-[#B900FF] to-[#00F0FF]">
                    игровое место
                  </span>
                </h3>
                <p className="font-inter text-sm text-white/50 leading-relaxed">
                  Бронируй за 10 секунд • Плати бонусами • Получай кэшбэк
                </p>
              </motion.div>

              {/* Преимущества */}
              <div className="grid grid-cols-1 gap-2 mb-6">
                {[
                  { icon: Gamepad2, color: '#FF2E63', title: 'Без звонков', desc: 'Выбирай место на схеме зала' },
                  { icon: Zap, color: '#00F0FF', title: 'Мгновенно', desc: 'Подтверждение за 10 секунд' },
                  { icon: Coins, color: '#B900FF', title: 'Кэшбэк 5%', desc: 'Бонусами с каждого посещения' },
                ].map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="group flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div 
                      className="p-2 rounded-lg shrink-0"
                      style={{ backgroundColor: `${feature.color}20` }}
                    >
                      <feature.icon size={18} style={{ color: feature.color }} />
                    </div>
                    <div>
                      <h4 className="font-chakra font-bold text-white text-xs uppercase mb-0.5">{feature.title}</h4>
                      <p className="text-xs text-white/40 leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Кнопки */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-auto space-y-3"
              >
                {/* Основная кнопка */}
                <motion.a
                  href="https://redirect.appmetrica.yandex.com/serve/965634439310753772"
                  target="_blank"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex items-center justify-center gap-3 w-full py-4 rounded-xl overflow-hidden bg-gradient-to-r from-[#FF2E63] to-[#B900FF]"
                >
                  <Smartphone size={18} className="group-hover:rotate-12 transition-transform" />
                  <span className="font-chakra font-black text-sm uppercase tracking-wider text-white">
                    Скачать приложение
                  </span>
                </motion.a>
                
                {/* Платформы */}
                <div className="flex justify-center items-center gap-4 text-white/30">
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 384 512" fill="currentColor" className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-chakra font-bold uppercase text-white/50">iOS</span>
                  </div>
                  <div className="w-[1px] h-3 bg-white/10" />
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 576 512" fill="currentColor" className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-chakra font-bold uppercase text-white/50">Android</span>
                  </div>
                </div>

                {/* Быстрые действия */}
                <div className="grid grid-cols-2 gap-2">
                  <motion.a
                    href="tel:+79851289538"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF2E63]/40 transition-all group"
                  >
                    <Phone size={18} className="mb-1 text-[#FF2E63] group-hover:scale-110 transition-transform" />
                    <span className="font-chakra font-bold text-[9px] uppercase text-white/70">Позвонить</span>
                  </motion.a>

                  <motion.a
                    href="https://t.me/CyberXNovokos"
                    target="_blank"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#0088cc]/40 transition-all group"
                  >
                    <MessageCircle size={18} className="mb-1 text-[#0088cc] group-hover:scale-110 transition-transform" />
                    <span className="font-chakra font-bold text-[9px] uppercase text-white/70">Telegram</span>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
