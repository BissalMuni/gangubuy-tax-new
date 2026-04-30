# Data Model — Content Structure Separation

**관계 문서**: [spec.md](spec.md), [plan.md](plan.md)

본 문서는 매니페스트 JSON, frontmatter 확장, archived 디렉토리 구조의 코드 수준 정의를 다룬다. DB 스키마는 다루지 않으며, [003-role-based-approval/data-model.md](../003-role-based-approval/data-model.md)를 인용한다.

---

## 1. 매니페스트 JSON 스키마

### 1.1 파일 위치

`config/tree-manifest.json` — 단일 진실의 출처 (FR-001).

### 1.2 zod 스키마 (코드 형태)

작성 위치: `lib/navigation/manifest-schema.ts` (신설)

```typescript
import { z } from 'zod';

// ID 형식: 소문자 영문/숫자/하이픈, 1~32자
const ContentIdSchema = z
  .string()
  .regex(
    /^[a-z0-9](?:[a-z0-9-]{0,30}[a-z0-9])?$/,
    'id must be kebab-slug, 1~32 chars, ascii lowercase + digits + hyphens',
  );

// order_label: 점-구분 정수 시퀀스 (1, 1.1, 1.1.2, 2, ...)
const OrderLabelSchema = z
  .string()
  .regex(
    /^[1-9]\d*(\.[0-9]+)*$/,
    'order_label must be dotted positive integers (e.g., "1", "1.1", "3.0.1")',
  );

const DateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD');

// 리프 항목
export const LeafSchema = z.object({
  id: ContentIdSchema,
  order_label: OrderLabelSchema,
  label: z.string().min(1).max(80),                         // 한국어 표시명
  parent: ContentIdSchema.nullable(),                       // 루트는 null
  content_path: z
    .string()
    .regex(/^content\/.+\.mdx$/, 'must be relative path under content/'),
  status: z.enum(['active', 'retired']),
  created_at: DateString,
  retired_at: DateString.nullable().default(null),

  // lineage (split/merge/slug change 추적)
  derived_from: z.array(ContentIdSchema).default([]),       // split: 1→N 시 N개 자식이 [부모ID] 보유
  merged_from: z.array(ContentIdSchema).default([]),        // merge: N→1 시 1개가 [부모ID들] 보유
  superseded_by: ContentIdSchema.nullable().default(null),  // slug change: 구 ID가 신 ID 가리킴

  // 분류·검색 보조 (선택, 정책 §III.1 §III.2 외 메타)
  icon: z.string().optional(),                              // sidebar 아이콘 키
  audience: z.enum(['internal', 'public']).optional(),
});

// 카테고리 (트리 비-리프 노드, 003 기존 구조 호환)
export const CategorySchema = z.object({
  id: ContentIdSchema,
  order_label: OrderLabelSchema,
  label: z.string().min(1).max(80),
  parent: ContentIdSchema.nullable(),
  status: z.enum(['active', 'retired']),
  is_category: z.literal(true),                             // 리프와 구분
  icon: z.string().optional(),
  created_at: DateString,
  retired_at: DateString.nullable().default(null),
});

// 노드 = 리프 ∪ 카테고리
export const NodeSchema = z.discriminatedUnion('is_category', [
  LeafSchema.extend({ is_category: z.literal(false).default(false) }),
  CategorySchema,
]);

// redirects: 폐기된 ID → 후속 ID
export const RedirectMapSchema = z
  .record(ContentIdSchema, ContentIdSchema);

// 매니페스트 루트
export const ManifestSchema = z.object({
  version: z.number().int().nonnegative(),                  // monotonic, 모든 변경 시 증가 (FR-006)
  updated_at: DateString,
  nodes: z.array(NodeSchema).min(1),
  redirects: RedirectMapSchema.default({}),
});

export type Manifest = z.infer<typeof ManifestSchema>;
export type Leaf = z.infer<typeof LeafSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Node = z.infer<typeof NodeSchema>;
```

### 1.3 검증 무결성 (zod 외 추가 검증)

zod 스키마 외에 [scripts/manifest-check.ts](../../scripts/manifest-check.ts)에서 강제할 항목:

