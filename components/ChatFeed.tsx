'use client';

import { useState, useEffect, useRef } from 'react';
import { socketClient, ChatMessage } from '@/lib/socket-client';
import { Send, WifiOff, Smile, Info, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ClubBadge from './ClubBadge';

const STICKERS = [
    { id: 'doge', name: 'Doge' },
    { id: 'epic face', name: 'Epic Face' },
    { id: 'illuminaticonfirmed', name: 'Illuminati' },
    { id: 'minecraft', name: 'Minecraft' },
    { id: 'mlg deal with it glasses', name: 'MLG' },
    { id: 'mocking spongebob', name: 'Spongebob' },
    { id: 'nyan cat', name: 'Nyan Cat' },
    { id: 'pepe the frog', name: 'Pepe' },
    { id: 'rickroll', name: 'Rickroll' },
    { id: 'spooderman', name: 'Spooderman' },
    { id: 'troll face', name: 'Troll Face' },
];

const ADMINS = {
    novokosino: [
        { id: 'n_ivan', name: 'Иван', role: 'Good Admin', bio: 'Любит шутеры и энергетики. Всегда разрулит любой вопрос. Ночной администратор', avatar: 'ape' },
        { id: 'n_grigory', name: 'Григорий', role: 'Технический Гуру', bio: 'Чинит ПК силой мысли. Мастер разгона мониторов. Дневной администратор', avatar: 'brain' },
        { id: 'n_alexey', name: 'Алексей', role: 'Community Lead', bio: 'Самый дружелюбный админ. Знает всех по именам. Дневной администратор', avatar: 'cat' },
        { id: 'n_artem', name: 'Артем', role: 'Ночной Страж', bio: 'Правит ночными сменами. Железная дисциплина и порядок.', avatar: 'robot' }
    ],
    altufievo: [
        { id: 'a_bato', name: 'Бато', role: 'Club Manager', bio: 'Стратег и про-игрок в Dota 2. Строит лучший сервис. Дневной администратор', avatar: 'pepe' },
        { id: 'a_alexander', name: 'Железный Алекс', role: 'Hardware Guru', bio: 'Знает всё про RTX 4090. Твой конфиг в надежных руках. Ночной администратор', avatar: 'fire' },
        { id: 'a_igor', name: 'Игорь', role: 'Tournament Lead', bio: 'Организатор турниров. За честную игру и жесткий скилл. Дневной администратор', avatar: 'dog' },
        { id: 'a_ekaterina', name: 'Екатерина', role: 'Hospitality Lead', bio: 'Поможет найти идеальное место. Улыбка и уют клуба. Ночной администратор', avatar: 'katya' }
    ]
};

function AdminCard({ admin, club, likes, isConnected }: { admin: any, club: 'vlasino' | 'altufievo', likes: number, isConnected: boolean }) {
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const userId = socketClient.getUserId();
        const key = `admin_likes_${userId}_${admin.id}_active`;
        setIsLiked(sessionStorage.getItem(key) === 'true');
    }, [admin.id]);

    const handleLike = () => {
        if (!isConnected) return;

        const userId = socketClient.getUserId();
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        sessionStorage.setItem(`admin_likes_${userId}_${admin.id}_active`, newIsLiked.toString());

        socketClient.likeAdmin(admin.id, newIsLiked);
    };

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.01 }}
            className="bg-black/40 border border-white/5 rounded-[2.5rem] p-6 relative overflow-hidden group shadow-2xl"
        >
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${club === 'altufievo' ? 'from-red-500/10' : 'from-cyber-red/10'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-3xl`} />

            <div className="flex flex-col md:flex-row gap-8 relative z-10 items-center md:items-start text-center md:text-left">
                <div className="w-40 h-40 md:w-[130px] md:h-[130px] rounded-[2rem] overflow-hidden border-2 border-white/10 flex-shrink-0 relative shadow-glow">
                    <img
                        src={`/images/social-hub/${admin.avatar}.png`}
                        alt={admin.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/social-hub/official.png';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="flex-1 flex flex-col justify-between self-stretch">
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                            <h4 className="text-3xl font-black text-white leading-tight tracking-tight">{admin.name}</h4>
                            <p className={`text-xs font-bold uppercase tracking-[0.25em] mt-1 ${club === 'altufievo' ? 'text-red-500' : 'text-cyber-red'}`}>{admin.role}</p>
                        </div>
                        <button
                            onClick={handleLike}
                            className={`flex flex-col items-center gap-1.5 p-4 rounded-3xl bg-white/5 border border-white/5 transition-all ${isLiked ? 'text-cyber-red border-cyber-red/30 bg-cyber-red/10' : 'text-gray-600 hover:text-gray-400 hover:bg-white/10'}`}
                        >
                            <Heart size={26} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "drop-shadow-[0_0_8px_rgba(255,46,99,0.8)]" : ""} />
                            <span className="text-xs font-black">{likes}</span>
                        </button>
                    </div>

                    <div className="mt-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-gray-400 font-medium leading-relaxed italic text-sm md:text-base">&quot;{admin.bio}&quot;</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <ClubBadge club={club} size="sm" />
                    <span className="text-[10px] text-green-500 font-black uppercase tracking-[0.25em] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        В сети 24/7
                    </span>
                </div>
                <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-white/5 bg-white/5">
                    Official CyberX Staff
                </div>
            </div>
        </motion.div>
    );
}

export default function ChatFeed({ channelId = 'general' }: { channelId?: string }) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputText, setInputText] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
    const [showStickers, setShowStickers] = useState(false);
    const [adminLikes, setAdminLikes] = useState<Record<string, number>>({});
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const CHANNEL_TITLES: Record<string, string> = {
        general: '💬 трэш-ток арена',
        news: '📰 новости cyberx',
        rules: '📜 правила клуба',
        market: '📦 барахолка cyberx',
        cs2: '🔫 cs2 arena',
        valorant: '🎯 valorant hub',
        dota2: '🛡️ dota 2 hub',
        reviews: '⭐️ отзывы игроков',
        suggestions: '💡 предложения',
        arena: '⚔️ арена дуэлей',
        admins: '👑 наши админы'
    };

    const CHANNEL_SUBTITLES: Record<string, string> = {
        general: 'сначала базарим, потом стреляемся',
        news: 'будь в курсе всех обнов и акций',
        rules: 'читай внимательно, чтобы не словить бан',
        market: 'продажа девайсов и техники от клуба и игроков',
        cs2: 'скилл решает, нытье — нет',
        valorant: 'абилки в тайминг, пацаны',
        dota2: 'мид занят, но в чате места хватит',
        reviews: 'честный фидбэк от наших легенд',
        suggestions: 'твое мнение важно для нас',
        arena: 'вызовы в реальном времени',
        admins: 'знакомься с теми, кто делает движ'
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;

        console.log('[ChatFeed] Component mounted, setting up socket');

        // Clear any existing listeners to prevent duplication that are outside the connect callback
        socketClient.off('chat:cleared');

        // Connect to Socket.io server
        socketClient.connect(() => {
            console.log('[ChatFeed] Socket connected, registering listeners');
            setIsConnected(true);

            // 1. Define handlers
            const historyHandler = ({ channel, messages: history }: any) => {
                console.log(`[ChatFeed] Received history for #${channel}:`, history.length, 'messages');
                if (channel === channelId) {
                    setMessages(history);
                    setTimeout(scrollToBottom, 100);
                }
            };

            const newMessageHandler = (message: any) => {
                if (message.channel === channelId) {
                    console.log(`[ChatFeed] Received new message in #${message.channel}`);
                    setMessages((prev) => {
                        if (prev.find(m => m.id === message.id)) return prev;
                        return [...prev, message];
                    });
                    setTimeout(scrollToBottom, 50);
                }
            };

            const updatedMessageHandler = (updatedMsg: any) => {
                if (updatedMsg.channel === channelId) {
                    console.log(`[ChatFeed] Received updated message in #${updatedMsg.channel}`);
                    setMessages((prev) => prev.map(m => m.id === updatedMsg.id ? { ...m, ...updatedMsg } : m));
                }
            };

            const typingHandler = ({ userId, typing }: any) => {
                setTypingUsers((prev) => {
                    const next = new Set(prev);
                    if (typing) next.add(userId);
                    else next.delete(userId);
                    return next;
                });
            };

            const deletedMessageHandler = ({ messageId }: { messageId: string | number }) => {
                console.log(`[ChatFeed] Received deletion for message ${messageId}`);
                setMessages((prev) => prev.filter(m => String(m.id) !== String(messageId)));
            };

            const likesHandler = (counts: any) => {
                setAdminLikes(prev => ({ ...prev, ...counts }));
            };

            // 2. Register listeners (Surgically)
            socketClient.onMessageHistory(historyHandler);
            socketClient.onNewMessage(newMessageHandler);
            socketClient.on('message:updated', updatedMessageHandler);
            socketClient.onMessageDeleted(deletedMessageHandler);
            socketClient.onUserTyping(typingHandler);
            socketClient.onAdminLikesUpdate(likesHandler);

            socketClient.getAdminLikes();

            // 3. Store for cleanup
            return () => {
                socketClient.off('message:history', historyHandler);
                socketClient.off('message:new', newMessageHandler);
                socketClient.off('message:updated', updatedMessageHandler);
                socketClient.off('message:deleted', deletedMessageHandler);
                socketClient.off('user:typing', typingHandler);
                socketClient.off('admin:likes_update', likesHandler);
            };
        });

        socketClient.onChatCleared(() => {
            setMessages([]);
        });

        return () => {
            // Keep connection alive for other components
        };
    }, [channelId]); // Re-run when channelId changes

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = (e?: React.FormEvent, stickerId?: string) => {
        e?.preventDefault();

        if ((!inputText.trim() && !stickerId) || !isConnected) return;

        socketClient.sendMessage(inputText, stickerId);
        setInputText('');
        setShowStickers(false);

        socketClient.stopTyping();
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = null;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
        socketClient.startTyping();
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => socketClient.stopTyping(), 1000);
    };



    return (
        <div className="flex flex-col h-full bg-neutral-900/50 backdrop-blur border border-white/10 rounded-2xl overflow-hidden relative">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 bg-black/40">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div>
                            <h2 className="text-xl font-tactic text-white flex items-center gap-2 uppercase tracking-tighter">
                                {CHANNEL_TITLES[channelId] || '💬 ЧАТ КАНАЛА'}
                            </h2>
                            <p className="text-[10px] text-gray-500 mt-1 font-bold uppercase tracking-widest">
                                {CHANNEL_SUBTITLES[channelId] || 'Залетай в общение'}
                            </p>
                        </div>

                        {channelId === 'news' && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 px-2 py-1 bg-white/5 border border-white/10 rounded-xl group cursor-pointer hover:bg-white/10 transition-all shadow-glow"
                            >
                                <div className="p-0.5 bg-white rounded-md">
                                    <img src="/images/social-hub/tg-qr.png" alt="TG QR" className="w-8 h-8 object-contain" />
                                </div>
                                <div className="pr-1">
                                    <p className="text-[8px] font-black text-white leading-tight uppercase opacity-50">Наш канал</p>
                                    <p className="text-[9px] font-black text-cyber-red leading-none uppercase tracking-tighter">ПОДПИШИСЬ</p>
                                </div>
                            </motion.div>
                        )}

                        <div className="hidden lg:flex items-center gap-4 ml-6 pl-6 border-l border-white/10">
                            <div className="flex flex-col gap-1">
                                <p className="text-[8px] font-black text-yellow-500 uppercase tracking-widest leading-none">Официальные аккаунты админов:</p>
                                <div className="flex gap-4">
                                    <span className="text-[10px] font-bold text-gray-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">admin.altufievo</span>
                                    <span className="text-[10px] font-bold text-gray-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">admin.novokosino</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {isConnected ? (
                            <span className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Онлайн</span>
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <WifiOff className="w-4 h-4 text-red-500" />
                                <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Оффлайн</span>
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Pinned Message */}

            < div
                className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar"
                style={{
                    scrollBehavior: 'smooth',
                    overflowAnchor: 'none'
                }}
            >
                {channelId === 'admins' ? (
                    <div className="space-y-8 py-4">
                        <section>
                            <h3 className="text-sm font-black text-cyber-red uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-cyber-red/30" />
                                🟣 НОВОКОСИНО
                            </h3>
                            <div className="flex flex-col gap-6">
                                {ADMINS.novokosino.map(admin => (
                                    <AdminCard
                                        key={admin.id}
                                        admin={admin}
                                        club="vlasino"
                                        likes={adminLikes[admin.id] || 0}
                                        isConnected={isConnected}
                                    />
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-sm font-black text-red-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-red-500/30" />
                                🔴 АЛТУФЬЕВО
                            </h3>
                            <div className="flex flex-col gap-6">
                                {ADMINS.altufievo.map(admin => (
                                    <AdminCard
                                        key={admin.id}
                                        admin={admin}
                                        club="altufievo"
                                        likes={adminLikes[admin.id] || 0}
                                        isConnected={isConnected}
                                    />
                                ))}
                            </div>
                        </section>

                        <div className="pt-8 text-center opacity-30">
                            <p className="text-[10px] font-bold uppercase tracking-widest italic">Любой косяк? Пиши в #предложения или зови админа в клубе!</p>
                        </div>
                    </div>
                ) : messages.length === 0 && (
                    <div className="flex items-center justify-center h-full text-gray-600">
                        <div className="text-center">
                            <p className="font-tactic text-lg uppercase tracking-widest">ТИШИНА...</p>
                            <p className="text-[10px] mt-1 font-bold uppercase tracking-widest opacity-50">Будь первым, кто вбросит!</p>
                        </div>
                    </div>
                )}

                {
                    channelId !== 'admins' && (
                        <AnimatePresence initial={false}>
                            {messages.map((msg, idx) => {
                                const isOwnMessage = msg.userId === socketClient.getUserId();
                                const isOfficial = msg.author === 'CyberX' || msg.channel === 'news' || msg.channel === 'market';
                                const isNews = msg.channel === 'news';
                                const isMarket = msg.channel === 'market';

                                return (
                                    <motion.div
                                        key={msg.id || idx}
                                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        className={`flex items-start gap-3 ${isOwnMessage ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white/10 flex-shrink-0 bg-black/40">
                                            <img
                                                src={`/images/social-hub/${(isOfficial || msg.avatar === 'official') ? 'official' : (msg.avatar || '1')}.png`}
                                                alt="avatar"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/images/social-hub/1.png';
                                                }}
                                            />
                                        </div>

                                        <div className={`flex flex-col max-w-[85%] ${isOwnMessage ? 'items-end' : ''}`}>
                                            <div className="flex items-center gap-2 mb-1 px-1">
                                                <span className={`text-xs font-bold ${isOwnMessage ? 'text-cyber-red' : msg.isAdmin ? 'text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]' : isOfficial ? 'text-cyber-red' : 'text-white'}`}>
                                                    {isNews ? '📰 CyberX Новости' : isMarket ? (msg.nickname || '📦 CyberX Барахолка') : (msg.nickname || msg.userId)}
                                                </span>
                                                {!isOwnMessage && <ClubBadge club={(msg.club === 'neutral' || !msg.club) ? 'altufievo' : (msg.club as 'altufievo' | 'vlasino')} size="sm" isAdmin={msg.isAdmin} />}
                                                {!['reviews', 'suggestions'].includes(channelId) && (
                                                    <span className="text-[9px] text-gray-600 font-bold uppercase">
                                                        {new Date(msg.date ? msg.date * 1000 : msg.timestamp * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                )}
                                            </div>

                                            {msg.sticker ? (
                                                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="px-2 py-2">
                                                    <img src={`/images/social-hub/${msg.sticker}.ico`} alt="sticker" className="w-24 h-24 object-contain" />
                                                </motion.div>
                                            ) : (
                                                <div className={`px-4 py-2.5 rounded-2xl shadow-xl border relative overflow-hidden ${isOwnMessage
                                                    ? 'bg-cyber-red/20 border-cyber-red/30 text-white rounded-tr-none'
                                                    : msg.isAdmin
                                                        ? 'bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/50 text-white rounded-tl-none shadow-[0_0_15px_rgba(234,179,8,0.2)]'
                                                        : isOfficial
                                                            ? 'bg-slate-800/80 border-cyber-red/30 text-gray-100 rounded-tl-none shadow-[0_0_15px_rgba(255,46,99,0.1)]'
                                                            : 'bg-white/5 border-white/10 text-gray-200 rounded-tl-none'
                                                    }`}>
                                                    {/* Golden Shine Effect for Admins */}
                                                    {msg.isAdmin && <div className="absolute inset-0 bg-yellow-400/5 pointer-events-none" />}

                                                    {/* Delete Button (Only for Admins) */}
                                                    {socketClient.getIsAdmin() && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                if (confirm('Удалить сообщение?')) {
                                                                    // Optimistic update: remove immediately
                                                                    setMessages(prev => prev.filter(m => m.id != msg.id));
                                                                    socketClient.deleteMessage(msg.id!);
                                                                }
                                                            }}
                                                            className="absolute top-1 right-1 p-1.5 text-gray-400 hover:text-red-500 bg-black/60 hover:bg-black/90 rounded-full transition-all z-50 cursor-pointer shadow-lg border border-white/10"
                                                            title="Удалить"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                                        </button>
                                                    )}
                                                    {/* Media Handling for Official Posts */}
                                                    {isOfficial && msg.mediaUrl && (
                                                        <div className="mb-3 rounded-xl overflow-hidden border border-white/10 bg-black/20 group/media relative">
                                                            {msg.mediaType === 'video' ? (
                                                                <video
                                                                    src={msg.mediaUrl}
                                                                    controls
                                                                    className="w-full max-h-[300px] object-contain"
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={msg.mediaUrl}
                                                                    alt="news media"
                                                                    className="w-full max-h-[400px] object-cover"
                                                                    referrerPolicy="no-referrer"
                                                                />
                                                            )}
                                                        </div>
                                                    )}

                                                    <p className="text-sm leading-relaxed break-words whitespace-pre-line">
                                                        {msg.text.split('/join').map((part, i, arr) => {
                                                            if (i === 0) return part;
                                                            // Part contains the roomId and rest of string
                                                            const roomIdMatch = part.match(/^\s+(cyberx-[a-f0-9-]+)/);
                                                            if (roomIdMatch) {
                                                                const roomId = roomIdMatch[1];
                                                                const rest = part.substring(roomIdMatch[0].length);

                                                                if (msg.callStatus === 'ended') {
                                                                    return (
                                                                        <span key={i}>
                                                                            <span className="inline-flex items-center gap-2 px-3 py-1 mx-1 bg-red-600/50 text-white/50 rounded-full text-xs font-bold uppercase tracking-wider border border-red-500/30">
                                                                                📞 Звонок завершён
                                                                            </span>
                                                                            {rest}
                                                                        </span>
                                                                    );
                                                                }

                                                                return (
                                                                    <span key={i}>
                                                                        <button
                                                                            onClick={() => socketClient.joinCall(roomId)}
                                                                            className="inline-flex items-center gap-2 px-3 py-1 mx-1 bg-green-600 hover:bg-green-500 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-glow"
                                                                        >
                                                                            📞 Присоединиться
                                                                        </button>
                                                                        {rest}
                                                                    </span>
                                                                );
                                                            }
                                                            return '/join' + part;
                                                        })}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    )
                }

                {
                    typingUsers.size > 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-2">
                            <div className="flex gap-1 bg-white/5 px-2 py-1.5 rounded-full"><span className="animate-bounce">.</span><span className="animate-bounce" style={{ animationDelay: '0.1s' }}>.</span><span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span></div>
                            {Array.from(typingUsers)[0]} печатает...
                        </motion.div>
                    )
                }

                <div ref={messagesEndRef} />
            </div >

            {/* Stickers Picker */}
            <AnimatePresence>
                {
                    showStickers && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute bottom-24 left-4 right-4 bg-neutral-900 border border-white/10 rounded-2xl p-4 shadow-2xl z-20">
                            <div className="flex gap-4">
                                {STICKERS.map((s) => (
                                    <button key={s.id} onClick={() => handleSendMessage(undefined, s.id)} className="w-20 h-20 bg-black/40 rounded-xl border border-white/5 hover:border-cyber-red transition-all p-2 group">
                                        <img src={`/images/social-hub/${s.id}.ico`} alt={s.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence >

            {/* Input Area */}
            {
                ['news', 'rules', 'market', 'admins'].includes(channelId) && !socketClient.getIsAdmin() ? (
                    <div className="p-4 border-t border-white/10 bg-black/60 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-cyber-red/10 flex items-center justify-center border border-cyber-red/20 shadow-glow">
                                <Info size={14} className="text-cyber-red" />
                            </div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight lowercase">
                                {channelId === 'market'
                                    ? 'это официальная витрина. для размещения своих девайсов обратись к админу.'
                                    : 'это официальный канал. только для чтения.'}
                            </p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-black/40">
                        <div className="flex gap-2">
                            <button type="button" onClick={() => setShowStickers(!showStickers)} className={`px-4 rounded-2xl border-2 transition-all ${showStickers ? 'border-cyber-purple bg-cyber-purple/20 text-white' : 'border-transparent bg-white/5 text-gray-500 hover:text-white'}`}><Smile size={20} /></button>
                            <input type="text" value={inputText} onChange={handleInputChange} placeholder={isConnected ? "Че скажешь?" : "Грузим чат..."} disabled={!isConnected} className="flex-1 px-5 py-4 rounded-2xl bg-white/5 border-2 border-transparent focus:border-cyber-red/50 outline-none text-sm text-white placeholder-gray-700 transition-all font-bold" />
                            <button type="submit" disabled={!isConnected || (!inputText.trim() && !showStickers)} className="px-6 py-4 bg-cyber-red hover:bg-red-600 rounded-2xl font-bold text-white transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,46,99,0.3)] active:scale-95"><Send className="w-5 h-5 shadow-glow" /></button>
                        </div>
                    </form>
                )
            }

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 46, 99, 0.2); border-radius: 10px; }
      `}</style>
        </div >
    );
}
