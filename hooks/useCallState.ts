'use client';

import { useState, useEffect, useCallback } from 'react';
import { socketClient } from '@/lib/socket-client';

export type CallState = 'idle' | 'outgoing' | 'incoming' | 'in-call' | 'rejected' | 'ended' | 'busy' | 'timeout';

export interface ActiveCall {
    roomId: string;
    targetUser: {
        nickname: string;
        avatar: string;
        userId: string;
    };
}

export function useCallState() {
    const [callState, setCallState] = useState<CallState>('idle');
    const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);

    // Initialize event listeners
    useEffect(() => {
        // Incoming call
        const handleIncomingCall = (data: { from: string; fromUserId: string; fromAvatar: string; roomId: string }) => {
            console.log('[useCallState] Incoming call from:', data.from);
            setCallState('incoming');
            setActiveCall({
                roomId: data.roomId,
                targetUser: {
                    nickname: data.from,
                    avatar: data.fromAvatar,
                    userId: data.fromUserId
                }
            });

            // PUSH NOTIFICATION: If tab is not in focus
            if (document.hidden && 'Notification' in window && Notification.permission === 'granted') {
                const notification = new Notification('📞 Входящий звонок', {
                    body: `${data.from} звонит вам`,
                    icon: '/images/social-hub/logo.png',
                    tag: `call-${data.roomId}`,
                    requireInteraction: true,
                    badge: '/images/social-hub/badge.png',
                    vibrate: [200, 100, 200]
                } as any);

                notification.onclick = () => {
                    window.focus();
                    notification.close();
                };
            }
        };

        // Call initiated (outgoing)
        const handleCallInitiated = (data: { roomId: string; to: string }) => {
            console.log('[useCallState] Call initiated to:', data.to);
            setCallState('outgoing');
        };

        // Call accepted
        const handleCallAccepted = (data: { roomId: string; acceptedBy: string }) => {
            console.log('[useCallState] Call accepted by:', data.acceptedBy);
            setCallState('in-call');
            // Update activeCall with the roomId (crucial for caller) or set default for joiners
            setActiveCall(prev => {
                if (prev) {
                    return { ...prev, roomId: data.roomId };
                }
                return {
                    roomId: data.roomId,
                    targetUser: {
                        nickname: 'Голосовой чат',
                        avatar: 'official',
                        userId: 'system'
                    }
                };
            });
        };

        // Call rejected
        const handleCallRejected = (data: { roomId: string; rejectedBy: string }) => {
            console.log('[useCallState] Call rejected by:', data.rejectedBy);
            setCallState('rejected');

            // Auto-reset after 2 seconds
            setTimeout(() => {
                setCallState('idle');
                setActiveCall(null);
            }, 2000);
        };

        // Call cancelled
        const handleCallCancelled = (data: { from: string; roomId: string; reason?: string }) => {
            console.log('[useCallState] Call cancelled by:', data.from);
            setCallState('ended');

            // Auto-reset
            setTimeout(() => {
                setCallState('idle');
                setActiveCall(null);
            }, 2000);
        };

        // Call ended
        const handleCallEnded = (data: { roomId: string }) => {
            console.log('[useCallState] Call ended:', data.roomId);
            setCallState('ended');

            // Auto-reset
            setTimeout(() => {
                setCallState('idle');
                setActiveCall(null);
            }, 2000);
        };

        // Call busy
        const handleCallBusy = (data: { user: string; reason?: string }) => {
            console.log('[useCallState] User busy:', data.user);
            setCallState('busy');

            // Auto-reset
            setTimeout(() => {
                setCallState('idle');
                setActiveCall(null);
            }, 2000);
        };

        // Call timeout
        const handleCallTimeout = (data: { to: string }) => {
            console.log('[useCallState] Call timeout to:', data.to);
            setCallState('timeout');

            // Auto-reset
            setTimeout(() => {
                setCallState('idle');
                setActiveCall(null);
            }, 2000);
        };

        // Call failed
        const handleCallFailed = (data: { reason: string }) => {
            console.error('[useCallState] Call failed:', data.reason);
            alert(`Call failed: ${data.reason}`);
            setCallState('idle');
            setActiveCall(null);
        };

        // Register all listeners
        socketClient.onIncomingCall(handleIncomingCall);
        socketClient.onCallInitiated(handleCallInitiated);
        socketClient.onCallAccepted(handleCallAccepted);
        socketClient.onCallRejected(handleCallRejected);
        socketClient.onCallCancelled(handleCallCancelled);
        socketClient.onCallEnded(handleCallEnded);
        socketClient.onCallBusy(handleCallBusy);
        socketClient.onCallTimeout(handleCallTimeout);
        socketClient.onCallFailed(handleCallFailed);

        // Cleanup: Remove listeners on unmount
        return () => {
            socketClient.off('call:incoming', handleIncomingCall);
            socketClient.off('call:initiated', handleCallInitiated);
            socketClient.off('call:accepted', handleCallAccepted);
            socketClient.off('call:rejected', handleCallRejected);
            socketClient.off('call:cancelled', handleCallCancelled);
            socketClient.off('call:ended', handleCallEnded);
            socketClient.off('call:busy', handleCallBusy);
            socketClient.off('call:timeout', handleCallTimeout);
            socketClient.off('call:failed', handleCallFailed);
        };
    }, []);

    // Actions
    const initiateCall = useCallback((targetNickname: string, targetAvatar: string, targetUserId: string) => {
        console.log('[useCallState] Initiating call to:', targetNickname);
        setActiveCall({
            roomId: '', // Will be set by server
            targetUser: {
                nickname: targetNickname,
                avatar: targetAvatar,
                userId: targetUserId
            }
        });
        socketClient.initiateCall(targetNickname);
    }, []);

    const acceptCall = useCallback(() => {
        if (!activeCall) return;
        console.log('[useCallState] Accepting call');
        socketClient.acceptCall(activeCall.roomId, activeCall.targetUser.nickname);
        setCallState('in-call');
    }, [activeCall]);

    const rejectCall = useCallback(() => {
        if (!activeCall) return;
        console.log('[useCallState] Rejecting call');
        socketClient.rejectCall(activeCall.roomId, activeCall.targetUser.nickname);
        setCallState('idle');
        setActiveCall(null);
    }, [activeCall]);

    const cancelCall = useCallback(() => {
        if (!activeCall) return;
        console.log('[useCallState] Cancelling call');
        socketClient.cancelCall(activeCall.targetUser.nickname, activeCall.roomId);
        setCallState('idle');
        setActiveCall(null);
    }, [activeCall]);

    const endCall = useCallback(() => {
        if (!activeCall) return;
        console.log('[useCallState] Ending call');
        socketClient.endCall(activeCall.roomId, activeCall.targetUser.userId);
        setCallState('ended');

        // Auto-reset
        setTimeout(() => {
            setCallState('idle');
            setActiveCall(null);
        }, 2000);
    }, [activeCall]);

    return {
        callState,
        activeCall,
        initiateCall,
        acceptCall,
        rejectCall,
        cancelCall,
        endCall
    };
}
