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
