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

  let data;
  try {
    data = await getNewsDetail(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <Breadcrumbs items={[{ name: "お知らせ", href: "/news" }, { name: data.title }]} />
      <Article data={data} />
      <div className="mt-10 text-center">
        <Button href="/news">お知らせ一覧へ</Button>
      </div>
    </>
  );
}
