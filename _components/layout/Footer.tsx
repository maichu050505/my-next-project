import Link from "next/link";
import { navItems } from "@/app/_libs/navItems";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 text-center text-sm text-gray-500">
        <nav className="flex justify-center gap-6 mb-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-sky-700 transition">
              {item.label}
            </Link>
          ))}
        </nav>
        <p>&copy; {new Date().getFullYear()} Sample. All rights reserved.</p>
      </div>
    </footer>
  );
}
