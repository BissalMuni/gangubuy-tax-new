# API Contract: Attachments

**Feature**: 1-local-tax-docs
**Date**: 2026-01-31
**Architecture**: Browser → Next.js API Route → Supabase (service key)

## GET /api/attachments

특정 MDX 콘텐츠의 첨부파일 목록 조회.

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| content_path | string | ✅ | MDX 콘텐츠 경로 |

**Response 200**:

```json
{
  "data": [
    {
      "id": "uuid",
      "content_path": "acquisition/rates/realestate/housing/general",
      "file_name": "취득세신고서.pdf",
      "storage_path": "acquisition/rates/realestate/housing/general/uuid_취득세신고서.pdf",
      "file_size": 1048576,
      "mime_type": "application/pdf",
      "uploaded_by": "김민호",
      "created_at": "2026-01-31T09:00:00Z",
      "download_url": "https://xxx.supabase.co/storage/v1/object/public/attachments/..."
    }
  ]
}
```

**Response 400**: `content_path` 누락

```json
{ "error": "content_path is required" }
```

---

## POST /api/attachments

파일 업로드. `multipart/form-data` 사용.

**Request Body** (FormData):

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| file | File | ✅ | max 10MB, 허용 MIME 타입만 |
| content_path | string | ✅ | 비어있지 않을 것 |
| uploaded_by | string | ✅ | 비어있지 않을 것 |

**Allowed MIME Types**:

| MIME Type | 확장자 |
|-----------|--------|
| application/pdf | .pdf |
| application/vnd.openxmlformats-officedocument.spreadsheetml.sheet | .xlsx |
| application/vnd.ms-excel | .xls |
| application/msword | .doc |
| application/vnd.openxmlformats-officedocument.wordprocessingml.document | .docx |
| application/haansofthwp | .hwp |
| image/jpeg | .jpg, .jpeg |
| image/png | .png |
| image/gif | .gif |

**Server-side Processing**:

```
1. 파일 크기 검증 (≤ 10MB)
2. MIME 타입 검증
3. Supabase Storage에 업로드 (storage_path: {content_path}/{uuid}_{file_name})
4. attachments 테이블에 메타데이터 저장
5. 응답 반환
```

**Response 201**:

```json
{
  "data": {
    "id": "uuid",
    "content_path": "acquisition/themes/multi-house",
    "file_name": "다주택판정기준.xlsx",
    "storage_path": "acquisition/themes/multi-house/uuid_다주택판정기준.xlsx",
    "file_size": 524288,
    "mime_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "uploaded_by": "김민호",
    "created_at": "2026-01-31T09:00:00Z",
    "download_url": "https://xxx.supabase.co/storage/v1/object/public/attachments/..."
  }
}
```

**Response 400**: 검증 실패

```json
{ "error": "file size exceeds 10MB limit" }
```

```json
{ "error": "file type not allowed. Allowed: pdf, xlsx, xls, doc, docx, hwp, jpg, jpeg, png, gif" }
```

---

## DELETE /api/attachments/[id]

첨부파일 삭제 (DB 메타데이터 + Storage 파일 모두 삭제).

**Path Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | UUID | ✅ | 첨부파일 ID |

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| uploaded_by | string | ✅ | 삭제 요청자 이름 (업로더 일치 확인) |

**Server-side Processing**:

```
1. attachments 테이블에서 레코드 조회
2. uploaded_by 일치 확인
3. Supabase Storage에서 파일 삭제
4. attachments 테이블에서 레코드 삭제
5. 응답 반환
```

**Response 200**:

```json
{ "success": true }
```

**Response 403**: 업로더 불일치

```json
{ "error": "only the uploader can delete this attachment" }
```

**Response 404**: 첨부파일 없음

```json
{ "error": "attachment not found" }
```
