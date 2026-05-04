'use client';

import { useMemo, useState } from 'react';
import { Alert, App, Button, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { createSupabaseBrowserClient } from '@/lib/supabase/auth-client';

/**
 * Phase 2 — Magic Link 로그인 폼.
 *
 * 이메일 입력 → Supabase signInWithOtp → 메일 발송. 사용자가 메일의 링크를
 * 클릭하면 /auth/callback?code=... 으로 돌아온다.
 *
 * `shouldCreateUser: false` — auth.users에 신규 entry 자동 생성을 막는다.
 * Phase 2는 관리자가 사전 초대(슬라이스 12)한 사용자만 로그인 가능.
 */

interface MagicLinkFormProps {
  redirectTo: string;
}

export function MagicLinkForm({ redirectTo }: MagicLinkFormProps) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const { message } = App.useApp();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const callbackUrl = useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    const url = new URL('/auth/callback', window.location.origin);
    url.searchParams.set('next', redirectTo);
    return url.toString();
  }, [redirectTo]);

  const handleSubmit = async (event?: React.FormEvent) => {
    event?.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg('이메일 형식이 올바르지 않습니다.');
      return;
    }
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: {
          emailRedirectTo: callbackUrl,
          shouldCreateUser: false,
        },
      });
      if (error) {
        // 사용자 미등록 / 레이트리밋 등 — 정확한 메시지 노출은 enumeration 위험 있어 일반화
        setErrorMsg('로그인 메일을 전송하지 못했습니다. 관리자에게 문의해 주세요.');
        return;
      }
      setSent(true);
      message.success('로그인 메일을 전송했습니다.');
    } catch {
      setErrorMsg('네트워크 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <Alert
        type="success"
        showIcon
        message="메일 발송 완료"
        description={`${email} 으로 로그인 링크를 보냈습니다. 메일 안의 버튼을 클릭하면 자동으로 로그인됩니다. (도착하지 않으면 스팸함을 확인해 주세요.)`}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input
        size="large"
        type="email"
        placeholder="email@example.com"
        prefix={<MailOutlined />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        autoFocus
      />

      {errorMsg && <Alert type="error" message={errorMsg} showIcon />}

      <Button type="primary" size="large" htmlType="submit" loading={submitting} block>
        로그인 링크 받기
      </Button>
    </form>
  );
}
