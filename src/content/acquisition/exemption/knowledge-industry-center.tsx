"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/**
 * meta:
 *   title: "지식산업센터 최초분양감면"
 *   sectionId: "27"
 *   category: "취득세"
 *   subcategory: "감면"
 *   audience: "internal"
 *   source: "acquisitiontax.pdf"
 *   pageRange: [54]
 *   effectiveDate: "2020-08-12"
 *   lastUpdated: "2026-02-08"
 *   status: "draft"
 *   lawReference: "지특법 §58②"
 *   tags: ["지식산업센터", "최초분양", "감면", "재산세"]
 */
export default function KnowledgeIndustryCenterV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">지식산업센터 최초분양감면시</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>지식산업센터 최초분양 시 취득세 감면 요건, 구비서류 및 재산세 대장정리방법 안내.</p>
      </blockquote>

      <hr className="my-6" />

      <CalcBox title="■ 감면 내용" id="감면-내용">

      <Insight>

      <p><strong>지특법 §58②</strong>: 취득세 <strong>50% 감면</strong></p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>최초분양만 감면</strong>됨</li>
        <li>농특세 취득분의 10% 적용</li>
      </ul>

      </Insight>

      </CalcBox>

      <hr className="my-6" />

      <CalcBox title="■ 구비서류" id="구비서류">

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>서류</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득세 신고서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>감면 신청서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>구청비치서식</td>
      </tr>
      <tr style={{backgroundColor: '#fffbe6'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>부동산이용계획서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      해당호실에서 영위할 업종 <strong>구체적으로 표시</strong><br/>
      법인대표 또는 재무담당 서명 후 법인도장 날인<br/>
      <span style={{color: '#cf1322'}}>(대리인등 제3자 작성 불가)</span>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>분양계약서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      검인필<br/>
      <p>준공이후 분양분은 <strong>실거래가신고필증</strong> 첨부</p>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>입금확인서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}>
      <p>연체금이 있는 경우 <strong>취득가액에 포함</strong>됨 (법인만 해당)</p>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>사업자등록증 사본</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>업종 확인</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>공장배치도</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>감면호실내 제조설비, 작업실, 회의실 위치등 간략하게 표시</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>입주계약서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      산업단지관리공단에서 받음<br/>
      <strong>감면업종코드 확인</strong>
      </td>
      </tr>
      </tbody>
      </table>

      </CalcBox>

      <hr className="my-6" />

      <CalcBox title="■ 지센감면 재산세 대장정리방법" id="지센감면-재산세-대장정리방법">

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>코드</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>처리방법</th>
      </tr>
      </thead>
      <tbody>
      <tr style={{backgroundColor: '#f6ffed'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>재산코드</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>최초분양입주자 <strong>37.5% 감면</strong></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>도시코드</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>일반과세</td>
      </tr>
      <tr style={{backgroundColor: '#fff2f0'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>공동코드</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>11층 이상 화재위험건물은 <strong>1층부터 전부 3배 중과</strong></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>토지코드</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontSize: '12px'}}>
      도로를 제외한 전체면적에서 감면면적은 37.5% 면적을 안분해서 최초분양 감면코드 입력<br/>
      현황지목은 공장이나 사무실로 두고 토지형태는 <strong>0513 감면</strong>하고<br/>
      <p>과세면적부분은 안분해서 과세면적으로 두고 토지형태는 <strong>0301(기준면적내 공장용지) 분리과세</strong> 입력</p>
      </td>
      </tr>
      </tbody>
      </table>

      </CalcBox>

      <hr className="my-6" />

      <CalcBox title="■ 관련 법령" id="관련-법령">

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세특례제한법/제58조" target="_blank" rel="noopener noreferrer">§58②</a></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지식산업센터 감면</td>
      </tr>
      </tbody>
      </table>

      </CalcBox>

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
