"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { CalcBox } from "@/components/content/shared";

/**
 * meta:
 *   title: "목차·개요"
 *   category: "corp-acquisition-tax"
 *   group: "references"
 *   groupLabel: "실무참고"
 *   order: 1
 *   lastUpdated: "2026-04-23"
 *   sourceBook: "corp-practice"
 *   sourceBookTitle: "법인실무 (2025.12.31 반영)"
 *   sourceLeaf: "corp-practice/0_목차/00_목차_커버"
 *   sourcePages: [1, 1]
 *   sourceKeyLawRefs: ["지방세특례제한법 제57조의2 제4항", "지방세법 제7조 제5항", "지방세특례제한법 제57조의2 제2항", "지방세법 제9조 제2항", "지방세특례제한법 제46조", "지방세특례제한법 제20조", "지방세특례제한법 제47조의2", "지방세특례제한법 제10조", "지방세특례제한법 제73조", "지방세특례제한법 제57조의2 제1항"]
 *   lawReference: "지방세특례제한법 제57조의2 제4항, 지방세법 제7조 제5항, 지방세특례제한법 제57조의2 제2항, 지방세법 제9조 제2항, 지방세특례제한법 제46조, 지방세특례제한법 제20조, 지방세특례제한법 제47조의2, 지방세특례제한법 제10조, 지방세특례제한법 제73조, 지방세특례제한법 제57조의2 제1항"
 */
