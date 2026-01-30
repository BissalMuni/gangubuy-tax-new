# 세금 정보 시스템 (Tax Information System)

한국의 각종 세금 정보를 체계적으로 관리하고 조회할 수 있는 웹 애플리케이션

## 프로젝트 개요

기존 프로젝트(`.deprecated/`)를 **Next.js 15 + Supabase + MDX** 스택으로 완전히 재구성한 프로젝트입니다.

### 주요 특징

- **MDX 기반 콘텐츠 관리**: 모든 세금 정보를 버전 관리 가능한 MDX 파일로 관리
- **버전 제어**: 세법 변경 이력을 완벽하게 추적 (immutable versioning)
- **트리 네비게이션**: 외부 설정 파일 기반의 확장 가능한 메뉴 구조
- **스크롤 자동 추적**: Intersection Observer로 현재 보는 섹션 자동 하이라이트
- **접근성 우선**: WCAG 2.1 AA 준수, 키보드 네비게이션 지원
- **법적 준수**: 모든 정보에 법적 근거 명시 및 고지사항 표시

## 기술 스택

### Core
- **Next.js 15.x** - App Router, React Server Components
- **React 19** - 최신 React
- **TypeScript 5.x** - 타입 안전성

### Styling & UI
- **Tailwind CSS 4.x** - 유틸리티 CSS
- **shadcn/ui** - 접근성 우수한 컴포넌트 라이브러리
- **Radix UI** - Headless UI 컴포넌트

### Content & Data
- **next-mdx-remote** - MDX 서버 렌더링
- **gray-matter** - Frontmatter 파싱
- **Supabase** - PostgreSQL + Auth + Storage

### Deployment
- **Vercel** - 자동 배포 및 최적화

## 프로젝트 구조

```
gangubuy-tax-new/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (헤더)
│   ├── page.tsx                  # 홈페이지
│   ├── search/                   # 검색 페이지
│   └── api/                      # API routes
│
├── components/                   # React 컴포넌트
│   ├── layout/
│   │   └── Header.tsx            # 헤더 (시스템명만 표시)
│   ├── navigation/
│   │   ├── TreeNav.tsx           # 좌측 트리 네비게이션
│   │   └── ScrollSpy.tsx         # 스크롤 자동 추적
│   ├── content/
│   │   └── MDXRenderer.tsx       # MDX 렌더링 컴포넌트
│   └── ui/                       # shadcn/ui 컴포넌트
│
├── config/
│   ├── navigation.ts             # 🎯 네비게이션 트리 구조 정의
│   └── site.ts                   # 사이트 전역 설정
│
├── content/                      # 🎯 MDX 콘텐츠 파일
│   ├── home/
│   │   └── index.mdx
│   ├── acquisition-tax/          # 취득세
│   │   ├── paid/                 # 유상취득
│   │   │   └── house/
│   │   │       └── one-house/
│   │   │           ├── v1.0.0.mdx
│   │   │           └── _meta.json
│   │   ├── free/                 # 무상취득
│   │   └── original/             # 원시취득
│   ├── property-tax/             # 재산세
│   └── automobile-tax/           # 자동차세
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Supabase 클라이언트
│   │   └── server.ts             # Supabase 서버
│   └── mdx.ts                    # MDX 유틸리티
│
├── types/
│   ├── navigation.types.ts       # 네비게이션 타입
│   ├── content.types.ts          # 콘텐츠 메타데이터 타입
│   └── database.types.ts         # Supabase 생성 타입
│
├── .specify/
│   └── memory/
│       └── constitution.md       # 🎯 프로젝트 헌법 (핵심 원칙)
│
└── .deprecated/                  # 기존 프로젝트 (참고용)
```

## 네비게이션 구조

### 메인 메뉴
```
├── 홈
├── 취득세
│   ├── 유상취득 (매매 등)
│   │   ├── 주택 매매
│   │   │   ├── 1주택 취득
│   │   │   ├── 2주택 취득
│   │   │   ├── 3주택 취득
│   │   │   └── 4주택 이상
│   │   └── 토지 매매
│   │       ├── 농지 취득
│   │       └── 기타 토지
│   ├── 무상취득 (상속/증여)
│   │   ├── 상속
│   │   ├── 증여
│   │   └── 재산분할
│   └── 원시취득
│       └── 건축물 신축
├── 재산세 (준비중)
├── 자동차세 (준비중)
└── 검색
```

세부 메뉴는 지속적으로 추가됩니다.

## MDX 콘텐츠 구조

### Frontmatter 스키마 (필수)

모든 MDX 파일은 다음 frontmatter를 포함해야 합니다:

