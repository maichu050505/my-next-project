import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/_components/ui/Breadcrumbs";
import SearchField from "@/_components/ui/SearchField";
import Results from "./Results";
import { getCategoryDetail } from "@/app/_libs/microcms";
import ResultsSkeleton from "@/_components/news/ResultsSkeleton";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ q?: string }> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id } = await params;
  const { q } = await searchParams;
  const category = await getCategoryDetail(id).catch(() => null);

  const base = category?.name ?? "ニュース";
  const title = `${base} 検索`;
  const qs = q?.trim()?.length ? `?q=${encodeURIComponent(q!.trim())}` : "";

  return {
    title, // root の "%s | コーポレートサイト Sample" が効く
    robots: { index: false, follow: false }, // 検索結果は noindex 推奨
    alternates: { canonical: `/news/category/${id}/search${qs}` },
    openGraph: { title },
  };
}

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
