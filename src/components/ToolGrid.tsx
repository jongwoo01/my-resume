"use client";

import { useState } from "react";
import type { AiTool } from "@/data/tools";
import { FILTERS, SHOW_FILTERS, type FilterKey } from "@/lib/tools";
import ToolCard from "./ToolCard";

export default function ToolGrid({ tools }: { tools: AiTool[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const visible = tools.filter(
    (t) => filter === "all" || t.category === filter,
  );

  return (
    <div>
      {SHOW_FILTERS && (
        <div
          className="mb-7 flex flex-wrap gap-2 print:hidden"
          role="group"
          aria-label="카테고리 필터"
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
              className="inline-flex min-h-[40px] cursor-pointer items-center border border-line-strong px-[14px] py-[8px] font-mono text-[0.72rem] tracking-[0.04em] text-muted transition-colors hover:border-ink hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-ground"
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {visible.length > 0 ? (
        <div className="tool-grid grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      ) : (
        <p className="py-10 font-mono text-[0.8rem] text-muted">
          이 카테고리에 해당하는 툴이 없습니다.
        </p>
      )}
    </div>
  );
}
