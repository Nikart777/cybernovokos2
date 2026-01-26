import { NextResponse } from 'next/server';

export interface TelegramPost {
    id: string;
    text: string;
    date: number; // Unix timestamp
    author?: string;
    media?: { type: string; url: string }[];
}

const MOCK_POSTS: TelegramPost[] = [
    {
        id: 'mock_m1',
        text: '📦 Продам видеокарту RTX 3060 Ti. Состояние отличное, стояла в домашнем ПК. 25 000 ₽',
        date: Math.floor(Date.now() / 1000) - 3600,
        author: 'CyberX Market'
    },
    {
        id: 'mock_m2',
        text: '⌨️ Механическая клавиатура Keychron K2. Переключатели Brown. 5 000 ₽',
        date: Math.floor(Date.now() / 1000) - 7200,
        author: 'CyberX Market'
    }
];

let cachedData: { posts: TelegramPost[]; lastSync: number; source: 'telegram' | 'mock' } | null = null;
const CACHE_TTL = 300000; // 5 minutes


async function fetchMarketPosts(): Promise<{ posts: TelegramPost[]; source: 'telegram' | 'mock' }> {
    const CHANNEL_HANDLE = process.env.TELEGRAM_MARKET_CHANNEL_ID || 'cyberxsale';

    // Clean handle from @ or URL parts if user accidentally added them
    const cleanHandle = CHANNEL_HANDLE.replace('@', '').split('/').pop() || 'cyberxsale';

    const RSS_URL = `https://tg.i-c-a.su/rss/${cleanHandle}`;

    console.log('\n========== MARKET RSS FEED DEBUG ==========');
    console.log('[Market RSS] Starting fetch process...');
    console.log('[Market RSS] Channel Handle: ' + cleanHandle);
    console.log('[Market RSS] RSS URL: ' + RSS_URL);

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const response = await fetch(RSS_URL, {
            signal: controller.signal,
            cache: 'no-store',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/rss+xml, application/xml, text/xml, */*'
            }
        });

        clearTimeout(timeoutId);

        console.log(`[Market RSS] Response status: ${response.status}`);

        if (!response.ok) {
            throw new Error(`RSS feed returned ${response.status}`);
        }

        const xmlText = await response.text();
        console.log(`[Market RSS] ✅ RSS XML received (${xmlText.length} bytes)`);

        const posts: TelegramPost[] = [];
        const itemRegex = /<item>([\s\S]*?)<\/item>/g;
        const titleRegex = /<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/;
        const descriptionRegex = /<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/;
        const linkRegex = /<link>(.*?)<\/link>/;
        const pubDateRegex = /<pubDate>(.*?)<\/pubDate>/;

        let match;
        while ((match = itemRegex.exec(xmlText)) !== null) {
            const itemXml = match[1];
            const titleMatch = itemXml.match(titleRegex);
            const descriptionMatch = itemXml.match(descriptionRegex);
            const linkMatch = itemXml.match(linkRegex);
            const pubDateMatch = itemXml.match(pubDateRegex);

            if (!titleMatch && !descriptionMatch) continue;

            let messageId = 'unknown';
            if (linkMatch) {
                const linkParts = linkMatch[1].split('/');
                messageId = linkParts[linkParts.length - 1];
            }

            // Decode entities
            const decode = (str: string) => str
                .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
                .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
                .replace(/&rsquo;/g, "'").replace(/&lsquo;/g, "'")
                .replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"')
                .replace(/&nbsp;/g, ' ');

            let decodedDescription = decode(descriptionMatch?.[1] || '');
            let decodedTitle = decode(titleMatch?.[1] || '');

            // Media extraction (exact mirroring of posts/route.ts)
            let mediaUrl = '';
            let mediaType: 'image' | 'video' | 'none' = 'none';

            const enclosureRegex = /<enclosure[^>]+url="([^"]+)"/i;
            const enclosureMatch = itemXml.match(enclosureRegex);
            if (enclosureMatch) {
                mediaUrl = enclosureMatch[1];
                mediaType = mediaUrl.match(/\.(mp4|mov|webm|avi)/i) ? 'video' : 'image';
            }

            if (!mediaUrl) {
                const imgTagMatch = decodedDescription.match(/<img[^>]+src="([^"]+)"/i);
                const aTagMediaMatch = decodedDescription.match(/<a[^>]+href="([^"]+\.(?:jpg|jpeg|png|gif|mp4|mov|webm))"[^>]*>/i);

                if (aTagMediaMatch) {
                    mediaUrl = aTagMediaMatch[1];
                    mediaType = mediaUrl.match(/\.(mp4|mov|webm)/i) ? 'video' : 'image';
                } else if (imgTagMatch) {
                    mediaUrl = imgTagMatch[1];
                    mediaType = 'image';
                }
            }

            // Cleanup text
            let text = decodedDescription || decodedTitle || '[No text]';
            text = text.replace(/<(style|script)[^>]*>[\s\S]*?<\/\1>/gi, '');
            text = text.replace(/<a[^>]+href="[^"]+"[^>]*>[\s\S]*?<\/a>/gi, (m) => (mediaUrl && m.includes(mediaUrl)) || m.includes('<img') ? '' : m);
            text = text.replace(/<(img|video|iframe|embed|object)[^>]*>[\s\S]*?<\/\1>/gi, '');
            text = text.replace(/<(img|video|iframe|embed|object)[^>]*\/?>/gi, '');
            text = text.replace(/<br\s*\/?>/gi, '\n');
            text = text.replace(/<(p|div|h[1-6]|li)[^>]*>/gi, '\n');
            text = text.replace(/<[^>]*>?/gm, '');
            text = text.replace(/\n\s*\n+/g, '\n\n');
            text = text.trim();

            let timestamp = Date.now();
            if (pubDateMatch) {
                timestamp = new Date(pubDateMatch[1]).getTime();
            }

            posts.push({
                id: `rss_market_${messageId}`,
                text: text.substring(0, 1000),
                date: Math.floor(timestamp / 1000),
                author: 'CyberX',
                mediaUrl: mediaUrl || undefined,
                mediaType: mediaType !== 'none' ? mediaType : undefined
            } as any);
        }

        if (posts.length === 0) {
            console.log('[Market RSS] ⚠️ No posts found, using mock data');
            return { posts: MOCK_POSTS, source: 'mock' };
        }

        posts.sort((a, b) => a.date - b.date);
        return { posts: posts.slice(-20), source: 'telegram' };

    } catch (error: any) {
        console.error('[Market RSS] ❌ ERROR:', error.message);
        return { posts: MOCK_POSTS, source: 'mock' };
    }
}

export async function GET() {
    try {
        const now = Date.now();
        const { posts, source } = await fetchMarketPosts();
        cachedData = { posts, lastSync: now, source };

        return NextResponse.json({
            posts,
            lastSync: now,
            source,
            cached: false
        }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to fetch Market posts', posts: MOCK_POSTS, source: 'mock' },
            { status: 500 }
        );
    }
}
