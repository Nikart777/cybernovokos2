'use client';

import { useState, useEffect, useCallback } from 'react';
import { Phone, PhoneOff, PhoneIncoming, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import JitsiCallContainer from './JitsiCallContainer';
import type { ActiveCall, CallState } from '@/hooks/useCallState';

interface CallModalProps {
    state: CallState;
    targetUser?: ActiveCall['targetUser'];
    roomId?: string;
    onAccept?: () => void;
    onReject?: () => void;
    onCancel?: () => void;
    onEndCall?: () => void;
    onClose?: () => void;
}

// Declare global window.__jitsiApi
declare global {
    interface Window {
        __jitsiApi?: {
            executeCommand: (command: string, ...args: any[]) => void;
            isAudioMuted: () => Promise<boolean>;
            addEventListener: (event: string, callback: Function) => void;
            removeEventListener: (event: string, callback: Function) => void;
            dispose: () => void;
        };
    }
}

export default function CallModal({
    state,
    targetUser,
    roomId,
    onAccept,
    onReject,
    onCancel,
    onEndCall,
    onClose
}: CallModalProps) {
    const [jitsiApi, setJitsiApi] = useState<any>(null);

    const memoizedOnApiReady = useCallback((api: any) => {
        console.log('[CallModal] Jitsi API is ready, setting state');
        setJitsiApi(api);
        window.__jitsiApi = api;
    }, []);

    // Auto-close for ended/rejected states
    useEffect(() => {
        if (state === 'rejected' || state === 'ended') {
            const timer = setTimeout(() => {
                onClose?.();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [state, onClose]);


    // Don't render if idle
    if (state === 'idle') return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                onClick={(e) => {
                    if (e.target === e.currentTarget && state !== 'in-call') {
                        onClose?.();
                    }
                }}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl"
                >
                    {/* Outgoing Call */}
                    {state === 'outgoing' && (
                        <div className="space-y-6 text-center">
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-500 animate-pulse">
                                <Image
                                    src={`/images/social-hub/${targetUser?.avatar || 'cat'}.png`}
                                    alt="avatar"
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {targetUser?.nickname}
                                </h3>
                                <p className="text-gray-400 animate-pulse">Звоним...</p>
                            </div>
                            <button
                                onClick={onCancel}
                                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                            >
                                <PhoneOff className="w-5 h-5" />
                                Отменить
                            </button>
                        </div>
                    )}

                    {/* Incoming Call */}
                    {state === 'incoming' && (
                        <div className="space-y-6 text-center">
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-500 animate-bounce">
                                <Image
                                    src={`/images/social-hub/${targetUser?.avatar || 'cat'}.png`}
                                    alt="avatar"
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {targetUser?.nickname}
                                </h3>
                                <p className="text-green-400 font-semibold flex items-center justify-center gap-2">
                                    <PhoneIncoming className="w-5 h-5 animate-pulse" />
                                    Входящий звонок
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={onReject}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                                >
                                    <PhoneOff className="w-5 h-5" />
                                    Отклонить
                                </button>
                                <button
                                    onClick={onAccept}
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/50"
                                >
                                    <Phone className="w-5 h-5" />
                                    Принять
                                </button>
                            </div>
                        </div>
                    )}

                    {/* In Call */}
                    {state === 'in-call' && roomId && (
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-500 animate-pulse">
                                    <Image
                                        src={`/images/social-hub/${targetUser?.avatar || 'cat'}.png`}
                                        alt="avatar"
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">
                                    {targetUser?.nickname}
                                </h3>
                                <p className="text-sm text-green-400 font-semibold flex items-center justify-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    На связи
                                </p>
                            </div>

                            {/* Jitsi Container (hidden, audio only) */}
                            <JitsiCallContainer
                                roomId={roomId}
                                onApiReady={memoizedOnApiReady}
                            />

                            {/* Control actions */}
                            <div className="flex flex-col gap-4">
                                {/* End call */}
                                <button
                                    onClick={() => {
                                        console.log('[CallModal] Ending call...');
                                        if (jitsiApi) {
                                            try {
                                                jitsiApi.executeCommand('hangup');
                                            } catch (e) {
                                                console.error('[CallModal] Error during Jitsi hangup:', e);
                                            }
                                        }
                                        onEndCall?.();
                                    }}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/20 active:scale-[0.98]"
                                >
                                    <PhoneOff className="w-6 h-6" />
                                    Завершить звонок
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Rejected */}
                    {state === 'rejected' && (
                        <div className="text-center space-y-4">
                            <PhoneOff className="w-16 h-16 text-red-500 mx-auto" />
                            <h3 className="text-xl font-bold text-white">
                                Звонок отклонён
                            </h3>
                            <p className="text-gray-400">
                                {targetUser?.nickname} отклонил звонок
                            </p>
                        </div>
                    )}

                    {/* Ended */}
                    {state === 'ended' && (
                        <div className="text-center space-y-4">
                            <PhoneOff className="w-16 h-16 text-gray-500 mx-auto" />
                            <h3 className="text-xl font-bold text-white">
                                Звонок завершён
                            </h3>
                        </div>
                    )}

                    {/* Busy */}
                    {state === 'busy' && (
                        <div className="text-center space-y-4">
                            <Phone className="w-16 h-16 text-yellow-500 mx-auto animate-pulse" />
                            <h3 className="text-xl font-bold text-white">
                                Занято
                            </h3>
                            <p className="text-gray-400">
                                {targetUser?.nickname} уже разговаривает
                            </p>
                        </div>
                    )}

                    {/* Timeout */}
                    {state === 'timeout' && (
                        <div className="text-center space-y-4">
                            <Phone className="w-16 h-16 text-gray-500 mx-auto" />
                            <h3 className="text-xl font-bold text-white">
                                Нет ответа
                            </h3>
                            <p className="text-gray-400">
                                {targetUser?.nickname} не ответил на звонок
                            </p>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
