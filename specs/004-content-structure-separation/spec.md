# Feature Specification: Content Structure Separation (체계/내용 분리)

**Feature Branch**: `004-content-structure-separation`
**Created**: 2026-04-30
**Status**: Draft
**Input**: 메뉴 트리(체계)와 MDX 본문(내용)을 단일 매니페스트 JSON으로 연결하고, 1 리프 = 1 ID = 1 파일 불변식을 CI에서 강제. 식별자는 영구 불변, 라벨·순서·경로는 명시적 refactor PR로만 변경.

## 본 스펙의 위치

본 스펙은 *"누가 변경할 수 있는가"* (003)와 *"체계와 내용이 어떻게 연결되는가"* (004)를 분리합니다.

| 스펙 | 다루는 것 | 다루지 않는 것 |
|------|----------|-------------|
| [003-role-based-approval](../003-role-based-approval/spec.md) | 권한 모델, 승인 워크플로, 댓글 큐, 자동/수동 모드 | 콘텐츠 식별자, 트리 구조, 파일 경계 |
| **004 (본 스펙)** | 매니페스트 JSON, ID 라이프사이클, order_label, split/merge, refactor PR | 인증, 승인 권한, AI 자동 반영 절차 |

004는 003의 권한 모델을 **전제**로 사용합니다 (설계자 ≈ 003의 관리자, 담당자 ≈ 003의 담당자/승인자).

## 상위 정책 매핑

본 스펙은 [docs/policy/manual-system-plan.md](../../docs/policy/manual-system-plan.md) §II.1·§III.1·§III.3의 *"체계는 설계자, 내용은 담당자, AI는 보조"* 원칙을 코드 경계로 구체화합니다.

| 정책 개념 | 본 스펙의 매핑 |
|---------|--------------|
| 체계 (System) | 매니페스트 JSON + 트리 구조 + 파일 경계 |
| 내용 (Content) | MDX 파일 본문 |
| 분리 원칙 | 매니페스트는 설계자만, MDX 본문은 담당자만 편집. CI가 강제 |
| AI 보조 | refactor 영향 분석, split/merge 초안, 검증 리포트 자동 생성 |

---

## 배경 (Background)

현재 구조의 한계 ([lib/navigation/tree.ts](../../lib/navigation/tree.ts), [content/](../../content/)):

- 메뉴 → 콘텐츠 연결이 `path` **문자열 한 줄**. 한쪽이 깨져도 빌드/타입체크 통과.
- 검증된 결함: `content/acquisition/themes/trade-v1.0.mdx` 고아 1건, `/acquisition/exemption` 등 카테고리 인덱스 무효 링크 5+건.
- "이중 명명" 회피책: `/acquisition/multi-house/multi-house` 형태로 폴더명을 두 번 적음.
- `01-rate`, `02-practice` 같은 숫자-접두사가 ID와 순서를 한 문자열에 섞어 안티패턴 형성.
- 콘텐츠 → 메뉴 역참조 없음. 슬러그 변경 시 빌드 통과 + 런타임 404.
- 메뉴 ↔ 콘텐츠 정합성 검증 CI 부재.

> 상세 진단: 본 PR의 [diagnosis 보고서](../../docs/policy/manual-system-plan.md) 참고 (또는 PR 리뷰 코멘트).

---

## 핵심 불변식

> **1 트리 리프 = 1 ID = 1 MDX 파일**

이 불변식이 CI에서 강제할 유일한 구조적 약속입니다. 이외엔 자유.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 리프 추가 → MDX 슬롯 생성 (Priority: P1)

설계자는 매니페스트 JSON에 신규 리프 항목을 추가한다. CI가 새 ID 유일성을 검증하고, 빈 MDX 슬롯이 자동 생성되며, 담당자가 본문을 채울 수 있다.

**Why this priority**: 가장 빈번한 트리 작업. 이 흐름이 매끄럽지 않으면 시스템 전체가 마비.

**Independent Test**: 매니페스트에 `id: foo-bar`, `parent: corp-heavy`, `label: "신규 항목"` 추가 → CI 통과 → `content/.../foo-bar-v1.0.mdx` 빈 슬롯 자동 생성 → 담당자가 본문 추가하는 별도 PR.

**Acceptance Scenarios**:

