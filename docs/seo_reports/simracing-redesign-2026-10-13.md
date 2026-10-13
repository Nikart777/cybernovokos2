# Автосимуляторы CyberX: редизайн и проверка

Дата: 13 октября 2026. Страница: `/simracing`.

## Результат

Главный продукт страницы — заезд на настоящем кокпите в Москве. Последовательность: крупный первый экран с фотографией клуба → оборудование и галерея → заезд компанией → 26 собственных серверов и автопарк → другие игры → цены → FAQ → адрес и бронирование.

Каталог содержит все исходные 17 комнат Assetto Corsa и 9 комнат BeamNG.drive, 216 записей автомобилей (это записи внутри комнат, не число уникальных моделей). На первом экране каталога показаны шесть разных режимов. Остальные открываются кнопкой; доступны фильтры по игре, поиск по трассе/режиму/машине, пустое состояние и сброс. В подробностях — крупная обложка, описание, параметры, автомобили и правила.

Удалены обещания «локального лаунчера», «одного клика», текст об установке модов, лишние инструкции по интерфейсу. Сохранены реальные фотографии клуба и исходные материалы каталога. Общий Header возвращён к прежней реализации: новая навигация находится только на странице симрейсинга.

Тарифы, подтверждённые владельцем, сохранены без изменения:

| Время | Будни | Выходные |
| --- | ---: | ---: |
| 1 час | 580 ₽ | 850 ₽ |
| 2 часа | 980 ₽ | 1 290 ₽ |
| 3 часа | 1 350 ₽ | 1 650 ₽ |
| 5 часов | 1 900 ₽ | 2 400 ₽ |

За один кокпит. Выходные: с пятницы 17:00 до воскресенья 22:00. Единый источник цен для интерфейса и JSON-LD: `app/simracing/simracingData.ts`.

## Область дизайн-ревью

Режим `full`, Next.js 14 / React 18 / Tailwind 3. Использованы ui-ux-pro-max, design-taste-frontend и make-interfaces-feel-better. Настройки направления: выразительность 8, движение 6, плотность 3. Сохранены Tactic/Inter, тёмная тема CyberX и розовый акцент. Проверялась страница симрейсинга и её состояния, плюс smoke-проверка главной, цен и контактов после изменений общих компонентов. Полный редизайн остальных страниц не входил в работу.

| Категория | Проверенные материалы и состояния | Результат |
| --- | --- | --- |
| Typography | H1–H4, переносы на 320–1920 px, цены, FAQ, footer, no-JS | Исправлены переносы, иерархия и слабый контраст; цены используют tabular-nums |
| Surfaces | Галерея, карточки, меню, окна, кнопки, мобильная панель | Крупные изображения, единые радиусы, доступный фокус, основные цели касания от 44 px |
| Animations | Вход hero, появления секций, hover/focus/active, FAQ, reduced-motion | Только transform/opacity и точечные transitions; замедление 0.1× и кадры 10/50/100% проверены |
| Icons | Навигация, стрелки, поиск, телефон, закрытие, галерея | Один набор Lucide, currentColor, скрытие декоративных иконок от скринридера |
| Performance | Production build, Lighthouse mobile/desktop, загрузка фотографий, шрифты | AVIF/WebP, маленькие миниатюры, WOFF2, статический основной HTML; ограничения замера ниже |

### Исправленные замечания

