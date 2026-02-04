'use client';

import { useState, useEffect } from 'react';
import { Upload, Button, Input, App } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from '@/lib/types';

interface AttachmentUploadProps {
  contentPath: string;
  onUploaded: () => void;
}

export function AttachmentUpload({ contentPath, onUploaded }: AttachmentUploadProps) {
  const { message } = App.useApp();
  const [uploading, setUploading] = useState(false);
  const [uploader, setUploader] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('gangubuy-comment-author');
    if (saved) setUploader(saved);
  }, []);

  const handleUpload = async (file: File) => {
    if (!uploader.trim()) {
      message.warning('업로더 이름을 입력하세요.');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      message.error('파일 크기는 10MB를 초과할 수 없습니다.');
      return false;
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type as (typeof ALLOWED_MIME_TYPES)[number])) {
      message.error('허용되지 않는 파일 형식입니다.');
      return false;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('content_path', contentPath);
      formData.append('uploaded_by', uploader.trim());

      const res = await fetch('/api/attachments', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        message.error(err.error || '업로드에 실패했습니다.');
        return false;
      }

      localStorage.setItem('gangubuy-comment-author', uploader.trim());
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
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <Input
        placeholder="업로더 이름"
        value={uploader}
        onChange={(e) => setUploader(e.target.value)}
        maxLength={100}
        style={{ width: 150 }}
        size="small"
      />
      <Upload
        beforeUpload={handleUpload}
        showUploadList={false}
        accept={ALLOWED_MIME_TYPES.join(',')}
      >
        <Button
          icon={<UploadOutlined />}
          loading={uploading}
          size="small"
          disabled={!uploader.trim()}
        >
          파일 업로드
        </Button>
      </Upload>
    </div>
  );
}
