import { getSupabase } from './server';
import type { Attachment } from '@/lib/types';
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from '@/lib/types';

const BUCKET_NAME = 'tax-attachments';
// Signed URL 유효 기간(초). 화면 새로고침/재조회 시마다 새로 발급되므로
// 너무 짧으면 사용성이 떨어지고, 너무 길면 URL 유출 시 노출 시간이 길어짐.
const SIGNED_URL_TTL = 3600;

export interface AdminAttachmentFilters {
  /** content_path 부분 일치 검색 (예: "/acquisition") */
  contentPath?: string;
  /** 업로더 이름(역할 라벨) 정확 일치 */
  uploadedBy?: string;
  /** mime type 접두 필터 (예: "image", "application/pdf") */
  mimeType?: string;
  /** 파일명 부분 일치 */
  fileName?: string;
  /** 페이지네이션 */
  limit?: number;
  offset?: number;
}

export interface AdminAttachmentList {
  rows: Attachment[];
  total: number;
}

/**
 * 관리자용 — 모든 첨부파일을 필터와 함께 조회.
 * 매 호출 시 Signed URL 일괄 발급 (조회 페이지 단위로만).
 */
export async function getAllAttachments(
  filters: AdminAttachmentFilters = {},
): Promise<AdminAttachmentList> {
  const supabase = getSupabase();
  const { contentPath, uploadedBy, mimeType, fileName, limit = 50, offset = 0 } = filters;

  let query = supabase
    .from('attachments')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (contentPath) query = query.ilike('content_path', `%${contentPath}%`);
  if (uploadedBy) query = query.eq('uploaded_by', uploadedBy);
  if (mimeType) query = query.ilike('mime_type', `${mimeType}%`);
  if (fileName) query = query.ilike('file_name', `%${fileName}%`);

  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;
  if (error) throw error;

  const rows = data || [];
  if (rows.length === 0) return { rows: [], total: count ?? 0 };

  const paths = rows.map((r) => r.storage_path);
  const { data: signed, error: signError } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrls(paths, SIGNED_URL_TTL);
  if (signError) throw signError;

  const enriched = rows.map((row, idx) => ({
    ...row,
    download_url: signed?.[idx]?.signedUrl ?? '',
  })) as Attachment[];

  return { rows: enriched, total: count ?? enriched.length };
}

export async function getAttachments(contentPath: string): Promise<Attachment[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('attachments')
    .select('*')
    .eq('content_path', contentPath)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const rows = data || [];
  if (rows.length === 0) return [];

  // Private 버킷이라 매 조회 시 Signed URL 일괄 발급
  const paths = rows.map((r) => r.storage_path);
  const { data: signed, error: signError } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrls(paths, SIGNED_URL_TTL);
  if (signError) throw signError;

  return rows.map((row, idx) => ({
    ...row,
    download_url: signed?.[idx]?.signedUrl ?? '',
  })) as Attachment[];
}

export async function uploadAttachment(
  file: File,
  contentPath: string,
  uploadedBy: string,
): Promise<Attachment> {
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('file size exceeds 10MB limit');
  }

  // 일부 OS(특히 Windows)는 .md 파일의 MIME type을 비워서 보내므로 확장자로 보강.
  const fileExt = file.name.toLowerCase().split('.').pop() ?? '';
  const isTextExt = fileExt === 'txt' || fileExt === 'md';
  if (
    !ALLOWED_MIME_TYPES.includes(file.type as (typeof ALLOWED_MIME_TYPES)[number]) &&
    !isTextExt
  ) {
    throw new Error(
      'file type not allowed. Allowed: pdf, xlsx, xls, doc, docx, hwp, jpg, jpeg, png, gif, txt, md',
    );
  }

  const supabase = getSupabase();
  const uuid = crypto.randomUUID();
  const ext = file.name.includes('.') ? file.name.split('.').pop() : '';
  // Supabase Storage 키는 ASCII 만 허용하므로 한글·특수문자는 '_' 로 치환.
  // 선행 슬래시도 제거. content_path 는 DB 에 원형 그대로 저장되므로 조회에 영향 없음.
  const cleanPath = contentPath
    .replace(/^\/+/, '')
    .replace(/[^a-zA-Z0-9/._-]/g, '_');
  const storagePath = `${cleanPath}/${uuid}${ext ? `.${ext}` : ''}`;

  // Upload to Storage
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, buffer, {
      contentType: file.type,
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
      mime_type: file.type,
      uploaded_by: uploadedBy,
    })
    .select()
    .single();

  if (insertError) {
    // Cleanup: remove uploaded file if DB insert fails
    await supabase.storage.from(BUCKET_NAME).remove([storagePath]);
    throw insertError;
  }

  const { data: signed, error: signError } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(storagePath, SIGNED_URL_TTL);
  if (signError) throw signError;

  return { ...data, download_url: signed.signedUrl } as Attachment;
}

export async function deleteAttachment(
  id: string,
  uploadedBy: string,
  canOverride = false,
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

  if (!canOverride && existing.uploaded_by !== uploadedBy) {
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
