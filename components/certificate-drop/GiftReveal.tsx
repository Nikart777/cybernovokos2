"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, Check, Copy, Gift, Lock } from "lucide-react";
import s from "./drop.module.css";
import HoloCard from "./HoloCard";
import CaseReel from "./CaseReel";
import ActivationGuide from "./ActivationGuide";
import { Burst, CONFETTI } from "./ui";
import { barMix, configToQuery, digitGroups, GiftConfig, PAGE_PATH, Rates, rarityOf, spendOf, track } from "./model";

type Stage = "closed" | "spinning" | "open";

export function CodeBox({ code }: { code: string }) {
    const [done, setDone] = useState(false);
    const copy = async () => {
        track("cert_drop_gift_copy_code");
        try {
            await navigator.clipboard.writeText(code);
            setDone(true);
            window.setTimeout(() => setDone(false), 2000);
        } catch {
            window.prompt("Скопируйте промокод", code);
        }
    };
    return (
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/15 bg-black/30 p-3 pl-5">
            <div className="min-w-0 flex-1 text-left">
                <div className="font-inter text-[12px] text-[#a39cc4]">Промокод</div>
                <div className="font-tactic text-[clamp(1.2rem,5vw,1.6rem)] font-black tracking-[0.12em] text-white">{code}</div>
            </div>
            <button
                type="button"
                onClick={copy}
                className="inline-flex h-12 shrink-0 items-center gap-2 rounded-xl bg-white px-4 font-inter text-[15px] font-bold text-[#0d0a1c] transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0a1c]"
            >
                {done ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                <span aria-live="polite">{done ? "Скопирован" : "Скопировать"}</span>
            </button>
        </div>
    );
}

/**
 * What the recipient sees. With `code` it is a paid gift (the code is revealed
 * inside the case); without it, a preview where the code stays locked.
 */
export default function GiftReveal({ cfg, rates, code }: { cfg: GiftConfig; rates: Rates; code: string | null }) {
    const reduce = useReducedMotion();
    const [stage, setStage] = useState<Stage>("closed");
    const rarity = rarityOf(cfg.nominal);
    const from = cfg.from.trim();
    const hall = spendOf(cfg.nominal, rates).find((x) => x.id === "hall");
    const hallBar = hall ? barMix(hall.bar, true) : "";
    const preview = !code;

    const open = () => {
        track(preview ? "cert_drop_preview_open" : "cert_drop_gift_open");
        setStage("spinning");
    };

    const book = () => window.dispatchEvent(new CustomEvent("open-booking"));

    return (
        <div className={`${s.root} min-h-[100svh]`} style={{ "--rar": rarity.color } as React.CSSProperties}>
            <div className={s.grain} aria-hidden />

            {preview && (
                <div className="relative z-[3] border-b border-white/10 bg-[#151030] px-4 py-2.5 text-center font-inter text-[13px] text-[#c8c1ea]">
                    Это предпросмотр: промокод появится после оплаты.{" "}
                    <a href={`${PAGE_PATH}?${configToQuery(cfg)}`} className="font-semibold text-white underline underline-offset-4">
                        Вернуться к оформлению
                    </a>
                </div>
            )}

            <header className="relative z-[3] mx-auto flex max-w-[1280px] items-center justify-between px-4 py-5 sm:px-6">
                <a href="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo new.png" alt="CyberX" className="h-6 w-auto" />
                    <span className="font-inter text-[13px] text-[#a39cc4]">Новокосино</span>
                </a>
            </header>

            <AnimatePresence mode="wait">
                {stage === "closed" && (
                    <motion.section
                        key="closed"
                        exit={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
                        transition={{ duration: 0.35 }}
                        className="relative z-[2] flex min-h-[calc(100svh-80px)] flex-col items-center justify-center px-4 pb-16 text-center"
                    >
                        <div className={s.beam} aria-hidden />
                        <p className="relative font-inter text-[16px] text-[#c8c1ea]">{from ? `${from} дарит тебе подарок` : "Тебе прислали подарок"}</p>
                        <h1 className={`${s.display} relative mt-3 max-w-[16ch] text-[clamp(2.1rem,7vw,4.2rem)] leading-[1.02] text-white`}>
                            Открой кейс и посмотри, что внутри
                        </h1>

                        <motion.button
                            type="button"
                            onClick={open}
                            aria-label="Открыть кейс"
                            initial={reduce ? false : { y: -200, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.3 }}
                            className="relative mt-12 rounded-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0d0a1c]"
                        >
                            <span className={`${s.crate} block`}>
                                <span className={s.crateBand} />
                                <span className={s.crateLid} />
                                <span className={s.crateLatch} style={{ left: "12%" }} />
                                <span className={s.crateLatch} style={{ right: "12%" }} />
                                <span className={s.cratePlate}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="/logo new.png" alt="" className="h-5 w-auto" />
                                </span>
                            </span>
                        </motion.button>

                        <button
                            type="button"
                            onClick={open}
                            className={`${s.buy} relative mt-12 inline-flex h-16 items-center gap-3 rounded-2xl px-10 font-inter text-[18px] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white`}
                        >
                            <Gift className="h-5 w-5" aria-hidden />
                            Открыть кейс
                        </button>
                    </motion.section>
                )}

                {stage === "spinning" && (
                    <motion.section
                        key="spinning"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-[2] flex min-h-[calc(100svh-80px)] flex-col justify-center pb-16"
                    >
                        <p className="mb-6 text-center font-inter text-[16px] text-[#c8c1ea]">Крутим кейс…</p>
                        <CaseReel cfg={cfg} autoStart onDone={() => setStage("open")} place={preview ? "preview" : "gift"} showButton={false} />
                    </motion.section>
                )}

                {stage === "open" && (
                    <motion.section key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-[2] overflow-hidden px-4 pb-24 pt-6">
                        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                            <div className={s.rays} style={{ top: "34%" }} />
                        </div>
                        <div className="relative mx-auto grid grid-cols-1 max-w-[1040px] items-center gap-10 md:grid-cols-[minmax(0,360px)_1fr] md:gap-16">
                            <motion.div
                                initial={reduce ? false : { scale: 0.5, y: 80, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 160, damping: 15 }}
                                className="relative mx-auto w-[min(72vw,340px)] md:w-full"
                            >
                                <Burst colors={[rarity.color, ...CONFETTI]} seed={cfg.nominal + 3} />
                                <HoloCard cfg={cfg} code={code} />
                            </motion.div>

                            <motion.div
                                initial={reduce ? false : { opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="text-center md:text-left"
                            >
                                <p className="font-inter text-[15px] text-[#a39cc4]">
                                    Выпало <span className="font-semibold" style={{ color: rarity.color }}>{rarity.name.toLowerCase()}</span>
                                </p>
                                <h1 className={`${s.display} mt-2 text-[clamp(2rem,5vw,3.2rem)] leading-[1.03] text-white`}>
                                    {digitGroups(cfg.nominal).join(" ")}
                                    <span className="font-inter font-extrabold">&nbsp;₽</span> в компьютерном клубе CyberX
                                </h1>
                                {hall && (
                                    <p className="mt-3 font-inter text-[16px] text-[#c8c1ea]">
                                        Хватит на {hall.value} {hall.unit} за игровым ПК{hallBar ? `${hallBar.includes(" и ") ? "," : " и"} ${hallBar}` : ""}. Или на ночь до утра, PS5 и автосимулятор. Как захочешь.
                                    </p>
                                )}

                                {code ? (
                                    <CodeBox code={code} />
                                ) : (
                                    <p className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-inter text-[14px] text-[#c8c1ea]">
                                        <Lock className="h-4 w-4 shrink-0" style={{ color: rarity.color }} aria-hidden />
                                        Промокод появится здесь после оплаты
                                    </p>
                                )}

                            </motion.div>
                        </div>

                        <div className="relative mx-auto mt-12 max-w-[1040px]">
                            <ActivationGuide title={code ? "Как забрать подарок" : "Как активировать после оплаты"} forRecipient />
                            <button
                                type="button"
                                onClick={book}
                                className="mt-4 inline-flex h-12 items-center gap-2 rounded-xl px-1 font-inter text-[15px] font-semibold text-[#c8c1ea] underline decoration-white/25 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                                <CalendarCheck className="h-4 w-4" aria-hidden />
                                Забронировать место на сайте
                            </button>
                        </div>

                        <div className="relative mx-auto mt-16 max-w-[1040px] border-t border-white/10 pt-8 text-center md:text-left">
                            <p className="font-inter text-[15px] text-[#a39cc4]">
                                Хочешь тоже кого-то порадовать?{" "}
                                <a
                                    href={PAGE_PATH}
                                    onClick={() => track("cert_drop_regift")}
                                    className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
                                >
                                    Собери свой сертификат
                                </a>
                            </p>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}
