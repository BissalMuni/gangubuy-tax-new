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

        <SubSection title="● 중위소득 기준 (보건복지부 고시)">

          <p style={{fontSize: '13px', marginBottom: '8px'}}>
            출처: <a href="https://www.mohw.go.kr/menu.es?mid=a10708010900" target="_blank" rel="noopener noreferrer" style={{color: '#1890ff'}}>보건복지부 고시 (기준 중위소득)</a> (2026년 기준)
          </p>

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
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2,564,238</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>4,199,292</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>5,359,036</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>6,494,738</td>
          </tr>
          <tr style={{backgroundColor: '#e6f7ff'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>중위소득40%(월)</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>1,025,695</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>1,679,717</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>2,143,614</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>2,597,895</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>연간소득40%</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>12,308,340</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>20,156,604</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>25,723,368</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>31,174,740</td>
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

          <Insight>

          <p style={{fontWeight: 'bold', marginBottom: '10px'}}>조심 2022지0888 결정 핵심 정리</p>

          <p style={{fontWeight: 'bold', marginTop: '12px', marginBottom: '6px'}}>① 사건 개요</p>
          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '12px'}}>
          <thead>
          <tr style={{backgroundColor: '#f0f0f0'}}>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '100px'}}>항목</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>내용</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득일</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2021.10.29.</td>
          </tr>
          <tr style={{backgroundColor: '#fafafa'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득 물건</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>다세대주택 지하층 101호 (52.98㎡)</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>청구인</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1997년생, 30세 미만 미혼, 부모와 별도 주민등록</td>
          </tr>
          <tr style={{backgroundColor: '#fafafa'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>문제</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>모친이 1주택 보유 → 청구인과 동일세대로 보면 2주택 중과 해당</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>처분</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>중과세율 8% 적용, 취득세 등 부과</td>
          </tr>
          <tr style={{backgroundColor: '#fafafa'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>결정</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#cf1322'}}>취소</td>
          </tr>
          </tbody>
          </table>

          <p style={{fontWeight: 'bold', marginTop: '12px', marginBottom: '6px'}}>② 쟁점</p>
          <p style={{marginBottom: '6px'}}>청구인의 소득이 기준 중위소득 40% 이상인지 — 즉 <strong>비과세 기타소득을 소득에 포함할 수 있는가</strong></p>
          <ul className="list-disc pl-6 my-2 space-y-1">
            <li>청구인은 연구용역비를 비과세 기타소득으로 원천징수 신고됨</li>
            <li>소득금액증명원에 해당 금액이 나타나지 않음</li>
            <li>처분청은 이를 제외하면 기준 미달이라고 판단 → 부모와 동일세대 → 중과</li>
          </ul>

          <p style={{fontWeight: 'bold', marginTop: '12px', marginBottom: '6px'}}>③ 적용 법령 (취득일 기준)</p>
          <p style={{marginBottom: '6px'}}>시행령 제28조의3 제2항 제1호 (2020.8.12. 신설, 취득일 당시 유효)</p>
          <ul className="list-disc pl-6 my-2 space-y-1">
            <li>부모와 세대를 달리하는 30세 미만 자녀로서</li>
            <li>「소득세법」제4조에 따른 소득이 기준 중위소득의 100분의 40 이상이고</li>
            <li>독립된 생계를 유지할 수 있는 경우 → 별도세대</li>
          </ul>
          <p style={{marginTop: '6px'}}>핵심: 당시 규정에는 소득 판단 기간(12개월/24개월) 및 <strong>비과세소득 제외 규정이 없었음</strong></p>

          <p style={{fontWeight: 'bold', marginTop: '12px', marginBottom: '6px'}}>④ 결정 논리</p>
          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '12px'}}>
          <thead>
          <tr style={{backgroundColor: '#f0f0f0'}}>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '60px'}}>단계</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>내용</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>①</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득일 당시 규정은 &quot;소득세법 제4조에 따른 소득&quot;이라고만 규정</td>
          </tr>
          <tr style={{backgroundColor: '#fafafa'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>②</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>소득세법 제4조는 소득의 <strong>구분(종합·퇴직·양도)</strong>만 규정할 뿐, 비과세소득 제외 여부는 규정하지 않음</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>③</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>따라서 비과세소득도 광의의 소득으로 포함된다고 해석</td>
          </tr>
          <tr style={{backgroundColor: '#fafafa'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>④</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>이후 2021.12.31. 개정 + 2022.1.1. 행안부 고시에서 비로소 비과세소득 제외 명시 → 이전과 다른 내용으로 개정된 것</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>⑤</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>비과세소득 포함 시 청구인의 소득은 기준 중위소득 40% 이상 → 별도세대 요건 충족</td>
          </tr>
          <tr style={{backgroundColor: '#fafafa'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>⑥</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}>중과세율 적용은 잘못 → 취소</td>
          </tr>
          </tbody>
          </table>

          <p style={{fontWeight: 'bold', marginTop: '12px', marginBottom: '6px'}}>⑤ 개정 전후 비교</p>
          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '12px'}}>
          <thead>
          <tr style={{backgroundColor: '#f0f0f0'}}>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구 규정 (～2021.12.30.)</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>현행 (2022.1.1.～)</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>소득 정의</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>소득세법 제4조에 따른 소득</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>행정안전부장관이 정하는 소득</td>
          </tr>
          <tr style={{backgroundColor: '#fafafa'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>소득 기간</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>규정 없음</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득일 직전 12개월</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>기간 예외</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>없음</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>일시적 휴직·휴업 시 24개월</td>
          </tr>
          <tr style={{backgroundColor: '#fafafa'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>비과세소득</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>제외 근거 없음 → <strong>포함 해석</strong></td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>명시적으로 제외</td>
          </tr>
          </tbody>
          </table>

          <p style={{fontWeight: 'bold', marginTop: '12px', marginBottom: '6px'}}>⑥ 이 결정이 말해주는 것 / 말해주지 않는 것</p>
          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '4px'}}>
          <thead>
          <tr style={{backgroundColor: '#f0f0f0'}}>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>항목</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>내용</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>✅ 이 결정의 선례 가치</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>구 규정(～2021.12.30.) 적용 사건에서 비과세소득 포함 해석</td>
          </tr>
          <tr style={{backgroundColor: '#fafafa'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}>❌ 이 결정과 무관한 것</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>현행 24개월 예외 규정의 근거 — 취득일 이후에 만들어진 규정이므로 전혀 별개</td>
          </tr>
          </tbody>
          </table>

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

          <p className="text-sm text-muted mt-2">근거: <a href="https://law.go.kr/법령/지방세법/제13조의3" target="_blank" rel="noopener noreferrer">법 §13조의3</a>, <a href="https://law.go.kr/법령/지방세법시행령/제28조의4" target="_blank" rel="noopener noreferrer">시행령 §28조의4①</a></p>

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

        <SubSection title="● 보유 주택에서 제외 (§28조의4⑥)">

          <p>기존 소유주택 수에서 제외</p>

          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '16px'}}>
          <thead>
          <tr style={{backgroundColor: '#f0f0f0'}}>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '60px'}}>호</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>유형</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>조건/비고</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1호</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>중과제외 주택 일부</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세법시행령/제28조의2" target="_blank" rel="noopener noreferrer">§28조의2</a> 1·3·4·5·6·11·12·17·18호</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2호</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택건설/개발업자 신축 보유</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>거주 1년 미만</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>3호</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>상속주택</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>상속개시일로부터 <strong>5년 이내</strong></td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>4호</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1억 이하 오피스텔</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가표준액 기준</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>5호</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1억 이하 부속토지</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가표준액 기준</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>6호</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>혼인 특례</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>혼인 전 분양권 → 배우자 혼인 전 주택</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>7호</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>②항 소형주택</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>위 소형주택 해당</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>8호</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>소형신축오피스텔</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>60㎡↓, 3억/6억↓</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>9호</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>소형기축오피스텔</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>60㎡↓, 3억/6억↓, 임대등록</td>
          </tr>
          </tbody>
          </table>

          <p><strong>§28조의2 중과제외 주택 참고</strong> (주택수 제외 가능: 1·3·4·5·6·11·12·17·18호)</p>

          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '16px'}}>
          <thead>
          <tr style={{backgroundColor: '#f0f0f0'}}>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '60px'}}>호</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>유형</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '100px', textAlign: 'center'}}>주택수 제외</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>저가주택 (수도권 1억↓ / 비수도권 2억↓)</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#1890ff'}}>✓</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>공공매입임대주택 공급목적</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>✗</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2의2~3</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지분적립형·이익공유형 환매 / 현물보상</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>✗</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>3</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>노인복지주택</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#1890ff'}}>✓</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>3의2</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>도시재생 현물보상 주택</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>✗</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>4</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>문화유산 주택 (지정·등록·천연기념물)</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#1890ff'}}>✓</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>5</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>공공지원민간임대주택</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#1890ff'}}>✓</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>6</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>가정어린이집</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#1890ff'}}>✓</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>7</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택도시기금+LH 부동산투자회사</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>✗</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>8</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>멸실목적 취득 (주택건설사업)</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>✗</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>9</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시공자 공사대금 미분양주택</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>✗</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>10</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>저당권실행·채권변제 취득</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>✗</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>11</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>농어촌주택</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#1890ff'}}>✓</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>12</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사원임대용 주택 (60㎡↓)</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#1890ff'}}>✓</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>13</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>물적분할·적격분할·법인합병 취득</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>✗</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>14</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>리모델링주택조합</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>✗</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>15</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>토지임대부 분양주택 관련</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>✗</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>16</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>기업구조조정 부동산투자회사 지방 미분양</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>✗</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>17</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방 미분양 아파트 (수도권外, 85㎡↓, 6억↓, &apos;26년)</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#1890ff'}}>✓</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>18</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>인구감소지역 임대주택 (&apos;26년)</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#1890ff'}}>✓</td>
          </tr>
          </tbody>
          </table>

          <Insight>

          <ul className="list-disc pl-6 my-4 space-y-1">
            <li>1억 이하라도 정비구역(도시 및 주거환경정비법), 사업시행구역(빈집 및 소규모주택 정비법)은 <strong>중과 적용</strong></li>
            <li>공동 상속 시 지분 최대 상속인의 소유주택으로 판단 (지분 동일 시 거주자 → 최연장자 순)</li>
          </ul>

          </Insight>

        </SubSection>

        <SubSection title="● 중과제외주택 vs 주택수합산배제 대상주택 구분">

          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
          <thead>
          <tr style={{backgroundColor: '#f0f0f0'}}>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '160px'}}>구분</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>중과제외주택<br/>(<a href="https://law.go.kr/법령/지방세법시행령/제28조의2" target="_blank" rel="noopener noreferrer">시행령 §28조의2</a>)</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>주택수합산배제 대상주택<br/>(<a href="https://law.go.kr/법령/지방세법시행령/제28조의4" target="_blank" rel="noopener noreferrer">시행령 §28조의4⑥</a>)</th>
          </tr>
          </thead>
          <tbody>
          <tr style={{backgroundColor: '#e6f7ff'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>의미</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>해당 주택 <strong>취득 시</strong> 중과세율 적용 배제 → <strong>일반세율</strong> 적용</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>보유 주택수 산정에서 <strong>제외</strong> → 다른 주택 취득 시 주택수에 불산입</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>효과</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>해당 주택 자체의 세율만 낮아짐</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>다른 주택 취득 시에도 주택수에서 빠지므로 <strong>전체 세율에 영향</strong></td>
          </tr>
          <tr style={{backgroundColor: '#e6f7ff'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>적용 범위</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§28조의2 전체 (1~18호)</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§28조의2 중 <strong>일부</strong> (1·3·4·5·6·11·12·17·18호)만 해당</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>포함관계</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>중과제외이나 주택수에는 <strong>포함</strong>되는 유형 있음<br/>(예: 멸실목적 취득, 저당권실행 등)</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택수합산배제이면 반드시 <strong>중과제외</strong>에도 해당</td>
          </tr>
          </tbody>
          </table>

          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
          <thead>
          <tr style={{backgroundColor: '#f0f0f0'}}>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>유형 (§28조의2)</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '100px', textAlign: 'center'}}>중과제외</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '100px', textAlign: 'center'}}>주택수 제외</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '200px'}}>실무 포인트</th>
          </tr>
          </thead>
          <tbody>
          <tr style={{backgroundColor: '#e6f7ff'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1호 저가주택 (수도권 1억↓ / 비수도권 2억↓)</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득·보유 모두 주택수 불산입</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2호 공공매입임대 공급목적</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#cf1322', fontWeight: 'bold'}}>X</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득 시만 중과배제, 주택수 산입</td>
          </tr>
          <tr style={{backgroundColor: '#e6f7ff'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>3호 노인복지주택</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득·보유 모두 주택수 불산입</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>4호 문화유산 주택</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득·보유 모두 주택수 불산입</td>
          </tr>
          <tr style={{backgroundColor: '#e6f7ff'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>5호 공공지원민간임대</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득·보유 모두 주택수 불산입</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>6호 가정어린이집</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득·보유 모두 주택수 불산입</td>
          </tr>
          <tr style={{backgroundColor: '#e6f7ff'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>8호 멸실목적 취득</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#cf1322', fontWeight: 'bold'}}>X</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득 시만 중과배제, 주택수 산입</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>10호 저당권실행·채권변제</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#cf1322', fontWeight: 'bold'}}>X</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득 시만 중과배제, 주택수 산입</td>
          </tr>
          <tr style={{backgroundColor: '#e6f7ff'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>11호 농어촌주택</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득·보유 모두 주택수 불산입</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>12호 사원임대용 (60㎡↓)</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득·보유 모두 주택수 불산입</td>
          </tr>
          <tr style={{backgroundColor: '#e6f7ff'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>13호 물적분할·법인합병</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#cf1322', fontWeight: 'bold'}}>X</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득 시만 중과배제, 주택수 산입</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>17호 지방 미분양</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득·보유 모두 주택수 불산입</td>
          </tr>
          <tr style={{backgroundColor: '#e6f7ff'}}>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>18호 인구감소지역 임대</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center', color: '#52c41a', fontWeight: 'bold'}}>O</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득·보유 모두 주택수 불산입</td>
          </tr>
          </tbody>
          </table>

          <Insight>

          <ul className="list-disc pl-6 my-4 space-y-1">
            <li><strong>중과제외(§28조의2)</strong>: 18개 유형 모두 해당 주택 취득 시 중과세율 적용 배제</li>
            <li><strong>주택수합산배제(§28조의4⑥1호)</strong>: 위 중과제외 중 <strong>1·3·4·5·6·11·12·17·18호</strong>만 보유 주택수에서도 제외</li>
            <li>중과제외이지만 주택수에는 산입되는 유형(2·7~10·13~16호)은 <strong>다른 주택 취득 시 주택수에 포함</strong>되어 세율에 영향</li>
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
          <li>취득일로부터 과거 1년간 소득이 중위소득 40% 이상 (2026년 기준 1인가구 약 12,308,340원)</li>
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
