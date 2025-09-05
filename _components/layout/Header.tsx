"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/works", label: "制作実績" },
  { href: "/news", label: "お知らせ" },
  { href: "/about", label: "会社概要" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // Esc で閉じる
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // メニュークリックで閉じる
  const closeAndGo = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 flex items-center justify-between h-16">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-sky-600">
          {/* シンプルな六角形ロゴ */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-7 h-7 text-sky-500"
            aria-hidden="true"
          >
            <path d="M12 3l7 4v10l-7 4-7-4V7z" />
          </svg>
          <span>Sample</span>
        </Link>

        {/* デスクトップナビ */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-sky-600 transition">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* モバイル：ハンバーガー */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          aria-label="メニューを開閉"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {/* ハンバーガー ↔ × アイコン */}
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
      </div>

      {/* モバイルメニュー */}
      {/* 背景オーバーレイ */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/20"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      {/* スライドパネル */}
      <div
        className={`md:hidden fixed left-0 right-0 top-16 z-50 origin-top border-t border-gray-100 bg-white shadow transition-all ${
          open
            ? "opacity-100 scale-y-100"
            : "pointer-events-none opacity-0 -translate-y-2 scale-y-95"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-5 sm:px-6 py-4 flex flex-col gap-2 text-gray-800">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeAndGo}
              className="block rounded-lg px-3 py-3 text-base hover:bg-gray-50"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
