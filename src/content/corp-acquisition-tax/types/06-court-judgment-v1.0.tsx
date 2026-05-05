"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";

export const meta = {
  title: "이행판결 취득일",
  category: "corp-acquisition-tax",
  group: "types",
  groupLabel: "취득유형별",
  order: 6,
  version: "1.0",
  lastUpdated: "2026-04-23",
  sourceBook: "corp-practice",
  sourceBookTitle: "법인실무 (2025.12.31 반영)",
  sourceLeaf: "corp-practice/Ⅱ_취득_유형별/06_이행판결_취득일",
  sourcePages: [184,184],
  sourceTaxTypes: ["acquisition_tax"],
  sourceKeyLawRefs: ["지방세법 시행령 제27조 제3항","지방세법 시행령 제18조의4"],
  lawReference: "지방세법 시행령 제27조 제3항, 지방세법 시행령 제18조의4",
};

export default function Content06CourtJudgmentV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">이행판결 취득일</h1>



      <SectionNav sections={[
      { id: "summary", label: "요약" },
      { id: "concepts", label: "주요 개념" },
      { id: "section-3", label: "수록 판례 (1건)" },
      { id: "section-4", label: "조심 판례 (1건)" },
      { id: "section-5", label: "예규 (3건)" },
      { id: "section-6", label: "관련 법조문" },
      { id: "source", label: "원문" },
      { id: "section-8", label: "대물변제" },
      ]} />

      <hr className="my-6" />

      <h2 id="summary">
      <Outline level={1}>요약</Outline>
      </h2>

      <p>대물변제로 부동산을 취득하는 경우의 취득시기(소유권이전등기일), 과세표준(대물변제액과 시가인정액 중 높은 가액, 2024.1.1. 개정), 그리고 중과 적용 여부를 다룬다. 대물변제는 소유권이전등기 완료 시 성립하므로 등기일이 취득시기가 되며, 과세표준은 실제 사실상의 취득가액으로 보아야 한다.</p>


      <h2 id="concepts">
      <Outline level={1}>주요 개념</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>대물변제</strong> — 본래의 채무에 갈음하여 다른 급부를 현실적으로 하는 때에 성립하는 요물계약으로, 부동산 소유권이전의 경우 등기 완료 시 기존 채무가 소멸한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제10조의5" target="_blank" rel="noopener noreferrer">법 §10의5</a>, <a href="https://law.go.kr/법령/지방세법시행령/제18조의4" target="_blank" rel="noopener noreferrer">시행령 §18의4</a></li>
        <li><strong>취득시기(대물변제)</strong> — 대물변제로 부동산을 취득하는 경우 소유권이전등기일을 취득시기로 본다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제10조의5" target="_blank" rel="noopener noreferrer">법 §10의5</a></li>
        <li><strong>사실상 취득가액</strong> — 과세표준 산정 시 계약서상 금액이 아닌 실제 거래가액을 반영한 취득가액으로, 법인의 경우 장부나 판결문 등으로 확인한 채무변제액을 기준으로 한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제10조의5" target="_blank" rel="noopener noreferrer">법 §10의5</a>, <a href="https://law.go.kr/법령/지방세법시행령/제18조의4" target="_blank" rel="noopener noreferrer">시행령 §18의4</a></li>
        <li><strong>시가인정액</strong> — 감정평가액·거래가액 등으로 산정되는 시장가액으로, 대물변제액이 시가인정액을 초과하는 경우 취득당시가액은 시가인정액으로 한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제10조의5" target="_blank" rel="noopener noreferrer">법 §10의5</a>, <a href="https://law.go.kr/법령/지방세법시행령/제18조의4" target="_blank" rel="noopener noreferrer">시행령 §18의4</a></li>
        <li><strong>대물변제 중과 여부</strong> — 대물변제 취득은 원칙적으로 중과에 해당하지 않으나, 채권보전·행사 목적의 부동산 취득 후 5년 이내 지점 설치 시 중과 대상이 된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법시행령/제27조" target="_blank" rel="noopener noreferrer">시행령 §27 제3항</a></li>
      </ul>


      <h2 id="section-3">
      <Outline level={1}>수록 판례 (1건)</Outline>
      </h2>

      <Outline level={2}>대법원98두17067</Outline>
      <p><strong>쟁점</strong>: 대물변제에 의한 부동산 취득의 취득시기 및 과세표준</p>
      <p><strong>판시사항</strong>: 대물변제는 다른 급부가 부동산 소유권이전인 때에 그 소유권이전등기를 완료하여야만 성립되어 기존 채무가 소멸한다. 금전채무에 갈음하여 부동산으로 급부하는 경우 채권액이 취득의 대가로서 취득세 과세표준에 해당한다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세법/제10조의5" target="_blank" rel="noopener noreferrer">법 §10의5</a></p>


      <h2 id="section-4">
      <Outline level={1}>조심 판례 (1건)</Outline>
      </h2>

      <Outline level={2}>조심2017지0166</Outline>
      <p><strong>쟁점</strong>: 대물변제 취득시기(소유권이전등기일)</p>
      <p><strong>판시사항</strong>: 대물변제로 인한 부동산 취득의 취득시기는 소유권이전등기일이다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세법/제10조의5" target="_blank" rel="noopener noreferrer">법 §10의5</a></p>


      <h2 id="section-5">
      <Outline level={1}>예규 (3건)</Outline>
      </h2>

      <Outline level={2}>지방세정팀-1528</Outline>
      <p><strong>쟁점</strong>: 대물변제 취득시기(소유권이전등기일)</p>
      <p><strong>판시사항</strong>: 대물변제로 인한 부동산 취득의 취득시기는 소유권이전등기일이 된다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세법/제10조의5" target="_blank" rel="noopener noreferrer">법 §10의5</a></p>

      <Outline level={2}>지방세운영과-3440</Outline>
      <p><strong>쟁점</strong>: 대물변제 취득의 중과 해당 여부</p>
      <p><strong>판시사항</strong>: 대물변제에 의한 취득은 중과에 해당하지 않으나, 채권을 보전하거나 행사할 목적으로 하는 부동산 취득 후 5년 이내 지점을 설치하는 경우 중과대상에 해당한다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세법시행령/제27조" target="_blank" rel="noopener noreferrer">시행령 §27 제3항</a></p>

      <Outline level={2}>행심2006-370</Outline>
      <p><strong>쟁점</strong>: 대물변제 취득 시 과세표준 산정(사실상 취득가액)</p>
      <p><strong>판시사항</strong>: 법인이 대물변제계약으로 부동산을 취득한 경우 과세표준액은 실제 거래가액이 제대로 반영되지 않은 대물변제계약서상의 금액이 아닌 사실상의 취득가액으로 보아야 한다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세법/제10조의5" target="_blank" rel="noopener noreferrer">법 §10의5</a>, <a href="https://law.go.kr/법령/지방세법시행령/제18조의4" target="_blank" rel="noopener noreferrer">시행령 §18의4</a></p>


      <h2 id="section-6">
      <Outline level={1}>관련 법조문</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><code className="bg-gray-100 px-1 rounded text-sm">지방세법 시행령 제27조 제3항</code></li>
        <li><code className="bg-gray-100 px-1 rounded text-sm">지방세법 시행령 제18조의4</code></li>
      </ul>


      <h2 id="source">
      <Outline level={1}>원문</Outline>
      </h2>

      <h2 id="section-8">
      <Outline level={1}>대물변제</Outline>
      </h2>

      <p>```text</p>
      <p>취득시기 : 소유권이전등기일 / 적용세율 : 유상승계취득 / 과   표 : 대물변제액과 시가인정액(감정평가액,거래가액) 중 높은가액(2024.1.1..개정) / 중 낮은 가액(2023.3.14. 법령개정) / 준비서류 : 대물변제계약서,법인장부(근저당설정계약서. 등.) / * 건설법인의 경우 보통 ‘건설미수금 계정’에 계상함. / ※ 중과에 해당하지 않음(지방세법시행령 제27조제3항), 주택은 중과 검토 / (채권을 산)</p>
      <p>```</p>

      <p>지방세법시행령 제18조의4(유상ㆍ무상ㆍ원시취득의 경우 과세표준에 대한 특례)</p>

      <p>① 법 제10조의5제3항 각 호에 따른 취득의 경우 취득당시가액은 다음 각 호의 구분에 따른 가액으로 한다. &lt;개정 2023. 3. 14.&gt;</p>

      <p>1. 법 제10조의5제3항제1호의 경우: 다음 각 목의 구분에 따른 가액. 다만, 특수관계인으로부터 부동산등을 취득하는 경우로서 법 제10조의3제2항에 따른 부당행위계산을 한 것으로 인정되는 경우 취득당시가액은 시가인정액으로 한다.</p>

      <p>가. 대물변제: 대물변제액(대물변제액 외에 추가로 지급한 금액이 있는 경우에는 그 금액을 포함한다). 다만, 대물변제액이 시가인정액을 초과하는 경우 취득당시가액은 시가인정액으로 한다.</p>



      <p>대물변제라 함은 본래의 채무에 갈음하여 다른 급부를 현실적으로 하는 때에 성립하는 요물계약으로써, 다른 급부가 부동산의 소유권이전인 때에는 그 소유권이전등기를 완료하여야만 대물변제가 성립되어 기존 채무가 소멸하는 것입니다(대법원98두17067, 1999.11.12.).</p>

      <p>따라서 소유권이전등기일이 취득시기가 되는 것입니다(지방세정팀-1528,2005.07.07./조심2017지0166,2017.6.28)</p>



      <p>법인이 대물변제계약으로 부동산을 취득한 경우 취득세 등의 과세표준액을 실제 거래가액이 제대로 반영되지 아니한 대물변제계약서상의 금액이 아닌 사실상의 취득가액으로 보아야 한다(행심2006-370, 2006.08.28.)라고 판시하고 있고, 법인과의 거래인 경우 채무변제액을 법인장부 등으로 확인할 수 있는 경우이거나 민사소송이나 행정소송의 판결문에서 그 가액을 확인할 수 있는 경우 사실상의 취득가액으로 보아야 할 것입니다.</p>



      <p>금전채무에 갈음하여 부동산 등으로 급부함으로써 채권을 소멸시키는 계약형태로서 비록 금전채무를 이행함에 있어서 금전 대신 부동산 등 물건을 양도함으로써 양수자 입장에서 보면 결과적으로 부동산 등 물건을 유상승계 취득하게 되는 것이다. 대물변제로 인한 부동산 취득의 경우 채권액이 상대방에게 취득의 대가를 지급한 금액으로 볼 수가 있으므로 취득세 과세표준에 해당하는 것이다.(대법원98두17067, 1999.11.22)</p>

    </div>
  );
}
