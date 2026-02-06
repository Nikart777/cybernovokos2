'use client';

import { useEffect, useRef } from 'react';

interface JitsiCallContainerProps {
    roomId: string;
    onApiReady?: (api: any) => void;
}

export default function JitsiCallContainer({ roomId, onApiReady }: JitsiCallContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const jitsiApiRef = useRef<any>(null);
    const scriptLoadedRef = useRef(false);

    useEffect(() => {
        if (!roomId) return;

        console.log('[JitsiCallContainer] Initializing Jitsi for roomId:', roomId);

        if (!containerRef.current) return;
        if (scriptLoadedRef.current) return; // Предотвращаем повторную инициализацию

        const domain = 'meet.ffmuc.net';
        const options = {
            roomName: roomId,
            width: '100%',
            height: '100%',
            parentNode: containerRef.current,
            userInfo: {
                displayName: `User-${Math.random().toString(36).substring(7)}`
            },
            configOverwrite: {
                startWithAudioMuted: false,
                startWithVideoMuted: true,
                startAudioOnly: true,
                disableDeepLinking: true,
                prejoinConfig: {
                    enabled: false
                },
                prejoinPageEnabled: false,
                lobby: {
                    enabled: false
                },
                requireDisplayName: false,
                constraints: {
                    video: false,
                },
                disableFocusBeforePrejoin: true,
                disableInitialGUM: false,
                enableNoAudioDetection: true,
                enableNoisyMicDetection: true,
                enableWelcomePage: false,
                enableClosePage: false
            },
            interfaceConfigOverwrite: {
                TOOLBAR_BUTTONS: ['microphone', 'hangup', 'chat', 'settings'],
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                SHOW_BRAND_WATERMARK: false,
                SHOW_POWERED_BY: false,
                DISPLAY_WELCOME_PAGE_CONTENT: false,
                DISPLAY_WELCOME_FOOTER: false,
                HIDE_INVITE_MORE_HEADER: true,
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
                TOOLBAR_ALWAYS_VISIBLE: true,
                DEFAULT_BACKGROUND: '#111827'
            }
        };

        const existingScript = document.getElementById('jitsi-external-api');

        const initApi = () => {
            if (jitsiApiRef.current) return;

            // @ts-ignore
            if (!window.JitsiMeetExternalAPI) {
                console.warn('[JitsiCallContainer] JitsiMeetExternalAPI not found yet, retrying in 100ms...');
                setTimeout(initApi, 100);
                return;
            }

            console.log('[JitsiCallContainer] Creating Jitsi API instance...');
            try {
                // @ts-ignore
                const jitsiApi = new window.JitsiMeetExternalAPI(domain, options);

                jitsiApi.addEventListener('videoConferenceJoined', (data: any) => {
                    console.log('[JitsiCallContainer] ✅ videoConferenceJoined!', data);
                });

                jitsiApiRef.current = jitsiApi;
                onApiReady?.(jitsiApi);
            } catch (err) {
                console.error('[JitsiCallContainer] Failed to create Jitsi API:', err);
            }
        };

        if (existingScript) {
            initApi();
        } else {
            const script = document.createElement('script');
            script.id = 'jitsi-external-api';
            script.src = `https://${domain}/external_api.js`;
            script.async = true;
            script.onload = () => {
                scriptLoadedRef.current = true;
                initApi();
            };
            script.onerror = (e) => {
                console.error('[JitsiCallContainer] Script load error:', e);
            };
            document.head.appendChild(script);
        }

        return () => {
            console.log('[JitsiCallContainer] Cleanup - disposing Jitsi API');
            if (jitsiApiRef.current) {
                jitsiApiRef.current.dispose();
                jitsiApiRef.current = null;
            }
        };
    }, [roomId, onApiReady]);

    return (
        <div className="relative w-full h-[350px] bg-black/20 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Jitsi iframe container */}
            <div
                ref={containerRef}
                className="w-full h-full"
            />
        </div>
    );
}
