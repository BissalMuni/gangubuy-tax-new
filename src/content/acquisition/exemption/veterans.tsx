"use client";

import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "국가유공자 감면",
  sectionId: "16",
  category: "취득세",
  subcategory: "감면",
  audience: "internal",
  source: "acquisitiontax.pdf",
  pageRange: [39],
  effectiveDate: "2020-08-12",
  lastUpdated: "2026-02-08",
  status: "draft",
  lawReference: "지특법 §29",
  tags: ["국가유공자","보훈","감면","대부금"],
};

export default function VeteransV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">11. 국가유공자 감면시</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>국가유공자 및 유족이 대부금으로 주택 취득 시 취득세 감면 안내.</p>
      </blockquote>

      <hr className="my-6" />

      <h2 id="1.-감면대상" className="text-xl font-semibold mt-8 mb-4">1. 감면대상</h2>

      <Callout type="info">

      <p>국가유공자 관련 <strong>4개 법률</strong>에 따라 대부금을 받을 수 있는 자 <strong>(유족도 포함)</strong></p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>국가유공자 등 예우 및 지원에 관한 법률</li>
        <li>보훈보상대상자 지원에 관한 법률</li>
        <li>5.18민주유공자예우에 관한 법률</li>
        <li>특수임무유공자 예우 및 단체설립에 관한 법률</li>
      </ul>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>조세면제증명서, 담보재산증명서<br/>(금융거래확인서)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontSize: '12px'}}>
      국가보훈처 수탁기관에서 발급<br/>
      <p>(현재 <strong>농협, 국민은행</strong>)</p>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>국가유공자증 사본</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>감면신청서 및 취득세신고서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>4</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>매매계약서 및 신고필증</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <h2 id="3.-감면-범위" className="text-xl font-semibold mt-8 mb-4">3. 감면 범위</h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>면적</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>감면범위</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr style={{backgroundColor: '#e6f7ff'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>85㎡ 이하</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#52c41a'}}>전부감면</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      취득세 100%, 농특세 감면<br/>
      <span style={{fontSize: '12px', color: '#8c8c8c'}}>대부금 초과하는 부분 포함</span>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>85㎡ 초과</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#1890ff'}}>대부금 한도 내 감면</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontSize: '12px', color: '#cf1322'}}>
      <p>대부금 초과하는 부분은 <strong>제외</strong></p>
      </td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <h2 id="4.-관련-법령" className="text-xl font-semibold mt-8 mb-4">4. 관련 법령</h2>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세특례제한법/제29조" target="_blank" rel="noopener noreferrer">§29</a></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>국가유공자 감면</td>
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
