import crypto from "crypto";
import fs from "fs";
import {
    BONUS_AMOUNT,
    BONUS_DAYS,
    CODE_ALPHABET_DIGITS,
    CODE_ALPHABET_LETTERS,
    CODE_LENGTH,
    formatRub,
    GiftConfig,
    giftPath,
    IMAGE_ID_RE,
    normalizeConfig,
    orderPath,
    SITE_URL,
} from "@/components/certificate-drop/model";
import { emailBuyer, notifyAdmin } from "./notify";
import { AppError, GiftOrder, readOrder, reserveCode, saveOrder, uploadPath, UUID_RE, withOrderLock } from "./store";
import { kopecks, Payment, PAYMENT_APP, paymentMode, receipt, safeCheckoutUrl, yookassa } from "./yookassa";

const PAYMENT_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const EMAIL_RE = /^[^\s@<>]{1,64}@[^\s@<>]{1,190}\.[a-zа-я]{2,24}$/i;

/**
 * 7 random characters, letters mixed with digits (at least one of each),
 * no look-alikes (0/O, 1/I/L), e.g. K7M2Q9H. Easy to type into Langame by hand.
 */
export function generateCode() {
    const all = CODE_ALPHABET_LETTERS + CODE_ALPHABET_DIGITS;
    for (;;) {
        let s = "";
        for (let i = 0; i < CODE_LENGTH; i++) s += all[crypto.randomInt(all.length)];
        if (/[A-Z]/.test(s) && /\d/.test(s)) return s;
    }
}

/** A code no other order has ever received (reserved in the site's store). */
function issueCode(orderId: string) {
    for (let attempt = 0; attempt < 50; attempt++) {
        const code = generateCode();
        if (reserveCode(code, orderId)) return code;
    }
    throw new AppError("Не получилось выпустить промокод", 500);
}

