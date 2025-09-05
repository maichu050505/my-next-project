"use client";
import { usePathname } from "next/navigation";
import { labelMap } from "@/app/_libs/navItems";

export function useAutoBreadcrumbs() {
  const pathname = usePathname(); // 例: "/news/1"
  const segs = pathname.split("/").filter(Boolean); // ["news","1"]
  const items = segs.map((s, i) => {
    const href = "/" + segs.slice(0, i + 1).join("/");
    const name = labelMap[s] ?? decodeURIComponent(s);
    return { name, href };
  });
  return items;
}
