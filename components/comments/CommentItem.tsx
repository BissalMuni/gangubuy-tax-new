'use client';

import { Typography, Button, Popconfirm, Tag, Tooltip } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import type { Comment } from '@/lib/types';
import type { Section } from '@/lib/context/sections-context';
import type { CurrentUserInfo } from './CommentList';

const { Text, Paragraph } = Typography;

interface CommentItemProps {
  comment: Comment;
  currentUser: CurrentUserInfo;
  onDelete: (id: string) => void;
  sections?: Section[];
}

/**
 * 본인 댓글 식별:
 *   Phase 2 — comment.author_user_id === currentUser.userId (강한 식별)
 *   Phase 1/legacy — comment.author === currentUser.legacyAuthor (무기명 댓글은 항상 false)
 *
 * 본인 pending 댓글만 삭제 가능 (FR-013, slice 13).
 */
function isOwnedBy(comment: Comment, user: CurrentUserInfo): boolean {
  if (user.phase === 2 && user.userId) {
    return Boolean(comment.author_user_id && comment.author_user_id === user.userId);
  }
  return Boolean(comment.author && user.legacyAuthor && comment.author === user.legacyAuthor);
}

export function CommentItem({ comment, currentUser, onDelete, sections }: CommentItemProps) {
  const owned = isOwnedBy(comment, currentUser);
  const status = comment.status ?? 'pending';
  const canSelfDelete = owned && status === 'pending';
  const isApplied = status === 'applied';

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
        {canSelfDelete && (
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
        {owned && !canSelfDelete && (
          <Tooltip title="승인된 댓글은 본인이 직접 삭제할 수 없습니다. 관리자에게 문의하세요.">
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              disabled
              aria-label="승인 후 삭제 불가"
            />
          </Tooltip>
        )}
      </div>
      <Paragraph style={{ marginTop: 8, marginBottom: 0, whiteSpace: 'pre-wrap' }}>
        {comment.body}
      </Paragraph>
    </article>
  );
}
