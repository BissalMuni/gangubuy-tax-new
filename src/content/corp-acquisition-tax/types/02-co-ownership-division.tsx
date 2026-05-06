"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { CalcBox, SubSection } from "@/components/content/shared";

/**
 * meta:
 *   title: "공유물 분할"
 *   category: "corp-acquisition-tax"
 *   group: "types"
 *   groupLabel: "취득유형별"
 *   order: 2
 *   lastUpdated: "2026-04-23"
 *   sourceBook: "corp-practice"
 *   sourceBookTitle: "법인실무 (2025.12.31 반영)"
 *   sourceLeaf: "corp-practice/Ⅱ_취득_유형별/02_공유물분할"
 *   sourcePages: [176, 177]
 *   sourceTaxTypes: ["acquisition_tax"]
 */
export default function Content02CoOwnershipDivisionV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">공유물 분할</h1>



      <SectionNav sections={[
      { id: "summary", label: "요약" },
      { id: "concepts", label: "주요 개념" },
      { id: "section-3", label: "수록 판례 (2건)" },
      { id: "section-4", label: "질의회신 (2건)" },
      { id: "source", label: "원문" },
      { id: "section-6", label: "공탁 취득일" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 요약" id="summary">
        <p>공익사업 수용에 따른 취득세 납세의무 성립 시기(취득일)를 다룬다. 공탁금 수령 여부, 이의재결 여부에 따라 공탁일·수용개시일·등기접수일 중 어느 날이 취득 시기가 되는지를 판례·예규를 통해 정리한다. 이의재결로 보상금이 증액되더라도 취득 시기는 수용개시일임을 확인한다.</p>
      </CalcBox>


      <CalcBox title="■ 주요 개념" id="concepts">
        <ul className="list-disc pl-6 my-4 space-y-1">
          <li><strong>공탁 취득일</strong> — 공익사업 수용 시 공탁금 수령 여부 및 이의재결 여부에 따라 결정되는 취득세 납세의무 성립 기준일. 공탁금 수령 시에는 공탁일·수용개시일·등기접수일 중 빠른 날, 미수령 시에는 수용개시일·등기접수일 중 빠른 날.</li>
          <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제20조" target="_blank" rel="noopener noreferrer">법 §20</a>, <code className="bg-gray-100 px-1 rounded text-sm">공익사업을 위한 토지 등의 취득 및 보상에 관한 법률/제45조</code></li>
          <li><strong>수용개시일</strong> — 토지수용위원회가 재결로써 결정한 날로, 사업시행자가 토지나 물건의 소유권을 취득하는 기준일. 이의재결로 보상금이 증액되어도 취득 시기는 변동되지 않는다.</li>
          <li>관련 조문: <code className="bg-gray-100 px-1 rounded text-sm">공익사업을 위한 토지 등의 취득 및 보상에 관한 법률/제45조</code>, <code className="bg-gray-100 px-1 rounded text-sm">공익사업을 위한 토지 등의 취득 및 보상에 관한 법률/제43조</code></li>
          <li><strong>이의재결</strong> — 수용재결에 불복하여 제기하는 이의신청에 따른 재결. 이의재결로 보상액이 증액되더라도 수용의 효력이나 취득 시기에는 영향을 미치지 않는다.</li>
          <li>관련 조문: <code className="bg-gray-100 px-1 rounded text-sm">공익사업을 위한 토지 등의 취득 및 보상에 관한 법률/제88조</code></li>
          <li><strong>대체취득</strong> — 수용된 토지 소유자가 보상금으로 다른 부동산을 취득하는 것. 취득시기는 보상금 공탁일(공탁통지를 받은 날)을 기준으로 한다.</li>
          <li>관련 조문: <code className="bg-gray-100 px-1 rounded text-sm">지방세특례법/제76조</code></li>
          <li><strong>취득세 납세의무 성립시기</strong> — 취득세의 납세의무가 발생하는 시점으로, 수용의 경우 수용개시일 또는 공탁일 등이 기준이 된다.</li>
          <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제20조" target="_blank" rel="noopener noreferrer">법 §20</a>, <a href="https://law.go.kr/법령/지방세기본법/제34조" target="_blank" rel="noopener noreferrer">지기법 §34</a></li>
        </ul>
      </CalcBox>


      <CalcBox title="■ 수록 판례 (2건)" id="section-3">
        <SubSection title="● 대법원2002다35461">
          <p><strong>쟁점</strong>: 수용보상금 지급·공탁 시 수용개시일에 소유권 취득 여부</p>
          <p><strong>판시사항</strong>: 사업시행자가 수용개시일까지 재결한 수용보상금을 지급하거나 공탁하면 수용개시일에 토지 등의 소유권을 취득하며, 이후 이의재결에서 보상액이 늘어났다 하더라도 그 사유만으로 달리 볼 수 없다.</p>
          <p><strong>관련 조문</strong>: <code className="bg-gray-100 px-1 rounded text-sm">공익사업을 위한 토지 등의 취득 및 보상에 관한 법률/제45조</code>, <code className="bg-gray-100 px-1 rounded text-sm">공익사업을 위한 토지 등의 취득 및 보상에 관한 법률/제40조</code>, <code className="bg-gray-100 px-1 rounded text-sm">공익사업을 위한 토지 등의 취득 및 보상에 관한 법률/제88조</code></p>
        </SubSection>

        <SubSection title="● 대법원2014두43387">
          <p><strong>쟁점</strong>: 이의재결에 의해 손실보상금이 증액된 경우 취득 시기</p>
          <p><strong>판시사항</strong>: 이의재결에 의해 손실보상금이 증액되었다 하더라도 취득의 시기는 수용개시일이다. 사업시행자가 수용개시일까지 보상금을 지급하거나 공탁하면 수용개시일에 소유권을 취득하며, 그 후 보상액이 늘어난 사유만으로 달리 볼 수 없다.</p>
          <p><strong>관련 조문</strong>: <code className="bg-gray-100 px-1 rounded text-sm">공익사업을 위한 토지 등의 취득 및 보상에 관한 법률/제45조</code>, <code className="bg-gray-100 px-1 rounded text-sm">공익사업을 위한 토지 등의 취득 및 보상에 관한 법률/제40조</code>, <code className="bg-gray-100 px-1 rounded text-sm">공익사업을 위한 토지 등의 취득 및 보상에 관한 법률/제42조</code>, <code className="bg-gray-100 px-1 rounded text-sm">공익사업을 위한 토지 등의 취득 및 보상에 관한 법률/제88조</code></p>
        </SubSection>
      </CalcBox>


      <CalcBox title="■ 질의회신 (2건)" id="section-4">
        <SubSection title="● 지방세특례제도과-1373">
          <p><strong>쟁점</strong>: 이의신청·행정소송 없는 공탁에 대한 대체취득의 취득시기</p>
          <p><strong>판시사항</strong>: 이의신청이나 행정소송을 제기하지 않고 공탁금 수령에도 제약이 없는 상태에서 단순히 공탁금 수령만 늦게 한 경우, 보상금 공탁일(공탁통지를 받은 날)이 사업시행자에게는 토지 등의 취득시기가 된다.</p>
          <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세법/제20조" target="_blank" rel="noopener noreferrer">법 §20</a></p>
        </SubSection>

        <SubSection title="● 세제과-9146">
          <p><strong>쟁점</strong>: 수용재결에 따른 취득세 납세의무 성립 시기(공탁금 미수령 시)</p>
          <p><strong>판시사항</strong>: 피공탁자가 공탁금을 찾아가지 않은 경우 사업시행자는 수용의 개시일에 해당 토지의 소유권을 취득하므로 취득세 납세의무는 수용의 개시일에 성립한다.</p>
          <p><strong>관련 조문</strong>: <code className="bg-gray-100 px-1 rounded text-sm">공익사업을 위한 토지 등의 취득 및 보상에 관한 법률/제45조</code></p>
        </SubSection>
      </CalcBox>


      <CalcBox title="■ 원문" id="source">
      </CalcBox>

      <CalcBox title="■ 공탁 취득일" id="section-6">
        <p>```text</p>
        <p>공탁금을 수령했을 경우:        공탁일, 수용개시일, 등기접수일 중 빠른날. / 공탁금을 수령하지 않았을 경우:  수용개시일, 등기접수일 중 빠른날 / ※ 이의재결에 의해 손실보상금이 증액되었다 하더라도 취득의 시기는 수용개시일이다. / (대법원 2014두43387, 2017.3.30.). / ※ 「공익사업을 위한 토지 등의 취득 및 보상에 관한 법률」</p>
        <p>```</p>

        <p>이의신청 및 행정소송이 없는 공탁에 대한 대체취득의 취득시기는 공탁일임</p>

        <p>(지방세특례제도과-1373, 2022.06.27.)</p>

        <p>토지 등 수용을 당한 자가 토지수용위원회의 재결에 대하여 이의신청이나 행정소송을 제기하지 않고, 공탁금의 수령에도 제약이 없는 상태에서 단순히 공탁금 수령만 늦게 한 경우라면, 보상금 공탁일(공탁통지를 받은 날)이 사업시행자에게는 토지 등의 취득시기가 되고, 상대방인 토지 등 수용을 당한 자에게는 토지 등의 양도시기(그 보상금을 마지막으로 받은 날)가 된다고 할 것임.</p>



        <p>대법원 2017.3.30 선고 2014두43387</p>

        <p>구 도시 및 주거환경정비법(2012. 2. 1. 법률 제11293호로 개정되기 전의 것) 제40조 제1항에 의하여 정비구역 안에서 정비사업을 시행하기 위한 토지 또는 건축물의 소유권과 그 밖의 권리에 대한 수용 또는 사용에 관하여 준용되는 구 공익사업을 위한 토지 등의 취득 및 보상에 관한 법률(2013. 3. 23. 법률 제11690호로 개정되기 전의 것)에 의하면,</p>

        <p>① 사업시행자는 관할 토지수용위원회가 재결로써 결정한 수용 개시일에 토지나 물건의 소유권을 취득하고(제45조 제1항) 토지소유자 등은 수용 개시일까지 당해 토지나 물건을 사업시행자에게 인도하거나 이전하여야 하나(제43조),</p>

        <p>② 한편 사업시행자는 수용 개시일까지 토지수용위원회가 재결한 보상금을 지급하거나 공탁하여야 하며(제40조 제1항, 제2항), 만일 사업시행자가 수용 개시일까지 보상금을 지급 또는 공탁하지 아니한 때에는 그 재결은 효력을 상실하지만(제42조 제1항),</p>

        <p>③ 일단 그 재결에 의한 수용의 효력이 생긴 후에는 그 재결에 대한 이의신청이나 행정소송의 제기가 있다 하더라도 그 수용의 효력을 정지시키지 아니한다(제88조).</p>

        <p>따라서 사업시행자가 수용 개시일까지 토지수용위원회가 재결한 수용보상금을 지급하거나 공탁하면 수용 개시일에 토지나 물건의 소유권을 취득하며, 설령 그 후 이의재결에서 보상액이 늘어났다 하더라도 그 사유만으로 달리 볼 수 없다(대법원 2002. 10. 11. 선고 2002다35461 판결 등 참조).</p>



        <p>서울특별시 본청  세제과-9146 (2012.07.20.) - 공익사업을 위한 토지등의</p>

        <p>#### 귀 문의 경우 ○○공사가 공취법에 의한 수용재결에 따라 토지를 취득하면서 수용개시일 이전에 보상금지급을 완료하였다면 취득의 시기는 잔금지급일로 보아야 하나, 피 공탁자가 그 공탁금을 찾아가지 않은 경우 사업시행자는 수용의 개시일에 그 토지의 소유권을 취득한다(공취법 제45조ⓛ)라고 규정하고 있으므로 취득세 납세의무는 수용의 개시일에 성립한다고 판단됩니다. 다만 이에 대하여는 과세권자가 사실관계 등을 면밀히 검토하여 최종 판단할 사항임을 알려드립니다. 끝</p>
      </CalcBox>

    </div>
  );
}
