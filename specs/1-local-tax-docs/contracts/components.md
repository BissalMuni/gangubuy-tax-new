# Component Contracts: Local Tax Documentation Site

**Feature**: 1-local-tax-docs
**Date**: 2026-01-28

## Layout Components

### Header

```typescript
interface HeaderProps {
  /** System name to display */
  title?: string; // Default: "GanguBuy Tax"
}

// Usage
<Header title="GanguBuy Tax" />

// Behavior:
// - Fixed position at top
// - Shows system name only (per FR-001)
// - Responsive: adjusts for mobile
```

### Sidebar

```typescript
interface SidebarProps {
  /** Navigation configuration */
  navigation: NavigationConfig;

  /** Currently active path */
  activePath: string;

  /** Expanded node keys */
  expandedKeys: string[];

  /** Callback when expansion changes */
  onExpandChange: (keys: string[]) => void;

  /** Whether sidebar is collapsed (tablet) */
  collapsed?: boolean;
}

// Usage
<Sidebar
  navigation={navConfig}
  activePath="/acquisition/rates"
  expandedKeys={['acquisition']}
  onExpandChange={setExpandedKeys}
/>

// Behavior:
// - Tree structure with expand/collapse (FR-007)
// - Highlights active item (FR-008)
// - Persists expansion state (FR-009)
// - Hidden on mobile (FR-014)
```

### MobileNav

```typescript
interface MobileNavProps {
  /** Navigation configuration */
  navigation: NavigationConfig;

  /** Currently active path */
  activePath: string;

  /** Whether menu is open */
  isOpen: boolean;

  /** Toggle menu callback */
  onToggle: () => void;
}

// Usage
<MobileNav
  navigation={navConfig}
  activePath="/acquisition/rates"
  isOpen={menuOpen}
  onToggle={() => setMenuOpen(!menuOpen)}
/>

// Behavior:
// - Hamburger menu button
// - Slide-out drawer with tree navigation
// - Same structure as desktop sidebar
```

## Content Components

### MDXRenderer

```typescript
interface MDXRendererProps {
  /** Compiled MDX content */
  content: MDXContent;

  /** Custom components for MDX */
  components?: MDXComponents;
}

// Default MDX components provided:
const defaultComponents = {
  Alert: AlertComponent,
  Table: TableComponent,
  Criteria: CriteriaComponent,
  // ... other custom components
};

// Usage
<MDXRenderer content={compiledMDX} />

// Behavior:
// - Renders MDX with custom components
// - Applies font size from preferences
// - Responsive styling
```

### ContentHeader

```typescript
interface ContentHeaderProps {
  /** Content metadata */
  meta: ContentMeta;

  /** Available versions */
  versions: ContentVersion[];

  /** Current version */
  currentVersion: string;

  /** Version change callback */
  onVersionChange: (version: string) => void;
}

// Usage
<ContentHeader
  meta={contentMeta}
  versions={availableVersions}
  currentVersion="2.0"
  onVersionChange={handleVersionChange}
/>

// Displays:
// - Title
// - Category tag
// - Version selector (FR-021)
// - Last updated date (FR-020)
```

### InfiniteScrollLoader

```typescript
interface InfiniteScrollLoaderProps {
  /** Content sequence configuration */
  sequence: ContentSequence;

  /** Current content slug */
  currentSlug: string;

  /** Callback when next content should load */
  onLoadNext: (slug: string) => Promise<ContentItem>;

  /** Callback when visible content changes */
  onVisibleChange: (slug: string) => void;
}

// Usage
<InfiniteScrollLoader
  sequence={ACQUISITION_SEQUENCE}
  currentSlug="rates"
  onLoadNext={loadContent}
  onVisibleChange={handleVisibleChange}
/>

// Behavior:
// - Uses IntersectionObserver
// - Loads next content at bottom (FR-010)
// - Updates URL on scroll (FR-011)
// - Notifies parent of visible content (FR-012)
```

### VersionSelector

```typescript
interface VersionSelectorProps {
  /** Available versions */
  versions: ContentVersion[];

  /** Currently selected version */
  current: string;

  /** Selection callback */
  onChange: (version: string) => void;
}

// Usage
<VersionSelector
  versions={[
    { version: '2.0', lastUpdated: '2026-01-28', isLatest: true },
    { version: '1.1', lastUpdated: '2025-06-15', isLatest: false },
    { version: '1.0', lastUpdated: '2025-01-01', isLatest: false },
  ]}
  current="2.0"
  onChange={handleVersionChange}
/>

// Displays:
// - Dropdown with version list
// - Dates for each version
// - "Latest" badge on newest
```

## UI Components

### FontSizeControl

```typescript
interface FontSizeControlProps {
  /** Current font size */
  size: FontSize;

  /** Size change callback */
  onChange: (size: FontSize) => void;
}

type FontSize = 'small' | 'medium' | 'large';

// Usage
<FontSizeControl
  size={preferences.fontSize}
  onChange={setFontSize}
/>

// Behavior:
// - Three-step control (FR-016)
// - Persists to localStorage (FR-017)
// - Immediate visual feedback (SC-005)
```

## Search Components

### SearchInput

```typescript
interface SearchInputProps {
  /** Current query */
  value: string;

  /** Query change callback (debounced internally) */
  onChange: (query: string) => void;

  /** Placeholder text */
  placeholder?: string;
}

// Usage
<SearchInput
  value={query}
  onChange={setQuery}
  placeholder="Search tax information..."
/>
```

### SearchResults

```typescript
interface SearchResultsProps {
  /** Search results */
  results: SearchResult[];

  /** Whether search is in progress */
  loading: boolean;

  /** Query for highlighting */
  query: string;
}

// Usage
<SearchResults
  results={searchResults}
  loading={isSearching}
  query={currentQuery}
/>

// Behavior:
// - Displays results with highlighted keywords (FR-025)
// - Click navigates to content (FR-026)
// - Shows loading state during search
// - Shows "No results" when empty
```

## Component Hierarchy

```
RootLayout
├── Header
└── TaxLayout (for tax routes)
    ├── Sidebar (desktop)
    ├── MobileNav (mobile)
    └── ContentArea
        ├── ContentHeader
        │   └── VersionSelector
        ├── MDXRenderer
        ├── InfiniteScrollLoader
        └── FontSizeControl

SearchPage
├── SearchInput
└── SearchResults
```
