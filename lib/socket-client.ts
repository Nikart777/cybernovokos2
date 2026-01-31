import { io, Socket } from 'socket.io-client';

export interface ChatMessage {
    id: number | string;
    userId: string;
    nickname: string;
    club: 'vlasino' | 'altufievo' | 'neutral';
    avatar: string;
    text: string;
    sticker?: string | null;
    channel?: string;
    timestamp: number;
    // News-specific fields
    author?: string;
    date?: number;
    mediaUrl?: string;
    mediaType?: 'image' | 'video' | 'none';
    isAdmin?: boolean;
}

export interface ConnectedUser {
    userId: string;
    nickname: string;
    club: string;
    avatar: string;
    isAdmin?: boolean;
}

export interface ChallengeSyncData {
    from: string;
    to: string;
    game: string;
    betAmount: string;
    avatar?: string;
    pcNumber?: string;
    acceptorPc?: string;
}

class SocketClient {
    private socket: Socket | null = null;
    private userId: string = '';
    private nickname: string = '';
    private avatar: string = 'cat';
    private club: 'vlasino' | 'altufievo' | 'neutral' = 'neutral';
    private currentChannel: string = '';
    private isAdmin: boolean = false;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private userCount: number = 0;
    private userList: ConnectedUser[] = [];
    private unreadCounts: Record<string, number> = {};
    private unreadCallbacks: Set<(counts: Record<string, number>) => void> = new Set();
    private isTrackingUnread = false;

    constructor() {
        this.initializeUserId();
    }

    private initializeUserId() {
        if (typeof window === 'undefined') return;

        // Get or create anonymous user ID
        let storedId = sessionStorage.getItem('social_hub_user_id');
        let storedNickname = sessionStorage.getItem('social_hub_nickname');
        let storedAvatar = sessionStorage.getItem('social_hub_avatar');

        this.userId = storedId || '';
        this.nickname = storedNickname || '';
        this.avatar = storedAvatar || 'cat';

        // Get club affiliation (default to neutral if not set)
        const storedClub = sessionStorage.getItem('user_club') as 'vlasino' | 'altufievo' | null;
        this.club = storedClub || 'neutral';

        // Get admin status
        this.isAdmin = sessionStorage.getItem('social_hub_is_admin') === 'true';
    }

    connect(onConnected?: () => void) {
        if (this.socket?.connected) {
            console.log('[SocketClient] Already connected');
            onConnected?.();
            return;
        }

        if (this.socket) {
            // Already initializing, just add the listener
            if (onConnected) this.socket.once('connect', onConnected);
            return;
        }

        const SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'https://socket.cyberx-novokosino.ru';
        this.socket = io(SERVER_URL, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: this.maxReconnectAttempts,
            transports: ['websocket'] // Critical for HTTPS -> HTTP bypass
        });

        if (onConnected) {
            this.socket.once('connect', onConnected);
        }

        // Global listeners to cache stats and notify subscribers
        this.socket.on('users:count', (count: number) => {
            console.log('[SocketClient] Cache update users:count:', count);
            this.userCount = count;
            this.userCountCallbacks.forEach(cb => cb(count));
        });

        this.socket.on('users:list', (list: ConnectedUser[]) => {
            console.log('[SocketClient] Cache update users:list:', list.length);
            this.userList = list;
            this.userListCallbacks.forEach(cb => cb(list));
        });

        this.socket.on('connect', () => {
            console.log('[SocketClient] Connected to server');
            this.reconnectAttempts = 0;

            // Announce presence only if we have a userId
            if (this.userId && this.nickname) {
                this.socket?.emit('user:join', {
                    userId: this.userId,
                    nickname: this.nickname,
                    club: this.club,
                    avatar: this.avatar
                });
            }

            onConnected?.();
        });

        this.socket.on('disconnect', () => {
            console.log('[SocketClient] Disconnected from server');
        });

