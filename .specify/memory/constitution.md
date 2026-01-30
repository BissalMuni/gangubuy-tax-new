<!--
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
