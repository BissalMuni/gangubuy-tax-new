"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";
import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "증축과 대수선의 차이점, 그리고 개수",
  sectionId: "37",
  category: "취득세",
  subcategory: "증축/대수선",
  audience: "internal",
  source: "acquisitiontax.pdf",
  pageRange: [65,66],
  version: "1.0",
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-04-10",
  status: "draft",
  lawReference: "지방세법 제9조①항⑥호, 시행령 제12조의2",
  tags: ["증축","대수선","개수","공동주택","충전시설","비과세"],
};

export default function ExtensionVsMajorRepairV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">증축과 대수선의 차이점, 그리고 개수</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>증축, 대수선, 개수의 정의와 과세 방법 및 공동주택 개수 비과세 기준 안내</p>
      </blockquote>

      <SectionNav sections={[
      { id: "정의비교", label: "정의 비교" },
      { id: "과세방법", label: "과세 방법" },
      { id: "개수", label: "개수" },
      { id: "공동주택비과세", label: "공동주택 비과세" },
      { id: "충전시설", label: "충전시설" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="정의비교">
      <Outline level={1}>정의 비교</Outline>
      </h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '100px'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>대수선 (25%)</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>증축</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>정의</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>건축물의 <strong>기둥, 보, 내력벽, 주계단</strong> 등의 구조나 외부 형태를 수선·변경하거나 증설하는 것으로 증축·개축 또는 재축에 해당하지 않는 것</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>기존 건축물이 있는 대지에서 건축물의 <strong>건축면적, 연면적, 층수 또는 높이</strong>를 늘리는 것</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>신고방식</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>허가 ○ (신고 X)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>허가</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>잔가율</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}>경과연수에 따른 잔가율 <strong>적용하지 않는다는 행안부 해석</strong>이 있음<br/>(<a href="https://www.olta.re.kr/explainInfo/authoInterpretationDetail.do?num=60083622" target="_blank" rel="noopener noreferrer">행안부 해석</a>)<br/>※ 지방세 시가표준액 조사산정 업무요령에는 잔가율 미적용 내용 없음</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>비고</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>전체면적이 과표에 포함되어 시가표준액이 높아짐</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>증축이 대수선보다 큰 건축개념이나, 과표는 작아 법인시공가격이 상대적으로 큼</td>
      </tr>
      </tbody>
      </table>

      <SectionNav sections={[
      { id: "정의비교", label: "정의 비교" },
      { id: "과세방법", label: "과세 방법" },
      { id: "개수", label: "개수" },
      { id: "공동주택비과세", label: "공동주택 비과세" },
      { id: "충전시설", label: "충전시설" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="과세방법">
      <Outline level={1}>과세 방법</Outline>
      </h2>

      <Outline level={2}>대수선 과세</Outline>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>착공신고서</strong>에 설계, 시공, 감리 가격 기재됨</li>
        <li><strong>60일 이내</strong> 신고안내</li>
        <li>법인시공의 경우 법인장부 가격 인정하나 대부분 <strong>과표로 과세</strong></li>
        <li><strong>법인시공비율 90% 이상</strong>이어야 가격 인정</li>
      </ul>

      <Outline level={2}>증축 과세</Outline>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>법인시공의 경우 <strong>착공신고서 첨부서류</strong>에 설계·시공·감리의 도급금액 기재</li>
        <li>도서검토 → 기본설계도서 → 일반문서에 <strong>계약서</strong> 포함</li>
        <li>추가된 비용은 <strong>별도로</strong> 받음</li>
      </ul>

      <Outline level={2}>시스템 입력 방법</Outline>

      <p><strong>대수선 신고입력:</strong></p>
      <p>1. 취득원인: <strong>개수</strong></p>
      <p>2. 사유코드: <strong>대수선</strong></p>
      <p>3. 건물가격 <strong>전체선택</strong> 후 대수선지수 <strong>일괄적용</strong></p>
      <p>4. 신고가격과 비교</p>
      <p>5. 법인은 법인장부가격 90% 이상일 때 취득가격 인정 가능</p>

      <p><strong>증개축 입력:</strong></p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>증개축은 건드리지 말고 <strong>대수선지수만</strong> 대수선허가로 변경하여 <strong>일괄적용</strong></li>
      </ul>

      <SectionNav sections={[
      { id: "정의비교", label: "정의 비교" },
      { id: "과세방법", label: "과세 방법" },
      { id: "개수", label: "개수" },
      { id: "공동주택비과세", label: "공동주택 비과세" },
      { id: "충전시설", label: "충전시설" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="개수">
      <Outline level={1}>개수</Outline>
      </h2>

      <Outline level={2}>정의</Outline>

      <p><strong>'개수'</strong>란 건축물을 대수선하거나 건축물에 포함되는 시설 등을 수선하거나 건축물에 딸린 시설물 등을 설치·수선하는 것</p>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>항목</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>내용</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득세율</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff', fontWeight: 'bold'}}>2%</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>건축물 포함 시설*</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>레저시설, 저장시설, 도크시설, 접안시설, 도관시설, 급수·배수시설, 에너지 공급시설 등</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>건축물 딸린 시설물**</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>승강기, 발전시설(20KW이상), 열공급시설, 중앙조절식 에어컨, 금고, 교환시설 등</td>
      </tr>
      </tbody>
      </table>

      <SectionNav sections={[
      { id: "정의비교", label: "정의 비교" },
      { id: "과세방법", label: "과세 방법" },
      { id: "개수", label: "개수" },
      { id: "공동주택비과세", label: "공동주택 비과세" },
      { id: "충전시설", label: "충전시설" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="공동주택비과세">
      <Outline level={1}>공동주택 개수 취득세 비과세</Outline>
      </h2>

      <Outline level={2}>비과세 요건</Outline>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>요건</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>내용</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>대상</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>「주택법」 제2조제3호에 따른 <strong>공동주택</strong>의 개수</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>시가표준액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff', fontWeight: 'bold'}}>9억원 이하</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>제외</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}>「건축법」 제2조제1항제9호에 따른 <strong>대수선은 제외</strong></td>
      </tr>
      </tbody>
      </table>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>근거: <a href="https://law.go.kr/법령/지방세법/제9조" target="_blank" rel="noopener noreferrer">지방세법 제9조(비과세)①항⑥호</a> 및 시행령 제12조의2</li>
      </ul>

      <SectionNav sections={[
      { id: "정의비교", label: "정의 비교" },
      { id: "과세방법", label: "과세 방법" },
      { id: "개수", label: "개수" },
      { id: "공동주택비과세", label: "공동주택 비과세" },
      { id: "충전시설", label: "충전시설" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="충전시설">
      <Outline level={1}>친환경자동차 충전시설 설치신고</Outline>
      </h2>

      <Outline level={2}>과세 기준</Outline>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득 유형</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>공동주택 설치시</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>신규설치</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>'취득'</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>과세대상</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>수선</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>'개수'</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>비과세 (대수선 제외)</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>대수선</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}>과세</td>
      </tr>
      </tbody>
      </table>

      <Outline level={2}>면세점 기준 적용 (2020.3.9. 행안부 적용요령통보)</Outline>

      <p>공동주택의 공용시설로서 충전시설을 설치한 경우:</p>

      <p>1. 공동주택 세대별 소유자의 <strong>공용면적 소유비율</strong>에 따라 안분</p>
      <p>2. <strong>세대별 취득가액</strong>이 면세점 기준 <strong>50만원</strong>에 부합하는지 판단</p>

      <Callout type="info">
      <p>(지방세운영과-3555, 2010.8.13.) 아파트 단지 일부 동 승강기 개수시 전체 아파트 단지의 승강기 개수로 볼 수 없고, 해당 동 아파트 소유자가 각자 소유한 <strong>공용부분 면적의 비율</strong>에 따라 취득세를 납부하는 것이 타당</p>
      </Callout>

      <SectionNav sections={[
      { id: "정의비교", label: "정의 비교" },
      { id: "과세방법", label: "과세 방법" },
      { id: "개수", label: "개수" },
      { id: "공동주택비과세", label: "공동주택 비과세" },
      { id: "충전시설", label: "충전시설" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="주의사항">
      <Outline level={1}>주의사항</Outline>
      </h2>

      <Callout type="caution">
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>대수선</strong> 시 <strong>신축연도를 재계산</strong>하여 변경입력 (시가표준액책자 p25 참조)</li>
        <li>대수선은 경과연수에 따른 <strong>잔가율 적용하지 않는다는 행안부 해석</strong>이 있음 (단, 지방세 시가표준액 조사산정 업무요령에는 잔가율 미적용 내용 없음)</li>
        <li>법인시공비율 <strong>90% 이상</strong>이어야 법인장부가격 인정</li>
        <li>공동주택 충전시설 설치시 <strong>세대별 취득가액</strong> 면세점(50만원) 확인 필수</li>
      </ul>
      </Callout>

      <SectionNav sections={[
      { id: "정의비교", label: "정의 비교" },
      { id: "과세방법", label: "과세 방법" },
      { id: "개수", label: "개수" },
      { id: "공동주택비과세", label: "공동주택 비과세" },
      { id: "충전시설", label: "충전시설" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
