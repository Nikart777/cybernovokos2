"use client";

import React, { useEffect, useState } from "react";
import { BONUS_AMOUNT, BONUS_DAYS, plural } from "./model";

// Personal promo: +400 bonuses for orders placed within 3 days of the first
// visit. The deadline is real: it is stored once per browser, and orders sent
// after it no longer carry the bonus (the server checks it too).

const KEY = "cx-gift-bonus-until";

export function useBonusDeadline() {
    const [until, setUntil] = useState<number | null>(null);
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        let value: number | null = null;
        try {
            const saved = Number(window.localStorage.getItem(KEY));
            if (Number.isFinite(saved) && saved > 0) value = saved;
            else {
                value = Date.now() + BONUS_DAYS * 86_400_000;
                window.localStorage.setItem(KEY, String(value));
            }
        } catch {
            value = null; // no storage → no promise we could keep
        }
        setUntil(value);
        setNow(Date.now());
    }, []);

    useEffect(() => {
        if (!until) return;
        const id = window.setInterval(() => setNow(Date.now()), 1000);
        return () => window.clearInterval(id);
    }, [until]);

    const left = until ? Math.max(0, until - now) : 0;
    return { until, active: left > 0, left };
}

const two = (n: number) => String(n).padStart(2, "0");

export function formatDeadline(until: number) {
    return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format(new Date(until));
}

/** "2 дня 23:59:12" style countdown, split into readable cells. */
export function Countdown({ left }: { left: number }) {
    const total = Math.floor(left / 1000);
    const d = Math.floor(total / 86400);
    const h = Math.floor((total % 86400) / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const cells = [
        { v: String(d), l: plural(d, ["день", "дня", "дней"]) },
        { v: two(h), l: "ч" },
        { v: two(m), l: "мин" },
        { v: two(s), l: "сек" },
    ];
    return (
        <span className="inline-flex items-end gap-1.5" role="timer" aria-label={`До конца акции ${d} д ${h} ч ${m} мин`}>
            {cells.map((c, i) => (
                <span key={c.l} className="inline-flex items-end gap-1.5">
                    <span className="flex flex-col items-center">
                        <span className="min-w-[2.2ch] rounded-md bg-black/40 px-1.5 py-1 text-center font-tactic text-[17px] font-black tabular-nums leading-none text-white">
                            {c.v}
                        </span>
                        <span className="mt-1 font-inter text-[10px] text-[#a39cc4]">{c.l}</span>
                    </span>
                    {i < cells.length - 1 && <span className="pb-[18px] font-tactic text-[15px] font-black text-white/50">:</span>}
                </span>
            ))}
        </span>
    );
}

export const bonusLabel = `+${BONUS_AMOUNT} бонусов в подарок`;
