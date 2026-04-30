'use client';

import { useState } from 'react';
import { Button, Input, Radio, App, Alert } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

interface LoginFormProps {
  redirectTo: string;
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
  const { message } = App.useApp();
  const [role, setRole] = useState<'admin' | 'approver'>('approver');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (event?: React.FormEvent) => {
    event?.preventDefault();
    if (!password) {
      setErrorMsg('비밀번호를 입력해 주세요.');
      return;
    }
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, role }),
      });
      if (res.status === 429) {
        setErrorMsg('로그인 시도가 너무 많습니다. 1시간 후 다시 시도해 주세요.');
        return;
      }
      if (res.status === 401) {
        setErrorMsg('비밀번호가 올바르지 않거나 역할이 잘못되었습니다.');
        return;
      }
      if (!res.ok) {
        setErrorMsg('로그인에 실패했습니다.');
        return;
      }
      message.success('로그인되었습니다.');
      router.replace(redirectTo);
      router.refresh();
    } catch {
      setErrorMsg('네트워크 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Radio.Group
        value={role}
        onChange={(e) => setRole(e.target.value)}
        optionType="button"
        buttonStyle="solid"
        style={{ display: 'flex' }}
      >
        <Radio.Button value="admin" style={{ flex: 1, textAlign: 'center' }}>
          관리자
        </Radio.Button>
        <Radio.Button value="approver" style={{ flex: 1, textAlign: 'center' }}>
          승인자
        </Radio.Button>
      </Radio.Group>

      <Input.Password
        size="large"
        placeholder="비밀번호"
        prefix={<LockOutlined />}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        autoFocus
      />

      {errorMsg && <Alert type="error" message={errorMsg} showIcon />}

      <Button type="primary" size="large" htmlType="submit" loading={submitting} block>
        로그인
      </Button>
    </form>
  );
}