Ниже — изменения по группам принципов, включая общие компоненты, затронутые проверкой.

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| MEDIUM | `app/simracing/page.tsx:206` | Разрозненные блоки и технические объяснения конкурировали с продуктом | Сначала кокпиты и впечатления, затем каталог режимов, цены и адрес | Понятная иерархия и путь к бронированию |
| MEDIUM | `app/simracing/page.tsx:270`, `app/simracing/SimracingControls.tsx:180` | Много текста, недостающий `sim-6`, внешние медиа | Пять существующих фотографий, галерея с увеличением, локальные изображения | Больше достоверного визуального материала и отсутствие битых изображений |
| MEDIUM | `app/simracing/SimracingClient.tsx:121`, `app/simracing/SimracingClient.tsx:227` | Мелкое представление каталога и техническое описание лаунчера | Крупные обложки, фильтры, поиск, полноразмерное окно, все автомобили | Режим и машина выбираются по содержанию и изображению |
| HIGH | `app/simracing/useModalDialog.ts:5`, `components/BookingModal.tsx:39` | Неполное управление фокусом при открытом окне | Focus trap, Escape, возврат фокуса, восстановление прокрутки | Клавиатура не теряет открытый контекст |
| MEDIUM | `app/simracing/SimracingControls.tsx:69`, `app/simracing/SimracingControls.tsx:313`, `components/StickyBar.tsx:34` | Неполная мобильная навигация и конкурирующие фиксированные панели | Отдельное меню, одна нижняя панель бронирования, safe-area и отступ контента | Управление доступно на узком экране, панели не дублируются |
| MEDIUM | `app/simracing/simracing.css:75`, `components/Footer.tsx:38`, `components/CookieBanner.tsx:56` | Слабый контраст мелкого footer и скачки уровней заголовков | Контрастный footer на этой странице, минимум 12 px, семантические H2 | Читаемость и корректная структура для assistive technology |
| LOW | `app/simracing/simracing.css:122`, `app/simracing/SimracingTariffs.tsx:58` | Заголовки могли переполнять узкий экран | Адаптивный размер, balance/pretty, tabular-nums | Стабильные переносы и числовые колонки |
| LOW | `app/simracing/simracing.css:24`, `app/simracing/simracing.css:145` | Несогласованное движение и состояния | Press 0.96, явный focus-visible, мягкий вход секций, reduced-motion | Отклик без навязчивой анимации и изменения разметки |
| MEDIUM | `scripts/prepare-simracing-assets.cjs:1`, `scripts/prepare-simracing-fonts.py:1`, `app/layout.tsx:1` | Тяжёлые изображения/миниатюры и WOFF | Обложки 720 px, миниатюры 160 px, hero AVIF, WOFF2 из существующих файлов | Меньше передаваемых байтов без замены реальных фотографий и гарнитуры |
| MEDIUM | `app/simracing/page.tsx:31`, `app/simracing/page.tsx:75`, `app/sitemap.ts:1` | Недостаточная локальная семантика, неверный формат старого OG | Уникальные metadata, реальные контакты, структурированные данные, OG 1200×630, актуальный sitemap | Индексируемая страница с согласованными данными |

### Рассмотрено и отклонено

| Location | Candidate | Rejected because |
| --- | --- | --- |
| Hero и галерея | Заменить фотографии клуба вымышленным интерьером | Посетитель должен видеть реальные кокпиты |
| Переходы между блоками | Закрепление секций и перехват прокрутки | Усложняет мобильную навигацию и доступ к ценам |
| Тарифы | Подтянуть другую таблицу цен из общего файла | Владелец подтвердил исходные цены, включая пакет 5 часов |
| Каталог | Объяснять установку модов и запуск через лаунчер | По запросу владельца смысл блока — игровые режимы и автомобили |

## SEO

| Группа запросов | Содержимое страницы |
| --- | --- |
| автосимуляторы Москва, симрейсинг Москва | Title, H1, description, первый экран, описание услуги |
| автосимулятор Новокосино, симрейсинг Реутов | Адрес, район, география посещения, контакты и FAQ |
| автосимулятор цена, поиграть на руле Москва | Четыре тарифа, условия, FAQ о стоимости и первом визите |
| гоночный симулятор, Direct Drive, MOZA | Реальные фотографии и описание оборудования |
| Assetto Corsa, BeamNG.drive, МКАД, дрифт, погони | 26 комнат, режимы и поиск по автомобилям |

Один H1; canonical `https://cyberx-novokosino.ru/simracing`; OG/Twitter с актуальным изображением; разрешена индексация; URL присутствует в sitemap с датой 2026-10-13. Основной контент, контакты, FAQ и цены присутствуют в HTML без JavaScript. Полный перечень комнат и выходные цены имеют no-JS fallback. Интерактивные подробности автомобиля предназначены для пользователя и не выдаются за отдельные индексируемые посадочные страницы.

JSON-LD: WebPage, BreadcrumbList, SportsActivityLocation с адресом/телефоном/координатами/временем работы, Service с восемью Offer и FAQPage с семью видимыми вопросами. Фиктивных рейтингов и отзывов нет. FAQ-разметка не означает, что поисковик покажет расширенный результат.

