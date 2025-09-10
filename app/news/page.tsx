import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/_components/news/NewsList";
import Breadcrumbs from "@/_components/ui/Breadcrumbs";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

export default async function NewsPage() {
  const { contents: news } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    orders: "-publishedAt",
  });
  return (
    <>
      <Breadcrumbs />
      <NewsList news={news} />
    </>
  );
}
