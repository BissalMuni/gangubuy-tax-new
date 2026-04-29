-- Enable Row Level Security on all public tables
-- The app uses service_role key which bypasses RLS,
-- so no permissive policies are needed.
-- This blocks direct access via the anon key.

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
