import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/_components/ui/Breadcrumbs";
import SearchField from "@/_components/ui/SearchField";
import Results from "@/app/news/search/Results";
import ResultsSkeleton from "@/_components/news/ResultsSkeleton";

export const revalidate = 0; // 即時反映

type Props = { searchParams: Promise<{ q?: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "ニュース検索", // rootの "%s | コーポレートサイト Sample" が効く
    robots: { index: false, follow: false }, // 検索結果はnoindex推奨
    openGraph: { title: "ニュース検索" },
  };
}

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
      <Suspense fallback={null}>
        <SearchField />
      </Suspense>
      <Suspense key={q} fallback={<ResultsSkeleton showHeading={!!keyword} />}>
        <Results q={q} />
      </Suspense>
    </>
  );
}
