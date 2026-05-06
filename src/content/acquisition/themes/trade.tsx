"use client";

import { AcquisitionThemeNav } from "@/components/mdx/AcquisitionThemeNav";
import { CalcBox } from "@/components/content/shared";

/**
 * meta:
 *   title: "유상거래 취득세"
 *   sectionId: "01"
 *   category: "취득세"
 *   subcategory: "유상거래"
 *   audience: "internal"
 *   lastUpdated: "2026-02-04"
 *   status: "draft"
 *   tags: ["유상거래", "매매", "교환", "경매", "취득세율"]
 */
export default function TradeV10() {
  return (
    <div className="space-y-6">

      <AcquisitionThemeNav />

      <h1 className="text-2xl font-bold mb-4">유상거래 취득세</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>매매, 교환, 경매 등 대가를 지불하고 부동산을 취득하는 경우의 취득세를 정리한다.</p>
      </blockquote>

      <hr className="my-6" />

      <CalcBox title="■ 개요">
        <ul className="list-disc pl-6 my-4 space-y-1">
          <li>준비 중입니다.</li>
        </ul>
      </CalcBox>

    </div>
  );
}
