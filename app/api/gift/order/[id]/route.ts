import { NextResponse } from "next/server";
import { publicView, syncOrder } from "@/lib/gift-drop/orders";
import { AppError, readOrder } from "@/lib/gift-drop/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Polled by the order page after the buyer returns from YooKassa. */
export async function GET(_req: Request, { params }: { params: { id: string } }) {
    try {
        let order;
        try {
            order = await syncOrder(params.id);
        } catch (e) {
            // YooKassa hiccup: show what we already know, the page keeps polling
            if (e instanceof AppError && e.status === 404) throw e;
            order = readOrder(params.id);
            if (!order) throw e;
        }
        return NextResponse.json(publicView(order), { headers: { "Cache-Control": "no-store" } });
    } catch (e) {
        return NextResponse.json(
            { error: e instanceof AppError ? e.message : "Ошибка" },
            { status: e instanceof AppError ? e.status : 500 },
        );
    }
}
