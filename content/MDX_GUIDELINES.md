# MDX 제작 및 수정 원칙

> 세무 콘텐츠 MDX 파일의 일관된 작성을 위한 가이드라인

---

## 1. Frontmatter 구조

### 1.1 필드 정의

```yaml
---
title: "문서 제목"
section_id: "01"                    # 섹션 번호 (2자리, 문서 목차 순서)
category: "취득세"                   # 대분류: 취득세 | 재산세 | 자동차세
subcategory: "중과규정"              # 소분류 (자유 텍스트)
audience: "internal"                # internal (직원용) | public (대시민용)
source: "원본파일명.pdf"             # 원본 자료 파일명
page_range: [시작페이지, 끝페이지]    # 원본 페이지 범위 (배열)
version: "1.0"                      # 버전 (major.minor)
effective_date: "2020-08-12"        # 법령 시행일 (YYYY-MM-DD)
last_updated: "2026-01-31"          # 최종 수정일 (자동 수정 파이프라인이 갱신)
status: "draft"                     # draft | review | published
law_reference: "지방세법 §13의2"     # 주요 근거법령 (§ 기호 사용)
tags: ["태그1", "태그2"]             # 검색용 태그 (배열)
---
```

### 1.2 실제 사용 예시 (multi-house-v1.0.mdx 기준)

```yaml
---
title: "다주택자 취득세 중과규정"
section_id: "02"
category: "취득세"
subcategory: "중과규정"
audience: "internal"
source: "acquisitiontax.pdf"
page_range: [2, 16]
version: "1.0"
effective_date: "2020-08-12"
last_updated: "2026-01-31"
status: "draft"
law_reference: "지방세법 §13의2, §13의3, 시행령 §28의2~§28의5"
tags: ["다주택자", "중과", "취득세율표", "주택수산정", "일시적2주택", "조정대상지역"]
---
```

### 1.3 자동 수정 파이프라인 처리 필드

| 필드 | 처리 방식 |
|------|-----------|
| `last_updated` | 파이프라인이 수정 시 자동으로 오늘 날짜로 갱신 |
| `status` | `draft` → `review` → `published` 수동 관리 |
| `version` | 버전 업그레이드는 새 파일 생성 (예: `v1.0` → `v1.1`) |

---

## 2. 문서 구조

### 2.1 기본 레이아웃

```mdx
# 문서 제목

> 문서 요약 설명 (1~2문장)

<SectionNav sections={[
  { id: "섹션ID1", label: "섹션명1" },
  { id: "섹션ID2", label: "섹션명2" },
]} />

---

<h2 id="섹션ID1">
  <Outline level={1}>섹션 제목</Outline>
</h2>

<Outline level={2}>소제목</Outline>

본문 내용...

<SectionNav sections={[...]} />

---

<h2 id="섹션ID2">
  ...
</h2>
```

### 2.2 실제 SectionNav 예시 (multi-house-v1.0.mdx 기준)

```mdx
# 다주택자 취득세 중과규정

> 2020.7.10 부동산대책에 따른 다주택자 취득세 중과 규정을 정리한다.

<SectionNav sections={[
  { id: "중과세율", label: "중과세율" },
  { id: "1세대", label: "1세대" },
  { id: "주택수산정", label: "주택수" },
  { id: "일시적2주택", label: "일시적 2주택" },
  { id: "오피스텔", label: "오피스텔" },
  { id: "분양권입주권", label: "분양권·입주권" },
  { id: "경과조치", label: "경과조치" },
  { id: "관련법령", label: "관련 법령" },
  { id: "FAQ", label: "FAQ" }
]} />
```

### 2.3 섹션 구분

- `---` (수평선)으로 주요 섹션 구분
- 각 섹션 끝에 `<SectionNav />` 반복 배치 (네비게이션 편의)
- SectionNav의 `id` 값은 반드시 아래 `<h2 id="...">` 와 **정확히 일치**해야 함

---

## 3. 제목 체계

| 레벨 | 용도 | 문법 |
|------|------|------|
| H1 | 문서 제목 | `# 제목` (파일당 1개) |
| H2 | 대섹션 | `<h2 id="섹션ID"><Outline level={1}>제목</Outline></h2>` |
| H3 | 중섹션 | `<Outline level={2}>제목</Outline>` |
| H4 | 소섹션 | `<Outline level={3}>제목</Outline>` |

### 3.1 실제 사용 예시

```mdx
<h2 id="중과세율">
  <Outline level={1}>중과세율</Outline>
</h2>

<Outline level={2}>중과대상 주택</Outline>

<Outline level={2}>조정대상지역</Outline>

<Outline level={2}>유상취득 - 조정대상지역</Outline>
```

---

## 4. 법령 링크 규칙

