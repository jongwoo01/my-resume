export type Profile = { name: string; englishName?: string; role: string; eyebrow: string; headline: string[]; lead: string; titles: string[]; profileImage: string; profileImageAlt: string; email: string; location: string; siteUrl?: string; links: { label: string; href: string }[]; seo: { title: string; description: string } };
export type Stat = { value: string; label: string };
export type Competency = { title: string; evidence: string; tools?: string[] };
export type EmploymentType = "정규직" | "계약직" | "인턴" | "파견" | "프리랜서";
export type Bullet = { result: string; action: string };
export type Experience = { org: string; orgNote?: string; start: string; end: string | null; role: string; employmentType: EmploymentType; bullets: Bullet[] };
export type Education = { school: string; major: string; degree?: string; start?: string; end: string; note?: string };
export type Certification = { kind: "자격" | "어학" | "교육"; name: string; score?: string; issuer?: string; date: string };
export type SkillGroup = { category: string; items: { name: string; context: string }[] };
export type Activity = { kind: "활동" | "수상"; name: string; org: string; start?: string; end?: string; period?: string; result?: string };
export type NavItem = { href: string; label: string };

export const profile: Profile = {
  name: "이에듀", role: "교육운영 사무직", eyebrow: "교육운영 · 일정 관리 · 수강생 관리",
  headline: ["교육 운영을 꼼꼼하게", "지원합니다."],
  lead: "교육 일정과 수강생 정보를 꼼꼼하게 관리하고, 원활한 교육 진행을 지원하는 교육운영 사무 담당자를 목표로 합니다.",
  titles: ["교육운영 인턴 경험", "문서·명단·일정 정리"],
  profileImage: "/profile.jpg", profileImageAlt: "이에듀 프로필 사진", email: "edu.lee@example.com", location: "서울특별시", siteUrl: "https://my-resume-six-navy.vercel.app",
  links: [{ label: "개인 포트폴리오", href: "https://example-edu-lee-example.notion.site" }],
  seo: { title: "이에듀 — 교육운영 사무직 이력서", description: "교육 일정과 수강생 정보를 관리하고 원활한 교육 진행을 지원하는 교육운영 사무직 지원자 이에듀의 이력서입니다." },
};

export const stats: Stat[] = [
  { value: "32명", label: "비교과 프로그램 참여 경험 설문 대상" },
  { value: "24시간", label: "교육기관 행정 실무 과정 수료" },
];

export const competencies: Competency[] = [
  { title: "교육 일정·강의 운영 지원", evidence: "온라인 강의 등록과 강의 일정 확인 업무를 담당했습니다.", tools: ["Google Sheets", "Zoom"] },
  { title: "수강생 정보·문의 관리", evidence: "수강생 명단 관리, 출결 자료 정리, 수강생 문의 분류 업무를 담당했습니다.", tools: ["Microsoft Excel", "Slack"] },
  { title: "운영 문서·체크리스트 작성", evidence: "반복 문의 유형을 정리한 공동 확인 문서와 강의 개설 체크리스트를 작성해 사용했습니다.", tools: ["Microsoft Word", "Notion"] },
  { title: "설문 결과 정리", evidence: "만족도 설문 응답을 Google Sheets로 정리하고 주요 의견을 긍정 의견과 개선 요청으로 구분했습니다.", tools: ["Google Forms", "Google Sheets"] },
];

export const experiences: Experience[] = [
  { org: "배움나무", start: "2024.04", end: "2025.03", role: "교육운영 인턴", employmentType: "인턴", bullets: [
    { result: "온라인 강의 등록과 강의 일정 확인 지원", action: "강의 개설 과정에서 확인할 항목을 체크리스트로 작성해 사용" },
    { result: "수강생 명단·출결 자료 정리와 문의 분류", action: "반복되는 문의를 유형별로 정리해 운영팀이 함께 확인할 수 있는 문서 작성" },
    { result: "만족도 설문 응답과 주요 의견 정리", action: "Google Sheets로 응답을 정리하고 긍정 의견과 개선 요청으로 구분" },
  ] },
  { org: "에듀대학교 학생지원처", start: "2023.03", end: "2023.06", role: "근로장학생", employmentType: "인턴", bullets: [
    { result: "장학금·학사 일정 문의를 담당 부서별로 분류", action: "신청 서류의 기본 항목 작성 여부를 확인" },
    { result: "교내 프로그램 신청자 명단과 참여 안내 문자 발송 자료 준비", action: "개인정보가 포함된 명단은 담당자에게만 전달하고 외부에 공유하지 않음" },
  ] },
];

