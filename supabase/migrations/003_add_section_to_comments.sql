-- Add section column to comments table for per-section comment support
ALTER TABLE comments ADD COLUMN section TEXT;

-- Index for filtering by content_path + section
CREATE INDEX idx_comments_content_path_section ON comments (content_path, section);
