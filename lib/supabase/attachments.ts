import { getSupabase } from './server';
import type { Attachment } from '@/lib/types';
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from '@/lib/types';

const BUCKET_NAME = 'attachments';

export async function getAttachments(contentPath: string): Promise<Attachment[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('attachments')
    .select('*')
    .eq('content_path', contentPath)
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

export async function uploadAttachment(
  file: File,
  contentPath: string,
  uploadedBy: string,
): Promise<Attachment> {
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('file size exceeds 10MB limit');
  }

  // Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type as (typeof ALLOWED_MIME_TYPES)[number])) {
    throw new Error(
      'file type not allowed. Allowed: pdf, xlsx, xls, doc, docx, hwp, jpg, jpeg, png, gif',
    );
  }

  const supabase = getSupabase();
  const uuid = crypto.randomUUID();
  const ext = file.name.includes('.') ? file.name.split('.').pop() : '';
  const storagePath = `${contentPath}/${uuid}${ext ? `.${ext}` : ''}`;

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
