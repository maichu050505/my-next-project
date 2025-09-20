import type { Metadata } from "next";
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

function pagedTitle(base: string, n: number) {
  return n > 1 ? `${base}（${n}ページ目）` : base;
}

// ▼ タイトル・canonical など（root の template "%s | コーポレートサイト Sample" が効く）
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, current } = await params;
  const n = Number(current) || 1;

  const category = await getCategoryDetail(id).catch(() => null);
  const base = category?.name ?? "ニュース";
  const title = pagedTitle(base, n);

  return {
    title,
    description: `${base} に関するニュース一覧です。`,
    alternates: {
      canonical: n > 1 ? `/news/category/${id}/p/${n}` : `/news/category/${id}`,
    },
    openGraph: { title, description: `${base} のニュース一覧` },
  };
}

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
