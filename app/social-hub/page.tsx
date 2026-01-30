'use client';

import { useState, useEffect } from 'react';
import { Swords, Zap, MessageSquare, Bell, Trophy, ShieldAlert, LogOut } from 'lucide-react';
import ChatFeed from '@/components/ChatFeed';
import OnlineUsers from '@/components/OnlineUsers';
import QuickChallengeModal from '@/components/QuickChallengeModal';
import Onboarding from '@/components/Onboarding';
import ChallengeNotification from '@/components/ChallengeNotification';
import ChallengeAcceptedNotification from '@/components/ChallengeAcceptedNotification';
import ChannelSwitcher from '@/components/ChannelSwitcher';
import PinnedMessage from '@/components/PinnedMessage';
import { socketClient, ConnectedUser, ChallengeSyncData } from '@/lib/socket-client';
import { ChallengeData } from '@/components/QuickChallengeModal';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const ADMIN_TIPS = [
    "Уважай соперников в чате, разбирайся на Арене!",
    "Хочешь больше трэш-тока? Заходи в наш Discord!",
    "Победа на Арене дает +500 к карме CyberX.",
    "Не забудь подтвердить результат у админа клуба.",
    "Самые жаркие дуэли проходят по пятницам!",
    "Ставь на кон только то, что готов проиграть."
];

