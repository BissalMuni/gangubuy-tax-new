"use client";

import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "취득세 세율 공통사항",
  category: "취득세",
  audience: "internal",
  source: "acquisitiontax.pdf",
  sourceSections: [11,12,13,14,15,16,17,18,20,23,24,25,27,37],
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-01-31",
  status: "draft",
  lawReference: "지방세법 §7, §10, §11, §13, §15, §16, 지특법 각 조항",
  tags: ["공통","분할취득","과밀억제권역","사치성재산","세율특례","감면","면세점","주택수"],
};

export default function CommonV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">취득세 세율 공통사항</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>취득세 세율 적용 시 공통적으로 적용되는 규정들을 정리한다.</p>
      </blockquote>

      <hr className="my-6" />

      <nav className="mb-8 p-4 bg-muted rounded-lg">
      <h2 className="text-lg font-semibold mb-3">📑 목차</h2>
      <ul className="grid grid-cols-2 gap-2 text-sm">
      <li><a href="#division" className="text-primary hover:underline">분할취득</a></li>
      <li><a href="#metro-surcharge" className="text-primary hover:underline">과밀억제권역 중과</a></li>
      <li><a href="#luxury-surcharge" className="text-primary hover:underline">사치성재산 중과</a></li>
      <li><a href="#special-rates" className="text-primary hover:underline">세율 특례/경감</a></li>
      <li><a href="#rate-application" className="text-primary hover:underline">세율 적용/추징</a></li>
      <li><a href="#exemption" className="text-primary hover:underline">면세점</a></li>
      <li><a href="#housing-count" className="text-primary hover:underline">주택 수 판단</a></li>
      </ul>
      </nav>

      <hr className="my-6" />

      <section id="division">

      <h2 id="분할취득" className="text-xl font-semibold mt-8 mb-4">분할취득</h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>공유물분할 시 본인 지분 이내 취득은 세율특례(3/1000)가 적용되며, 지분 초과 부분은 유상취득 세율이 적용된다.</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>공유물분할</strong>로 부동산을 취득하는 경우</li>
        <li>공유 부동산을 물리적 또는 법적으로 분할하여 각 공유자가 단독 소유로 전환하는 경우</li>
        <li>공유자 간 지분 정리를 위한 분할 취득</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 세율특례 적용 (본인 지분 이내)</p>

      <p>1. <strong>원칙 세율</strong>: 23/1000</p>
      <p>2. <strong>세율특례 경감</strong>: 20/1000 제외</p>
      <p>3. <strong>적용 세율</strong>: <strong>3/1000</strong> (= 23/1000 - 20/1000)</p>
      <p>4. 본인의 기존 공유지분 비율 이내에서 취득하는 부분에 한하여 적용</p>

      <p>#### 나. 지분 초과 취득 시</p>

      <p>1. 본인 지분을 <strong>초과</strong>하는 부분은 <strong>유상취득 세율</strong> 적용</p>
      <p>2. 유상 부분이 <strong>주택</strong>인 경우 <strong>중과세율</strong> 적용 가능</p>
      <p>3. 중과세율 적용 여부는 <strong>기존 보유 주택 수</strong>를 기준으로 판단</p>

      <p>#### 다. 과세표준</p>

      <p>1. 과세표준은 <strong>분할된 부동산 전체의 시가표준액</strong> 기준</p>
      <p>2. 지분 비율에 따라 세율특례 부분과 유상취득 부분을 구분하여 산정</p>

      <p>#### 라. 주요 판례</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>대법원 2020두53972</strong>: 공유물분할 시 지분비율은 <strong>교환가치 비율</strong>로 인정</li>
        <li>등기부상 지분비율과 실제 교환가치 비율이 다를 경우, 교환가치 비율을 기준으로 판단</li>
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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>본인 지분 이내</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3/1000</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>분할 부동산 전체 시가표준액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>세율특례 적용 (23/1000 - 20/1000)</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>본인 지분 초과 (일반)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>28/1000</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>초과 부분 시가표준액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>유상취득 세율 적용</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>본인 지분 초과 (주택 중과)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>중과세율</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>초과 부분 시가표준액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>기존 보유 주택 수에 따라 판단</td>
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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>세율특례</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§11①5</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>공유물분할 세율</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>과세표준</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§15①4</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>분할취득 과세표준</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시행령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 시행령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§29조의2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>공유물분할 세부 기준</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>판례</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>대법원</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2020두53972</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>교환가치 비율 인정</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>지분 초과 부분</strong>은 반드시 유상취득 세율을 적용해야 하며, 세율특례(3/1000)를 일괄 적용할 수 없음</li>
        <li>주택의 경우 지분 초과 부분에 대해 <strong>다주택 중과세율</strong>이 적용될 수 있으므로, 기존 보유 주택 수를 반드시 확인</li>
        <li>과세표준은 지분 비율이 아닌 <strong>분할된 부동산 전체 시가표준액</strong>임에 유의</li>
      </ul>

      </Callout>

      </section>

      <hr className="my-6" />

      <section id="metro-surcharge">

      <h2 id="과밀억제권역-중과세율" className="text-xl font-semibold mt-8 mb-4">과밀억제권역 중과세율</h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>수도권정비계획법상 과밀억제권역(대도시) 내에서 법인의 본점 설치 또는 공장 신·증설 시 취득세가 표준세율의 3배로 중과된다.</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>대도시</strong> 내 <strong>법인</strong>이 본점·주사무소를 설치하기 위해 부동산을 취득하는 경우</li>
        <li><strong>대도시</strong> 내 <strong>공장</strong>을 신설 또는 증설하기 위해 부동산을 취득하는 경우</li>
        <li>대도시의 범위: <strong>수도권정비계획법</strong>에 따른 <strong>과밀억제권역</strong></li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 법인 본점·주사무소 설치 중과 (§13①)</p>

      <p>1. 대도시 내에서 법인을 설립하거나 본점·주사무소를 이전하여 부동산을 취득하는 경우</p>
      <p>2. 표준세율의 <strong>3배</strong>로 중과</p>
      <p>3. <strong>중과세율 산식</strong>: 표준세율 × 300% - 중과기준세율(2%) × 200%</p>
      <p>4. 법인 설립 후 <strong>5년 이내</strong> 해당 부동산을 취득하는 경우에도 적용</p>

      <p>#### 나. 공장 신설·증설 중과 (§13②)</p>

      <p>1. 대도시 내에서 공장을 <strong>신설</strong> 또는 <strong>증설</strong>하기 위한 부동산 취득</p>
      <p>2. 표준세율의 <strong>3배</strong>로 중과</p>
      <p>3. 기존 공장의 단순 대체는 중과 대상에서 제외</p>

      <p>#### 다. 과밀억제권역 범위</p>

      <p>1. 서울특별시 전역</p>
      <p>2. 인천광역시 일부 (남동구, 부평구, 서구 등)</p>
      <p>3. 경기도 일부 (수원시, 성남시, 안양시, 부천시, 광명시, 과천시, 의왕시, 군포시, 시흥시 일부 등)</p>
      <p>4. 정확한 범위는 <strong>수도권정비계획법 시행령</strong> 별표 참조</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">세율표</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>표준세율</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>중과세율</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>산식</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>법인 본점 설치</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>4%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>약 9.4%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>표준세율 × 3 - 중과기준세율(2%) × 2</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>공장 신설·증설</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>4%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>약 9.4%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>표준세율 × 3 - 중과기준세율(2%) × 2</td>
      </tr>
      </tbody>
      </table>

      <Callout type="info">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>중과기준세율</strong>: 2% (지방세법상 중과세 산정 시 기준이 되는 세율)</li>
        <li><strong>산식 예시</strong>: 4% × 3 - 2% × 2 = 12% - 4% = <strong>8%</strong> (+ 지방교육세·농어촌특별세 별도)</li>
      </ul>

      </Callout>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>법인 본점 중과</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§13①</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>대도시 법인 본점 설치</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>공장 중과</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§13②</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>대도시 공장 신·증설</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>대도시 범위</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>수도권정비계획법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시행령 별표</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>과밀억제권역 지정</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>중과기준세율</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§13</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2%</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>법인 설립 후 5년 이내</strong> 취득하는 부동산도 중과 대상에 포함되므로, 설립 시기 확인 필수</li>
        <li>과밀억제권역의 정확한 범위는 <strong>수도권정비계획법 시행령 별표</strong>를 반드시 확인</li>
        <li>기존 공장의 <strong>단순 대체</strong>와 <strong>증설</strong>의 구분이 중요하며, 증설 여부에 따라 중과 적용이 달라짐</li>
        <li>중과세율 산정 시 <strong>중과기준세율(2%)</strong>을 적용한 산식을 정확히 이해해야 함</li>
      </ul>

      </Callout>

      </section>

      <hr className="my-6" />

      <section id="luxury-surcharge">

      <h2 id="사치성재산-중과세율" className="text-xl font-semibold mt-8 mb-4">사치성재산 중과세율</h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>별장, 골프장, 고급주택, 고급오락장, 고급선박 등 사치성재산을 취득하는 경우 표준세율에 중과기준세율(2%)의 4배를 가산하여 중과한다.</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>별장</strong>: 주거용 건축물로서 상시 주거용이 아닌 휴양·피서 목적 건물</li>
        <li><strong>골프장</strong>: 회원제 골프장용 부동산</li>
        <li><strong>고급주택</strong>: 시행령 §28에서 정하는 기준을 충족하는 주택</li>
        <li><strong>고급오락장</strong>: 카지노, 나이트클럽 등 유흥 목적 시설</li>
        <li><strong>고급선박</strong>: 비업무용 고급 선박</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 중과세율 산식</p>

      <p>1. <strong>중과세율</strong> = 표준세율 + 중과기준세율(2%) × <strong>400%</strong></p>
      <p>2. 즉, 기본세율에 <strong>8%를 가산</strong></p>
      <p>3. 일반 부동산 취득세율(4%) 기준 시: 4% + 8% = <strong>12%</strong></p>

      <p>#### 나. 고급주택 기준 (시행령 §28)</p>

      <p>1. 시가표준액 <strong>9억원 초과</strong> 등 일정 기준을 충족하는 주택</p>
      <p>2. 건물 면적, 부속 토지 면적, 엘리베이터·에스컬레이터·수영장 등 부대시설 보유 여부</p>
      <p>3. 1구의 건축물의 가액이 기준금액을 초과하는 경우</p>

      <p>#### 다. 대상 재산별 세부 기준</p>

      <p>1. <strong>별장</strong>: 주거용 건축물과 그 부속 토지로서 상시 주거 목적이 아닌 것</p>
      <p>2. <strong>골프장</strong>: 체육시설의 설치·이용에 관한 법률에 따른 회원제 골프장</p>
      <p>3. <strong>고급오락장</strong>: 카지노, 나이트클럽, 유흥주점영업장 등 대통령령으로 정하는 시설</p>
      <p>4. <strong>고급선박</strong>: 비업무용으로 사용하는 자가용 선박</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">세율표</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>표준세율</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>중과 가산</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>중과세율 합계</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>별장</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>4%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>+8%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>12%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>상시 주거 외 목적</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>골프장</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>4%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>+8%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>12%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>회원제 골프장</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>고급주택</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1~3%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>+8%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>9~11%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시행령 §28 기준 충족</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>고급오락장</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>4%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>+8%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>12%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>카지노, 나이트클럽 등</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>고급선박</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2~3%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>+8%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>10~11%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>비업무용 자가용 선박</td>
      </tr>
      </tbody>
      </table>

      <Callout type="info">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>중과 가산분</strong>: 중과기준세율(2%) × 400% = <strong>8%</strong></li>
        <li>지방교육세, 농어촌특별세는 별도 부과</li>
      </ul>

      </Callout>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사치성재산 중과</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§13⑤</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>중과세율 규정</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>고급주택 기준</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 시행령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§28</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>고급주택 세부 기준</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>중과기준세율</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§13</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2%</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>골프장</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>체육시설법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>회원제 골프장 정의</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>고급주택</strong> 해당 여부는 시행령 §28의 기준을 엄격히 적용하므로, 시가표준액·면적·부대시설 등을 종합적으로 판단해야 함</li>
        <li>별장으로 판단되면 <strong>상시 주거 사실</strong>을 입증하지 못하는 한 중과 적용</li>
        <li>골프장은 <strong>회원제</strong>에 한하여 중과되며, 대중골프장은 제외</li>
        <li>고급오락장은 영업 허가·신고 내용이 아닌 <strong>실제 사용 용도</strong>를 기준으로 판단</li>
      </ul>

      </Callout>

      </section>

      <hr className="my-6" />

      <section id="special-rates">

      <h2 id="취득세-세율-특례-및-감면" className="text-xl font-semibold mt-8 mb-4">취득세 세율 특례 및 감면</h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>지방세특례제한법 및 지방세법에 따라 특정 요건 충족 시 취득세 감면 또는 세율특례가 적용되는 주요 항목을 정리한다.</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>협의이혼 재산분할, 서민주택 취득, 영유아 보육시설, 국가유공자, 임대사업자, 토지수용 대체취득 등</li>
        <li>종교시설, 노인복지시설, 전세사기피해 지원, 지식산업센터 등</li>
        <li>각 항목별 <strong>법정 요건</strong>을 충족하는 경우에 한하여 적용</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 협의이혼 재산분할 (Sec 13, p36)</p>

      <p>1. <strong>근거</strong>: 지방세법 §15①6 세율특례</p>
      <p>2. <strong>경감 내용</strong>: 일반 세율 3.5% → <strong>1.5%</strong> 적용</p>
      <p>3. <strong>중과세 제외</strong>: 다주택 중과세율 적용하지 않음</p>
      <p>4. <strong>과세표준</strong>: <strong>시가인정액</strong> 적용</p>
      <p>5. 재판상 이혼이 아닌 <strong>협의이혼</strong>에 한하여 적용</p>

      <p>#### 나. 서민주택 1가구 1주택 감면 (Sec 14, p37)</p>

      <p>1. <strong>근거</strong>: 지특법 §33②</p>
      <p>2. <strong>감면 요건</strong>:</p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>주택가격 <strong>1억원 미만</strong></li>
        <li>전용면적 <strong>40㎡ 이하</strong></li>
        <li><strong>1가구 1주택</strong>에 해당</li>
      </ul>
      <p>3. <strong>감면율</strong>: 취득세 <strong>100% 감면</strong></p>
      <p>4. <strong>추징 사유</strong>: 감면 후 요건 미충족 시 추징 가능</p>

      <p>#### 다. 영유아 보육시설 감면 (Sec 15, p38)</p>

      <p>1. <strong>근거</strong>: 지특법 §19</p>
      <p>2. 영유아 보육시설 설치·운영 목적의 부동산 취득 시 감면</p>

      <p>#### 라. 국가유공자 감면 (Sec 16, p39)</p>

      <p>1. <strong>근거</strong>: 지특법 §29</p>
      <p>2. 전용면적 <strong>85㎡ 이하</strong>: 취득세 <strong>전부 감면</strong></p>
      <p>3. 전용면적 <strong>85㎡ 초과</strong>: 국가보훈처 <strong>대부금 한도 내</strong>에서 감면</p>

      <p>#### 마. 임대사업자 감면 (Sec 17, p40-42)</p>

      <p>1. <strong>근거</strong>: 지특법 §31, §31의3</p>
      <p>2. 전용면적 <strong>60㎡ 이하</strong>: 취득세 <strong>면제</strong></p>
      <p>3. 전용면적 <strong>60㎡ 초과 ~ 85㎡ 이하</strong>: 취득세 <strong>50% 감면</strong></p>
      <p>4. 임대사업자 등록 및 의무임대기간 충족 등 법정 요건 준수 필요</p>

      <p>#### 바. 토지수용 대체취득 (Sec 18, p43)</p>

      <p>1. <strong>근거</strong>: 지특법 §73</p>
      <p>2. <strong>감면율</strong>: 취득세 <strong>100% 면제</strong></p>
      <p>3. 토지수용으로 인한 대체 부동산 취득 시 적용</p>

      <p>#### 사. 전세사기피해 지원 (Sec 25, p51)</p>

      <p>1. <strong>근거</strong>: 지특법 §36의4</p>
      <p>2. <strong>감면 내용</strong>: 취득세 <strong>200만원 공제</strong></p>
      <p>3. 전세사기 피해자가 대체 주택을 취득하는 경우 적용</p>

      <p>#### 아. 종교시설 면제 (Sec 23, p49)</p>

      <p>1. <strong>근거</strong>: 지특법 §50</p>
      <p>2. <strong>감면율</strong>: 취득세 <strong>100% 면제</strong></p>
      <p>3. 종교단체가 종교 목적으로 직접 사용하기 위한 부동산 취득</p>

      <p>#### 자. 노인복지시설 (Sec 24, p50)</p>

      <p>1. <strong>근거</strong>: 지특법 §20</p>
      <p>2. <strong>무료 노인복지시설</strong>: 취득세 <strong>100% 면제</strong></p>

      <p>#### 차. 지식산업센터 (Sec 27, p54)</p>

      <p>1. <strong>근거</strong>: 지특법 §58②</p>
      <p>2. <strong>최초 분양분</strong>: 취득세 <strong>50% 감면</strong></p>

      <h3 className="text-lg font-semibold mt-6 mb-3">세율표</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>근거법령</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>감면율/세율</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>주요 요건</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>협의이혼 재산분할</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§15①6</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>3.5% → <strong>1.5%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>협의이혼, 시가인정액 적용</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>서민주택 1가구1주택</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지특법 §33②</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>100% 감면</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1억 미만, 40㎡ 이하, 1가구1주택</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>영유아 보육시설</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지특법 §19</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>감면</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>보육시설 목적 취득</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>국가유공자 (85㎡ 이하)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지특법 §29</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>전부 감면</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 이하</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>국가유공자 (85㎡ 초과)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지특법 §29</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>대부금 한도 내</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 초과</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>임대사업자 (60㎡ 이하)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지특법 §31</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>면제</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>임대사업자 등록</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>임대사업자 (60~85㎡)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지특법 §31</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>50% 감면</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>임대사업자 등록</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>토지수용 대체취득</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지특법 §73</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>100% 면제</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>수용에 의한 대체취득</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>전세사기피해 지원</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지특법 §36의4</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>200만원 공제</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>전세사기 피해자</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>종교시설</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지특법 §50</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>100% 면제</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>종교 목적 직접 사용</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>노인복지시설 (무료)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지특법 §20</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>100% 면제</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>무료 노인복지시설</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지식산업센터</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지특법 §58②</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>50% 감면</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>최초 분양분</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>각 감면 항목별 <strong>법정 요건</strong>을 정확히 충족해야 하며, 미충족 시 감면분이 <strong>추징</strong>될 수 있음</li>
        <li>서민주택 감면은 <strong>1가구 1주택</strong> 요건을 반드시 확인 (취득 후 요건 미충족 시 추징)</li>
        <li>임대사업자 감면은 <strong>의무임대기간</strong> 등 사후관리 요건이 있으므로 주의</li>
        <li>협의이혼 재산분할은 <strong>재판상 이혼</strong>에는 적용되지 않음</li>
      </ul>

      </Callout>

      <Callout type="info">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>감면 항목이 <strong>중복</strong>되는 경우 지특법상 중복감면 배제 규정을 확인하여야 함</li>
        <li>각 감면의 <strong>유효기간</strong>(일몰 규정)을 반드시 확인할 것</li>
      </ul>

      </Callout>

      </section>

      <hr className="my-6" />

      <section id="rate-application">

      <h2 id="과세표준-적용-규정-및-부담부증여" className="text-xl font-semibold mt-8 mb-4">과세표준 적용 규정 및 부담부증여</h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>2023년 개정에 따라 무상취득은 시가인정액, 유상취득은 사실상 취득가격을 과세표준으로 적용하며, 부담부증여는 채무액과 증여분을 구분하여 과세한다.</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>유상취득</strong>: 매매, 교환 등으로 부동산을 취득하는 경우</li>
        <li><strong>무상취득</strong>: 상속, 증여 등으로 부동산을 취득하는 경우</li>
        <li><strong>부담부증여</strong>: 채무를 인수하는 조건으로 증여받는 경우</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 과세표준 적용 원칙 (2023년 개정)</p>

      <p>1. <strong>무상취득</strong>: <strong>시가인정액</strong> 원칙</p>
      <p>2. <strong>유상취득</strong>: <strong>사실상 취득가격</strong> 원칙</p>
      <p>3. 시가인정액이 없는 경우 시가표준액 적용</p>

      <p>#### 나. 시가인정액 평가기간</p>

      <p>1. <strong>1순위 (당해 물건 평가기간)</strong>: 취득일 전 <strong>6개월</strong> ~ 취득일 후 <strong>3개월</strong></p>
      <p>2. <strong>유사부동산</strong>: 취득일 전 <strong>1년</strong> ~ <strong>신고일까지</strong></p>
      <p>3. 적용순서:</p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>① 당해 물건 (평가기간 내)</li>
        <li>② 당해 물건 (확장 기간)</li>
        <li>③ 유사 물건 (평가기간 내)</li>
        <li>④ 유사 물건 (확장 기간)</li>
      </ul>

      <p>#### 다. 유사부동산 범위</p>

      <p>1. <strong>동일 단지</strong> 내 소재</p>
      <p>2. 전용면적 차이 <strong>5% 이내</strong></p>
      <p>3. 공동주택가격 차이 <strong>5% 이내</strong></p>
      <p>4. 위 요건을 모두 충족하는 부동산을 유사부동산으로 인정</p>

      <p>#### 라. 가산세</p>

      <p>1. <strong>무신고 가산세</strong>: 신고기한 내 미신고 시</p>
      <p>2. <strong>과소신고 가산세</strong>: 신고세액이 정당세액에 미달하는 경우</p>
      <p>3. <strong>납부불성실 가산세</strong>: 납부기한 경과 후 미납 시</p>

      <p>#### 마. 부담부증여 (Sec 12, p34-35)</p>

      <p>1. <strong>근거</strong>: 지방세법 §7⑫</p>
      <p>2. <strong>채무액 부분</strong>: <strong>유상취득</strong>으로 과세 (매매 세율 적용)</p>
      <p>3. <strong>나머지 부분</strong>: <strong>증여</strong>로 과세 (증여 세율 적용)</p>
      <p>4. <strong>배우자·직계존비속</strong> 간 거래: <strong>증여의제</strong> 적용</p>
      <p>5. 소득증빙을 하지 못하면 <strong>전체를 증여세율</strong>로 과세</p>
      <p>6. 채권액이 시가표준액보다 높으면 <strong>채권액</strong>을 과세표준으로 적용</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">세율표</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>과세표준</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>세율</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>유상취득</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사실상 취득가격</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>일반 세율</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>매매 등</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>무상취득 (상속·증여)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>시가인정액</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>상속·증여 세율</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2023년 개정</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>부담부증여 (채무액 부분)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>채무액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>유상취득 세율</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§7⑫</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>부담부증여 (증여 부분)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가인정액 - 채무액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>증여 세율 (3.5%)</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§7⑫</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>부담부증여 (소득증빙 불가)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>전체</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>증여 세율</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>배우자·직계존비속</td>
      </tr>
      </tbody>
      </table>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>가산세 유형</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>내용</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>무신고</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>신고기한 내 미신고</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>산출세액의 20%</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>과소신고</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>정당세액 미달 신고</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>부족세액의 10%</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>납부불성실</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>납부기한 경과 미납</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>미납세액 × 일수 × 이자율</td>
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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>부담부증여</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§7⑫</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>채무액·증여 구분 과세</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>과세표준 일반</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§10</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>유상·무상 구분</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가인정액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§10의2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>평가기간·적용순서</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>유사부동산</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§10의3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>유사부동산 범위</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가표준액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§10의4</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가인정액 없는 경우</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>무상취득 시 <strong>시가인정액</strong> 적용이 원칙이므로, 시가표준액과 차이가 발생할 수 있음에 유의</li>
        <li>부담부증여에서 배우자·직계존비속 간 거래 시 <strong>증여의제</strong>가 적용되므로 소득증빙이 필수</li>
        <li>소득증빙을 하지 못하면 채무액 부분을 포함하여 <strong>전체를 증여세율</strong>로 과세함</li>
        <li>채권액이 시가표준액보다 높은 경우 <strong>채권액</strong>이 과세표준이 되는 점에 유의</li>
      </ul>

      </Callout>

      <Callout type="info">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>유사부동산 판단 시 <strong>동일 단지</strong>, <strong>전용면적 5% 이내</strong>, <strong>공동주택가격 5% 이내</strong>의 3가지 요건을 모두 충족해야 함</li>
        <li>시가인정액 적용순서를 정확히 파악하여 과세표준을 산정할 것</li>
      </ul>

      </Callout>

      </section>

      <hr className="my-6" />

      <section id="exemption">

      <h2 id="취득세-면세점" className="text-xl font-semibold mt-8 mb-4">취득세 면세점</h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>취득가액 50만원 이하의 취득은 비과세이며, 공동주택 개수(수선) 관련 특례 규정을 통해 소액 취득에 대한 면세점을 규율한다.</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>취득가액이 <strong>50만원 이하</strong>인 모든 취득</li>
        <li><strong>공동주택 개수</strong>(수선)로 인한 취득</li>
        <li>친환경자동차 충전시설의 공동주택 설치</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 취득가액 50만원 이하 비과세</p>

      <p>1. <strong>근거</strong>: 지방세법 §16</p>
      <p>2. 취득가액이 <strong>50만원 이하</strong>인 경우 취득세를 <strong>부과하지 않음</strong></p>
      <p>3. 유상·무상 취득을 불문하고 적용</p>

      <p>#### 나. 공동주택 개수 비과세 (Sec 37, p66)</p>

      <p>1. <strong>근거</strong>: 지방세법 §9①⑥</p>
      <p>2. 시가표준액 <strong>9억원 이하</strong> 주택의 개수(수선)는 <strong>비과세</strong></p>
      <p>3. <strong>대수선</strong>은 비과세 대상에서 <strong>제외</strong> (대수선은 별도 과세)</p>
      <p>4. 공동주택의 공용부분 개수 시에도 적용</p>

      <p>#### 다. 친환경자동차 충전시설</p>

      <p>1. 공동주택에 친환경자동차 충전시설을 설치하는 경우</p>
      <p>2. <strong>세대별 안분</strong>하여 면세점(50만원) 해당 여부를 판단</p>
      <p>3. 세대별 안분 금액이 50만원 이하이면 비과세</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">세율표</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>기준금액</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>과세 여부</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>일반 취득</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>50만원 이하</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>비과세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§16</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>공동주택 개수</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가표준액 <strong>9억원 이하</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>비과세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§9①⑥</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>공동주택 대수선</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>과세</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>비과세 제외</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>충전시설 (세대별 안분)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>50만원 이하</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>비과세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>세대별 안분 기준</td>
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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>면세점</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§16</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득가액 50만원 이하</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>공동주택 개수</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§9①⑥</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>9억원 이하 주택 개수 비과세</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>대수선 정의</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>건축법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§2①9</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>대수선 범위</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>대수선</strong>은 면세점 비과세 대상에서 제외되므로, 개수(수선)와 대수선의 구분이 중요</li>
        <li>대수선의 범위는 <strong>건축법 §2①9</strong>에 따르며, 주요 구조부의 변경 등이 해당</li>
        <li>공동주택 충전시설은 전체 금액이 아닌 <strong>세대별 안분 금액</strong>으로 면세점 여부를 판단해야 함</li>
      </ul>

      </Callout>

      <Callout type="info">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>면세점(50만원)은 <strong>취득가액</strong> 기준이며, 과세표준이 아닌 실제 취득에 소요된 금액으로 판단</li>
        <li>공동주택 개수 비과세는 시가표준액 <strong>9억원 이하</strong> 주택에 한하여 적용됨</li>
      </ul>

      </Callout>

      </section>

      <hr className="my-6" />

      <section id="housing-count">

      <h2 id="주택-수-판단-기준" className="text-xl font-semibold mt-8 mb-4">주택 수 판단 기준</h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>취득세 중과세율 적용을 위한 주택 수 산정 시 분양권·입주권·주거용 오피스텔을 포함하며, 1세대의 범위와 주택 수 제외 특례를 정확히 이해해야 한다.</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>다주택자 <strong>취득세 중과세율</strong> 적용 여부를 판단하기 위한 주택 수 산정</li>
        <li>1세대가 보유한 주택, 분양권, 입주권, 주거용 오피스텔의 합산</li>
        <li>상속주택, 증여주택 등의 특례 적용 여부 판단</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 주택 수에 포함되는 항목</p>

      <p>1. <strong>주택</strong> (등기 완료된 건축물)</p>
      <p>2. <strong>분양권</strong>: 주택 분양 계약에 따른 권리</p>
      <p>3. <strong>입주권</strong>: 재건축·재개발 조합원 입주권</p>
      <p>4. <strong>주거용 오피스텔</strong>: 2020.8.12. 이후 계약분부터 주택 수에 포함</p>

      <p>#### 나. 주택 수에 포함되지 않는 항목</p>

      <p>1. <strong>무허가주택</strong>: 건축법상 허가를 받지 않은 건축물</p>
      <p>2. <strong>준주택</strong>: 주택법상 준주택은 주택 수에 미포함</p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>기숙사</li>
        <li>다중생활시설</li>
        <li>노인복지주택</li>
        <li>오피스텔 (단, 주거용 오피스텔은 2020.8.12. 이후 포함)</li>
      </ul>

      <p>#### 다. 1세대 판단 기준</p>

      <p>1. <strong>세대별 주민등록표</strong>에 기재된 가족을 기준으로 판단</p>
      <p>2. 주민등록표에 미기재되어도 포함되는 경우:</p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>배우자</strong> (별도 세대 구성 시에도 동일 세대로 봄)</li>
        <li><strong>미혼 30세 미만 직계비속</strong></li>
      </ul>
      <p>3. 세대 분리가 인정되는 경우에도 배우자는 항상 동일 세대</p>

      <p>#### 라. 상속주택 특례</p>

      <p>1. 상속으로 취득한 주택은 상속개시일로부터 <strong>5년간</strong> 주택 수에서 <strong>제외</strong></p>
      <p>2. 단, <strong>유상취득</strong>에 한하여 적용 (다른 주택을 유상 취득 시 상속주택을 주택 수에서 제외)</p>
      <p>3. 5년 경과 후에는 주택 수에 포함</p>

      <p>#### 마. 증여주택</p>

      <p>1. 증여로 취득하는 주택은 주택 수 <strong>제외 규정이 없음</strong></p>
      <p>2. 증여 취득 시에는 기존 보유 주택 전체를 주택 수에 포함하여 판단</p>

      <p>#### 바. 오피스텔 주택 수 포함 기준</p>

      <p>1. <strong>2020.8.12. 이후</strong> 취득(계약)분부터 주거용 오피스텔은 주택 수에 포함</p>
      <p>2. 2020.8.12. 이전 계약분은 주택 수에 미포함</p>
      <p>3. 주거용 여부는 <strong>실제 사용 용도</strong>를 기준으로 판단</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">세율표</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>주택 수</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>조정대상지역</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비조정대상지역</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1주택</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1~3%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1~3%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>일반세율</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2주택</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>8%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1~3%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>조정지역 중과</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>3주택</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>12%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>8%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>중과세율</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>4주택 이상</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>12%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>12%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>최고 중과세율</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>법인</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>12%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>12%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택 수 무관</td>
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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택 수 산정</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§13의3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>분양권·입주권·오피스텔 포함</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>다주택 중과</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§13의2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>중과세율 규정</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1세대 범위</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 시행령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>배우자·미혼30세미만 직계비속</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>상속주택 특례</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 시행령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>5년간 주택 수 제외</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>준주택</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>준주택 범위</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>배우자</strong>는 주민등록표 기재 여부와 관계없이 항상 <strong>동일 세대</strong>로 판단되므로, 세대 분리로 주택 수를 줄이는 것이 불가능</li>
        <li><strong>미혼 30세 미만 직계비속</strong>도 별도 세대를 구성하더라도 동일 세대에 포함</li>
        <li><strong>증여</strong>로 주택을 취득하는 경우 상속주택과 달리 <strong>주택 수 제외 규정이 없음</strong>에 유의</li>
        <li>오피스텔의 주택 수 포함 여부는 <strong>계약일(2020.8.12.)</strong> 기준이므로 계약일자 확인 필수</li>
      </ul>

      </Callout>

      <Callout type="info">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>상속주택 5년 제외 특례는 <strong>유상취득</strong> 시에만 적용되며, 무상취득(증여) 시에는 적용되지 않음</li>
        <li>준주택(기숙사, 다중생활시설, 노인복지주택)은 주택 수에 포함되지 않으나, <strong>주거용 오피스텔</strong>은 2020.8.12. 이후 계약분부터 포함됨</li>
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
