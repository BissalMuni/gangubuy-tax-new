"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";
import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "구(舊)등록세 과세방법",
  sectionId: "31",
  category: "취득세",
  subcategory: "구등록세",
  audience: "internal",
  source: "acquisitiontax.pdf",
  pageRange: [59,59],
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-02-08",
  status: "draft",
  lawReference: "",
  tags: ["구등록세","등록세","부과제척기간","상속미등기","신축보존등기"],
};

export default function OldRegistrationTaxV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">구(舊)등록세 과세방법</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>2011년 통합취득세 시행 이전 취득 물건의 등기 신고시 구법 적용 과세 방법 (세율 3.16% → 0.96%)</p>
      </blockquote>

      <SectionNav sections={[
      { id: "적용대상", label: "적용 대상" },
      { id: "세율적용", label: "세율 적용" },
      { id: "과세화면", label: "과세 화면" },
      { id: "입력항목", label: "입력 항목" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="적용대상">
      <Outline level={1}>적용 대상</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>2011년 통합취득세 시행 이전</strong>에 취득된 물건</li>
        <li>해당 물건을 <strong>등기하기 위해 신고</strong>하는 경우</li>
        <li>구법 적용으로 <strong>등록세만 과세</strong></li>
      </ul>

      <Outline level={2}>주요 사례</Outline>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>상속 미등기</strong> (가장 많음)</li>
        <li>미등기 건물 <strong>신축보존등기</strong> (가끔)</li>
      </ul>

      <SectionNav sections={[
      { id: "적용대상", label: "적용 대상" },
      { id: "세율적용", label: "세율 적용" },
      { id: "과세화면", label: "과세 화면" },
      { id: "입력항목", label: "입력 항목" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="세율적용">
      <Outline level={1}>세율 적용</Outline>
      </h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>세율</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>과세 여부</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>원래 세율</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>3.16%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>등록세 + 취득세</td>
      </tr>
      <tr style={{backgroundColor: '#e6f7ff'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>적용 세율</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', color: '#1890ff'}}>0.96%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>등록세만</td>
      </tr>
      </tbody>
      </table>

      <Callout type="info">
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>등록세만</strong> 선택해서 과세</li>
        <li><strong>가산세 없음</strong></li>
        <li>취득세분(2%)은 <strong>부과제척기간 5년 경과</strong>로 과세 불가</li>
      </ul>
      </Callout>

      <SectionNav sections={[
      { id: "적용대상", label: "적용 대상" },
      { id: "세율적용", label: "세율 적용" },
      { id: "과세화면", label: "과세 화면" },
      { id: "입력항목", label: "입력 항목" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="과세화면">
      <Outline level={1}>과세 화면</Outline>
      </h2>

      <Outline level={2}>메뉴 경로</Outline>

      <p>```</p>
      <p>구부과관리 → 취등록세(부동산) → 신고분관리 → 부동산(신고분)</p>
      <p>```</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>세목구분</strong>: 등록세로만 선택</li>
      </ul>

      <SectionNav sections={[
      { id: "적용대상", label: "적용 대상" },
      { id: "세율적용", label: "세율 적용" },
      { id: "과세화면", label: "과세 화면" },
      { id: "입력항목", label: "입력 항목" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="입력항목">
      <Outline level={1}>입력 항목</Outline>
      </h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '150px'}}>항목</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>입력 방법</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>주택공시가격 시점</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      등록시점인 <strong>현재시점</strong><br/>
      안 나타나면 주택공시가격 돋보기창에서 불러옴<br/>
      <p>상가/사무실은 자동으로 현재시점</p>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>시가표준액 불러오기</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      <strong>상속미등기</strong>: 건물과 토지를 다 불러옴<br/>
      <strong>신축보존등기</strong>: 토지 제외, <span style={{color: '#cf1322'}}>건물만</span> 불러오기
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득일자</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      일반: <strong>준공일자</strong><br/>
      <p>상속: <strong>사망일자</strong></p>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>고지서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>
      <strong>2번 고지서</strong>를 따로 셋팅해서 출력
      </td>
      </tr>
      </tbody>
      </table>

      <SectionNav sections={[
      { id: "적용대상", label: "적용 대상" },
      { id: "세율적용", label: "세율 적용" },
      { id: "과세화면", label: "과세 화면" },
      { id: "입력항목", label: "입력 항목" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="주의사항">
      <Outline level={1}>주의사항</Outline>
      </h2>

      <Callout type="caution">
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>신축보존등기</strong>시 시가표준액은 <strong>토지 제외</strong>, 건물만 불러올 것</li>
        <li>등록분과 취득분을 구분하여 과세해야 함</li>
        <li>취득세분(2%)은 부과제척기간 5년 경과로 <strong>과세 불가</strong></li>
      </ul>
      </Callout>

      <SectionNav sections={[
      { id: "적용대상", label: "적용 대상" },
      { id: "세율적용", label: "세율 적용" },
      { id: "과세화면", label: "과세 화면" },
      { id: "입력항목", label: "입력 항목" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
