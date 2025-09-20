import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/_components/news/NewsList";
import Breadcrumbs from "@/_components/ui/Breadcrumbs";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import Pagination from "@/_components/ui/Pagination";
import SearchField from "@/_components/ui/SearchField";
import { Suspense } from "react";

type Props = {
  params: Promise<{ current: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { current } = await params;
  const n = Number(current) || 1;

  const base = "ニュース";
  const title = n > 1 ? `${base}（${n}ページ目）` : base;

  return {
    title, // root の template "%s | コーポレートサイト Sample" が効く
    alternates: {
      canonical: n > 1 ? `/news/p/${n}` : `/news`,
    },
    openGraph: { title },
  };
}

export default async function NewsPage({ params }: Props) {
  const current = parseInt((await params).current, 10);
  if (!Number.isFinite(current) || current < 1) notFound();
  if (current === 1) redirect("/news"); // 任意: /news/p/1 → /news
  const limit = NEWS_LIST_LIMIT;
  const offset = limit * (current - 1);
  const { contents: news, totalCount } = await getNewsList({
    limit,
    offset,
    orders: "-publishedAt",
  });

  return (
    <>
      <Breadcrumbs items={[{ name: "ニュース", href: "/news" }]} />
      <Suspense fallback={null}>
        <SearchField baseHref="/news/search" />
      </Suspense>
      <NewsList news={news} />
      <Pagination totalCount={totalCount} current={current} />
    </>
  );
}
