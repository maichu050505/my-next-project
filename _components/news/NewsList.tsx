import Link from "next/link";
import { News } from "@/app/_libs/microcms";
import Badge from "@/_components/ui/Badge";

type Props = {
  news: News[];
  limit?: number; // ← TOPでは2件, /newsでは全件
};

const normalizeDate = (s: string) => s.replaceAll("/", "-");

export default function NewsList({ news, limit }: Props) {
  const items = limit ? news.slice(0, limit) : news;

  if (news.length === 0) {
    return <p className="text-center mt-6">記事がありません。</p>;
  }

  return (
    <ul className="mt-6 sm:mt-8 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
      {items.map((n, idx) => (
        <li key={n.id} className="group relative">
          <Link
            href={`/news/${n.id}`}
            className="block px-5 py-4 hover:bg-gray-50 transition
                   sm:flex sm:items-center sm:gap-4"
          >
            {/* モバイル：1行目 = 日付 */}
            <time
              dateTime={normalizeDate(n.publishedAt)}
              className="block text-xs tabular-nums text-gray-500 sm:hidden"
            >
              {n.publishedAt}
            </time>

            {/* モバイル：2行目 = カテゴリ＋タイトル */}
            <div className="mt-2 flex items-center gap-2 sm:hidden">
              <Badge variant="sky" tone="soft" size="xs">
                {n.category.name}
              </Badge>
              <span className="text-gray-800 line-clamp-1">{n.title}</span>
            </div>

            {/* PC：左 = 日付 */}
            <time
              dateTime={normalizeDate(n.publishedAt)}
              className="hidden sm:block text-sm tabular-nums text-gray-500 w-28 shrink-0"
            >
              {n.publishedAt}
            </time>

            {/* PC：中央 = カテゴリ＋タイトル（可変幅） */}
            <span className="hidden sm:inline-flex sm:items-center sm:gap-2 sm:min-w-0 sm:flex-1">
              <Badge variant="sky" tone="soft" size="sm" className="shrink-0">
                {n.category.name}
              </Badge>
              <span className="text-gray-800 truncate">{n.title}</span>
            </span>

            {/* NEW：モバイルはカード右上に絶対配置、PCは行末（右端） */}
            {idx === 0 && (
              <Badge variant="rose" tone="soft" size="sm">
                NEW
              </Badge>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
