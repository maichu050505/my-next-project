import HeroSection from "@/_components/ui/HeroSection";
import PageContentsSection from "@/_components/ui/PageContentsSection";

export const metadata = {
  title: "会社概要",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <main className="bg-white text-gray-800">
      <HeroSection
        title="会社概要"
        subtitle="About Us"
        background={{ type: "gradient" }} // 既定: sky→blue→indigo
        heightClass="h-[30svh] min-h-[240px]"
      />

      <PageContentsSection>{children}</PageContentsSection>
    </main>
  );
}
