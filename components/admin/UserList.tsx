'use client';

import { useState } from 'react';
import { Alert, App, Button, Checkbox, Empty, Space, Switch, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';
import type { AppRole } from '@/lib/supabase/users';

interface UserRow {
  id: string;
  email: string;
  roles: AppRole[];
  active: boolean;
  invited_by: string | null;
  created_at: string;
  updated_at: string;
}

interface UserListProps {
  initialUsers: UserRow[];
  canEdit: boolean;
}

const ALL_ROLES: AppRole[] = ['admin', 'approver', 'editor'];
const ROLE_LABEL: Record<AppRole, string> = {
  admin: '관리자',
  approver: '승인자',
  editor: '담당자',
};
const ROLE_COLOR: Record<AppRole, string> = {
  admin: 'red',
  approver: 'orange',
  editor: 'blue',
};

export function UserList({ initialUsers, canEdit }: UserListProps) {
  const router = useRouter();
  const { message } = App.useApp();
  const [users] = useState<UserRow[]>(initialUsers);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingRoles, setEditingRoles] = useState<AppRole[]>([]);
  const [busy, setBusy] = useState<string | null>(null);

  if (users.length === 0) {
    return <Empty description="등록된 사용자가 없습니다." />;
  }

  const patch = async (id: string, body: { roles?: AppRole[]; active?: boolean }) => {
    setBusy(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        message.error(err.error ?? '갱신에 실패했습니다.');
        return false;
      }
      message.success('갱신되었습니다.');
      router.refresh();
      return true;
    } catch {
      message.error('네트워크 오류가 발생했습니다.');
      return false;
    } finally {
      setBusy(null);
    }
  };

  const startEdit = (user: UserRow) => {
    setEditingId(user.id);
    setEditingRoles(user.roles);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingRoles([]);
  };

  const saveEdit = async (id: string) => {
    if (editingRoles.length === 0) {
      message.warning('역할을 최소 1개 선택해 주세요.');
      return;
    }
    const ok = await patch(id, { roles: editingRoles });
    if (ok) cancelEdit();
  };

  const columns: ColumnsType<UserRow> = [
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => <code>{email}</code>,
    },
    {
      title: '역할',
      key: 'roles',
      render: (_, user) => {
        if (editingId === user.id) {
          return (
            <Checkbox.Group
              value={editingRoles}
              onChange={(vals) => setEditingRoles(vals as AppRole[])}
              options={ALL_ROLES.map((r) => ({ label: ROLE_LABEL[r], value: r }))}
            />
          );
        }
        return (
          <Space size={4} wrap>
            {user.roles.map((r) => (
              <Tag key={r} color={ROLE_COLOR[r]}>
                {ROLE_LABEL[r]}
              </Tag>
            ))}
          </Space>
        );
      },
    },
    {
      title: '활성',
      dataIndex: 'active',
      key: 'active',
      width: 80,
      render: (active: boolean, user) => (
        <Switch
          checked={active}
          disabled={!canEdit || busy === user.id}
          onChange={(checked) => patch(user.id, { active: checked })}
        />
      ),
    },
    {
      title: '가입일',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 180,
      render: (v: string) => new Date(v).toLocaleString('ko-KR'),
    },
    {
      title: '동작',
      key: 'actions',
      width: 160,
      render: (_, user) => {
        if (!canEdit) return null;
        if (editingId === user.id) {
          return (
            <Space size="small">
              <Button
                type="primary"
                size="small"
                onClick={() => saveEdit(user.id)}
                loading={busy === user.id}
              >
                저장
              </Button>
              <Button size="small" onClick={cancelEdit}>
                취소
              </Button>
            </Space>
          );
        }
        return (
          <Button size="small" onClick={() => startEdit(user)}>
            역할 편집
          </Button>
        );
      },
    },
  ];

  return (
    <>
      {!canEdit && (
        <Alert
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
          message="읽기 전용 (Phase 2 비활성)"
        />
      )}
      <Table
        rowKey="id"
        dataSource={users}
        columns={columns}
        size="middle"
        pagination={false}
      />
    </>
  );
}