```yaml
---
version: "1.0.0"                    # 시맨틱 버전
title: "1주택 취득세율 (유상취득)"   # 표시 제목
effectiveDate: "2024-01-01"         # 법적 시행일
lastUpdated: "2026-01-29"           # 최종 수정일
tags: ["취득세", "주택"]             # 태그
legalBasis: "지방세법 제11조"        # 법적 근거
deprecated: false                   # 폐기 여부
supersededBy: null                  # 폐기 시 대체 버전
description: "설명"                 # 요약
---
```

### 버전 관리 (_meta.json)

각 콘텐츠 디렉토리는 `_meta.json` 파일로 버전을 추적합니다:

```json
{
  "versions": [
    {
      "version": "1.1.0",
      "file": "v1.1.0.mdx",
      "effectiveDate": "2025-01-01",
      "description": "세율 변경 반영",
      "changes": ["세율 1.0% → 1.5%"],
      "isCurrent": true
    }
  ],
  "changelog": "/changelog/..."
}
```

### 버전 업데이트 원칙

**Constitution Principle II**: 기존 파일 절대 수정 금지

```bash
# ❌ 잘못된 방법
vi v1.0.0.mdx  # 기존 파일 수정 금지!

# ✅ 올바른 방법
cp v1.0.0.mdx v1.1.0.mdx  # 새 버전 파일 생성
vi v1.1.0.mdx              # 새 파일만 수정
vi _meta.json              # 버전 메타데이터 업데이트
```

## 빠른 시작

### 1. 프로젝트 설정

```bash
# Next.js 프로젝트 초기화
npx create-next-app@latest . --typescript --tailwind --app

# 의존성 설치
npm install @supabase/supabase-js next-mdx-remote gray-matter

# shadcn/ui 초기화
npx shadcn@latest init

# 필수 컴포넌트 설치
npx shadcn@latest add accordion card button sheet badge alert separator scroll-area
```

### 2. 환경 변수 설정

`.env.local` 파일 생성:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## 콘텐츠 추가 방법

### 1. 네비게이션 메뉴 추가

`config/navigation.ts` 편집:

```typescript
export const navigationTree = {
  "취득세": {
    children: {
      // 새 메뉴 추가
      "신규 메뉴": {
        id: "new-menu",
        label: "신규 메뉴",
        path: "/content/acquisition-tax/new-menu"
      }
    }
  }
}
```

### 2. MDX 콘텐츠 파일 생성

```bash
mkdir -p content/acquisition-tax/new-menu
```

`content/acquisition-tax/new-menu/v1.0.0.mdx` 작성:

```mdx
---
version: "1.0.0"
title: "신규 메뉴"
effectiveDate: "2026-01-29"
lastUpdated: "2026-01-29"
tags: ["취득세"]
legalBasis: "지방세법 제XX조"
deprecated: false
---

# 신규 메뉴

콘텐츠 내용...
```

### 3. 버전 메타데이터 생성

`content/acquisition-tax/new-menu/_meta.json` 작성:

```json
{
  "versions": [
    {
      "version": "1.0.0",
      "file": "v1.0.0.mdx",
      "effectiveDate": "2026-01-29",
      "description": "초기 버전",
      "changes": ["초기 콘텐츠 생성"],
      "isCurrent": true
    }
  ],
  "changelog": "/changelog/new-menu.md"
}
```

### 4. 자동 반영

파일 저장하면 즉시 반영됩니다 (Hot Module Replacement).

## 배포

### Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 첫 배포
vercel

# 프로덕션 배포
vercel --prod
```

환경 변수는 Vercel 대시보드에서 설정:
- Settings → Environment Variables
- Supabase URL, API Key 추가

### GitHub 연동

main 브랜치에 푸시하면 자동 배포됩니다.

## 개발 가이드

### Constitution 준수

모든 개발은 `.specify/memory/constitution.md`의 원칙을 따라야 합니다:

1. **MDX-First**: 세금 정보는 MDX로 관리
2. **Immutable Versioning**: 기존 파일 수정 금지, 새 버전 생성
3. **External Navigation**: 메뉴 구조는 `config/navigation.ts`에서 관리
4. **Legal Compliance**: 모든 정보에 법적 근거 및 고지사항 필수
5. **Accessibility**: WCAG 2.1 AA 준수
6. **Next.js Conventions**: App Router 규칙 준수
7. **Supabase Standards**: RLS 활성화, 타입 생성 사용

### 커밋 컨벤션

```bash
feat: Add v1.1.0 acquisition tax rates
fix: Correct legal basis citation
docs: Update constitution
chore: Update dependencies
```

## 라이선스

MIT License

## 법적 고지

이 시스템은 정보 제공 목적으로만 사용되며, 실제 세무 상담이나 법적 조언을 대체할 수 없습니다. 정확한 세무 정보는 전문가와 상담하시기 바랍니다.

**출처**: 국세청, 행정안전부, 지방세법 등 공개 자료
