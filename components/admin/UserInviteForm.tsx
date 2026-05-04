'use client';

import { useState } from 'react';
import { Alert, App, Button, Checkbox, Input } from 'antd';
import { MailOutlined, UserAddOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const ROLE_OPTIONS: { value: 'admin' | 'approver' | 'editor'; label: string }[] = [
  { value: 'admin', label: '관리자' },
  { value: 'approver', label: '승인자' },
  { value: 'editor', label: '담당자' },
];

interface UserInviteFormProps {
  disabled?: boolean;
}

export function UserInviteForm({ disabled }: UserInviteFormProps) {
  const router = useRouter();
  const { message } = App.useApp();
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState<('admin' | 'approver' | 'editor')[]>(['editor']);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (event?: React.FormEvent) => {
    event?.preventDefault();
    if (disabled) return;
    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg('이메일 형식이 올바르지 않습니다.');
      return;
    }
    if (roles.length === 0) {
      setErrorMsg('역할을 최소 1개 선택해 주세요.');
      return;
    }
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, roles }),
      });
      if (res.status === 409) {
        setErrorMsg('이미 등록된 이메일입니다. 역할 변경은 목록에서 진행해 주세요.');
        return;
      }
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setErrorMsg(err.error ?? '초대에 실패했습니다.');
        return;
      }
      message.success(`${trimmed}에게 초대 메일을 보냈습니다.`);
      setEmail('');
      setRoles(['editor']);
      router.refresh();
    } catch {
      setErrorMsg('네트워크 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input
        size="large"
        type="email"
        placeholder="invite@example.com"
        prefix={<MailOutlined />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={disabled}
        autoComplete="email"
      />
      <Checkbox.Group
        options={ROLE_OPTIONS}
        value={roles}
        onChange={(vals) => setRoles(vals as ('admin' | 'approver' | 'editor')[])}
        disabled={disabled}
      />
      {errorMsg && <Alert type="error" message={errorMsg} showIcon />}
      <Button
        type="primary"
        size="large"
        htmlType="submit"
        icon={<UserAddOutlined />}
        loading={submitting}
        disabled={disabled}
      >
        초대 메일 발송
      </Button>
    </form>
  );
}
