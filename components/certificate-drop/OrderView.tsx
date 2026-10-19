"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CreditCard, ExternalLink, Loader2, Mail, RotateCcw, Send } from "lucide-react";
import s from "./drop.module.css";
import HoloCard from "./HoloCard";
import { CodeBox } from "./GiftReveal";
import ActivationGuide from "./ActivationGuide";
import { Burst, CONFETTI, CopyLink } from "./ui";
import { configToQuery, digitGroups, PAGE_PATH, rarityOf, SITE_URL, telegramHelpUrl, track } from "./model";
import type { PublicOrder } from "@/lib/gift-drop/orders";

const POLL_MS = 2500;
const POLL_LIMIT = 72; // ~3 minutes, then the buyer can refresh by hand

export default function OrderView({ initial, mock }: { initial: PublicOrder; mock: boolean }) {
    const reduce = useReducedMotion();
    const [order, setOrder] = useState(initial);
    const [justPaid, setJustPaid] = useState(false);
    const [busy, setBusy] = useState(false);
    const [origin, setOrigin] = useState(SITE_URL);
    useEffect(() => setOrigin(window.location.origin), []);
    const polls = useRef(0);
    const rarity = rarityOf(order.amount);
    const paid = order.status === "paid" && !!order.code;

    const refresh = useCallback(async () => {
        const res = await fetch(`/api/gift/order/${order.id}`, { cache: "no-store" }).catch(() => null);
        if (!res?.ok) return;
        const next: PublicOrder = await res.json();
        setOrder((prev) => {
            if (prev.status !== "paid" && next.status === "paid") {
                setJustPaid(true);
                track("cert_drop_paid", { nominal: next.amount });
            }
            return next;
        });
    }, [order.id]);

    useEffect(() => {
        if (order.status !== "pending" && order.status !== "creating") return;
        if (mock) return;
        const id = window.setInterval(() => {
            polls.current += 1;
            if (polls.current > POLL_LIMIT) return window.clearInterval(id);
            refresh();
        }, POLL_MS);
        refresh();
        return () => window.clearInterval(id);
    }, [order.status, mock, refresh]);

    const mockPay = async () => {
        setBusy(true);
        const res = await fetch(`/api/gift/order/${order.id}/mock-pay`, { method: "POST" }).catch(() => null);
        if (res?.ok) {
            setOrder(await res.json());
            setJustPaid(true);
        }
        setBusy(false);
    };

    const giftUrl = order.giftPath ?? "";
    const tgShare = paid
        ? `https://t.me/share/url?url=${encodeURIComponent(`${origin}${giftUrl}`)}&text=${encodeURIComponent("Тебе подарок! Открой кейс 🎁")}`
        : "";

    return (
        <section className={`${s.root} relative min-h-[100svh] overflow-hidden px-4 pb-24 pt-28 sm:pt-32`} style={{ "--rar": rarity.color } as React.CSSProperties}>
            <div className={s.grain} aria-hidden />
            {paid && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                    <div className={s.rays} style={{ top: "40%" }} />
                </div>
            )}

            <div className="relative z-[2] mx-auto grid grid-cols-1 max-w-[1080px] items-center gap-10 md:grid-cols-[minmax(0,360px)_1fr] md:gap-16">
                <motion.div
                    key={paid ? "paid" : "wait"}
                    initial={reduce || !justPaid ? false : { scale: 0.6, rotateY: -90, opacity: 0 }}
                    animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    className="relative mx-auto w-[min(72vw,340px)] md:w-full"
                >
                    {paid && <Burst colors={[rarity.color, ...CONFETTI]} seed={order.amount + 9} />}
                    <HoloCard cfg={order.cfg} code={paid ? order.code : null} />
                </motion.div>

                <div className="text-center md:text-left">
                    {paid ? (
                        <>
                            <p className="font-inter text-[15px] text-[#a39cc4]">Оплата прошла</p>
                            <h1 className={`${s.display} mt-2 text-[clamp(2rem,5vw,3.2rem)] leading-[1.03] text-white`}>
                                Сертификат на {digitGroups(order.amount).join(" ")}
                                <span className="font-inter font-extrabold">&nbsp;₽</span> готов
                            </h1>
                            <CodeBox code={order.code!} />
                            {order.bonus > 0 && (
                                <p className="mt-3 font-inter text-[15px] font-semibold text-[#FFE68A]">
                                    +{order.bonus} бонусов в подарок: начислятся при регистрации в приложении CyberX
                                </p>
                            )}
                            <p className="mt-3 font-inter text-[14px] leading-relaxed text-[#8f88b3]">
                                Промокод заработает в приложении CyberX после подтверждения клубом.{" "}
                                {order.emailed ? "Копию со ссылкой-сюрпризом отправили на" : "Сохраните эту страницу: копия придёт на"}{" "}
                                <span className="inline-flex items-center gap-1 text-[#c8c1ea]">
                                    <Mail className="h-3.5 w-3.5" aria-hidden />
                                    {order.email}
                                </span>
                                {order.emailed ? "." : " чуть позже."}
                            </p>

                            <h2 className="mt-8 font-inter text-[18px] font-bold text-white">Осталось отправить ссылку-сюрприз</h2>
                            <p className="mt-1.5 font-inter text-[15px] text-[#a39cc4]">
                                Отправьте её тому, кому дарите: по ней откроется кейс с вашим дизайном, пожеланием и промокодом.
                            </p>
                            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <CopyLink url={giftUrl} label="Скопировать ссылку" goal="cert_drop_copy_link" className="h-14 rounded-2xl !border-transparent !bg-white !text-[#0d0a1c] hover:!bg-white/90" />
                                <a
                                    href={tgShare}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => track("cert_drop_share_tg")}
                                    className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-5 font-inter text-[15px] font-semibold text-white transition-colors hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                >
                                    <Send className="h-4 w-4" aria-hidden />
                                    Отправить в Telegram
                                </a>
                                <a
                                    href={giftUrl}
                                    target="_blank"
                                    rel="noopener"
                                    className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-4 font-inter text-[15px] font-semibold text-[#c8c1ea] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                >
                                    <ExternalLink className="h-4 w-4" aria-hidden />
                                    Посмотреть, как откроется подарок
                                </a>
                            </div>
                        </>
                    ) : order.status === "canceled" || order.status === "failed" ? (
                        <>
                            <h1 className={`${s.display} text-[clamp(1.8rem,4.5vw,2.8rem)] leading-[1.05] text-white`}>Оплата не прошла</h1>
                            <p className="mt-4 font-inter text-[16px] leading-relaxed text-[#a39cc4]">
                                Деньги не списаны. Макет сохранён, можно попробовать ещё раз или выбрать другой способ оплаты.
                            </p>
                            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href={`${PAGE_PATH}?${configToQuery(order.cfg)}`}
                                    className={`${s.buy} inline-flex h-14 items-center justify-center gap-2.5 rounded-2xl px-6 font-inter text-[16px] font-bold`}
                                >
                                    <RotateCcw className="h-5 w-5" aria-hidden />
                                    Вернуться к макету
                                </a>
                                <a
                                    href={telegramHelpUrl()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/15 px-6 font-inter text-[15px] font-semibold text-white"
                                >
                                    <Send className="h-4 w-4" aria-hidden />
                                    Написать в Telegram
                                </a>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className={`${s.display} text-[clamp(1.8rem,4.5vw,2.8rem)] leading-[1.05] text-white`}>
                                {mock ? "Тестовая оплата" : "Проверяем оплату"}
                            </h1>
                            {mock ? (
                                <>
                                    <p className="mt-4 font-inter text-[16px] leading-relaxed text-[#a39cc4]">
                                        ЮKassa ещё не подключена, поэтому вместо страницы оплаты здесь тестовая кнопка. На сайте в рабочем режиме её нет.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={mockPay}
                                        disabled={busy}
                                        className={`${s.buy} mt-7 inline-flex h-14 items-center justify-center gap-2.5 rounded-2xl px-6 font-inter text-[16px] font-bold disabled:opacity-70`}
                                    >
                                        {busy ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : <CreditCard className="h-5 w-5" aria-hidden />}
                                        Оплатить {digitGroups(order.amount).join(" ")}&nbsp;₽ (тест)
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p className="mt-4 inline-flex items-center gap-2.5 font-inter text-[16px] text-[#a39cc4]">
                                        <Loader2 className="h-5 w-5 animate-spin" style={{ color: rarity.color }} aria-hidden />
                                        Обычно это занимает несколько секунд
                                    </p>
                                    {order.confirmationUrl && (
                                        <p className="mt-6 font-inter text-[15px] text-[#8f88b3]">
                                            Не успели оплатить?{" "}
                                            <a href={order.confirmationUrl} className="font-semibold text-white underline underline-offset-4">
                                                Вернуться к оплате
                                            </a>
                                        </p>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>

            {paid && (
                <div className="relative z-[2] mx-auto mt-14 max-w-[1080px]">
                    <ActivationGuide />
                </div>
            )}
        </section>
    );
}
