import Breadcrumbs from "@/_components/ui/Breadcrumbs";
import HeroSection from "@/_components/ui/HeroSection";
import Button from "@/_components/ui/Button";

export default function NotFound() {
  return (
    <main className="bg-white text-gray-800">
      <HeroSection
        title="ページが見つかりませんでした"
        subtitle="404 Not Found"
        background={{ type: "gradient" }} // 既定: sky→blue→indigo
        heightClass="h-[30svh] min-h-[240px]"
      />
      <Breadcrumbs
        items={[{ name: "ページが見つかりませんでした" }]}
        baseLabel="ホーム"
        baseHref="/"
      />
      <section className="mx-auto max-w-4xl px-5 sm:px-6 py-16 sm:py-20">
        <p className="mt-4 text-lg text-gray-600 text-center">
          申し訳ございませんが、お探しのページは見つかりませんでした。
        </p>

        <div className="mt-8 text-center">
          <Button href="/" variant="secondary" size="lg">
            ホームに戻る
          </Button>
        </div>
      </section>
    </main>
  );
}
