import Link from "next/link";
import type { News } from "@/app/_libs/microcms";
import Badge from "@/_components/ui/Badge";
import PublishedDate from "@/_components/ui/PublishedDate";
import { NEWS_NEW_BADGE_DAYS } from "@/app/_constants";

type Props = {
  news: News[];
};

function isNew(publishedAt?: string, createdAt?: string) {
  const src = publishedAt ?? createdAt;
  if (!src) return false;
  const d = new Date(src);
  if (Number.isNaN(d.getTime())) return false;
  const now = Date.now();
  const diff = now - d.getTime();
  const windowMs = NEWS_NEW_BADGE_DAYS * 24 * 60 * 60 * 1000;
  return diff >= 0 && diff < windowMs; // 未来日付は除外
}

export default function NewsList({ news }: Props) {
  if (news.length === 0) {
    return <p className="text-center mt-6">記事がありません。</p>;
  }

  return (
    <ul className="mt-6 sm:mt-8 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
      {news.map((n) => {
        const showNew = isNew(n.publishedAt, n.createdAt);
        return (
          <li key={n.id} className="group relative">
            <Link
              href={`/news/${n.id}`}
              className="block px-5 py-4 hover:bg-gray-50 transition sm:flex sm:items-center sm:gap-4"
            >
              {/* モバイル：1行目 = 日付 */}
              <PublishedDate
                date={n.publishedAt ?? n.createdAt}
                className="block text-xs tabular-nums text-gray-500 sm:hidden"
              />

              {/* モバイル：2行目 = カテゴリ＋タイトル */}
              <div className="mt-2 flex items-center gap-2 sm:hidden">
                <Badge variant="sky" tone="soft" size="xs">
                  {n.category.name}
                </Badge>
                <span className="text-gray-800 line-clamp-1">{n.title}</span>
              </div>

              {/* PC：全部1行（左=日付 / 中央=カテゴリ+タイトル / 右=NEW） */}
              <div className="hidden sm:flex sm:items-center sm:gap-4 sm:w-full">
                <PublishedDate
                  date={n.publishedAt ?? n.createdAt}
                  className="hidden sm:block text-sm tabular-nums text-gray-500 w-28 shrink-0"
                />

                <Badge variant="sky" tone="soft" size="sm" className="shrink-0">
                  {n.category.name}
                </Badge>

                <span className="text-gray-800 truncate flex-1">{n.title}</span>

                {/* PC用 NEW（右端固定） */}
                {showNew && (
                  <Badge
                    variant="rose"
                    tone="soft"
                    size="sm"
                    className="hidden sm:inline-flex sm:ml-auto"
                  >
                    NEW
                  </Badge>
                )}
              </div>

              {/* モバイル用 NEW（カード右上固定） */}
              {showNew && (
                <Badge
                  variant="rose"
                  tone="soft"
                  size="xs"
                  className="absolute top-3 right-3 sm:hidden"
                >
                  NEW
                </Badge>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
