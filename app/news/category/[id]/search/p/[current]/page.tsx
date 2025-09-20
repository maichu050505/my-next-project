import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/_components/ui/Breadcrumbs";
import SearchField from "@/_components/ui/SearchField";
import Results from "../../Results";
import { getCategoryDetail } from "@/app/_libs/microcms";
import ResultsSkeleton from "@/_components/news/ResultsSkeleton";

export const revalidate = 0;

type Props = {
  params: Promise<{ id: string; current: string }>;
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id, current } = await params;
  const { q } = await searchParams;
  const n = Number(current) || 1;

  const category = await getCategoryDetail(id).catch(() => null);
  const base = `${category?.name ?? "ニュース"} 検索`;
  const title = n > 1 ? `${base}（${n}ページ目）` : base;

  const qs = q?.trim() ? `?q=${encodeURIComponent(q!.trim())}` : "";
  const canonical =
    n > 1 ? `/news/category/${id}/search/p/${n}${qs}` : `/news/category/${id}/search${qs}`;

  return {
    title, // root の template が適用される
    robots: { index: false, follow: false }, // 検索結果は noindex 推奨
    alternates: { canonical },
    openGraph: { title },
  };
}

export default async function CategorySearchPaged({ params, searchParams }: Props) {
  const { id, current: currentStr } = await params;
  const { q } = await searchParams;
  const current = Number.parseInt(currentStr, 10);
  if (!Number.isFinite(current) || current < 1) notFound();

  const category = await getCategoryDetail(id);
  const keyword = (q ?? "").trim();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "ニュース", href: "/news" },
          { name: category.name, href: `/news/category/${category.id}` },
          ...(keyword ? [{ name: `「${keyword}」の検索結果` }] : []),
        ]}
      />
      <Suspense fallback={null}>
        <SearchField baseHref={`/news/category/${category.id}/search`} />
      </Suspense>
      <Suspense
        key={`${id}-${q ?? ""}-${current}`}
        fallback={<ResultsSkeleton showHeading={!!(q ?? "").trim()} />}
      >
        <Results id={category.id} q={q} current={current} categoryName={category.name} />
      </Suspense>
    </>
  );
}
