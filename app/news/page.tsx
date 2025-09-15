import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/_components/news/NewsList";
import Breadcrumbs from "@/_components/ui/Breadcrumbs";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import Pagination from "@/_components/ui/Pagination";
import SearchField from "@/_components/ui/SearchField";
import { Suspense } from "react";

export const revalidate = 0;

export default async function NewsPage() {
  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    orders: "-publishedAt",
  });
  return (
    <>
      <Breadcrumbs />
      <Suspense fallback={null}>
        <SearchField baseHref="/news/search" />
      </Suspense>
      <NewsList news={news} />
      <Pagination totalCount={totalCount} />
    </>
  );
}
