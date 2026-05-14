"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Role } from "./constants";
import { ROLE_LABELS, ROLE_PERMISSIONS } from "./constants";

export interface SessionInfo {
  role: Role;
  label: string;
  permissions: readonly string[];
  email?: string;
  displayName?: string;
}

/** 세션 캐시 무효화 — Supabase onAuthStateChange가 자동 처리하므로 호환용 */
export function invalidateSession() {
  // no-op: onAuthStateChange가 상태를 자동 업데이트
}

/**
 * Supabase Auth 기반 세션 훅.
 * onAuthStateChange로 로그인/로그아웃 자동 반영.
 */
export function useSession() {
  const [session, setSession] = useState<SessionInfo | null | undefined>(
    undefined
  );

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    // 초기 세션 로드
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const role = (user.app_metadata?.user_role ?? "reader") as Role;
        setSession({
          role,
          label: ROLE_LABELS[role],
          permissions: ROLE_PERMISSIONS[role],
          email: user.email,
        });
      } else {
        setSession(null);
      }
    });

    // 인증 상태 변경 구독
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, authSession) => {
      if (authSession?.user) {
        const role = (authSession.user.app_metadata?.user_role ??
          "reader") as Role;
        setSession({
          role,
          label: ROLE_LABELS[role],
          permissions: ROLE_PERMISSIONS[role],
          email: authSession.user.email,
        });
      } else {
        setSession(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    session: session ?? null,
    loading: session === undefined,
    can: (perm: string) => !!session && session.permissions.includes(perm),
  };
}
