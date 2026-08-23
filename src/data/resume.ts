/*
  ─────────────────────────────────────────────────────────────────────────────
  이력서 데이터 — 이 파일과 src/data/tools.ts 두 파일만 수정하면 사이트가 완성됩니다.

  ⚠️  아래 인물·회사·수치·자격·이메일은 전부 가상의 예시 데이터입니다. 본인 정보로 교체하세요.

  작성 규칙
  - 날짜는 "YYYY.MM" 형식으로 통일하고, 목록은 최신순으로 정렬합니다.
  - 성과는 결과(result)를 먼저 쓰고, 그 결과를 만든 행동(action)을 뒤에 씁니다.
      예) result: "월 12시간 걸리던 정산 업무를 2시간으로 단축(83%↓)"
          action: "반복 계산을 함수와 매크로로 표준화"
  - 회사·고객 정보는 익명화합니다. ("중견 제조업체 A사", "스타트업 B사")
  - 면접에서 근거를 설명할 수 없는 과장은 쓰지 않습니다.

  게재 금지 (채용절차법·개인정보 보호)
  - 휴대전화 번호, 생년월일, 성별, 상세 주소, 주민등록번호, 계좌번호
  - 가족관계, 재산, 혼인 여부, 현재 연봉
  - 상세 주소 대신 "근무 가능 지역"만 적습니다.
  ─────────────────────────────────────────────────────────────────────────────
*/

export type Profile = {
  name: string; // 이름
  englishName: string; // 영문 이름 (헤더 이름 옆 회색 표기)
  role: string; // 지원 직무 — 한 줄
  eyebrow: string; // 히어로 최상단 작은 라벨 (직무 키워드 · 로 구분)
  headline: string[]; // 큰 제목. 배열 원소 하나 = 한 줄
  lead: string; // 한 줄 자기 정의 (2~3문장)
  titles: string[]; // 히어로 하단 '—' 로 구분되는 짧은 소개 (경력 연차, 입사 가능 시기 등)
  profileImage: string; // public/ 기준 경로. 교체 시 정사각형 권장 (예: /profile.jpg)
  profileImageAlt: string;
  email: string; // 공개용 이메일 (개인 휴대전화 번호는 적지 않습니다)
  location: string; // 근무 가능 지역만 (상세 주소 금지)
  siteUrl: string; // 배포 URL (SEO·sitemap 에 사용). Vercel 배포 후 갱신
  links: { label: string; href: string }[]; // 연락 섹션 링크 행 (LinkedIn, 블로그 등). 없으면 []
  seo: { title: string; description: string };
};

export type Stat = { value: string; label: string };
export type Competency = { title: string; evidence: string; tools?: string[] };
export type EmploymentType = "정규직" | "계약직" | "인턴" | "파견" | "프리랜서";
export type Bullet = { result: string; action: string };
export type Experience = {
  org: string; // 익명화된 회사명
  orgNote?: string; // 규모·업종 (선택)
  start: string; // "YYYY.MM"
  end: string | null; // "YYYY.MM" 또는 null(재직중)
  role: string; // 부서·직급
  employmentType: EmploymentType;
  bullets: Bullet[]; // 주요 성과 2~4개
};
export type Education = {
  school: string;
  major: string;
  degree: string;
  start: string;
  end: string;
  note?: string;
};
export type Certification = {
  kind: "자격" | "어학";
  name: string;
  score?: string; // 어학 점수·등급
  issuer: string;
  date: string; // 취득 "YYYY.MM"
};
export type SkillGroup = {
  category: string;
  items: { name: string; context: string }[]; // 활용 맥락을 반드시 함께
};
export type Activity = {
  kind: "활동" | "수상";
  name: string;
  org: string;
  start: string;
  end?: string;
  result: string; // 한 줄 성과
};
export type NavItem = { href: string; label: string };

// ✏️ 여기를 수정하세요 — 기본 프로필
export const profile: Profile = {
  name: "홍길동",
  englishName: "Hong Gildong",
  role: "경영지원 · 총무/인사 사무",
  eyebrow: "경영지원 · 총무 · 인사 사무 · AI 업무 자동화",
  headline: ["반복 업무를 줄이고,", "숫자로 증명합니다."],
  lead:
    "경영지원 사무 3년 6개월, 홍길동입니다. 정산·비품·인사 서류처럼 매달 반복되는 일을 표준화하고, 손이 많이 가는 부분은 직접 만든 자동화 툴로 해결해 왔습니다. 일이 제때 돌아가게 만드는 데서 가장 큰 보람을 느낍니다.",
  titles: ["경영지원 3년 6개월", "AI 업무툴 3종 제작·운영", "2026.09 입사 가능"],
  profileImage: "/profile.svg",
  profileImageAlt: "홍길동 프로필 일러스트",
  email: "gildong.hong.work@example.com",
  location: "서울·경기 (재택 근무 가능)",
  siteUrl: "https://resume-example.leejongwoo.com",
  links: [],
  seo: {
    title: "홍길동 — 경영지원 · 총무/인사 사무 이력서",
    description:
      "경영지원 사무 3년 6개월. 정산·비품·인사 업무를 표준화하고, 직접 만든 AI 업무 자동화 툴 3종으로 연 180시간을 절감한 사무직 지원자 홍길동의 이력서입니다.",
  },
};