        this.socket.on('connect_error', (error: Error) => {
            console.error('[SocketClient] Connection error:', error);
            this.reconnectAttempts++;

            if (this.reconnectAttempts >= this.maxReconnectAttempts) {
                console.error('[SocketClient] Max reconnection attempts reached');
            }
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    sendMessage(text: string, sticker?: string) {
        if (!this.socket?.connected) {
            console.error('[SocketClient] Cannot send message: not connected');
            return;
        }

        this.socket.emit('message:send', {
            userId: this.userId,
            nickname: this.nickname,
            club: this.club,
            avatar: this.avatar,
            text,
            sticker,
            channel: this.currentChannel
        });
    }

    switchChannel(channel: string) {
        console.log(`[SocketClient] Switching to channel: ${channel}`);
        this.currentChannel = channel;
        // Reset unread for this channel automatically
        this.resetUnread(channel);

        if (this.socket?.connected) {
            console.log(`[SocketClient] Emitting channel:switch event for ${channel}`);
            this.socket.emit('channel:switch', { channel });
        } else {
            console.warn(`[SocketClient] Socket not connected, cannot switch to ${channel}`);
        }
    }

    getCurrentChannel(): string {
        return this.currentChannel;
    }

    getIsAdmin(): boolean {
        return this.isAdmin;
    }

    sendChallenge(data: ChallengeSyncData) {
        if (!this.socket?.connected) return;
        this.socket.emit('challenge:send', { ...data, avatar: this.avatar });
    }

    acceptChallenge(originalChallenge: ChallengeSyncData, myPcNumber: string) {
        if (!this.socket?.connected) return;
        this.socket.emit('challenge:accept', {
            from: originalChallenge.from, // The original challenger
            to: this.nickname, // Me, the acceptor
            acceptorPc: myPcNumber
        });
    }

    updateUser(nickname: string, avatar: string, club: 'vlasino' | 'altufievo') {
        this.userId = nickname; // Keep for backward compat (will phase out)
        this.nickname = nickname;
        this.avatar = avatar;
        this.club = club;

        sessionStorage.setItem('social_hub_user_id', nickname);
        sessionStorage.setItem('social_hub_nickname', nickname);
        sessionStorage.setItem('social_hub_avatar', avatar);
        sessionStorage.setItem('user_club', club);

        if (this.socket?.connected) {
            this.socket.emit('user:join', {
                userId: this.userId,
                nickname: this.nickname,
                club: this.club,
                avatar: this.avatar
            });
        }
    }

    onMessageHistory(callback: (data: { channel: string; messages: ChatMessage[] }) => void) {
        this.socket?.on('message:history', callback);
    }

    onNewMessage(callback: (message: ChatMessage) => void) {
        this.socket?.on('message:new', callback);
    }

    deleteMessage(messageId: number | string) {
        if (!this.socket?.connected) return;
        this.socket.emit('message:delete', { messageId, channel: this.currentChannel });
    }

    onMessageDeleted(callback: (data: { messageId: number | string, channel: string }) => void) {
        this.socket?.on('message:deleted', callback);
    }

    onChallengeReceived(callback: (data: ChallengeSyncData) => void) {
        this.socket?.on('challenge:received', (data: ChallengeSyncData) => callback(data));
    }

    onChallengeAccepted(callback: (data: { acceptor: string }) => void) {
        this.socket?.on('challenge:accepted', (data: { acceptor: string }) => callback(data));
    }



    private userCountCallbacks: ((count: number) => void)[] = [];
    private userListCallbacks: ((users: ConnectedUser[]) => void)[] = [];

    onUserCount(callback: (count: number) => void) {
        // Immediate callback with cached value
        callback(this.userCount);
        this.userCountCallbacks.push(callback);

        // If already connected, ensure we listen (listener might be set in connect(), 
        // but we need to ensure this specific callback gets updates. 
        // Actually, better logic is: connect() sets up the SINGLE socket listener 
        // that iterates over userCountCallbacks.
    }

    onUserList(callback: (users: ConnectedUser[]) => void) {
        // Immediate callback with cached value
        callback(this.userList);
        this.userListCallbacks.push(callback);
    }

    onUserTyping(callback: (data: { userId: string; typing: boolean }) => void) {
        this.socket?.on('user:typing', callback);
    }

    onChatCleared(callback: (data: { deletedCount: number }) => void) {
        this.socket?.on('chat:cleared', callback);
    }

    requestUserStats() {
        if (!this.socket?.connected) return;
        this.socket.emit('users:get');
    }

    off(event: string, callback?: any) {
        if (callback) {
            this.socket?.off(event, callback);
        } else {
            this.socket?.off(event);
        }
    }

    // Unread and Global tracking logic
    public startGlobalTracking(channels: { id: string }[]) {
        if (this.isTrackingUnread) return;
        this.isTrackingUnread = true;

        console.log('[SocketClient] Starting global unread tracking for:', channels.map(c => c.id).join(', '));

        // Listen for all new messages globally
        this.socket?.on('message:new', (message: ChatMessage) => {
            const channelId = message.channel || 'general';

            console.log(`[SocketClient] Global tracker caught message in #${channelId}. Current: #${this.currentChannel}`);

            // Only increment if it's NOT the current channel
            if (channelId !== this.currentChannel) {
                this.unreadCounts[channelId] = (this.unreadCounts[channelId] || 0) + 1;
                console.log(`[SocketClient] Incremented unread for #${channelId}: ${this.unreadCounts[channelId]}`);
                this.notifyUnreadUpdate();
            }
        });

        // Listen for history to initialize counts
        this.socket?.on('message:history', (data: { channel: string; messages: ChatMessage[] }) => {
            // If we are currently initialized via history for a channel we are NOT in
            if (data.channel !== this.currentChannel) {
                console.log(`[SocketClient] Global tracker processing history for #${data.channel}: ${data.messages.length} messages`);
                // We use historical count as "unread" for a fresh session
                if (!this.unreadCounts[data.channel] || this.unreadCounts[data.channel] < data.messages.length) {
                    this.unreadCounts[data.channel] = data.messages.length;
                    this.notifyUnreadUpdate();
                }
            }
        });

        // Fetch initial history for all channels to populate counters
        const fetchHistory = () => {
            console.log('[SocketClient] Fetching initial history for all channels...');
            channels.forEach((ch, index) => {
                setTimeout(() => {
                    if (this.socket?.connected) {
                        console.log(`[SocketClient] Background history check for #${ch.id}`);
                        this.socket.emit('channel:switch', { channel: ch.id });
                    }
                }, index * 100);
            });
        };

        if (this.socket?.connected) {
            fetchHistory();
        } else {
            console.log('[SocketClient] Tracking started but socket not connected. Waiting for connect event...');
            this.socket?.once('connect', fetchHistory);
        }
    }

    public getUnreadCounts() {
        return { ...this.unreadCounts };
    }

    public onUnreadUpdate(callback: (counts: Record<string, number>) => void) {
        this.unreadCallbacks.add(callback);
        // Immediate call with current values
        callback(this.getUnreadCounts());
        return () => this.unreadCallbacks.delete(callback);
    }

    private notifyUnreadUpdate() {
        const counts = this.getUnreadCounts();
        this.unreadCallbacks.forEach(cb => cb(counts));
    }

    public resetUnread(channelId: string) {
        if (this.unreadCounts[channelId]) {
            delete this.unreadCounts[channelId];
            this.notifyUnreadUpdate();
        }
    }

    startTyping() {
        this.socket?.emit('typing:start', { userId: this.userId });
    }

    stopTyping() {
        this.socket?.emit('typing:stop', { userId: this.userId });
    }

    authenticateAdmin(password: string, club: 'altufievo' | 'vlasino', callback: (authenticated: boolean) => void) {
        this.socket?.emit('admin:auth', { password, club });
        this.socket?.once('admin:authenticated', (data: any) => {
            if (data.authenticated) {
                this.nickname = data.nickname;
                this.userId = data.nickname;
                this.avatar = data.avatar;
                this.isAdmin = true;
                sessionStorage.setItem('social_hub_user_id', data.nickname);
                sessionStorage.setItem('social_hub_nickname', data.nickname);
                sessionStorage.setItem('social_hub_avatar', data.avatar);
                sessionStorage.setItem('social_hub_is_admin', 'true');
                callback(true);
            } else {
                this.isAdmin = false;
                sessionStorage.removeItem('social_hub_is_admin');
                callback(false);
            }
        });
    }

    likeAdmin(adminId: string, isLiked: boolean) {
        this.socket?.emit('admin:like', { adminId, isLiked });
    }

    getAdminLikes() {
        this.socket?.emit('admin:get_likes');
    }

    onAdminLikesUpdate(callback: (counts: Record<string, number>) => void) {
        this.socket?.on('admin:likes_update', callback);
    }

    getUserId() {
        return this.userId;
    }

    getAvatar() {
        return this.avatar;
    }

    getClub() {
        return this.club;
    }

    setClub(club: 'vlasino' | 'altufievo' | 'neutral') {
        this.club = club;
        sessionStorage.setItem('user_club', club);

        // Re-announce with new club
        if (this.socket?.connected) {
            this.socket.emit('user:join', {
                userId: this.userId,
                club: this.club,
                avatar: this.avatar
            });
        }
    }

    isConnected() {
        return this.socket?.connected || false;
    }
}

// Singleton instance
export const socketClient = new SocketClient();
