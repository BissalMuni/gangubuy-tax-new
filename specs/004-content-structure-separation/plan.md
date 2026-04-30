# Implementation Plan — Content Structure Separation

**Feature Branch**: `004-content-structure-separation`
**Created**: 2026-04-30
**Status**: Draft
**Depends on**: [003-role-based-approval](../003-role-based-approval/spec.md) (FR-001a 복수 역할, FR-001c 자기-승인 금지, FR-010a acting_role)

---

## 구현 목표

[spec.md](spec.md) 의 42개 FR을 다음 순서로 구현:

1. 매니페스트 자료구조 정의 (zod 스키마)
2. 자동 변환 스크립트로 현재 트리 → 매니페스트 JSON 1차 생성 + 사람 검토
3. frontmatter `id` 필드 일괄 추가
4. CI 검증 파이프라인 가동
5. 라우팅·로더가 매니페스트 기반으로 동작하도록 전환
6. tree.ts deprecation
7. refactor PR 도구 (영향 분석, redirect 자동화)

---

## 0. 의존성 점검 (선행)

| 의존성 | 상태 | 본 plan에 미치는 영향 |
|---|---|---|
| 003 FR-001a (`users.roles[]`) | spec 갱신 완료, 코드 미구현 | 페이즈 2 진입 전엔 영향 미미. 페이즈 1에서는 env 비번 보유 ≈ 다중 역할 |
| 003 FR-001c (자기-승인 금지) | spec 갱신 완료, 코드 미구현 | refactor PR 머지 시 actor != reviewer 강제 — 003 가드 재사용 |
| 003 FR-010a (`change_audit.acting_role`) | spec 갱신 완료, 마이그레이션 SQL 추가 필요 | 매니페스트 변경 감사 (`change_kind='manifest'`) 도입 시 필수 |
| MDX 파일 frontmatter Zod 검증 | 기존 [scripts/content-check.ts](../../scripts/content-check.ts) | 본 plan에서 확장 |

선행 작업: 003 마이그레이션 변경분(`acting_role`/`emergency_override`/`change_kind='manifest'`)을 005 또는 신규 007 마이그레이션으로 반영. **본 plan은 SQL 자체를 작성하지 않음** — 003 data-model.md를 따른다.

---

## 1. 단계별 작업 (Phase A → E)

### Phase A — 자료구조와 도구 (선행)

**A1. 매니페스트 zod 스키마 작성**
- 파일: [lib/navigation/manifest-schema.ts](../../lib/navigation/manifest-schema.ts) 신설
- 입력: 본 spec FR-002 매니페스트 스키마, FR-011~020 ID 라이프사이클, FR-021~028 order_label
- 출력: `ManifestSchema`, `LeafSchema`, `RedirectMapSchema` zod 정의
- 자세한 필드는 [data-model.md](data-model.md) 참조

**A2. frontmatter `id` 필드 추가**
- 파일: [lib/content/frontmatter-schema.ts](../../lib/content/frontmatter-schema.ts) 수정
- baseFields에 `id: z.string().regex(/^[a-z0-9](?:[a-z0-9-]{0,30}[a-z0-9])?$/)` 추가
- AcquisitionFM/CorpAcquisitionFM/HomeFM 모두 포함

**A3. 매니페스트 검증 스크립트**
- 파일: [scripts/manifest-check.ts](../../scripts/manifest-check.ts) 신설
- 검증 항목 (FR-036):
  - 매니페스트 JSON 스키마 zod 통과
  - ID 유일성 (active+retired 합집합)
  - active 리프 ↔ active MDX 1:1 대응
  - retired ID로 active MDX 등록 없음
  - order_label 형식 + 형제 충돌 없음
  - lineage 무결성 (derived_from·merged_from·superseded_by 기 매니페스트 존재)
  - redirects 키-값 매니페스트 존재
- 기존 [scripts/content-check.ts](../../scripts/content-check.ts) 와 통합 → `scripts/check-all.ts` 진입점

**A4. 자동 변환 스크립트 PoC**
- 파일: [scripts/migrate-to-manifest.ts](../../scripts/migrate-to-manifest.ts) 신설
- 입력: 현재 [tree.ts](../../lib/navigation/tree.ts) + [content/](../../content/) 폴더
- 출력: `config/tree-manifest.json` 초안
- 명명 휴리스틱:
  - 기존 슬러그 그대로 사용 (예: `rental-business` → `id: rental-business-exemption`)
  - 카테고리 prefix 추가하여 전역 유니크 보장
  - `01-rate`, `02-practice` 같은 숫자-접두사는 prefix 제거 + order_label 분리
  - 고아 콘텐츠(`themes/trade-v1.0.mdx` 등) 식별 → 매니페스트에 추가하거나 archived 후보로 표시
