'use client';

import { useMemo, useState } from 'react';
import { Check, ClipboardCheck, Gauge, MapPin } from 'lucide-react';

const zones = [
  { id: 'common', name: 'Общий зал', price: 150, bestFor: 'Быстрая катка, Dota 2, CS2, кооператив' },
  { id: 'bootcamp', name: 'Bootcamp', price: 170, bestFor: 'Команда из пяти игроков и тренировка' },
  { id: 'vip', name: 'VIP & DUO', price: 190, bestFor: 'Игра вдвоем, приватность, комфорт' },
  { id: 'solo', name: 'Solo Rooms', price: 230, bestFor: 'RTX 5070, 400 Гц, фокус на FPS' },
  { id: 'sim', name: 'Автосимулятор', price: 580, bestFor: 'Гонки, F1, Assetto Corsa, Forza' },
];

const checklist = [
  'Выбрать CyberX Новокосино в приложении',
  'Проверить актуальные цены и свободные зоны',
  'Уточнить промокод или приветственный бонус',
  'Забронировать ПК, Bootcamp, PS5 или автосимулятор',
  'Взять данные от игровых аккаунтов',
];

export default function BlogInteractive() {
  const [zoneId, setZoneId] = useState(zones[0].id);
  const [hours, setHours] = useState(3);
  const [done, setDone] = useState<string[]>([]);

  const selectedZone = zones.find((zone) => zone.id === zoneId) ?? zones[0];
  const estimatedPrice = selectedZone.price * hours;
  const progress = Math.round((done.length / checklist.length) * 100);

  const visitHint = useMemo(() => {
    if (hours >= 5) return 'Для длинной сессии проверьте пакеты на 5 часов или ночной тариф.';
    if (selectedZone.id === 'sim') return 'Для первого заезда обычно достаточно 1-2 часов с настройкой посадки.';
    return 'Для первого визита 2-3 часа достаточно, чтобы спокойно оценить клуб.';
  }, [hours, selectedZone.id]);

  const toggleItem = (item: string) => {
    setDone((current) =>
      current.includes(item) ? current.filter((value) => value !== item) : [...current, item]
    );
  };

  return (
    <aside className="my-12 border-y border-white/10 py-8" aria-label="Интерактивный планер визита">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00F0FF]">
          Интерактив
        </p>
        <h2 className="mt-2 font-inter text-2xl font-black text-white md:text-3xl">
          Быстро прикиньте визит
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/50">
          Это не финальный прайс, а удобная оценка перед тем, как открыть приложение CyberX.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                Зона
              </span>
              <select
                value={zoneId}
                onChange={(event) => setZoneId(event.target.value)}
                className="w-full border border-white/12 bg-[#080808] px-4 py-3 text-sm font-semibold text-white outline-none focus:border-[#FF2E63]"
              >
                {zones.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                Время: {hours} ч
              </span>
              <input
                type="range"
                min="1"
                max="10"
                value={hours}
                onChange={(event) => setHours(Number(event.target.value))}
                className="mt-3 w-full accent-[#FF2E63]"
              />
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-[170px_1fr]">
            <div className="border border-white/10 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/35">
                Оценка от
              </div>
              <div className="mt-1 font-inter text-3xl font-black text-[#FF2E63]">
                {estimatedPrice.toLocaleString('ru-RU')} ₽
              </div>
            </div>
            <div className="border border-white/10 p-4">
              <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                <Gauge size={15} />
                Подходит для
              </div>
              <p className="text-sm leading-6 text-white/70">{selectedZone.bestFor}</p>
              <p className="mt-2 text-sm leading-6 text-white/45">{visitHint}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <ClipboardCheck size={18} className="text-[#FF2E63]" />
              Чеклист новичка
            </div>
            <span className="text-xs text-white/40">{progress}%</span>
          </div>
          <div className="mb-3 h-1 bg-white/10">
            <div className="h-full bg-[#FF2E63]" style={{ width: `${progress}%` }} />
          </div>
          <div className="space-y-2">
            {checklist.map((item) => {
              const checked = done.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleItem(item)}
                  className="flex w-full items-start gap-3 border border-white/10 px-3 py-2.5 text-left text-sm leading-6 text-white/62 transition hover:border-white/25 hover:text-white"
                  aria-pressed={checked}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border ${
                      checked ? 'border-[#FF2E63] bg-[#FF2E63]' : 'border-white/20'
                    }`}
                  >
                    {checked && <Check size={14} />}
                  </span>
                  {item}
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs leading-5 text-white/40">
            <MapPin size={15} className="shrink-0" />
            Москва, ул. Новокосинская, 32. CyberX Community Новокосино.
          </div>
        </div>
      </div>
    </aside>
  );
}
