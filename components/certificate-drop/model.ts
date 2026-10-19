// Domain model of the "certificate drop" page: what the giver customises,
// how it is encoded into links, and how a nominal maps to club time.
// Shared by the client page and the order/payment API routes.

export type PresetSkinId = "holo" | "neon" | "carbon" | "pixel" | "midnight" | "gold" | "glitch" | "ice" | "lava";
export type SkinId = PresetSkinId | "photo";
export type OccasionId = "bday" | "just" | "custom";

export interface GiftConfig {
    to: string;
    from: string;
    nominal: number;
    skin: SkinId;
    occasion: OccasionId;
    /** Free text when occasion === "custom". */
    occasionText: string;
    message: string;
    /** Uploaded background id when skin === "photo". */
    image: string;
}

export interface Rates {
    hall: number; // общий зал, 1 час вечером в выходной (самый дорогой тариф)
    hallNight: number; // общий зал, ночной пакет
    solo: number;
    ps5: number;
    sim: number; // автосимулятор, 1 час
}

export const SITE_URL = "https://cyberx-novokosino.ru";
export const PAGE_PATH = "/certificate";
export const TG_USER = "CyberXNovokos";
export const PHONE = "+79851289538";
export const PHONE_HUMAN = "+7 985 128-95-38";

export const NAME_MAX = 18;
export const OCCASION_MAX = 40;
export const MESSAGE_MAX = 110;
export const NOMINAL_MIN = 1000;
export const NOMINAL_MAX = 20000;
export const NOMINAL_STEP = 500;
export const NOMINAL_PRESETS = [1000, 2000, 3000, 5000, 10000];

export const DEFAULT_CONFIG: GiftConfig = {
    to: "",
    from: "",
    nominal: 3000,
    skin: "holo",
    occasion: "bday",
    occasionText: "",
    message: "",
    image: "",
};

export const FALLBACK_RATES: Rates = { hall: 200, hallNight: 850, solo: 300, ps5: 450, sim: 850 };

/** Personal promo on the final block: bonuses for orders placed in time. */
export const BONUS_AMOUNT = 400;
export const BONUS_DAYS = 3;

/** Average bar item: energy drinks, chocolate bars, sandwiches, soft drinks. */
export const BAR_AVG = 150;
export const MAPS_URL = "https://yandex.ru/maps/-/CTATeV~u";

/* ── Rarity: CS2 grades, so gamers read the nominal instantly ─────────── */

export interface Rarity {
    id: string;
    name: string;
    color: string;
    min: number;
}

export const RARITIES: Rarity[] = [
    { id: "milspec", name: "Армейское", color: "#4B69FF", min: 0 },
    { id: "restricted", name: "Запрещённое", color: "#8847FF", min: 1500 },
    { id: "classified", name: "Засекреченное", color: "#D32CE6", min: 3000 },
    { id: "covert", name: "Тайное", color: "#EB4B4B", min: 5000 },
    { id: "gold", name: "Крайне редкое", color: "#E4AE39", min: 10000 },
];

export function rarityOf(nominal: number): Rarity {
    let r = RARITIES[0];
    for (const x of RARITIES) if (nominal >= x.min) r = x;
    return r;
}

export function nextRarity(nominal: number): Rarity | null {
    return RARITIES.find((x) => x.min > nominal) ?? null;
}

/* ── Skins ───────────────────────────────────────────────────────────── */

export const SKINS: { id: PresetSkinId; name: string; hint: string }[] = [
    { id: "holo", name: "Голограмма", hint: "Переливается при наклоне" },
    { id: "neon", name: "Неон", hint: "Как зал клуба ночью" },
    { id: "carbon", name: "Карбон", hint: "Для фанатов гонок" },
    { id: "pixel", name: "8-бит", hint: "Аркада из детства" },
    { id: "midnight", name: "Ночь", hint: "Для ночных пакетов" },
    { id: "gold", name: "Золото", hint: "Когда повод особенный" },
    { id: "glitch", name: "Глитч", hint: "Сломанный сигнал, RGB-сдвиг" },
    { id: "ice", name: "Лёд", hint: "Светлый и холодный" },
    { id: "lava", name: "Лава", hint: "Раскалённые трещины" },
];

