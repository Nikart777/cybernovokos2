// Validate the imported catalogue and its real files, including assets outside the first screen.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const sharp = require('sharp');

async function main() {
  const filename = path.join(__dirname, '../app/simracing/catalogData.ts');
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const sandbox = { exports: {} };
  vm.runInNewContext(source, sandbox, { filename });
  const games = sandbox.exports.CYBERX_SERVER_GAMES;
  const rooms = games.flatMap(game => game.rooms);
  assert.equal(games.find(game => game.id === 'assetto').rooms.length, 17);
  assert.equal(games.find(game => game.id === 'beamng').rooms.length, 9);
  assert.equal(new Set(rooms.map(room => room.id)).size, 26, 'Duplicate room IDs');
  const paths = new Set();
  for (const room of rooms) {
    assert.ok(room.title && room.description && room.cars.length, `Incomplete room ${room.id}`);
    assert.equal(new Set(room.cars.map(car => car.id)).size, room.cars.length, `Duplicate car keys: ${room.id}`);
    paths.add(room.cover);
    paths.add(`/racing/editorial/${path.basename(room.cover).replace(/\.[^.]+$/, '.webp')}`);
    room.cars.forEach(car => paths.add(car.image));
  }
  for (const asset of paths) {
    assert.ok(asset.startsWith('/racing/'), `Unexpected asset path ${asset}`);
    const file = path.join(__dirname, '../public', asset);
    assert.ok(fs.existsSync(file), `Missing ${asset}`);
    const metadata = await sharp(file).metadata();
    assert.ok(metadata.width > 0 && metadata.height > 0, `Unreadable ${asset}`);
  }
  const og = await sharp(path.join(__dirname, '../public/racing/editorial/simracing-og.jpg')).metadata();
  assert.equal(og.width, 1200);
  assert.equal(og.height, 630);
  console.log(JSON.stringify({ status: 'PASS', rooms: rooms.length, carEntries: rooms.reduce((sum, room) => sum + room.cars.length, 0), checkedImages: paths.size, og: '1200x630' }, null, 2));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
