"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/**
 * meta:
 *   title: "준주택의 종류와 특징"
 *   sectionId: "35"
 *   category: "취득세"
 *   subcategory: "준주택"
 *   audience: "internal"
 *   source: "acquisitiontax.pdf"
 *   pageRange: [63, 63]
 *   effectiveDate: "2020-08-12"
 *   lastUpdated: "2026-02-08"
 *   status: "draft"
 *   lawReference: "주택법시행령 제4조"
 *   tags: ["준주택", "기숙사", "고시원", "오피스텔", "노인복지주택", "농특세"]
 */
export default function QuasiHousingV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">준주택의 종류와 특징</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>준주택의 종류 및 취득세 세율(4.6%), 농특세 과세 기준 안내 (주택법시행령 제4조)</p>
      </blockquote>

      <SectionNav sections={[
      { id: "종류", label: "준주택 종류" },
      { id: "세율", label: "세율 적용" },
      { id: "주택수포함", label: "주택수 포함 여부" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 준주택 종류" id="종류">
        <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
        <thead>
        <tr style={{backgroundColor: '#f0f0f0'}}>
        <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>준주택 유형</th>
        <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>기숙사</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>재산세 주택으로 과세</td>
        </tr>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>다중생활시설 (고시원)</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
        </tr>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>노인복지주택</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
        </tr>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>오피스텔</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주거용 전환시 재산세 주택으로 과세</td>
        </tr>
        </tbody>
        </table>
      </CalcBox>

      <SectionNav sections={[
      { id: "종류", label: "준주택 종류" },
      { id: "세율", label: "세율 적용" },
      { id: "주택수포함", label: "주택수 포함 여부" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 세율 적용" id="세율">
        <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
        <thead>
        <tr style={{backgroundColor: '#f0f0f0'}}>
        <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>항목</th>
        <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>내용</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득세율</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff', fontWeight: 'bold'}}>4.6%</td>
        </tr>
        <tr>
        <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>농특세</td>
        <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322', fontWeight: 'bold'}}>과세</td>
        </tr>
        </tbody>
        </table>

        <Insight>
        <ul className="list-disc pl-6 my-4 space-y-1">
          <li>준주택은 <strong>주택으로 보지 않음</strong></li>
          <li>면적이 <strong>85㎡ 이하</strong>라도 <strong>농특세 과세</strong></li>
          <li>세율 <strong>4.6%</strong> 적용</li>
        </ul>
        </Insight>

        <Insight>
        <p><strong>무허가 주택</strong>도 4.6% 세율 적용</p>
        <ul className="list-disc pl-6 my-4 space-y-1">
          <li>무허가주택은 주택법에 의한 주택이 아님</li>
        </ul>
        </Insight>
      </CalcBox>

      <SectionNav sections={[
      { id: "종류", label: "준주택 종류" },
      { id: "세율", label: "세율 적용" },
      { id: "주택수포함", label: "주택수 포함 여부" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 주택수 포함 여부" id="주택수포함">
        <SubSection title="● 기숙사 / 오피스텔">
          <ul className="list-disc pl-6 my-4 space-y-1">
            <li>원칙: <strong>1가구1주택</strong> 범위에서 <strong>제외</strong></li>
          </ul>
        </SubSection>

        <SubSection title="● 오피스텔 예외 (주택수 포함)">
          <p>아래 조건을 <strong>모두</strong> 충족하는 경우 주택수에 포함:</p>

          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
          <thead>
          <tr style={{backgroundColor: '#f0f0f0'}}>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '60px'}}>순서</th>
          <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>조건</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>1</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>개정법령 시행 <strong>'20.8.12. 이후</strong>에 매매 계약 체결</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>2</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>신규취득분</strong>일 것</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>3</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>주거용오피스텔</strong>로 전환</td>
          </tr>
          <tr>
          <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>4</td>
          <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>재산세 주택분</strong>이 과세된 이후</td>
          </tr>
          </tbody>
          </table>
        </SubSection>
      </CalcBox>

      <SectionNav sections={[
      { id: "종류", label: "준주택 종류" },
      { id: "세율", label: "세율 적용" },
      { id: "주택수포함", label: "주택수 포함 여부" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <CalcBox title="■ 주의사항" id="주의사항">
        <Insight>
        <ul className="list-disc pl-6 my-4 space-y-1">
          <li><strong>기숙사</strong>와 <strong>주거용오피스텔</strong>은 재산세가 주택으로 과세됨</li>
          <li>준주택은 면적과 관계없이 <strong>4.6% + 농특세</strong> 적용</li>
          <li>오피스텔의 주택수 포함 여부는 <strong>계약일</strong> 및 <strong>재산세 과세 여부</strong> 확인 필수</li>
        </ul>
        </Insight>
      </CalcBox>

      <SectionNav sections={[
      { id: "종류", label: "준주택 종류" },
      { id: "세율", label: "세율 적용" },
      { id: "주택수포함", label: "주택수 포함 여부" },
      { id: "주의사항", label: "주의사항" },
      ]} />

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
