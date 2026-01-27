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
    private currentChannel: string = 'general';
    private isAdmin: boolean = false;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private userCount: number = 0;
    private userList: ConnectedUser[] = [];

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

        const SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'https://socket.cyberx-novokosino.ru';
        this.socket = io(SERVER_URL, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: this.maxReconnectAttempts,
            transports: ['websocket'] // Critical for HTTPS -> HTTP bypass
        });

        // Global listeners to cache stats immediately (Registered BEFORE connect event)
        this.socket.on('users:count', (count: number) => {
            console.log('[SocketClient] Cache update users:count:', count);
            this.userCount = count;
        });

        this.socket.on('users:list', (list: ConnectedUser[]) => {
            console.log('[SocketClient] Cache update users:list:', list.length);
            this.userList = list;
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
        console.log('[SocketClient] Registering message:history listener');
        this.socket?.on('message:history', (data: { channel: string; messages: ChatMessage[] }) => {
            console.log(`[SocketClient] Received message:history for channel ${data.channel}:`, data.messages.length, 'messages');
            callback(data);
        });
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



    onUserCount(callback: (count: number) => void) {
        // Immediate callback with cached value
        callback(this.userCount);
        this.socket?.on('users:count', (count: number) => {
            this.userCount = count;
            callback(count);
        });
    }

    onUserList(callback: (users: ConnectedUser[]) => void) {
        // Immediate callback with cached value
        callback(this.userList);
        this.socket?.on('users:list', (users: ConnectedUser[]) => {
            this.userList = users;
            callback(users);
        });
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

    off(event: string) {
        this.socket?.off(event);
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
