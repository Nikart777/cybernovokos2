import { NextResponse } from "next/server";
import { mockPay, publicView } from "@/lib/gift-drop/orders";
import { AppError } from "@/lib/gift-drop/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Dev-only stand-in for the YooKassa payment page (refuses in production).
export async function POST(_req: Request, { params }: { params: { id: string } }) {
    try {
        return NextResponse.json(publicView(await mockPay(params.id)));
    } catch (e) {
        return NextResponse.json(
            { error: e instanceof AppError ? e.message : "Ошибка" },
            { status: e instanceof AppError ? e.status : 500 },
        );
    }
}
