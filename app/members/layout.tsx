import HeroSection from "@/_components/ui/HeroSection";
import PageContentsSection from "@/_components/ui/PageContentsSection";

export const metadata = {
  title: "メンバー",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <main className="bg-white text-gray-800">
      <HeroSection
        title="メンバー"
        subtitle="Members"
        background={{ type: "gradient" }} // 既定: sky→blue→indigo
        heightClass="h-[30svh] min-h-[240px]"
      />
      <PageContentsSection>{children}</PageContentsSection>
    </main>
  );
}
