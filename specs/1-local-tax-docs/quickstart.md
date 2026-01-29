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

# Open http://localhost:3000
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
// lib/navigation/nav.config.ts
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

### 4. Update Content Sequence (for infinite scroll)

```typescript
// lib/navigation/contentSequence.ts
export const ACQUISITION_SEQUENCE = [
  'rates',
  'standard',
  'requirements',
  'special',
  'new-topic', // Add new item
];
```

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

No environment variables required for basic functionality.

Optional:
```bash
# .env.local (for future features)
# NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Common Tasks

### Change Font Size Levels

```typescript
// lib/stores/preferences.ts
type FontSize = 'small' | 'medium' | 'large';

// Modify CSS variables in globals.css for actual sizes
```

### Add Custom MDX Component

```typescript
// components/mdx/CustomComponent.tsx
export function CustomComponent({ children }) {
  return <div className="custom">{children}</div>;
}

// Add to MDX components in lib/mdx/components.ts
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
pnpm dev          # Development server
pnpm build        # Production build
pnpm start        # Preview production
pnpm test         # Run tests
pnpm lint         # Run linter
pnpm type-check   # TypeScript check
```
