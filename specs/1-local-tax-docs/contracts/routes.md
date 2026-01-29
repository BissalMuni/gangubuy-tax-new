# Routes Contract: Local Tax Documentation Site

**Feature**: 1-local-tax-docs
**Date**: 2026-01-28

## Page Routes

This application uses Next.js App Router. All routes are static (SSG) unless noted.

### Public Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with overview |
| `/acquisition/[slug]` | Tax Content | Acquisition tax content pages |
| `/property/[slug]` | Tax Content | Property tax content pages |
| `/vehicle/[slug]` | Tax Content | Vehicle tax content pages |
| `/search` | Search | Full-text search page |

### Dynamic Segments

#### `/acquisition/[slug]`

**Parameters**:
- `slug`: Content identifier (e.g., `rates`, `standard`, `requirements`)

**Query Parameters**:
- `v`: Optional version (e.g., `?v=1.0`). Defaults to latest.

**Example URLs**:
- `/acquisition/rates` - Latest rates content
- `/acquisition/rates?v=1.0` - Specific version

**Static Generation**:
```typescript
export async function generateStaticParams() {
  // Returns all slugs for static generation
  return getContentSlugs('acquisition').map(slug => ({ slug }));
}
```

#### `/property/[slug]`

Same pattern as `/acquisition/[slug]`.

#### `/vehicle/[slug]`

Same pattern as `/acquisition/[slug]`.

### Search Route

#### `/search`

**Query Parameters**:
- `q`: Search query string

**Example URLs**:
- `/search?q=취득세율` - Search for "취득세율"

**Behavior**:
- Client-side search using pre-built index
- Results update as user types (debounced)
- Empty query shows search instructions

## Route Behaviors

### Content Page Loading

```
1. User navigates to /acquisition/rates
2. Next.js loads static page (SSG)
3. If ?v parameter present:
   a. Load specific version
   b. Show version indicator
4. Else:
   a. Show latest version
   b. Version selector shows available versions
```

### Infinite Scroll URL Updates

```
1. User scrolls on /acquisition/rates
2. Next content (standard) loads via IntersectionObserver
3. When standard section is 50%+ visible:
   a. URL updates to /acquisition/standard via replaceState()
   b. Sidebar highlight updates
4. Browser back button works correctly
```

### Version Navigation

```
1. User on /acquisition/rates (latest v2.0)
2. User selects v1.0 from version dropdown
3. URL updates to /acquisition/rates?v=1.0
4. Content reloads with v1.0
5. Version indicator shows "v1.0 (viewing older version)"
```

## Error Handling

### 404 Not Found

**Triggers**:
- Invalid slug (e.g., `/acquisition/invalid`)
- Invalid category (e.g., `/unknown/rates`)
- Deleted version (e.g., `?v=0.5` when only v1.0+ exists)

**Behavior**:
- Show custom 404 page (`app/not-found.tsx`)
- Include navigation to valid content
- Suggest similar content if possible

### Missing Content Version

**Trigger**: `?v=X.X` where version doesn't exist

**Behavior**:
- Redirect to latest version
- Show toast notification: "Version X.X not found. Showing latest."

## URL Structure Summary

```
/                           # Home
/acquisition/rates          # 취득세 > 세율 (latest)
/acquisition/rates?v=1.0    # 취득세 > 세율 (v1.0)
/acquisition/standard       # 취득세 > 과세표준
/acquisition/requirements   # 취득세 > 과세요건
/acquisition/special        # 취득세 > 특례
/property/rates             # 재산세 > 세율
/property/standard          # 재산세 > 과세표준
/property/special           # 재산세 > 특례
/vehicle/rates              # 자동차세 > 세율
/vehicle/...                # (other vehicle tax content)
/search                     # Search page
/search?q=keyword           # Search with query
```
