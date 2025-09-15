import { BuildingOffice2Icon, CodeBracketIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import Button from "@/_components/ui/Button";
import NewsList from "@/_components/news/NewsList";
import HeroSection from "@/_components/ui/HeroSection";
import { getNewsList } from "@/app/_libs/microcms";
import { TOP_NEWS_LIMIT } from "@/app/_constants";

export const revalidate = 60;

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

export default async function Home() {
  const data = await getNewsList({
    limit: TOP_NEWS_LIMIT,
  });

  return (
    <main className="bg-white text-gray-800">
      {/* HERO */}
      <HeroSection
        title="Design × Frontend that ships."
        subtitle="Next.js / Tailwind CSS / パフォーマンス改善までワンストップ対応"
        background={{
          type: "gradient",
          from: "from-sky-400",
          via: "via-blue-500",
          to: "to-indigo-600",
        }}
        heightClass="h-[70svh] min-h-[500px] sm:h-[75svh] md:h-[60svh]"
        className="animate-gradient" // ← Homeだけアニメーションを追加
      />

      {/* NEWS / お知らせ */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-16 sm:py-20">
          {/* 見出しは中央寄せ */}
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold">お知らせ</h2>

          <NewsList news={data.contents} />

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
          <Button href="/contact" variant="secondary" size="lg">
            お問い合わせ
          </Button>
        </div>
      </section>
    </main>
  );
}