- 사람 검토 후 최종 매니페스트 확정

### Phase B — 검증 파이프라인 가동

**B1. CI 통합**
- 파일: 기존 GitHub Actions 워크플로 추가 또는 [.github/workflows/](../../.github/workflows/) 신규
- step: `pnpm tsx scripts/check-all.ts` (frontmatter + 매니페스트)
- 머지 차단 조건 (FR-009): 검증 실패 시 PR check 실패

**B2. PR 라벨 자동화**
- 파일: GitHub Actions 워크플로
- 매니페스트 변경 PR → 자동 `mode:structure` 라벨
- content/*.mdx 본문만 변경 PR → 자동 `mode:content` 라벨
- 둘 다 변경 시 → `mode:hybrid` 라벨 + 자기-승인 가드 강화 표시

**B3. CODEOWNERS**
- 파일: [.github/CODEOWNERS](../../.github/CODEOWNERS) 신설 또는 갱신
- `config/tree-manifest.json` → 관리자(설계자) 그룹
- `lib/navigation/manifest-schema.ts` → 관리자 그룹
- `content/**/*.mdx` body는 누구나 PR 가능, 머지는 003 승인자

### Phase C — 라우팅·로더 전환

**C1. 매니페스트 로더**
- 파일: [lib/navigation/manifest-loader.ts](../../lib/navigation/manifest-loader.ts) 신설
- API: `loadManifest()`, `getLeafById(id)`, `getLeafByPath(path)`, `getActiveLeaves()`, `getRedirect(oldId)`
- 캐싱: 빌드 타임 + dev 모드 hot reload

**C2. content loader 갱신**
- 파일: [lib/content/loader.ts](../../lib/content/loader.ts) 수정
- `findContentFile`을 매니페스트 기반으로 재작성: 슬러그 → 매니페스트 leaf 조회 → leaf의 `content_path` 사용
- frontmatter 검증에 `id` 매칭 추가
- 기존 path-based 로직은 fallback으로 유지하되 deprecated 마킹

**C3. tree.ts → derived view**
- 파일: [lib/navigation/tree.ts](../../lib/navigation/tree.ts) 수정
- 기존 하드코딩 객체 제거
- `navigationConfig`를 `loadManifest()` 결과의 derived 객체로 재구현
- 기존 [contentSequence.ts](../../lib/navigation/contentSequence.ts) 는 변경 없이 동작

**C4. redirect 처리**
- 파일: [middleware.ts](../../middleware.ts) 또는 [next.config.mjs](../../next.config.mjs)
- 매니페스트 `redirects` 맵을 Next.js redirect 규칙으로 자동 변환
- retired ID URL 접속 시 후속 ID로 301 또는 410 Gone

### Phase D — 데이터 마이그레이션 (1회성 컷오버)

**D1. 매니페스트 초안 확정**
- A4 산출물을 사람 검토
- 명명 충돌·order_label 적정성 검토
- 고아 콘텐츠 처리 결정 (매니페스트 추가 vs archived)

**D2. MDX frontmatter 일괄 갱신**
- 스크립트로 모든 MDX에 `id` 필드 추가 (매니페스트와 일관)
- A2 zod 스키마 검증 통과 확인

**D3. archived/ 디렉토리 생성**
- `content/archived/<YYYY-MM>/` 구조
- 마이그레이션 시점에 archived가 필요한 항목은 여기로 이동
- `themes/trade-v1.0.mdx` 처럼 결정된 archived 후보 처리

**D4. 컷오버 PR**
- 단일 PR로 매니페스트 + frontmatter 일괄 + tree.ts deprecation 적용
- 003 mode:refactor 라벨 + 승인자 사인오프
- 머지 후 즉시 dev 환경 검증, staging 배포, 운영 배포 (서비스 일시 중단 5~10분)

### Phase E — refactor 도구 (운영 안정화 후)

**E1. AI refactor 후보 리포트**
- 파일: [scripts/refactor-report.ts](../../scripts/refactor-report.ts) 신설
- 트리거: order_label 깊이 4 초과, retired 비율 30% 초과, 분기 정기 (FR-035)
- 출력: 정리 후보 리스트 (Markdown PR 코멘트)

**E2. AI 영향 분석**
- 파일: [scripts/refactor-impact.ts](../../scripts/refactor-impact.ts) 신설
- 입력: refactor PR diff (매니페스트 before/after)
- 출력: 변경되는 order_label·content_path·redirect 일람 (PR 코멘트)
- 실행: GitHub Actions의 PR 코멘트 봇 (PR 열림 또는 푸시 시)

**E3. 매니페스트 편집 UI** (Q5에 따라 페이즈 2 검토)
- 페이즈 1: JSON 직접 편집 (관리자 git skill 가정)
- 페이즈 2: `/admin/manifest` 페이지 검토 (Open Question Q5)

---

## 2. 의존 그래프

```
A1 ─┬─ A3 ─ B1 ─ B2 ─ B3 ─ D4
A2 ─┘                    ↑
A4 ─ D1 ─ D2 ─ D3 ───────┘
                C1 ─ C2 ─ C3 ─ C4 ─ D4 ─ E1 ─ E2 ─ E3
