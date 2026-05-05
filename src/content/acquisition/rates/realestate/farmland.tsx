"use client";

import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "농지 취득세율",
  category: "취득세",
  audience: "internal",
  source: "acquisitiontax.pdf",
  sourceSections: [],
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-01-31",
  status: "draft",
  lawReference: "지방세법 §11①1가, §11①1나, §11①2, 지특법 §6",
  tags: ["농지","취득세","세율","유상거래","상속","증여","자경농민"],
};

export default function FarmlandV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">농지 취득세율</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>농지 취득 시 취득유형(유상거래, 상속, 증여)에 따른 세율 및 자경농민 감면 규정을 안내한다.</p>
      </blockquote>

      <hr className="my-6" />

      <nav className="mb-8 p-4 bg-muted rounded-lg">
      <h2 className="text-lg font-semibold mb-3">📑 목차</h2>
      <ul className="grid grid-cols-3 gap-2 text-sm">
      <li><a href="#general" className="text-primary hover:underline">유상거래</a></li>
      <li><a href="#inheritance" className="text-primary hover:underline">상속</a></li>
      <li><a href="#gift" className="text-primary hover:underline">증여</a></li>
      </ul>
      </nav>

      <hr className="my-6" />

      <section id="general">

      <h2 id="유상거래" className="text-xl font-semibold mt-8 mb-4">유상거래</h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>농지를 매매 등 유상거래로 취득하는 경우 적용되는 취득세율 및 부가세 안내</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <p>1. <strong>농지</strong>를 <strong>유상거래</strong>(매매, 교환 등)로 취득하는 경우</p>
      <p>2. 농지의 범위: 전, 답, 과수원 등 지방세법상 농지로 분류되는 토지</p>
      <p>3. 실제 영농에 사용되는 토지로서 공부상 지목과 무관하게 <strong>사실상 용도</strong> 기준으로 판단</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 기본 세율</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>농지 유상거래 시 취득세 본세: <strong>3%</strong></li>
        <li>일반 부동산(4%)보다 <strong>1%p 낮은 경감세율</strong> 적용</li>
        <li>과세표준: <strong>사실상 취득가격</strong> (실거래가 기준)</li>
      </ul>

      <p>#### 나. 부가세 포함 합계세율</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>취득세 본세 <strong>3%</strong> + 농어촌특별세 <strong>0.2%</strong> + 지방교육세 <strong>0.2%</strong></li>
        <li>합계: <strong>3.4%</strong></li>
      </ul>

      <p>#### 다. 자경농민 감면</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>지방세특례제한법 §6</strong>에 따른 자경농민 취득세 감면</li>
        <li>감면 요건:</li>
      </ul>
      <p>1. 취득일 전 <strong>2년 이상</strong> 직접 영농에 종사한 자</p>
      <p>2. 취득 농지 소재지 또는 연접 시·군·구에 거주</p>
      <p>3. 취득 후 직접 경작 목적</p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>감면율: 취득세 <strong>50% 감면</strong></li>
        <li>감면 적용 시 실효세율: 취득세 1.5% + 농특세 0.2% + 지방교육세 0.2% = <strong>1.9%</strong></li>
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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3%</strong></td>
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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.2%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득세액의 20% 상당</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>합계</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3.4%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>자경농민 감면 시</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>1.9%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사실상 취득가격</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지특법 §6 적용</td>
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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>농지 유상거래 세율</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>감면법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세특례제한법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§6</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>자경농민 취득세 감면</td>
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
        <li><strong>농지 여부 판단</strong>은 공부상 지목이 아닌 <strong>사실상 용도</strong>를 기준으로 하므로, 지목이 '전·답'이라도 실제 영농에 사용되지 않으면 농지 세율 적용 불가</li>
        <li>자경농민 감면은 <strong>사후관리</strong> 대상이며, 취득 후 일정 기간 내 정당한 사유 없이 매각·전용 시 감면세액 <strong>추징</strong> 가능</li>
        <li>법인이 농지를 취득하는 경우 자경농민 감면 적용 불가</li>
        <li>농지취득자격증명 발급 여부와 취득세 세율 적용은 <strong>별개</strong> 사안임</li>
      </ul>

      </Callout>

      </section>

      <hr className="my-6" />

      <section id="inheritance">

      <h2 id="상속" className="text-xl font-semibold mt-8 mb-4">상속</h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>농지를 상속으로 취득하는 경우 적용되는 취득세율 및 부가세 안내</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <p>1. <strong>농지</strong>를 <strong>상속</strong>(피상속인 사망에 의한 포괄승계)으로 취득하는 경우</p>
      <p>2. 협의분할, 법정상속분에 의한 취득 모두 포함</p>
      <p>3. 농지의 범위: 전, 답, 과수원 등 사실상 농지로 사용되는 토지</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 기본 세율</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>농지 상속 취득세 본세: <strong>2.8%</strong></li>
        <li>상속은 무상취득이므로 유상거래(3%)보다 낮은 세율 적용</li>
        <li>과세표준: <strong>시가표준액</strong> (개별공시지가 기준)</li>
      </ul>

      <p>#### 나. 부가세 포함 합계세율</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>취득세 본세 <strong>2.8%</strong> + 농어촌특별세 <strong>0.2%</strong> + 지방교육세 <strong>0.16%</strong></li>
        <li>합계: <strong>3.16%</strong></li>
      </ul>

      <p>#### 다. 자경농민 상속 감면</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>지방세특례제한법 §6</strong>에 따른 자경농민 상속 감면 가능</li>
        <li>감면 요건:</li>
      </ul>
      <p>1. 피상속인이 취득일 전 <strong>2년 이상</strong> 직접 영농에 종사</p>
      <p>2. 피상속인의 거주요건 충족 (농지 소재지 또는 연접 시·군·구)</p>
      <p>3. 상속인이 취득 후 직접 경작할 것</p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>감면 적용 시 취득세 50% 감면 가능</li>
      </ul>

      <p>#### 라. 상속 취득 시기</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>상속개시일(피상속인 사망일)이 취득일</li>
        <li>상속등기 여부와 관계없이 <strong>사망일 기준</strong> 납세의무 성립</li>
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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>감면법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세특례제한법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§6</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>자경농민 상속 감면</td>
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
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>상속 농지의 과세표준은 <strong>시가표준액</strong>(개별공시지가)이며, 실거래가가 아님에 유의</li>
        <li>상속 후 <strong>6개월 이내</strong> 신고·납부하여야 하며, 미신고 시 가산세 부과</li>
        <li>협의분할로 법정상속분을 초과하여 취득하는 경우에도 <strong>상속세율(2.8%)</strong> 적용 (증여세율 아님)</li>
        <li>자경농민 감면은 <strong>상속인의 영농 계속</strong> 의사가 확인되어야 적용 가능</li>
        <li>1가구 1주택 상속과는 별도로, 농지 상속은 <strong>농지 관련 감면 규정</strong>이 적용됨</li>
      </ul>

      </Callout>

      </section>

      <hr className="my-6" />

      <section id="gift">

      <h2 id="증여" className="text-xl font-semibold mt-8 mb-4">증여</h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>농지를 증여로 취득하는 경우 적용되는 취득세율 및 부가세 안내</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <p>1. <strong>농지</strong>를 <strong>증여</strong>(무상이전)로 취득하는 경우</p>
      <p>2. 부담부증여의 경우 유상부분과 무상부분을 구분하여 각각의 세율 적용</p>
      <p>3. 농지의 범위: 전, 답, 과수원 등 사실상 농지로 사용되는 토지</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 기본 세율</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>농지 증여 취득세 본세: <strong>3.5%</strong></li>
        <li>증여는 무상취득 중 가장 높은 세율 적용 (상속 2.8%보다 높음)</li>
      </ul>

      <p>#### 나. 부가세 포함 합계세율</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>취득세 본세 <strong>3.5%</strong> + 농어촌특별세 <strong>0.2%</strong> + 지방교육세 <strong>0.3%</strong></li>
        <li>합계: <strong>4.0%</strong></li>
      </ul>

      <p>#### 다. 과세표준 (2023년 개정)</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>시가인정액</strong> 적용 (2023년 개정사항)</li>
        <li>시가인정액: 매매사례가액, 감정가액, 공매가액 등 시가로 인정되는 가액</li>
        <li>시가인정액이 없는 경우 시가표준액(개별공시지가) 적용</li>
        <li>종전에는 시가표준액이 원칙이었으나, 개정 후 <strong>시가인정액 우선</strong> 적용</li>
      </ul>

      <p>#### 라. 부담부증여</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>증여재산에 담보된 채무를 수증자가 인수하는 경우</li>
        <li>채무액 상당: <strong>유상취득세율(3%)</strong> 적용</li>
        <li>나머지 가액: <strong>증여세율(3.5%)</strong> 적용</li>
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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>감면법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세특례제한법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§6</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>자경농민 감면 (해당 시)</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>2023년 개정으로 증여 취득세 과세표준이 <strong>시가인정액</strong>으로 변경되었으므로, 종전 시가표준액 기준과 혼동하지 않도록 유의</li>
        <li>부담부증여 시 유상부분과 무상부분의 <strong>과세표준 산정 방식이 상이</strong>하므로 구분 계산 필요</li>
        <li>농지 증여의 경우에도 <strong>농지취득자격증명</strong> 발급이 필요할 수 있음</li>
        <li>직계존비속 간 증여 시에도 동일 세율 적용 (주택과 달리 농지는 <strong>증여 중과 대상 아님</strong>)</li>
        <li>시가인정액 산정 시 증여일 전 6개월~후 3개월 범위의 매매사례가액 등 활용</li>
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
