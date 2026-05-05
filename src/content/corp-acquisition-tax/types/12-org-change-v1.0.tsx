"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";

export const meta = {
  title: "조직변경",
  category: "corp-acquisition-tax",
  group: "types",
  groupLabel: "취득유형별",
  order: 12,
  version: "1.0",
  lastUpdated: "2026-04-23",
  sourceBook: "corp-practice",
  sourceBookTitle: "법인실무 (2025.12.31 반영)",
  sourceLeaf: "corp-practice/Ⅱ_취득_유형별/12_조직변경",
  sourcePages: [196,198],
  sourceTaxTypes: ["acquisition_tax"],
  sourceKeyLawRefs: ["지방세법 제131조 제1항 제8호"],
  lawReference: "지방세법 제131조 제1항 제8호",
};

export default function Content12OrgChangeV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">조직변경</h1>



      <SectionNav sections={[
      { id: "summary", label: "요약" },
      { id: "concepts", label: "주요 개념" },
      { id: "section-3", label: "수록 판례 (1건)" },
      { id: "section-4", label: "관련 법조문" },
      { id: "source", label: "원문" },
      { id: "section-6", label: "부동산시가표준액표 용도지수" },
      ]} />

      <hr className="my-6" />

      <h2 id="summary">
      <Outline level={1}>요약</Outline>
      </h2>

      <p>법인의 조직변경(사단법인→재단법인, 주식회사→유한회사 등) 시 취득세 납세의무 성립 여부를 다룬다. 법인격의 동일성이 유지되는 조직변경은 실질과세 원칙상 취득행위로 볼 수 없어 취득세 납세의무가 없으며, 해산·설립 등기는 형식적 절차에 불과하다는 것이 핵심 쟁점이다.</p>


      <h2 id="concepts">
      <Outline level={1}>주요 개념</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>조직변경</strong> — 회사 또는 법인이 법인격의 동일성을 보유하면서 법률상의 조직을 변경하여 다른 종류의 법인으로 되는 것. 인격의 동일성이 유지되므로 실질과세 원칙상 취득행위로 보지 않는다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제131조" target="_blank" rel="noopener noreferrer">법 §131</a>, <a href="https://law.go.kr/법령/지방세법/제137조" target="_blank" rel="noopener noreferrer">법 §137</a></li>
        <li><strong>실질과세 원칙</strong> — 법적 형식보다 경제적 실질을 기준으로 과세 여부를 판단하는 원칙. 법인격 동일성이 유지되는 조직변경은 실질적 취득행위가 없으므로 취득세 납세의무가 없다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제131조" target="_blank" rel="noopener noreferrer">법 §131</a></li>
        <li><strong>법인격 동일성</strong> — 조직변경 전후의 법인이 법률상 동일한 인격체임을 의미하며, 이 경우 소유권 이전에 따른 취득세 과세 대상이 되지 않는다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제131조" target="_blank" rel="noopener noreferrer">법 §131</a>, <a href="https://law.go.kr/법령/지방세법/제137조" target="_blank" rel="noopener noreferrer">법 §137</a></li>
        <li><strong>비영리법인 설립등기</strong> — 재단법인 등 비영리법인의 설립을 위한 등기로, 조직변경에 따른 재단법인 설립등기에는 지방세법 제137조 제1항 제2호의 세율이 적용된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제137조" target="_blank" rel="noopener noreferrer">법 §137</a></li>
        <li><strong>소유권이전 변경등기</strong> — 조직변경에 따라 사단법인 소유 부동산을 재단법인 명의로 변경하는 등기로, 지방세법 제131조 제1항 제8호의 세율이 적용된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제131조" target="_blank" rel="noopener noreferrer">법 §131</a></li>
      </ul>


      <h2 id="section-3">
      <Outline level={1}>수록 판례 (1건)</Outline>
      </h2>

      <Outline level={2}>대법원2010두6731</Outline>
      <p><strong>쟁점</strong>: 주식회사의 유한회사로의 조직변경 시 법인격 동일성 유지 여부 및 취득세 납세의무</p>
      <p><strong>판시사항</strong>: 상법상 주식회사의 유한회사로의 조직변경은 법인격의 동일성을 유지하면서 조직을 변경하는 것이고, 그 과정에서 행하는 해산등기와 설립등기는 유한회사의 기록을 새로 개설하는 방편일 뿐 주식회사가 실제로 해산하고 유한회사가 새로 설립되는 것이 아니다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세법/제131조" target="_blank" rel="noopener noreferrer">법 §131</a>, <a href="https://law.go.kr/법령/지방세법/제137조" target="_blank" rel="noopener noreferrer">법 §137</a></p>


      <h2 id="section-4">
      <Outline level={1}>관련 법조문</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><code className="bg-gray-100 px-1 rounded text-sm">지방세법 제131조 제1항 제8호</code></li>
      </ul>


      <h2 id="source">
      <Outline level={1}>원문</Outline>
      </h2>

      <p>법인의 목적사업의 동일성을 유지한 상태로 다른 재단법인으로 조직 변경된 경우 취득세납세의무가 없는 것임</p>

      <p>(세정과-2551, 2004.08.17. )</p>

      <p>사단법인 ○○○○○선생기념사업회가 다른 사항은 변경됨이 없이 법인의 목적사업의 동일성을 유지한 상태로 재단법인 ○○○○○선생기념사업회로 조직변경된 경우에는 실질과세의 원칙상 취득행위가 이루어졌다고 볼 수 없으므로 소유권이전에 따른 취득세납세의무가 없는 것이며, 위의 사단법인소유의 부동산을 재단법인명의로 변경등기하는 경우에는 지방세법 제131조 제1항 제8호의 세율이 적용되고, 재단법인 ○○○○○선생기념사업회의 법인설립등기에 관하여는 동법 제137조 제1항 제2호의 세율(비영리법인의 설립)이 적용되는 것임.</p>



      <p>회사의 조직변경은 회사가 그의 인격의 동일성을 보유하면서 법률상의 조직을 변경하여 다른 종류의 회사로 되는 것을 말한다(대법원 1985. 11. 12. 선고 85누69 판결 등 참조). 한편 상법상 주식회사의 유한회사로의 조직변경은 주식회사가 법인격의 동일성을 유지하면서 조직을 변경하여 유한회사로 되는 것이고, 그 조직변경에 있어 주식회사의 해산등기와 유한회사의 설립등기를 하는 것은 유한회사의 기록을 새로 개설하는 방편일 뿐 주식회사가 해산하고 유한회사가 설림되기 때문이 아니다(대법원 2012. 2. 9. 선고 2010두6731 판결 등 참조).</p>



      <h2 id="section-6">
      <Outline level={1}>부동산시가표준액표 용도지수</Outline>
      </h2>

      <p>```text</p>
      <p>&lt;부동산시가표준액표 용도지수 적용요령&gt; / 1) 1구 또는 1동의 건축물이 2이상의 용도에 사용되는 경우에는 각각의 용도대로 구분한다. / 다만, 공용부분은 전용면적 비율로 안분하되 안분할 수 없는 부분은 사용면적이 제일 큰 / 용도의 건물에 부속된 것으로 본다.</p>
      <p>```</p>



      <p>1. 각각의 용도지수 적용, 용도지수가 없을 경우 주용도지수 적용</p>

      <p>예) - 공장구내 사무실 : 공장(80), 사무소(117)</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>주차전용건축물 내 소매점 : 주차전용건물(65), 소매점(117)</li>
      </ul>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>1층 판매장, 2층 물품보관장소 : 1층 판매시설(117), 2층 판매시설(117)</li>
      </ul>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>사무실내 일부 휴게소 : 전체면적 사무소(117)</li>
      </ul>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>대규모점포 및 호텔등 : 다음페이지 참조</li>
      </ul>



      <p>2. 집합건물의 경우 공용부분의 용도지수가 있을 경우 용도지수 각각 적용</p>

      <p>주차장</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>건축물 주차장의 경우 주차장(533,537)용도 건물물건을 추가하고 연면적에 입력한다.</li>
      </ul>

      <p>부속주차장이 지하2층 이상인 사무용 오피스텔의 호별 주차장은 지하2층으로 입력한다.</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>오피스텔의 주차장은 533(주차장)코드로 등록하지 말고, 오피스텔 원 물건의 주차면적에 등록</li>
      </ul>

      <p>(2022년부터 적용)</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>주택의 주차장은 주택물건의 차고면적에 입력한다.</li>
      </ul>

      <p>그러면 주택건물 용도지수가 적용되고, 주택차고 감산이 적용된다.</p>



      <p>※ 533,537 차이: 533은 상가감산 대상물건과 함께 있으면 상가 감산율이 적용되고</p>

      <p>537은 상가감산적용되지 않는다.</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>533(상가감산적용) : 일반적인 시설 등</li>
      </ul>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>537(감산제외) : 호텔,대형마트,백화점,쇼핑센터,복합쇼핑몰,그밖의 대규모점포시설 등</li>
      </ul>



      <p>※ 533을 입력하면 기본 주차장 용도지수(76)가 적용되고</p>

      <p>상가인 경우는 추가로 층별 감산(1~15%)이 이루어짐.</p>

      <p>대규모점포(백화점,쇼핑센터 등) : 유통산업발전법 제2조 제3호(매장+용역의제공장소)</p>

      <p>※ 용역의 제공장소(유통산업발전법 시행령 제2조)</p>

      <p>| 1종근린생활시설 중 일부 | - 휴게음식점, 제과점등 조리․제조하여 판매하는시설(바닥면적의 합계 300㎡ 미만) / - 이용원, 미용원, 세탁소, 목욕장 등 / - 의원, 치과의원, 한의원, 산후조리원 등 / - 탁구장, 체육도장 등 바닥면적합계 500㎡ 미만 |</p>
      <p>| --- | --- |</p>
      <p>| 2종근린생활시설 | - 극장, 영화관 등 공연장(바닥면적합계 500㎡미만) / - 서점, 사진관, 표구점 / - 게임관련시설(바닥면적합계 500㎡미만) / - 휴게음식점, 제과점 등(바닥면적합계 300㎡ 이상) / - 일반음식점, 동물병원, 동물미용실 등 / - 볼링장, 골프연습장, 체력단련장, 당구장, 실내낚시터 등(바닥면적합계500㎡미만) / - 금융업소, 사무소등(바닥면적합계500㎡미만) / - 제조업소, 수리점 등(바닥면적합계500㎡미만) / - 안마시술소, 노래연습장 등 / - 학원, 직업훈련소 등(바닥면적합계 500㎡미만) |</p>
      <p>| 문화 및 집회시설 | - 공연장으로서 2종근생시설에 해당하지 아니하는 것 / - 집회장 (예식장, 회의장 등) 2종근생시설에 해당하지 아니하는 것 / - 전시장(박물관,미술관,체험관,문화관 등) / - 동식물원(동물원,식물원,수족관 등) |</p>
      <p>| 운동시설 | - 탁구장, 체력단련장, 에어로빅장, 볼링장, 당구장, 골프연습장 등 / (1종,2종 근생시설에 해당하지 아니하는 것) |</p>
      <p>| 업무시설 | - 금융업소,사무소,결혼상담소,출판사,신문사 등 / - 오피스텔은 제외함 |</p>



      <p>▫ 백화점</p>

      <p>| 구  분 | 적용 용도 | 용도지수 |</p>
      <p>| --- | --- | --- |</p>
      <p>| 매장, 식당, 서점, 약국, 병원, 휘트니스센터, 이용원, 세탁소, / 사무실, 금융업소, 골프연습장, 문화센터, 예식장, 공용기계실, / 극장․영화관 | 백화점 | 135 |</p>
      <p>| 수영장 | 수영장 | 127 |</p>
      <p>| 주차장 | 차량관련시설 중 / - 백화점 면적 537적용 / - 기타면적 533적용 | 감산제외 / 등 |</p>

    </div>
  );
}
