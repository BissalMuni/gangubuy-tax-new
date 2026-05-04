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
  version: string;
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
  version: string;
  lastUpdated: string;
  filePath: string;
  isLatest: boolean;
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

// === Search ===

export interface SearchResult {
  id: string;
  title: string;
  category: string;
  path: string;
  snippet: string;
  score: number;
}

// === Comments (Supabase) ===

/**
 * 변경 항목 상태 (data-model.md §상태 머신).
 * Phase 1 마이그레이션 005에서 도입.
 */
export type ChangeStatus =
  | 'pending'
  | 'approved'
  | 'processing'
  | 'applied'
  | 'rejected'
  | 'failed';

export type ChangeTargetKind = 'content' | 'structure';

export interface Comment {
  id: string;
  content_path: string;
  section?: string | null;
  /** Phase 1: NULL (무기명) / Phase 2: 이메일 */
  author: string | null;
  body: string;
  created_at: string;
  updated_at: string;

  // === Phase 1 상태 머신 필드 (마이그레이션 005) ===
  status?: ChangeStatus;
  target_kind?: ChangeTargetKind;
  reviewer?: string | null;
  reviewed_at?: string | null;
  applied_commit_sha?: string | null;
  error_log?: string | null;
  reject_reason?: string | null;
  deleted_at?: string | null;
  deleted_by?: string | null;

  // === Phase 2 강한 식별 (마이그레이션 006) ===
  author_user_id?: string | null;
  reviewer_user_id?: string | null;
  deleted_by_user_id?: string | null;
}

// === Attachments (Supabase) ===

export interface Attachment {
  id: string;
  content_path: string;
  file_name: string;
  storage_path: string;
  file_size: number;
  mime_type: string;
  uploaded_by: string | null;
  created_at: string;
  download_url?: string;

  // === Phase 1 상태 머신 필드 (마이그레이션 005) ===
  status?: ChangeStatus;
  target_kind?: ChangeTargetKind;
  reviewer?: string | null;
  reviewed_at?: string | null;
  applied_commit_sha?: string | null;
  error_log?: string | null;
  reject_reason?: string | null;
  deleted_at?: string | null;
  deleted_by?: string | null;
  comment_id?: string | null;
}

export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  // hwpx (new Hangul format) — old hwp is intentionally excluded
  'application/hwp+zip',
  'application/vnd.hancom.hwpx',
  'application/haansofthwpx',
  'text/plain',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
] as const;

// Browsers often report an empty MIME type for hwpx, so the server also
// accepts files whose extension is in this list.
export const ALLOWED_FILE_EXTENSIONS = [
  'pdf',
  'xlsx',
  'xls',
  'doc',
  'docx',
  'hwpx',
  'txt',
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
] as const;

// Explicitly rejected even when the MIME type would otherwise be permissive.
export const BLOCKED_FILE_EXTENSIONS = ['hwp'] as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
