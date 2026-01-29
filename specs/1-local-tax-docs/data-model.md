# Data Model: Local Tax Documentation Site

**Feature**: 1-local-tax-docs
**Date**: 2026-01-28

## Entities

### NavigationNode

Represents a single item in the navigation tree.

```typescript
interface NavigationNode {
  /** Display label for the navigation item */
  label: string;

  /** URL path (relative to root) */
  path: string;

  /** Optional Ant Design icon component */
  icon?: React.ComponentType;

  /** Child navigation items (for tree structure) */
  children?: Record<string, NavigationNode>;

  /** Whether this node is a category header (not clickable) */
  isCategory?: boolean;
}
```

**Validation Rules**:
- `label` is required and non-empty
- `path` must start with `/`
- `children` keys must be unique within the parent
- Leaf nodes (no children) must have a valid `path`

### NavigationConfig

The complete navigation tree structure with nested children.

```typescript
interface NavigationConfig {
  home: NavigationNode;
  acquisition: NavigationNode;  // 취득세 (깊은 트리 구조)
  property: NavigationNode;     // 재산세
  vehicle: NavigationNode;      // 자동차세
  search: NavigationNode;       // 검색
}

// Example: 취득세/세율 트리구조 (취득원인 우선)
// acquisition.children.rates.children = {
//   paid: {                     // 유상취득
//     label: '유상취득',
//     children: {
//       sale: {                 // 매매
//         label: '매매',
//         children: {
//           housing: { label: '주택', path: '/acquisition/rates/paid/sale/housing' },
//           farmland: { label: '농지', path: '/acquisition/rates/paid/sale/farmland' },
//           building: { label: '건물', path: '/acquisition/rates/paid/sale/building' },
//         }
//       },
//       exchange: { label: '교환', path: '/acquisition/rates/paid/exchange' },
//       division: { label: '분할', path: '/acquisition/rates/paid/division' },
//     }
//   },
//   unpaid: { ... },            // 무상취득 (상속, 증여)
//   original: { ... },          // 원시취득 (신축)
//   luxury: { ... },            // 사치성재산 (고급주택, 골프, 과점주주)
// }
```

**Order**: Items rendered in declaration order (home → acquisition → property → vehicle → search).

### ContentMeta

Metadata for an MDX content file.

```typescript
interface ContentMeta {
  /** Unique identifier (derived from filename without version) */
  id: string;

  /** Display title */
  title: string;

  /** Brief description for search results */
  description: string;

  /** Tax category: acquisition | property | vehicle */
  category: TaxCategory;

  /** Semantic version string (e.g., "1.0", "2.1") */
  version: string;

  /** ISO date string of last update */
  lastUpdated: string;

  /** Legal source reference */
  legalBasis?: string;
}

type TaxCategory = 'acquisition' | 'property' | 'vehicle';
```

**Validation Rules**:
- `version` must match pattern `^\d+\.\d+$`
- `lastUpdated` must be valid ISO date
- `category` must be one of the defined types

### ContentItem

A complete content item including body.

```typescript
interface ContentItem {
  /** Content metadata */
  meta: ContentMeta;

  /** Compiled MDX content (React component) */
  content: MDXContent;

  /** Raw MDX source (for search indexing) */
  rawSource: string;
}

type MDXContent = React.ComponentType<MDXProps>;
```

### ContentVersion

Version information for a content item.

```typescript
interface ContentVersion {
  /** Version string (e.g., "1.0") */
  version: string;

  /** ISO date of this version */
  lastUpdated: string;

  /** File path to this version */
  filePath: string;

  /** Whether this is the latest version */
  isLatest: boolean;
}
```

### ContentSequence

Defines the order of content for infinite scroll.

```typescript
interface ContentSequence {
  /** Tax category */
  category: TaxCategory;

  /** Ordered list of content slugs */
  sequence: string[];
}

// Example
const ACQUISITION_SEQUENCE: ContentSequence = {
  category: 'acquisition',
  sequence: ['rates', 'standard', 'requirements', 'special']
};
```

### UserPreferences

User settings stored in localStorage.

```typescript
interface UserPreferences {
  /** Font size level */
  fontSize: FontSize;

  /** Expanded navigation nodes (for session persistence) */
  expandedNavKeys: string[];
}

type FontSize = 'small' | 'medium' | 'large';
```

**State Transitions**:
- `fontSize`: small ↔ medium ↔ large (user action)
- `expandedNavKeys`: add/remove keys on tree expand/collapse

### SearchResult

A single search result item.

```typescript
interface SearchResult {
  /** Content ID */
  id: string;

  /** Display title */
  title: string;

  /** Category label */
  category: string;

  /** Path to content */
  path: string;

  /** Matched text snippet with highlights */
  snippet: string;

  /** Search relevance score */
  score: number;
}
```

### SearchIndex

Pre-built search index structure.

```typescript
interface SearchIndex {
  /** Flexsearch document index */
  index: FlexSearchDocument;

  /** Content ID to metadata mapping */
  documents: Record<string, ContentMeta>;
}
```

## Entity Relationships

```
NavigationConfig
    └── NavigationNode (tree structure)
            └── maps to → ContentItem (via path)

ContentItem
    ├── ContentMeta
    └── ContentVersion[] (multiple per content)

ContentSequence
    └── references → ContentItem.id[]

UserPreferences
    └── references → NavigationNode.key[] (expandedNavKeys)

SearchIndex
    └── indexes → ContentItem[] (all content)
```

## Data Flow

```
1. Build Time:
   MDX Files → ContentItem[] → SearchIndex (pre-built)
                            → Static Pages (SSG)

2. Runtime (Navigation):
   User Click → NavigationNode.path → Load ContentItem → Render MDX

3. Runtime (Infinite Scroll):
   Scroll Event → ContentSequence.next → Load ContentItem → Append to DOM
                                      → Update URL (replaceState)

4. Runtime (Version Switch):
   User Select → ContentVersion.filePath → Load ContentItem → Replace content

5. Runtime (Search):
   User Query → SearchIndex.search() → SearchResult[] → Display
```

## File Naming Convention

```
content/{category}/{nested-path}/{slug}-v{major}.{minor}.mdx

Examples:
- content/acquisition/rates/paid/sale/housing-v1.0.mdx
- content/acquisition/rates/paid/sale/housing-v1.1.mdx
- content/acquisition/rates/unpaid/gift/housing-v1.0.mdx
- content/acquisition/rates/luxury/golf-v1.0.mdx
- content/acquisition/standard-v1.0.mdx
- content/property/rates-v1.0.mdx
```

**URL Mapping**:
```
/acquisition/rates/paid/sale/housing
  → content/acquisition/rates/paid/sale/housing-v{latest}.mdx

/acquisition/rates/paid/sale/housing?v=1.0
  → content/acquisition/rates/paid/sale/housing-v1.0.mdx
```

**Parsing**:
```typescript
// Extract from filename: "housing-v1.1.mdx"
const match = filename.match(/^(.+)-v(\d+)\.(\d+)\.mdx$/);
// slug = "housing", major = 1, minor = 1
```
