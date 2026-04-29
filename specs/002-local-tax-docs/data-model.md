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

// Example: 취득세/세율 트리구조 (물건 기준)
// acquisition.children.rates.children = {
//   realestate: {               // 부동산
//     label: '부동산',
//     children: {
//       housing: {              // 주택
//         label: '주택',
//         children: {
//           general: { label: '유상거래', path: '/acquisition/rates/realestate/housing/general' },
//           inheritance: { label: '상속', path: '/acquisition/rates/realestate/housing/inheritance' },
//           gift: { label: '증여', path: '/acquisition/rates/realestate/housing/gift' },
//           original: { label: '원시취득', path: '/acquisition/rates/realestate/housing/original' },
//           'multi-house': { label: '다주택자 중과', path: '/acquisition/rates/realestate/housing/multi-house' },
//           corporate: { label: '법인 취득 중과', path: '/acquisition/rates/realestate/housing/corporate' },
//           luxury: { label: '고급주택 중과', path: '/acquisition/rates/realestate/housing/luxury' },
//         }
//       },
//       farmland: { ... },      // 농지 (유상거래, 상속, 증여)
//       'non-farmland': { ... }, // 농지 외 (유상거래, 상속, 증여, 원시취득)
//     }
//   },
//   'non-realestate': {         // 부동산 외 (§12 통합)
//     label: '부동산 외',
//     path: '/acquisition/rates/non-realestate/non-realestate',
//   },
//   common: { ... },            // 공통 (분할, 과밀억제, 사치성재산, 특례, 추징, 면세점, 주택수판단)
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

~~Defines the order of content for infinite scroll.~~ [REMOVED — 무한 스크롤 제거됨]

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

### Comment

A user comment on a specific MDX content page. Stored in Supabase Postgres.

```typescript
interface Comment {
  /** UUID (auto-generated by Supabase) */
  id: string;

  /** MDX content path (e.g., "acquisition/rates/realestate/housing/general") */
  content_path: string;

  /** Comment author name */
  author: string;

  /** Comment body text */
  body: string;

  /** ISO timestamp (auto-generated) */
  created_at: string;

  /** ISO timestamp (auto-updated) */
  updated_at: string;
}
```

**Supabase Table**: `comments`

```sql
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_path TEXT NOT NULL,
  author TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_comments_content_path ON comments (content_path);
```

**Validation Rules**:
- `content_path` is required and non-empty
- `author` is required and non-empty
- `body` is required and non-empty

### Attachment

A file attached to a specific MDX content page. Metadata in Supabase Postgres, file in Supabase Storage.

```typescript
interface Attachment {
  /** UUID (auto-generated by Supabase) */
  id: string;

  /** MDX content path (e.g., "acquisition/rates/realestate/housing/general") */
  content_path: string;

  /** Original filename */
  file_name: string;

  /** Path in Supabase Storage bucket */
  storage_path: string;

  /** File size in bytes */
  file_size: number;

  /** MIME type (e.g., "application/pdf") */
  mime_type: string;

  /** Uploader name */
  uploaded_by: string;

  /** ISO timestamp (auto-generated) */
  created_at: string;
}
```

**Supabase Table**: `attachments`

```sql
CREATE TABLE attachments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  uploaded_by TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_attachments_content_path ON attachments (content_path);
```

**Supabase Storage Bucket**: `attachments`

```
attachments/
├── acquisition/rates/realestate/housing/general/
│   ├── {uuid}_취득세신고서.pdf
│   └── {uuid}_등기부등본.jpg
└── acquisition/themes/multi-house/
    └── {uuid}_다주택판정기준.xlsx
```

**Validation Rules**:
- `file_size` must not exceed 10MB (10,485,760 bytes)
- `mime_type` must be an allowed type (pdf, xlsx, xls, doc, docx, hwp, jpg, jpeg, png, gif)
- `uploaded_by` is required and non-empty

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

Comment
    └── references → ContentItem (via content_path)

Attachment
    └── references → ContentItem (via content_path)
    └── references → Supabase Storage (via storage_path)
```

## Data Flow

```
1. Build Time:
   MDX Files → ContentItem[] → SearchIndex (pre-built)
                            → Static Pages (SSG)

2. Runtime (Navigation):
   User Click → NavigationNode.path → Load ContentItem → Render MDX

3. ~~Runtime (Infinite Scroll)~~ [REMOVED]:
   ~~Scroll Event → ContentSequence.next → Load ContentItem → Append to DOM~~ [제거됨]
   ~~→ Update URL (replaceState)~~ [제거됨]

4. Runtime (Version Switch):
   User Select → ContentVersion.filePath → Load ContentItem → Replace content

5. Runtime (Search):
   User Query → SearchIndex.search() → SearchResult[] → Display

6. Runtime (Comments) - via API Route:
   Load Page → GET /api/comments?content_path=... → API Route → Supabase (service key) → Comment[] → Display
   Submit Comment → POST /api/comments → API Route (검증) → Supabase.insert() → Refresh list
   Delete Comment → DELETE /api/comments/:id?author=... → API Route (작성자 확인) → Supabase.delete()

7. Runtime (Attachments) - via API Route:
   Load Page → GET /api/attachments?content_path=... → API Route → Supabase (service key) → Attachment[] → Display
   Upload File → POST /api/attachments (FormData) → API Route (크기/타입 검증) → Supabase Storage + DB → Refresh list
   Download File → download_url (Supabase Storage public URL) → Browser download
   Delete File → DELETE /api/attachments/:id?uploaded_by=... → API Route (업로더 확인) → Storage + DB 삭제
```

## File Naming Convention

```
content/{category}/{nested-path}/{slug}-v{major}.{minor}.mdx

Examples:
- content/acquisition/rates/realestate/housing/general-v1.0.mdx
- content/acquisition/rates/realestate/housing/general-v1.1.mdx
- content/acquisition/rates/realestate/housing/multi-house-v1.0.mdx
- content/acquisition/rates/realestate/farmland/general-v1.0.mdx
- content/acquisition/rates/realestate/non-farmland/original-v1.0.mdx
- content/acquisition/rates/non-realestate/non-realestate-v1.0.mdx
- content/acquisition/rates/common/division-v1.0.mdx
- content/acquisition/standard-v1.0.mdx
- content/property/rates-v1.0.mdx
```

**URL Mapping**:
```
/acquisition/rates/realestate/housing/general
  → content/acquisition/rates/realestate/housing/general-v{latest}.mdx

/acquisition/rates/realestate/housing/general?v=1.0
  → content/acquisition/rates/realestate/housing/general-v1.0.mdx
```

**Parsing**:
```typescript
// Extract from filename: "housing-v1.1.mdx"
const match = filename.match(/^(.+)-v(\d+)\.(\d+)\.mdx$/);
// slug = "housing", major = 1, minor = 1
```
