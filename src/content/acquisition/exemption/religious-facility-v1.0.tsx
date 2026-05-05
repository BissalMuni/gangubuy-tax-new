"use client";

import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "종교시설 면제",
  sectionId: "23",
  category: "취득세",
  subcategory: "감면",
  audience: "internal",
  source: "acquisitiontax.pdf",
  pageRange: [49],
  version: "1.0",
  effectiveDate: "2020-08-12",
  lastUpdated: "2026-02-08",
  status: "draft",
  lawReference: "지특법 §50",
  tags: ["종교시설","교회","면제","향교","추징"],
};

export default function ReligiousFacilityV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">16. 종교시설 면제</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>종교단체 부동산 취득 시 취득세 면제 요건, 구비서류 및 추징사유 안내.</p>
      </blockquote>

      <hr className="my-6" />

      <h2 id="1.-감면-내용" className="text-xl font-semibold mt-8 mb-4">1. 감면 내용</h2>

      <Callout type="info">

      <p><strong>지특법 §50</strong>: 취득세 <strong>100% 면제</strong>, 최저한세 미적용, 농특세 면제</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>재산세 및 지역자원시설세 면제</strong>: 과세기준일 현재 해당 사업에 직접 사용</li>
        <li>종교단체 또는 향교가 <strong>제3자의 부동산을 무상으로 해당 사업에 사용</strong>하는 경우를 포함</li>
      </ul>

      </Callout>

      <hr className="my-6" />

      <h2 id="2.-구비서류" className="text-xl font-semibold mt-8 mb-4">2. 구비서류</h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '50px'}}>순번</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>서류</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '50px'}}>순번</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>서류</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>1</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>교회회의록, 정관</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>6</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>부동산등기용 등록번호 등록증명서<br/><span style={{fontSize: '11px', color: '#8c8c8c'}}>(구청 문화체육과)</span></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>소속증명서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>7</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>매매계약서</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>대표자증명원</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>8</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>실거래 거래신고필증</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>4</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>직인 인감증명서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>9</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>비과세감면신청서</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>5</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>부동산이용계획서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>10</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득세신고서</td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <h2 id="3.-취득세-추징사유" className="text-xl font-semibold mt-8 mb-4">3. 취득세 추징사유</h2>

      <Callout type="caution">

      <p>다음의 경우 감면받은 취득세가 <strong>추징</strong>됩니다:</p>

      <p>1. 해당 부동산을 취득한 날부터 <strong>5년 이내</strong>에 수익사업에 사용하는 경우</p>
      <p>2. 정당한 사유 없이 그 취득일부터 <strong>3년이 경과</strong>할 때까지 해당 용도로 직접 사용하지 아니하는 경우</p>
      <p>3. 해당 용도로 직접 사용한 기간이 <strong>2년 미만</strong>인 상태에서 매각·증여하거나 다른 용도로 사용하는 경우</p>

      </Callout>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세특례제한법/제50조" target="_blank" rel="noopener noreferrer">§50</a></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>종교단체 면제</td>
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
