"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";

export const meta = {
  title: "부당이득금 반환·소멸시효",
  category: "corp-acquisition-tax",
  group: "references",
  groupLabel: "실무참고",
  order: 8,
  lastUpdated: "2026-04-23",
  sourceBook: "corp-practice",
  sourceBookTitle: "법인실무 (2025.12.31 반영)",
  sourceLeaf: "corp-practice/Ⅲ_기타_참고/07_부당이득금반환_소멸시효",
  sourcePages: [218,219],
  sourceTaxTypes: ["common"],
  sourceKeyLawRefs: ["지방세기본법 제52조","지방세기본법 제57조"],
  lawReference: "지방세기본법 제52조, 지방세기본법 제57조",
};

export default function Content07UnjustEnrichmentV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">부당이득금 반환·소멸시효</h1>



      <SectionNav sections={[
      { id: "summary", label: "요약" },
      { id: "concepts", label: "주요 개념" },
      { id: "section-3", label: "수록 판례 (2건)" },
      { id: "section-4", label: "조심 판례 (2건)" },
      { id: "section-5", label: "관련 법조문" },
      { id: "source", label: "원문" },
      { id: "section-7", label: "가산세" },
      ]} />

      <hr className="my-6" />

      <h2 id="summary">
      <Outline level={1}>요약</Outline>
      </h2>

      <p>이 리프는 지방세 가산세(무신고·과소신고·납부불성실)의 연혁, 적용요령 및 감면 기준을 다룬다. 특히 취득세 감면 신청 착오 시 과소신고가산세 부과 여부에 관한 대법원 판례(2022두49311)와 행정해석의 상충, 그리고 등록면허세 관련 정당한 사유로 가산세를 면제한 조심 결정(2023지3665)을 중심으로 검토한다.</p>


      <h2 id="concepts">
      <Outline level={1}>주요 개념</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>과소신고가산세</strong> — 납세의무자가 신고하여야 할 납부세액보다 적게 신고한 경우 부과하는 가산세로, 과소신고 세액의 10%에 해당한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세기본법/제54조" target="_blank" rel="noopener noreferrer">지기법 §54</a></li>
        <li><strong>무신고가산세</strong> — 과세표준 신고를 전혀 하지 않은 경우 납부하여야 할 세액의 20%를 부과하는 가산세이다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세기본법/제53조" target="_blank" rel="noopener noreferrer">지기법 §53</a></li>
        <li><strong>가산세 감면 정당한 사유</strong> — 납세의무자가 의무를 알지 못한 것이 무리가 아니었거나 의무 이행을 기대하기 어려운 사정이 있는 경우로서, 이 경우 가산세를 부과하지 아니한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세기본법/제57조" target="_blank" rel="noopener noreferrer">지기법 §57</a></li>
        <li><strong>신고불성실가산세</strong> — 납세의무자가 과세표준이나 산출세액 등의 신고의무를 이행하지 아니한 것에 대한 제재로 부과하는 가산세이며, 납부불성실가산세와 구별된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세기본법/제53조" target="_blank" rel="noopener noreferrer">지기법 §53</a>, <a href="https://law.go.kr/법령/지방세기본법/제54조" target="_blank" rel="noopener noreferrer">지기법 §54</a></li>
        <li><strong>착오 감면신청</strong> — 취득세 신고납부 시 감면 요건을 갖추지 못함에도 착오로 감면을 신청한 경우로서, 산출세액은 정확히 신고된 상태에서 감면 적용만 잘못된 경우를 말한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세기본법/제54조" target="_blank" rel="noopener noreferrer">지기법 §54</a></li>
        <li><strong>등록면허세 과세 규정 충돌</strong> — 지방세법과 채무자회생 및 파산에 관한 법률이 동일한 등기행위에 대해 등록면허세 과세 여부를 서로 달리 규정하고 있는 상태를 말한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제26조" target="_blank" rel="noopener noreferrer">법 §26</a>, <a href="https://law.go.kr/법령/지방세기본법/제57조" target="_blank" rel="noopener noreferrer">지기법 §57</a></li>
      </ul>


      <h2 id="section-3">
      <Outline level={1}>수록 판례 (2건)</Outline>
      </h2>

      <Outline level={2}>대법원2001두7886</Outline>
      <p><strong>쟁점</strong>: 가산세 부과의 정당한 사유 기준</p>
      <p><strong>판시사항</strong>: 납세의무자가 그 의무를 알지 못한 것이 무리가 아니었다고 할 수 있어서 그를 정당시 할 수 있는 사정이 있거나, 그 의무의 이행을 당사자에게 기대하는 것이 무리라고 하는 사정이 있는 등 의무해태를 탓할 수 없는 정당한 사유가 있는 경우에는 가산세를 부과할 수 없다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세기본법/제57조" target="_blank" rel="noopener noreferrer">지기법 §57</a></p>

      <Outline level={2}>대법원2022두49311</Outline>
      <p><strong>쟁점</strong>: 취득세 감면 착오 신청 시 신고불성실가산세 부과 가부</p>
      <p><strong>판시사항</strong>: 취득세 납세의무자가 각 과세표준에 세율을 곱한 산출세액을 정당하게 신고한 이상, 감면세액에 관한 판단을 그르쳐 최종 납부할 세액을 잘못 신고하였다 하더라도 취득세의 신고불성실가산세(과소신고가산세)를 부과할 수 없다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세기본법/제53조" target="_blank" rel="noopener noreferrer">지기법 §53</a>, <a href="https://law.go.kr/법령/지방세기본법/제54조" target="_blank" rel="noopener noreferrer">지기법 §54</a></p>


      <h2 id="section-4">
      <Outline level={1}>조심 판례 (2건)</Outline>
      </h2>

      <Outline level={2}>조심2018지0609</Outline>
      <p><strong>쟁점</strong>: 감면 신고 후 착오 감면 시 과소신고가산세 부과 여부</p>
      <p><strong>판시사항</strong>: 감면신고 후 착오 감면이었던 경우 과소신고가산세 부과 대상에 해당한다고 판단하였다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세기본법/제54조" target="_blank" rel="noopener noreferrer">지기법 §54</a></p>

      <Outline level={2}>조심2023지3665</Outline>
      <p><strong>쟁점</strong>: 지방세법과 채무자회생법의 등록면허세 과세 규정 충돌 시 가산세 면제 정당한 사유</p>
      <p><strong>판시사항</strong>: 지방세법 제26조 제2항 제1호와 채무자회생 및 파산에 관한 법률 제25조 제4항이 동일한 등기행위에 대해 등록면허세 과세여부를 달리 정하고 있어 납세자가 신고·납부하지 않은 것은 법률의 단순한 부지·오해로 보기 어려우며, 이는 가산세를 면제할 정당한 사유에 해당하므로 납부지연가산세 부과처분은 잘못이다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세기본법/제57조" target="_blank" rel="noopener noreferrer">지기법 §57</a>, <a href="https://law.go.kr/법령/지방세법/제26조" target="_blank" rel="noopener noreferrer">법 §26</a></p>


      <h2 id="section-5">
      <Outline level={1}>관련 법조문</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><code className="bg-gray-100 px-1 rounded text-sm">지방세기본법 제52조</code></li>
        <li><code className="bg-gray-100 px-1 rounded text-sm">지방세기본법 제57조</code></li>
      </ul>


      <h2 id="source">
      <Outline level={1}>원문</Outline>
      </h2>

      <h2 id="section-7">
      <Outline level={1}>가산세</Outline>
      </h2>

      <p>지방세기본법 제52조【가산세의부과】, 제53조【무신고가산세】, 제54조【과소신고】 , 제55조【납부불성실】</p>

      <p>가산세 연혁</p>

      <table>
      <thead>
      <tr><th>연도</th><th>가산세</th><th>가산세율</th><th>비  고</th></tr>
      <tr><th>&#126;2012</th><th>신고불성실</th><th>20%</th><th>산출세액보다 적을 경우</th></tr>
      </thead>
      <tbody>
      <tr><td>2013</td><td>무 신 고</td><td>20%</td><td>지방세관계법에 따른 산출세액 미신고</td></tr>
      <tr><td>과소신고</td><td>10%</td><td>지방세관계법에 따른 산출세액보다 적게신고</td><td></td></tr>
      <tr><td>2014&#126;15</td><td>무 신 고</td><td>20%</td><td>지방세법에 따른 산출한 세액 미신고(비과세는 가산세 없음) / (100% 감면은 미신고시 무조건 20%가산세 부과)</td></tr>
      <tr><td>과소신고</td><td>10%</td><td>지방세법에 따른 산출세액보다 적게 신고</td><td></td></tr>
      <tr><td>2016</td><td>무 신 고</td><td>20%</td><td>과세표준신고를 하지 않은 경우 신고로 납부하여야 할 세액</td></tr>
      <tr><td>과소신고</td><td>10%</td><td>신고하여야 할 납부세액보다 적게 신고</td><td></td></tr>
      <tr><td>2017&#126;</td><td>무 신 고</td><td>20%</td><td>과세표준신고를 하지 않은 경우 납부하여야할 세액</td></tr>
      <tr><td>과소신고</td><td>10%</td><td>신고하여야 할 납부세액보다 납부세액을 적게 신고</td><td></td></tr>
      </tbody>
      </table>

      <p>가산세 적용요령</p>

      <table>
      <thead>
      <tr><th>구분</th><th>사  례</th><th>가산세</th><th>가산세율</th></tr>
      </thead>
      <tbody>
      <tr><td>감면</td><td>신고납부시 감면 신청하였으나 착오감면신청 이었던 경우 / (기부채납, 임대주택감면(60일내 미등록) 등) 과소신고가산세 미부과 / (대법원2022두49311,2022.10.27.) 2021누64957,2020구합84426 / ---------------------------------------------------------------- / (조심2018지0609.2018.9.28): 과소신고 가산세 부과대상 / 지방세특례제도과-1002(2024.4.26.): 과소신고 가산세부과대상</td><td>과소신고가산세 / 부과할수 없음? / (대법원 판례가 있으나 2024.4.26. 지방세특례제도과에서 상반되는 내용으로 회신 함)</td><td>10%</td></tr>
      <tr><td>감면신고 후 사후 추징요건 발생시(60일이내 미신고시)</td><td>무 신 고</td><td>20%</td><td></td></tr>
      <tr><td>중과</td><td>당초 신고납부시 일반세율 신고하였으나 착오였던 경우</td><td>과소신고</td><td>10%</td></tr>
      <tr><td>사후에 중과요건 발생시(60일이내 미신고시)</td><td>무 신 고</td><td>20%</td><td></td></tr>
      </tbody>
      </table>

      <p>※ 당초 부동산 취득에 따른 취득신고시 착오로 감면신청한 경우 2016년도 부터 과소신고 가산세(10%) 적용.</p>

      <p>※ 대법원2022두49311.2022.10.27.(신고불성실가산세 부과할수 없음.)</p>

      <p>당초 납부불성실가산세는 원칙적으로 납세의무자가 최종적으로 납부하여야 할 세액의 납부의무를 이행하지 아니한 것에 대한 제재인 데 비하여 신고불성실가산세는 납세의무자가 과세표준이나 산출세액 등의 신고의무를 이행하지 아니한 것에 대한 제재로서 입법정책에 따라 세목별로 신고의무의 대상과 신고불성실가산세의 산정기초를 다양하게 정하고 있는 것으로 보이는 점 등을 종합하여 보면, 취득세 납세의무자가 그 각 과세표준에 세율을 곱한 ‘산출세액’을 정당하게 신고한 이상, 감면세액에 관한 판단을 그르쳐 최종적으로 납부할 세액을 잘못 신고하였다고 하더라도 취득세의 신고불성실가산세를 부과할 수 없다고 봄이 타당하다</p>



      <p>가산세 감면 : 정당한 사유가 있을 경우 가산세를 부과하지 아니함. 지방세기본법 제57조(가산세의 감면 등)</p>

      <table>
      <thead>
      <tr><th>구          분</th><th>감면율</th><th></th><th></th></tr>
      <tr><th>&#126;2019년까지</th><th>2020년 부터</th><th></th><th></th></tr>
      </thead>
      <tbody>
      <tr><td>수정신고시</td><td>법정신고기한이 지난후   1개월 이내</td><td>50%</td><td>90%</td></tr>
      <tr><td>법정신고기한이 지난후   1개월초과 &#126; 3개월 이내</td><td>75%</td><td></td><td></td></tr>
      <tr><td>법정신고기한이 지난후   3개월초과  &#126; 6개월 이내</td><td>50%</td><td></td><td></td></tr>
      <tr><td>법정신고기한이 지난후   6개월초과 &#126; 1년 이내</td><td>20%</td><td>30%</td><td></td></tr>
      <tr><td>법정신고기한이 지난후   1년초과 &#126; 1년6개월 이내</td><td>10%</td><td>20%</td><td></td></tr>
      <tr><td>법정신고기한이 지난후   1년6개월 초과 &#126; 2년 이내</td><td>10%</td><td></td><td></td></tr>
      <tr><td>기한후신고시</td><td>법정신고기한이 지난후   1개월 이내</td><td>50%</td><td>50%</td></tr>
      <tr><td>법정신고기한이 지난후    1개월초과 &#126; 3개월 이내</td><td>20%</td><td>30%</td><td></td></tr>
      <tr><td>법정신고기한이 지난후    3개월 초과 &#126; 6개월 이내</td><td>20%</td><td></td><td></td></tr>
      </tbody>
      </table>

      <p>조심2023지3665(2023.9.27.)</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>동일한 등기행위에 대하여 등록면허세 과세여부를 달리 정하고 있는 경우</li>
      </ul>

      <p>요지)「지방세법」제26조제2항제1호와 「채무자회생 및 파산에 관한 법률」제25조제4항에서 동일한 등기행위에 대하여 등록면허세 과세 여부를 서로 달리 정하고 있어 청구법인이 등록면허세 등을 신고·납부치 않은 것을 단순한 법률의 부지나 오해로 보기 어려우며, 이는 「지방세기본법」제57조에 따른 가산세를 면제할 정당한 사유에 해당한다고 보이므로 처분청이 납부지연가산세를 부과한 처분은 잘못이 있다고 판단됨</p>



      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>세법상 가산세는 과세권의 행사 및 조세채권의 실현을 용이하게 하기 위하여 납세자가 정당한 이유 없이 법에 규정된 신고·납부의무 등을 위반한 경우에 법이 정하는 바에 의하여 부과하는 행정상의 제재로서 납세의무자가 그 의무를 알지 못한 것이 무리가 아니었다고 할 수 있어서 그를 정당시 할 수 있는 사정이 있거나 그 의무의 이행을 당사자에게 기대하는 것이 무리라고 하는 사정이 있는 등 그 의무해태를 탓할 수 없는 정당한 사유가 있는 경우에는 부과할 수 없다 할 것이다(대법원 2003.1.10. 선고 2001두7886 판결, 같은 뜻임).</li>
      </ul>

      <p>이 건 등기와 관련하여「지방세법」과「채무자회생 및 파산에 관한 법률」에서 등록면허세 과세여부를 서로 달리 정하고 있어 청구법인의 입장에서는「채무자회생 및 파산에 관한 법률」에 따라 등록면허세 등을 신고․납부하지 않은 것이라고 할 것이고,</p>

      <p>동일한 등기행위에 대해 개별 법률에서 과세여부를 서로 달리 정하고 있는 이상 납세자가 양 법률 규정 모두를 사전에 인지하고 등록면허세 등을 신고ㆍ납부하는 것을 기대하는 것이 무리가 있다고 할 것이다.</p>

      <p>따라서, 청구법인이 이 건 등록면허세 등을 신고ㆍ납부하지 않은데 에는 납세자의 의무해태를 탓할 수 없는 정당한 사유가 있다고 보이므로 처분청이 이 건 등록면허세 등을 부과하면서 쟁점가산세를 부과한 처분은 잘못이 있다고 판단된다.</p>

    </div>
  );
}
