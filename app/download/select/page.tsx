import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Smartphone } from "lucide-react";

const appStoreUrl = "https://redirect.appmetrica.yandex.com/serve/317784602498366130";
const googlePlayUrl = "https://redirect.appmetrica.yandex.com/serve/245723835301644591";

export const metadata: Metadata = {
  title: "Скачать приложение CyberX",
  description: "Выберите магазин приложений и установите CyberX для бронирования и получения бонусов.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DownloadSelectPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <Header />
      <section className="px-4 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36">
        <div className="mx-auto grid max-w-[1180px] overflow-hidden rounded-[16px] border border-white/10 bg-[#0d0d0d] lg:grid-cols-[0.88fr_1.12fr]">
          <div className="flex flex-col justify-center p-7 md:p-10 lg:p-14">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF2E63] text-[#090909]">
              <Smartphone size={22} />
            </div>
            <h1 className="mt-7 text-balance font-tactic text-4xl font-black uppercase italic leading-none sm:text-5xl lg:text-6xl">
              Выберите магазин приложений
            </h1>
            <p className="mt-5 max-w-xl font-chakra leading-relaxed text-white/70">
              Установите CyberX, выберите клуб «Новокосино» и получите 400 бонусов после регистрации.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <a
                href={appStoreUrl}
                rel="nofollow noopener noreferrer"
                className="group inline-flex min-h-14 items-center justify-between gap-3 rounded-full bg-white px-6 font-tactic text-sm font-black uppercase italic tracking-wide text-[#090909] transition hover:-translate-y-0.5 hover:bg-[#e8faff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] motion-reduce:transform-none"
              >
                App Store
                <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={googlePlayUrl}
                rel="nofollow noopener noreferrer"
                className="group inline-flex min-h-14 items-center justify-between gap-3 rounded-full bg-[#FF2E63] px-6 font-tactic text-sm font-black uppercase italic tracking-wide text-[#090909] transition hover:-translate-y-0.5 hover:bg-[#ff5d86] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transform-none"
              >
                Google Play
                <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <Link
              href="/promo"
              className="mt-7 inline-flex min-h-11 items-center gap-2 self-start font-chakra text-sm font-bold text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
            >
              <ArrowLeft size={17} />
              Вернуться к условиям бонуса
            </Link>
          </div>

          <div className="relative min-h-[420px] overflow-hidden lg:min-h-[620px]">
            <Image
              src="/images/promo/bonus-app-v2.webp"
              alt="Гость CyberX показывает бронирование в мобильном приложении"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-[66%_center] lg:object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0.02)_55%,#0d0d0d_100%)] lg:bg-[linear-gradient(90deg,#0d0d0d_0%,transparent_24%)]" />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