### 4.1 법령 URL 형식

```
https://law.go.kr/법령/{법령명}/{조문}
```

**예시:**
- 지방세법 제13조의2: `https://law.go.kr/법령/지방세법/제13조의2`
- 지방세법 시행령 제28조의4: `https://law.go.kr/법령/지방세법시행령/제28조의4`
- 민법 제779조: `https://law.go.kr/법령/민법/제779조`

### 4.2 링크 HTML 형식

```html
<a href="https://law.go.kr/법령/지방세법/제13조의2" target="_blank" rel="noopener noreferrer">법 §13의2</a>
```

### 4.3 실제 사용 예시 (multi-house-v1.0.mdx 기준)

```mdx
- **주택**: <a href="https://law.go.kr/법령/지방세법/제11조" target="_blank" rel="noopener noreferrer">법 §11①8호</a>에 따른 주택
- <a href="https://law.go.kr/법령/지방세법/제13조의2" target="_blank" rel="noopener noreferrer">법 §13의2①</a>
```

외부 공고 링크 (국토교통부 등):
```mdx
<a href="https://www.molit.go.kr/USR/BORD0201/..." target="_blank" rel="noopener noreferrer">국토교통부공고 제2025-1223호</a>
```

### 4.4 법령 약어 표기

| 법령 | 약어 | 예시 |
|------|------|------|
| 지방세법 | 법 | 법 §13의2 |
| 지방세법 시행령 | 시행령 | 시행령 §28의4 |
| 지방세법 시행규칙 | 시행규칙 | 시행규칙 §10 |
| 민법 | 민법 | 민법 §779 |
| 국세기본법 | 국기법 | 국기법 §13 |

### 4.5 자동 조회 원칙

- 본문에 법 조문 언급 시 → law.go.kr에서 현행 조문 확인
- 조문 내용이 변경된 경우 → 최신 내용으로 갱신
- 폐지/삭제된 조문 → 해당 사실 명시

---

## 5. 텍스트 크기 조정 연동

### 5.1 CSS 변수 사용 원칙

사용자가 텍스트 크기를 조정할 수 있도록 `FontSizeControl` 컴포넌트가 제공됩니다. MDX 콘텐츠의 모든 텍스트가 이 설정에 반응하려면 **CSS 변수 `--content-font-size`**를 사용해야 합니다.

```jsx
// ❌ 잘못된 예시 - 고정 픽셀값 사용
fontSize: '13px'
font-size: 13px

// ✅ 올바른 예시 - CSS 변수 사용 (fallback 포함)
fontSize: 'var(--content-font-size, 13px)'
font-size: var(--content-font-size, 13px)
```

> **주의**: 기존 파일 중 `fontSize: '13px'`로 하드코딩된 표가 있음.
> 자동 수정 파이프라인이 수정 시 CSS 변수 형식으로 교체한다.

### 5.2 적용 대상

| 요소 | 적용 방법 |
|------|-----------|
| 표(table) | `fontSize: 'var(--content-font-size, 13px)'` |
| 본문 텍스트 | CSS에서 자동 적용 (별도 지정 불필요) |
| 인라인 스타일 | 고정 px 대신 CSS 변수 사용 |

### 5.3 작동 원리

1. `FontSizeProvider`가 `--content-font-size` CSS 변수를 `<html>` 요소에 설정
2. MDX 콘텐츠에서 해당 변수를 참조하면 사용자 설정에 따라 크기 변경
3. fallback 값(예: `13px`)은 CSS 변수 미지원 환경 대비용

---

## 6. 표(Table) 스타일

### 6.1 기본 HTML 표 템플릿

```jsx
<table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
  <thead>
    <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>헤더1</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>헤더2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>내용1</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>내용2</td>
    </tr>
  </tbody>
</table>
```

### 6.2 색상 시스템

| 용도 | 색상 코드 | 적용 예시 |
|------|-----------|-----------|
| 헤더 배경 | `#f0f0f0` | 표 헤더 행 (`<thead>` `backgroundColor`) |
| 소계/강조 배경 | `#fafafa` | 그룹 헤더, 소계 행, rowSpan 셀 배경 |
| 하이라이트 배경 | `#e6f7ff` | 중요 데이터 행 (예: 서울 조정대상지역) |
| 테두리 | `#d9d9d9` | 모든 셀 테두리 |
| 빨강 (위험/중과) | `#cf1322` | 중과세율, 경고, 합계 컬럼 헤더 |
| 파랑 (정보) | `#1890ff` | 취득세 컬럼 헤더/값 |
| 초록 (보조) | `#52c41a` | 지방교육세 컬럼 헤더/값 |
| 주황 (부가) | `#fa8c16` | 농특세 컬럼 헤더/값 |

