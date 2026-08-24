import { tools, type AiTool, type ToolCategory } from "@/data/tools";

// 카테고리 표시 이름 — 필요하면 여기서 바꾸세요
export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  sheet: "스프레드시트 자동화",
  doc: "문서·회의록",
  report: "보고·대시보드",
  data: "데이터 정리·검증",
  comms: "알림·커뮤니케이션",
};

export type FilterKey = "all" | ToolCategory;

const presentCategories = (
  Object.keys(CATEGORY_LABELS) as ToolCategory[]
).filter((c) => tools.some((t) => t.category === c));

export const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "전체" },
  ...presentCategories.map((c) => ({ key: c, label: CATEGORY_LABELS[c] })),
];

// 툴이 3개 이상일 때만 필터 표시 (PRD P1)
export const SHOW_FILTERS = tools.length >= 3 && tools.some((t) => t.status === "complete");

// 노출 순서: featured 먼저, 그다음 완성 연월 최신순
export const orderedTools: AiTool[] = [...tools].sort((a, b) => {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  return b.period.localeCompare(a.period);
});

export function getTool(slug: string): AiTool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getAdjacentTools(slug: string): { prev: AiTool; next: AiTool } {
  const idx = orderedTools.findIndex((t) => t.slug === slug);
  const n = orderedTools.length;
  return {
    prev: orderedTools[(idx - 1 + n) % n],
    next: orderedTools[(idx + 1) % n],
  };
}
