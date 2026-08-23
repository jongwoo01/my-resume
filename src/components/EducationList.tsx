import { certifications, education } from "@/data/resume";
import { formatPeriod } from "@/lib/format";
import Pill from "./Pill";

const ROW =
  "grid grid-cols-[1fr_auto] items-baseline gap-x-5 gap-y-1 border-b border-line py-4 sm:grid-cols-[136px_1fr_auto] break-inside-avoid";
const PERIOD =
  "order-first col-span-2 font-mono text-[0.8rem] tabular-nums text-muted sm:order-none sm:col-span-1";

export default function EducationList() {
  return (
    <div>
      <div className="flex flex-col border-t border-line-strong">
        {education.map((ed) => (
          <div key={`${ed.school}-${ed.start}`} className={ROW}>
            <span className={PERIOD}>{formatPeriod(ed.start, ed.end)}</span>
            <span className="text-[1.02rem] break-keep">
              <b className="font-[620]">{ed.school}</b>{" "}
              <span className="text-muted">
                — {ed.major} {ed.degree}
              </span>
              {ed.note && (
                <span className="block text-[0.82rem] text-faint">
                  {ed.note}
                </span>
              )}
            </span>
            <Pill>학력</Pill>
          </div>
        ))}
      </div>

      {certifications.length > 0 && (
        <>
          <p className="mb-2 mt-10 font-mono text-[0.84rem] font-[600] uppercase tracking-[0.12em] text-ink">
            자격 · 어학
          </p>
          <div className="flex flex-col border-t border-line-strong">
            {certifications.map((c) => (
              <div key={`${c.name}-${c.date}`} className={ROW}>
                <span className={PERIOD}>{c.date}</span>
                <span className="text-[1.02rem] break-keep">
                  <b className="font-[620]">
                    {c.name}
                    {c.score ? ` ${c.score}` : ""}
                  </b>{" "}
                  <span className="text-muted">— {c.issuer}</span>
                </span>
                <Pill>{c.kind}</Pill>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
