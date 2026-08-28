#!/usr/bin/env node
/** Крошечный CORS-сервер: отдаёт public/yandex-menu/price-list.yml для передачи в браузер (загрузка фида в Яндекс Бизнес). */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FILE = path.join(ROOT, 'public', 'yandex-menu', 'price-list.yml');
const PORT = 8787;

http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.url !== '/price-list.yml') { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, { 'Content-Type': 'text/xml; charset=utf-8' });
    res.end(fs.readFileSync(FILE));
}).listen(PORT, '127.0.0.1', () => console.log('serving price-list.yml on http://127.0.0.1:' + PORT));
