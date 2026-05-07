-- ============================================================
-- tax-attachments 버킷을 private 으로 전환.
-- public URL 은 영구 노출 위험이 있으므로 매 조회 시 발급되는
-- Signed URL(서버사이드 생성, TTL 1h) 로만 접근하도록 변경.
--
-- 코드 변경 위치:
--   - src/lib/supabase/attachments.ts
--     getAttachments / uploadAttachment 가 createSignedUrl(s) 사용
-- ============================================================
BEGIN;

UPDATE storage.buckets
   SET public = false
 WHERE id = 'tax-attachments';

COMMIT;
