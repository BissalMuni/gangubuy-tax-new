"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";
import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "취득세를 인터넷신고한 경우",
  sectionId: "29",
  category: "취득세",
  subcategory: "인터넷신고",
  audience: "internal",
  source: "acquisitiontax.pdf",
  pageRange: [57,57],
  version: "1.0",
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-02-08",
  status: "draft",
  lawReference: "",
  tags: ["인터넷신고","E-TAX","WETAX","위택스","이택스","전자신고"],
};

export default function InternetFilingV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">취득세를 인터넷신고한 경우</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>E-TAX, WETAX를 통한 취득세 인터넷 신고분의 처리 절차 및 주의사항 안내</p>
      </blockquote>

      <SectionNav sections={[
      { id: "과세번호", label: "과세번호 체계" },
      { id: "조회방법", label: "조회 방법" },
      { id: "처리절차", label: "처리 절차" },
      { id: "출력물", label: "출력물" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="과세번호">
      <Outline level={1}>과세번호 체계</Outline>
      </h2>

      <p>인터넷 신고분은 <strong>접수번호가 아닌 과세번호</strong>로 조회합니다.</p>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>시스템</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>과세번호 대역</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>조회 구분</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>E-TAX (이택스)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff', fontWeight: 'bold'}}>60만번대</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>32번</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>WETAX (위택스)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff', fontWeight: 'bold'}}>65만번대</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>33번</td>
      </tr>
      </tbody>
      </table>

      <SectionNav sections={[
      { id: "과세번호", label: "과세번호 체계" },
      { id: "조회방법", label: "조회 방법" },
      { id: "처리절차", label: "처리 절차" },
      { id: "출력물", label: "출력물" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="조회방법">
      <Outline level={1}>조회 방법</Outline>
      </h2>

      <Outline level={2}>부과조회 경로</Outline>

      <p>```</p>
      <p>부과관리 → 통합취득세(부동산) → 부동산과세자료조회 → [부과조회] 클릭</p>
      <p>```</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>32번</strong>: 이택스 신고분 조회</li>
        <li><strong>33번</strong>: 위택스 신고분 조회</li>
      </ul>

      <SectionNav sections={[
      { id: "과세번호", label: "과세번호 체계" },
      { id: "조회방법", label: "조회 방법" },
      { id: "처리절차", label: "처리 절차" },
      { id: "출력물", label: "출력물" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="처리절차">
      <Outline level={1}>처리 절차</Outline>
      </h2>

      <Outline level={2}>기본 처리 흐름</Outline>

      <p>1. <strong>취득세 신고분화면</strong>에서 과세번호로 불러들이기</p>
      <p>2. <strong>오류검토</strong> 실행</p>
      <p>3. <strong>저장</strong> 처리</p>
      <p>4. <strong>첨부서류 다운로드</strong></p>
      <p>5. <strong>결재처리</strong> 진행</p>

      <Outline level={2}>상세물건 등록</Outline>

      <Callout type="caution">
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>상세물건내역은 <strong>자동 생성되지 않음</strong></li>
        <li>신고분 화면에서 조회 후 <strong>상세물건을 수동 등록</strong> 필요</li>
        <li><strong>신고분 일일결재 전</strong>에 반드시 작업 완료할 것</li>
      </ul>
      </Callout>

      <SectionNav sections={[
      { id: "과세번호", label: "과세번호 체계" },
      { id: "조회방법", label: "조회 방법" },
      { id: "처리절차", label: "처리 절차" },
      { id: "출력물", label: "출력물" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="출력물">
      <Outline level={1}>출력물</Outline>
      </h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>순서</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>출력물</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>출력 방법</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>1</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>세액계산서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>출력</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>매매계약서 첨부서류</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>다운 출력 <code>{'c:\\sltis\\'}</code></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>신고필증</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>&lt;실거래&gt; 조회에서 출력 가능</td>
      </tr>
      </tbody>
      </table>

      <SectionNav sections={[
      { id: "과세번호", label: "과세번호 체계" },
      { id: "조회방법", label: "조회 방법" },
      { id: "처리절차", label: "처리 절차" },
      { id: "출력물", label: "출력물" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <h2 id="주의사항">
      <Outline level={1}>주의사항</Outline>
      </h2>

      <Outline level={2}>신고서가 없을 때</Outline>

      <p>```</p>
      <p>통합취득세(부동산) → 부동산과세자료조회 → 납세자 주민번호로 조회</p>
      <p>```</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>신고서 및 기타 첨부서류 출력 가능</li>
      </ul>

      <Outline level={2}>위임장 출력 (대리인 신고시)</Outline>

      <p>위임장은 신고서와 같은 양식으로, 아래 경로에서 조회합니다.</p>

      <p>```</p>
      <p>지역세무 → 총괄관리 → 납세자관리 → 사업자관리 → 대행인접수관리</p>
      <p>```</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>신청상태</strong>: 전체로 설정</li>
        <li><strong>납세자 주민번호</strong>로 조회</li>
      </ul>

      <Callout type="info">
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>위임장 양식은 신고서와 동일</li>
        <li>대리인 신고 건만 해당</li>
      </ul>
      </Callout>

      <SectionNav sections={[
      { id: "과세번호", label: "과세번호 체계" },
      { id: "조회방법", label: "조회 방법" },
      { id: "처리절차", label: "처리 절차" },
      { id: "출력물", label: "출력물" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
