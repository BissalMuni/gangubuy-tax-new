"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";

export const meta = {
  title: "창업보육센터",
  category: "corp-acquisition-tax",
  group: "reductions",
  groupLabel: "감면",
  order: 25,
  version: "1.0",
  lastUpdated: "2026-04-23",
  sourceBook: "corp-practice",
  sourceBookTitle: "법인실무 (2025.12.31 반영)",
  sourceLeaf: "corp-practice/Ⅰ_지특법_감면/25_창업보육센터_감면_지특법60조3항",
  sourcePages: [157,157],
  sourceTaxTypes: ["acquisition_tax","property_tax"],
  sourceKeyLawRefs: ["지방세특례제한법 제32조","지방세특례제한법 제31조"],
  lawReference: "지방세특례제한법 제32조, 지방세특례제한법 제31조",
};

export default function Content25StartupIncubatorV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">창업보육센터</h1>



      <SectionNav sections={[
      { id: "summary", label: "요약" },
      { id: "concepts", label: "주요 개념" },
      { id: "section-3", label: "예규 (2건)" },
      { id: "section-4", label: "관련 법조문" },
      { id: "source", label: "원문" },
      ]} />

      <hr className="my-6" />

      <h2 id="summary">
      <Outline level={1}>요약</Outline>
      </h2>

      <p>본 리프는 공공주택사업자(한국토지주택공사 등)의 기존주택 매입임대주택에 대한 취득세·재산세 감면 요건 및 감면율을 다룬다. 지방세특례제한법 제31조·제32조 적용 시 철거 후 신축 공급주택의 감면 해당 여부, 최초 취득 범위 등 실무 쟁점을 예규·유권해석을 통해 설명한다. 경로명은 창업보육센터 감면(제60조 제3항)이나 본문 내용은 임대주택 감면(제31조·제32조) 관련이다.</p>


      <h2 id="concepts">
      <Outline level={1}>주요 개념</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>공공매입임대주택</strong> — 공공주택사업자가 기존주택을 매입하여 임대 목적으로 공급하는 주택으로, 지방세특례제한법 제31조 등에 따른 취득세·재산세 감면 대상이 된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제31조" target="_blank" rel="noopener noreferrer">지특법 §31</a>, <a href="https://law.go.kr/법령/지방세특례제한법/제32조" target="_blank" rel="noopener noreferrer">지특법 §32</a></li>
        <li><strong>철거 후 신축 공급</strong> — 기존주택을 매입 후 철거하고 새로 건축물을 신축하여 공급하는 방식으로, 원칙적으로 공공매입임대주택 감면 규정 적용 대상에서 제외된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제31조" target="_blank" rel="noopener noreferrer">지특법 §31 제5항</a></li>
        <li><strong>최초 취득</strong> — 임대사업자가 건축주로부터 공동주택을 임대 목적으로 처음 취득하는 것으로, 일부 취득뿐 아니라 전체 취득의 경우도 포함한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제31조" target="_blank" rel="noopener noreferrer">지특법 §31</a>, <a href="https://law.go.kr/법령/지방세특례제한법/제32조" target="_blank" rel="noopener noreferrer">지특법 §32</a></li>
        <li><strong>소규모 공동주택용 토지</strong> — 지방세특례제한법 제32조 제3항에서 규정하는 소규모 공동주택 건설을 위한 토지로, 취득일로부터 4년 이내에 사업계획승인 등 요건을 충족해야 한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제32조" target="_blank" rel="noopener noreferrer">지특법 §32 제3항</a></li>
        <li><strong>공시가격 한도액</strong> — 재산세 감면 적용 시 대상 물건의 공시가격 상한으로, 건설임대 9억 원 이하, 매입임대 6억 원 이하, 오피스텔 시가표준 4억 원 이하 기준이 적용된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제31조" target="_blank" rel="noopener noreferrer">지특법 §31 제4항</a></li>
      </ul>


      <h2 id="section-3">
      <Outline level={1}>예규 (2건)</Outline>
      </h2>

      <Outline level={2}>지방세특례제도과-716</Outline>
      <p><strong>쟁점</strong>: 철거 후 다가구주택 신축 공급이 공공매입임대주택 감면 대상인지 여부</p>
      <p><strong>판시사항</strong>: 기존 주택을 매입하여 철거하고 다시 다가구주택을 신축하여 공급하는 것은 공공매입임대주택으로 공급하는 경우로 볼 수 없어 지방세특례제한법 제31조 제5항의 감면규정을 적용할 수 없다. 아울러 취득세는 철거 후 신축 공급하는 다가구주택에 대해서는 감면 대상이 아니다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세특례제한법/제31조" target="_blank" rel="noopener noreferrer">지특법 §31 제5항</a></p>

      <Outline level={2}>지방세특례제도과-2564</Outline>
      <p><strong>쟁점</strong>: 임대사업자가 건축주로부터 공동주택 전체를 최초 취득하는 경우 감면 적용 범위</p>
      <p><strong>판시사항</strong>: 임대사업자가 건축주로부터 공동주택을 임대할 목적으로 취득하여 임대용으로 사용하는 경우라면 일부만을 취득하는 경우뿐만 아니라 전체를 최초 취득하는 경우까지 포함한다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세특례제한법/제31조" target="_blank" rel="noopener noreferrer">지특법 §31</a>, <a href="https://law.go.kr/법령/지방세특례제한법/제32조" target="_blank" rel="noopener noreferrer">지특법 §32</a></p>


      <h2 id="section-4">
      <Outline level={1}>관련 법조문</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제32조</code></li>
        <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제31조</code></li>
      </ul>


      <h2 id="source">
      <Outline level={1}>원문</Outline>
      </h2>

      <p>② 법 제32조제3항에서 "대통령령으로 정하는 기간"이란 제1항에 따른 소규모 공동주택용 토지를 취득한 날(토지를 일시에 취득하지 아니하는 경우에는 최종 취득일을 말하며, 최종 취득일 이전에 사업계획을 승인받은 경우에는 그 사업계획승인일을 말한다)부터 4년을 말한다.</p>



      <p>※ 공공주택특별법 제43조(공공주택사업자의 기존주택 매입) ① 공공주택사업자는 「주택법」 제49조에 따른 사용검사 또는 「건축법」 제22조에 따른 사용승인을 받은 주택으로서 대통령령으로 정하는 규모 및 기준의 주택(이하 "기존주택"이라 한다)을 매입하여 공공매입임대주택으로 공급할 수 있다.</p>



      <p>⊙ 한국토지주택공사 실무</p>

      <p>☞ 감면요건 및 감면세율 - 지방세특례제한법 제32조 및 31조 적용</p>

      <p>```text</p>
      <p>구 분 | 감면요건 | 감 면 율 | 감면 / 농특세 | 비고</p>
      <p>건설 및 / 최초 / 분양 | 지방세특례제한법 제31조1항2항4항참조 / ☞  『임대주택 감면 실무 및 사례」 파트의 공공주택사업자 부분 / 취득세·재산세 감면 및 추징사유 참조할 것 | 비과세 | 지특법 / 31조 / 1항 / 2항 / 4항</p>
      <p>매입 | -아파트·연립주택 다세대주택·기숙사   & 그부속토지 / -오피스텔&부속토지 / ☞상하수도,전용부억, 전용 화장실및목욕시설 갖춘 오피스텔한정 | 85㎡ 이하 / (재산세는 구조변경, / 철거후신축 공급주택 / 및 건축물 포함) | 취득세: 25%경감 / 재산세: 50%경감 / (2027.12.31.까지) / ※ 취득세는 철거후 신축 공급하는 / 다가구주택은 감면대상 아님 / (지방세특례제도과-716 2019.9.25.) | 서민주택 / 비과세 | 지특법 / 31조6항</p>
      <p>단독주택, 다중주택 및 다가구주택과 그 부속토지 | 면적구분 없음 / (재산세는 구조변경, / 철거후신축 공급주택 / 및 건축물 포함)</p>
      <p>※ 31조4항에 따른 재산세 감면시 대상물건의 공시가격 한도액 【건설임대:공시 9억↓, 매입임대:공시 6억↓, 오피스텔:시가표준4억↓】</p>
      <p>```</p>

      <p>☞ 한국토지주택공사는 공공주택사업자에 해당하므로 최초분양 받은60㎡이하의 공동주택은 취득세 100%</p>

      <p>면제 가능할것으로 판단되나 / 소규모다세대주택을 일괄분양 매입시 분양의 조건인 수분양자에게</p>

      <p>분양된 것에 해당하지 않는다고 판단하여 32조의 규정을 적용, 50%만 감면신청하고 있었음.</p>

      <p>☞ 임대사업자가 건축주로부터 공동주택을 임대할 목적으로 취득하여 임대용으로 사용하는 경우라면 일부만을 취득하는 경우 뿐만 아니라 전체를 최초 취득하는 경우까지 포함한다.(지방세특례제도과-2564.2018.7.24.)라고 유권해석</p>

      <p>☞ 한국토지주택공사가 기존주택 매입후 신축하여 공급하는 임대주택건물(다중주택,다가구주택)은 기존주택 매입후 개량(건설한 경우 포함)하여 공급하는 경우에 해당하므로 감면대상에 해당. (2018.4.27 올타 답변)</p>

      <p>☞ 지방세특례제도과-716(20190925) 기존 주택을 매입하여 철거하고 다시 다가구주택을 신축하여 공급하는 것은 공공매입임대주택으로 공급하는 경우로 볼 수 없어 「지방세특례제한법」제31조제5항의 감면규정을 적용할 수 없음</p>

    </div>
  );
}
