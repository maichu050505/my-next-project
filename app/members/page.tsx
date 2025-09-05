import Breadcrumbs from "@/_components/ui/Breadcrumbs";
import HeroSection from "@/_components/ui/HeroSection";
import PageContentsSection from "@/_components/ui/PageContentsSection";
import Image from "next/image";

const data = {
  contents: [
    {
      id: "1",
      name: "山田 太郎",
      role: "代表取締役 CEO",
      bio: "フロントエンドと経営の両面からプロジェクトをリードします。",
      image: "/images/members/yamada.jpg",
    },
    {
      id: "2",
      name: "佐藤 花子",
      role: "デザイナー",
      bio: "UI/UXデザインを中心に、ユーザーに寄り添った体験を設計します。",
      image: "/images/members/sato.jpg",
    },
    {
      id: "3",
      name: "鈴木 次郎",
      role: "エンジニア",
      bio: "Next.js と Tailwind CSS を活用した高速な開発が得意です。",
      image: "/images/members/suzuki.jpg",
    },
  ],
};

export default function MembersPage() {
  return (
    <>
      {data.contents.length === 0 ? (
        <p>メンバーが登録されていません。</p>
      ) : (
        <div className="flex flex-col gap-6">
          {data.contents.map((member) => (
            <div
              key={member.id}
              className="flex flex-col md:flex-row items-stretch overflow-hidden gap-6"
            >
              <div className="relative w-full aspect-square md:w-60 md:h-60">
                <Image src={member.image} alt={member.name} fill className="object-cover" />
              </div>
              <div className="flex-1 flex flex-col">
                <h2 className="text-xl mb-1 font-semibold">{member.name}</h2>
                <p className="text-sm text-gray-500">{member.role}</p>
                <p className="mt-3 text-gray-600 text-md flex-1">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