1. **Given** 설계자가 매니페스트에 신규 리프 추가, **When** PR 생성, **Then** CI가 ID 유일성·필수 필드 검증 통과
2. **Given** PR 머지, **When** post-merge 훅 실행, **Then** `content/<parent_path>/<id>-v1.0.mdx` 빈 슬롯 자동 생성 (frontmatter `id` 포함)
3. **Given** 담당자가 빈 슬롯에 본문 추가, **When** 별도 PR 제출, **Then** mode:content 라벨로 본문 검토 후 머지
4. **Given** 매니페스트에 이미 존재하는 ID로 추가 시도, **When** PR 검증, **Then** CI 거부 + 충돌 ID 표시

---

### User Story 2 - 리프 삭제 → tombstone + redirect (Priority: P1)

설계자는 매니페스트에서 리프를 `status: retired`로 변경한다. ID는 무덤에 보존되어 재사용 불가, MDX는 archived/로 이동, redirect가 활성화되어 외부 링크가 깨지지 않는다.

**Why this priority**: 데이터 손실·외부 링크 단절 방지의 핵심 메커니즘.

**Independent Test**: `corp-heavy-rate` 리프를 retired 처리 → MDX가 archived/로 이동 → `/corp-acquisition-tax/heavy/rate` 접속 시 redirect 또는 410 Gone → 동일 ID로 신규 추가 시도하면 CI 거부.

**Acceptance Scenarios**:

1. **Given** 설계자가 리프 status를 `active`→`retired`로 변경, **When** PR 머지, **Then** MDX가 `content/archived/<retire-date>/<id>-v*.mdx`로 이동
2. **Given** retired ID로 신규 리프 추가 시도, **When** CI 검증, **Then** 거부 ("ID 영구 사용 금지")
3. **Given** retired 리프의 URL에 사용자 접속, **When** redirect 정책 active, **Then** 매니페스트 `redirects` 테이블에 따라 후속 ID로 이동 또는 410 응답

---

### User Story 3 - split: 1 리프 → N 리프 (Priority: P2)

설계자는 매니페스트에서 기존 리프를 retire하고 N개 신규 리프를 추가하면서 lineage `derived_from: [old_id]`를 기록한다. AI가 N개 빈 슬롯을 생성하고, 담당자가 본문을 N파일에 분배·작성한다.

**Why this priority**: 트리 진화의 자연스러운 형태. 빈도는 낮지만 안전성이 중요.

**Acceptance Scenarios**:

1. **Given** `filing-divorce` 리프가 active, **When** 설계자가 매니페스트에 retire + 신규 2개 (`filing-divorce-amicable`, `filing-divorce-court`) 추가, **Then** 두 신규 항목에 `derived_from: ["filing-divorce"]` 기록
2. **Given** PR 머지, **When** post-merge 훅, **Then** 원 MDX는 archived/, 신규 빈 슬롯 2개 생성, AI가 원 본문을 두 파일에 1차 분배 초안 제안 (별도 PR)
3. **Given** 담당자가 분배 초안 검토, **When** 본문 PR 머지, **Then** 분리 완료

---

### User Story 4 - merge: N 리프 → 1 리프 (Priority: P2)

설계자가 N개 리프를 retire하고 1개 신규 리프를 추가하며 `merged_from: [a, b, c]` 기록. AI가 N파일 본문을 합친 초안을 생성, 담당자가 검토.

**Acceptance Scenarios**:

1. **Given** `corp-heavy-rate-1`, `corp-heavy-rate-2` 두 리프 active, **When** 설계자가 매니페스트에 두 항목 retire + 신규 `corp-heavy-rate-unified` 추가 + `merged_from: ["corp-heavy-rate-1", "corp-heavy-rate-2"]` 기록, **Then** CI 검증 통과
2. **Given** PR 머지, **When** post-merge 훅, **Then** AI가 두 MDX를 합친 초안을 신규 슬롯에 작성, 두 원본은 archived/
3. **Given** 담당자가 합쳐진 초안 검토·편집, **When** 본문 PR 머지, **Then** 머지 완료

---

### User Story 5 - refactor PR: 일괄 정리 (Priority: P3)

분기 또는 트리거 발생 시 (order_label 깊이 4 초과, retired 비율 30% 초과, 법령 대규모 개정 등) 설계자는 mode:refactor PR을 연다. AI가 정리 후보 리포트와 영향 분석을 자동 생성하고, 단일 PR로 매니페스트 + 파일 이동 + redirect 일괄 적용.

**Why this priority**: 평상시엔 불필요. 매니페스트 누적 부채를 주기적으로 청소하기 위한 의식.

**Acceptance Scenarios**:

