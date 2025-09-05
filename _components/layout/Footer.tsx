import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 text-center text-sm text-gray-500">
        <nav className="flex justify-center gap-6 mb-4">
          <Link href="/works" className="hover:text-sky-600 transition">
            制作実績
          </Link>
          <Link href="/news" className="hover:text-sky-600 transition">
            お知らせ
          </Link>
          <Link href="/contact" className="hover:text-sky-600 transition">
            お問い合わせ
          </Link>
        </nav>
        <p>&copy; {new Date().getFullYear()} Sample. All rights reserved.</p>
      </div>
    </footer>
  );
}
