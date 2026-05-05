"use client";

import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "판결에 의한 취득시",
  sectionId: "22",
  category: "취득세",
  subcategory: "신고",
  audience: "internal",
  source: "acquisitiontax.pdf",
  pageRange: [48],
  effectiveDate: "2020-08-12",
  lastUpdated: "2026-02-08",
  status: "draft",
  lawReference: "지방세법 시행령 §20②1",
  tags: ["판결","시효취득","취득일","이행판결"],
};

export default function CourtJudgmentV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">15. 판결에 의한 취득시</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>판결에 의한 부동산 취득 시 구비서류, 취득일 판단기준 안내.</p>
      </blockquote>

      <hr className="my-6" />

      <h2 id="1.-구비서류" className="text-xl font-semibold mt-8 mb-4">1. 구비서류</h2>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득세신고서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>판결문 (검인) 및 증빙자료</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>공시송달시 <strong>송달증명원, 확정증명원</strong></td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <h2 id="2.-신고-기준" className="text-xl font-semibold mt-8 mb-4">2. 신고 기준</h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>항목</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>내용</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득원인</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시효취득</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>사유코드</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>27. 판결</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>신고가액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>없음 → <strong>과표로 산출</strong></td>
      </tr>
      <tr style={{backgroundColor: '#fffbe6'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>세율</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#1890ff'}}>3.5%</td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <h2 id="3.-취득일-판단-기준" className="text-xl font-semibold mt-8 mb-4">3. 취득일 판단 기준</h2>

      <Callout type="info">

      <p>판결의 취득일은 <strong>사실상의 잔금지급일</strong> (시행령 §20②1호)</p>

      <p>판결문에 취득의 시기 없는 이행판결은 <strong>취득일자를 신고일자</strong>로 한다.</p>

      </Callout>

      <h3 className="text-lg font-semibold mt-6 mb-3">원인별 취득일</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>원인</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득일</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>증여 원인</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>증여일</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>상속 원인</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>상속개시일 (사망일)</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>매매 원인</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사실상 잔금지급일</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>판결문에 <strong>취득일 확인</strong>이 되면, 해당 날짜가 취득일이며, <strong>부과제척기간 지나면 취득세 부과 못함</strong></li>
        <li><strong>취득시기가 명시되지 않은 판결문</strong> (예: "~까지 원인으로 소유권이전이행하라") → <strong>등기등록일</strong>을 취득일로 한다</li>
      </ul>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 시행령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세법시행령/제20조" target="_blank" rel="noopener noreferrer">§20②1</a></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득시기</td>
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
