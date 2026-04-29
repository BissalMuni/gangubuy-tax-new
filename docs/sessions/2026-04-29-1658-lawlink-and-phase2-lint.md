---
date: 2026-04-29
time: "16:58"
session_id: 2026-04-29-1658
title: "LawLink 컴포넌트 + Phase 2 lint (LawLink 무결성, markdown 우회 차단, inline-table ratchet) + Table 5 + CI 게이트"
slug: "lawlink-and-phase2-lint"
tags: [mdx, lawlink, lint, ratchet, phase-2, ci, components, zod]
commits:
  - 46e319b feat(content) replace 1085 raw <a href> law links with <LawLink> component
  - d57eaca chore(content) add mdx:lint with no-raw-law-link rule
  - 6d941e7 chore(content) add 3 LawLink integrity lint rules
  - 409f54e chore(content) close markdown-link bypass of LawLink
  - 021dca6 ci gate PRs on content:check + mdx:lint
  - 3eb7113 chore(content) ratchet inline-styled tables toward zero (lean MDX)
  - 8d0c0c8 feat(content) extract 고급주택 복합 중과 table to data + component
files_changed:
  - path: lib/content/law-link-schema.ts
    change: created
    summary: LawName enum (17종) + ArticleId regex + zod props 스키마
  - path: components/mdx/LawLink.tsx
    change: created
    summary: RSC 컴포넌트, render 시점 zod parse로 잘못된 props 차단
  - path: components/mdx/LuxuryOverlapTable.tsx
    change: created
    summary: Table 5 (4-col / 3-row 고급주택 복합 중과) RSC 컴포넌트
  - path: content/data/luxury-overlap-rates.ts
    change: created
    summary: Table 5 데이터 + zod row 스키마 (PercentLike "+" 허용)
  - path: scripts/analyze-law-links.ts
    change: created
    summary: 1085 anchor 인벤토리 + 비-법령 외부 링크 분리 스크립트
  - path: scripts/convert-law-links.ts
    change: created
    summary: --apply 플래그 자동 변환 (1085/1085, JSX 인라인 0, unknown law 0)
  - path: scripts/verify-law-links.ts
    change: created
    summary: capture/verify 모드, 1:1 href multiset 비교
  - path: scripts/lint-mdx.ts
    change: created
    summary: rule registry pattern + 6개 규칙 + ratchet --update-baseline 플래그
  - path: scripts/lint-mdx-baseline.json
    change: created
    summary: 46 dirty 파일 / 225→224 inline 표 카운트 baseline
  - path: .github/workflows/content-validation.yml
    change: created
    summary: PR 게이트 — content:check + mdx:lint, content/lib/components 경로 변경 시
  - path: components/mdx/index.tsx
    change: modified
    summary: LawLink + LuxuryOverlapTable mdxComponents 등록
  - path: 95 MDX files
    change: modified
    summary: 1085 raw <a href> → <LawLink> + 7 markdown link → <LawLink> + Table 5 추출
  - path: content/MDX_GUIDELINES.md
    change: modified
    summary: §4.1-4.4 LawLink 사용 의무, §13 lint 섹션 신설 (5규칙 + ratchet 운용법)
  - path: package.json
    change: modified
    summary: mdx:lint, mdx:lint:update-baseline 스크립트
related_sessions:
  - 2026-04-29-1500-lean-mdx-zod-phase0
---

# LawLink 컴포넌트 + Phase 2 lint + Table 5 + CI

## 🎯 목표

Phase 0 (zod frontmatter 검증)에 이어, 본격 **Phase 1+2** 통합 진행:
1. **LawLink 컴포넌트화** — 1085 raw `<a>` 앵커를 typed 컴포넌트로 일괄 전환
2. **Phase 2 lint** — 회귀 차단 (raw `<a>`, markdown link, 무결성, 인라인 표 증가)
3. **Table 5** — 고급주택 복합 중과 컴포넌트 추출 (multi-house 마지막 인라인 rate 표)
4. **CI 게이트** — PR에서 자동 검증

## 📖 배경

직전 세션(2026-04-29-1500)에서:
- 모든 frontmatter이 zod 스키마 통과 (120/120)
- 첫 vertical slice 2개 (`AdjustmentAreaTable`, `MultiHouseRatesTable`) 완료
- 95개 파일에 흩어진 1085 raw `<a href="https://law.go.kr/...">` 앵커가 다음 마이그레이션 대상으로 식별됨

이번 세션은 그 LawLink 슬라이스를 마치고, **회귀를 만든 만큼 즉시 lint로 잠그는** Phase 2를 시작.

## 🔍 진행 과정

### 1. LawLink 슬라이스 (commit 46e319b)

