'use client';

import { useState, useEffect } from 'react';
import { socketClient, ConnectedUser } from '@/lib/socket-client';
import { Users, Swords } from 'lucide-react';
import { motion } from 'framer-motion';
import ClubBadge from './ClubBadge';

interface OnlineUsersProps {
    onChallengeClick?: (targetUser: ConnectedUser) => void;
}

export default function OnlineUsers({ onChallengeClick }: OnlineUsersProps) {
    const [onlineCount, setOnlineCount] = useState(0);
    const [users, setUsers] = useState<ConnectedUser[]>([]);

    useEffect(() => {
        socketClient.onUserCount((count) => {
            setOnlineCount(count);
        });

        socketClient.onUserList((userList) => {
            setUsers(userList);
        });
    }, []);



    const handleUserClick = (user: ConnectedUser) => {
        if (user.userId === socketClient.getUserId()) {
            return; // Can't challenge yourself
        }
        onChallengeClick?.(user);
    };

    return (
        <div className="h-full bg-neutral-900/50 backdrop-blur border border-white/10 rounded-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/10 bg-black/40">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-cyber-purple" />
                        <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">В СЕТИ</h3>
                    </div>

                    <div className="flex items-center gap-2 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-black text-green-500">{onlineCount}</span>
                    </div>
                </div>
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {users.length === 0 && (
                    <div className="flex items-center justify-center h-full text-gray-700">
                        <div className="text-center">
                            <Users className="w-10 h-10 mx-auto mb-3 opacity-20" />
                            <p className="text-[10px] font-bold uppercase tracking-widest">Пустота...</p>
                        </div>
                    </div>
                )}

                {users.map((user, index) => {
                    const isOwnUser = user.userId === socketClient.getUserId();

                    return (
                        <motion.div
                            key={user.userId}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => !isOwnUser && handleUserClick(user)}
                            className={`group px-3 py-2.5 rounded-2xl border transition-all ${user.club === 'altufievo' ? 'text-red-500 border-red-500/30 bg-red-500/10' :
                                user.club === 'vlasino' ? 'text-purple-500 border-purple-500/30 bg-purple-500/10' :
                                    'text-gray-400 border-white/10 bg-white/5'
                                } ${isOwnUser
                                    ? 'cursor-default opacity-60'
                                    : 'cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:border-white/20'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    {/* Avatar Thumbnail */}
                                    <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 bg-black/40 border-2 border-white/5">
                                        <img
                                            src={`/images/social-hub/${(user.avatar && user.avatar !== 'undefined') ? user.avatar : 'cat'}.png`}
                                            alt="avatar"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/images/social-hub/cat.png';
                                            }}
                                        />
                                    </div>

                                    <div className="flex flex-col min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <span className={`text-sm font-bold truncate leading-none ${isOwnUser ? 'text-white' : ''
                                                }`}>
                                                {user.nickname || user.userId}
                                            </span>
                                        </div>
                                        {isOwnUser && (
                                            <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest mt-1">ЭТО ТЫ</span>
                                        )}
                                    </div>
                                </div>

                                {!isOwnUser && !user.isAdmin && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUserClick(user);
                                        }}
                                        className="opacity-0 group-hover:opacity-100 transition-all bg-cyber-red/20 p-2 rounded-xl text-cyber-red hover:bg-cyber-red hover:text-white transform scale-90 hover:scale-100 shadow-glow"
                                        title="Вызвать на дуэль"
                                    >
                                        <Swords className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Footer Hint */}
            <div className="px-4 py-4 border-t border-white/10 bg-black/40">
                <p className="text-[9px] text-gray-600 text-center font-bold uppercase tracking-widest leading-relaxed">
                    Тыкай на чела, <br /> чтобы бросить вызов ⚔️
                </p>
            </div>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(185, 0, 255, 0.2);
          border-radius: 10px;
        }
        .shadow-glow {
           filter: drop-shadow(0 0 5px rgba(255, 46, 99, 0.4));
        }
      `}</style>
        </div>
    );
}
