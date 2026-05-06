# 지방세 정보 시스템 구성도

> **SYSTEM ARCHITECTURE · v1.0 · 2026-05-06**
> 취득세 · 법인취득세 · 재산세 · 자동차세 — 4계층 트리 기반 콘텐츠 관리 시스템

**Tech Stack**: `Next.js 14` · `TypeScript` · `Supabase` · `Claude API` · `JWT Auth` · `5-Tier Roles`

---

## 1. 4계층 데이터 모델

> 바구니 → 책 → 콘텐츠 → 라우팅 매핑. 각 계층은 독립적 책임을 가지며, 책(book) 단위로 URL/폴더/관리 권한이 분리됨.

### 계층 구조

```
┌─────────────────────────────────────────────────────────────┐
│  📦  basket · 바구니                                         │
│      책을 묶는 UX 라벨 · 사이드바 그룹                          │
│      📁 src/lib/basket/                                       │
└─────────────────────────────────────────────────────────────┘
                          ▼ 참조 (bookIds)
┌─────────────────────────────────────────────────────────────┐
│  📖  book · 책                                               │
│      학습 단위 · URL · 폴더 · 관리의 독립 기준                   │
│      📁 src/lib/book/data/*.json + 로더                       │
└─────────────────────────────────────────────────────────────┘
                          ▼ leaf 노드
┌─────────────────────────────────────────────────────────────┐
│  📝  content · 콘텐츠                                        │
│      leaf 단위 단일 TSX 파일 · 1 leaf = 1 파일                 │
│      📁 src/content/<book-id>/.../<leaf-slug>.tsx             │
└─────────────────────────────────────────────────────────────┘
                          ▼ 동적 import
┌─────────────────────────────────────────────────────────────┐
│  🗺️  map · 매핑                                              │
│      book + leaf → content 컴포넌트                           │
│      📁 src/lib/map/index.ts                                  │
└─────────────────────────────────────────────────────────────┘
```

### 계층별 상세

#### 📦 basket — 바구니
- **책임**: 책을 묶는 UX 라벨 (사이드바 그룹)
- **위치**: [src/lib/basket/](../src/lib/basket/)
- **예시**: `taxBasket` = "지방세"
  - `bookIds: [acquisition, corp-acquisition-tax, property, vehicle]`
- **특징**: 한 책이 여러 바구니에 속할 수 있음 (다대다 관계)

#### 📖 book — 책
- **책임**: 학습 단위 · URL · 폴더 · 관리의 독립 기준
- **위치**: [src/lib/book/data/](../src/lib/book/data/) + 로더
- **구성**: `id` · `basePath` · `title` · `description` · `children[TreeNode]`
- **특징**: 각 JSON이 트리의 단일 진실(single source of truth)
- **새 책 추가**: 새 JSON + 로더 + 라우트 + content/ 폴더

#### 📝 content — 콘텐츠
- **책임**: leaf 단위 단일 TSX 파일 (1 leaf = 1 파일)
- **위치**: `src/content/<book-id>/.../<leaf-slug>.tsx`
- **형식**: React 컴포넌트 (MDX 아님)
  ```ts
  export const meta = { title, version, lawReference, tags }
  ```
- **특징**: AI가 댓글 기반으로 단원 단위 편집 가능

#### 🗺️ map — 매핑
- **책임**: book + leaf → content 컴포넌트
- **위치**: [src/lib/map/index.ts](../src/lib/map/index.ts)
- **규칙**: `{basePath}/{ancestor-slugs}/{leaf-slug}`
- **동작**: `getContentComponent()` → React.lazy 동적 import
- **누락 시**: 파일 없으면 `null` → "준비 중" 표시

### 현재 책 (4권)

| 책 | URL | 설명 |
|---|---|---|
| **취득세** | `/acquisition` | 개인 취득세 |
| **법인취득세** | `/corp-acquisition-tax` | 법인 취득세 |
| **재산세** | `/property` | 재산세 전반 |
| **자동차세** | `/vehicle` | 자동차세 전반 |

### 트리 구조 예시

```text
📦 basket "지방세" (taxBasket)
├── 📖 book "취득세" (basePath: /acquisition)
│   ├── 개요
│   ├── 세율
│   └── 감면
│       └── 📝 leaf "임대사업자" (slug: rental-business)
│           ↓ map 동적 import
│           → src/content/acquisition/exemption/rental-business.tsx
│           // URL: /acquisition/exemption/rental-business
├── 📖 book "법인취득세" (basePath: /corp-acquisition-tax)
├── 📖 book "재산세" (basePath: /property)
└── 📖 book "자동차세" (basePath: /vehicle)
```

