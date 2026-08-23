import { skillGroups } from "@/data/resume";

export default function SkillGroups() {
  return (
    <div className="flex flex-col border-t border-line-strong">
      {skillGroups.map((g) => (
        <div
          key={g.category}
          className="grid gap-x-5 gap-y-2 border-b border-line py-5 sm:grid-cols-[140px_1fr] break-inside-avoid"
        >
          <span className="font-mono text-[0.78rem] text-muted">
            {g.category}
          </span>
          <ul className="space-y-2 break-keep text-[0.95rem] leading-[1.6]">
            {g.items.map((it) => (
              <li key={it.name}>
                <b className="font-[620]">{it.name}</b>{" "}
                <span className="text-muted">— {it.context}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
