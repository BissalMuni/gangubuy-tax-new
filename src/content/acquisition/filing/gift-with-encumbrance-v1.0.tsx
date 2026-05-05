"use client";

import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "부담부증여",
  sectionId: "12",
  category: "취득세",
  subcategory: "신고",
  audience: "internal",
  source: "acquisitiontax.pdf",
  pageRange: [34,35],
  version: "1.0",
  effectiveDate: "2020-08-12",
  lastUpdated: "2026-02-08",
  status: "draft",
  lawReference: "지방세법 §7⑫",
  tags: ["부담부증여","채무승계","유상취득","무상취득","소득증빙"],
};

export default function GiftWithEncumbranceV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">7. 부담부증여</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>증여자의 채무나 담보대출을 인수하는 증여로서 하나의 취득에 유상승계와 무상승계취득이 동시에 발생하는 경우.</p>
      </blockquote>

      <hr className="my-6" />

      <h2 id="1.-부담부증여의-정의" className="text-xl font-semibold mt-8 mb-4">1. 부담부증여의 정의</h2>

      <Callout type="info">

      <p><strong>지방세법 §7⑫</strong>: 증여자의 채무를 인수하는 부담부(負擔附) 증여의 경우에는 그 채무액에 상당하는 부분은 부동산등을 <strong>유상으로 취득</strong>하는 것으로 본다.</p>

      <p><strong>단,</strong> 배우자 또는 직계존비속으로부터의 부동산등의 부담부 증여의 경우에는 <strong>제11항(증여로 간주)</strong>을 적용한다.</p>

      </Callout>

      <hr className="my-6" />

      <h2 id="2.-세율-적용" className="text-xl font-semibold mt-8 mb-4">2. 세율 적용</h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>대상</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>세율</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#1890ff'}}>유상</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      부담분 (채무인수분 = 채무승계액)<br/>
      <span style={{fontSize: '12px', color: '#8c8c8c'}}>임차보증금, 전세권, 대출금, 전세보증금</span>
      </td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>주택세율 1~3%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}>다주택자는 중과적용</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#52c41a'}}>무상</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>부담분 제외부분 (무상증여분)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>
      취득세 3.5%<br/>
      교육세 0.3%<br/>
      <p>농특세 0.2% (85㎡ 주택 제외)</p>
      </td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}>다주택+조정지역+3억이상 → 12% 중과</td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <h2 id="3.-구비서류" className="text-xl font-semibold mt-8 mb-4">3. 구비서류</h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '180px'}}>서류</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>부담부증여계약서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>채무금액 명확히 기재, <strong>검인날인 확인</strong></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>증여인의 부채증명원</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>담보대출의 경우 은행에서 발급<br/>또는 근저당권 변경계약서</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>임대차계약서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>전월세 보증금</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>수증인의 소득증명원</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontSize: '12px'}}>
      대가지급을 위한 증빙서류 필요 (2016.1.1 개정)<br/>
      소득증명원(빚 갚을 능력 증명)이 없으면 부담분을 매매로 인정받을 수 없고 <strong>증여로 간주</strong><br/>
      <p>※ 제3자의 채무는 소득증빙 불필요 (§7⑫ 해석상)</p>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>소유재산처분시 증빙</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontSize: '12px'}}>
      • 실거래신고서 및 부동산 등기부<br/>
      • 은행별 잔고증명서<br/>
      • 소유재산담보: 은행 부채증명서<br/>
      • 상속 및 수증재산: 상속세 및 증여세 납세증명서
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>가족관계증명서 및 등본</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택일 경우 (채무승계액 유상세율적용시 다주택자는 중과)</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득세신고서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}>※ 공증받은 차용증으로 사인금전채무 증빙시 <strong>불인정</strong></td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <h2 id="4.-과세표준-적용" className="text-xl font-semibold mt-8 mb-4">4. 과세표준 적용</h2>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>채권액(채무승계액)이 시가표준액보다 높은 경우</strong> → 채권액으로 적용 ('23 운영요령 p18)</li>
        <li><strong>부채잔액증명</strong>의 금액으로 하고 채권최고액(X)으로 하지 않음</li>
      </ul>

      </Callout>

      <hr className="my-6" />

      <h2 id="5.-예시" className="text-xl font-semibold mt-8 mb-4">5. 예시</h2>

      <h3 className="text-lg font-semibold mt-6 mb-3">예시 1: 1주택 보유자</h3>

      <p><strong>조건</strong>: 시가표준액 6억 / 부담부 유상입증액 4억</p>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>금액</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>세율</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>빚 4억 부담부분 (채무승계액)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>4억</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#1890ff'}}>유상취득 - 주택세율 1.1%</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>차액 (무상증여분)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2억</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#52c41a'}}>무상취득 - 증여세율 4%</td>
      </tr>
      </tbody>
      </table>

      <h3 className="text-lg font-semibold mt-6 mb-3">예시 2: 4주택 보유자 (조정지역)</h3>

      <p><strong>조건</strong>: 4주택 보유자가 6억짜리 주택을 같은 1세대 자녀에게 부담부증여 (유상입증 3.5억)</p>

      <p>→ 해당 주택이 <strong>조정지역 내</strong>에 있는 주택이라면 <strong>유상, 무상 증여 모두 12% 세율</strong> 적용</p>

      <hr className="my-6" />

      <h2 id="6.-qna-(2020-행안부-운영요령)" className="text-xl font-semibold mt-8 mb-4">6. QnA (2020 행안부 운영요령)</h2>

      <details>
      <summary>Q1. 부부간 매매인데 수증자가 소득증빙 못하는 경우?</summary>

      <p>주택가격 3억, 매매가격 5억, 수증자가 이체내역 및 소득증빙 못하는 경우</p>
      <p>→ <strong>5억을 과세표준으로 하여 '증여'로 발급</strong></p>

      </details>

      <details>
      <summary>Q2. 직계존비속간 부담부증여 계약서인데 수증자 소득증빙을 못하는 경우?</summary>

      <p>부담부부분 3억으로 표시, 주택가격 5억인 경우</p>
      <p>→ 증여계약서로 바꿔올 필요 없이 그냥 부담부증여 계약서 받고 <strong>'증여' 5억으로 발급</strong></p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>지방세법상 직계존비속간 거래는 기본적으로 증여이고, 유상거래 부분에 대해 대가지급 사실을 민원인이 적극적으로 입증하는 경우에 한해 유상거래로 인정</li>
      </ul>

      </details>

      <details>
      <summary>Q3. 상속 취득세 신고시 감정평가액으로 신고 가능?</summary>

      <p>→ <strong>가능함</strong></p>

      </details>

      <Callout type="caution">

      <p><strong>소득증빙(대금지급 자금증빙)이 안되면 전체가 증여세율이 된다.</strong></p>
      <p>(유권해석변경 행안부 2020.6.24.)</p>

      </Callout>

      <hr className="my-6" />

      <h2 id="7.-관련-법령" className="text-xl font-semibold mt-8 mb-4">7. 관련 법령</h2>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세법/제7조" target="_blank" rel="noopener noreferrer">§7⑫</a></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>부담부증여</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>참조</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세법/제7조" target="_blank" rel="noopener noreferrer">§7⑪</a></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>증여의제규정</td>
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
