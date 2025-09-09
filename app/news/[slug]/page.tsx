import { notFound } from "next/navigation";
import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/_components/news/Article";
import Button from "@/_components/ui/Button";

type Props = {
  // ★ Next.js 15 では Promise になります
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
      <Article data={data} />
      <div className="mt-10 text-center">
        <Button href="/news">お知らせ一覧へ</Button>
      </div>
    </>
  );
}