export const education: Education[] = [{ school: "에듀대학교", major: "경영학과", end: "2024.02", note: "졸업 · 경영정보시스템, 인적자원관리, 소비자행동론, 마케팅원론 수강" }];
export const certifications: Certification[] = [
  { kind: "자격", name: "컴퓨터활용능력 2급", date: "2023" },
  { kind: "자격", name: "워드프로세서", date: "2022" },
  { kind: "어학", name: "TOEIC", score: "760", date: "2024.01" },
  { kind: "교육", name: "교육기관 행정 실무 과정 (24시간)", issuer: "지역 청년센터", date: "2024.03" },
];

export const skillGroups: SkillGroup[] = [
  { category: "문서·표·일정", items: [
    { name: "Microsoft Word", context: "공지문, 회의록, 보고서 작성" }, { name: "Microsoft Excel", context: "명단 및 일정 정리, 표 작성, 기본 함수와 필터 사용" }, { name: "Microsoft PowerPoint", context: "수업 및 팀 프로젝트 발표 자료 제작" }, { name: "한글", context: "교내 제출 문서와 안내문 작성" }, { name: "Google Docs", context: "문서 공동 작성과 의견 반영" }, { name: "Google Sheets", context: "신청자 명단, 설문 결과, 일정 정리" },
  ] },
  { category: "설문·협업", items: [
    { name: "Google Forms", context: "행사 신청 및 만족도 설문 제작" }, { name: "Notion", context: "회의 기록, 체크리스트, 프로젝트 자료 정리" }, { name: "Slack", context: "인턴 근무 중 업무 대화와 자료 공유" }, { name: "Zoom", context: "온라인 회의 참여와 교육 일정 확인" }, { name: "미리캔버스", context: "행사 안내 카드뉴스 제작" },
  ] },
  { category: "AI 활용", items: [{ name: "ChatGPT", context: "문서 초안 작성, 항목 분류, 맞춤법 확인에 사용하고 결과는 직접 검토" }] },
];

export const activities: Activity[] = [
  { kind: "수상", name: "비교과 프로그램 우수 참여자 표창", org: "에듀대학교", start: "2023.12" },
  { kind: "활동", name: "에듀대학교 홍보대사", org: "에듀대학교", start: "2023.07", end: "2023.12", result: "학교 행사 안내 게시물 작성, 참여자 명단 확인, 행사 당일 방문자 안내를 담당했습니다." },
  { kind: "활동", name: "경영학과 학생회 총무부원", org: "에듀대학교", start: "2022.03", end: "2022.12", result: "행사 물품 목록과 구매 내역·영수증을 정리하고, 신청 명단과 회의 내용을 기록했습니다." },
  { kind: "활동", name: "신입생 비교과 프로그램 운영 개선안", org: "에듀대학교 팀 프로젝트", period: "대학교 4학년", result: "4인 팀에서 설문 문항 작성, 응답 결과 정리, 발표 자료 제작을 담당했습니다. 학생 32명 설문을 바탕으로 신청 방법 안내, 일정 사전 공지, 만족도 조사 절차를 정리했습니다." },
];

export const nav: NavItem[] = [
  { href: "#competencies", label: "역량" }, { href: "#experience", label: "경력" }, { href: "#tools", label: "AI 업무툴" }, { href: "#education", label: "학력·자격" }, { href: "#skills", label: "스킬" }, { href: "#contact", label: "연락" },
];

export const sectionCopy = {
  competencies: { label: "핵심 역량", index: "STRENGTHS" }, experience: { label: "경력·인턴", index: "EXPERIENCE" },
  tools: { label: "AI 업무툴", index: "AI TOOLS", lead: "AI 업무툴 포트폴리오는 강의에서 제작 예정입니다." },
  education: { label: "학력·자격", index: "EDUCATION" }, skills: { label: "직무 스킬", index: "SKILLS" }, activities: { label: "프로젝트·활동", index: "ACTIVITIES" },
  contact: { label: "연락", index: "CONTACT", lead: "면접·채용 관련 문의는 이메일로 주세요." },
} as const;