export const skinName = (id: SkinId) => (id === "photo" ? "Своё фото" : SKINS.find((s) => s.id === id)?.name ?? id);

/* ── Occasions ───────────────────────────────────────────────────────── */

export const OCCASIONS: { id: OccasionId; label: string }[] = [
    { id: "bday", label: "День рождения" },
    { id: "just", label: "Просто так" },
    { id: "custom", label: "Свой повод" },
];

export function occasionLabel(cfg: Pick<GiftConfig, "occasion" | "occasionText">): string {
    if (cfg.occasion === "custom") return cfg.occasionText.trim() || "Свой повод";
    return OCCASIONS.find((o) => o.id === cfg.occasion)?.label ?? "";
}

export function occasionLine(cfg: Pick<GiftConfig, "occasion" | "occasionText" | "to">): string {
    const to = cfg.to.trim();
    switch (cfg.occasion) {
        case "bday":
            return to ? `С днём рождения, ${to}!` : "С днём рождения!";
        case "custom": {
            const text = cfg.occasionText.trim().replace(/[\s,]+$/, "");
            if (!text) return to ? `${to}, это тебе` : "Это тебе";
            if (!to || text.toLowerCase().includes(to.toLowerCase())) return text;
            const end = text.match(/[!?.…]+$/)?.[0] ?? "!";
            return `${text.replace(/[!?.…]+$/, "")}, ${to}${end}`;
        }
        default:
            return to ? `${to}, это тебе` : "Это тебе";
    }
}

export const WISH_PRESETS = [
    "Пусть каждая катка будет победной",
    "Целая ночь без дедлайнов, только ты и игра",
    "Зови друзей и разнесите всех",
    "Газ в пол на автосимуляторе",
];

/* ── FAQ (shown on the page and in the FAQPage schema) ───────────── */

export const FAQ = [
    {
        q: "На что можно потратить сертификат?",
        a: "На любую зону компьютерного клуба: ПК в общем зале, Solo- и Duo-комнаты, Bootcamp, PS5 и автосимулятор. И на бар: энергетики, шоколадки, сэндвичи и напитки.",
    },
    {
        q: "Как оплатить и получить сертификат?",
        a: "Соберите его на этой странице и оплатите картой или через СБП. Сразу после оплаты на экране и в письме появятся промокод и ссылка-сюрприз для получателя.",
    },
    {
        q: "Как получатель активирует подарок?",
        a: "Два способа. Онлайн: скачать приложение CyberX, найти клуб CyberX Новокосино, зарегистрироваться по номеру телефона и ввести промокод, после чего баланс можно тратить на онлайн-бронирование. Или лично: прийти в клуб, сесть за любой компьютер, зарегистрироваться и ввести промокод.",
    },
    {
        q: "Можно потратить на снеки и напитки?",
        a: "Да. Энергетики Monster, Burn и Adrenaline Rush, шоколадки, сэндвичи и напитки оплачиваются с того же баланса. Их можно заказать прямо к компьютеру через приложение.",
    },
    {
        q: "Можно поставить своё фото?",
        a: "Да. В разделе «Дизайн» загрузите картинку с телефона или компьютера: мы оптимизируем её и подгоним под формат сертификата.",
    },
    {
        q: "Можно выбрать свою сумму?",
        a: "Да, любую от 1 000 до 20 000 ₽ с шагом 500 ₽. Если нужна другая сумма, напишите нам.",
    },
    {
        q: "Где находится компьютерный клуб?",
        a: "Москва, Новокосинская улица, 32, ТЦ «Новокосино», 2 этаж. Рядом с метро Новокосино, работаем круглосуточно.",
    },
];

/* ── Spend: what the nominal turns into ──────────────────────────────── */

export function plural(n: number, forms: [string, string, string]): string {
    const a = Math.abs(n) % 100;
    const b = a % 10;
    if (a > 10 && a < 20) return forms[2];
    if (b > 1 && b < 5) return forms[1];
    if (b === 1) return forms[0];
    return forms[2];
}