Рекомендации сверены с [Яндексом о структуре сайта](https://www.yandex.ru/support/webmaster/ru/recommendations/changing-site-structure) и [Google о LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business). Разметка и технический SEO не гарантируют позиции. После публикации следует проверить публичный URL, а затем запросить переобход в Яндекс Вебмастере и Google Search Console; эти действия не выполнялись в рамках отправки кода в GitHub.

## Проверки

Production preview: `http://localhost:3101/simracing`. Изолированные каталоги сборки не меняют обычный `.next`. Установленные зависимости проекта не обновлялись.

| Проверка | Результат |
| --- | --- |
| `node node_modules/next/dist/bin/next build` с `NEXT_BUILD_DIR=.next-simracing-production` | PASS; `/simracing` статическая, route 18.7 kB, first-load JS 119 kB |
| `node node_modules/typescript/bin/tsc --noEmit --project scripts/tsconfig.simracing.json --pretty false` | PASS |
| `node node_modules/next/dist/bin/next lint --dir app/simracing --file components/StickyBar.tsx --file components/BookingModal.tsx --file components/CookieBanner.tsx --file components/Footer.tsx` | PASS, без предупреждений |
| `node scripts/check-simracing-content.cjs` | PASS: 26 комнат, 216 записей авто, 183 изображения декодируются, OG 1200×630 |
| Playwright: `scripts/check-simracing-browser.js` | PASS: 320/360/390/430/768/1024/1440/1920 px, без горизонтального overflow и JS exceptions |
| Playwright: `scripts/check-simracing-states.js` | PASS: все 26 окон, меню, галерея, переход из режима в бронирование, no-JS, smoke `/`, `/prices`, `/contacts` |
| AXE WCAG2 A/AA + WCAG2.1 AA | 0 violations на странице и отдельно в открытых меню, режиме, галерее, бронировании |
| Ручная визуальная проверка screenshots | Hero, оборудование, каталог, автомобили, переход, цены, FAQ, контакты; mobile/desktop; кадры анимации 0.1× |
| HTTP / sitemap / robots | Страница доступна, canonical верный, sitemap содержит URL, robots не блокирует |
| `git diff --check` | PASS |

Команды браузерных проверок из PowerShell:

```powershell
npx --yes --package @playwright/cli playwright-cli -s=simracing open http://localhost:3101/simracing
npx --yes --package @playwright/cli playwright-cli -s=simracing run-code --filename=scripts/check-simracing-browser.js --raw
npx --yes --package @playwright/cli playwright-cli -s=simracing run-code --filename=scripts/check-simracing-states.js --raw
npx --yes --package @axe-core/cli axe http://localhost:3101/simracing --tags wcag2a,wcag2aa,wcag21aa --exit
npx --yes lighthouse http://localhost:3101/simracing --only-categories=performance,accessibility,best-practices,seo --chrome-flags=--headless
# Для desktop добавить --preset=desktop.
```

Lighthouse 13.5.0, локальная production-сборка, лабораторная эмуляция:

| Метрика | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 81 | 99 |
| Accessibility | 100 | 100 |
| SEO | 100 | 100 |
| Best Practices | 77 | 77 |
| FCP | 2.4 s | 0.5 s |
| LCP | 4.4 s | 0.8 s |
| TBT | 30 ms | 0 ms |
| CLS | 0 | 0.001 |

Best Practices снижён существующей сторонней аналитикой: third-party cookies и связанные DevTools issues. Аналитика не отключалась ради оценки. Mobile LCP 4.4 s остаётся ограничением лабораторного замера; оценка 81 не означает прохождение полевых Core Web Vitals. Общие CSS и сторонний JavaScript остаются кандидатами для отдельной оптимизации всего сайта.

Полная проверка репозитория `tsc --noEmit` всё ещё выдаёт девять существующих ошибок вне этой страницы: две в `app/admin-rules/AdminRulesClient.tsx`, пять по отсутствующим зависимостям вложенного `cyberx-hero-remotion`, две по неэкспортируемым именам в `lib/langame-bar.ts`. Флаги пропуска lint/typecheck при сборке существовали до этой работы и не изменены. Поэтому scoped typecheck и lint запускались явно.

Артефакты локального прогона: `output/playwright/simracing/` (скриншоты, browser/states JSON, Lighthouse HTML/JSON, AXE, build/typecheck logs). Они исключены из Git. Не проверено: физические iOS/Android устройства, Safari/Firefox, реальная запись и оплата в стороннем приложении, публичная выдача после развёртывания.

Вердикт интерфейсного ревью: **Approve** в указанной области Chromium и адаптивных размеров. Непроверенные поверхности перечислены выше; ограничения скорости и ошибки общего typecheck приведены отдельно.

## Визуальные материалы

Фотографии `/zones/sim-1.webp` … `/zones/sim-5.webp` — исходные фотографии клуба. Оптимизированные производные и обложки подготовлены через `scripts/prepare-simracing-assets.cjs`. Шрифты WOFF2 получены из имеющихся WOFF через `scripts/prepare-simracing-fonts.py` (fontTools + Brotli). Оригиналы сохранены.

Только атмосферный переход к дополнительным играм использует сгенерированную иллюстрацию: `public/racing/editorial/racing-world.webp`. Это автомобиль на трассе, не изображение помещения клуба. Метод: встроенный imagegen. Направление промпта: cinematic realistic 3D unbranded graphite GT car, elevated three-quarter camera, car in the right third, dark asphalt on the left, subtle pink and white curbs, dusk, no text, logos or neon. Исходный результат: `exec-4f4ea3ad-788a-45be-a462-1326c9f5c1fc.png` в локальной папке generated_images текущей задачи.

`public/racing/editorial/simracing-og.jpg` — снимок нового первого экрана размером 1200×630 с реальной фотографией кокпита; используется для превью ссылки.
