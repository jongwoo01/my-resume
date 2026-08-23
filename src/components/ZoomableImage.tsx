"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
};

/** 스크린샷 클릭 시 <dialog>로 크게 보기. 라이브러리 없음, Esc·배경 클릭·닫기 버튼으로 닫힘 */
export default function ZoomableImage({ src, alt, caption, priority }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  function show() {
    setOpen(true);
    // 다이얼로그 내용이 마운트된 다음 프레임에 열기
    requestAnimationFrame(() => dialogRef.current?.showModal());
  }

  function close() {
    dialogRef.current?.close();
  }

  return (
    <figure>
      <button
        type="button"
        onClick={show}
        aria-label={`${alt} — 크게 보기`}
        className="relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden border border-line bg-surface"
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          priority={priority}
          sizes="(max-width: 1120px) 100vw, 1120px"
          className="object-cover"
        />
      </button>
      {caption && (
        <figcaption className="mt-2 break-keep font-mono text-[0.72rem] leading-[1.5] text-muted">
          {caption}
        </figcaption>
      )}

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={alt}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        {open && (
          <div className="flex h-full w-full flex-col items-center justify-center p-6">
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 cursor-pointer px-3 py-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-ground transition-opacity hover:opacity-70"
            >
              닫기 ✕
            </button>
            <Image
              src={src}
              alt={alt}
              width={1600}
              height={1000}
              unoptimized
              className="h-auto max-h-[84vh] w-auto max-w-[92vw] border border-line-strong bg-surface"
            />
            {caption && (
              <p className="mt-3 max-w-[70ch] break-keep text-center font-mono text-[0.72rem] leading-[1.5] text-[#d3d5da]">
                {caption}
              </p>
            )}
          </div>
        )}
      </dialog>
    </figure>
  );
}
