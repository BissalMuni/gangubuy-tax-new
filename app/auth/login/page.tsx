import { redirect } from 'next/navigation';
import { Card, Typography } from 'antd';
import { getAuthPhase } from '@/lib/auth/session';
import { MagicLinkForm } from '@/components/auth/MagicLinkForm';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ from?: string }>;
}

/**
 * Phase 2 — Magic Link 로그인 페이지.
 *
 * AUTH_PHASE!=2일 때는 Phase 1 로그인(/admin/login)으로 이관.
 */
export default async function AuthLoginPage({ searchParams }: PageProps) {
  if (getAuthPhase() !== 2) {
    const params = await searchParams;
    const from = params.from ?? '/admin/changes';
    redirect(`/admin/login?from=${encodeURIComponent(from)}`);
  }

  const params = await searchParams;
  const redirectTo = params.from && params.from.startsWith('/') ? params.from : '/admin/changes';

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <Card style={{ width: 400, maxWidth: '100%' }}>
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          로그인
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
          등록된 이메일로 1회용 로그인 링크를 보냅니다. 메일을 클릭하면 자동
          로그인됩니다.
        </Typography.Paragraph>
        <MagicLinkForm redirectTo={redirectTo} />
      </Card>
    </main>
  );
}
