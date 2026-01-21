import { NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";

export async function POST(req: Request) {
    try {
        console.log("📝 New lead form submission received");
        const body = await req.json();
        const { phone } = body;

        console.log("📞 Phone number:", phone);

        if (!phone || phone.length < 10) {
            console.log("❌ Invalid phone number");
            return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
        }

        const message = `🔥 <b>Новая заявка с сайта!</b>\n\n📞 Телефон: ${phone}\n🎁 Оффер: 1 час бесплатно (CYBERXWEB)`;

        console.log("📨 Attempting to send Telegram notification...");
        const telegramResult = await sendTelegramMessage(message);
        console.log("📨 Telegram send result:", telegramResult);

        return NextResponse.json({
            success: true,
            promoCode: "CYBERXWEB",
            message: "Промокод получен"
        });
    } catch (error) {
        console.error("❌ Lead API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
