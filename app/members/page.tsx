import Image from "next/image";
import { getMembersList } from "../_libs/microcms";

export default async function MembersPage() {
  const data = await getMembersList();
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
                <Image src={member.image.url} alt={member.name} fill className="object-cover" />
              </div>
              <div className="flex-1 flex flex-col">
                <h2 className="text-xl mb-1 font-semibold">{member.name}</h2>
                <p className="text-sm text-gray-500">{member.position}</p>
                <p className="mt-3 text-gray-600 text-md flex-1">{member.profile}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
