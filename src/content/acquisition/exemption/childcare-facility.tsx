"use client";

import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "영유아 보육시설 감면",
  sectionId: "15",
  category: "취득세",
  subcategory: "감면",
  audience: "internal",
  source: "acquisitiontax.pdf",
  pageRange: [38],
  effectiveDate: "2020-08-12",
  lastUpdated: "2026-02-08",
  status: "draft",
  lawReference: "지특법 §19",
  tags: ["영유아","보육시설","감면","어린이집"],
};

export default function ChildcareFacilityV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">10. 영유아 보육시설 감면시</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>영유아 보육시설(어린이집) 취득 시 취득세 감면 신청에 필요한 구비서류 안내.</p>
      </blockquote>

      <hr className="my-6" />

      <h2 id="1.-법적-근거" className="text-xl font-semibold mt-8 mb-4">1. 법적 근거</h2>

      <Callout type="info">

      <p><strong>지방세특례제한법 §19</strong>: 영유아 보육시설 등에 대한 감면</p>

      </Callout>

      <hr className="my-6" />

      <h2 id="2.-구비서류" className="text-xl font-semibold mt-8 mb-4">2. 구비서류</h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '50px'}}>순번</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>서류</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>1</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>감면신청서 및 취득세신고서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>보육시설인가증</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}>
      설치운용자와 부동산소유자 일치<br/>
      <strong>대표자 = 취득자</strong>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>부동산이용계획서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>도장날인 필수</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>4</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>매매계약서 + 신고필증</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <h2 id="3.-관련-법령" className="text-xl font-semibold mt-8 mb-4">3. 관련 법령</h2>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세특례제한법/제19조" target="_blank" rel="noopener noreferrer">§19</a></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>영유아 보육시설 감면</td>
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
