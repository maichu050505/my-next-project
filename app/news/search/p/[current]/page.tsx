import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getNewsList } from "@/app/_libs/microcms";
import Breadcrumbs from "@/_components/ui/Breadcrumbs";
import SearchField from "@/_components/ui/SearchField";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import Results from "@/app/news/search/Results";
import ResultsSkeleton from "@/_components/news/ResultsSkeleton";

export const revalidate = 0;

type Props = {
  params: Promise<{ current: string }>;
  searchParams: Promise<{ q?: string }>;
};

function pagedTitle(n: number) {
  return n > 1 ? `ニュース検索（${n}ページ目）` : "ニュース検索";
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { current } = await params;
  const { q } = await searchParams;
  const n = Number(current) || 1;

  const qs = q ? `?q=${encodeURIComponent(q)}` : "";
  const canonical = n > 1 ? `/news/search/p/${n}${qs}` : `/news/search${qs}`;
  const title = pagedTitle(n);

  return {
    title, // root の template が適用される
    robots: { index: false, follow: false }, // 検索結果は noindex 推奨
    alternates: { canonical },
    openGraph: { title },
  };
}

export default async function NewsSearchPaged({ params, searchParams }: Props) {
  const { current: currentStr } = await params;
  const { q } = await searchParams;

  const current = Number.parseInt(currentStr, 10);
  if (!Number.isFinite(current) || current < 1) notFound();

  const { contents: news } = await getNewsList({
    q,
    limit: NEWS_LIST_LIMIT,
    offset: NEWS_LIST_LIMIT * (current - 1),
    orders: "-publishedAt",
  });

  if (news.length === 0) notFound();

  const keyword = (q ?? "").trim();
  const crumbs = [
    { name: "ニュース", href: "/news" },
    ...(keyword ? [{ name: `「${keyword}」の検索結果` }] : []),
  ];

  return (
    <>
      <Breadcrumbs items={crumbs} />
      <Suspense fallback={null}>
        <SearchField />
      </Suspense>
      <Suspense
        key={`${q}-${current}`}
        fallback={<ResultsSkeleton showHeading={!!(q ?? "").trim()} />}
      >
        <Results q={q} current={current} />
      </Suspense>
    </>
  );
}
