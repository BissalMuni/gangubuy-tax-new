<!--
<<<<<<< HEAD
Sync Impact Report (v1.0.0)
=========================
Version Change: Initial → 1.0.0
Modified Principles: N/A (Initial creation)
Added Sections: All core principles, Technical Standards, Development Workflow, Governance
Removed Sections: N/A

Templates Status:
✅ plan-template.md - Aligned (Constitution Check section references this document)
✅ spec-template.md - Aligned (User stories support independent testing principle)
✅ tasks-template.md - Aligned (Phase structure supports MDX version management)
⚠ Commands need awareness of Next.js + Supabase + MDX stack

Follow-up TODOs: None
-->

# Tax Information System Constitution

## Core Principles

### I. MDX-First Content Management (NON-NEGOTIABLE)

All tax information content MUST be authored and stored as MDX files with structured frontmatter:

- **Single Source of Truth**: MDX files are the authoritative source for all tax content
- **Structured Frontmatter Required**: Every MDX file MUST include version, title, effectiveDate, lastUpdated, tags, legalBasis
- **Version Metadata Management**: Each content directory MUST maintain a `_meta.json` file tracking all versions
- **No Direct Database Content**: Tax content lives in MDX; database only stores references, user data, and analytics

**Rationale**: MDX enables version control, content review workflows, and non-technical stakeholder contributions while maintaining type safety and component integration.

### II. Version-Controlled Content Updates

Content updates MUST create new versioned files rather than modifying existing ones:

- **Immutable Versions**: Existing MDX files (`v1.0.0.mdx`, `v1.1.0.mdx`) are NEVER modified after publication
- **New File Per Update**: Each content change creates a new file with incremented semantic version
- **Effective Dates Required**: Every version MUST specify `effectiveDate` (when the information takes legal effect)
- **Changelog Tracking**: `_meta.json` MUST maintain a complete changelog with version, date, and description
- **Current Version Flag**: `_meta.json` MUST mark exactly one version as `isCurrent: true`

**Rationale**: Tax laws change frequently with specific effective dates. Immutable versioning ensures historical accuracy for legal compliance and audit trails.

### III. Tree Navigation Architecture

Navigation structure MUST be externalized from components and stored as configuration:

- **External Config**: Tree structure defined in `config/navigation.ts` or similar, NOT hardcoded in components
- **Schema-Driven**: Navigation nodes include `id`, `label`, `contentPath`, `children` properties
- **Content Path Mapping**: Each leaf node MUST reference a specific MDX file path
- **Dynamic Loading**: Components consume navigation config at runtime, enabling structure changes without component modifications
- **i18n Support**: Navigation structure MUST support localization keys for multi-language display

**Rationale**: Separating navigation from components enables non-developer content managers to restructure menus, simplifies testing, and supports A/B testing of information architecture.

### IV. Data Accuracy & Legal Compliance (NON-NEGOTIABLE)

Every piece of tax information MUST meet accuracy and legal standards:

- **Legal Basis Required**: All tax rates, rules, and regulations MUST cite specific legal authority (e.g., "지방세법 제11조")
- **Expert Review**: Content changes affecting tax calculations or legal interpretations require review by qualified personnel
- **Deprecation Warnings**: Outdated content MUST display prominent warnings and link to current versions
- **Legal Disclaimer**: Every page MUST display the legal notice: "이 시스템은 정보 제공 목적으로만 사용되며, 실제 세무 상담이나 법적 조언을 대체할 수 없습니다."
- **Source Attribution**: Data sourced from external authorities (e.g., 국세청) MUST be attributed with reference links
- **No Calculation Without Disclosure**: Tax calculators MUST display methodology, assumptions, and limitations

**Rationale**: Incorrect tax information can lead to financial harm and legal liability. Rigorous accuracy standards protect users and the organization.

### V. Accessibility & Progressive Enhancement

User experience MUST be inclusive and resilient:

- **WCAG 2.1 AA Minimum**: All UI components MUST meet Level AA accessibility standards
- **Keyboard Navigation**: Tree navigation and all interactive elements MUST be fully keyboard-accessible
- **Scroll-Linked Navigation**: Implement Intersection Observer for scroll-to-section auto-highlighting (graceful degradation if JS disabled)
- **Responsive Layout**: Three-column layout (header, tree nav, content) MUST adapt to mobile (stacked), tablet (collapsible nav), desktop (fixed nav)
- **Semantic HTML**: Use proper heading hierarchy (h1-h6), landmark roles, ARIA labels where appropriate
- **Performance Budget**: Initial page load <3s on 3G, First Contentful Paint <1.5s

