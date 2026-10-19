"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    animate,
    motion,
    useAnimationFrame,
    useInView,
    useMotionTemplate,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from "framer-motion";
import s from "./drop.module.css";
import { Lock } from "lucide-react";
import { CODE_MASK, digitGroups, GiftConfig, imageUrl, occasionLine, rarityOf, SkinId } from "./model";

/* ── Rolling number: each digit is a 0–9 column that slides into place ── */

export function RollingNumber({ value }: { value: number }) {
    const groups = digitGroups(value);
    return (
        <span className={s.roll}>
            <span className="sr-only">{groups.join(" ")}</span>
            {groups.map((g, gi) => (
                <span className={s.rollGroup} key={`${groups.length - gi}`} aria-hidden>
                    {Array.from(g).map((ch, ci) => (
                        <span className={s.digit} key={`${g.length - ci}`}>
                            <span className={s.digitCol} style={{ transform: `translateY(${-Number(ch) * 10}%)` }}>
                                {"0123456789".split("").map((d) => (
                                    <span key={d}>{d}</span>
                                ))}
                            </span>
                        </span>
                    ))}
                </span>
            ))}
        </span>
    );
}

/* ── Typed line: only newly typed letters animate in ─────────────────── */

function TypedLine({ text, className }: { text: string; className: string }) {
    // Server-rendered letters show as-is; only letters typed later animate in.
    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;
    }, []);
    const words = text.split(" ");
    let offset = 0;
    return (
        <span className={className} aria-label={text}>
            {words.map((w, wi) => {
                const start = offset;
                offset += w.length + 1;
                return (
                    <React.Fragment key={wi}>
                        <span className={s.word} aria-hidden>
                            {Array.from(w).map((ch, ci) => (
                                <motion.span
                                    key={`${start + ci}-${ch}`}
                                    style={{ display: "inline-block" }}
                                    initial={mounted.current ? { opacity: 0, y: "0.4em", filter: "blur(6px)" } : false}
                                    animate={{ opacity: 1, y: "0em", filter: "blur(0px)", transitionEnd: { filter: "none" } }}
                                    transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
                                >
                                    {ch}
                                </motion.span>
                            ))}
                        </span>
                        {wi < words.length - 1 ? " " : null}
                    </React.Fragment>
                );
            })}
        </span>
    );
}

/* ── The certificate ─────────────────────────────────────────────────── */

type Props = {
    cfg: GiftConfig;
    /** Follow the pointer with tilt + foil. */
    tilt?: boolean;
    /** Gentle sway when nobody is touching it (also makes the foil shimmer on phones). */
    idle?: boolean;
    className?: string;
    /** The real promo code once paid; until then a locked placeholder is printed. */
    code?: string | null;
};

