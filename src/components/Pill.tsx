export default function Pill({
  children,
  filled = false,
}: {
  children: React.ReactNode;
  filled?: boolean;
}) {
  return (
    <span
      className={`self-center whitespace-nowrap border px-2 py-[3px] font-mono text-[0.66rem] uppercase tracking-[0.08em] ${
        filled ? "border-ink bg-ink text-ground" : "border-line-strong text-ink"
      }`}
    >
      {children}
    </span>
  );
}
