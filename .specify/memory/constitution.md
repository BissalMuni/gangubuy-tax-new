<!--
Sync Impact Report
- Version change: 0.0.0 → 1.0.0
- Modified principles: N/A (initial creation)
- Added sections:
  - Core Principles (5 principles)
  - Content Constraints
  - Development Workflow
  - Governance
- Removed sections: None
- Templates requiring updates:
  - .specify/templates/plan-template.md ✅ No changes needed (Constitution Check section is generic)
  - .specify/templates/spec-template.md ✅ No changes needed (spec structure is compatible)
  - .specify/templates/tasks-template.md ✅ No changes needed (task structure is compatible)
- Follow-up TODOs: None
-->

# Gangubuy 지방세 문서 사이트 Constitution

## Core Principles

### I. 대상 분리 (Audience Separation)

모든 콘텐츠는 반드시 **대상(audience)**이 명시되어야 한다.

- 콘텐츠 대상은 `internal` (세무부서 직원용) 또는 `public` (대시민공개용) 중 하나로 분류되어야 한다
- 현재 단계에서는 `internal` 콘텐츠만 생성한다
- `public` 콘텐츠는 반드시 `internal` 콘텐츠의 부분집합이어야 한다
- 대시민공개 전환 시, 해당 콘텐츠에 대한 별도 검토 절차를 거쳐야 한다
- 대상 정보는 콘텐츠 메타데이터(frontmatter)에 명시해야 한다

**근거**: 세무행정 정보는 직원용 상세 정보와 민원인용 안내 정보의 깊이와 범위가 다르므로, 혼재 시 정보 노출 사고 또는 혼란이 발생할 수 있다.

### II. 개조식 공문서 스타일 (Government Document Style)

모든 세무 콘텐츠는 **개조식 공문서 형식**을 따라야 한다.

- 서술형 문장 대신 번호/글머리 기호를 사용한 구조화된 형식을 사용해야 한다
- 세율, 요건 등은 반드시 표(table) 형식으로 정리해야 한다
- 법령 근거를 반드시 명시해야 한다
- 전문적이고 간결한 행정 용어를 사용해야 한다

**근거**: 세무 문서는 정확성과 일관성이 핵심이며, 개조식은 정보 검색과 비교에 최적화된 형식이다.

### III. 정보 정확성 (Content Accuracy)

세무 정보는 반드시 법적 근거에 기반해야 한다.

- 세율, 과세표준, 감면 조건 등 수치 정보는 관련 법령을 출처로 명시해야 한다
- 법령 개정 시 해당 콘텐츠를 즉시 갱신해야 한다
- 불확실한 해석이 포함된 경우 반드시 그 사실을 표기해야 한다

**근거**: 잘못된 세무 정보는 실무 오류와 민원을 초래한다.

### IV. 단순성 (Simplicity)

구현은 현재 필요한 최소한의 복잡도만 허용한다.

- 가상의 미래 요구사항을 위한 추상화를 만들지 않는다 (YAGNI)
- 한 번만 쓰이는 로직을 위한 유틸리티/헬퍼를 만들지 않는다
- 외부 의존성 추가 시 반드시 명확한 이유가 있어야 한다

**근거**: 일인개발 프로젝트에서 과도한 엔지니어링은 유지보수 부담을 증가시킨다.

### V. 점진적 공개 (Incremental Release)

콘텐츠와 기능은 단계적으로 공개한다.

- 1단계: 세무부서 직원용(`internal`) 콘텐츠 완성
- 2단계: 직원용 콘텐츠 중 대시민공개 적합 항목 선별 및 검토
- 3단계: 선별된 콘텐츠를 `public`으로 전환하여 공개
- 각 단계는 이전 단계가 완료된 후 진행해야 한다

**근거**: 직원용 정보 체계를 먼저 확립한 후 공개 범위를 결정하는 것이 정보 품질과 보안 측면에서 안전하다.

## Content Constraints

- 콘텐츠 파일은 MDX 형식을 사용한다
- 모든 MDX 파일의 frontmatter에 `audience` 필드(`internal` | `public`)를 포함해야 한다
- 세금 종류별 분류 체계: 취득세, 재산세, 자동차세 (추후 확장 가능)
- 콘텐츠 변경 시 버전 이력을 관리해야 한다

## Development Workflow

- `main` 브랜치에서 직접 작업한다 (일인개발)
- 커밋 메시지는 변경 내용을 명확히 기술한다
- speckit 워크플로우를 통해 기능 명세 → 계획 → 태스크 순서로 진행한다
- 콘텐츠 추가와 기능 구현을 구분하여 커밋한다

## Governance

- 이 Constitution은 프로젝트의 모든 설계 및 구현 결정에 우선한다
- 원칙 변경 시 이 문서를 먼저 수정하고, 관련 산출물에 반영한다
- 대상 분리(Principle I) 위반은 어떤 경우에도 허용하지 않는다

**Version**: 1.0.0 | **Ratified**: 2026-01-31 | **Last Amended**: 2026-01-31
