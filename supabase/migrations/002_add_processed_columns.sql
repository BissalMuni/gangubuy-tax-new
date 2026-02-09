-- 댓글 처리 상태 컬럼 추가
-- 자동 수정 시스템에서 처리된 댓글 추적용

ALTER TABLE comments ADD COLUMN IF NOT EXISTS processed BOOLEAN DEFAULT FALSE;
ALTER TABLE comments ADD COLUMN IF NOT EXISTS processed_at TIMESTAMPTZ;
ALTER TABLE comments ADD COLUMN IF NOT EXISTS commit_sha TEXT;

-- 처리되지 않은 댓글 조회를 위한 인덱스
CREATE INDEX IF NOT EXISTS idx_comments_processed ON comments (processed) WHERE processed = FALSE;

-- 코멘트 추가
COMMENT ON COLUMN comments.processed IS '자동 수정 시스템에서 처리 완료 여부';
COMMENT ON COLUMN comments.processed_at IS '처리 완료 시각';
COMMENT ON COLUMN comments.commit_sha IS '처리 결과 Git 커밋 SHA';
