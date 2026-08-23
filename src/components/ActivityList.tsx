import { activities } from "@/data/resume";
import { formatPeriod } from "@/lib/format";
import Pill from "./Pill";

export default function ActivityList() {
  return (
    <div className="flex flex-col border-t border-line-strong">
      {activities.map((a) => (
        <div
          key={`${a.name}-${a.start}`}
          className="grid grid-cols-[1fr_auto] items-baseline gap-x-5 gap-y-1 border-b border-line py-4 sm:grid-cols-[136px_1fr_auto] break-inside-avoid"
        >
          <span className="order-first col-span-2 font-mono text-[0.8rem] tabular-nums text-muted sm:order-none sm:col-span-1">
            {formatPeriod(a.start, a.end)}
          </span>
          <span className="text-[1.02rem] break-keep">
            <b className="font-[620]">{a.name}</b>{" "}
            <span className="text-muted">— {a.org}</span>
            <span className="block text-[0.88rem] leading-[1.55] text-muted">
              {a.result}
            </span>
          </span>
          <Pill filled={a.kind === "수상"}>{a.kind}</Pill>
        </div>
      ))}
    </div>
  );
}
