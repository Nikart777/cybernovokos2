import { createHash, timingSafeEqual } from "crypto";

/** Header the price admin sends the password in (URI-encoded, so a Cyrillic password survives). */
export const ADMIN_PASSWORD_HEADER = "x-admin-password";

export type AdminCheck = { ok: true } | { ok: false; error: string };

/**
 * Checks a password against ADMIN_PASSWORD from the server environment.
 * Fails closed: while ADMIN_PASSWORD is not set, nobody can write.
 */
export function checkAdminPassword(provided: string | null | undefined): AdminCheck {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) {
        return { ok: false, error: "Запись выключена: на сервере не задан ADMIN_PASSWORD" };
    }
    if (!provided) {
        return { ok: false, error: "Неверный пароль" };
    }
    // Hash both sides first: equal-length digests let timingSafeEqual compare in constant time.
    const a = createHash("sha256").update(provided, "utf8").digest();
    const b = createHash("sha256").update(expected, "utf8").digest();
    return timingSafeEqual(a, b) ? { ok: true } : { ok: false, error: "Неверный пароль" };
}

/** Reads the password from the request header the admin page sets. */
export function passwordFromHeader(request: Request): string | null {
    const raw = request.headers.get(ADMIN_PASSWORD_HEADER);
    if (!raw) return null;
    try {
        return decodeURIComponent(raw);
    } catch {
        return null;
    }
}

const isObject = (v: unknown): v is Record<string, unknown> =>
    typeof v === "object" && v !== null && !Array.isArray(v);
const isString = (v: unknown): v is string => typeof v === "string";
const isPrice = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v) && v >= 0;

/**
 * Checks that the body has the shape of data/prices.json:
 * zones → categories (or subZones → categories) → items with numeric week/end, plus abonnements.
 * Returns null when it is fine, otherwise a short message saying where it breaks.
 */
export function validatePricingData(body: unknown): string | null {
    if (!isObject(body)) return "Нужен объект с zones и abonnements";
    if (!Array.isArray(body.zones) || body.zones.length === 0) return "Нет ни одной зоны";
    if (!Array.isArray(body.abonnements)) return "Нет списка абонементов";

    const checkCategories = (categories: unknown, where: string): string | null => {
        if (!Array.isArray(categories)) return `${where}: нет списка категорий`;
        for (const cat of categories) {
            if (!isObject(cat) || !isString(cat.title) || !isString(cat.color) || !Array.isArray(cat.items)) {
                return `${where}: категория без названия, цвета или тарифов`;
            }
            for (const item of cat.items) {
                const label = `${where} → ${cat.title}`;
                if (!isObject(item) || !isString(item.time) || !isString(item.hours)) {
                    return `${label}: тариф без названия или часов`;
                }
                if (!isPrice(item.week) || !isPrice(item.end)) {
                    return `${label} → ${item.time}: цена в будни и выходные должна быть числом`;
                }
                if (item.isNight !== undefined && typeof item.isNight !== "boolean") {
                    return `${label} → ${item.time}: неверная отметка «ночь»`;
                }
            }
        }
        return null;
    };

    for (const zone of body.zones) {
        if (!isObject(zone) || !isString(zone.id) || !isString(zone.name) || !isString(zone.desc)) {
            return "Зона без id, названия или описания";
        }
        if (zone.categories === undefined && zone.subZones === undefined) {
            return `${zone.name}: нет ни категорий, ни подзон`;
        }
        if (zone.categories !== undefined) {
            const err = checkCategories(zone.categories, zone.name);
            if (err) return err;
        }
        if (zone.subZones !== undefined) {
            if (!Array.isArray(zone.subZones)) return `${zone.name}: подзоны должны быть списком`;
            for (const sub of zone.subZones) {
                if (!isObject(sub) || !isString(sub.name)) return `${zone.name}: подзона без названия`;
                const err = checkCategories(sub.categories, `${zone.name} → ${sub.name}`);
                if (err) return err;
            }
        }
    }

    for (const abon of body.abonnements) {
        if (!isObject(abon) || !isString(abon.name) || !isString(abon.validity) || !Array.isArray(abon.prices)) {
            return "Абонемент без названия, срока или цен";
        }
        for (const p of abon.prices) {
            if (!isObject(p) || !isString(p.zone) || !isPrice(p.value)) {
                return `Абонемент ${abon.name}: цена должна быть числом`;
            }
        }
    }

    return null;
}
