export default function Section({
  id,
  label,
  index,
  children,
}: {
  id: string;
  label: string;
  index: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-t border-line py-14 md:py-20"
    >
      <div className="section-grid grid gap-x-10 gap-y-6 md:grid-cols-[150px_1fr]">
        <div className="section-label pt-1">
          <span className="font-mono text-[0.84rem] font-[600] uppercase tracking-[0.12em] text-ink">
            {label}
          </span>
          <span className="mt-1.5 block font-mono text-[0.78rem] uppercase tracking-[0.14em] text-muted">
            {index}
          </span>
        </div>
        <div className="section-body min-w-0">{children}</div>
      </div>
    </section>
  );
}
