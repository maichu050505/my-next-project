import { NEWS_LIST_LIMIT } from "@/app/_constants";
import Link from "next/link";
import clsx from "clsx";

type Props = {
  totalCount: number;
  current?: number;
  className?: string;
};

export default function Pagination({ totalCount, current = 1, className }: Props) {
  const totalPages = Math.max(1, Math.ceil(totalCount / NEWS_LIST_LIMIT));
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const toHref = (p: number) => (p === 1 ? "/news" : `/news/p/${p}`);
  const hasPrev = current > 1;
  const hasNext = current < totalPages;

  const baseItem =
    "inline-flex items-center justify-center w-9 h-9 text-sm rounded-full transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300";
  const inactive =
    "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900";
  const active =
    "rounded-full bg-sky-600 text-white font-semibold shadow-sm ring-1 ring-inset ring-sky-600/10";
  const disabled = "cursor-not-allowed bg-gray-100 text-gray-400";

  return (
    <nav aria-label="ページネーション" className="mt-8 sm:mt-10 flex justify-center">
      <ul className="inline-flex items-center gap-2">
        {/* Prev（1ページ目では非表示） */}
        {hasPrev && (
          <li>
            <Link
              href={toHref(current - 1)}
              aria-label="前のページへ"
              className={clsx(baseItem, inactive)}
            >
              &lt;
            </Link>
          </li>
        )}

        {/* Numbers */}
        {pages.map((p) => (
          <li key={p}>
            {current !== p ? (
              <Link
                href={toHref(p)}
                aria-label={`ページ ${p}へ`}
                className={clsx(baseItem, inactive)}
              >
                {p}
              </Link>
            ) : (
              <span aria-current="page" className={clsx(baseItem, active)}>
                {p}
              </span>
            )}
          </li>
        ))}

        {/* Next（最終ページでは非表示） */}
        {hasNext && (
          <li>
            <Link
              href={toHref(current + 1)}
              aria-label="次のページへ"
              className={clsx(baseItem, inactive)}
            >
              &gt;
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