---

## 2. 사용자 플로우 & 역할별 권한

> JWT 세션 + Next.js middleware로 5단계 역할(reader → editor → subadmin → admin → superadmin)을 라우트별로 제어.

### 역할별 권한 매트릭스

| 역할 | 변수명 | 권한 | 비고 |
|---|---|---|---|
| 👁 **읽기 전용** | `reader` | `read` | 콘텐츠 열람 · 댓글 조회 |
| ✏ **편집자** | `editor` | `read` · `edit_content` | 콘텐츠 수정 |
| ⚙ **부관리자** | `subadmin` | `+ edit_structure` | 권한 있는 책 목차+내용 수정 |
| 🛠 **관리자** | `admin` | `+ view_audit` · `rollback` | 전체 책 + 이력 조회 + 롤백 |
| 👑 **최고 관리자** | `superadmin` | `+ manage_books` · `manage_baskets` | 바구니/책 생성, 구조 편집 전체 |

### 인증 & 라우트 보호 흐름

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  🌐 사용자    │───▶│ 🔐 middleware │───▶│  🎯 경로 매핑 │───▶│  ✅ 권한 검사 │───▶│  📄 페이지   │
│   접속        │    │   .ts         │    │              │    │              │    │   렌더        │
│              │    │              │    │              │    │              │    │              │
│ Browser →    │    │ JWT 쿠키 검증 │    │ ROUTE_       │    │ hasPermission│    │ RSC + 동적   │
│ URL 요청     │    │ (jose)       │    │ PERMISSIONS  │    │ (role, perm) │    │ 콘텐츠       │
│              │    │ [tax_session]│    │ [check       │    │ [x-user-role │    │              │
│              │    │              │    │  RouteAccess]│    │  주입]        │    │              │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

### 라우트 권한 분기

#### 📖 공개 라우트 (전체)
- `/` — 메인 페이지
- `/acquisition/...` — 취득세 콘텐츠
- `/corp-acquisition-tax/...` — 법인취득세 콘텐츠
- `/property/...` — 재산세 콘텐츠
- `/vehicle/...` — 자동차세 콘텐츠

#### ⚙ 관리자 영역 (subadmin↑)
- `/admin` — 대시보드
- `/admin/structure` — 책/바구니 관리
- `/api/admin/baskets` — 바구니 API
- `/api/admin/structure` — 구조 API

#### 👑 구조 편집 전용 (superadmin)
- `/admin/super` — 최고 관리자 전용
- `/admin/super/structure` — 구조 편집 페이지
- 바구니/책 생성·삭제
- 전체 구조 편집

### 핵심 코드 위치

| 파일 | 역할 |
|---|---|
| [src/middleware.ts](../src/middleware.ts) | JWT 인증 + 역할 기반 라우트 보호 |
| [src/lib/auth/constants.ts](../src/lib/auth/constants.ts) | 역할 상수 + `hasPermission()` |
| [src/lib/auth/session.ts](../src/lib/auth/session.ts) | 서버 세션 (jose / JWT) |
| [src/lib/auth/require-role.ts](../src/lib/auth/require-role.ts) | 역할 기반 권한 체크 헬퍼 |

---

## 3. 자동화 파이프라인 (댓글 기반 콘텐츠 수정)

> Supabase 댓글 + `inbox/` 폴더의 두 가지 입력 소스를 통합 처리. Claude API가 단원 TSX를 직접 수정하고 Git에 자동 커밋.

### 파이프라인 개요

```
┌─────────────────────┐
│ 💬 Supabase 댓글     │─┐
│  콘텐츠 페이지 댓글   │ │
└─────────────────────┘ │    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌─────────────────┐
                        ├───▶│ ⚙ Orchestrator│───▶│ 🎯 Path       │───▶│ 🤖 Claude     │───▶│ 📝 TSX 수정      │
┌─────────────────────┐ │    │ orchestrator │    │   Resolver   │    │   Runner     │    │  src/content/   │
│ 📥 inbox/ 폴더       │─┘    │   .ts        │    │ mdx-resolver │    │ claude-runner│    └─────────────────┘
│  PDF · prompt · 콘텐츠│     └──────────────┘    │   .ts        │    │   .ts        │    ┌─────────────────┐
└─────────────────────┘                          └──────────────┘    └──────────────┘───▶│ 🚀 Git 자동 커밋 │
                                                                                          │ auto-commit.ts  │
                                                                                          └─────────────────┘
```

