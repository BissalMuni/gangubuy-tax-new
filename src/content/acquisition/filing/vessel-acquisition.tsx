"use client";

import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "선박 취득세 신고접수방법",
  sectionId: "28",
  category: "취득세",
  subcategory: "신고",
  audience: "internal",
  source: "acquisitiontax.pdf",
  pageRange: [55,56],
  effectiveDate: "2020-08-12",
  lastUpdated: "2026-02-08",
  status: "draft",
  lawReference: "지방세법",
  tags: ["선박","수상레저기구","취득세","재산세","납세지"],
};

export default function VesselAcquisitionV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">20. 선박 취득세 신고접수방법</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>선박(수상레저기구) 취득세 신고접수 방법 및 납세지 안내.</p>
      </blockquote>

      <hr className="my-6" />

      <h2 id="1.-신고-절차" className="text-xl font-semibold mt-8 mb-4">1. 신고 절차</h2>

      <Callout type="info">

      <p>선박은 <strong>문화체육과(생활체육팀)</strong>에서 수상레저기구 등록결과알림 공문이 접수됨</p>

      </Callout>

      <hr className="my-6" />

      <h2 id="2.-구비서류" className="text-xl font-semibold mt-8 mb-4">2. 구비서류</h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>서류</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>수상레저기구 매매계약서</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>동력수상레저기구 등록증</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>수상레저기구 안전검사증</td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <h2 id="3.-취득세와-재산세의-납세지-차이점" className="text-xl font-semibold mt-8 mb-4">3. 취득세와 재산세의 납세지 차이점</h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>세목</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>납세지</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#1890ff'}}>취득세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      수상오토바이, 고무보트, 모터보트는 <strong>등록지</strong>에서 과세<br/>
      <p>나머지는 <strong>선적항 소재지</strong></p>
      </td>
      </tr>
      <tr style={{backgroundColor: '#fffbe6'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#52c41a'}}>재산세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      선적항의 소재지, <strong>계류지(정계장)</strong>에서 과세<br/>
      <p>정계장이 일정하지 않은 경우는 <strong>주소지</strong>에서 과세</p>
      </td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <p>등록증상의 <strong>계류지를 확인</strong>해서 금천구가 아니면 재산세 대장은 <strong>미입력하거나 삭제</strong>한다.</p>

      </Callout>

      <hr className="my-6" />

      <h2 id="4.-신고-화면-처리" className="text-xl font-semibold mt-8 mb-4">4. 신고 화면 처리</h2>

      <Callout type="info">

      <p><strong>중고매매를 포함한 신규물건이 접수되면</strong></p>
      <p>부과관리 → 재산세 → 대장관리 → 선박대장관리 화면에 대장 등록에 한다.</p>

      <p><strong>부과관리 → 신고분관리 → 통합취득세기타물건신고접수</strong></p>
      <p>화면에서 취득세 과세처리한다.</p>

      </Callout>

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
