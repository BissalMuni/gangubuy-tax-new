'use client';

import { useState, useEffect, useCallback } from 'react';
import { Typography, Divider, Button, Popconfirm, Tag, Spin, App } from 'antd';
import {
  PaperClipOutlined,
  DownloadOutlined,
  DeleteOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { AttachmentUpload } from './AttachmentUpload';
import type { Attachment } from '@/lib/types';

const { Title, Text } = Typography;

interface AttachmentListProps {
  contentPath: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function AttachmentList({ contentPath }: AttachmentListProps) {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);
  const { message } = App.useApp();

  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    setCurrentUser(localStorage.getItem('gangubuy-comment-author') || '');
  }, []);

  const fetchAttachments = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/attachments?content_path=${encodeURIComponent(contentPath)}`,
      );
      const data = await res.json();
      setAttachments(data.data || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [contentPath]);

  useEffect(() => {
    fetchAttachments();
  }, [fetchAttachments]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `/api/attachments/${id}?uploaded_by=${encodeURIComponent(currentUser)}`,
        { method: 'DELETE' },
      );

      if (!res.ok) {
        const err = await res.json();
        message.error(err.error || '삭제에 실패했습니다.');
        return;
      }

      message.success('파일이 삭제되었습니다.');
      await fetchAttachments();
    } catch {
      message.error('삭제에 실패했습니다.');
    }
  };

  return (
    <div id="attachments-section" style={{ marginTop: 32 }}>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={5} style={{ margin: 0 }}>
          <PaperClipOutlined style={{ marginRight: 8 }} />
          첨부파일 ({attachments.length})
        </Title>
        <AttachmentUpload contentPath={contentPath} onUploaded={fetchAttachments} />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 24 }}>
          <Spin />
        </div>
      ) : attachments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 24, color: '#999' }}>
          첨부파일이 없습니다
        </div>
      ) : (
        <div>
          {attachments.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, flex: 1 }}>
                <FileOutlined style={{ fontSize: 20, color: '#1890ff', flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 500 }}>{item.file_name}</div>
                  <div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {formatFileSize(item.file_size)} · {item.uploaded_by} ·{' '}
                      {new Date(item.created_at).toLocaleDateString('ko-KR')}
                    </Text>
                    <Tag style={{ marginLeft: 8 }} color="default">
                      {item.mime_type.split('/').pop()}
                    </Tag>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                {item.download_url && (
                  <a
                    href={item.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="small" icon={<DownloadOutlined />}>
                      다운로드
                    </Button>
                  </a>
                )}
                {item.uploaded_by === currentUser && (
                  <Popconfirm
                    title="파일을 삭제하시겠습니까?"
                    onConfirm={() => handleDelete(item.id)}
                    okText="삭제"
                    cancelText="취소"
                  >
                    <Button size="small" icon={<DeleteOutlined />} danger />
                  </Popconfirm>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