1. **Given** AI 스캔 결과 order_label 깊이 4 초과 항목 발견, **When** 설계자가 refactor PR 시작, **Then** AI가 평탄화 제안 자동 생성
2. **Given** refactor PR diff, **When** 영향 분석 실행, **Then** 변경되는 order_label·content_path·redirect 일람 자동 생성
3. **Given** mode:refactor 라벨 + 승인자 사인오프, **When** PR 머지, **Then** 모든 변경 atomic 적용. CI는 머지 후 전수 검증 (모든 ID 유일성, MDX 1:1, redirect 정합성)
4. **Given** refactor PR이 ID를 변경 시도, **When** CI 검증, **Then** 거부 ("ID는 retire/mint만 허용, in-place 변경 금지")

---

## Functional Requirements

### 매니페스트 (FR-001 ~ FR-010)

- **FR-001**: 시스템은 단일 JSON 파일 `config/tree-manifest.json`을 트리·콘텐츠 연결의 진실의 출처로 한다
- **FR-002**: 매니페스트는 다음 스키마를 따른다:
  ```json
  {
    "version": <int>,
    "updated_at": "<YYYY-MM-DD>",
    "leaves": [
      {
        "id": "<kebab-slug>",
        "order_label": "<dotted-numeric>",
        "label": "<korean-display-name>",
        "parent": "<parent-id-or-null>",
        "content_path": "<relative-path-to-mdx>",
        "status": "active" | "retired",
        "created_at": "<YYYY-MM-DD>",
        "retired_at": "<YYYY-MM-DD-or-null>",
        "derived_from": ["<id>", ...],
        "merged_from": ["<id>", ...],
        "superseded_by": "<id-or-null>"
      }
    ],
    "redirects": { "<old-id>": "<new-id>" }
  }
  ```
- **FR-003**: 매니페스트 편집은 설계자(003 관리자) 권한으로만 가능. CODEOWNERS로 강제
- **FR-004**: MDX 파일의 frontmatter `id` 필드는 매니페스트의 active 리프 ID와 정확히 1:1 대응해야 한다
- **FR-005**: 담당자는 매니페스트를 편집할 수 없다. 매니페스트 편집을 포함한 PR은 mode:structure 또는 mode:refactor 라벨이 필수
- **FR-006**: 매니페스트 버전(`version` 필드)은 모든 변경 시 monotonic 증가
- **FR-007**: 매니페스트 JSON 스키마는 zod 스키마로 정의 ([lib/navigation/manifest-schema.ts] 신설)
- **FR-008**: CI는 매 PR에서 매니페스트 스키마 검증 + 1:1 대응 검증을 수행
- **FR-009**: 검증 실패 시 PR 머지 차단
- **FR-010**: 매니페스트 + content/ 변경이 한 PR에 섞이는 경우 mode:hybrid 라벨 + 자기-승인 금지 (003 자기-승인 정책 참조)

### ID 라이프사이클 (FR-011 ~ FR-020)

- **FR-011**: ID 형식: `^[a-z0-9](?:[a-z0-9-]{0,30}[a-z0-9])?$` — 소문자 영문/숫자/하이픈, 32자 이내
- **FR-012**: ID는 active + retired 합집합 기준 전역 유니크
- **FR-013**: ID는 발급 후 영구 불변. label·order_label·content_path·parent 변경에 영향받지 않음
- **FR-014**: retired 상태 ID는 active 상태로 부활 불가. 동일 문자열로 신규 발급 시도 시 CI 거부
- **FR-015**: ID 변경이 필요한 경우 (slug 변경 등): 구 ID retire + 신규 ID mint + `superseded_by` 기록 + redirects 등록
- **FR-016**: split: 구 ID 1개 retire + 신규 ID N개 mint, 각 신규 항목에 `derived_from: [old_id]` 기록
- **FR-017**: merge: 구 ID N개 retire + 신규 ID 1개 mint, 신규 항목에 `merged_from: [a, b, ...]` 기록
- **FR-018**: ID 트리 위치(parent)는 자유롭게 변경 가능. ID 자체는 위치를 인코딩하지 않음
- **FR-019**: retire 시 해당 MDX는 `content/archived/<YYYY-MM>/<id>-v*.mdx`로 이동
- **FR-020**: lineage 정보(`derived_from`, `merged_from`, `superseded_by`)는 한 번 기록되면 변경 불가

### order_label (FR-021 ~ FR-028)

