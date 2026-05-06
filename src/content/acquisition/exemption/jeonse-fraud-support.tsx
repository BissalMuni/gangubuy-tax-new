"use client";

import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/**
 * meta:
 *   title: "전세사기피해 지원 감면"
 *   sectionId: "25"
 *   category: "취득세"
 *   subcategory: "감면"
 *   audience: "internal"
 *   source: "acquisitiontax.pdf"
 *   pageRange: [51]
 *   effectiveDate: "2023-06-01"
 *   lastUpdated: "2026-02-08"
 *   status: "draft"
 *   lawReference: "지특법 §36조의4"
 *   tags: ["전세사기", "피해자", "감면", "공공주택사업자"]
 */
export default function JeonseFraudSupportV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">전세사기피해 지원 감면</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>전세사기피해자 및 공공주택사업자의 전세사기피해주택 취득 시 감면 안내.</p>
      </blockquote>

      <hr className="my-6" />

      <CalcBox title="■ 감면 내용" id="감면-내용">

      <Insight>

      <p><strong>지특법 §36조의4</strong>: 농특세 일반적용</p>

      </Insight>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>감면 내용</th>
      </tr>
      </thead>
      <tbody>
      <tr style={{backgroundColor: '#f6ffed'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>전세사기피해자가<br/>전세사기피해주택 취득시</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      <strong style={{color: '#52c41a'}}>취득세 200만원 공제</strong><br/><br/>
      <strong>재산세 3년 경감</strong><br/>
      • 60㎡ 이하: 50%<br/>
      • 60㎡ 초과: 25%<br/><br/>
      <strong>등록면허세 면제</strong><br/>
      <p>임차권등기명령의 집행에 따른 임차권등기</p>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>공공주택사업자가<br/>전세사기피해주택 취득시</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      <strong style={{color: '#1890ff'}}>취득세 50% 경감</strong>
      </td>
      </tr>
      </tbody>
      </table>

      </CalcBox>

      <hr className="my-6" />

      <CalcBox title="■ 구비서류" id="구비서류">

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>서류</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>서류</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득세 신고서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>전세사기피해자등 결정통지서<br/><span style={{fontSize: '11px', color: '#8c8c8c'}}>(국토교통부장관)</span></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득세 감면신청서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>전세사기피해자등 결정문</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>매매계약서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세특례제한법/제36조의4" target="_blank" rel="noopener noreferrer">§36조의4</a></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>전세사기피해 지원 감면</td>
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
