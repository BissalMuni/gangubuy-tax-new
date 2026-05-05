"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";
import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "현황상 주택, 공부상 점포인 경우",
  sectionId: "36",
  category: "취득세",
  subcategory: "현황과세",
  audience: "internal",
  source: "acquisitiontax.pdf",
  pageRange: [64,64],
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-02-08",
  status: "draft",
  lawReference: "지방세법 제11조①항8호, 법시행령 제13조",
  tags: ["현황과세","공부","건축물대장","재산대장","주택세율"],
};

export default function ActualVsOfficialStatusV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">현황상 주택, 공부상 점포인 경우</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>재산대장(현황)은 주택이나 건축물대장(공부)은 점포인 경우의 취득세 과세 방법</p>
      </blockquote>

      <SectionNav sections={[
      { id: "관련법령", label: "관련 법령" },
      { id: "과세원칙", label: "과세 원칙" },
      { id: "적용예시", label: "적용 예시" },
      { id: "과세방법", label: "과세 방법" },
      ]} />

      <hr className="my-6" />

      <h2 id="관련법령">
      <Outline level={1}>관련 법령</Outline>
      </h2>

      <Outline level={2}>지방세법 제11조①항8호 (부동산 취득의 세율)</Outline>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>유상거래를 원인으로 주택을 취득하는 경우 <strong>지분으로 취득한 주택</strong>의 제10조에 따른 취득 당시의 가액은 <strong>전체 주택의 취득당시가액</strong>으로 한다.</p>
      </blockquote>

      <Outline level={2}>법시행령 제13조 (취득 당시의 현황에 따른 부과)</Outline>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>부동산, 차량, 기계장비 또는 항공기는 이 영에서 특별한 규정이 있는 경우를 제외하고는 해당 물건을 취득하였을 때의 <strong>사실상의 현황에 따라 부과</strong>한다. 다만, 취득하였을 때의 사실상 현황이 분명하지 아니한 경우에는 <strong>공부(公簿)상의 등재 현황</strong>에 따라 부과한다.</p>
      </blockquote>

      <SectionNav sections={[
      { id: "관련법령", label: "관련 법령" },
      { id: "과세원칙", label: "과세 원칙" },
      { id: "적용예시", label: "적용 예시" },
      { id: "과세방법", label: "과세 방법" },
      ]} />

      <hr className="my-6" />

      <h2 id="과세원칙">
      <Outline level={1}>과세 원칙</Outline>
      </h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>상황</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>과세 기준</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사실상 현황이 <strong>분명한</strong> 경우</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff', fontWeight: 'bold'}}>사실상 현황에 따라 부과</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사실상 현황이 <strong>불분명한</strong> 경우</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>공부(公簿)상 등재 현황에 따라 부과</td>
      </tr>
      </tbody>
      </table>

      <SectionNav sections={[
      { id: "관련법령", label: "관련 법령" },
      { id: "과세원칙", label: "과세 원칙" },
      { id: "적용예시", label: "적용 예시" },
      { id: "과세방법", label: "과세 방법" },
      ]} />

      <hr className="my-6" />

      <h2 id="적용예시">
      <Outline level={1}>적용 예시</Outline>
      </h2>

      <Outline level={2}>예시 1: 현황 주택, 공부 비주택</Outline>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>소재지</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>현황</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>공부</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>과세</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시흥동 995-15 16호</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}>주택 아님</td>
      <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px', verticalAlign: 'middle'}}>
      <strong>주택세율 미적용</strong><br/>
      취득세율 <span style={{color: '#1890ff', fontWeight: 'bold'}}>4%</span><br/>
      <p>85㎡ 이하시 농특세 비과세</p>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>독산동 981-17</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택 (일부 위법건축물)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}>주택 아님</td>
      </tr>
      </tbody>
      </table>

      <Outline level={2}>예시 2: 건축물대장 상가, 실제 주택</Outline>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>소재지</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>건축물대장</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>실제 사용</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>독산동 1043-37</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>의원</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>재산세대장</strong>: 주택(실제)으로 과세</li>
        <li><strong>취득세</strong>: <span style={{color: '#cf1322', fontWeight: 'bold'}}>상가(공부상)</span>로 과세해야 함</li>
      </ul>
      </Callout>

      <SectionNav sections={[
      { id: "관련법령", label: "관련 법령" },
      { id: "과세원칙", label: "과세 원칙" },
      { id: "적용예시", label: "적용 예시" },
      { id: "과세방법", label: "과세 방법" },
      ]} />

      <hr className="my-6" />

      <h2 id="과세방법">
      <Outline level={1}>과세 방법</Outline>
      </h2>

      <Outline level={2}>시스템 처리 순서</Outline>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '60px'}}>단계</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>작업 내용</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>1</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>상세물건조회</strong> 화면 열기</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>해당 부분 <strong>주택세율 미적용</strong> 체크 ✓</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택안분 부분에 <strong>19조2항</strong> (자동체크) 확인</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>4</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>코드 변경 후 <strong>자동계산</strong> 확인</td>
      </tr>
      </tbody>
      </table>

      <SectionNav sections={[
      { id: "관련법령", label: "관련 법령" },
      { id: "과세원칙", label: "과세 원칙" },
      { id: "적용예시", label: "적용 예시" },
      { id: "과세방법", label: "과세 방법" },
      ]} />

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
