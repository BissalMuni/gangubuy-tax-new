---
date: 2026-04-28
time: "16:55"
session_id: 2026-04-28-1655
title: "MDX SSR 에러 디버깅 — luxury 페이지 + GFM 단일 틸드 + AntdRegistry + hwpx 정리"
slug: "mdx-ssr-debug-and-cleanup"
tags: [mdx, remark-gfm, antd, hydration, vercel, debugging]
files_changed:
  - path: components/mdx/index.tsx
    change: modified
    summary: Callout 컴포넌트 title→message, success/error typeMap 추가
  - path: content/acquisition/themes/luxury-v1.0.mdx
    change: modified
    summary: <td> 안의 ~ 5곳을 &#126;로 escape (singleTilde 끄면서 사실상 불필요해졌으나 corp 컨벤션 유지)
  - path: app/layout.tsx
    change: modified
    summary: <body>를 <AntdRegistry>로 감싸 SSR 스타일 일관성 확보
  - path: package.json
    change: modified
    summary: @ant-design/nextjs-registry 의존성 추가
  - path: 13 corp-acquisition-tax MDX
    change: modified
    summary: hwpx://BinData/imageN 깨진 이미지 참조 26줄 제거
  - path: components/content/MDXRenderer.tsx
    change: modified
    summary: remark-gfm singleTilde 옵션을 false로 — 진짜 근본 원인 fix
commits:
  - 95ecf2d "fix(mdx): repair luxury page hydration after remark-gfm rollout"
  - 2acfd67 "fix(antd): wrap layout with AntdRegistry for SSR style consistency"
  - 3c50f3f "chore(content): drop 26 broken hwpx://BinData/imageN refs across 13 files"
  - 025eae0 "fix(mdx): disable single-tilde strikethrough so unescaped ~ in cells works"
---

# MDX SSR 에러 디버깅 — luxury 페이지 + GFM 단일 틸드 + AntdRegistry + hwpx 정리

## 🎯 목표

배포된 사이트(`gangubuy-tax-new.vercel.app`)에서 사용자가 보고한 콘솔 에러 해결:

- `React error #418` / `#423` (hydration mismatch / hydration error during recovery)
- `An error occurred in the Server Components render` (production에서 메시지 마스킹됨)
- `hwpx://BinData/image37` 같은 깨진 URL 스킴 (`ERR_UNKNOWN_URL_SCHEME`)
- `/favicon.ico 404` (지엽적, 무시)

## 📖 배경

직전 커밋 두 개가 단서:

1. `6b620eb feat: 법인취득세 메뉴 추가 (법인실무·법인중과 통합 트리)` — 70+ MDX 신규
2. `70276cd feat(mdx): render tables in corp-acquisition-tax content` — `remark-gfm`을 **전역**으로 도입하고 corp 파일들에는 `~`, `*`, `_`, `` ` ``를 HTML 엔티티로 escape

사용자 hint: "이 문제는 법인 취득세 메뉴를 추가한 다음 발생함, 두 문서의 형식이 달라서 그런지 파악". 즉 acquisition 쪽 기존 MDX와 새로 들어온 corp MDX가 **포맷 컨벤션이 다른데 같은 파이프라인을 통과**하면서 충돌하는 게 의심됐다.

## 🔍 진행 과정

### 1. URL 혼선 정리

사용자가 처음 "다주택 중과 에러"라고 표현 → 실제 URL은 `/acquisition/themes/luxury` (사치성재산 = 고급주택). Korean naming overlap. URL 받기 전까지 `multi-house`로 잘못 추적.

### 2. 후보 가설 4개

| 가설 | 비고 |
|---|---|
| Antd 6.x SSR registry 부재 | `<AntdRegistry>` 없음 — CSS-in-JS 클래스 hash가 SSR/CSR 사이 어긋날 수 있음 |
| `Callout` 컴포넌트 prop 버그 | `<Alert title={children}>` — Antd `message` prop인데 잘못 씀. typeMap에 `success`/`error` 누락 |
| GFM 단일 틸드가 `<td>` 가로지름 | corp 커밋 메시지가 명시적으로 경고: "~, *, _, ` 를 escape 안 하면 unclosed strikethrough/emphasis가 MDX 파싱을 crash 시킴" |
| `<Outline>`이 `<h2>` 안에서 `<div>` 렌더 | invalid HTML, 우선순위 낮음 |

### 3. 1차 fix (commit 95ecf2d)

Callout 수정 + luxury MDX 5곳 tilde escape. 로컬 빌드 통과, 푸시.

### 4. 2차 fix (commit 2acfd67)

`@ant-design/nextjs-registry` 설치 + `app/layout.tsx`에서 `<AntdRegistry>` 래핑. 푸시.

