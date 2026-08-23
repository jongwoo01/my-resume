/*
  ─────────────────────────────────────────────────────────────────────────────
  AI 업무툴 포트폴리오 데이터

  ⚠️  아래 툴·수치·스크린샷은 전부 가상의 예시입니다. 본인이 만든 툴로 교체하세요.

  툴마다 아래 6가지를 같은 순서로 씁니다. (상세 페이지에서 이 순서대로 보여집니다)
    ① problem     해결하려던 업무 문제
    ② result      만든 결과물 + 대표 스크린샷
    ③ features    핵심 기능 — 3개 이내
    ④ safeguards  정확성·편의성·실수 방지를 위해 고려한 점
    ⑤ stack / duration   사용 도구와 제작 기간
    ⑥ outcomes / liveUrl 절감 시간·처리 건수 등 성과와 라이브 링크

  스크린샷 규칙
  - public/tools/<slug>/ 폴더에 넣고, 16:10 비율을 권장합니다. (카드에서는 정사각으로 잘립니다)
  - 스크린샷만 보아도 결과물을 이해할 수 있어야 합니다.
  - 실제 업무 데이터·실명·고객정보·회사 내부정보는 모두 데모 데이터로 교체·마스킹합니다.
  - 라이브 링크(liveUrl)에는 가상 데이터만 사용합니다.
  ─────────────────────────────────────────────────────────────────────────────
*/

export type ToolCategory = "sheet" | "doc" | "report" | "data" | "comms";
// 카테고리 라벨은 src/lib/tools.ts 의 CATEGORY_LABELS 에서 바꿀 수 있습니다.
//   sheet  스프레드시트 자동화   doc    문서·회의록   report 보고·대시보드
//   data   데이터 정리·검증      comms  알림·커뮤니케이션

export type ToolImage = { src: string; alt: string; caption?: string };

export type AiTool = {
  slug: string; // URL(/tools/<slug>) 과 public/tools/<slug>/ 폴더명
  category: ToolCategory;
  title: string;
  tagline: string; // 카드 한 줄 설명 (40자 이내 권장)
  period: string; // 완성 연월 "YYYY.MM" (카드 메타·정렬 기준)
  problem: string[]; // ① 문단 배열
  result: { summary: string[]; mainImage: ToolImage }; // ②
  features: string[]; // ③ 최대 3개 (초과분은 표시되지 않습니다)
  safeguards: string[]; // ④
  stack: string[]; // ⑤ 사용 도구
  duration: string; // ⑤ 제작 기간
  outcomes: { value: string; label: string }[]; // ⑥ 성과 수치 2~3개
  liveUrl?: string; // ⑥ 라이브 링크 — 데모 데이터만 사용. 없으면 지우세요
  repoUrl?: string; // 코드 저장소 (선택)
  detailImages: ToolImage[]; // 추가 화면. 캡션을 달면 이해가 빨라집니다
  featured: boolean; // true 면 그리드 맨 앞에 배치
};

