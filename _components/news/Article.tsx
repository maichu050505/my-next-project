import Image from "next/image";
import type { News } from "@/app/_libs/microcms";
import Badge from "@/_components/ui/Badge";
import PublishedDate from "@/_components/ui/PublishedDate";

type Props = {
  data: News;
};

export default function Article({ data }: Props) {
  const categoryName = data.category?.name ?? "news";
  const date = data.publishedAt ?? data.createdAt;
  const hasThumb = !!data.thumbnail?.url;

  return (
    <article className="mx-auto max-w-3xl sm:px-6 py-8 sm:py-10 bg-white rounded-2xl shadow-sm">
      {/* サムネイル（あれば） */}
      {hasThumb && (
        <figure className="relative w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden">
          <Image
            src={data.thumbnail!.url}
            alt={data.title}
            fill
            className="object-cover"
            sizes="(min-width:1024px) 768px, (min-width:640px) 600px, 100vw"
            priority
          />
        </figure>
      )}

      {/* 見出し・メタ */}
      <header className={hasThumb ? "mt-6 sm:mt-8 mb-12 sm:mb-16" : "mb-12 sm:mb-16"}>
        <h1 className="mb-3 sm:mb-4 text-2xl sm:text-2xl md:text-3xl font-bold leading-tight tracking-tight text-gray-900 leading-9">
          {data.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
          <Badge variant="sky" tone="soft" size="sm">
            {categoryName}
          </Badge>
          <span className="hidden sm:inline text-gray-300">•</span>
          <PublishedDate date={date} className="text-gray-500" />
        </div>

        {data.description && (
          <p className="mt-3 sm:mt-4 text-gray-500 text-sm sm:text-sm leading-relaxed">
            {data.description}
          </p>
        )}
      </header>

      {/* 本文（リッチテキストHTML） */}
      <div
        className="
          prose prose-slate sm:prose-lg max-w-none
          prose-headings:scroll-mt-24
          prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl prose-figure:my-8
          prose-hr:border-gray-200
          prose-blockquote:border-sky-500/20 prose-blockquote:text-gray-700
          prose-code:bg-gray-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl
          [&_p]:my-5
          [&_p]:leading-7
          [&_p]:text-gray-700
          [&_p]:text-md sm:[&_p]:text-md
        "
        dangerouslySetInnerHTML={{ __html: data.content || "" }}
      />
    </article>
  );
}
