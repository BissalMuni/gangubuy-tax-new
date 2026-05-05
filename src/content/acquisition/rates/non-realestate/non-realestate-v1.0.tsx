"use client";

import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "부동산 외 취득세율 (차량·선박·기계장비·항공기 등)",
  category: "취득세",
  audience: "internal",
  source: "acquisitiontax.pdf",
  sourceSections: [28],
  version: "1.0",
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-01-31",
  status: "draft",
  lawReference: "지방세법 §11",
  tags: ["부동산 외","선박","차량","기계장비"],
};

export default function NonRealestateV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">부동산 외 취득세율 (차량·선박·기계장비·항공기 등)</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>부동산 외 과세대상(차량, 선박, 기계장비, 항공기, 회원권 등)의 취득세율 안내</p>
      </blockquote>

      <hr className="my-6" />

      <h2 id="1.-적용-대상" className="text-xl font-semibold mt-8 mb-4">1. 적용 대상</h2>

      <p>1. <strong>부동산 외</strong> 취득세 과세대상을 취득하는 경우</p>
      <p>2. 과세대상 범위 (지방세법 §11①):</p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>차량</strong> (자동차, 이륜차 등)</li>
        <li><strong>기계장비</strong> (건설기계 등)</li>
        <li><strong>항공기</strong></li>
        <li><strong>선박</strong> (수상레저기구 포함)</li>
        <li><strong>광업권</strong></li>
        <li><strong>어업권</strong></li>
        <li><strong>골프회원권</strong>, <strong>콘도미니엄회원권</strong>, <strong>종합체육시설이용회원권</strong> 등</li>
      </ul>

      <h2 id="2.-주요-내용" className="text-xl font-semibold mt-8 mb-4">2. 주요 내용</h2>

      <h3 className="text-lg font-semibold mt-6 mb-3">가. 차량</h3>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>비영업용 승용자동차</strong>: <strong>7%</strong> (경차 제외)</li>
        <li><strong>그 외 차량</strong> (영업용, 화물차, 승합차 등): <strong>5%</strong></li>
        <li>경형자동차(배기량 1,000cc 이하): 취득세 면제 또는 감면 (지특법)</li>
        <li>과세표준: 사실상 취득가격</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">나. 선박</h3>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>선박 취득세율</strong>: 등록대상 선박 <strong>3%</strong>, 소형선박 <strong>2%</strong></li>
        <li><strong>수상레저기구</strong> 포함하여 과세</li>
        <li>취득세 납세지: <strong>등록지</strong> 또는 <strong>선적항 소재지</strong></li>
        <li>비영업용 대형선박은 중과세율 적용 가능</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">다. 기계장비</h3>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>건설기계 등록 대상</strong>: <strong>3%</strong></li>
        <li>과세표준: 사실상 취득가격</li>
        <li>등록 대상이 아닌 기계장비는 취득세 과세대상 아님</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">라. 항공기</h3>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>항공기 취득세율</strong>: <strong>2%</strong></li>
        <li>과세표준: 사실상 취득가격</li>
        <li>납세지: 정치장 소재지</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">마. 회원권</h3>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>골프회원권</strong>: 유상 <strong>2%</strong>, 무상 <strong>2%</strong></li>
        <li><strong>콘도미니엄회원권</strong>: 유상 <strong>2%</strong>, 무상 <strong>2%</strong></li>
        <li><strong>종합체육시설이용회원권</strong>: 유상 <strong>2%</strong>, 무상 <strong>2%</strong></li>
        <li>과세표준: 사실상 취득가격 (유상) / 시가표준액 (무상)</li>
      </ul>

      <h2 id="3.-세율·금액" className="text-xl font-semibold mt-8 mb-4">3. 세율·금액</h2>

      <p>| 구분 | 세율 | 과세표준 | 비고 |</p>
      <p>|------|------|----------|------|</p>
      <p>| 비영업용 승용차 | <strong>7%</strong> | 사실상 취득가격 | 경차 제외 |</p>
      <p>| 그 외 차량 | <strong>5%</strong> | 사실상 취득가격 | 영업용·화물 등 |</p>
      <p>| 선박(등록대상) | <strong>3%</strong> | 사실상 취득가격 | 수상레저기구 포함 |</p>
      <p>| 선박(소형) | <strong>2%</strong> | 사실상 취득가격 | |</p>
      <p>| 기계장비 | <strong>3%</strong> | 사실상 취득가격 | 건설기계 등록대상 |</p>
      <p>| 항공기 | <strong>2%</strong> | 사실상 취득가격 | |</p>
      <p>| 골프회원권 | <strong>2%</strong> | 사실상 취득가격 | 유상·무상 동일 |</p>
      <p>| 콘도회원권 | <strong>2%</strong> | 사실상 취득가격 | 유상·무상 동일 |</p>

      <h2 id="4.-관련-법령" className="text-xl font-semibold mt-8 mb-4">4. 관련 법령</h2>

      <p>| 구분 | 법령명 | 조항 | 비고 |</p>
      <p>|------|--------|------|------|</p>
      <p>| 근거법 | 지방세법 | §11 | 취득세 세율 총괄 |</p>
      <p>| 차량 | 지방세법 | §12①2 | 차량 세율 |</p>
      <p>| 선박 | 지방세법 | §12①3 | 선박 세율 |</p>
      <p>| 기계장비 | 지방세법 | §12①4 | 기계장비 세율 |</p>
      <p>| 항공기 | 지방세법 | §12①1 | 항공기 세율 |</p>
      <p>| 회원권 | 지방세법 | §12② | 회원권 세율 |</p>
      <p>| 감면 | 지방세특례제한법 | §67 | 경형자동차 감면 |</p>

      <h2 id="5.-주의사항" className="text-xl font-semibold mt-8 mb-4">5. 주의사항</h2>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>비영업용 승용자동차</strong> 7%는 부동산 외 과세대상 중 가장 높은 세율이므로, 영업용·비영업용 구분을 정확히 확인할 것</li>
        <li>선박의 납세지는 <strong>등록지 또는 선적항 소재지</strong>이며, 미등록 선박의 경우 소유자 주소지 관할</li>
        <li>수상레저기구(제트스키, 모터보트 등)도 <strong>선박에 포함</strong>되어 취득세 과세 대상임</li>
        <li>회원권의 경우 <strong>명의변경일</strong>이 취득시기이며, 회원권 양도·양수 계약일이 아님에 유의</li>
        <li>중고차 취득 시 실거래가가 시가표준액보다 낮으면 <strong>시가표준액</strong>을 과세표준으로 적용할 수 있음</li>
        <li>차량·기계장비 등의 <strong>농특세, 지방교육세</strong> 부과 여부는 세목별로 상이하므로 개별 확인 필요</li>
      </ul>

      </Callout>

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
