'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { socketClient } from '@/lib/socket-client';
import { Rocket, User, CheckCircle2, MapPin, Sparkles, Gift, MessageSquare, Swords, Ticket } from 'lucide-react';

interface OnboardingProps {
    onComplete: () => void;
}

const AVATARS = [
    { id: '1', name: 'Пепе-интеллигент', color: '#4ADE80' },
    { id: '2', name: 'Микро-челик', color: '#60A5FA' },
    { id: '3', name: 'Скуф-кодер', color: '#9CA3AF' },
    { id: '4', name: 'Дед в шоке', color: '#F59E0B' },
    { id: '5', name: 'Шок-контент', color: '#FACC15' },
    { id: '6', name: 'Сигма-пёс', color: '#94A3B8' },
    { id: '7', name: 'Гигачад болота', color: '#059669' },
    { id: '8', name: 'Махач в чате', color: '#EF4444' },
    { id: '9', name: 'СНГ-подпивас', color: '#818CF8' },
    { id: '10', name: 'Батя войны', color: '#EA580C' },
    { id: '11', name: 'Прозревший Патрик', color: '#F472B6' },
    { id: '12', name: 'Генерал Гав', color: '#2563EB' },
    { id: '13', name: 'Кот-анонимус', color: '#27272A' },
];

const CLUBS = [
    { id: 'altufievo', name: 'Алтуфьево', color: '#FF2E63' },
    { id: 'vlasino', name: 'Новокосино', color: '#B900FF' }
];

