export default function AboutPage() {
  return (
    <main className="bg-white text-gray-800">
      {/* HERO */}
      <section className="relative flex items-center justify-center bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 h-[30svh] min-h-[240px]">
        <div className="relative z-10 mx-auto px-6 text-center">
          <h1 className="font-bold tracking-tight text-white text-3xl sm:text-4xl md:text-5xl">
            会社概要
          </h1>
          <p className="mt-4 text-white/90 text-sm sm:text-base">About Us</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-4xl px-5 sm:px-6 py-16 sm:py-20">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center">
          株式会社 Sample
        </h2>
        <p className="mt-4 text-gray-600 text-center">
          デザインとフロントエンドの力でビジネスを加速させる会社です。
        </p>

        <div className="mt-10 overflow-hidden rounded-2xl bg-white">
          <dl>
            <div className="px-6 py-4 grid grid-cols-3 sm:grid-cols-4 gap-4 border-b border-gray-300">
              <dt className="font-medium text-gray-500">会社名</dt>
              <dd className="col-span-2 sm:col-span-3">株式会社 Sample</dd>
            </div>
            <div className="px-6 py-4 grid grid-cols-3 sm:grid-cols-4 gap-4 border-b border-gray-300">
              <dt className="font-medium text-gray-500">所在地</dt>
              <dd className="col-span-2 sm:col-span-3">東京都渋谷区◯◯ 1-2-3</dd>
            </div>
            <div className="px-6 py-4 grid grid-cols-3 sm:grid-cols-4 gap-4 border-b border-gray-300">
              <dt className="font-medium text-gray-500">設立</dt>
              <dd className="col-span-2 sm:col-span-3">2020年4月1日</dd>
            </div>
            <div className="px-6 py-4 grid grid-cols-3 sm:grid-cols-4 gap-4 border-b border-gray-300">
              <dt className="font-medium text-gray-500">代表者</dt>
              <dd className="col-span-2 sm:col-span-3">代表取締役 xx xx</dd>
            </div>
            <div className="px-6 py-4 grid grid-cols-3 sm:grid-cols-4 gap-4 border-b border-gray-300">
              <dt className="font-medium text-gray-500">事業内容</dt>
              <dd className="col-span-2 sm:col-span-3">
                Webサイト制作 / フロントエンド開発 / パフォーマンス最適化
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
