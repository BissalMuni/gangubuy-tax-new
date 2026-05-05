"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";

export const meta = {
  title: "공탁",
  category: "corp-acquisition-tax",
  group: "types",
  groupLabel: "취득유형별",
  order: 3,
  lastUpdated: "2026-04-23",
  sourceBook: "corp-practice",
  sourceBookTitle: "법인실무 (2025.12.31 반영)",
  sourceLeaf: "corp-practice/Ⅱ_취득_유형별/03_공탁",
  sourcePages: [178,179],
  sourceTaxTypes: ["acquisition_tax"],
  sourceKeyLawRefs: ["지방세법 제4조"],
  lawReference: "지방세법 제4조",
};

export default function Content03DepositV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">공탁</h1>



      <SectionNav sections={[
      { id: "summary", label: "요약" },
      { id: "concepts", label: "주요 개념" },
      { id: "section-3", label: "질의회신 (1건)" },
      { id: "section-4", label: "관련 법조문" },
      { id: "source", label: "원문" },
      { id: "section-6", label: "교환 【서울특별시 세무과-21973(2013.10.15.) 참고】" },
      ]} />

      <hr className="my-6" />

      <h2 id="summary">
      <Outline level={1}>요약</Outline>
      </h2>

      <p>본 리프는 부동산 교환 취득 시 취득세 과세표준 산출방법과 취득시기, 적용세율을 설명하고, 공동소유 부동산의 지분 교환으로 단독소유가 되어 당초 지분을 초과하는 경우 초과분에 대한 취득세 납세의무 여부를 다룬다. 서울세제-11047 질의회신은 지분 교환이 교환취득에 해당하므로 초과 취득 부분에 취득세 납세의무가 있다고 판단하였다.</p>


      <h2 id="concepts">
      <Outline level={1}>주요 개념</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>교환취득 과세표준</strong> — 교환 시 취득세 과세표준은 자기(양도) 물건의 시가표준액과 평가액 중 높은 것에서 승계채무액을 차감하고 보충금 지급액을 가산하여 산출한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제6조" target="_blank" rel="noopener noreferrer">법 §6 제1호</a>, <a href="https://law.go.kr/법령/지방세법/제7조" target="_blank" rel="noopener noreferrer">법 §7 제1항</a>, <a href="https://law.go.kr/법령/지방세법/제4조" target="_blank" rel="noopener noreferrer">법 §4</a></li>
        <li><strong>지분 교환</strong> — 공동소유 부동산의 지분을 상호 교환하여 어느 한 당사자가 특정 물건을 단독으로 소유하게 되는 취득 형태로, 지방세법상 교환취득에 해당한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제6조" target="_blank" rel="noopener noreferrer">법 §6 제1호</a>, <a href="https://law.go.kr/법령/지방세법/제7조" target="_blank" rel="noopener noreferrer">법 §7 제1항</a></li>
        <li><strong>보충금</strong> — 교환 당사자 간 물건 가치 차이를 보전하기 위해 수수하는 금전으로, 취득가격 산출 시 지급액은 가산하고 수령액은 차감한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제4조" target="_blank" rel="noopener noreferrer">법 §4</a></li>
        <li><strong>승계채무액</strong> — 교환 시 상대방에게 이전시키는 채무액으로, 취득가격 산출 시 차감 요소로 적용된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제4조" target="_blank" rel="noopener noreferrer">법 §4</a></li>
        <li><strong>유상승계취득세율</strong> — 교환 취득은 유상승계취득으로 분류되어 4%의 세율이 적용된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제7조" target="_blank" rel="noopener noreferrer">법 §7 제1항</a></li>
      </ul>


      <h2 id="section-3">
      <Outline level={1}>질의회신 (1건)</Outline>
      </h2>

      <Outline level={2}>서울세제-11047</Outline>
      <p><strong>쟁점</strong>: 공동소유 부동산 지분 교환 시 당초 지분 초과분에 대한 취득세 납세의무 여부</p>
      <p><strong>판시사항</strong>: 공동 소유한 부동산을 지분 교환으로 어느 한 물건을 단독으로 소유하게 되어 당초 지분을 초과하는 경우, 초과 부분은 교환취득으로서 취득세 납세의무가 있다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세법/제7조" target="_blank" rel="noopener noreferrer">법 §7 제1항</a>, <a href="https://law.go.kr/법령/지방세법/제6조" target="_blank" rel="noopener noreferrer">법 §6 제1호</a></p>


      <h2 id="section-4">
      <Outline level={1}>관련 법조문</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><code className="bg-gray-100 px-1 rounded text-sm">지방세법 제4조</code></li>
      </ul>


      <h2 id="source">
      <Outline level={1}>원문</Outline>
      </h2>

      <h2 id="section-6">
      <Outline level={1}>교환 【서울특별시 세무과-21973(2013.10.15.) 참고】</Outline>
      </h2>

      <p>```text</p>
      <p>산출요소 : 시가표준액, 평가액(시가), 승계채무액, 보충금 / 산출기준 : 검인받은 교환계약서 / 산출방법 : 자기(양도)물건 시가표준액과 평가액 중 높은 것 - 승계채무액 + 보충금지급액 / 취득시기 : 교환계약서상의 보충금 지급일·인도일 또는 등기일·사실상 인도일 중 빠른 날 / 적용세율 : 4% (과세물건별 유상승계취득세율 적용)</p>
      <p>```</p>

      <p>※ 대법원에서 상반된 판례가 나오기 전까지 운영</p>



      <p>취득가격 상세산출 방법 : ①,② 중 높은가격 - ③ + ④ + ⑤ - ⑥</p>

      <table>
      <thead>
      <tr><th>요  소</th><th>개  요</th><th>취득가격</th><th>비고</th><th></th></tr>
      <tr><th>자기(양도)물건가치</th><th>① 시가표준액</th><th>지방세법 제4조등에 의한 가액</th><th>포함</th><th>높은것</th></tr>
      </thead>
      <tbody>
      <tr><td>② 평  가  액</td><td>납세자들이 평가한 가치(감정평가액,시가 등)</td><td></td><td></td><td></td></tr>
      <tr><td>채무액</td><td>③ 승  계  액</td><td>상대방에게 이전시키는 채무액</td><td>차감</td><td>-</td></tr>
      <tr><td>④ 이  전  액</td><td>상대방으로부터 이전받는 채무액</td><td>포함</td><td>+</td><td></td></tr>
      <tr><td>보충금</td><td>⑤ 지  급  액</td><td>교환물건의 가치 차이를 보전하기 위한 금전</td><td>포함</td><td>+</td></tr>
      <tr><td>⑥ 수  령  액</td><td>차감</td><td>-</td><td></td><td></td></tr>
      </tbody>
      </table>



      <p>취득적용과표 : 산출가격, 평가액, 시가표준액 중 가장 높은가격 적용(엑셀참고)</p>

      <p>법인의 경우 장부가격을 기준으로 함.</p>

      <p>예시</p>

      <table>
      <thead>
      <tr><th>소유자</th><th>교환물건내역</th><th>취득세 과표</th><th>비고</th><th></th><th></th><th></th></tr>
      <tr><th>물건명</th><th>시  가 / 표준액</th><th>평가액</th><th>승  계 / 채무액</th><th>보충금 / 지급액</th><th></th><th></th></tr>
      <tr><th>갑</th><th>구로동</th><th>18</th><th>20</th><th>7</th><th></th><th>16&gt;15(20+3-8)</th></tr>
      </thead>
      <tbody>
      <tr><td>을</td><td>오류동</td><td>16</td><td>15</td><td>10</td><td>8</td><td>21(16-3+8)&gt;20</td></tr>
      <tr><td>갑</td><td>구로동</td><td>21</td><td>19</td><td>14</td><td>3</td><td>20&gt;17(21-7+3)</td></tr>
      <tr><td>을</td><td>오류동</td><td>20</td><td>15</td><td>7</td><td></td><td>24(20+7-3)&gt;21</td></tr>
      <tr><td>갑</td><td>구로동</td><td>18</td><td>19</td><td>4</td><td></td><td>17&gt;15(19-4)</td></tr>
      <tr><td>을</td><td>오류동</td><td>17</td><td>15</td><td></td><td></td><td>21(17+4)&gt;19</td></tr>
      <tr><td>갑</td><td>구로동</td><td>18</td><td>20</td><td>5</td><td></td><td>16=16(20-3-1)</td></tr>
      <tr><td>을</td><td>오류동</td><td>16</td><td>15</td><td>2</td><td>1</td><td>20=20(16+3+1)</td></tr>
      </tbody>
      </table>



      <p>사례</p>



      <p>부동산 소유지분 교환시 취득세 납세의무 여부 질의 회신 (서울세제-11047(2018.08.21)취득세)</p>

      <p>공동 소유한 부동산을 지분 교환으로 어느 한 물건을 단독으로 소유하게 되어 당초 지분을 초과하는 경우 초과 부분은 교환취득으로서 취득세 납세의무가 있다.</p>

      <p>【질의요지】아파트1, 아파트2, 상가를 A, B, C가 각 부동산의 지분을 3/7, 3/7, 1/7 비율로 공동소유하고 있는 상태에서 지분을 교환하여 A가 아파트1을 단독으로 소유하게 되는 경우 지분 교환을 매매로 보아 취득세 납세의무가 있는지 여부</p>

      <p>【회신내용】「지방세법」제7조 제1항에서 취득세는 부동산 등을 취득한 자에게 부과한다고 규정하고 있고, 제6조 제1호에서는 "취득"이란 매매, 교환, 상속, 증여 등 유상·무상의 모든 취득을 말한다고 규정하고 있습니다.귀 질의와 같이 공동 소유한 부동산을 지분 교환으로 어느 한 물건을 단독으로 소유하게 되어 당초 지분을 초과하는 경우 초과 부분은 교환취득으로서 취득세 납세의무가 있는 것으로 판단됩니다.다만, 이에 해당하는지 여부는 과세관청이 구체적이고 객관적인 사실관계 등을 조사하여 최종 결정할 사안임을 알려드립니다. 끝.</p>

    </div>
  );
}
