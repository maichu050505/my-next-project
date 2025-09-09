"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { labelMap } from "@/app/_libs/navItems";

type Crumb = { name: string; href?: string };
type Props = {
  items?: Crumb[]; // 省略時は自動生成
  baseLabel?: string; // 既定: 「ホーム」
  baseHref?: string; // 既定: ">"
};

function autoCrumbs(pathname: string): Crumb[] {
  const segs = pathname.split("/").filter(Boolean);
  return segs.map((s, i) => {
    const key = s.toLowerCase(); // 予防的に小文字化
    const href = "/" + segs.slice(0, i + 1).join("/");
    const name = labelMap[key] ?? decodeURIComponent(s);
    return { name, href };
  });
}

export default function Breadcrumbs({ items, baseLabel = "ホーム", baseHref = "/" }: Props) {
  const pathname = usePathname();
  const computed = useMemo(() => items ?? autoCrumbs(pathname), [items, pathname]);

  // JSON-LD
  const jsonLd = useMemo(() => {
    const list = [{ name: baseLabel, href: baseHref }, ...computed].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.href || undefined,
    }));
    return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: list };
  }, [computed, baseHref, baseLabel]);

  return (
    <>
      <div className="mx-auto max-w-4xl sm: py-4 sm:py-4">
        <nav aria-label="Breadcrumb" className="text-xs sm:text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-gray-500">
            <li>
              <Link href={baseHref} className="hover:text-sky-600">
                {baseLabel}
              </Link>
            </li>
            {computed.map((c, idx) => {
              const isLast = idx === computed.length - 1;
              return (
                <li key={`${c.name}-${idx}`} className="flex items-center gap-2">
                  <span aria-hidden="true">&gt;</span>
                  {isLast || !c.href ? (
                    <span className="text-gray-800">{c.name}</span>
                  ) : (
                    <Link href={c.href} className="hover:text-sky-600">
                      {c.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
