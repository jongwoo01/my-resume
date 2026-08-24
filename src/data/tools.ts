export type ToolCategory = "sheet" | "doc" | "report" | "data" | "comms";
export type ToolImage = { src: string; alt: string; caption?: string };

type ToolBase = { slug: string; category: ToolCategory; title: string; tagline: string; period: string; featured: boolean };
export type PlannedAiTool = ToolBase & { status: "planned" };
export type CompleteAiTool = ToolBase & {
  status: "complete"; problem: string[]; result: { summary: string[]; mainImage: ToolImage }; features: string[]; safeguards: string[]; stack: string[]; duration: string; outcomes: { value: string; label: string }[]; liveUrl?: string; repoUrl?: string; detailImages: ToolImage[];
};
export type AiTool = PlannedAiTool | CompleteAiTool;

export const tools: AiTool[] = [
  { slug: "ai-tool-01", category: "data", title: "AI 업무툴 포트폴리오 01", tagline: "강의에서 제작 예정", period: "강의에서 제작 예정", featured: true, status: "planned" },
  { slug: "ai-tool-02", category: "data", title: "AI 업무툴 포트폴리오 02", tagline: "강의에서 제작 예정", period: "강의에서 제작 예정", featured: false, status: "planned" },
  { slug: "ai-tool-03", category: "data", title: "AI 업무툴 포트폴리오 03", tagline: "강의에서 제작 예정", period: "강의에서 제작 예정", featured: false, status: "planned" },
  { slug: "ai-tool-04", category: "data", title: "AI 업무툴 포트폴리오 04", tagline: "강의에서 제작 예정", period: "강의에서 제작 예정", featured: false, status: "planned" },
];