export default function Content00OverviewV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">목차·개요</h1>



      <SectionNav sections={[
      { id: "summary", label: "요약" },
      { id: "concepts", label: "주요 개념" },
      { id: "section-3", label: "관련 법조문" },
      { id: "source", label: "원문" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 요약" id="summary">
        <p>이 리프는 지방세 실무 해설서의 목차·커버 페이지로, 취득세·재산세 관련 주요 감면·비과세·실무 쟁점 항목들을 열거하고 있다. 개인사업자 법인전환, 과점주주, 법인합병·분할, 임대주택 감면, 지식산업센터 감면 등 지방세특례제한법 및 지방세법 조문별 실무 주제를 목록화한 색인 페이지이다.</p>
      </CalcBox>


      <CalcBox title="■ 주요 개념" id="concepts">
        <ul className="list-disc pl-6 my-4 space-y-1">
          <li><strong>개인사업자 법인전환</strong> — 개인사업자가 현물출자 또는 사업양수도 방식으로 법인으로 전환하는 것으로, 지특법 제57조의2 제4항에 따른 취득세 감면이 적용된다.</li>
          <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제57조의2" target="_blank" rel="noopener noreferrer">지특법 §57의2 제4항</a></li>
          <li><strong>과점주주</strong> — 법인 주식의 일정 비율 이상을 보유한 주주로, 지방세법 제7조 제5항에 따라 취득세 납세의무가 의제된다.</li>
          <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제7조" target="_blank" rel="noopener noreferrer">법 §7 제5항</a>, <a href="https://law.go.kr/법령/지방세법시행령/제11조" target="_blank" rel="noopener noreferrer">시행령 §11</a></li>
          <li><strong>법인합병·분할</strong> — 법인 간 합병 또는 분할 시 취득세 감면을 규정하는 지특법 제57조의2 제1항·제3항이 적용되는 거래 형태이다.</li>
          <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제57조의2" target="_blank" rel="noopener noreferrer">지특법 §57의2 제1항</a>, <a href="https://law.go.kr/법령/지방세특례제한법/제57조의2" target="_blank" rel="noopener noreferrer">지특법 §57의2 제3항</a></li>
          <li><strong>기부채납 비과세</strong> — 국가 또는 지방자치단체에 재산을 기부채납(귀속)하는 경우 지방세법 제9조 제2항에 따라 취득세가 비과세된다.</li>
          <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제9조" target="_blank" rel="noopener noreferrer">법 §9 제2항</a></li>
          <li><strong>임대주택 감면</strong> — SH·LH 등이 취득하는 임대주택에 대해 지특법 제31조에 따라 취득세·재산세가 감면되는 제도이다.</li>
          <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제31조" target="_blank" rel="noopener noreferrer">지특법 §31</a>, <a href="https://law.go.kr/법령/지방세특례제한법/제32조" target="_blank" rel="noopener noreferrer">지특법 §32</a></li>
          <li><strong>지식산업센터 감면</strong> — 지식산업센터를 신축하거나 최초 분양받는 경우 지특법 제58조의2에 따라 취득세·재산세 감면 혜택이 부여된다.</li>
          <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제58조의2" target="_blank" rel="noopener noreferrer">지특법 §58의2</a></li>
          <li><strong>최소납부제</strong> — 감면특례의 제한으로, 지특법 제177조의2에 따라 일정 규모 이상 납세자는 감면 후에도 최소한의 세액을 납부해야 한다.</li>
          <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제177조의2" target="_blank" rel="noopener noreferrer">지특법 §177의2</a></li>
          <li><strong>대체취득 감면</strong> — 토지수용 등으로 인해 대체 취득하는 부동산에 대해 지특법 제73조에 따라 취득세 감면이 적용된다.</li>
          <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제73조" target="_blank" rel="noopener noreferrer">지특법 §73</a>, <a href="https://law.go.kr/법령/지방세특례제한법/제73조" target="_blank" rel="noopener noreferrer">지특법 §73 제3항</a></li>
          <li><strong>추징규정</strong> — 지특법 제178조에 따른 일반적 추징규정으로, 감면 요건을 사후에 위반한 경우 감면된 세액을 추징하는 규정이다.</li>
          <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제178조" target="_blank" rel="noopener noreferrer">지특법 §178</a></li>
          <li><strong>중복감면 배제</strong> — 지방세특례제한법 제180조에 따라 동일 과세물건에 대해 복수의 감면 규정이 적용될 경우 중복 감면을 제한하는 제도이다.</li>
          <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제180조" target="_blank" rel="noopener noreferrer">지특법 §180</a></li>
          <li><strong>창업벤처기업 감면</strong> — 창업 또는 벤처기업이 취득하는 부동산에 대해 지특법 제58조의3에 따라 취득세·재산세 감면이 적용된다.</li>
          <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제58조의3" target="_blank" rel="noopener noreferrer">지특법 §58의3</a></li>
          <li><strong>재개발조합 감면</strong> — 재개발조합이 사업 시행을 위해 취득하는 부동산(체비지·보류지 포함)에 대해 지특법 제74조에 따라 취득세 감면이 적용된다.</li>
          <li>관련 조문: <a href="https://law.go.kr/법령/지방세특례제한법/제74조" target="_blank" rel="noopener noreferrer">지특법 §74</a></li>
        </ul>
      </CalcBox>


      <CalcBox title="■ 관련 법조문" id="section-3">
        <ul className="list-disc pl-6 my-4 space-y-1">
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제57조의2 제4항</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세법 제7조 제5항</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제57조의2 제2항</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세법 제9조 제2항</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제46조</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제20조</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제47조의2</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제10조</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제73조</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제57조의2 제1항</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제57조의2 제3항 제2호</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제84조</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제22조</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제22조의4</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제87조</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제19조</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제31조</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제74조</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제85조의2</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제79조</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제58조의2</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제58조의3</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제60조 제3항</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제32조</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제45조</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제73조 제3항</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제177조의2</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제178조</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제180조</code></li>
          <li><code className="bg-gray-100 px-1 rounded text-sm">지방세특례제한법 제79조의2</code></li>
        </ul>
      </CalcBox>


      <CalcBox title="■ 원문" id="source">
        <p>```text</p>
        <p>◯ 개인사업자의법인전환(현물출자/사업양수도),법인전환실무(지특법 제57조의2제4항) / ◯ 과점주주 / 실무 및 사례(지방세법제7조제5항및시행령제11조) / ◯ 금융회사간합병(지특법 제57조의2제2항) / ◯ 기부채납(귀속 등) 비과세(지방세법제9조제2항) / ◯ 기업부설연구소 / 실무 및 사례(지특법제46조) / ◯ 노인복지시설에 대한 감면(지특법제20조) / ◯ 녹색인증건축물에 대한 감면(지특법제47조의2,3) / ◯ 농어업인 융자관련 감면(지특법제10조) / ◯ 대체취득(토지수용 등)에 대한 감면(지특법제73조) / ◯ 법인합병/합병실무(지특법제57조의2제1항) / ◯ 법인분할/분할실무(지특법제57조의2제3항제2호) / ◯ 사권제한토지(지특법제84조) / ◯ 사회복지법인 / 사례(지특법제22조) / ◯ 사회적기업(지특법제22조의4) / ◯ 새마을금고등에 대한 감면(지특법제87조) / ◯ 어린이집 및 유치원에 대한 감면(지특법제19조) / ◯ 임대주택에 대한 감면 (SH,LH포함)(지특법제31조) / ◯ 재개발조합 감면 / 체비지,보류지(지특법제74조) / ◯ 지방공기업등에 대한 감면 (SH등)(지특법제85조의2) / ◯ 지방이전등에 대한 감면(지특법제79조) / ◯ 지식산업센터에 대한 감면/ 실무&사례(지특법제58조의2) / ◯ 창업벤처기업 / 창업벤처 실무(지특법제58조의3) / ◯ 창업보육센터에 대한 감면(지특법제60조제3항) / ◯ 한국토지주택공사에 대한 감면 (LH)(지특법제32조) / ◯ 학술연구 및 장학단체등에 대한 감면(지특법제45조) / ◯ 환매권행사 매수부동산 감면(지특법제73조제3항) / ◯ 최소납부제(감면특례의 제한)(지특법제177조의2) / ◯ 지특법 일반적 추징규정 적용요령(지특법제178조) / ---------------------------------------------------- / ◯ 학교 및 종교단체 감면대상 등(사택감면여부등) / ◯ 재산세 과세대상     ◯ 중복감면 배제(지방세특례제한법제180조) / ◯ 해외진출기업의 국내복귀에 대한감면(지방세특례제한법제79조의2) | 【취득】 / 개수(시설,시설물) / 공유물분할 / 공탁 / 교환 / 신탁 증여(부담부) / 대물변제 / 지목변경 / 이행판결 등 / 소유권회복,합의해제 / 현물출자</p>
        <p>취득의 시기 / 【취득가격 범위(과표)】</p>
        <p>등록번호 / (부동산등기등록번호,국가 등)</p>
        <p>수익사업의 범위</p>
        <p>※수정신고.경정신고</p>
        <p>무허가주택세율정리</p>
        <p>조직변경 / (주식회사-&gt;유한회사/ / 특수법인→사단법인 등)</p>
        <p>소송(행정,민사)</p>
        <p>정당한사유</p>
        <p>가산세, 가산금 / 이자상당액 / 부당이득금반환</p>
        <p>국민주택채권</p>
        <p>토지등급표</p>
        <p>부동산시가표준액표 / 용도지수 적용요령</p>
        <p>한국표준산업분류표</p>
        <p>회원권</p>
        <p>비조합원용토지</p>
        <p>등록면허세</p>
        <p>```</p>
      </CalcBox>

    </div>
  );
}
