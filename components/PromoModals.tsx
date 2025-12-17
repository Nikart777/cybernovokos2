"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Moon, Trophy, Star, Clock, UserPlus, Gift, TrendingUp, Key } from "lucide-react";

export default function PromoModals() {
  const [activeModal, setActiveModal] = useState<"night" | "cashback" | "friend" | "newbie" | null>(null);

  useEffect(() => {
    const openNight = () => setActiveModal("night");
    const openCash = () => setActiveModal("cashback");
    const openFriend = () => setActiveModal("friend");
    const openNewbie = () => setActiveModal("newbie");
    
    window.addEventListener("open-promo-night", openNight);
    window.addEventListener("open-promo-cashback", openCash);
    window.addEventListener("open-promo-friend", openFriend);
    window.addEventListener("open-promo-newbie", openNewbie);
    
    return () => {
      window.removeEventListener("open-promo-night", openNight);
      window.removeEventListener("open-promo-cashback", openCash);
      window.removeEventListener("open-promo-friend", openFriend);
      window.removeEventListener("open-promo-newbie", openNewbie);
    };
  }, []);

  const closeModal = () => setActiveModal(null);

  useEffect(() => {
    document.body.style.overflow = activeModal ? 'hidden' : 'unset';
  }, [activeModal]);

  return (
    <AnimatePresence>
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[600px] bg-[#141414] border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
          >
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 bg-white/5 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            {/* --- CONTENT SWITCHER --- */}
            
            {/* 1. NIGHT PACKS */}
            {activeModal === "night" && (
              <>
                <div className="p-8 pb-4 text-center border-b border-white/5 bg-gradient-to-b from-[#7F00FF]/20 to-transparent">
                   <div className="inline-flex p-3 rounded-2xl bg-[#7F00FF]/20 text-[#7F00FF] mb-4 shadow-[0_0_20px_rgba(127,0,255,0.3)]">
                     <Moon size={32} />
                   </div>
                   <h3 className="font-tactic font-black text-3xl text-white uppercase mb-2">Выгодные пакеты</h3>
                   <p className="font-inter text-sm text-gray-400">Играй больше — плати меньше</p>
                </div>
                
                <div className="p-6 md:p-8 overflow-y-auto space-y-4">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <NightPackCard title="НОЧЬ ЛАЙТ" time="4 ЧАСА" price="от 420₽" icon={<Moon size={18}/>} color="#7F00FF" />
                      <NightPackCard title="ПОЛУНОЧНИК" time="2.5 ЧАСА" price="от 270₽" icon={<Moon size={18}/>} color="#7F00FF" />
                      <NightPackCard title="РАССВЕТ" time="3 ЧАСА" price="от 340₽" icon={<Clock size={18}/>} color="#FF8C00" />
                      <NightPackCard title="DAY BOOST" time="2 ЧАСА" price="от 230₽" icon={<Clock size={18}/>} color="#FF8C00" />
                   </div>
                   
                   <div className="mt-6 p-4 bg-white/5 rounded-xl text-center border border-white/5">
                      <p className="text-xs text-gray-400">
                        Пакеты доступны для покупки в <span className="text-white font-bold">приложении</span> и в клубе после 23:00.
                      </p>
                   </div>
                </div>
              </>
            )}

            {/* 2. CASHBACK */}
            {activeModal === "cashback" && (
              <>
                <div className="p-8 pb-4 text-center border-b border-white/5 bg-gradient-to-b from-[#00F0FF]/20 to-transparent">
                   <div className="inline-flex p-3 rounded-2xl bg-[#00F0FF]/20 text-[#00F0FF] mb-4 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                     <Trophy size={32} />
                   </div>
                   <h3 className="font-tactic font-black text-3xl text-white uppercase mb-2">Система рангов</h3>
                   <p className="font-inter text-sm text-gray-400">Твой уровень растет автоматически</p>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto">
                   <div className="grid grid-cols-4 gap-2 mb-4 px-2 font-mono text-[10px] text-gray-500 uppercase tracking-wider font-bold text-center">
                      <div className="text-left">Статус</div>
                      <div>Часы</div>
                      <div>Кэшбэк</div>
                      <div>ДР Бонус</div>
                   </div>
                   <div className="space-y-2">
                      <RankRow name="БРОНЗА" hours="0-56" cashback="1%" bonus="-" color="#CD7F32" />
                      <RankRow name="СЕРЕБРО" hours="57-167" cashback="3%" bonus="100" color="#C0C0C0" />
                      <RankRow name="ЗОЛОТО" hours="168-334" cashback="5%" bonus="200" color="#FFD700" />
                      <RankRow name="ПЛАТИНА" hours="335-603" cashback="10%" bonus="300" color="#00BFFF" />
                      <RankRow name="БРИЛЛИАНТ" hours="604+" cashback="20%" bonus="400" color="#FF2E63" isMax />
                   </div>
                   <div className="mt-8 border-t border-white/10 pt-6">
                      <h4 className="font-chakra font-bold text-white uppercase mb-4">Как тратить?</h4>
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#1a1a1a] to-[#252525] rounded-xl border border-white/10">
                         <div>
                           <div className="font-mono text-[10px] text-gray-500 uppercase mb-1">Курс обмена</div>
                           <div className="font-tactic font-bold text-xl text-white">
                             1 БОНУС <span className="text-[#00F0FF] mx-1">=</span> 1 РУБЛЬ
                           </div>
                         </div>
                         <div className="bg-[#00F0FF]/10 p-3 rounded-full text-[#00F0FF]">
                           <Star size={24} />
                         </div>
                      </div>
                   </div>
                </div>
              </>
            )}

            {/* 3. REFER A FRIEND (FRIEND) */}
            {activeModal === "friend" && (
              <>
                <div className="p-8 pb-4 text-center border-b border-white/5 bg-gradient-to-b from-[#FF8C00]/20 to-transparent">
                   <div className="inline-flex p-3 rounded-2xl bg-[#FF8C00]/20 text-[#FF8C00] mb-4 shadow-[0_0_20px_rgba(255,140,0,0.3)]">
                     <UserPlus size={32} />
                   </div>
                   <h3 className="font-tactic font-black text-3xl text-white uppercase mb-2">Приведи друга</h3>
                   <p className="font-inter text-sm text-gray-400">Играйте вместе — получайте бонусы</p>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                   
                   {/* Step 1 */}
                   <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-[#FF8C00] font-bold">1</div>
                      <div>
                         <h4 className="font-chakra font-bold text-white text-lg uppercase mb-1 flex items-center gap-2">
                           Взять промокод <Key size={16} className="text-[#FF8C00]"/>
                         </h4>
                         <p className="text-sm text-gray-400 leading-relaxed">
                           Зайди в личный кабинет на ПК в клубе, открой раздел <b>«Пригласить друга»</b> и скопируй свой уникальный код.
                         </p>
                      </div>
                   </div>

                   {/* Step 2 (Friend Benefit) */}
                   <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-[#FF8C00] font-bold">2</div>
                      <div>
                         <h4 className="font-chakra font-bold text-white text-lg uppercase mb-1 flex items-center gap-2">
                           Друг получает <Gift size={16} className="text-[#FF8C00]"/>
                         </h4>
                         <div className="bg-[#FF8C00]/10 border border-[#FF8C00]/20 p-3 rounded-xl mt-2">
                            <ul className="text-sm text-gray-300 space-y-1">
                               <li>• <b>400</b> бонусов за регистрацию (стандарт)</li>
                               <li>• <b>+400</b> бонусов за твой промокод</li>
                               <li className="text-white font-bold pt-1 border-t border-white/10 mt-1">ИТОГО: 800 БОНУСОВ НА СТАРТ</li>
                            </ul>
                         </div>
                      </div>
                   </div>

                   {/* Step 3 (Your Benefit) */}
                   <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-[#FF8C00] font-bold">3</div>
                      <div>
                         <h4 className="font-chakra font-bold text-white text-lg uppercase mb-1 flex items-center gap-2">
                           Ты получаешь <TrendingUp size={16} className="text-[#FF8C00]"/>
                         </h4>
                         <p className="text-sm text-gray-400 leading-relaxed">
                           <b>5%</b> от всех пополнений друга вечно. Друг закинул 1000₽ — тебе упало <b>50 бонусов</b>. Пассивный доход!
                         </p>
                      </div>
                   </div>

                </div>
              </>
            )}

            {/* 4. NEWBIE (400 BONUS) */}
            {activeModal === "newbie" && (
              <>
                <div className="p-8 pb-4 text-center border-b border-white/5 bg-gradient-to-b from-[#FF0055]/20 to-transparent">
                   <div className="inline-flex p-3 rounded-2xl bg-[#FF0055]/20 text-[#FF0055] mb-4 shadow-[0_0_20px_rgba(255,0,85,0.3)]">
                     <Gift size={32} />
                   </div>
                   <h3 className="font-tactic font-black text-3xl text-white uppercase mb-2">400 БОНУСОВ</h3>
                   <p className="font-inter text-sm text-gray-400">Твой стартовый капитал</p>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto text-center">
                   
                   <div className="p-6 bg-[#1a1a1a] border border-white/10 rounded-2xl mb-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-[#FF0055] blur-[50px] opacity-20" />
                      <h4 className="font-chakra font-bold text-xl text-white uppercase mb-2">ПРОМОКОД НЕ НУЖЕН</h4>
                      <p className="text-sm text-gray-400">
                        Мы начисляем 400 приветственных бонусов <b>автоматически</b> сразу после регистрации в клубе (через администратора или приложение).
                      </p>
                   </div>

                   <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 text-left p-3 rounded-xl bg-white/5">
                         <div className="bg-[#FF0055] w-2 h-2 rounded-full shrink-0" />
                         <span className="text-sm text-gray-300">1 бонус = 1 рубль</span>
                      </div>
                      <div className="flex items-center gap-3 text-left p-3 rounded-xl bg-white/5">
                         <div className="bg-[#FF0055] w-2 h-2 rounded-full shrink-0" />
                         <span className="text-sm text-gray-300">Действует на любые ПК </span>
                      </div>
                      {/* Обновленное условие */}
                      <div className="flex items-center gap-3 text-left p-3 rounded-xl bg-white/5">
                         <div className="bg-[#FF0055] w-2 h-2 rounded-full shrink-0" />
                         <span className="text-sm text-gray-300">Для использования бонусов необходима полная регистрация у администратора в клубе</span>
                      </div>
                   </div>

                   <a 
                     href="https://redirect.appmetrica.yandex.com/serve/965634439310753772" target="_blank"
                     className="block w-full py-4 mt-8 bg-[#FF0055] text-white font-chakra font-bold text-center uppercase rounded-xl hover:bg-white hover:text-black transition-colors shadow-[0_5px_20px_rgba(255,0,85,0.4)]"
                   >
                     Зарегистрироваться
                   </a>
                </div>
              </>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// --- SUBCOMPONENTS ---

function NightPackCard({ title, time, price, icon, color }: { title: string, time: string, price: string, icon: any, color: string }) {
  return (
    <div 
      className="flex items-center justify-between p-4 rounded-xl border bg-[#1a1a1a] transition-colors hover:bg-white/5"
      style={{ borderColor: `${color}40` }}
    >
       <div className="flex items-center gap-3">
          <div style={{ color }}>{icon}</div>
          <div className="flex flex-col">
             <span className="font-chakra font-bold text-sm text-white">{title}</span>
             <span className="font-mono text-[10px] text-gray-500 bg-white/10 px-1.5 py-0.5 rounded w-fit mt-1">{time}</span>
          </div>
       </div>
       <div className="font-tactic font-bold text-lg text-white">{price}</div>
    </div>
  )
}

function RankRow({ name, hours, cashback, bonus, color, isMax }: any) {
  return (
    <div className={`grid grid-cols-4 gap-2 items-center p-3 rounded-xl border ${isMax ? 'bg-gradient-to-r from-[#FF2E63]/10 to-transparent border-[#FF2E63]/30' : 'bg-[#1a1a1a] border-transparent hover:bg-white/5'} transition-colors`}>
       <div className="flex items-center gap-2 text-left font-chakra font-bold text-sm" style={{ color }}>
          <div className="w-2 h-2 rounded-full shadow-[0_0_8px]" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
          {name}
       </div>
       <div className="text-center font-mono text-xs text-white">{hours}</div>
       <div className="text-center font-tactic font-bold text-sm text-white">{cashback}</div>
       <div className="text-center font-mono text-xs text-gray-400">{bonus}</div>
    </div>
  )
}