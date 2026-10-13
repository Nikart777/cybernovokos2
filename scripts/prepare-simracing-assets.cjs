const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

async function main() {
  const out = path.join(process.cwd(), "public", "racing", "editorial");
  await fs.mkdir(out, { recursive: true });
  for (const n of [1, 2, 3, 4, 5]) {
    for (const width of [160, 640, 1280]) {
      await sharp(`public/zones/sim-${n}.webp`)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(path.join(out, `cockpit-${n}-${width}.webp`));
    }
  }
  await sharp('public/zones/sim-1.webp').resize({ width: 1280 }).avif({ quality: 58 }).toFile(path.join(out, 'cockpit-1-1280.avif'));
  if (process.argv[2]) {
    await sharp(process.argv[2])
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(out, "racing-world.webp"));
  }
  // Static responsive thumbnails: the host intentionally disables Next image optimization.
  const covers = await fs.readdir("public/racing/assets/covers");
  for (const file of covers) {
    await sharp(path.join("public/racing/assets/covers", file))
      .resize({ width: 720, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(out, `${path.parse(file).name}.webp`));
  }
  console.log("Prepared local responsive simracing photography and covers.");
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
