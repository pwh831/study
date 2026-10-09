# study

흩어져 있던 공부·개발 저장소를 용도별로 모은 곳입니다.
각 폴더는 원래 저장소의 커밋 기록을 그대로 가져왔습니다(`git subtree`).

```
study/
├── academic/          학업 — 과목·시험 공부용 앱
│   ├── jiri/            2026 지역이해 지도 기반 암기 퀴즈
│   ├── japan/           일본어 회화 단어·표현·활용 시험
│   └── regular/         공부 홈, 복습 플래너, 오답 코치, 영단어, 경제, 문학과 영상
├── llm/               LLM — Claude 스킬과 도구
│   ├── quiz/            교과 암기 퀴즈를 만드는 `quiz` 스킬 (+ 첫 과목 예시: 문학과영상)
│   └── skills/          범용 스킬: critique, grill-me, grilling, log
└── projects/          그 밖의 개인 프로젝트
    └── alarm/           FitWake — 운동해야 꺼지는 알람 (Android · iOS · 웹)
```

## 분류 기준

- **academic**: 특정 과목이나 시험을 공부하려고 만든 앱. 안에서 Claude로 출제·채점하더라도 목적이 공부면 여기에 둡니다.
- **llm**: 과목과 상관없이 Claude에게 일하는 방식을 가르치는 스킬·도구.
- **projects**: 둘 다 아닌 것.

## 원래 저장소

| 폴더 | 원래 저장소 | 가져온 브랜치 |
|---|---|---|
| `academic/jiri` | [pwh831/Jiri](https://github.com/pwh831/Jiri) | `claude/geography-quiz-program-enf1g6` |
| `academic/japan` | [pwh831/Japan](https://github.com/pwh831/Japan) | `claude/japanese-exam-vocab-test-r4ldro` |
| `academic/regular` | [pwh831/Regular](https://github.com/pwh831/Regular) | `claude/daily-automation-recommendations-bg7y89` |
| `llm/quiz` | [pwh831/Quiz](https://github.com/pwh831/Quiz) | `claude/geography-japanese-quiz-skill-fc7hp0` |
| `projects/alarm` | [pwh831/Alarm](https://github.com/pwh831/Alarm) | `main` |

`llm/skills/`는 Japan 저장소의 `.claude/skills/`에 있던 범용 스킬 네 개를 옮겨 온 것입니다.

## 알아 둘 점

- 원래 저장소는 그대로 남아 있습니다. 발행된 앱 링크(claude.ai artifact)와 GitHub Pages는 계속 원래 저장소 기준입니다.
- `projects/alarm/.github/workflows/`의 CI·Pages 워크플로는 하위 폴더에 있어서 이 저장소에서는 돌지 않습니다.
- 스킬은 저장소 루트의 `.claude/skills/`에 있어야 Claude Code가 자동으로 잡습니다. 쓰려면 원하는 스킬 폴더를 그쪽으로 복사하세요.
