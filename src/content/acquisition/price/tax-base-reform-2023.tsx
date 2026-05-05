"use client";

import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "'23년부터 달라지는 취득세 과표체계 주요 개정내용",
  sectionId: "11",
  category: "취득세",
  subcategory: "과세표준",
  audience: "internal",
  source: "acquisitiontax.pdf",
  pageRange: [30,33],
  effectiveDate: "2023-01-01",
  lastUpdated: "2026-02-08",
  status: "draft",
  lawReference: "지방세법 §10~§10의6",
  tags: ["과세표준","시가인정액","평가기간","유사부동산","무상취득","가산세"],
};

export default function TaxBaseReform2023V10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">6-1. '23년부터 달라지는 취득세 과표체계 주요 개정내용</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>2023년 개정된 취득세 과세표준 체계, 시가인정액 평가기간 및 적용순서, 무상취득 과세표준 적용요령 안내.</p>
      </blockquote>

      <hr className="my-6" />

      <h2 id="1.-주요-개정-내용-비교" className="text-xl font-semibold mt-8 mb-4">1. 주요 개정 내용 비교</h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>조</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>현행</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>개정</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>§10</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>과세표준 원칙: 취득당시의 가액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>과세표준 원칙: 취득당시의 가액</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>§10-2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득당시의 가액 (납세자가 신고한 가액, 개인이 시가표준액보다 적게 신고한 경우 시가표준액)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      <strong>무상취득(상속·증여·기부)</strong><br/>
      1) 원칙: 시가인정액<br/>
      2) 예외: 시가표준액<br/>
      <p>3) 부담부증여: 채무 외(무상취득) + 채무액(유상취득)</p>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>§10-3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      <strong>유상취득(부동산등 승계)</strong><br/>
      <p>개인, 법인 모두 사실상의 취득가격</p>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>§10-4</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>원시취득 (원칙) 신고한 가액, (예외) 시가표준액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      <strong>원시취득(신축·증축·재축 등)</strong><br/>
      1) 원칙: 사실상의 취득가격<br/>
      <p>2) 예외: 시가표준액</p>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>§10-5</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>(신설)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      <strong>과세표준 특례</strong><br/>
      ① 차량·건설기계 취득<br/>
      <p>② 법인 합병·분할, 도시개발사업·정비사업 등</p>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>§10-6</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>간주취득 (개수·지목·구조변경, 과점주주)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      <strong>간주취득</strong><br/>
      ① 개수·지목·구조변경: 원칙 사실상 취득가격, 예외 시가표준액<br/>
      <p>② 과점주주: (종전과 동일)</p>
      </td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <h2 id="2.-시가인정액-평가기간-및-적용순서" className="text-xl font-semibold mt-8 mb-4">2. 시가인정액 평가기간 및 적용순서</h2>

      <h3 className="text-lg font-semibold mt-6 mb-3">평가기간 내 판단기준일</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>가액유형</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>판단기준일</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>매매사례가액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>매매계약일</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>감정가액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>가격산정기준일 (감정가액평가서 작성일도 평가기간 이내에 있어야 함)</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>경공매가액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>경매가액 또는 공매가액이 결정된 날</td>
      </tr>
      </tbody>
      </table>

      <h3 className="text-lg font-semibold mt-6 mb-3">시가인정액 적용순서</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>순위</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>대상</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>평가기간</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#1890ff'}}>1순위</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득재산 (당해물건)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득일 전 <strong>6개월</strong>부터 취득일 후 <strong>3개월</strong> 내</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#1890ff'}}>2순위</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>유사부동산</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득일 전 <strong>1년</strong>부터 <strong>신고납부기한 만료일</strong>까지 (2023.12.29 개정)</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#8c8c8c'}}>확장</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>당해물건/유사물건</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득일 전 <strong>2년</strong> 이내 ~ 신고기한 경과 후 <strong>6개월</strong>까지<br/>(지방세심의위원회 심의 필요)</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#8c8c8c'}}>3순위</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가표준액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>①,② 가액을 산정하기 어려운 경우</td>
      </tr>
      </tbody>
      </table>

      <Callout type="info">

      <p><strong>확장된 평가기간 내 시가인정액</strong> (시가표준액보다 높은 경우)으로 납세자가 신고를 원하는 경우 → <strong>지방세심의위원회 심의없이</strong> 신고처리</p>

      </Callout>

      <hr className="my-6" />

      <h2 id="3.-유사부동산의-범위" className="text-xl font-semibold mt-8 mb-4">3. 유사부동산의 범위</h2>

      <h3 className="text-lg font-semibold mt-6 mb-3">공동주택가격이 있는 공동주택</h3>

      <p>평가대상 주택과 <strong>동일한 공동주택단지</strong>로서:</p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>주거전용면적의 차이 <strong>5% 이내</strong></li>
        <li>공동주택가격의 차이 <strong>5% 이내</strong></li>
      </ul>

      <p>→ 해당 주택이 둘 이상인 경우: 평가대상 주택과 <strong>공동주택가격 차이가 가장 작은</strong> 주택</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">공동주택가격이 없는 경우</h3>

      <p>평가대상 부동산과 <strong>면적, 위치, 용도, 시가표준액</strong>이 동일하거나 유사한 다른 재산</p>

      <p>→ 유사부동산의 매매가액이 여러개인 경우: <strong>취득일 전후 가장 가까운 날</strong>에 해당하는 가액 적용</p>

      <hr className="my-6" />

      <h2 id="4.-무상취득-과세표준-적용요령-('23-운영요령)" className="text-xl font-semibold mt-8 mb-4">4. 무상취득 과세표준 적용요령 ('23 운영요령)</h2>

      <h3 className="text-lg font-semibold mt-6 mb-3">신고전 납세자 안내</h3>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>과세관청은 내부망에서 확인되는 시가인정액 또는 외부망 활용방법 안내</li>
        <li>시가인정액이 높다고 민원 제기할 경우 → <strong>감정가액으로 신고</strong> 가능함을 안내</li>
        <li>담당공무원이 안내하는 시가인정액은 납세자 편의를 위한 것으로, 사후 정확한 가액 확인시 <strong>수정신고</strong> 필요</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">사후 과세관청 확인단계</h3>

      <p>1. <strong>평가기간 내 매매등 시가인정액</strong> 적용 확인</p>
      <p>2. 취득일 전·후로 가장 가까운 날의 또다른 시가인정액이 있는지 확인</p>
      <p>3. <strong>유사부동산</strong>의 매매등 시가인정액 적용 가능</p>
      <p>4. 시가인정액 산정이 어려운 경우 <strong>시가표준액</strong> 적용</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">사후관리</h3>

      <p>신고·납부 이후 새로운 시가인정액이 확인될 경우 → 지자체장은 부과하기 전에 납세자에게 <strong>수정신고</strong> 하도록 안내</p>

      <hr className="my-6" />

      <h2 id="5.-가산세-적용" className="text-xl font-semibold mt-8 mb-4">5. 가산세 적용</h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>내용</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>무신고</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>무신고가산세 + 납부불성실가산세 포함하여 과세</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>과소신고 가산세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      당초 신고기한 내 시가인정액으로 신고·납부 후, 과세권자가 직권 부과하기 전에 다른 시가인정액으로 <strong>수정신고하는 경우 제외</strong><br/>
      <p>※ 과세관청 안내에도 불구하고 수정신고하지 않을 경우 가산세 부과</p>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>납부불성실 가산세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      <p>신고기간 내 정당하게 취득세 신고 및 "등기"를 하고, 이후 새로운 시가인정액으로 취득일이 속하는 달의 말일부터 <strong>3개월 이내 수정신고</strong>하는 경우 → <strong>"정당한 사유"</strong>로 감면 적용</p>
      </td>
      </tr>
      </tbody>
      </table>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세법/제10조" target="_blank" rel="noopener noreferrer">§10</a>~<a href="https://law.go.kr/법령/지방세법/제10조의6" target="_blank" rel="noopener noreferrer">§10의6</a></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>과세표준</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시행령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 시행령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세법시행령/제14조" target="_blank" rel="noopener noreferrer">§14</a></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가인정액</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시행규칙</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 시행규칙</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§4의3④</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>유사부동산</td>
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
