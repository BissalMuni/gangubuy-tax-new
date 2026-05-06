# Content Migration Rules — mdx → math pattern

gangubuy 콘텐츠 파일을 자매 프로젝트 math의 패턴(CalcBox/SubSection)으로 정렬한다.
현재 파일들이 `CONVENTION_CONTENT.md`를 위반하고 있어 댓글 시스템(`AutoSectionComment`)이
`<h2>`/`<h3>`를 감지하지 못한다. 이 문서의 규칙대로 일괄 변환한다.

## 매핑 규칙

### Imports

**제거** (해당 파일에 있다면):
```tsx
import { Outline } from "@/components/mdx/Outline";
import { Callout } from "@/components/mdx/Callout";
```

**유지** (해당 파일에 있다면):
```tsx
import { SectionNav } from "@/components/mdx/SectionNav";
```

**추가** (실제로 사용하는 컴포넌트만 import):
```tsx
import { CalcBox, SubSection, Insight } from "@/components/content/shared";
```

### 1. Level 1 Outline → CalcBox

원본:
```tsx
<h2 id="중과세율">
  <Outline level={1}>중과세율</Outline>
</h2>
... 다음 h2/level-1 Outline 직전까지의 모든 콘텐츠 ...
```

변환:
```tsx
<CalcBox title="■ 중과세율" id="중과세율">
  ... 그 콘텐츠 ...
</CalcBox>
```

- `<h2 id="...">`의 id를 CalcBox `id` prop으로 옮긴다 (SectionNav 스크롤 대상)
- CalcBox는 다음 level-1 Outline 직전 또는 return 끝에서 닫힌다
- **숫자 prefix 금지, 도형 prefix 강제**: 제목 앞에 `■ ` (검은색 사각형 + 공백) 붙임. "1.", "2." 같은 숫자는 사용하지 않음

### 2. Level 2 Outline → SubSection

원본:
```tsx
<Outline level={2}>중과대상 주택</Outline>
... 다음 level-2 Outline 직전 또는 CalcBox 끝까지의 콘텐츠 ...
```

변환:
```tsx
<SubSection title="● 중과대상 주택">
  ... 그 콘텐츠 ...
</SubSection>
```

- **숫자 prefix 금지, 도형 prefix 강제**: 제목 앞에 `● ` (검은색 원 + 공백) 붙임. "(N)" 같은 숫자는 사용하지 않음
- SubSection은 반드시 CalcBox 내부에 위치 (위 level-1 변환 결과로 자연스럽게 들어감)

### 3. Callout → Insight

원본 (모든 type):
```tsx
<Callout type="caution|info|tip|warning|success|error">
  ...content...
</Callout>
```

변환:
```tsx
<Insight>
  ...content...
</Insight>
```

- 사용자가 type 구분 손실을 수용함 (모두 💡 Insight로 통일)

### 4. export const meta → JSDoc 주석

원본:
```tsx
export const meta = {
  title: "다주택자 취득세 중과규정",
  sectionId: "02",
  category: "취득세",
  lawReference: "지방세법 §13의2, §13의3",
  tags: ["다주택자","중과"],
  // ...기타 필드
};

export default function MultiHouseV11() {
```

변환:
```tsx
/**
 * meta:
 *   title: "다주택자 취득세 중과규정"
 *   sectionId: "02"
 *   category: "취득세"
 *   lawReference: "지방세법 §13의2, §13의3"
 *   tags: ["다주택자", "중과"]
 *   // ...기타 필드
 */
export default function MultiHouseV11() {
```

- `export const meta = {...}` 선언은 완전히 제거
- 모든 필드를 YAML 스타일로 보존
- JSDoc은 default export 함수 바로 위에 둔다

### 5. 그대로 유지

- `<SectionNav sections={[...]} />` — 그대로
- 인라인 스타일 `<table>`/`<thead>`/`<tbody>`/`<tr>`/`<th>`/`<td>` — 그대로 (트리의 내용)
- `<h1 className="text-2xl font-bold mb-4">...</h1>` — 그대로 (페이지 제목)
- `<hr>`, `<blockquote>`, `<ul>`, `<ol>`, `<li>`, `<a>`, `<strong>`, `<em>`, `<p>`, `<div>` — 그대로
- `"use client"` — 그대로

## 검증 체크리스트

변환 후 각 파일이 만족해야 할 조건:

- [ ] `Outline` import 없음, 사용처 없음
- [ ] `Callout` import 없음, 사용처 없음
- [ ] `export const meta = {...}` 없음 (JSDoc으로 이동)
- [ ] 모든 level-1 Outline이 CalcBox로, level-2가 SubSection으로 변환됨
- [ ] 표·링크·blockquote 등 본문 보존
- [ ] SectionNav가 있으면 그대로 유지, id 매칭 보존

## 변환 예시 (전·후)

### Before
```tsx
"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";
import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "예시",
  category: "취득세",
};

export default function Example() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">예시 페이지</h1>

      <SectionNav sections={[{ id: "개요", label: "개요" }]} />

      <h2 id="개요"><Outline level={1}>개요</Outline></h2>

      <Outline level={2}>대상</Outline>
      <p>본문 1</p>

      <Callout type="caution">
        주의할 점
      </Callout>

      <Outline level={2}>예외</Outline>
      <p>본문 2</p>
    </div>
  );
}
```

### After
```tsx
"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/**
 * meta:
 *   title: "예시"
 *   category: "취득세"
 */
export default function Example() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">예시 페이지</h1>

      <SectionNav sections={[{ id: "개요", label: "개요" }]} />

      <CalcBox title="■ 개요" id="개요">
        <SubSection title="● 대상">
          <p>본문 1</p>
        </SubSection>

        <Insight>
          주의할 점
        </Insight>

        <SubSection title="● 예외">
          <p>본문 2</p>
        </SubSection>
      </CalcBox>
    </div>
  );
}
```

## 작업 절차

1. 파일을 Read로 전체 읽기
2. 위 규칙에 따라 변환된 전체 파일 내용을 작성
3. Write 도구로 파일 덮어쓰기 (Edit 여러 번 대신)
4. 변환 후 위 체크리스트 확인