**Rationale**: Tax information is a public service; accessibility ensures all citizens can access vital information regardless of ability or device.

### VI. Next.js App Router Conventions

Follow Next.js 14+ best practices and architectural patterns:

- **App Router Only**: Use `app/` directory structure; no Pages Router patterns
- **Server Components Default**: Components are Server Components unless `'use client'` directive is required
- **File-Based Routing**: Route structure mirrors file system; use `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` conventions
- **Data Fetching**: Use async Server Components for data fetching; minimize client-side fetching
- **Metadata API**: Generate SEO metadata using Next.js Metadata API (generateMetadata, metadata objects)
- **Image Optimization**: Use next/image with width/height or fill; provide alt text
- **Route Handlers**: API routes use `app/api/[route]/route.ts` with proper HTTP method exports

**Rationale**: Next.js conventions optimize performance, SEO, and developer experience. Consistency with framework standards reduces cognitive load.

### VII. Supabase Integration Standards

Database and authentication interactions MUST follow Supabase best practices:

- **Row-Level Security (RLS)**: Enable RLS on all tables; define policies for read/write access
- **Typed Client**: Use Supabase TypeScript codegen (`supabase gen types typescript`) for type-safe queries
- **Edge Functions for Mutations**: Complex operations (e.g., multi-table updates) use Supabase Edge Functions, not client-side logic
- **Real-Time Subscriptions**: Use Supabase real-time only when justified (e.g., collaborative features); avoid for static content
- **Auth Middleware**: Implement Next.js middleware for authentication checks; refresh tokens automatically
- **Storage Buckets**: Organize file uploads by purpose (e.g., `user-uploads`, `legal-documents`) with appropriate policies

**Rationale**: Supabase security and performance depend on proper RLS, type safety prevents runtime errors, and edge functions reduce client complexity.

## Technical Standards

### Technology Stack (MANDATORY)

**Framework & Runtime**:
- Next.js 15.x (App Router)
- React 19
- TypeScript 5.x
- Node.js 20 LTS

**Styling & UI**:
- Tailwind CSS 4.x
- shadcn/ui components
- Radix UI primitives (accessibility)

**Content & Data**:
- next-mdx-remote (MDX rendering)
- gray-matter (frontmatter parsing)
- Supabase (PostgreSQL + Auth + Storage)

**Development & Quality**:
- ESLint + Prettier (enforced via pre-commit hooks)
- Husky (git hooks)
- TypeScript strict mode enabled
- Playwright or Cypress (E2E testing, if tests requested)

**Deployment**:
- Vercel (production + preview deployments)
- Environment variables via Vercel project settings
- Automatic deployment on `main` branch push

### File Structure (MANDATORY)

```
gangubuy-tax-new/
├── app/                          # Next.js App Router
│   ├── (routes)/                 # Route groups
│   │   ├── layout.tsx            # Root layout (header)
│   │   └── page.tsx              # Home page
│   ├── api/                      # API routes
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── navigation/
│   │   ├── TreeNav.tsx           # Tree navigation component
│   │   └── ScrollSpy.tsx         # Scroll-linked highlighting
│   ├── content/
│   │   └── MDXRenderer.tsx       # MDX content wrapper
│   └── ui/                       # shadcn/ui components
├── config/
│   ├── navigation.ts             # Tree structure definition
│   └── site.ts                   # Site-wide config
├── content/                      # MDX content files
│   ├── acquisition-tax/
│   │   ├── paid/
│   │   │   ├── real-estate/
│   │   │   │   ├── v1.0.0.mdx
│   │   │   │   ├── v1.1.0.mdx
│   │   │   │   └── _meta.json
│   │   │   └── vehicle/
│   │   │       └── ...
│   │   └── free/
│   │       └── ...
│   └── local-education-tax/
│       └── ...
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Supabase client
│   │   └── server.ts             # Supabase server client
│   └── mdx.ts                    # MDX utilities
├── types/
│   ├── database.types.ts         # Generated Supabase types
│   └── content.types.ts          # Content metadata types
└── public/
    └── ...
```

### MDX Frontmatter Schema (MANDATORY)

Every MDX file MUST include this frontmatter structure:

```yaml
---
version: "1.0.0"                  # Semantic version
title: "부동산 취득세 (유상취득)"    # Display title
effectiveDate: "2025-01-01"       # When this version takes legal effect
lastUpdated: "2025-01-15"         # Last edit date
tags: ["취득세", "부동산"]          # Categories/tags
legalBasis: "지방세법 제11조"       # Legal citation
deprecated: false                 # Whether this version is outdated
supersededBy: null                # If deprecated, path to current version
---
```

### Version Metadata Schema (MANDATORY)

