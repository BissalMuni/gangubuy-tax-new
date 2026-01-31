# Research: Local Tax Documentation Site

**Feature**: 1-local-tax-docs
**Date**: 2026-01-28

## MDX Integration with Next.js App Router

### Decision
Use `@next/mdx` with `next-mdx-remote` for dynamic MDX loading.

### Rationale
- `@next/mdx` provides native Next.js integration with App Router
- `next-mdx-remote` allows loading MDX from file system at build/runtime
- Supports custom components (Alert, Table, Criteria) needed for tax content
- SSG-compatible for optimal performance

### Alternatives Considered
| Option | Pros | Cons | Rejected Because |
|--------|------|------|------------------|
| Contentlayer | Type-safe, great DX | Heavy setup, less flexible versioning | Over-engineered for our needs |
| MDX-bundler | Flexible | Complex setup | Unnecessary complexity |
| Plain Markdown | Simple | No custom components | Need rich components for tax info |

## Client-Side Search Implementation

### Decision
Use Flexsearch with pre-built search index generated at build time.

### Rationale
- No server-side search infrastructure needed (Simplicity principle)
- Fast client-side search for ~50 pages
- Index can be pre-built during `next build`
- Supports Korean text search

### Alternatives Considered
| Option | Pros | Cons | Rejected Because |
|--------|------|------|------------------|
| Algolia | Powerful, hosted | Paid, overkill for small site | YAGNI - too complex |
| Elasticsearch | Full-featured | Requires server infrastructure | Violates Simplicity |
| Fuse.js | Simple | Slower on larger datasets | Flexsearch is faster |
| Native filter | Zero dependencies | Poor search quality | Bad UX for Korean text |

## Infinite Scroll Pattern

### Decision
Use Intersection Observer API with content sequence configuration.

### Rationale
- Native browser API, no external library needed
- Works with SSR/SSG content
- Existing pattern proven in `.deprecated` implementation
- URL updates via `history.replaceState()`

### Implementation Approach
```typescript
// contentSequence.ts pattern
const ACQUISITION_SEQUENCE = ['rates', 'standard', 'requirements', 'special'];

// InfiniteScrollLoader uses IntersectionObserver
// When bottom sentinel enters viewport → load next in sequence
// When content scrolls into view → update URL and sidebar highlight
```

## Content Versioning Strategy

### Decision
Filename-based versioning: `{content-name}-v{major}.{minor}.mdx`

### Rationale
- Simple file system organization
- No database required
- Easy to enumerate versions via glob pattern
- Works with Next.js static generation

### File Structure
```
content/acquisition/
├── rates-v1.0.mdx      # Original version
├── rates-v1.1.mdx      # Minor update
├── rates-v2.0.mdx      # Major revision (latest)
├── standard-v1.0.mdx
└── ...
```

### Version Loading Logic
```typescript
// versions.ts
async function getContentVersions(category: string, slug: string) {
  const files = await glob(`content/${category}/${slug}-v*.mdx`);
  return files.map(parseVersion).sort(byVersionDesc);
}
```

## Responsive Design Approach

### Decision
Mobile-first with Tailwind CSS breakpoints + Ant Design responsive components.

### Rationale
- Tailwind provides consistent breakpoint system
- Ant Design Grid and responsive utilities built-in
- Mobile navigation transforms at 768px (md breakpoint)

### Breakpoints
| Breakpoint | Width | Layout |
|------------|-------|--------|
| default | < 768px | Mobile nav, full-width content |
| md | 768px - 1024px | Collapsible sidebar |
| lg | > 1024px | Fixed sidebar |

## Font Size Persistence

### Decision
Zustand store with localStorage persistence.

### Rationale
- Zustand is already in tech stack (Constitution)
- Built-in persist middleware for localStorage
- Simple API, minimal boilerplate
- Works with SSR (hydration-safe)

### Implementation
```typescript
// stores/preferences.ts
const usePreferences = create(
  persist(
    (set) => ({
      fontSize: 'medium', // 'small' | 'medium' | 'large'
      setFontSize: (size) => set({ fontSize: size }),
    }),
    { name: 'user-preferences' }
  )
);
```

## Navigation Configuration

### Decision
TypeScript configuration file with type-safe navigation tree.

### Rationale
- Type safety for navigation structure
- IDE autocompletion and error checking
- Single source of truth for routes and labels
- Easy to update and maintain

### Structure Reference
Based on `.deprecated/src/config/menu.config.tsx` pattern, adapted for Next.js App Router.

```typescript
// nav.config.ts
export const navigation: NavigationConfig = {
  home: { label: '홈', path: '/', icon: HomeOutlined },
  acquisition: {
    label: '취득세',
    icon: KeyOutlined,
    children: {
      rates: { label: '세율', path: '/acquisition/rates' },
      standard: { label: '과세표준', path: '/acquisition/standard' },
      // ...
    }
  },
  // ...
  search: { label: '검색', path: '/search', icon: SearchOutlined }
};
```

## Summary: All Unknowns Resolved

| Topic | Decision |
|-------|----------|
| MDX Integration | @next/mdx + next-mdx-remote |
| Search | Flexsearch (client-side, pre-built index) |
| Infinite Scroll | Intersection Observer API |
| Versioning | Filename-based (content-v1.0.mdx) |
| Responsive | Tailwind breakpoints + Ant Design |
| Preferences | Zustand with localStorage persist |
| Navigation | TypeScript config file |
