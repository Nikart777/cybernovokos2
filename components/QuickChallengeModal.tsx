'use client';

import { useState } from 'react';
import { ConnectedUser } from '@/lib/socket-client';
import { X, Swords, Gamepad2, Coins } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuickChallengeModalProps {
    targetUser: ConnectedUser;
    onClose: () => void;
    onSubmit: (challengeData: ChallengeData) => void;
}

export interface ChallengeData {
    targetUserId: string;
    game: string;
    betAmount: string;
    pcNumber: string;
    rules?: string;
}

const GAMES = ['CS2', 'Dota 2', 'Valorant', 'Apex Legends', 'World of Tanks', 'PUBG', 'Fortnite'];

export default function QuickChallengeModal({ targetUser, onClose, onSubmit }: QuickChallengeModalProps) {
    const [game, setGame] = useState('CS2');
    const [betAmount, setBetAmount] = useState('200');
    const [pcNumber, setPcNumber] = useState(localStorage.getItem('arena_pc') || '');
    const [rules, setRules] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({
            targetUserId: targetUser.userId,
            game,
            betAmount,
            pcNumber,
            rules: rules || undefined
        });

        onClose();
    };

    const getClubColor = (club: string) => {
        switch (club) {
            case 'vlasino':
                return 'cyber-red';
            case 'altufievo':
                return 'cyber-purple';
            default:
                return 'gray-400';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-neutral-900 border border-cyber-red/50 rounded-3xl w-full max-w-md p-8 relative shadow-[0_0_50px_rgba(255,46,99,0.2)]"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Swords className="w-8 h-8 text-cyber-red" />
                        <h3 className="text-3xl font-tactic text-white tracking-widest">ВЫЗОВ!</h3>
                    </div>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
                        Ты вызываешь{' '}
                        <span className={`text-${getClubColor(targetUser.club)}`}>
                            {targetUser.nickname || targetUser.userId}
                        </span>
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Game Selection */}
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                                Игра
                            </label>
                            <div className="relative">
                                <Gamepad2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-red pointer-events-none" />
                                <select
                                    value={game}
                                    onChange={(e) => setGame(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyber-red text-xs font-bold outline-none appearance-none cursor-pointer"
                                >
                                    {GAMES.map((g) => (
                                        <option key={g} value={g}>
                                            {g}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* PC Number */}
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                                Твой ПК #
                            </label>
                            <input
                                type="text"
                                value={pcNumber}
                                onChange={(e) => setPcNumber(e.target.value)}
                                placeholder="42"
                                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyber-red text-sm font-bold outline-none text-center"
                                required
                            />
                        </div>
                    </div>

                    {/* Bet Amount */}
                    <div>
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                            Сумма пари (₽)
                        </label>
                        <div className="relative">
                            <Coins className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500 pointer-events-none" />
                            <input
                                type="text"
                                value={betAmount}
                                onChange={(e) => setBetAmount(e.target.value)}
                                placeholder="200"
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/40 border border-white/10 focus:border-cyber-red text-2xl font-tactic outline-none text-center"
                                required
                            />
                        </div>
                        <p className="mt-2 text-[10px] text-gray-500 font-bold text-center leading-relaxed">
                            💡 Эта сумма + запас на игру должен быть у тебя на балансе
                        </p>
                    </div>

                    {/* Optional Rules */}
                    <div>
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                            Правила (необязательно)
                        </label>
                        <input
                            type="text"
                            value={rules}
                            onChange={(e) => setRules(e.target.value)}
                            placeholder="напр. aim_map, до 10 побед"
                            className="w-full px-5 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyber-red text-sm outline-none placeholder-gray-700"
                        />
                    </div>

                    {/* Submit */}
                    <div className="space-y-4 pt-4">
                        <button
                            type="submit"
                            className="w-full py-5 bg-gradient-to-r from-cyber-red to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-2xl font-tactic text-2xl tracking-widest text-white transition-all shadow-[0_10px_30px_rgba(255,46,99,0.3)] hover:shadow-[0_15px_40px_rgba(255,46,99,0.5)] transform hover:-translate-y-1 active:translate-y-0"
                        >
                            БРОСИТЬ ВЫЗОВ
                        </button>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                            <p className="text-[10px] text-gray-400 leading-relaxed text-center font-medium">
                                Договоритесь об условиях в чате. Когда игрок примет вызов, подойдите к админу для подтверждения.
                            </p>
                            <p className="text-[10px] text-cyber-red leading-relaxed text-center font-bold uppercase tracking-widest">
                                Админ заморозит средства и выплатит победителю всё!
                            </p>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
