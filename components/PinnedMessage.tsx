import { BellRing, Ticket, Swords, Heart, Info, MessageSquare, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PinnedMessage() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex flex-col bg-black/40 backdrop-blur-xl border border-white/10 rounded-[1.5rem] px-5 py-3 shadow-2xl overflow-hidden w-full max-w-[650px]"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-red/5 via-transparent to-cyber-purple/5 opacity-50" />

            {/* Header / Intro Line */}
            <div className="flex items-center gap-3 border-b border-white/5 pb-2 mb-3">
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-cyber-red/10 border border-cyber-red/20 rounded-lg shadow-[0_0_10px_rgba(255,46,99,0.2)]">
                    <Info size={10} className="text-cyber-red" />
                    <span className="text-[9px] font-black text-white lowercase tracking-wider leading-none font-tactic">куда ты попал?</span>
                </div>
                <p className="text-[9px] text-gray-400 font-bold lowercase tracking-widest leading-none">
                    единый <span className="text-white font-black italic tracking-tighter shadow-[0_0_10px_rgba(255,255,255,0.2)]">cyberx_connect</span>: <span className="text-white">алтуфьево</span> & <span className="text-white">новокосино</span>
                </p>
            </div>

            {/* Main Content: 2 Columns */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3.5 mb-3">
                {/* 🤝 Общайся */}
                <div className="flex items-start gap-3 group/item">
                    <div className="w-6 h-6 shrink-0 mt-0.5 flex items-center justify-center bg-blue-500/20 border border-blue-500/40 rounded-lg group-hover/item:bg-blue-500/30 transition-all">
                        <MessageSquare size={12} className="text-blue-400" />
                    </div>
                    <div>
                        <h5 className="text-[10px] font-black text-white lowercase tracking-tight leading-none mb-1 group-hover/item:text-blue-400 transition-colors">🤝 общайся</h5>
                        <p className="text-[10px] text-gray-400 font-bold leading-tight lowercase">заводи новых друзей и делись игровым опытом.</p>
                    </div>
                </div>

                {/* 🎮 Игры */}
                <div className="flex items-start gap-3 group/item">
                    <div className="w-6 h-6 shrink-0 mt-0.5 flex items-center justify-center bg-purple-500/20 border border-purple-500/40 rounded-lg group-hover/item:bg-purple-500/30 transition-all">
                        <Gamepad2 size={12} className="text-purple-400" />
                    </div>
                    <div>
                        <h5 className="text-[10px] font-black text-white lowercase tracking-tight leading-none mb-1 group-hover/item:text-purple-400 transition-colors">🎮 игры</h5>
                        <p className="text-[10px] text-gray-400 font-bold leading-tight lowercase">ищи тиммейтов и обсуждай тактики в каналах.</p>
                    </div>
                </div>

                {/* ⚔️ Дуэли */}
                <div className="flex items-start gap-3 group/item">
                    <div className="w-6 h-6 shrink-0 mt-0.5 flex items-center justify-center bg-green-500/20 border border-green-500/40 rounded-lg group-hover/item:bg-green-500/30 transition-all">
                        <Swords size={12} className="text-green-500" />
                    </div>
                    <div>
                        <h5 className="text-[10px] font-black text-white lowercase tracking-tight leading-none mb-1 group-hover/item:text-green-500 transition-colors">⚔️ дуэли</h5>
                        <p className="text-[10px] text-gray-400 font-bold leading-tight lowercase">вызывай на бой и выигрывай деньги на баланс!</p>
                    </div>
                </div>

                {/* 🎫 Бонусы */}
                <div className="flex items-start gap-3 group/item">
                    <div className="w-6 h-6 shrink-0 mt-0.5 flex items-center justify-center bg-yellow-500/20 border border-yellow-500/40 rounded-lg group-hover/item:bg-yellow-500/30 transition-all">
                        <Ticket size={12} className="text-yellow-400" />
                    </div>
                    <div>
                        <h5 className="text-[10px] font-black text-white lowercase tracking-tight leading-none mb-1 group-hover/item:text-yellow-400 transition-colors">🎫 бонусы</h5>
                        <p className="text-[10px] text-gray-400 font-bold leading-tight lowercase">лови секретные промокоды в общем чате.</p>
                    </div>
                </div>
            </div>

            {/* 🛑 Важно: Footer Block */}
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-xl group hover:bg-red-500/15 transition-all">
                <BellRing size={14} className="text-red-500 animate-pulse" />
                <p className="text-[9px] font-black text-white lowercase tracking-wider leading-none">
                    <span className="text-red-500">стоп! 🛑 важно:</span> не закрывай вкладку, чтобы не выйти из аккаунта и не пропустить вызов.
                </p>
            </div>

            {/* Animated scan line effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[1.5rem]">
                <motion.div
                    animate={{ y: ['-100%', '300%'] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="w-full h-12 bg-gradient-to-b from-white/0 via-white/5 to-white/0"
                />
            </div>
        </motion.div>
    );
}
