/** "2023.03", null → "2023.03 – 재직중" / "2022.01", "2023.02" → "2022.01 – 2023.02" */
export function formatPeriod(start: string, end?: string | null): string {
  if (end === null) return `${start} – 재직중`;
  if (!end) return start;
  return `${start} – ${end}`;
}