- **FR-021**: order_label 형식: 점-구분 정수 시퀀스 (`^[1-9]\d*(\.[0-9]+)*$`)
- **FR-022**: 부모 노드의 첫 세대 자식: `1, 2, 3, ...` 순차 정수
- **FR-023**: 형제 X와 X+1 사이 삽입: `X.1`, `X.2`, ... (X 아래 sub-번호)
- **FR-024**: 형제 X와 X.1 사이 삽입: `X.0.1` (X 아래 더 깊은 sub-번호)
- **FR-025**: order_label은 일반 PR(mode:structure)에서 부여 후 변경 불가
- **FR-026**: refactor PR(mode:refactor)에서만 order_label 재조정 허용
- **FR-027**: retired 리프의 order_label은 빈 자리로 보존, 재사용 금지
- **FR-028**: 표시 순서는 active 리프의 order_label 자연 정렬을 따른다 (`1 < 1.1 < 1.1.1 < 1.2 < 2`)

### refactor PR (FR-029 ~ FR-035)

- **FR-029**: refactor PR은 `mode:refactor` 라벨이 필수
- **FR-030**: refactor PR은 003의 승인자 사인오프 필수 (자기-승인 금지)
- **FR-031**: AI는 refactor PR 시작 시 정리 후보 리포트를 자동 생성: 깊은 order_label, retired 누적, 명명 드리프트
- **FR-032**: AI는 refactor PR diff에 대해 영향 분석 자동 생성: 변경되는 order_label/content_path/redirect 일람
- **FR-033**: refactor PR은 매니페스트 + 파일 이동 + redirect를 atomic하게 적용
- **FR-034**: refactor PR에서도 ID 자체는 mint/retire 외에 변경 불가
- **FR-035**: refactor 트리거 (자동 알림): order_label 깊이 4 초과, retired 비율 30% 초과, 매니페스트 leaves 수 1000 초과

### CI 검증 (FR-036 ~ FR-042)

- **FR-036**: CI는 모든 PR에서 다음을 검증:
  - 매니페스트 JSON 스키마 (zod)
  - ID 유일성 (active + retired 합집합)
  - 1 active 리프 = 1 active MDX (frontmatter `id` 매칭)
  - 모든 active MDX는 매니페스트에 active 리프 존재
  - retired ID로 active MDX 등록 없음
  - order_label 형식 + 형제 충돌 없음
  - lineage 무결성 (derived_from·merged_from·superseded_by가 가리키는 ID 존재)
  - redirects 키-값 모두 매니페스트에 존재
- **FR-037**: 일반 PR에서 ID·order_label 변경 시도 시 거부 (refactor PR만 허용)
- **FR-038**: CI 검증 스크립트는 [scripts/manifest-check.ts] (신설)
- **FR-039**: CI 검증은 GitHub Actions에서 실행되며 실패 시 머지 차단
- **FR-040**: CI는 매니페스트 변경 시 자동으로 영향받는 MDX 목록을 PR 코멘트에 게시
- **FR-041**: 기존 [scripts/content-check.ts](../../scripts/content-check.ts)와 통합되어 단일 검증 파이프라인
- **FR-042**: pre-commit 훅(선택)으로 로컬 검증 지원

---

## 데이터 모델 변경

### MDX frontmatter 스키마 변경 ([lib/content/frontmatter-schema.ts](../../lib/content/frontmatter-schema.ts))

추가 필드:
- `id: string` — 매니페스트와 매칭되는 영구 ID (필수)
- 기존 필드 유지 (title, version, last_updated 등)

### 신규 매니페스트 스키마 ([lib/navigation/manifest-schema.ts])

위 FR-002의 JSON 스키마를 zod로 정의.

### 기존 [lib/navigation/tree.ts](../../lib/navigation/tree.ts) 처리

- 마이그레이션 후 deprecated. 매니페스트 JSON에서 자동 생성 가능한 derived 데이터로 전환
- 마이그레이션 단계: tree.ts → 매니페스트 JSON 자동 변환 스크립트 작성 → 검증 → tree.ts를 매니페스트의 derived view로 재구현

---

## 권한 모델 (003 인용)

| 작업 | mode 라벨 | 003 권한 |
|------|---------|---------|
| 매니페스트 편집 (트리 변경) | `mode:structure` | 관리자 |
| MDX 본문 편집 | `mode:content` | 담당자 (의견) → 승인자 (승인) → AI (반영) |
| split/merge | `mode:structure` (구조) + `mode:content` (본문) 2단 PR | 관리자 + 담당자 |
| refactor 일괄 | `mode:refactor` | 관리자 + 승인자 사인오프 (자기-승인 금지) |

본 스펙은 003의 권한 모델에 의존하며, 003의 변경(예: `roles[]` 다중 권한 도입)이 본 스펙의 mode 강제에 영향을 줄 수 있음.

---

## Success Criteria

