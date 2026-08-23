import Image from "next/image";
import { profile, stats } from "@/data/resume";

export default function Hero() {
  const statCols =
    stats.length >= 4 ? "md:grid-cols-4" : stats.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <section className="pb-12 pt-9 md:pb-20 md:pt-16">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted md:text-[0.72rem] md:tracking-[0.16em]">
        {profile.eyebrow}
      </p>
      <div className="mt-6 flex flex-row items-center gap-4 md:mt-8 md:gap-9">
        <Image
          src={profile.profileImage}
          alt={profile.profileImageAlt}
          width={170}
          height={170}
          priority
          unoptimized={profile.profileImage.endsWith(".svg")}
          className="hero-image h-[92px] w-[92px] shrink-0 rounded-[4px] border border-line-strong object-cover md:h-[156px] md:w-[156px]"
        />
        <h1 className="min-w-0 text-[2rem] font-[680] leading-[1.05] tracking-[-0.032em] md:max-w-[15ch] md:text-[4.6rem] md:leading-[1.02] md:tracking-[-0.035em]">
          {profile.headline.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </h1>
      </div>
      <p className="mt-8 max-w-[46ch] break-keep text-[1.05rem] leading-[1.7] text-ink-soft md:text-[1.18rem]">
        {profile.lead}
      </p>
      <div className="mt-7 flex flex-wrap font-mono text-[0.78rem] text-muted">
        {profile.titles.map((t, i) => (
          <span key={t} className="whitespace-nowrap">
            {i > 0 && <span className="mx-3 text-line-strong">—</span>}
            {t}
          </span>
        ))}
      </div>

      <dl
        className={`mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-ink pt-6 ${statCols}`}
      >
        {stats.map((s) => (
          <div key={s.label} className="break-inside-avoid">
            <dd className="text-[1.6rem] font-[660] leading-none tracking-[-0.03em] tabular-nums md:text-[2.05rem]">
              {s.value}
            </dd>
            <dt className="mt-2.5 break-keep pr-3 text-[0.8rem] leading-snug text-muted">
              {s.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
