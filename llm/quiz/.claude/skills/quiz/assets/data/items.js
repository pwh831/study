/* ───────────────────────────────────────────────────────────────
 * 과목 데이터 본보기. 새 과목은 이 파일을 복사해서 채운다.
 * 엔진(index.html)은 절대 고치지 않는다 — 과목의 모든 것은 이 파일에 있다.
 * 계약은 .claude/skills/quiz/references/data-schema.md 에 적혀 있다.
 *
 * 이 본보기 그대로는 verify.js 가 ERROR 를 낸다 — 항목이 하나뿐이라 5지선다의
 * 오답 보기를 채울 수 없기 때문이다. 항목을 채우면 사라진다.
 * ─────────────────────────────────────────────────────────────── */

const SUBJECT = {
  key:   "sample",                 // localStorage 키 접두어. 과목마다 달라야 기록이 안 섞인다
  title: "본보기 퀴즈",             // 화면 제목 · 파일 제목
  lead:  "이 자리에 한 줄 설명을 씁니다.",
  eyebrow: "2026 · 본보기",        // 머리말 왼쪽 작은 글씨
  icon:  "📘",                     // 파비콘에 쓸 이모지
  file:  "본보기-퀴즈.html",        // build.py 산출물 이름
  web:   "sample-quiz-web.html",   // Artifact 발행용본 (없으면 안 만든다)

  kind: "항목",                    // "이 <항목>의 이름은?" — 갈래별로 CATS 에서 덮어쓴다
  what: "설명",                    // "…의 <설명>을 떠올려 보세요"
  writeHint: "괄호·띄어쓰기는 무시합니다",

  // 있으나 없으나 같은 말로 치는 꼬리말. 긴 것부터 지운다
  suffixes: [],
  // 표기만 다른 같은 말. 각 묶음의 첫 낱말로 모은다
  equiv: [],

  notesLabel: "덧붙임 내용 포함",
  notesHint:  "시험 범위 밖이지만 나온 적이 있는 서술입니다"
};

/* 큰 틀. 홈 화면에서 한 덩어리로 켜고 끈다 */
const AREAS = [
  { id:"basic", title:"본보기 영역" }
];

/* 학습 자료의 단원. exam:false 는 시험 범위 밖 — 자료는 두되 처음엔 선택하지 않는다 */
const UNITS = [
  { id:"u001", no:"001", title:"본보기 단원", area:"basic", cats:["alpha"] }
];

/* 세부 갈래. kind·what 으로 그 갈래의 문제문에 쓸 말을 바꾼다 */
const CATS = [
  { key:"alpha", label:"본보기 갈래", unit:"u001", kind:"용어", what:"뜻" }
];

/* 그림 단서. 쓰지 않는 과목은 빈 객체로 둔다.
 *   labeled:true  — 그림에 번호가 인쇄되어 있다. 항목은 num 을 갖는다
 *   labeled:false — 백지 그림. 항목은 marker:{x,y} (백분율) 를 갖는다 */
const MEDIA = {};

/* 항목. features 는 학습 자료 본문의 서술 = 출제 대상.
 * notes 는 각주·덧붙임이라 기본값은 출제 제외이고 홈에서 켤 때만 나온다.
 * confuse 는 시험에서 가르기 어려운 짝 — 오답 보기를 여기서 먼저 길어온다. */
const ITEMS = [
  { id:"a01", category:"alpha", name:"본보기 항목", aliases:["본보기"],
    features:["이 자리에 학습 자료의 서술을 한 문장씩 옮긴다",
              "이름을 서술 안에 그대로 쓰지 않는다 — 답이 새어 나간다"],
    notes:[], confuse:[] }
];

if (typeof module !== "undefined") { module.exports = { SUBJECT, AREAS, UNITS, CATS, MEDIA, ITEMS }; }
