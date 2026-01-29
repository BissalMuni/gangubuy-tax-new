# Implementation Plan: Local Tax Documentation Site

**Branch**: `1-local-tax-docs` | **Date**: 2026-01-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/1-local-tax-docs/spec.md`

## Summary

Build a public-facing local tax information site that renders MDX content with tree-structured navigation. The site features infinite scroll between content sections, responsive design for PC/mobile, font size adjustment, content versioning, and full-text search. Uses Next.js App Router for SSR/SSG, Ant Design for UI components, and static MDX files for content storage.

## Technical Context

**Language/Version**: TypeScript 5+
**Primary Dependencies**: Next.js 14+ (App Router), Ant Design 5+, Tailwind CSS, Zustand, @next/mdx
**Storage**: Static MDX files (no database for content), Local Storage (user preferences)
**Testing**: Vitest + React Testing Library
**Target Platform**: Web (modern browsers), SSR/SSG on Vercel
**Project Type**: Web (Next.js App Router)
**Performance Goals**: Page load < 2s, font size change < 100ms, seamless infinite scroll
**Constraints**: No authentication, public access, SEO-friendly (SSG where possible)
**Scale/Scope**: ~50 content pages across 4 tax categories, versioned content

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Component-Based Design | ✅ PASS | Layout split into Header, Sidebar, Content components. Ant Design base. |
| II. Type Safety | ✅ PASS | TypeScript strict mode. All components will have Props interfaces. |
| III. Test-First (TDD) | ✅ PASS | Tests for navigation logic, content loading, version switching. No tax calculations in this feature. |
| IV. Data Accuracy | ✅ PASS | MDX content with version control. Sources cited in content. |
| V. Simplicity | ✅ PASS | No over-abstraction. Standard Next.js patterns. YAGNI applied. |

**Gate Result**: ✅ PASSED - Proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/1-local-tax-docs/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── content-style-guide.md  # 개조식 공문서 스타일 가이드
├── contracts/           # Phase 1 output (internal routes, no external API)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
app/
├── layout.tsx                    # Root layout with providers
├── page.tsx                      # Home page
├── (tax)/                        # Tax content route group
│   ├── layout.tsx                # Tax layout with sidebar
│   ├── acquisition/              # 취득세
│   │   ├── [...slug]/            # Catch-all for nested paths
│   │   │   └── page.tsx          # e.g., /acquisition/rates/paid/sale/housing
│   │   └── page.tsx              # /acquisition (overview)
│   ├── property/                 # 재산세
│   │   ├── [...slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   └── vehicle/                  # 자동차세
│       ├── [...slug]/
│       │   └── page.tsx
│       └── page.tsx
├── search/                       # 검색
│   └── page.tsx
└── not-found.tsx                 # 404 page

components/
├── ui/                           # Common UI components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── MobileNav.tsx
│   ├── FontSizeControl.tsx
│   └── VersionSelector.tsx
├── content/                      # Content-related components
│   ├── MDXRenderer.tsx
│   ├── ContentHeader.tsx
│   └── InfiniteScrollLoader.tsx
└── search/                       # Search components
    ├── SearchInput.tsx
    └── SearchResults.tsx

content/
├── acquisition/                  # 취득세 MDX files
│   ├── rates/                    # 세율 (취득원인별 트리구조)
│   │   ├── paid/                 # 유상취득
│   │   │   ├── sale/             # 매매
│   │   │   │   ├── housing-v1.0.mdx      # 주택
│   │   │   │   ├── farmland-v1.0.mdx     # 농지
│   │   │   │   └── building-v1.0.mdx     # 건물
│   │   │   ├── exchange-v1.0.mdx         # 교환
│   │   │   └── division-v1.0.mdx         # 분할
│   │   ├── unpaid/               # 무상취득
│   │   │   ├── inheritance/      # 상속
│   │   │   │   ├── housing-v1.0.mdx
│   │   │   │   └── farmland-v1.0.mdx
│   │   │   └── gift/             # 증여
│   │   │       ├── housing-v1.0.mdx
│   │   │       └── farmland-v1.0.mdx
│   │   ├── original/             # 원시취득
│   │   │   └── construction-v1.0.mdx     # 신축
│   │   └── luxury/               # 사치성재산
│   │       ├── luxury-house-v1.0.mdx     # 고급주택
│   │       ├── golf-v1.0.mdx             # 골프오락장
│   │       └── controlling-v1.0.mdx      # 과점주주
│   ├── standard-v1.0.mdx         # 과세표준
│   └── requirements-v1.0.mdx     # 과세요건
├── property/                     # 재산세 MDX files
│   └── ...
└── vehicle/                      # 자동차세 MDX files
    └── ...

lib/
├── navigation/
│   ├── nav.config.ts             # Navigation tree configuration (취득원인별 트리구조)
│   └── contentSequence.ts        # Infinite scroll sequence (각 카테고리별)
├── content/
│   ├── loader.ts                 # MDX content loader
│   ├── versions.ts               # Version management
│   └── search.ts                 # Search index & query
├── stores/
│   └── preferences.ts            # Zustand store for user preferences
├── types/
│   └── index.ts                  # Shared type definitions
└── utils/
    └── index.ts                  # Utility functions

tests/
├── unit/
│   ├── navigation.test.ts
│   ├── contentLoader.test.ts
│   └── versionSelector.test.ts
└── integration/
    ├── infiniteScroll.test.tsx
    └── search.test.tsx
```

**Structure Decision**: Next.js App Router structure selected per Constitution Technology Stack. Route groups used to organize tax categories. MDX content stored in `content/` directory with version suffixes.

**Content Style**: 개조식 공문서 형식 (see [content-style-guide.md](./content-style-guide.md))
- 서술형 금지, 개조식 항목으로 작성
- 번호 체계: 1. → 가. → 1) → 가) → (1)
- 사례/예시 제외 (.deprecated의 사례 데이터 마이그레이션 안 함)

## Complexity Tracking

> No Constitution violations requiring justification.

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| Search | Client-side with pre-built index | Simplicity - no search server needed for ~50 pages |
| Versioning | Filename-based | Simplicity - no database needed, easy to manage |
| Infinite Scroll | Intersection Observer | Standard pattern, no external library needed |
