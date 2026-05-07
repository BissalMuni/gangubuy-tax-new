"use client";

import { CalcBox, SubSection } from "@/components/content/shared";

/**
 * meta:
 *   title: "세금 정보 시스템"
 *   effectiveDate: "2026-01-29"
 *   lastUpdated: "2026-01-29"
 *   tags: ["홈", "안내"]
 *   legalBasis: "N/A"
 *   deprecated: false
 *   description: "한국의 각종 세금 정보를 체계적으로 관리하고 조회할 수 있는 시스템"
 */
export default function Index() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">세금 정보 시스템</h1>

      <p>한국의 각종 세금 정보를 <strong>체계적으로 관리하고 조회</strong>할 수 있는 웹 애플리케이션입니다.</p>

      <CalcBox title="■ 주요 기능" id="주요-기능">
        <SubSection title="● 취득세">
          <p>부동산, 차량 등을 취득할 때 부과되는 지방세 정보를 제공합니다.</p>
          <ul className="list-disc pl-6 my-4 space-y-1">
            <li>유상취득 (매매, 교환, 경매)</li>
            <li>무상취득 (상속, 증여, 재산분할)</li>
            <li>원시취득 (신축, 개축)</li>
          </ul>
        </SubSection>

        <SubSection title="● 재산세">
          <p>매년 6월 1일 기준 재산 소유자에게 부과되는 세금 정보를 제공합니다.</p>
          <ul className="list-disc pl-6 my-4 space-y-1">
            <li>주택 재산세</li>
            <li>토지 재산세</li>
            <li>건축물 재산세</li>
          </ul>
        </SubSection>

        <SubSection title="● 자동차세">
          <p>자동차 소유에 대한 지방세 정보를 제공합니다 (연 2회 부과).</p>
          <ul className="list-disc pl-6 my-4 space-y-1">
            <li>승용차</li>
            <li>승합차</li>
            <li>화물차</li>
            <li>이륜차</li>
          </ul>
        </SubSection>

        <SubSection title="● 검색">
          <p>모든 세금 정보를 통합 검색할 수 있습니다.</p>
        </SubSection>
      </CalcBox>

      <hr className="my-6" />

      <CalcBox title="■ 사용 방법" id="사용-방법">
        <p>1. <strong>좌측 네비게이션</strong>에서 원하는 세금 종류 선택</p>
        <p>2. <strong>세부 항목</strong>을 클릭하여 상세 정보 확인</p>
        <p>3. <strong>검색 기능</strong>으로 특정 정보 빠르게 찾기</p>
      </CalcBox>

      <hr className="my-6" />

      <CalcBox title="■ 법적 고지" id="법적-고지">
        <p>이 시스템은 정보 제공 목적으로만 사용되며, 실제 세무 상담이나 법적 조언을 대체할 수 없습니다. 정확한 세무 정보는 전문가와 상담하시기 바랍니다.</p>
        <p><strong>출처</strong>: 국세청, 행정안전부, 지방세법</p>
      </CalcBox>

    </div>
  );
}
