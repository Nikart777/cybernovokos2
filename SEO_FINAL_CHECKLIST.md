# SEO FINAL CHECKLIST - CyberX Novokosino

## 1. Код и Сборка (Local Check)
- [x] **Static Analysis**: `npm run lint` проходит с предупреждениями (ошибки исправлены). [PASS]
- [x] **Production Build**: `npm run build` проходит успешно. [PASS]
- [x] **Runtime Stability**: `/prices`, `/contacts`, `/simracing` проверены на отсутствие ошибок рендеринга. [PASS]
- [x] **Server/Client Components**: Конфликтов не обнаружено. RSC не передают функции в Client Components. [PASS]

## 2. Технический SEO Контроль
- [x] **sitemap.xml**: Содержит `/`, `/prices`, `/contacts`, `/simracing`. [app/sitemap.ts](file:///e:/cybernovokos2/app/sitemap.ts) [PASS]
- [x] **robots.txt**: Не блокирует индекс / и sitemap, disallow для технических путей. [app/robots.ts](file:///e:/cybernovokos2/app/robots.ts) [PASS]
- [x] **Canonical**: Настроен корректно для всех страниц через Metadata API. [PASS]
- [x] **Meta Tags**: Уникальные title/description для каждой страницы. [PASS]
- [x] **OpenGraph & Twitter**: Глобальные настройки в RootLayout + og:image. [PASS]
- [x] **PageSpeed Basics**: 
    - [x] Hero изображение оптимизировано через `next/image` с `priority`. [PASS]
    - [x] У изображений зон есть `alt` и `priority` для первых слайдов. [PASS]
    - [x] Скейлинг и CLS: используются фиксированные aspect-ratio для контейнеров. [PASS]

## 3. Структурированные данные (Schema.org)
- [x] **LocalBusiness / InternetCafe**: Настроено в [JsonLd.tsx](file:///e:/cybernovokos2/components/JsonLd.tsx). [PASS]
- [x] **Exact NAP**: Имя, Адрес (ул. Новокосинская, 32), Телефон (+7 985 128 95 38) проверены. [PASS]
- [x] **Opening Hours**: 24/7 настроено в схеме. [PASS]
- [x] **SameAs**: VK, Telegram, 2GIS, Yandex Maps. [PASS]
- [x] **AggregateOffer**: Цены (100-450 RUB) добавлены для "Игровой час". [PASS]

## 4. Rich Snippets & Assets
- [x] **Text-based Prices**: Цены на странице `/prices` рендерятся текстом (индексируемо). [PASS]
- [x] **Favicon & Manifest**: `favicon.ico` и `manifest.ts` настроены. [PASS]
- [x] **Org Logo**:логотип (`icon-512.png`) прописан в JSON-LD. [PASS]

---

## Исправленные файлы:
1. [app/contacts/page.tsx](file:///e:/cybernovokos2/app/contacts/page.tsx) — экранирование кавычек.
2. [components/Contacts.tsx](file:///e:/cybernovokos2/components/Contacts.tsx) — экранирование кавычек.
3. [components/ZoneHeader.tsx](file:///e:/cybernovokos2/components/ZoneHeader.tsx) — исправление текста-разделителя для ESLint.
4. [components/Hero.tsx](file:///e:/cybernovokos2/components/Hero.tsx) — замена `backgroundImage` на `next/image` с `priority`.
5. [components/JsonLd.tsx](file:///e:/cybernovokos2/components/JsonLd.tsx) — обновление NAP, цен и логотипа.
6. [package.json](file:///e:/cybernovokos2/package.json) — даунгрейд ESLint до v8 для совместимости с Next.js 14.1.
7. [.eslintrc.json](file:///e:/cybernovokos2/.eslintrc.json) — конфигурация линтера.

---

## После деплоя (Что сделать):
1. **Google Search Console**:
    - Добавьте сайт и подтвердите права (токен уже в коде).
    - Отправьте `sitemap.xml`.
    - Проверьте URL `/prices` инструментом "Проверка URL" -> "Проверка расширенных результатов".
2. **Яндекс.Вебмастер**:
    - Добавьте сайт.
    - В разделе "Инструменты" -> "Валидатор микроразметки" проверьте главную страницу.
    - Проверьте "Представление в поиске" -> "Товары и цены".
3. **Rich Results Test**:
    - Воспользуйтесь [Rich Results Test](https://search.google.com/test/rich-results) для проверки LocalBusiness и FAQ схем.
