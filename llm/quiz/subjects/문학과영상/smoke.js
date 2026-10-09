#!/usr/bin/env node
/* 진짜 브라우저로 산출물을 열어 한 세션을 끝까지 풀어 본다.
 *
 *     npx playwright install chromium     # 한 번만
 *     node smoke.js                       # SUBJECT.file 을 연다
 *     node smoke.js <다른 HTML>
 *
 * 빌드는 통과했는데 화면이 죽어 있던 적이 있어서 이것을 만들었다.
 * 문법 검사(build.py)는 코드가 파싱되는지만 보고, 계약 검사(verify.js)는 데이터만 본다.
 * 둘 다 통과하고도 앱이 첫 화면에서 멈출 수 있다 — 여기서만 잡힌다.
 */
const path = require("path");
const fs = require("fs");

let chromium;
try { ({ chromium } = require("playwright")); }
catch (e) { console.log("playwright 가 없어 종단 시험을 건너뜁니다 (npm i -D playwright)."); process.exit(0); }

const { SUBJECT } = require(path.join(process.cwd(), "data", "items.js"));
const target = process.argv[2] || SUBJECT.file;
if (!fs.existsSync(target)) { console.error(`${target} 가 없습니다. 먼저 python3 build.py 를 돌리세요.`); process.exit(1); }
const FILE = "file://" + path.resolve(target);
const TYPES = ["both", "write", "feat", "rfeat", "ox", "recall"];

/* 글꼴 CDN 이 막힌 곳에서도 돌아야 한다 — 바깥으로 나가는 요청의 실패는 앱의 결함이 아니다 */
const EXTERNAL = /ERR_CERT|ERR_NAME_NOT_RESOLVED|ERR_CONNECTION|ERR_INTERNET|Failed to load resource/i;

(async () => {
  const launch = {};
  for (const p of ["/opt/pw-browsers/chromium-1194/chrome-linux/chrome", "/opt/pw-browsers/chromium/chrome-linux/chrome"])
    if (fs.existsSync(p)) { launch.executablePath = p; break; }
  const browser = await chromium.launch(launch);
  const errs = [];
  const optionCounts = {};
  const seen = new Set();

  for (const t of TYPES) {
    const page = await browser.newPage({ viewport: { width: 390, height: 780 } });
    page.on("pageerror", (e) => errs.push(`[${t}] ${e}`));
    page.on("console", (m) => { if (m.type() === "error" && !EXTERNAL.test(m.text())) errs.push(`[${t}] console: ${m.text()}`); });
    await page.goto(FILE);

    const chip = await page.$(`#types .chip[data-t="${t}"]`);
    if (!chip) { errs.push(`[${t}] 유형 칩이 없습니다`); await page.close(); continue; }
    await chip.click();
    await page.click(`#counts .chip[data-n="10"]`);
    if (await page.$("#start[disabled]")) { await page.close(); continue; }   // 낼 문제가 없는 유형
    await page.click("#start");

    let step = 0;
    for (; step < 80; step++) {
      if (await page.$("#hm")) break;                       // 결과 화면
      if (await page.$("#next")) { await page.click("#next"); }
      else if (await page.$("#sub")) { seen.add("write"); await page.fill("#ans", "아무거나"); await page.click("#sub"); }
      else if (await page.$(".opt")) {
        optionCounts[await page.$$eval(".opt", (a) => a.length)] = 1;
        seen.add((await page.$(".opt.name")) ? "rfeat" : "feat");
        await page.click(".opt");
      }
      else if (await page.$("#oxyes")) { seen.add("ox"); await page.click("#oxyes"); }
      else if (await page.$("#show")) { seen.add("recall"); await page.click("#show"); }
      else if (await page.$("#got")) { await page.click("#miss"); }
      else { errs.push(`[${t}] ${step}번째에서 누를 것이 없습니다`); break; }

      if (await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)) {
        const bad = await page.evaluate(() => [...document.querySelectorAll("*")]
          .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
          .slice(0, 2).map((el) => `${el.tagName}.${el.className}: ${(el.textContent || "").slice(0, 30)}`));
        errs.push(`[${t}] 390px 에서 가로 스크롤 — ${bad.join(" / ")}`);
        break;
      }
    }
    if (!(await page.$("#hm"))) errs.push(`[${t}] ${step}단계 만에도 결과 화면에 닿지 못했습니다`);
    await page.close();
  }

  /* 진도가 새로고침을 넘어 남는지 */
  const page = await browser.newPage();
  await page.goto(FILE);
  const key = SUBJECT.key + "-v1";
  const count = () => page.evaluate((k) => Object.keys(JSON.parse(localStorage.getItem(k) || "{}")).length, key);
  await page.click("#start");
  const before = await count();
  if (await page.$("#sub")) { await page.fill("#ans", "x"); await page.click("#sub"); }
  else if (await page.$(".opt")) await page.click(".opt");
  else if (await page.$("#oxyes")) await page.click("#oxyes");
  else if (await page.$("#show")) { await page.click("#show"); await page.click("#miss"); }
  await page.waitForTimeout(80);
  await page.reload();
  const after = await count();
  if (after <= before) errs.push("새로고침 뒤 진도가 남지 않습니다");
  await page.close();
  await browser.close();

  console.log(`${SUBJECT.title} — ${path.basename(target)}`);
  console.log("  본 유형 " + [...seen].join(", "));
  console.log("  5지선다 보기 수 " + Object.keys(optionCounts).join(", "));
  console.log(`  진도 저장 ${before} → ${after}`);
  if (Object.keys(optionCounts).some((k) => k !== "5")) errs.push("보기가 5개가 아닌 문제가 있습니다");
  for (const t of ["write", "feat", "rfeat", "ox", "recall"]) if (!seen.has(t)) errs.push(`${t} 유형이 한 번도 안 나왔습니다`);

  if (errs.length) { console.log(`\n실패 ${errs.length}건`); errs.forEach((e) => console.log("  ✗ " + e)); process.exit(1); }
  console.log("\n종단 시험 통과.");
})();
