# 004 PoC 매니페스트 변환 리포트

생성: 2026-04-30
입력: lib/navigation/tree.ts + content/
출력: scripts/migrate-output/tree-manifest.draft.json

## 통계

| 항목 | 수 |
|---|---|
| 총 노드 | 135 |
| 카테고리 | 17 |
| 리프 (전체) | 118 |
| 리프 (MDX 매칭 성공) | 115 |
| 리프 (MDX 매칭 실패 = 무효 메뉴) | 3 |
| MDX 파일 (전체) | 121 |
| MDX 파일 (메뉴에 노출됨) | 115 |
| MDX 파일 (고아 = 메뉴에 없음) | 6 |
| ID 충돌 해소 사례 | (스크립트가 자동 prefix 추가하여 해소) |
| 발견된 이슈 | 3 |

## 무효 메뉴 링크 (3건)

- `/acquisition/rates/realestate/housing/housing` — MDX file not found
- `/acquisition/rates/realestate/farmland/farmland` — MDX file not found
- `/acquisition/rates/realestate/non-farmland/non-farmland` — MDX file not found

## 고아 MDX 파일 (6건)

- `content/acquisition/multi-house/multi-house-v1.0.mdx`
- `content/acquisition/rates/realestate/farmland-v1.0.mdx`
- `content/acquisition/rates/realestate/housing-v1.0.mdx`
- `content/acquisition/rates/realestate/non-farmland-v1.0.mdx`
- `content/acquisition/themes/trade-v1.0.mdx`
- `content/home/index.mdx`

## 기타 이슈 (3건)

- [dead-link] menu 'housing' (path=/acquisition/rates/realestate/housing/housing) → MDX not found
- [dead-link] menu 'farmland' (path=/acquisition/rates/realestate/farmland/farmland) → MDX not found
- [dead-link] menu 'non-farmland' (path=/acquisition/rates/realestate/non-farmland/non-farmland) → MDX not found

## 다음 단계 (사람 검토)

1. `tree-manifest.draft.json` 의 ID 명명 검토 — 자동 생성 ID가 의미 있는지
2. order_label 적정성 검토 — 자동 부여된 시퀀스가 실제 표시 순서와 일치하는지
3. 무효 메뉴 링크 처리 결정 — 매니페스트에서 제외할지, 빈 슬롯 생성할지
4. 고아 MDX 처리 결정 — 매니페스트에 추가(메뉴 노출)할지, archived/로 이동할지
5. 카테고리-with-content 충돌 해소 — 카테고리 + 인덱스 leaf 분리
6. 검토 완료 후 `config/tree-manifest.json` 으로 승격
