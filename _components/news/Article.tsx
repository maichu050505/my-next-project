import Image from "next/image";
import type { News } from "@/app/_libs/microcms";
import Badge from "@/_components/ui/Badge";
import PublishedDate from "@/_components/ui/PublishedDate";

type Props = {
  data: News;
};

export default function Article({ data }: Props) {
  return (
    <article className="mx-auto max-w-3xl px-5 sm:px-6 py-10 sm:py-12 bg-white rounded-2xl shadow-sm">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          {data.thumbnail && (
            <Image
              src={data.thumbnail.url}
              alt=""
              width={data.thumbnail.width}
              height={data.thumbnail.height}
            />
          )}
          <Badge variant="sky" tone="soft" size="sm">
            {data.category.name}
          </Badge>
          <PublishedDate
            date={data.publishedAt ?? data.createdAt}
            className="text-sm text-gray-500"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{data.title}</h1>
        <p>{data.description}</p>
      </div>

      {/* 本文 */}
      <div
        className="prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{
          __html: data.content,
        }}
      ></div>
    </article>
  );
}
