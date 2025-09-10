import { getCategoryDetail, getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/_components/news/NewsList";
import Breadcrumbs from "@/_components/ui/Breadcrumbs";
import { notFound } from "next/navigation";
import Button from "@/_components/ui/Button";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

type Props = { params: Promise<{ id: string }> };

export default async function NewsPage({ params }: Props) {
  const { id } = await params;
  const category = await getCategoryDetail(id).catch(() => notFound());
  const { contents: news } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    filters: `category[equals]${category.id}`,
    orders: "-publishedAt",
  });
  return (
    <>
      <Breadcrumbs items={[{ name: "ニュース", href: "/news" }, { name: category.name }]} />
      <p className="mt-6 sm:mt-8 text-xl font-bold">{category.name}</p>
      <NewsList news={news} />
      <div className="mt-10 text-center">
        <Button href="/news">ニュース一覧へ</Button>
      </div>
    </>
  );
}
