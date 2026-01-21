export async function sendTelegramMessage(text: string): Promise<boolean> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    console.log("🔍 Telegram Debug:");
    console.log("  Token exists:", !!token);
    console.log("  Chat ID exists:", !!chatId);
    console.log("  Chat ID value:", chatId);

    if (!token || !chatId) {
        console.warn("❌ Telegram creds not set");
        return false;
    }

    try {
        console.log("📤 Sending message to Telegram...");
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: "HTML",
            }),
        });

        const responseData = await res.json();
        console.log("📥 Telegram API Response:", responseData);

        if (res.ok) {
            console.log("✅ Message sent successfully!");
        } else {
            console.error("❌ Telegram API Error:", responseData);
        }

        return res.ok;
    } catch (e) {
        console.error("❌ Telegram send error:", e);
        return false;
    }
}
