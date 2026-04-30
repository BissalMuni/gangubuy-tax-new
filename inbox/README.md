# Inbox - 자동화 파이프라인 입력 폴더

자동 유지보수 파이프라인의 입력 폴더입니다.

## 폴더 구조

```
inbox/
├── content/       # 새 MDX 파일 (기존 content/ 디렉토리 구조 그대로)
├── pdfs/          # PDF 파일 → Claude가 MDX로 자동 변환
├── prompts/       # 수정 요청 마크다운 파일 (.md)
└── processed/     # 처리 완료된 파일 (자동 이동)
```

## 사용법

### 1. 새 MDX 파일 추가 (`inbox/content/`)

`content/` 디렉토리 구조와 동일하게 파일을 배치합니다.

```
inbox/content/acquisition/multi-house/multi-house-v1.1.mdx
```

파이프라인 실행 시 자동으로 `content/` 디렉토리로 복사되고 git commit+push됩니다.

### 2. PDF → MDX 변환 (`inbox/pdfs/`)

PDF 파일을 `{카테고리}-{슬러그}.pdf` 형식으로 넣으면 Claude가 MDX로 변환합니다.

```
inbox/pdfs/acquisition-vehicle-base.pdf
inbox/pdfs/acquisition-vehicle-base.md   ← 선택 (추가 지시사항)
```

변환 결과: `content/acquisition/vehicle-base/vehicle-base-v1.0.mdx`

선택 메타 파일 (`.md`) 형식:

```md
버전: 2024년 개정판
특별 지시사항:
- 감면 조항은 별도 섹션으로 분리
```

> **주의**: 스캔 이미지 PDF는 텍스트 추출이 불가합니다. 텍스트 레이어가 있는 PDF만 가능합니다.

### 3. 수정 요청 프롬프트 추가 (`inbox/prompts/`)

`.md` 파일을 다음 형식으로 작성합니다:

```md
TARGET: acquisition/multi-house/multi-house
---
세율 업데이트 요청:
- 2024년 개정 세율 반영
- 조정대상지역 목록 최신화
```

파이프라인 실행 시 Claude Code가 해당 MDX 파일을 자동 수정합니다.

## 파이프라인 실행

```bash
# 전체 파이프라인 (Supabase + inbox)
pnpm orchestrate

# inbox만 처리
pnpm orchestrate --inbox-only

# Supabase 댓글만 처리
pnpm orchestrate --comments-only

# dry run (실제 수정 없이 미리보기)
pnpm orchestrate --dry-run
```
