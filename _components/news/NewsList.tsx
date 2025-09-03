import Link from "next/link";
import { News } from "@/app/_libs/microcms";
import Badge from "@/_components/ui/Badge";
import PublishedDate from "@/_components/ui/PublishedDate";

type Props = {
  news: News[];
  limit?: number;
};

export default function NewsList({ news, limit }: Props) {
  const items = limit ? news.slice(0, limit) : news;

  if (items.length === 0) {
    return <p className="text-center mt-6">記事がありません。</p>;
  }

  return (
    <ul className="mt-6 sm:mt-8 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
      {items.map((n, idx) => (
        <li key={n.id} className="group relative">
          <Link
            href={`/news/${n.id}`}
            className="block px-5 py-4 hover:bg-gray-50 transition sm:flex sm:items-center sm:gap-4"
          >
            {/* モバイル：1行目 = 日付 */}
            <PublishedDate
              date={n.publishedAt}
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
                date={n.publishedAt}
                className="hidden sm:block text-sm tabular-nums text-gray-500 w-28 shrink-0"
              />

              <Badge variant="sky" tone="soft" size="sm" className="shrink-0">
                {n.category.name}
              </Badge>

              <span className="text-gray-800 truncate flex-1">{n.title}</span>

              {/* PC用 NEW（右端固定） */}
              {idx === 0 && (
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
            {idx === 0 && (
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
      ))}
    </ul>
  );
}
