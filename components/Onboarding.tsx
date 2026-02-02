'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { socketClient } from '@/lib/socket-client';
import { Rocket, User, CheckCircle2, MapPin, Sparkles, Gift, MessageSquare, Swords, Ticket } from 'lucide-react';

interface OnboardingProps {
    onComplete: () => void;
    totalUnread?: number;
}

const AVATARS = [
    { id: '1', name: 'Пепе-интеллигент', color: '#4ADE80' },
    { id: '2', name: 'Катка-до-утра', color: '#60A5FA' },
    { id: '3', name: 'Депрессед кид', color: '#9CA3AF' },
    { id: '4', name: 'Темный трикстер', color: '#F59E0B' },
    { id: '5', name: 'Yeezus', color: '#FACC15' },
    { id: '6', name: 'ZXC гуль', color: '#94A3B8' },
    { id: '7', name: 'GrokAI', color: '#059669' },
    { id: '8', name: 'Махач в чате', color: '#EF4444' },
    { id: '9', name: 'СНГ-подпивас', color: '#818CF8' },
    { id: '10', name: 'Батя войны', color: '#EA580C' },
    { id: '11', name: 'Прозревший Патрик', color: '#F472B6' },
    { id: '12', name: 'Белый русский', color: '#2563EB' },
    { id: '13', name: 'Ким-Сина', color: '#27272A' },
    { id: '14', name: 'Хакер 228666', color: '#A855F7' },
];

const CLUBS = [
    { id: 'altufievo', name: 'Алтуфьево', color: '#FF2E63' },
    { id: 'vlasino', name: 'Новокосино', color: '#B900FF' }
];

