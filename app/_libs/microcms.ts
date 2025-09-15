import "server-only"; // ← クライアント側からの import を防ぐ（Next公式）
import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries, MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

/** ===== Types ===== */
export type Member = {
  name: string;
  position: string;
  profile: string;
  image: MicroCMSImage;
} & MicroCMSListContent;

export type Category = {
  name: string;
} & MicroCMSListContent;

export type News = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
} & MicroCMSListContent;

/** ===== Client (lazy) ===== */
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

// import 直後に throw せず、必要になった時にだけ検証
const client = serviceDomain && apiKey ? createClient({ serviceDomain, apiKey }) : null;

function ensureClient() {
  if (!client) {
    throw new Error(
      "microCMS client is not configured. Set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY."
    );
  }
  return client;
}

// if (!process.env.MICROCMS_SERVICE_DOMAIN) {
//   throw new Error("MICROCMS_SERVICE_DOMAIN is required");
// }

// if (!process.env.MICROCMS_API_KEY) {
//   throw new Error("MICROCMS_API_KEY is required");
// }

// const client = createClient({
//   serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
//   apiKey: process.env.MICROCMS_API_KEY,
// });

/** ===== APIs ===== */
export const getMembersList = async (queries?: MicroCMSQueries) => {
  return ensureClient().getList<Member>({ endpoint: "members", queries });
};
// export const getMembersList = async (queries?: MicroCMSQueries) => {
//   const listData = await client.getList<Member>({
//     endpoint: "members",
//     queries,
//   });
//   return listData;
// };

// 全ニュース記事一覧を取得する関数
export const getNewsList = async (queries?: MicroCMSQueries) => {
  return ensureClient().getList<News>({ endpoint: "news", queries });
};
// export const getNewsList = async (queries?: MicroCMSQueries) => {
//   const listData = await client.getList<News>({
//     endpoint: "news",
//     queries,
//   });
//   return listData;
// };

// 1つのニュース記事のみ取得する関数
export const getNewsDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  return ensureClient().getListDetail<News>({ endpoint: "news", contentId, queries });
};
// export const getNewsDetail = async (contentId: string, queries?: MicroCMSQueries) => {
//   const detailData = await client.getListDetail<News>({
//     endpoint: "news",
//     contentId,
//     queries,
//   });
//   return detailData;
// };

// カテゴリーのコンテンツを取得する関数
export const getCategoryDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  return ensureClient().getListDetail<Category>({ endpoint: "categories", contentId, queries });
};
// export const getCategoryDetail = async (contentId: string, queries?: MicroCMSQueries) => {
//   const detailData = await client.getListDetail<Category>({
//     endpoint: "categories",
//     contentId,
//     queries,
//   });
//   return detailData;
// };
