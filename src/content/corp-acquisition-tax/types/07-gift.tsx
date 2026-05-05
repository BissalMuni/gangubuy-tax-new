"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";

export const meta = {
  title: "증여 (부담부)",
  category: "corp-acquisition-tax",
  group: "types",
  groupLabel: "취득유형별",
  order: 7,
  lastUpdated: "2026-04-23",
  sourceBook: "corp-practice",
  sourceBookTitle: "법인실무 (2025.12.31 반영)",
  sourceLeaf: "corp-practice/Ⅱ_취득_유형별/07_증여_부담부",
  sourcePages: [185,185],
  sourceTaxTypes: ["acquisition_tax"],
};

export default function Content07GiftV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">증여 (부담부)</h1>



      <SectionNav sections={[
      { id: "summary", label: "요약" },
      { id: "concepts", label: "주요 개념" },
      { id: "source", label: "원문" },
      ]} />

      <hr className="my-6" />

      <h2 id="summary">
      <Outline level={1}>요약</Outline>
      </h2>

      <p>본 리프는 지방세 기본통칙 13…27-1에 따른 중과 예외 대상인 채권보전용 부동산의 범위를 다룬다. 채권자가 담보·변제·경매 실행 등을 위해 취득한 부동산은 중과대상에서 제외되며, 일시적 사용·수익의 경우에도 동일하게 적용된다. 건설업 공사미수금의 개념도 함께 설명된다.</p>


      <h2 id="concepts">
      <Outline level={1}>주요 개념</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>채권보전용 부동산</strong> — 채권자가 채권의 담보·변제·실행을 위해 취득하는 부동산으로, 양도담보, 대물변제, 경매 경락 등의 방법으로 취득한 것을 포함한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제13조" target="_blank" rel="noopener noreferrer">법 §13</a></li>
        <li><strong>중과 예외</strong> — 대도시 내 부동산 취득세 중과 규정의 적용 대상에서 제외되는 경우로, 채권보전 목적의 부동산 취득이 이에 해당한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제13조" target="_blank" rel="noopener noreferrer">법 §13</a></li>
        <li><strong>양도담보</strong> — 채권의 담보를 위해 부동산 소유권을 채권자에게 이전하는 담보 방식으로, 채권보전용 부동산 취득의 한 유형이다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제13조" target="_blank" rel="noopener noreferrer">법 §13</a></li>
        <li><strong>대물변제</strong> — 채무자가 원래의 급부 대신 다른 급부(부동산)로 채무를 변제하는 방식으로, 채권자의 채권보전용 부동산 취득 원인이 된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제13조" target="_blank" rel="noopener noreferrer">법 §13</a></li>
        <li><strong>공사미수금</strong> — 건설업의 주된 영업활동인 건설공사 수익창출 과정에서 발생한 채권으로, 재무상태표에 공사미수금·분양미수금·받을어음 등으로 표기된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제13조" target="_blank" rel="noopener noreferrer">법 §13</a></li>
        <li><strong>일시적 사용·수익</strong> — 채권보전용 부동산 취득 후 소유권이전등기를 마치고 일시적으로 해당 부동산을 사용하거나 수익하는 경우로, 중과 예외 판단에 영향을 주지 않는다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제13조" target="_blank" rel="noopener noreferrer">법 §13</a></li>
      </ul>


      <h2 id="source">
      <Outline level={1}>원문</Outline>
      </h2>

      <p>※기본통칙13…27-1【중과예외 되는 채권보전용 부동산의 범위】</p>

      <p>①채권자가 채권의 담보.변제.실행을 하기 위하여 채권보전용 부동산을 취득하는 경우는 다음과 같다.</p>

      <p>1.채권에 대한 양도담보로 제공받는 등 채권자가 그 채권의 담보를 위하여 취득하는 경우</p>

      <p>2.채권에 대한 대물변제로 취득하는 동 채권자가 그 변제를 받는 일환으로 취득하는 경우</p>

      <p>3.담보목적물의 부동산에 대한 경매절차에서 채권자가 직접 경락받는 등 채권자가 그 채권의 담보권을</p>

      <p>실행하는 과정에서 취득하는 경우</p>

      <p>4.제1호부터 제3호까지와 유사한 사유로 취득하는 경우</p>

      <p>② 채권보전용 부동산을 취득하여 소유권 이전등기를 한 후 일시적으로 사용.수익하는 경우라도</p>

      <p>채권보전행사용 부동산 소유권이전으로 보아 중과대상에서 제외한다.(지점 설치 등은 중과대상임)</p>



      <p>건설업 공사미수금은 주된 영업활동인 건설공사의 수익창출과정에서 발생한 채권을 말하며 건설업 재무상태표에는 공사미수금, 분양미수금, 받을어음 등의 형태로 표기됨.</p>

    </div>
  );
}
