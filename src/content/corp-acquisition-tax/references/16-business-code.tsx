"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";

export const meta = {
  title: "사업자등록증 업종코드",
  category: "corp-acquisition-tax",
  group: "references",
  groupLabel: "실무참고",
  order: 17,
  lastUpdated: "2026-04-23",
  sourceBook: "corp-practice",
  sourceBookTitle: "법인실무 (2025.12.31 반영)",
  sourceLeaf: "corp-practice/Ⅲ_기타_참고/16_사업자등록증_업종코드_판단기준",
  sourcePages: [257,257],
  sourceTaxTypes: ["common"],
  sourceKeyLawRefs: ["지방세법 제7조 제3항"],
  lawReference: "지방세법 제7조 제3항",
};

export default function Content16BusinessCodeV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">사업자등록증 업종코드</h1>



      <SectionNav sections={[
      { id: "summary", label: "요약" },
      { id: "concepts", label: "주요 개념" },
      { id: "section-3", label: "관련 법조문" },
      { id: "source", label: "원문" },
      ]} />

      <hr className="my-6" />

      <h2 id="summary">
      <Outline level={1}>요약</Outline>
      </h2>

      <p>이 리프는 취득세 관련 지방세법 제7조 제3항(부대설비 취득 의제), 취득신고 시 준비서류 목록, 그리고 조세특례제한법 제106조의 부가가치세 면제 규정을 참고 자료로 정리한 페이지이다. 사업자등록증 업종코드 판단기준이라는 경로명과 달리 본문은 취득세 신고 실무 및 부가세 면제 조항을 안내하는 내용으로 구성되어 있다.</p>


      <h2 id="concepts">
      <Outline level={1}>주요 개념</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>부대설비 취득 의제</strong> — 건축물의 조작 설비·부대설비가 주체구조부와 하나가 되어 효용가치를 이루는 경우, 제3자가 가설하더라도 주체구조부 취득자가 함께 취득한 것으로 보는 규정.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제7조" target="_blank" rel="noopener noreferrer">법 §7 제3항</a></li>
        <li><strong>주체구조부</strong> — 건축물의 구조적 뼈대를 이루는 핵심 구조부분으로, 부대설비와 결합하여 건축물로서의 효용가치를 형성하는 부분.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제7조" target="_blank" rel="noopener noreferrer">법 §7 제3항</a></li>
        <li><strong>국민주택 건설용역 부가세 면제</strong> — 조세특례제한법 제106조에 따라 대통령령으로 정하는 국민주택 및 그 건설용역(리모델링 포함)에 대하여 부가가치세를 면제하는 제도.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/조세특례제한법/제106조" target="_blank" rel="noopener noreferrer">조특법 §106</a></li>
        <li><strong>취득신고 준비서류</strong> — 취득세 신고 시 제출하는 서류로, 공사원가명세서·공사계약서·부동산이용계획서·세대별면적표·토지지분면적표 등이 포함된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제7조" target="_blank" rel="noopener noreferrer">법 §7 제3항</a></li>
      </ul>


      <h2 id="section-3">
      <Outline level={1}>관련 법조문</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><code className="bg-gray-100 px-1 rounded text-sm">지방세법 제7조 제3항</code></li>
      </ul>


      <h2 id="source">
      <Outline level={1}>원문</Outline>
      </h2>

      <p>※ 지방세법 제7조 제3항 : 건축물 중 조작(造作) 설비, 그 밖의 부대설비에 속하는 부분으로서 그 주체구조부(主體構造部)와 하나가 되어 건축물로서의 효용가치를 이루고 있는 것에 대하여는 주체구조부 취득자 외의 자가 가설(加設)한 경우에도 주체구조부의 취득자가 함께 취득한 것으로 본다</p>

      <p>※ 취득신고시 준비서류</p>

      <p>1.공사원가명세서(공사비상세내역서)</p>

      <p>2.공사계약서(도급계약서,설계계약서,감리계약서,엘리베이터계약서 등), 대출계약서, 신탁계약서 등</p>

      <p>3.부동산이용계획서 4.세대별면적표 5.토지지분면적표</p>



      <p>※조세특례제한법 제106조(부가가치세의 면제 등) ①다음 각 호의 어느 하나에 해당하는 재화 또는 용역의 공급에 대해서는 부가가치세를 면제한다. 이 경우 제1호, 제4호의2, 제5호, 제9호의2, 제9호의3, 제11호 및 제12호는 2020년 12월 31일까지 공급한 것에만 적용하고, 제2호, 제3호, 제4호의5 및 제9호는 2021년 12월 31일까지 공급한 것에만 적용하며, 제8호 및 제8호의2는 2014년 12월 31일까지 실시협약이 체결된 것에만 적용한다.</p>

      <p>1. 「전기사업법」 제2조에 따른 전기사업자가 전기를 공급할 수 없거나 상당한 기간 전기공급이 곤란한 도서(島嶼)로서 산업통상자원부장관(같은 법 제98조에 따라 위임을 받은 기관을 포함한다)이 증명하는 도서지방의 자가발전에 사용할 목적으로 「수산업협동조합법」에 따라 설립된 수산업협동조합중앙회에 직접 공급하는 석유류</p>

      <p>2. 공장, 광산, 건설사업현장 및 이에 준하는 것으로서 대통령령으로 정하는 사업장과 「초ㆍ중등교육법」 제2조 및 「고등교육법」 제2조에 따른 학교(이하 이 호에서 "사업장등"이라 한다)의 경영자가 그 종업원 또는 학생의 복리후생을 목적으로 해당 사업장등의 구내에서 식당을 직접 경영하여 공급하거나 「학교급식법」 제4조 각 호의 어느 하나에 해당하는 학교의 장의 위탁을 받은 학교급식공급업자가 같은 법 제15조에 따른 위탁급식의 방법으로 해당 학교에 직접 공급하는 음식용역(식사류로 한정한다). 이 경우 위탁급식 공급가액의 증명 등 위탁급식의 부가가치세 면제에 관하여 필요한 사항은 대통령령으로 정한다.</p>

      <p>3. 농어업 경영 및 농어업 작업의 대행용역으로서 대통령령으로 정하는 것</p>

      <p>4. 대통령령으로 정하는 국민주택 및 그 주택의 건설용역(대통령령으로 정하는 리모델링 용역을 포함한다)</p>

    </div>
  );
}
