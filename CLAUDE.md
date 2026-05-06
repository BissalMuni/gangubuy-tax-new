# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

지방세(취득세·재산세·자동차세) 실무 정보를 **바구니 → 책 → 단원 트리 → 콘텐츠** 4계층으로 정리·제공하는 세금 정보 시스템.
각 소단원(leaf)은 단일 TSX 파일 — AI가 댓글 기반으로 단원 단위 편집 가능.

### 4계층 모델

| 계층 | 책임 | 위치 |
|---|---|---|
| **basket** | 책을 묶는 UX 라벨 (책 ID 참조만) | `src/basket/` |
| **book** | 학습 단위. URL·폴더·관리의 독립 기준 | `src/book/` |
| **content** | leaf별 단일 TSX 파일 | `src/content/` |
| **map** | book + leaf → content 컴포넌트 | `src/map/` |

### 현재 책 (4권)

| 책 | URL | 설명 |
|---|---|---|
| **취득세** | `/acquisition` | 개인 취득세 |
| **법인취득세** | `/corp-acquisition-tax` | 법인 취득세 |
| **재산세** | `/property` | 재산세 |
| **자동차세** | `/vehicle` | 자동차세 |

새 세목은 별도의 책(`Book`)으로 추가하고, 적절한 바구니에 ID 등록.

## Codebase Layout

> 트리 구조 모델·깊이 규칙·노드 명명·콘텐츠 헤딩 형식은 모두 `CONVENTION_TREE.md`와 `CONVENTION_CONTENT.md`에 정의됨. 이 섹션은 **이 코드베이스에서의 위치와 라우팅**만 다룬다.

### book/ — 책 데이터·로더
- `src/book/data/*.json` — 책별 원본 트리 (`acquisition.json`, `corp-acquisition-tax.json`, `property.json`, `vehicle.json`)
- `src/book/<book-id>.ts` — 각 JSON을 `Book`으로 import하는 얇은 로더 (4개)
- `src/book/index.ts` — `allBooks` (4권), `getBookByPath` 노출
- `src/book/types.ts` — `Book`, `TreeNode` 타입 + `findNodePath`, `findNodeBySlugs`, `isLeafNode` 유틸

### basket/ — 바구니 메타
- `src/basket/index.ts` — 바구니 정의 (`taxBasket`)
- `src/basket/types.ts` — `Basket` 타입

### content/ — leaf TSX
- `src/content/<book-id>/.../<leaf-slug>-v<version>.tsx` — 1 leaf = 1 파일
- 작성 규칙: `CONVENTION_CONTENT.md`

### map/ — 라우팅 컨벤션
- `src/map/index.ts` — book + leaf → content 컴포넌트 동적 import (`getContentComponent`)

### URL 매핑
- 책 `basePath`가 URL prefix: `/acquisition/...`, `/corp-acquisition-tax/...`, `/property/...`, `/vehicle/...`
- TreeNode의 `slug`가 각 세그먼트로 이어짐

### lib/ — 유틸리티·인프라

- `src/lib/types/` — 공통 타입
- `src/lib/content/` — 콘텐츠 로더, 검색, 버전 관리
- `src/lib/context/` — React Context (sections 등)
- `src/lib/navigation/` — 콘텐츠 순서, nav 설정
- `src/lib/stores/` — 상태 관리 (preferences)
- `src/lib/search/` — 검색 기능
- `src/lib/utils/` — 유틸리티 함수

#### lib/automation/ — 자동화 파이프라인

- `src/lib/automation/claude-runner.ts` — Claude API 호출
- `src/lib/automation/mdx-resolver.ts` — MDX 경로 해석
- `src/lib/automation/index.ts` — 파이프라인 오케스트레이터

#### lib/supabase/ — DB 접근

- `src/lib/supabase/server.ts` — Supabase 서버 클라이언트
- `src/lib/supabase/comments.ts` — 댓글 CRUD
- `src/lib/supabase/attachments.ts` — 첨부파일 관리

### lib/auth/ — 인증 (5단계 역할)

- `src/lib/auth/constants.ts` — 역할 상수 (reader → editor → subadmin → admin → superadmin)
- `src/lib/auth/session.ts` — 서버 세션 (JWT/jose)
- `src/lib/auth/require-role.ts` — 역할 기반 권한 체크

| 역할 | 변수명 | 권한 | ENV 키 |
|---|---|---|---|
| 읽기 전용 | reader | 읽기만 | ROLE_READER_PASSWORD |
| 편집자 | editor | 콘텐츠 수정 | ROLE_EDITOR_PASSWORD |
| 부관리자 | subadmin | 권한 있는 책 목차+내용 수정 | ROLE_SUBADMIN_PASSWORD |
| 관리자 | admin | 모든 책 목차+내용 수정, 이력 조회, 롤백 | ROLE_ADMIN_PASSWORD |
| 최고 관리자 | superadmin | 바구니/책 생성, 구조 편집 전체 | ROLE_SUPERADMIN_PASSWORD |

### lib/admin/ — 관리자 공통 유틸

- `src/lib/admin/github.ts` — GitHub API 공통 (커밋 헬퍼, blob/tree/ref 조작)
- `src/lib/admin/templates.ts` — 바구니 파일 자동 생성 템플릿

### app/api/ — API 라우트

- `api/admin/baskets/` — 바구니 목록(GET) / 전체 업데이트(PUT)
- `api/comments/` — 댓글 목록/등록/삭제
- `api/attachments/` — 첨부파일 업로드/삭제
- `api/content/` — 콘텐츠 조회
- `api/search/` — 검색

### app/(tax)/ — 페이지 라우트

