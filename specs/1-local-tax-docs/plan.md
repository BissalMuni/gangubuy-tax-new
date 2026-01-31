# Implementation Plan: Local Tax Documentation Site

**Branch**: `main` | **Date**: 2026-01-31 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/1-local-tax-docs/spec.md`

## Summary

Build an internal-facing local tax information site that renders MDX content with tree-structured navigation. The site features infinite scroll between content sections, responsive design for PC/mobile, font size adjustment, content versioning, full-text search, per-content comments, and per-content file attachments. Uses Next.js App Router for SSR/SSG, Ant Design for UI components, static MDX files for content storage, and Supabase for comments/file storage. Content is organized by property type (물건 기준) per 지방세법 체계.

## Technical Context

**Language/Version**: TypeScript 5+
**Primary Dependencies**: Next.js 14+ (App Router), Ant Design 5+, Tailwind CSS, Zustand, @next/mdx, @supabase/supabase-js
**Storage**: Static MDX files (content), Supabase Postgres (comments, attachment metadata), Supabase Storage (file uploads), Local Storage (user preferences)
**Testing**: Vitest + React Testing Library
**Target Platform**: Web (modern browsers), SSR/SSG on Vercel
**Project Type**: Web (Next.js App Router)
**Performance Goals**: Page load < 2s, font size change < 100ms, seamless infinite scroll
**Constraints**: No authentication (읽기 공개, 댓글/업로드는 직원명 입력), SEO-friendly (SSG where possible)
**Scale/Scope**: ~24 content pages (취득세 세율) + 과세표준 + 테마별 통합규정, versioned content, per-content comments & attachments

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. 대상 분리 | ✅ PASS | 모든 MDX frontmatter에 `audience: internal` 필드 포함. 현재 단계는 직원용만 생성. |
| II. 개조식 공문서 스타일 | ✅ PASS | content-style-guide.md 준수. 번호/표 형식, 법령 근거 명시. |
| III. 정보 정확성 | ✅ PASS | 각 MDX 파일에 법령 조항 번호 명시 (§11, §12, §13 등). |
| IV. 단순성 | ✅ PASS | YAGNI 적용. 표준 Next.js 패턴. 불필요한 추상화 없음. |
| V. 점진적 공개 | ✅ PASS | 1단계 internal 콘텐츠 완성 후 2단계 public 전환. |

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
├── contracts/           # API Route 계약 명세
│   ├── comments-api.md  # 댓글 CRUD API
│   └── attachments-api.md # 파일 첨부 API
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
│   │   │   └── page.tsx          # e.g., /acquisition/rates/realestate/housing/general
│   │   └── page.tsx              # /acquisition (overview)
│   ├── property/                 # 재산세
│   │   ├── [...slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   └── vehicle/                  # 자동차세
│       ├── [...slug]/
│       │   └── page.tsx
│       └── page.tsx
├── api/                          # API Routes (서버)
│   ├── comments/
│   │   └── route.ts              # GET, POST /api/comments?content_path=...
│   ├── comments/[id]/
│   │   └── route.ts              # DELETE /api/comments/:id
│   ├── attachments/
│   │   └── route.ts              # GET, POST /api/attachments?content_path=...
│   └── attachments/[id]/
│       └── route.ts              # DELETE /api/attachments/:id
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
├── comments/                     # 댓글 components
│   ├── CommentList.tsx
│   ├── CommentForm.tsx
│   └── CommentItem.tsx
├── attachments/                  # 파일 첨부 components
│   ├── AttachmentList.tsx
│   └── AttachmentUpload.tsx
└── search/                       # Search components
    ├── SearchInput.tsx
    └── SearchResults.tsx

content/
├── acquisition/                           # 취득세
│   ├── rates/                             # 세율
│   │   ├── realestate/                    # 부동산 (§11)
│   │   │   ├── housing/                   # 주택
│   │   │   │   ├── general-v1.0.mdx       # 유상거래 (§11①8: 1~3%)
│   │   │   │   ├── inheritance-v1.0.mdx   # 상속 (§11①1나: 2.8%)
│   │   │   │   ├── gift-v1.0.mdx          # 증여 (§11①2: 3.5%)
│   │   │   │   ├── original-v1.0.mdx      # 원시취득/신축 (§11①3: 2.8%)
│   │   │   │   ├── multi-house-v1.0.mdx   # 다주택자 중과 (§13의2①2,3)
│   │   │   │   ├── corporate-v1.0.mdx     # 법인 취득 중과 (§13의2①1)
│   │   │   │   └── luxury-v1.0.mdx        # 고급주택 중과 (§13⑤3)
│   │   │   ├── farmland/                  # 농지
│   │   │   │   ├── general-v1.0.mdx       # 유상거래 (§11①7가: 3%)
│   │   │   │   ├── inheritance-v1.0.mdx   # 상속 (§11①1가: 2.3%)
│   │   │   │   └── gift-v1.0.mdx          # 증여 (§11①2: 3.5%)
│   │   │   └── non-farmland/              # 농지 외 (건물+토지)
│   │   │       ├── general-v1.0.mdx       # 유상거래 (§11①7나: 4%)
│   │   │       ├── inheritance-v1.0.mdx   # 상속 (§11①1나: 2.8%)
│   │   │       ├── gift-v1.0.mdx          # 증여 (§11①2: 3.5%)
│   │   │       └── original-v1.0.mdx      # 원시취득 (§11①3: 2.8%, §11③)
│   │   ├── non-realestate/                # 부동산 외 (§12)
│   │   │   └── non-realestate-v1.0.mdx    # 차량/선박/기계장비/항공기/입목/회원권 통합
│   │   └── common/                        # 공통 (물건 횡단 적용)
│   │       ├── division-v1.0.mdx          # 분할취득 (§11①5,6: 2.3%)
│   │       ├── metro-surcharge-v1.0.mdx   # 과밀억제권역 중과 (§13①②)
│   │       ├── luxury-surcharge-v1.0.mdx  # 사치성재산 중과 (§13⑤: 골프/오락장/선박)
│   │       ├── special-rates-v1.0.mdx     # 세율 특례/경감 (§15)
│   │       ├── rate-application-v1.0.mdx  # 세율 적용/추징 (§16)
│   │       ├── exemption-v1.0.mdx         # 면세점 (§17: 50만원)
│   │       └── housing-count-v1.0.mdx     # 주택 수 판단 (§13의3)
│   ├── themes/                            # 테마별 통합규정
│   │   ├── multi-house-v1.0.mdx           # 다주택자 중과 (§13의2 통합)
│   │   └── first-time-buyer-v1.0.mdx      # 생애최초 주택취득 감면 (§36의3)
│   └── standard/                          # 과세표준
│       └── standard-v1.0.mdx              # 과세표준
├── property/                              # 재산세
│   └── ...
└── vehicle/                               # 자동차세
    └── ...

lib/
├── navigation/
│   ├── nav.config.ts             # Navigation tree configuration (물건 기준 트리구조)
│   └── contentSequence.ts        # Infinite scroll sequence (각 카테고리별)
├── content/
│   ├── loader.ts                 # MDX content loader
│   ├── versions.ts               # Version management
│   └── search.ts                 # Search index & query
├── supabase/
│   ├── server.ts                 # Supabase server client (SUPABASE_SERVICE_ROLE_KEY)
│   ├── comments.ts               # 댓글 DB 조회/저장
│   └── attachments.ts            # 파일 메타 조회/저장 + Storage 업로드
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

**Structure Decision**: Next.js App Router structure. Route groups for tax categories. MDX content stored in `content/` directory with version suffixes. 세율은 물건 기준(주택/농지/농지외)으로 1차 분류, 취득원인(유상/상속/증여/원시취득)으로 2차 분류.

**Content Style**: 개조식 공문서 형식 (see [content-style-guide.md](./content-style-guide.md))
- 서술형 금지, 개조식 항목으로 작성
- 번호 체계: 1. → 가. → 1) → 가) → (1)
- 사례/예시 제외 (.deprecated의 사례 데이터 마이그레이션 안 함)
- 모든 MDX frontmatter에 `audience: internal` 필드 필수

**Content Organization Rationale**: 기존 취득원인별(유상/무상/원시취득) 구조에서 물건별(주택/농지/농지외) 구조로 변경. 이유:
- 세무 실무에서 물건 확인이 선행됨 (물건 → 취득원인 순서로 세율 결정)
- 지방세법 §11 체계가 물건별 세율 차등을 기본으로 함
- 주택은 중과(다주택/법인/고급주택) 등 고유 규정이 많아 별도 분류 필요
- 공통(common)은 물건 종류와 무관하게 적용되는 횡단 규정 (과밀억제권역, 사치성재산 등)

## Complexity Tracking

> No Constitution violations requiring justification.

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| Search | Client-side with pre-built index | Simplicity - no search server needed for ~24 pages |
| Versioning | Filename-based | Simplicity - no database needed, easy to manage |
| Infinite Scroll | Intersection Observer | Standard pattern, no external library needed |
| Content Structure | 물건 기준 (property-type-first) | 세무 실무 흐름과 법령 체계에 부합 |
| Comments & Attachments | API Route → Supabase (service key) | 서버에서 검증/권한 제어. 외부용 확장 시 인증 레이어 추가 용이. Key 노출 방지 |
