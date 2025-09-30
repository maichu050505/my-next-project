// @/_components/layout/GlobalNav.tsx
"use client";

import Link from "next/link";
import { useEffect, useId, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type Item = { href: string; label: string };

export default function GlobalNav({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const panelId = useId();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  // Esc で閉じる
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ルート遷移で閉じる
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* デスクトップナビ */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className={clsx(
              "transition hover:text-sky-600",
              isActive(it.href) ? "text-sky-600" : "text-gray-700"
            )}
            aria-current={isActive(it.href) ? "page" : undefined}
          >
            {it.label}
          </Link>
        ))}
      </nav>

      {/* モバイル：ハンバーガー */}
      <button
        type="button"
        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        aria-label="メニューを開閉"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {/* モバイル：スライドパネル */}
      <div
        id={panelId}
        className={clsx(
          "md:hidden fixed left-0 right-0 top-16 z-50 origin-top border-t border-gray-100 bg-white shadow transition-all",
          open
            ? "opacity-100 scale-y-100"
            : "pointer-events-none opacity-0 -translate-y-2 scale-y-95"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        hidden={!open}
      >
        {/* 画面には出さないが、ダイアログ名として読む */}
        <h2 id={titleId} className="sr-only">
          メインメニュー
        </h2>
        <nav className="max-w-6xl mx-auto px-5 sm:px-6 py-4 flex flex-col gap-2 text-gray-800">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              className={clsx(
                "block rounded-lg px-3 py-3 text-base hover:bg-gray-50",
                isActive(it.href) && "text-sky-600"
              )}
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
