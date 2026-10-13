"use client";

import { useState } from "react";
import { SIMRACING_TARIFFS } from "./simracingData";
import { BookingButton } from "./SimracingControls";

export default function SimracingTariffs() {
  const [weekend, setWeekend] = useState(false);
  const descriptions = [
    "Попробовать и почувствовать руль.",
    "Освоиться и устроить свою гонку.",
    "Погрузиться в любимые трассы.",
    "Большая сессия для увлечённых гонками.",
  ];
  return (
    <div className="mt-8">
      <div className="mb-7 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div
          className="inline-flex rounded-lg bg-[#191b21] p-1"
          role="group"
          aria-label="Выбор тарифа по дням"
        >
          <button
            type="button"
            aria-pressed={!weekend}
            onClick={() => setWeekend(false)}
            className={`sr-toggle ${!weekend ? "sr-toggle-active" : ""}`}
          >
            Будни
          </button>
          <button
            type="button"
            aria-pressed={weekend}
            onClick={() => setWeekend(true)}
            className={`sr-toggle ${weekend ? "sr-toggle-active" : ""}`}
          >
            Выходные
          </button>
        </div>
        <p className="text-sm text-[#b4b6c0]">
          За один кокпит · Поможем с настройкой
        </p>
      </div>
      <div className="sr-price-list" aria-live="polite" aria-atomic="true">
        {SIMRACING_TARIFFS.map((tariff, index) => (
          <article
            key={tariff.time}
            className={`sr-price-row ${index === 1 ? "sr-price-featured" : ""}`}
          >
            <div>
              <h3 className="font-tactic text-2xl font-bold lowercase">
                {tariff.time}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#b4b6c0]">
                {descriptions[index]}
              </p>
            </div>
            <p className="sr-price tabular-nums">
              {new Intl.NumberFormat("ru-RU").format(
                weekend ? tariff.end : tariff.week,
              )}
              <span className="ml-2 text-xl">₽</span>
            </p>
            <BookingButton
              className={index === 1 ? "" : "sr-button-secondary"}
            />
          </article>
        ))}
      </div>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#b4b6c0]">
        Выходной тариф: с 17:00 пятницы до 22:00 воскресенья. Настройка посадки
        включена. Для заезда компанией бронируйте отдельный кокпит каждому
        пилоту.
      </p>
      <noscript>
        <p className="mt-4">
          В выходные: 1 час 850 ₽, 2 часа 1 290 ₽, 3 часа 1 650 ₽, 5 часов 2 400
          ₽.
        </p>
      </noscript>
    </div>
  );
}
