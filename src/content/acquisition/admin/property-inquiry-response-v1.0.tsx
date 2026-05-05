"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";

export const meta = {
  title: "재산조회 회신 가능여부",
  sectionId: "41",
  category: "취득세",
  subcategory: "재산조회",
  audience: "internal",
  source: "acquisitiontax.pdf",
  pageRange: [70,70],
  version: "1.0",
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-02-08",
  status: "draft",
  lawReference: "",
  tags: ["재산조회","회신","개인정보","법원","세무서"],
};

export default function PropertyInquiryResponseV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">재산조회 회신 가능여부</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>재산조회 요청에 대한 회신 가능/불가능 기준 안내</p>
      </blockquote>

      <SectionNav sections={[
      { id: "회신가능", label: "회신 가능" },
      { id: "회신불가", label: "회신 불가" },
      ]} />

      <hr className="my-6" />

      <h2 id="회신가능">
      <Outline level={1}>회신 가능한 경우</Outline>
      </h2>

      <p>법률에서 <strong>구체적(명시적)</strong>으로 규정이 된 경우:</p>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>요청 기관/목적</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>회신</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>국가조세부과를 위한 자료요청 (세무서)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a', fontWeight: 'bold'}}>O</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>체납처분</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a', fontWeight: 'bold'}}>O</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>병무청 (지침있음)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a', fontWeight: 'bold'}}>O</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>경찰서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a', fontWeight: 'bold'}}>O</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>법원제출명령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#52c41a', fontWeight: 'bold'}}>O</td>
      </tr>
      </tbody>
      </table>

      <SectionNav sections={[
      { id: "회신가능", label: "회신 가능" },
      { id: "회신불가", label: "회신 불가" },
      ]} />

      <hr className="my-6" />

      <h2 id="회신불가">
      <Outline level={1}>법규에 해당사항이 없는 경우</Outline>
      </h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>요청 기관/목적</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>회신</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>법원사실조회, 문서촉탁</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322', fontWeight: 'bold'}}>X</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사회복지과 기초수급자 재산조회용</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#fa8c16', fontWeight: 'bold'}}>조건부</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>납세자의 동의 필요</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>건설행정과</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322', fontWeight: 'bold'}}>X</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      </tbody>
      </table>

      <SectionNav sections={[
      { id: "회신가능", label: "회신 가능" },
      { id: "회신불가", label: "회신 불가" },
      ]} />

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
