/* 문학과 영상 — 암기 데이터
 *
 * ⚠️ 출처에 관하여
 * 이 데이터는 **2022 개정 교육과정 「문학과 영상」의 표준 용어**로 채운 것이고,
 * 사용자의 학습지나 교과서를 보고 옮긴 것이 아니다. 개념과 정의는 교과서 공통이지만
 * 표현·단원 구분·시험 범위는 학교마다 다르다. 학습지를 받으면 그 문장으로 갈아 끼우고
 * 범위 밖 단원에 exam:false 를 달아야 한다. README 의 '범위와 출처'를 함께 고친다.
 *
 * features : 출제 대상 서술. 항목당 2~4개, 그 항목에만 해당하는 문장으로.
 * notes    : 심화·덧붙임. 기본 출제 제외, 홈 화면에서 켤 때만 나온다.
 * confuse  : 시험에서 가르기 어려운 짝. 오답 보기를 여기서 먼저 길어온다.
 */

const SUBJECT = {
  key:   "munhak-yeongsang",
  title: "문학과 영상",
  lead:  "영상 언어와 서사, 각색과 비평의 용어를 다섯 방향으로 외웁니다.",
  eyebrow: "2026 · 문학과 영상",
  icon:  "🎬",
  file:  "문학과영상-퀴즈.html",
  web:   "munhak-yeongsang-web.html",

  kind: "용어",
  what: "설명",
  writeHint: "괄호·띄어쓰기는 무시합니다 (클로즈업 = 클로즈 업 = C.U.)",

  /* 있으나 없으나 같은 말로 치는 꼬리말 */
  suffixes: ["기법", "효과"],
  /* 표기만 다른 같은 말 — 각 묶음의 첫 낱말로 모은다 */
  equiv: [["쇼트", "숏", "샷"], ["미장센", "미쟝센"], ["몽타주", "몽타쥬"], ["시퀀스", "시퀜스"]],

  notesLabel: "심화 내용 포함",
  notesHint:  "교과서 본문 밖의 덧붙임입니다. 기본값은 꺼짐"
};

const AREAS = [
  { id:"visual", title:"영상 언어" },
  { id:"story",  title:"문학과 영상의 서사" },
  { id:"make",   title:"매체 전환과 창작" },
  { id:"read",   title:"수용과 비평" }
];

const UNITS = [
  { id:"u001", no:"001", title:"쇼트와 카메라",        area:"visual", cats:["shot","angle","move"] },
  { id:"u002", no:"002", title:"미장센과 화면",        area:"visual", cats:["mise","light","focus"] },
  { id:"u003", no:"003", title:"편집과 사운드",        area:"visual", cats:["edit","montage","sound"] },
  { id:"u004", no:"004", title:"서사의 요소",          area:"story",  cats:["narr","plot","pov"] },
  { id:"u005", no:"005", title:"문학과 영상의 매체 차이", area:"story", cats:["medium"] },
  { id:"u006", no:"006", title:"각색과 매체 전환",      area:"make",   cats:["adapt","script","prep"] },
  { id:"u007", no:"007", title:"감상과 비평",          area:"read",   cats:["crit","appr"] },
  { id:"u008", no:"008", title:"디지털 매체와 창작 윤리", area:"read",  cats:["digi","ethic"] }
];

const CATS = [
  { key:"shot",    label:"쇼트의 크기",   unit:"u001", kind:"쇼트" },
  { key:"angle",   label:"앵글",          unit:"u001", kind:"앵글" },
  { key:"move",    label:"카메라 움직임",  unit:"u001", kind:"기법" },
  { key:"mise",    label:"미장센",        unit:"u002", kind:"용어" },
  { key:"light",   label:"조명과 색",     unit:"u002", kind:"용어" },
  { key:"focus",   label:"초점과 구도",   unit:"u002", kind:"용어" },
  { key:"edit",    label:"편집의 단위와 이음", unit:"u003", kind:"용어" },
  { key:"montage", label:"몽타주",        unit:"u003", kind:"용어" },
  { key:"sound",   label:"사운드",        unit:"u003", kind:"용어" },
  { key:"narr",    label:"인물과 갈등",   unit:"u004", kind:"용어" },
  { key:"plot",    label:"플롯과 구성",   unit:"u004", kind:"용어" },
  { key:"pov",     label:"시점과 서술",   unit:"u004", kind:"시점" },
  { key:"medium",  label:"매체의 차이",   unit:"u005", kind:"항목",   what:"내용" },
  { key:"adapt",   label:"각색의 전략",   unit:"u006", kind:"용어" },
  { key:"script",  label:"시나리오 용어", unit:"u006", kind:"표시",   what:"뜻" },
  { key:"prep",    label:"기획 단계",     unit:"u006", kind:"글" },
  { key:"crit",    label:"비평의 관점",   unit:"u007", kind:"관점" },
  { key:"appr",    label:"감상과 비평문", unit:"u007", kind:"용어" },
  { key:"digi",    label:"디지털 매체",   unit:"u008", kind:"용어" },
  { key:"ethic",   label:"창작 윤리",     unit:"u008", kind:"용어" }
];

/* 이 과목은 그림 단서를 쓰지 않는다. 교과서 화면 사진을 넣고 싶으면
 * assets/ 에 그림을 두고 여기에 등록한 뒤 항목에 media 를 단다. */
const MEDIA = {};

