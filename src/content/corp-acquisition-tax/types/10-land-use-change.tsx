"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { CalcBox, SubSection } from "@/components/content/shared";
/**
 * meta:
 *   title: "지목변경"
 *   category: "corp-acquisition-tax"
 *   group: "types"
 *   groupLabel: "취득유형별"
 *   order: 10
 *   lastUpdated: "2026-04-23"
 *   sourceBook: "corp-practice"
 *   sourceBookTitle: "법인실무 (2025.12.31 반영)"
 *   sourceLeaf: "corp-practice/Ⅱ_취득_유형별/10_지목변경"
 *   sourcePages: [193,194]
 *   sourceTaxTypes: ["acquisition_tax"]
 *   sourceKeyLawRefs: ["지방세법 제137조 제1항 제1호","지방세법 시행령 제43조 제5항","지방세법 제28조 제2항"]
 *   lawReference: "지방세법 제137조 제1항 제1호, 지방세법 시행령 제43조 제5항, 지방세법 제28조 제2항"
 */
export default function Content10LandUseChangeV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">지목변경</h1>



      <SectionNav sections={[
      { id: "summary", label: "요약" },
      { id: "concepts", label: "주요 개념" },
      { id: "section-3", label: "예규 (2건)" },
      { id: "section-4", label: "관련 법조문" },
      { id: "source", label: "원문" },
      { id: "section-6", label: "현물출자" },
      { id: "section-7", label: "조직변경" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 요약" id="summary">
      <p>본 리프는 현물출자 시 취득세 납세의무 성립일(취득시기)과 법인 조직변경(주식회사↔유한회사, 유한회사→협동조합 등) 시 취득세·등록면허세 과세 여부를 다룬다. 조직변경의 경우 법인격 동일성 유지 여부와 신규출자 존재 여부가 핵심 판단 기준이다.</p>


      
      </CalcBox><CalcBox title="■ 주요 개념" id="concepts">
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>현물출자</strong> — 현물출자자에게 주주로서의 권리의무를 대가로 지급하고 현물을 취득하는 유상승계취득으로, 취득시기는 주식명의개서일 또는 소유권이전등기일 중 빠른 날이다.</li>
        <li><strong>조직변경</strong> — 법인이 법인격의 동일성을 유지하면서 회사 형태를 변경하는 것으로, 동일성 유지 여부에 따라 취득세·등록면허세 과세 여부가 달라진다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제28조" target="_blank" rel="noopener noreferrer">법 §28 제1항</a>, <a href="https://law.go.kr/법령/지방세법/제28조" target="_blank" rel="noopener noreferrer">법 §28 제2항</a>, <a href="https://law.go.kr/법령/지방세법시행령/제43조" target="_blank" rel="noopener noreferrer">시행령 §43 제5항</a></li>
        <li><strong>법인격 동일성</strong> — 조직변경 전후 법인이 동일한 법인격을 유지하는지 여부로, 이를 유지하는 경우 신규설립이 아닌 조직변경으로 보아 취득세 비과세 및 중과세 배제가 가능하다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제28조" target="_blank" rel="noopener noreferrer">법 §28 제2항</a></li>
        <li><strong>등록면허세 중과세</strong> — 대도시 내 법인 설립 또는 증자 시 지방세법 제28조 제2항에 따라 5년 이내 자본금 증자에 중과세율을 적용하는 것.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제28조" target="_blank" rel="noopener noreferrer">법 §28 제2항</a></li>
        <li><strong>유상승계취득</strong> — 대가를 지급하고 취득하는 방식으로, 현물출자가 이에 해당하며 취득세 일반세율이 적용된다.</li>
      </ul>


      
      </CalcBox><CalcBox title="■ 예규 (2건)" id="section-3">
      <SubSection title="● 서울세제-17315">
      <p><strong>쟁점</strong>: 주식회사↔유한회사 조직변경 후 5년 이내 증자 시 등록면허세 중과세 적용 여부</p>
      <p><strong>판시사항</strong>: 주식회사를 유한회사로 또는 유한회사에서 주식회사로 조직변경한 경우 법인격의 동일성을 유지하면서 조직을 변경한 것에 해당하므로, 5년 이내 자본금 증자 시 지방세법 제28조 제2항의 중과세 적용대상이 아니다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세법/제28조" target="_blank" rel="noopener noreferrer">법 §28 제2항</a></p>

      
        </SubSection><SubSection title="● 지방세운영과-1847">
      <p><strong>쟁점</strong>: 유한회사에서 협동조합으로 조직변경 시 취득세 납세의무 존재 여부</p>
      <p><strong>판시사항</strong>: 협동조합기본법 제60조의2에 따라 유한회사에서 협동조합으로 조직변경 등기를 한 경우 조직변경 전후 양자 간의 실질이 동일하다고 보기 어려우므로, 별도의 비과세·감면 규정이 없는 이상 취득세 납세의무가 있다.</p>
      <p><strong>관련 조문</strong>: <code className="bg-gray-100 px-1 rounded text-sm">협동조합기본법/제60조의2</code></p>


      
      
        </SubSection></CalcBox><CalcBox title="■ 관련 법조문" id="section-4">
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><code className="bg-gray-100 px-1 rounded text-sm">지방세법 제137조 제1항 제1호</code></li>
        <li><code className="bg-gray-100 px-1 rounded text-sm">지방세법 시행령 제43조 제5항</code></li>
        <li><code className="bg-gray-100 px-1 rounded text-sm">지방세법 제28조 제2항</code></li>
      </ul>


      
      </CalcBox><CalcBox title="■ 원문" id="source">
      
      </CalcBox><CalcBox title="■ 현물출자" id="section-6">
      <p>```text</p>
      <p>취득시기 : 주식명의개서일 또는 소유권이전등기일 중 빠른날 / 적용세율 : 유상승계취득 / 과   표 : 취득가액 / 준비서류 : 현물출자계약서, 법인장부 등</p>
      <p>```</p>



      <p>서울세무-16560(2018.07.31) 취득세</p>

      <p>기존 법인에 현물출자 시 취득세 납세의무 성립일 문의에 대한 회신</p>



      <p>현물출자는 현물출자자에게 주주로서의 권리의무를 대가로 지급하고 현물을 취득하는 유상승계취득에 해당하는 것이고 그 대가를 지급하여 현물을 사실상 취득하거나 현물에 관한 소유권이전등기·등록 등을 한 때를 취득의 시기로 보아야 한다.</p>



      
      </CalcBox><CalcBox title="■ 조직변경" id="section-7">
      <p>```text</p>
      <p>등록면허세 / - 주식회사를 유한회사로, 유한회사를 주식회사로 설립등기 : 그밖의 등기 / - 그 외의 조직변경 : 설립등기 / 취득세 / - 주식회사를 유한회사로, 유한회사를 주식회사로 조직변경 : × / - 그 외의 조직변경에 따른 취득세 : 취득세 과세</p>
      <p>```</p>



      <p>주식회사를 유한회사로 조직변경시 법인설립 등기세율 적용 가능 여부:대법원 20106731(2012.02.09)</p>

      <p>기타등기로 보아 건당 23,000원의 등록세 세율적용</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>상법상 주식회사의 유한회사에서의 조직변경은 주식회사가 법인격의 동일성을 유지하면서 조직을 변경하여 유한회사로 되는 것이다. 그럼에도 주식회사의 해산등기와 유한회사의 설립등기를 하는 것은 유한회사의 등기기록을 새로 개설하는 방편일 뿐이고, 주식회사가 해산하고 유한회사가 설립되기 때문이 아니다. 또한 이러한 조직변경이 있더라도 구 지방세법 제137조 제1항 제1호 제1목에서 등록세의 과세표준으로 삼고 있는 신규출자가 이루어지지 아니한다. 이러한 점들을 종합하여 볼 때, 주식회사의 조직변경에 따른 유한회사의 설립등기는 구 지방세법 제137조 제1항 제1호 제1목의 적용대상이라고 할 수 없다.</li>
      </ul>



      <p>※ 지방세법 시행령 제43조 제5항(법인등기에 대한 세율) 「상법」 제606조에 따라 주식회사에서 유한회사로 조직변경의 등기를 하는 경우 또는 같은 법 제607조제5항에 따라 유한회사에서 주식회사로 조직변경의 등기를 하는 경우에는 법 제28조제1항제6호바목에 따른 등록면허세를 납부하여야 한다. &lt;신설 2015. 7. 24.&gt;:그밖의등기 43,000원</p>



      <p>주식회사를 유한회사로 조직변경 또는 유한회사에서 주식회사로 조직을 변경한 경우도 법인격의 동일성을 유지하면서 조직을 변경한 것에 해당된다 할 것이므로 5년이내 자본금 증자시 지방세법 제28조 제2항의 중과세 적용대상이라고 할 수 없다.(서울세제-17315(2017.11.29) 등록면허세)</p>



      <p>「협동조합기본법」제60조의2 규정에 따라 유한회사에서 협동조합으로 조직변경 등기를 한 경우라도 조직변경 전후의 양자간의 실질이 동일하다고 보기 어려우므로, 별도의 비과세, 감면 규정이 없는 이상 취득세 납세의무가 있음.(지방세운영과-1847(2016.06.17) 취득세 )</p>

    
      </CalcBox></div>
  );
}
