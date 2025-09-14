import { Suspense } from "react";
import Breadcrumbs from "@/_components/ui/Breadcrumbs";
import SearchField from "@/_components/ui/SearchField";
import Results from "./Results";
import { getCategoryDetail } from "@/app/_libs/microcms";
import ResultsSkeleton from "@/_components/news/ResultsSkeleton";

export const revalidate = 0;

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ q?: string }> };

export default async function CategorySearchPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { q } = await searchParams;
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
        key={`${id}-${q ?? ""}`}
        fallback={<ResultsSkeleton showHeading={!!(q ?? "").trim()} />}
      >
        <Results id={category.id} q={q} categoryName={category.name} />
      </Suspense>
    </>
  );
}
