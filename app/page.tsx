import Image from "next/image";
import Link from "next/link";

type News = {
  id: string;
  title: string;
  category: {
    name: string;
  };
  publishedAt: string;
  createdAt: string;
};

const data: {
  contents: News[];
} = {
  contents: [
    {
      id: "1",
      title: "渋谷にオフィスを移転しました",
      category: {
        name: "更新情報",
      },
      publishedAt: "2025/09/03",
      createdAt: "2025/09/03",
    },
    {
      id: "2",
      title: "当社CEOが業界リーダーTOP30に選出されました",
      category: {
        name: "更新情報",
      },
      publishedAt: "2025/09/02",
      createdAt: "2025/09/02",
    },
    {
      id: "3",
      title: "テストの記事です",
      category: {
        name: "更新情報",
      },
      publishedAt: "2025/09/01",
      createdAt: "2025/09/01",
    },
  ],
};

// "2025/09/03" -> "2025-09-03"（<time dateTime> 用）
const normalizeDate = (s: string) => s.replaceAll("/", "-");

export default function Home() {
  // 新しい順に並べ替え（publishedAt は同じ桁数なので文字列比較でOK）
  const news = [...data.contents]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 2); // ← ここで2件に制限

  return (
    <main className="bg-white text-gray-800">
      {/* HERO：白ベース + ブルーグラデーション */}
      <section className="relative h-[70svh] min-h-[520px] overflow-hidden flex items-center justify-center bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600">
        <div className="relative z-10 mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow">
            Design × Frontend that ships.
          </h1>
          <p className="mt-5 text-lg text-white/90">
            Next.js / Tailwind CSS / パフォーマンス改善までワンストップ対応
          </p>
        </div>
      </section>

      {/* NEWS / お知らせ */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold">お知らせ</h2>
            <Link href="/news" className="text-sm text-blue-600 hover:underline">
              一覧を見る
            </Link>
          </div>

          <ul className="mt-8 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
            {news.map((n, idx) => (
              <li key={n.id} className="group">
                <Link
                  href={`/news/${n.id}`}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition"
                >
                  <time
                    dateTime={normalizeDate(n.publishedAt)}
                    className="text-sm tabular-nums text-gray-500 w-28 shrink-0"
                    aria-label={`掲載日 ${n.publishedAt}`}
                  >
                    {n.publishedAt}
                  </time>

                  <span className="inline-flex items-center gap-2">
                    {/* カテゴリ・バッジ */}
                    <span className="rounded-full bg-blue-50 text-blue-700 text-xs px-2 py-0.5">
                      {n.category.name}
                    </span>
                    <span className="text-gray-800">{n.title}</span>
                  </span>

                  {/* NEW バッジ：最新のみ表示（先頭要素） */}
                  {idx === 0 && (
                    <span className="ml-auto inline-flex items-center rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700">
                      NEW
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-2xl md:text-3xl font-semibold">サービス内容</h2>
        <p className="mt-3 text-gray-600">設計・コーディング・最適化を一気通貫で対応</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              t: "コーポレートサイト制作",
              d: "Next.js + Headless CMS で高速・更新しやすいサイトを構築。",
            },
            { t: "フロントエンド開発", d: "Tailwind CSS で素早く美しく。アクセシビリティも考慮。" },
            { t: "パフォーマンス改善", d: "LCP/CLS の改善、画像最適化、計測と改善提案を実施。" },
          ].map((s) => (
            <div
              key={s.t}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-gray-600">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORKS */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold">制作実績</h2>
            <Link href="/works" className="text-sm text-blue-600 hover:underline">
              一覧を見る
            </Link>
          </div>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <li
                key={i}
                className="group rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="relative aspect-[4/3] bg-gray-100" />
                <div className="p-4">
                  <h3 className="font-semibold">プロジェクト {i}</h3>
                  <p className="mt-1 text-sm text-gray-600">コーポレート / フロントエンド</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-sm">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">小さく始めて、速く公開</h2>
            <p className="mt-2 text-white/90">要件整理からリリースまで伴走いたします。</p>
          </div>
          <Link
            href="/contact"
            className="rounded-xl px-5 py-3 bg-white text-blue-600 font-medium shadow hover:bg-gray-50"
          >
            お問い合わせ
          </Link>
        </div>
      </section>
    </main>
  );
}
