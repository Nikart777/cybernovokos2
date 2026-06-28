import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog-posts";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Блог: цены, промокод, автосимулятор",
  description:
    "Блог CyberX Новокосино: полезные гайды для геймеров Москвы, цены CyberX, промокод на первое посещение, автосимулятор Cyber X и выбор зоны клуба.",
  alternates: {
    canonical: "https://cyberx-novokosino.ru/blog",
  },
  openGraph: {
    title: "Блог CyberX Новокосино",
    description:
      "Гайды по CyberX ценам, промокоду на первое посещение, автосимулятору и игровым зонам в Новокосино.",
    url: "https://cyberx-novokosino.ru/blog",
    type: "website",
    images: [
      {
        url: blogPosts[0].image,
        width: 1200,
        height: 630,
        alt: blogPosts[0].imageAlt,
      },
    ],
  },
};

export default function BlogPage() {
  const [post] = blogPosts;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Header />
      <section className="px-4 pt-32 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3 font-chakra text-[11px] font-black uppercase tracking-[0.22em] text-[#00F0FF]">
                <span className="inline-flex items-center gap-2 border border-[#00F0FF]/25 bg-[#00F0FF]/10 px-3 py-2">
                  <Search size={14} />
                  SEO-гайды
                </span>
                <span className="inline-flex items-center gap-2 text-white/45">
                  <MapPin size={14} />
                  Москва, Новокосино
                </span>
              </div>
              <h1 className="font-tactic text-5xl font-black uppercase italic leading-none text-white md:text-7xl">
                Блог CyberX
                <span className="block text-[#FF2E63]">Новокосино</span>
              </h1>
            </div>
            <p className="max-w-2xl font-inter text-base leading-relaxed text-white/55 md:text-lg">
              Для старта подготовили один большой материал под самые горячие запросы:
              цены, промокод, CyberX Community, компьютерный клуб в Новокосино и автосимулятор.
            </p>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="group grid overflow-hidden border border-white/10 bg-white/[0.03] transition hover:border-[#FF2E63]/50 lg:grid-cols-[1.08fr_0.92fr]"
          >
            <div className="relative min-h-[320px] lg:min-h-[560px]">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent lg:bg-gradient-to-r" />
            </div>
            <article className="flex flex-col justify-center p-6 md:p-10 lg:p-14">
              <div className="mb-5 flex flex-wrap items-center gap-3 font-chakra text-[11px] font-black uppercase tracking-[0.2em] text-white/45">
                <span className="border border-[#FF2E63]/30 bg-[#FF2E63]/10 px-3 py-2 text-[#FF2E63]">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock size={14} />
                  {post.readTime}
                </span>
              </div>
              <h2 className="font-tactic text-3xl font-black uppercase italic leading-tight text-white md:text-5xl">
                {post.title}
              </h2>
              <p className="mt-5 font-inter text-base leading-relaxed text-white/60">
                {post.excerpt}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/10 bg-black/30 px-3 py-2 font-chakra text-[10px] font-black uppercase tracking-widest text-white/45"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-8 inline-flex items-center gap-3 font-chakra text-sm font-black uppercase tracking-widest text-[#00F0FF]">
                Читать статью
                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </div>
            </article>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
