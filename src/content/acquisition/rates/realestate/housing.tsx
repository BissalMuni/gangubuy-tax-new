"use client";

import { SectionNav } from "@/components/mdx/SectionNav";
import { Outline } from "@/components/mdx/Outline";
import { Callout } from "@/components/mdx/Callout";

export const meta = {
  title: "주택 취득세율",
  category: "취득세",
  audience: "internal",
  source: "acquisitiontax.pdf",
  sourceSections: [2,4,5,6,7,8,9,10],
  effectiveDate: "2026-01-01",
  lastUpdated: "2026-01-31",
  status: "draft",
  lawReference: "지방세법 §11, §13, §13의2, §13의3, §15",
  tags: ["주택","취득세","세율","유상거래","상속","증여","원시취득","다주택","법인","고급주택"],
};

export default function HousingV10() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold mb-4">주택 취득세율</h1>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>주택 취득 시 취득유형(유상거래, 상속, 증여, 원시취득)과 주택 수, 취득자 유형(개인, 법인)에 따른 세율을 안내한다.</p>
      </blockquote>

      <hr className="my-6" />

      <SectionNav sections={[
      { id: "general", label: "유상거래 (일반)" },
      { id: "inheritance", label: "상속" },
      { id: "gift", label: "증여" },
      { id: "original", label: "원시취득 (신축)" },
      { id: "multi-house", label: "다주택자 중과" },
      { id: "corporate", label: "법인" },
      { id: "luxury", label: "고급주택 (사치성재산)" },
      ]} />

      <hr className="my-6" />

      <h2 id="general">
      <Outline level={1}>유상거래 (일반)</Outline>
      </h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>매매·분양·교환·경매·공매·현물출자 등 유상거래로 주택을 취득하는 경우의 세율 및 신고 안내</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>유상거래</strong>에 해당하는 취득</li>
        <li>매매, 수분양, 교환, 경매, 공매, 현물출자</li>
        <li><strong>유상거래가 아닌 것</strong>: 신축(원시취득), 증여, 상속</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 기본 제출서류</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>취득세신고서</strong> + 취득상세내역서(주택의 경우)</li>
        <li><strong>매매(분양)계약서</strong> / 분양의 경우 잔금납부확인서</li>
        <li><strong>실거래신고필증</strong> 또는 검인 계약서</li>
        <li>검인을 받았으면 신고필증 불필요</li>
        <li><strong>가족관계증명서 및 등본</strong> (주택일 경우)</li>
        <li>1세대 4주택 확인 용도</li>
        <li>주택이고 계약일자 <strong>2019.12.4. 이후</strong>이면 제출</li>
        <li>외국인: 외국인 등록사실증명서(또는 국내거소사실증명) + 세대원정보 기재</li>
      </ul>

      <p>#### 나. 부동산 거래시 검인/신고 대상 구분</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>검인대상</strong>: 교환, 증여, 분할, 인낙, 사용승인전 분양</li>
        <li>2017년 이후 일정규모 이상 분양계약은 신고필증</li>
        <li>합의해제계약서는 검인 불필요</li>
        <li><strong>신고·검인 대상 아닌 것</strong>: 상속분할협의서, 수용, 경매(공매) 낙찰</li>
      </ul>

      <p>#### 다. 1세대 4주택 경과규정 (부칙 5조)</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>공동주택 분양(3년) <strong>2019.12.3.까지</strong> 매매계약 체결</li>
        <li><strong>2022.12.31.까지</strong> 잔금 지급하여 취득하는 경우</li>
        <li>→ 종전의 <strong>2%</strong> 세율 적용</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">세율표</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득가액</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>세율</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>6억원 이하</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>~ 6억원</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>1%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>6억원 초과 ~ 9억원 이하</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>6억 ~ 9억원</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>1% ~ 3%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>아래 계산식 적용</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>9억원 초과</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>9억원 ~</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      </tbody>
      </table>

      <p>#### 6~9억원 구간 세율 계산식</p>

      <p>```</p>
      <p>세율(%) = 취득가액 × 2/3억원 - 3</p>
      <p>```</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>과세표준액 <strong>150만원</strong>마다 <strong>0.01%</strong>씩 상승</li>
        <li>소수점 3째자리 반올림</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">관련 법령</h3>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§11①8</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택 유상거래 세율</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>경과규정</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>부칙</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>제5조</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1세대4주택 경과규정</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>유상거래는 <strong>신축(원시취득), 증여, 상속과 별도 세율</strong> 체계 적용</li>
        <li>6~9억원 구간은 계산식에 의한 누진세율 적용 (단순 고정세율 아님)</li>
        <li>주택 취득 시 <strong>가족관계증명서 및 등본</strong> 제출 필수 (2019.12.4. 이후 계약)</li>
        <li>외국인의 경우 별도 서류 필요 (외국인 등록사실증명서 등)</li>
      </ul>

      </Callout>

      <hr className="my-6" />

      <h2 id="inheritance">
      <Outline level={1}>상속</Outline>
      </h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>상속·유증에 의한 주택 취득 시 세율, 감면요건, 구비서류 및 실무 안내</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>상속</strong>으로 인한 부동산 취득 (피상속인 사망)</li>
        <li><strong>유증</strong> (유언공정증서에 의한 취득)</li>
        <li><strong>실종선고</strong>에 의한 취득</li>
        <li>다주택이라도 <strong>별도의 세율체계</strong> 적용 (유상거래 중과세율 미적용)</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 일반 상속 신고 구비서류</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>상속재산분할협의서</strong></li>
        <li>검인 불필요</li>
        <li>상속대상자 전원 기재, 도장 또는 서명 여부 확인</li>
        <li>상속인 사망 시 <strong>대습상속</strong> 여부 확인</li>
        <li>미성년자는 <strong>특별대리인</strong> 선임 후 분할 협의 가능</li>
        <li><strong>가족관계증명서</strong> (망자=피상속인 기준)</li>
        <li>2007.12.31. 이전 사망자는 망자의 <strong>제적등본</strong></li>
        <li>대습상속 발생 시 사망한 상속인의 가족관계증명서도 필요</li>
        <li><strong>기본증명서</strong> (망자) → 사망일 확인용</li>
        <li><strong>취득세신고서</strong></li>
        <li>대위등기 시: 대위등기 신청서 사본, 가압류·가처분 결정서, 금전채권증서</li>
      </ul>

      <Callout type="info">

      <p><strong>간단 암기법: 〈망가기, 특상가등〉</strong></p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>일반상속: <strong>망</strong>(자 기준) - <strong>가</strong>(족관계증명), <strong>기</strong>(본증명)</li>
        <li>세율특례 추가: <strong>상</strong>(속인 기준) - <strong>가</strong>(족관계증명), <strong>등</strong>(본)</li>
      </ul>

      </Callout>

      <p>#### 나. 법정지분 신고</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>상속자가 <strong>단독</strong>이거나, 재산분할 협의가 안 되면 <strong>법정상속지분</strong>으로 취득 신고 가능</li>
        <li>이 경우 상속재산분할협의서 불필요</li>
        <li>법정지분율: <strong>배우자 1.5 : 자녀 1</strong>의 비율</li>
      </ul>

      <p>#### 다. 1가구 1주택 상속 감면</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>감면세율</strong>: 2.8% → <strong>0.8%</strong> (취득분 2% 감면), 농비</li>
        <li><strong>추가 구비서류</strong>:</li>
        <li>가족관계증명서 (상속인 기준, 직계존비속 확인)</li>
        <li>등본 (상속인, 생계를 같이하는 가족 확인)</li>
        <li>1가구1주택상속 감면 신청서</li>
        <li><strong>감면 제외</strong>: 고급주택</li>
        <li><strong>재외국민</strong>: 상속 세율특례 적용 불가 (외국인 배우자는 가능)</li>
        <li><strong>판단기준</strong>: 상속인 기준으로만 결정 / 피상속인 주택수 무관</li>
      </ul>

      <p>#### 라. 1가구 1주택의 범위</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>"세대별주민등록표"에 기재된 상속인과 그 가족으로 구성된 1가구</li>
        <li>상속인의 <strong>배우자</strong>, <strong>미혼인 30세 미만의 직계비속</strong>은 같은 세대별 주민등록표에 미기재라도 포함</li>
        <li>상속인이 미혼·30세 미만인 경우 <strong>부모</strong>도 포함 판단</li>
        <li>동거인은 제외</li>
      </ul>

      <p>#### 마. 취득세 상속순위 (1가구1주택 판단)</p>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>순위</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>기준</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>1순위</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지분이 가장 큰 자</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>2순위</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>상속주택 거주자</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3순위</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>연장자</td>
      </tr>
      </tbody>
      </table>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>1주택을 여러 사람이 공동상속 시 → <strong>1순위 주택 상속자 한 사람</strong>의 소유주택으로 판단</li>
        <li>협의분할 시 지분도 정할 수 있음</li>
      </ul>

      <p>#### 바. 상속 신고납부기한</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>사망한 달의 말일로부터 <strong>6개월 이내</strong></li>
        <li>해외에 주소를 둔 상속인이 있는 경우 <strong>9개월 이내</strong></li>
        <li><strong>실종의 경우</strong>: 실종선고일이 속하는 달의 말일부터 6개월 이내</li>
        <li>실종기간 만료일이 사망일이 됨 (민법 §28)</li>
      </ul>

      <p>#### 사. 재협의분할 (상속인 변경)</p>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>상속기간 내</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>상속기간 경과 후</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>등기 전</strong> 재협의</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득세 재납부 불필요, 기존 납부고지서로 등기</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>동일</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>등기 후</strong> 재협의</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>증여로 보지 않고 <strong>등록면허세</strong>만 납부</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>증여에 의한 취득세</strong> 발생 (§7⑬)</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>법정지분으로 특례감면 후 재협의분할 시 <strong>과소신고가산세</strong> 적용</li>
        <li>무신고가산세는 연대의무로 가산세 없음</li>
      </ul>

      </Callout>

      <p>#### 아. 유증 (유언공정증서)</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>1순위 상속자</strong>(배우자·직계비속)에게 유증 → <strong>상속</strong>으로 봄 (2.8%, 6개월 이내 신고)</li>
        <li><strong>1순위 이외의 자</strong>에게 유증 → <strong>증여</strong>로 봄 (3.5%, 유증개시일로부터 60일 이내 신고)</li>
        <li>유언공정증서가 상속분할협의서/증여계약서를 대신함</li>
        <li><strong>유언대용신탁</strong> (신탁법 §59)도 상속으로 봄</li>
        <li>필요서류: 신탁재산귀속증서, 신탁원부, 가족관계증명서, 기본증명서</li>
        <li><strong>포괄유증</strong>은 상속으로 봄 (조심2015지1855)</li>
      </ul>

      <p>#### 자. 특수 사례</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>무허가건축물(주택)</strong> + 일반주택 상속 시:</li>
        <li>무허가건축물은 일반세율(4.6%) 적용, 주택으로 보지 않음</li>
        <li>→ 1가구1주택 세율특례 대상 가능 (무허가주택·오피스텔 제외)</li>
        <li>무허가건축물 2.8% / 일반주택 0.8%</li>
        <li><strong>무상취득 시 감정평가금액 신고</strong>: 신고서 반려 불가 (행정자치부 2016.10.17.)</li>
        <li><strong>상속 부과제척기간</strong>: 부과할 수 있는 날부터 <strong>10년</strong> (2014년 개정, 2015.6월 사망자부터)</li>
        <li><strong>상속중간생략등기</strong>: 경·공매 이전 시에도 상속포기 없으면 과세대상</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">세율표</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득세</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>농특세</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>지방교육세</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>합계</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>일반 상속</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>2.8%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.2%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.16%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3.16%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1가구1주택 상속</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>0.8%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>비과세</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.16%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>0.96%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득분 2% 감면</td>
      </tr>
      </tbody>
      </table>

      <h3 className="text-lg font-semibold mt-6 mb-3">법정상속 지분 계산 예시</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>상속인</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>상속분 비율</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>장남 + 배우자</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>장남 1 / 배우자 1.5</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2/5 / 3/5</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>장남·장녀 + 배우자</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>장남 1 / 장녀 1 / 배우자 1.5</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2/7 / 2/7 / 3/7</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>5남매 + 배우자</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>자녀 각 1 / 배우자 1.5</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>각 2/11 / 3/11</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>부모 + 배우자 (자녀 없음)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>부 1 / 모 1 / 배우자 1.5</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2/7 / 2/7 / 3/7</td>
      </tr>
      </tbody>
      </table>

      <h3 className="text-lg font-semibold mt-6 mb-3">민법상 상속순위</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>순위</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>피상속인과의 관계</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>1순위</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>직계비속과 배우자</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>항상 상속인</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>2순위</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>직계존속과 배우자</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>직계비속 없는 경우</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3순위</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>형제자매</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1·2순위 없는 경우</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>4순위</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>4촌 이내 방계혈족</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1·2·3순위 없는 경우</td>
      </tr>
      </tbody>
      </table>

      <h3 className="text-lg font-semibold mt-6 mb-3">관련 법령</h3>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§15①(세율특례)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1가구1주택 감면</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>근거법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§11①1나</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>상속 일반세율 2.8%</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시행령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 시행령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§29③</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득세 상속순위</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>관련법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>민법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§1000~1001</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>상속순위, 대습상속</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>관련법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>민법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§27~28</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>실종선고</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>관련법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>농특세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§4(비과세) 10의4</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1가구1주택 농특세 비과세</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>상속·증여는 다주택이라도 <strong>별도 세율체계</strong> 적용 (유상거래 중과세율 미적용)</li>
        <li><strong>재외국민</strong>은 상속 세율특례 적용 불가 (§15①2호 가목)</li>
        <li><strong>고급주택</strong>은 1가구1주택 감면 대상에서 제외</li>
        <li>상속인 중 <strong>재사망자</strong>가 있으면 대습상속 발생 여부 반드시 확인</li>
        <li>법정지분 감면 후 재협의분할 시 <strong>과소신고가산세</strong> 유의</li>
      </ul>

      </Callout>

      <hr className="my-6" />

      <h2 id="gift">
      <Outline level={1}>증여</Outline>
      </h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>증여에 의한 주택 취득 시 세율(일반/중과), 증여의제 규정, 구비서류 및 실무 안내</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>증여</strong>로 인한 주택 취득</li>
        <li><strong>배우자·직계존비속</strong> 간 부동산 취득 (증여 의제)</li>
        <li><strong>부담부증여</strong> (채무승계 포함)</li>
        <li>다주택이라도 <strong>별도의 세율체계</strong> 적용 (유상거래 중과와 별도)</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 증여취득 중과세율</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>조정대상지역 내</strong> 3억 이상 주택 → 3.5% → <strong>12%</strong>로 강화</li>
        <li><strong>두 가지 요건 모두 충족</strong> 시 중과:</li>
      </ul>
      <p>1. 조정대상지역 <strong>내</strong>의 주택</p>
      <p>2. 주택공시가격 <strong>3억원 이상</strong></p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>중과 제외</strong>: 1세대 1주택자(증여자)가 <strong>배우자 및 직계존비속</strong>에게 증여하는 경우</li>
        <li>증여자의 주택 소유수 기준 판단 (수증자 주택수 무관)</li>
        <li>§28조의4 주택수 판단 규정 적용 불가</li>
        <li>주택 수 판단 시 <strong>분양권, 입주권, 오피스텔</strong> 포함 (§13의3)</li>
        <li>증여는 주택수 제외 규정 없음</li>
      </ul>

      <Callout type="info">

      <p><strong>Q. 상속주택 1채 포함 2채 보유 중 기존 주택을 자녀에게 증여 시 세율은?</strong></p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>1세대1주택자가 아니므로 <strong>12%</strong></li>
        <li>상속주택 5년간 소유주택수 제외는 <strong>유상취득의 경우에 한정</strong></li>
      </ul>

      </Callout>

      <p>#### 나. 과세표준</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>원칙: <strong>시가인정액</strong> 적용 (§10조의2①)</li>
        <li>시가인정액 산정이 어려운 경우: <strong>시가표준액</strong> 적용 (§10조의2②)</li>
        <li>감정평가서 제출 시 신고가액 인정</li>
      </ul>

      <p>#### 다. 일반증여 구비서류</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>증여계약서</strong> (검인·날인 필수, 증여자가 중요)</li>
        <li><strong>취득세 신고서</strong></li>
      </ul>

      <p>#### 라. 배우자·직계존비속 간 유상취득 시 추가 서류</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>수증인의 <strong>소득금액증명서</strong> 또는 근로소득원천징수명세서</li>
        <li>세무서/홈택스 발급, 금액의 크고 작음은 상관없음</li>
        <li>소유재산 처분 시: 부동산 재산매각 관련 증빙서류</li>
        <li><strong>입금확인증</strong> (입금내역)</li>
        <li>매매계약서 + 신고필증 + 취득세 신고서</li>
      </ul>

      <p>#### 마. 배우자·직계존비속 간 증여의제 (§7⑪)</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>배우자·직계존비속의 부동산 취득은 <strong>증여(3.5%)</strong>로 본다</li>
        <li>단, <strong>대가 지급 사실이 증명</strong>되는 경우 유상취득(1~3%)으로 인정:</li>
        <li>가. 취득자의 <strong>소득이 증명</strong>되는 경우</li>
        <li>나. 소유재산을 <strong>처분·담보</strong>한 금액으로 취득한 경우</li>
        <li>다. 이미 <strong>상속세·증여세를 과세</strong> 받은 재산의 가액으로 대가 지급한 경우</li>
        <li>라. 가~다에 준하여 취득자의 재산으로 대가 지급이 <strong>입증</strong>되는 경우</li>
      </ul>

      <p>#### 바. 특수관계인 간 유상승계취득</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>배우자·직계존비속 <strong>외</strong> 특수관계인: 소득증빙·자금증빙 불필요</li>
        <li>단, <strong>시가인정액</strong> 적용</li>
        <li>시가인정액보다 낮은 가격 취득 시, 차액이 <strong>3억원 이상</strong> 또는 시가인정액의 <strong>5% 이상</strong>이면 → <strong>시가인정액</strong>으로 취득가액 결정</li>
      </ul>

      <p>#### 사. 부부 간 / 본인·직계존비속 간 거래 비교</p>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>부부 간 거래</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>본인·직계존비속 간 거래</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>부담부(채무승계)증여</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>배우자의 소득도 인정</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>배우자의 소득도 인정</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>일반매매</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>본인소득 한도 내에서만</strong> 인정</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>배우자의 소득도 인정</td>
      </tr>
      </tbody>
      </table>

      <p>#### 아. 증여취득 후 합의해제</p>

      <p><strong>합의해제 필수요건</strong> (시행령 §20):</p>
      <p>1. <strong>등기하지 않고</strong></p>
      <p>2. 취득일이 속하는 달의 말일로부터 <strong>3개월 이내</strong> 재신고</p>
      <p>3. 화해·인낙조서·공정증서 제출 또는</p>
      <p>4. <strong>계약해제신고서</strong> 인정 (2017년 신설)</p>
      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>계약해제관련서류(증여해제계약서) 및 <strong>양측 인감증명서</strong> 첨부</li>
      </ul>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>국가·판결·공매·법인의 취득은 합의해제 규정 없음 (§20②1호)</li>
        <li>등기 후 합의해제: 취득세 환급 없이 기타등록세(7,200원)와 합의해제계약서로 말소등기</li>
      </ul>

      </Callout>

      <h3 className="text-lg font-semibold mt-6 mb-3">세율표</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득세</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>농특세</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>지방교육세</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>합계</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>일반 증여</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3.5%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.2%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.3%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>4.0%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>중과 (조정지역 3억↑)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>12%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.2%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.4%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>12.6%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1세대1주택 증여자 제외</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1세대1주택자 → 배우자·직계존비속 증여</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3.5%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.2%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.3%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>4.0%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>중과 제외</td>
      </tr>
      </tbody>
      </table>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>증여계약일이 <strong>2020.8.11. 이전</strong>이면 종전세율(3.5%) 적용</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">관련 법령</h3>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§11①2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>증여 일반세율 3.5%</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>중과</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§13의2②</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>조정지역 3억↑ 증여 중과 12%</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>증여의제</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§7⑪</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>배우자·직계존비속 간</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택수</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§13의3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택 수 판단</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>과세표준</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§10의2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가인정액</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>합의해제</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시행령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§20</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>계약해제 요건</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>특수관계인</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>소득세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§101①</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>특수관계인 범위</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>배우자·직계존비속</strong> 간 매매는 소득 증빙 없으면 <strong>증여(3.5%)</strong>로 과세</li>
        <li>대가를 증빙 못한 경우: 신고가액과 과세표준액 중 <strong>높은 것</strong>을 적용</li>
        <li>부담부증여도 증빙된 부분은 유상세율, 나머지는 증여세율 적용</li>
        <li>증여자 기준으로 주택수 판단 (수증자 주택수 무관)</li>
        <li>상속주택 포함 2채 보유 시 <strong>1세대1주택자 아님</strong> → 12% 중과 가능</li>
      </ul>

      </Callout>

      <hr className="my-6" />

      <h2 id="original">
      <Outline level={1}>원시취득 (신축)</Outline>
      </h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>재건축·재개발 등 원시취득(신축)에 의한 주택 취득 시 세율, 과세표준, 납세의무자별 안내</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>원시취득</strong>(신축)으로 인한 주택 취득</li>
        <li><strong>재건축·재개발</strong> 사업에 의한 주택 취득</li>
        <li>원조합원, 승계조합원, 일반분양자 구분</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 재개발 — 원조합원</p>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>면적</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득세</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>농특세</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>지방교육세</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>합계</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>과세표준</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택 85㎡ 이하</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡↓</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>100% 감면</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>최소납부제 적용 시 감면의 15%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>청산금</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택 외 전면적</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2.8%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.2%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.16%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3.16%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>청산금</td>
      </tr>
      </tbody>
      </table>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>과세표준 = 조합원분양가 + 옵션 − 권리가액</li>
      </ul>

      <p>#### 나. 재개발·재건축 — 승계조합원 (사업시행인가일 이후)</p>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>면적</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득세</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>농특세</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>지방교육세</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>합계</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>과세표준</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택 85㎡ 이하</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>85㎡↓</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2.8%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.16%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>2.96%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>초과액 또는 전체공사비</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택 외 전면적</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2.8%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.2%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>0.16%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3.16%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>전체공사비 등</td>
      </tr>
      </tbody>
      </table>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>과세표준 = 조합원분양가 + 옵션 + 프리미엄 − 종전입주권취득가액(프리미엄 포함)</li>
        <li>2023.1.1. 관리처분계획인가 전 재개발의 경우 초과액 적용</li>
      </ul>

      <p>#### 다. 일반분양자</p>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득세</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>과세표준</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택 6억 이하</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>1.1%</strong> (취득+지방교육세)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>분양금액</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택 6~9억 이하</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>2.2%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>분양금액</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택 9억 초과</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3.3%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>분양금액</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택 외</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>4.6%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>분양금액</td>
      </tr>
      </tbody>
      </table>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>과세표준 = 일반분양가 + 프리미엄 + 옵션</li>
        <li>유상거래 세율 적용 (중과 별도)</li>
      </ul>

      <p>#### 라. 당초 토지 초과분</p>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>대상</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득시기</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>세율</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>과세표준</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>조합원</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사용승인일</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>4%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>과세면적 × 토지분양가/㎡</td>
      </tr>
      </tbody>
      </table>

      <h3 className="text-lg font-semibold mt-6 mb-3">세율표 (요약)</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>납세의무자</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득원인</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>세율 합계</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>원조합원 (재개발)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>원시취득 85㎡↓</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>감면</strong> (최소납부제)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>청산금 기준</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>원조합원 (재개발)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>원시취득 85㎡↑</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3.16%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>승계조합원</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>원시취득 85㎡↓</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>2.96%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>승계조합원</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>원시취득 85㎡↑</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3.16%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>일반분양자</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>승계취득</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>1.1~3.3%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택가액별</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>일반분양자</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>승계취득 (주택 외)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>4.6%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}></td>
      </tr>
      </tbody>
      </table>

      <h3 className="text-lg font-semibold mt-6 mb-3">관련 법령</h3>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§11①3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>원시취득 세율 2.8%</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>원조합원과 승계조합원의 세율 및 과세표준이 <strong>다름</strong>에 유의</li>
        <li>일반분양자는 <strong>유상거래 세율</strong> 적용 (원시취득이 아님)</li>
        <li>85㎡ 이하/초과에 따라 세율 및 농특세 적용이 달라짐</li>
        <li>승계조합원의 과세표준에는 <strong>프리미엄</strong>이 포함됨</li>
      </ul>

      </Callout>

      <hr className="my-6" />

      <h2 id="multi-house">
      <Outline level={1}>다주택자 중과</Outline>
      </h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>조정대상지역 내 다주택 취득 시 중과세율(8%~12%)을 적용하며, 주택수 산정에 분양권·입주권을 포함한다.</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <p>1. <strong>조정대상지역 내</strong> 주택을 취득하는 <strong>다주택자</strong> (개인 및 법인)</p>
      <p>2. 1세대 기준으로 주택수를 산정하며, <strong>분양권·입주권</strong>도 주택수에 포함 (지방세법 §13의3)</p>
      <p>3. 조정대상지역 <strong>외</strong> 주택 취득 시에는 일반세율(1~3%) 적용</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 조정대상지역 내 중과세율</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>2주택</strong> 취득: <strong>8%</strong> 중과세율 적용</li>
        <li><strong>3주택 이상</strong> 취득: <strong>12%</strong> 중과세율 적용</li>
        <li><strong>법인</strong>의 주택 취득: <strong>12%</strong> 중과세율 적용 (주택수 무관)</li>
        <li>1세대 <strong>4주택 이상</strong> 중과: 지방세법 §13의2①에 따라 12% 적용</li>
      </ul>

      <p>#### 나. 조정대상지역 외 일반세율</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>주택수와 무관하게 <strong>1~3%</strong> 일반세율 적용</li>
        <li>6억원 이하: <strong>1%</strong></li>
        <li>6억원 초과 ~ 9억원 이하: <strong>1~3%</strong> (구간별 차등)</li>
        <li>9억원 초과: <strong>3%</strong></li>
      </ul>

      <p>#### 다. 일시적 2주택 예외</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>종전주택을 보유한 1세대가 신규주택을 취득하는 경우</li>
        <li>신규주택 취득일로부터 <strong>3년 이내</strong> 종전주택 처분 조건 충족 시 중과 제외</li>
        <li>처분기한 내 미처분 시 <strong>중과세율 차액 추징</strong></li>
      </ul>

      <p>#### 라. 주택수 산정 특례</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>분양권</strong> 및 <strong>입주권</strong>은 주택수 산정에 포함 (지방세법 §13의3)</li>
        <li>주택 부속토지만 소유한 경우에도 주택수에 산입</li>
        <li>오피스텔 등 주거용 부동산은 사실상 주거 사용 여부에 따라 판단</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">세율표</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>조정대상지역 내</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>조정대상지역 외</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>1주택</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1~3%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1~3%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>일반세율</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>2주택</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>8%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1~3%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>중과 적용</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3주택</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>12%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1~3%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>중과 적용</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>4주택 이상</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>12%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1~3%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§13의2①</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>법인</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>12%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>12%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>주택수 무관 중과</td>
      </tr>
      </tbody>
      </table>

      <h3 className="text-lg font-semibold mt-6 mb-3">관련 법령</h3>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§13의2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>다주택 중과세율</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>근거법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§13의2①</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1세대 4주택 중과</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>근거법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§13의3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>분양권·입주권 포함</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시행령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 시행령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§28의2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>조정대상지역 기준</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>관련법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§11</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>일반 취득세율</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>일시적 2주택 예외</strong>를 적용받은 경우, 3년 이내 종전주택을 반드시 처분해야 하며 미처분 시 중과세율 차액이 추징된다.</li>
        <li>분양권·입주권은 <strong>계약일 기준</strong>으로 주택수에 산입되므로, 취득 시점의 주택수를 정확히 확인해야 한다.</li>
        <li>조정대상지역 지정·해제 여부는 <strong>취득일 기준</strong>으로 판단한다.</li>
        <li>증여를 통한 다주택 취득도 중과 대상에 해당하며, <strong>증여 취득세율 3.5%</strong> 대신 중과세율이 적용될 수 있다.</li>
      </ul>

      </Callout>

      <hr className="my-6" />

      <h2 id="corporate">
      <Outline level={1}>법인</Outline>
      </h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>법인이 주택을 유상취득하는 경우 주택수와 무관하게 12% 중과세율이 적용되며, 과세표준에 연체료가 포함된다.</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <p>1. <strong>법인</strong>(영리·비영리 포함)이 <strong>주택</strong>을 취득하는 경우</p>
      <p>2. 취득 유형에 따라 중과 적용 여부가 달라짐 (유상취득, 원시취득, 상속·증여 등)</p>
      <p>3. 개인과 달리 <strong>과세표준에 연체료 포함</strong> (지방세법 관련 규정)</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 법인 유상취득 중과</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>법인이 매매 등 <strong>유상취득</strong>으로 주택을 취득하는 경우</li>
        <li><strong>주택수와 무관</strong>하게 <strong>12%</strong> 중과세율 적용 (지방세법 §13의2①3)</li>
        <li>조정대상지역 내·외 구분 없이 동일하게 12% 적용</li>
      </ul>

      <p>#### 나. 법인 원시취득 (신축)</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>법인이 주택을 <strong>신축</strong>하여 원시취득하는 경우</li>
        <li><strong>2.8%</strong> 원시취득세율 적용 (중과 미적용)</li>
        <li>건축허가를 받아 직접 건설하는 경우에 해당</li>
      </ul>

      <p>#### 다. 법인 상속·증여 취득</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>법인이 <strong>상속</strong> 또는 <strong>증여</strong>로 주택을 취득하는 경우</li>
        <li><strong>별도 세율체계</strong> 적용 (중과 미적용)</li>
        <li>상속: 2.8% (농지 외), 증여: 3.5%</li>
      </ul>

      <p>#### 라. 과세표준 특례 (연체료 포함)</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>법인</strong>의 경우 과세표준 산정 시 <strong>연체료 포함</strong></li>
        <li><strong>개인</strong>의 경우 연체료는 과세표준에 <strong>미포함</strong></li>
        <li>취득가액에 부대비용(연체료 등)이 합산되어 과세표준이 증가할 수 있음</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">세율표</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>취득 유형</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>세율</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>중과 여부</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>유상취득</strong> (매매 등)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>12%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>중과 적용</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§13의2①3</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>원시취득</strong> (신축)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>2.8%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>미적용</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>일반 원시취득세율</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>상속</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>2.8%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>미적용</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>별도 세율체계</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>증여</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>3.5%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>미적용</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>별도 세율체계</td>
      </tr>
      </tbody>
      </table>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>과세표준 항목</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>법인</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>개인</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득가액</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>포함</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>포함</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>동일</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>부대비용</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>포함</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>포함</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>동일</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>연체료</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>포함</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>미포함</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>PDF Sec 06 참조</td>
      </tr>
      </tbody>
      </table>

      <h3 className="text-lg font-semibold mt-6 mb-3">관련 법령</h3>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§13의2①3</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>법인 주택 중과</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>근거법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§10</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>과세표준 산정</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>근거법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§11</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>일반 취득세율</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시행령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 시행령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§28</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>취득가액 산정 기준</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>관련법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§13의2</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>다주택 중과 전체</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>법인의 주택 유상취득은 <strong>주택수와 무관</strong>하게 12% 중과가 적용되므로, 1주택이라도 중과 대상이다.</li>
        <li><strong>원시취득(신축)</strong>과 <strong>상속·증여</strong>는 중과 대상에서 제외되므로, 취득 유형을 정확히 구분해야 한다.</li>
        <li>법인은 과세표준에 <strong>연체료가 포함</strong>되어 개인보다 과세표준이 높아질 수 있으므로 유의해야 한다.</li>
        <li>법인이 아닌 <strong>단체</strong>(법인으로 보는 단체 포함)의 경우에도 법인 중과 규정이 적용될 수 있다.</li>
        <li>법인 전환 시 취득 시기에 따라 중과 적용 여부가 달라질 수 있으므로, 전환 일자를 확인해야 한다.</li>
      </ul>

      </Callout>

      <hr className="my-6" />

      <h2 id="luxury">
      <Outline level={1}>고급주택 (사치성재산)</Outline>
      </h2>

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>고급주택은 사치성재산으로 분류되어 표준세율에 8%를 가산한 중과세율이 적용되며, 상속 1가구1주택 감면에서도 제외된다.</p>
      </blockquote>

      <h3 className="text-lg font-semibold mt-6 mb-3">적용 대상</h3>

      <p>1. <strong>사치성재산</strong>으로 분류되는 <strong>고급주택</strong>을 취득하는 경우 (개인·법인 모두)</p>
      <p>2. 지방세법 시행령 §28①에서 정하는 <strong>고급주택 기준</strong>에 해당하는 주택</p>
      <p>3. 취득 유형(유상취득, 원시취득, 상속, 증여)을 불문하고 중과 적용</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">주요 내용</h3>

      <p>#### 가. 중과세율 산정</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>표준세율 + 중과기준세율 × 400%</strong> (= 표준세율 + 8%)</li>
        <li>중과기준세율: <strong>2%</strong></li>
        <li>중과 가산분: 2% x 400% = <strong>8%</strong></li>
        <li>최종 적용세율: 일반세율(1~3%) + <strong>8%</strong> = <strong>9~11%</strong></li>
      </ul>

      <p>#### 나. 고급주택 판정 기준 (시행령 §28①)</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li><strong>일반주택</strong> (단독주택 등)</li>
        <li>건물 연면적 <strong>331㎡ 초과</strong> + 시가표준액 <strong>9억원 초과</strong></li>
        <li><strong>공동주택</strong> (아파트, 연립 등)</li>
        <li>전용면적 <strong>245㎡ 초과</strong> + 시가표준액 <strong>9억원 초과</strong></li>
        <li><strong>부대시설 기준</strong> (면적·금액 요건과 별도)</li>
        <li><strong>개인용 엘리베이터</strong> 설치</li>
        <li><strong>개인용 수영장</strong> 설치</li>
        <li>기타 사치성 부대시설</li>
      </ul>

      <p>#### 다. 상속 감면 제외</p>

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>상속으로 인한 <strong>1가구 1주택 취득세 감면</strong> 적용 시</li>
        <li><strong>고급주택은 감면 대상에서 제외</strong> (PDF Sec 08 참조)</li>
        <li>고급주택에 해당하면 상속이라도 중과세율 적용</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-3">세율표</h3>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>구분</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>표준세율</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>중과 가산</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>최종 세율</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>유상취득</strong> (6억 이하)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>+8%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>9%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>고급주택 중과</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>유상취득</strong> (6~9억)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>1~3%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>+8%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>9~11%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>구간별 차등</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>유상취득</strong> (9억 초과)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>3%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>+8%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>11%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>고급주택 중과</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>원시취득</strong> (신축)</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2.8%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>+8%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>10.8%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>고급주택 중과</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>상속</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>2.8%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>+8%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>10.8%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>감면 제외</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>증여</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>3.5%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>+8%</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>11.5%</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>고급주택 중과</td>
      </tr>
      </tbody>
      </table>

      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 'var(--content-font-size, 13px)', marginBottom: '16px'}}>
      <thead>
      <tr style={{backgroundColor: '#f0f0f0'}}>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>고급주택 기준</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>면적 요건</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>금액 요건</th>
      <th style={{border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold'}}>비고</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>단독주택 등</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>연면적 331㎡ 초과</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가표준액 9억원 초과</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>면적+금액 동시 충족</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>공동주택</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>전용면적 245㎡ 초과</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시가표준액 9억원 초과</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>면적+금액 동시 충족</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}><strong>부대시설</strong></td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>엘리베이터·수영장 등</td>
      </tr>
      </tbody>
      </table>

      <h3 className="text-lg font-semibold mt-6 mb-3">관련 법령</h3>

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
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§13⑤1</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>사치성재산 중과</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>시행령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법 시행령</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§28①</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>고급주택 판정 기준</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>관련법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§11</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>일반 취득세율</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>관련법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>§15</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>중과기준세율</td>
      </tr>
      <tr>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>관련법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>지방세특례제한법</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>-</td>
      <td style={{border: '1px solid #d9d9d9', padding: '8px'}}>상속 감면 시 고급주택 제외</td>
      </tr>
      </tbody>
      </table>

      <Callout type="caution">

      <ul className="list-disc pl-6 my-4 space-y-1">
        <li>고급주택 판정은 <strong>면적 요건</strong>과 <strong>금액 요건</strong>을 <strong>동시에 충족</strong>해야 하며, 하나만 충족하는 경우 중과 대상이 아니다.</li>
        <li>다만, <strong>개인용 엘리베이터·수영장</strong> 등 부대시설이 있는 경우에는 면적·금액 요건과 <strong>별도로</strong> 고급주택에 해당한다.</li>
        <li>고급주택은 <strong>상속 1가구1주택 감면 대상에서 제외</strong>되므로, 상속 시에도 중과세율이 적용됨에 유의해야 한다.</li>
        <li>시가표준액은 <strong>취득일 현재</strong> 기준으로 판단하며, 공시가격 변동에 따라 고급주택 해당 여부가 달라질 수 있다.</li>
        <li>리모델링 등으로 면적이 변경된 경우, <strong>변경 후 면적</strong> 기준으로 고급주택 여부를 재판정한다.</li>
      </ul>

      </Callout>

      <hr className="my-6" />

      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
        <p>본 자료는 지방세 정보 안내용이며, 법적 효력이 없습니다. 정확한 내용은 관할 지자체 세무부서에 문의하세요.</p>
      </blockquote>

    </div>
  );
}
