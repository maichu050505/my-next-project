import Link from "next/link";
import GlobalNav from "@/_components/layout/GlobalNav";
import { navItems } from "@/app/_libs/navItems";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 flex items-center justify-between h-16">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-sky-600">
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

        {/* グローバルナビ（PC/モバイル一式） */}
        <GlobalNav items={navItems} />
      </div>
    </header>
  );
}
