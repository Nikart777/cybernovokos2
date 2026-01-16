# SEO Final Checklist

| Проверка | Статус | Комментарий | Ссылка на файл |
| :--- | :---: | :--- | :--- |
| **1. Локальная проверка** | | | |
| npm run lint | **PASS** | Только некритичные warning (LCP, deps). | [Stdout logs](#lint-logs) |
| npm run build | **PASS** | Exit code: 0. Все страницы пререндерены. | [Stdout logs](#build-logs) |
| /prices рендер | **PASS** | SSR стабилен, данные передаются через Props. | `app/prices/page.tsx` |
| /contacts NAP | **PASS** | Название, адрес, телефон и режим работы корректны. | `components/Contacts.tsx` |
| /simracing контент | **PASS** | Локальная страница + кнопка на CyberRacing. | `app/simracing/page.tsx` |
| **2. Техническое SEO** | | | |
| sitemap.xml | **PASS** | Создан `app/sitemap.ts` со всеми путями. | `app/sitemap.ts` |
| robots.txt | **PASS** | Не блокирует важные пути, ссылка на sitemap есть. | `app/robots.ts` |
| Canonical tags | **PASS** | Настроены через Metadata API на каждой странице. | `app/layout.tsx` + pages |
| Уникальные мета | **PASS** | Title/Desc уникальны для всех 4 основных страниц. | `app/**/page.tsx` |
| OG / Twitter cards | **PASS** | Настроены глобально в Root Layout. | `app/layout.tsx` |
| Priority Images | **PASS** | Главный баннер (Hero) использует `priority`. | `components/Hero.tsx` |
| Hero Optimization | **PASS** | Текст оптимизирован под запрос "компьютерный клуб Новокосино". | `components/Hero.tsx` |
| **3. Микроразметка (JSON-LD)** | | | |
| LocalBusiness | **PASS** | Тип `InternetCafe`, точный NAP. | `components/JsonLd.tsx` |
| Geo-координаты | **PASS** | Обновлены на **55.741887, 37.867172**. | `components/JsonLd.tsx` |
| 24/7 Hours | **PASS** | Настроено через `openingHoursSpecification`. | `components/JsonLd.tsx` |
| Maps / sameAs | **PASS** | Ссылки на Яндекс.Карты, VK, TG добавлены. | `components/JsonLd.tsx` |
| Снятие рисков | **PASS** | `aggregateRating` удален (нет real-time отзывов). | `components/JsonLd.tsx` |
| **4. Фавикон и PWA** | | | |
| manifest.json | **PASS** | Настроен через `app/manifest.ts`. | `app/manifest.ts` |
| Иконки (192, 512) | **PASS** | Присутствуют в `public/`. | `public/` |

---

## Шаги после деплоя (Инструкция)

### 1. Google Search Console
- Добавьте ресурс `https://cyberx-novokosino.ru`.
- В разделе **Sitemaps** отправьте `https://cyberx-novokosino.ru/sitemap.xml`.
- Проверьте **Rich Results Test** для главной страницы: [Google Rich Results Test](https://search.google.com/test/rich-results).

### 2. Яндекс.Вебмастер
- Подтвердите права на сайт.
- Добавьте sitemap в разделе **Индексирование -> Файлы Sitemap**.
- В разделе **Инструменты -> Валидатор микроразметки** проверьте корректность JSON-LD.
- Настройте **Регион** (Москва) в разделе «Представление в поиске -> Региональность».

### 3. Google Business & Яндекс.Бизнес
- Убедитесь, что NAP (Имя, Адрес, Телефон) в карточках организации СОВПАДАЕТ с тем, что указано в `JsonLd.tsx`. Это критично для локального SEO.

---

### Lint Logs
```
./app/aim/page.tsx: Warning: useEffect missing dependency...
./app/layout.tsx: Warning: Using <img> instead of <Image /> for tracking pixel.
... (всего 7 warnings)
```

### Build Logs
```
✓ Compiled successfully
✓ Generating static pages (15/15)
Route (app)                              Size     First Load JS
○ /                                      30.7 kB         121 kB
○ /contacts                              4.78 kB         134 kB
○ /prices                                3.05 kB         140 kB
○ /simracing                             198 B           137 kB
```
