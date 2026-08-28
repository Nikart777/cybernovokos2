#!/usr/bin/env node
/**
 * Выгрузка тарифов из LANGAME Master API — источник истины по ценам клубов.
 *
 * Токен НЕ хранится в репозитории: передаётся через переменную окружения.
 *   PowerShell:  $env:LANGAME_TOKEN="…"; $env:LANGAME_HOST="cyberx52.langamesftw.ru"; node scripts/langame-prices.mjs
 *   bash:        LANGAME_TOKEN=… LANGAME_HOST=cyberx52.langamesftw.ru node scripts/langame-prices.mjs
 *
 * Результат: output/langame-<host>.json — сырые справочники + собранная матрица цен.
 *
 * Маршрут до langame-хостов теряет SYN-пакеты (проверено): каждый запрос идёт с коротким
 * таймаутом и повторами, иначе один зависший коннект съедает всю выгрузку.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TOKEN = process.env.LANGAME_TOKEN;
const HOST = process.env.LANGAME_HOST || 'cyberx52.langamesftw.ru';
const CLUB_FILTER = process.env.LANGAME_CLUB_ID ? Number(process.env.LANGAME_CLUB_ID) : null;

if (!TOKEN) {
    console.error('Нет LANGAME_TOKEN в окружении. Пример:\n  $env:LANGAME_TOKEN="…"; node scripts/langame-prices.mjs');
    process.exit(1);
}

const ENDPOINTS = {
    clubs: '/clubs/list',
    zones: '/global/types_of_pc_in_clubs/list',
    dayGroups: '/tariffs/groups/list',
    packets: '/tariffs/types_groups/list',
    periods: '/tariffs/time_period/list',
};

async function apiGet(endpoint, attempt = 1) {
    const url = `https://${HOST}/master_api${endpoint}`;
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 8000);
    try {
        const res = await fetch(url, { headers: { 'X-Request-Token': TOKEN, Accept: 'application/json' }, signal: ctl.signal });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const body = await res.json();
        if (body.status === false) throw new Error('API status=false: ' + JSON.stringify(body).slice(0, 120));
        return body.data ?? body;
    } catch (err) {
        if (attempt >= 4) throw new Error(`${endpoint}: ${err.message} (после ${attempt} попыток)`);
        await new Promise(r => setTimeout(r, 700 * attempt));
        return apiGet(endpoint, attempt + 1);
    } finally {
        clearTimeout(timer);
    }
}

const raw = {};
for (const [key, ep] of Object.entries(ENDPOINTS)) {
    process.stdout.write(`${ep} … `);
    raw[key] = await apiGet(ep);
    console.log(Array.isArray(raw[key]) ? raw[key].length + ' записей' : 'ok');
}

/* ---------- сборка матрицы ---------- */

const byId = (arr, k = 'id') => Object.fromEntries((arr || []).map(x => [x[k], x]));
const zones = byId(raw.zones);
const dayGroups = byId(raw.dayGroups);
const packets = byId(raw.packets);

const DAY_NAMES = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
const humanDays = g => (g?.days ?? '').split(',').filter(s => s !== '').map(n => DAY_NAMES[Number(n)]).join(',');
const humanDur = p => {
    if (!p) return '?';
    if (p.subs_duration) return `абонемент ${p.subs_duration / 60} ч (срок ${Math.round(p.subs_duration / 1440)} дн.)`;
    if (p.duration) return p.duration % 60 === 0 ? `${p.duration / 60} ч` : `${p.duration} мин`;
    return 'без фикс. длительности';
};

const rows = (raw.periods || [])
    .filter(p => CLUB_FILTER === null || p.club_id === CLUB_FILTER)
    .map(p => ({
        club_id: p.club_id,
        zone_id: p.packets_type_PC,
        zone: zones[p.packets_type_PC]?.name ?? `зона #${p.packets_type_PC}`,
        day_group_id: p.tariff_groups,
        day_group: dayGroups[p.tariff_groups]?.name ?? `группа #${p.tariff_groups}`,
        days: humanDays(dayGroups[p.tariff_groups]),
        packet_id: p.tariff_packet_id,
        packet: packets[p.tariff_packet_id]?.name ?? `пакет #${p.tariff_packet_id}`,
        duration: humanDur(packets[p.tariff_packet_id]),
        time_from: p.time_from,
        time_to: p.time_to,
        price: p.price,
    }))
    .sort((a, b) =>
        a.club_id - b.club_id ||
        (zones[a.zone_id]?.sort ?? 0) - (zones[b.zone_id]?.sort ?? 0) ||
        a.day_group_id - b.day_group_id ||
        (packets[a.packet_id]?.sort ?? 0) - (packets[b.packet_id]?.sort ?? 0) ||
        String(a.time_from).localeCompare(String(b.time_from)));

const OUT = path.join(ROOT, 'output', `langame-${HOST.split('.')[0]}.json`);
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({
    _meta: { host: HOST, fetched_at: new Date().toISOString(), club_filter: CLUB_FILTER, rows: rows.length },
    raw, matrix: rows,
}, null, 2), 'utf8');

/* ---------- отчёт ---------- */

console.log('\nКлубы:');
for (const c of raw.clubs || []) console.log(`  id=${c.id}  ${c.name ?? JSON.stringify(c).slice(0, 80)}`);

console.log('\nЗоны:');
for (const z of (raw.zones || []).sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))) console.log(`  id=${z.id}  ${z.name}`);

console.log('\nГруппы дней:');
for (const g of raw.dayGroups || []) console.log(`  id=${g.id}  ${g.name} (${humanDays(g)})`);

console.log('\nПакеты:');
for (const p of (raw.packets || []).filter(p => !p.is_deleted).sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))) {
    console.log(`  id=${p.id}  ${p.name} — ${humanDur(p)}${p.cashback_prc ? `, кешбек ${p.cashback_prc}%` : ''}${p.mobile_only ? ', только в приложении' : ''}`);
}

console.log('\nМатрица цен:');
let curZone = null, curGroup = null;
for (const r of rows) {
    const zoneKey = r.club_id + '|' + r.zone;
    if (zoneKey !== curZone) { console.log(`\n— ${r.zone}${raw.clubs?.length > 1 ? ` (клуб ${r.club_id})` : ''}`); curZone = zoneKey; curGroup = null; }
    if (r.day_group !== curGroup) { console.log(`   [${r.day_group}: ${r.days}]`); curGroup = r.day_group; }
    console.log(`     ${String(r.price).padStart(6)} ₽  ${r.packet} (${r.duration})  ${r.time_from}–${r.time_to}`);
}
console.log(`\nСохранено: ${path.relative(ROOT, OUT)} — ${rows.length} строк`);