export interface SpendItem {
    id: string;
    value: number;
    unit: string;
    label: string;
    /** Bar items that still fit after the time, e.g. "2 энергетика и шоколадка". */
    bar: number;
    barText: string;
    img: string;
}

/** "2 энергетика и шоколадка", "3 энергетика, шоколадка и сэндвич". */
export function barMix(n: number): string {
    if (n <= 0) return "";
    const sandwich = n >= 4 ? Math.max(1, Math.floor(n / 5)) : 0;
    const choc = Math.floor((n - sandwich) / 3);
    const energy = n - sandwich - choc;
    const parts = [
        energy === 1 ? "энергетик" : energy > 1 ? `${energy} ${plural(energy, ["энергетик", "энергетика", "энергетиков"])}` : "",
        choc === 1 ? "шоколадка" : choc > 1 ? `${choc} ${plural(choc, ["шоколадка", "шоколадки", "шоколадок"])}` : "",
        sandwich === 1 ? "сэндвич" : sandwich > 1 ? `${sandwich} ${plural(sandwich, ["сэндвич", "сэндвича", "сэндвичей"])}` : "",
    ].filter(Boolean);
    return parts.length > 1 ? `${parts.slice(0, -1).join(", ")} и ${parts[parts.length - 1]}` : parts[0];
}

/**
 * What the nominal buys in each zone, bar included: about 15% of the sum
 * (up to 1 500 ₽) is kept for energy drinks and snacks, the rest goes to time, and whatever is
 * left after the time is turned into bar items. Never exceeds the nominal.
 */
export function spendCombo(nominal: number, price: number) {
    const keep = Math.min(1500, Math.max(BAR_AVG, Math.round((nominal * 0.15) / BAR_AVG) * BAR_AVG));
    let units = Math.floor((nominal - keep) / price);
    if (units < 1) units = Math.floor(nominal / price);
    const bar = Math.max(0, Math.floor((nominal - units * price) / BAR_AVG));
    return { units, bar, barText: barMix(bar) };
}

export function spendOf(nominal: number, r: Rates): SpendItem[] {
    const combo = (price: number) => spendCombo(nominal, price);
    const hall = combo(r.hall);
    const night = combo(r.hallNight);
    const sim = combo(r.sim);
    const ps5 = combo(r.ps5);
    return [
        { id: "hall", value: hall.units, unit: "ч", label: "в общем зале с друзьями", bar: hall.bar, barText: hall.barText, img: "/zones/common-2.webp" },
        {
            id: "night",
            value: night.units,
            unit: plural(night.units, ["ночь", "ночи", "ночей"]),
            label: "до утра за игровым ПК",
            bar: night.bar,
            barText: night.barText,
            img: "/zones/common-5.webp",
        },
        { id: "sim", value: sim.units, unit: "ч", label: "за рулём автосимулятора", bar: sim.bar, barText: sim.barText, img: "/zones/sim-1.webp" },
        { id: "ps5", value: ps5.units, unit: "ч", label: "на PS5 с большим экраном", bar: ps5.bar, barText: ps5.barText, img: "/zones/ps5-1.webp" },
    ];
}

/* ── Formatting ──────────────────────────────────────────────────────── */

/** "3000" → ["3", "000"]; groups are joined visually, not with a glyph the font lacks. */
export function digitGroups(n: number): string[] {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ").split(" ");
}

export const formatRub = (n: number) => `${digitGroups(n).join(" ")} ₽`;

/** Promo codes: 7 random characters, letters mixed with digits, no look-alikes. */
export const CODE_LENGTH = 7;
export const CODE_ALPHABET_LETTERS = "ABCDEFGHJKMNPQRSTUVWXYZ";
export const CODE_ALPHABET_DIGITS = "23456789";

/** Placeholder shown on the card until the certificate is paid. */
export const CODE_MASK = "•".repeat(CODE_LENGTH);

