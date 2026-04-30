import { getSupabase } from '@/lib/supabase/server';
import type { ChangeStatus } from './status-machine';
import type { Comment, Attachment } from '@/lib/types';

/**
 * 큐 조회 헬퍼 (관리 페이지 + 워크플로 fetch에서 공유).
 *
 * 기본 동작:
 * - deleted_at IS NULL 인 항목만
 * - status 필터 (default: pending)
 * - showDeleted=true → deleted_at IS NOT NULL도 포함 (관리자 토글)
 */

export interface QueueQuery {
  status?: ChangeStatus[];
  /** content_path prefix 필터 */
  pathPrefix?: string;
  showDeleted?: boolean;
  /** 페이지 사이즈 */
  limit?: number;
}

export interface QueueItems {
  comments: Comment[];
  attachments: Attachment[];
}

const DEFAULT_LIMIT = 500;

export async function fetchQueueItems(query: QueueQuery = {}): Promise<QueueItems> {
  const supabase = getSupabase();
  const status = query.status && query.status.length > 0 ? query.status : ['pending'];
  const limit = query.limit ?? DEFAULT_LIMIT;

  let commentsBuilder = supabase
    .from('comments')
    .select('*')
    .in('status', status)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (!query.showDeleted) {
    commentsBuilder = commentsBuilder.is('deleted_at', null);
  }
  if (query.pathPrefix) {
    commentsBuilder = commentsBuilder.like('content_path', `${query.pathPrefix}%`);
  }

  let attachmentsBuilder = supabase
    .from('attachments')
    .select('*')
    .in('status', status)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (!query.showDeleted) {
    attachmentsBuilder = attachmentsBuilder.is('deleted_at', null);
  }
  if (query.pathPrefix) {
    attachmentsBuilder = attachmentsBuilder.like('content_path', `${query.pathPrefix}%`);
  }

  const [{ data: comments, error: cErr }, { data: attachments, error: aErr }] = await Promise.all([
    commentsBuilder,
    attachmentsBuilder,
  ]);
  if (cErr) throw cErr;
  if (aErr) throw aErr;

  return {
    comments: (comments ?? []) as Comment[],
    attachments: (attachments ?? []) as Attachment[],
  };
}
