"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";

export const meta = {
  title: "현물출자",
  category: "corp-acquisition-tax",
  group: "types",
  groupLabel: "취득유형별",
  order: 11,
  version: "1.0",
  lastUpdated: "2026-04-23",
  sourceBook: "corp-practice",
  sourceBookTitle: "법인실무 (2025.12.31 반영)",
  sourceLeaf: "corp-practice/Ⅱ_취득_유형별/11_현물출자",
  sourcePages: [195,195],
  sourceTaxTypes: ["acquisition_tax"],
};

export default function Content11InKindContributionV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">현물출자</h1>



      <SectionNav sections={[
      { id: "summary", label: "요약" },
      { id: "concepts", label: "주요 개념" },
      { id: "section-3", label: "예규 (2건)" },
      { id: "source", label: "원문" },
      ]} />

      <hr className="my-6" />

      <h2 id="summary">
      <Outline level={1}>요약</Outline>
      </h2>

      <p>비영리법인이 관계법령 개정으로 조직변경하여 설립등기를 하는 경우 등록면허세 적용세율(정률 vs 정액)을 다루며, 해산절차를 거쳐 다른 종류 법인으로 설립등기한 경우 정률세율(1천분의 2)을 적용해야 함을 명확히 한다. 또한 지방공사를 주식회사로 조직변경하면서 부동산을 법인명의로 이전등기하는 경우 취득세 과세대상이 아님을 확인한다.</p>


      <h2 id="concepts">
      <Outline level={1}>주요 개념</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>조직변경 등록면허세</strong> — 법인이 조직 형태를 변경하여 설립등기를 할 때 적용되는 등록면허세로, 해산절차 여부 및 변경 법인 유형에 따라 정률세율 또는 정액세율이 달리 적용된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제24조" target="_blank" rel="noopener noreferrer">법 §24</a>, <a href="https://law.go.kr/법령/지방세법/제28조" target="_blank" rel="noopener noreferrer">법 §28 제1항 제6호</a>, <a href="https://law.go.kr/법령/지방세법시행령/제43조" target="_blank" rel="noopener noreferrer">시행령 §43 제5항</a></li>
        <li><strong>정률세율</strong> — 법인 설립등기 시 불입한 출자금액(총액)에 일정 비율(영리법인 1천분의 4, 비영리법인 1천분의 2)을 곱하여 산출하는 등록면허세 세율 방식이다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제28조" target="_blank" rel="noopener noreferrer">법 §28 제1항 제6호</a></li>
        <li><strong>정액세율</strong> — 법인 설립등기 시 출자금액과 관계없이 건당 일정 금액(4만200원)을 부과하는 등록면허세 세율 방식으로, 상법상 주식회사·유한회사 간 조직변경 또는 단순 명칭변경 등기에 적용된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제28조" target="_blank" rel="noopener noreferrer">법 §28 제1항 제6호</a></li>
        <li><strong>비영리법인 조직변경</strong> — 민법 또는 특별법에 따른 비영리법인이 관계법령 개정 등으로 법률상 다른 종류의 법인으로 전환하는 것으로, 해산절차 이행 여부에 따라 과세 방식이 달라진다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제28조" target="_blank" rel="noopener noreferrer">법 §28 제1항 제6호</a>, <a href="https://law.go.kr/법령/지방세법시행령/제43조" target="_blank" rel="noopener noreferrer">시행령 §43 제5항</a></li>
        <li><strong>취득세 비과세(조직변경)</strong> — 지방공사가 주식회사로 조직변경 시 기존 소유 부동산을 조직변경 후 법인명의로 이전등기하는 경우 실질적 취득이 없으므로 취득세 과세대상에서 제외되는 원칙이다.</li>
      </ul>


      <h2 id="section-3">
      <Outline level={1}>예규 (2건)</Outline>
      </h2>

      <Outline level={2}>서울세제-11477</Outline>
      <p><strong>쟁점</strong>: 비영리법인 조직변경 설립등기 시 등록면허세 적용세율(정률 vs 정액)</p>
      <p><strong>판시사항</strong>: 민법 또는 특별법에 따른 비영리법인이 관계법령 개정으로 조직변경하여 설립등기를 하는 경우 상법상 주식회사·유한회사 간 조직변경에 적용되는 정액세율(건당 4만200원)을 적용할 수 없다. 해산절차를 거쳐 법률상 다른 종류의 법인으로 설립등기를 한 경우에는 법인설립등기에 따른 정률세율(1천분의 2)을 적용하여야 한다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세법/제24조" target="_blank" rel="noopener noreferrer">법 §24</a>, <a href="https://law.go.kr/법령/지방세법/제28조" target="_blank" rel="noopener noreferrer">법 §28 제1항 제6호</a>, <a href="https://law.go.kr/법령/지방세법시행령/제43조" target="_blank" rel="noopener noreferrer">시행령 §43 제5항</a></p>

      <Outline level={2}>지방세운영과-1628</Outline>
      <p><strong>쟁점</strong>: 지방공사를 주식회사로 조직변경 시 부동산 이전등기에 대한 취득세 과세 여부</p>
      <p><strong>판시사항</strong>: 지방공사를 주식회사로 조직변경하면서 지방공사 소유의 부동산을 조직변경 후 법인명의로 이전등기하는 경우 취득세 과세대상이 아니다.</p>


      <h2 id="source">
      <Outline level={1}>원문</Outline>
      </h2>

      <p>서울세제-11477(2018.08.28) 등록면허세</p>

      <p>비영리법인 조직변경에 대한 등록면허세 적용세율 질의에 대한 회신</p>



      [행정안전부 및 그 소속청 소관 비영리법인의 설립 및 감독에 관한 규칙 제10조에 따라 주무관청에 해산신고 등 해산절차를 거쳐 법률상 다른 종류의 법인으로 설립등기를 한 법인설립등기에 따른 정률세율(제28조 제1항 제6호 나목 1): 1천분의 2)을 적용하여야 함



      <p>【회신내용】○「지방세법」제24조에서 등록을 하는 자는 등록면허세를 납부할 의무가 있고, 영리법인 또는 비영리법인 설립 등기를 위한 등록면허세는 불입한 출자금액(총액)에 같은 법 제28조 제1항 제6호 가목 1) 및 나목 1)에 따른 정률세율(1천분의 4 또는 1천분의 2)을 적용하여 산출하도록 규정하고 있으나,</p>

      <p>#### 같은 법 시행령 제43조 제5항에서는「상법」제606조에 따라 주식회사에서 유한회사로 조직변경의 등기를 하는 경우 또는 유한회사에서 주식회사로 조직변경에 따라 설립 등기를 하더라도 예외적으로 정액세율(「지방세법」제28조 제1항 제6호 바목: 건당 4만2백원)을 적용하도록 규정하고 있습니다.</p>

      <p>#### 한편, 법률 제15300호로 개정(2017. 12. 26.)된 소방기본법 제40조에 따라 소방청장의 인가를 받아 설립된 한국소방안전원은 특별법에 따른 비영리법인으로 같은 법 부칙에 따라 이 법 시행 후 정관을 작성하여 소방청장의 인가를 받아 설립등기를 하고, 설립과 동시에 사단법인 한국소방안전협회는 해산된 것으로 간주하며, 해산된 사단법인의 재산과 권리·의무를 포괄승계한다고 규정하고 있습니다.</p>

      <p>#### 귀 구 질의의 경우와 같이, 민법 또는 특별법에 따른 비영리법인이 관계법령 개정으로 조직변경을 하여 설립등기를 하는 경우에는 상법에 따른 주식회사에서 유한회사 또는 유한회사에서 주식회사로 조직변경으로 인한 설립 등기시 적용하는 정액세율(「지방세법」제28조 제1항 제6호 바목: 건당 4만2백원)을 적용할 수 없다고 할 것이며,</p>

      <p>#### 비영리법인이 해산절차를 거치지 아니하고 법인격의 동질성을 유지하면서 단순한 명칭변경등기를 하는 경우에는 등록면허세를 정액세율(「지방세법」제28조 제1항 제6호 바목: 건당 4만2백원)을 적용하여야 할 것이나, 귀 구 질의의 경우 2017. 7. 23. 민법 제85조 제1항에 따라 해산등기를 하고, 2017. 7. 10. 민법 제86조 제1항 및 행정안전부 및 그 소속청 소관 비영리법인의 설립 및 감독에 관한 규칙 제10조에 따라 주무관청에 해산신고 등 해산절차를 거쳐 법률상 다른 종류의 법인으로 설립등기를 한 것으로 보이므로 법인설립등기에 따른 정률세율(제28조 제1항 제6호 나목 1): 1천분의 2)을 적용하여야 할 것으로 판단됩니다.</p>



      <p>지방공사를 주식회사로 조직을 변경하면서 지방공사 소유의 부동산을 조직변경 후의 법인명의로 이전 등기하는 경우 취득세 과세대상이 아니다. (지방세운영과-1628(2018.07.17) 취득세 )</p>

    </div>
  );
}
