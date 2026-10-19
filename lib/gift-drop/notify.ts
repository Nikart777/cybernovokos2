import { sendTelegramMessage } from "@/lib/telegram";
import { CLUB_ADDRESS, CLUB_NAME, formatRub, giftPath, occasionLabel, orderPath, skinName } from "@/components/certificate-drop/model";
import type { GiftOrder } from "./store";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** The club creates the promo code in Langame by hand, so the admin chat must get every paid order. */
export async function notifyAdmin(o: GiftOrder): Promise<boolean> {
    const c = o.cfg;
    const lines = [
        `🎁 <b>Оплачен подарочный сертификат${o.mode === "mock" ? " (ТЕСТ, без оплаты)" : ""}</b>`,
        `Номинал: <b>${formatRub(o.amount)}</b>`,
        `Промокод: <code>${esc(o.code || "")}</code>`,
        `👉 Создайте этот промокод в Langame на ${formatRub(o.amount)}.`,
        o.bonus ? `ℹ️ На странице обещаны ${o.bonus} приветственных бонусов: они начисляются автоматически при регистрации, вручную ничего начислять не нужно.` : "",
        "",
        c.to.trim() && `Кому: ${esc(c.to.trim())}`,
        c.from.trim() && `От кого: ${esc(c.from.trim())}`,
        `Повод: ${esc(occasionLabel(c))}`,
        `Дизайн: ${esc(skinName(c.skin))}`,
        c.message.trim() && `Пожелание: «${esc(c.message.trim())}»`,
        `Покупатель: ${esc(o.email)}`,
        `Заказ: ${o.baseUrl}${orderPath(o.id)}`,
    ].filter(Boolean);
    try {
        return await sendTelegramMessage(lines.join("\n"), undefined, process.env.GIFT_TELEGRAM_CHAT_ID || undefined);
    } catch (e) {
        console.error("[gift] admin notify failed", e);
        return false;
    }
}

/** Code + surprise link to the buyer, through the same mail relay the site already uses. */
export async function emailBuyer(o: GiftOrder): Promise<boolean> {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) return false;
    const gift = `${o.baseUrl}${giftPath(o.id)}`;
    const order = `${o.baseUrl}${orderPath(o.id)}`;
    const to = o.cfg.to.trim();
    const subject = `Ваш подарочный сертификат CyberX на ${formatRub(o.amount)}`;
    const text = [
        "Спасибо за покупку!",
        `Сертификат: ${formatRub(o.amount)} в CyberX Новокосино.`,
        `Промокод: ${o.code}`,
        o.bonus ? `Плюс ${o.bonus} бонусов в подарок: начислятся при регистрации в приложении CyberX.` : "",
        "",
        `Ссылка-сюрприз: ${gift}`,
        "Получатель откроет кейс и увидит ваш сертификат и промокод.",
        "",
        "Как активировать промокод (перешлите получателю):",
        "",
        "Онлайн, в приложении:",
        "1. Скачайте приложение CyberX.",
        `2. Найдите в нём клуб ${CLUB_NAME}.`,
        "3. Зарегистрируйтесь по своему номеру телефона.",
        "4. Активируйте промокод: баланс можно тратить на онлайн-бронирование.",
        "",
        "Лично в клубе:",
        `1. Приходите в клуб (${CLUB_ADDRESS}) и садитесь за любой компьютер.`,
        "2. Зарегистрируйтесь по номеру телефона.",
        "3. Введите промокод, и баланс активируется.",
        "",
        `Страница заказа: ${order}`,
    ].join("\n");
    const html = `<!doctype html><html><body style="margin:0;background:#0d0a1c;font-family:Arial,sans-serif;color:#f1eeff">
<div style="max-width:520px;margin:0 auto;padding:32px 20px">
<p style="color:#a39cc4;margin:0 0 8px">CyberX Новокосино</p>
<h1 style="margin:0 0 20px;font-size:26px;color:#fff">Сертификат на ${esc(formatRub(o.amount))} готов</h1>
<p style="margin:0 0 6px;color:#a39cc4">Промокод</p>
<p style="margin:0 0 ${o.bonus ? 8 : 24}px;font-size:28px;font-weight:bold;letter-spacing:3px;color:#fff">${esc(o.code || "")}</p>
${o.bonus ? `<p style="margin:0 0 24px;color:#ffe68a;font-weight:bold">+${o.bonus} бонусов в подарок: начислятся при регистрации в приложении CyberX</p>` : ""}
<p style="margin:0 0 16px;line-height:1.5">Осталось отправить ссылку-сюрприз. ${esc(to || "Получатель")} откроет по ней кейс с вашим дизайном, пожеланием и промокодом.</p>
<p style="margin:0 0 28px"><a href="${gift}" style="display:inline-block;background:#ff2e63;color:#fff;text-decoration:none;font-weight:bold;padding:14px 22px;border-radius:12px">Открыть ссылку-сюрприз</a></p>
<h2 style="margin:0 0 10px;font-size:18px;color:#fff">Как активировать промокод</h2>
<p style="margin:0 0 6px;font-weight:bold;color:#7cf5ff">Онлайн, в приложении</p>
<ol style="margin:0 0 18px;padding-left:20px;line-height:1.6">
<li>Скачайте приложение CyberX.</li>
<li>Найдите в нём клуб ${esc(CLUB_NAME)}.</li>
<li>Зарегистрируйтесь по своему номеру телефона.</li>
<li>Активируйте промокод: баланс можно тратить на онлайн-бронирование.</li>
</ol>
<p style="margin:0 0 6px;font-weight:bold;color:#ffe68a">Лично в клубе</p>
<ol style="margin:0 0 24px;padding-left:20px;line-height:1.6">
<li>Приходите в клуб (${esc(CLUB_ADDRESS)}) и садитесь за любой компьютер.</li>
<li>Зарегистрируйтесь по номеру телефона.</li>
<li>Введите промокод, и баланс активируется.</li>
</ol>
<p style="margin:0;color:#a39cc4;font-size:13px;line-height:1.5">Страница заказа: <a href="${order}" style="color:#7cf5ff">${order}</a></p>
</div></body></html>`;
    try {
        const res = await fetch(process.env.MAIL_RELAY_URL || "http://82.97.253.207:12556/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT) || 465,
                secure: process.env.SMTP_SECURE !== "false",
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
                to: o.email,
                subject,
                text,
                html,
            }),
            signal: AbortSignal.timeout(15000),
        });
        return res.ok;
    } catch (e) {
        console.error("[gift] buyer email failed", e);
        return false;
    }
}
