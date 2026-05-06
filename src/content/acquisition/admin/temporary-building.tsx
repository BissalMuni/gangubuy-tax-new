"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/**
 * meta:
 *   title: "가설건축물"
 *   sectionId: "40"
 *   category: "취득세"
 *   subcategory: "가설건축물"
 *   audience: "internal"
 *   source: "acquisitiontax.pdf"
 *   pageRange: [69, 69]
 *   effectiveDate: "2026-01-01"
 *   lastUpdated: "2026-02-08"
 *   status: "draft"
 *   lawReference: ""
 *   tags: ["가설건축물", "임시건축물", "존치기간", "재산세", "비과세"]
 */
export default function TemporaryBuildingV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">가설건축물</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>가설건축물의 취득세/재산세 과세 기준 및 대장 입력 방법 안내</p>
      </blockquote>

      <SectionNav sections={[
      { id: "대장입력", label: "대장 입력" },
      { id: "존치기간", label: "존치기간별 과세" },
      { id: "세율", label: "세율" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 대장 입력" id="대장입력">

      <SubSection title="● 입력 항목">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>건물요약</strong>에 가설건축물로 입력</li>
        <li><strong>존치기간</strong>도 넣어줌</li>
        <li><strong>비고란</strong>에 문서번호와 통보일자, 가설건축물 번호 기재</li>
      </ul>

      </SubSection>

      </CalcBox>

      <SectionNav sections={[
      { id: "대장입력", label: "대장 입력" },
      { id: "존치기간", label: "존치기간별 과세" },
      { id: "세율", label: "세율" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 존치기간별 과세" id="존치기간">

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>존치기간</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득세</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>재산세</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>1년 초과 존치예정</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}>자진신고 안내</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>과세</td>
      </tr>
      <tr style={{backgroundColor: '#e6f7ff'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>1년 이하</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>세율특례 적용</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a', fontWeight: 'bold'}}>비과세 (100%)</td>
      </tr>
      </tbody>
      </table>

      <SubSection title="● 1년 이하 존치 시 재산세 대장 입력">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>재산세 대장에 심고 <strong>3개 코드 모두</strong> <code className="bg-gray-100 px-1 rounded text-sm">7지방세법비과세</code> 설정:</li>
        <li>재산코드</li>
        <li>도시코드</li>
        <li>공동코드</li>
      </ul>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>재산세 과세기준일 현재 <strong>1년 미만 임시건축물</strong>로 입력</li>
      </ul>

      </SubSection>

      </CalcBox>

      <SectionNav sections={[
      { id: "대장입력", label: "대장 입력" },
      { id: "존치기간", label: "존치기간별 과세" },
      { id: "세율", label: "세율" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 세율" id="세율">

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>세율</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>가설건축물 (허가)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff', fontWeight: 'bold'}}>2.2%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>세율특례(임시건축물의 취득) 적용<br/>사유코드: 가설건축물</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>무허가</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322', fontWeight: 'bold'}}>3.16%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      </tbody>
      </table>

      </CalcBox>

      <SectionNav sections={[
      { id: "대장입력", label: "대장 입력" },
      { id: "존치기간", label: "존치기간별 과세" },
      { id: "세율", label: "세율" },
      ]} />

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
