<!--
Sync Impact Report
==================
Version change: 0.0.0 → 1.0.0 (Initial ratification)

Added sections:
- Core Principles (5 principles)
- Technology Stack
- Development Workflow
- Governance

Templates requiring updates:
- .specify/templates/plan-template.md: ✅ updated (Next.js App Router structure option added)
- .specify/templates/spec-template.md: ✅ compatible
- .specify/templates/tasks-template.md: ✅ compatible (TDD reflected)

Follow-up TODOs: None
-->

# Gangubuy Tax Constitution

## Core Principles

### I. Component-Based Design

All UI MUST be composed of reusable component units.

- Components MUST follow the Single Responsibility Principle
- Common components reside in `components/ui/`, domain components in `components/[domain]/`
- Components MUST explicitly define Props interfaces
- Use Ant Design components as the base; wrap only when customization is required

### II. Type Safety

Use TypeScript to catch errors at compile time.

- `any` type is PROHIBITED (if unavoidable, document the reason in comments)
- All functions MUST specify parameter and return types
- API responses and DB schemas MUST be defined as types/interfaces
- `strict: true` configuration is REQUIRED

### III. Test-First (TDD) - NON-NEGOTIABLE

Write tests first, verify they fail, then implement.

- Red → Green → Refactor cycle MUST be strictly followed
- Tax calculation logic MUST include unit tests
- Tax-related code CANNOT be merged without tests
- Coverage target: 100% for tax calculation logic, 80%+ overall

### IV. Data Accuracy

Tax information MUST be accurate. Incorrect tax information causes real harm to users.

- All tax rates/standards MUST cite their source (laws, regulations)
- Tax calculation results MUST be backed by verifiable test cases
- Document data update procedures when laws change
- Formulas used in calculations MUST include comments citing legal basis

### V. Simplicity

Build only what is needed. Avoid over-abstraction.

- YAGNI: Do not build features not currently needed
- Do not abstract until something repeats 3+ times
- Convention over Configuration
- Break complex logic into small functions, but avoid excessive layering

## Technology Stack

Defines the technology stack used in this project.

| Area | Technology | Notes |
|------|------------|-------|
| Framework | Next.js 14+ (App Router) | SSR/SSG support, API Routes |
| Language | TypeScript 5+ | strict mode required |
| UI Library | Ant Design 5+ | Base UI components |
| Styling | Tailwind CSS | Utility-first CSS |
| State | Zustand | Client state management |
| Data Fetching | TanStack Query | Server state management, caching |
| Database | Supabase (PostgreSQL) | Auth, realtime features included |
| Testing | Vitest + Testing Library | Unit/integration tests |
| Deployment | Vercel | Next.js optimized deployment |

## Development Workflow

Defines development process and quality standards.

### Branch Strategy

- `main`: Production deployment branch
- `feature/[feature-name]`: Feature development branches
- `fix/[issue-number]`: Bug fix branches

### Commit Convention

```
type: brief description

- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- refactor: Code refactoring
- test: Add/modify tests
- chore: Build, config changes
```

### PR Checklist

- [ ] No TypeScript compilation errors
- [ ] All tests pass
- [ ] Test cases added for tax calculation logic changes
- [ ] No lint errors

## Governance

The Constitution supersedes all other development practices in this project.

- All PRs MUST verify Constitution compliance
- Constitution amendments MUST include documentation, version update, and impact analysis
- If principle violation is unavoidable, document the reason and alternatives considered in the PR

### Versioning

- MAJOR: Principle removal or fundamental changes
- MINOR: New principles/sections added
- PATCH: Wording fixes, clarifications

**Version**: 1.0.0 | **Ratified**: 2026-01-28 | **Last Amended**: 2026-01-28
