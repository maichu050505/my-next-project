import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/_components/news/NewsList";

export default async function NewsPage() {
  const { contents: news } = await getNewsList();
  return <NewsList news={news} />;
}