- `(tax)/page.tsx` — 메인 페이지
- `(tax)/acquisition/[...slug]/page.tsx` — 취득세 콘텐츠
- `(tax)/corp-acquisition-tax/[...slug]/page.tsx` — 법인취득세 콘텐츠
- `(tax)/property/[...slug]/page.tsx` — 재산세 콘텐츠
- `(tax)/vehicle/[...slug]/page.tsx` — 자동차세 콘텐츠

### app/admin/ — 관리자 페이지

- `admin/` — 대시보드 (역할별 메뉴 분기)
- `admin/structure/` — 책/바구니 관리 (subadmin 이상)
- `admin/super/structure/` — 구조 편집 전용 (superadmin 전용)

### middleware.ts — 미들웨어

- `src/middleware.ts` — JWT 인증 + 역할 기반 라우트 보호 (Next.js middleware)

## Tech Stack

- **Framework:** Next.js 14 (App Router, src directory) + React 18
- **Language:** TypeScript (strict mode — no `any`)
- **Styling:** Tailwind CSS + Ant Design (comments/attachments/search)
- **Package manager:** pnpm
- **Testing:** vitest
- **Backend:** Supabase — 댓글·첨부파일
- **Auth:** 자체 세션 (`jose` / JWT) + 역할 기반 권한 (admin 등)
- **Search:** FlexSearch
- **Content data:** JSON/TSX 파일 (DB 아님)
- **Code comments:** Korean
- **Import alias:** `@/*` → `src/*`

## Commands

```bash
pnpm install           # Install dependencies
pnpm dev               # Start dev server (port 3001)
pnpm build             # Production build
pnpm lint              # Run ESLint
pnpm test              # Run tests (vitest)
pnpm test -- --run     # Run tests once without watch
pnpm orchestrate       # Run automation pipeline
pnpm orchestrate:dry-run  # Dry-run pipeline
pnpm inbox:scan        # Scan inbox for new content
```

## Component Organization

`src/components/` is organized by **domain purpose**:

```text
src/components/
├── navigation/     # 사이드바, Sidebar
├── content/        # ContentHeader, ContentPageWrapper, MDXRenderer
├── mdx/            # SectionNav, Outline, ThemeNav, SectionHeading
├── comments/       # 댓글 폼/목록
├── attachments/    # 첨부파일 업로드/목록
├── search/         # 검색 입력/결과
├── providers/      # AntdProvider, FontSizeProvider
├── admin/          # 관리자 대시보드, 바구니 관리
└── ui/             # Header, DarkModeToggle, FontSizeControl, MobileNav
```

When adding a new component, place it in the matching domain folder. If no existing folder fits, create a new domain folder with a clear purpose — do not place files directly under `src/components/`.

## Content Authoring Rules

콘텐츠 또는 구조를 생성·수정할 때 반드시 다음을 먼저 참조:

- **TSX 작성 규칙**: `CONVENTION_CONTENT.md`
- **트리 구조·명명 규칙**: `CONVENTION_TREE.md`

기존 단원 구조·명칭의 단일 진실은 `src/book/data/*.json`.

### 콘텐츠 형식

- TSX React 컴포넌트 (MDX 아님)
- `export const meta = { title, version, lawReference, tags, ... }`
- `export default function ComponentName() { return (...) }`
- 컴포넌트: SectionNav, Outline, Callout
- HTML tables with JSX style (NOT markdown tables)
- 컬럼 헤더 색상: 합계=#cf1322, 취득세=#1890ff, 지방교육세=#52c41a, 농특세=#fa8c16

### 콘텐츠 소스

- `gangubuy-tax-revised` 프로젝트에서 PDF → TSX 변환
- `TSX-TEMPLATE-PLAN.md` 가이드 참조

### 새 책 추가

1. `src/book/data/<book-id>.json` 작성 — `id`, `basePath`, `title`, `description`, `children`
2. `src/book/<book-id>.ts` 로더 작성
3. `src/book/index.ts` `allBooks`에 추가
4. `src/map/index.ts`에 derive 함수 + switch case 추가
5. `src/app/(tax)/<book-id>/[...slug]/page.tsx` 생성
6. `src/content/<book-id>/` 폴더에 leaf TSX 작성
7. `src/basket/index.ts`에 등록

### 바구니 관리

**관리자 UI**: `/admin/structure` → "바구니 관리" 탭에서 바구니 생성·삭제, 책 할당/해제가 가능합니다. 모든 책은 최소 1개 바구니에 소속되어야 합니다.

## Automation Pipeline

댓글 기반 콘텐츠 자동 수정 파이프라인:

- `pnpm orchestrate` → `scripts/orchestrator.ts`
- `inbox/` 폴더 — 콘텐츠/PDF/프롬프트 입력
- `src/lib/automation/` — Claude runner, resolver
- `scripts/run-pipeline.ts` — 댓글 → 콘텐츠 수정 실행

## Sister Project — math

`d:\Coding\math`는 이 프로젝트의 **원본 자매 프로젝트**로, 동일한 4계층 아키텍처(basket → book → content → map)를 공유한다.

- **구조 동기화 필수**: 한쪽에서 아키텍처·공통 로직(타입, 유틸, 인증, 관리자 등)을 변경하면 다른 쪽도 반영해야 한다.
- **상호 파일 수정 권한 있음**: 이 프로젝트에서 작업 중이더라도 `math`의 파일을 직접 읽고 수정할 수 있다.
- **공통 경로**: 두 프로젝트 모두 `src/basket/`, `src/book/`, `src/map/` 동일 (basket·book·map은 도메인 핵심이므로 lib 하위가 아닌 src 루트에 위치)

## Rules

- Use pnpm as package manager
- Use vitest for testing
- Code comments in Korean
- Commit messages in English
- TypeScript strict mode — no `any`
- Prefer React Server Components; use `"use client"` only when necessary
