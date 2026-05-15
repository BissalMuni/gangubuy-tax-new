-- 첨부파일을 댓글에 1:1 연결 (content_path 기반 → comment_id 기반)
-- comment_id 는 nullable: 업로드 시점에는 댓글이 아직 없을 수 있음.
-- 댓글 등록 시 같은 content_path 의 미연결 첨부파일을 자동으로 연결한다.

ALTER TABLE tax.attachments
  ADD COLUMN comment_id UUID REFERENCES tax.comments(id) ON DELETE SET NULL;

CREATE INDEX idx_attachments_comment_id ON tax.attachments (comment_id);

-- 기존 데이터 마이그레이션: content_path 가 일치하는 댓글 중 가장 가까운 것에 연결
-- (기존 첨부파일이 적으므로 수동 확인 후 실행해도 무방)
UPDATE tax.attachments a
SET comment_id = (
  SELECT c.id FROM tax.comments c
  WHERE c.content_path = a.content_path
  ORDER BY c.created_at DESC
  LIMIT 1
)
WHERE a.comment_id IS NULL;
