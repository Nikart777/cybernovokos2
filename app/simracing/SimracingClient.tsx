"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Car, X } from "lucide-react";
import { CYBERX_SERVER_GAMES, type RoomItem } from "./catalogData";
import { useModalDialog } from "./useModalDialog";

type CatalogRoom = RoomItem & { game: string; gameId: string };
const rooms: CatalogRoom[] = CYBERX_SERVER_GAMES.flatMap((game) =>
  game.rooms.map((room) => ({ ...room, game: game.name, gameId: game.id })),
);
const featured = [
  "mkad-ru",
  "shutoko-chase",
  "wdts-highlands",
  "gt3-nordschleife",
  "downhill",
  "derby",
];
const orderedRooms = [
  ...featured.map((id) => rooms.find((room) => room.id === id)!),
  ...rooms.filter((room) => !featured.includes(room.id)),
];
const cover = (src: string) =>
  `/racing/editorial/${src
    .split("/")
    .pop()!
    .replace(/\.[^.]+$/, ".webp")}`;
const clean = (text: string) => text.replace(/\s[—–]\s/g, ", ");

export default function SimracingClient() {
  const [game, setGame] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<CatalogRoom | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const results = orderedRooms.filter(
    (room) => game === "all" || room.gameId === game,
  );
  const visible = expanded ? results : results.slice(0, 6);
  useModalDialog(dialog, selected !== null);
  const openRoom = (room: CatalogRoom) => setSelected(room);
  const closeRoom = () => {
    dialog.current?.close();
    setSelected(null);
  };
  return (
    <div className="mt-10">
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Фильтр серверов по игре"
      >
        {[
          { id: "all", name: "Все режимы", count: rooms.length },
          ...CYBERX_SERVER_GAMES.map((item) => ({
            id: item.id,
            name: item.name,
            count: item.rooms.length,
          })),
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={game === item.id}
            className={`min-h-12 rounded-lg border px-4 py-3 text-sm font-semibold transition-colors ${game === item.id ? "border-[#f4f4f6] bg-[#f4f4f6] text-[#0b0c0f]" : "border-white/20 bg-transparent text-[#b4b6c0] hover:border-white/50 hover:text-white"}`}
            onClick={() => {
              setGame(item.id);
              setExpanded(false);
            }}
          >
            {item.name}
            <span className="ml-2 opacity-65">{item.count}</span>
          </button>
        ))}
      </div>
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Режимов в категории: {results.length}. Показано: {visible.length}.
      </p>
      <div
        id="server-results"
        className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3"
      >
        {visible.map((room) => (
          <article
            key={`${room.gameId}-${room.id}`}
            className="sr-race-card group min-w-0"
          >
            <button
              type="button"
              onClick={() => openRoom(room)}
              aria-label={`${room.title}: подробнее и машины, ${room.game}`}
              aria-haspopup="dialog"
              className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#191b21]"
            >
              <Image
                src={cover(room.cover)}
                alt={`${room.title}, ${room.game}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover outline outline-1 -outline-offset-1 outline-white/10 transition-transform duration-500 group-hover:scale-[1.035]"
              />
              <span className="sr-race-position" aria-hidden="true">
                {String(orderedRooms.indexOf(room) + 1).padStart(2, "0")}
              </span>
            </button>
            <div className="mt-5 flex items-center justify-between gap-3 text-xs font-medium text-[#b4b6c0]">
              <span>{room.game}</span>
              <span className="flex items-center gap-2">
                <Car size={15} aria-hidden="true" />
                {room.cars.length}{" "}
                {room.cars.length === 1
                  ? "модель"
                  : room.cars.length < 5
                    ? "модели"
                    : "моделей"}
              </span>
            </div>
            <h3 className="mt-3 text-xl font-semibold leading-snug md:text-2xl">
              <button
                type="button"
                onClick={() => openRoom(room)}
                className="text-left transition-colors hover:text-[#ff648a]"
              >
                {room.title}
              </button>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#b4b6c0]">
              {clean(room.subtitle)}
            </p>
            <button
              type="button"
              className="mt-3 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-[#ff648a]"
              onClick={() => openRoom(room)}
            >
              Трасса и машины
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>
      {results.length > 6 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="server-results"
            className="sr-button sr-button-secondary"
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? "Свернуть каталог" : `Все режимы (${results.length})`}
            <ArrowRight
              size={18}
              className={expanded ? "-rotate-90" : "rotate-90"}
              aria-hidden="true"
            />
          </button>
        </div>
      )}
      <noscript>
        <p className="mt-6 text-[#b4b6c0]">
          Полный выбор: Assetto Corsa (
          {CYBERX_SERVER_GAMES[0].rooms.map((room) => room.title).join("; ")}) и
          BeamNG.drive (
          {CYBERX_SERVER_GAMES[1].rooms.map((room) => room.title).join("; ")}).
          Уточнить игру и забронировать кокпит:{" "}
          <a href="tel:+79851289538" className="underline">
            +7 (985) 128-95-38
          </a>
          .
        </p>
      </noscript>
      <dialog
        ref={dialog}
        aria-labelledby="server-dialog-title"
        className="sr-dialog w-[min(1120px,calc(100%-1.5rem))]"
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeRoom();
        }}
      >
        {selected && (
          <div>
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/15 bg-[#111318] px-5 py-3 sm:px-8">
              <p className="text-sm text-[#b4b6c0]">{selected.game}</p>
              <button
                type="button"
                className="sr-icon-button"
                aria-label="Закрыть режим"
                onClick={closeRoom}
              >
                <X size={21} />
              </button>
            </div>
            <div className="p-5 sm:p-8">
              <div className="relative aspect-[16/8] overflow-hidden rounded-xl">
                <Image
                  src={selected.cover}
                  alt={`${selected.title}, ${selected.game}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 1000px"
                  className="object-cover"
                />
              </div>
              <h2
                id="server-dialog-title"
                className="mt-7 font-tactic text-2xl font-bold leading-tight sm:text-4xl"
              >
                {selected.title}
              </h2>
              <p className="mt-3 text-lg text-[#ff648a]">
                {clean(selected.subtitle)}
              </p>
              <p className="mt-4 max-w-3xl whitespace-pre-line text-base leading-relaxed text-[#c1c3cb]">
                {clean(selected.description)}
              </p>
              <dl className="my-8 grid grid-cols-2 gap-4 rounded-xl bg-[#1b1e25] p-5 md:grid-cols-3">
                {selected.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-xs leading-relaxed text-[#b4b6c0]">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-base font-semibold">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mb-5 flex flex-wrap items-baseline gap-3">
                <h3 className="font-tactic text-2xl font-bold">
                  Выбирай свою машину
                </h3>
                <span className="text-sm text-[#b4b6c0]">
                  {selected.cars.length}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-5 min-[440px]:grid-cols-2 lg:grid-cols-3">
                {selected.cars.map((car) => (
                  <article
                    key={car.id}
                    className="overflow-hidden rounded-xl bg-[#1b1e25]"
                  >
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={car.image}
                        alt={car.name}
                        fill
                        sizes="(max-width: 440px) 90vw, (max-width: 1024px) 45vw, 340px"
                        className="object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-base font-semibold leading-snug">
                        {car.name}
                      </h4>
                      {car.role && (
                        <p className="mt-2 text-sm text-[#ff648a]">
                          {car.role}
                        </p>
                      )}
                      {car.note && (
                        <p className="mt-2 text-sm text-[#b4b6c0]">
                          {clean(car.note)}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
              {selected.rules.length > 0 && (
                <details className="mt-7 border-t border-white/15 py-5">
                  <summary className="cursor-pointer text-base font-semibold">
                    Правила заезда
                  </summary>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#b4b6c0]">
                    {selected.rules.map((rule, index) => (
                      <li key={index}>{clean(rule)}</li>
                    ))}
                  </ul>
                </details>
              )}
              <div className="mt-6 flex flex-col items-start gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="max-w-sm text-sm text-[#b4b6c0]">
                    Этот режим доступен на автосимуляторах в нашем клубе.
                  </p>
                  <p className="mt-1 text-[11px] font-chakra text-[#00F0FF] uppercase tracking-wider">
                    ⚡ Онлайн-бронь за 30 сек без регистрации
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="https://langame.ru/cip/umfw9uiydje1ugq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sr-button"
                  >
                    Забронировать онлайн
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    className="px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-chakra font-bold uppercase tracking-wider transition-colors"
                    onClick={() => {
                      closeRoom();
                      window.dispatchEvent(new CustomEvent("open-booking"));
                    }}
                  >
                    В приложении
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