/** GIFT_TEST_KEY on the server + /certificate?test=<key> lets the owner pay 1 ₽ to check the live flow. */
function isTrialKey(value: unknown) {
    const key = process.env.GIFT_TEST_KEY || "";
    if (key.length < 16 || typeof value !== "string") return false;
    const a = Buffer.from(value);
    const b = Buffer.from(key);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function baseUrl(origin: string) {
    if (process.env.GIFT_SITE_URL) return process.env.GIFT_SITE_URL.replace(/\/$/, "");
    return process.env.NODE_ENV === "production" ? SITE_URL : origin;
}

export async function createOrder(input: unknown, origin: string): Promise<{ id: string; confirmationUrl: string }> {
    const mode = paymentMode();
    if (!mode) throw new AppError("Онлайн-оплата временно недоступна. Напишите нам в Telegram, оформим вручную.", 503);

    const body = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
    const cfg: GiftConfig = normalizeConfig((body.cfg && typeof body.cfg === "object" ? body.cfg : {}) as Record<string, unknown>);
    const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
    if (!EMAIL_RE.test(email)) throw new AppError("Проверьте email: на него придут чек и промокод");
    if (body.consent !== true) throw new AppError("Нужно согласие с условиями оферты");
    if (cfg.skin === "photo" && !(IMAGE_ID_RE.test(cfg.image) && fs.existsSync(uploadPath(cfg.image))))
        throw new AppError("Фото не найдено, загрузите его ещё раз");

    // The page promises the bonus until a personal deadline (≤ 3 days ahead); honour it only before that moment.
    const until = Number(body.bonusUntil);
    const bonusOk = Number.isFinite(until) && until > Date.now() && until - Date.now() <= BONUS_DAYS * 86_400_000 + 60_000;
    const trial = isTrialKey(body.testKey);

    const now = new Date().toISOString();
    let order: GiftOrder = saveOrder({
        id: crypto.randomUUID(),
        status: "creating",
        mode,
        createdAt: now,
        updatedAt: now,
        cfg,
        amount: trial ? 1 : cfg.nominal,
        trial: trial || undefined,
        bonus: bonusOk ? BONUS_AMOUNT : undefined,
        email,
        baseUrl: baseUrl(origin),
    });

    if (mode === "mock") {
        order = saveOrder({ ...order, status: "pending", test: true });
        return { id: order.id, confirmationUrl: `${orderPath(order.id)}?mock=1` };
    }

    const description = `Подарочный сертификат: пополнение баланса в CyberX Новокосино на ${formatRub(order.amount)}`;
    try {
        const p = await yookassa(
            "payments",
            {
                amount: { value: order.amount.toFixed(2), currency: "RUB" },
                capture: true,
                description,
                metadata: { app: PAYMENT_APP, order_id: order.id },
                confirmation: { type: "redirect", return_url: `${order.baseUrl}${orderPath(order.id)}` },
                receipt: receipt(email, order.amount, description),
            },
            order.id,
        );
        validate(order, p);
        const confirmationUrl = safeCheckoutUrl(p.confirmation?.confirmation_url);
        if (!confirmationUrl) throw new AppError("Платёжный сервис не вернул ссылку на оплату", 502);
        order = saveOrder({ ...order, status: "pending", providerId: p.id, confirmationUrl, test: p.test });
        return { id: order.id, confirmationUrl };
    } catch (e) {
        saveOrder({ ...order, status: "failed", error: e instanceof Error ? e.message : "create_failed" });
        throw e instanceof AppError ? e : new AppError("Не получилось создать платёж", 502);
    }
}

function validate(o: GiftOrder, p: Payment) {
    const testExpected = process.env.YOOKASSA_TEST_MODE;
    if (
        !p ||
        !PAYMENT_ID_RE.test(p.id) ||
        (o.providerId && o.providerId !== p.id) ||
        (p.recipient?.account_id && p.recipient.account_id !== process.env.YOOKASSA_SHOP_ID) ||
        p.amount?.currency !== "RUB" ||
        kopecks(p.amount.value) !== o.amount * 100 ||
        p.metadata?.app !== PAYMENT_APP ||
        p.metadata?.order_id !== o.id ||
        (testExpected !== undefined && p.test !== (testExpected === "true"))
    )
        throw new AppError("Ответ ЮKassa не соответствует заказу", 502);
}

/** Paid → code is issued exactly once, then admin + buyer are notified (each retried until it succeeds). */
async function fulfil(id: string) {
    await withOrderLock(id, async () => {
        let o = readOrder(id);
        if (!o) return;
        if (!o.code) {
            o = saveOrder({ ...o, status: "paid", paidAt: o.paidAt || new Date().toISOString(), code: issueCode(o.id) });
        } else if (o.status !== "paid") {
            o = saveOrder({ ...o, status: "paid" });
        }
        if (!o.adminNotified && (await notifyAdmin(o))) o = saveOrder({ ...o, adminNotified: true });
        if (!o.buyerEmailed && (await emailBuyer(o))) o = saveOrder({ ...o, buyerEmailed: true });
    });
}

/** Re-reads the payment from YooKassa and moves the order forward. */
export async function syncOrder(id: string): Promise<GiftOrder> {
    let o = readOrder(id);
    if (!o) throw new AppError("Заказ не найден", 404);
    if (o.status === "paid") {
        if (!o.adminNotified || !o.buyerEmailed) await fulfil(id);
        return readOrder(id)!;
    }
    if (o.mode !== "yookassa" || !o.providerId || !["pending", "creating"].includes(o.status)) return o;

    const p = await yookassa(`payments/${o.providerId}`);
    validate(o, p);
    if (p.status === "succeeded" && p.paid) {
        await fulfil(id);
    } else if (p.status === "canceled") {
        o = saveOrder({ ...o, status: "canceled", error: p.cancellation_details?.reason || "canceled" });
    }
    return readOrder(id)!;
}

export async function handleWebhook(input: unknown) {
    const body = (input && typeof input === "object" ? input : {}) as {
        event?: string;
        object?: { id?: string; metadata?: { order_id?: string; app?: string } };
    };
    if (!body.event?.startsWith("payment.")) return;
    const orderId = body.object?.metadata?.order_id;
    if (body.object?.metadata?.app !== PAYMENT_APP || !orderId || !UUID_RE.test(orderId)) return;
    const o = readOrder(orderId);
    if (!o || o.providerId !== body.object?.id) return;
    await syncOrder(o.id);
}

/** Dev only: pretend the payment went through so the whole flow can be tried locally. */
export async function mockPay(id: string) {
    if (process.env.NODE_ENV === "production") throw new AppError("Недоступно", 404);
    const o = readOrder(id);
    if (!o || o.mode !== "mock") throw new AppError("Заказ не найден", 404);
    await fulfil(id);
    return readOrder(id)!;
}

/** What the order page and the gift page may show. The id itself is the secret. */
export function publicView(o: GiftOrder) {
    const [user, domain] = o.email.split("@");
    return {
        id: o.id,
        status: o.status,
        mode: o.mode,
        cfg: o.cfg,
        amount: o.amount,
        email: `${user.slice(0, 2)}***@${domain}`,
        emailed: !!o.buyerEmailed,
        code: o.status === "paid" ? o.code ?? null : null,
        bonus: o.bonus ?? 0,
        giftPath: o.status === "paid" ? giftPath(o.id) : null,
        confirmationUrl: o.status === "pending" ? o.confirmationUrl ?? null : null,
    };
}

export type PublicOrder = ReturnType<typeof publicView>;
