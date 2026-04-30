import { getSupabase } from './server';
import type { Attachment } from '@/lib/types';
import {
  ALLOWED_MIME_TYPES,
  ALLOWED_FILE_EXTENSIONS,
  BLOCKED_FILE_EXTENSIONS,
  MAX_FILE_SIZE,
} from '@/lib/types';

const BUCKET_NAME = 'attachments';

function getFileExtension(name: string): string {
  return name.includes('.') ? (name.split('.').pop() || '').toLowerCase() : '';
}

export async function getAttachments(contentPath: string): Promise<Attachment[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('attachments')
    .select('*')
    .eq('content_path', contentPath)
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Add download URLs
  return (data || []).map((item) => ({
    ...item,
    download_url: supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(item.storage_path).data.publicUrl,
  })) as Attachment[];
}

export interface UploadAttachmentInput {
  file: File;
  content_path: string;
  /**
   * Phase 2 전환 시 이메일 채워짐. Phase 1은 무기명이라 NULL.
   */
  uploaded_by?: string | null;
  /**
   * 댓글과 동시 제출 시 연결. 단독 첨부는 NULL.
   */
  comment_id?: string | null;
}

export async function uploadAttachment(input: UploadAttachmentInput): Promise<Attachment> {
  const { file, content_path: contentPath, uploaded_by: uploadedBy = null, comment_id: commentId = null } = input;

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('file size exceeds 10MB limit');
  }

  const ext = getFileExtension(file.name);

  // Reject explicitly blocked extensions (e.g. legacy .hwp; .hwpx is allowed instead)
  if ((BLOCKED_FILE_EXTENSIONS as readonly string[]).includes(ext)) {
    throw new Error(
      'file type not allowed: .hwp is not supported, please convert to .hwpx',
    );
  }

  // Allow if either the MIME type or the file extension is on the allowlist.
  const mimeAllowed = (ALLOWED_MIME_TYPES as readonly string[]).includes(file.type);
  const extAllowed = (ALLOWED_FILE_EXTENSIONS as readonly string[]).includes(ext);
  if (!mimeAllowed && !extAllowed) {
    throw new Error(
      'file type not allowed. Allowed: pdf, txt, hwpx, xlsx, xls, doc, docx, jpg, jpeg, png, gif, webp',
    );
  }

  const supabase = getSupabase();
  const uuid = crypto.randomUUID();
  const storagePath = `${contentPath}/${uuid}${ext ? `.${ext}` : ''}`;
  const contentType = file.type || 'application/octet-stream';

  // Upload to Storage
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, buffer, {
      contentType,
    });

  if (uploadError) throw uploadError;

  // Save metadata to DB
  const { data, error: insertError } = await supabase
    .from('attachments')
    .insert({
      content_path: contentPath,
      file_name: file.name,
      storage_path: storagePath,
      file_size: file.size,
      mime_type: contentType,
      uploaded_by: uploadedBy,
      comment_id: commentId,
      status: 'pending',
      target_kind: 'content',
    })
    .select()
    .single();

  if (insertError) {
    // Cleanup: remove uploaded file if DB insert fails
    await supabase.storage.from(BUCKET_NAME).remove([storagePath]);
    throw insertError;
  }

  const downloadUrl = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(storagePath).data.publicUrl;

  return { ...data, download_url: downloadUrl } as Attachment;
}

export async function deleteAttachment(
  id: string,
  uploadedBy: string,
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();

  // Fetch the attachment
  const { data: existing, error: fetchError } = await supabase
    .from('attachments')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError || !existing) {
    return { success: false, error: 'attachment not found' };
  }

  if (existing.uploaded_by !== uploadedBy) {
    return { success: false, error: 'only the uploader can delete this attachment' };
  }

  // Delete from Storage
  await supabase.storage.from(BUCKET_NAME).remove([existing.storage_path]);

  // Delete from DB
  const { error: deleteError } = await supabase
    .from('attachments')
    .delete()
    .eq('id', id);

  if (deleteError) throw deleteError;
  return { success: true };
}
