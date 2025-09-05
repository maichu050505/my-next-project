import Breadcrumbs from "@/_components/ui/Breadcrumbs";
import HeroSection from "@/_components/ui/HeroSection";
import Button from "@/_components/ui/Button";
import PageContentsSection from "@/_components/ui/PageContentsSection";

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
      <PageContentsSection>
        <p className="mt-4 text-lg text-gray-600 text-center">
          申し訳ございませんが、お探しのページは見つかりませんでした。
        </p>

        <div className="mt-8 text-center">
          <Button href="/" variant="secondary" size="lg">
            ホームに戻る
          </Button>
        </div>
      </PageContentsSection>
    </main>
  );
}
