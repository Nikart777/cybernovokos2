export type PriceItem = {
    time: string;
    hours: string;
    week: number;
    end: number;
    isNight?: boolean;
};

export type PricingCategory = {
    title: string;
    color: string;
    items: PriceItem[];
};

export type ZoneData = {
    id: string;
    name: string;
    desc: string;
    categories?: PricingCategory[];
    subZones?: {
        name: string;
        categories: PricingCategory[];
    }[];
};

export type AbonnementPrice = {
    zone: string;
    value: number;
};

export type Abonnement = {
    name: string;
    validity: string;
    prices: AbonnementPrice[];
};

export type PricingData = {
    zones: ZoneData[];
    abonnements: Abonnement[];
};