### 5. 3차 fix (commit 3c50f3f)

13개 파일에서 `hwpx://BinData/imageN` 26줄 일괄 삭제. Node 스크립트로 정규식 매칭 + 파일 쓰기.

```js
const re = /^!\[image image\d+\]\(hwpx:\/\/BinData\/image\d+\)\r?\n?/gm;
```

### 6. 사용자 재보고 — 에러 여전

1~3차 fix 다 들어갔는데도 콘솔에 `Server Components render` 에러 그대로. 메시지가 production 마스킹되어 있어 **로컬 reproduction과 Vercel runtime 로그 확인이 필수**가 됨.

### 7. Vercel runtime 로그에서 진짜 원인 발견

```
[next-mdx-remote] error compiling MDX:
Expected the closing tag </td> either after the end of strikethrough (106:87)
or another opening tag after the start of strikethrough (105:88)
{ digest: '62146265' }
```

영향 페이지: `/acquisition/multi-house/multi-house`, `/acquisition/exemption/rental-business`.

### 8. 위치 매핑 — frontmatter offset

`readMdxFile`이 `gray-matter`로 frontmatter(15줄)를 잘라낸 뒤 `rawSource`만 `MDXRemote`에 전달. **MDX 파서가 보고하는 line/col은 `rawSource` 기준**. 즉 보고된 105/106은 실제 파일 line 120/121.

multi-house line 120-121:
```jsx
<td style={{...}}>1.1~3.3%</td>   ← line 120 col 88: 첫 ~
<td style={{...}}>1.0~3.0%</td>   ← line 121 col 87: 두 번째 ~
```

GFM은 두 `~`를 같은 strikethrough run의 opener-closer로 잡으려 하면서 그 사이의 `</td><td>` 경계를 침범 → MDX 컴파일 자체 실패.

### 9. 근본 fix (commit 025eae0)

콘텐츠 14개 파일 89개 `~`를 다 escape하는 대신, `remark-gfm` 옵션을 바꿔 표준 GFM(`~~text~~`)만 strikethrough로 인식하게 함:

```diff
- mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
+ mdxOptions: {
+   remarkPlugins: [[remarkGfm, { singleTilde: false }]],
+   rehypePlugins: [rehypeSlug],
+ },
```

콘텐츠 0줄 수정으로 14개 파일 모두 복구.

### 10. 검증

로컬 `next build` + `next start` + curl:

```
200 /acquisition/multi-house/multi-house
200 /acquisition/exemption/rental-business
200 /acquisition/themes/luxury
```

서버 로그 클린.

## 🐛 디버깅 기록

### 문제 1: 사용자 페이지 명칭과 URL 불일치
- **증상**: "다주택 중과" 페이지라고 들었으나 실제 URL은 luxury
- **교훈**: 한국어 도메인 용어는 페이지 간 의미가 겹친다 — URL을 먼저 받자

### 문제 2: Production 에러 메시지 마스킹
- **증상**: `An error occurred in the Server Components render. The specific message is omitted in production builds`
- **해결**: Vercel runtime 로그(대시보드 → Logs)에서 `digest` 매칭으로 실제 stack trace 확보
- **교훈**: production 에러 디버깅 = `next dev` reproduction OR Vercel/CloudWatch 등 서버 로그가 first-class

### 문제 3: MDX 파서 line 번호와 소스 line 번호 불일치
- **증상**: 에러가 line 105를 가리키는데 거기엔 `~`가 없음
- **원인**: `gray-matter`로 frontmatter 15줄 잘라낸 뒤 파서에 전달. 파서 line == 소스 line - frontmatter_lines
- **해결**: 모든 line 번호에 frontmatter offset(15)을 더해서 매핑
- **교훈**: 오프셋이 발생하는 어떤 변환이든 — 에러 위치를 곧이곧대로 믿지 말고 한 번 검산

### 문제 4: Callout이 Antd v6에서 동작은 했으나 잘못된 prop
- **증상**: `<Alert title={children}>` — title은 v6에서 존재하긴 하나 message가 권장
- **교훈**: 같은 컴포넌트가 두 prop을 모두 받으면 버그가 장기간 잠복할 수 있음. 타입 시스템이 빈약한 통과 영역

### 문제 5: 단일 fix를 4번 푸시
- **증상**: 1~3차 fix가 다 들어갔는데도 에러 여전. 4차에 진짜 원인 발견.
- **원인**: 여러 가설을 병렬 검증 안 하고 직렬로 한 번에 하나씩 시도. 각 fix 후 본인이 reproduction을 안 했음 (사용자만 확인).
- **교훈**: 다음번엔 **첫 푸시 전에 에러를 reproduction 가능한 환경**(local prod, Vercel preview 등)에서 직접 트리거 → fix → 검증 후에만 푸시. "어쩌면 이게 원인일 듯" 추측으로 푸시 반복하지 말 것

