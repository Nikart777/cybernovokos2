import fs from "fs";
import { IMAGE_ID_RE } from "@/components/certificate-drop/model";
import { uploadPath } from "@/lib/gift-drop/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
    const id = String(params.id || "").replace(/\.webp$/, "");
    if (!IMAGE_ID_RE.test(id)) return new Response("Not found", { status: 404 });
    try {
        const data = await fs.promises.readFile(uploadPath(id));
        return new Response(new Uint8Array(data), {
            headers: {
                "Content-Type": "image/webp",
                "Cache-Control": "public, max-age=31536000, immutable",
                "X-Robots-Tag": "noindex",
            },
        });
    } catch {
        return new Response("Not found", { status: 404 });
    }
}
