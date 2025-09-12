import { Suspense } from "react";
import Breadcrumbs from "@/_components/ui/Breadcrumbs";
import Pagination from "@/_components/ui/Pagination";
import SearchField from "@/_components/ui/SearchField";
import Results from "@/app/news/search/Results";

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
      <Suspense key={q} fallback={<div className="mt-6 animate-pulse text-gray-400">検索中…</div>}>
        <Results q={q} />
      </Suspense>
    </>
  );
}
