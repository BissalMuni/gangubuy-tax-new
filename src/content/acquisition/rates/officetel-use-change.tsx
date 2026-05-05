"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";
import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "오피스텔 용도변경신고",
  sectionId: "32",
  category: "취득세",
  subcategory: "용도변경",
  audience: "internal",
  source: "acquisitiontax.pdf",
  pageRange: [60,60],
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-02-08",
  status: "draft",
  lawReference: "집합건물의 소유 및 관리에 관한 법률 제5조",
  tags: ["오피스텔","용도변경","사무용","주거용","재산세"],
};

export default function OfficetelUseChangeV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">오피스텔 용도변경신고</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>오피스텔의 사무용/주거용 간 용도변경 신고 절차 및 필요서류 안내</p>
      </blockquote>

      <SectionNav sections={[
      { id: "필요서류", label: "필요서류" },
      { id: "용도구분", label: "용도 구분" },
      { id: "적용시점", label: "적용 시점" },
      { id: "시스템처리", label: "시스템 처리" },
      { id: "FAQ", label: "자주 묻는 질문" },
      ]} />

      <hr className="my-6" />

      <h2 id="필요서류">
      <Outline level={1}>필요서류</Outline>
      </h2>

      <Outline level={2}>주거용 변경 신청시</Outline>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '40px'}}>순번</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>서류명</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>1</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>재산세[과세대상] 변동신고서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>필수</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>등본 / 전입세대열람원</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>세입자는 세입자 등본 또는 임대계약서</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>가스 및 수도영수증</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>용도에 "주택용" 표기 확인</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>4</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사진</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>선택적</td>
      </tr>
      </tbody>
      </table>

      <Outline level={2}>사무실 확인시 (사무용 변경)</Outline>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>임차인 사업자등록증</li>
        <li>임대차계약서</li>
        <li>전입세대열람원</li>
        <li>사무용 내부 사진</li>
        <li>임대인 사업자등록증</li>
        <li>부동산매물등록</li>
      </ul>

      <SectionNav sections={[
      { id: "필요서류", label: "필요서류" },
      { id: "용도구분", label: "용도 구분" },
      { id: "적용시점", label: "적용 시점" },
      { id: "시스템처리", label: "시스템 처리" },
      { id: "FAQ", label: "자주 묻는 질문" },
      ]} />

      <hr className="my-6" />

      <h2 id="용도구분">
      <Outline level={1}>용도 구분</Outline>
      </h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>사무용 오피스텔</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>주거용 오피스텔</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa'}}>일반 특징</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>★ 사업자 등록이 되어 있다</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      ★ 소유자가 그 오피스텔에 주민등록 전입<br/>
      ★ 주방, 화장실, 목욕시설 등이 전체 사용면적의 50% 이상 차지<br/>
      <p>★ 1가구 1주택 양도세 비과세 혜택 적용</p>
      </td>
      </tr>
      <tr>
      <td rowSpan={2} style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', backgroundColor: '#fafafa', verticalAlign: 'top'}}>장점</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>
      ★ 종합부동산세 합산에서 제외<br/>
      <p>★ 건물 분양가에서 10% 금액의 부가세 환급 가능</p>
      </td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a'}}>
      <p>★ 재산세는 사무용보다 저렴</p>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}>
      ★ 부가세 환급받았다면 도로 환수당함<br/>
      ★ 원래 주택 소유시 다주택자로 인정 → 종부세 대상 가능<br/>
      <p>★ 매각처분시 양도소득세 중과 가능</p>
      </td>
      </tr>
      </tbody>
      </table>

      <SectionNav sections={[
      { id: "필요서류", label: "필요서류" },
      { id: "용도구분", label: "용도 구분" },
      { id: "적용시점", label: "적용 시점" },
      { id: "시스템처리", label: "시스템 처리" },
      { id: "FAQ", label: "자주 묻는 질문" },
      ]} />

      <hr className="my-6" />

      <h2 id="적용시점">
      <Outline level={1}>적용 시점</Outline>
      </h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>신청 시점</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>적용 연도</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>과세기준일 <strong>이전</strong> 신청시</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff', fontWeight: 'bold'}}>해당연도부터 적용</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>과세기준일 <strong>이후</strong> 신청시</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>다음연도부터 적용</td>
      </tr>
      </tbody>
      </table>

      <Callout type="info">
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>과년도분</strong>은 이의신청기간(90일) 경과로 <strong>소급적용하지 않음</strong></li>
        <li>당해년도분은 재량으로 처리</li>
      </ul>
      </Callout>

      <SectionNav sections={[
      { id: "필요서류", label: "필요서류" },
      { id: "용도구분", label: "용도 구분" },
      { id: "적용시점", label: "적용 시점" },
      { id: "시스템처리", label: "시스템 처리" },
      { id: "FAQ", label: "자주 묻는 질문" },
      ]} />

      <hr className="my-6" />

      <h2 id="시스템처리">
      <Outline level={1}>시스템 처리</Outline>
      </h2>

      <Outline level={2}>건물용도코드 변경</Outline>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>용도코드</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사무용</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>921</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주거용</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>911</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>부속토지 연계</strong>가 끊어진 경우 반드시 <strong>건물토지연계관리</strong>에서 연결할 것</li>
        <li>연계하지 않으면 재산세 세액이 크게 달라짐</li>
      </ul>
      </Callout>

      <SectionNav sections={[
      { id: "필요서류", label: "필요서류" },
      { id: "용도구분", label: "용도 구분" },
      { id: "적용시점", label: "적용 시점" },
      { id: "시스템처리", label: "시스템 처리" },
      { id: "FAQ", label: "자주 묻는 질문" },
      ]} />

      <hr className="my-6" />

      <h2 id="FAQ">
      <Outline level={1}>자주 묻는 질문</Outline>
      </h2>

      <details>
      <summary>Q. 주택을 사무용으로 사용한다면?</summary>

      <p><strong>공동주택(아파트)</strong></p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>적법한 용도변경 외에는 주택이 아닌 건축물로 과세할 수 <strong>없음</strong></li>
        <li>근거: <a href="https://law.go.kr/법령/집합건물의소유및관리에관한법률/제5조" target="_blank" rel="noopener noreferrer">집합건물의 소유 및 관리에 관한 법률 제5조</a></li>
      </ul>

      <p><strong>단독주택</strong></p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>사무실로 과세 시 아래 조건 충족 필요:</li>
        <li>주거구조 → 사무실 구조로 변경 <strong>현장확인</strong></li>
        <li><strong>사업자등록증</strong> 보유</li>
        <li><strong>사무집기</strong> 등이 갖춰진 경우</li>
        <li>위 조건 충족시 건축물로 과세 가능</li>
      </ul>

      </details>

      <SectionNav sections={[
      { id: "필요서류", label: "필요서류" },
      { id: "용도구분", label: "용도 구분" },
      { id: "적용시점", label: "적용 시점" },
      { id: "시스템처리", label: "시스템 처리" },
      { id: "FAQ", label: "자주 묻는 질문" },
      ]} />

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
