"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { CalcBox } from "@/components/content/shared";

/**
 * meta:
 *   title: "가산금"
 *   category: "corp-acquisition-tax"
 *   group: "references"
 *   groupLabel: "실무참고"
 *   order: 10
 *   lastUpdated: "2026-04-23"
 *   sourceBook: "corp-practice"
 *   sourceBookTitle: "법인실무 (2025.12.31 반영)"
 *   sourceLeaf: "corp-practice/Ⅲ_기타_참고/09_가산금"
 *   sourcePages: [222, 222]
 *   sourceTaxTypes: ["common"]
 *   sourceKeyLawRefs: ["지방세특례제한법 제178조", "지방세특례제한법 시행령 제123조의2", "지방세기본법 제53조"]
 *   lawReference: "지방세특례제한법 제178조, 지방세특례제한법 시행령 제123조의2, 지방세기본법 제53조"
 */
export default function Content09AdditionalChargeV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">가산금</h1>



      <SectionNav sections={[
      { id: "summary", label: "요약" },
      { id: "concepts", label: "주요 개념" },
      { id: "section-3", label: "관련 법조문" },
      { id: "source", label: "원문" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 요약" id="summary">
        <p>2020.1.15. 이후 취득한 취득세 감면분이 추징사유에 해당할 때 납부하는 이자상당액의 계산 방법(기간 및 1일당 이율)을 다룬다. 적용 이율은 2023.12.31.까지 10만분의 25, 2024.1.1.부터 10만분의 22이며, 부칙 제3조에 경과규정이 있다. 가산세 계산 시 이자상당액은 제외된다.</p>
      </CalcBox>

      <CalcBox title="■ 주요 개념" id="concepts">
        <ul className="list-disc pl-6 my-4 space-y-1">
          <li><strong>이자상당액</strong> — 취득세 감면세액이 추징사유에 해당하여 납부할 때, 취득세 납부기한 다음날부터 추징사유 발생일까지 1일당 일정 이율(0.022% 또는 0.025%)로 산정하는 금액.</li>
          <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제178조" target="_blank" rel="noopener noreferrer">지특법 §178</a>, <a href="https://law.go.kr/법령/지방세특례제한법시행령/제123조의2" target="_blank" rel="noopener noreferrer">지특령 §123의2</a></li>
          <li><strong>취득세 감면 추징</strong> — 2020.1.15. 이후 취득한 부동산에 대해 취득세 감면을 받은 자가 추징사유에 해당하는 경우 감면된 세액을 다시 납부하도록 하는 제도.</li>
          <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제178조" target="_blank" rel="noopener noreferrer">지특법 §178</a></li>
          <li><strong>이자상당액 적용 이율</strong> — 추징 이자상당액 계산에 적용하는 1일당 이율로, 2023.12.31.까지는 10만분의 25, 2024.1.1.부터는 10만분의 22를 적용한다.</li>
          <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법시행령/제123조의2" target="_blank" rel="noopener noreferrer">지특령 §123의2</a></li>
          <li><strong>가산세와 이자상당액 구분</strong> — 취득세 추징 시 이자상당액은 가산세(지방세기본법 제53조~제54조) 계산에서 제외되어, 두 금액은 별도로 산정된다.</li>
          <li>관련 조문: <a href="https://law.go.kr/법령/지방세기본법/제53조" target="_blank" rel="noopener noreferrer">지기법 §53</a>, <a href="https://law.go.kr/법령/지방세기본법/제54조" target="_blank" rel="noopener noreferrer">지기법 §54</a></li>
        </ul>
      </CalcBox>

      <CalcBox title="■ 관련 법조문" id="section-3">
        <ul className="list-disc pl-6 my-4 space-y-1">
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제178조</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 시행령 제123조의2</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세기본법 제53조</code></li>
        </ul>
      </CalcBox>

      <CalcBox title="■ 원문" id="source">
        <p>이자상당액</p>

        <p>```text</p>
        <p>이자상당액 추징요건 / 2020.1.15.이후 취득한 취득세 감면분이 추징사유에 해당하여 감면된 세액을 납부하는 경우 / 이자상당액 계산 / ① 기간: 취득세 납부기한의 다음날부터 추징사유가 발생한 날까지 / ② 1일당 10만분의 22(0.022%): 2024.1.1.부터 / 10만분의 25(0.025%):  ~ 2023.12.31.까지 / ☞ 이 영 시행전에 감면받은 부동산에 대해서는 2023.12.31.까지의 기간은 10만분의 25 적용 / 2024.1.1. 이후부터는 10만분의 22를 적용(부칙 제3조) / ※ 지방세특례제한법 제178조(감면된 취득세의 추징) - 2020.1.15.신설 / ※ 지방세특례제한법시행령제123조의2(감면된 취득세의 추징에 관한 이자상당액의 계산 등) / ※ 가산세 계산시 이자상당액은 제외(지방세기본법 제53조 내지 제54조)</p>
        <p>```</p>
      </CalcBox>

    </div>
  );
}
