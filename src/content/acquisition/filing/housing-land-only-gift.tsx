"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/**
 * meta:
 *   title: "주택의 토지만 증여할 때"
 *   sectionId: "33"
 *   category: "취득세"
 *   subcategory: "증여"
 *   audience: "internal"
 *   source: "acquisitiontax.pdf"
 *   pageRange: [61, 61]
 *   effectiveDate: "2026-01-01"
 *   lastUpdated: "2026-02-08"
 *   status: "draft"
 *   lawReference: ""
 *   tags: ["증여", "토지", "주택", "안분계산", "시가표준액"]
 */
export default function HousingLandOnlyGiftV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">주택의 토지만 증여할 때</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>주택의 토지만 증여하는 경우 안분 계산식을 활용한 과세표준 산정 방법</p>
      </blockquote>

      <SectionNav sections={[
      { id: "계산방법", label: "계산 방법" },
      { id: "입력방법", label: "입력 방법" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 계산 방법" id="계산방법">

      <p>주택의 토지만 증여하는 경우, 토지분에 해당하는 주택가격을 <strong>안분 계산</strong>하여 산정합니다.</p>

      <SubSection title="● 계산식">

      <p>```</p>
      <p>주택가격(토지분) = 원래주택가격 × (토지가격 ÷ 전체시가표준액)</p>
      <p>```</p>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>항목</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>설명</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>원래주택가격</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>토지+건물 포함한 전체 주택가격</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>토지가격</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>증여 대상 토지의 시가표준액</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>전체시가표준액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>토지 + 건물 시가표준액 합계</td>
      </tr>
      </tbody>
      </table>

      </SubSection>

      </CalcBox>

      <SectionNav sections={[
      { id: "계산방법", label: "계산 방법" },
      { id: "입력방법", label: "입력 방법" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 입력 방법" id="입력방법">

      <SubSection title="● 처리 순서">

      <p>1. 기존 <strong>주택가격을 지움</strong></p>
      <p>2. 토지가격/전체시가표준액 비율로 <strong>안분 계산</strong></p>
      <p>3. 원래주택가격을 곱한 금액을 산출</p>
      <p>4. 계산된 금액을 <strong>수기로 주택가격에 입력</strong></p>

      <Insight>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>시스템에서 자동 계산되지 않으므로 <strong>반드시 수기 입력</strong> 필요</li>
        <li>안분 비율 계산시 소수점 이하 처리에 주의</li>
      </ul>
      </Insight>

      </SubSection>

      </CalcBox>

      <SectionNav sections={[
      { id: "계산방법", label: "계산 방법" },
      { id: "입력방법", label: "입력 방법" },
      ]} />

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
