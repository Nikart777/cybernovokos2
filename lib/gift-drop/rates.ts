import { promises as fs } from "fs";
import path from "path";
import { FALLBACK_RATES, Rates } from "@/components/certificate-drop/model";

type PriceItem = { time: string; week: number; end?: number; isNight?: boolean };
type PriceCategory = { title: string; items: PriceItem[] };
type PriceZone = { id: string; categories?: PriceCategory[]; subZones?: { categories: PriceCategory[] }[] };

/** The most expensive evening prices (weekend) from data/prices.json, so "how much it buys" never over-promises. */
export async function loadRates(): Promise<Rates> {
    try {
        const raw = JSON.parse(await fs.readFile(path.join(process.cwd(), "data", "prices.json"), "utf8"));
        const zones: PriceZone[] = raw.zones ?? [];
        const evening = (id: string) => {
            const z = zones.find((x) => x.id === id);
            const cats = z?.categories ?? z?.subZones?.[0]?.categories ?? [];
            return cats.find((c) => /вечер/i.test(c.title)) ?? cats[0];
        };
        const top = (i?: PriceItem) => (i ? Math.max(i.week, i.end ?? 0) : undefined);
        const hour = (id: string) => top(evening(id)?.items.find((i) => /^1\s/.test(i.time)));
        const night = (id: string) => top(evening(id)?.items.find((i) => i.isNight));
        return {
            hall: hour("common") ?? FALLBACK_RATES.hall,
            hallNight: night("common") ?? FALLBACK_RATES.hallNight,
            solo: hour("solo") ?? FALLBACK_RATES.solo,
            ps5: hour("tv") ?? FALLBACK_RATES.ps5,
            sim: hour("simracing") ?? FALLBACK_RATES.sim,
        };
    } catch {
        return FALLBACK_RATES;
    }
}
