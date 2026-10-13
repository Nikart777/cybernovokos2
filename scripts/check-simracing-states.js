// Playwright CLI run-code function; run after check-simracing-browser.js.
async (page) => {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const origin = new URL(page.url()).origin;
  const output = 'output/playwright/simracing';
  await page.goto(`${origin}/simracing`);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
  const audit = () => page.evaluate(async () => {
    const result = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } });
    return result.violations.map(item => ({ id: item.id, impact: item.impact, targets: item.nodes.map(node => node.target) }));
  });
  const audits = {};
  await page.getByRole('button', { name: 'Открыть меню' }).click();
  audits.menu = await audit();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Все режимы (26)', exact: true }).click();
  const count = await page.locator('#server-results article').count();
  const rooms = [];
  for (let index = 0; index < count; index++) {
    await page.locator('#server-results article').nth(index).getByRole('button').first().click();
    const dialog = page.locator('dialog[open]');
    assert(await dialog.count() === 1, `Room ${index} did not open`);
    const dimensions = await dialog.evaluate(el => ({ width: el.clientWidth, content: el.scrollWidth }));
    assert(dimensions.content <= dimensions.width, `Room ${index} overflows: ${JSON.stringify(dimensions)}`);
    const cars = await dialog.locator('article').count();
    assert(cars > 0, `Room ${index} has no cars`);
    rooms.push({ title: await dialog.locator('h2').innerText(), cars });
    if (index === 0) audits.room = await audit();
    await page.keyboard.press('Escape');
  }
  await page.getByRole('button', { name: /Увеличить фото:/ }).click();
  audits.gallery = await audit();
  await page.keyboard.press('Escape');
  await page.locator('#server-results article').first().getByRole('button').first().click();
  await page.locator('dialog[open]').getByRole('button', { name: 'Забронировать заезд' }).click();
  const booking = page.getByRole('dialog', { name: /400 бонусов/ });
  await booking.waitFor();
  assert(await page.locator('dialog[open]').count() === 0, 'Room dialog obscures booking');
  await page.waitForFunction(() => [...document.querySelectorAll('[aria-labelledby="booking-modal-title"] [style*="opacity"]')].every(el => Number(getComputedStyle(el).opacity) === 1));
  audits.booking = await audit();
  await page.keyboard.press('Escape');
  assert(await page.evaluate(() => document.body.style.overflow !== 'hidden'), 'Scroll locked after room-to-booking flow');
  const violations = Object.entries(audits).filter(([, value]) => value.length);
  assert(violations.length === 0, `Accessibility findings: ${JSON.stringify(violations)}`);

  // Slow CSS animation and sample exact frames for visual inspection.
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.locator('.sr-hero-copy').evaluate(el => {
    el.getAnimations().forEach(animation => { animation.playbackRate = 0.1; animation.currentTime = 0; animation.play(); });
  });
  for (const progress of [0.1, 0.5, 1]) {
    await page.locator('.sr-hero-copy').evaluate((el, progress) => {
      el.getAnimations().forEach(animation => { animation.pause(); animation.currentTime = Number(animation.effect.getTiming().duration) * progress; });
    }, progress);
    await page.screenshot({ path: `${output}/motion-${progress}.png` });
  }
  await page.locator('.sr-hero-copy').evaluate(el => el.getAnimations().forEach(animation => animation.finish()));
  const button = page.locator('main .sr-button').first();
  await button.hover();
  await button.focus();
  const focusOutline = await button.evaluate(el => getComputedStyle(el).outlineStyle);
  assert(focusOutline !== 'none', 'Missing focus-visible outline');

  const noJsContext = await page.context().browser().newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const noJs = await noJsContext.newPage();
  await noJs.goto(`${origin}/simracing`);
  assert(await noJs.locator('h1').isVisible(), 'No-JS heading is hidden');
  assert(await noJs.locator('#tariffs').innerText().then(text => text.includes('2 400') || text.includes('2400')), 'No-JS weekend prices missing');
  assert(await noJs.locator('#faq details').count() === 7, 'No-JS FAQ missing');
  assert(await noJs.locator('#games').innerText().then(text => text.includes('BeamNG.drive')), 'No-JS catalogue missing');
  await noJs.screenshot({ path: `${output}/no-js-mobile.png` });
  await noJsContext.close();
  const smoke = [];
  for (const route of ['/', '/prices', '/contacts']) {
    const response = await page.goto(`${origin}${route}`);
    assert(response.ok(), `Shared component smoke failed: ${route}`);
    assert(await page.locator('h1').count() > 0, `Heading missing on ${route}`);
    smoke.push(route);
  }
  await page.goto(`${origin}/simracing`);
  return { status: 'PASS', rooms, audits, noJavaScript: true, smoke, motionPlaybackRate: 0.1 };
}