export default function SocialHubPage() {
    const [showChallengeModal, setShowChallengeModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<ConnectedUser | null>(null);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [currentUserId, setCurrentUserId] = useState('');
    const [currentAvatar, setCurrentAvatar] = useState('cat');
    const [incomingChallenge, setIncomingChallenge] = useState<ChallengeSyncData | null>(null);
    const [acceptedChallenge, setAcceptedChallenge] = useState<{ acceptor: string, acceptorPc?: string } | null>(null);
    const [currentChannel, setCurrentChannel] = useState('general');

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Check if onboarding is needed
        const storedId = sessionStorage.getItem('social_hub_user_id');
        if (!storedId) {
            setShowOnboarding(true);
        } else {
            setCurrentUserId(storedId);
            setCurrentAvatar(sessionStorage.getItem('social_hub_avatar') || 'cat');
            socketClient.connect();
        }

        // IMPORTANT: Clear old listeners before adding new one
        socketClient.off('challenge:received');

        // Listen for incoming challenges
        socketClient.onChallengeReceived((challenge) => {
            console.log('[SocialHub] Challenge received:', challenge);
            setIncomingChallenge(challenge);
            setTimeout(() => setIncomingChallenge(null), 15000);
        });

        socketClient.onChallengeAccepted((data) => {
            console.log('[SocialHub] Challenge accepted:', data);
            setAcceptedChallenge(data);
            setTimeout(() => setAcceptedChallenge(null), 10000);
        });

        return () => {
            // Clean up
        };
    }, []);

    const handleChallengeClick = (user: ConnectedUser) => {
        setSelectedUser(user);
        setShowChallengeModal(true);
    };

    const handleOnboardingComplete = () => {
        console.log('[SocialHub] Onboarding complete callback triggered');
        const nick = sessionStorage.getItem('social_hub_user_id') || '';
        const avatar = sessionStorage.getItem('social_hub_avatar') || 'cat';
        console.log('[SocialHub] Setting user state:', { nick, avatar });
        setShowOnboarding(false);
        setCurrentUserId(nick);
        setCurrentAvatar(avatar);
        socketClient.connect();
    };

    const handleLogout = () => {
        sessionStorage.removeItem('social_hub_user_id');
        sessionStorage.removeItem('social_hub_avatar');
        sessionStorage.removeItem('user_club');
        sessionStorage.removeItem('arena_pc');

        setShowOnboarding(true);
        setCurrentUserId('');
        setCurrentAvatar('1');
        socketClient.disconnect();
    };

    const handleChannelChange = (channelId: string) => {
        setCurrentChannel(channelId);
        socketClient.switchChannel(channelId);
    };

    const handleChallengeSubmit = async (challengeData: ChallengeData) => {
        try {
            const creatorNick = currentUserId || 'Unknown';
            const creatorPC = sessionStorage.getItem('arena_pc') || '0';

            await axios.post('/api/arena/lobbies', {
                creator_nick: creatorNick,
                creator_pc: creatorPC,
                game: challengeData.game,
                bet_amount: challengeData.betAmount,
                bet_item: null,
                rules: challengeData.rules || null,
                team_size: 1
            });

            // Real-time sync
            socketClient.sendChallenge({
                from: creatorNick,
                to: selectedUser?.userId || 'Anyone',
                game: challengeData.game,
                betAmount: challengeData.betAmount,
                avatar: currentAvatar,
                pcNumber: challengeData.pcNumber
            });

            setShowChallengeModal(false);
        } catch (error) {
            console.error('[Social Hub] Failed to create challenge:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-cyber-bg text-white font-chakra bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-cyber-bg to-cyber-bg selection:bg-cyber-red selection:text-white flex flex-col overflow-hidden h-screen w-screen">
            {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}

            <AnimatePresence>
                {incomingChallenge && (
                    <ChallengeNotification
                        challenge={incomingChallenge}
                        onAccept={(pcNumber) => {
                            socketClient.acceptChallenge(incomingChallenge, pcNumber);
                            setIncomingChallenge(null);
                        }}
                        onDecline={() => setIncomingChallenge(null)}
                    />
                )}
                {/* Accepted Notification for Challenger */}
                {acceptedChallenge && (
                    <ChallengeAcceptedNotification
                        acceptor={acceptedChallenge.acceptor}
                        acceptorPc={acceptedChallenge.acceptorPc}
                        onClose={() => setAcceptedChallenge(null)}
                    />
                )}
            </AnimatePresence>

            {/* Header */}
            <header className="max-w-[1600px] w-full mx-auto px-6 flex justify-between items-center border-b border-white/5 pb-8 pt-10 flex-shrink-0">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center space-x-6">
                    <div className="p-4 bg-cyber-red rounded-3xl shadow-[0_0_30px_rgba(255,46,99,0.4)]"><Swords size={32} className="text-white" /></div>
                    <div>
                        <div className="flex items-baseline">
                            <span className="font-tactic font-bold text-4xl tracking-tighter text-white lowercase group">
                                cyberx<span className="text-[#FF2E63] drop-shadow-[0_0_15px_#FF2E63]">_connect</span>
                            </span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-bold tracking-[0.4em] uppercase mt-2 ml-1">Болтай ← Зарубайся → Доминируй</p>
                    </div>
                </motion.div>

                <div className="flex-1 flex justify-center px-8">
                    <PinnedMessage />
                </div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
                    <div className="flex items-center gap-5 bg-black/40 px-5 py-3 rounded-3xl border border-white/10 shadow-2xl">
                        <div className="text-right flex flex-col items-end">
                            <span className="text-sm font-black text-white tracking-wide uppercase">{currentUserId || 'Гость'}</span>
                            <div className="flex items-center gap-1.5 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span>
                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none">В сети</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-cyber-red/50 bg-black/40 shadow-glow cursor-pointer">
                            <img
                                src={`/images/social-hub/${(currentAvatar && currentAvatar !== 'undefined') ? currentAvatar : 'cat'}.png`}
                                alt="me"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/images/social-hub/cat.png';
                                }}
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1, rotate: -10 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleLogout}
                        className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-500 hover:text-cyber-red hover:bg-cyber-red/10 transition-all shadow-xl group"
                        title="Выйти из профиля"
                    >
                        <LogOut size={24} className="group-hover:drop-shadow-[0_0_8px_rgba(255,46,99,0.5)]" />
                    </motion.button>
                </motion.div>
            </header>

            {/* Main Layout */}
            <main className="max-w-[1700px] w-full mx-auto px-6 py-4 flex-1 overflow-hidden min-h-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full min-h-0">
                    <div className="lg:col-span-2 h-full overflow-hidden flex flex-col"><OnlineUsers onChallengeClick={handleChallengeClick} /></div>
                    <div className="lg:col-span-8 h-full overflow-hidden flex flex-col"><ChatFeed channelId={currentChannel} /></div>
                    <div className="lg:col-span-2 h-full overflow-hidden flex flex-col">
                        <ChannelSwitcher currentChannel={currentChannel} onChannelChange={handleChannelChange} />
                    </div>
                </div>
            </main>

            <AnimatePresence>{showChallengeModal && selectedUser && <QuickChallengeModal targetUser={selectedUser} onClose={() => setShowChallengeModal(false)} onSubmit={handleChallengeSubmit} />}</AnimatePresence>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
        .shadow-glow { filter: drop-shadow(0 0 8px rgba(255, 46, 99, 0.4)); }
      `}</style>
        </div>
    );
}
