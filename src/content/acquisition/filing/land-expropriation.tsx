"use client";

import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "토지수용 대체취득",
  sectionId: "18",
  category: "취득세",
  subcategory: "감면",
  audience: "internal",
  source: "acquisitiontax.pdf",
  pageRange: [43],
  effectiveDate: "2020-08-12",
  lastUpdated: "2026-02-08",
  status: "draft",
  lawReference: "지특법 §73",
  tags: ["토지수용","대체취득","감면","부재지주","보상금"],
};

export default function LandExpropriationV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">13. 토지수용 대체취득</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>토지수용으로 보상금을 받은 자가 대체 부동산을 취득할 때 취득세 감면 요건 및 구비서류 안내.</p>
      </blockquote>

      <hr className="my-6" />

      <h2 id="1.-감면-내용" className="text-xl font-semibold mt-8 mb-4">1. 감면 내용</h2>

      <Callout type="info">

      <p><strong>지특법 §73</strong>: 취득세 <strong>면제 100%</strong>, 농특세 면제</p>

      </Callout>

      <hr className="my-6" />

      <h2 id="2.-구비서류" className="text-xl font-semibold mt-8 mb-4">2. 구비서류</h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '50px'}}>순번</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>서류</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>1</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>매매계약서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>토지수용확인서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontSize: '12px'}}>
      토지총면적 및 보상금액 표기<br/>
      <strong>원본 제출</strong> (지특법시행규칙 별지5호서식)<br/>
      <span style={{color: '#1890ff'}}>※ 시장·군수·구청장이 토지를 수용한 경우에는 수용확인서 필요(×), 직권으로 함</span>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>주민등록초본</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>옛날부터 현재까지 <strong>주소이력사항</strong> 확인</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>4</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비과세 신청서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>5</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>사업자등록증</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사업자인 경우 (<strong>비주거용임대업은 제외</strong>)</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>6</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득세신고서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <h2 id="3.-감면-제외-사유" className="text-xl font-semibold mt-8 mb-4">3. 감면 제외 사유</h2>

      <Callout type="caution">

      <p>다음의 경우 <strong>대체취득 감면대상에서 제외</strong>됩니다:</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>사치성재산을 대체 취득하는 경우</li>
        <li>마지막 보상금 수령일로부터 <strong>1년 이후</strong> 취득할 때</li>
        <li><strong>종전가액을 초과</strong>하여 취득하는 부분은 과세됨 (개정)</li>
        <li>보상금수령자와 대체취득자가 <strong>다른 경우</strong></li>
        <li><strong>부재지주</strong>가 취득할 때</li>
        <li>개인: 계약일 현재 1년 이상 주민등록과 1년 이상 계속 거주해야 감면가능</li>
        <li>사업자: 사업인정고시일(계약일) 현재 1년 이상 사업자등록과 함께 1년 이상 계속사업</li>
        <li><strong>재건축</strong>은 감면제외, 재개발은 도정법·공토법에 근거하여 감면가능</li>
      </ul>

      </Callout>

      <Callout type="info">

      <p><strong>재건축 vs 재개발 구분</strong></p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>재건축: 아파트 철거 → 아파트 신축</li>
        <li>재개발: 집, 상가 철거 → 아파트</li>
      </ul>

      <p>예시: 힐스테이트는 재건축, 롯데캐슬은 재건축도 재개발도 아님</p>

      <p><strong>※ 대체취득감면 판단시에는 사업주체를 먼저 확인해볼 것</strong></p>

      </Callout>

      <hr className="my-6" />

      <h2 id="4.-부재지주-관련-대체취득감면-가능한-부동산" className="text-xl font-semibold mt-8 mb-4">4. 부재지주 관련 대체취득감면 가능한 부동산</h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}} rowSpan={2}>대체취득하는<br/>부동산 종류</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}} rowSpan={2}>같은 시·도<br/>(서울특별시)</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}} rowSpan={2}>연접한<br/>시·군·구</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}} colSpan={2}>연접한 시도<br/>(경기도·인천광역시)</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}} colSpan={2}>기타 지역<br/>(강원, 충청 등)</th>
      </tr>
      <tr style={{backgroundColor: '#fafafa'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '6px'}}>지정지역</th>
      <th style={{border: '1px solid #d9d9d9', padding: '6px'}}>지정 외</th>
      <th style={{border: '1px solid #d9d9d9', padding: '6px'}}>지정지역</th>
      <th style={{border: '1px solid #d9d9d9', padding: '6px'}}>지정 외</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>농지 외</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>감면</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>감면</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#cf1322'}}>과세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>감면</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#cf1322'}}>과세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#cf1322'}}>과세</td>
      </tr>
      <tr style={{backgroundColor: '#f6ffed'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>농지 취득시</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>감면</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>감면</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#cf1322'}}>과세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>감면</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#cf1322'}}>과세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>감면</td>
      </tr>
      </tbody>
      </table>

      <Callout type="info">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>농지의 경우</strong>: 수용된 농지소재지로부터 <strong>20킬로미터 이내</strong>의 지역에 거주 (사업자는 직접사업)해야 함</li>
        <li><strong>임대사업자</strong>: 제3자에게 임대하고 있던 부동산이 수용된 경우 사업자로 보아 <strong>부재지주가 아닌 것으로</strong> 감면 가능</li>
      </ul>

      </Callout>

      <hr className="my-6" />

      <h2 id="5.-관련-법령" className="text-xl font-semibold mt-8 mb-4">5. 관련 법령</h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>법령명</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>조항</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>근거법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세특례제한법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세특례제한법/제73조" target="_blank" rel="noopener noreferrer">§73</a></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>토지수용 대체취득 감면</td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
