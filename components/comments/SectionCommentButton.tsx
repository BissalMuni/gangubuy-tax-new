'use client';

import { useState } from 'react';
import { Button, Modal, Input, Upload, List, App } from 'antd';
import {
  CommentOutlined,
  PaperClipOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useSections } from '@/lib/context/sections-context';
import {
  ALLOWED_FILE_EXTENSIONS,
  BLOCKED_FILE_EXTENSIONS,
  MAX_FILE_SIZE,
} from '@/lib/types';

const { TextArea } = Input;

interface SectionCommentButtonProps {
  sectionId: string;
}

function getExt(name: string): string {
  return name.includes('.') ? (name.split('.').pop() || '').toLowerCase() : '';
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function SectionCommentButton({ sectionId }: SectionCommentButtonProps) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const { sections, contentPath } = useSections();
  const { message } = App.useApp();

  const sectionLabel = sections.find((s) => s.id === sectionId)?.label ?? sectionId;

  const reset = () => {
    setBody('');
    setFiles([]);
  };

  const handleAddFile = (file: File): boolean => {
    const ext = getExt(file.name);

    if ((BLOCKED_FILE_EXTENSIONS as readonly string[]).includes(ext)) {
      message.error('hwp 파일은 업로드할 수 없습니다. hwpx 파일로 변환해 주세요.');
      return false;
    }

    if (!(ALLOWED_FILE_EXTENSIONS as readonly string[]).includes(ext)) {
      message.error(
        `허용되지 않은 파일 형식입니다 (.${ext || '확장자 없음'}). 이미지/txt/pdf/hwpx 등만 업로드 가능합니다.`,
      );
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      message.error('파일 크기는 10MB를 초과할 수 없습니다.');
      return false;
    }

    setFiles((prev) => [...prev, file]);
    return false; // prevent antd auto-upload; we upload on form submit
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    if (!contentPath) return;
    const trimmedBody = body.trim();
    if (!trimmedBody && files.length === 0) return;

    setSubmitting(true);
    try {
      // 1) Comment (optional)
      if (trimmedBody) {
        const res = await fetch('/api/comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content_path: contentPath,
            author: '익명',
            body: trimmedBody,
            section: sectionId,
          }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          message.error(err.error || '댓글 작성에 실패했습니다.');
          return;
        }
      }

      // 2) Attachments (optional, sequential — keep it simple)
      let uploaded = 0;
      let failed = 0;
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('content_path', contentPath);
        formData.append('uploaded_by', '익명');
        const res = await fetch('/api/attachments', {
          method: 'POST',
          body: formData,
        });
        if (res.ok) {
          uploaded += 1;
        } else {
          failed += 1;
          const err = await res.json().catch(() => ({}));
          message.error(`${file.name}: ${err.error || '업로드 실패'}`);
        }
      }

      if (trimmedBody && uploaded > 0) {
        message.success(`댓글과 파일 ${uploaded}개가 등록되었습니다.`);
      } else if (uploaded > 0) {
        message.success(`파일 ${uploaded}개가 업로드되었습니다.`);
      } else if (trimmedBody) {
        message.success('댓글이 등록되었습니다.');
      }

      if (failed === 0) {
        reset();
        setOpen(false);
      }
      window.dispatchEvent(new CustomEvent('comments-refresh'));
      window.dispatchEvent(new CustomEvent('attachments-refresh'));
    } catch {
      message.error('등록에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!contentPath) return null;

  const canSubmit = body.trim().length > 0 || files.length > 0;
  const acceptAttr = (ALLOWED_FILE_EXTENSIONS as readonly string[])
    .map((e) => `.${e}`)
    .join(',');

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title={`${sectionLabel} 섹션에 댓글 작성`}
        className="inline-flex items-center justify-center w-6 h-6 ml-2 text-gray-400 hover:text-blue-500 transition-colors rounded cursor-pointer"
        style={{ border: 'none', background: 'none', verticalAlign: 'middle' }}
      >
        <CommentOutlined style={{ fontSize: 16 }} />
      </button>
      <Modal
        title={
          <span>
            댓글 작성 — <span style={{ color: '#1677ff' }}>{sectionLabel}</span>
          </span>
        }
        open={open}
        onCancel={() => {
          setOpen(false);
          reset();
        }}
        footer={null}
        destroyOnClose
      >
        <div style={{ marginTop: 16 }}>
          <TextArea
            rows={4}
            placeholder="의견을 입력하세요"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={5000}
            autoFocus
          />

          <div style={{ marginTop: 12 }}>
            <Upload
              multiple
              showUploadList={false}
              beforeUpload={handleAddFile}
              accept={acceptAttr}
            >
              <Button icon={<PaperClipOutlined />} size="small">
                파일 첨부 (이미지 / txt / pdf / hwpx, 최대 10MB)
              </Button>
            </Upload>

            {files.length > 0 && (
              <List
                size="small"
                style={{ marginTop: 8 }}
                bordered
                dataSource={files}
                renderItem={(file, idx) => (
                  <List.Item
                    actions={[
                      <Button
                        key="remove"
                        type="text"
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={() => removeFile(idx)}
                        aria-label={`${file.name} 제거`}
                      />,
                    ]}
                  >
                    <span style={{ fontSize: 13 }}>
                      {file.name}{' '}
                      <span style={{ color: '#999' }}>({formatSize(file.size)})</span>
                    </span>
                  </List.Item>
                )}
              />
            )}
          </div>

          <div style={{ marginTop: 12, textAlign: 'right' }}>
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={submitting}
              disabled={!canSubmit}
            >
              작성
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
