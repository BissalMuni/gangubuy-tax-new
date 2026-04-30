# Quickstart: Local Tax Documentation Site

**Feature**: 1-local-tax-docs
**Date**: 2026-01-28

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

## Setup

```bash
# Clone and enter directory
cd gangubuy-tax-new

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3001
```

## Project Structure Overview

```
├── app/                    # Next.js App Router pages
├── components/             # React components
├── content/                # MDX content files
├── lib/                    # Utilities, config, stores
└── tests/                  # Test files
```

## Adding New Content

### 1. Create MDX File

```bash
# Create new content file
touch content/acquisition/new-topic-v1.0.mdx
```

### 2. Add Content with Metadata

```mdx
---
title: "New Topic Title"
description: "Brief description for search"
category: "acquisition"
version: "1.0"
lastUpdated: "2026-01-28"
legalBasis: "지방세법 제X조"
---

# New Topic Title

Your content here...

<Alert type="info">
  Important information callout
</Alert>
```

### 3. Update Navigation Config

```typescript
// lib/navigation/tree.ts
export const navigation = {
  acquisition: {
    label: '취득세',
    children: {
      // ... existing items
      newTopic: { label: 'New Topic', path: '/acquisition/new-topic' },
    }
  }
};
```

### ~~4. Update Content Sequence (for infinite scroll)~~ [REMOVED]
> 제거됨: 무한 스크롤 기능 제거로 content sequence 설정이 불필요합니다.

## Adding a New Version

```bash
# Copy existing content with new version number
cp content/acquisition/rates-v1.0.mdx content/acquisition/rates-v1.1.mdx

# Edit the new file
# - Update version in frontmatter: version: "1.1"
# - Update lastUpdated date
# - Make content changes
```

The version selector automatically picks up new versions.

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run specific test file
pnpm test tests/unit/navigation.test.ts

# Check coverage
pnpm test:coverage
```

## Building for Production

```bash
# Build static site
pnpm build

# Preview production build
pnpm start
```

## Environment Variables

No environment variables required for basic content browsing.

댓글/첨부파일 기능 사용 시:
```bash
# .env.local
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Common Tasks

### Change Font Size Levels

```typescript
// lib/stores/preferences.ts
// FontSize는 number 타입 (px 단위, 12~22px, 기본 15px)
// lib/types/index.ts에서 MIN_FONT_SIZE, MAX_FONT_SIZE, FONT_SIZE_STEP 상수 수정
```

### Add Custom MDX Component

```typescript
// components/mdx/CustomComponent.tsx
export function CustomComponent({ children }) {
  return <div className="custom">{children}</div>;
}

// Add to MDX components in components/mdx/index.tsx
export const mdxComponents = {
  // ... existing
  CustomComponent,
};
```

### Modify Mobile Breakpoint

```typescript
// Default: 768px (md breakpoint)
// Modify in tailwind.config.js if needed
```

## Troubleshooting

### Content Not Showing

1. Check file is in correct `content/{category}/` folder
2. Verify filename matches pattern: `{slug}-v{version}.mdx`
3. Ensure frontmatter is valid YAML

### Search Not Finding Content

1. Rebuild the search index: `pnpm build`
2. Check content is indexed (has valid frontmatter)

### Version Not Appearing

1. Verify version format: `X.Y` (e.g., `1.0`, `2.1`)
2. Check filename matches: `{slug}-v{version}.mdx`

## Development Workflow

1. Create/edit MDX content
2. Update navigation config if needed
3. Write tests for new functionality
4. Run `pnpm test` to verify
5. Run `pnpm build` to check production build
6. Commit changes

## Useful Commands

```bash
pnpm dev              # Development server (port 3001)
pnpm build            # Production build
pnpm start            # Preview production
pnpm test             # Run tests (vitest)
pnpm test:coverage    # Test coverage report
pnpm lint             # Run linter
```