### 6.3 세율표 컬럼 헤더 색상 적용 패턴

세율표의 각 세목 컬럼 헤더는 색상으로 구분한다 (multi-house-v1.0.mdx 기준):

```jsx
<tr style={{backgroundColor: '#f0f0f0'}}>
  <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>납세자</th>
  <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>주택수</th>
  <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>가격</th>
  <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>면적</th>
  <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#cf1322'}}>합계</th>
  <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#1890ff'}}>취득세</th>
  <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#52c41a'}}>지방교육세</th>
  <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#fa8c16'}}>농특세</th>
</tr>
```

세율 값도 동일한 색상 적용:
```jsx
<td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#cf1322'}}>8.4%</td>
<td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>8.0%</td>
<td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.4%</td>
<td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.0%</td>
```

### 6.4 셀 병합 (rowSpan/colSpan)

```jsx
// 행 병합 - verticalAlign: 'top' 필수 지정
<td rowSpan={3} style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa', verticalAlign: 'top'}}>내용</td>

// 열 병합 (주석/출처 행)
<td colSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px', fontSize: '12px', color: '#666'}}>주석 내용</td>
```

> **규칙**: `rowSpan` 사용 시 반드시 `verticalAlign: 'top'`과 `backgroundColor: '#fafafa'` 추가

### 6.5 시행일 변경 이력 표 패턴

조정대상지역 등 시행일별 이력 표시 패턴 (multi-house-v1.0.mdx 기준):

```jsx
<table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '16px'}}>
  <thead>
    <tr>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa', width: '120px'}}>시행일</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa', width: '80px'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>지역</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowSpan={3} style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa', verticalAlign: 'top'}}>2025.10.16</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#e6f7ff'}}>서울</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', backgroundColor: '#e6f7ff'}}>전 자치구 (25개구 전체)</td>
    </tr>
    <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>경기</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>성남, 수원, 과천, 광명 등</td>
    </tr>
    <tr>
      <td colSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px', fontSize: '12px', color: '#666'}}>
        * <a href="링크URL" target="_blank" rel="noopener noreferrer">국토교통부공고 제XXXX-XXXX호</a>
      </td>
    </tr>
  </tbody>
</table>
```

### 6.6 모든 표는 HTML 사용

- Markdown 표 사용 **금지**
- 모든 표는 HTML `<table>` 태그로 작성
- 기존 Markdown 표는 HTML 표로 변환 필요

---

## 7. 컴포넌트 사용법

### 7.1 SectionNav (섹션 네비게이션)

```jsx
<SectionNav sections={[
  { id: "중과세율", label: "중과세율" },
  { id: "1세대", label: "1세대" },
  { id: "주택수산정", label: "주택수" },
]} />
```

- 문서 상단과 각 주요 섹션 끝에 배치
- `id` 값은 `<h2 id="...">` 와 반드시 일치
- `label`은 화면 표시용 (짧게 작성)

### 7.2 Outline (개요/목차)

```jsx
<Outline level={1}>대제목</Outline>   {/* <h2> 내부에 사용 */}
<Outline level={2}>중제목</Outline>   {/* 독립 사용 가능 */}
<Outline level={3}>소제목</Outline>
```

### 7.3 Callout (주의사항/안내)

```jsx
<Callout type="caution">
  - 주의할 내용
  - 예외 사항
</Callout>

<Callout type="info">
  참고 정보
</Callout>

<Callout type="warning">
  경고 메시지
</Callout>
```

### 7.4 FAQ (접이식)

```jsx
<details>
<summary>Q. 질문 내용?</summary>

- 답변 내용
- 추가 설명

</details>
```

---

## 8. 텍스트 서식

### 8.1 강조

| 용도 | 문법 | 결과 |
|------|------|------|
| 강조 | `**텍스트**` | **텍스트** |
| 기술용어 | `` `용어` `` | `용어` |
| 법조문 인용 | `> 인용문` | 블록인용 |

### 8.2 목록

```markdown
- 일반 목록 항목
  - 하위 항목

1. 순서 목록
2. 두 번째 항목
```

### 8.3 숫자/금액 표기

- 금액: 천 단위 쉼표 (`1,000,000원`)
- 세율: 소수점 1자리 (`1.1%`, `8.4%`)
- 면적: 단위 포함 (`85㎡`)
- 조문: 한글 혼용 (`제13조의2`, `§13의2`)
- 날짜: `2025.10.16` 형식 (본문) / `YYYY-MM-DD` 형식 (frontmatter)

---

## 9. 법령 조회 및 반영 절차

### 9.1 자동 조회 대상

1. 본문에 언급된 모든 법 조문
2. frontmatter의 `law_reference`에 명시된 조문
3. 표에 포함된 법령 참조