```

- A1, A2, A4는 병렬 가능
- C1~C4는 A1 완료 후 순차
- D 단계는 A·B·C 모두 완료 후
- E 단계는 D 안정화 후

---

## 3. 마이그레이션 위험과 완화

| 위험 | 영향 | 완화 |
|---|---|---|
| ID 명명 충돌 (A4) | 마이그레이션 중단 | A4 출력을 사람 검토 후 확정. 충돌 시 카테고리 prefix 강제 |
| 기존 URL 깨짐 | 외부 인용·검색 색인 손상 | 매니페스트 redirects에 모든 기존 path → 신 ID 매핑 등록 |
| frontmatter 일괄 갱신 충돌 | 진행 중 PR 충돌 | D 단계 컷오버 윈도우(5~10분) 동안 머지 동결 |
| order_label 자동 부여 부정확 | 표시 순서 어긋남 | 트리 구조 그대로 깊이 우선 순회로 부여, A4 출력 검토 시 수동 보정 |
| 003 미구현 시 자기-승인 가드 부재 | refactor PR 무방비 | 003 FR-001c 구현 전까지 refactor PR은 운영자 2인 협의로 대체 |

---

## 4. 검증 (단계별 게이트)

| 단계 | 게이트 |
|---|---|
| A1 | zod 스키마가 본 spec FR-002~035의 필드를 모두 표현하는지 단위 테스트 |
| A2 | 모든 기존 MDX가 `id` 추가 후 frontmatter 검증 통과 |
| A3 | 가짜 매니페스트 + 가짜 MDX로 7가지 검증 시나리오 통과 |
| A4 | 사람 검토 — 명명·order_label·고아 처리 결정 |
| B | 일부러 깬 PR로 CI 차단 확인 (red-green 검증) |
| C | dev 환경에서 모든 기존 URL이 동일하게 응답 (회귀 0건) |
| D | 컷오버 직후 SC-001~006 모든 지표 측정 |
| E | refactor PR 1건을 가짜 데이터로 시뮬레이션 |

---

## 5. 시간 견적 (rough order of magnitude)

| Phase | 예상 작업량 | 비고 |
|---|---|---|
| A | 2~3일 | 스키마 정의 + PoC 변환 + 검증 스크립트 |
| B | 1일 | CI/CODEOWNERS 설정 |
| C | 2~3일 | 로더 갱신 + redirect |
| D | 1일 (컷오버 윈도우) | 사전 준비 + atomic 적용 |
| E | 2~3일 (지연 가능) | 운영 안정화 후 점진 도입 |

총 8~11일 (선형 진행 가정). 병렬화 시 5~7일.

---

## 6. 003과의 인터페이스

| 003 산출물 | 004에서의 사용 |
|---|---|
| `users.roles[]` (Phase 2) | 매니페스트 편집 권한 검사 (`'admin' = ANY(roles)`) |
| `change_audit.acting_role` | 매니페스트 변경 시 `acting_role='admin'` 기록 |
| `change_audit.change_kind='manifest'` | 매니페스트 PR 머지 시 감사 항목 등록 |
| 자기-승인 가드 | refactor PR 머지 시 `actor != reviewer` 강제 |
| mode:structure / mode:content / mode:refactor 라벨 | 본 plan B2의 자동 라벨링과 일관 |

---

## 7. Open Issues / TODO

- [ ] A4 PoC 출력 후 ID 명명 컨벤션 최종 확정 (예: 카테고리 prefix 강제 여부)
- [ ] `redirect_until` 기본 보존 기간 결정 (Open Q1)
- [ ] split/merge 시 AI가 본문 분배·병합 초안을 생성하는 절차 정의 — 별도 spec 또는 운영 절차 문서
- [ ] Phase 2 매니페스트 편집 UI 도입 시점 (Open Q5)

---

## Next Artifacts

- [data-model.md](data-model.md) — 매니페스트 zod 스키마 코드 + frontmatter 변경 + archived/ 구조
- `tasks.md` — 본 plan의 세부 작업 분해 (Phase A1, A2, ...)
- `operation.md` — refactor PR 절차, 트리거, 영향 분석 가이드
