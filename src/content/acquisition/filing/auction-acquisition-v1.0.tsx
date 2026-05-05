"use client";

import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "경매(공매) 낙찰 취득시",
  sectionId: "21",
  category: "취득세",
  subcategory: "신고",
  audience: "internal",
  source: "acquisitiontax.pdf",
  pageRange: [47],
  version: "1.0",
  effectiveDate: "2020-08-12",
  lastUpdated: "2026-02-08",
  status: "draft",
  lawReference: "지방세법 시행령 §18",
  tags: ["경매","공매","낙찰","미말소채권액","취득가액"],
};

export default function AuctionAcquisitionV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">14. 경매(공매) 낙찰 취득시</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>경매 또는 공매로 부동산 낙찰 취득 시 구비서류 및 취득가액 산정 안내.</p>
      </blockquote>

      <hr className="my-6" />

      <h2 id="1.-구비서류" className="text-xl font-semibold mt-8 mb-4">1. 구비서류</h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold', width: '50px'}}>순번</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>서류</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>1</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득세신고서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>낙찰대금완납증명서</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#1890ff'}}>경락은 검인실거래 신고대상이 <strong>아님</strong></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>물건 목록표 (부동산 표시)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>4</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>배분표</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      </tr>
      <tr style={{backgroundColor: '#fffbe6'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', textAlign: 'center'}}>5</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>가족관계증명서, 등본</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}>
      <strong>주택의 경우</strong> - 중과세율 판단대상이므로 등본과 가족관계증명서 추가요구
      </td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <h2 id="2.-취득가액-확인-주의사항" className="text-xl font-semibold mt-8 mb-4">2. 취득가액 확인 주의사항</h2>

      <Callout type="caution">

      <p><strong>가액이 현저히 낮다면 매각물건명세서를 확인</strong>해서 누락된 취득가액이 있는지 확인할 수 있음 (영 §18조)</p>

      </Callout>

      <h3 className="text-lg font-semibold mt-6 mb-3">미말소채권액</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>항목</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>내용</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>정의</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>대항력이 있는 임차보증금</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득가액 포함 여부</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', color: '#cf1322'}}><strong>포함</strong> - 누락하는 경우 추징대상</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>확인 방법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>매각물건명세서 <strong>뒷장</strong>에 표시됨</td>
      </tr>
      <tr style={{backgroundColor: '#fff2f0'}}>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>주의</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>남아있는 채무액이 있으면 <strong>취득가액에 포함</strong>된다</td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <h2 id="3.-배당요구-확인" className="text-xl font-semibold mt-8 mb-4">3. 배당요구 확인</h2>

      <Callout type="info">

      <p><strong>스피드옥션</strong> (http://www.speedauction.co.kr)</p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>ID: 강남구청</li>
        <li>PS: 1208300097</li>
      </ul>

      <p>에서 배당요구 확인 가능</p>

      </Callout>

      <hr className="my-6" />

      <h2 id="4.-관련-법령" className="text-xl font-semibold mt-8 mb-4">4. 관련 법령</h2>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>법령명</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>조항</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>내용</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>근거법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 시행령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세법시행령/제18조" target="_blank" rel="noopener noreferrer">§18</a></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px', fontSize: '12px'}}>
      <p>사실상취득가격이란 해당 물건을 취득하기 위하여 거래 상대방 또는 제3자에게 지급했거나 지급해야 할 <strong>직접비용</strong>과 <strong>간접비용</strong>의 합계액</p>
      </td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>참조</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><a href="https://law.go.kr/법령/지방세법/제10조의3" target="_blank" rel="noopener noreferrer">§10조의3①</a></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사실상의 취득가격</td>
      </tr>
      </tbody>
      </table>

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
