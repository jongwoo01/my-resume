"use client";

import { useEffect, useRef, useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

export default function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="relative md:hidden print:hidden">
      <button
        type="button"
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] text-ink transition-colors hover:text-muted"
      >
        <span
          className={`h-px w-4 bg-current transition-transform ${
            open ? "translate-y-[6px] rotate-45" : ""
          }`}
        />
        <span
          className={`h-px w-4 bg-current transition-opacity ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`h-px w-4 bg-current transition-transform ${
            open ? "-translate-y-[6px] -rotate-45" : ""
          }`}
        />
      </button>

      {open && (
        <nav
          id="mobile-navigation"
          aria-label="모바일 메뉴"
          className="absolute right-0 top-[calc(100%+10px)] z-30 w-40 bg-surface shadow-sm"
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line px-4 py-3 font-mono text-[0.76rem] tracking-[0.04em] text-muted transition-colors last:border-b-0 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
