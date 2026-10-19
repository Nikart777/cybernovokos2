import fs from "fs";
import path from "path";
import type { GiftConfig } from "@/components/certificate-drop/model";

// Orders and uploaded backgrounds live as plain files, like the rest of the
// site's data (no DB on the hosting). One JSON file per order, written
// atomically, so concurrent webhook + polling never corrupt each other.

export type OrderStatus = "creating" | "pending" | "paid" | "canceled" | "failed";

export interface GiftOrder {
    id: string;
    status: OrderStatus;
    mode: "yookassa" | "mock";
    createdAt: string;
    updatedAt: string;
    paidAt?: string;
    cfg: GiftConfig;
    amount: number; // rubles
    email: string;
    baseUrl: string;
    providerId?: string;
    confirmationUrl?: string;
    test?: boolean;
    /** Owner's 1 ₽ check of the live payment flow: the code must not go into Langame. */
    trial?: boolean;
    code?: string;
    /** Promo bonuses promised on the page (credited by the club with the code). */
    bonus?: number;
    adminNotified?: boolean;
    buyerEmailed?: boolean;
    error?: string;
}

export class AppError extends Error {
    constructor(
        message: string,
        public status = 400,
    ) {
        super(message);
    }
}

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

const ROOT = process.env.GIFT_DATA_DIR || path.join(process.cwd(), ".gift-data");
const ORDERS = path.join(ROOT, "orders");
const CODES = path.join(ROOT, "codes");
export const UPLOADS = path.join(ROOT, "uploads");

function ensureDirs() {
    for (const dir of [ORDERS, UPLOADS, CODES]) fs.mkdirSync(dir, { recursive: true });
    const ignore = path.join(ROOT, ".gitignore");
    if (!fs.existsSync(ignore)) fs.writeFileSync(ignore, "*\n");
}

function writeAtomic(file: string, data: string | Buffer) {
    const tmp = `${file}.${process.pid}.${Date.now()}.tmp`;
    fs.writeFileSync(tmp, data);
    fs.renameSync(tmp, file);
}

const orderFile = (id: string) => {
    if (!UUID_RE.test(id)) throw new AppError("Заказ не найден", 404);
    return path.join(ORDERS, `${id}.json`);
};

export function readOrder(id: string): GiftOrder | null {
    try {
        return JSON.parse(fs.readFileSync(orderFile(id), "utf8")) as GiftOrder;
    } catch (e) {
        if (e instanceof AppError) throw e;
        return null;
    }
}

export function saveOrder(order: GiftOrder): GiftOrder {
    ensureDirs();
    const next = { ...order, updatedAt: new Date().toISOString() };
    writeAtomic(orderFile(order.id), JSON.stringify(next, null, 2));
    return next;
}

/** Cross-process lock (the host may run several Node workers). */
export async function withOrderLock<T>(id: string, fn: () => Promise<T> | T): Promise<T | null> {
    ensureDirs();
    const lock = `${orderFile(id)}.lock`;
    for (let attempt = 0; attempt < 2; attempt++) {
        try {
            fs.closeSync(fs.openSync(lock, "wx"));
        } catch {
            const age = Date.now() - (fs.statSync(lock, { throwIfNoEntry: false })?.mtimeMs ?? 0);
            if (age > 30000) {
                fs.rmSync(lock, { force: true });
                continue;
            }
            return null; // someone else is processing this order right now
        }
        try {
            return await fn();
        } finally {
            fs.rmSync(lock, { force: true });
        }
    }
    return null;
}

/**
 * Claims a promo code site-wide. Each issued code is a file named after it, created
 * with O_EXCL, so two orders can never get the same code, even across workers.
 */
export function reserveCode(code: string, orderId: string): boolean {
    ensureDirs();
    try {
        fs.writeFileSync(path.join(CODES, code), orderId, { flag: "wx" });
        return true;
    } catch {
        return false;
    }
}

export function saveUpload(id: string, data: Buffer) {
    ensureDirs();
    writeAtomic(path.join(UPLOADS, `${id}.webp`), data);
}

export function uploadPath(id: string) {
    return path.join(UPLOADS, `${id}.webp`);
}

/* ── Tiny in-memory rate limiter (per process, good enough against abuse) ── */

const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number) {
    const now = Date.now();
    const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (list.length >= limit) throw new AppError("Слишком много запросов, попробуйте через пару минут", 429);
    list.push(now);
    hits.set(key, list);
    if (hits.size > 5000) hits.clear();
}

export function clientIp(req: Request) {
    return (req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "local").split(",")[0].trim();
}
