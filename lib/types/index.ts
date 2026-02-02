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
  property: NavigationNode;
  vehicle: NavigationNode;
  search: NavigationNode;
}

// === Content ===

export type TaxCategory = 'acquisition' | 'property' | 'vehicle';

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

export interface Comment {
  id: string;
  content_path: string;
  author: string;
  body: string;
  created_at: string;
  updated_at: string;
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
