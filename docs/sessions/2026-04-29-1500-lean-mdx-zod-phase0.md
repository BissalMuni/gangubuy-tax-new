---
date: 2026-04-29
time: "15:00"
session_id: 2026-04-29-1500
title: "Lean MDX 아키텍처 결정 + zod 검증 인프라 (Phase 0)"
slug: "lean-mdx-zod-phase0"
tags: [mdx, architecture, zod, content-validation, contentlayer, velite, rsc, phase-0]
files_changed:
  - path: lib/content/frontmatter-schema.ts
    change: created
    summary: zod discriminatedUnion 스키마 (취득세/corp-acquisition-tax/home 3분기)
  - path: scripts/content-check.ts
    change: created
    summary: 120개 MDX frontmatter 검증 + 실패 분류 리포터
  - path: package.json
    change: modified
    summary: zod 의존성 추가 + content:check 스크립트
  - path: 11 acquisition MDX (page_range)
    change: modified
    summary: page_range를 [start, end] 튜플로 통일 ([N] 또는 [a,b,c] → [n, m])
  - path: 2 themes MDX (luxury, trade)
    change: modified
    summary: 누락 필드 source/effective_date/law_reference 추가
  - path: corp-acquisition-tax/references/00-overview-v1.0.mdx
    change: modified
    summary: 누락 source_tax_types 추가
  - path: content/home/index.mdx
    change: modified
    summary: category 추가 + camelCase → snake_case 정규화
related_sessions:
  - 2026-04-28-1655-mdx-ssr-debug-and-cleanup
---

# Lean MDX 아키텍처 결정 + zod 검증 인프라 (Phase 0)

## 🎯 목표

여러 담당자가 의견·자료를 제공하고 **AI가 콘텐츠 변환을 담당**하는 협업 프로젝트에서, MDX 콘텐츠의 **효율성·안정성을 동시에 최대화**할 아키텍처를 결정하고 그 안전망(검증)을 먼저 깐다.

## 📖 배경

전 세션([2026-04-28](./2026-04-28-1655-mdx-ssr-debug-and-cleanup.md))에서 **풍성한 MDX의 함정**을 정면으로 겪었다:
- `remark-gfm` 단일 틸드가 본문 `~`을 strikethrough로 잘못 해석 → SSR 에러
- 인라인 스타일이 잔뜩 박힌 `<table>`이 `<td>` 안에서 깨진 토큰 재생산
- `hwpx://BinData/imageN` 같은 의미 없는 참조 26줄 산재

근본 원인은 *MDX 자체*가 아니라, **MDX에 자유 JSX와 인라인 스타일을 무제한 허용한 운영 방식**임을 확인. 이번 세션에서는 그 운영 모델을 갈아엎기로 결정.

## 🔍 진행 과정

### 1. MDX 형식의 한계 분석

