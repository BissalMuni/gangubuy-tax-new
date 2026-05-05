"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";

export const meta = {
  title: "교환",
  category: "corp-acquisition-tax",
  group: "types",
  groupLabel: "취득유형별",
  order: 4,
  lastUpdated: "2026-04-23",
  sourceBook: "corp-practice",
  sourceBookTitle: "법인실무 (2025.12.31 반영)",
  sourceLeaf: "corp-practice/Ⅱ_취득_유형별/04_교환",
  sourcePages: [180,181],
  sourceTaxTypes: ["acquisition_tax"],
};

export default function Content04ExchangeV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">교환</h1>



      <SectionNav sections={[
      { id: "summary", label: "요약" },
      { id: "concepts", label: "주요 개념" },
      { id: "section-3", label: "수록 판례 (1건)" },
      { id: "section-4", label: "조심 판례 (1건)" },
      { id: "section-5", label: "예규 (2건)" },
      { id: "source", label: "원문" },
      { id: "section-7", label: "경매 취득일" },
      ]} />

      <hr className="my-6" />

      <h2 id="summary">
      <Outline level={1}>요약</Outline>
      </h2>

      <p>본 리프는 부동산 경매(경락) 취득 시 취득세 납세의무 성립 여부 및 적용 세율에 관한 쟁점을 다룬다. 구체적으로 경락대금 완납 후 매매계약 해제결정이 있는 경우 취득세 납세의무가 성립하는지, 그리고 경매에 의한 소유권 취득이 원시취득인지 승계취득인지 여부를 논한다.</p>


      <h2 id="concepts">
      <Outline level={1}>주요 개념</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>원시취득</strong> — 타인의 권리에 기함이 없이 특정인에게 새로 권리가 발생하는 취득 형태로, 지방세법상 취득세율 1,000분의 28이 적용된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제11조" target="_blank" rel="noopener noreferrer">법 §11 제1항</a></li>
        <li><strong>승계취득</strong> — 타인의 권리에 기하여 특정인에게 승계적으로 권리가 발생하는 취득 형태로, 경매에 의한 경락은 종전 소유자의 권리 제한·하자를 승계하므로 승계취득에 해당한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제11조" target="_blank" rel="noopener noreferrer">법 §11 제1항</a></li>
        <li><strong>경락대금 완납</strong> — 강제경매절차에서 매각허가결정 확정 후 지정 기일에 경락대금을 납부 완료하는 행위로, 이 시점을 취득세법상 취득시기로 본다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법시행령/제20조" target="_blank" rel="noopener noreferrer">시행령 §20 제1항</a>, <a href="https://law.go.kr/법령/지방세법/제7조" target="_blank" rel="noopener noreferrer">법 §7 제2항</a></li>
        <li><strong>경매 원인무효</strong> — 경매절차 자체에 중대한 하자(물건 변동, 감정평가 누락 등)가 있어 경매가 처음부터 효력이 없는 것으로 볼 수 있는 상태로, 이 경우 취득세 납세의무가 성립하지 않는다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제7조" target="_blank" rel="noopener noreferrer">법 §7 제2항</a>, <a href="https://law.go.kr/법령/지방세기본법/제34조" target="_blank" rel="noopener noreferrer">지기법 §34</a></li>
        <li><strong>납세의무 성립</strong> — 취득세에서 과세요건이 충족되어 납세의무가 법률상 확정적으로 발생하는 시점으로, 경매의 경우 경락대금 완납시점을 기준으로 한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세기본법/제34조" target="_blank" rel="noopener noreferrer">지기법 §34</a>, <a href="https://law.go.kr/법령/지방세법시행령/제20조" target="_blank" rel="noopener noreferrer">시행령 §20 제1항</a></li>
        <li><strong>매매계약 해제결정</strong> — 경매법원이 특정 사유로 매각허가에 따른 매매계약을 해제하는 결정으로, 원칙적으로 이미 성립한 취득세 납세의무에 영향을 미치지 않는다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세기본법/제34조" target="_blank" rel="noopener noreferrer">지기법 §34</a></li>
      </ul>


      <h2 id="section-3">
      <Outline level={1}>수록 판례 (1건)</Outline>
      </h2>

      <Outline level={2}>대법원2016두34783</Outline>
      <p><strong>쟁점</strong>: 경매에 의한 부동산 취득이 원시취득인지 승계취득인지 구별 기준</p>
      <p><strong>판시사항</strong>: 원시취득은 타인의 권리에 기함이 없이 새로 권리가 발생하는 것이고 승계취득은 타인의 권리에 기하여 승계적으로 발생하는 것이다. 원시취득과 승계취득을 구별짓는 중대한 차이는 종전 권리의 제한 및 하자를 승계하는지 여부이다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세법/제11조" target="_blank" rel="noopener noreferrer">법 §11 제1항</a></p>


      <h2 id="section-4">
      <Outline level={1}>조심 판례 (1건)</Outline>
      </h2>

      <Outline level={2}>조심2013지0616</Outline>
      <p><strong>쟁점</strong>: 경락대금 완납 후 매매계약 해제결정 시 취득세 납세의무 성립 여부</p>
      <p><strong>판시사항</strong>: 강제경매절차에 따라 적법하게 경락대금을 완납한 경우 취득세 납세의무가 성립하며, 이후 매매계약 해제결정 및 매각대금 반환은 경매 자체의 무효가 아닌 이상 기성립된 납세의무에 영향을 주지 않는다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세법/제7조" target="_blank" rel="noopener noreferrer">법 §7 제2항</a>, <a href="https://law.go.kr/법령/지방세기본법/제34조" target="_blank" rel="noopener noreferrer">지기법 §34</a></p>


      <h2 id="section-5">
      <Outline level={1}>예규 (2건)</Outline>
      </h2>

      <Outline level={2}>지방세운영과-1758</Outline>
      <p><strong>쟁점</strong>: 경매 매각허가에 따른 매매계약 해제결정 시 취득세 납세의무 성립 여부</p>
      <p><strong>판시사항</strong>: 경락대금 완납 및 매각허가결정 확정으로 원칙적으로 취득세 납세의무가 성립하나, 감정평가액 산정 시 건물 일부 누락·소유권이전등기 각하·경매법원의 매매계약 해제결정 등으로 경매 자체가 원인무효에 해당할 여지가 있는 경우에는 납세의무 성립으로 보기 어렵다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세법/제7조" target="_blank" rel="noopener noreferrer">법 §7 제2항</a>, <a href="https://law.go.kr/법령/지방세기본법/제34조" target="_blank" rel="noopener noreferrer">지기법 §34</a>, <a href="https://law.go.kr/법령/지방세법시행령/제20조" target="_blank" rel="noopener noreferrer">시행령 §20 제1항</a></p>

      <Outline level={2}>지방세운영과-1405</Outline>
      <p><strong>쟁점</strong>: 경락대금 완납 후 매매계약 해제 시 이미 성립한 취득세 납세의무에 미치는 영향</p>
      <p><strong>판시사항</strong>: 적법하게 경락대금을 완납한 경우 취득세 납세의무가 성립하며, 이후 합의 해제나 계약 해제는 기성립된 납세의무에 영향을 주지 않는다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세법/제7조" target="_blank" rel="noopener noreferrer">법 §7 제2항</a>, <a href="https://law.go.kr/법령/지방세기본법/제34조" target="_blank" rel="noopener noreferrer">지기법 §34</a></p>


      <h2 id="source">
      <Outline level={1}>원문</Outline>
      </h2>

      <h2 id="section-7">
      <Outline level={1}>경매 취득일</Outline>
      </h2>

      <p>```text</p>
      <p>취득시기 : 경락대금 완납일 / 취득세율 : 승계취득세율</p>
      <p>```</p>

      <p>지방세운영과-1758(2018.08.03) 취득세</p>

      <p>경매 매각허가에 따른 매매계약의 해제결정시 취득세 납세의무 성립여부에 대한 회신</p>



      [답변요지]

      <p>경락대금을 완납하고 매각허가 결정이 확정된 경우 사실상 취득한 것으로 볼 수 있으나, 감정평가액 산정 당시 2층 건물 일부가 누락된 점, 경매대상 물건의 변동으로 인해 경매에 따른 소유권 이전등기 신청이 등기소에서 각하된 점과 경매법원에 의해 매매계약이 해제결정된 점 등을 고려할 때 경매 자체가 원인무효에 해당된다고 볼 수 있는 여지가 충분하므로 이런 경우 취득세 납세의무가 성립된다고 보기 어렵다.</p>



      <p>【회신내용】</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>부동산 취득세는 일단 적법하게 취득한 다음에는 합의에 의해 계약을 해제하고 반환하는 경우에도 이미 성립한 조세채권의 행사에 영향을 줄 수 없다고 할 것(대법원 2013.3.14. 2012두26388 판결)이어서,</li>
      </ul>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>강제경매개시 절차에 따라 적법하게 매각허가결정이 확정된 후 지정된 대금지급기일에 경락대금을 완납함으로써 그 경매절차가 유효하게 이루어진 상태라면</li>
      </ul>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>매각허가에 따른 매매계약의 해제결정 전까지 취득행위가 적법하고 유효하므로 경락대금 완납시점에 해당 부동산을 사실상 취득한 것(「지방세법 시행령」제20조제1항)이라 할 것이고,</li>
      </ul>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>매매계약 해제결정 및 매각대금 반환은 그 강제경매 자체의 무효로 인한 것이 아닌 이상 이미 성립된 취득세 납세의무와 무관하다 할 것입니다.※ 행정안전부 지방세운영과-1405(2009.4.8.) / 조심 2013지0616(2014.11.10.)나.</li>
      </ul>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>그런데, 이 건의 경우 감정평가액 산정 당시 2층 건물 일부가 누락된 점, 경매대상 물건의 변동으로 인해 경매에 따른 소유권 이전등기 신청이 등기소에서 각하된 점과 경매법원에 의해 매매계약이 해제결정된 점 등을 고려할 때 경매 자체가 원인무효에 해당된다고 볼 수 있는 여지가 충분하므로,</li>
      </ul>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>「지방세법」제7조제2항에 따른 사실상 취득 및 「지방세기본법」제34조에 따른 납세의무의 성립으로 보기 어렵다고 판단되나, 이에 해당하는지 여부는 과세권자가 구체적인 사실관계를 확인하여 판단할 사항입니다. 끝.</li>
      </ul>



      <p>부동산을 경락받은 경우 취득세의 세율은 승계취득에 따른 세율 적용 (법제처18-653, 2019.01.16.)</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>구 「지방세법」에서는 같은 법 제11조제1항제3호에 따른 "원시취득”에 관하여 별도의 정의규정을 두고 있지 않는바, 같은 호에 따른 "원시취득”은 법령의 규정 내용과 입법 취지는 물론 다른 법령과의 관계, 사회에서 일반적으로 통용되는 의미 등을 종합적으로 고려해 해석해야 합니다.[주석: 법제처 2014. 10. 10. 회신 14-0572 해석례 참조]</li>
      </ul>



      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>통상적으로 원시취득은 어떤 권리가 타인의 권리에 기함이 없이 특정인에게 새로 발생하는 것을 말하며, 이에 대응하는 개념으로 어떤 권리가 타인의 권리에 기하여 특정인에게 승계적으로 발생하는 승계취득이 있습니다.[주석: 대법원 2016. 6. 23. 선고 2016두34783 판결례 및 서울고등법원 2016. 2. 3. 선고 2015누57088 판결례 참조]</li>
      </ul>



      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>그런데 「민사집행법」에 따른 경매는 국가기관이 개입되는 강제적인 매각절차이기는 하나 본질적으로 채무자가 매도인이 되어 경매물건을 매각하는 방식으로 소유권 이전이 이루어지는 사법상의 매매에 해당하는바,[주석: 헌법재판소 2006. 2. 23. 선고 2004헌바100 결정례 참조] 담보권 실행 등을 위한 경매의 경락인은 그 목적부동산의 소유권을 승계취득한다고 보아야 할 것입니다.</li>
      </ul>



      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>또한 원시취득과 승계취득을 구별짓는 중대한 차이는 종전의 권리의 제한 및 하자를 승계하는지 여부입니다.[주석: 대법원 2016. 6. 23. 선고 2016두34783 판결례 및 서울고등법원 2016. 2. 3. 선고 2015누57088 판결례 참조] 그런데 「민사집행법」 제268조에서는 부동산을 목적으로 하는 담보권 실행을 위한 경매절차에는 부동산에 대한 강제집행을 규정하고 있는 제79조부터 제162조까지의 규정을 준용하도록 하고 있고 같은 법 제91조에서는 저당권은 매각으로 소멸한다고 규정(제2항)하고 있는 반면, 지상권ㆍ지역권ㆍ전세권 및 등기된 임차권은 저당권ㆍ압류채권ㆍ가압류채권에 대항할 수 없는 경우에만 매각으로 소멸되고 그 외의 경우에는 매수인이 인수하도록 규정(제3항)하고 있으며 매수인은 유치권자에게 그 유치권으로 담보하는 채권을 변제할 책임이 있다고 규정(제4항)하고 있습니다.</li>
      </ul>



      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>이러한 「민사집행법」의 규정에 비추어 볼 때 경락인은 원칙적으로 경매목적 부동산에 설정된 대항할 수 있는 지상권ㆍ지역권ㆍ전세권 및 등기된 임차권 등을 인수하고 해당 부동산의 유치권자에게 유치권으로 담보하는 채권을 변제할 책임이 있는 등 종전 소유자의 권리의 제한 및 하자를 승계하고, 예외적으로 해당 부동산 등에 설정된 담보권은 매각의 편의를 위해 소멸되므로[주석: 조세심판원 2018. 11. 5. 결정 2018지1096 심판례 참조] 담보권 실행 등을 위한 경매에 따른 소유권 취득은 본질적으로 승계취득으로 보아야 합니다.</li>
      </ul>



      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>그리고 「지방세법」의 취득세 관련 규정의 입법연혁을 살펴보면 2010년 3월 31일 법률 제10221호로 전부개정되어 2011년 1월 1일 시행되기 전의 「지방세법」에서는 취득세와 등록세를 별도의 세목으로 규정하고 취득세의 경우 원시취득과 승계취득을 구분하지 않았으나, 같은 법이 법률 제10221호로 전부개정될 당시 납세절차 및 조세행정의 편의를 위하여 취득세와 등록세가 취득세로 일원화되면서[주석: 지방세법 전부개정법률안 등 검토보고서(2009. 4. 국회 안전행정위원회) 참조] 종전의 "소유권의 보존등기”에 대응하는 개념으로 원시취득이 도입되었고 이에 대해서는 1,000분의 28의 세율을 적용하게 되었습니다.</li>
      </ul>



      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>그런데 「민사집행법」에 따른 담보권 실행 등을 위한 경매에 따라 매각허가결정(제128조)을 받고 그 매각대금을 지급하여 소유권을 취득하는 경우(제135조) 그 등기는 소유권보존등기가 아닌 소유권을 이전하는 등기(제144조)이므로 이러한 경우에 대해서도 원시취득의 세율인 1,000분의 28의 세율을 적용할 수 있다고 한다면 위와 같은 지방세법령의 개정취지에 부합하지 않는 해석이 된다는 점도 이 사안을 해석할 때 고려해야 합니다.</li>
      </ul>

    </div>
  );
}
