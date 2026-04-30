/**
 * /admin/* 공통 레이아웃.
 *
 * Phase 1에서는 별도 사이드바/네비를 두지 않고 페이지별로 자체 헤더를 갖는다.
 * 미들웨어가 세션을 검증하므로 본 레이아웃은 인증 검사를 다시 하지 않는다.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
