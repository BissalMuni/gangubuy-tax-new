import { LoginForm } from '@/components/admin/LoginForm';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ from?: string }>;
}

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const redirectTo = params.from && params.from.startsWith('/admin') ? params.from : '/admin/changes';

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        background: '#fafafa',
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: 400,
          padding: 32,
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8, marginTop: 0 }}>
          관리자 / 승인자 로그인
        </h1>
        <p style={{ color: '#666', marginBottom: 24, fontSize: 13 }}>
          역할을 선택하고 비밀번호를 입력해 주세요.
        </p>
        <LoginForm redirectTo={redirectTo} />
      </section>
    </main>
  );
}