export default function HoloCard({ cfg, tilt = true, idle = true, className = "", code = null }: Props) {
    const reduce = useReducedMotion();
    const wrapRef = useRef<HTMLDivElement>(null);
    const inView = useInView(wrapRef, { margin: "120px" });
    const hovering = useRef(false);

    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const mx = useMotionValue(50);
    const my = useMotionValue(40);
    const spin = useMotionValue(0);
    const srx = useSpring(rx, { stiffness: 140, damping: 16 });
    const sry = useSpring(ry, { stiffness: 140, damping: 16 });
    const smx = useSpring(mx, { stiffness: 110, damping: 20 });
    const smy = useSpring(my, { stiffness: 110, damping: 20 });
    const rotateY = useTransform([sry, spin], ([a, b]: number[]) => a + b);
    const mxs = useMotionTemplate`${smx}%`;
    const mys = useMotionTemplate`${smy}%`;

    // Skin swap happens edge-on, mid-flip, so the new face "turns in".
    const [skin, setSkin] = useState<SkinId>(cfg.skin);
    useEffect(() => {
        if (cfg.skin === skin) return;
        if (reduce) {
            setSkin(cfg.skin);
            return;
        }
        let alive = true;
        (async () => {
            await animate(spin, 90, { duration: 0.2, ease: "easeIn" });
            if (!alive) return;
            setSkin(cfg.skin);
            spin.set(-90);
            await animate(spin, 0, { type: "spring", stiffness: 190, damping: 15 });
        })();
        return () => {
            alive = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cfg.skin]);

    useAnimationFrame((t) => {
        if (!idle || reduce || hovering.current || !inView) return;
        rx.set(Math.sin(t / 1700) * 5);
        ry.set(Math.cos(t / 2300) * 9);
        mx.set(50 + Math.sin(t / 1900) * 38);
        my.set(45 + Math.cos(t / 2600) * 28);
    });

    const onMove = (e: React.PointerEvent) => {
        if (!tilt || reduce || e.pointerType === "touch") return;
        const r = wrapRef.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        hovering.current = true;
        ry.set((px - 0.5) * 26);
        rx.set((0.5 - py) * 20);
        mx.set(px * 100);
        my.set(py * 100);
    };
    const onLeave = () => {
        hovering.current = false;
        if (!idle) {
            rx.set(0);
            ry.set(0);
            mx.set(50);
            my.set(40);
        }
    };

    const rarity = rarityOf(cfg.nominal);
    const from = cfg.from.trim();

    return (
        <div ref={wrapRef} className={`${s.cardWrap} ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
            <motion.div
                className={`${s.card} ${s.skin}`}
                data-skin={skin}
                style={
                    {
                        rotateX: srx,
                        rotateY,
                        "--mx": mxs,
                        "--my": mys,
                        "--rar": rarity.color,
                        "--photo": cfg.image ? `url(${imageUrl(cfg.image)})` : undefined,
                    } as unknown as React.CSSProperties
                }
            >
                <div className={`${s.layer} ${s.skinBg}`} aria-hidden />
                <div className={`${s.layer} ${s.pattern}`} aria-hidden />
                <div className={`${s.layer} ${s.foil}`} aria-hidden />

                <div className={s.cardBody}>
                    <div className={s.cardTop}>
                        <div className={s.cardBrand}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/logo new.png" alt="CyberX" className={s.cardLogo} />
                            <span className={s.cardClub}>Компьютерный клуб</span>
                            <span className={s.cardAddress}>г. Москва, ул. Новокосинская, д. 32</span>
                        </div>
                        <span className={s.rarityPill}>
                            <i aria-hidden />
                            {rarity.name}
                        </span>
                    </div>

                    <div className={s.cardMid}>
                        <div className={s.cardKicker}>Подарочный сертификат</div>
                        <TypedLine className={s.cardOccasion} text={occasionLine(cfg)} />
                        <div className={s.cardNominal}>
                            <RollingNumber value={cfg.nominal} />
                            <span className={s.rub}>₽</span>
                        </div>
                        {cfg.message.trim() && <p className={s.cardMsg}>«{cfg.message.trim()}»</p>}
                        {from && (
                            <p className={s.cardFrom}>
                                Дарит <b>{from}</b>
                            </p>
                        )}
                    </div>

                    <div className={s.cardFoot}>
                        <div className={s.cardValid}>
                            <span>Действует во всех зонах:</span>
                            <ul>
                                <li>ПК, PS5, автосимулятор</li>
                                <li>снеки и напитки</li>
                                <li>онлайн-бронирование</li>
                            </ul>
                        </div>
                        <div className={s.cardCode}>
                            <span>Код активации:</span>
                            {code ? (
                                <b className={s.codeReal}>{code}</b>
                            ) : (
                                <b className={s.codeLock} title="Код появится после оплаты">
                                    <Lock aria-hidden />
                                    {CODE_MASK}
                                </b>
                            )}
                        </div>
                    </div>
                </div>

                <div className={s.rarityBar} aria-hidden />
                <div className={`${s.layer} ${s.glare}`} aria-hidden />
            </motion.div>
        </div>
    );
}

/* ── Tiny static certificate for swatches, reel slots and the buy bar ── */

export function MiniCert({
    skin,
    nominal,
    image,
    className = "",
    label = true,
}: {
    skin: SkinId;
    nominal?: number;
    image?: string;
    className?: string;
    label?: boolean;
}) {
    const rarity = rarityOf(nominal ?? 0);
    return (
        <span
            className={`${s.skin} relative block overflow-hidden ${className}`}
            data-skin={skin}
            style={{ "--rar": rarity.color, "--photo": image ? `url(${imageUrl(image)})` : undefined } as React.CSSProperties}
        >
            <span className={`${s.layer} ${s.skinBg}`} aria-hidden />
            <span className={`${s.layer} ${s.pattern}`} aria-hidden />
            <span className={`${s.layer} ${s.foil}`} aria-hidden />
            {label && nominal ? (
                <span
                    className="relative z-[1] flex h-full flex-col items-center justify-center text-center"
                    style={{ color: "var(--card-fg)" }}
                >
                    <span className="font-inter text-[10px] font-medium opacity-75">Сертификат</span>
                    <span className="font-tactic text-[22px] font-black leading-none" style={{ textShadow: "var(--nominal-shadow)" }}>
                        {digitGroups(nominal).join(" ")}
                        <span className="font-inter text-[13px] font-extrabold" style={{ color: "var(--card-accent)" }}>
                            {" "}₽
                        </span>
                    </span>
                </span>
            ) : null}
        </span>
    );
}
