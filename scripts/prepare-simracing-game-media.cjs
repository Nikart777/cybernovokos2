const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

// Club-provided media: https://cyberx.moscow/cyberracing, checked 2026-10-13.
const sources = {
  'forza-horizon-6': 'https://medprogramcenter.com/api/media/file/5.webp',
  'forza-horizon-5': 'https://cyberx.moscow/images/tild6664-3565-4333-b366-333738333232__maxresdefault_1.webp',
  'carx-street': 'https://cyberx.moscow/images/tild3866-3030-4631-b630-343564343936__maxresdefault_2.webp',
  'carx-drift': 'https://cyberx.moscow/images/tild3562-3631-4066-b864-373537386234__imgwebp.webp',
  'euro-truck': 'https://cyberx.moscow/images/tild3136-3266-4730-a161-393032316430__i_5.webp',
  'city-car-driving-2': 'https://cdn.vkplay.ru/pre_600x315_crop/hotbox/showcase/gamelocaledraft/picture_horizontal/ee8f44c2-7eec-4919-8372-f9bddb256c9f.jpeg?quality=85',
  'assetto-rally': 'https://cyberx.moscow/images/tild3233-6164-4739-b035-376239363230__maxresdefault_10.jpg',
  'dirt-wrc': 'https://cyberx.moscow/images/tild3361-3537-4339-b233-316437366433__i.webp',
};
async function download(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Media HTTP ${response.status}: ${url}`);
  return Buffer.from(await response.arrayBuffer());
}
async function main() {
  const directory = path.join(process.cwd(), 'public/racing/games');
  await fs.mkdir(directory, { recursive: true });
  for (const [name, url] of Object.entries(sources)) {
    const buffer = await download(url);
    await sharp(buffer).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(directory, `${name}.webp`));
    console.log(`Prepared ${name}`);
  }
  const video = 'https://www.tiktok.com/@cyberxnovokosino/video/7568569253553589522';
  const response = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(video)}`);
  if (!response.ok) throw new Error(`TikTok metadata HTTP ${response.status}`);
  const metadata = await response.json();
  const poster = await download(metadata.thumbnail_url);
  await sharp(poster).resize({ width: 576, withoutEnlargement: true }).webp({ quality: 82 }).toFile('public/racing/editorial/club-video-poster.webp');
  console.log('Prepared the actual TikTok poster; video is embedded, not copied.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