**Step 1 — 인벤토리** (`scripts/analyze-law-links.ts`):
- 총 1101 `<a>` 태그
- 1085 law.go.kr 계열 (1070 + 15 www 변형)
- 14 fragment anchor (`#section-id`) — 변환 대상 아님
- 2 외부 링크 (행안부·복지부) — 그대로 둠
- **법명 17종**: 지방세법(440), 지방세특례제한법(353), 지방세법시행령(180), … 5개 단발

**Step 2 — 스키마 + 컴포넌트**:
- `lib/content/law-link-schema.ts`: `LawName` enum, `ArticleId` regex (`제\d+조(의\d+)?`), `buildLawHref`
- `components/mdx/LawLink.tsx`: 렌더 시점 `LawLinkPropsSchema.parse({law, article})` — 잘못된 enum 값은 첫 페이지 로드 시 throw

**Step 3 — 자동 변환**:
- `scripts/convert-law-links.ts --apply`: 1085/1085 깔끔 변환, JSX 인라인 0, unknown law 0, malformed article 0
- 변환 패턴: `<a href="https://law.go.kr/법령/지방세법/제10조" target="_blank" rel="noopener noreferrer">지방세법 §10</a>` → `<LawLink law="지방세법" article="제10조">지방세법 §10</LawLink>`

**Step 4 — 검증** (`scripts/verify-law-links.ts`):
- `capture` 모드 → baseline 1085 hrefs
- `verify` 모드 → 변환 후 LawLink hrefs 1085, **multiset diff = 0** (missing 0, extra 0)
- dev 서버: childbirth 페이지 3개 / multi-house 페이지 26개 LawLink 정상 렌더

**Step 5 — 가이드 갱신**: §4.1-4.4 (`<LawLink>` 사용 의무), §9.2 (직접 URL 작성 deprecate)

### 2. Phase 2 lint Unit 1 — `no-raw-law-link` (commit d57eaca)

방금 변환한 1085 앵커가 다시 raw `<a>`로 회귀하지 않도록 lint 게이트 추가.

- `scripts/lint-mdx.ts`: rule registry 패턴 (`(file, raw) => Issue[]`)
- 첫 규칙: `no-raw-law-link` — `<a href="https?://(?:www\.)?law\.go\.kr/...">` 정규식 매치 시 fail
- file:line:column 보고, exit 1
- `npm run mdx:lint`: 120 파일 / 0 violations

**Negative test**: childbirth-housing 한 줄을 raw `<a>`로 임시 되돌림 → 정확한 위치(63:75) 짚어내고 exit 1 → 즉시 복원

### 3. Phase 2 lint Unit 2 — LawLink 무결성 3규칙 (commit 6d941e7)

런타임 zod parse는 **그 페이지가 로드되어야** 발화하는 약점 — 빌드/lint 시점에도 잡히도록 미러:

- `lawlink-valid-law`: `law=` 값이 `LawName` enum 내인지
- `lawlink-valid-article`: `article=` 값이 `^제\d+조(의\d+)?$` 매치인지
- `lawlink-non-empty-children`: `<LawLink>...</LawLink>` 본문 비어있지 않은지

**Negative test**: `<LawLink law="지방세범" article="제10">` 한 줄 주입 → 두 규칙(`lawlink-valid-law`, `lawlink-valid-article`)이 같은 줄 63:75에서 각각 다른 메시지로 짚음 → exit 1

### 4. Phase 2 lint Unit 3 — markdown 우회 차단 (commit 409f54e)

`scripts/probe-rules.ts` 임시 스크립트 실행 중 발견: `[text](https://law.go.kr/...)` markdown link 7건이 luxury-v1.0.mdx에 잔존. **remark-gfm이 이를 `<a>`로 렌더해 LawLink 우회**.

7건 모두 `<LawLink>`로 변환 (markdown bold `**...**`는 JSX children 안에서도 정상):

```diff
-- **고급주택**: [시행령 §28](https://www.law.go.kr/법령/지방세법시행령/제28조)에서 정하는 기준
++ **고급주택**: <LawLink law="지방세법시행령" article="제28조">시행령 §28</LawLink>에서 정하는 기준
```

새 규칙 `no-markdown-law-link` 추가 — `\[[^\]]+\]\(https?://(?:www\.)?law\.go\.kr/[^)]+\)` 정규식.

dev 서버 검증: luxury 페이지 HTTP 200, 11 law.go.kr 링크 모두 렌더.

### 5. CI 게이트 (commit 021dca6)

