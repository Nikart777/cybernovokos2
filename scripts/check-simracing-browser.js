// Run with: npx --package @playwright/cli playwright-cli -s=simracing run-code --filename=scripts/check-simracing-browser.js
async (page) => {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const failures = [];
  page.on('pageerror', error => failures.push(error.message));
  const origin = new URL(page.url()).origin;
  await page.goto(`${origin}/simracing`);
  await page.evaluate(() => localStorage.setItem('cookie-consent', 'accepted'));
  await page.reload();
  await page.locator('h1').waitFor();
  await page.evaluate(() => document.fonts.ready);
  const output = 'output/playwright/simracing';
  const matrix = [[320, 740], [360, 800], [390, 844], [430, 932], [768, 1024], [1024, 768], [1440, 1000], [1920, 1080]];
  const results = [];
  for (const [width, height] of matrix) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    const layout = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return {
        width: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        headingWidth: h1.scrollWidth,
        headingContainer: h1.clientWidth,
        menus: [...document.querySelectorAll('header button')].filter(b => b.getAttribute('aria-label') === 'Открыть меню' && b.getClientRects().length).length,
      };
    });
    assert(layout.documentWidth <= width, `Page overflow at ${width}: ${JSON.stringify(layout)}`);
    assert(layout.headingWidth <= layout.headingContainer + 1, `Heading overflow at ${width}`);
    assert(layout.menus === (width < 1024 ? 1 : 0), `Incorrect mobile menu at ${width}`);
    results.push(layout);
    await page.screenshot({ path: `${output}/viewport-${width}.png` });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Открыть меню' }).click();
  assert(await page.locator('dialog[open]').count() === 1, 'Mobile menu did not open');
  await page.getByRole('navigation', { name: 'Мобильная навигация' }).getByRole('link', { name: 'Оборудование' }).click();
  assert(await page.locator('dialog[open]').count() === 0, 'Mobile menu did not close after navigation');
  await page.getByRole('button', { name: 'Следующее фото', exact: true }).click();
  assert((await page.locator('#equipment').innerText()).includes('Фото 2 из 5'), 'Gallery next did not advance');
  const galleryStates = [
    [1, 'Весь поворот перед тобой.', '55 дюймов'],
    [5, 'Четыре места на старте. Твоя компания.', 'До 4 игроков'],
    [4, 'Чувствуй, где предел сцепления.', 'До 12 Нм'],
    [2, 'Лови занос. Держи передачу.', 'Отдельный ручник'],
    [3, 'Твоё место за рулём.', 'Load Cell'],
  ];
  for (let index = 0; index < galleryStates.length; index++) {
    const [photo, title, spec] = galleryStates[index];
    await page.getByRole('button', { name: new RegExp(`^Фото ${index + 1}:`) }).click();
    assert(await page.locator('.sr-photo-story').getAttribute('data-photo') === String(photo), 'Gallery story/image mismatch');
    assert(await page.locator('.sr-photo-title').innerText() === title, `Incorrect description for photo ${photo}`);
    assert((await page.locator('.sr-photo-specs').innerText()).includes(spec), `Incorrect specs for photo ${photo}`);
    assert((await page.locator('#equipment .sr-cockpit-frame img').getAttribute('src')).includes(`cockpit-${photo}-`), 'Gallery image did not follow description');
  }
  await page.getByRole('button', { name: /Увеличить фото:/ }).click();
  assert(await page.locator('dialog[open]').count() === 1, 'Gallery modal did not open');
  await page.keyboard.press('ArrowRight');
  assert(await page.locator('.sr-photo-story').getAttribute('data-photo') === '1', 'Expanded gallery navigation did not update story');
  await page.keyboard.press('Escape');
  assert(await page.locator('dialog[open]').count() === 0, 'Escape did not close gallery');

  await page.getByRole('button', { name: 'Все режимы (26)', exact: true }).click();
  assert(await page.locator('#server-results article').count() === 26, 'Expected all 26 servers');
  await page.getByRole('group', { name: 'Фильтр серверов по игре' }).getByRole('button', { name: /BeamNG.drive/ }).click();
  await page.getByRole('button', { name: 'Все режимы (9)', exact: true }).click();
  assert(await page.locator('#server-results article').count() === 9, 'Expected 9 BeamNG rooms');
  await page.getByRole('group', { name: 'Фильтр серверов по игре' }).getByRole('button', { name: /Assetto Corsa/ }).click();
  await page.getByRole('button', { name: 'Все режимы (17)', exact: true }).click();
  assert(await page.locator('#server-results article').count() === 17, 'Expected 17 Assetto rooms');
  assert(await page.locator('#games input[type="search"]').count() === 0, 'Removed catalogue search returned');
  await page.getByRole('group', { name: 'Фильтр серверов по игре' }).getByRole('button', { name: /Все режимы/ }).click();
  await page.getByRole('button', { name: 'МКАД · Шашки с очками', exact: true }).first().click();
  const roomDialog = page.locator('dialog[open]');
  assert(await roomDialog.locator('article').count() === 14, 'MKAD car collection lost entries');
  assert(await roomDialog.getByRole('heading', { name: 'Выбирай свою машину' }).count() === 1, 'Missing car collection heading');
  await roomDialog.getByRole('heading', { name: 'Выбирай свою машину' }).scrollIntoViewIfNeeded();
  await page.waitForFunction(() => [...document.querySelectorAll('dialog[open] img')].filter(i => { const r = i.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; }).every(i => i.complete && i.naturalWidth > 0));
  await page.screenshot({ path: `${output}/cars-mobile-final.png` });
  for (let i = 0; i < 8; i++) await page.keyboard.press('Tab');
  assert(await page.evaluate(() => document.querySelector('dialog[open]').contains(document.activeElement)), 'Focus escaped room dialog');
  await page.keyboard.press('Escape');
  assert(await page.evaluate(() => document.body.style.overflow !== 'hidden'), 'Body remains locked after closing dialog');

  await page.getByRole('button', { name: 'Выходные', exact: true }).click();
  const weekend = (await page.locator('.sr-price').allTextContents()).map(t => t.replace(/\s/g, ''));
  assert(JSON.stringify(weekend) === JSON.stringify(['850₽', '1290₽', '1650₽', '2400₽']), `Weekend prices changed: ${weekend}`);
  await page.getByRole('button', { name: 'Будни', exact: true }).click();
  const weekdays = (await page.locator('.sr-price').allTextContents()).map(t => t.replace(/\s/g, ''));
  assert(JSON.stringify(weekdays) === JSON.stringify(['580₽', '980₽', '1350₽', '1900₽']), `Weekday prices changed: ${weekdays}`);
  await page.locator('#tariffs .sr-button').first().click();
  assert(await page.getByRole('dialog', { name: /400 бонусов/ }).isVisible(), 'Booking modal did not open');
  const bookingCopy = await page.getByRole('dialog', { name: /400 бонусов/ }).innerText();
  assert(bookingCopy.includes('до 20% кэшбэка с каждого заезда'), 'Ride cashback terms missing');
  assert(bookingCopy.includes('На автосимуляторы бонусы не списываются.'), 'Simracing bonus exclusion missing on mobile');
  assert(bookingCopy.includes('в других зонах клуба'), 'Bonus redemption zones missing');
  assert(!bookingCopy.includes('До 20% стоимости - бонусами'), 'Misleading simracing bonus payment returned');
  for (let i = 0; i < 10; i++) await page.keyboard.press('Tab');
  assert(await page.getByRole('dialog', { name: /400 бонусов/ }).evaluate(el => el.contains(document.activeElement)), 'Focus escaped booking modal');
  await page.keyboard.press('Escape');
  await page.locator('#faq summary').first().click();
  assert(await page.locator('#faq details[open]').count() === 1, 'FAQ did not expand');
  assert(await page.locator('h1').count() === 1, 'Expected exactly one h1');
  assert((await page.locator('link[rel="canonical"]').getAttribute('href')) === 'https://cyberx-novokosino.ru/simracing', 'Incorrect canonical');
  assert(!(await page.locator('main').innerText()).match(/лаунчер|в 1 клик|в один клик/i), 'Technical launcher copy returned');
  const schema = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.map(n => JSON.parse(n.textContent)));
  const graph = schema.find(item => item['@graph'])['@graph'];
  assert(graph.find(item => item['@type'] === 'Service').hasOfferCatalog.itemListElement.length === 8, 'Expected 8 structured price offers');
  assert(graph.find(item => item['@type'] === 'FAQPage').mainEntity.length === 7, 'FAQ schema mismatch');
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  assert(await page.locator('.sr-page').evaluate(el => getComputedStyle(el).backgroundColor) === 'rgb(11, 12, 15)', 'Brand theme changed with OS preference');
  assert(await page.locator('.sr-hero-copy').evaluate(el => getComputedStyle(el).animationName) === 'none', 'Reduced motion is ignored');
  assert(await page.locator('.sr-light-bank span').first().evaluate(el => getComputedStyle(el).animationName) === 'none', 'Start lights ignore reduced motion');
  await page.emulateMedia({ reducedMotion: 'no-preference', colorScheme: 'dark' });
  assert(await page.locator('#reviews blockquote').count() === 3, 'Review excerpts missing');
  assert(await page.locator('#reviews a[href*="98831858695"]').count() === 4, 'Review sources missing or wrong branch');
  assert(await page.locator('#other-games .sr-game-card:visible').count() === 4, 'Expected four featured game cards');
  await page.locator('.sr-more-games summary').click();
  assert(await page.locator('#other-games .sr-game-card:visible').count() === 8, 'Extra game cards did not expand');
  assert((await page.locator('.sr-game-new').innerText()).includes('Forza Horizon 6'), 'Current Forza edition missing');
  for (const card of await page.locator('#other-games .sr-game-card').all()) {
    await card.scrollIntoViewIfNeeded();
    await card.locator('img').evaluate(image => image.decode());
  }
  await page.locator('.sr-more-games summary').click();
  for (const section of ['equipment', 'club-video', 'games', 'other-games', 'tariffs', 'reviews', 'faq', 'location']) {
    await page.locator(`#${section}`).scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.images].filter(i => { const r = i.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; }).every(i => i.complete));
    await page.screenshot({ path: `${output}/section-${section}.png` });
  }
  const broken = await page.locator('main img').evaluateAll(images => images.filter(i => i.complete && i.naturalWidth === 0).map(i => i.src));
  assert(broken.length === 0, `Broken images: ${broken.join(', ')}`);
  assert(failures.length === 0, `Browser errors: ${failures.join(', ')}`);
  return { status: 'PASS', viewports: results, checks: ['menu', 'gallery', 'catalogue 26/17/9 without search', '14-car detail', 'dialog keyboard and focus', 'unchanged tariffs', 'booking and focus', 'FAQ', 'canonical', '8 offers', 'reduced motion', 'light/dark brand consistency', 'image loading', 'no browser exceptions'] };
}
