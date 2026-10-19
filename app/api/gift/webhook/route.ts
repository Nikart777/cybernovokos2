import { NextResponse } from "next/server";
import { handleWebhook } from "@/lib/gift-drop/orders";
import { AppError } from "@/lib/gift-drop/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// YooKassa HTTP notification. The body is only a hint: the payment is re-read
// from the API before anything is issued. A non-2xx answer makes YooKassa retry.
export async function POST(req: Request) {
    try {
        await handleWebhook(await req.json().catch(() => null));
        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error("[gift] webhook", e);
        const status = e instanceof AppError && e.status < 500 ? 200 : 503;
        return NextResponse.json({ ok: false }, { status });
    }
}
