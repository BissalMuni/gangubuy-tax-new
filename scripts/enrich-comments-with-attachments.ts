/**
 * 댓글 JSON에 첨부파일 내용을 병합하는 전처리 스크립트.
 * GitHub Actions에서 Claude Code 실행 전에 호출하여,
 * Supabase 자격증명 없이도 첨부파일 내용을 프롬프트에 포함시킨다.
 *
 * 사용법: npx tsx scripts/enrich-comments-with-attachments.ts /tmp/comments.json
 * 결과: /tmp/comments.json 파일이 attachment_content 필드가 추가된 형태로 덮어쓰기됨.
 */

import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const BUCKET_NAME = 'tax-attachments';

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    process.stderr.write('사용법: npx tsx scripts/enrich-comments-with-attachments.ts <comments.json>\n');
    process.exit(1);
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    process.stderr.write('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY\n');
    process.exit(1);
  }

  const client = createClient(url, key, { db: { schema: 'tax' } });
  const comments = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  let enrichedCount = 0;

  for (const comment of comments) {
    // comment_id 기반 조회, 폴백으로 content_path
    let query = client.from('attachments').select('*');
    if (comment.id) {
      query = query.eq('comment_id', comment.id);
    } else {
      query = query.eq('content_path', comment.content_path);
    }

    const { data: attachments, error } = await query;
    if (error || !attachments?.length) continue;

    // 텍스트 계열 첨부파일만 내용 추출
    const contents: string[] = [];
    for (const att of attachments) {
      if (att.mime_type === 'text/plain' || att.mime_type === 'text/markdown') {
        const { data: blob, error: dlErr } = await client.storage
          .from(BUCKET_NAME)
          .download(att.storage_path);
        if (dlErr || !blob) {
          contents.push(`[${att.file_name}] - 다운로드 실패`);
          continue;
        }
        const text = await blob.text();
        contents.push(`### ${att.file_name}\n${text}`);
      } else if (att.mime_type === 'application/pdf') {
        contents.push(`[${att.file_name}] - PDF 파일 (텍스트 추출 불가)`);
      } else if (att.mime_type.startsWith('image/')) {
        contents.push(`[이미지: ${att.file_name}]`);
      } else {
        contents.push(`[${att.file_name}] - ${att.mime_type}`);
      }
    }

    if (contents.length > 0) {
      comment.attachment_content = contents.join('\n\n');
      enrichedCount++;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(comments, null, 2));
  process.stdout.write(`${enrichedCount}개 댓글에 첨부파일 내용 병합 완료\n`);
  process.exit(0);
}

main();
