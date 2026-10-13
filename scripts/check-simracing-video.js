// Interaction and graceful-failure checks. A mocked player is used only for deterministic error events.
async (page) => {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const origin = new URL(page.url()).origin;
  await page.goto(`${origin}/simracing`);
  await page.setViewportSize({ width: 390, height: 844 });
  assert(await page.locator('.sr-video-frame iframe').count() === 0, 'TikTok loaded before user interaction');
  await page.route('https://www.tiktok.com/player/v1/**', route => route.fulfill({
    contentType: 'text/html',
    body: '<html><body><p>Test player</p></body></html>',
  }));
  await page.getByRole('button', { name: 'Смотреть заезд в CyberX Новокосино' }).click();
  assert((await page.locator('.sr-video-frame iframe').getAttribute('src')).includes('7568569253553589522'), 'Wrong TikTok video');
  await page.getByRole('button', { name: 'Закрыть видео' }).click();
  assert(await page.locator('.sr-video-frame iframe').count() === 0, 'Closing video did not stop playback');
  await page.waitForFunction(() => document.activeElement?.getAttribute('aria-label') === 'Смотреть заезд в CyberX Новокосино');
  await page.getByRole('button', { name: 'Смотреть заезд в CyberX Новокосино' }).click();
  await page.frameLocator('.sr-video-frame iframe').getByText('Test player').waitFor();
  const frame = page.frames().find(frame => frame.url().includes('tiktok.com/player'));
  await frame.evaluate(() => parent.postMessage({'x-tiktok-player': true, type: 'onPlayerError', value: {errorCode: 3001}}, '*'));
  await page.getByRole('status').filter({ hasText: 'Видео не загрузилось' }).waitFor();
  assert(await page.locator('.sr-video-frame iframe').count() === 0, 'Failed player was not replaced by poster');
  assert(await page.locator('#club-video a[href*="tiktok.com/@cyberxnovokosino/video/7568569253553589522"]').isVisible(), 'External fallback missing');
  await page.unroute('https://www.tiktok.com/player/v1/**');
  await page.getByRole('button', { name: 'Смотреть заезд в CyberX Новокосино' }).click();
  await page.locator('.sr-video-frame iframe').waitFor();
  // The actual upstream frame is inspected separately; no fabricated playback success.
  return { status: 'PASS', lazyPlayer: true, exactVideo: true, simulatedPlayerError: true, stopAndFocus: true, realPlayerUrl: await page.locator('.sr-video-frame iframe').getAttribute('src') };
}
