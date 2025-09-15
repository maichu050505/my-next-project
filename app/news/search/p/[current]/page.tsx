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
