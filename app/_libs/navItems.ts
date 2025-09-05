export const navItems = [
  { href: "/about", label: "会社概要" },
  { href: "/members", label: "メンバー" },
  { href: "/news", label: "お知らせ" },
  { href: "/works", label: "制作実績" },
  { href: "/contact", label: "お問い合わせ" },
];

// パンくず用にラベルをすぐ取れる形
export const labelMap: Record<string, string> = Object.fromEntries(
  navItems.map((item) => [item.href.replace("/", ""), item.label])
);