export default function Onboarding({ onComplete, totalUnread = 0 }: OnboardingProps) {
    const [step, setStep] = useState(1);
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [nickname, setNickname] = useState('');
    const [selectedClub, setSelectedClub] = useState('altufievo');
    const [hasAttemptedProceed, setHasAttemptedProceed] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus input on step 2
    useEffect(() => {
        if (step === 2 && inputRef.current) {
            inputRef.current.focus();
        }
    }, [step]);

    const handleAvatarSelect = (id: string) => {
        setSelectedAvatar(id);
        setHasAttemptedProceed(false); // Reset attempt state on selection
        // Auto-advance to Step 2 after a small delay for visual feedback
        setTimeout(() => setStep(2), 300);
    };

    const handleFinish = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmedNick = nickname.trim();
        if (!trimmedNick) {
            alert('Сначала введи свой крутой никнейм!');
            return;
        }

        const reservedNicks = ['admin.altufievo', 'admin.novokosino'];
        if (reservedNicks.includes(trimmedNick.toLowerCase())) {
            alert('Этот ник зарезервирован для администрации!');
            return;
        }

        try {
            socketClient.updateUser(trimmedNick, selectedAvatar, selectedClub as 'vlasino' | 'altufievo');
            sessionStorage.setItem('social_hub_user_id', trimmedNick);
            sessionStorage.setItem('social_hub_avatar', selectedAvatar);
            sessionStorage.setItem('user_club', selectedClub);
            sessionStorage.setItem('onboarding_done', 'true');
            onComplete();
        } catch (err) {
            console.error('[Onboarding] Error during finish:', err);
        }
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
                @keyframes cyber-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes cyber-spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                @keyframes neon-pulse {
                    0%, 100% { opacity: 0.4; filter: blur(5px); }
                    50% { opacity: 0.8; filter: blur(8px); }
                }
                .cyber-ring {
                    position: absolute;
                    inset: -8px;
                    border: 1px dashed currentColor;
                    border-radius: 50%;
                    opacity: 0.3;
                    pointer-events: none;
                }
                .cyber-brackets::before, .cyber-brackets::after {
                    content: '';
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    border: 2px solid currentColor;
                    opacity: 0;
                    transition: all 0.3s ease;
                }
                .cyber-brackets::before {
                    top: -4px; left: -4px;
                    border-right: 0; border-bottom: 0;
                }
                .cyber-brackets::after {
                    bottom: -4px; right: -4px;
                    border-left: 0; border-top: 0;
                }
                .group:hover .cyber-brackets::before,
                .group:hover .cyber-brackets::after {
                    opacity: 1;
                    transform: scale(1.1);
                }
                .geometric-card {
                    clip-path: polygon(
                        0 10%, 5% 10%, 5% 5%, 10% 5%, 10% 0,
                        90% 0, 90% 5%, 95% 5%, 95% 10%, 100% 10%,
                        100% 90%, 95% 90%, 95% 95%, 90% 95%, 90% 100%,
                        10% 100%, 10% 95%, 5% 95%, 5% 90%, 0 90%
                    );
                }
                @keyframes orbit {
                    from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
                    to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
                }
                .orbital-line {
                    position: absolute;
                    inset: -30px;
                    border: 1.5px solid rgba(255, 46, 99, 0.2);
                    border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
                    pointer-events: none;
                    animation: cyber-spin 18s linear infinite;
                    box-shadow: 0 0 20px currentColor;
                }
                .orbital-line-alt {
                    position: absolute;
                    inset: -45px;
                    border: 1px dashed rgba(255, 255, 255, 0.15);
                    border-radius: 50%;
                    pointer-events: none;
                    animation: cyber-spin-reverse 28s linear infinite;
                }
                .grid-texture {
                    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
                    background-size: 40px 40px;
                }
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .ticker-content {
                    display: flex;
                    animation: ticker 30s linear infinite;
                    white-space: nowrap;
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


            <div className="w-full max-w-5xl h-[95vh] md:h-[90vh] bg-[#0c0c0c]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-4 md:p-12 relative shadow-[0_40px_100px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
                style={{
                    animation: 'fadeInScale 0.3s ease-out',
                }}
            >
                {/* Main Grid Texture */}
                <div className="absolute inset-0 grid-texture pointer-events-none opacity-40" />
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
                    <div className="flex flex-row items-center gap-4 md:gap-8 mb-4 md:mb-8 shrink-0 w-full px-2 md:px-6">
                        <div className="inline-flex p-2 md:p-4 rounded-3xl bg-white/5 border border-white/10 shadow-glow overflow-hidden shrink-0"
                            style={{
                                animation: step === 1 ? 'gentleRocket 4s ease-in-out infinite' : 'none'
                            }}
                        >
                            <img src="/images/social-hub/logo.png" alt="CyberX Logo" className="w-16 h-16 md:w-32 md:h-32 object-contain" />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                            <h1 className="text-[10px] md:text-sm font-mono text-cyber-red tracking-[0.4em] uppercase mb-1 md:mb-2 drop-shadow-[0_0_15px_rgba(255,46,99,0.4)]">КТО ТЫ В CYBERX?</h1>
                            <h2 className="text-2xl md:text-5xl font-tactic text-white mb-4 md:mb-6 tracking-tight uppercase leading-[0.9] drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">ВЫБЕРИ СВОЕГО <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-red via-orange-500 to-cyber-purple">ГЕРОЯ</span></h2>

                            <motion.button
                                animate={(totalUnread && totalUnread > 0) || true ? {
                                    scale: [1, 1.05, 1],
                                    boxShadow: [
                                        "0 10px 30px rgba(255,46,99,0.4)",
                                        "0 15px 45px rgba(255,46,99,0.7)",
                                        "0 10px 30px rgba(255,46,99,0.4)"
                                    ]
                                } : {}}
                                transition={{ repeat: Infinity, duration: 2 }}
                                onClick={() => {
                                    if (step === 1) {
                                        if (selectedAvatar) {
                                            setStep(2);
                                        } else {
                                            // Record that user tried to proceed without selection
                                            setHasAttemptedProceed(true);

                                            // Visual feedback that selection is needed
                                            const grid = document.getElementById('hero-grid');
                                            if (grid) {
                                                grid.animate([
                                                    { transform: 'translateX(0)' },
                                                    { transform: 'translateX(-5px)' },
                                                    { transform: 'translateX(5px)' },
                                                    { transform: 'translateX(-5px)' },
                                                    { transform: 'translateX(5px)' },
                                                    { transform: 'translateX(0)' }
                                                ], { duration: 400 });
                                            }
                                        }
                                    }
                                }}
                                className="relative px-8 py-3 md:py-4 rounded-xl bg-gradient-to-r from-cyber-red to-orange-600 text-white font-mono text-[11px] md:text-sm font-black uppercase tracking-[0.2em] transition-all border border-white/20 overflow-hidden group/btn"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    {(() => {
                                        // Stable daily random count for "wow" effect (30-45)
                                        const today = new Date().toISOString().split('T')[0];
                                        const hash = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                                        const dailyCount = 30 + (hash % 16);

                                        const count = totalUnread && totalUnread > 0 ? totalUnread : dailyCount;

                                        const getPluralWord = (n: number) => {
                                            const last = n % 10;
                                            const last100 = n % 100;
                                            if (last === 1 && last100 !== 11) return 'НЕПРОЧИТАННОЕ СООБЩЕНИЕ';
                                            if ([2, 3, 4].includes(last) && ![12, 13, 14].includes(last100)) return 'НЕПРОЧИТАННЫХ СООБЩЕНИЯ';
                                            return 'НЕПРОЧИТАННЫХ СООБЩЕНИЙ';
                                        };

                                        return (
                                            <>
                                                {hasAttemptedProceed && !selectedAvatar ? (
                                                    <span className="text-white/60">ВЫБЕРИ ГЕРОЯ, ЧТОБЫ ВОЙТИ</span>
                                                ) : (
                                                    <>
                                                        <span className="flex h-3 w-3 relative">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                                                        </span>
                                                        У ВАС {count} {getPluralWord(count)}
                                                    </>
                                                )}
                                            </>
                                        );
                                    })()}
                                </span>
                                {/* Background shimmer on the button */}
                                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full ${selectedAvatar ? 'group-hover/btn:animate-[shimmer_1.5s_infinite]' : ''}`} />
                            </motion.button>
                        </div>
                    </div>

                    <div className="flex-1 w-full overflow-y-auto overflow-x-hidden custom-scrollbar pr-2 mb-2">
                        <div id="hero-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-12 p-8">
                            {AVATARS.map((avatar) => (
                                <motion.div
                                    key={avatar.id}
                                    whileHover={{ scale: 1.15, zIndex: 10 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleAvatarSelect(avatar.id)}
                                    className="relative cursor-pointer group flex flex-col items-center"
                                >
                                    <div className="relative p-2 transition-all duration-300">
                                        {/* Orbital Lines System */}
                                        <div className="orbital-line" style={{ color: `${avatar.color}44`, borderColor: 'currentColor' }} />
                                        <div className="orbital-line-alt" />

                                        <div className={`relative w-full aspect-square bg-[#0a0a0a] geometric-card transition-all duration-500 overflow-hidden ${selectedAvatar === avatar.id
                                            ? 'scale-110 shadow-[0_0_60px_rgba(255,46,99,0.25)] border-white/40'
                                            : 'opacity-70 grayscale-[30%] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 border-white/5'
                                            }`}
                                        >
                                            {/* Notched Borders Overlay */}
                                            <div className={`absolute inset-0 border-[3px] transition-all duration-300 geometric-card ${selectedAvatar === avatar.id ? 'border-white' : 'border-white/10 group-hover:border-white/30'
                                                }`} />

                                            {/* Vivid Glow Layers */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-white/5" />
                                            <div className="absolute inset-0" style={{
                                                background: `radial-gradient(circle at center, ${avatar.color}33 0%, transparent 70%)`,
                                                opacity: selectedAvatar === avatar.id ? 1 : 0.5
                                            }} />

                                            <img
                                                src={`/images/social-hub/${avatar.id}.png`}
                                                alt={avatar.name}
                                                className="w-full h-full object-cover relative z-10 brightness-110 contrast-110"
                                            />

                                            {/* Shimmer on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12 z-20" />
                                        </div>
                                    </div>
                                    <div className="mt-6 px-4 py-2 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-300 flex items-center gap-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]">
                                        <div
                                            className="w-2 h-2 rounded-full shadow-[0_0_12px_currentColor]"
                                            style={{ color: avatar.color, backgroundColor: avatar.color }}
                                        />
                                        <p className="text-[13px] md:text-[14px] font-mono font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors duration-300 leading-none">
                                            {avatar.name}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Partners Ticker */}
                    <div className="w-full overflow-hidden bg-black/40 border-y border-white/5 py-3 mt-auto shrink-0">
                        <div className="ticker-content gap-12 text-[10px] items-center">
                            {[1, 2, 3].map((_, setIdx) => (
                                <div key={setIdx} className="flex gap-12 items-center text-gray-500 font-mono font-black uppercase tracking-[0.4em] opacity-40">
                                    <span>CYBERX</span>
                                    <span className="text-cyber-red">●</span>
                                    <span>INTEL</span>
                                    <span className="text-cyber-purple">●</span>
                                    <span>NVIDIA</span>
                                    <span>●</span>
                                    <span>RAZER</span>
                                    <span>●</span>
                                    <span>ASUS ROG</span>
                                    <span>●</span>
                                </div>
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

                    <div className="w-full space-y-6">
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
                                type="button"
                                onClick={() => handleFinish()}
                                className="flex-1 py-4 bg-gradient-to-r from-cyber-red to-cyber-purple rounded-2xl font-tactic text-xl tracking-widest text-white transition-all hover:shadow-[0_10px_30px_rgba(255,46,99,0.3)] transform hover:-translate-y-1 disabled:opacity-30 disabled:grayscale uppercase"
                            >
                                ВОРВАТЬСЯ! 🚀
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