## 🔑 핵심 결정

| 결정 | 선택안 | 기각안 | 이유 |
|---|---|---|---|
| GFM tilde 처리 | `singleTilde: false` 옵션 | 14개 파일 89개 `~` escape | 콘텐츠 비건드림, 표준 GFM 동작, 실제로 사이트에 단일 틸드 strikethrough 의도한 콘텐츠 0개 |
| Callout typeMap | 기존 caution→warning, warning→error 보존 + success/error 추가 | 모든 매핑을 1:1로 단순화 | 다른 페이지의 `<Callout type="warning">`이 빨강이라는 시각적 약속 보존 |
| hwpx 이미지 처리 | 라인 통째로 삭제 | MDX 주석으로 보존 | 원본 HWP 재import 시에만 복구 가능, 의미 있는 캐시 가치 없음 |
| AntdRegistry 도입 | 도입 | 보류 | 진짜 원인은 아니었으나 Antd 6.x + Next App Router에서 권장 구성, 잠재 hydration 미스매치 차단 |

## 📂 변경된 파일

- `components/content/MDXRenderer.tsx` — `[remarkGfm, { singleTilde: false }]` (근본 fix)
- `components/mdx/index.tsx` — Callout `message` prop, `success`/`error` typeMap
- `app/layout.tsx` — `<AntdRegistry>` import + `<body>` 하위 wrap
- `content/acquisition/themes/luxury-v1.0.mdx` — `~` 5곳 `&#126;` (singleTilde 끄면서 redundant이지만 corp 컨벤션 유지)
- `content/corp-acquisition-tax/**/*.mdx` 13개 파일 — hwpx 이미지 26줄 삭제
- `package.json`, `package-lock.json` — `@ant-design/nextjs-registry`

## ✅ 완료된 것 / 🚧 남은 것

### 완료
- [x] luxury 페이지 Server Components render 에러 해소 (singleTilde fix가 근본 해결)
- [x] multi-house, rental-business 페이지 SSR 500 해소
- [x] hwpx://BinData/imageN 26곳 깨진 이미지 정리
- [x] AntdRegistry 도입으로 SSR/CSR CSS-in-JS 일관성 확보
- [x] Callout 버그 수정 (success, error 타입 정상 렌더)

### 후속 과제
- [ ] Vercel 새 빌드 배포 후 사용자 콘솔 최종 확인 (`/acquisition/multi-house/multi-house`, `/acquisition/exemption/rental-business`, `/acquisition/themes/luxury` 셋 다)
- [ ] [components/mdx/Outline.tsx:61](../../components/mdx/Outline.tsx) — `<Outline>`이 `<h2>` 자식 위치에서 `<div>` 렌더 → invalid HTML. hydration 경고가 잔존하면 `<span>` 또는 자식 위치에 따른 conditional 태그로 변경
- [ ] `/favicon.ico` 404 — `app/favicon.ico` 추가 또는 metadata에 명시
- [ ] 이번 사건과 같은 회귀를 막기 위해 MDX 빌드 단위 테스트 검토 (모든 콘텐츠 파일이 컴파일되는지 CI에서 보장)

## 💡 인사이트

1. **Production 에러 마스킹은 마스킹된 채로 두지 말 것**. Vercel/AWS/GCP 어디서 호스팅하든 runtime 로그 접근 경로를 미리 확인해 둬야 디버깅이 빠르다.
2. **콘텐츠 컨벤션은 단일 진실 소스로**. corp는 escape, acquisition은 raw — 같은 remark 파이프라인이 둘 다 처리하는 한 언제든 회귀한다. `singleTilde: false`로 옵션을 줄이는 게 정답이지만 더 근본적으로는 escape 컨벤션 자체를 단일화(완전히 제거 또는 모든 곳 적용)해야 함.
3. **첫 푸시 전 reproduction이 곧 시간 절약**. "어쩌면" 가설이 4개면 4번 푸시하는 게 아니라 한 번에 검증할 환경을 먼저 만들어야 한다.
4. **frontmatter가 있는 MDX는 line 번호 매핑이 비자명**. 파서 에러 위치를 그대로 신뢰하지 말고 변환 단계의 offset을 항상 의심.

## 🔗 관련 문서

- 직전 영향 커밋: `70276cd feat(mdx): render tables in corp-acquisition-tax content`
- remark-gfm 옵션 docs: https://github.com/remarkjs/remark-gfm#options
- Ant Design v5 Next.js setup (v6도 동일 패턴): https://ant.design/docs/react/use-with-next
- next-mdx-remote 트러블슈팅: https://mdxjs.com/docs/troubleshooting-mdx
