import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import OrderView from "@/components/certificate-drop/OrderView";
import DropFooter from "@/components/certificate-drop/DropFooter";
import { publicView, syncOrder } from "@/lib/gift-drop/orders";
import { readOrder, UUID_RE } from "@/lib/gift-drop/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Заказ подарочного сертификата",
    robots: { index: false, follow: false },
};

export default async function GiftOrderPage({ params, searchParams }: { params: { id: string }; searchParams: { mock?: string } }) {
    if (!UUID_RE.test(params.id)) notFound();
    // The buyer lands here straight from YooKassa: check the payment right away.
    const order = await syncOrder(params.id).catch(() => readOrder(params.id));
    if (!order) notFound();
    const view = publicView(order);

    return (
        <div className="bg-[#0d0a1c]">
            <Header />
            <OrderView initial={view} mock={order.mode === "mock" && searchParams.mock === "1"} />
            <DropFooter />
        </div>
    );
}
