"use client";

export const meta = {
  version: "1.0.0",
  title: "세금 정보 시스템",
  effectiveDate: "2026-01-29",
  lastUpdated: "2026-01-29",
  tags: ["홈","안내"],
  legalBasis: "N/A",
  deprecated: false,
  description: "한국의 각종 세금 정보를 체계적으로 관리하고 조회할 수 있는 시스템",
};

export default function Index() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">세금 정보 시스템</h1>

      <p>한국의 각종 세금 정보를 <strong>체계적으로 관리하고 조회</strong>할 수 있는 웹 애플리케이션입니다.</p>

      <h2 id="주요-기능" className="text-xl font-semibold mt-8 mb-4">주요 기능</h2>

      <h3 className="text-lg font-semibold mt-6 mb-3">취득세</h3>
      <p>부동산, 차량 등을 취득할 때 부과되는 지방세 정보를 제공합니다.</p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>유상취득 (매매, 교환, 경매)</li>
        <li>무상취득 (상속, 증여, 재산분할)</li>
        <li>원시취득 (신축, 개축)</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">재산세</h3>
      <p>매년 6월 1일 기준 재산 소유자에게 부과되는 세금 정보를 제공합니다.</p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>주택 재산세</li>
        <li>토지 재산세</li>
        <li>건축물 재산세</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">자동차세</h3>
      <p>자동차 소유에 대한 지방세 정보를 제공합니다 (연 2회 부과).</p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>승용차</li>
        <li>승합차</li>
        <li>화물차</li>
        <li>이륜차</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">검색</h3>
      <p>모든 세금 정보를 통합 검색할 수 있습니다.</p>

      <hr className="my-6" />

      <h2 id="사용-방법" className="text-xl font-semibold mt-8 mb-4">사용 방법</h2>

      <p>1. <strong>좌측 네비게이션</strong>에서 원하는 세금 종류 선택</p>
      <p>2. <strong>세부 항목</strong>을 클릭하여 상세 정보 확인</p>
      <p>3. <strong>검색 기능</strong>으로 특정 정보 빠르게 찾기</p>

      <hr className="my-6" />

      <h2 id="법적-고지" className="text-xl font-semibold mt-8 mb-4">법적 고지</h2>

      <p>이 시스템은 정보 제공 목적으로만 사용되며, 실제 세무 상담이나 법적 조언을 대체할 수 없습니다. 정확한 세무 정보는 전문가와 상담하시기 바랍니다.</p>

      <p><strong>출처</strong>: 국세청, 행정안전부, 지방세법</p>

    </div>
  );
}