const ITEMS = [

  /* ───────── 001 쇼트와 카메라 ───────── */

  /* 쇼트의 크기 */
  { id:"sh01", category:"shot", name:"익스트림 롱 쇼트", aliases:["E.L.S.","엑스트림 롱 쇼트"],
    features:["아주 먼 거리에서 넓은 공간 전체를 한 화면에 담는다",
              "인물이 아주 작게 보여 배경이나 상황에 압도된 느낌을 준다",
              "자연의 크기나 전투의 규모처럼 큰 덩어리를 드러낼 때 쓴다"],
    confuse:["sh02","sh10"] },

  { id:"sh02", category:"shot", name:"롱 쇼트", aliases:["L.S."],
    features:["인물의 전신과 그를 둘러싼 배경이 함께 들어오는 크기다",
              "인물이 어떤 공간에 어떻게 놓여 있는지를 보여 준다"],
    confuse:["sh01","sh03"] },

  { id:"sh03", category:"shot", name:"풀 쇼트", aliases:["F.S."],
    features:["머리끝부터 발끝까지가 화면에 꽉 차게 잡힌다",
              "몸짓이나 춤처럼 동작 전체를 보여 줄 때 쓴다"],
    confuse:["sh02","sh04"] },

  { id:"sh04", category:"shot", name:"미디엄 쇼트", aliases:["M.S."],
    features:["허리 위쪽까지를 담는 크기다",
              "표정과 손짓을 함께 볼 수 있어 대화 장면의 기본이 된다"],
    confuse:["sh03","sh05"] },

  { id:"sh05", category:"shot", name:"바스트 쇼트", aliases:["B.S."],
    features:["가슴 위쪽까지를 담는 크기다",
              "뉴스 진행자나 인터뷰 화면의 기본 크기로 쓰인다"],
    confuse:["sh04","sh06"] },

  { id:"sh06", category:"shot", name:"클로즈업", aliases:["클로즈 업","C.U."],
    features:["얼굴이나 사물의 한 부분을 화면에 가득 채워 보여 준다",
              "미세한 표정 변화나 감정의 고조를 강조할 때 쓴다",
              "관객의 시선을 한 곳에 묶어 다른 것을 못 보게 한다"],
    confuse:["sh05","sh07"] },

  { id:"sh07", category:"shot", name:"익스트림 클로즈업", aliases:["E.C.U.","익스트림 클로즈 업"],
    features:["눈·입술·손끝처럼 아주 작은 부분만 화면에 남긴다",
              "긴장을 극도로 끌어올리거나 숨겨 둔 단서를 콕 짚을 때 쓴다"],
    confuse:["sh06"] },

  { id:"sh08", category:"shot", name:"투 쇼트", aliases:["2 쇼트"],
    features:["두 인물을 한 화면에 나란히 담는다",
              "둘 사이의 관계와 거리감이 화면의 간격으로 그대로 드러난다"],
    confuse:["sh09"] },

  { id:"sh09", category:"shot", name:"오버 더 숄더 쇼트", aliases:["O.S.","오버더숄더"],
    features:["한 인물의 어깨 너머로 맞은편 인물을 잡는다",
              "대화 장면에서 두 사람을 번갈아 보여 줄 때 짝으로 쓴다"],
    confuse:["sh08"] },

  { id:"sh10", category:"shot", name:"설정 쇼트", aliases:["익스테블리싱 쇼트","이스태블리싱 쇼트"],
    features:["장면의 첫머리에 놓여 어디서 언제 벌어지는 일인지 알려 준다",
              "이어질 장면의 공간적 틀을 관객에게 미리 심어 준다"],
    confuse:["sh01"] },

  /* 앵글 */
  { id:"an01", category:"angle", name:"아이 레벨", aliases:["수평 앵글","아이레벨 쇼트"],
    features:["카메라가 인물의 눈높이에 놓인다",
              "과장 없이 중립적이고 객관적으로 보이게 한다"],
    confuse:["an02","an03","an06"] },

  { id:"an02", category:"angle", name:"하이 앵글", aliases:["부감","부감 쇼트"],
    features:["카메라가 위에서 아래로 내려다보며 찍는다",
              "대상이 작고 약해 보여 무력함이나 고립감을 준다"],
    confuse:["an01","an03","an04","an05"] },

  { id:"an03", category:"angle", name:"로우 앵글", aliases:["앙각","앙각 쇼트"],
    features:["카메라가 아래에서 위로 올려다보며 찍는다",
              "대상이 크고 위압적으로 보여 권위나 공포를 느끼게 한다"],
    confuse:["an01","an02","an05"] },

  { id:"an04", category:"angle", name:"버즈 아이 뷰", aliases:["조감","조감 쇼트","버드 아이 뷰"],
    features:["새가 내려다보듯 아주 높은 곳에서 거의 수직으로 찍는다",
              "인물이 운명에 놓인 점처럼 보이고 공간의 배치가 한눈에 들어온다"],
    confuse:["an02"] },

  { id:"an05", category:"angle", name:"더치 앵글", aliases:["경사 앵글","사각 앵글"],
    features:["카메라를 기울여 수평선이 비스듬하게 찍힌다",
              "불안이나 혼란, 균형이 깨진 심리를 드러낸다"],
    confuse:["an02","an03"] },

  { id:"an06", category:"angle", name:"시점 쇼트", aliases:["P.O.V.","POV 쇼트"],
    features:["등장인물의 눈이 된 것처럼 그 자리에서 본 것을 보여 준다",
              "관객이 그 인물의 감각에 직접 들어가 함께 보게 만든다"],
    confuse:["an01"] },

  /* 카메라 움직임 */
  { id:"mv01", category:"move", name:"팬", aliases:["패닝","팬 쇼트"],
    features:["카메라의 자리는 그대로 두고 좌우로 돌리며 찍는다",
              "넓은 공간을 훑거나 옆으로 움직이는 대상을 따라갈 때 쓴다"],
    confuse:["mv02"] },

  { id:"mv02", category:"move", name:"틸트", aliases:["틸팅","틸트 쇼트"],
    features:["카메라의 자리는 그대로 두고 위아래로 움직이며 찍는다",
              "높은 건물이나 인물의 전신을 아래에서 위로 훑을 때 쓴다"],
    confuse:["mv01","mv06"] },

  { id:"mv03", category:"move", name:"달리", aliases:["달리 쇼트","돌리"],
    features:["카메라를 실은 이동차가 앞뒤로 움직이며 찍는다",
              "다가가거나 멀어지면서 공간의 깊이가 함께 변한다"],
    confuse:["mv04","mv05"] },

  { id:"mv04", category:"move", name:"트래킹", aliases:["트래킹 쇼트","이동 촬영"],
    features:["레일이나 이동 장치 위에서 피사체와 나란히 움직이며 따라간다",
              "걷거나 달리는 인물을 옆에서 계속 붙어 잡을 때 쓴다"],
    confuse:["mv03"] },

  { id:"mv05", category:"move", name:"줌", aliases:["주밍","줌 인","줌 아웃"],
    features:["렌즈의 초점거리만 바꿔 화면 속 크기를 키우거나 줄인다",
              "카메라가 제자리에 있어 공간의 깊이는 변하지 않는다"],
    confuse:["mv03"] },

  { id:"mv06", category:"move", name:"크레인 쇼트", aliases:["크레인","크레인 촬영"],
    features:["카메라를 매단 긴 팔이 위아래·앞뒤로 크게 움직인다",
              "시야가 지상에서 공중으로 열리며 장면을 마무리할 때 자주 쓴다"],
    confuse:["mv02"] },

  { id:"mv07", category:"move", name:"핸드헬드", aliases:["핸드헬드 촬영","들고 찍기"],
    features:["삼각대 없이 손으로 들고 찍어 화면이 흔들린다",
              "현장감과 긴박함을 주어 다큐멘터리 같은 느낌을 낸다"],
    confuse:["mv08","mv09"] },

  { id:"mv08", category:"move", name:"스테디캠",
    features:["몸에 붙인 장치가 흔들림을 잡아 준다",
              "들고 움직이면서도 미끄러지듯 매끄러운 화면을 얻는다"],
    confuse:["mv07"] },

  { id:"mv09", category:"move", name:"롱 테이크", aliases:["롱테이크"],
    features:["끊지 않고 한 번에 길게 이어 찍는다",
              "시간이 잘리지 않아 실제로 그 자리에 있는 듯한 긴장이 생긴다",
              "배우의 연기와 동선이 한 번에 맞아떨어져야 해서 어렵다"],
    confuse:["mv07"] },

  /* ───────── 002 미장센과 화면 ───────── */

  { id:"ms01", category:"mise", name:"미장센",
    features:["화면 안에 무엇을 어떻게 놓을 것인가에 관한 연출 전체를 가리킨다",
              "인물·소품·조명·색·구도가 한 화면 안에서 함께 뜻을 만든다",
              "이어 붙여 뜻을 만드는 방식과 짝을 이루어 대비된다"],
    confuse:["ms02","mo01"] },

  { id:"ms02", category:"mise", name:"프레임", aliases:["화면 틀"],
    features:["화면의 네 변이 만드는 테두리를 가리킨다",
              "무엇을 담고 무엇을 잘라 낼지를 정하는 경계가 된다"],
    confuse:["ms01","ms03","ms04"] },

  { id:"ms03", category:"mise", name:"프레임 인·아웃", aliases:["프레임 인","프레임 아웃","프레임인아웃"],
    features:["인물이나 사물이 화면 밖으로 나가거나 안으로 들어오는 것이다",
              "보이지 않는 공간이 화면 너머에 있음을 느끼게 한다"],
    confuse:["ms02","ms04"] },

  { id:"ms04", category:"mise", name:"화면 밖 공간", aliases:["오프스크린","오프 스크린"],
    features:["테두리 바깥, 보이지 않지만 있다고 여겨지는 공간이다",
              "소리나 인물의 시선으로 그 존재를 알린다",
              "보여 주지 않음으로써 오히려 상상하게 만든다"],
    confuse:["ms02","ms03"] },

  { id:"ms05", category:"mise", name:"소품",
    features:["화면에 놓인 물건을 가리킨다",
              "인물의 처지·성격·시대를 말없이 드러내는 몫을 한다"],
    confuse:["ms08"] },

  { id:"ms06", category:"mise", name:"로케이션", aliases:["로케","야외 촬영"],
    features:["실제로 있는 장소를 찾아가 찍는 것이다",
              "그 공간이 지닌 분위기와 질감을 그대로 가져온다"],
    confuse:["ms07"] },

  { id:"ms07", category:"mise", name:"세트", aliases:["세트 촬영"],
    features:["필요한 공간을 지어 만들어 놓고 찍는 것이다",
              "빛과 배치를 처음부터 끝까지 통제할 수 있다"],
    confuse:["ms06"] },

  { id:"ms08", category:"mise", name:"분장",
    features:["인물의 나이·신분·상태를 겉모습으로 만들어 보여 준다",
              "말로 설명하지 않고도 그 인물이 어떤 사람인지 알게 한다"],
    confuse:["ms05"] },

  { id:"lt01", category:"light", name:"키 라이트", aliases:["주광","키라이트"],
    features:["대상에 가장 강하게 비추는 주된 빛이다",
              "그림자의 방향과 형태를 결정한다"],
    confuse:["lt02","lt03"] },

  { id:"lt02", category:"light", name:"필 라이트", aliases:["보조광","필라이트"],
    features:["주된 빛이 만든 그림자를 부드럽게 메워 주는 빛이다",
              "세기를 줄일수록 명암의 대비가 세진다"],
    confuse:["lt01","lt03"] },

  { id:"lt03", category:"light", name:"백 라이트", aliases:["역광","백라이트"],
    features:["대상의 뒤쪽에서 비춰 윤곽선을 배경에서 떼어 낸다",
              "머리카락이나 어깨선이 빛나 입체감이 생긴다"],
    confuse:["lt01","lt02"] },

  { id:"lt04", category:"light", name:"하이키 조명", aliases:["하이 키","하이키"],
    features:["화면 전체가 밝고 그림자가 옅다",
              "밝고 경쾌한 분위기를 주어 코미디나 뮤지컬에 잘 쓰인다"],
    confuse:["lt05"] },

  { id:"lt05", category:"light", name:"로키 조명", aliases:["로 키","로키"],
    features:["밝은 곳과 어두운 곳의 대비가 강하고 그림자가 짙다",
              "불안·범죄·공포의 분위기를 만들어 느와르의 전형이 되었다"],
    confuse:["lt04"] },

  { id:"lt06", category:"light", name:"색채 대비",
    features:["따뜻한 색과 차가운 색을 나란히 놓아 견주게 한다",
              "인물의 처지나 심리의 차이를 색만으로 보여 준다"],
    confuse:["lt07"] },

  { id:"lt07", category:"light", name:"색조", aliases:["톤","화면 톤"],
    features:["작품 전체를 감싸는 색의 성격을 가리킨다",
              "여러 장면을 하나의 정서로 묶어 주는 몫을 한다"],
    confuse:["lt06"] },

  { id:"fc01", category:"focus", name:"딥 포커스", aliases:["딥포커스","깊은 초점"],
    features:["앞·가운데·뒤가 모두 또렷하게 보이도록 찍는다",
              "관객이 화면 어디를 볼지 스스로 고르게 한다"],
    confuse:["fc02"] },

  { id:"fc02", category:"focus", name:"얕은 초점", aliases:["얕은 심도","쉘로우 포커스"],
    features:["한 곳만 또렷하고 나머지는 흐리게 찍는다",
              "볼 곳을 관객에게 강제로 지정한다"],
    confuse:["fc01","fc03"] },

  { id:"fc03", category:"focus", name:"랙 포커스", aliases:["포커스 이동","랙포커스"],
    features:["한 화면 안에서 또렷한 곳을 앞에서 뒤로 옮긴다",
              "끊어 붙이지 않고도 시선의 주인공을 바꾼다"],
    confuse:["fc02"] },

  { id:"fc04", category:"focus", name:"대칭 구도",
    features:["화면의 좌우가 균형을 이루도록 놓는다",
              "안정과 질서를 주지만 때로는 답답한 통제의 느낌을 준다"],
    confuse:["fc05","fc06"] },

  { id:"fc05", category:"focus", name:"삼분할 구도", aliases:["삼등분 구도","3분할 구도"],
    features:["화면을 가로세로 셋으로 나눈 선과 그 교차점에 중요한 것을 놓는다",
              "한쪽으로 치우쳐 보이지 않으면서도 자연스러운 균형을 만든다"],
    confuse:["fc04"] },

  { id:"fc06", category:"focus", name:"여백",
    features:["인물 주위를 비워 두는 것이다",
              "고립감을 주거나 그 빈자리에 무언가 올 것을 짐작하게 한다"],
    confuse:["fc04"] },

  /* ───────── 003 편집과 사운드 ───────── */

  { id:"ed01", category:"edit", name:"쇼트", aliases:["숏","샷"],
    features:["카메라가 한 번 돌아가 끊기지 않고 찍힌 최소 단위다",
              "이것이 모여 더 큰 단위를 이룬다"],
    confuse:["ed02","ed11"] },

  { id:"ed02", category:"edit", name:"신", aliases:["씬","장면"],
    features:["같은 장소, 같은 시간에서 벌어지는 사건의 한 덩어리다",
              "장소나 시간이 바뀌면 여기서 끊긴다"],
    confuse:["ed01","ed03"] },

  { id:"ed03", category:"edit", name:"시퀀스",
    features:["여러 장면이 모여 하나의 사건이 시작되고 끝나는 큰 단위다",
              "이야기의 한 단락에 해당한다"],
    confuse:["ed02"] },

  { id:"ed04", category:"edit", name:"컷", aliases:["커트"],
    features:["앞 화면과 뒷 화면을 다른 장치 없이 곧바로 이어 붙인다",
              "가장 기본이 되는 이음이어서 가장 많이 쓰인다"],
    confuse:["ed05","ed09","ed12"] },

  { id:"ed05", category:"edit", name:"디졸브",
    features:["앞 화면이 사라지면서 뒷 화면이 겹쳐 떠오른다",
              "시간이 흘렀거나 두 장면이 이어져 있음을 부드럽게 알린다"],
    confuse:["ed04","ed08"] },

  { id:"ed06", category:"edit", name:"페이드인", aliases:["페이드 인"],
    features:["검은 화면에서 서서히 밝아지며 화면이 나타난다",
              "이야기나 한 단락이 열리는 자리에 쓴다"],
    confuse:["ed07"] },

  { id:"ed07", category:"edit", name:"페이드아웃", aliases:["페이드 아웃"],
    features:["화면이 서서히 어두워지며 사라진다",
              "이야기나 한 단락이 닫히는 자리에 쓴다"],
    confuse:["ed06"] },

  { id:"ed08", category:"edit", name:"와이프",
    features:["뒷 화면이 앞 화면을 밀어내듯 닦아 내며 바뀐다",
              "화면이 바뀌는 것을 일부러 드러내 보이는 이음이다"],
    confuse:["ed05"] },

  { id:"ed09", category:"edit", name:"점프 컷", aliases:["점프컷"],
    features:["이어지는 두 화면 사이의 일부를 잘라 내 시간이 툭 건너뛴 듯 보인다",
              "어색함을 일부러 남겨 인물의 불안이나 조급함을 드러낸다"],
    confuse:["ed04","ed10"] },

  { id:"ed10", category:"edit", name:"매치 컷", aliases:["매치컷"],
    features:["앞뒤 화면에 모양·움직임·소리가 닮은 것을 두고 이어 붙인다",
              "전혀 다른 시간과 공간을 눈에 거슬리지 않게 잇는다"],
    confuse:["ed09","ed11","ed12"] },

  { id:"ed11", category:"edit", name:"180도 법칙", aliases:["180도 규칙","가상선 법칙"],
    features:["두 인물을 잇는 가상의 선을 넘지 않는 쪽에서만 찍는 규칙이다",
              "어기면 인물이 바라보는 방향이 뒤집혀 관객이 혼란스러워진다"],
    confuse:["ed01","ed10"] },

  { id:"ed12", category:"edit", name:"인서트", aliases:["인서트 쇼트"],
    features:["장면 중간에 사물이나 작은 부분을 짧게 끼워 넣은 화면이다",
              "단서를 짚어 주거나 인물의 심리를 대신 말해 준다"],
    confuse:["ed04","ed10"] },

  { id:"mo01", category:"montage", name:"몽타주",
    features:["따로 찍은 화면을 이어 붙여 각각에는 없던 새 뜻을 만들어 내는 방식이다",
              "뜻이 화면 자체가 아니라 화면과 화면 사이에서 생긴다고 본다"],
    confuse:["ms01","mo02","mo07"] },

  { id:"mo02", category:"montage", name:"쿨레쇼프 효과", aliases:["쿨레쇼프"],
    features:["같은 표정의 얼굴도 뒤에 무엇을 붙이느냐에 따라 배고픔·슬픔·욕망으로 달리 읽힌다",
              "뜻은 찍힌 것이 아니라 붙임에서 생긴다는 것을 보여 준 실험이다"],
    confuse:["mo01"] },

  { id:"mo03", category:"montage", name:"교차 편집", aliases:["크로스 커팅","교차편집"],
    features:["다른 곳에서 같은 시간에 벌어지는 두 사건을 번갈아 보여 준다",
              "두 사건이 곧 만나리라는 기대로 긴장을 키운다"],
    confuse:["mo04"] },

  { id:"mo04", category:"montage", name:"평행 편집", aliases:["평행편집"],
    features:["시간이 다르거나 서로 상관없는 두 이야기를 나란히 놓는다",
              "두 이야기를 견주어 읽게 만드는 것이 목적이다"],
    confuse:["mo03"] },

  { id:"mo05", category:"montage", name:"플래시백", aliases:["회상 장면"],
    features:["지금의 흐름을 끊고 이전에 있었던 일을 보여 준다",
              "인물이 왜 그렇게 행동하는지를 뒤늦게 알려 준다"],
    confuse:["mo06"] },

  { id:"mo06", category:"montage", name:"플래시포워드", aliases:["플래시 포워드"],
    features:["앞으로 벌어질 일을 미리 짧게 보여 준다",
              "결말을 먼저 알려 주고 어쩌다 그렇게 되었는지를 따라가게 만든다"],
    confuse:["mo05"] },

  { id:"mo07", category:"montage", name:"내러티브 몽타주", aliases:["시간 압축 몽타주"],
    features:["긴 시간에 걸친 과정을 짧은 화면 여럿으로 압축해 보여 준다",
              "훈련이나 성장처럼 지루해질 대목을 빠르게 넘기는 데 쓴다"],
    confuse:["mo01"] },

  { id:"sd01", category:"sound", name:"디제시스 사운드", aliases:["화면 안 소리","내재음","디에게시스 사운드"],
    features:["이야기 세계 안에서 나는 소리다",
              "등장인물도 함께 들을 수 있는 소리다"],
    confuse:["sd02"] },

  { id:"sd02", category:"sound", name:"비디제시스 사운드", aliases:["화면 밖 소리","외재음","논디제시스 사운드"],
    features:["이야기 세계 바깥에서 덧붙인 소리다",
              "등장인물은 듣지 못하고 관객만 듣는다",
              "분위기를 깔아 주는 배경 음악이 대표적이다"],
    confuse:["sd01","sd03"] },

  { id:"sd03", category:"sound", name:"보이스오버", aliases:["보이스 오버","V.O."],
    features:["화면에 보이지 않는 사람의 목소리가 화면 위에 얹힌다",
              "회상이나 속마음처럼 눈으로 볼 수 없는 것을 전한다"],
    confuse:["sd02","sd04"] },

  { id:"sd04", category:"sound", name:"내레이션",
    features:["이야기를 바깥에서 풀어 설명하는 말이다",
              "문학의 서술자가 하던 몫을 소리로 대신한다"],
    confuse:["sd03"] },

  { id:"sd05", category:"sound", name:"사운드 브리지", aliases:["사운드브리지"],
    features:["앞 장면의 소리가 뒷 장면까지 이어지거나 뒷 장면의 소리가 먼저 들어온다",
              "두 장면을 소리로 이어 끊긴 느낌을 지운다"],
    confuse:["sd06"] },

  { id:"sd06", category:"sound", name:"음향 효과", aliases:["효과음"],
    features:["발소리나 문소리처럼 상황을 실감 나게 만드는 소리다",
              "보이지 않는 곳에서 무슨 일이 벌어지는지 알려 주기도 한다"],
    confuse:["sd05","sd07"] },

  { id:"sd07", category:"sound", name:"침묵",
    features:["소리를 일부러 없애 긴장이나 충격을 만든다",
              "인물이 세상과 끊어진 상태를 소리의 부재로 드러낸다"],
    confuse:["sd06"] },

  /* ───────── 004 서사의 요소 ───────── */

  { id:"nr01", category:"narr", name:"평면적 인물", aliases:["정적 인물"],
    features:["처음부터 끝까지 성격이 달라지지 않는 인물이다"],
    notes:["성격이 한결같아 이야기의 축을 잡아 주는 몫을 하기도 한다"],
    confuse:["nr02"] },

  { id:"nr02", category:"narr", name:"입체적 인물", aliases:["동적 인물"],
    features:["사건을 겪으며 성격이나 생각이 달라지는 인물이다",
              "변화 그 자체가 이야기의 뜻이 되는 경우가 많다"],
    confuse:["nr01"] },

  { id:"nr03", category:"narr", name:"전형적 인물",
    features:["어떤 집단이나 계층의 공통된 성격을 대표하는 인물이다",
              "그 시대가 어떠했는지를 한 사람으로 보여 준다"],
    confuse:["nr04"] },

  { id:"nr04", category:"narr", name:"개성적 인물",
    features:["그 사람만의 독특한 성격을 지닌 인물이다",
              "어느 무리로도 묶이지 않아 오래 기억에 남는다"],
    confuse:["nr03"] },

  { id:"nr05", category:"narr", name:"배경",
    features:["사건이 일어나는 때와 곳을 가리킨다",
              "그 시대의 분위기나 사회의 모습까지 아우른다",
              "인물의 처지와 사건의 방향을 결정짓는 힘이 된다"],
    confuse:["nr06"] },

  { id:"nr06", category:"narr", name:"갈등",
    features:["서로 맞서는 두 힘이 부딪치는 것이다",
              "이것이 자라나고 풀리는 과정이 곧 이야기의 뼈대가 된다"],
    confuse:["nr05","nr07","nr08"] },

  { id:"nr07", category:"narr", name:"내적 갈등",
    features:["한 인물의 마음속에서 서로 다른 마음이 부딪치는 것이다",
              "영상에서는 표정이나 망설이는 동작, 독백으로 드러낸다"],
    confuse:["nr06","nr08"] },

  { id:"nr08", category:"narr", name:"외적 갈등",
    features:["인물과 그 바깥의 다른 힘 사이에서 벌어지는 부딪침이다",
              "상대는 다른 인물일 수도, 사회나 자연일 수도 있다"],
    confuse:["nr06","nr07"] },

  { id:"pl01", category:"plot", name:"플롯", aliases:["구성","짜임"],
    features:["사건을 인과 관계에 따라 짜 놓은 얼개다",
              "일어난 차례대로 늘어놓은 것과 달리 '왜'로 이어져 있다"],
    confuse:["pl02"] },

  { id:"pl02", category:"plot", name:"발단",
    features:["인물과 배경이 소개되고 사건의 실마리가 놓이는 단계다"],
    confuse:["pl01","pl03"] },

  { id:"pl03", category:"plot", name:"전개",
    features:["사건이 본격적으로 벌어지며 맞선 힘이 자라나는 단계다"],
    confuse:["pl02","pl04"] },

  { id:"pl04", category:"plot", name:"위기",
    features:["맞선 힘이 깊어지고 사건이 뒤집힐 조짐이 보이는 단계다"],
    confuse:["pl03","pl05"] },

  { id:"pl05", category:"plot", name:"절정",
    features:["맞선 힘이 가장 팽팽해지고 사건의 방향이 결정되는 단계다",
              "이야기의 주제가 가장 뚜렷하게 드러나는 자리다"],
    confuse:["pl04","pl06"] },

  { id:"pl06", category:"plot", name:"결말", aliases:["대단원"],
    features:["맞선 힘이 풀리고 인물의 운명이 정해지는 단계다"],
    confuse:["pl05"] },

  { id:"pl07", category:"plot", name:"순행적 구성", aliases:["순행 구성","추보식 구성"],
    features:["일이 벌어진 시간의 차례대로 이야기한다",
              "따라가기 쉬워 사건의 앞뒤가 헷갈리지 않는다"],
    confuse:["pl08"] },

  { id:"pl08", category:"plot", name:"역순행적 구성", aliases:["역순행 구성","역행 구성"],
    features:["시간의 차례를 뒤바꿔 나중 일을 먼저 보여 준다",
              "어쩌다 그렇게 되었는지를 궁금해하며 보게 만든다"],
    confuse:["pl07","pl09"] },

  { id:"pl09", category:"plot", name:"액자식 구성", aliases:["액자 구성"],
    features:["하나의 이야기가 다른 이야기를 감싸 안고 있는 얼개다",
              "안쪽 이야기에 사실인 듯한 무게를 실어 준다"],
    confuse:["pl08"] },

  { id:"pl10", category:"plot", name:"복선",
    features:["앞으로 벌어질 일을 미리 넌지시 깔아 두는 장치다",
              "처음 볼 때는 스쳐 지나가지만 다시 보면 눈에 들어온다"],
    confuse:["pl11"] },

  { id:"pl11", category:"plot", name:"반전",
    features:["예상과 정반대로 사건이 뒤집힌다",
              "앞에서 본 것들이 전혀 다른 뜻으로 다시 읽히게 만든다"],
    confuse:["pl10"] },

  { id:"pv01", category:"pov", name:"1인칭 주인공 시점", aliases:["일인칭 주인공 시점"],
    features:["이야기 속의 '나'가 자기 이야기를 한다",
              "주인공의 속마음이 곧바로 전해져 가깝게 느껴진다",
              "'나'가 모르는 일은 전할 수 없어 아는 범위가 좁다"],
    confuse:["pv02"] },

  { id:"pv02", category:"pov", name:"1인칭 관찰자 시점", aliases:["일인칭 관찰자 시점"],
    features:["이야기 속의 '나'가 곁에서 지켜본 다른 사람의 이야기를 한다",
              "주인공의 속마음은 겉으로 드러난 것으로 짐작할 수밖에 없다"],
    confuse:["pv01","pv03"] },

  { id:"pv03", category:"pov", name:"3인칭 관찰자 시점", aliases:["삼인칭 관찰자 시점","작가 관찰자 시점"],
    features:["바깥에 있는 이가 보이는 것과 들리는 것만 전한다",
              "인물의 마음은 말과 행동으로만 드러나 독자가 읽어 내야 한다"],
    confuse:["pv02","pv04"] },

  { id:"pv04", category:"pov", name:"전지적 작가 시점", aliases:["전지적 시점"],
    features:["바깥에 있는 이가 모든 인물의 속마음과 사건의 앞뒤를 다 알고 전한다",
              "여러 인물의 사정을 오가며 알려 줄 수 있다"],
    confuse:["pv03"] },

  { id:"pv05", category:"pov", name:"서술자",
    features:["이야기를 전하는 목소리의 주인이다",
              "작품을 쓴 사람과 같지 않으며 작가가 만들어 세운 존재다"],
    confuse:["pv06","pv07"] },

  { id:"pv06", category:"pov", name:"신빙성 없는 서술자", aliases:["믿을 수 없는 서술자"],
    features:["전하는 말을 그대로 믿을 수 없는 이다",
              "전해진 말과 실제 사이의 틈을 독자가 읽어 내야 한다"],
    confuse:["pv05"] },

  { id:"pv07", category:"pov", name:"카메라의 시선",
    features:["영상에서 이야기를 전하는 몫을 대신 맡는다",
              "무엇을 얼마나 어떤 크기로 보여 줄지로 이야기를 전한다"],
    confuse:["pv05"] },

  /* ───────── 005 문학과 영상의 매체 차이 ───────── */

  { id:"md01", category:"medium", name:"언어 기호",
    features:["뜻이 사회적 약속으로 정해져 있어 배워야 알 수 있다",
              "눈에 보이지 않는 생각과 감정을 곧바로 가리킬 수 있다"],
    confuse:["md02","md07"] },

  { id:"md02", category:"medium", name:"영상 기호",
    features:["닮음에 기대어 뜻이 전해져 배우지 않아도 대체로 알아본다",
              "여러 정보가 한 화면에 한꺼번에 담긴다"],
    confuse:["md01"] },

  { id:"md03", category:"medium", name:"내면의 표현",
    features:["글은 속마음을 그대로 적을 수 있지만 영상은 표정·행동·소리로 바꿔 보여 주어야 한다",
              "보이스오버나 독백은 이 어려움을 푸는 방법의 하나다"],
    confuse:["md04"] },

  { id:"md04", category:"medium", name:"시간의 표현",
    features:["글은 '며칠 뒤'라고 적으면 되지만 영상은 화면의 변화로 알려야 한다",
              "계절이 바뀐 풍경이나 자란 아이를 보여 주는 식으로 대신한다"],
    confuse:["md03"] },

  { id:"md05", category:"medium", name:"상상의 여지",
    features:["글은 읽는 이마다 다른 모습을 떠올리게 한다",
              "영상은 하나의 모습으로 못 박아 떠올릴 자리를 줄인다"],
    confuse:["md06"] },

  { id:"md06", category:"medium", name:"수용의 능동성",
    features:["책은 멈추고 되돌아가며 속도를 스스로 정할 수 있다",
              "상영되는 영상은 정해진 속도로 흘러가 놓친 것을 붙잡기 어렵다"],
    confuse:["md05"] },

  { id:"md07", category:"medium", name:"공동 창작",
    features:["글은 대체로 한 사람의 손에서 나온다",
              "영상은 연출·촬영·연기·편집 등 여러 사람의 손을 거쳐 완성된다"],
    confuse:["md01"] },

  /* ───────── 006 각색과 매체 전환 ───────── */

  { id:"ad01", category:"adapt", name:"각색",
    features:["이미 있는 작품을 다른 매체에 맞게 고쳐 쓰는 일이다",
              "옮기는 매체의 성격에 맞춰 덜고 보태는 판단이 따른다"],
    confuse:["ad02"] },

  { id:"ad02", category:"adapt", name:"매체 전환",
    features:["하나의 내용이 매체를 바꿔 옮겨 가는 것이다",
              "소설이 영화가 되고 웹툰이 드라마가 되는 일이 여기에 든다"],
    confuse:["ad01"] },

  { id:"ad03", category:"adapt", name:"충실한 각색", aliases:["충실성 각색"],
    features:["원작의 줄거리와 인물을 되도록 그대로 옮기려는 태도다",
              "원작을 아는 이의 기대를 지키는 대신 새로움은 줄어든다"],
    confuse:["ad04"] },

  { id:"ad04", category:"adapt", name:"변형 각색", aliases:["창조적 각색"],
    features:["원작에서 실마리만 가져오고 인물·결말·주제를 새로 짠다",
              "원작과 견주어 무엇이 왜 달라졌는지를 따져 읽게 만든다"],
    confuse:["ad03","ad09"] },

  { id:"ad05", category:"adapt", name:"생략",
    features:["원작에 있던 것을 덜어 내는 일이다",
              "정해진 상영 시간에 맞추려고 곁가지 사건부터 빼낸다"],
    confuse:["ad06"] },

  { id:"ad06", category:"adapt", name:"압축",
    features:["여러 사건이나 인물을 하나로 묶어 줄이는 일이다",
              "덜어 내지 않고도 분량을 줄일 수 있다"],
    confuse:["ad05","ad07"] },

  { id:"ad07", category:"adapt", name:"확장",
    features:["원작에 한 줄로 스친 대목을 늘려 새 장면으로 만드는 일이다",
              "짧게 적힌 것을 보여 주어야 할 때 필요해진다"],
    confuse:["ad06","ad08"] },

  { id:"ad08", category:"adapt", name:"추가",
    features:["원작에 없던 인물이나 사건을 새로 넣는 일이다",
              "오늘의 관객에게 말을 걸기 위해 쓰이는 경우가 많다"],
    confuse:["ad07"] },

  { id:"ad09", category:"adapt", name:"초점화",
    features:["원작의 여러 인물 가운데 한 사람에게 이야기의 중심을 옮기는 일이다",
              "누구의 눈으로 보느냐가 바뀌면 같은 사건도 다른 이야기가 된다"],
    confuse:["ad04"] },

  { id:"sc01", category:"script", name:"S#", aliases:["신 넘버","씬 넘버","S 샵"],
    features:["장면마다 차례로 번호를 매겨 적는 표시다",
              "촬영과 편집에서 그 장면을 부르는 이름이 된다"],
    confuse:["sc07"] },

  { id:"sc02", category:"script", name:"F.I.", aliases:["FI"],
    features:["시나리오에서 페이드인을 가리키는 약어다",
              "어둠에서 서서히 열리며 한 단락이 시작됨을 지시한다"],
    confuse:["sc03","sc04"] },

  { id:"sc03", category:"script", name:"F.O.", aliases:["FO"],
    features:["시나리오에서 페이드아웃을 가리키는 약어다",
              "서서히 어두워지며 한 단락이 닫힘을 지시한다"],
    confuse:["sc02","sc04"] },

  { id:"sc04", category:"script", name:"O.L.", aliases:["OL","오버랩"],
    features:["시나리오에서 앞 화면 위에 뒷 화면을 겹쳐 넘기라고 지시하는 약어다",
              "두 장면이 이어져 있음을 부드럽게 알리라는 뜻으로 적는다"],
    confuse:["sc02","sc03","sc07"] },

  { id:"sc05", category:"script", name:"NAR.", aliases:["NAR","나레이션 표시"],
    features:["시나리오에서 내레이션을 가리키는 약어다",
              "화면 밖에서 들리는 해설의 말을 적는 자리에 붙인다"],
    confuse:["sc06"] },

  { id:"sc06", category:"script", name:"E.", aliases:["E"],
    features:["화면에 보이지 않고 소리만 들리는 효과음이나 대사에 붙이는 표시다",
              "영어 'effect'의 첫 글자를 딴 것이다"],
    confuse:["sc05"] },

  { id:"sc07", category:"script", name:"Ins.", aliases:["INS","인서트 표시"],
    features:["시나리오에서 인서트를 가리키는 약어다",
              "장면 사이에 다른 화면을 끼워 넣으라는 지시다"],
    confuse:["sc01","sc04"] },

  { id:"sc08", category:"script", name:"지문", aliases:["지시문"],
    features:["인물의 동작·표정·말투나 장면의 분위기를 적어 지시하는 글이다",
              "현재형으로 짧게 적는 것이 관례다"],
    confuse:["sc09"] },

  { id:"sc09", category:"script", name:"대사",
    features:["인물이 입으로 하는 말이다",
              "사건을 밀고 나가면서 동시에 성격을 드러낸다"],
    confuse:["sc08"] },

  { id:"pr01", category:"prep", name:"시놉시스", aliases:["시놉"],
    features:["줄거리와 기획 의도를 한눈에 보도록 간추린 글이다",
              "만들지 말지를 판단하는 자리에 먼저 내놓는 글이다"],
    confuse:["pr02","pr05"] },

  { id:"pr02", category:"prep", name:"트리트먼트",
    features:["간추린 글과 완성된 대본 사이에 놓이는 단계다",
              "장면의 흐름을 산문으로 늘여 적어 이야기의 뼈대를 확인한다"],
    confuse:["pr01","pr03"] },

  { id:"pr03", category:"prep", name:"시나리오", aliases:["대본","각본"],
    features:["촬영을 위해 장면·대사·지시를 정해진 형식에 맞춰 적은 글이다",
              "읽는 글이 아니라 찍기 위한 설계도다"],
    confuse:["pr02","pr04"] },

  { id:"pr04", category:"prep", name:"스토리보드", aliases:["콘티","콘티뉴이티"],
    features:["장면을 그림으로 그려 화면의 크기·각도·움직임을 미리 정해 둔 것이다",
              "찍기 전에 완성된 화면을 눈으로 확인하게 해 준다"],
    confuse:["pr03"] },

  { id:"pr05", category:"prep", name:"로그라인",
    features:["작품을 한두 문장으로 압축해 무엇에 관한 이야기인지 알린다",
              "이야기의 중심이 흐려지지 않았는지 스스로 점검하는 잣대가 된다"],
    confuse:["pr01"] },

  /* ───────── 007 감상과 비평 ───────── */

  { id:"cr01", category:"crit", name:"내재적 관점", aliases:["절대론적 관점","절대주의적 관점","내재적"],
    features:["작품 안의 짜임·표현·구조만 가지고 따진다",
              "작가나 시대, 읽는 이의 반응은 끌어들이지 않는다"],
    confuse:["cr02"] },

  { id:"cr02", category:"crit", name:"외재적 관점", aliases:["외재적"],
    features:["작품을 그 바깥의 것과 이어 놓고 따진다",
              "현실·작가·독자를 각각 잣대로 삼는 세 갈래로 나뉜다"],
    confuse:["cr01","cr03"] },

  { id:"cr03", category:"crit", name:"반영론적 관점", aliases:["반영론","모방론"],
    features:["작품이 그 시대의 현실을 어떻게 비추고 있는지를 본다",
              "작품과 그것이 쓰인 시대를 나란히 놓고 읽는다"],
    confuse:["cr02","cr04","cr05"] },

  { id:"cr04", category:"crit", name:"표현론적 관점", aliases:["표현론","생산론"],
    features:["작품에 지은이의 생각·체험·의도가 어떻게 담겼는지를 본다",
              "지은이의 삶과 다른 작품을 함께 놓고 읽는다"],
    confuse:["cr03","cr05"] },

  { id:"cr05", category:"crit", name:"효용론적 관점", aliases:["효용론","수용론"],
    features:["작품이 읽는 이에게 어떤 깨달음이나 감동을 주는지를 본다",
              "같은 작품도 받아들이는 이에 따라 값이 달라진다고 본다"],
    confuse:["cr03","cr04"] },

  { id:"ap01", category:"appr", name:"감상문",
    features:["작품을 보고 받은 느낌과 생각을 자유롭게 적은 글이다",
              "판단의 근거를 꼭 갖추지 않아도 된다"],
    confuse:["ap02"] },

  { id:"ap02", category:"appr", name:"비평문",
    features:["근거를 들어 작품의 값을 따져 판단한 글이다",
              "주장과 그것을 받치는 까닭이 뚜렷해야 한다"],
    confuse:["ap01","ap05"] },

  { id:"ap03", category:"appr", name:"해석",
    features:["작품이 무엇을 말하고 있는지 그 뜻을 밝히는 일이다",
              "좋고 나쁨을 가리기에 앞서 놓이는 단계다"],
    confuse:["ap04"] },

  { id:"ap04", category:"appr", name:"평가",
    features:["작품이 얼마나 잘 되었는지 값을 매기는 일이다",
              "무엇을 잣대로 삼았는지를 함께 밝혀야 한다"],
    confuse:["ap03"] },

  { id:"ap05", category:"appr", name:"근거",
    features:["판단을 받쳐 주는 작품 속의 구체적인 대목이다",
              "이것이 없으면 취향을 말한 것에 그친다"],
    confuse:["ap02"] },

  /* ───────── 008 디지털 매체와 창작 윤리 ───────── */

  { id:"dg01", category:"digi", name:"재매개",
    features:["한 매체가 다른 매체의 형식과 내용을 끌어와 다시 담아내는 것이다",
              "새 매체는 늘 앞선 매체를 고쳐 쓰며 자리를 잡는다"],
    confuse:["dg06"] },

  { id:"dg02", category:"digi", name:"웹툰",
    features:["세로로 내려 읽도록 칸을 배치한 인터넷 연재 만화다",
              "칸 사이의 여백과 내리는 속도가 그 자체로 연출 수단이 된다"],
    confuse:["dg03","dg04"] },

  { id:"dg03", category:"digi", name:"웹소설",
    features:["짧은 회차로 나뉘어 연재된다",
              "회차 끝에 다음을 궁금하게 만드는 대목을 두는 것이 관례다"],
    confuse:["dg02"] },

  { id:"dg04", category:"digi", name:"OTT", aliases:["오티티","온라인 동영상 서비스"],
    features:["인터넷으로 영상을 골라 보는 서비스다",
              "정해진 편성 시간이 없어 보는 때를 이용자가 정한다",
              "한 번에 몰아 보는 시청 습관을 만들어 이야기의 짜임까지 바꾸었다"],
    confuse:["dg02"] },

  { id:"dg05", category:"digi", name:"원 소스 멀티 유즈", aliases:["OSMU","원소스 멀티유즈"],
    features:["하나의 원작을 여러 매체와 상품으로 펼쳐 쓰는 방식이다",
              "같은 이야기를 매체만 바꿔 되풀이해 내놓는다"],
    confuse:["dg06","dg07"] },

  { id:"dg06", category:"digi", name:"트랜스미디어", aliases:["트랜스미디어 스토리텔링"],
    features:["여러 매체가 각각 다른 조각의 이야기를 맡는다",
              "조각을 다 모아야 전체 이야기가 완성된다"],
    confuse:["dg05","dg01"] },

  { id:"dg07", category:"digi", name:"2차 창작", aliases:["이차 창작","팬픽","팬 창작"],
    features:["원작을 좋아하는 이들이 그 인물과 설정을 가져다 새로 지어낸 것이다",
              "읽는 이가 곧 짓는 이가 되는 디지털 매체의 특징을 보여 준다"],
    confuse:["dg05"] },

  { id:"et01", category:"ethic", name:"저작권",
    features:["창작한 이가 자기 작품에 대해 갖는 권리다",
              "남의 작품을 가져다 쓰려면 먼저 허락을 받아야 한다"],
    confuse:["et06","et07"] },

  { id:"et02", category:"ethic", name:"인용",
    features:["남의 글이나 화면을 밝히고 가져다 쓰는 것이다",
              "어디서 가져왔는지를 분명히 적어야 한다",
              "필요한 만큼만 가져오고 내 글이 중심이어야 한다"],
    confuse:["et03"] },

  { id:"et03", category:"ethic", name:"표절",
    features:["남의 것을 자기 것인 양 밝히지 않고 가져다 쓰는 것이다",
              "출처를 감추었다는 점에서 허락 여부와 상관없이 문제가 된다"],
    confuse:["et02","et04"] },

  { id:"et04", category:"ethic", name:"패러디",
    features:["널리 알려진 작품의 틀을 빌리되 비틀어 새 뜻을 만든다",
              "원작을 알아볼 수 있어야 비로소 성립한다",
              "원작을 비판하거나 웃음거리로 삼는 쪽으로 기운다"],
    confuse:["et03","et05"] },

  { id:"et05", category:"ethic", name:"오마주",
    features:["존경하는 작품의 한 대목을 일부러 닮게 만들어 기린다",
              "비틀기보다 기리는 마음이 앞선다는 점이 다르다"],
    confuse:["et04"] },

  { id:"et06", category:"ethic", name:"초상권",
    features:["자기 얼굴이나 모습이 함부로 찍히거나 쓰이지 않을 권리다",
              "길에서 찍은 영상을 올릴 때에도 지켜야 한다"],
    confuse:["et01"] },

  { id:"et07", category:"ethic", name:"공정 이용",
    features:["비평·교육·연구처럼 정해진 목적에 한해 허락 없이도 쓸 수 있게 한 것이다",
              "쓴 분량과 원작에 준 손해를 따져 인정 여부가 갈린다"],
    confuse:["et01"] }

];

if (typeof module !== "undefined") { module.exports = { SUBJECT, AREAS, UNITS, CATS, MEDIA, ITEMS }; }
