import type { ReactNode } from 'react';

// === Navigation ===

export interface NavigationNode {
  label: string;
  path: string;
  icon?: string;
  children?: Record<string, NavigationNode>;
  isCategory?: boolean;
}

export interface NavigationConfig {
  home: NavigationNode;
  acquisition: NavigationNode;
  'corp-acquisition-tax': NavigationNode;
  property: NavigationNode;
  vehicle: NavigationNode;
  search: NavigationNode;
}

// === Content ===

export type TaxCategory = 'acquisition' | 'corp-acquisition-tax' | 'property' | 'vehicle';

export interface ContentMeta {
  id: string;
  title: string;
  description: string;
  category: TaxCategory;
  lastUpdated: string;
  legalBasis?: string;
  audience?: string;
}

export interface ContentItem {
  meta: ContentMeta;
  content: ReactNode;
  rawSource: string;
}

export interface ContentVersion {
  lastUpdated: string;
  filePath: string;
}

export interface ContentSequence {
  category: TaxCategory;
  sequence: string[];
}

// === User Preferences ===

export type FontSize = number; // px 단위, MIN_FONT_SIZE ~ MAX_FONT_SIZE

export const MIN_FONT_SIZE = 12;
export const MAX_FONT_SIZE = 22;
export const FONT_SIZE_STEP = 1;
export const DEFAULT_FONT_SIZE = 15;

export interface UserPreferences {
  fontSize: FontSize;
  expandedNavKeys: string[];
}

// === Comments (Supabase, tax schema) ===

/** 의견 편집 종류 */
export type FeedbackType = 'content' | 'structure';

/** 의견 대상 목차 레벨 */
export type FeedbackLevel = 'major' | 'medium' | 'minor' | 'section';

/** 의견(댓글) — math 프로젝트와 동일한 분류 체계 */
export interface Comment {
  id: string;
  content_path: string;
  author: string;
  body: string;
  /** 소목차/섹션 제목 (예: "주택 취득세율") */
  section_title?: string | null;
  /** 편집 종류: content(내용 편집) | structure(구조 편집) */
  feedback_type: FeedbackType;
  /** 목차 레벨: major(대목차) | medium(중목차) | minor(소목차) | section(h2 섹션) */
  level: FeedbackLevel;
  created_at: string;
  // 자동 수정 시스템용 필드
  processed?: boolean;
  processed_at?: string;
  commit_sha?: string;
}

/** 콘텐츠 수정 이력 (admin 감사용) */
export interface ContentChange {
  id: string;
  role: string;
  actor: string;
  change_type: 'content_edit' | 'structure_edit' | 'automated_feedback' | 'rollback';
  file_path: string;
  diff?: string | null;
  before_content?: string | null;
  after_content?: string | null;
  commit_sha?: string | null;
  metadata?: Record<string, unknown> | null;
  created_at: string;
}

// === Attachments (Supabase) ===

export interface Attachment {
  id: string;
  content_path: string;
  file_name: string;
  storage_path: string;
  file_size: number;
  mime_type: string;
  uploaded_by: string;
  created_at: string;
  download_url?: string;
}

export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/haansofthwp',
  'image/jpeg',
  'image/png',
  'image/gif',
] as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
