'use client';

import { useMemo, useState } from 'react';
import { Tree, Empty, Tag, Typography } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import type { GroupNode } from '@/lib/admin/group-tree';
import type { Comment, Attachment } from '@/lib/types';
import { ChangeDetailPanel } from './ChangeDetailPanel';
import { BulkActionBar } from './BulkActionBar';

interface SelectableId {
  kind: 'comment' | 'attachment';
  id: string;
  updated_at: string;
}

interface ChangeQueueTreeProps {
  groups: GroupNode[];
  /** 관리자만 복원 버튼 노출 */
  canRestore: boolean;
}

function buildTreeNodes(
  groups: GroupNode[],
  selected: Set<string>,
  toggle: (key: string, item: SelectableId) => void,
): TreeDataNode[] {
  return groups.map((g) => ({
    key: `group:${g.key}`,
    title: (
      <span>
        {g.label}{' '}
        {g.totalComments > 0 && (
          <Tag color="blue">댓글 {g.totalComments}</Tag>
        )}
        {g.totalAttachments > 0 && (
          <Tag color="purple">첨부 {g.totalAttachments}</Tag>
        )}
      </span>
    ),
    selectable: false,
    children: [
      ...g.comments.map((c) => ({
        key: `comment:${c.id}`,
        title: (
          <ItemRow
            label={c.body?.slice(0, 60) || '(빈 댓글)'}
            status={c.status}
            checked={selected.has(`comment:${c.id}`)}
            onToggle={() => toggle(`comment:${c.id}`, {
              kind: 'comment',
              id: c.id,
              updated_at: c.updated_at,
            })}
            deleted={!!c.deleted_at}
          />
        ),
      })),
      ...g.attachments.map((a) => ({
        key: `attachment:${a.id}`,
        title: (
          <ItemRow
            label={`📎 ${a.file_name}`}
            status={a.status}
            checked={selected.has(`attachment:${a.id}`)}
            onToggle={() => toggle(`attachment:${a.id}`, {
              kind: 'attachment',
              id: a.id,
              updated_at: a.updated_at,
            })}
            deleted={!!a.deleted_at}
          />
        ),
      })),
      ...buildTreeNodes(g.children, selected, toggle),
    ],
  }));
}

function ItemRow({
  label,
  status,
  checked,
  onToggle,
  deleted,
}: {
  label: string;
  status?: string;
  checked: boolean;
  onToggle: () => void;
  deleted: boolean;
}) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, opacity: deleted ? 0.5 : 1 }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        onClick={(e) => e.stopPropagation()}
      />
      <span style={{ textDecoration: deleted ? 'line-through' : undefined }}>{label}</span>
      {status && <Tag color={statusColor(status)}>{status}</Tag>}
      {deleted && <Tag color="red">삭제됨</Tag>}
    </span>
  );
}

function statusColor(status: string): string {
  switch (status) {
    case 'pending': return 'gold';
    case 'approved': return 'blue';
    case 'processing': return 'cyan';
    case 'applied': return 'green';
    case 'rejected': return 'red';
    case 'failed': return 'volcano';
    default: return 'default';
  }
}

export function ChangeQueueTree({ groups, canRestore }: ChangeQueueTreeProps) {
  const [selected, setSelected] = useState<Map<string, SelectableId>>(new Map());
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const allItems = useMemo(() => {
    const map = new Map<string, Comment | Attachment>();
    function visit(group: GroupNode) {
      for (const c of group.comments) map.set(`comment:${c.id}`, c);
      for (const a of group.attachments) map.set(`attachment:${a.id}`, a);
      group.children.forEach(visit);
    }
    groups.forEach(visit);
    return map;
  }, [groups]);

  const selectedKeys = useMemo(() => new Set(selected.keys()), [selected]);

  const toggle = (key: string, item: SelectableId) => {
    setSelected((prev) => {
      const next = new Map(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.set(key, item);
      }
      return next;
    });
  };

  const onSelect: TreeProps['onSelect'] = (keys) => {
    const k = keys[0]?.toString();
    if (k && (k.startsWith('comment:') || k.startsWith('attachment:'))) {
      setActiveKey(k);
    }
  };

  const treeNodes = useMemo(
    () => buildTreeNodes(groups, selectedKeys, toggle),
    [groups, selectedKeys],
  );

  const activeItem = activeKey ? allItems.get(activeKey) : null;
  const activeKind: 'comment' | 'attachment' | null = activeKey
    ? activeKey.startsWith('comment:')
      ? 'comment'
      : 'attachment'
    : null;

  if (groups.length === 0) {
    return (
      <div style={{ padding: 32 }}>
        <Empty description="조회 결과가 없습니다" />
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 16 }}>
      <div>
        <BulkActionBar
          selected={Array.from(selected.values())}
          onClear={() => setSelected(new Map())}
          canRestore={canRestore}
        />
        <Tree
          defaultExpandAll
          showLine={{ showLeafIcon: false }}
          treeData={treeNodes}
          onSelect={onSelect}
        />
      </div>
      <div style={{ position: 'sticky', top: 16, alignSelf: 'start', maxHeight: '90vh', overflow: 'auto' }}>
        {activeItem && activeKind ? (
          <ChangeDetailPanel item={activeItem} kind={activeKind} canRestore={canRestore} />
        ) : (
          <Typography.Paragraph type="secondary" style={{ padding: 16 }}>
            항목을 선택하면 상세가 표시됩니다.
          </Typography.Paragraph>
        )}
      </div>
    </div>
  );
}
