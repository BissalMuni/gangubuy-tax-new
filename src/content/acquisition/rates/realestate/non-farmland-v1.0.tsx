"use client";

import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "농지 외 부동산 취득세율",
  category: "취득세",
  audience: "internal",
  source: "acquisitiontax.pdf",
  sourceSections: [26],
  version: "1.0",
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-01-31",
  status: "draft",
  lawReference: "지방세법 §11①1가, §11①1나, §11①2, §11①3",
  tags: ["부동산","취득세","세율","유상거래","상속","증여","원시취득","상가","오피스텔"],
};

export default function NonFarmlandV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">농지 외 부동산 취득세율</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>농지·주택을 제외한 일반 부동산(상가, 토지, 사무실 등) 취득 시 취득유형별 세율을 안내한다.</p>
      </blockquote>

      <hr className="my-6" />

      <nav className="mb-8 p-4 bg-muted rounded-lg">
      <h2 className="text-lg font-semibold mb-3">📑 목차</h2>
      <ul className="grid grid-cols-2 gap-2 text-sm">
      <li><a href="#general" className="text-primary hover:underline">유상거래</a></li>
      <li><a href="#inheritance" className="text-primary hover:underline">상속</a></li>
      <li><a href="#gift" className="text-primary hover:underline">증여</a></li>
      <li><a href="#original" className="text-primary hover:underline">원시취득 (신축)</a></li>
      </ul>
      </nav>

      <hr className="my-6" />

      <section id="general">

      <h2 id="유상거래" className="text-xl font-semibold mt-8 mb-4">유상거래</h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>농지·주택을 제외한 일반 부동산(상가, 토지, 사무실 등)을 유상거래로 취득하는 경우 적용되는 세율 안내</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <p>1. <strong>농지 및 주택을 제외한 부동산</strong>을 <strong>유상거래</strong>(매매, 교환 등)로 취득하는 경우</p>
      <p>2. 적용 대상 부동산 유형:</p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>상가</strong> (근린생활시설, 판매시설 등)</li>
        <li><strong>사무실</strong> (업무시설)</li>
        <li><strong>공장</strong> (공장용 건물 및 부속토지)</li>
        <li><strong>토지</strong> (농지 외 일반토지, 임야 등)</li>
        <li><strong>오피스텔</strong> (사무용으로 사용하는 경우)</li>
        <li><strong>무허가주택</strong> (주택법상 주택이 아닌 것)</li>
        <li>기타 건축물 (창고, 주차장 등)</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 기본 세율</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>농지 외 부동산 유상거래 취득세 본세: <strong>4%</strong></li>
        <li>부동산 취득세의 <strong>표준세율</strong>에 해당</li>
        <li>과세표준: <strong>사실상 취득가격</strong> (실거래가 기준)</li>
      </ul>

      <p>#### 나. 부가세 포함 합계세율</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>취득세 본세 <strong>4%</strong> + 농어촌특별세 <strong>0.2%</strong> + 지방교육세 <strong>0.4%</strong></li>
        <li>합계: <strong>4.6%</strong></li>
      </ul>

      <p>#### 다. 무허가주택 적용</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>무허가주택(무허가건축물)은 주택법상 <strong>주택으로 보지 않음</strong></li>
        <li>따라서 주택 취득세율(1~3%)이 아닌 <strong>일반 부동산 세율 4.6%</strong> 적용</li>
        <li>건축물대장에 등재되지 않은 건물도 사실상 취득 시 과세 대상</li>
      </ul>

      <p>#### 라. 오피스텔 적용</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>사무용 오피스텔</strong>: 업무시설로 분류되어 <strong>4.6%</strong> 적용</li>
        <li><strong>주거용 오피스텔</strong>: 실제 주거용으로 사용 시 주택 세율 적용 가능 (별도 판단 필요)</li>
        <li>건축물대장상 용도와 실제 사용 용도가 다를 경우 <strong>사실상 용도</strong> 기준</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">세율표</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>세율</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>과세표준</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득세 본세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>4%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사실상 취득가격</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 §11①1가</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>농어촌특별세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.2%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득세 과세표준</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방교육세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.4%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득세액의 20% 상당</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>합계</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>4.6%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>상가·사무실·공장·토지 등</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>무허가주택</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>4.6%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사실상 취득가격</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택법상 주택 아님</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>오피스텔(사무용)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>4.6%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사실상 취득가격</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>업무시설 분류</td>
      </tr>
      </tbody>
      </table>

      <h3 className="text-lg font-semibold mt-6 mb-3">관련 법령</h3>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§11①1가</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>유상거래 표준세율</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>과세표준</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§10</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사실상 취득가격</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>부가세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>농어촌특별세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§5</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>농특세 부과 근거</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>부가세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§151</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방교육세 부과 근거</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>주택 vs 비주택 판단</strong>이 세율에 큰 영향을 미치므로, 건축물의 실제 용도를 정확히 확인할 것</li>
        <li>무허가주택은 주택이 아니므로 <strong>다주택 중과세율 적용 대상에서 제외</strong>되나, 반대로 주택 경감세율(1~3%)도 적용 불가</li>
        <li>오피스텔의 경우 <strong>건축물대장상 용도</strong>와 <strong>실제 사용 용도</strong>가 다를 수 있으므로 사실관계 확인 필요</li>
        <li>토지 취득 시 개발부담금, 농지전용부담금 등 <strong>별도 부담금</strong>이 발생할 수 있음</li>
        <li>법인의 상가·사무실 취득 시에도 동일한 <strong>4.6%</strong> 적용 (주택과 달리 법인 중과 없음)</li>
      </ul>

      </Callout>

      </section>

      <hr className="my-6" />

      <section id="inheritance">

      <h2 id="상속" className="text-xl font-semibold mt-8 mb-4">상속</h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>농지·주택을 제외한 일반 부동산을 상속으로 취득하는 경우 적용되는 세율 안내</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <p>1. <strong>농지 및 주택을 제외한 부동산</strong>을 <strong>상속</strong>으로 취득하는 경우</p>
      <p>2. 적용 대상: 상가, 사무실, 공장, 일반토지, 임야 등</p>
      <p>3. 협의분할, 법정상속분에 의한 취득 모두 포함</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 기본 세율</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>농지 외 부동산 상속 취득세 본세: <strong>2.8%</strong></li>
        <li>상속은 취득유형 중 가장 낮은 세율 구간에 해당</li>
        <li>과세표준: <strong>시가표준액</strong> (건물: 시가표준액, 토지: 개별공시지가)</li>
      </ul>

      <p>#### 나. 부가세 포함 합계세율</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>취득세 본세 <strong>2.8%</strong> + 농어촌특별세 <strong>0.2%</strong> + 지방교육세 <strong>0.16%</strong></li>
        <li>합계: <strong>3.16%</strong></li>
      </ul>

      <p>#### 다. 상속 취득 시기 및 신고기한</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>취득시기: <strong>상속개시일</strong>(피상속인 사망일)</li>
        <li>신고기한: 상속개시일이 속하는 달의 말일부터 <strong>6개월 이내</strong></li>
        <li>상속등기 완료 여부와 관계없이 사망일 기준 납세의무 성립</li>
      </ul>

      <p>#### 라. 협의분할과 세율</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>상속재산 협의분할로 법정상속분 초과 취득하더라도 <strong>상속세율(2.8%)</strong> 적용</li>
        <li>상속재산 재분할(당초 분할 후 다시 분할)의 경우 <strong>증여세율(3.5%)</strong> 적용 가능성 있음</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">세율표</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>세율</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>과세표준</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득세 본세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>2.8%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가표준액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 §11①1나</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>농어촌특별세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.2%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득세 과세표준</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방교육세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.16%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득세액의 20% 상당</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>합계</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3.16%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      </tbody>
      </table>

      <h3 className="text-lg font-semibold mt-6 mb-3">관련 법령</h3>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§11①1나</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>상속 취득세율</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>과세표준</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§10</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가표준액 적용</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득시기</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§20</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>상속 취득시기</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>신고납부</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§20</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>상속 신고기한</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>상속 부동산의 과세표준은 <strong>시가표준액</strong>이며, 실거래가 아님에 유의</li>
        <li>상속 후 <strong>6개월 이내</strong> 신고·납부하지 않으면 <strong>무신고가산세</strong>(20%) 및 <strong>납부불성실가산세</strong> 부과</li>
        <li>상속재산 <strong>재분할</strong>은 상속이 아닌 <strong>증여</strong>로 볼 수 있으므로 세율 차이 발생에 주의</li>
        <li>피상속인의 체납 취득세가 있는 경우 상속인에게 <strong>납세의무 승계</strong> 가능</li>
        <li>상속포기자는 취득세 납세의무 없음 (법원 상속포기 심판 확정 필요)</li>
      </ul>

      </Callout>

      </section>

      <hr className="my-6" />

      <section id="gift">

      <h2 id="증여" className="text-xl font-semibold mt-8 mb-4">증여</h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>농지·주택을 제외한 일반 부동산을 증여로 취득하는 경우 적용되는 세율 안내</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <p>1. <strong>농지 및 주택을 제외한 부동산</strong>을 <strong>증여</strong>(무상이전)로 취득하는 경우</p>
      <p>2. 적용 대상: 상가, 사무실, 공장, 일반토지, 임야, 오피스텔 등</p>
      <p>3. 부담부증여의 경우 유상부분과 무상부분을 구분하여 각각의 세율 적용</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 기본 세율</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>농지 외 부동산 증여 취득세 본세: <strong>3.5%</strong></li>
        <li>증여는 무상취득 중 상속(2.8%)보다 높은 세율 적용</li>
      </ul>

      <p>#### 나. 부가세 포함 합계세율</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>취득세 본세 <strong>3.5%</strong> + 농어촌특별세 <strong>0.2%</strong> + 지방교육세 <strong>0.3%</strong></li>
        <li>합계: <strong>4.0%</strong></li>
      </ul>

      <p>#### 다. 과세표준</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>시가인정액</strong> 적용 (2023년 개정)</li>
        <li>시가인정액: 매매사례가액, 감정가액, 공매가액 등 시가로 인정되는 가액</li>
        <li>시가인정액이 없는 경우 <strong>시가표준액</strong> 적용</li>
        <li>시가인정액 적용 기간: 증여일 전 6개월~후 3개월</li>
      </ul>

      <p>#### 라. 부담부증여</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>증여재산에 담보된 채무를 수증자가 인수하는 경우</li>
        <li>채무액 상당: <strong>유상취득세율(4%)</strong> 적용</li>
        <li>나머지 가액: <strong>증여세율(3.5%)</strong> 적용</li>
        <li>부담부증여 시 유상부분 과세표준은 <strong>사실상 취득가격</strong>(채무액)</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">세율표</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>세율</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>과세표준</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득세 본세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3.5%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가인정액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 §11①2</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>농어촌특별세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.2%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득세 과세표준</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방교육세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.3%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득세액의 20% 상당</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>합계</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>4.0%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      </tbody>
      </table>

      <h3 className="text-lg font-semibold mt-6 mb-3">관련 법령</h3>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§11①2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>증여 취득세율</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>과세표준</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§10의3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가인정액 적용</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>부담부증여</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§10의2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>유상·무상 구분</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>부가세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>농어촌특별세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§5</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>농특세 부과 근거</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>2023년 개정으로 증여 과세표준이 <strong>시가인정액</strong>으로 변경되어 세부담이 증가할 수 있음</li>
        <li>부담부증여 시 유상부분(4%)과 무상부분(3.5%)의 <strong>세율 및 과세표준이 각각 상이</strong>하므로 구분 계산 필수</li>
        <li>법인 간 증여, 법인에서 개인으로의 증여 등도 <strong>동일 세율</strong> 적용</li>
        <li>시가인정액 산정 시 유사 매매사례가 없는 경우 <strong>감정평가</strong> 활용 가능</li>
        <li>증여세(국세)와 취득세(지방세)의 과세표준 산정 방식이 다를 수 있으므로 각각 확인 필요</li>
      </ul>

      </Callout>

      </section>

      <hr className="my-6" />

      <section id="original">

      <h2 id="원시취득-(신축)" className="text-xl font-semibold mt-8 mb-4">원시취득 (신축)</h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>건물 신축 등 원시취득으로 부동산을 취득하는 경우 적용되는 세율 및 과세표준 안내</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <p>1. <strong>건물 신축</strong>, 증축, 개축 등으로 부동산을 <strong>원시취득</strong>하는 경우</p>
      <p>2. 원시취득의 유형:</p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>건물 <strong>신축</strong> (주거용·비주거용 모두 포함)</li>
        <li>건물 <strong>증축</strong> (기존 건물에 면적 추가)</li>
        <li><strong>매립·간척</strong>에 의한 토지 조성</li>
        <li>공유수면 매립 등</li>
      </ul>
      <p>3. 다주택자라도 원시취득은 <strong>별도 세율체계</strong> 적용 (주택 중과세율 비적용)</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 기본 세율</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>원시취득 취득세 본세: <strong>2.8%</strong></li>
        <li>승계취득(유상 4%, 상속 2.8%, 증여 3.5%)과 구분되는 별도 세율</li>
      </ul>

      <p>#### 나. 부가세 포함 합계세율</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>취득세 본세 <strong>2.8%</strong> + 농어촌특별세 <strong>0.2%</strong> + 지방교육세 <strong>0.16%</strong></li>
        <li>합계: <strong>3.16%</strong></li>
      </ul>

      <p>#### 다. 과세표준 산정</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>원칙: <strong>사실상 취득가격</strong> (실제 건축에 소요된 총비용)</li>
        <li>개인 시공 시 취득가격 입증이 곤란한 경우: <strong>시가표준액</strong> 과세 가능</li>
        <li>사실상 취득가격에 포함되는 비용 (PDF Sec 26, p52-53):</li>
      </ul>
      <p>1. <strong>도급계약서</strong> 상 공사비</p>
      <p>2. <strong>설계비</strong></p>
      <p>3. <strong>감리비</strong></p>
      <p>4. <strong>시설물설치비</strong></p>
      <p>5. <strong>전기·수도·가스 인입공사비</strong></p>
      <p>6. <strong>등록면허세</strong></p>
      <p>7. <strong>철거비</strong> (기존 건물 철거 시)</p>
      <p>8. <strong>기반시설부담금</strong></p>

      <p>#### 라. 다주택자 원시취득 특례</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>다주택자가 주택을 신축하는 경우에도 원시취득 세율 <strong>2.8%</strong> 적용</li>
        <li>주택 유상거래 중과세율(8~12%)과 무관하게 <strong>원시취득 별도 세율체계</strong> 적용</li>
        <li>다만, 신축 후 취득세 신고 시 주택 수 산정에는 포함될 수 있음</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">세율표</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>세율</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>과세표준</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득세 본세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>2.8%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사실상 취득가격</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 §11①3</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>농어촌특별세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.2%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득세 과세표준</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방교육세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.16%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득세액의 20% 상당</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>합계</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3.16%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>개인시공(입증곤란)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3.16%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가표준액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가표준액 과세</td>
      </tr>
      </tbody>
      </table>

      <h3 className="text-lg font-semibold mt-6 mb-3">관련 법령</h3>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§11①3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>원시취득 세율</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>과세표준</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§10</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사실상 취득가격</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>과세표준</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§10의5</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가표준액 적용 기준</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득시기</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§20</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>신축 건물 취득시기</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>신축 건물의 과세표준은 <strong>실제 건축비용 전체</strong>이며, 도급계약서 금액뿐만 아니라 설계비, 감리비, 인입공사비 등 <strong>부대비용 모두 포함</strong></li>
        <li>개인이 직접 시공하여 취득가격 입증이 곤란한 경우 <strong>시가표준액</strong>으로 과세될 수 있으므로, 건축 관련 증빙서류를 철저히 보관할 것</li>
        <li>다주택자라도 원시취득 시 중과세율이 아닌 <strong>2.8% 적용</strong>되나, 이후 해당 주택 매각·보유 시 다주택 관련 규정은 별도 적용</li>
        <li>증축의 경우 증축 부분만 원시취득에 해당하며, 기존 건물 부분은 해당 없음</li>
        <li>사용승인일(임시사용승인일) 또는 사실상 사용일 중 빠른 날이 <strong>취득시기</strong>임</li>
      </ul>

      </Callout>

      </section>

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
