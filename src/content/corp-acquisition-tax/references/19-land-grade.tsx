"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { CalcBox, SubSection } from "@/components/content/shared";
/**
 * meta:
 *   title: "토지등급표"
 *   category: "corp-acquisition-tax"
 *   group: "references"
 *   groupLabel: "실무참고"
 *   order: 20
 *   lastUpdated: "2026-04-23"
 *   sourceBook: "corp-practice"
 *   sourceBookTitle: "법인실무 (2025.12.31 반영)"
 *   sourceLeaf: "corp-practice/Ⅲ_기타_참고/19_토지등급표"
 *   sourcePages: [272,274]
 *   sourceTaxTypes: ["property_tax"]
 *   sourceKeyLawRefs: ["지방세법 제27조","지방세법 제27조 제4항"]
 *   lawReference: "지방세법 제27조, 지방세법 제27조 제4항"
 */
export default function Content19LandGradeV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">토지등급표</h1>



      <SectionNav sections={[
      { id: "summary", label: "요약" },
      { id: "concepts", label: "주요 개념" },
      { id: "section-3", label: "수록 판례 (1건)" },
      { id: "section-4", label: "조심 판례 (1건)" },
      { id: "section-5", label: "예규 (3건)" },
      { id: "section-6", label: "관련 법조문" },
      { id: "source", label: "원문" },
      { id: "section-8", label: "등록면허세" },
      { id: "section-9", label: "가처분 등록면허세 홈으로" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 요약" id="summary">
      <p>이 리프는 등록면허세 중 처분금지가처분등기의 과세표준 및 세율 적용에 관한 쟁점을 다룬다. 사해행위취소를 원인으로 한 가처분, 가등기·근저당권·전세권의 권리에 대한 처분금지가처분등기의 과세표준(채권금액 vs 부동산가액)과 세율(1천분의 2) 적용 여부가 핵심 쟁점이다.</p>


      
      </CalcBox><CalcBox title="■ 주요 개념" id="concepts">
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>처분금지가처분등기</strong> — 다툼의 대상이 된 부동산에 대한 등기청구권 등을 보전하기 위하여 부동산의 처분을 금지하는 가처분등기로, 금전채권이 피보전권리가 될 수 없어 일정한 채권금액이 없는 경우에 해당한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제27조" target="_blank" rel="noopener noreferrer">법 §27 제4항</a>, <a href="https://law.go.kr/법령/지방세법/제28조" target="_blank" rel="noopener noreferrer">법 §28 제1항</a></li>
        <li><strong>사해행위취소 가처분</strong> — 제3자에게 소유권이 이전된 부동산에 대하여 사해행위 취소를 원인으로 하는 처분금지가처분으로, 채권금액이 특정되지 않아 부동산 가액을 과세표준으로 한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제27조" target="_blank" rel="noopener noreferrer">법 §27 제4항</a></li>
        <li><strong>등록면허세 과세표준</strong> — 등록 당시의 가액으로 하되, 채권금액으로 과세액을 정하는 경우 일정한 채권금액이 없을 때에는 채권의 목적이 된 것의 가액 또는 처분제한 목적이 된 금액을 채권금액으로 본다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제27조" target="_blank" rel="noopener noreferrer">법 §27 제4항</a>, <a href="https://law.go.kr/법령/지방세법/제27조" target="_blank" rel="noopener noreferrer">법 §27 제1항</a>, <a href="https://law.go.kr/법령/지방세법/제27조" target="_blank" rel="noopener noreferrer">법 §27 제2항</a></li>
        <li><strong>부동산에 관한 권리 목적 등기</strong> — 가등기, 근저당권, 전세권 등 부동산에 관한 권리를 목적으로 하는 등기로, 지방세법 제28조 제1항 제1호 라목에 따라 세율 1천분의 2가 적용된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제28조" target="_blank" rel="noopener noreferrer">법 §28 제1항</a></li>
      </ul>


      
      </CalcBox><CalcBox title="■ 수록 판례 (1건)" id="section-3">
      <SubSection title="● 대법원2011두9683">
      <p><strong>쟁점</strong>: 처분금지가처분등기의 등록세 과세표준을 채권금액이 아닌 부동산 가액으로 보는지 여부</p>
      <p><strong>판시사항</strong>: 부동산에 관한 처분금지가처분은 일정한 금액의 지급을 목적으로 하는 금전채권이 피보전권리가 될 수 없어 결정문 등에 청구금액이 기재되지 않는다. 따라서 구 지방세법 제130조 제4항의 '일정한 채권금액이 없을 때'에 해당하므로, 처분이 제한되는 부동산의 가액을 과세표준인 채권금액으로 보아 등록세를 산정하여야 한다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세법/제27조" target="_blank" rel="noopener noreferrer">법 §27 제4항</a></p>


      
      
        </SubSection></CalcBox><CalcBox title="■ 조심 판례 (1건)" id="section-4">
      <SubSection title="● 조심2010지0880">
      <p><strong>쟁점</strong>: 사해행위취소를 원인으로 한 처분금지가처분등기 시 과세표준이 부동산 가액인지 여부</p>
      <p><strong>판시사항</strong>: 제3자에게 소유권이 이전된 부동산에 대하여 사해행위 취소를 원인으로 한 처분금지가처분등기를 하는 경우에는 채권금액이 특정되어 있지 않고 부동산 소유자와 가처분권자 간 직접적 채무관계가 없으므로, 처분의 제한이 된 부동산의 가액을 과세표준으로 하여 등록세 등을 신고납부한 것은 타당하다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세법/제27조" target="_blank" rel="noopener noreferrer">법 §27 제4항</a></p>


      
      
        </SubSection></CalcBox><CalcBox title="■ 예규 (3건)" id="section-5">
      <SubSection title="● 서울세제-18467">
      <p><strong>쟁점</strong>: 가등기·근저당권·전세권의 권리에 대한 처분금지가처분등기의 등록면허세 세율</p>
      <p><strong>판시사항</strong>: 가등기, 근저당권, 전세권의 그 권리에 대한 처분금지가처분의 경우에도 지방세법 제28조 제1항 제1호 라목 괄호의 '부동산에 관한 권리를 목적으로 등기하는 경우'에 해당하여 등록면허세 세율은 1천분의 2가 적용된다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세법/제28조" target="_blank" rel="noopener noreferrer">법 §28 제1항</a></p>

      
        </SubSection><SubSection title="● 지방세운영과-889">
      <p><strong>쟁점</strong>: 가등기·근저당권·전세권 권리에 대한 처분금지가처분등기의 세율 적용</p>
      <p><strong>판시사항</strong>: 서울세제-18467과 같은 취지로, 부동산에 관한 권리를 목적으로 등기하는 경우 등록면허세 세율 1천분의 2 적용.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세법/제28조" target="_blank" rel="noopener noreferrer">법 §28 제1항</a></p>

      
        </SubSection><SubSection title="● 서울세제-4663">
      <p><strong>쟁점</strong>: 가등기소유권이전청구권에 대한 가처분등기의 등록면허세 세율 적용</p>
      <p><strong>판시사항</strong>: 가등기소유권이전청구권에 대한 가처분등기의 경우에도 1천분의 2에 해당하는 세율을 적용하는 것이 타당하다.</p>
      <p><strong>관련 조문</strong>: <a href="https://law.go.kr/법령/지방세법/제28조" target="_blank" rel="noopener noreferrer">법 §28 제1항</a></p>


      
      
        </SubSection></CalcBox><CalcBox title="■ 관련 법조문" id="section-6">
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><code className="bg-gray-100 px-1 rounded text-sm">지방세법 제27조</code></li>
        <li><code className="bg-gray-100 px-1 rounded text-sm">지방세법 제27조 제4항</code></li>
      </ul>


      
      </CalcBox><CalcBox title="■ 원문" id="source">
      
      </CalcBox><CalcBox title="■ 등록면허세" id="section-8">
      <p>```text</p>
      <p>부동산 : 가처분 / 가등기 / 전세권설정 / 저당권설정 / 지상권설정 / 경매가압류 / 임차권설정 /   미준공건물소유권보존 /  동산담보권 및 채권담보권 설정 / 법  인 : 법인설립 / 본점이전 / 지점설치 / 외국법인 영업소설치 / 상호가등기 / ※ 매1건의 범위    등록면허세 납세의무자    등록면허세기타</p>
      <p>```</p>



      <SubSection title="● 신고납부시 참고사항">
      <table>
      <thead>
      <tr><th>신고양식 / 항목명</th><th>세무종합시스템</th><th>서울시 이택스</th><th>위택스</th></tr>
      <tr><th>▸ 과세대상</th><th>물건구분</th><th>물건종류</th><th></th></tr>
      </thead>
      <tbody>
      <tr><td>▸ 취등록원인</td><td>등기종류</td><td>등록원인</td><td></td></tr>
      </tbody>
      </table>



      <p>지방세법 제27조(과세표준)</p>

      <p>① 부동산, 선박, 항공기, 자동차 및 건설기계의 등록에 대한 등록면허세(이하 이 절에서 "등록면허세"라 한다)의 과세표준은 등록 당시의 가액으로 한다.</p>

      <p>② 제1항에 따른 과세표준은 조례로 정하는 바에 따라 등록자의 신고에 따른다. 다만, 신고가 없거나 신고가액이 제4조에 따른 시가표준액보다 적은 경우에는 시가표준액을 과세표준으로 한다.</p>

      <p>③ 제10조제5항 및 제6항에 해당하는 경우에는 제2항에도 불구하고 제10조제5항에 따른 사실상의 취득가격 및 같은 조 제6항에 따라 계산한 취득가격을 과세표준으로 한다. 다만, 등록 당시에 자산재평가 또는 감가상각 등의 사유로 그 가액이 달라진 경우에는 변경된 가액을 과세표준으로 한다. &lt;개정 2010. 12. 27.&gt;</p>

      <p>④ 채권금액으로 과세액을 정하는 경우에 일정한 채권금액이 없을 때에는 채권의 목적이 된 것의 가액 또는 처분의 제한의 목적이 된 금액을 그 채권금액으로 본다.(가처분등 적용)</p>

      <p>⑤ 제1항부터 제4항까지의 규정에 따른 과세표준이 되는 가액의 범위 및 그 적용에 필요한 사항은 대통령령으로 정한다.</p>



      <p>etax.seoul.go.kr 신고양식</p>




      
      
        </SubSection></CalcBox><CalcBox title="■ 가처분 등록면허세 홈으로" id="section-9">
      <p>```text</p>
      <p>세율 : 채권금액 또는 부동산가액의 0.2%  / 최저 6,000원 / - 근저당권, 전세권에 대한 처분금지가처분의 경우 채권금액의 0.2% / 과표 / - 제3자에게 소유권이 이전된 부동산에 대하여 사해행위 취소를 원인으로 한 / 처분금지가처분의 경우에는 부동산가액임(대부분임) (지방세법제27조제4항) / - 가등기,근저당권,전세권의 권리의 처분금지가처분등기의 경우 채권가액임. / - 점유이전금지가처분 등 등기의무자와 직접적인 채권이 있는 경우에는 채권가액임</p>
      <p>```</p>

      <p>※ 지방세법제27조(과세표준) 제4항 채권금액으로 과세액을 정하는 경우에 일정한 채권금액이 없을 때에는 채권의 목적이 된 것의 가액 또는 처분의 제한의 목적이 된 금액을 그 채권금액으로 본다.</p>



      <p>사해행위취소권 관련 처분금지가처분등기시 부동산의 가액이 과세표준임(조심2010지0880(2011.09.30))</p>

      <p>제3자에게 소유권이 이전된 부동산에 대하여 사해행위 취소를 원인으로 한 처분금지 가처분 등기를 하는 경우에는 채권금액이 특정되어 있지 않고 부동산의 소유자와 가처분권자는 직접적인 채무관계에 있지 아니하므로, 처분의 제한이 된 부동산의 가액을 과세표준 하여 등록세 등을 신고납부한 것은 타당하다.</p>



      <p>2004-0095(2004.04.26) 등록면허세</p>

      <p>토지중 일부에 대한 소유권이전등기 청구권을 보전할 목적으로 가처분등기 하였다 해도 토지 전체에 대해 처분금지 가처분등기가 이루어진 이상 등기에 대한 과세표준액을 적용함에 있어서는 가처분등기의 효력이 미치는 토지 전체의 가액을 과세표준으로 하여 등록세를 과세하는 것이 타당하다.</p>



      <p>가등기,근저당권, 전세권의 권리의 처분금지가처분등기에 대한 세율 : 1천분의2 (서울세제-18467(2017.12.21))</p>

      <p>귀 질의와 같이 가등기, 근저당권, 전세권의 그 권리에 대한 처분금지가처분의 경우에도 「지방세법」제28조 제1항 제1호의 라목 괄호의"부동산에 관한 권리를 목적으로 등기하는 경우"에 해당하여 등록면허세 세율은 1천분의 2가 적용되는 것입니다.(같은 취지, 행정안전부 지방세운영과-889, 2012.3.22. 유권해석 참조).</p>



      <p>처분금지가처분등기에 등록세 과세표준을 채권금액이 아닌 부동산의 가액으로 보는 것이 타당함</p>

      <p>(대법원 2011두9683(2013.02.28)</p>

      <p>부동산에 관한 처분금지가처분은 다툼의 대상이 된 부동산에 대한 등기청구권 등을 보전하기 위하여 하는 것으로서, 일정한 금액의 지급을 목적으로 하는 금전채권은 그 피보전권리가 될 수 없다. 이에 따라 부동산에 관한 경매신청이나 가압류의 경우와는 달리 그 결정문이나 등기촉탁서 등에 청구금액이 기재되지 않는다. 이러한 사정과 등록세의 성격 등을 종합하여 보면, 부동산에 관한 처분금지가처분등기는 구 「지방세법」제130조 제4항에서 규정한 ‘일정한 채권금액이 없을 때’에 해당한다고 봄이 타당하므로, 특별한 사정이 없는 한 그 등기에 의하여 처분이 제한되는 부동산의 가액을 과세표준인 채권금액으로 보아 그에 대한 등록세를 산정하여야 한다</p>



      <p>가등기소유권이전청구권 가처분 등기의 등록면허세 세율 적용 질의 회신: 서울세제-4663(2018.04.09)</p>

      <p>「지방세법」제28조 제1항[답변요지]가등기소유권이전청구권에 대한 가처분 등기의 경우에도 1천분의 2에 해당하는 세율을 적용하는 것이 타당하다</p>

    
      </CalcBox></div>
  );
}
