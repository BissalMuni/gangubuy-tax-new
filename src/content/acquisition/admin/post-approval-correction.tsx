"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/**
 * meta:
 *   title: "취득세 신고 결재후 정정"
 *   sectionId: "30"
 *   category: "취득세"
 *   subcategory: "결재후정정"
 *   audience: "internal"
 *   source: "acquisitiontax.pdf"
 *   pageRange: [58, 58]
 *   effectiveDate: "2026-01-01"
 *   lastUpdated: "2026-02-08"
 *   status: "draft"
 *   lawReference: ""
 *   tags: ["결재후정정", "고지서수정", "정정처리", "대장반영"]
 */
export default function PostApprovalCorrectionV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">취득세 신고 결재후 정정</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>취득신고 및 취득세 납부 이후 고지서 내용을 수정해야 할 때의 처리 절차</p>
      </blockquote>

      <SectionNav sections={[
      { id: "적용대상", label: "적용 대상" },
      { id: "처리절차", label: "처리 절차" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 적용 대상" id="적용대상">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>취득신고</strong> 완료 후</li>
        <li><strong>취득세 납부</strong> 완료 후</li>
        <li><strong>고지서 내용 수정</strong>이 필요한 경우</li>
      </ul>

      </CalcBox>

      <SectionNav sections={[
      { id: "적용대상", label: "적용 대상" },
      { id: "처리절차", label: "처리 절차" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 처리 절차" id="처리절차">

      <SubSection title="● 메뉴 경로">

      <p>```</p>
      <p>취득신고분 화면 → 부메뉴 → [취득세부동산 결재후 정정]</p>
      <p>```</p>

      </SubSection>

      <SubSection title="● 단계별 처리">

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '60px'}}>단계</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>작업 내용</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', fontWeight: 'bold'}}>1</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>수정할 항목 선택</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>결재후 정정 화면에서</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', fontWeight: 'bold'}}>2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>수정 내용 입력</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      <tr style={{backgroundColor: '#e6f7ff'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', fontWeight: 'bold', color: '#1890ff'}}>❶</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>[결재상신(팀장전결)] 클릭</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>결재 완료 대기</td>
      </tr>
      <tr style={{backgroundColor: '#e6f7ff'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', fontWeight: 'bold', color: '#1890ff'}}>❷</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>[정정내역 대장반영] 클릭</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>결재 완료 후 다시 진입</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', fontWeight: 'bold'}}>3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>민원 안내</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>수정 처리 완료 후</td>
      </tr>
      </tbody>
      </table>

      </SubSection>

      </CalcBox>

      <SectionNav sections={[
      { id: "적용대상", label: "적용 대상" },
      { id: "처리절차", label: "처리 절차" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 주의사항" id="주의사항">

      <Insight>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>결재 완료 후</strong> 반드시 다시 해당 화면으로 진입하여 <strong>[정정내역 대장반영]</strong> 처리 필요</li>
        <li>대장반영을 하지 않으면 정정 내용이 실제 대장에 반영되지 않음</li>
        <li>처리 완료 후 민원인에게 안내할 것</li>
      </ul>
      </Insight>

      </CalcBox>

      <SectionNav sections={[
      { id: "적용대상", label: "적용 대상" },
      { id: "처리절차", label: "처리 절차" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
