import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swords, X, Check, Monitor } from 'lucide-react';
import { ChallengeSyncData } from '@/lib/socket-client';

interface ChallengeNotificationProps {
    challenge: ChallengeSyncData;
    onAccept: (pcNumber: string) => void;
    onDecline: () => void;
}

export default function ChallengeNotification({ challenge, onAccept, onDecline }: ChallengeNotificationProps) {
    const [pcNumber, setPcNumber] = useState('');

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-10 right-10 z-[110] w-80 bg-neutral-900 border-2 border-cyber-red rounded-3xl p-6 shadow-[0_0_40px_rgba(255,46,99,0.4)]"
        >
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-cyber-red/50 bg-black/40">
                    <img
                        src={`/images/social-hub/${challenge.avatar || 'cat'}.png`}
                        alt="from"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h4 className="text-cyber-red font-tactic text-lg uppercase tracking-tighter leading-none mb-1">ВЫЗОВ!!!</h4>
                    <p className="text-xs text-white font-bold">{challenge.from} зовет тебя</p>
                    {challenge.pcNumber && <p className="text-[10px] text-gray-400">сидит за ПК <span className="text-white font-bold">#{challenge.pcNumber}</span></p>}
                </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 mb-4 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Игра</span>
                    <span className="text-xs font-black text-white">{challenge.game}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Ставка</span>
                    <span className="text-xs font-black text-yellow-500">{challenge.betAmount} ₽</span>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1.5 ml-1">Твой номер ПК</label>
                <div className="relative">
                    <Monitor className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
                    <input
                        type="text"
                        value={pcNumber}
                        onChange={(e) => setPcNumber(e.target.value)}
                        placeholder="25"
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-8 pr-3 text-sm font-bold text-white focus:border-cyber-red outline-none transition-colors placeholder:text-gray-700"
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={onDecline}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                    <X size={14} /> СЛИТЬСЯ
                </button>
                <button
                    onClick={() => {
                        if (pcNumber) onAccept(pcNumber);
                    }}
                    disabled={!pcNumber}
                    className="flex-1 py-3 bg-cyber-red hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                    <Check size={14} /> ПРИНЯТЬ
                </button>
            </div>

            {/* Progress bar for auto-decline */}
            <div className="absolute bottom-0 left-0 h-1 bg-cyber-red/30 rounded-b-3xl overflow-hidden w-full">
                <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 15, ease: "linear" }}
                    className="h-full bg-cyber-red"
                />
            </div>
        </motion.div>
    );
}
