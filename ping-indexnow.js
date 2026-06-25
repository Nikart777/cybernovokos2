const https = require('https');

const host = 'cyberx-novokosino.ru';
const key = 'd4e5f6a1b2c37e8a9b0c1d2e3f4a5b6c';
const keyLocation = `https://${host}/${key}.txt`;

const urlList = [
  `https://${host}/`,
  `https://${host}/prices`,
  `https://${host}/contacts`,
  `https://${host}/simracing`,
  `https://${host}/llms.txt`,
  `https://${host}/llms-full.txt`
];

const postData = JSON.stringify({
  host,
  key,
  keyLocation,
  urlList
});

function sendRequest(hostname, path) {
  return new Promise((resolve) => {
    const options = {
      hostname,
      port: 443,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    console.log(`Sending IndexNow request to ${hostname}...`);

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => { responseData += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 202) {
          console.log(`[Success] IndexNow at ${hostname} updated successfully (Status: ${res.statusCode}).`);
          resolve(true);
        } else {
          console.error(`[Error] IndexNow at ${hostname} failed with status ${res.statusCode}: ${responseData}`);
          resolve(false);
        }
      });
    });

    req.on('error', (e) => {
      console.error(`[Error] IndexNow request to ${hostname} failed: ${e.message}`);
      resolve(false);
    });

    req.write(postData);
    req.end();
  });
}

async function run() {
  // Отправляем запросы в Яндекс и Bing (через общий шлюз IndexNow)
  await sendRequest('yandex.com', '/indexnow');
  await sendRequest('api.indexnow.org', '/indexnow');
}

run();
