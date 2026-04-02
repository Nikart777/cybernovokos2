export interface ClubConfig {
    name: string;
    api_key: string;
    base_url: string;
    langame_club_id: number;
    zones: Record<number, string>;
}

export const CLUBS: Record<string, ClubConfig> = {
    novokosino: {
        name: "CyberX Новокосино",
        api_key: process.env.LANGAME_API_TOKEN || "",
        base_url: process.env.LANGAME_API_URL || "https://cyberx165.langame-pr.ru/public_api",
        langame_club_id: 1,
        zones: {
            1: "ОБЩИЙ ЗАЛ (Standard)",
            3: "БУТКЕМП",
            5: "VIP БУТКЕМП и DUO",
            9: "SOLO",
            7: "TV ОБЩИЙ ЗАЛ",
            2: "TV VIP КОМНАТА",
            11: "АВТОСИМУЛЯТОР",
        },
    },
    altufyevo: {
        name: "CyberX Алтуфьево",
        api_key: process.env.LANGAME_API_TOKEN_ALTUFYEVO || "",
        base_url: process.env.LANGAME_API_URL_ALTUFYEVO || "https://cyberx52.langamesftw.ru/public_api",
        langame_club_id: 3,
        zones: {
            1: "ОБЩИЙ ЗАЛ",
            2: "VIP БУТКЕМП (5 МЕСТ)",
            5: "DUO / SOLO",
            4: "АРЕНДА TV",
            9: "АРЕНДА TV VIP КОМНАТА",
            11: "АВТОСИМУЛЯТОР",
        },
    },
};

export async function langameGet(clubId: string, endpoint: string) {
    const club = CLUBS[clubId];
    if (!club) {
        throw new Error(`Клуб '${clubId}' не найден`);
    }

    const url = `${club.base_url}/${endpoint}`;
    try {
        const res = await fetch(url, {
            headers: {
                "X-API-KEY": club.api_key,
                "accept": "application/json",
            },
            // Using next.js fetch caching or no-store as needed
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Ошибка ответа LANGAME: ${res.status} ${res.statusText}`);
        }

        const json = await res.json();
        return json.data || [];
    } catch (err: any) {
        throw new Error(`Ошибка LANGAME API: ${err.message}`);
    }
}
