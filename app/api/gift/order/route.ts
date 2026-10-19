import { NextResponse } from "next/server";
import { createOrder } from "@/lib/gift-drop/orders";
import { AppError, clientIp, rateLimit } from "@/lib/gift-drop/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        rateLimit(`order:${clientIp(req)}`, 12, 10 * 60 * 1000);
        const body = await req.json().catch(() => null);
        const result = await createOrder(body, new URL(req.url).origin);
        return NextResponse.json(result);
    } catch (e) {
        if (!(e instanceof AppError)) console.error("[gift] create order", e);
        return NextResponse.json(
            { error: e instanceof AppError ? e.message : "Не получилось оформить заказ" },
            { status: e instanceof AppError ? e.status : 500 },
        );
    }
}
