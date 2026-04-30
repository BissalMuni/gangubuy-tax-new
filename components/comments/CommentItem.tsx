'use client';

import { Typography, Button, Popconfirm, Tag } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import type { Comment } from '@/lib/types';
import type { Section } from '@/lib/context/sections-context';

const { Text, Paragraph } = Typography;

interface CommentItemProps {
  comment: Comment;
  currentAuthor: string;
  onDelete: (id: string) => void;
  sections?: Section[];
}

export function CommentItem({ comment, currentAuthor, onDelete, sections }: CommentItemProps) {
  // Phase 1: author가 NULL인 무기명 댓글은 본인 식별 불가 → 삭제 불가
  const isOwner = comment.author !== null && comment.author === currentAuthor;
  const displayAuthor = comment.author ?? '(무기명)';
  const date = new Date(comment.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const sectionLabel = comment.section
    ? (sections?.find((s) => s.id === comment.section)?.label ?? comment.section)
    : null;

  const isApplied = comment.status === 'applied';

  return (
    <article
      aria-label={`${displayAuthor}의 댓글`}
      style={{
        padding: '12px 16px',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <UserOutlined style={{ color: '#999' }} aria-hidden="true" />
          <Text strong>{displayAuthor}</Text>
          {sectionLabel && (
            <Tag color="blue" style={{ margin: 0 }}>
              {sectionLabel}
            </Tag>
          )}
          <Text type="secondary" style={{ fontSize: 12 }}>
            <time dateTime={comment.created_at}>{date}</time>
          </Text>
          {isApplied && (
            <Tag icon={<CheckCircleOutlined />} color="success" style={{ margin: 0 }}>
              반영됨
            </Tag>
          )}
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
              aria-label="댓글 삭제"
            />
          </Popconfirm>
        )}
      </div>
      <Paragraph style={{ marginTop: 8, marginBottom: 0, whiteSpace: 'pre-wrap' }}>
        {comment.body}
      </Paragraph>
    </article>
  );
}
