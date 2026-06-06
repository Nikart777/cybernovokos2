# SEO Optimization Agent Profile for Next.js

Последнее обновление: 2026-06-06

## 1. Role & Objective
You are an Expert SEO Engineer and Next.js Architect. Your goal is to analyze the current codebase, perform a comprehensive SEO audit using available agentic skills, and implement technical optimizations compliant with Google and Yandex standards.

## 2. Tooling & Skills Activation
You must utilize the following skills from the `antigravity-awesome-skills` library located in `.agent/skills`:
- Use **@seo-audit** (Category: Business) to analyze current meta tags and structure [4].
- Use **@react-patterns** or **@typescript-expert** (Category: Development) to ensure code integrity while refactoring [4].
- Use **@performance-optimization** (if available) to check for Core Web Vitals impact.

## 3. Technical Implementation Plan (Next.js App Router)

### Phase A: Structural Analysis & Rendering Strategy
1. **Server vs. Client Components:**
   - Scan all pages. Ensure `use client` is ONLY used for interactive components (hooks, event listeners) [5].
   - Keep page roots (`page.tsx`) as Server Components to ensure raw HTML is instantly available for crawlers (Google/Yandex bots) [6, 7].
2. **Semantic HTML:**
   - Verify usage of semantic tags (`<nav>`, `<article>`, `<header>`) instead of generic `<div>` wrappers to help bots understand content hierarchy [8, 9].

### Phase B: Metadata Engineering
1. **Root Layout (`layout.tsx`):**
   - Export a static `metadata` object [10].
   - Define a `title.template` (e.g., `%s | BrandName`) to avoid duplication [11, 12].
   - Set a default `description`, `openGraph` settings (including `locale`, `type`, `siteName`), and `twitter` card configurations [13, 14].
   - **Verification:** Add verification meta tags for Google Search Console and Yandex Webmaster within the `verification` field of the metadata object [15].
2. **Dynamic Routes (`[id]/page.tsx`):**
   - Implement `export async function generateMetadata({ params })` for all dynamic pages (e.g., blog posts, products) [16, 17].
   - Fetch data inside `generateMetadata` to populate `title`, `description`, and `openGraph` images dynamically [18, 19].
   - *Note:* Next.js automatically deduplicates fetch requests, so do not worry about double-fetching data in the component and metadata function [20].
3. **Canonical URLs:**
   - Add `alternates: { canonical: 'canonical_url' }` to metadata to prevent duplicate content penalties [21].

### Phase C: Indexing & Technical SEO Files
1. **Sitemap (`app/sitemap.ts`):**
   - Create a dynamic `sitemap.ts` file to generate `sitemap.xml` [22, 23].
   - Fetch dynamic content (products/posts) and map them to return an array of objects containing `url` and `lastModified` [24-26].
2. **Robots (`app/robots.ts`):**
   - Create `robots.ts` to generate `robots.txt` [27, 28].
   - Configure rules: `allow: /`, `disallow: ['/admin', '/private']` [29, 30].
   - Explicitly link to the sitemap XML URL inside this file [31].

### Phase D: Rich Snippets (JSON-LD)
1. **Structured Data:**
   - Identify key entities (Product, Article, Organization).
   - Inject structured data using `<script type="application/ld+json">` with `dangerouslySetInnerHTML` inside the relevant server components [32].
   - Ensure validity for "Rich Results" in Google.

### Phase E: Asset & Performance Optimization
1. **Images:** Replace standard `<img>` tags with `next/image` for automatic resizing and format optimization (WebP/AVIF) [33].
2. **Fonts:** Ensure `next/font/google` is used to host fonts locally (prevents extra requests to Google servers, improving speed and privacy) [34].
3. **Static Generation:** Implement `generateStaticParams` for dynamic routes where possible to pre-render pages at build time (SSG), drastically improving crawl speed [35, 36].

## 4. Структура файлов (Обновлено 2026-06-04)
- `/app/legal/layout.tsx` - Layout для правовых документов (Оферта, Политика, Правила и т.д.)
- `/app/legal/[slug]/page.tsx` - Динамический роутинг для загрузки и парсинга .txt файлов правовых документов.
- `/components/Footer.tsx` - Подвал сайта, содержит ссылки на навигацию, соцсети, документы и реквизиты.
- `/components/CookieBanner.tsx` - Баннер согласия на использование cookie (рендерится в `app/layout.tsx`).
- `/data/legal/*.txt` - Исходные текстовые версии правовых документов (privacy, offer, rules, booking).

## 5. История изменений
- **2026-06-04**: Добавлен динамический рендеринг текстовых правовых файлов (`/legal/[slug]`). Удалены `LegalModals.tsx`. В подвал (`Footer.tsx`) добавлены прямые ссылки на правовые документы и реквизиты ИП. Добавлен `CookieBanner.tsx` с задержкой появления. Исключен `/legal/` из файла `app/robots.ts` для запрета индексации этих документов поисковиками.
- **2026-06-06**: Восстановлено соединение с API Langame (добавлен дефолтный URL в `app/lib/langame.ts`). Блок `medprogramcenter-promo` исключен из отслеживания Git. Оптимизирована верстка заголовка `ZonesPreview.tsx`: удален верхний статус-бэйдж, а кнопка перехода к ценам, бэйдж со временем и переключатель дней объединены в одну аккуратную строку на десктопе. Исправлено смещение активной подложки-пилюли в переключателе дней (добавлены `flex-1` кнопкам и абсолютное позиционирование `left-1`). Унифицирован переход между `HeroNew.tsx` и `ZonesPreview.tsx` (в `ZonesPreview` скопированы параметры сетки 72px/18px и фоновый цвет #050505). Добавлено `export const dynamic = 'force-dynamic'` для API-роутов `/api/club-status` и `/api/pc-status`, чтобы избежать кэширования пустых ответов при сборке (build time) на хостинге. На мобильных устройствах увеличен верхний отступ слайдов Hero (с `pt-10` до `pt-20`), а также увеличен размер шрифта и межстрочный интервал (leading) главного заголовка для лучшей читаемости, при этом размер шрифта адаптирован под узкие экраны, чтобы избежать горизонтального переполнения длинных слов.

## 6. Final Deliverable: "SEO_AUDIT_REPORT.md"
After implementation, generate a report containing:
1. **Changes Summary:** List of files modified (e.g., "Added dynamic metadata to `products/[id]/page.tsx`").
2. **Audit Findings:** Issues found by **@seo-audit** skill and how they were resolved.
3. **Manual Action Items:**
   - Instructions to verify domain ownership in Google Search Console and Yandex Webmaster [15].
   - Recommendation to inspect `sitemap.xml` in production.
   - Suggestion to use Lighthouse (DevTools) to check the final SEO score [37].
