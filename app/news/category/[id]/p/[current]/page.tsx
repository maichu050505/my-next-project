import { getCategoryDetail, getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/_components/news/NewsList";
import Breadcrumbs from "@/_components/ui/Breadcrumbs";
import { notFound } from "next/navigation";
import Button from "@/_components/ui/Button";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import Pagination from "@/_components/ui/Pagination";
import SearchField from "@/_components/ui/SearchField";
import { Suspense } from "react";

type Props = { params: Promise<{ id: string; current: string; basePath?: string }> };

export default async function NewsPage({ params }: Props) {
  const { id, current: currentStr } = await params;
  const current = Number.parseInt(currentStr, 10);
  if (!Number.isFinite(current) || current < 1) notFound();

  const category = await getCategoryDetail(id).catch(() => notFound());

  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    offset: NEWS_LIST_LIMIT * (current - 1),
    filters: `category[equals]${category.id}`,
    orders: "-publishedAt",
  });
  return (
    <>
      <Breadcrumbs items={[{ name: "ニュース", href: "/news" }, { name: category.name }]} />
      <Suspense fallback={null}>
        <SearchField baseHref={`/news/category/${category.id}/search`} />
      </Suspense>
      <p className="mt-6 sm:mt-8 text-xl font-bold">{category.name}</p>
      <NewsList news={news} />
      <Pagination
        totalCount={totalCount}
        current={current}
        basePath={`/news/category/${category.id}`}
      />
      <div className="mt-10 text-center">
        <Button href="/news">ニュース一覧へ</Button>
      </div>
    </>
  );
}
