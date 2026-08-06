/** Тема оформления карточки — задаёт акцентный цвет и «премиальность» позиции. */
export type MenuTheme = "classic" | "premium" | "grapefruit" | "pomegranate";

export interface HookahMenuItem {
    name: string;
    price: number;
    theme: MenuTheme;
    description?: string;
    /** Перезабивка — самостоятельным выбором не является, в розыгрыше не участвует. */
    refill?: boolean;
}

export interface OrderHoursRow {
    days: string;
    hours: string;
}

export interface PenaltyRow {
    label: string;
    price: number;
}

// Классический список табаков — переиспользуется в нескольких позициях меню
export const CLASSIC_TOBACCO_LIST: string[] = [
    "Banger",
    "Black Burn",
    "Burn",
    "Chabacco",
    "Deus",
    "Duft",
    "Element",
    "Musthave",
    "Наш",
    "Original Virginia",
    "Overdose",
    "Spectrum",
    "Северный",
    "Хулиган",
    "Darkside",
];

export const CLASSIC_TOBACCO_TEXT = CLASSIC_TOBACCO_LIST.join(", ");

// Секция ПАРОВЫЕ КОКТЕЙЛИ
export const STEAM_COCKTAILS: HookahMenuItem[] = [
    {
        name: "КЛАССИКА",
        price: 2290,
        theme: "classic",
        description: CLASSIC_TOBACCO_TEXT,
    },
    {
        name: "ПРЕМИУМ",
        price: 2690,
        theme: "premium",
        description: "Satyr, Dogma, Bonche, Trofimoff's, Kraken",
    },
    {
        name: "НА ГРЕЙПФРУТЕ",
        price: 3290,
        theme: "grapefruit",
        description: CLASSIC_TOBACCO_TEXT,
    },
    {
        name: "НА ГРАНАТЕ",
        price: 3290,
        theme: "pomegranate",
        description: CLASSIC_TOBACCO_TEXT,
    },
    {
        name: "ПЕРЕЗАБИВКА (КЛАССИЧЕСКИЙ)",
        price: 1890,
        theme: "classic",
        refill: true,
    },
    {
        name: "ПЕРЕЗАБИВКА (ПРЕМИУМ)",
        price: 2190,
        theme: "premium",
        refill: true,
    },
];

// Секция ЗАКАЗЫ ПРИНИМАЮТСЯ
export const ORDER_HOURS: OrderHoursRow[] = [
    { days: "ПН–ЧТ", hours: "14:00–03:00" },
    { days: "ПТ, СБ", hours: "14:00–06:00" },
    { days: "ВС", hours: "14:00–03:00" },
];

// Штрафы за порчу инвентаря
export const PENALTIES: PenaltyRow[] = [
    { label: "Разбитая колба", price: 1500 },
    { label: "Разбитая чаша", price: 1000 },
];