Every content directory MUST include `_meta.json`:

```json
{
  "versions": [
    {
      "version": "1.1.0",
      "file": "v1.1.0.mdx",
      "effectiveDate": "2025-01-01",
      "description": "세율 변경 반영",
      "changes": ["표준세율 1.0% → 1.5%", "감면 대상 추가"],
      "isCurrent": true
    },
    {
      "version": "1.0.0",
      "file": "v1.0.0.mdx",
      "effectiveDate": "2024-01-01",
      "description": "초기 버전",
      "isCurrent": false
    }
  ],
  "changelog": "/changelog/acquisition-tax-real-estate.md"
}
```

## Development Workflow

### Content Update Workflow

1. **Create New Version File**: Copy latest version (e.g., `v1.1.0.mdx` → `v1.2.0.mdx`)
2. **Update Frontmatter**: Increment version, set effectiveDate, update lastUpdated
3. **Update _meta.json**: Add new version entry, set `isCurrent: true`, update previous version to `isCurrent: false`
4. **Legal Review**: Submit PR for review by authorized personnel (for substantive changes)
5. **Merge & Deploy**: Merge to `main` triggers Vercel deployment
6. **User Notification**: If version includes breaking changes (e.g., rate increases), notify users via banner

### Code Review Requirements

- **Two Approvals**: All PRs require 2 approvals before merge
- **Constitution Compliance**: Reviewer MUST verify adherence to principles I-VII
- **Accessibility Check**: Reviewer MUST test keyboard navigation for UI changes
- **Performance Check**: Lighthouse score must not regress >5 points
- **Type Safety**: No `any` types without explicit justification comment
- **Legal Disclaimer**: Verify legal notice appears on all public-facing pages

### Git Commit Conventions

Follow Conventional Commits:

```
feat: Add v2.0.0 acquisition tax rates (effective 2025-07-01)
fix: Correct legal basis citation for inheritance tax
docs: Update constitution principle IV
chore: Update Supabase types
```

### Testing Strategy (when tests are requested)

- **E2E Tests**: Critical user journeys (search tax info, navigate tree, view version history)
- **Component Tests**: Interactive components (TreeNav, ScrollSpy, MDX renderer)
- **Accessibility Tests**: Automated axe-core scans on all pages
- **Performance Tests**: Lighthouse CI on every PR (budget: Performance >90, Accessibility 100)

## Governance

### Amendment Procedure

1. **Proposal**: Submit PR with proposed constitution changes + rationale
2. **Discussion**: Minimum 3 business days for team review and comments
3. **Approval**: Requires unanimous approval from project maintainers
4. **Version Bump**: Increment constitution version per semantic versioning rules:
   - **MAJOR**: Removed principles or backward-incompatible governance changes
   - **MINOR**: Added principles or materially expanded sections
   - **PATCH**: Clarifications, typo fixes, non-semantic refinements
5. **Propagation**: Update all dependent templates (plan, spec, tasks, commands) to reflect changes
6. **Communication**: Announce changes to all contributors via project communication channel

### Version Increment Rules

- **Breaking Change** (MAJOR): Principle removed, scope narrowed, new blocker added
- **Additive Change** (MINOR): New principle, expanded guidance, new standard
- **Editorial Change** (PATCH): Wording improvements, examples, formatting

### Compliance Reviews

- **Every PR**: Automated checks for file structure, naming conventions, frontmatter schema
- **Monthly Audit**: Manual review of 10 random content files for accuracy and legal citation
- **Quarterly Review**: Assess constitution effectiveness; propose amendments if needed
- **Annual Legal Review**: External legal expert reviews tax content accuracy and disclaimer adequacy

### Dispute Resolution

1. If contributors disagree on constitution interpretation, escalate to project lead
2. Project lead decision is binding unless overruled by unanimous maintainer vote
3. Interpretation precedents are documented in `docs/constitution-faqs.md`

### Complexity Justification

Any violation of simplicity principles (e.g., introducing new abstraction layers, third-party services beyond approved stack) MUST:

1. Document the specific problem being solved
2. Explain why simpler alternatives are insufficient
3. Estimate maintenance burden
4. Receive approval via standard PR process

**Version**: 1.0.0 | **Ratified**: 2026-01-29 | **Last Amended**: 2026-01-29
=======
Sync Impact Report
- Version change: 0.0.0 → 1.0.0
- Modified principles: N/A (initial creation)
- Added sections:
  - Core Principles (5 principles)
  - Content Constraints
  - Development Workflow
  - Governance
