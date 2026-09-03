import Image from "next/image";
import type { AiTool } from "@/data/tools";
import { CATEGORY_LABELS } from "@/lib/tools";

export default function ToolCard({ tool }: { tool: AiTool }) {
  if (tool.status === "planned") {
    return (
      <article className="flex flex-col break-inside-avoid bg-surface">
        <div className="flex aspect-square items-center justify-center border-b border-line bg-ground p-6 text-center font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted">
          AI TOOL<br />{tool.title.slice(-2)}
        </div>
        <div className="flex flex-1 flex-col gap-[7px] px-4 pb-5 pt-4">
          <p className="font-mono text-[0.68rem] tracking-[0.08em] text-faint">강의에서 제작 예정</p>
          <h3 className="text-[1.02rem] font-[620] tracking-[-0.015em]">{tool.title}</h3>
          <p className="flex-1 break-keep text-[0.86rem] leading-[1.55] text-muted">{tool.tagline}</p>
        </div>
      </article>
    );
  }

  return (
    <a
      href={`/tools/${tool.slug}`}
      className="group flex flex-col break-inside-avoid bg-surface transition-transform duration-200 hover:-translate-y-[3px]"
    >
      <div className="relative aspect-square overflow-hidden border-b border-line bg-ground">
        <Image
          src={tool.images.main.src}
          alt={tool.images.main.alt}
          fill
          unoptimized
          sizes="(max-width: 520px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-[7px] px-4 pb-5 pt-4">
        <h3 className="text-[1.02rem] font-[620] tracking-[-0.015em]">
          {tool.title}
        </h3>
        <p className="flex-1 break-keep text-[0.86rem] leading-[1.55] text-muted">
          {tool.tagline}
        </p>
        <div className="mt-1 flex flex-wrap items-center font-mono text-[0.68rem] tracking-[0.02em] text-faint">
          <span>{CATEGORY_LABELS[tool.category]}</span>
          <span className="mx-[7px] text-line-strong">·</span>
          <span>{tool.period}</span>
          {tool.liveUrl && (
            <>
              <span className="mx-[7px] text-line-strong">·</span>
              <span className="text-ink">라이브 ↗</span>
            </>
          )}
        </div>
      </div>
    </a>
  );
}
