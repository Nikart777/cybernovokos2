import BlogInteractive from "@/components/BlogInteractive";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { blogPosts, getBlogPost } from "@/data/blog-posts";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";

const baseUrl = "https://cyberx-novokosino.ru";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return {};

  const url = `${baseUrl}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      locale: "ru_RU",
      siteName: "CyberX Новокосино",
      images: [{ url: post.image, width: 1200, height: 630, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const articleUrl = `${baseUrl}/blog/${post.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.gallery.map((image) => `${baseUrl}${image.src}`),
    datePublished: post.date,
    dateModified: post.updated,
    inLanguage: "ru-RU",
    author: { "@type": "Organization", name: "CyberX Новокосино", url: baseUrl },
    publisher: {
      "@type": "Organization",
      name: "CyberX Community Новокосино",
      logo: { "@type": "ImageObject", url: `${baseUrl}/icon-512.png` },
    },
    mainEntityOfPage: articleUrl,
    keywords: post.keywords.join(", "),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Блог", item: `${baseUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: articleUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <article className="pt-28 md:pt-32">
        <header className="px-4 pb-10 md:px-10 md:pb-16">
          <div className="mx-auto max-w-[1120px]">
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition hover:text-white"
            >
              <ArrowLeft size={17} />
              Все статьи
            </Link>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
              <div>
                <div className="mb-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                  <span className="bg-[#FF2E63] px-3 py-2 text-white">{post.category}</span>
                  <span className="inline-flex items-center gap-1.5 border border-white/10 px-3 py-2">
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1.5 border border-white/10 px-3 py-2">
                    <CalendarDays size={14} />
                    {new Intl.DateTimeFormat("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(post.updated))}
                  </span>
                  <span className="inline-flex items-center gap-1.5 border border-white/10 px-3 py-2">
                    <MapPin size={14} />
                    Москва, Новокосино
                  </span>
                </div>

                <h1 className="max-w-4xl font-inter text-4xl font-black leading-[1.05] tracking-normal text-white md:text-6xl">
                  {post.title}
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70 md:text-xl md:leading-9">
                  {post.excerpt}
                </p>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-white/[0.03]">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="border-y border-white/10 bg-white/[0.025] px-4 py-5 md:px-10">
          <div className="mx-auto flex max-w-[1120px] flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/55"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="px-4 py-10 md:px-10 md:py-14">
          <div className="mx-auto max-w-[860px]">
            <BlogInteractive />

            <div className="space-y-16">
              {post.sections.map((section, index) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#00F0FF]">
                    {section.eyebrow}
                  </p>
                  <h2 className="font-inter text-3xl font-black leading-tight text-white md:text-4xl">
                    {section.heading}
                  </h2>
                  <p className="mt-4 text-xl leading-9 text-white/74">{section.lead}</p>

                  {section.image && (
                    <figure className="my-7">
                      <div className="relative aspect-[16/9] overflow-hidden border border-white/10 bg-white/[0.03]">
                        <Image
                          src={section.image.src}
                          alt={section.image.alt}
                          fill
                          sizes="860px"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="mt-2 text-sm leading-6 text-white/45">
                        {section.image.caption}
                      </figcaption>
                    </figure>
                  )}

                  <div className="mt-5 space-y-5 text-lg leading-9 text-white/68">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {section.bullets && (
                    <ul className="mt-7 grid gap-3">
                      {section.bullets.map((item) => (
                        <li
                          key={item}
                          className="border-l-2 border-[#FF2E63] bg-white/[0.025] px-4 py-3 text-base leading-7 text-white/70"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {index === 2 && (
                    <div className="my-10 border border-[#FF2E63]/30 bg-[#FF2E63]/10 p-5">
                      <p className="text-base leading-8 text-white/76">
                        Небольшой лайфхак: если вы пришли компанией, сначала выберите один главный формат вечера.
                        Иначе первые полчаса легко уйдут не на игры, а на споры между ПК, PS5 и автосимом.
                      </p>
                    </div>
                  )}
                </section>
              ))}
            </div>

            <section className="my-16 border-y border-white/10 py-8">
              <h2 className="font-inter text-3xl font-black text-white">Коротко</h2>
              <p className="mt-4 text-lg leading-9 text-white/70">
                Для первого визита в CyberX Новокосино лучше заложить 2-3 часа, заранее выбрать зону,
                уточнить бонусы до оплаты и не пытаться попробовать все сразу. Если хочется необычного
                вечера, начните с автосимулятора: он быстро превращает обычный поход в клуб в мини-событие.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/prices"
                  className="bg-[#FF2E63] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black"
                >
                  Смотреть цены
                </Link>
                <Link
                  href="/contacts"
                  className="border border-white/15 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white/70 transition hover:border-white hover:text-white"
                >
                  Как нас найти
                </Link>
              </div>
            </section>

            <section className="mb-20">
              <h2 className="font-inter text-3xl font-black text-white">FAQ</h2>
              <div className="mt-5 divide-y divide-white/10 border-y border-white/10">
                {post.faqs.map((faq) => (
                  <details key={faq.question} className="group py-5">
                    <summary className="cursor-pointer list-none text-lg font-bold leading-7 text-white">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-base leading-8 text-white/62">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
