export default function ResultsSkeleton({
  showHeading = false,
  count = 10,
}: {
  showHeading?: boolean;
  count?: number;
}) {
  return (
    <>
      {showHeading && <div className="mt-6 sm:mt-8 h-7 w-64 rounded bg-gray-200" />}

      <ul className="mt-6 sm:mt-8 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm animate-pulse">
        {Array.from({ length: count }).map((_, i) => (
          <li key={i} className="px-5 py-4">
            {/* PC行（左：日付 / 中央：カテゴリ+タイトル / 右：NEW） */}
            <div className="hidden sm:flex sm:items-center sm:gap-4">
              <div className="h-4 w-28 rounded bg-gray-200" />
              <div className="h-6 w-20 rounded-full bg-gray-200" />
              <div className="h-4 flex-1 rounded bg-gray-200" />
              <div className="h-6 w-10 rounded-full bg-gray-200" />
            </div>

            {/* モバイル行（1行目：日付 / 2行目：カテゴリ+タイトル） */}
            <div className="sm:hidden space-y-2">
              <div className="h-3 w-24 rounded bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className="h-5 w-16 rounded-full bg-gray-200" />
                <div className="h-4 flex-1 rounded bg-gray-200" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