- **SC-001**: 모든 active MDX 파일의 frontmatter `id`가 매니페스트의 active 리프 ID와 1:1 매칭 (목표: 100%)
- **SC-002**: 고아 콘텐츠 0건, 무효 메뉴 링크 0건 (현재 7건+에서 0으로)
- **SC-003**: 매니페스트 변경 PR의 평균 리뷰 시간 < 10분 (영향 분석 자동화 효과)
- **SC-004**: refactor PR 외에서 ID·order_label 변경 시도가 CI에서 차단되는 비율 100%
- **SC-005**: ID 재사용 시도가 CI에서 거부되는 비율 100%
- **SC-006**: 신규 리프 추가부터 빈 MDX 슬롯 생성까지 자동화 (수동 작업 0)

---

## 마이그레이션 전략

004 적용은 1회성 데이터 변환을 동반. 단계:

1. **자동 변환 스크립트** ([scripts/migrate-to-manifest.ts] 신설): 현재 tree.ts + content/ 폴더 구조를 스캔하여 매니페스트 JSON 초안 생성
2. **수동 검토**: 설계자가 자동 생성 매니페스트의 ID 명명·order_label 적정성 확인 (기존 `01-rate` 등은 새 ID 부여)
3. **MDX frontmatter 일괄 추가**: 모든 MDX에 `id` 필드 추가 (스크립트로 자동)
4. **CI 활성화**: 검증 파이프라인 적용
5. **tree.ts deprecation**: 매니페스트에서 derived 생성으로 전환
6. **고아 콘텐츠 정리**: `themes/trade-v1.0.mdx` 등 — 매니페스트에 추가하거나 archived/로 이동

머지 전 **컷오버 윈도우** 필요 (서비스 일시 중단 5~10분, 003 페이즈 전환과 동일 패턴).

---

## Out of Scope

- 권한·인증·승인 워크플로 → [003-role-based-approval](../003-role-based-approval/spec.md)
- AI 자동 본문 생성 절차 → 003의 자동/수동 모드
- MDX 본문 작성 컨벤션 (H2 헤딩 규칙 등) → 본 스펙은 본문 내부 구조 강제하지 않음
- 다국어/번역 — 단일 언어(한국어) 가정
- citation_id (외부 인용용 별도 식별자) — YAGNI, 필요 시 후속 스펙

---

## Open Questions / Deferred Decisions

| # | 항목 | 제안 (수렴 미완) |
|---|------|--------------|
| Q1 | redirect 보존 기간 | 제안: 사례별. 외부 링크 가능성에 따라 1년~영구 |
| Q2 | ID 형식 | 제안: 평탄 kebab-slug. 계층 점-표기(`corp.heavy.rate`)는 거부 (위치 인코딩 = 안티패턴) |
| Q3 | mode:hybrid PR 허용 여부 | 제안: 원칙적 금지, split/merge에 한해 예외 |
| Q4 | retired MDX 영구 archived 보존 vs 시한 삭제 | 제안: 영구 보존 (감사·복원 가능성) |
| Q5 | 매니페스트 사람 편집 vs UI 편집기 | 제안: 페이즈 1은 JSON 직접 편집, 페이즈 2에서 관리 UI 도입 검토 |

003에 의존하는 미정 항목 (003에서 결정):
- `users.roles` 단수 vs 다수
- 자기-승인 정책 (엄격/느슨/혼합)

---

## References

- 정책 원칙: [docs/policy/manual-system-plan.md](../../docs/policy/manual-system-plan.md) §II.1, §III.1, §III.3
- 권한·승인 스펙: [specs/003-role-based-approval/spec.md](../003-role-based-approval/spec.md)
- 현재 tree 구현: [lib/navigation/tree.ts](../../lib/navigation/tree.ts), [lib/navigation/contentSequence.ts](../../lib/navigation/contentSequence.ts)
- 현재 콘텐츠 로더: [lib/content/loader.ts](../../lib/content/loader.ts), [lib/content/frontmatter-schema.ts](../../lib/content/frontmatter-schema.ts)
- 현재 검증 스크립트: [scripts/content-check.ts](../../scripts/content-check.ts)
- 진단 보고서: 본 스펙 §배경 + 대화 히스토리 (PR 리뷰 코멘트로 보존 권고)

---

## 후속 산출물 (작성 예정)

- `plan.md` — 구현 계획, 단계별 마이그레이션, 의존성
- `data-model.md` — 매니페스트 zod 스키마, frontmatter 스키마 변경, archived/ 디렉토리 구조
- `tasks.md` — 작업 분해 (스크립트 작성, CI 통합, 마이그레이션, 정리)
- `operation.md` — refactor PR 절차, 트리거, 영향 분석 가이드