export default function Onboarding({ onComplete }: OnboardingProps) {
    const [step, setStep] = useState(1);
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [nickname, setNickname] = useState('');
    const [selectedClub, setSelectedClub] = useState('altufievo');
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus input on step 2
    useEffect(() => {
        if (step === 2 && inputRef.current) {
            inputRef.current.focus();
        }
    }, [step]);

    const handleAvatarSelect = (id: string) => {
        setSelectedAvatar(id);
        // Auto-advance to Step 2 after a small delay for visual feedback
        setTimeout(() => setStep(2), 300);
    };

    const handleFinish = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmedNick = nickname.trim();
        if (!trimmedNick) return;

        const reservedNicks = ['admin.altufievo', 'admin.novokosino'];
        if (reservedNicks.includes(trimmedNick.toLowerCase())) {
            alert('Этот ник зарезервирован для администрации!');
            return;
        }

        socketClient.updateUser(trimmedNick, selectedAvatar, selectedClub as 'vlasino' | 'altufievo');
        sessionStorage.setItem('user_club', selectedClub);
        sessionStorage.setItem('onboarding_done', 'true');
        onComplete();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] overflow-hidden">
            <style jsx global>{`
                @keyframes shimmer {
                    0% { transform: translateX(-150%) skewX(-25deg); }
                    100% { transform: translateX(150%) skewX(-25deg); }
                }
                .shimmer-effect {
                    position: relative;
                    overflow: hidden;
                }
                .shimmer-effect::after {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.4),
                        transparent
                    );
                    animation: shimmer 3s infinite;
                }
                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.5; filter: blur(8px); }
                    50% { opacity: 1; filter: blur(12px); }
                }
                .active-medallion {
                    animation: pulse-glow 2s infinite ease-in-out;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #FF2E63, #B900FF);
                    border-radius: 10px;
                }
            `}</style>
            {/* --- DYNAMIC BACKGROUND --- */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Vibrant blobs for Step 1 - High Vibrancy Mode */}
                <AnimatePresence>
                    {step === 1 && (
                        <>
                            {/* Base Color Mesh */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.8 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-gradient-to-br from-cyber-red/20 via-black to-cyber-purple/20"
                            />

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.6, 0.9, 0.6],
                                    x: [0, 150, 0],
                                    y: [0, 80, 0]
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-[15%] -left-[15%] w-[80%] h-[80%] bg-cyber-red/40 blur-[150px] rounded-full mix-blend-screen"
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{
                                    scale: [1.4, 1.1, 1.4],
                                    opacity: [0.5, 0.8, 0.5],
                                    x: [0, -120, 0],
                                    y: [0, -60, 0]
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-[15%] -right-[15%] w-[70%] h-[70%] bg-cyber-purple/40 blur-[130px] rounded-full mix-blend-screen"
                            />

                            {/* Extra central punch */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{
                                    scale: [0.8, 1.2, 0.8],
                                    opacity: [0.2, 0.4, 0.2],
                                }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyber-red/10 blur-[180px] rounded-full"
                            />

                            {/* Scanning Line Effect */}
                            <motion.div
                                initial={{ top: "-10%" }}
                                animate={{ top: "110%" }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 w-full h-[2px] bg-cyber-red/20 blur-[2px] z-[1]"
                            />

                            {/* Floating Neon Elements */}
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={`neon-${i}`}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.5,
                                    }}
                                    animate={{
                                        y: [0, -30, 0],
                                        opacity: [0, 0.4, 0.7, 0.4, 0],
                                        scale: [0.5, 1.2, 0.5],
                                    }}
                                    transition={{
                                        duration: 4 + (i % 5),
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute w-1 h-1 md:w-2 md:h-2 pointer-events-none"
                                    style={{
                                        left: `${(i * 7) % 100}%`,
                                        top: `${(i * 13) % 100}%`,
                                        background: i % 2 === 0 ? '#FF2E63' : '#B900FF',
                                        boxShadow: `0 0 15px ${i % 2 === 0 ? '#FF2E63' : '#B900FF'}`,
                                        borderRadius: i % 3 === 0 ? '50%' : '0%'
                                    }}
                                />
                            ))}
                        </>
                    )}
                </AnimatePresence>

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, 50, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-cyber-red/10 blur-[120px] rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.3, 0.1],
                        x: [0, -40, 0],
                        y: [0, -20, 0]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[10%] -right-[5%] w-[50%] h-[50%] bg-cyber-purple/10 blur-[100px] rounded-full"
                />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl max-h-[95vh] md:max-h-[90vh] bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-[30px] md:rounded-[40px] p-4 md:p-10 relative shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
            >
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5 overflow-hidden rounded-t-[30px] md:rounded-t-[40px]">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: step === 1 ? "50%" : "100%" }}
                        className="h-full bg-gradient-to-r from-cyber-red to-cyber-purple shadow-[0_0_15px_rgba(255,46,99,0.5)]"
                    />
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col items-center h-full overflow-hidden"
                        >
                            <div className="text-center mb-4 md:mb-6 shrink-0">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="inline-flex p-2 md:p-3 rounded-2xl bg-cyber-red/10 text-cyber-red mb-2 md:mb-4 border border-cyber-red/20"
                                >
                                    <Rocket size={28} className="md:w-8 md:h-8" />
                                </motion.div>
                                <h1 className="text-[10px] md:text-sm font-mono text-cyber-red tracking-[0.3em] uppercase mb-1">Кто ты в CYBERX?</h1>
                                <h2 className="text-2xl md:text-5xl font-tactic text-white mb-1 md:mb-2 tracking-tighter uppercase whitespace-nowrap">ВЫБЕРИ СВОЕГО ГЕРОЯ</h2>
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-[8px] md:text-xs">Жми на любую медаль!</p>
                            </div>

                            <div className="flex-1 w-full overflow-y-auto custom-scrollbar pr-2 mb-2">
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 md:gap-4 p-2">
                                    {AVATARS.map((avatar) => (
                                        <motion.div
                                            key={avatar.id}
                                            whileHover={{ scale: 1.15, zIndex: 10 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleAvatarSelect(avatar.id)}
                                            className="relative cursor-pointer group flex flex-col items-center"
                                        >
                                            <div className="relative p-0.5 rounded-full transition-all duration-300">
                                                {/* Rainbow/Colorful Glow */}
                                                <div
                                                    className={`absolute -inset-1 rounded-full opacity-40 group-hover:opacity-100 blur-[10px] transition-all duration-500 active-medallion`}
                                                    style={{
                                                        background: `conic-gradient(from 0deg, ${avatar.color}, #ffffff, ${avatar.color})`,
                                                        boxShadow: `0 0 20px ${avatar.color}44`
                                                    }}
                                                />

                                                <div className={`relative w-full aspect-square rounded-full overflow-hidden border-2 bg-black/40 shimmer-effect ${selectedAvatar === avatar.id ? 'border-white scale-110' : 'border-white/20'
                                                    }`}>
                                                    <img
                                                        src={`/images/social-hub/${avatar.id}.png`}
                                                        alt={avatar.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <p className="text-[8px] text-center mt-2 font-bold uppercase tracking-tight text-gray-400 group-hover:text-white transition-colors duration-300 leading-tight">
                                                {avatar.name}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-xl mx-auto flex flex-col items-center justify-center text-center"
                        >
                            <div className="mb-4">
                                <div className="inline-flex p-3 rounded-2xl bg-cyber-purple/10 text-cyber-purple mb-3 border border-cyber-purple/20">
                                    <Sparkles size={28} />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-tactic text-white mb-2 tracking-tighter uppercase leading-none">ПОСЛЕДНИЙ ШТРИХ</h2>

                                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 mb-2 max-w-md mx-auto">
                                    <div className="flex items-center gap-1.5 text-gray-400">
                                        <MessageSquare size={12} className="text-cyber-purple" />
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-white/80">Общий чат</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-gray-400">
                                        <Ticket size={12} className="text-cyber-purple" />
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-white/80">Промокоды</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-gray-400">
                                        <Swords size={12} className="text-cyber-purple" />
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-white/80">Дуэли с игроками</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-gray-400">
                                        <Rocket size={12} className="text-cyber-purple" />
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-white/80">Акции и бонусы</span>
                                    </div>
                                </div>
                                <p className="text-[8px] text-gray-500 uppercase tracking-[0.2em] font-medium opacity-60">Твой пропуск в экосистему клуба</p>
                            </div>

                            <form onSubmit={handleFinish} className="w-full space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Твой никнейм</label>
                                    <div className="relative group">
                                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyber-red transition-colors" size={20} />
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={nickname}
                                            onChange={(e) => setNickname(e.target.value)}
                                            placeholder="Введи ник..."
                                            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-black/60 border-2 border-white/5 focus:border-cyber-red outline-none text-xl font-bold text-white transition-all placeholder:text-gray-800 text-center uppercase tracking-widest"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Выбери свой клуб</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {CLUBS.map((club) => (
                                            <motion.div
                                                key={club.id}
                                                whileHover={{ y: -4 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => setSelectedClub(club.id)}
                                                className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all overflow-hidden ${selectedClub === club.id
                                                    ? `border-${club.id === 'altufievo' ? 'cyber-red' : 'cyber-purple'} bg-gradient-to-br from-white/10 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.05)]`
                                                    : 'border-white/5 bg-white/5 hover:border-white/10'
                                                    }`}
                                            >
                                                {selectedClub === club.id && (
                                                    <motion.div
                                                        layoutId="clubGlow"
                                                        className={`absolute inset-0 opacity-10 pointer-events-none`}
                                                        style={{ backgroundColor: club.color }}
                                                    />
                                                )}
                                                <div className="relative flex items-center justify-between gap-2">
                                                    <div className="text-left">
                                                        <p className="text-[8px] font-mono text-gray-500 uppercase mb-0.5 tracking-widest">CYBERX</p>
                                                        <p className="text-xl font-tactic text-white uppercase leading-none">{club.name}</p>
                                                    </div>
                                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 ${selectedClub === club.id
                                                        ? 'bg-white text-black border-transparent'
                                                        : 'bg-black/20 text-gray-700 border-white/5'
                                                        }`}>
                                                        <CheckCircle2 size={16} />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="px-6 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-tactic text-lg text-gray-500 transition-all border border-white/5 uppercase tracking-widest"
                                    >
                                        Назад
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!nickname.trim()}
                                        className="flex-1 py-4 bg-gradient-to-r from-cyber-red to-cyber-purple rounded-2xl font-tactic text-xl tracking-widest text-white transition-all hover:shadow-[0_10px_30px_rgba(255,46,99,0.3)] transform hover:-translate-y-1 disabled:opacity-30 disabled:grayscale uppercase"
                                    >
                                        ВОРВАТЬСЯ! 🚀
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
