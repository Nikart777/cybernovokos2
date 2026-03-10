import { langameGet } from "./calculator";

export interface TariffTypeMapEntry {
    packet_id: number | null;
    label: string;
    duration_min: number | null;
}

export const TARIFF_TYPE_MAP: Record<string, TariffTypeMapEntry> = {
    minute: { packet_id: 1, label: "Поминутный", duration_min: null },
    "3h": { packet_id: 2, label: "Пакет 3 часа", duration_min: 180 },
    "5h": { packet_id: 3, label: "Пакет 5 часов", duration_min: 300 },
    night: { packet_id: null, label: "Ночной", duration_min: null },
};

export async function getTodayTariffGroup(clubId: string): Promise<number> {
    const byDays = await langameGet(clubId, "tariffs/by_days/list");

    // Create a YYYY-MM-DD string for today, matching local time
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    for (const entry of byDays) {
        if (entry.date === todayStr) {
            return entry.tariff_groups;
        }
    }

    // Fallback: determine by day of the week
    const groups = await langameGet(clubId, "tariffs/groups/list");
    // JS getDay() returns 0 for Sunday, Python weekday() returns 0 for Monday
    let dow = today.getDay() - 1;
    if (dow === -1) dow = 6; // Sunday becomes 6, Monday 0

    for (const g of groups) {
        if (!g.days) continue;
        const daysStr = String(g.days);
        const splitDays = daysStr.split(",").map((s) => s.trim()).filter((d) => /^\d+$/.test(d));
        const daysList = splitDays.map((d) => parseInt(d, 10));

        if (daysList.includes(dow)) {
            return g.id;
        }
    }

    // default to 74
    return 74;
}

export function findPerMinutePrice(tariffs: any[], zone: number, tariffGroup: number, currentTime: string): number {
    for (const t of tariffs) {
        if (
            t.packets_type_PC === zone &&
            t.tariff_groups === tariffGroup &&
            t.tariff_packet_id === 1
        ) {
            if (t.time_from <= currentTime && currentTime <= t.time_to) {
                return t.price;
            }
        }
    }
    return 0;
}

export function findPackagePrice(tariffs: any[], zone: number, tariffGroup: number, currentTime: string, packetId: number): [number, number] {
    for (const t of tariffs) {
        if (
            t.packets_type_PC === zone &&
            t.tariff_groups === tariffGroup &&
            t.tariff_packet_id === packetId
        ) {
            if (t.time_from <= currentTime && currentTime <= t.time_to) {
                return [t.price, packetId];
            }
        }
    }
    return [0, packetId];
}

export function findNightPrice(tariffs: any[], zone: number, tariffGroup: number, typesGroups: any[]): [number, number] {
    const nightIds = new Set<number>();

    for (const tg of typesGroups) {
        if (tg.is_deleted === 1) continue;
        const name = (tg.name || "").toLowerCase();
        const comment = (tg.comment || "").toLowerCase();

        if (
            name.includes("ноч") || name.includes("night") ||
            comment.includes("22:00") || comment.includes("23:00") ||
            comment.includes("00:00") || comment.includes("01:00")
        ) {
            nightIds.add(tg.id);
        }
    }

    // First try: tariff in current active time_period with a matching packet
    for (const t of tariffs) {
        if (
            t.packets_type_PC === zone &&
            t.tariff_groups === tariffGroup &&
            nightIds.has(t.tariff_packet_id)
        ) {
            return [t.price, t.tariff_packet_id];
        }
    }

    // Fallback: take tariffs that start at 00:00:00 and are not regular packets
    for (const t of tariffs) {
        if (
            t.packets_type_PC === zone &&
            t.tariff_groups === tariffGroup &&
            t.time_from === "00:00:00"
        ) {
            if (![1, 2, 3].includes(t.tariff_packet_id)) {
                return [t.price, t.tariff_packet_id];
            }
        }
    }

    return [0, 0];
}
