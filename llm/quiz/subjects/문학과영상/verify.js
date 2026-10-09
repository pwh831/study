#!/usr/bin/env node
/* data/items.js 가 엔진의 계약을 지키는지 본다.
 *
 *     node verify.js
 *
 * 데이터가 틀렸을 때 앱은 대개 죽지 않는다 — 조용히 이상한 문제를 낸다.
 * 보기가 셋뿐인 5지선다, 정답이 둘인 문제, 아무도 안 쓰는 갈래 같은 것들이다.
 * 그래서 눈으로 볼 수 없는 것만 여기서 기계로 잡는다.
 *
 * ERROR 는 반드시 고쳐야 하는 것(엔진이 잘못 돌거나 문제가 안 나간다),
 * WARN 은 문제는 나가지만 출제 품질이 떨어지는 것이다.
 */
const path = require("path");
const data = require(path.join(process.cwd(), "data", "items.js"));
const { SUBJECT, AREAS, UNITS, CATS, ITEMS } = data;
const MEDIA = data.MEDIA || {};

const errors = [];
const warns = [];
const err = (m) => errors.push(m);
const warn = (m) => warns.push(m);

const equiv = SUBJECT.equiv || [];
const norm = (s) => {
  s = String(s || "").toLowerCase().replace(/\(.*?\)/g, "").replace(/[\s·・,.\-_'"’”]/g, "");
  for (const grp of equiv) for (let k = 1; k < grp.length; k++) s = s.split(grp[k].toLowerCase()).join(grp[0].toLowerCase());
  return s;
};

/* ── 뼈대 ───────────────────────────────────────────── */
for (const f of ["key", "title", "file"]) if (!SUBJECT[f]) err(`SUBJECT.${f} 가 없습니다.`);
if (!AREAS.length) err("AREAS 가 비어 있습니다.");
if (!UNITS.length) err("UNITS 가 비어 있습니다.");
if (!ITEMS.length) err("ITEMS 가 비어 있습니다.");

const areaIds = new Set(AREAS.map((a) => a.id));
const unitIds = new Set(UNITS.map((u) => u.id));
const catKeys = new Set(CATS.map((c) => c.key));

for (const u of UNITS) {
  if (!areaIds.has(u.area)) err(`UNIT ${u.id}: 없는 영역 '${u.area}'`);
  if (!u.cats || !u.cats.length) err(`UNIT ${u.id}: cats 가 비어 있습니다.`);
  for (const c of u.cats || []) if (!catKeys.has(c)) err(`UNIT ${u.id}: 없는 갈래 '${c}'`);
}
for (const c of CATS) {
  if (!unitIds.has(c.unit)) err(`CAT ${c.key}: 없는 단원 '${c.unit}'`);
  const owner = UNITS.find((u) => u.id === c.unit);
  if (owner && !owner.cats.includes(c.key)) err(`CAT ${c.key}: 단원 ${c.unit} 의 cats 에 없습니다 (홈 화면에 안 나옵니다).`);
}
for (const [k, m] of Object.entries(MEDIA)) {
  if (!m.title) err(`MEDIA ${k}: title 이 없습니다.`);
  if (!m.image) err(`MEDIA ${k}: image 가 없습니다.`);
}

/* ── 항목 ───────────────────────────────────────────── */
const ids = new Set();
const byId = Object.fromEntries(ITEMS.map((i) => [i.id, i]));
const nameKey = {};
for (const i of ITEMS) {
  const at = `ITEM ${i.id || "(id 없음)"}`;
  if (!i.id) err(`${at}: id 가 없습니다.`);
  else if (ids.has(i.id)) err(`${at}: id 가 중복됩니다.`);
  else ids.add(i.id);

  if (!i.name) err(`${at}: name 이 없습니다.`);
  if (!catKeys.has(i.category)) err(`${at}: 없는 갈래 '${i.category}'`);

  const feats = [...(i.features || []), ...(i.notes || [])];
  if (!feats.length && !i.media) err(`${at} (${i.name}): features 도 media 도 없어 출제되지 않습니다.`);
  for (const f of feats) {
    if (typeof f !== "string" || !f.trim()) err(`${at} (${i.name}): 빈 서술이 있습니다.`);
    else if (norm(f).includes(norm(i.name)) && norm(i.name).length >= 2)
      warn(`${at} (${i.name}): 서술 안에 이름이 그대로 들어 있어 답이 새어 나갑니다 — "${f}"`);
  }
  if (new Set(feats.map(norm)).size !== feats.length) err(`${at} (${i.name}): 같은 서술이 두 번 들어 있습니다.`);

  if (i.media) {
    if (!MEDIA[i.media]) err(`${at} (${i.name}): 없는 그림 '${i.media}'`);
    else if (MEDIA[i.media].labeled && i.num === undefined)
      err(`${at} (${i.name}): 번호가 인쇄된 그림인데 num 이 없습니다.`);
    else if (!MEDIA[i.media].labeled && !i.marker)
      err(`${at} (${i.name}): 번호 없는 그림인데 marker 가 없습니다.`);
  }
  if (i.marker && (i.marker.x === undefined || i.marker.y === undefined))
    err(`${at} (${i.name}): marker 에 x 또는 y 가 없습니다.`);

  for (const c of i.confuse || []) {
    if (!byId[c]) err(`${at} (${i.name}): confuse 가 없는 항목 '${c}' 를 가리킵니다.`);
    else if (c === i.id) err(`${at} (${i.name}): confuse 가 자기 자신을 가리킵니다.`);
  }

  const k = i.category + "/" + norm(i.name);
  if (nameKey[k]) err(`ITEM ${i.id} 와 ${nameKey[k]}: 같은 갈래에 이름이 같습니다 ('${i.name}').`);
  nameKey[k] = i.id;
}

/* ── 출제 가능성 ─────────────────────────────────────── */
const used = new Set(ITEMS.map((i) => i.category));
for (const c of CATS) if (!used.has(c.key)) warn(`CAT ${c.key} (${c.label}): 항목이 하나도 없습니다.`);

const areaOf = Object.fromEntries(CATS.map((c) => [c.key, (UNITS.find((u) => u.id === c.unit) || {}).area]));
const featsOf = (i) => [...(i.features || []), ...(i.notes || [])];

/* 5지선다는 오답 보기 4개가 필요하다. 못 채우면 보기가 줄어든 채로 나간다. */
for (const i of ITEMS) {
  if (!featsOf(i).length) continue;
  const mine = new Set(featsOf(i).map(norm));
  const others = new Set();
  for (const j of ITEMS) {
    if (j.id === i.id || norm(j.name) === norm(i.name)) continue;
    for (const f of featsOf(j)) if (!mine.has(norm(f))) others.add(norm(f));
  }
  if (others.size < 4) err(`ITEM ${i.id} (${i.name}): 오답 보기로 쓸 서술이 ${others.size}개뿐이라 5지선다가 안 됩니다.`);
  const names = ITEMS.filter((j) => j.id !== i.id && norm(j.name) !== norm(i.name)).length;
  if (names < 4) err(`ITEM ${i.id} (${i.name}): 보기로 쓸 다른 이름이 ${names}개뿐입니다.`);
}

/* 같은 서술을 여러 항목이 가지면 '설명 → 이름' 의 답이 둘이 된다.
 * 엔진이 그런 서술을 단서에서 뒤로 미루고 소유자를 보기에서 빼지만,
 * 한 항목의 서술이 전부 공유분이면 단서가 흐려진 채로 나간다. */
const owners = {};
for (const i of ITEMS) for (const f of featsOf(i)) (owners[norm(f)] = owners[norm(f)] || []).push(i.id);
for (const [f, own] of Object.entries(owners)) {
  if (own.length > 1) warn(`서술이 ${own.length}곳에 겹칩니다 (${own.join(", ")}) — "${f.slice(0, 40)}"`);
}
for (const i of ITEMS) {
  const fs = featsOf(i);
  if (fs.length && fs.every((f) => owners[norm(f)].length > 1))
    err(`ITEM ${i.id} (${i.name}): 고유한 서술이 하나도 없어 '설명 → 이름' 의 단서를 만들 수 없습니다.`);
}

/* 헷갈리는 짝은 서로를 가리키는 편이 좋다 — 한쪽만 걸어 두면 반대 방향 연습이 빠진다. */
for (const i of ITEMS)
  for (const c of i.confuse || [])
    if (byId[c] && !(byId[c].confuse || []).includes(i.id))
      warn(`ITEM ${i.id} (${i.name}) → ${c}: 반대쪽(${byId[c].name})은 이 항목을 안 가리킵니다.`);

/* ── 보고 ───────────────────────────────────────────── */
const byCat = {};
for (const i of ITEMS) byCat[i.category] = (byCat[i.category] || 0) + 1;
console.log(`${SUBJECT.title} — 항목 ${ITEMS.length} · 단원 ${UNITS.length} · 갈래 ${CATS.length}`);
for (const u of UNITS) {
  const n = u.cats.reduce((t, c) => t + (byCat[c] || 0), 0);
  const detail = u.cats.map((c) => `${(CATS.find((x) => x.key === c) || {}).label} ${byCat[c] || 0}`).join(" · ");
  console.log(`  ${u.no} ${u.title}  ${String(n).padStart(3)}   ${detail}${u.exam === false ? "   [범위 밖]" : ""}`);
}
console.log(`  서술 ${ITEMS.reduce((t, i) => t + (i.features || []).length, 0)}개` +
  ` · 덧붙임 ${ITEMS.reduce((t, i) => t + (i.notes || []).length, 0)}개` +
  ` · 그림 ${Object.keys(MEDIA).length}장`);

if (warns.length) { console.log(`\nWARN ${warns.length}`); for (const w of warns) console.log("  · " + w); }
if (errors.length) {
  console.log(`\nERROR ${errors.length}`);
  for (const e of errors) console.log("  ✗ " + e);
  process.exit(1);
}
console.log("\n계약 통과.");