`.github/workflows/content-validation.yml`:
- 트리거: PR 또는 push-to-main, 경로 한정 (`content/**`, `lib/content/**`, `components/mdx/**`, validator scripts, package.json)
- 단계: checkout → setup-node 20 → `npm ci` → `npm run content:check` → `npm run mdx:lint`
- 둘 중 하나만 실패해도 PR merge 차단

기존 `review-feedback.yml` (AI 자동수정용)과 별도 — 책임 분리.

### 6. Phase 2 lint Unit 4 — inline-table ratchet (commit 3eb7113)

**문제**: 100+ 기존 파일이 `<table style={...}>` 사용 중. Hard fail은 빌드 깨뜨림.

**진단** (`scripts/probe-inline-styles.ts`, 일회성):
- 46 dirty 파일 / 74 clean 파일
- 총 225 inline 표, 3,377 inline cell
- corp-acquisition-tax 70개 중 0개 dirty (이미 lean)
- acquisition 49개 중 46개 dirty
- 최대 dirty: housing-v1.0.mdx (25 표), multi-house-v1.0.mdx (19 표)

**전략 — Ratchet (count baseline)**:
- `scripts/lint-mdx-baseline.json`: 파일별 현재 카운트 = 천장
- 새 규칙 `no-new-inline-table`: 파일 카운트가 baseline 초과 시 fail
- 새 파일은 baseline 미등록 → 천장 0 → 인라인 표 작성 즉시 거부
- 카운트 감소(컴포넌트로 추출)는 자유, 이후 `npm run mdx:lint:update-baseline`로 천장 하향 고정
- 결과적으로 모든 dirty 파일이 점진적으로 0으로 수렴

**Negative test 2건**:
- Clean 파일(corp-heavy/01-rate)에 inline 표 1개 주입 → `1 > baseline 0` 정확히 짚음
- Dirty 파일(luxury, baseline 16)에 1개 추가 주입 → `17 > baseline 16` 정확히 짚음

### 7. Table 5 컴포넌트화 (commit 8d0c0c8)

multi-house-v1.0.mdx의 마지막 인라인 rate 표 (고급주택 복합 중과). MultiHouseRatesTable과 데이터 모델이 다름(payer/area 없는 4-col):

| 상황 | 기본 중과 | 추가 중과 | 합계 |
|---|---|---|---|
| 조정 2주택 + 고급주택 | 8% | +8% | 16% |
| 조정 3주택 + 고급주택 | 12% | +8% | 20% |
| 법인 + 고급주택 | 12% | +8% | 20% |

