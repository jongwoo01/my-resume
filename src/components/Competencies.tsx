import { competencies } from "@/data/resume";

export default function Competencies() {
  return (
    <ol className="grid gap-x-10 md:grid-cols-2">
      {competencies.map((c, i) => (
        <li
          key={c.title}
          className="border-t border-line py-5 break-inside-avoid"
        >
          <span className="font-mono text-[0.72rem] tabular-nums tracking-[0.08em] text-faint">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-[1.02rem] font-[620] tracking-[-0.015em]">
            {c.title}
          </h3>
          <p className="mt-1.5 break-keep text-[0.9rem] leading-[1.6] text-muted">
            {c.evidence}
          </p>
          {c.tools && c.tools.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {c.tools.map((t) => (
                <span
                  key={t}
                  className="border border-line px-2.5 py-1 font-mono text-[0.68rem] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
