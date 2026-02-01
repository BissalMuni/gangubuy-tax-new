# Tasks: Local Tax Documentation Site

**Input**: Design documents from `/specs/1-local-tax-docs/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md, quickstart.md

**Tests**: TDD is NON-NEGOTIABLE per Constitution. Tests MUST be written first and FAIL before implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, etc.)
- Include exact file paths in descriptions

## Path Conventions (Next.js App Router)

- Pages: `app/`
- Components: `components/`
- Content: `content/`
- Libraries: `lib/`
- Tests: `tests/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Next.js 14+ project with TypeScript in repository root
- [x] T002 Install dependencies: Ant Design, Tailwind CSS, Zustand, @next/mdx, next-mdx-remote, flexsearch, @supabase/supabase-js
- [x] T003 [P] Configure TypeScript strict mode in tsconfig.json
- [x] T004 [P] Configure Tailwind CSS in tailwind.config.ts and app/globals.css
- [x] T005 [P] Configure ESLint and Prettier in .eslintrc.js and .prettierrc
- [x] T006 [P] Setup Vitest and React Testing Library in vitest.config.ts
- [x] T007 Create shared type definitions in lib/types/index.ts (NavigationNode, ContentMeta, ContentItem, Comment, Attachment, etc.)
- [x] T007.1 [P] Create Supabase server client in lib/supabase/server.ts with env variables (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
- [x] T007.2 [P] Create Supabase tables (comments, attachments) and Storage bucket via Supabase dashboard or migration SQL

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T008 Create root layout with Ant Design ConfigProvider in app/layout.tsx
- [x] T009 Create navigation configuration in lib/navigation/nav.config.ts
- [x] T010 [P] Create MDX content loader utility with nested path support in lib/content/loader.ts
- [x] T011 [P] Create sample MDX content file content/acquisition/rates/paid/sale/housing-v1.0.mdx (개조식 공문서 스타일, content-style-guide.md 참조)
- [x] T012 Configure MDX support in next.config.mjs with @next/mdx
- [x] T013 Create custom MDX components (Alert, Table, Criteria) in components/mdx/index.tsx
- [x] T014 Create 404 page in app/not-found.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Browse Tax Information (Priority: P1) 🎯 MVP

**Goal**: Users can browse tax content via tree navigation with proper layout (Header, Sidebar, Content)

**Independent Test**: Navigate to site, click navigation item, verify correct MDX content renders with highlighted nav item

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T015 [P] [US1] Unit test for navigation config parsing in tests/unit/navigation.test.ts
- [x] T016 [P] [US1] Unit test for MDX content loader in tests/unit/contentLoader.test.ts
- [ ] T017 [P] [US1] Integration test for content page rendering in tests/integration/contentPage.test.tsx

### Implementation for User Story 1

- [x] T018 [P] [US1] Create Header component in components/ui/Header.tsx
- [x] T019 [P] [US1] Create Sidebar component with Ant Design Menu in components/ui/Sidebar.tsx
- [x] T020 [US1] Create tax layout with sidebar in app/(tax)/layout.tsx
- [x] T021 [US1] Create MDXRenderer component in components/content/MDXRenderer.tsx
- [x] T022 [US1] Create ContentHeader component in components/content/ContentHeader.tsx
- [x] T023 [US1] Create catch-all tax content page in app/(tax)/acquisition/[...slug]/page.tsx (supports nested paths like /rates/paid/sale/housing)
- [x] T024 [P] [US1] Create property tax page in app/(tax)/property/[...slug]/page.tsx
- [x] T025 [P] [US1] Create vehicle tax page in app/(tax)/vehicle/[...slug]/page.tsx
- [x] T026 [US1] Create home page in app/page.tsx
- [x] T027 [US1] Add navigation highlight sync based on current path in Sidebar component
- [x] T028 [US1] Add tree expand/collapse state persistence using session storage

**Checkpoint**: User Story 1 complete - basic content browsing works

---

## Phase 4: User Story 2 - Infinite Scroll Navigation (Priority: P2)

**Goal**: Auto-load next content section on scroll, update URL and sidebar highlight

**Independent Test**: Open tax page, scroll to bottom, verify next content loads and URL updates

### Tests for User Story 2 ⚠️

- [x] T029 [P] [US2] Unit test for content sequence logic in tests/unit/contentSequence.test.ts
- [ ] T030 [P] [US2] Integration test for infinite scroll in tests/integration/infiniteScroll.test.tsx

### Implementation for User Story 2

- [x] T031 [US2] Create content sequence configuration in lib/navigation/contentSequence.ts
- [x] T032 [US2] Create InfiniteScrollLoader component using IntersectionObserver in components/content/InfiniteScrollLoader.tsx
- [x] T033 [US2] Implement URL update via history.replaceState in InfiniteScrollLoader
- [x] T034 [US2] Integrate InfiniteScrollLoader into tax content pages
- [x] T035 [US2] Add sidebar highlight sync on scroll-triggered content change

**Checkpoint**: User Story 2 complete - infinite scroll works independently

---

## Phase 5: User Story 3 - Responsive Layout (Priority: P2)

**Goal**: Mobile-friendly layout with alternative navigation for screens < 768px

**Independent Test**: Resize browser to mobile width, verify sidebar hides and mobile nav appears

### Tests for User Story 3 ⚠️

- [ ] T036 [P] [US3] Integration test for responsive layout in tests/integration/responsive.test.tsx

### Implementation for User Story 3

- [x] T037 [US3] Create MobileNav component with drawer menu in components/ui/MobileNav.tsx
- [x] T038 [US3] Add responsive breakpoint logic to app/(tax)/layout.tsx
- [x] T039 [US3] Add Tailwind responsive classes to content area for proper width adjustment
- [x] T040 [US3] Implement hamburger menu toggle button in Header for mobile
- [x] T041 [US3] Ensure MobileNav has same tree structure as desktop Sidebar

**Checkpoint**: User Story 3 complete - mobile layout works independently

---

## Phase 6: User Story 4 - Font Size Adjustment (Priority: P3)

**Goal**: Users can adjust content font size with persistence across sessions

**Independent Test**: Click font size control, verify text changes, refresh and verify setting persists

### Tests for User Story 4 ⚠️

- [x] T042 [P] [US4] Unit test for preferences store in tests/unit/preferences.test.ts

### Implementation for User Story 4

- [x] T043 [US4] Create Zustand preferences store with localStorage persist in lib/stores/preferences.ts
- [x] T044 [US4] Create FontSizeControl component in components/ui/FontSizeControl.tsx
- [x] T045 [US4] Add CSS variables for font size levels in app/globals.css
- [x] T046 [US4] Integrate FontSizeControl into content layout
- [x] T047 [US4] Apply font size to MDXRenderer based on preference

**Checkpoint**: User Story 4 complete - font size adjustment works independently

---

## Phase 7: User Story 5 - Content Version History (Priority: P3)

**Goal**: Users can view and switch between different versions of content

**Independent Test**: Navigate to content with multiple versions, use version selector, verify version switches

### Tests for User Story 5 ⚠️

- [x] T048 [P] [US5] Unit test for version parsing and loading in tests/unit/versions.test.ts
- [ ] T049 [P] [US5] Integration test for version selector in tests/integration/versionSelector.test.tsx

### Implementation for User Story 5

- [x] T050 [US5] Create version management utility in lib/content/versions.ts
- [ ] T051 [US5] Create additional versioned content file content/acquisition/rates-v1.1.mdx
- [x] T052 [US5] Create VersionSelector component in components/ui/VersionSelector.tsx
- [x] T053 [US5] Integrate VersionSelector into ContentHeader
- [x] T054 [US5] Add version query parameter handling (?v=1.0) to content pages
- [x] T055 [US5] Show "viewing older version" indicator when not on latest

**Checkpoint**: User Story 5 complete - version history works independently

---

## Phase 8: User Story 6 - Search (Priority: P2)

**Goal**: Full-text search across content with results page

**Independent Test**: Navigate to search page, enter query, verify results display with highlighted keywords

### Tests for User Story 6 ⚠️

- [x] T056 [P] [US6] Unit test for search index and query in tests/unit/search.test.ts
- [ ] T057 [P] [US6] Integration test for search page in tests/integration/search.test.tsx

### Implementation for User Story 6

- [x] T058 [US6] Create search index builder and query utility in lib/content/search.ts
- [x] T059 [US6] Create SearchInput component in components/search/SearchInput.tsx
- [x] T060 [US6] Create SearchResults component with keyword highlighting in components/search/SearchResults.tsx
- [x] T061 [US6] Create search page in app/search/page.tsx
- [x] T062 [US6] Generate search index at build time in next.config.mjs or scripts/

**Checkpoint**: User Story 6 complete - search works independently

---

## Phase 9: User Story 7 - Content Comments (Priority: P2)

**Goal**: Users can leave comments on each MDX content page

**Independent Test**: Navigate to content, submit comment, refresh, verify comment persists

### Tests for User Story 7 ⚠️

- [ ] T072 [P] [US7] Unit test for comment CRUD in tests/unit/comments.test.ts
- [ ] T073 [P] [US7] Integration test for comment section in tests/integration/comments.test.tsx

### Implementation for User Story 7

- [x] T074 [US7] Create comment DB utility in lib/supabase/comments.ts (server-side only)
- [x] T075 [US7] Create API Route: GET, POST /api/comments in app/api/comments/route.ts (입력값 검증 포함)
- [x] T075.1 [US7] Create API Route: DELETE /api/comments/[id] in app/api/comments/[id]/route.ts (작성자 확인)
- [x] T076 [P] [US7] Create CommentItem component in components/comments/CommentItem.tsx
- [x] T077 [P] [US7] Create CommentForm component in components/comments/CommentForm.tsx
- [x] T078 [US7] Create CommentList component in components/comments/CommentList.tsx
- [x] T079 [US7] Integrate CommentList below MDX content in tax content pages

**Checkpoint**: User Story 7 complete - comments work independently

---

## Phase 10: User Story 8 - Content File Attachments (Priority: P2)

**Goal**: Users can upload and download files attached to each MDX content page

**Independent Test**: Navigate to content, upload file, refresh, verify file appears and is downloadable

### Tests for User Story 8 ⚠️

- [ ] T080 [P] [US8] Unit test for attachment CRUD in tests/unit/attachments.test.ts
- [ ] T081 [P] [US8] Integration test for attachment section in tests/integration/attachments.test.tsx

### Implementation for User Story 8

- [x] T082 [US8] Create attachment DB/Storage utility in lib/supabase/attachments.ts (server-side only)
- [x] T083 [US8] Create API Route: GET, POST /api/attachments in app/api/attachments/route.ts (크기/타입 검증 포함)
- [x] T083.1 [US8] Create API Route: DELETE /api/attachments/[id] in app/api/attachments/[id]/route.ts (업로더 확인 + Storage 삭제)
- [x] T084 [P] [US8] Create AttachmentUpload component in components/attachments/AttachmentUpload.tsx
- [x] T085 [P] [US8] Create AttachmentList component in components/attachments/AttachmentList.tsx
- [x] T086 [US8] Integrate AttachmentList and AttachmentUpload into tax content pages
- [x] T087 [US8] Add file download via Supabase Storage public URL

**Checkpoint**: User Story 8 complete - file attachments work independently

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T063 [P] Create acquisition/rates MDX files (유상취득: 매매-주택/농지/건물, 교환, 분할) - 개조식, 사례 제외
- [ ] T064 [P] Create acquisition/rates MDX files (무상취득: 상속-주택/농지, 증여-주택/농지) - 개조식, 사례 제외
- [ ] T065 [P] Create acquisition/rates MDX files (원시취득: 신축, 사치성: 고급주택/골프/과점주주) - 개조식, 사례 제외
- [x] T066 [P] Add SEO metadata to all pages using Next.js Metadata API
- [ ] T067 Performance optimization: implement content pre-fetching for infinite scroll
- [x] T068 Add error boundary component for graceful error handling
- [ ] T069 Run all tests and ensure 80%+ coverage
- [ ] T070 Validate against quickstart.md scenarios
- [ ] T071 Final accessibility check (keyboard navigation, ARIA labels)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-8)**: All depend on Foundational phase completion
  - US1 (P1) → US2 (P2) and US3 (P2) can run in parallel after US1
  - US4 (P3), US5 (P3), US6 (P2) can run in parallel after Foundational
