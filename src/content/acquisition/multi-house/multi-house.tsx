"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/**
 * meta:
 *   title: "다주택자 취득세 중과규정"
 *   sectionId: "02"
 *   category: "취득세"
 *   subcategory: "중과규정"
 *   audience: "internal"
 *   source: "acquisitiontax.pdf"
 *   pageRange: [2, 16]
 *   effectiveDate: "2020-08-12"
 *   lastUpdated: "2026-03-08"
 *   status: "active"
 *   lawReference: "지방세법 §13의2, §13의3, 시행령 §28의2~§28의5"
 *   tags: ["다주택자", "중과", "취득세율표", "주택수산정", "일시적2주택", "조정대상지역"]
 */
export default function MultiHouseV11() {
  return (
    <div className="space-y-6">



      <h1 className="text-2xl font-bold mb-4">다주택자 취득세 중과규정</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>2020.7.10 부동산대책에 따른 다주택자 취득세 중과 규정을 정리한다. v1.1 변경사항: 2025.10.16 조정대상지역 재지정 반영, 2027년 중위소득 기준 갱신, 소형주택 특례 기한 정비</p>
      </blockquote>

      <SectionNav sections={[
      { id: "중과세율", label: "중과세율" },
      { id: "1세대", label: "1세대" },
      { id: "주택수산정", label: "주택수" },
      { id: "일시적2주택", label: "일시적 2주택" },
      { id: "오피스텔", label: "오피스텔" },
      { id: "분양권입주권", label: "분양권·입주권" },
      { id: "경과조치", label: "경과조치" },
      { id: "관련법령", label: "관련 법령" },
      { id: "FAQ", label: "FAQ" }
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 중과세율" id="중과세율">

        <SubSection title="● 중과대상 주택">

          <ul className="list-disc pl-6 my-4 space-y-1">
            <li><strong>주택</strong>: <a href="https://law.go.kr/법령/지방세법/제11조" target="_blank" rel="noopener noreferrer">법 §11①8호</a>에 따른 주택</li>
            <li>주택의 <strong>공유지분</strong>이나 <strong>부속토지</strong>만 취득해도 주택 소유로 봄</li>
            <li><a href="https://law.go.kr/법령/지방세법/제13조의2" target="_blank" rel="noopener noreferrer">법 §13의2①</a></li>
          </ul>

        </SubSection>

        <SubSection title="● 조정대상지역">

          <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '16px'}}>
          <thead>
          <tr>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa', width: '120px'}}>시행일</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa', width: '80px'}}>구분</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>지역</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td rowSpan={3} style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa', verticalAlign: 'top'}}>2025.10.16</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#e6f7ff'}}>서울</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', backgroundColor: '#e6f7ff'}}>전 자치구 (25개구 전체)</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>경기</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>성남(수정·중원·분당구), 수원(장안·팔달·영통구), 안양 동안구, 과천, 광명, 하남, 의왕, 용인 수지구</td>
          </tr>
          <tr>
          <td colSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px', fontSize: '12px', color: '#666'}}>* <a href="https://www.molit.go.kr/USR/BORD0201/m_69/DTL.jsp?mode=view&idx=265746" target="_blank" rel="noopener noreferrer">국토교통부공고 제2025-1223호 (10.15 부동산 대책)</a></td>
          </tr>
          <tr>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa', verticalAlign: 'top'}}>2023.01.05</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>서울</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>강남구, 서초구, 송파구, 용산구 (4개구만 유지)</td>
          </tr>
          <tr>
          <td colSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px', fontSize: '12px', color: '#666'}}>* <a href="https://www.molit.go.kr/USR/I0204/m_45/dtl.jsp?idx=17701" target="_blank" rel="noopener noreferrer">국토교통부공고 제2023-33호</a> - 나머지 전국 조정대상지역 전면 해제</td>
          </tr>
          </tbody>
          </table>

          <Insight>

          <ul className="list-disc pl-6 my-4 space-y-1">
            <li>2025.10.16부터 서울 전역 및 경기 일부 재지정됨에 따라, <strong>조정대상지역 해당 여부를 반드시 확인</strong> 후 세율 적용</li>
          </ul>

          </Insight>

        </SubSection>

        <SubSection title="● 유상취득 - 조정대상지역">

          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px'}}>
          <thead>
          <tr style={{backgroundColor: '#f0f0f0'}}>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>납세자</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>주택수</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>가격</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>면적</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#cf1322'}}>합계</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#1890ff'}}>취득세</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#52c41a'}}>지방교육세</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#fa8c16'}}>농특세</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td rowSpan={6} style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>개인</td>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}>1주택</td>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}>6억원 이하</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 이하</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>1.1%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>1.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.1%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.0%</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 초과</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>1.3%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>1.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.1%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.2%</td>
          </tr>
          <tr>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}>1주택</td>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}>6억원 초과 9억원 이하</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 이하</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>1.1~3.3%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>1.0~3.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.1~0.3%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.0%</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 초과</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>1.3~3.5%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>1.0~3.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.1~0.3%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.2%</td>
          </tr>
          <tr>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}>1주택</td>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}>9억원 초과</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 이하</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>3.3%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>3.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.3%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.0%</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 초과</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>3.5%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>3.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.3%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.2%</td>
          </tr>
          <tr>
          <td rowSpan={4} style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>개인</td>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}>2주택</td>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 이하</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#cf1322'}}>8.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>8.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.0%</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 초과</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#cf1322'}}>9%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>8.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.6%</td>
          </tr>
          <tr>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}>3주택 이상</td>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 이하</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#cf1322'}}>12.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>12.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.0%</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 초과</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#cf1322'}}>13.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>12.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>1.0%</td>
          </tr>

          </tbody>
          </table>

        </SubSection>

        <SubSection title="● 유상취득 - 비조정대상지역">

          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px'}}>
          <thead>
          <tr style={{backgroundColor: '#f0f0f0'}}>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>납세자</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>주택수</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>가격</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>면적</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#cf1322'}}>합계</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#1890ff'}}>취득세</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#52c41a'}}>지방교육세</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#fa8c16'}}>농특세</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td rowSpan={6} style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>개인</td>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}>2주택 이하</td>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}>6억원 이하</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 이하</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>1.1%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>1.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.1%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.0%</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 초과</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>1.3%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>1.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.1%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.2%</td>
          </tr>
          <tr>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}>2주택 이하</td>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}>6억원 초과 9억원 이하</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 이하</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>1.1~3.3%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>1.0~3.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.1~0.3%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.0%</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 초과</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>1.3~3.5%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>1.0~3.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.1~0.3%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.2%</td>
          </tr>
          <tr>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}>2주택 이하</td>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}>9억원 초과</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 이하</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>3.3%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>3.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.3%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.0%</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 초과</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>3.5%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>3.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.3%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.2%</td>
          </tr>
          <tr>
          <td rowSpan={4} style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>개인</td>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}>3주택</td>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 이하</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#cf1322'}}>8.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>8.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.0%</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 초과</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#cf1322'}}>9.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>8.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.6%</td>
          </tr>
          <tr>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}>4주택 이상</td>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 이하</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#cf1322'}}>12.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>12.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.0%</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 초과</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#cf1322'}}>13.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>12.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>1.0%</td>
          </tr>
          </tbody>
          </table>

          <p><strong>관련법률</strong></p>
          <ul className="list-disc pl-6 my-4 space-y-1">
            <li> <a href="https://law.go.kr/법령/지방세법/제13조의2" target="_blank" rel="noopener noreferrer">법 §13의2①2·3호</a></li>
          </ul>

        </SubSection>

        <SubSection title="● 무상취득 - 조정대상지역">

          <p>조정대상지역 소재 시가표준액 <strong>3억원 이상</strong> 주택을 <strong>상속 외</strong> 무상취득(증여 등)하는 경우</p>

          <p><strong>세율</strong></p>
          <p>: 12% (표준세율 + 중과기준세율×400%)</p>


          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '16px'}}>
          <thead>
          <tr style={{backgroundColor: '#f0f0f0'}}>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>납세자</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>면적</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#cf1322'}}>합계</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#1890ff'}}>취득세</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#52c41a'}}>지방교육세</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#fa8c16'}}>농특세</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>개인</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 이하</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#cf1322'}}>12.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>12.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.0%</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 초과</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#cf1322'}}>13.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>12.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>1.0%</td>
          </tr>
          </tbody>
          </table>

          <Insight>
            <strong>판단 기준: 증여자의 주택수</strong><br/>
            무상취득 중과세 여부는 <strong>수증자(취득자)의 주택수가 아니라 증여자의 주택수</strong>를 기준으로 판단합니다. 취득 시점에 증여자가 몇 채를 보유하고 있는지가 중과 적용의 핵심 기준입니다. (<a href="https://law.go.kr/법령/지방세법시행령/제28조의6" target="_blank" rel="noopener noreferrer">시행령 §28조의6②</a>)
          </Insight>

          <p><strong>중과제외 사유</strong> (<a href="https://law.go.kr/법령/지방세법시행령/제28조의6" target="_blank" rel="noopener noreferrer">시행령 §28조의6②</a>)</p>
          <p>1. 1세대1주택자의 배우자·직계존비속이 해당 주택을 무상취득하는 경우</p>
          <p>2. 이혼재산분할 (<a href="https://law.go.kr/법령/지방세법/제15조" target="_blank" rel="noopener noreferrer">법 §15①6호</a>, <a href="https://law.go.kr/법령/민법/제834조" target="_blank" rel="noopener noreferrer">민법 §834·839의2·840</a>)</p>


          <p><strong>관련법률</strong></p>
          <ul className="list-disc pl-6 my-4 space-y-1">
            <li><a href="https://law.go.kr/법령/지방세법/제13조의2" target="_blank" rel="noopener noreferrer">법 §13의2②</a></li>
          </ul>

        </SubSection>

        <SubSection title="● 법인 주택 취득">
          <p>(<a href="https://law.go.kr/법령/지방세법/제13조의2" target="_blank" rel="noopener noreferrer">§13의2①1호</a>)</p>
          <ul className="list-disc pl-6 my-4 space-y-1">
            <li>법인(<a href="https://law.go.kr/법령/국세기본법/제13조" target="_blank" rel="noopener noreferrer">국세기본법 §13</a>에 따른 법인으로 보는 단체, 법인 아닌 사단·재단 포함)이 주택을 취득하는 경우</li>
            <li>조정대상지역 여부와 무관하게 동일 세율 적용</li>
          </ul>

          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '16px'}}>
          <thead>
          <tr style={{backgroundColor: '#f0f0f0'}}>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>납세자</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>면적</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#cf1322'}}>합계</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#1890ff'}}>취득세</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#52c41a'}}>지방교육세</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#fa8c16'}}>농특세</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>법인</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 이하</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#cf1322'}}>12.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>12.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>0.0%</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡ 초과</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#cf1322'}}>13.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>12.0%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>0.4%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16'}}>1.0%</td>
          </tr>
          </tbody>
          </table>

        </SubSection>

      </CalcBox>

      <hr className="my-6" />

      <CalcBox title="■ 1세대" id="1세대">
        <p>(<a href="https://law.go.kr/법령/지방세법시행령/제28조의3" target="_blank" rel="noopener noreferrer">시행령 §28조의3</a>)</p>

        <SubSection title="● 1세대란?">

          <ul className="list-disc pl-6 my-4 space-y-1">
            <li>주택 취득자와 등본(<a href="https://law.go.kr/법령/주민등록법/제7조" target="_blank" rel="noopener noreferrer">주민등록법 §7</a>)에 함께 기재된 <strong>민법상 가족</strong> (동거인 제외)으로 구성된 세대</li>
          </ul>

        </SubSection>

        <SubSection title="● 1세대로 보는 경우 (예외 있음)">

          {/* 배우자 */}
          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '16px'}}>
          <thead>
          <tr style={{backgroundColor: '#1890ff', color: 'white'}}>
          <th colSpan={2} style={{border: '1px solid #d9d9d9', padding: '10px', fontWeight: 'bold', textAlign: 'left'}}>배우자</th>
          </tr>
          </thead>
          <tbody>
          <tr style={{backgroundColor: '#e6f7ff'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', width: '30px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주소 달라도 <strong>1세대</strong></td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#cf1322', fontWeight: 'bold'}}>X</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>단, <strong>사실혼</strong>은 제외</td>
          </tr>
          <tr style={{backgroundColor: '#e6f7ff'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>법률상 이혼했어도 <strong>생계 같이하면</strong> 포함</td>
          </tr>
          </tbody>
          </table>

          {/* 30세 미만 미혼 자녀 */}
          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '16px'}}>
          <thead>
          <tr style={{backgroundColor: '#1890ff', color: 'white'}}>
          <th colSpan={2} style={{border: '1px solid #d9d9d9', padding: '10px', fontWeight: 'bold', textAlign: 'left'}}>30세 미만 미혼 자녀</th>
          </tr>
          </thead>
          <tbody>
          <tr style={{backgroundColor: '#e6f7ff'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', width: '30px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주소 달라도 <strong>1세대</strong></td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#cf1322', fontWeight: 'bold'}}>X</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>단, <strong>소득 있으면</strong> 별도세대 (아래 3가지 모두 충족 시)</td>
          </tr>
          <tr style={{backgroundColor: '#fafafa'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}></td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', paddingLeft: '24px'}}>1) 중위소득 40% 이상</td>
          </tr>
          <tr style={{backgroundColor: '#fafafa'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}></td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', paddingLeft: '24px'}}>2) 독립적 생계 유지</td>
          </tr>
          <tr style={{backgroundColor: '#fafafa'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}></td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', paddingLeft: '24px'}}>3) 미성년자 제외 (성년이어야 함)</td>
          </tr>
          </tbody>
          </table>

        </SubSection>

        <SubSection title="● 중위소득 기준 (보건복지부 고시, 2027년 기준)">

          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '16px'}}>
          <thead>
          <tr style={{backgroundColor: '#f0f0f0'}}>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>1인가구</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>2인가구</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>3인가구</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>4인가구</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>금액(원/월)</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2,640,565</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>4,324,271</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>5,518,507</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>6,688,182</td>
          </tr>
          <tr style={{backgroundColor: '#e6f7ff'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>중위소득40%(월)</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>1,056,226</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>1,729,708</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>2,207,403</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>2,675,273</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>연간소득40%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>12,674,712</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>20,756,500</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>26,488,836</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>32,103,276</td>
          </tr>
          </tbody>
          </table>

          <Insight>

          <ul className="list-disc pl-6 my-4 space-y-1">
            <li>소득확인: 전년도 소득이 있는 자는 소득금액증명원 등으로 확인 (<strong>소득증빙 불가하면 불인정</strong>)</li>
            <li>소득산정기간: 취득일로부터 과거 1년간 소득</li>
            <li>근로소득자는 1년내 소득이 미달시 2년간 소득으로 판단 (조심 2022지0888)</li>
          </ul>

          </Insight>

        </SubSection>

      </CalcBox>

      <hr className="my-6" />

      <CalcBox title="■ 주택수 산정" id="주택수산정">
        <p>(<a href="https://law.go.kr/법령/지방세법/제13조의3" target="_blank" rel="noopener noreferrer">법 §13조의3</a>, <a href="https://law.go.kr/법령/지방세법시행령/제28조의4" target="_blank" rel="noopener noreferrer">시행령 §28조의4</a>)</p>

        <SubSection title="● 주택 수에 가산 (법 §13조의3, 시행령 §28조의4①)">

          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '16px'}}>
          <thead>
          <tr style={{backgroundColor: '#f0f0f0'}}>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>유형</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>기준일</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득일</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>조합원입주권</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>입주권 취득일</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택분양권</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>분양계약일 / 전매 잔금일</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주거용 오피스텔</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득일</td>
          </tr>
          </tbody>
          </table>

          <ul className="list-disc pl-6 my-4 space-y-1">
            <li>2020.8.12일 이후 취득분부터 주택수 적용</li>
            <li>입주권, 분양권, 오피스텔은 8.12일 이후 매매계약을 체결한 경우에 한함 (부칙 제7조)</li>
            <li>신탁주택은 위탁자의 주택 수에 가산</li>
            <li>다가구주택은 <strong>1개</strong>의 주택으로 산정</li>
          </ul>

        </SubSection>

        <SubSection title="● 취득 주택에서 제외 (§28조의4②)">

          <p>아래 주택을 취득하면, 해당 주택은 주택수에 포함하지 않음 (기존 보유 주택만으로 세율 판단)</p>

          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '16px'}}>
          <thead>
          <tr style={{backgroundColor: '#f0f0f0'}}>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>유형</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>조건</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>유효기간</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', verticalAlign: 'top'}}>소형신축주택</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
          - 다가구(건축물대장 호수별 면적 구분), 연립, 다세대, 도시형생활주택<br/>
          - 전용면적 60㎡ 이하<br/>
          - 취득가액: 수도권 외 3억 이하 / 수도권 6억 이하<br/>
          <ul className="list-disc pl-6 my-4 space-y-1">
            <li>준공일: 2024.1.10 ~ 2027.12.31</li>
          </ul>
          </td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', verticalAlign: 'top'}}>~2028.12.31</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', verticalAlign: 'top'}}>소형기축주택</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
          - 다가구(건축물대장 호수별 면적 구분), 연립, 다세대, 도시형생활주택<br/>
          - 전용면적 60㎡ 이하<br/>
          - 취득가액: 수도권 외 3억 이하 / 수도권 6억 이하<br/>
          <ul className="list-disc pl-6 my-4 space-y-1">
            <li>취득일부터 60일 이내 임대등록</li>
          </ul>
          </td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', verticalAlign: 'top'}}>~2028.12.31</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', verticalAlign: 'top'}}>지방 미분양</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
          - 수도권 외 지역<br/>
          - 전용면적 85㎡ 이하<br/>
          <ul className="list-disc pl-6 my-4 space-y-1">
            <li>취득가액 6억원 이하</li>
          </ul>
          </td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', verticalAlign: 'top'}}>~2027.12.31</td>
          </tr>
          </tbody>
          </table>

          <Insight>

          <ul className="list-disc pl-6 my-4 space-y-1">
            <li>임대의무기간 내 등록말소·매각·증여·임대 외 용도 사용 시 <strong>소급 추징</strong></li>
          </ul>

          </Insight>

        </SubSection>

      </CalcBox>

      <hr className="my-6" />

      <CalcBox title="■ 일시적 2주택" id="일시적2주택">
        <p>(<a href="https://law.go.kr/법령/지방세법시행령/제28조의5" target="_blank" rel="noopener noreferrer">시행령 §28의5</a>)</p>

        <SubSection title="● 개요">

          <ul className="list-disc pl-6 my-4 space-y-1">
            <li>종전주택 등을 소유한 1세대가 신규 주택 취득 시, <strong>3년 이내</strong> 종전주택 처분하면 중과세율(8%) 적용 배제</li>
            <li>미신고 후 추후 1주택 매각 시 <strong>경정청구 환급 가능</strong></li>
          </ul>

        </SubSection>

        <SubSection title="● 추징 시 가산세">

          <ul className="list-disc pl-6 my-4 space-y-1">
            <li>8% 적용하여 계산한 세액에서 당초 신고 세액을 차감</li>
            <li><strong>과소신고가산세</strong> (<a href="https://law.go.kr/법령/지방세법시행령/제33조" target="_blank" rel="noopener noreferrer">시행령 §33</a> 계산식) 및 <strong>납부불성실 가산세</strong> (1일 2.5/100,000, <a href="https://law.go.kr/법령/지방세법시행령/제34조" target="_blank" rel="noopener noreferrer">시행령 §34</a>) 합산</li>
            <li>납부불성실 가산세 기산일: 당초 법정신고기한의 다음 날</li>
          </ul>

        </SubSection>

        <SubSection title="● 주의사항">

          <ul className="list-disc pl-6 my-4 space-y-1">
            <li>1억원 이하 주택은 일시적2주택 기준에서 제외</li>
            <li>다주택자는 일시적2주택 해당사항 없음</li>
            <li>종전주택 멸실 시 → 처분으로 인정</li>
            <li>근생으로 용도변경 시 → 처분으로 인정 <strong>안 함</strong></li>
            <li>(22.6.30) 2년으로 변경 → (23.2.28) <strong>3년</strong>으로 변경</li>
          </ul>

        </SubSection>

      </CalcBox>

      <hr className="my-6" />

      <CalcBox title="■ 오피스텔 주택수 포함 여부" id="오피스텔">

        <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '16px'}}>
        <thead>
        <tr style={{backgroundColor: '#f0f0f0'}}>
        <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>항목</th>
        <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>내용</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주거용 오피스텔</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택수 <strong>포함</strong> (2020.8.12 이후 매매계약 체결분부터)</td>
        </tr>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>오피스텔 분양권</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택수 <strong>제외</strong> (용도 미확정)</td>
        </tr>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>저가 오피스텔</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가표준액 1억원 이하 주택수 <strong>제외</strong></td>
        </tr>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득 시 세율</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>건축물 대장상 용도대로 <strong>4%</strong> (중과 안 됨)</td>
        </tr>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>법 시행 전 사무용 → 주거용 전환</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택수 <strong>제외</strong></td>
        </tr>
        </tbody>
        </table>

        <Insight>

        <ul className="list-disc pl-6 my-4 space-y-1">
          <li>주거용 오피스텔은 <strong>중과제외</strong>이나 <strong>주택수 산정에는 포함</strong></li>
        </ul>

        </Insight>

      </CalcBox>

      <hr className="my-6" />

      <CalcBox title="■ 분양권·입주권 취득시점 및 세율적용" id="분양권입주권">

        <SubSection title="● 취득시점">

          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '16px'}}>
          <thead>
          <tr style={{backgroundColor: '#f0f0f0'}}>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>최초취득/승계취득</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득 시점</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>입주권</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>최초 취득 (원조합원)</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>"철거" 시점</strong> (철거 전까지는 '주택'으로 봄)</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>승계 취득 (승계조합원)</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>토지의 잔금 지급일</td>
          </tr>
          <tr>
          <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>분양권</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>최초 취득 (최초 수분양자)</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>분양회사와 수분양자의 <strong>분양계약일</strong></td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>승계 취득</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>분양권의 <strong>잔금 지급일</strong> (전매계약서)</td>
          </tr>
          </tbody>
          </table>

          <Insight>

          <ul className="list-disc pl-6 my-4 space-y-1">
            <li><strong>사용승인(준공) 전</strong> 분양계약 체결한 경우만 분양권에 해당</li>
            <li>30세대 미만 소규모 주택공급(검인대상)은 분양권에 <strong>해당하지 않음</strong> → 일반 매매와 동일 처리</li>
            <li>분양권에 의한 일시적2주택: 종전주택을 신규주택 취득일부터 <strong>3년내</strong> 처분해야 함 (<a href="https://law.go.kr/법령/지방세법시행령/제36조의3" target="_blank" rel="noopener noreferrer">시행령 §36의3②</a>)</li>
          </ul>

          </Insight>

        </SubSection>

      </CalcBox>

      <hr className="my-6" />

      <CalcBox title="■ 경과조치 및 적용례" id="경과조치">
        <p>(<a href="https://law.go.kr/법령/지방세법" target="_blank" rel="noopener noreferrer">부칙 §6, §7</a>)</p>

        <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '16px'}}>
        <thead>
        <tr style={{backgroundColor: '#f0f0f0'}}>
        <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
        <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>내용</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>중과세 일반 경과조치</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>7.10 이전 매매계약자는 시행일(8.12) 이후 취득해도 <strong>종전 세율</strong> 적용</td>
        </tr>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>종전세율</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>6억 이하(1%), 6~9억(1~3%), 9억 초과(3%), 4주택 이상(4%)</td>
        </tr>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>입주권·분양권·오피스텔</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>매매(분양)계약일이 <strong>2020.8.12 이후</strong>부터 주택수 산정</td>
        </tr>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>증빙서류</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>금융거래내역, 부동산 실거래 신고자료, 분양계약서 등</td>
        </tr>
        </tbody>
        </table>

      </CalcBox>

      <hr className="my-6" />

      <CalcBox title="■ 관련 법령" id="관련법령">

        <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '16px'}}>
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
        <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>근거법</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세법/제13조의2" target="_blank" rel="noopener noreferrer">§13의2</a></td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>다주택자 중과세율</td>
        </tr>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세법/제13조의3" target="_blank" rel="noopener noreferrer">§13의3</a></td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>분양권·입주권 주택수 산정</td>
        </tr>
        <tr>
        <td rowSpan={4} style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>시행령</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 시행령</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세법시행령/제28조의2" target="_blank" rel="noopener noreferrer">§28의2</a></td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>중과제외 주택</td>
        </tr>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 시행령</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세법시행령/제28조의3" target="_blank" rel="noopener noreferrer">§28의3</a></td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>세대 기준</td>
        </tr>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 시행령</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세법시행령/제28조의4" target="_blank" rel="noopener noreferrer">§28의4</a></td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택수 산정방법</td>
        </tr>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 시행령</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세법시행령/제28조의5" target="_blank" rel="noopener noreferrer">§28의5</a></td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>일시적 2주택</td>
        </tr>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>부칙</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 부칙</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세법" target="_blank" rel="noopener noreferrer">§6, §7</a></td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>경과조치 및 적용례</td>
        </tr>
        </tbody>
        </table>

      </CalcBox>

      <hr className="my-6" />

      <CalcBox title="■ 자주 묻는 질문" id="FAQ">

        <details>
        <summary>Q. 부부가 공동명의로 주택을 취득하는 경우 주택수 계산은?</summary>

        <ul className="list-disc pl-6 my-4 space-y-1">
          <li>세대 내에서 공동소유하는 경우 '세대'가 1개 주택을 소유하는 것으로 산정</li>
          <li>부부가 공동명의로 주택 1개 보유 → <strong>1세대 1주택</strong></li>
          <li>부부가 2개 주택을 각각 공동명의로 취득 → <strong>1세대 2주택</strong></li>
        </ul>

        </details>

        <details>
        <summary>Q. 부모가 이혼한 경우 30세 미만 자녀가 주택 취득 시 세율은?</summary>

        <ul className="list-disc pl-6 my-4 space-y-1">
          <li>부모가 각각 1주택씩 보유 중, 30세 미만 미혼·소득 없는 자녀가 주택 취득 시 → <strong>12%</strong></li>
          <li>(2021 중과지침 p.119)</li>
        </ul>

        </details>

        <details>
        <summary>Q. 일시적2주택 적용 후 1년 내 종전주택을 멸실한 경우?</summary>

        <ul className="list-disc pl-6 my-4 space-y-1">
          <li>멸실한 경우 → <strong>처분한 것으로 인정</strong></li>
          <li>근생으로 용도변경한 경우 → <strong>처분으로 인정 안 함</strong></li>
        </ul>

        </details>

        <details>
        <summary>Q. 30세 미만 자녀의 독립세대 인정 소득 증빙은?</summary>

        <ul className="list-disc pl-6 my-4 space-y-1">
          <li>취득일로부터 과거 1년간 소득이 중위소득 40% 이상 (2027년 기준 1인가구 약 12,674,712원)</li>
          <li>전년도 소득: 소득금액증명원, 원천징수영수증</li>
          <li>당해 소득: 원천징수지급명세서, 사업자등록증, 재직증명서 등</li>
          <li>월 급여는 기준 이상이나 <strong>연간 소득이 미달</strong>이면 별도세대 불인정</li>
        </ul>

        </details>

      </CalcBox>

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