// ✏️ 대표 성과 — 수치 중심 2~4개 (히어로 하단)
export const stats: Stat[] = [
  { value: "83%↓", label: "월 정산 업무 시간 (12시간 → 2시간)" },
  { value: "1% 미만", label: "비용 증빙 누락률 (9% → )" },
  { value: "180시간", label: "직접 만든 툴로 절감한 연간 업무 시간" },
  { value: "3년 6개월", label: "경영지원 실무 경력" },
];

// ✏️ 핵심 역량 — 직무와 직접 관련된 3~5개. 각 역량에 수치·사례·도구 근거
export const competencies: Competency[] = [
  {
    title: "정산·경비 관리",
    evidence:
      "월 400건 법인카드·지출결의 대사를 2시간 안에 마감합니다. 체크리스트와 자동 알림으로 증빙 누락률을 9%에서 1% 미만으로 낮췄습니다.",
    tools: ["Excel", "Google Sheets", "더존 Smart A"],
  },
  {
    title: "총무·자산 관리",
    evidence:
      "연 2회 전사 비품 실사를 5일에서 2일로 단축했습니다. 300명 규모 사무실 이전을 일정 내 완료하고 예산 8%를 절감했습니다.",
    tools: ["바코드 라벨", "재고 대장", "업체 견적 비교"],
  },
  {
    title: "인사 행정·온보딩",
    evidence:
      "신규 입사자 서류 처리 리드타임을 3일에서 1일로 줄였습니다. 연 40명 입·퇴사 처리를 오류 0건으로 마감했습니다.",
    tools: ["그룹웨어", "4대보험 EDI", "온보딩 템플릿"],
  },
  {
    title: "업무 자동화·데이터 정리",
    evidence:
      "반복 업무 3종을 직접 자동화해 연 180시간을 절감했습니다. 검증 로직과 승인 단계를 두어 자동화로 인한 실수를 막았습니다.",
    tools: ["Apps Script", "ChatGPT · Claude", "Python 기초"],
  },
];

// ✏️ 경력 — 최신순. 성과는 결과(result) 먼저, 행동(action) 뒤에
export const experiences: Experience[] = [
  {
    org: "중견 제조업체 A사",
    orgNote: "산업용 부품 · 직원 약 300명",
    start: "2023.03",
    end: null,
    role: "경영지원팀 주임",
    employmentType: "정규직",
    bullets: [
      {
        result: "월 12시간 걸리던 법인카드 정산 대사를 2시간으로 단축(83%↓)",
        action: "반복 계산을 함수로 표준화하고 Apps Script 자동 대사 툴 제작",
      },
      {
        result: "비용 증빙 누락률 9% → 1% 미만 (월 평균 140건 기준)",
        action: "제출 체크리스트와 담당자별 자동 알림 메일 도입",
      },
      {
        result: "전사 비품 실사 기간 5일 → 2일 (연 2회)",
        action: "바코드 라벨과 시트 기반 재고 대장을 통합",
      },
      {
        result: "신규 입사자 서류 처리 3일 → 1일, 연 40명 처리 오류 0건",
        action: "온보딩 서류 패키지를 템플릿화하고 체크리스트로 관리",
      },
    ],
  },
  {
    org: "스타트업 B사",
    orgNote: "IT 서비스 · 직원 약 40명",
    start: "2022.01",
    end: "2023.02",
    role: "운영지원 담당",
    employmentType: "정규직",
    bullets: [
      {
        result: "주간 운영 보고서 작성 시간 주 4시간 → 1시간",
        action: "5개 시트에 흩어진 데이터 취합을 자동화",
      },
      {
        result: "회의 액션아이템 누락 0건을 6개월 유지",
        action: "회의록 템플릿과 담당·기한 추적표 도입",
      },
      {
        result: "40명 규모 사무실 이전을 일정 내 완료, 예산 8% 절감",
        action: "업체 견적 12건 비교표 작성 후 조건 협상",
      },
    ],
  },
  {
    org: "공공기관 C",
    orgNote: "지자체 산하 기관",
    start: "2021.07",
    end: "2021.08",
    role: "행정 인턴",
    employmentType: "인턴",
    bullets: [
      {
        result: "민원 접수 대장 200건 전산화, 입력 오류 0건",
        action: "입력 규칙을 먼저 정의하고 이중 검토 절차 적용",
      },
    ],
  },
];

