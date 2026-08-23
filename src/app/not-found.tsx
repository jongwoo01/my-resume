import Link from "next/link";

export default function NotFound() {
  return (
    <main className="fade-in mx-auto w-full max-w-[1120px] flex-1 px-5 py-20 sm:px-8 lg:px-[72px]">
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">
        404
      </p>
      <h1 className="mt-4 text-[2rem] font-[680] tracking-[-0.03em]">
        페이지를 찾을 수 없습니다.
      </h1>
      <Link
        href="/"
        className="mt-8 inline-block font-mono text-[0.8rem] text-muted transition-colors hover:text-ink"
      >
        ← 홈으로
      </Link>
    </main>
  );
}
