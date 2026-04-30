'use client';

import { useState } from 'react';
import { Upload, Button, App } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
  ALLOWED_FILE_EXTENSIONS,
  BLOCKED_FILE_EXTENSIONS,
  MAX_FILE_SIZE,
} from '@/lib/types';

interface AttachmentUploadProps {
  contentPath: string;
  onUploaded: () => void;
}

function getExt(name: string): string {
  return name.includes('.') ? (name.split('.').pop() || '').toLowerCase() : '';
}

export function AttachmentUpload({ contentPath, onUploaded }: AttachmentUploadProps) {
  const { message } = App.useApp();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      message.error('파일 크기는 10MB를 초과할 수 없습니다.');
      return false;
    }

    const ext = getExt(file.name);

    if ((BLOCKED_FILE_EXTENSIONS as readonly string[]).includes(ext)) {
      message.error('hwp 파일은 업로드할 수 없습니다. hwpx 파일로 변환해 주세요.');
      return false;
    }

    if (!(ALLOWED_FILE_EXTENSIONS as readonly string[]).includes(ext)) {
      message.error('허용되지 않는 파일 형식입니다.');
      return false;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('content_path', contentPath);
      formData.append('uploaded_by', '익명');

      const res = await fetch('/api/attachments', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        message.error(err.error || '업로드에 실패했습니다.');
        return false;
      }

      message.success('파일이 업로드되었습니다.');
      onUploaded();
    } catch {
      message.error('업로드에 실패했습니다.');
    } finally {
      setUploading(false);
    }

    return false; // Prevent default upload behavior
  };

  return (
    <Upload
      beforeUpload={handleUpload}
      showUploadList={false}
      accept={(ALLOWED_FILE_EXTENSIONS as readonly string[]).map((e) => `.${e}`).join(',')}
    >
      <Button
        icon={<UploadOutlined />}
        loading={uploading}
        size="small"
        aria-label="파일 업로드 (최대 10MB)"
      >
        파일 업로드
      </Button>
    </Upload>
  );
}
