import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ZoomableImage from "@/components/ZoomableImage";
import { profile } from "@/data/resume";
import { tools } from "@/data/tools";
import { CATEGORY_LABELS, getAdjacentTools, getTool } from "@/lib/tools";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};

  const title = `${tool.title} — ${profile.name}`;
  return {
    title,
    description: tool.tagline,
    alternates: { canonical: `/tools/${slug}` },
    openGraph: {
      title,
      description: tool.tagline,
      url: `/tools/${slug}`,
      ...(tool.status === "complete" ? { images: [tool.images.main.src] } : {}),
      type: "article",
    },
  };
}

function Block({ index, label, en, children }: { index: string; label: string; en: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-10 md:py-12">
      <div className="section-grid grid gap-x-10 gap-y-4 md:grid-cols-[150px_1fr]">
        <div className="section-label pt-1">
          <span className="font-mono text-[0.84rem] font-[600] uppercase tracking-[0.12em] text-ink">{index} {label}</span>
          <span className="mt-1.5 block font-mono text-[0.78rem] uppercase tracking-[0.14em] text-muted">{en}</span>
        </div>
        <div className="section-body min-w-0">{children}</div>
      </div>
    </section>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return <div className="max-w-[680px] space-y-5 break-keep text-[1.02rem] leading-[1.8] text-ink-soft">{items.map((item) => <p key={item}>{item}</p>)}</div>;
}

function DashList({ items }: { items: string[] }) {
  return <ul className="space-y-3">{items.map((item) => <li key={item} className="flex gap-2.5 break-keep text-[1rem] leading-[1.65] text-ink-soft"><span aria-hidden className="mt-[2px] shrink-0 text-ink">—</span><span>{item}</span></li>)}</ul>;
}

function CodeLink({ repoUrl }: { repoUrl?: string }) {
  if (!repoUrl) return null;
  return <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex border border-ink px-4 py-2 font-mono text-[0.75rem] text-ink transition-colors hover:bg-ink hover:text-ground print:hidden">코드 보기 ↗</a>;
}

export default async function ToolDetail({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  if (tool.status === "planned") {
    return <main className="fade-in mx-auto w-full max-w-[1120px] flex-1 px-5 py-12 sm:px-8 md:py-16 lg:px-[72px]"><Link href="/#tools" className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink print:hidden">← AI 업무툴</Link><h1 className="mt-8 text-[2rem] font-[680] tracking-[-0.03em] md:text-[2.75rem]">{tool.title}</h1><p className="mt-4 text-[1.05rem] leading-[1.7] text-ink-soft">강의에서 제작 예정입니다.</p></main>;
  }

  const { prev, next } = getAdjacentTools(slug);

  return (
    <main className="fade-in mx-auto w-full max-w-[1120px] flex-1 px-5 py-12 sm:px-8 md:py-16 lg:px-[72px]">
      <Link href="/#tools" className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink print:hidden">← AI 업무툴</Link>
      <header className="mt-8 max-w-[760px]">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">{CATEGORY_LABELS[tool.category]}</p>
        <h1 className="mt-4 text-[2rem] font-[680] tracking-[-0.03em] md:text-[2.75rem]">{tool.title}</h1>
        <p className="mt-4 break-keep text-[1.05rem] leading-[1.7] text-ink-soft">{tool.tagline}</p>
        <p className="mt-6 font-mono text-[0.75rem] text-muted">{tool.period} · 단독 제작</p>
        <div className="mt-6 flex flex-wrap gap-2">{tool.stack.map((item) => <span key={item} className="border border-line px-2.5 py-1 font-mono text-[0.68rem] text-muted">{item}</span>)}</div>
        <div className="mt-6"><CodeLink repoUrl={tool.repoUrl} /></div>
      </header>

      <div className="mt-12">
        <Block index="01" label="문제" en="PROBLEM"><Paragraphs items={tool.problem} /></Block>
        <Block index="02" label="해결 방식" en="SOLUTION FLOW"><Paragraphs items={tool.solution} /></Block>
        <Block index="03" label="업무 효용" en="BUSINESS VALUE"><DashList items={tool.utility} /></Block>
        <Block index="01" label="내 기준과 역할" en="HUMAN & AI"><Paragraphs items={tool.roles} /></Block>
        <Block index="02" label="검증" en="VALIDATION">
          <Paragraphs items={tool.validation} />
          <div className="mt-8"><ZoomableImage src={tool.images.main.src} alt={tool.images.main.alt} priority /></div>
          <div className="mt-8 space-y-8">{tool.images.detail.map((image) => <ZoomableImage key={image.src} src={image.src} alt={image.alt} caption={image.caption} />)}</div>
        </Block>
        <Block index="03" label="한계" en="LIMITS"><Paragraphs items={tool.limitations} /></Block>
      </div>

      <nav aria-label="다른 툴" className="mt-16 grid grid-cols-2 gap-px border-t border-line bg-line print:hidden">
        <Link href={`/tools/${prev.slug}`} className="group bg-ground py-6 pr-4"><span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-faint">← 이전</span><span className="mt-2 block text-[0.95rem] font-[600] text-ink transition-colors group-hover:text-muted">{prev.title}</span></Link>
        <Link href={`/tools/${next.slug}`} className="group bg-ground py-6 pl-4 text-right"><span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-faint">다음 →</span><span className="mt-2 block text-[0.95rem] font-[600] text-ink transition-colors group-hover:text-muted">{next.title}</span></Link>
      </nav>
    </main>
  );
}