/** The club the recipient picks in the CyberX app; codes are created in this club's Langame. */
export const CLUB_NAME = "CyberX Новокосино";
export const CLUB_ADDRESS = "Москва, Новокосинская, 32";

/* ── Links ───────────────────────────────────────────────────────────── */

const SKIN_IDS: SkinId[] = [...SKINS.map((s) => s.id), "photo"];
const OCC_IDS = OCCASIONS.map((o) => o.id);
export const IMAGE_ID_RE = /^[a-f0-9]{32}$/;

const clean = (v: unknown, max: number) =>
    typeof v === "string" ? v.replace(/[\u0000-\u001F<>]/g, "").slice(0, max) : "";

export function clampNominal(n: number): number {
    if (!Number.isFinite(n)) return DEFAULT_CONFIG.nominal;
    const stepped = Math.round(n / NOMINAL_STEP) * NOMINAL_STEP;
    return Math.min(NOMINAL_MAX, Math.max(NOMINAL_MIN, stepped));
}

/** Sanitises anything (query params or a JSON body) into a valid config. */
export function normalizeConfig(raw: Record<string, unknown>): GiftConfig {
    const one = (k: string) => {
        const v = raw[k];
        return Array.isArray(v) ? v[0] : v;
    };
    const image = clean(one("img") ?? one("image"), 32);
    let skin = (one("skin") as SkinId) || DEFAULT_CONFIG.skin;
    if (!SKIN_IDS.includes(skin) || (skin === "photo" && !IMAGE_ID_RE.test(image))) skin = DEFAULT_CONFIG.skin;
    const occ = (one("occ") ?? one("occasion")) as OccasionId;
    const n = one("n") ?? one("nominal");
    return {
        to: clean(one("to"), NAME_MAX),
        from: clean(one("from"), NAME_MAX),
        nominal: n !== undefined && n !== "" ? clampNominal(Number(n)) : DEFAULT_CONFIG.nominal,
        skin,
        occasion: OCC_IDS.includes(occ) ? occ : DEFAULT_CONFIG.occasion,
        occasionText: clean(one("oc") ?? one("occasionText"), OCCASION_MAX),
        message: clean(one("msg") ?? one("message"), MESSAGE_MAX),
        image: skin === "photo" ? image : "",
    };
}

export const configFromParams = (p: Record<string, string | string[] | undefined>) => normalizeConfig(p);

export function configToQuery(cfg: GiftConfig, extra: Record<string, string> = {}): string {
    const q = new URLSearchParams();
    if (cfg.to.trim()) q.set("to", cfg.to.trim());
    if (cfg.from.trim()) q.set("from", cfg.from.trim());
    q.set("n", String(cfg.nominal));
    q.set("skin", cfg.skin);
    if (cfg.skin === "photo" && cfg.image) q.set("img", cfg.image);
    q.set("occ", cfg.occasion);
    if (cfg.occasion === "custom" && cfg.occasionText.trim()) q.set("oc", cfg.occasionText.trim());
    if (cfg.message.trim()) q.set("msg", cfg.message.trim());
    for (const [k, v] of Object.entries(extra)) q.set(k, v);
    return q.toString();
}

export const imageUrl = (id: string) => `/api/gift/image/${id}`;
export const orderPath = (id: string) => `${PAGE_PATH}/order/${id}`;
export const giftPath = (id: string) => `${PAGE_PATH}/g/${id}`;

export const telegramHelpUrl = () =>
    `https://t.me/${TG_USER}?text=${encodeURIComponent("Здравствуйте! У меня вопрос по подарочному сертификату.")}`;

/* ── Analytics ───────────────────────────────────────────────────────── */

export function track(name: string, params?: Record<string, unknown>) {
    try {
        const fn = (window as unknown as { cxTrack?: (n: string, p?: Record<string, unknown>) => void }).cxTrack;
        if (typeof fn === "function") fn(name, params);
    } catch {
        /* analytics must never break the page */
    }
}

/* ── Seeded PRNG for the case reel (same on server and client) ───────── */

export function mulberry32(seed: number) {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
