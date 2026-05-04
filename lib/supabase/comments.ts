import { getSupabase } from './server';
import type { Comment } from '@/lib/types';

export async function getComments(contentPath: string): Promise<Comment[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('content_path', contentPath)
    .is('deleted_at', null)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data || []) as Comment[];
}

export interface CreateCommentInput {
  content_path: string;
  body: string;
  section?: string | null;
  target_kind?: 'content' | 'structure';
  /**
   * Phase 2: 작성자 이메일. Phase 1은 무기명이라 NULL.
   */
  author?: string | null;
  /**
   * Phase 2: auth.users.id (강한 식별, FK). Phase 1에서는 NULL.
   * 본인 댓글 soft delete 권한 검사에 사용 (slice 13).
   */
  author_user_id?: string | null;
}

export async function createComment(input: CreateCommentInput): Promise<Comment> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('comments')
    .insert({
      content_path: input.content_path,
      author: input.author ?? null,
      author_user_id: input.author_user_id ?? null,
      body: input.body,
      section: input.section || null,
      target_kind: input.target_kind ?? 'content',
      status: 'pending',
    })
    .select()
    .single();

  if (error) throw error;
  return data as Comment;
}

export async function deleteComment(
  id: string,
  author: string,
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();

  // First check if comment exists and author matches
  const { data: existing, error: fetchError } = await supabase
    .from('comments')
    .select('author')
    .eq('id', id)
    .single();

  if (fetchError || !existing) {
    return { success: false, error: 'comment not found' };
  }

  if (existing.author !== author) {
    return { success: false, error: 'only the author can delete this comment' };
  }

  const { error: deleteError } = await supabase
    .from('comments')
    .delete()
    .eq('id', id);

  if (deleteError) throw deleteError;
  return { success: true };
}