- **US7 Comments (Phase 9)**: Depends on Foundational phase + Supabase setup (T007.1, T007.2)
- **US8 Attachments (Phase 10)**: Depends on Foundational phase + Supabase setup (T007.1, T007.2)
- **Polish (Phase 11)**: Depends on all user stories being complete

### User Story Dependencies

| Story | Depends On | Can Parallel With |
|-------|------------|-------------------|
| US1 (Browse) | Foundational | - |
| US2 (Infinite Scroll) | US1 (uses content pages) | US3, US4, US5, US6 |
| US3 (Responsive) | US1 (modifies layout) | US2, US4, US5, US6 |
| US4 (Font Size) | Foundational | US2, US3, US5, US6 |
| US5 (Versions) | Foundational | US2, US3, US4, US6 |
| US6 (Search) | Foundational | US2, US3, US4, US5, US7, US8 |
| US7 (Comments) | Foundational + Supabase | US2, US3, US4, US5, US6, US8 |
| US8 (Attachments) | Foundational + Supabase | US2, US3, US4, US5, US6, US7 |

### Within Each User Story

1. Tests MUST be written and FAIL before implementation
2. Components before pages
3. Utilities before components that use them
4. Core implementation before integration

### Parallel Opportunities

```bash
# Phase 1 - Setup (parallel):
T003, T004, T005, T006 can run in parallel

# Phase 2 - Foundational (parallel):
T010, T011 can run in parallel

# Phase 3 - US1 Tests (parallel):
T015, T016, T017 can run in parallel

# Phase 3 - US1 Implementation (parallel):
T018, T019 can run in parallel
T024, T025 can run in parallel

# Different user stories can run in parallel after Foundational
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test US1 independently
5. Deploy/demo if ready - users can browse tax content!

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (Browse) → Deploy (MVP!)
3. Add US2 (Scroll) + US3 (Responsive) → Deploy
4. Add US4 (Font) + US5 (Versions) + US6 (Search) → Deploy
5. Polish → Final release

### Recommended Order for Solo Developer

1. Phase 1: Setup (T001-T007)
2. Phase 2: Foundational (T008-T014)
3. Phase 3: US1 Browse (T015-T028) ← **MVP**
4. Phase 5: US3 Responsive (T036-T041)
5. Phase 4: US2 Infinite Scroll (T029-T035)
6. Phase 8: US6 Search (T056-T062)
7. Phase 6: US4 Font Size (T042-T047)
8. Phase 7: US5 Versions (T048-T055)
9. Phase 9: US7 Comments (T072-T079)
10. Phase 10: US8 Attachments (T080-T087)
11. Phase 11: Polish (T063-T071)

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- TDD required: Write tests first, verify they fail, then implement
- Commit after each task or logical group
- Each checkpoint = deployable increment
- Total tasks: 89
- Content structure: 취득원인 우선 트리구조 (유상→무상→원시→사치성)
- Content style: 개조식 공문서 형식 (content-style-guide.md 참조)
- Content exclusion: .deprecated 사례 데이터 마이그레이션 안 함
