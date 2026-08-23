import { experiences } from "@/data/resume";
import { formatPeriod } from "@/lib/format";
import Pill from "./Pill";

export default function ExperienceList() {
  return (
    <div className="flex flex-col border-t border-line-strong">
      {experiences.map((e) => (
        <div
          key={`${e.org}-${e.start}`}
          className="border-b border-line py-5 break-inside-avoid"
        >
          <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-5 gap-y-1 sm:grid-cols-[136px_1fr_auto]">
            <span className="order-first col-span-2 font-mono text-[0.8rem] tabular-nums text-muted sm:order-none sm:col-span-1">
              {formatPeriod(e.start, e.end)}
            </span>
            <span className="text-[1.02rem] break-keep">
              <b className="font-[620]">{e.org}</b>{" "}
              <span className="text-muted">— {e.role}</span>
              {e.orgNote && (
                <span className="block text-[0.82rem] text-faint">
                  {e.orgNote}
                </span>
              )}
            </span>
            <Pill filled={e.end === null}>{e.employmentType}</Pill>
          </div>
          <ul className="mt-3 space-y-2 sm:ml-[calc(136px+20px)]">
            {e.bullets.map((b, i) => (
              <li
                key={i}
                className="flex gap-2.5 break-keep text-[0.95rem] leading-[1.6]"
              >
                <span aria-hidden className="mt-[2px] shrink-0 text-ink">
                  —
                </span>
                <span>
                  <span className="text-ink">{b.result}</span>{" "}
                  <span className="text-muted">— {b.action}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
