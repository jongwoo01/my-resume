export type ToolCategory = "sheet" | "doc" | "report" | "data" | "comms";
export type ToolImage = { src: string; alt: string; caption?: string };

type ToolBase = { slug: string; category: ToolCategory; title: string; tagline: string; period: string; featured: boolean };
export type PlannedAiTool = ToolBase & { status: "planned" };
export type CompleteAiTool = ToolBase & {
  status: "complete";
  problem: string[];
  solution: string[];
  utility: string[];
  roles: string[];
  validation: string[];
  limitations: string[];
  stack: string[];
  images: { main: ToolImage; detail: ToolImage[] };
  liveUrl?: string;
  repoUrl?: string;
};
export type AiTool = PlannedAiTool | CompleteAiTool;

export const tools: AiTool[] = [
  {
    slug: "purchase-receipt-exceptions", category: "report", title: "발주·입고 예외 현황판", period: "2026.08–09", featured: true, status: "complete",
    tagline: "시트의 발주·입고 정보에서 지연·부분입고·이번 주 미입고를 먼저 찾는 구매 운영 현황판",
    problem: [
      "구매 담당자는 시트에서 발주·납기·입고 정보를 수정하지만, 구매팀장과 생산·현장 담당자는 지연·부분입고·이번 주 미입고를 매번 행 단위로 찾아야 했습니다.",
      "정상 진행 건 사이에 예외 건이 섞여 있어 회의나 일상 점검 때 어떤 발주를 먼저 확인할지 빠르게 판단하기 어려웠습니다.",
    ],
    solution: [
      "서버에서만 시트 응답을 읽고 행별 필수값·날짜·수량·상태를 검사한 뒤, 기준일과 입고예정일을 바탕으로 지연·부분입고·이번 주 미입고를 계산합니다.",
      "거래처·분류·담당자·상태·입고예정 기간 필터와 예외 탭을 제공해, 전체 행을 다시 훑지 않고 필요한 발주만 확인하도록 구성했습니다.",
    ],
    utility: ["첫 화면의 지표로 이번 주 미입고, 전량 미입고, 지연, 부분입고 규모를 즉시 비교합니다.", "지연이 큰 순서의 확인 목록에서 담당자·거래처·품목·입고 현황을 함께 확인합니다.", "전체 표에서는 단가와 개별 발주금액을 숨기고, 구매 분석에서는 취소 건을 제외한 승인 집계만 보여 줍니다."],
    roles: ["제가 기준일, 예외 판정 규칙, 표시 우선순위와 금액 노출 범위를 정했습니다. 구매 담당자는 원본 시트를 갱신하고, 확인 대상의 후속 조치를 판단합니다.", "생성형 AI를 사용하지 않는 고정 규칙 기반 서비스입니다. 서비스는 행 검증과 예외 집계를 반복 처리하지만, 납기 조정이나 구매 의사결정은 대신하지 않습니다."],
    validation: ["PRD의 160행 기준으로 이번 주 미입고 11건, 전량 미입고 4건, 지연 16건, 부분입고 13건이 계산되는지 확인했습니다.", "시트 응답이 실패해도 화면이 멈추지 않고 목데이터·연결 원인을 구분해 보이며, 잘못된 행은 확인 필요로 제외하도록 구현했습니다."],
    limitations: ["현재 시트 웹앱은 `rows` 계약 대신 `id` 인수 오류를 반환해, 실제 행을 표시하려면 Apps Script 응답을 복구해야 합니다.", "현황판은 읽기 전용 해석 도구입니다. 납기 변경, 거래처 연락, 입고 확정은 원본 시트와 담당자 확인이 필요합니다."],
    stack: ["Next.js", "TypeScript", "Google Sheets", "Apps Script"], repoUrl: "https://github.com/jongwoo01/my-dashboard",
    images: { main: { src: "/tools/purchase-receipt-exceptions/main.png", alt: "발주·입고 예외 현황판의 필터, 예외 지표와 확인 목록" }, detail: [
      { src: "/tools/purchase-receipt-exceptions/detail/01.png", alt: "지연 발주만 분류한 확인 목록", caption: "지연 탭에서 기준일 이전 입고예정이면서 전량 입고되지 않은 발주를 확인합니다." },
      { src: "/tools/purchase-receipt-exceptions/detail/02.png", alt: "부분입고 발주만 분류한 확인 목록", caption: "부분입고 탭에서 발주수량과 입고수량의 차이를 확인합니다." },
      { src: "/tools/purchase-receipt-exceptions/detail/03.png", alt: "승인된 발주만 집계한 구매 분석", caption: "구매 분석은 취소 건을 제외한 승인 집계를 펼쳐 볼 수 있습니다." },
    ] },
  },
  {
    slug: "ax-realtor-camp", category: "comms", title: "에듀윌 AX공인캠프 안내 페이지", period: "2026.08", featured: false, status: "complete",
    tagline: "행사 성격과 준비물을 한 페이지에 정리해 신청 전 반복 문의를 줄이는 안내 페이지",
    problem: ["참가 신청을 구글폼 링크만으로 받으면 행사의 성격, 일정, 장소, 준비물, 참가비를 묻는 문의가 반복되고 안내 채널마다 최신 정보가 달라질 수 있습니다.", "특히 노트북·ChatGPT 유료 구독·구글 계정을 준비하지 않은 참가자는 현장 실습에 참여하기 어렵습니다."],
    solution: ["첫 화면의 브리핑 메모와 기본 정보, 하루 순서, 준비물·참가비, FAQ, 오시는 길을 하나의 세로 흐름으로 배치했습니다.", "신청 판단에 필요한 정보를 한 페이지에서 확인한 뒤 외부 신청 폼으로 이동하도록 설계해, 변경 사항도 하나의 안내 원본에서 갱신할 수 있게 했습니다."],
    utility: ["처음 방문한 공인중개사가 대상·정원·마감일·장소를 빠르게 확인합니다.", "준비물과 무료 여부를 신청 전에 분명히 보여 실습 당일의 준비 누락 가능성을 줄입니다.", "카카오톡·이메일 등 어떤 채널로 공유해도 같은 최신 안내 페이지를 기준으로 삼습니다."],
    roles: ["제가 신청 판단에 필요한 정보의 우선순위와 페이지 흐름을 정하고, 행사 담당자가 일정·장소·준비물·신청 링크의 사실성을 최종 확인하는 구조입니다.", "런타임 AI 기능은 없습니다. AI 실무 교육 행사를 위한 정보 설계 결과물이며, 신청 심사나 참가자 안내를 자동으로 대신하지 않습니다."],
    validation: ["데스크톱과 모바일에서 첫 화면의 핵심 정보와 신청 안내가 읽히는지, 준비물·FAQ·오시는 길까지 순서대로 이동하는지 확인했습니다.", "외부 신청 폼 URL이 제공되지 않은 상태에서는 버튼을 비활성화해 실제 연결이 있는 것처럼 보이지 않게 처리했습니다."],
    limitations: ["실제 외부 신청 폼 URL, 문의 수단, 상세 교통 안내가 아직 제공되지 않아 배포 전 사실 확인과 연결이 필요합니다.", "로그인, 회원가입, 결제, 신청자 목록 저장은 제공하지 않으며 신청 데이터는 외부 폼의 범위에서 관리해야 합니다."],
    stack: ["Next.js", "TypeScript", "Responsive UI", "Kakao Map"], repoUrl: "https://github.com/jongwoo01/my-landingpage",
    images: { main: { src: "/tools/ax-realtor-camp/main.png", alt: "에듀윌 AX공인캠프의 행사 소개와 브리핑 메모" }, detail: [
      { src: "/tools/ax-realtor-camp/detail/01.png", alt: "캠프 핵심 정보와 하루 진행 순서", caption: "일정, 장소, 대상, 정원과 하루 순서를 한 흐름으로 확인합니다." },
      { src: "/tools/ax-realtor-camp/detail/02.png", alt: "실습 준비물과 참가비, 신청 안내", caption: "실습에 필요한 준비물과 참가비를 신청 전에 명확히 안내합니다." },
      { src: "/tools/ax-realtor-camp/detail/03.png", alt: "자주 묻는 질문과 오시는 길", caption: "반복 문의를 FAQ로 정리하고 장소 안내를 제공합니다." },
    ] },
  },
  {
    slug: "global-market-briefing", category: "data", title: "글로벌 해외시장 브리핑", period: "2026.09", featured: false, status: "complete",
    tagline: "KOTRA 공개 기사를 AI가 구조화해 해외시장 검토 순서를 정리하는 내부 브리핑",
    problem: ["수출기업의 해외사업·시장조사 담당자는 여러 국가와 주제의 단신속보·해외시장뉴스를 직접 읽으며 무엇을 먼저 검토할지 정해야 했습니다.", "원문은 길고 두 자료유형의 형식이 달라, 변화 신호와 배경 정보를 같은 기준으로 비교하기 어려웠습니다."],
    solution: ["KOTRA의 두 자료유형을 Apps Script에서 수집·정규화하고, Gemini가 요약·분류·우선순위·검토 이유·확인사항을 구조화된 JSON 초안으로 만듭니다.", "검사된 결과를 Google Sheets에 저장한 뒤 Next.js 화면은 저장된 데이터만 읽어 자료유형·분류 필터와 원문 링크를 제공합니다."],
    utility: ["단신속보로 변화 신호를 먼저 보고, 해외시장뉴스로 배경을 이어 확인합니다.", "최신순·동일 날짜 우선순위 순으로 정렬해 먼저 읽을 기사를 빠르게 고릅니다.", "카드의 변화·검토 이유·확인사항과 원문 링크를 함께 보며 다음 조사와 실제 사업 판단을 준비합니다."],
    roles: ["제가 수집 범위, 허용 분류·우선순위, 중복 기준, 일일 호출 한도와 공개 범위를 정했습니다. 담당자는 원문 대조와 실제 해외사업 판단을 맡습니다.", "Gemini는 원문 근거의 구조화된 검토 초안만 만듭니다. AI 결과를 저장해 화면을 새로고침할 때 다시 호출하지 않으며, 최종 결론을 대신하지 않습니다."],
    validation: ["Apps Script 실행 기록, 기사 시트, 공개 화면을 함께 대조하고 두 자료유형의 카드와 원문을 직접 확인하도록 설계했습니다.", "출력값은 허용 분류·우선순위·필수 문장을 코드로 검사하며, 한 자료유형이 실패해도 기존 정상 데이터와 반대 유형 결과를 보존하는 DEGRADED 상태를 표시합니다."],
    limitations: ["AI 분석은 하루 호출 한도와 원문 앞부분 길이 제한 안에서만 실행되며, API·모델 응답 실패 시 결과가 비어 있거나 재시도 상태로 남을 수 있습니다.", "이 서비스는 공개 데이터를 이용한 조사 보조 도구입니다. 원문에 없는 사실을 확정적으로 쓰지 않으며 실제 사업 판단은 담당자의 원문 검토가 필요합니다."],
    stack: ["Next.js", "Apps Script", "Google Sheets", "Gemini", "KOTRA API"], repoUrl: "https://github.com/jongwoo01/my-news",
    images: { main: { src: "/tools/global-market-briefing/main.png", alt: "글로벌 해외시장 브리핑의 갱신 시각, 필터와 기사 카드" }, detail: [
      { src: "/tools/global-market-briefing/detail/01.png", alt: "자료유형과 분류로 좁힌 시장 브리핑 기사", caption: "자료유형과 내용 분류로 검토 대상을 좁힐 수 있습니다." },
      { src: "/tools/global-market-briefing/detail/02.png", alt: "AI 분석 초안과 원문 링크가 있는 기사 카드", caption: "AI 초안의 변화·확인사항을 원문 링크와 함께 확인합니다." },
      { src: "/tools/global-market-briefing/detail/03.png", alt: "시장 브리핑의 추가 기사 목록", caption: "최신순과 우선순위 기준으로 다음 검토 기사를 비교합니다." },
    ] },
  },
  {
    slug: "g2b-bid-watch", category: "data", title: "나라장터 공고 관제", period: "2026.09", featured: false, status: "complete",
    tagline: "나라장터 용역 공고를 매일 수집하고 마감순으로 정리하는 담당자 전용 관제",
    problem: ["담당자는 새로 올라온 나라장터 용역 공고와 임박한 마감을 놓치지 않아야 하지만, 여러 페이지의 공고를 직접 검색하고 이전 결과와 비교해야 했습니다.", "같은 공고의 변경 여부와 오늘 새로 수집된 공고를 분리해 확인하기 어려워, 검토 우선순위를 세우는 데 시간이 들었습니다."],
    solution: ["Apps Script가 최근 72시간의 나라장터 용역 공고를 조회하고, 교육·취업·진로·직업훈련 키워드와 마감 조건으로 후보를 걸러 공고번호 기준으로 중복 제거·갱신합니다.", "수집 결과는 시트와 실행기록에 저장하고, Next.js 담당자 전용 화면에서 마감 임박순·검색·마감 필터·정렬 기준으로 다시 확인합니다."],
    utility: ["진행 중 공고, 오늘 수집, 최고 추정가격, 가장 가까운 마감을 한 화면에서 비교합니다.", "공고명·기관명·공고번호 검색과 24시간·3일 마감 필터로 우선 검토 대상을 빠르게 좁힙니다.", "원문 보기 링크와 마감된 공고 분리 영역으로 저장 데이터와 실제 공고를 이어 확인합니다."],
    roles: ["제가 수집 대상, 검색 키워드, 72시간 범위, 중복·갱신 기준과 최대 신규 추가 수를 정했습니다. 담당자는 입찰 적합성 검토와 실제 대응을 판단합니다.", "생성형 AI를 사용하지 않는 결정론적 수집 자동화입니다. 서비스는 API 조회·정렬·변경 감지·실행기록을 반복 처리하지만 입찰 여부를 결정하지 않습니다."],
    validation: ["수집 실행마다 API 조회 수, 필터 통과 수, 신규 추가·기존 갱신·동일값 건너뜀·보류 후보 수를 실행기록에 남겨 결과를 확인합니다.", "로그인 후 표시되는 공고 목록에서 마감 임박순, 검색·필터·정렬과 원문 링크가 실제 저장값을 기준으로 동작하는지 점검했습니다."],
    limitations: ["용역 공고와 정해진 키워드, 최근 72시간의 마감 전 공고만 대상으로 하므로 다른 분야·키워드의 공고는 포착하지 못할 수 있습니다.", "하루 1회 수집과 신규 30건 제한이 있으며, API 원문 변경·접근 오류·마감 시각은 원문 공고에서 다시 확인해야 합니다."],
    stack: ["Next.js", "Apps Script", "Google Sheets", "나라장터 API"], repoUrl: "https://github.com/jongwoo01/my-watch",
    images: { main: { src: "/tools/g2b-bid-watch/main.png", alt: "나라장터 공고 관제의 공고 현황 요약과 목록" }, detail: [
      { src: "/tools/g2b-bid-watch/detail/01.png", alt: "마감일 필터를 적용한 나라장터 공고 목록", caption: "24시간 또는 3일 이내 마감 공고로 검토 범위를 좁힙니다." },
      { src: "/tools/g2b-bid-watch/detail/02.png", alt: "정렬 기준을 바꾼 나라장터 공고 목록", caption: "마감 임박순, 추정가격 높은 순, 최근 수집 순으로 확인할 수 있습니다." },
      { src: "/tools/g2b-bid-watch/detail/03.png", alt: "검색어를 적용한 나라장터 공고 목록", caption: "공고명·기관명·공고번호 검색 결과에서 원문으로 이동할 수 있습니다." },
    ] },
  },
];
