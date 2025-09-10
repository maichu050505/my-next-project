import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/_components/news/NewsList";
import Breadcrumbs from "@/_components/ui/Breadcrumbs";

export default async function NewsPage() {
  const { contents: news } = await getNewsList({
    orders: "-publishedAt",
  });
  return (
    <>
      <Breadcrumbs />
      <NewsList news={news} />
    </>
  );
}