// ✏️ 여기를 수정하세요
export const tools: AiTool[] = [
  {
    slug: "card-settlement-matcher",
    category: "sheet",
    title: "법인카드 정산 자동 대사 툴",
    tagline: "카드 명세와 증빙을 자동으로 대조하고 불일치 사유까지 분류",
    period: "2025.10",
    problem: [
      "매월 법인카드 명세 약 400건을 지출결의 증빙과 눈으로 하나씩 대조했습니다. 한 달에 12시간이 들었고, 마감 직전에야 누락을 발견해 담당자에게 급히 증빙을 요청하는 일이 반복됐습니다.",
      "금액은 같은데 일자가 하루 다르거나, 가맹점명이 카드사와 영수증에서 다르게 표기되는 경우가 많아 단순 일치 검사로는 잡히지 않았습니다.",
    ],
    result: {
      summary: [
        "Google Sheets 위에 Apps Script로 만든 대사 툴입니다. 카드사 CSV를 업로드하면 지출결의 시트와 자동으로 매칭하고, 불일치 건은 사유를 분류해 담당자별로 정리합니다.",
        "확정은 사람이 합니다. 툴은 '이 건은 일치로 보입니다'라고 제안만 하고, 담당자가 승인 버튼을 눌러야 대사 결과 시트에 기록됩니다.",
      ],
      mainImage: {
        src: "/tools/card-settlement-matcher/main.svg",
        alt: "대사 결과 시트 화면 — 일자·가맹점·금액·증빙번호·상태 열과 우측 불일치 사유 제안 패널",
        caption: "대사 결과 화면. 상태(일치·불일치·미제출)와 AI가 제안한 불일치 사유를 한 화면에서 확인합니다.",
      },
    },
    features: [
      "금액·일자·가맹점명 유사도를 함께 보는 자동 매칭",
      "불일치 건의 사유 자동 분류 (일자 차이 · 금액 분할 · 증빙 미제출)",
      "미제출 담당자에게 증빙 요청 메일 자동 발송",
    ],
    safeguards: [
      "자동 매칭은 '제안'까지만 — 확정은 담당자 승인 버튼으로만 기록",
      "금액 오차 0원, 일자 차이 ±1일 범위를 벗어나면 자동 매칭 금지",
      "원본 명세 시트는 읽기 전용으로 보호하고, 모든 처리 내역을 로그 시트에 기록",
      "AI 분류 결과는 근거 문구를 함께 표시해 담당자가 바로 검증 가능",
    ],
    stack: ["Google Sheets", "Google Apps Script", "OpenAI API", "Gmail"],
    duration: "2025.09 – 2025.10 · 약 5주 (업무 외 시간)",
    outcomes: [
      { value: "2시간", label: "월 마감 소요 시간 (12시간 → )" },
      { value: "400건", label: "월 자동 처리 건수" },
      { value: "1% 미만", label: "증빙 누락률 (9% → )" },
    ],
    liveUrl: "https://example.com/demo/card-settlement-matcher", // 데모 데이터만 쓰는 라이브 링크로 교체
    detailImages: [
      {
        src: "/tools/card-settlement-matcher/detail/01.svg",
        alt: "카드사 CSV 업로드 화면",
        caption: "카드사 CSV를 끌어다 놓고 '이번 달 대사 실행'을 누르면 끝입니다.",
      },
      {
        src: "/tools/card-settlement-matcher/detail/02.svg",
        alt: "불일치 사유 분류 패널",
        caption: "불일치 사유를 3가지로 분류하고 원문 근거를 함께 보여줍니다.",
      },
      {
        src: "/tools/card-settlement-matcher/detail/03.svg",
        alt: "미제출 담당자 알림 메일 미리보기",
        caption: "발송 전 미리보기에서 수신자와 건수를 확인한 뒤 보냅니다.",
      },
    ],
    featured: true,
  },
  {
    slug: "minutes-to-tasks",
    category: "doc",
    title: "회의록 → 업무 배분표 생성기",
    tagline: "회의 메모를 붙여넣으면 결정사항과 담당·기한이 정리됩니다",
    period: "2026.02",
    problem: [
      "주 2회 팀 회의가 끝나면 메모를 회의록으로 정리하고, 액션아이템을 뽑아 담당자와 기한을 배분표에 옮겨 적었습니다. 회의당 90분이 걸렸고, 급하게 정리하다 담당자를 빠뜨리는 일이 생겼습니다.",
    ],
    result: {
      summary: [
        "회의 메모를 붙여넣으면 Claude API가 결정사항과 액션아이템을 표로 구조화해 주는 간단한 웹 폼입니다. 담당자와 기한을 제안하고, 확인 후 Google Docs와 배분표 시트로 내보냅니다.",
        "각 항목 옆에 원문 출처 문장을 붙여 두어, 팀원이 '이거 내가 한다고 했나?'를 바로 확인할 수 있게 했습니다.",
      ],
      mainImage: {
        src: "/tools/minutes-to-tasks/main.svg",
        alt: "좌측 회의 메모 입력란과 우측 결정사항·액션아이템 표",
        caption: "좌측에 메모를 붙여넣으면 우측에 결정사항과 액션아이템(담당·기한·출처)이 정리됩니다.",
      },
    },
    features: [
      "메모 → 결정사항 · 액션아이템 자동 구조화",
      "담당자·기한 자동 제안 (수정 가능)",
      "Google Docs 회의록 · 배분표 시트로 내보내기",
    ],
    safeguards: [
      "담당자는 등록된 팀원 목록에서만 선택 — AI가 없는 이름을 만들지 못하도록 제한",
      "기한이 없는 항목은 '미정'으로 강조해 회의에서 바로 확인",
      "모든 항목에 원문 출처 문장을 표시해 오해 방지",
      "내보내기 전 미리보기 단계 필수 — 확인 없이 발송되지 않음",
    ],
    stack: ["Claude API", "HTML · JavaScript", "Google Docs API", "Google Sheets"],
    duration: "2026.01 – 2026.02 · 약 4주",
    outcomes: [
      { value: "20분", label: "회의당 정리 시간 (90분 → )" },
      { value: "월 8건", label: "처리한 회의 수" },
      { value: "0건", label: "액션아이템 누락 (6개월)" },
    ],
    liveUrl: "https://example.com/demo/minutes-to-tasks", // 데모 데이터만 쓰는 라이브 링크로 교체
    detailImages: [
      {
        src: "/tools/minutes-to-tasks/detail/01.svg",
        alt: "팀원 목록 드롭다운",
        caption: "담당자는 팀원 목록에서만 고릅니다. AI가 임의의 이름을 쓰는 것을 막습니다.",
      },
      {
        src: "/tools/minutes-to-tasks/detail/02.svg",
        alt: "내보내기 전 확인 모달",
        caption: "내보내기 전 항목 수·담당자·기한 미정 건수를 한 번 더 확인합니다.",
      },
      {
        src: "/tools/minutes-to-tasks/detail/03.svg",
        alt: "원문 출처 하이라이트",
        caption: "항목을 누르면 원문 메모의 해당 문장이 강조됩니다.",
      },
    ],
    featured: false,
  },
  {
    slug: "weekly-report-dashboard",
    category: "report",
    title: "주간 운영 보고서 자동 대시보드",
    tagline: "5개 시트를 취합해 보고서와 요약 문장을 자동으로 만듭니다",
    period: "2025.05",
    problem: [
      "매주 구매·비품·인사·경비·민원 5개 시트에서 수치를 모아 주간 보고서를 만들었습니다. 4시간이 걸렸고, 한 번은 시트 하나를 빠뜨려 합계가 맞지 않는 보고서가 올라간 적이 있습니다.",
    ],
    result: {
      summary: [
        "Python 스크립트가 5개 시트를 취합해 정합성을 검사하고, Looker Studio 대시보드와 요약 문장을 자동으로 만듭니다. 버튼 한 번으로 PDF 보고서가 출력됩니다.",
        "원천 시트 합계와 집계 합계가 다르면 발행이 막힙니다. 합계가 맞지 않는 보고서는 아예 나가지 않게 했습니다.",
      ],
      mainImage: {
        src: "/tools/weekly-report-dashboard/main.svg",
        alt: "주간 운영 대시보드 — KPI 타일 4개, 6주 추이 막대 그래프, 이번 주 요약 문장",
        caption: "주간 KPI, 6주 추이, 자동 생성된 요약 문장을 한 화면에 모았습니다.",
      },
    },
    features: [
      "5개 원천 시트 자동 취합과 정합성 검사",
      "전주 대비 변동을 설명하는 요약 문장 자동 생성",
      "PDF 보고서 원클릭 출력",
    ],
    safeguards: [
      "원천 합계 ≠ 집계 합계이면 보고서 발행 차단",
      "전주 대비 ±30% 이상 변동 항목을 강조해 검토 유도",
      "데이터 기준일과 갱신 시각을 보고서 상단에 항상 표시",
      "개인정보 컬럼(이름·연락처)은 취합 대상에서 제외",
    ],
    stack: ["Python (pandas)", "Google Sheets API", "Looker Studio", "OpenAI API"],
    duration: "2025.04 – 2025.05 · 약 6주",
    outcomes: [
      { value: "1시간", label: "주간 보고 작성 시간 (4시간 → )" },
      { value: "150시간", label: "연간 절감 시간" },
      { value: "0회", label: "보고 지연 (12개월)" },
    ],
    liveUrl: "https://example.com/demo/weekly-report-dashboard", // 데모 데이터만 쓰는 라이브 링크로 교체
    detailImages: [
      {
        src: "/tools/weekly-report-dashboard/detail/01.svg",
        alt: "정합성 검사 결과 패널",
        caption: "원천 합계와 집계 합계를 대조합니다. 불일치 시 발행 버튼이 비활성화됩니다.",
      },
      {
        src: "/tools/weekly-report-dashboard/detail/02.svg",
        alt: "전주 대비 변동 강조 표",
        caption: "±30% 이상 변동한 항목은 강조되어 보고 전에 한 번 더 확인하게 됩니다.",
      },
      {
        src: "/tools/weekly-report-dashboard/detail/03.svg",
        alt: "출력된 PDF 보고서 미리보기",
        caption: "출력된 PDF 보고서 1페이지. 기준일과 갱신 시각이 상단에 표시됩니다.",
      },
    ],
    featured: false,
  },
];
