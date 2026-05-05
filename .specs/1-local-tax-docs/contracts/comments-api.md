# API Contract: Comments

**Feature**: 1-local-tax-docs
**Date**: 2026-01-31
**Architecture**: Browser → Next.js API Route → Supabase (service key)

## GET /api/comments

특정 MDX 콘텐츠의 댓글 목록 조회.

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| content_path | string | ✅ | MDX 콘텐츠 경로 (e.g., `acquisition/rates/realestate/housing/general`) |

**Response 200**:

```json
{
  "data": [
    {
      "id": "uuid",
      "content_path": "acquisition/rates/realestate/housing/general",
      "author": "김민호",
      "body": "다주택 기준 확인 필요",
      "created_at": "2026-01-31T09:00:00Z",
      "updated_at": "2026-01-31T09:00:00Z"
    }
  ]
}
```

**Response 400**: `content_path` 누락

```json
{ "error": "content_path is required" }
```

---

## POST /api/comments

댓글 작성.

**Request Body** (JSON):

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| content_path | string | ✅ | 비어있지 않을 것 |
| author | string | ✅ | 비어있지 않을 것 |
| body | string | ✅ | 비어있지 않을 것 |

**Request Example**:

```json
{
  "content_path": "acquisition/rates/realestate/housing/general",
  "author": "김민호",
  "body": "다주택 기준 확인 필요"
}
```

**Response 201**:

```json
{
  "data": {
    "id": "uuid",
    "content_path": "acquisition/rates/realestate/housing/general",
    "author": "김민호",
    "body": "다주택 기준 확인 필요",
    "created_at": "2026-01-31T09:00:00Z",
    "updated_at": "2026-01-31T09:00:00Z"
  }
}
```

**Response 400**: 필수 필드 누락

```json
{ "error": "author, body, content_path are required" }
```

---

## DELETE /api/comments/[id]

댓글 삭제.

**Path Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | ✅ | 댓글 ID |

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| author | string | ✅ | 삭제 요청자 이름 (작성자 일치 확인) |

**Response 200**:

```json
{ "success": true }
```

**Response 403**: 작성자 불일치

```json
{ "error": "only the author can delete this comment" }
```

**Response 404**: 댓글 없음

```json
{ "error": "comment not found" }
```