### 9.2 조회 URL 생성 규칙

```
기본: https://law.go.kr/법령/{법령명}/{조문}

예시:
- 지방세법 제13조 → https://law.go.kr/법령/지방세법/제13조
- 지방세법 제13조의2 → https://law.go.kr/법령/지방세법/제13조의2
- 시행령 제28조의4 → https://law.go.kr/법령/지방세법시행령/제28조의4
```

### 9.3 법령 변경 시 대응

| 상황 | 처리 방법 |
|------|-----------|
| 조문 신설 | 신설 내용 반영, 시행일 명시 |
| 조문 개정 | 개정 내용 반영, 경과조치 확인 |
| 조문 삭제 | 삭제 사실 명시, 대체 조문 연결 |
| 법령명 변경 | 신법령명으로 링크 갱신 |

---

## 10. 수정 시 체크리스트

### 10.1 필수 확인 사항

- [ ] frontmatter `last_updated` 갱신 (자동 수정 파이프라인이 처리)
- [ ] 법령 링크 정상 작동 확인
- [ ] SectionNav의 id와 실제 섹션 id 일치 확인
- [ ] 표 스타일 일관성 유지 (CSS 변수 사용, 색상 코드 준수)
- [ ] 숫자/금액/세율 표기 통일

### 10.2 법령 관련 확인

- [ ] 인용된 조문이 현행법과 일치하는지 확인
- [ ] 시행일/개정일 정보 최신화
- [ ] 경과조치 내용 반영 여부

### 10.3 품질 확인

- [ ] 오탈자 검수
- [ ] 링크 깨짐 확인
- [ ] 표 렌더링 정상 여부
- [ ] 모바일 반응형 표시 확인
- [ ] `fontSize: '13px'` 하드코딩 → `fontSize: 'var(--content-font-size, 13px)'` 교체 여부

---

## 11. 파일명 규칙

```
{주제}-v{버전}.mdx

예시:
- multi-house-v1.0.mdx    (다주택자 취득세 중과규정)
- farmland-v1.0.mdx       (농지 취득세)
- housing-v1.1.mdx        (주택 취득세 - 개정판)
```

### 11.1 디렉토리 구조

```
content/
└── acquisition/
    ├── multi-house/
    │   └── multi-house-v1.0.mdx     # 독립 주제는 전용 디렉토리
    ├── themes/
    │   └── luxury-v1.0.mdx
    ├── exemption/
    │   ├── first-time-buyer-v1.0.mdx
    │   └── rental-business-v1.0.mdx
    └── rates/
        └── realestate/
            ├── housing/
            │   └── housing-v1.0.mdx
            ├── farmland/
            │   └── farmland-v1.0.mdx
            └── non-farmland/
                └── non-farmland-v1.0.mdx
```

---

## 12. 자동 수정 파이프라인 연동

### 12.1 파이프라인 처리 흐름

```
[트리거]
  Supabase 댓글 (processed=false)
  또는 inbox/ 폴더 파일 추가
        ↓
[프롬프트 생성]
  - 대상 MDX 파일 읽기
  - 댓글/지시 내용 + 첨부파일 합산
  - 이 가이드라인 전문 포함
        ↓
[Docker Claude 실행]
  claude --dangerously-skip-permissions
        ↓
[검증]
  pnpm test → 전체 통과 시에만 진행
        ↓
[Git 커밋 + Push]
  docs: MDX 자동 수정 (댓글 #{id})
```

### 12.2 Claude가 수정 시 반드시 준수할 규칙

1. 이 가이드라인(MDX_GUIDELINES.md) 전문을 먼저 읽고 준수
2. frontmatter `last_updated`를 수정일로 갱신
3. `fontSize: '13px'` → `fontSize: 'var(--content-font-size, 13px)'` 교체
4. 새 표 작성 시 6.1~6.5 패턴 적용
5. 법령 링크는 4.2 HTML 형식 사용
6. Markdown 표 사용 금지 (HTML 표만)
7. 확실하지 않은 정보는 추가하지 않음

### 12.3 파이프라인이 자동 처리하는 항목

| 항목 | 처리 방식 |
|------|-----------|
| `last_updated` | 오늘 날짜로 자동 갱신 |
| 법령 링크 | `§13의2` 패턴 감지 → law.go.kr 링크 자동 삽입 |
| 표 스타일 | Markdown 표 → HTML 표 자동 변환 |
| CSS 변수 | `fontSize: '13px'` → CSS 변수 형식 교체 |
| 처리 완료 마킹 | 댓글 `processed = true`로 업데이트 |

---

> **문서 버전**: 1.1
> **최종 수정**: 2026-03-06
> **관리자**: 세무팀
