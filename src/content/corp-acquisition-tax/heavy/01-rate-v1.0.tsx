"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";

export const meta = {
  title: "중과 취득세율",
  category: "corp-acquisition-tax",
  group: "heavy",
  groupLabel: "중과",
  order: 1,
  version: "1.0",
  lastUpdated: "2026-04-23",
  sourceBook: "corp-heavy",
  sourceBookTitle: "법인 중과 실무 (2026년)",
  sourceLeaf: "corp-heavy/Ⅰ_법인_중과_실무/01_중과_취득세율",
  sourcePages: [2,2],
  sourceTaxTypes: ["acquisition_tax"],
};

export default function Content01RateV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">중과 취득세율</h1>



      <SectionNav sections={[
      { id: "summary", label: "요약" },
      { id: "concepts", label: "주요 개념" },
      { id: "source", label: "원문" },
      ]} />

      <hr className="my-6" />

      <h2 id="summary">
      <Outline level={1}>요약</Outline>
      </h2>

      <p>본 리프는 법인 중과 취득세율 체계를 다루며, 구 취득세(제1항) 및 구 등록세(제2항) 중과 세율 구조와 2020.8.12. 이후 도입된 주택 매매·증여 취득 시 중과세율(지방세법 제13조의2)을 표 형식으로 정리한다. 대도시 내 법인 설립 후 5년 이내 부동산 취득, 본점 신증축 등 각 중과 사유별 적용 세율(취득세·지방교육세·농특세 포함 합산)을 비교 제시한다.</p>


      <h2 id="concepts">
      <Outline level={1}>주요 개념</Outline>
      </h2>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>법인 중과세율</strong> — 대도시 내 법인이 일정 요건(설립 후 5년 이내 부동산 취득, 본점 신증축 등)에 해당할 때 표준세율의 3배를 적용하는 취득세 중과 세율 체계.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제13조" target="_blank" rel="noopener noreferrer">법 §13</a>, <a href="https://law.go.kr/법령/지방세법/제13조의2" target="_blank" rel="noopener noreferrer">법 §13의2</a></li>
        <li><strong>본점 신증축</strong> — 대도시 과밀억제권역 내 법인이 본점 사무실을 신축 또는 증축하는 행위로, 구 취득세 중과(제1항) 사유에 해당한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제13조" target="_blank" rel="noopener noreferrer">법 §13</a></li>
        <li><strong>대도시 법인 설립 후 5년 이내 부동산 취득</strong> — 대도시에서 법인 설립 후 5년 이내에 해당 법인이 부동산을 취득하는 경우로, 구 등록세 중과(제2항) 사유에 해당한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제13조" target="_blank" rel="noopener noreferrer">법 §13</a></li>
        <li><strong>주택 중과</strong> — 2020.8.12. 이후 취득분부터 적용되는 주택 매매 및 증여 취득 시 중과세율로, 지방세법 제13조의2에 근거한다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제13조의2" target="_blank" rel="noopener noreferrer">법 §13의2</a></li>
        <li><strong>과밀억제권역</strong> — 수도권정비계획법상 인구 및 산업의 과도한 집중을 억제하기 위해 지정된 권역으로, 법인 중과세의 지리적 요건이 된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제13조" target="_blank" rel="noopener noreferrer">법 §13</a></li>
        <li><strong>표준세율 3배 중과</strong> — 법인 중과 요건 충족 시 구 취득세·구 등록세 표준세율을 각각 3배 적용하는 방식. 토지(매매)는 4%×3=12%, 신축건물(보존)은 2.8%×3=8.4%가 적용된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제13조" target="_blank" rel="noopener noreferrer">법 §13</a></li>
        <li><strong>지방교육세</strong> — 취득세에 부가되는 세금으로, 중과세율 적용 시 함께 중과되며 신축건물의 경우 0.48%, 토지의 경우 1.2% 등으로 산출된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제13조" target="_blank" rel="noopener noreferrer">법 §13</a>, <a href="https://law.go.kr/법령/지방세법/제13조의2" target="_blank" rel="noopener noreferrer">법 §13의2</a></li>
        <li><strong>농어촌특별세</strong> — 취득세에 부가되는 국세로, 중과 여부와 무관하게 일정 비율(0.2% 또는 0.6%)이 적용된다.</li>
        <li>관련 조문: <a href="https://law.go.kr/법령/지방세법/제13조" target="_blank" rel="noopener noreferrer">법 §13</a>, <a href="https://law.go.kr/법령/지방세법/제13조의2" target="_blank" rel="noopener noreferrer">법 §13의2</a></li>
      </ul>


      <h2 id="source">
      <Outline level={1}>원문</Outline>
      </h2>

      <Outline level={2}>법인 중과세율</Outline>

      <Outline level={2}>【제1항 - 구 취득세 중과】 - 본점 신증축</Outline>

      <table>
      <thead>
      <tr><th>구  분</th><th>신  축(건물)</th><th>토지</th><th>비  고</th><th></th><th></th></tr>
      <tr><th>기본</th><th>중과</th><th>기본</th><th>중과</th><th></th><th></th></tr>
      </thead>
      <tbody>
      <tr><td>취득세</td><td>2.80</td><td>6.80</td><td>4.0</td><td>8.0</td><td>- 토지 취득 후 5년이내 본점 신증축한 경우 기존토지의 / 중과사유 발생일은 사용승인일임 / - 신축후 5년이내에 신축부동산으로 본점 이전 시 중과 / - 본점신축하여 사용중에 동일과밀억제권역내 다른건물 신축 후 / 본점이전할 경우 본점사무실 증가 면적만 중과 / - 본점 증축시 본점 면적 증가부분 중과 / - 본점 신증축 관련  과점주주, 시설, 임시건축물 등 / 취득시 중과</td></tr>
      <tr><td>지방교육세</td><td>0.16</td><td>0.16</td><td>0.4</td><td>0.4</td><td></td></tr>
      <tr><td>농특세</td><td>0.20</td><td>0.60</td><td>0.2</td><td>0.6</td><td></td></tr>
      <tr><td>합  계</td><td>3.16</td><td>7.56</td><td>4.6</td><td>9.0</td><td></td></tr>
      </tbody>
      </table>



      <Outline level={2}>【제2항 - 구 등록세 중과】 - 대도시 법인 설립후 5년이내 부동산취득</Outline>

      <table>
      <thead>
      <tr><th>구  분</th><th>주택 매매 및 증여취득시 주택중과</th><th>매매(근생 등)</th><th>신축</th><th>증여</th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>
      <tr><th>6억이하</th><th>6억&#126;9억</th><th>9억초과</th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th></tr>
      <tr><th>기본</th><th>중과</th><th>기본</th><th>중과</th><th>기본</th><th>중과</th><th>기본</th><th>중과</th><th>기본</th><th>중과</th><th>기본</th><th>중과</th><th></th></tr>
      </thead>
      <tbody>
      <tr><td>취득세</td><td>1.0</td><td>5.0</td><td>2.0</td><td>6.0</td><td>3.0</td><td>7.0</td><td>4.0</td><td>8.0</td><td>2.8</td><td>4.4</td><td>3.5</td><td>6.5</td></tr>
      <tr><td>지방교육세</td><td>0.1</td><td>0.3</td><td></td><td>0.6</td><td>0.3</td><td>0.9</td><td>0.4</td><td>1.2</td><td>0.16</td><td>0.48</td><td>0.3</td><td>0.9</td></tr>
      <tr><td>농특세</td><td>0.2</td><td>0.2</td><td>0.2</td><td>0.2</td><td>0.2</td><td>0.2</td><td>0.2</td><td>0.2</td><td>0.2</td><td>0.2</td><td>0.2</td><td>0.2</td></tr>
      <tr><td>합  계</td><td>1.3</td><td>5.5</td><td>2.4</td><td>6.8</td><td>3.5</td><td>8.1</td><td>4.6</td><td>9.4</td><td>3.16</td><td>5.08</td><td>4.0</td><td>7.6</td></tr>
      </tbody>
      </table>



      <Outline level={2}>【제1항(구취득세) 제2항(구등록세) 동시 중과)】 대도시 설립후 5년이내 법인의 본점 신축</Outline>

      <p>```text</p>
      <p>구분 | 세 율 | 비고</p>
      <p>전체 | 취득세 | 교육세 | 농특세</p>
      <p>1. 부동산 취득시 (구등록세 중과) | 9.4% | 8% | 1.2% | 0.2% |</p>
      <p>2. 본점 신축건물  (구취+구등)중과) | 9.48% | 8.4% | 0.48% | 0.6% | 구취) 6%   구등)2.4% / 농특)0.6%  지교)0.48%</p>
      <p>3. 본점 신축용토지 (구취득세 중과) | 4.4% | 4% | - | 0.4% |</p>
      <p>※ 정리 : 표준세율(구취득세+구등록세) × 3 / ▫ 토지(매매취득) : 4%(2%+2%) × 3    = 12% + 0.6%(농특세) + 1.2%(교육세)  = 13.8% / ▫ 신축건물(보존) : 2.8%(2%+0.8%) × 3 = 8.4% + 0.6%(농특세) + 0.48%(교육세) = 9.48%</p>
      <p>```</p>



      <Outline level={2}>【13조의2 – 주택 매매 및 증여 취득시 중과】 - 2020.8.12.이후 취득분부터</Outline>

      <table>
      <thead>
      <tr><th>구  분</th><th>①항 【주택매매】   ※ 신축은 대상 아님</th><th>②항 【증여】 / ※조정대상지역만</th><th></th><th></th><th></th><th></th><th></th><th></th></tr>
      <tr><th>6억이하</th><th>6초과&#126;9억이하</th><th>9억초과</th><th>3억 미만</th><th>3억이상</th><th></th><th></th><th></th><th></th></tr>
      <tr><th>기본</th><th>중과</th><th>기본</th><th>중과</th><th>기본</th><th>중과</th><th>기본</th><th>중과</th><th></th></tr>
      </thead>
      <tbody>
      <tr><td>취득세</td><td>1.0</td><td>12.0</td><td>1.0&#126;3.0</td><td>12.0</td><td>3.0</td><td>12.0</td><td>3.5</td><td>12.0</td></tr>
      <tr><td>지방교육세</td><td>0.1</td><td>0.4</td><td>0.1&#126;0.3</td><td>0.4</td><td>0.3</td><td>0.4</td><td>0.3</td><td>0.4</td></tr>
      <tr><td>농특세</td><td>0.2</td><td>1.0</td><td>0.2</td><td>1.0</td><td>0.2</td><td>1.0</td><td>0.2</td><td>1.0</td></tr>
      <tr><td>합  계</td><td>1.3</td><td>13.4</td><td>1.3&#126;3.5</td><td>13.4</td><td>3.5</td><td>13.4</td><td>4.0</td><td>13.4</td></tr>
      </tbody>
      </table>

    </div>
  );
}