- `content/data/luxury-overlap-rates.ts`: 3행, `PercentLike` regex가 `+` 접두사 허용 (`/^\+?\d+(\.\d+)?%$/`)
- `components/mdx/LuxuryOverlapTable.tsx`: RSC, 합계 column 빨강(#cf1322) 일관

multi-house-v1.0.mdx: 30행 인라인 표 → `<LuxuryOverlapTable />` 1행. **Ratchet 19→18 자동 갱신** (`mdx:lint:update-baseline`).

dev 검증: HTTP 200, 3 row labels + 16% / 20%×2 모두 렌더.

## 🔑 핵심 결정

| 결정 | 선택안 | 기각안 | 이유 |
|---|---|---|---|
| LawLink law prop | enum 정식 법명 | 약칭 alias (지특법 등) | URL 자체가 정식 법명 사용 → 매핑 layer 불필요. children에서 자유롭게 약칭 표기 |
| Lint 회귀 차단 시점 | LawLink 변환 직후 | Phase 1 종료 후 일괄 | 회귀를 만든 만큼 즉시 잠금 — 신선한 baseline 활용 |
| Markdown link 처리 | 별도 슬라이스 + 별도 규칙 | no-raw-law-link 규칙 확장 | 차단 패턴이 정규식적으로 다름. 별도 규칙이 추가/유지 비용 더 낮음 |
| 인라인 표 strategy | Ratchet (count baseline) | Path whitelist / 관대한 시작 | 매뉴얼 유지 0, 새 파일 자동 strict, 진행 상황이 곧 baseline JSON |
| Table 5 분리 | 별 컴포넌트 LuxuryOverlapTable | MultiHouseRatesTable view 추가 | 데이터 모델이 다름(payer/area 없음). view 분기보다 별 컴포넌트가 단순 |
| CI 워크플로우 | 별 파일 content-validation.yml | review-feedback.yml에 step 추가 | 책임 분리: feedback은 AI가 쓰기, validation은 PR 게이트 — 트리거·권한 모두 다름 |

## 🛠️ 빌드 게이트 최종 상태

```
$ npm run mdx:lint
=== MDX lint ===
Files scanned: 120
Rules active:  6
  - no-raw-law-link
  - lawlink-valid-law
  - lawlink-valid-article
  - no-markdown-law-link
  - no-new-inline-table
  - lawlink-non-empty-children
Issues found:  0

$ npm run content:check
Total: 120  Pass: 120  Fail: 0
```

CI 통합 후 **두 검증이 PR 게이트**. `package.json` 스크립트:
- `content:check` — frontmatter zod
- `mdx:lint` — 6 rules
- `mdx:lint:update-baseline` — ratchet 천장 하향

## 📂 변경 파일 (요약)

신규 생성 (10):
- `lib/content/law-link-schema.ts` — LawName enum + zod
- `components/mdx/LawLink.tsx` — RSC 컴포넌트
- `components/mdx/LuxuryOverlapTable.tsx` — Table 5
- `content/data/luxury-overlap-rates.ts` — Table 5 데이터
- `scripts/analyze-law-links.ts` — 인벤토리
- `scripts/convert-law-links.ts` — 자동 변환
- `scripts/verify-law-links.ts` — 1:1 검증
- `scripts/lint-mdx.ts` — 6규칙 lint
- `scripts/lint-mdx-baseline.json` — ratchet 천장
- `.github/workflows/content-validation.yml` — CI 게이트

수정 (4 + 95개 MDX):
- `components/mdx/index.tsx` — LawLink, LuxuryOverlapTable 등록
- `content/MDX_GUIDELINES.md` — §4.1-4.4 + §13 lint 섹션
- `package.json` — mdx:lint, mdx:lint:update-baseline
- `.gitignore` — `_law-link-*.json` (일회성 산출물)
- 95 MDX 파일 — 1085 raw `<a>` + 7 markdown link → LawLink, multi-house Table 5 → 컴포넌트

## ✅ 완료 / 🚧 남은 것

### 완료
- [x] 1085 LawLink 변환 + 95 파일 검증
- [x] markdown link 7건 변환
- [x] 6개 lint 규칙 + negative test 모두 통과
- [x] CI 게이트
- [x] Ratchet baseline 46 파일 / 224 표 수립
- [x] Table 5 추출 (multi-house 19→18)

### 후속 과제
- [ ] **Ratchet migration drive**: 224 inline 표 → 0. 우선순위 높은 파일:
  - housing-v1.0.mdx (25 표)
  - multi-house-v1.0.mdx (남은 18 표 — 동일 세대, 가족 범위, 중위소득, 주택수 가산 등 다수 표)
  - common-v1.0.mdx (14 표)
  - luxury-v1.0.mdx (16 표)
- [ ] CI에서 첫 PR 한번 돌려서 워크플로우 동작 검증
- [ ] **추가 lint 규칙 후보** (probe 시점 0건 / 추가 ROI):
  - SectionNav id ↔ h2 id 미스매치 검출
  - heading hierarchy (H1 1개, H2/H3 skip 검출)
  - frontmatter `last_updated`이 git mtime과 너무 차이나면 경고
- [ ] 다음 vertical slice 후보:
  - 일시적 2주택 표
  - 동일 세대 판단 기준 표
  - 분양권/입주권 표

## 💡 인사이트

1. **회귀 차단을 변환 직후 만들면 baseline이 신선하다.** 1085 → 0이 자명한 시점이라 lint 첫 도입 비용이 거의 0. 시간이 지나면 "현재 위반이 정상인지 회귀인지" 판단 자체가 어려워진다.

2. **AI가 만들 수 있는 회귀 경로 다수**: raw `<a>`만 막으면 끝나는 줄 알았으나 markdown link라는 다른 표면이 있었음. 컴포넌트 enum 검증도 lint로 미러링 — 런타임만 의존하면 그 페이지 로드되기 전엔 모름.

3. **Ratchet은 점진 마이그레이션의 표준 도구**: 한 번에 100+개 변환 불가능할 때, baseline JSON만 두면 코드 한 줄도 안 잡고 천장 하향 가능. 진행률이 곧 진단.

4. **컴포넌트 분리 기준**: MultiHouseRatesTable view 분기 vs 새 컴포넌트의 트레이드오프. 데이터 모델이 같으면 view 분기, 다르면 별 컴포넌트. Table 5는 후자.

5. **Negative test의 가치**: 모든 lint 규칙에 회귀 한 줄 주입 → 정확한 위치 짚는지 → 즉시 복원 패턴. lint가 "발화"하는 걸 본 다음에야 안심하고 commit. silent pass는 신뢰할 수 없다.

## 🔗 관련 문서

- [content/MDX_GUIDELINES.md](../../content/MDX_GUIDELINES.md) §4 LawLink, §13 Lint
- [선행 세션: Phase 0](./2026-04-29-1500-lean-mdx-zod-phase0.md)
