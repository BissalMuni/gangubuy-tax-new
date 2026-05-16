-- 일정 관리 테이블
CREATE TABLE tax.calendar_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  -- 일정 시간
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  all_day BOOLEAN DEFAULT true,
  -- 반복 일정 ('none', 'yearly', 'monthly', 'weekly')
  recurrence TEXT DEFAULT 'none',
  -- 분류 색상 (FullCalendar color)
  color TEXT DEFAULT '#3b82f6',
  -- 완료 여부
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  -- 메타
  created_by TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_calendar_events_start ON tax.calendar_events (start_date);
CREATE INDEX idx_calendar_events_completed ON tax.calendar_events (completed);
