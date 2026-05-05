"use client";

import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "교환 취득시",
  sectionId: "19",
  category: "취득세",
  subcategory: "신고",
  audience: "internal",
  source: "acquisitiontax.pdf",
  pageRange: [44],
  version: "1.0",
  effectiveDate: "2013-10-11",
  lastUpdated: "2026-02-08",
  status: "draft",
  lawReference: "지방세법 시행령 §18의4",
  tags: ["교환","유상승계취득","시가인정액","보충금","채무승계"],
};

export default function ExchangeAcquisitionV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">13-1. 교환 취득시</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>부동산 교환 시 유상승계취득 기준(취득시기, 세율) 및 취득가격 산출방법 안내.</p>
      </blockquote>

      <hr className="my-6" />

      <h2 id="1.-관련-지침" className="text-xl font-semibold mt-8 mb-4">1. 관련 지침</h2>

      <Callout type="info">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>행정안전부 지방세운영과-2590</strong> ('13.10.11)</li>
        <li><strong>서울시 세무과-21973</strong> ('13.10.15)</li>
      </ul>

      </Callout>

      <hr className="my-6" />

      <h2 id="2.-산출-기준" className="text-xl font-semibold mt-8 mb-4">2. 산출 기준</h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>항목</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>내용</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>산출기준</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>검인받은 교환계약서</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>산출방법</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>이전받는 부동산등의 시가인정액 <strong>vs</strong> [이전하는 부동산등의 시가인정액 (+상대방에게 추가로 지급하는 금액/상대방으로부터 승계받는 채무액) (-상대방으로부터 추가로 지급받는 금액/상대방에게 승계하는 채무액)] 중 <strong>높은 금액</strong></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>근거</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시행령 §18조의4</td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <h2 id="3.-취득가격-산출-요소" className="text-xl font-semibold mt-8 mb-4">3. 취득가격 산출 요소</h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}} colSpan={2}>요소</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>개요</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '80px'}}>취득가격</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '100px'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>양도물건</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}} rowSpan={2}>시가인정액,<br/>시가표준액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}} rowSpan={2}>
      매매사례가액, 감정가액 등 시가로 인정되는 가액<br/>
      <p>「지방세법」§4 등에 의한 가액</p>
      </td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#1890ff', fontWeight: 'bold'}} rowSpan={2}>포함</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}} rowSpan={2}>둘 중<br/>높은 것</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>양수물건</td>
      </tr>
      <tr style={{backgroundColor: '#fff2f0'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}} rowSpan={2}>채무액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>승계액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>상대방에게 이전시키는 채무액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#cf1322', fontWeight: 'bold'}}>차감</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr style={{backgroundColor: '#f6ffed'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>이전액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>상대방으로부터 이전받는 채무액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>포함</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr style={{backgroundColor: '#f6ffed'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}} rowSpan={2}>보충금</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지급액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}} rowSpan={2}>교환물건의 가치 차이를 보전하기 위한 금전</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>포함</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr style={{backgroundColor: '#fff2f0'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>수령액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#cf1322', fontWeight: 'bold'}}>차감</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <h2 id="4.-취득가격-산출-예시" className="text-xl font-semibold mt-8 mb-4">4. 취득가격 산출 예시</h2>

      <Callout type="info">

      <p>"시가인정액" 없고, <strong>시가표준액만 있다</strong> 가정</p>

      </Callout>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}} colSpan={2}>요소</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득가격</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#e6f7ff'}} colSpan={2}>교환예시①</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fffbe6'}} colSpan={2}>교환예시②</th>
      </tr>
      <tr style={{backgroundColor: '#fafafa'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '6px'}} colSpan={2}></th>
      <th style={{border: '1px solid #d9d9d9', padding: '6px'}}></th>
      <th style={{border: '1px solid #d9d9d9', padding: '6px'}}>갑(13억)</th>
      <th style={{border: '1px solid #d9d9d9', padding: '6px'}}>을(21억)</th>
      <th style={{border: '1px solid #d9d9d9', padding: '6px'}}>갑(14억)</th>
      <th style={{border: '1px solid #d9d9d9', padding: '6px'}}>을(24억)</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}} rowSpan={2}>자기(양도)<br/>물건 가치</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가인정액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>포함<br/>(높은 것)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', fontWeight: 'bold'}} rowSpan={2}>18</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', fontWeight: 'bold'}} rowSpan={2}>16</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', fontWeight: 'bold'}} rowSpan={2}>18</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', fontWeight: 'bold'}} rowSpan={2}>20</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가표준액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}></td>
      </tr>
      <tr style={{backgroundColor: '#fff2f0'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}} rowSpan={2}>채무액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>승계액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>차감</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#cf1322'}}>-3(7-10)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#cf1322'}}>-4</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}></td>
      </tr>
      <tr style={{backgroundColor: '#f6ffed'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>이전액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>포함</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a'}}>3(10-7)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a'}}>4</td>
      </tr>
      <tr style={{backgroundColor: '#f6ffed'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}} rowSpan={2}>보충금</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지급액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>포함</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a'}}>8</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}></td>
      </tr>
      <tr style={{backgroundColor: '#fff2f0'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>수령액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>차감</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#cf1322'}}>-8</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}></td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <h2 id="5.-산출-요령-해설" className="text-xl font-semibold mt-8 mb-4">5. 산출 요령 해설</h2>

      <h3 className="text-lg font-semibold mt-6 mb-3">자기물건 평가액</h3>

      <p>통상적으로 성립된다고 인정되는 가액으로서 교환에 있어서는 물건 취득을 위한 일체의 비용에 해당되므로 취득가격에 포함하되, <strong>탈루방지를 위해 시가표준액과 비교하여 높은 것</strong>으로 함</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">승계채무액</h3>

      <p>승계하는 채무액은 취득가격에서 <strong>차감</strong>하되 승계받는 채무액이 더 많다면 그 차액은 비용에 해당하므로 취득가격에 <strong>포함</strong></p>

      <Callout type="info">

      <p>교환물건에 대한 채권설정액 등으로서 교환은 유상취득이므로 반영할 필요가 없다는 견해가 있으나 <strong>보충금에 영향을 미치므로 반영</strong></p>

      </Callout>

      <h3 className="text-lg font-semibold mt-6 mb-3">보충금</h3>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>지급하는 경우</strong>: 비용에 해당되므로 취득가격에 <strong>포함</strong></li>
        <li><strong>지급받는 경우</strong>: 비용이 절감되므로 취득가격에서 <strong>차감</strong></li>
      </ul>

      <hr className="my-6" />

      <h2 id="6.-관련-법령" className="text-xl font-semibold mt-8 mb-4">6. 관련 법령</h2>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 시행령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세법시행령/제18조의4" target="_blank" rel="noopener noreferrer">§18조의4</a></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>교환 취득가격 산정</td>
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
