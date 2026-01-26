'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hash } from 'lucide-react';

export interface Channel {
    id: string;
    name: string;
    emoji: string;
    category: 'games' | 'info' | 'social';
}

const CHANNELS: Channel[] = [
    { id: 'general', name: 'Общий чат', emoji: '💬', category: 'social' },
    { id: 'cs2', name: 'CS2', emoji: '🔫', category: 'games' },
    { id: 'valorant', name: 'Valorant', emoji: '🎯', category: 'games' },
    { id: 'dota2', name: 'Dota 2', emoji: '⚔️', category: 'games' },
    { id: 'news', name: 'Новости', emoji: '📰', category: 'info' },
    { id: 'reviews', name: 'Отзывы', emoji: '⭐', category: 'social' },
    { id: 'suggestions', name: 'Предложения', emoji: '💡', category: 'social' },
    { id: 'rules', name: 'Правила', emoji: '📜', category: 'info' },
    { id: 'market', name: 'Барахолка', emoji: '📦', category: 'info' },
    { id: 'arena', name: 'Арена Дуэлей', emoji: '⚡', category: 'games' },
    { id: 'admins', name: 'Админы', emoji: '👑', category: 'info' }
];

interface ChannelSwitcherProps {
    currentChannel: string;
    onChannelChange: (channelId: string) => void;
}

export default function ChannelSwitcher({ currentChannel, onChannelChange }: ChannelSwitcherProps) {
    const categories = {
        social: CHANNELS.filter(c => c.category === 'social'),
        info: CHANNELS.filter(c => c.category === 'info'),
        games: CHANNELS.filter(c => c.category === 'games')
    };

    return (
        <div className="w-full md:w-64 bg-neutral-900/50 border border-white/5 rounded-2xl p-4 backdrop-blur-sm flex flex-col h-full overflow-hidden">
            <div className="flex items-center gap-2 mb-4 flex-shrink-0">
                <Hash className="text-cyber-red" size={20} />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Каналы</h3>
            </div>

            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {/* Social */}
                <div>
                    <p className="text-[10px] text-gray-600 uppercase tracking-wider font-bold mb-2 ml-2">💬 ОБЩЕНИЕ</p>
                    <div className="space-y-1">
                        {categories.social.map(channel => (
                            <ChannelButton
                                key={channel.id}
                                channel={channel}
                                isActive={currentChannel === channel.id}
                                onClick={() => onChannelChange(channel.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div>
                    <p className="text-[10px] text-gray-600 uppercase tracking-wider font-bold mb-2 ml-2">ℹ️ ИНФА</p>
                    <div className="space-y-1">
                        {categories.info.map(channel => (
                            <ChannelButton
                                key={channel.id}
                                channel={channel}
                                isActive={currentChannel === channel.id}
                                onClick={() => onChannelChange(channel.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Games */}
                <div>
                    <p className="text-[10px] text-gray-600 uppercase tracking-wider font-bold mb-2 ml-2">🎮 ИГРЫ</p>
                    <div className="space-y-1">
                        {categories.games.map(channel => (
                            <ChannelButton
                                key={channel.id}
                                channel={channel}
                                isActive={currentChannel === channel.id}
                                onClick={() => onChannelChange(channel.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface ChannelButtonProps {
    channel: Channel;
    isActive: boolean;
    onClick: () => void;
}

function ChannelButton({ channel, isActive, onClick }: ChannelButtonProps) {
    return (
        <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all ${isActive
                ? 'bg-cyber-red/20 text-cyber-red border border-cyber-red/30 shadow-[0_0_15px_rgba(255,46,99,0.2)]'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
        >
            <span className="text-base">{channel.emoji}</span>
            <span className="text-xs font-bold uppercase tracking-wide">{channel.name}</span>
            {isActive && (
                <motion.div
                    layoutId="active-channel"
                    className="ml-auto w-2 h-2 rounded-full bg-cyber-red"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
            )}
        </motion.button>
    );
}

export { CHANNELS };
