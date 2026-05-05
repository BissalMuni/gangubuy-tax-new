"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";
import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "시설과 시설물",
  sectionId: "38",
  category: "취득세",
  subcategory: "시설/시설물",
  audience: "internal",
  source: "acquisitiontax.pdf",
  pageRange: [67,67],
  version: "1.0",
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-02-08",
  status: "draft",
  lawReference: "지방세법 제6조, 제7조",
  tags: ["시설","시설물","구축물","엘리베이터","발코니","주차장"],
};

export default function FacilityVsEquipmentV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">시설과 시설물</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>시설(구축물)과 시설물(부수시설물)의 구분 및 과세 기준 안내</p>
      </blockquote>

      <SectionNav sections={[
      { id: "구분", label: "시설 vs 시설물" },
      { id: "시설", label: "시설(구축물)" },
      { id: "시설물", label: "시설물(부수시설물)" },
      { id: "발코니", label: "발코니" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="구분">
      <Outline level={1}>시설 vs 시설물 비교</Outline>
      </h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '100px'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>시설 (구축물)</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>시설물 (부수시설물)</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>범위</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>레저시설, 저장시설, 도크(dock)시설, 접안시설, 도관시설, 급수·배수시설, 에너지 공급시설 등</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>엘리베이터, 발전시설, 난방공급시설, 부착된 금고, 교환시설, 변전·배전시설</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>근거</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 제7조①항,②항 및 민법 제256조</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>법 제6조⑥호다목, 지방세법 제7조③항</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>재산세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}>과세됨</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>과세대상 아님</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>예시</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>옥외기계식주차장</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>옥내기계식주차장, 승강시설</td>
      </tr>
      </tbody>
      </table>

      <SectionNav sections={[
      { id: "구분", label: "시설 vs 시설물" },
      { id: "시설", label: "시설(구축물)" },
      { id: "시설물", label: "시설물(부수시설물)" },
      { id: "발코니", label: "발코니" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="시설">
      <Outline level={1}>시설 (구축물)</Outline>
      </h2>

      <Outline level={2}>특징</Outline>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>건물과 별도로</strong> 있으면 시설</li>
        <li>재산세 <strong>건축물에 포함</strong>되며 건축물의 취득과 동일하게 적용</li>
        <li><strong>재산세가 과세</strong>됨</li>
        <li>시설물보다 <strong>큰 개념</strong>, 부대시설에 넣는다</li>
        <li><strong>독립된 개체</strong>로 과세가능 건축물 (법 제6조④호)</li>
      </ul>

      <Outline level={2}>취득 구분</Outline>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득 유형</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>분류</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>신축</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>원시취득</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>수선</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>개수</td>
      </tr>
      </tbody>
      </table>

      <SectionNav sections={[
      { id: "구분", label: "시설 vs 시설물" },
      { id: "시설", label: "시설(구축물)" },
      { id: "시설물", label: "시설물(부수시설물)" },
      { id: "발코니", label: "발코니" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="시설물">
      <Outline level={1}>시설물 (부수시설물)</Outline>
      </h2>

      <Outline level={2}>특징</Outline>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>건축물에 딸려</strong> 건축물의 <strong>효용가치를 증대</strong>시킬 때 과세대상</li>
        <li><strong>시행령 제6조</strong>에 따른 것만 해당</li>
        <li>건축물에 <strong>이미 포함</strong>되어 있으면 시설물</li>
        <li>부대시설에 있어도 <strong>과표에 영향 없음</strong></li>
        <li><strong>재산세 과세대상 아님</strong></li>
        <li>건축물과 <strong>별개로 독립적 존재</strong>시 과세대상 <strong>제외</strong></li>
      </ul>

      <Outline level={2}>취득세율</Outline>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>설치 시점</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>세율</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>건축물 <strong>신축시</strong> 설치</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff', fontWeight: 'bold'}}>원시취득 포함 2.8%</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>건물 <strong>신축후</strong> 설치</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>개수 2%</td>
      </tr>
      </tbody>
      </table>

      <Callout type="info">
      <p><strong>5층 이상 상가건물</strong>은 엘리베이터 없으면 <strong>감산</strong>되니 반드시 넣어야 함</p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>층당 <strong>5%씩 가산</strong>됨</li>
        <li>건물 시가표준액이 올라감</li>
      </ul>
      </Callout>

      <SectionNav sections={[
      { id: "구분", label: "시설 vs 시설물" },
      { id: "시설", label: "시설(구축물)" },
      { id: "시설물", label: "시설물(부수시설물)" },
      { id: "발코니", label: "발코니" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="발코니">
      <Outline level={1}>발코니 증축통보시</Outline>
      </h2>

      <Outline level={2}>행자부지침 (2005.12.26.)</Outline>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>발코니는 독립적인 취득세 과세대상인 건축물의 건축으로 볼 수 <strong>없음</strong></p>
      </blockquote>

      <Callout type="info">
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>발코니(노대)</strong>는 <strong>과세면적이 아님</strong></li>
        <li>발코니확장으로 위법건축물 통보가 와도 <strong>무시</strong>한다</li>
      </ul>
      </Callout>

      <SectionNav sections={[
      { id: "구분", label: "시설 vs 시설물" },
      { id: "시설", label: "시설(구축물)" },
      { id: "시설물", label: "시설물(부수시설물)" },
      { id: "발코니", label: "발코니" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="주의사항">
      <Outline level={1}>주의사항</Outline>
      </h2>

      <Callout type="caution">
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>시설</strong>: 건물과 별도 → 재산세 과세, 독립 과세 가능</li>
        <li><strong>시설물</strong>: 건축물에 포함 → 재산세 과세대상 아님, 독립시 과세대상 제외</li>
        <li>5층 이상 상가 <strong>엘리베이터</strong> 설치 여부 확인 필수 (시가표준액 영향)</li>
        <li><strong>발코니 확장</strong> 위법건축물 통보 → 과세 불필요</li>
      </ul>
      </Callout>

      <SectionNav sections={[
      { id: "구분", label: "시설 vs 시설물" },
      { id: "시설", label: "시설(구축물)" },
      { id: "시설물", label: "시설물(부수시설물)" },
      { id: "발코니", label: "발코니" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
