import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/_components/news/NewsList";
import Breadcrumbs from "@/_components/ui/Breadcrumbs";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import Pagination from "@/_components/ui/Pagination";
import SearchField from "@/_components/ui/SearchField";

export default async function NewsPage() {
  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    orders: "-publishedAt",
  });
  return (
    <>
      <Breadcrumbs />
      <SearchField />
      <NewsList news={news} />
      <Pagination totalCount={totalCount} />
    </>
  );
}
