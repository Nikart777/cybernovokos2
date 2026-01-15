'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, X, Bell } from 'lucide-react';
import axios from 'axios';

interface Lobby {
  id: number;
  creator_nick: string;
  creator_pc: string;
  joiner_nick: string | null;
  joiner_pc: string | null;
  game: string;
  bet_amount: string | null;
  bet_item: string | null;
  status: 'waiting' | 'payment_check' | 'active' | 'finished';
  rules: string | null;
}

export default function NotificationSystem() {
  const [currentPC, setCurrentPC] = useState<string | null>(null);
  const [activeChallenge, setActiveChallenge] = useState<Lobby | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 1. Инициализация
  useEffect(() => {
    const savedPC = localStorage.getItem('arena_pc');
    if (savedPC) setCurrentPC(savedPC);

    // Аудио элемент
    const audio = new Audio('/sounds/notification.mp3'); 
    audioRef.current = audio;

    // Проверяем текущий статус прав
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  // Функция запроса прав (вызывается по кнопке)
  const requestPermission = async () => {
    if (!("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  // 2. Опрос сервера (Polling)
  useEffect(() => {
    if (!currentPC) return;

    const checkChallenges = async () => {
      try {
        const res = await axios.get('/api/arena/lobbies');
        const lobbies: Lobby[] = res.data;
        
        const myRelevantLobby = lobbies.find(l => {
             // Если я создал, и кто-то присоединился (ждет оплаты)
             if (l.creator_pc === currentPC && l.status === 'payment_check') return true;
             // Если я присоединился (или меня вызвали), и статус payment_check или active
             if (l.joiner_pc === currentPC && ['payment_check', 'active'].includes(l.status)) return true;
             return false;
        });

        // Если пришло новое событие
        if (myRelevantLobby && (!activeChallenge || activeChallenge.id !== myRelevantLobby.id)) {
            setActiveChallenge(myRelevantLobby);
            
            // --- 1. ЗВУКОВОЕ ОПОВЕЩЕНИЕ ---
            audioRef.current?.play().catch((e) => console.log("Audio play failed (interaction needed)", e)); 

            // --- 2. СИСТЕМНОЕ УВЕДОМЛЕНИЕ (РАБОТАЕТ ПОВЕРХ ИГР) ---
            if (permission === "granted") {
                const isHost = currentPC === myRelevantLobby.creator_pc;
                const opponentNick = isHost ? myRelevantLobby.joiner_nick : myRelevantLobby.creator_nick;
                const opponentPC = isHost ? myRelevantLobby.joiner_pc : myRelevantLobby.creator_pc;
                const title = myRelevantLobby.status === 'active' ? 'GO GO GO! МАТЧ НАЧАЛСЯ!' : 'ВЫЗОВ ПРИНЯТ!';
                
                new Notification(`CyberX: ${title}`, {
                    body: `Соперник: ${opponentNick} (PC ${opponentPC})\nИгра: ${myRelevantLobby.game}\nСтавка: ${myRelevantLobby.bet_amount || myRelevantLobby.bet_item}`,
                    icon: '/icon-192.png', // Убедитесь, что иконка есть в public
                    tag: 'arena-notification',
                    requireInteraction: true // Висит пока не закроют
                });
            }
        }
        
        // Если лобби удалено или закончилось
        if (!myRelevantLobby && activeChallenge) {
            setActiveChallenge(null);
        }

      } catch (err) {
        console.error('Ошибка проверки уведомлений');
      }
    };

    const interval = setInterval(checkChallenges, 5000); 
    return () => clearInterval(interval);
  }, [currentPC, activeChallenge, permission]);

  const closeNotification = () => {
      setActiveChallenge(null);
  };

  const goToArena = () => {
      // Так как мы уже в layout арены, просто закрываем
      // Если бы компонент был глобальным, нужен был бы роутинг
      closeNotification();
  };

  return (
    <>
       {/* Кнопка запроса прав (только если мы "в системе" и права не даны) */}
       {currentPC && permission === 'default' && (
         <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-4 right-4 z-50"
         >
            <button 
                onClick={requestPermission}
                className="bg-[#FF2E63] text-white px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(255,46,99,0.4)] hover:scale-105 transition-transform flex items-center gap-2 animate-bounce"
            >
                <Bell size={16} />
                Включить уведомления
            </button>
         </motion.div>
       )}

      <AnimatePresence>
        {activeChallenge && (
            <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="fixed top-24 right-5 z-[9999] w-80 md:w-96 bg-[#1a1a1a] border border-[#FF2E63] rounded-2xl shadow-[0_0_30px_rgba(255,46,99,0.3)] overflow-hidden"
            >
            {/* Header */}
            <div className="bg-[#FF2E63] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-tactic font-bold uppercase tracking-widest text-sm">
                    <Bell size={16} className="animate-pulse" />
                    {activeChallenge.status === 'active' ? 'МАТЧ НАЧАЛСЯ!' : 'ВЫЗОВ ПРИНЯТ!'}
                </div>
                <button onClick={closeNotification} className="text-white/80 hover:text-white">
                    <X size={18} />
                </button>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                        <span className="block text-[10px] text-gray-500 uppercase font-bold">Ты</span>
                        <span className="font-chakra font-bold text-white text-lg">
                            {currentPC === activeChallenge.creator_pc ? activeChallenge.creator_nick : activeChallenge.joiner_nick}
                        </span>
                    </div>
                    <div className="text-[#FF2E63] font-tactic italic text-xl">VS</div>
                    <div className="text-center">
                        <span className="block text-[10px] text-gray-500 uppercase font-bold">Соперник</span>
                        <span className="font-chakra font-bold text-white text-lg">
                            {currentPC === activeChallenge.creator_pc ? activeChallenge.joiner_nick : activeChallenge.creator_nick}
                        </span>
                    </div>
                </div>

                <div className="bg-black/40 rounded-lg p-3 mb-4 border border-white/5 text-center">
                    <div className="text-xs text-gray-400 uppercase font-bold mb-1">Игра / Ставка</div>
                    <div className="text-white font-bold">
                        {activeChallenge.game} • <span className="text-[#FFD700]">{activeChallenge.bet_amount ? `${activeChallenge.bet_amount}₽` : activeChallenge.bet_item}</span>
                    </div>
                </div>

                {activeChallenge.status === 'payment_check' && (
                    <div className="text-center mb-4 text-xs text-yellow-500 font-bold animate-pulse">
                        ОЖИДАНИЕ ПОДТВЕРЖДЕНИЯ АДМИНОМ...
                    </div>
                )}
            </div>

            {/* Progress Line */}
            <motion.div 
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 15, ease: "linear" }}
                className="h-1 bg-[#FF2E63]"
                onAnimationComplete={closeNotification}
            />
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}