import Link from "next/link";
import type { Metadata } from "next";
import GiftReveal from "@/components/certificate-drop/GiftReveal";
import { PAGE_PATH } from "@/components/certificate-drop/model";
import { loadRates } from "@/lib/gift-drop/rates";
import { readOrder, UUID_RE } from "@/lib/gift-drop/store";

export const dynamic = "force-dynamic";

function load(id: string) {
    if (!UUID_RE.test(id)) return null;
    const o = readOrder(id);
    return o && o.status === "paid" && o.code ? o : null;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const o = load(params.id);
    const from = o?.cfg.from.trim();
    const title = from ? `${from} дарит тебе подарок в CyberX` : "Тебе подарок в CyberX Новокосино";
    const description = "Открой кейс и посмотри, что внутри: сертификат в компьютерный клуб CyberX Новокосино.";
    return {
        title,
        description,
        robots: { index: false, follow: false },
        openGraph: { title, description, images: [{ url: "/certificates.webp", alt: "Подарочный сертификат CyberX" }] },
    };
}

export default async function GiftPage({ params }: { params: { id: string } }) {
    const o = load(params.id);
    if (!o) {
        return (
            <main className="flex min-h-[100svh] flex-col items-center justify-center bg-[#0d0a1c] px-6 text-center text-white">
                <h1 className="font-tactic text-[2rem] font-black leading-tight">Подарок пока недоступен</h1>
                <p className="mt-4 max-w-[44ch] font-inter text-[16px] text-[#a39cc4]">
                    Ссылка неверная или сертификат ещё не оплачен. Попросите отправителя проверить ссылку.
                </p>
                <Link href={PAGE_PATH} className="mt-8 font-inter font-semibold underline underline-offset-4">
                    Собрать свой сертификат
                </Link>
            </main>
        );
    }
    return <GiftReveal cfg={o.cfg} rates={await loadRates()} code={o.code!} />;
}
