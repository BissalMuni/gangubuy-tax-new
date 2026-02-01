'use client';

import { Typography, Button, Popconfirm } from 'antd';
import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import type { Comment } from '@/lib/types';

const { Text, Paragraph } = Typography;

interface CommentItemProps {
  comment: Comment;
  currentAuthor: string;
  onDelete: (id: string) => void;
}

export function CommentItem({ comment, currentAuthor, onDelete }: CommentItemProps) {
  const isOwner = comment.author === currentAuthor;
  const date = new Date(comment.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      style={{
        padding: '12px 16px',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <UserOutlined style={{ color: '#999' }} />
          <Text strong>{comment.author}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {date}
          </Text>
        </div>
        {isOwner && (
          <Popconfirm
            title="댓글을 삭제하시겠습니까?"
            onConfirm={() => onDelete(comment.id)}
            okText="삭제"
            cancelText="취소"
          >
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              danger
            />
          </Popconfirm>
        )}
      </div>
      <Paragraph style={{ marginTop: 8, marginBottom: 0, whiteSpace: 'pre-wrap' }}>
        {comment.body}
      </Paragraph>
    </div>
  );
}
