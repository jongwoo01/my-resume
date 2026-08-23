import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ZoomableImage from "@/components/ZoomableImage";
import { profile } from "@/data/resume";
import { tools } from "@/data/tools";
import { CATEGORY_LABELS, getAdjacentTools, getTool } from "@/lib/tools";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
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
      images: [tool.result.mainImage.src],
      type: "article",
    },
  };
}

/* PRD 5.4 — 툴마다 같은 순서로 제시하는 6개 블록 */
function Block({
  index,
  label,
  en,
  children,
}: {
  index: string;
  label: string;
  en: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-10 md:py-12">
      <div className="section-grid grid gap-x-10 gap-y-4 md:grid-cols-[150px_1fr]">
        <div className="section-label pt-1">
          <span className="font-mono text-[0.84rem] font-[600] uppercase tracking-[0.12em] text-ink">
            {index} {label}
          </span>
          <span className="mt-1.5 block font-mono text-[0.78rem] uppercase tracking-[0.14em] text-muted">
            {en}
          </span>
        </div>
        <div className="section-body min-w-0">{children}</div>
      </div>
    </section>
  );
}

function DashList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((h, i) => (
        <li
          key={i}
          className="flex gap-2.5 break-keep text-[1rem] leading-[1.65] text-ink-soft"
        >
          <span aria-hidden className="mt-[2px] shrink-0 text-ink">
            —
          </span>
          <span>{h}</span>
        </li>
      ))}
    </ul>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="max-w-[680px] space-y-5 break-keep text-[1.02rem] leading-[1.8] text-ink-soft">
      {items.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function Ctas({
  liveUrl,
  repoUrl,
}: {
  liveUrl?: string;
  repoUrl?: string;
}) {
  if (!liveUrl && !repoUrl) return null;
  return (
    <div className="flex flex-wrap gap-3 print:hidden">
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-ink bg-ink px-4 py-2 font-mono text-[0.75rem] text-ground transition-opacity hover:opacity-80"
        >
          라이브 데모 ↗
        </a>
      )}
      {repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-ink px-4 py-2 font-mono text-[0.75rem] text-ink transition-colors hover:bg-ink hover:text-ground"
        >
          코드 보기 ↗
        </a>
      )}
    </div>
  );
}

export default async function ToolDetail({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const { prev, next } = getAdjacentTools(slug);
  const features = tool.features.slice(0, 3);

  return (
    <main className="fade-in mx-auto w-full max-w-[1120px] flex-1 px-5 py-12 sm:px-8 md:py-16 lg:px-[72px]">
      <Link
        href="/#tools"
        className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink print:hidden"
      >
        ← AI 업무툴
      </Link>

      <header className="mt-8 max-w-[760px]">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">
          {CATEGORY_LABELS[tool.category]}
        </p>
        <h1 className="mt-4 text-[2rem] font-[680] tracking-[-0.03em] md:text-[2.75rem]">
          {tool.title}
        </h1>
        <p className="mt-4 break-keep text-[1.05rem] leading-[1.7] text-ink-soft">
          {tool.tagline}
        </p>
        <div className="mt-6 flex flex-wrap items-center font-mono text-[0.75rem] text-muted">
          <span>{tool.period}</span>
          <span className="mx-3 text-line-strong">·</span>
          <span>{tool.duration}</span>
          <span className="mx-3 text-line-strong">·</span>
          <span>단독 제작</span>
        </div>
        <div className="mt-6">
          <Ctas liveUrl={tool.liveUrl} repoUrl={tool.repoUrl} />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {tool.stack.map((t) => (
            <span
              key={t}
              className="border border-line px-2.5 py-1 font-mono text-[0.68rem] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      <div className="mt-12">
        <Block index="01" label="업무 문제" en="PROBLEM">
          <Paragraphs items={tool.problem} />
        </Block>

        <Block index="02" label="결과물" en="RESULT">
          <Paragraphs items={tool.result.summary} />
          <div className="mt-8">
            <ZoomableImage
              src={tool.result.mainImage.src}
              alt={tool.result.mainImage.alt}
              caption={tool.result.mainImage.caption}
              priority
            />
          </div>
        </Block>

        <Block index="03" label="핵심 기능" en="FEATURES">
          <DashList items={features} />
        </Block>

        <Block index="04" label="고려한 점" en="SAFEGUARDS">
          <p className="mb-4 font-mono text-[0.72rem] text-faint">
            정확성 · 편의성 · 실수 방지
          </p>
          <DashList items={tool.safeguards} />
        </Block>

        <Block index="05" label="도구·기간" en="STACK">
          <div className="flex flex-wrap gap-2">
            {tool.stack.map((t) => (
              <span
                key={t}
                className="border border-line px-2.5 py-1 font-mono text-[0.68rem] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-4 font-mono text-[0.8rem] text-muted">
            {tool.duration}
          </p>
        </Block>

        <Block index="06" label="성과" en="OUTCOMES">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-ink pt-6 md:grid-cols-3">
            {tool.outcomes.map((o) => (
              <div key={o.label}>
                <dd className="text-[1.6rem] font-[660] leading-none tracking-[-0.03em] tabular-nums md:text-[2.05rem]">
                  {o.value}
                </dd>
                <dt className="mt-2.5 break-keep pr-3 text-[0.8rem] leading-snug text-muted">
                  {o.label}
                </dt>
              </div>
            ))}
          </dl>
          {(tool.liveUrl || tool.repoUrl) && (
            <div className="mt-8">
              <Ctas liveUrl={tool.liveUrl} repoUrl={tool.repoUrl} />
              {tool.liveUrl && (
                <p className="mt-3 font-mono text-[0.72rem] text-faint">
                  라이브 데모는 가상 데이터만 사용합니다.
                </p>
              )}
            </div>
          )}
        </Block>

        {tool.detailImages.length > 0 && (
          <Block index="＋" label="상세 화면" en="SCREENS">
            <div className="space-y-8">
              {tool.detailImages.map((img) => (
                <ZoomableImage
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  caption={img.caption}
                />
              ))}
            </div>
          </Block>
        )}
      </div>

      <nav
        aria-label="다른 툴"
        className="mt-16 grid grid-cols-2 gap-px border-t border-line bg-line print:hidden"
      >
        <Link href={`/tools/${prev.slug}`} className="group bg-ground py-6 pr-4">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-faint">
            ← 이전
          </span>
          <span className="mt-2 block text-[0.95rem] font-[600] text-ink transition-colors group-hover:text-muted">
            {prev.title}
          </span>
        </Link>
        <Link
          href={`/tools/${next.slug}`}
          className="group bg-ground py-6 pl-4 text-right"
        >
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-faint">
            다음 →
          </span>
          <span className="mt-2 block text-[0.95rem] font-[600] text-ink transition-colors group-hover:text-muted">
            {next.title}
          </span>
        </Link>
      </nav>
    </main>
  );
}
