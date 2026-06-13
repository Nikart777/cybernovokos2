const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  let totalBytes = 0;
  let cssBytes = 0;
  let jsBytes = 0;
  let imgBytes = 0;
  let requestCount = 0;
  
  page.on('response', async (response) => {
    requestCount++;
    const type = response.request().resourceType();
    
    try {
      const buffer = await response.body();
      const size = buffer.length;
      totalBytes += size;
      if (type === 'stylesheet') cssBytes += size;
      if (type === 'script') jsBytes += size;
      if (type === 'image') imgBytes += size;
    } catch (e) {
    }
  });

  const startTime = Date.now();
  console.log('Navigating to https://medprogramcenter.com...');
  await page.goto('https://medprogramcenter.com', { waitUntil: 'networkidle' });
  const loadTime = Date.now() - startTime;

  console.log('\\n=== FRONTEND PERFORMANCE AFTER OPTIMIZATION ===');
  console.log('Total Load Time (Network Idle): ' + (loadTime/1000).toFixed(2) + 's');
  console.log('Total Requests: ' + requestCount);
  console.log('Total Page Weight: ' + (totalBytes / 1024 / 1024).toFixed(2) + ' MB');
  console.log('  - CSS: ' + (cssBytes / 1024).toFixed(2) + ' KB');
  console.log('  - JavaScript: ' + (jsBytes / 1024).toFixed(2) + ' KB');
  console.log('  - Images: ' + (imgBytes / 1024).toFixed(2) + ' KB');
  
  await browser.close();
})();
