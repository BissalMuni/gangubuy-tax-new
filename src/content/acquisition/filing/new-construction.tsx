"use client";

import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "신축건물 신축 보존등기 신고시",
  sectionId: "26",
  category: "취득세",
  subcategory: "신고",
  audience: "internal",
  source: "acquisitiontax.pdf",
  pageRange: [52,53],
  effectiveDate: "2020-08-12",
  lastUpdated: "2026-02-08",
  status: "draft",
  lawReference: "지특법 §31①1",
  tags: ["신축","보존등기","원시취득","도급계약서","건설임대"],
};

export default function NewConstructionV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">18. 신축건물 신축 보존등기 신고시</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>신축건물 보존등기 신고 시 세율, 구비서류 및 신고접수요령 안내.</p>
      </blockquote>

      <hr className="my-6" />

      <h2 id="1.-신축-취득세율" className="text-xl font-semibold mt-8 mb-4">1. 신축 취득세율</h2>

      <Callout type="info">

      <p><strong>신(증)축시 취득세율</strong>: 취득세 2.8% + 지방교육세 0.16% + 농특세 0.2% = <strong>총 3.16%</strong></p>

      <p>→ <strong>다주택자라도 별도세율체계(원시취득) 적용</strong>한다.</p>

      </Callout>

      <hr className="my-6" />

      <h2 id="2.-신고접수요령" className="text-xl font-semibold mt-8 mb-4">2. 신고접수요령</h2>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>사용승인이 접수되면 건물 심으면서 면허세, 세외수입 등 <strong>제비용도 미리 뽑아두자</strong></li>
        <li>도로점용료는 세외수입에서 시공사 법인번호로 조회시 나오는 경우도 있음</li>
        <li>처음 착공시 공문에 도급비, 설계비, 감리비가 기재되어 있는데 이 금액과 취득신고시 도급계약서 등과 달라졌는지 확인</li>
        <li><strong>금액을 더 적게 신고하면 누락신고</strong> → 변경계약서 추가 요구</li>
        <li>신축보존등기 신고시 건물만 신축된 것이니 <strong>건물만 입력</strong>하고 토지는 끌어오면 안됨</li>
        <li>취득신고시 <strong>대지권지분표</strong>도 받아서 [토지물건]에 입력 → 며칠 후 등기 완료되면 등기부등본 열람하여 서로 비교 후 등기된 면적으로 수정 후 <strong>미공시주택가격 산정의뢰</strong></li>
      </ul>

      </Callout>

      <hr className="my-6" />

      <h2 id="3.-신축건물-구비서류" className="text-xl font-semibold mt-8 mb-4">3. 신축건물 구비서류</h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '40px'}}>순번</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>서류</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr style={{backgroundColor: '#fffbe6'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>1</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>도급계약서 (공사비내역서)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}>
      ※ 국민주택 85㎡ 이하는 부가세 없음<br/>
      <p>부가세 붙여오면 <strong>삭제요구</strong></p>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>설계비</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>감리비</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr style={{backgroundColor: '#e6f7ff'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>4</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시설물설치비<br/>(엘리베이터, 난방, 발전기, 전화교환시설 등)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}>
      <strong>기계식주차시설 있는지 확인</strong><br/>
      <p>(가액이 수천만원 이상)</p>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>5</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>전기인입공사비</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>한국전력공사 지급비용</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>6</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>수도인입공사비</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>수도사업소 지급비용</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>7</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>가스인입공사비</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>도시가스주식회사 지급비용</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>8</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>산재보험료, 고용보험료, 국민건강보험료</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr style={{backgroundColor: '#e6f7ff'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>9</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>도로점용료</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      ※ 세무/세외수입시스템에서 출력가능<br/>
      <strong>미리 준비해놓자</strong>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>10</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>등록면허세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>면허분만 받고 <strong>등록분은 제외</strong></td>
      </tr>
      <tr style={{backgroundColor: '#fff2f0'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>11</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>기존건물 철거비 (철거용역비 포함)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}>철거비용이 <strong>몇천만원</strong>이므로 유의</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>12</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>토공사비 (절토, 성토, 굴착, 흙막이 공사 등)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>13</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>가구·새시 등 부착되는 옵션품목 설치비</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>14</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>기타제비용 (추가공사비)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>15</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>기반시설부담금</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>건축면적 200㎡ 초과건물</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>16</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>하수도원인자부담금, 하수처리시설부담금,<br/>광역시설부담금, 기반시설부담금 등</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>17</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>기타 신축관련 공사 제비용 등</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <h2 id="4.-신축-시공자가-개인인-경우" className="text-xl font-semibold mt-8 mb-4">4. 신축 시공자가 개인인 경우</h2>

      <Callout type="info">

      <p>시공자가 개인이라도 기본적으로 위 구비서류로 과세할 수 있으나, 증빙이 어렵다면 <strong>공사비내역서 없이 시가표준액으로 산출</strong>하여 과세할 수 있다.</p>

      </Callout>

      <Callout type="caution">

      <p><strong>다중주택</strong>은 국민주택이 아니므로 신축은 농특세 부가세가 과세되니 <strong>부가세를 빼주지만</strong>, <strong>다가구·다세대</strong>는 부가세가 없음에 유의</p>

      <p>(부가세 붙여오면 빼서 오라고 해야함)</p>

      </Callout>

      <hr className="my-6" />

      <h2 id="5.-신축-건설임대사업자-감면-처리" className="text-xl font-semibold mt-8 mb-4">5. 신축 건설임대사업자 감면 처리</h2>

      <Callout type="info">

      <p><strong>건축(건설)임대사업자 감면</strong> (지특법 §31①1호)</p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>취득세 100% 감면 (최저한 15% 과세)</li>
        <li>농특세 면제</li>
      </ul>

      </Callout>

      <p>감면분과 비감면분의 취득가액을 <strong>면적대비로 안분</strong>하여 각각 과세한다.</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">예시: 15세대 중 5세대는 오피스텔, 10세대는 임대주택일 때</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>처리방법</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>① 오피스텔 5세대</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      신축총공사비 × (5세대전용면적 / 총전용면적)을 신고세액으로 안분<br/>
      <p>건물시가표준액은 건물 중 오피스텔 5개세대만 불러와서 <strong>일반과세</strong></p>
      </td>
      </tr>
      <tr style={{backgroundColor: '#f6ffed'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>② 임대주택 10세대</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      <strong>임대주택감면 85%</strong> (최저한세액) 감면<br/>
      신고세액은 신축총공사비 × (10세대전용면적 / 총전용면적)으로 안분<br/>
      <p>건물시가표준액은 임대주택만 불러와서 <strong>임대주택감면코드</strong> 적용</p>
      </td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <h2 id="6.-qna" className="text-xl font-semibold mt-8 mb-4">6. QnA</h2>

      <details>
      <summary>Q. 건축주 임대 후 분양을 최초분양으로 보아 감면할 수 있는가?</summary>

      <p><strong>대법원 판례 2020두56957 (2021.3.25.)</strong></p>

      <p><strong>요건</strong>: 건축주가 분양을 목적으로 건축한 임대주택을 <strong>분양계약에 따라 최초로 매입</strong>하여 취득해야 함</p>

      <p>→ 임대사업자가 분양계약이 아닌 <strong>매매로 취득한 물건은 최초분양으로 볼 수 없다</strong></p>

      </details>

      <hr className="my-6" />

      <h2 id="7.-관련-법령" className="text-xl font-semibold mt-8 mb-4">7. 관련 법령</h2>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>감면</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세특례제한법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세특례제한법/제31조" target="_blank" rel="noopener noreferrer">§31①1</a></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>건설임대사업자 감면</td>
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
