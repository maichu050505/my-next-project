import { notFound, useSearchParams } from "next/navigation";
import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/_components/news/Article";
import Button from "@/_components/ui/Button";
import Breadcrumbs from "@/_components/ui/Breadcrumbs";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ dk?: string }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { dk } = await searchParams;
  const data = await getNewsDetail(slug, dk ? { draftKey: dk } : undefined).catch(() => notFound());

  return (
    <>
      <Breadcrumbs items={[{ name: "ニュース", href: "/news" }, { name: data.title }]} />
      <Article data={data} />
      <div className="mt-10 text-center">
        <Button href="/news">ニュース一覧へ</Button>
      </div>
    </>
  );
}