| ID | 검증 | FR |
|---|---|---|
| V1 | 모든 `id` 유일 (active + retired 합집합) | FR-012 |
| V2 | 모든 active 리프의 `content_path` 가 실존하는 MDX 파일 | FR-004 |
| V3 | 모든 active MDX의 frontmatter `id` 가 매니페스트 active 리프와 매칭 | FR-004 |
| V4 | retired ID로 active MDX 등록 없음 | FR-014 |
| V5 | `parent` 가 가리키는 ID가 매니페스트에 존재하고 active 또는 retired | — |
| V6 | 형제 노드 간 `order_label` 충돌 없음 | FR-022 |
| V7 | `derived_from`/`merged_from`/`superseded_by` 가 매니페스트에 존재 | FR-020 |
| V8 | `redirects` 키-값 모두 매니페스트에 존재 | — |
| V9 | retired 리프의 `content_path` 가 `content/archived/` 하위 | FR-019 |
| V10 | `version` 이 이전 PR의 매니페스트 version 보다 큼 (CI에서 git diff로 비교) | FR-006 |

### 1.4 매니페스트 예시

```json
{
  "version": 1,
  "updated_at": "2026-04-30",
  "nodes": [
    {
      "is_category": true,
      "id": "acquisition",
      "order_label": "1",
      "label": "취득세",
      "parent": null,
      "status": "active",
      "icon": "file-text",
      "created_at": "2026-04-30",
      "retired_at": null
    },
    {
      "is_category": true,
      "id": "acquisition-exemption",
      "order_label": "1.3",
      "label": "비과세/감면",
      "parent": "acquisition",
      "status": "active",
      "created_at": "2026-04-30",
      "retired_at": null
    },
    {
      "is_category": false,
      "id": "rental-business-exemption",
      "order_label": "1.3.1",
      "label": "임대사업자 감면",
      "parent": "acquisition-exemption",
      "content_path": "content/acquisition/exemption/rental-business-v1.0.mdx",
      "status": "active",
      "created_at": "2026-04-30",
      "retired_at": null,
      "derived_from": [],
      "merged_from": [],
      "superseded_by": null
    }
  ],
  "redirects": {
    "old-rental-business": "rental-business-exemption"
  }
}
```

---

## 2. frontmatter 스키마 변경

### 2.1 추가 필드

기존 [lib/content/frontmatter-schema.ts](../../lib/content/frontmatter-schema.ts)의 `baseFields`에 `id` 추가:

```typescript
const baseFields = {
  id: z
    .string()
    .regex(
      /^[a-z0-9](?:[a-z0-9-]{0,30}[a-z0-9])?$/,
      'id must be kebab-slug, 1~32 chars',
    ),                              // ← 신규 (FR-004)
  title: z.string().min(1),
  version: VersionString,
  last_updated: DateString,
  tags: z.array(z.string()).optional(),
  description: z.string().optional(),
};
```

### 2.2 검증 시점

- 빌드 타임: [scripts/content-check.ts](../../scripts/content-check.ts) 가 모든 MDX의 `id` 검증
- 매니페스트 매칭 검증은 [scripts/manifest-check.ts](../../scripts/manifest-check.ts) 가 수행 (V3)

### 2.3 마이그레이션

기존 MDX 파일에는 `id` 필드가 없음. 1회성 일괄 갱신:

1. [scripts/migrate-to-manifest.ts](../../scripts/migrate-to-manifest.ts) 실행 → 매니페스트 초안 + ID 할당 결정
2. [scripts/backfill-frontmatter-id.ts](../../scripts/backfill-frontmatter-id.ts) (신설) 실행 → 모든 MDX의 frontmatter에 `id` 추가
3. content-check + manifest-check 통과 확인

---

## 3. archived/ 디렉토리 구조

### 3.1 위치

```
content/archived/
├── 2026-05/                      # retired_at의 YYYY-MM
│   ├── old-rental-business-v1.2.mdx
│   └── filing-divorce-v2.1.mdx   # split 전 원본
├── 2026-08/
│   └── ...
└── _README.md                    # 디렉토리 의미 + 복원 절차
```

### 3.2 archived 파일 frontmatter

기존 frontmatter 그대로 보존 + 추가 필드:

```yaml
id: old-rental-business           # ← 폐기된 원래 ID (active로 부활 금지)
title: ...                        # 보존
status: retired                   # ← MDX 자체에도 표시 (선택)
retired_at: 2026-05-15
superseded_by: rental-business-exemption  # 매니페스트와 일관
```

### 3.3 archived MDX는 라우팅 대상 아님

- [lib/content/loader.ts](../../lib/content/loader.ts) 의 `findContentFile`은 매니페스트 `status='active'` 리프만 검색
- archived MDX는 빌드 타임 정적 페이지 생성에서 제외
- 외부 URL 접근은 매니페스트 `redirects` 또는 410 Gone

### 3.4 보존 정책

| 항목 | 결정 |
|---|---|
| MDX 파일 보존 기간 | 영구 보존 (Open Q4 제안) |
| redirect 활성 기간 | 사례별 (Open Q1, 1년 또는 영구) |
| git history | 모든 변경 git에 기록 — archived 자체가 보조 보존 수단 |

