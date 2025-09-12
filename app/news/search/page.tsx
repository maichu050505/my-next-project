import { Suspense } from "react";
import Breadcrumbs from "@/_components/ui/Breadcrumbs";
import SearchField from "@/_components/ui/SearchField";
import Results from "@/app/news/search/Results";
import ResultsSkeleton from "@/_components/news/ResultsSkeleton";

export const revalidate = 0; // 即時反映

type Props = { searchParams: Promise<{ q?: string }> };

export default async function NewsSearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const keyword = (q ?? "").trim();

  return (
    <>
      {keyword ? (
        <Breadcrumbs
          items={[{ name: "ニュース", href: "/news" }, { name: `「${keyword}」の検索結果` }]}
        />
      ) : (
        <Breadcrumbs items={[{ name: "ニュース", href: "/news" }]} />
      )}
      <SearchField />
      <Suspense key={q} fallback={<ResultsSkeleton showHeading={!!(q ?? "").trim()} />}>
        <Results q={q} />
      </Suspense>
    </>
  );
}
