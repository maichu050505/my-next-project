import Image from "next/image";
import Link from "next/link";
import { BuildingOffice2Icon, CodeBracketIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import Button from "@/app/_components/ui/Button";

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

const services = [
  {
    t: "コーポレートサイト制作",
    d: "Next.js + Headless CMS で高速・更新しやすいサイトを構築。",
    icon: BuildingOffice2Icon,
  },
  {
    t: "フロントエンド開発",
    d: "Tailwind CSS で素早く美しく。アクセシビリティも考慮。",
    icon: CodeBracketIcon,
  },
  {
    t: "パフォーマンス改善",
    d: "LCP/CLS の改善、画像最適化、計測と改善提案を実施。",
    icon: ChartBarIcon,
  },
];

export default function Home() {
  // 新しい順に並べ替え（publishedAt は同じ桁数なので文字列比較でOK）
  const news = [...data.contents]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 2); // ← ここで2件に制限

  return (
    <main className="bg-white text-gray-800">
      {/* HERO */}
      <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 h-[56svh] min-h-[420px] sm:h-[60svh] md:h-[70svh]">
        <div className="relative z-10 mx-auto px-5 sm:px-6 text-center">
          <h1 className="font-bold tracking-tight text-white drop-shadow text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Design × Frontend that ships.
          </h1>
          <p className="mt-4 sm:mt-5 text-white/90 text-base sm:text-lg">
            Next.js / Tailwind CSS / パフォーマンス改善までワンストップ対応
          </p>
        </div>
      </section>

      {/* NEWS / お知らせ */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-16 sm:py-20">
          {/* 見出しは中央寄せ */}
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold">お知らせ</h2>

          <ul className="mt-6 sm:mt-8 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
            {news.map((n, idx) => (
              <li key={n.id} className="group relative">
                <Link
                  href={`/news/${n.id}`}
                  className="block px-5 py-4 hover:bg-gray-50 transition"
                >
                  {/* スマホ: 日付だけ1行目 */}
                  <time
                    dateTime={normalizeDate(n.publishedAt)}
                    className="block text-xs sm:hidden tabular-nums text-gray-500"
                    aria-label={`掲載日 ${n.publishedAt}`}
                  >
                    {n.publishedAt}
                  </time>

                  {/* スマホ: 2行目 = カテゴリ＋タイトル */}
                  <div className="mt-2 sm:hidden flex items-center gap-2">
                    <span className="rounded-full bg-blue-50 text-blue-700 text-[11px] px-2 py-0.5 shrink-0">
                      {n.category.name}
                    </span>
                    <span className="text-gray-800 line-clamp-1">{n.title}</span>
                  </div>

                  {/* PC: 横並び */}
                  <div className="hidden sm:flex sm:items-center sm:gap-4">
                    <time
                      dateTime={normalizeDate(n.publishedAt)}
                      className="text-sm tabular-nums text-gray-500 w-28 shrink-0"
                      aria-label={`掲載日 ${n.publishedAt}`}
                    >
                      {n.publishedAt}
                    </time>
                    <span className="flex-1 inline-flex items-center gap-2 min-w-0">
                      <span className="rounded-full bg-blue-50 text-blue-700 text-xs px-2 py-0.5 shrink-0">
                        {n.category.name}
                      </span>
                      <span className="text-gray-800 truncate">{n.title}</span>
                    </span>
                  </div>

                  {/* NEW バッジ: スマホでは右上固定、PCは右端 */}
                  {idx === 0 && (
                    <span
                      className="
              absolute top-3 right-3
              sm:static sm:ml-auto
              inline-flex items-center rounded-full bg-sky-100 px-2 py-0.5 
              text-[11px] sm:text-xs font-medium text-sky-700
            "
                    >
                      NEW
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* セクション最後に「一覧を見る」ボタン（中央） */}
          <div className="mt-8 flex justify-center">
            <Button href="/news" variant="secondary" size="lg">
              一覧を見る
            </Button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-6xl px-5 sm:px-6 py-20 md:py-24">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center">サービス内容</h2>
        <p className="mt-2 sm:mt-3 text-gray-600 text-center">
          設計・コーディング・最適化を一気通貫で対応
        </p>
        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.t}
              className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition"
            >
              <s.icon className="w-20 h-20 text-sky-500 mx-auto" />
              <h3 className="mt-4 font-semibold text-center">{s.t}</h3>
              <p className="mt-2 text-sm text-gray-600">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORKS */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-20 md:py-24">
          {/* 見出し中央寄せ */}
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold">制作実績</h2>

          <ul className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
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

          {/* セクション最後に「一覧を見る」ボタン */}
          <div className="mt-8 flex justify-center">
            <div className="mt-8 flex justify-center">
              <Button href="/works" variant="secondary" size="lg">
                一覧を見る
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 sm:px-6 pb-20 md:pb-24">
        <div className="rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white p-6 sm:p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6 shadow-sm">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
              小さく始めて、速く公開
            </h2>
            <p className="mt-2 text-white/90 text-sm sm:text-base">
              要件整理からリリースまで伴走いたします。
            </p>
          </div>
          <Button href="/contact" variant="primary" size="lg">
            お問い合わせ
          </Button>
        </div>
      </section>
    </main>
  );
}