- Removed sections: None
- Templates requiring updates:
  - .specify/templates/plan-template.md ✅ No changes needed (Constitution Check section is generic)
  - .specify/templates/spec-template.md ✅ No changes needed (spec structure is compatible)
  - .specify/templates/tasks-template.md ✅ No changes needed (task structure is compatible)
- Follow-up TODOs: None
-->

# Gangubuy 지방세 문서 사이트 Constitution

## Core Principles

### I. 대상 분리 (Audience Separation)

모든 콘텐츠는 반드시 **대상(audience)**이 명시되어야 한다.

- 콘텐츠 대상은 `internal` (세무부서 직원용) 또는 `public` (대시민공개용) 중 하나로 분류되어야 한다
- 현재 단계에서는 `internal` 콘텐츠만 생성한다
- `public` 콘텐츠는 반드시 `internal` 콘텐츠의 부분집합이어야 한다
- 대시민공개 전환 시, 해당 콘텐츠에 대한 별도 검토 절차를 거쳐야 한다
- 대상 정보는 콘텐츠 메타데이터(frontmatter)에 명시해야 한다

**근거**: 세무행정 정보는 직원용 상세 정보와 민원인용 안내 정보의 깊이와 범위가 다르므로, 혼재 시 정보 노출 사고 또는 혼란이 발생할 수 있다.

### II. 개조식 공문서 스타일 (Government Document Style)

모든 세무 콘텐츠는 **개조식 공문서 형식**을 따라야 한다.

- 서술형 문장 대신 번호/글머리 기호를 사용한 구조화된 형식을 사용해야 한다
- 세율, 요건 등은 반드시 표(table) 형식으로 정리해야 한다
- 법령 근거를 반드시 명시해야 한다
- 전문적이고 간결한 행정 용어를 사용해야 한다

**근거**: 세무 문서는 정확성과 일관성이 핵심이며, 개조식은 정보 검색과 비교에 최적화된 형식이다.

### III. 정보 정확성 (Content Accuracy)

세무 정보는 반드시 법적 근거에 기반해야 한다.

- 세율, 과세표준, 감면 조건 등 수치 정보는 관련 법령을 출처로 명시해야 한다
- 법령 개정 시 해당 콘텐츠를 즉시 갱신해야 한다
- 불확실한 해석이 포함된 경우 반드시 그 사실을 표기해야 한다

**근거**: 잘못된 세무 정보는 실무 오류와 민원을 초래한다.

### IV. 단순성 (Simplicity)

구현은 현재 필요한 최소한의 복잡도만 허용한다.

- 가상의 미래 요구사항을 위한 추상화를 만들지 않는다 (YAGNI)
- 한 번만 쓰이는 로직을 위한 유틸리티/헬퍼를 만들지 않는다
- 외부 의존성 추가 시 반드시 명확한 이유가 있어야 한다

**근거**: 일인개발 프로젝트에서 과도한 엔지니어링은 유지보수 부담을 증가시킨다.

### V. 점진적 공개 (Incremental Release)

콘텐츠와 기능은 단계적으로 공개한다.

- 1단계: 세무부서 직원용(`internal`) 콘텐츠 완성
- 2단계: 직원용 콘텐츠 중 대시민공개 적합 항목 선별 및 검토
- 3단계: 선별된 콘텐츠를 `public`으로 전환하여 공개
- 각 단계는 이전 단계가 완료된 후 진행해야 한다

**근거**: 직원용 정보 체계를 먼저 확립한 후 공개 범위를 결정하는 것이 정보 품질과 보안 측면에서 안전하다.

## Content Constraints

- 콘텐츠 파일은 MDX 형식을 사용한다
- 모든 MDX 파일의 frontmatter에 `audience` 필드(`internal` | `public`)를 포함해야 한다
- 세금 종류별 분류 체계: 취득세, 재산세, 자동차세 (추후 확장 가능)
- 콘텐츠 변경 시 버전 이력을 관리해야 한다

## Development Workflow

- `main` 브랜치에서 직접 작업한다 (일인개발)
- 커밋 메시지는 변경 내용을 명확히 기술한다
- speckit 워크플로우를 통해 기능 명세 → 계획 → 태스크 순서로 진행한다
- 콘텐츠 추가와 기능 구현을 구분하여 커밋한다

## Governance

- 이 Constitution은 프로젝트의 모든 설계 및 구현 결정에 우선한다
- 원칙 변경 시 이 문서를 먼저 수정하고, 관련 산출물에 반영한다
- 대상 분리(Principle I) 위반은 어떤 경우에도 허용하지 않는다

**Version**: 1.0.0 | **Ratified**: 2026-01-31 | **Last Amended**: 2026-01-31
>>>>>>> 9e33101fa373775de70c7d7e1713d78538caaddf
