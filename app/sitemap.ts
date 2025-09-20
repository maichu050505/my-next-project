import { MetadataRoute } from "next";
import { getAllCategoryList, getAllNewsList } from "@/app/_libs/microcms";

const buildUrl = (path?: string) => `https://my-next-project-xugx.vercel.app${path ?? ""}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const newsContents = await getAllNewsList();
  const categoryContents = await getAllCategoryList();

  const newsUrls: MetadataRoute.Sitemap = newsContents.map((content) => ({
    url: buildUrl(`/news/${content.id}`),
    lastModifid: content.revisedAt,
  }));
  const categoryUrls: MetadataRoute.Sitemap = categoryContents.map((content) => ({
    url: buildUrl(`/news/category/${content.id}`),
    lastModified: content.revisedAt,
  }));

  const now = new Date();

  return [
    {
      url: buildUrl(),
      lastModified: now,
    },
    {
      url: buildUrl("/members"),
      lastModified: now,
    },
    {
      url: buildUrl("/contact"),
      lastModified: now,
    },
    {
      url: buildUrl("/news"),
      lastModified: now,
    },
    ...newsUrls,
    ...categoryUrls,
  ];
}