현재 [content/](../../content/) 120개 MDX의 실태:
- 표 한 개당 인라인 스타일 30~50개 ([multi-house-v1.0.mdx](../../content/acquisition/multi-house/multi-house-v1.0.mdx) 기준)
- [MDX_GUIDELINES.md:193-196](../../content/MDX_GUIDELINES.md#L193-L196)이 "HTML `<table>` 강제"를 규정 — 자기모순
- 데이터(세율표, 조정대상지역)와 산문이 한 파일에 엉켜 재사용 불가

대안 비교: 순수 .md / TSX / JSON·YAML / Headless CMS / Git-based CMS / 하이브리드.

### 2. "협업 + AI 작성자" 전제 재평가

사용자가 핵심 정정:

> **여러 담당자 = 내용 제공자가 여러 명. 변환은 AI가 한다. 진입장벽이 아니라 효율성 × 안정성을 보라.**

이 전제하에 평가 기준이 달라짐:
- 진입 장벽(비개발자 친화도) → **무관**
- 변환 정확도(AI가 1회에 정확히 출력 가능한가) → **중요**
- 검증(빌드 타임에 100% 거부 가능한가) → **중요**
- 격리(한 파일 깨져도 전체 안전한가) → **중요**

### 3. Lean MDX + 빌드 검증 도구 패턴

**Lean MDX**: 화이트리스트된 컴포넌트만 사용. 인라인 스타일·자유 `<table>` 금지. 데이터는 별도 `.ts` 모듈.

**빌드 검증 도구** 후보:
| 도구 | 핵심 가치 | 상태 |
|---|---|---|
| Contentlayer | MDX 컴파일 + zod 검증 | 사실상 중단 (2024~) |
| velite | zod 친화 후속 | 활발 |
| fumadocs-mdx | Next 최적화 풀스택 | 활발, 자체 라우팅 강제 |
| **next-mdx-remote + zod 수동** | 의존성 0, 글루코드 직접 | 안정 |

### 4. RSC 컨텍스트 재확인

velite의 핵심 가치 4개 중 **3개가 이 프로젝트와 중복**:

| velite 가치 | 이 프로젝트 현황 |
|---|---|
| ① MDX 컴파일 | [MDXRenderer.tsx:25](../../components/content/MDXRenderer.tsx#L25)의 `MDXRemote`(RSC)가 이미 처리 |
| ② frontmatter zod 검증 | **여기만 가치 있음** |
| ③ allDocs 객체 생성 | [loader.ts:87-97](../../lib/content/loader.ts#L87-L97)에 커스텀 로더 존재 |
| ④ 증분 빌드 캐시 | Next.js RSC가 페이지 단위로 처리 |

**결론**: velite를 도입해도 ②번 1개만 활용. zod 스키마 30~50줄로 같은 효과를 더 적은 비용으로 달성.

→ 도구는 **"`next-mdx-remote/rsc` 유지 + zod 수동"** 으로 확정.

### 5. Phase 0 설계 — "검증만, 동작 0 변화"

```
Phase 0 (이번 세션)   : 안전망 (zod 스키마 + 검증 스크립트)
Phase 1               : 데이터/컴포넌트 인프라
Phase 2               : Lean MDX 가이드라인 + lint
Phase 3               : 파일럿 1개 변환
Phase 4               : 일괄 119개 (Docker dangerous mode)
Phase 5               : 파이프라인 전환
Phase 6               : CI 강제 + 클린업
```

### 6. Phase 0 구현

#### 6-1. frontmatter 다양성 조사

17개 샘플로 **3가지 방언** 확인:

| 방언 | 분포 | 특징 |
|---|---|---|
| 취득세(acquisition) | 49 | section_id, subcategory, source, page_range, snake_case |
| corp-acquisition-tax | 70 | group, order, source_book*, snake_case |
| home | 1 | **혼자 camelCase**(effectiveDate, lastUpdated, legalBasis) — 버그 |

#### 6-2. 스키마 설계 — 처음엔 3개 분리, 사용자 지적 후 통합

초기안: 3개 스키마 + 경로 기반 디스패치 함수.

사용자 지적:

> **이걸 하나로 통합하는 게 좋지 않나**

→ 정확한 지적. zod의 `discriminatedUnion`을 `category` 키로 적용하면:
- export 1개로 단순화
- AI 멘탈 모델 단순화 ("스키마 1개, category가 디스크리미네이터")
- home의 camelCase가 **별도 분기로 받아주는 대신** 명시적으로 거부 → 버그 노출

[lib/content/frontmatter-schema.ts](../../lib/content/frontmatter-schema.ts) 핵심 구조:

```typescript
export const Frontmatter = z.discriminatedUnion('category', [
  AcquisitionFM,        // category: '취득세'
  CorpAcquisitionFM,    // category: 'corp-acquisition-tax'
  HomeFM,               // category: 'home'
])
```

#### 6-3. 검증 스크립트

[scripts/content-check.ts](../../scripts/content-check.ts) — 120개 파일 검증, 실패는 방언별·필드별로 그룹화하여 리포트. `npm run content:check` 추가.

#### 6-4. 1차 검증 결과

```
Total: 120
Pass:  105
Fail:  15
```

실패 분류:

| 유형 | 건수 | 사례 |
|---|---|---|
| `page_range` 단일 요소 `[N]` | 10 | `[38]` — 한 페이지짜리를 단일 요소로 표기 |
| `page_range` 3원소 `[a,b,c]` | 1 | `[40,41,42]` — 범위 의도였으나 잘못 표기 |
| acquisition/themes 누락 필드 | 2 | luxury, trade에 source·effective_date 등 누락 |
| corp/00-overview 누락 필드 | 1 | source_tax_types 누락 |
| home 방언 불일치 | 1 | category 자체 없음 + camelCase |

#### 6-5. 옵션 결정 — 엄격 스키마 + 콘텐츠 측 수정

3안 제시(콘텐츠 일괄 수정 / 스키마 완화 / 통과율만 기록 후 패스). 사용자 결정:

> **스키마 관대하게 가면 안 된다. 장기적으로 지금 엄격하게 수정.**

근거: 매일 약간씩 어긋난 데이터가 6개월 뒤 마이그레이션·검색·계산기에서 폭발. 15개 즉시 수정 vs 영구 일관성의 ROI 비교.

#### 6-6. 일괄 수정 (15개)

- **page_range 11개**: `[N]` → `[N, N]`, `[40,41,42]` → `[40, 42]`
- **themes/luxury**: `source: "acquisitiontax.pdf"`, `effective_date: "2020-08-12"` 추가
- **themes/trade**: 위 + `law_reference: "지방세법 §11"` 추가
- **corp/00-overview**: `source_tax_types: [acquisition_tax]` 추가
- **home/index.mdx**: frontmatter 통째 재작성
  - `category: "home"` 추가
  - `effectiveDate` → `effective_date`
  - `lastUpdated` → `last_updated`
  - `legalBasis` → `legal_basis`
  - `supersededBy` → `superseded_by`

#### 6-7. 안전성 확인 — home/index.mdx의 키 변경

전체 코드베이스에서 `content/home/index.mdx`를 import·참조하는 곳을 검색. [app/(tax)/page.tsx](../../app/(tax)/page.tsx)는 hardcoded 컴포넌트만 사용. → **사실상 미사용 placeholder. 런타임 영향 0.**

[loader.ts:71](../../lib/content/loader.ts#L71)의 `last_updated || lastUpdated` fallback 덕분에 acquisition/corp 파일에 영향 없음.

### 7. 검증 재실행

```
Total: 120
Pass:  120
Fail:  0

By dialect:
  acquisition           pass=49  fail=0
  corp-acquisition-tax  pass=70  fail=0
  home                  pass=1   fail=0
```

### 8. AI 규칙 준수 — "기억하게 하지 말고 어기면 거부되게"

GitHub Actions에서 댓글 기반 자동 수정 워크플로우(orchestrator.ts 등)가 이미 운영 중인 점을 고려해 **5계층 규칙 강제 모델** 합의:

| 계층 | 위치 | 강도 |
|---|---|---|
| L1. 자연어 지시 | `CLAUDE.md`, `content/CLAUDE.md` | ★ |
| L2. 사양으로서의 타입 | mdxComponents props, zod 스키마 | ★★★ |
| L3. 빌드 검증 | `content:check`, tsc, MDX 컴파일 | ★★★★ |
| L4. 정적 분석 | `lint-mdx` (예정) | ★★★★ |
| L5. 시각 회귀 | 페이지 스냅샷 (예정) | ★★★★★ |

자동 수정 루프 설계(예정):
```
[댓글] → 시스템 프롬프트(L1) 주입 → AI 1차 수정
   → content:check 실패 시 에러를 AI에 재입력 → 최대 3회 재시도
   → 통과 시 PR 자동 생성
```

### 9. Docker dangerous mode 매핑

페이즈별 적합도:
- Phase 0~2 (설계·인프라): 호스트에서 사람과 협업
- **Phase 4 (일괄 119개): Docker dangerous mode 최적** — 격리·자가 검증 루프·자동 PR
- Phase 5~6: 사람 검토 위주

## 🔑 핵심 결정

| 결정 | 선택안 | 기각안 | 이유 |
|---|---|---|---|
| 콘텐츠 형식 | Lean MDX + TS 데이터 + TSX 렌더러 | 풍성 MDX 유지 / 순수 MD / Headless CMS | 산문 편집성·재사용·검증을 동시 만족 |
| 검증 도구 | next-mdx-remote/rsc + zod 수동 | velite / fumadocs / Contentlayer | 이미 RSC 컴파일 사용 중 → velite의 4개 가치 중 3개 중복 |
| 스키마 구조 | 단일 export(discriminatedUnion) | 방언별 3개 분리 | export 1개·AI 멘탈 모델 단순·home 버그 노출 |
| 실패 처리 | 콘텐츠 측 엄격 수정 | 스키마 완화 / 패스 | "관대 = 매일 작은 어긋남이 6개월 뒤 폭발" |
| 규칙 강제 위치 | 5계층(자연어→타입→빌드→lint→시각) | 자연어 지시만 | "AI는 잊는다. 어기면 거부되게 하라" |

## 📂 변경된 파일

신규:
- [lib/content/frontmatter-schema.ts](../../lib/content/frontmatter-schema.ts) — zod discriminatedUnion 스키마
- [scripts/content-check.ts](../../scripts/content-check.ts) — 120개 파일 검증·리포터

수정:
- [package.json](../../package.json) — zod 의존성, `content:check` 스크립트
- 11 acquisition page_range 정규화
- 2 themes 누락 필드 보강
- corp/00-overview source_tax_types 추가
- home/index.mdx 방언 정규화

## ⚠️ 콘텐츠팀 검토 필요

검증 통과 위해 임시값 적용. 실제 의미 확인 필요:

| 파일 | 임시값 | 검토 포인트 |
|---|---|---|
| themes/luxury-v1.0.mdx | `effective_date: 2020-08-12` | 사치성재산 §13⑤은 더 오래된 규정 |
| themes/trade-v1.0.mdx | `effective_date: 2020-08-12`, `law_reference: 지방세법 §11` | 유상거래는 가장 기본 개념 — 정확한 시행일 확정 필요 |

## ✅ 완료된 것 / 🚧 남은 것

### 완료
- [x] MDX 형식·도구 선택지 비교 및 결정 (Lean MDX + zod 수동)
- [x] zod 스키마 (discriminatedUnion 통합형)
- [x] 검증 스크립트 + npm 명령
- [x] 120개 frontmatter 100% 통과
- [x] AI 규칙 강제 5계층 모델 합의

### 후속 (Phase 1~2)
- [ ] `content/data/*.ts` 데이터 모듈 디렉터리 신설
- [ ] `<RatesTable>`, `<AdjustmentAreaTable>`, `<LawLink>` 등 컴포넌트
- [ ] `MDX_GUIDELINES.md`를 Lean MDX 버전으로 재작성
- [ ] `scripts/lint-mdx.ts` (인라인 스타일·raw `<table>` 검출)
- [ ] CLAUDE.md / content/CLAUDE.md에 핵심 규칙 명시
- [ ] CI 통합 (PR마다 content:check 자동 실행)
- [ ] themes/luxury, themes/trade의 임시 effective_date 콘텐츠팀 확정

### 후속 (Phase 3+)
- [ ] multi-house-v1.0.mdx 파일럿 변환 (회귀 검증: 댓글 contentPath 보존, 검색 인덱싱)
- [ ] Phase 4 Docker dangerous mode 자동 변환 루프 설계
- [ ] Phase 5: loader.ts에서 frontmatter 검증을 런타임 강제로 승격

## 💡 인사이트

1. **"일반론적 베스트 프랙티스 ≠ 이 프로젝트 최적해"**: 처음엔 velite를 추천했지만, [loader.ts](../../lib/content/loader.ts)·[MDXRenderer.tsx](../../components/content/MDXRenderer.tsx)를 실제로 읽어보니 RSC + 커스텀 로더가 이미 velite의 가치 대부분을 *공짜로* 제공 중. **추천 전 코드 먼저 읽기**.

2. **불일치는 "받아주지 말고 노출하라"**: home의 camelCase를 별도 스키마로 받아주는 안 vs 통합 스키마로 거부하는 안. 후자가 정답 — 받아주면 버그가 영구화되고 AI가 "이래도 되는구나" 학습.

3. **스키마 = AI에 대한 사양서**: 타입 시그니처와 zod 스키마를 잘 정의해두면 AI는 빈칸 채우기처럼 정확히 출력. "AI에게 가르치는 시간"보다 "AI가 보고 따를 사양을 코드로 만드는 시간"이 ROI 압도적.

4. **Phase 0의 가치**: 코드 변경 0(런타임 영향 없음)인데도, 검증 인프라를 깔자마자 **15개 숨은 불일치**가 즉시 노출됨. 이후 페이즈가 깨끗한 기반에서 시작.

## 🔗 관련 문서

- 이전 세션: [2026-04-28 MDX SSR 디버깅](./2026-04-28-1655-mdx-ssr-debug-and-cleanup.md) — 풍성 MDX의 함정을 직접 경험한 세션
- [content/MDX_GUIDELINES.md](../../content/MDX_GUIDELINES.md) — Phase 2에서 Lean MDX 버전으로 재작성 예정
- [lib/content/loader.ts](../../lib/content/loader.ts) — Phase 5에서 frontmatter 검증 통합 대상
