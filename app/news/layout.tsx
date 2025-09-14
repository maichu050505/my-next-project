import HeroSection from "@/_components/ui/HeroSection";
import PageContentsSection from "@/_components/ui/PageContentsSection";

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <main className="bg-white text-gray-800">
      <HeroSection
        title="ニュース"
        subtitle="News"
        background={{ type: "gradient" }} // 既定: sky→blue→indigo
        heightClass="h-[30svh] min-h-[240px]"
      />
      <PageContentsSection>{children}</PageContentsSection>
    </main>
  );
}
