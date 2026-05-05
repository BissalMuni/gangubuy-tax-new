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

## API Routes

Server-side routes for comments and file attachments. All use Supabase service key (server-only).

| Route | Method | Description |
|-------|--------|-------------|
| `/api/comments` | GET | 특정 콘텐츠의 댓글 목록 조회 |
| `/api/comments` | POST | 댓글 작성 |
| `/api/comments/[id]` | DELETE | 댓글 삭제 |
| `/api/attachments` | GET | 특정 콘텐츠의 첨부파일 목록 조회 |
| `/api/attachments` | POST | 파일 업로드 (multipart/form-data) |
| `/api/attachments/[id]` | DELETE | 첨부파일 삭제 |

상세 명세: [comments-api.md](./comments-api.md), [attachments-api.md](./attachments-api.md)

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
/                                                        # Home
/acquisition/rates/realestate/housing/general             # 취득세 > 세율 > 부동산 > 주택 > 유상거래
/acquisition/rates/realestate/housing/general?v=1.0       # (v1.0)
/acquisition/rates/realestate/housing/inheritance          # 취득세 > 세율 > 부동산 > 주택 > 상속
/acquisition/rates/realestate/housing/gift                 # 취득세 > 세율 > 부동산 > 주택 > 증여
/acquisition/rates/realestate/housing/original             # 취득세 > 세율 > 부동산 > 주택 > 원시취득
/acquisition/rates/realestate/housing/multi-house          # 취득세 > 세율 > 부동산 > 주택 > 다주택자 중과
/acquisition/rates/realestate/housing/corporate            # 취득세 > 세율 > 부동산 > 주택 > 법인 취득 중과
/acquisition/rates/realestate/housing/luxury               # 취득세 > 세율 > 부동산 > 주택 > 고급주택 중과
/acquisition/rates/realestate/farmland/general             # 취득세 > 세율 > 부동산 > 농지 > 유상거래
/acquisition/rates/realestate/farmland/inheritance          # 취득세 > 세율 > 부동산 > 농지 > 상속
/acquisition/rates/realestate/farmland/gift                 # 취득세 > 세율 > 부동산 > 농지 > 증여
/acquisition/rates/realestate/non-farmland/general          # 취득세 > 세율 > 부동산 > 농지외 > 유상거래
/acquisition/rates/realestate/non-farmland/inheritance      # 취득세 > 세율 > 부동산 > 농지외 > 상속
/acquisition/rates/realestate/non-farmland/gift             # 취득세 > 세율 > 부동산 > 농지외 > 증여
/acquisition/rates/realestate/non-farmland/original         # 취득세 > 세율 > 부동산 > 농지외 > 원시취득
/acquisition/rates/non-realestate/non-realestate            # 취득세 > 세율 > 부동산 외
/acquisition/rates/common/division                          # 취득세 > 세율 > 공통 > 분할취득
/acquisition/rates/common/metro-surcharge                   # 취득세 > 세율 > 공통 > 과밀억제권역 중과
/acquisition/rates/common/luxury-surcharge                  # 취득세 > 세율 > 공통 > 사치성재산 중과
/acquisition/rates/common/special-rates                     # 취득세 > 세율 > 공통 > 세율 특례
/acquisition/rates/common/rate-application                  # 취득세 > 세율 > 공통 > 세율 적용/추징
/acquisition/rates/common/exemption                         # 취득세 > 세율 > 공통 > 면세점
/acquisition/rates/common/housing-count                     # 취득세 > 세율 > 공통 > 주택 수 판단
/acquisition/standard                                       # 취득세 > 과세표준
/acquisition/requirements                                   # 취득세 > 과세요건
/property/...                                               # 재산세
/vehicle/...                                                # 자동차세
/search                                                     # Search page
/search?q=keyword                                           # Search with query
```
