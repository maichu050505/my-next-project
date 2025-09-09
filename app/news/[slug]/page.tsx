import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/_components/news/Article";
import Button from "@/_components/ui/Button";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const data = await getNewsDetail(params.slug);
  return (
    <>
      <Article data={data} />
      <div className="mt-10 text-center">
        <Button href="/news">お知らせ一覧へ</Button>
      </div>
    </>
  );
}
