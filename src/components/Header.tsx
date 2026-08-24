import Link from "next/link";
import { nav, profile } from "@/data/resume";
import MobileMenu from "./MobileMenu";
import PrintButton from "./PrintButton";

export default function Header() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between px-5 py-[18px] sm:px-8 lg:px-[72px]">
        <Link
          href="/"
          className="text-[0.95rem] font-[640] tracking-[-0.01em] text-ink"
        >
          {profile.name}
          {profile.englishName && <span className="ml-1.5 font-medium text-faint">{profile.englishName}</span>}
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          <nav
            aria-label="섹션 이동"
            className="hidden gap-[22px] font-mono text-[0.72rem] uppercase tracking-[0.06em] text-muted md:flex print:hidden"
          >
            {nav.map((n) => (
              <a
                key={n.href}
                href={`/${n.href}`}
                className="transition-colors hover:text-ink"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <PrintButton className="inline-flex min-h-[34px] cursor-pointer items-center border border-ink px-3 font-mono text-[0.7rem] uppercase tracking-[0.06em] text-ink transition-colors hover:bg-ink hover:text-ground print:hidden" />
          <MobileMenu items={nav.map((n) => ({ ...n, href: `/${n.href}` }))} />
        </div>
      </div>
    </header>
  );
}
