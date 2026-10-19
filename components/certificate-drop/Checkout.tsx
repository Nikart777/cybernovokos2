"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Lock, ShieldCheck, X } from "lucide-react";
import s from "./drop.module.css";
import { MiniCert } from "./HoloCard";
import { digitGroups, GiftConfig, occasionLabel, rarityOf, skinName, telegramHelpUrl, track } from "./model";
import { bonusLabel, useBonusDeadline } from "./bonus";

const EMAIL_KEY = "cx-gift-email";

type Props = { cfg: GiftConfig; open: boolean; place: string; onClose: () => void };

export default function Checkout({ cfg, open, place, onClose }: Props) {
    const [email, setEmail] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<{ text: string; offline?: boolean } | null>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const rarity = rarityOf(cfg.nominal);
    const bonus = useBonusDeadline();
    // Owner's live check (/certificate?test=<key>): read once on load, the URL is rewritten after the first edit.
    const [testKey, setTestKey] = useState<string | null>(null);
    useEffect(() => setTestKey(new URLSearchParams(window.location.search).get("test")), []);
    const price = testKey ? "1 ₽ (тест)" : `${digitGroups(cfg.nominal).join(" ")} ₽`;

    useEffect(() => {
        if (!open) return;
        setError(null);
        try {
            const saved = window.localStorage.getItem(EMAIL_KEY);
            if (saved && !email) setEmail(saved);
        } catch {
            /* storage can be blocked */
        }
        const t = window.setTimeout(() => emailRef.current?.focus({ preventScroll: true }), 250);
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && !busy && onClose();
        window.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.clearTimeout(t);
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (busy) return;
        setBusy(true);
        setError(null);
        track("cert_drop_pay", { place, nominal: cfg.nominal, skin: cfg.skin });
        try {
            try {
                window.localStorage.setItem(EMAIL_KEY, email.trim());
            } catch {
                /* ignore */
            }
            const res = await fetch("/api/gift/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cfg,
                    email: email.trim(),
                    consent: true,
                    bonusUntil: bonus.active ? bonus.until : null,
                    testKey: testKey || undefined,
                }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data.confirmationUrl) {
                setError({ text: data.error || "Не получилось оформить заказ. Попробуйте ещё раз.", offline: res.status === 503 });
                setBusy(false);
                return;
            }
            window.location.href = data.confirmationUrl;
        } catch {
            setError({ text: "Нет связи с сервером. Проверьте интернет и попробуйте ещё раз." });
            setBusy(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[140] flex items-end justify-center sm:items-center sm:p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="cd-checkout-title"
                    style={{ "--rar": rarity.color } as React.CSSProperties}
                >
                    <div className="absolute inset-0 bg-[#07051a]/80 backdrop-blur-md" onClick={() => !busy && onClose()} aria-hidden />
                    <motion.form
                        onSubmit={submit}
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 60, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                        className="relative max-h-[92svh] w-full max-w-[480px] overflow-y-auto rounded-t-[26px] border border-white/10 bg-[#151030] p-5 pb-[max(20px,env(safe-area-inset-bottom))] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] sm:rounded-[26px] sm:p-7"
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={busy}
                            aria-label="Закрыть"
                            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-[#a39cc4] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <h2 id="cd-checkout-title" className={`${s.display} pr-10 text-[1.6rem] leading-[1.08] text-white`}>
                            Оформление сертификата
                        </h2>

                        <div className="mt-5 flex items-center gap-4 rounded-2xl bg-black/25 p-3">
                            <MiniCert skin={cfg.skin} image={cfg.image} nominal={cfg.nominal} label={false} className="h-[78px] w-[56px] shrink-0 rounded-lg" />
                            <div className="min-w-0 font-inter">
                                <div className="font-tactic text-[22px] font-black leading-none text-white">
                                    {digitGroups(cfg.nominal).join(" ")}
                                    <span className="font-inter font-extrabold"> ₽</span>
                                </div>
                                <div className="mt-1.5 truncate text-[13px] text-[#c8c1ea]">
                                    {skinName(cfg.skin)}, {occasionLabel(cfg).toLowerCase()}
                                </div>
                                <div className="truncate text-[13px] text-[#8f88b3]">
                                    {cfg.to.trim() ? `Кому: ${cfg.to.trim()}` : "Без имени"}
                                </div>
                                {bonus.active && <div className="mt-1 text-[13px] font-semibold text-[#FFE68A]">{bonusLabel}</div>}
                            </div>
                        </div>

                        <label htmlFor="cd-email" className="mt-5 block font-inter text-[13px] font-semibold text-[#c8c1ea]">
                            Email для чека и промокода
                        </label>
                        <input
                            ref={emailRef}
                            id="cd-email"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            required
                            maxLength={254}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@mail.ru"
                            className="mt-2 h-12 w-full rounded-xl border border-white/12 bg-white/[0.05] px-4 font-inter text-[16px] text-white placeholder:text-[#7d76a3] focus:border-white/40 focus:outline-none"
                        />

                        <ul className="mt-5 space-y-2.5 font-inter text-[14px] leading-snug text-[#c8c1ea]">
                            <li className="flex gap-2.5">
                                <Lock className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--rar)" }} aria-hidden />
                                Промокод и ссылка-сюрприз откроются сразу после оплаты
                            </li>
                            <li className="flex gap-2.5">
                                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#7CF5FF]" aria-hidden />
                                Оплата картой или через СБП на защищённой странице ЮKassa
                            </li>
                        </ul>

                        {error && (
                            <p role="alert" className="mt-4 rounded-xl border border-[#ff2e63]/40 bg-[#ff2e63]/10 p-3 font-inter text-[14px] text-white">
                                {error.text}
                                {error.offline && (
                                    <>
                                        {" "}
                                        <a href={telegramHelpUrl()} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
                                            Написать в Telegram
                                        </a>
                                    </>
                                )}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={busy}
                            className={`${s.buy} mt-6 inline-flex h-16 w-full items-center justify-center gap-2.5 rounded-2xl font-inter text-[18px] font-bold disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white`}
                        >
                            {busy ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : null}
                            {busy ? "Переходим к оплате…" : `Оплатить ${price}`}
                        </button>

                        <p className="mt-3 text-center font-inter text-[12px] leading-relaxed text-[#8f88b3]">
                            Нажимая «Оплатить», вы принимаете{" "}
                            <a href="/legal/offer" target="_blank" className="underline underline-offset-2 hover:text-white">
                                оферту
                            </a>{" "}
                            и{" "}
                            <a href="/legal/privacy" target="_blank" className="underline underline-offset-2 hover:text-white">
                                политику конфиденциальности
                            </a>
                            .
                        </p>
                    </motion.form>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
