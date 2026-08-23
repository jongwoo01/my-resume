"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  email: string;
  subject: string;
  greeting: string;
  copyLabel?: string;
  copiedLabel?: string;
};

export default function CopyEmail({
  email,
  subject,
  greeting,
  copyLabel = "이메일 복사",
  copiedLabel = "복사됨",
}: Props) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email,
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(greeting)}`;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function markCopied() {
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      markCopied();
    } catch {
      // Fallback for environments without the async clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = email;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        if (document.execCommand("copy")) markCopied();
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }

  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <a
        href={composeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-2xl font-[650] tracking-[-0.02em] text-ink underline decoration-line-strong decoration-2 underline-offset-[6px] transition-colors hover:decoration-ink md:text-[1.75rem]"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="cursor-pointer font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink print:hidden"
      >
        {copied ? copiedLabel : copyLabel}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </span>
  );
}
