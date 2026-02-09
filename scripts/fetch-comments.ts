/**
 * Supabase에서 처리되지 않은 댓글을 조회하는 스크립트
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import type { Comment, Attachment } from '../lib/types';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * 처리되지 않은 모든 댓글을 조회합니다
 */
export async function fetchUnprocessedComments(): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .or('processed.is.null,processed.eq.false')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[Fetch Comments] Error:', error.message);
    throw error;
  }

  console.log(`[Fetch Comments] Found ${data?.length || 0} unprocessed comments`);
  return (data || []) as Comment[];
}

/**
 * 특정 content_path의 첨부파일을 조회합니다
 */
export async function fetchAttachments(contentPath: string): Promise<Attachment[]> {
  const { data, error } = await supabase
    .from('attachments')
    .select('*')
    .eq('content_path', contentPath)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[Fetch Attachments] Error:', error.message);
    throw error;
  }

  // download_url 생성
  const attachmentsWithUrls = (data || []).map((att) => ({
    ...att,
    download_url: `${supabaseUrl}/storage/v1/object/public/attachments/${att.storage_path}`,
  }));

  return attachmentsWithUrls as Attachment[];
}

/**
 * 첨부파일 내용을 다운로드합니다 (텍스트 추출용)
 */
export async function downloadAttachment(storagePath: string): Promise<Buffer | null> {
  const { data, error } = await supabase.storage
    .from('attachments')
    .download(storagePath);

  if (error) {
    console.error('[Download Attachment] Error:', error.message);
    return null;
  }

  const arrayBuffer = await data.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * 댓글을 처리 완료로 표시합니다
 */
export async function markCommentProcessed(
  commentId: string,
  commitSha?: string,
): Promise<void> {
  const { error } = await supabase
    .from('comments')
    .update({
      processed: true,
      processed_at: new Date().toISOString(),
      commit_sha: commitSha || null,
    })
    .eq('id', commentId);

  if (error) {
    console.error('[Mark Processed] Error:', error.message);
    throw error;
  }

  console.log(`[Mark Processed] Comment ${commentId} marked as processed`);
}

// CLI 직접 실행 시
if (require.main === module) {
  (async () => {
    console.log('Fetching unprocessed comments...\n');
    const comments = await fetchUnprocessedComments();

    if (comments.length === 0) {
      console.log('No unprocessed comments found.');
      return;
    }

    for (const comment of comments) {
      console.log(`---`);
      console.log(`ID: ${comment.id}`);
      console.log(`Path: ${comment.content_path}`);
      console.log(`Author: ${comment.author}`);
      console.log(`Body: ${comment.body.substring(0, 100)}...`);
      console.log(`Created: ${comment.created_at}`);

      const attachments = await fetchAttachments(comment.content_path);
      if (attachments.length > 0) {
        console.log(`Attachments: ${attachments.map((a) => a.file_name).join(', ')}`);
      }
    }
  })();
}
