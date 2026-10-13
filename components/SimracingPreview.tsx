import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flag } from "lucide-react";
import { SIMRACING_TARIFFS } from "@/app/simracing/simracingData";

// A server-rendered route into the racing service, visible before the long zones gallery.
export default function SimracingPreview() {
  return (
    <section
      id="home-simracing"
      aria-labelledby="home-simracing-title"
      className="relative border-y border-white/15 bg-[#0b0c0f]"
    >
      <div className="mx-auto grid max-w-[1400px] xl:grid-cols-[1fr_1.05fr]">
        <div className="px-5 py-10 sm:px-8 md:py-14 xl:px-12 xl:py-16">
          <p className="mb-5 flex items-center gap-3 font-inter text-xs font-semibold uppercase tracking-[0.12em] text-[#ff7a9b]">
            <Flag size={18} aria-hidden="true" /> Твой следующий старт · 24/7
          </p>
          <h2
            id="home-simracing-title"
            className="font-tactic text-[clamp(1.125rem,5.6vw,2.25rem)] font-black uppercase italic leading-[1.15] tracking-[-0.03em] text-white"
          >
            Автосимуляторы
            <br />в Новокосино
          </h2>
          <p className="mb-7 mt-5 max-w-lg font-inter text-base leading-relaxed text-[#b4b6c0]">
            Почувствуй каждый поворот на руле MOZA R12. Четыре гоночных кокпита,
            большие 4K-экраны и заезды с друзьями — в CyberX на Новокосинской,
            32.
          </p>
          <dl className="mb-8 grid grid-cols-3 gap-3 border-y border-white/15 py-5 font-inter">
            <div>
              <dt className="text-xs text-[#b4b6c0]">Прямой привод</dt>
              <dd className="mt-2 text-lg font-semibold italic text-white sm:text-2xl">
                12 Нм
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#b4b6c0]">Экран 4K</dt>
              <dd className="mt-2 text-lg font-semibold italic text-white sm:text-2xl">
                55″
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#b4b6c0]">Час за рулём</dt>
              <dd className="mt-2 whitespace-nowrap text-lg font-semibold italic text-white sm:text-2xl">
                от {SIMRACING_TARIFFS[0].week} ₽
              </dd>
            </div>
          </dl>
          <p className="mb-7 max-w-lg font-inter text-sm leading-relaxed text-[#b4b6c0]">
            Forza Horizon 6, дрифт, ралли и 26 собственных серверов Assetto
            Corsa и BeamNG.drive. Выбирай свою гонку — поможем настроиться даже
            перед первым заездом.
          </p>
          <Link
            href="/simracing"
            prefetch={false}
            className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#ff2e63] px-5 py-3 font-inter text-sm font-semibold text-[#0b0c0f] transition-[background-color,transform] duration-150 hover:bg-[#ff648a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-[0.96] motion-reduce:transform-none motion-reduce:transition-none sm:w-auto"
          >
            <span>Игры и цены автосимуляторов</span>
            <ArrowUpRight size={20} aria-hidden="true" className="shrink-0" />
          </Link>
        </div>
        <div className="relative order-first aspect-[16/10] overflow-hidden border-t-4 border-[#ff2e63] bg-[#16181d] xl:order-last xl:aspect-auto xl:border-t-0 xl:border-l-4">
          <picture>
            <source
              media="(max-width: 639px)"
              srcSet="/racing/editorial/cockpit-1-640.webp"
            />
            <Image
              src="/racing/editorial/cockpit-1-1280.webp"
              alt="Руль MOZA и гоночные кокпиты в клубе CyberX Новокосино"
              fill
              sizes="(max-width: 1279px) 100vw, 50vw"
              className="object-cover object-[55%_50%] outline outline-1 -outline-offset-1 outline-white/10"
            />
          </picture>
          <p className="absolute bottom-5 left-5 right-5 w-fit border-l-4 border-[#ff2e63] bg-[#0b0c0f]/95 px-4 py-3 font-inter text-xs font-medium text-white sm:bottom-8 sm:left-8">
            4 кокпита. Одна стартовая решётка.
          </p>
        </div>
      </div>
    </section>
  );
}
