"use client";

import { useState } from "react";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/**
 * meta:
 *   title: "시설과 시설물"
 *   sectionId: "38"
 *   category: "취득세"
 *   subcategory: "시설/시설물"
 *   audience: "internal"
 *   source: "acquisitiontax.pdf"
 *   pageRange: [67, 67]
 *   effectiveDate: "2026-01-01"
 *   lastUpdated: "2026-05-15"
 *   status: "draft"
 *   lawReference: "지방세법 제6조, 제7조"
 *   tags: ["시설", "시설물", "구축물", "엘리베이터", "발코니", "주차장"]
 */

type TabKey = "overview" | "facility" | "equipment" | "balcony" | "notes";

const TABS: [TabKey, string][] = [
  ["overview", "개관 비교"],
  ["facility", "시설 (구축물)"],
  ["equipment", "시설물 (부수시설물)"],
  ["balcony", "발코니"],
  ["notes", "주의사항"],
];

export default function FacilityVsEquipmentV10() {
  const [tab, setTab] = useState<TabKey>("overview");

  return (
    <div className="space-y-8">
      <p className="text-muted">시설(구축물)과 시설물(부수시설물)의 구분 및 과세 기준 안내</p>

      {/* 탭 네비게이션 */}
      <div className="flex flex-wrap gap-1 bg-sidebar-bg rounded-lg p-1">
        {(TABS as [TabKey, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              tab === key
                ? "bg-white dark:bg-gray-800 font-semibold shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 탭 1: 개관 비교 */}
      {tab === "overview" && (
        <div className="space-y-8">
          <CalcBox title="■ 시설과 시설물의 핵심 비교">
            <p>지방세법은 건축물에 관련된 객체를 <strong>시설</strong>과 <strong>시설물</strong>로 구분한다. 한 글자 차이지만 법적 효과가 완전히 다르다.</p>
            <table style={{width: "100%", borderCollapse: "collapse", fontSize: "var(--content-font-size, 13px)", marginTop: "12px", marginBottom: "16px"}}>
              <thead>
                <tr style={{backgroundColor: "#f0f0f0"}}>
                  <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>구분</th>
                  <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>시설 (구축물)</th>
                  <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>시설물 (부수시설물)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold", backgroundColor: "#fafafa"}}>법적 성격</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>그 자체가 건축물</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>건축물에 딸린 부속설비</td>
                </tr>
                <tr>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold", backgroundColor: "#fafafa"}}>범위</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>레저·저장·도크·접안·도관·급배수·에너지 공급시설 등</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>엘리베이터·발전시설·난방공급시설·부착된 금고·교환시설·변전배전시설</td>
                </tr>
                <tr>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold", backgroundColor: "#fafafa"}}>근거 조문</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>법 제6조 제4호, 시행령 제5조</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>법 제6조 제6호 다목, 시행령 제6조</td>
                </tr>
                <tr>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold", backgroundColor: "#fafafa"}}>독립성</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>독립된 과세객체</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>본체 건축물에 종속</td>
                </tr>
                <tr>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold", backgroundColor: "#fafafa"}}>재산세</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", color: "#cf1322"}}>과세 ○</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", color: "#52c41a"}}>과세 ×</td>
                </tr>
                <tr>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold", backgroundColor: "#fafafa"}}>예시</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>옥외기계식주차장</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>옥내기계식주차장, 승강시설</td>
                </tr>
              </tbody>
            </table>
          </CalcBox>

          <CalcBox title='■ 개수의 3층 구조 — 법 제6조 제6호'>
            <p>지방세법 제6조 제6호는 &quot;개수&quot;를 가·나·다목 세 가지로 정의한다. 각 목은 다른 대상을 규율한다.</p>
            <SubSection title="● 가목 — 「건축법」 제2조 제1항 제9호에 따른 대수선">
              <p>→ 건축물 본체의 구조 변경(내력벽·기둥·보·지붕틀·주계단 등의 해체·변경·증설).</p>
            </SubSection>
            <SubSection title="● 나목 — 건축물 중 시설을 수선하는 것">
              <p>→ &quot;시설&quot;은 그 자체가 건축물이므로, 수선은 개수에 해당. 단 신규 설치는 &quot;건축&quot;(신축)으로 가고 개수가 아님.</p>
            </SubSection>
            <SubSection title="● 다목 — 건축물에 딸린 시설물의 설치 또는 수선">
              <p>→ &quot;시설물&quot;은 본체 건축물 없이 존재할 수 없으므로, 설치든 수선이든 모두 개수.</p>
            </SubSection>
            <Insight>나목과 다목의 한 글자 차이: 나목은 &quot;수선하는 것&quot;만 개수, 다목은 &quot;설치하거나 수선하는 것&quot;이 개수. 이 차이가 시설과 시설물의 본질을 드러낸다.</Insight>
          </CalcBox>

          <CalcBox title="■ 행위·대상 매트릭스">
            <p>대상(본체/시설/시설물) × 행위(신규 설치/수선)의 조합으로 적용 조문이 결정된다.</p>
            <table style={{width: "100%", borderCollapse: "collapse", fontSize: "var(--content-font-size, 13px)", marginTop: "12px", marginBottom: "12px"}}>
              <thead>
                <tr style={{backgroundColor: "#f0f0f0"}}>
                  <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>대상 \ 행위</th>
                  <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>신규 설치</th>
                  <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>수선·교체</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold", backgroundColor: "#fafafa"}}>건축물 본체</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>신축 (건축, 법 제6조 제5호)</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>대수선 (가목 개수)</td>
                </tr>
                <tr>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold", backgroundColor: "#fafafa"}}>시설 (구축물)</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>신축 (건축, 법 제6조 제5호)</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>나목 개수</td>
                </tr>
                <tr>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold", backgroundColor: "#fafafa"}}>시설물 (부수시설물)</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", color: "#cf1322", fontWeight: "bold"}}>다목 개수</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", color: "#cf1322", fontWeight: "bold"}}>다목 개수</td>
                </tr>
              </tbody>
            </table>
            <p>→ 시설물은 신규 설치도 개수로 잡힌다는 점이 핵심.</p>
          </CalcBox>
        </div>
      )}

      {/* 탭 2: 시설 (구축물) */}
      {tab === "facility" && (
        <div className="space-y-8">
          <CalcBox title="■ 특징">
            <ul className="list-disc pl-6 space-y-1">
              <li>건물과 별도로 있으면 시설</li>
              <li>재산세 건축물에 포함되며 건축물의 취득과 동일하게 적용</li>
              <li>재산세 과세됨</li>
              <li>시설물보다 큰 개념, 부대시설에 포함</li>
              <li>독립된 개체로 과세 가능한 건축물 (법 제6조 제4호)</li>
            </ul>
          </CalcBox>

          <CalcBox title="■ 법 제6조 제4호 — 건축물의 정의">
            <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
              <p>&quot;건축물&quot;이란 「건축법」 제2조 제1항 제2호에 따른 건축물(이와 유사한 형태의 건축물을 포함한다)과 토지에 정착하거나 지하 또는 다른 구조물에 설치하는 레저시설, 저장시설, 도크(dock)시설, 접안시설, 도관시설, 급수·배수시설, 에너지 공급시설 및 그 밖에 이와 유사한 시설(이에 딸린 시설을 포함한다)로서 대통령령으로 정하는 것을 말한다.</p>
            </blockquote>
            <p>→ 즉, 토지에 정착하는 일정한 &quot;시설&quot;은 건축법상 건축물이 아니어도 지방세법상 건축물로 의제된다.</p>
          </CalcBox>

          <CalcBox title="■ 시설의 범위 — 시행령 제5조">
            <table style={{width: "100%", borderCollapse: "collapse", fontSize: "var(--content-font-size, 13px)", marginBottom: "16px"}}>
              <thead>
                <tr style={{backgroundColor: "#f0f0f0"}}>
                  <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold", width: "60px"}}>호</th>
                  <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>시설 종류</th>
                </tr>
              </thead>
              <tbody>
                {([
                  [1, "레저시설"],
                  [2, "저장시설"],
                  [3, "도크시설·접안시설"],
                  [4, "도관시설"],
                  [5, "급수·배수시설"],
                  [6, "에너지 공급시설"],
                  [7, "기타"],
                ] as [number, string][]).map(([no, name]) => (
                  <tr key={no}>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px", textAlign: "center"}}>{no}</td>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>{name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CalcBox>

          <CalcBox title="■ 에너지 공급시설 상세 — 시행령 제5조 제1항 제6호">
            <ul className="list-disc pl-6 space-y-1">
              <li>주유시설</li>
              <li>가스충전시설</li>
              <li>환경친화적 자동차 충전시설 (2019.12.31. 시행령 개정으로 신설)</li>
              <li>송전철탑 (전압 20만 볼트 미만을 송전하는 것과 주민들의 요구로 「전기사업법」 제72조에 따라 이전·설치하는 것은 제외)</li>
            </ul>
          </CalcBox>

          <CalcBox title="■ 시설의 취득 구분">
            <table style={{width: "100%", borderCollapse: "collapse", fontSize: "var(--content-font-size, 13px)", marginBottom: "16px"}}>
              <thead>
                <tr style={{backgroundColor: "#f0f0f0"}}>
                  <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>취득 유형</th>
                  <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>분류</th>
                  <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>근거</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>신축</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>원시취득 (건축)</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>법 제6조 제5호</td>
                </tr>
                <tr>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>수선</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>개수</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>법 제6조 제6호 나목</td>
                </tr>
              </tbody>
            </table>
          </CalcBox>

          <CalcBox title="■ 경계 사례">
            <ul className="list-disc pl-6 space-y-1">
              <li>옥외기계식주차장 = <strong>시설</strong> (별도 구축물, 재산세 과세)</li>
              <li>옥내기계식주차장 = <strong>시설물</strong> (건물에 종속, 재산세 ×)</li>
            </ul>
            <p className="mt-4">→ 같은 &quot;기계식 주차장&quot;이라도 옥내·옥외에 따라 분류가 갈린다.</p>
          </CalcBox>
        </div>
      )}

      {/* 탭 3: 시설물 (부수시설물) */}
      {tab === "equipment" && (
        <div className="space-y-8">
          <CalcBox title="■ 특징">
            <ul className="list-disc pl-6 space-y-1">
              <li>건축물에 딸려 건축물의 효용가치를 증대시킬 때 과세대상</li>
              <li>시행령 제6조에 따른 것만 해당</li>
              <li>건축물에 이미 포함되어 있으면 시설물</li>
              <li>부대시설에 있어도 과표에 영향 없음</li>
              <li>재산세 과세대상 아님</li>
              <li>건축물과 별개로 독립적 존재 시 과세대상 제외</li>
            </ul>
          </CalcBox>

          <CalcBox title="■ 시설물의 범위 — 시행령 제6조">
            <p>법 제6조 제6호 다목에서 &quot;대통령령으로 정하는 시설물&quot;이란 다음을 말한다.</p>
            <table style={{width: "100%", borderCollapse: "collapse", fontSize: "var(--content-font-size, 13px)", marginTop: "12px", marginBottom: "16px"}}>
              <thead>
                <tr style={{backgroundColor: "#f0f0f0"}}>
                  <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold", width: "60px"}}>호</th>
                  <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>시설물 종류</th>
                </tr>
              </thead>
              <tbody>
                {([
                  [1, "승강기 (엘리베이터·에스컬레이터·기타 승강시설)"],
                  [2, "시간당 20킬로와트 이상의 발전시설"],
                  [3, "난방용·욕탕용 온수 및 열 공급시설"],
                  [4, "시간당 7,560킬로칼로리급 이상의 에어컨 (중앙조절식만 해당)"],
                  [5, "부착된 금고"],
                  [6, "교환시설"],
                  [7, "인텔리전트 빌딩시스템 시설"],
                  [8, "구내 변전·배전시설"],
                ] as [number, string][]).map(([no, name]) => (
                  <tr key={no}>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px", textAlign: "center"}}>{no}</td>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>{name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CalcBox>

          <CalcBox title="■ 취득세율">
            <table style={{width: "100%", borderCollapse: "collapse", fontSize: "var(--content-font-size, 13px)", marginBottom: "16px"}}>
              <thead>
                <tr style={{backgroundColor: "#f0f0f0"}}>
                  <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>설치 시점</th>
                  <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>세율</th>
                  <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>근거</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>건축물 신축 시 함께 설치</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", color: "#1890ff", fontWeight: "bold"}}>원시취득 포함 2.8%</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>법 제11조 제1항 제3호 (원시취득)</td>
                </tr>
                <tr>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>건물 신축 후 별도 설치</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>개수 2%</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>법 제11조 제1항 제3호 (개수)</td>
                </tr>
              </tbody>
            </table>
            <Insight>
              <p><strong>5층 이상 상가건물 엘리베이터 실무 팁</strong></p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>5층 이상 상가건물은 엘리베이터 없으면 시가표준액이 감산되므로 반드시 포함 확인</li>
                <li>층당 5%씩 가산됨</li>
                <li>건물 시가표준액이 올라감</li>
              </ul>
            </Insight>
          </CalcBox>

          <CalcBox title="■ 주체구조부 일체화 법리 — 법 제7조 제3항">
            <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
              <p>&quot;건축물 중 조작 설비, 그 밖의 부대설비에 속하는 부분으로서 그 주체구조부와 일체가 되어 건축물로서의 효용가치를 이루고 있는 것에 대해서는 주체구조부 취득자 외의 자가 가설한 경우에도 주체구조부의 취득자가 함께 취득한 것으로 본다.&quot;</p>
            </blockquote>
            <p>→ 시설물을 누가 설치·교체하든, 납세의무자는 주체구조부 취득자(건물 소유자)가 된다.</p>
          </CalcBox>

          <CalcBox title="■ 공동주택 공용시설물의 납세의무자">
            <p>공동주택에서 입주자대표회의 명의로 공용시설을 설치·교체하는 경우, 납세의무자가 누구인지가 실무상 핵심 쟁점이다.</p>

            <SubSection title="● 입주자대표회의의 법적 지위">
              <ul className="list-disc pl-6 space-y-1">
                <li>주택법 제43조에 따른 관리주체</li>
                <li>집합건물법 제10조 — 공용부분은 구분소유자 전원의 공유</li>
                <li>법인격 없는 사단이지만 주체구조부 취득자는 아님</li>
              </ul>
            </SubSection>

            <SubSection title="● 사례 1: 승강기 교체 — 조심2009지0850 (2010.4.8.)">
              <p><strong>사건 개요</strong></p>
              <p className="mt-2">○○○아파트 입주자대표회의가 2006.9.19.~9.20. 기간 중 승강기 6대를 교체(취득가액 1억 7,200만 원). 처분청은 2009.7.10. 입주자대표회의를 납세의무자로 보아 취득세 5,153,800원 + 농어촌특별세 378,400원(가산세 포함 합계 5,532,200원) 부과고지.</p>
              <p className="mt-4"><strong>결정 요지</strong></p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>쟁점 ① 승강기 교체 = 시행령 제6조 제1호 시설물의 수선 = 다목 개수에 해당 → 취득세 과세대상</li>
                <li>쟁점 ② 입주자대표회의는 주택법상 관리주체일 뿐 주체구조부 취득자가 아님 → 납세의무자는 구분소유자 개개인 → 부과처분 취소</li>
              </ul>
            </SubSection>

            <SubSection title="● 사례 2: 전기차 충전시설 — 부동산세제과-561 (2025.2.26.)">
              <p><strong>질의 요지</strong></p>
              <p className="mt-2">공동주택의 공용시설인 전기차 충전시설을 설치하는 경우 취득세 납세의무자가 공동주택 세대별 소유자인지, 충전시설을 설치하는 자(사업자)인지 여부.</p>
              <p className="mt-4"><strong>회신 결론</strong></p>
              <p className="mt-2">전기차 충전시설이 공동주택의 공용시설로서 설치된 경우에는 해당 시설의 납세의무자는 공동주택 세대별 소유자가 취득한 것으로 보는 것이 타당.</p>
              <p className="mt-4"><strong>근거 — 3단계 논증</strong></p>
              <p className="mt-2">① 법령 근거</p>
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li>법 제6조 제1호 (취득의 정의)</li>
                <li>법 제6조 제4호 (건축물의 정의 — &quot;에너지 공급시설&quot; 포함)</li>
                <li>시행령 제5조 제1항 제6호 (환경친화적 자동차 충전시설 = 에너지 공급시설)</li>
              </ul>
              <p className="mt-4">② 선행 유권해석 2건 인용</p>
              <table style={{width: "100%", borderCollapse: "collapse", fontSize: "var(--content-font-size, 13px)", marginTop: "8px", marginBottom: "12px"}}>
                <thead>
                  <tr style={{backgroundColor: "#f0f0f0"}}>
                    <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>유권해석</th>
                    <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>사안</th>
                    <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>결론</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>지방세운영과-3555 (2010.8.13.)</td>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>아파트 단지 일부 동 승강기 개수</td>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>단지 전체가 아닌 해당 동 소유자가 공용부분 면적 비율에 따라 안분</td>
                  </tr>
                  <tr>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>지방세운영과-2040 (2015.7.8.)</td>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>주유소 세차시설을 리스회사에서 임차하여 설치</td>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>리스회사가 아닌 주유시설 소유자가 납세의무자</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2">③ 적용요령 재확인 (부동산세제과-516, 2020.3.6.)</p>
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li>2019.12.31. &quot;환경친화적 자동차 충전시설&quot;이 에너지 공급시설에 신설될 때 통보된 적용요령</li>
                <li>공동주택 공용시설 설치 시 세대별 소유자의 공용면적 소유비율에 따라 안분</li>
                <li>세대별 취득가액이 면세점 기준에 부합하는지 판단</li>
              </ul>
              <Insight>⚠️ 본 회신은 질의서 사실관계 기준 해석으로, 최종 판단은 해당 자치단체에서 함</Insight>
            </SubSection>

            <SubSection title="● 공통 법리: 계약 명의 ≠ 납세의무자">
              <table style={{width: "100%", borderCollapse: "collapse", fontSize: "var(--content-font-size, 13px)", marginBottom: "12px"}}>
                <thead>
                  <tr style={{backgroundColor: "#f0f0f0"}}>
                    <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>항목</th>
                    <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>처리</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold", backgroundColor: "#fafafa"}}>계약 명의자</td>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>입주자대표회의 / 리스회사 / 설치업체</td>
                  </tr>
                  <tr>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold", backgroundColor: "#fafafa"}}>실질 납세의무자</td>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>주체구조부 취득자 (= 세대별 소유자, 건물 소유자)</td>
                  </tr>
                  <tr>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold", backgroundColor: "#fafafa"}}>안분 기준</td>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>공용면적 소유비율</td>
                  </tr>
                  <tr>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold", backgroundColor: "#fafafa"}}>안분 단위</td>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>해당 동 (단지 전체 ×)</td>
                  </tr>
                  <tr>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold", backgroundColor: "#fafafa"}}>면세점</td>
                    <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>세대별 안분 후 50만 원 이하 시 사실상 비과세</td>
                  </tr>
                </tbody>
              </table>
              <Insight>
                <p><strong>안분 단위 — 단지 전체 vs 해당 동</strong></p>
                <p className="mt-2">지방세운영과-3555(2010.8.13.)는 안분 단위를 명확히 했다.</p>
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li>단지 전체 ×</li>
                  <li>해당 동 ○ (소유자가 각자 소유한 공용부분 면적 비율)</li>
                </ul>
                <p className="mt-2">즉, 101동 승강기를 교체했다면 101동 소유자들에게만 안분하고, 102동·103동 소유자에게는 부과하지 않는다.</p>
              </Insight>
            </SubSection>
          </CalcBox>

          <CalcBox title="■ 공동주택 승강기 개수 취득세 실무 적용기준">
            <p>조심2009지0850과 행안부 지방세운영과-3555(2010.8.13.)로 정립된 법리를 강남구청 재산세과 실무에 적용한 기준은 다음과 같다.</p>
            <table style={{width: "100%", borderCollapse: "collapse", fontSize: "var(--content-font-size, 13px)", marginTop: "12px", marginBottom: "16px"}}>
              <thead>
                <tr style={{backgroundColor: "#f0f0f0"}}>
                  <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>주택가격</th>
                  <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>적용내용</th>
                  <th style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold"}}>근거</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold", backgroundColor: "#fafafa"}}>시가표준액 9억원 이하</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>비과세 — 시가표준액 9억원 이하 주택과 관련 개수 취득세 면제</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>지방세법 제9조 제6항, 시행령 제12조의2</td>
                </tr>
                <tr>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold", backgroundColor: "#fafafa"}}>시가표준액 9억원 초과</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>과세 — 납세의무자: 공동주택의 모든 세대 (행안부 지방세운영과-3555, 2010.8.13.) (조심2009지0850, 2010.4.8.) / 예시: 계단형, 타워형 아파트</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>법 제7조 (9억원 초과 중)</td>
                </tr>
                <tr>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px", fontWeight: "bold", backgroundColor: "#fafafa", color: "#52c41a"}}>비과세</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>다수 세대 공동사용으로 세대별 취득금액 50만원 이하 시 비과세 / 예시: 구축 복도식 등</td>
                  <td style={{border: "1px solid #d9d9d9", padding: "8px"}}>지방세법 제17조 (면세점)</td>
                </tr>
              </tbody>
            </table>

            <SubSection title="● 적용 흐름">
              <ul className="list-none pl-0 space-y-1">
                <li>1단계: 시가표준액 9억원 이하 → 비과세 종료</li>
                <li>2단계: 9억원 초과 → 해당 동 세대별 안분 (공용면적 소유비율)</li>
                <li>3단계: 세대별 금액 산정</li>
                <li>4단계: 세대별 50만원 이하 → 면세점 비과세 / 세대별 50만원 초과 → 과세</li>
                <li>5단계: 과세 시 해당 동 모든 세대에 안분 부과</li>
              </ul>
            </SubSection>

            <SubSection title="● 아파트 유형별 과세 양상">
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>계단형·타워형 아파트</strong>: 승강기 1대당 사용 세대수가 적음 (10~30세대 수준) → 안분 시 세대당 금액이 크게 잡혀 과세 가능성 ↑</li>
                <li><strong>복도식 아파트</strong> (주로 구축): 한 라인에 사용 세대수가 많음 (50~100세대 이상) → 안분 시 세대당 금액이 작아 면세점 적용 → 사실상 비과세</li>
              </ul>
            </SubSection>

            <Insight>
              <p><strong>실무 자료 매칭 주의</strong></p>
              <p className="mt-2">승강기협회 건축주 자료가 실제 소유자와 일치하지 않는 경우가 있다. 부과 시점에는 반드시 해당 연도 과세시점의 재산세 과세대장과 매칭하여 소유자를 확정해야 한다. 공동소유자의 경우 소유자 1인으로 기재되어 있으니 별도 확인 필요.</p>
            </Insight>
          </CalcBox>
        </div>
      )}

      {/* 탭 4: 발코니 */}
      {tab === "balcony" && (
        <div className="space-y-8">
          <CalcBox title="■ 발코니 증축 통보 시">
            <SubSection title="● 행자부 지침 (2005.12.26.)">
              <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
                <p>발코니는 독립적인 취득세 과세대상인 건축물의 건축으로 볼 수 없음</p>
              </blockquote>
              <Insight>
                <ul className="list-disc pl-6 space-y-1">
                  <li>발코니(노대)는 과세면적이 아님</li>
                  <li>발코니 확장으로 위법건축물 통보가 와도 무시한다</li>
                </ul>
              </Insight>
            </SubSection>
          </CalcBox>
        </div>
      )}

      {/* 탭 5: 주의사항 */}
      {tab === "notes" && (
        <div className="space-y-8">
          <CalcBox title="■ 핵심 정리">
            <Insight>
              <p><strong>시설 vs 시설물 핵심</strong></p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>시설</strong>: 건물과 별도 → 재산세 과세, 독립 과세 가능</li>
                <li><strong>시설물</strong>: 건축물에 포함 → 재산세 과세대상 아님, 독립 시 과세대상 제외</li>
              </ul>
            </Insight>
            <Insight>5층 이상 상가 엘리베이터 설치 여부 확인 필수 (시가표준액 영향)</Insight>
            <Insight>발코니 확장 위법건축물 통보 → 과세 불필요</Insight>
            <Insight>
              <p><strong>공동주택 승강기 개수 취득세 처리 순서</strong></p>
              <ul className="list-none pl-0 mt-2 space-y-1">
                <li>① 시가표준액 9억원 이하 → 비과세 (법 제9조 제6항)</li>
                <li>② 9억원 초과 + 세대별 50만원 이하 → 면세점 비과세 (법 제17조)</li>
                <li>③ 9억원 초과 + 세대별 50만원 초과 → 과세 (계단형·타워형이 주 대상)</li>
              </ul>
            </Insight>
            <Insight>
              <p><strong>공동주택 공용시설 부과 시 입주자대표회의 명의로 처분 금지</strong></p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>납세의무자는 세대별 소유자 (주체구조부 취득자)</li>
                <li>안분 단위는 해당 동 (단지 전체 ×)</li>
                <li>부과 전 재산세 과세대장으로 소유자 확정 필수</li>
              </ul>
            </Insight>
            <Insight>
              <p><strong>&quot;개수&quot; 가·나·다목 구분 주의</strong></p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>가목: 건축물 본체 대수선</li>
                <li>나목: 시설의 수선 (시설의 신규 설치는 &quot;건축&quot;으로 가고 개수 아님)</li>
                <li>다목: 시설물의 설치 또는 수선 (시설물은 신규 설치도 개수)</li>
              </ul>
            </Insight>
          </CalcBox>
        </div>
      )}

      <p className="text-muted text-sm mt-4">본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
    </div>
  );
}