### 단계별 상세

#### 1️⃣ 입력 수집
- **모듈**: [scripts/fetch-comments.ts](../scripts/fetch-comments.ts) · [scripts/inbox-scanner.ts](../scripts/inbox-scanner.ts)
- **Supabase**: 미처리 댓글 + 첨부파일(PDF/이미지) 다운로드
- **inbox/**: 새 파일 및 `prompt.txt` 스캔
- **출력**: `WorkItem[]`로 통합

#### 2️⃣ PDF/첨부 콘텐츠 추출
- **모듈**: `pdf-parse` (선택적 로드)
- **PDF**: 텍스트 추출
- **이미지**: URL 보존 (Storage 다운로드 URL)
- **출력**: 댓글 본문 + 첨부 텍스트를 하나의 컨텍스트로 결합

#### 3️⃣ 대상 TSX 경로 해석
- **모듈**: [src/lib/automation/mdx-resolver.ts](../src/lib/automation/mdx-resolver.ts)
- **입력**: 댓글이 달린 페이지 URL
- **처리**: `resolveContentPath()` → 실제 TSX 파일 경로 매핑
- **로직**: book + leaf slug 체인 역추적

#### 4️⃣ Claude API 프롬프트 빌드 + 호출
- **모듈**: [src/lib/automation/claude-runner.ts](../src/lib/automation/claude-runner.ts)
- **함수**: `buildMdxEditPrompt()` 또는 `buildPdfToMdxPrompt()`
- **입력**: 기존 TSX + 수정 요청 + 첨부 컨텍스트
- **출력**: Claude로부터 새 TSX 응답 수신

#### 5️⃣ 파일 저장 + Git 커밋/푸시
- **모듈**: [scripts/auto-commit.ts](../scripts/auto-commit.ts)
- **저장**: TSX 덮어쓰기
- **감지**: `getModifiedMdxFiles()`로 변경 감지
- **커밋**: `commitAndPush()` 실행
- **마킹**:
  - Supabase 댓글에 `processed=true` 마킹
  - inbox 파일은 `processed/`로 이동

### 실행 명령어

```bash
pnpm orchestrate           # 전체 파이프라인 실행
pnpm orchestrate:dry-run   # 미리보기 (실제 수정 없음)
pnpm inbox:scan            # inbox만 처리
```

### 핵심 코드 위치

| 파일 | 역할 |
|---|---|
| [scripts/orchestrator.ts](../scripts/orchestrator.ts) | 통합 파이프라인 진입점 |
| [scripts/fetch-comments.ts](../scripts/fetch-comments.ts) | Supabase 댓글 + 첨부 가져오기 |
| [scripts/inbox-scanner.ts](../scripts/inbox-scanner.ts) | inbox/ 폴더 스캔 |
| [scripts/auto-commit.ts](../scripts/auto-commit.ts) | Git 자동 커밋/푸시 |
| [src/lib/automation/mdx-resolver.ts](../src/lib/automation/mdx-resolver.ts) | 콘텐츠 경로 해석 |
| [src/lib/automation/claude-runner.ts](../src/lib/automation/claude-runner.ts) | Claude API 호출 + 프롬프트 |

---

## 부록: 기술 스택

| 분류 | 기술 |
|---|---|
| **Framework** | Next.js 14 (App Router, src directory) + React 18 |
| **Language** | TypeScript (strict mode — no `any`) |
| **Styling** | Tailwind CSS + Ant Design |
| **Backend** | Supabase (댓글 · 첨부파일) |
| **Auth** | 자체 세션 (`jose` / JWT) + 역할 기반 권한 |
| **Search** | FlexSearch |
| **Content data** | JSON / TSX 파일 (DB 아님) |
| **Automation** | Claude API + tsx scripts |
| **Testing** | vitest |
| **Package manager** | pnpm |
| **Import alias** | `@/*` → `src/*` |

---

**강구바이세무 (gangubuy-tax-new)** · 4-Tier Tax Information System
