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
    { id: '2', name: 'Катка-до-утра', color: '#60A5FA' },
    { id: '3', name: 'Лягух-банкрот', color: '#9CA3AF' },
    { id: '4', name: 'Хардбасс-3ночи', color: '#F59E0B' },
    { id: '5', name: 'Бэтмен-подвал', color: '#FACC15' },
    { id: '6', name: 'Крипта-сдохла', color: '#94A3B8' },
    { id: '7', name: 'Всё-нормально', color: '#059669' },
    { id: '8', name: 'Махач в чате', color: '#EF4444' },
    { id: '9', name: 'СНГ-подпивас', color: '#818CF8' },
    { id: '10', name: 'Батя войны', color: '#EA580C' },
    { id: '11', name: 'Прозревший Патрик', color: '#F472B6' },
    { id: '12', name: 'Пиво-утро', color: '#2563EB' },
    { id: '13', name: 'Ким-Сина', color: '#27272A' },
    { id: '14', name: 'Мамкин кодер', color: '#A855F7' },
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
        sessionStorage.setItem('social_hub_user_id', trimmedNick);
        sessionStorage.setItem('social_hub_avatar', selectedAvatar);
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
                
                /* Lightweight CSS blob animations */
                @keyframes float-blob-red {
                    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
                    50% { transform: translate(150px, 80px) scale(1.5); opacity: 0.9; }
                }
                @keyframes float-blob-purple {
                    0%, 100% { transform: translate(0, 0) scale(1.4); opacity: 0.5; }
                    50% { transform: translate(-120px, -60px) scale(1.1); opacity: 0.8; }
                }
                @keyframes float-blob-center {
                    0%, 100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.2; }
                    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.4; }
                }
                @keyframes float-blob-ambient-1 {
                    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
                    50% { transform: translate(50px, 30px) scale(1.2); opacity: 0.4; }
                }
                @keyframes float-blob-ambient-2 {
                    0%, 100% { transform: translate(0, 0) scale(1.2); opacity: 0.1; }
                    50% { transform: translate(-40px, -20px) scale(1); opacity: 0.3; }
                }
                @keyframes scan-line {
                    0% { top: -10%; }
                    100% { top: 110%; }
                }
                @keyframes float-particle {
                    0%, 100% { transform: translateY(0); opacity: 0; }
                    25% { opacity: 0.6; }
                    50% { transform: translateY(-30px); opacity: 0.9; }
                    75% { opacity: 0.6; }
                }
                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes gentleRocket {
                    0%, 100% { transform: rotate(0deg) scale(1); }
                    25% { transform: rotate(10deg) scale(1.05); }
                    75% { transform: rotate(-10deg) scale(1.05); }
                }
            `}</style>
            {/* --- DYNAMIC BACKGROUND --- */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Base gradient - always visible */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-red/20 via-black to-cyber-purple/20" style={{ opacity: step === 1 ? 0.8 : 0.3, transition: 'opacity 0.5s ease' }} />

                {/* Vibrant blobs for Step 1 - Pure CSS */}
                {step === 1 && (
                    <>
                        {/* Main animated blobs */}
                        <div
                            className="absolute -top-[15%] -left-[15%] w-[80%] h-[80%] bg-cyber-red/40 blur-[150px] rounded-full mix-blend-screen"
                            style={{ animation: 'float-blob-red 8s ease-in-out infinite' }}
                        />
                        <div
                            className="absolute -bottom-[15%] -right-[15%] w-[70%] h-[70%] bg-cyber-purple/40 blur-[130px] rounded-full mix-blend-screen"
                            style={{ animation: 'float-blob-purple 10s ease-in-out infinite' }}
                        />

                        {/* Central pulse */}
                        <div
                            className="absolute top-1/2 left-1/2 w-full h-full bg-cyber-red/10 blur-[180px] rounded-full"
                            style={{ animation: 'float-blob-center 5s ease-in-out infinite' }}
                        />

                        {/* Scanning line */}
                        <div
                            className="absolute left-0 w-full h-[2px] bg-cyber-red/20 blur-[2px] z-[1]"
                            style={{ animation: 'scan-line 4s linear infinite' }}
                        />

                        {/* Reduced floating particles - 6 instead of 20 */}
                        {[
                            { left: '10%', top: '20%', color: '#FF2E63', delay: 0, duration: 4 },
                            { left: '80%', top: '15%', color: '#B900FF', delay: 0.5, duration: 5 },
                            { left: '25%', top: '70%', color: '#FF2E63', delay: 1, duration: 4.5 },
                            { left: '65%', top: '60%', color: '#B900FF', delay: 1.5, duration: 4 },
                            { left: '45%', top: '35%', color: '#FF2E63', delay: 2, duration: 5 },
                            { left: '90%', top: '80%', color: '#B900FF', delay: 2.5, duration: 4.5 },
                        ].map((particle, i) => (
                            <div
                                key={`particle-${i}`}
                                className="absolute w-2 h-2 rounded-full pointer-events-none"
                                style={{
                                    left: particle.left,
                                    top: particle.top,
                                    background: particle.color,
                                    boxShadow: `0 0 15px ${particle.color}`,
                                    animation: `float-particle ${particle.duration}s ease-in-out infinite`,
                                    animationDelay: `${particle.delay}s`
                                }}
                            />
                        ))}
                    </>
                )}

                {/* Ambient blobs - always present but subtle */}
                <div
                    className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-cyber-red/10 blur-[120px] rounded-full"
                    style={{ animation: 'float-blob-ambient-1 15s linear infinite' }}
                />
                <div
                    className="absolute -bottom-[10%] -right-[5%] w-[50%] h-[50%] bg-cyber-purple/10 blur-[100px] rounded-full"
                    style={{ animation: 'float-blob-ambient-2 18s linear infinite' }}
                />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            </div>


            <div className="w-full max-w-4xl max-h-[95vh] md:max-h-[90vh] bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-[30px] md:rounded-[40px] p-4 md:p-10 relative shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
                style={{
                    animation: 'fadeInScale 0.3s ease-out',
                }}
            >
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5 overflow-hidden rounded-t-[30px] md:rounded-t-[40px]">
                    <div
                        className="h-full bg-gradient-to-r from-cyber-red to-cyber-purple shadow-[0_0_15px_rgba(255,46,99,0.5)] transition-all duration-300 ease-out"
                        style={{ width: step === 1 ? "50%" : "100%" }}
                    />
                </div>

                {/* Step 1 - Avatar Selection */}
                <div
                    className={`flex flex-col items-center h-full overflow-hidden transition-opacity duration-300 ${step === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'}`}
                >
                    <div className="text-center mb-4 md:mb-6 shrink-0">
                        <div className="inline-flex p-2 md:p-3 rounded-2xl bg-cyber-red/10 text-cyber-red mb-2 md:mb-4 border border-cyber-red/20"
                            style={{
                                animation: step === 1 ? 'gentleRocket 4s ease-in-out infinite' : 'none'
                            }}
                        >
                            <Rocket size={28} className="md:w-8 md:h-8" />
                        </div>
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
                </div>

                {/* Step 2 - Nickname & Club Selection */}
                <div
                    className={`max-w-xl mx-auto flex flex-col items-center justify-center text-center transition-opacity duration-300 ${step === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'}`}
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
                </div>
            </div>
        </div>
    );
}
