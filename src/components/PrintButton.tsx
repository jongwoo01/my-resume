"use client";

/** 브라우저 인쇄 대화상자(Cmd/Ctrl+P)를 열어 "PDF로 저장"할 수 있게 합니다. 인쇄 스타일은 globals.css 의 @media print 참고 */
export default function PrintButton({
  className,
  label = "PDF 저장",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={className}
    >
      {label}
    </button>
  );
}
