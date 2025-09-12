// app/news/search/Results.tsx
import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/_components/news/NewsList";
import Pagination from "@/_components/ui/Pagination";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

type Props = { q?: string; current?: number };

export default async function Results({ q, current = 1 }: Props) {
  const { contents: news, totalCount } = await getNewsList({
    q,
    limit: NEWS_LIST_LIMIT,
    orders: "-publishedAt",
  });
  const keyword = (q ?? "").trim();

  return (
    <>
      {keyword && (
        <p className="mt-6 sm:mt-8 text-xl font-bold">
          「{keyword}」の検索結果：{totalCount}件
        </p>
      )}
      <NewsList news={news} />
      <Pagination totalCount={totalCount} current={current} basePath="/news/search" query={{ q }} />
    </>
  );
}
