// Telegram Bot API for sending notifications
export async function sendTelegramMessage(text: string): Promise<boolean> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    console.log("🔍 Telegram Debug:");
    console.log("  Token exists:", !!token);
    console.log("  Chat ID exists:", !!chatId);
    console.log("  Chat ID value:", chatId);

    if (!token || !chatId) {
        console.warn("❌ Telegram creds not set");
        return false;
    }

    try {
        console.log("📤 Sending message to Telegram...");
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: "HTML",
            }),
        });

        const responseData = await res.json();
        console.log("📥 Telegram API Response:", responseData);

        if (res.ok) {
            console.log("✅ Message sent successfully!");
        } else {
            console.error("❌ Telegram API Error:", responseData);
        }

        return res.ok;
    } catch (e) {
        console.error("❌ Telegram send error:", e);
        return false;
    }
}

// Telegram Bot API Integration for CyberX News Channel
const TELEGRAM_NEWS_BOT_TOKEN = '7643602207:AAH-3HfUbSRPBLUTyt-t7J3BLRcG7hn20Zs';
const TELEGRAM_CHANNEL = '@cyberx72';

export interface TelegramPost {
    id: number;
    text: string;
    date: number;
    photo?: string;
}

export async function getTelegramPosts(): Promise<TelegramPost[]> {
    try {
        const response = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_NEWS_BOT_TOKEN}/getUpdates?allowed_updates=["channel_post"]&limit=20`,
            { next: { revalidate: 300 } } // Cache for 5 minutes
        );

        if (!response.ok) {
            throw new Error('Telegram API error');
        }

        const data = await response.json();

        const posts: TelegramPost[] = data.result
            .filter((update: any) => update.channel_post)
            .map((update: any) => ({
                id: update.update_id,
                text: update.channel_post.text || update.channel_post.caption || 'Новый пост',
                date: update.channel_post.date,
                photo: update.channel_post.photo
                    ? update.channel_post.photo[update.channel_post.photo.length - 1].file_id
                    : undefined
            }))
            .reverse() // Newest first
            .slice(0, 10); // Last 10 posts

        return posts;
    } catch (error) {
        console.error('[Telegram] Failed to fetch channel posts:', error);
        return [];
    }
}

export async function getTelegramPhoto(fileId: string): Promise<string | null> {
    try {
        const fileResponse = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_NEWS_BOT_TOKEN}/getFile?file_id=${fileId}`
        );

        if (!fileResponse.ok) return null;

        const fileData = await fileResponse.json();
        const filePath = fileData.result.file_path;

        return `https://api.telegram.org/file/bot${TELEGRAM_NEWS_BOT_TOKEN}/${filePath}`;
    } catch (error) {
        return null;
    }
}

