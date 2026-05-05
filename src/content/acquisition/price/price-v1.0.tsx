"use client";

import { Outline } from "@/components/mdx/Outline";
import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "취득세 과세표준",
  category: "취득세",
  audience: "internal",
  source: "acquisitiontax.pdf",
  sourceSections: [6],
  version: "1.0",
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-01-31",
  status: "draft",
  lawReference: "지방세법 §10",
  tags: ["과세표준","분양","아파트","오피스텔","마이너스프리미엄"],
};

export default function PriceV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">취득세 과세표준</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>분양 아파트·오피스텔 등의 취득세 과세표준 산정 방법 및 구비서류 안내</p>
      </blockquote>

      <hr className="my-6" />

      <Outline level={1}>적용 대상</Outline>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>분양</strong> 아파트, 오피스텔 취득 시 과세표준 산정</li>
        <li>최초계약자 / 분양권승계자 / 임대후분양전환 / 주택임대사업자 구분</li>
      </ul>

      <hr className="my-6" />

      <Outline level={1}>주요 내용</Outline>

      <Outline level={2}>분양신고 구비서류</Outline>

      <p>| 계약형태 | 구비서류 |</p>
      <p>|----------|---------|</p>
      <p>| <strong>최초계약자</strong> | 분양계약서(사본), 옵션계약서(사본), 분양금 납입내역 |</p>
      <p>| <strong>분양권승계자</strong> | 위 서류 + 전매계약서, 실거래신고필증 (증여 시 검인) |</p>
      <p>| <strong>임대후 분양전환</strong> | 위 서류 + 확정분양신청서, 분양전환합의서 |</p>
      <p>| <strong>주택임대사업자</strong> | 위 서류 + 지방세 감면신청서, 주택임대사업자 등록증 |</p>

      <Callout type="info">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>주택임대사업자 감면대상: 아파트 및 오피스텔 <strong>전용면적 60㎡ 이하</strong>에 한함</li>
        <li>분양권승계자는 <strong>전매계약서, 실거래 신고필증</strong> 추가 제출</li>
      </ul>

      </Callout>

      <Outline level={2}>과세표준액 산정</Outline>

      <p>| 납세자 | 계약형태 | 과세표준액 |</p>
      <p>|--------|----------|----------|</p>
      <p>| <strong>개인</strong> | 최초계약자 | 분양대금(옵션 포함) − 선납할인금액 − 부가가치세 |</p>
      <p>| <strong>개인</strong> | 분양권승계자 | 분양대금(옵션 포함) + <strong>분양권프리미엄</strong> − 선납할인금액 − 부가가치세 |</p>
      <p>| <strong>법인</strong> | 최초계약자 | 분양대금(옵션 포함) − 선납할인금액 + <strong>연체료</strong> − 부가가치세 |</p>
      <p>| <strong>법인</strong> | 분양권승계자 | 분양대금(옵션 포함) + <strong>분양권프리미엄</strong> − 선납할인금액 + <strong>연체료</strong> − 부가가치세 |</p>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>할인료에 포함된 <strong>부가세</strong>는 계산해서 <strong>더해주고</strong> 연체료는 <strong>빼는</strong> 것에 주의 (개인)</li>
        <li>법인은 연체료를 <strong>더함</strong></li>
      </ul>

      </Callout>

      <Outline level={2}>취득일 기준</Outline>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>사용승인일 이전</strong> 취득은 <strong>사용승인일</strong>을 취득일로 봄</li>
      </ul>

      <Outline level={2}>마이너스프리미엄</Outline>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>매매(전매)계약서 특약 또는 완납대금증명서 반영으로 확인</li>
        <li>사실상 취득가액 인정</li>
      </ul>

      <hr className="my-6" />

      <Outline level={1}>과세표준 계산 요약</Outline>

      <p>| 항목 | 개인 | 법인 |</p>
      <p>|------|------|------|</p>
      <p>| 분양대금 (옵션 포함) | ✅ 포함 | ✅ 포함 |</p>
      <p>| 분양권프리미엄 | 승계자만 포함 | 승계자만 포함 |</p>
      <p>| 선납할인금액 | ✅ 차감 | ✅ 차감 |</p>
      <p>| 부가가치세 | ✅ 차감 | ✅ 차감 |</p>
      <p>| 연체료 | ❌ 미포함 | ✅ <strong>포함</strong> |</p>

      <hr className="my-6" />

      <Outline level={1}>관련 법령</Outline>

      <p>| 구분 | 법령명 | 조항 | 비고 |</p>
      <p>|------|--------|------|------|</p>
      <p>| 근거법 | 지방세법 | §10 | 과세표준 |</p>

      <hr className="my-6" />

      <Outline level={1}>주의사항</Outline>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>개인과 법인의 과세표준 산정이 다름 (<strong>연체료</strong> 포함 여부)</li>
        <li>분양권승계자는 <strong>프리미엄</strong>이 과세표준에 포함됨</li>
        <li>마이너스프리미엄은 사실 확인 시 인정 가능</li>
        <li>사용승인일 이전 취득 시 <strong>사용승인일</strong>이 취득일</li>
      </ul>

      </Callout>

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
