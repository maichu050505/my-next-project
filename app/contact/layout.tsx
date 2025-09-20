import HeroSection from "@/_components/ui/HeroSection";
import PageContentsSection from "@/_components/ui/PageContentsSection";

export const metadata = {
  title: "お問い合わせ",
};

type Props = {
  children: React.ReactNode;
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default function RootLayout({ children }: Props) {
  return (
    <main className="bg-white text-gray-800">
      <HeroSection
        title="お問い合わせ"
        subtitle="Contact"
        background={{ type: "gradient" }} // 既定: sky→blue→indigo
        heightClass="h-[30svh] min-h-[240px]"
      />
      <PageContentsSection>{children}</PageContentsSection>
    </main>
  );
}
