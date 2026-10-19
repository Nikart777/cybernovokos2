import crypto from "crypto";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { imageUrl } from "@/components/certificate-drop/model";
import { AppError, clientIp, rateLimit, saveUpload } from "@/lib/gift-drop/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 15 * 1024 * 1024;

// Turns any phone/desktop photo into a light 1000×1400 WebP that fills the
// certificate: EXIF rotation applied, metadata stripped, crop follows the
// most "interesting" part of the picture (faces, contrast).
export async function POST(req: Request) {
    try {
        rateLimit(`upload:${clientIp(req)}`, 20, 60 * 60 * 1000);
        const form = await req.formData().catch(() => null);
        const file = form?.get("file");
        if (!file || typeof file === "string") throw new AppError("Выберите картинку");
        if (file.size > MAX_BYTES) throw new AppError("Файл больше 15 МБ — выберите поменьше", 413);
        if (file.type && !file.type.startsWith("image/")) throw new AppError("Нужна картинка: JPG, PNG или WebP");

        let out: Buffer;
        try {
            out = await sharp(Buffer.from(await file.arrayBuffer()), { limitInputPixels: 80_000_000 })
                .rotate()
                .resize(1000, 1400, { fit: "cover", position: sharp.strategy.attention })
                .webp({ quality: 80, effort: 4 })
                .toBuffer();
        } catch {
            throw new AppError("Не получилось открыть картинку. Попробуйте JPG или PNG");
        }

        const id = crypto.randomBytes(16).toString("hex");
        saveUpload(id, out);
        return NextResponse.json({ id, url: imageUrl(id), bytes: out.length });
    } catch (e) {
        const status = e instanceof AppError ? e.status : 500;
        if (!(e instanceof AppError)) console.error("[gift] upload", e);
        return NextResponse.json({ error: e instanceof AppError ? e.message : "Ошибка загрузки" }, { status });
    }
}
