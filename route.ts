import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        token: process.env.TELEGRAM_ADMIN_TEST_BOT_TOKEN || "MISSING",
        chatId: process.env.TELEGRAM_ADMIN_TEST_CHAT_ID || "MISSING",
        nodeEnv: process.env.NODE_ENV
    });
}
