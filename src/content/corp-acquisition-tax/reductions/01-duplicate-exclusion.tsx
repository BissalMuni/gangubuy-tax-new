"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";

export const meta = {
  title: "중복감면 배제",
  category: "corp-acquisition-tax",
  group: "reductions",
  groupLabel: "감면",
  order: 1,
  lastUpdated: "2026-04-23",
  sourceBook: "corp-practice",
  sourceBookTitle: "법인실무 (2025.12.31 반영)",
  sourceLeaf: "corp-practice/Ⅰ_지특법_감면/01_중복감면배제",
  sourcePages: [2,2],
  sourceTaxTypes: ["common"],
  sourceKeyLawRefs: ["지방세특례제한법 제180조","지방세특례제한법 제33조 제1항"],
  lawReference: "지방세특례제한법 제180조, 지방세특례제한법 제33조 제1항",
};

export default function Content01DuplicateExclusionV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">중복감면 배제</h1>



      <SectionNav sections={[
      { id: "summary", label: "요약" },
      { id: "concepts", label: "주요 개념" },
      { id: "section-3", label: "예규 (2건)" },
      { id: "section-4", label: "관련 법조문" },
      { id: "source", label: "원문" },
      { id: "section-6", label: "중복감면배제" },
      ]} />

      <hr className="my-6" />

      <h2 id="summary">
      <Outline level={1}>요약</Outline>
      </h2>

      <p>지방세특례제한법 제180조는 동일한 과세대상에 둘 이상의 감면 규정이 적용될 때 감면율이 높은 하나만을 적용하는 중복감면배제 원칙을 규정한다. 건축물과 그 부속토지가 동일한 과세물건에 해당하는지 여부 및 집합건물 개별 호수에 대한 각각의 감면 적용 가능 여부가 실무상 주요 쟁점이다.</p>


      <h2 id="concepts">
      <Outline level={1}>주요 개념</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>중복감면배제</strong> — 동일한 과세대상에 둘 이상의 감면 규정이 적용될 때 감면율이 높은 하나만을 적용하는 원칙.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제180조" target="_blank" rel="noopener noreferrer">지특법 §180</a></li>
        <li><strong>동일한 과세물건</strong> — 건축물과 그 부속토지처럼 유기적인 관계에 있어 하나의 과세대상으로 취급되는 재산 단위.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제180조" target="_blank" rel="noopener noreferrer">지특법 §180</a></li>
        <li><strong>부속토지</strong> — 지상정착물의 효용과 편익을 위해 사용되고 있는 토지로, 필지 수에 관계없이 지상정착물의 이용현황에 따라 객관적으로 판단한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제180조" target="_blank" rel="noopener noreferrer">지특법 §180</a></li>
        <li><strong>감면율 우선 적용</strong> — 중복감면 상황에서 감면율이 높은 규정 하나만을 선택하여 적용하는 방식.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제180조" target="_blank" rel="noopener noreferrer">지특법 §180</a></li>
      </ul>


      <h2 id="section-3">
      <Outline level={1}>예규 (2건)</Outline>
      </h2>

      <Outline level={2}>지방세특례제도과-479</Outline>
      <p><strong>쟁점</strong>: 건축물과 부속토지에 대해 서로 다른 감면조항 적용 가능 여부</p>
      <p><strong>판시사항</strong>: 건축물과 그 부속토지는 하나의 유기적인 관계에 있는 동일한 과세물건에 해당하므로, 건축물에는 산업단지 감면, 부속토지에는 기업부설연구소 감면을 각각 달리 적용할 수 없다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세특례제한법/제180조" target="_blank" rel="noopener noreferrer">지특법 §180</a></p>

      <Outline level={2}>서울세제-7048</Outline>
      <p><strong>쟁점</strong>: 공동주택 세대별 구분에 따른 각각의 감면율 적용 가능 여부</p>
      <p><strong>판시사항</strong>: 조세특례제한법 제120조 제4항 제3호와 지특법 제33조 제1항이 동시에 적용되는 경우, 공동주택의 전용면적을 기준으로 각 세대별로 구분하여 각각의 감면율을 적용하는 것이 타당하다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세특례제한법/제180조" target="_blank" rel="noopener noreferrer">지특법 §180</a>, <a href="https://law.go.kr/법령/지방세특례제한법/제33조" target="_blank" rel="noopener noreferrer">지특법 §33 제1항</a></p>


      <h2 id="section-4">
      <Outline level={1}>관련 법조문</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제180조</code></li>
        <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제33조 제1항</code></li>
      </ul>


      <h2 id="source">
      <Outline level={1}>원문</Outline>
      </h2>

      <h2 id="section-6">
      <Outline level={1}>중복감면배제</Outline>
      </h2>

      <p>```text</p>
      <p>지방세특례제한법 제180조 【중복감면의 배제】 / 동일한 과세대상에 대하여 지방세를 감면할 때 둘 이상의 감면 규정이 적용되는 경우에는 그 중 감면율이 높은 것 하나만을 적용한다. 다만, 제66조제1항, 제73조, 제74조의2제1항, 제92조 및 제92조의2와 다른 지방세 특례 규정이 함께 적용되는 경우에는 해당 특례 규정을 모두 적용하되, 제66조제1항, 제73조, 제74조의2제1항 및 제92조 간에 중복되는 경우에는 그 중 감면되는 세액이 큰 것 하나만을 적용한다.</p>
      <p>```</p>



      <p>⊙ 실무 및 사례</p>

      <p>동일한 과세대상 해당여부</p>

      <table>
      <thead>
      <tr><th>구  분</th><th>감면여부</th><th>비고</th></tr>
      </thead>
      <tbody>
      <tr><td>집합건물 한 개 호수를 각각 구분하여 감면신청 / (일부면적:창업벤처, 일부면적:기업부설연구소)</td><td>각각 감면처리</td><td></td></tr>
      <tr><td>건축물과 부속토지를 각각 감면신청 / (건축물:산업단지, 부속토지:기업부설연구소)</td><td>각각 감면처리 안됨</td><td></td></tr>
      </tbody>
      </table>



      <p>건축물과 그 부속토지에 대하여 다른 감면조항 적용여부. 지방세특례제도과-479(2020.3.2.)</p>

      <p>요지 : 건축물에 대하여는 산업단지 감면, 그 부속토지에 대해서는 기업부설연구소 감면으로 각각 적용할수 없다.</p>

      <p>지상정착물의 부속토지란 지상정착물의 효용과 편익을 위해 사용되고 있는 토지를 말하고 그 필지 수 등에 관계없이 지상정착물의 이용현황에 따라 객관적으로 판단할 사항으로서 이는 하나의 유기적인 관계에 있는 동일한 과세물건에 해당된다고 할 것이므로, ‘건축물 및 그 부속토지’를 별개의 과세대상으로 보아 각 감면규정을 달리 적용할 수 있다고 볼 것은 아님.</p>



      <p>서울세제-7048(20130605)</p>

      <p>조세특례제한법 제120조 제4항 제3호에 의해서도 감면대상이 되고 지특법 제33조 제1항의 규정에 의해서도 감면대상이 되는 경우라면 공동주택의 전용면적을 기준으로 각 세대별로 구분하여 각각의 감면율을 적용하는 것이 타당하다 할 것</p>

    </div>
  );
}
