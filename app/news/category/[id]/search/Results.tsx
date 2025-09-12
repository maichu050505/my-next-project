import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/_components/news/NewsList";
import Pagination from "@/_components/ui/Pagination";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

type Props = { id: string; q?: string; current?: number; categoryName: string };

export default async function Results({ id, q, current = 1, categoryName }: Props) {
  const { contents: news, totalCount } = await getNewsList({
    q,
    limit: NEWS_LIST_LIMIT,
    offset: NEWS_LIST_LIMIT * (current - 1),
    filters: `category[equals]${id}`,
    orders: "-publishedAt",
  });

  const keyword = (q ?? "").trim();

  return (
    <>
      <p className="mt-6 sm:mt-8 text-xl font-bold">
        {categoryName}
        {keyword && (
          <>
            「{keyword}」の検索結果：{totalCount}件
          </>
        )}
      </p>
      <NewsList news={news} />
      <Pagination
        totalCount={totalCount}
        current={current}
        basePath={`/news/category/${id}/search`}
        query={{ q }} // ← ?q= をページ送りでも維持
      />
    </>
  );
}
