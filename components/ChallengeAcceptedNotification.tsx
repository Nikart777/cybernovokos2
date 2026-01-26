'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

interface ChallengeAcceptedNotificationProps {
    acceptor: string;
    acceptorPc?: string;
    onClose: () => void;
}

export default function ChallengeAcceptedNotification({ acceptor, acceptorPc, onClose }: ChallengeAcceptedNotificationProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-10 right-10 z-[110] w-96 bg-neutral-900 border-2 border-green-500 rounded-3xl p-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]"
        >
            <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-green-500/20 rounded-xl text-green-500 border border-green-500/50">
                    <ShieldCheck size={32} />
                </div>
                <div>
                    <h4 className="text-green-500 font-tactic text-xl uppercase tracking-tighter leading-none mb-1">ВЫЗОВ ПРИНЯТ!</h4>
                    <p className="text-sm text-white font-bold">{acceptor} готов к бою.</p>
                    {acceptorPc && (
                        <p className="text-[10px] text-gray-400 mt-1">
                            Сидит за <span className="text-white font-bold">ПК #{acceptorPc}</span>
                        </p>
                    )}
                </div>
                <button onClick={onClose} className="ml-auto text-gray-500 hover:text-white">
                    <X size={20} />
                </button>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-2">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">
                    Ваши действия:
                </p>
                <ol className="text-xs text-gray-300 space-y-2 list-decimal list-inside marker:text-green-500">
                    <li>Подойдите к <span className="text-white font-bold">Администратору</span> вместе с соперником.</li>
                    <li>Обсудите правила и подтвердите готовность играть.</li>
                    <li>Подтвердите заморозку средств на балансе.</li>
                    <li>Идите и бейтесь не на жизнь, а на смерть! ☠️ <span className="text-red-500 font-bold">Победитель только один.</span></li>
                </ol>
            </div>

            <div className="absolute bottom-0 left-0 h-1 bg-green-500/30 rounded-b-3xl overflow-hidden w-full">
                <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 10, ease: "linear" }}
                    className="h-full bg-green-500"
                />
            </div>
        </motion.div>
    );
}
