"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { GALLERY } from "./simracingData";
import { useModalDialog } from "./useModalDialog";

export function BookingButton({
  children = "Забронировать заезд",
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href="https://langame.ru/cip/umfw9uiydje1ugq"
      target="_blank"
      rel="noopener noreferrer"
      className={`sr-button ${className}`}
    >
      {children}
      <ArrowUpRight size={19} aria-hidden="true" />
    </a>
  );
}

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    // Content is visible in server HTML and without JavaScript. Animate only on entry.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            node.classList.add("sr-enter");
            observer.unobserve(node);
          }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function SimracingHeader() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#equipment", label: "Оборудование" },
    { href: "#games", label: "Игры" },
    { href: "#tariffs", label: "Тарифы" },
    { href: "/", label: "Главная" },
  ];
  useModalDialog(dialog, open);
  return (
    <>
      <a href="#simracing-content" className="sr-skip">
        Перейти к содержимому
      </a>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#0b0c0f]/95 text-white">
        <div className="sr-container flex h-[72px] items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="CyberX Новокосино, главная"
            className="shrink-0"
          >
            <Image
              src="/logo new.png"
              alt="CyberX Новокосино"
              width={160}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <nav
            aria-label="Основная навигация"
            className="hidden items-center gap-7 lg:flex"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center text-sm text-white/75 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <BookingButton />
            </div>
            <button
              type="button"
              aria-label="Открыть меню"
              aria-haspopup="dialog"
              aria-expanded={open}
              className="sr-icon-button lg:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu size={23} />
            </button>
          </div>
        </div>
      </header>
      <dialog
        ref={dialog}
        aria-label="Меню сайта"
        className="sr-dialog sr-menu"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="p-6">
          <div className="mb-8 flex items-center justify-between">
            <span className="font-tactic text-lg font-bold">
              CyberX Новокосино
            </span>
            <button
              type="button"
              className="sr-icon-button"
              aria-label="Закрыть меню"
              onClick={() => dialog.current?.close()}
            >
              <X />
            </button>
          </div>
          <nav aria-label="Мобильная навигация" className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => dialog.current?.close()}
                className="border-b border-white/10 py-5 text-xl"
              >
                {link.label}
                <ArrowUpRight className="float-right" aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <a
            href="tel:+79851289538"
            className="mt-8 flex min-h-12 items-center gap-3 text-base"
          >
            <Phone size={20} aria-hidden="true" />
            +7 (985) 128-95-38
          </a>
        </div>
      </dialog>
    </>
  );
}

export function CockpitGallery() {
  const [selected, setSelected] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const photo = GALLERY[selected];
  const move = (direction: number) =>
    setSelected(
      (value) => (value + direction + GALLERY.length) % GALLERY.length,
    );
  useModalDialog(dialog, zoomed);
  return (
    <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
      <div>
        <button
          type="button"
          className="sr-cockpit-frame group relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#17191e] text-left"
          aria-label={`Увеличить фото: ${photo.alt}`}
          onClick={() => setZoomed(true)}
        >
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet={`/racing/editorial/cockpit-${photo.n}-640.webp`}
            />
            <Image
              src={`/racing/editorial/cockpit-${photo.n}-1280.webp`}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover outline outline-1 -outline-offset-1 outline-white/10 transition-transform duration-500 group-hover:scale-[1.025]"
            />
          </picture>
        </button>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-sm text-[#b4b6c0]">
            Фото {selected + 1} из {GALLERY.length} · Наш клуб в Новокосино
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="sr-icon-button"
              aria-label="Предыдущее фото"
              onClick={() => move(-1)}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className="sr-icon-button"
              aria-label="Следующее фото"
              onClick={() => move(1)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {GALLERY.map((item, index) => (
            <button
              key={item.n}
              type="button"
              aria-label={`Фото ${index + 1}: ${item.alt}`}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
              className={`relative aspect-[4/3] min-h-11 overflow-hidden rounded-md border-2 transition-opacity ${selected === index ? "border-[#ff2e63]" : "border-transparent opacity-60 hover:opacity-100"}`}
            >
              <Image
                src={`/racing/editorial/cockpit-${item.n}-160.webp`}
                alt=""
                fill
                sizes="(max-width: 768px) 18vw, 10vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      <div className="sr-photo-copy">
        <div aria-live="polite" aria-atomic="true">
          <div key={photo.n} className="sr-photo-story" data-photo={photo.n}>
            <p className="sr-photo-number">
              0{selected + 1} / 0{GALLERY.length}
            </p>
            <h3 className="sr-photo-title font-tactic">{photo.title}</h3>
            <p className="text-base leading-relaxed text-[#b4b6c0]">
              {photo.description}
            </p>
            <dl className="sr-photo-specs">
              {photo.specs.map((spec) => (
                <div key={spec.label}>
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="mt-7 flex items-start gap-3 text-sm leading-relaxed text-[#d3d4da]">
          <Check
            className="mt-0.5 shrink-0 text-[#ff648a]"
            size={20}
            aria-hidden="true"
          />
          <p>
            Первый раз за рулём? Поможем с посадкой, объясним управление и
            подберём комфортный заезд.
          </p>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="sr-dialog w-[min(1100px,calc(100%-2rem))]"
        aria-label="Фотографии автосимуляторов"
        onClose={() => setZoomed(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") move(1);
          if (event.key === "ArrowLeft") move(-1);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="p-4">
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              className="sr-icon-button"
              aria-label="Закрыть фотографии"
              onClick={() => dialog.current?.close()}
            >
              <X />
            </button>
          </div>
          <div className="relative h-[65dvh]">
            <Image
              src={`/racing/editorial/cockpit-${photo.n}-1280.webp`}
              alt={photo.alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
          <div className="mt-3 flex items-center justify-between gap-4">
            <button
              type="button"
              className="sr-icon-button"
              aria-label="Предыдущее фото в галерее"
              onClick={() => move(-1)}
            >
              <ChevronLeft />
            </button>
            <p aria-live="polite" className="text-center text-sm">
              {photo.alt}
            </p>
            <button
              type="button"
              className="sr-icon-button"
              aria-label="Следующее фото в галерее"
              onClick={() => move(1)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export function SimracingMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/15 bg-[#0b0c0f] px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 sm:hidden">
      <div className="flex items-center gap-3">
        <a
          className="sr-icon-button shrink-0"
          href="tel:+79851289538"
          aria-label="Позвонить в клуб"
        >
          <Phone size={20} />
        </a>
        <BookingButton className="w-full" />
      </div>
    </div>
  );
}