---

## 4. 003 데이터 모델과의 연결

### 4.1 change_audit 활용 (003 FR-010a)

매니페스트 변경 PR 머지 시 003의 `change_audit` 테이블에 기록:

```sql
INSERT INTO change_audit (
  change_kind,            -- 'manifest' (003 data-model.md §6 갱신됨)
  change_id,              -- 매니페스트 commit hash 또는 새 version 번호 (UUID 변환)
  action,                 -- 'create' | 'apply' (refactor PR 머지 = apply)
  actor,                  -- 관리자 이메일 또는 'admin(shared)'
  acting_role,            -- 'admin' (FR-001b)
  emergency_override,     -- FALSE (refactor는 자기-승인 금지 예외 없음)
  metadata                -- {"version_before": N, "version_after": N+1, "leaves_added": [...], "leaves_retired": [...]}
);
```

`change_kind='manifest'`는 003 data-model.md §6 갱신된 CHECK 제약에서 허용된다.

### 4.2 자기-승인 가드 (003 FR-001c)

매니페스트 변경 PR을 머지하려는 사용자(`merger`)와 PR 작성자(`author`)가 동일한 경우, refactor PR은 머지 차단.

```typescript
// API 또는 CI에서 검증
if (pr.author === pr.merger && !pr.emergency_override_approved) {
  return Response.json({ error: 'self-approval forbidden' }, { status: 403 });
}
```

`emergency_override_approved` 는 운영자 토글로만 활성화 (003 운영 절차 문서).

---

## 5. 기존 자료구조와의 충돌·정리

### 5.1 [lib/navigation/tree.ts](../../lib/navigation/tree.ts) deprecation

마이그레이션 후:

```typescript
// 기존 (deprecated)
export const navigationConfig: NavigationConfig = { ... };

// 신규
import { loadManifest } from './manifest-loader';
export const navigationConfig: NavigationConfig = manifestToNavigationConfig(
  loadManifest(),
);
```

`manifestToNavigationConfig` 어댑터를 [lib/navigation/manifest-loader.ts](../../lib/navigation/manifest-loader.ts) 에 두어 기존 `NavigationConfig` 인터페이스를 유지. 후속 PR에서 NavigationConfig 자체를 제거 가능.

### 5.2 [lib/navigation/contentSequence.ts](../../lib/navigation/contentSequence.ts) 영향

매니페스트 기반 `getActiveLeaves()` 가 카테고리별 정렬된 리프를 반환하므로, 기존 `getLeafPaths`/`getNextPath`/`getPrevPath` 는 derived 결과를 그대로 사용. 코드 변경 최소.

### 5.3 [content/file-tree.md](../../content/file-tree.md) deprecation

손으로 쓴 트리 문서는 stale 위험 (`acquisition/standard/` 등). 매니페스트에서 자동 생성되는 [scripts/generate-file-tree.ts](../../scripts/generate-file-tree.ts) (신설) 출력으로 대체.

---

## 6. 데이터 사전 (Glossary)

| 용어 | 의미 |
|---|---|
| **체계 (System/Structure)** | 메뉴 트리 + 매니페스트 JSON + 파일 경계. 설계자 권한 영역 |
| **내용 (Content)** | MDX 파일 본문. 담당자 권한 영역 |
| **노드 (Node)** | 매니페스트의 트리 항목 — 카테고리 또는 리프 |
| **리프 (Leaf)** | 콘텐츠가 연결된 말단 노드. `is_category=false`, `content_path` 보유 |
| **카테고리 (Category)** | 자식 노드를 가지는 비-리프 노드. `is_category=true`, `content_path` 없음 |
| **active** | 현재 사이트에 노출되는 노드 |
| **retired** | 폐기된 노드. ID는 무덤에 보존, 영구 재사용 금지 |
| **lineage** | split/merge/slug change의 원본-결과 관계 (`derived_from`/`merged_from`/`superseded_by`) |
| **order_label** | 표시 순서를 위한 점-구분 라벨 (예: `1.3.1`). 부여 후 일반 PR에서 변경 불가 |
| **mode:structure** | 매니페스트만 변경하는 PR 라벨 |
| **mode:content** | MDX 본문만 변경하는 PR 라벨 |
| **mode:refactor** | 매니페스트 일괄 정리 PR 라벨. 003 자기-승인 금지 강제 |
| **mode:hybrid** | 매니페스트 + 본문 동시 변경. split/merge 한정, 자기-승인 강화 |