// ✏️ 학력
export const education: Education[] = [
  {
    school: "한국대학교",
    major: "경영학과",
    degree: "학사",
    start: "2018.03",
    end: "2022.02",
  },
];

// ✏️ 자격·어학 — 최신순. 자격명 또는 점수, 발급기관, 취득연월
export const certifications: Certification[] = [
  {
    kind: "자격",
    name: "ADsP (데이터분석 준전문가)",
    issuer: "한국데이터산업진흥원",
    date: "2025.06",
  },
  { kind: "어학", name: "TOEIC", score: "865", issuer: "ETS", date: "2024.03" },
  {
    kind: "자격",
    name: "ERP정보관리사 인사 2급",
    issuer: "한국생산성본부",
    date: "2022.05",
  },
  {
    kind: "자격",
    name: "전산회계 1급",
    issuer: "한국세무사회",
    date: "2021.11",
  },
  {
    kind: "자격",
    name: "컴퓨터활용능력 1급",
    issuer: "대한상공회의소",
    date: "2021.08",
  },
];

// ✏️ 직무 스킬 — 직무 연관 순으로 정렬, 활용 맥락을 함께
export const skillGroups: SkillGroup[] = [
  {
    category: "문서·데이터",
    items: [
      {
        name: "Excel · Google Sheets",
        context: "VLOOKUP·피벗·배열수식으로 정산 대사와 재고 대장 관리",
      },
      { name: "한글 · Word", context: "공문, 계약서, 증빙 서식 작성·관리" },
      { name: "PowerPoint", context: "주간·월간 운영 보고 자료" },
      { name: "더존 Smart A", context: "전표 입력, 증빙 관리, 월 마감 보조" },
    ],
  },
  {
    category: "협업·커뮤니케이션",
    items: [
      {
        name: "그룹웨어 전자결재",
        context: "결재선 설계, 규정 안내, 반려 사유 정리",
      },
      { name: "Slack · Notion", context: "업무 배분, 회의록, 진행 현황 공유" },
      {
        name: "Google Workspace",
        context: "공유 드라이브 권한, 양식 관리, 캘린더 운영",
      },
    ],
  },
  {
    category: "AI·자동화",
    items: [
      {
        name: "Google Apps Script",
        context: "시트 자동화, 알림 메일, 승인 단계 구현",
      },
      {
        name: "ChatGPT · Claude",
        context: "문서 초안, 분류·요약 — 결과는 반드시 검토 후 사용",
      },
      { name: "Python 기초", context: "pandas로 다중 시트 취합·정합성 검사" },
      { name: "Looker Studio", context: "운영 대시보드 제작·공유" },
    ],
  },
];

// ✏️ 대외활동·수상 — 활동명, 기관, 기간, 한 줄 성과
export const activities: Activity[] = [
  {
    kind: "수상",
    name: "우수사원 표창",
    org: "중견 제조업체 A사",
    start: "2025.12",
    result: "정산 프로세스 개선으로 연 144시간 절감 기여",
  },
  {
    kind: "활동",
    name: "사내 업무 자동화 스터디 운영",
    org: "중견 제조업체 A사",
    start: "2025.03",
    end: "2026.06",
    result: "12명 참여, 자동화 사례 6건을 사내에 공유",
  },
  {
    kind: "활동",
    name: "경영학회 총무",
    org: "한국대학교",
    start: "2020.03",
    end: "2021.02",
    result: "연간 예산 집행·정산 오류 0건",
  },
];

// 헤더 앵커 내비게이션 — 섹션을 빼거나 순서를 바꾸지 않는 한 수정 불필요
export const nav: NavItem[] = [
  { href: "#competencies", label: "역량" },
  { href: "#experience", label: "경력" },
  { href: "#tools", label: "AI 업무툴" },
  { href: "#education", label: "학력·자격" },
  { href: "#skills", label: "스킬" },
  { href: "#contact", label: "연락" },
];

// 섹션 라벨과 리드 문장 — 보통 수정 불필요
export const sectionCopy = {
  competencies: { label: "핵심 역량", index: "STRENGTHS" },
  experience: { label: "경력", index: "EXPERIENCE" },
  tools: {
    label: "AI 업무툴",
    index: "AI TOOLS",
    lead: "업무에서 반복되던 문제를 직접 만든 툴로 해결한 기록입니다. 기술 자랑이 아니라, 문제를 정의하고 실수 없이 돌아가게 만든 과정을 보여드립니다.",
  },
  education: { label: "학력·자격", index: "EDUCATION" },
  skills: { label: "직무 스킬", index: "SKILLS" },
  activities: { label: "대외활동·수상", index: "ACTIVITIES" },
  contact: {
    label: "연락",
    index: "CONTACT",
    lead: "면접·채용 관련 문의는 이메일로 주세요. 하루 안에 회신드립니다.",
  },
} as const;
