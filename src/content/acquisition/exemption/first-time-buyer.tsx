"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/**
 * meta:
 *   title: "생애최초 주택취득 감면"
 *   sectionId: "03"
 *   category: "취득세"
 *   subcategory: "감면"
 *   audience: "internal"
 *   source: "acquisitiontax.pdf"
 *   pageRange: [17, 18]
 *   effectiveDate: "2026-02-01"
 *   lastUpdated: "2026-02-08"
 *   status: "draft"
 *   lawReference: "지방세특례제한법 §36의3"
 *   tags: ["생애최초", "주택취득", "감면", "실거주", "추징", "인구감소지역"]
 */
export default function FirstTimeBuyerV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">생애최초 주택취득 감면</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>생애 처음 주택을 취득하는 경우 취득세를 100% 면제 (한도 200~300만원)하는 제도. 2020.8.12 신설, <strong>2028.12.31까지</strong> 적용.</p>
      </blockquote>

      <SectionNav sections={[
      { id: "감면대상", label: "감면 대상 및 한도" },
      { id: "감면요건", label: "감면 요건" },
      { id: "추징요건", label: "추징요건" },
      { id: "예외조항", label: "예외조항" },
      { id: "증빙서류", label: "증빙서류" },
      { id: "관련법령", label: "관련 법령" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 감면 대상 및 한도" id="감면대상">

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>대상 주택</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>조건</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>감면</th>
      </tr>
      </thead>
      <tbody>
      <tr style={{backgroundColor: '#fafafa'}}>
      <td colSpan={3} style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>300만원 감면 대상 (<a href="https://law.go.kr/법령/지방세특례제한법/제36조의3" target="_blank" rel="noopener noreferrer">§36의3①1호</a>)</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>전용 60㎡ 이하 공동주택 (아파트 제외)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득가액 3억원(수도권 6억원) 이하</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}} rowSpan={4}>취득세 <strong>100% 면제</strong><br/>(한도 <strong style={{color: '#1890ff'}}>300만원</strong>)</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>전용 60㎡ 이하 도시형생활주택</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득가액 3억원(수도권 6억원) 이하</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>다가구주택 (전용 60㎡ 이하 호수)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>건축물대장 호수별 면적 구분 기재, 취득가액 3억원(수도권 6억원) 이하</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>인구감소지역</strong> 소재 주택</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>면적·금액 제한 없음</td>
      </tr>
      <tr style={{backgroundColor: '#fafafa'}}>
      <td colSpan={3} style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>200만원 감면 대상 (<a href="https://law.go.kr/법령/지방세특례제한법/제36조의3" target="_blank" rel="noopener noreferrer">§36의3①2호</a>)</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>상기 외 주택</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득가액 <strong>12억원</strong> 이하</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득세 <strong>100% 면제</strong><br/>(한도 <strong style={{color: '#1890ff'}}>200만원</strong>)</td>
      </tr>
      </tbody>
      </table>

      <Insight>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>혼인여부, 연령과 <strong>무관</strong> (단, 미성년자 제외)</li>
        <li>소득제한 <strong>없음</strong>, 면적제한 <strong>없음</strong> (12억원 이하만 해당)</li>
        <li><strong>유상거래</strong>(경매 포함)만 인정, 부담부증여는 <strong>제외</strong></li>
        <li><strong>대한민국 국민</strong>만 감면 (외국인 배우자는 무주택 판정 시 포함)</li>
        <li>공동취득 시 총 감면액 한도 300만원/200만원 (<a href="https://law.go.kr/법령/지방세특례제한법/제36조의3" target="_blank" rel="noopener noreferrer">§36의3②</a>)</li>
        <li>중과규정(<a href="https://law.go.kr/법령/지방세법/제13조의2" target="_blank" rel="noopener noreferrer">법 §13의2</a>) 세율 <strong>적용하지 않음</strong></li>
      </ul>

      </Insight>

      </CalcBox>

      <SectionNav sections={[
      { id: "감면대상", label: "감면 대상 및 한도" },
      { id: "감면요건", label: "감면 요건" },
      { id: "추징요건", label: "추징요건" },
      { id: "예외조항", label: "예외조항" },
      { id: "증빙서류", label: "증빙서류" },
      { id: "관련법령", label: "관련 법령" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 감면 요건" id="감면요건">

      <p>1. 주택 취득일 현재 <strong>본인 및 배우자</strong>가 주택을 소유한 사실이 없는 경우</p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>혼인이 확인되는 외국인 배우자 포함</li>
        <li>취득자가 만 19세 미만 → 감면 <strong>제외</strong></li>
        <li>취득자의 배우자가 취득일 현재 주택을 소유하였거나 처분한 경우 → 감면 <strong>제외</strong></li>
      </ul>
      <p>2. 취득당시 가액이 <strong>12억원 이하</strong> 주택 유상거래 (부담부증여 제외)</p>
      <p>3. 주택취득자가 <strong>실제 거주</strong>해야 함</p>

      <SubSection title="● 주택의 범위">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>단독주택, 아파트, 다세대, 연립 등 공동주택 (<a href="https://law.go.kr/법령/주택법/제2조" target="_blank" rel="noopener noreferrer">주택법 §2①</a>)</li>
        <li><strong>제외</strong>: 오피스텔, 분양권</li>
        <li>무허가주택도 소유한 것으로 <strong>보지 않음</strong></li>
      </ul>

      </SubSection>

      </CalcBox>

      <SectionNav sections={[
      { id: "감면대상", label: "감면 대상 및 한도" },
      { id: "감면요건", label: "감면 요건" },
      { id: "추징요건", label: "추징요건" },
      { id: "예외조항", label: "예외조항" },
      { id: "증빙서류", label: "증빙서류" },
      { id: "관련법령", label: "관련 법령" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 추징요건 (§36의3④)" id="추징요건">

      <p>취득일부터 <strong>3년 이내</strong>에 다음 중 하나에 해당하면 감면된 취득세를 <strong>추징</strong>합니다. (<a href="https://law.go.kr/법령/지방세특례제한법/제36조의3" target="_blank" rel="noopener noreferrer">§36의3④</a>)</p>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '60px'}}>번호</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>추징 사유</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>①</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>해당 주택을 <strong>매각</strong>하는 경우</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>②</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>해당 주택을 <strong>증여</strong>하는 경우</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>③</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>해당 주택을 <strong>다른 용도</strong>(임대 포함)로 사용하는 경우</td>
      </tr>
      </tbody>
      </table>

      <SubSection title="● 추징 기산일 특례">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>임대인 지위 승계</strong> 시: 취득한 주택에 임차인이 계속 거주 중인 경우(잔여 임대차기간 1년 이내 한정), <strong>임대차기간 만료일</strong>부터 3년 이내로 계산</li>
      </ul>

      <Insight>

      <p><strong>추징 제외 사유</strong></p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>배우자</strong>에게 지분을 매각·증여하는 경우는 추징하지 않음</li>
      </ul>

      </Insight>

      <Insight>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>본인 <strong>거주 목적</strong> 취득이 아닌 경우(전·월세, 갭투자 등) 감면 대상 아님</li>
        <li>세부 기준은 행정안전부장관 고시 참조 (<a href="https://law.go.kr/법령/지방세특례제한법/제36조의3" target="_blank" rel="noopener noreferrer">§36의3⑤</a>)</li>
      </ul>

      </Insight>

      </SubSection>

      </CalcBox>

      <SectionNav sections={[
      { id: "감면대상", label: "감면 대상 및 한도" },
      { id: "감면요건", label: "감면 요건" },
      { id: "추징요건", label: "추징요건" },
      { id: "예외조항", label: "예외조항" },
      { id: "증빙서류", label: "증빙서류" },
      { id: "관련법령", label: "관련 법령" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 예외조항 — 주택 소유 사실이 없는 것으로 보는 경우" id="예외조항">

      <p>(<a href="https://law.go.kr/법령/지방세특례제한법/제36조의3" target="_blank" rel="noopener noreferrer">§36의3③</a>)</p>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '60px'}}>번호</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>예외 사유</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>1</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>상속</strong>으로 공유지분을 소유하였다가 모두 처분한 경우</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>도시지역 외 지역에 소재한 주택소유자가 타 지역으로 이주한 경우 (취득일부터 3개월내 처분 조건)<br/>- 20년 이상 경과된 단독주택, 85㎡ 이하 단독주택, 상속주택</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>전용면적 <strong>20㎡ 이하</strong> 주택을 소유하고 있거나 처분한 경우 (2개 이상 소유 시 제외)</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>4</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득일 현재 시가표준액 <strong>100만원 이하</strong> 주택을 소유하고 있거나 처분한 경우</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>5</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>전세사기피해주택</strong>을 소유하고 있거나 처분한 경우</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>6</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>제1항1호 주택 중 취득당시가액 <strong>2억원(수도권 3억원)</strong> 이하, 임차인으로서 <strong>1년 이상</strong> 상시 거주한 주택을 <strong>2024.1.1~2025.12.31</strong> 기간 중 취득하여 감면받은 경우 (단, 추징된 경우 제외)</td>
      </tr>
      </tbody>
      </table>

      </CalcBox>

      <SectionNav sections={[
      { id: "감면대상", label: "감면 대상 및 한도" },
      { id: "감면요건", label: "감면 요건" },
      { id: "추징요건", label: "추징요건" },
      { id: "예외조항", label: "예외조항" },
      { id: "증빙서류", label: "증빙서류" },
      { id: "관련법령", label: "관련 법령" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 증빙서류" id="증빙서류">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>가족관계증명서</li>
        <li>주민등록등·초본</li>
        <li>감면신청서</li>
        <li>주택취득상세내역서</li>
        <li>경정청구 시: 경정청구서 / 환급청구서 / 통장사본 + 신분증사본</li>
      </ul>

      </CalcBox>

      <SectionNav sections={[
      { id: "감면대상", label: "감면 대상 및 한도" },
      { id: "감면요건", label: "감면 요건" },
      { id: "추징요건", label: "추징요건" },
      { id: "예외조항", label: "예외조항" },
      { id: "증빙서류", label: "증빙서류" },
      { id: "관련법령", label: "관련 법령" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 관련 법령" id="관련법령">

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>법령명</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>조항</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>근거법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세특례제한법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세특례제한법/제36조의3" target="_blank" rel="noopener noreferrer">§36의3</a></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>생애최초 주택취득 감면<br/><small>시행: 2026.2.1 / 일몰: 2028.12.31</small></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>참조</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세법/제11조" target="_blank" rel="noopener noreferrer">§11①8호</a></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택 취득세율</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>참조</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세법/제13조의2" target="_blank" rel="noopener noreferrer">§13의2</a></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>중과규정 (적용하지 않음)</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>참조</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세법/제10조의3" target="_blank" rel="noopener noreferrer">§10의3</a></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득 당시의 가액</td>
      </tr>
      </tbody>
      </table>

      </CalcBox>

      <SectionNav sections={[
      { id: "감면대상", label: "감면 대상 및 한도" },
      { id: "감면요건", label: "감면 요건" },
      { id: "추징요건", label: "추징요건" },
      { id: "예외조항", label: "예외조항" },
      { id: "증빙서류", label: "증빙서류" },
      { id: "관련법령", label: "관련 법령" },
      ]} />

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
