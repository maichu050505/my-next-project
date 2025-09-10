import { notFound } from "next/navigation";
import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/_components/news/Article";
import Button from "@/_components/ui/Button";
import Breadcrumbs from "@/_components/ui/Breadcrumbs";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await getNewsDetail(slug).catch(() => notFound());

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
