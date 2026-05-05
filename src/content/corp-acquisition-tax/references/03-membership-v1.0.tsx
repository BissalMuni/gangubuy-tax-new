"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";

export const meta = {
  title: "회원권",
  category: "corp-acquisition-tax",
  group: "references",
  groupLabel: "실무참고",
  order: 4,
  version: "1.0",
  lastUpdated: "2026-04-23",
  sourceBook: "corp-practice",
  sourceBookTitle: "법인실무 (2025.12.31 반영)",
  sourceLeaf: "corp-practice/Ⅲ_기타_참고/03_회원권",
  sourcePages: [207,207],
  sourceTaxTypes: ["acquisition_tax"],
};

export default function Content03MembershipV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">회원권</h1>



      <SectionNav sections={[
      { id: "summary", label: "요약" },
      { id: "concepts", label: "주요 개념" },
      { id: "source", label: "원문" },
      ]} />

      <hr className="my-6" />

      <h2 id="summary">
      <Outline level={1}>요약</Outline>
      </h2>

      <p>본 리프는 취득세 과세 대상인 주택조합 등의 종류 구분과 포함 여부(지방세법 제7조 제8항 및 시행령 제20조 제7항 기준)를 정리하고, 재개발·재건축·주택조합 등의 일반분양분(비조합원용) 토지에 대한 취득세 과표 산출 방법 및 세율을 2022년 이전과 2023년 이후로 구분하여 설명한다. 산출면적 계산식은 시행령 제18조의4 제1항 4호와 시행령 제11조의2 두 방식이 동일한 결과를 산출함을 예시로 보여준다.</p>


      <h2 id="concepts">
      <Outline level={1}>주요 개념</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>주택조합 포함 여부</strong> — 지방세법 제7조 제8항 및 시행령 제20조 제7항에 따라 취득세 과세 시 주택조합 등으로 인정되는 조합의 종류를 구분하는 기준. 지역·직장·리모델링주택조합 및 재건축·소규모재건축사업이 포함되고 주거환경개선·재개발·자율주택정비·가로주택정비·소규모재개발사업 등은 제외된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제7조" target="_blank" rel="noopener noreferrer">법 §7 제8항</a>, <a href="https://law.go.kr/법령/지방세법시행령/제20조" target="_blank" rel="noopener noreferrer">시행령 §20 제7항</a></li>
        <li><strong>일반분양분 토지 취득세</strong> — 재개발·재건축·주택조합 등에서 비조합원용으로 일반에 분양되는 토지 부분에 대한 취득세로, 2022년 이전에는 개별공시지가 × 산출면적, 2023년 이후에는 ㎡당 토지분양가액 × 산출면적을 과표로 적용한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법시행령/제18조의4" target="_blank" rel="noopener noreferrer">시행령 §18의4 제1항</a>, <a href="https://law.go.kr/법령/지방세법시행령/제11조의2" target="_blank" rel="noopener noreferrer">시행령 §11의2</a></li>
        <li><strong>산출면적 계산식</strong> — 일반분양분 토지에 대한 취득세 과표 산정 시 적용되는 면적 계산 방법으로, 시행령 제18조의4 제1항 4호와 시행령 제11조의2 두 방식이 존재하며 계산 결과는 동일하다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법시행령/제18조의4" target="_blank" rel="noopener noreferrer">시행령 §18의4 제1항</a>, <a href="https://law.go.kr/법령/지방세법시행령/제11조의2" target="_blank" rel="noopener noreferrer">시행령 §11의2</a></li>
        <li><strong>소유권이전고시일</strong> — 재개발·재건축 등 정비사업에서 일반분양분 토지에 대한 취득세 납세의무 성립 시기로, 소유권이전고시일의 다음날이 취득 시기가 된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제7조" target="_blank" rel="noopener noreferrer">법 §7 제8항</a></li>
        <li><strong>과밀억제권역 외 재건축 취득세율</strong> — 일반분양분(비조합원용) 토지에 적용되는 무상취득 세율로 3.5%가 적용된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법시행령/제18조의4" target="_blank" rel="noopener noreferrer">시행령 §18의4 제1항</a></li>
      </ul>


      <h2 id="source">
      <Outline level={1}>원문</Outline>
      </h2>

      <Outline level={2}>주택조합등 조합의 종류</Outline>

      <table>
      <thead>
      <tr><th>구 분</th><th>조합의 종류</th><th>주택조합등 포함여부 / (지방세법 제7항 제8호 및 / 시행령제20조 제7항)</th></tr>
      </thead>
      <tbody>
      <tr><td>「주택법」 / 제11조에 따른 주택조합</td><td>지역주택조합</td><td>포함</td></tr>
      <tr><td>직장주택조합</td><td>포함</td><td></td></tr>
      <tr><td>리모델링주택조합</td><td>포함</td><td></td></tr>
      <tr><td>「도시 및 주거환경정비법」 / 제35조제3항</td><td>주거환경개선사업</td><td>미포함</td></tr>
      <tr><td>재개발사업</td><td>미포함</td><td></td></tr>
      <tr><td>재건축사업</td><td>포함</td><td></td></tr>
      <tr><td>「빈집 및 소규모주택정비에    관한 특례법」 / 제23조(제2항)</td><td>자율주택정비사업</td><td>미포함</td></tr>
      <tr><td>가로주택정비사업</td><td>미포함</td><td></td></tr>
      <tr><td>소규모재건축사업</td><td>포함</td><td></td></tr>
      <tr><td>소규모재개발사업</td><td>미포함</td><td></td></tr>
      </tbody>
      </table>



      <p>```text</p>
      <p>※ 일반분양분(비조합원용) 토지에 대한 취득세(재개발·재건축·주택조합 등)</p>
      <p>구분 | 2022.12.31.까지 | 2023.1.1.부터</p>
      <p>과표 및 / 산출면적 | 개별공시지가 × 산출면적 | ㎡당 토지분양가액 × 산출면적</p>
      <p>※ 산출면적 계산식(시행령 각각 계산결과 동일함) / 정비 전                        정비 후 / 총  면  적: 20,000㎡           총  면  적: 20,000㎡ / 조합원신탁: 15,000㎡     ▷    조합원귀속: 11,000㎡ / 제3자 매입:  5,000㎡           일반분양:  9,000㎡ / ------------------------------------------------------------------------------------------------------------------ / ☞ 시행령18조의4 제1항4호 / 9,000(일반분양전체면적) - [5,000(제3자매입토지)×9,000(일반분양전체면적) =  6,750㎡ / 20,000(총면적) / ☞ 시행령11조의2 / 9,000(일반분양전체면적) ×  15,000(총면적)  / 20,000(총면적) = 6,750㎡</p>
      <p>세 율 | 3.5% (무상취득)</p>
      <p>취득의 시기 | 소유권이전고시일의 다음날</p>
      <p>```</p>

    </div>
  );
}
