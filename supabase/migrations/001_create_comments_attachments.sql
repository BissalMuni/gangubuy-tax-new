-- Comments table
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_path TEXT NOT NULL,
  author TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_comments_content_path ON comments (content_path);

-- Attachments table
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

-- Storage bucket (run via Supabase dashboard or API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('attachments', 'attachments', true);
