"use client";

import React from "react";
import { MapPin, Monitor, Smartphone } from "lucide-react";
import s from "./drop.module.css";
import { CLUB_ADDRESS, CLUB_NAME, MAPS_URL, track } from "./model";

// How to activate the promo code: online in the CyberX app, or at any PC in the club.
// Shown to the buyer after payment and to the recipient after opening the case.

const APP_STEPS = [
    "Скачайте приложение CyberX",
    `Найдите в нём клуб ${CLUB_NAME}`,
    "Зарегистрируйтесь по своему номеру телефона",
    "Активируйте промокод: баланс сразу можно тратить на онлайн-бронирование",
];

const CLUB_STEPS = [
    `Приходите в клуб (${CLUB_ADDRESS.replace("Москва, ", "")}, работаем круглосуточно) и садитесь за любой компьютер`,
    "Зарегистрируйтесь по номеру телефона",
    "Введите промокод, и баланс активируется",
];

function Steps({ items }: { items: string[] }) {
    return (
        <ol className="mt-4 space-y-3">
            {items.map((t, i) => (
                <li key={t} className="flex gap-3 text-left">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/20 font-inter text-[13px] font-bold text-white">
                        {i + 1}
                    </span>
                    <span className="pt-0.5 font-inter text-[15px] leading-snug text-[#d9d3f5]">{t}</span>
                </li>
            ))}
        </ol>
    );
}

export default function ActivationGuide({ title = "Как активировать промокод", forRecipient = false }: { title?: string; forRecipient?: boolean }) {
    return (
        <div className="text-left">
            <h2 className="font-inter text-[18px] font-bold text-white">{title}</h2>
            <p className="mt-1 font-inter text-[14px] text-[#a39cc4]">
                {forRecipient ? "Два способа, выбирай удобный:" : "Два способа, перешлите это получателю вместе со ссылкой:"}
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                    <div className="flex items-center gap-2.5">
                        <Smartphone className="h-5 w-5 text-[#7CF5FF]" aria-hidden />
                        <b className="font-inter text-[16px] font-bold text-white">Онлайн, в приложении</b>
                    </div>
                    <Steps items={APP_STEPS} />
                    <a
                        href="/download"
                        data-track="click_booking"
                        onClick={() => track("cert_drop_guide_app", { forRecipient })}
                        className={`${s.buy} mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 font-inter text-[15px] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white`}
                    >
                        <Smartphone className="h-4 w-4" aria-hidden />
                        Скачать приложение CyberX
                    </a>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                    <div className="flex items-center gap-2.5">
                        <Monitor className="h-5 w-5 text-[#FFE68A]" aria-hidden />
                        <b className="font-inter text-[16px] font-bold text-white">Лично в клубе</b>
                    </div>
                    <Steps items={CLUB_STEPS} />
                    <a
                        href={MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-5 font-inter text-[15px] font-semibold text-white transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                        <MapPin className="h-4 w-4" aria-hidden />
                        Открыть на карте
                    </a>
                </div>
            </div>
        </div>
    );
}
