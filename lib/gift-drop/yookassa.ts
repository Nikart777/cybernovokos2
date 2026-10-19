import { AppError } from "./store";

// Minimal YooKassa v3 client, same approach as the 24lesson billing:
// Basic auth shopId:secretKey, Idempotence-Key on create, and we never trust
// a webhook body — the payment is always re-read from the API.

const API = "https://api.yookassa.ru/v3/";

export type Payment = {
    id: string;
    status: "pending" | "waiting_for_capture" | "succeeded" | "canceled";
    paid: boolean;
    test: boolean;
    amount: { value: string; currency: string };
    recipient?: { account_id: string };
    metadata?: Record<string, string>;
    confirmation?: { confirmation_url?: string };
    cancellation_details?: { reason?: string };
};

export const PAYMENT_APP = "cyberx-gift";

export function yookassaConfigured() {
    return (
        process.env.GIFT_PAYMENTS_ENABLED !== "false" &&
        /^\d+$/.test(process.env.YOOKASSA_SHOP_ID || "") &&
        !!process.env.YOOKASSA_SECRET_KEY
    );
}

/** "yookassa" in production with keys; "mock" only on a dev machine without keys. */
export function paymentMode(): "yookassa" | "mock" | null {
    if (yookassaConfigured()) return "yookassa";
    if (process.env.NODE_ENV !== "production") return "mock";
    return null;
}

export async function yookassa(path: string, body?: unknown, idempotenceKey?: string): Promise<Payment> {
    const auth = Buffer.from(`${process.env.YOOKASSA_SHOP_ID}:${process.env.YOOKASSA_SECRET_KEY}`).toString("base64");
    let res: Response;
    try {
        res = await fetch(API + path, {
            method: body ? "POST" : "GET",
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/json",
                ...(idempotenceKey ? { "Idempotence-Key": idempotenceKey } : {}),
            },
            body: body ? JSON.stringify(body) : undefined,
            signal: AbortSignal.timeout(12000),
            redirect: "error",
            cache: "no-store",
        });
    } catch {
        throw new AppError("Платёжный сервис временно недоступен", 503);
    }
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("[gift] yookassa", path, res.status, text.slice(0, 300));
        throw new AppError("Платёжный сервис отклонил запрос", [400, 401, 403, 404, 422].includes(res.status) ? 502 : 503);
    }
    return (await res.json()) as Payment;
}

/** Kopecks from "1500.00" — refuses anything that is not a plain amount. */
export function kopecks(value: string) {
    if (!/^\d+\.\d{2}$/.test(value)) throw new AppError("Некорректная сумма в ответе платёжного сервиса", 502);
    return Number(value.replace(".", ""));
}

export function safeCheckoutUrl(value: string | undefined) {
    if (!value) return undefined;
    const u = new URL(value);
    const host = u.hostname;
    const ok =
        u.protocol === "https:" &&
        !u.username &&
        !u.password &&
        (host === "yookassa.ru" || host.endsWith(".yookassa.ru") || host === "yoomoney.ru" || host.endsWith(".yoomoney.ru"));
    if (!ok) throw new AppError("Неожиданный адрес оплаты", 502);
    return u.href;
}

/**
 * 54-ФЗ receipt. Club settings (17.10.2026): УСН «доходы» 6% (tax_system_code 2),
 * без НДС (vat_code 1), расчёт сразу полной оплатой, предмет — пополнение баланса.
 * Each value can be overridden from env if the accountant asks.
 */
export function receipt(email: string, rubles: number, description: string) {
    if (process.env.GIFT_RECEIPTS === "false") return undefined;
    const tax = Number(process.env.YOOKASSA_TAX_SYSTEM_CODE || 2);
    const vat = Number(process.env.YOOKASSA_VAT_CODE || 1);
    return {
        customer: { email },
        ...(tax ? { tax_system_code: tax } : {}),
        items: [
            {
                description: description.slice(0, 128),
                quantity: "1.00",
                amount: { value: rubles.toFixed(2), currency: "RUB" },
                vat_code: vat,
                payment_mode: process.env.GIFT_RECEIPT_PAYMENT_MODE || "full_payment",
                payment_subject: process.env.GIFT_RECEIPT_PAYMENT_SUBJECT || "payment",
            },
        ],
    };
}
