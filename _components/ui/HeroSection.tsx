import { ReactNode } from "react";

type Props = {
  /** ページの主見出し（h1） */
  title: string;
  /** 補助テキスト（英語表記など） */
  subtitle?: string;
  /** 中央 / 左寄せ 切り替え */
  align?: "center" | "left";
  /** 高さ（svh 対応） */
  heightClass?: string; // 例: "h-[30svh] min-h-[240px]"
  /** 背景: グラデーション or 画像 */
  background?:
    | { type: "gradient"; from?: string; via?: string; to?: string }
    | { type: "image"; url: string; overlay?: string };
  /** 追加の子要素（パンくず・小要素などを置く） */
  children?: ReactNode;
  /** 外から追加クラス */
  className?: string;
};

export default function HeroSection({
  title,
  subtitle,
  align = "center",
  heightClass = "h-[30svh] min-h-[240px]",
  background = {
    type: "gradient",
    from: "from-sky-400",
    via: "via-blue-500",
    to: "to-indigo-600",
  },
  children,
  className = "",
}: Props) {
  const alignWrap =
    align === "center"
      ? "items-center justify-center text-center"
      : "items-end justify-start text-left";

  const bgClass =
    background.type === "gradient"
      ? `bg-gradient-to-r ${background.from ?? "from-sky-400"} ${
          background.via ?? "via-blue-500"
        } ${background.to ?? "to-indigo-600"}`
      : "";

  return (
    <section
      className={`relative flex ${alignWrap} ${bgClass} ${heightClass} ${className}`}
      style={
        background.type === "image"
          ? {
              backgroundImage: `url(${background.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {/* 画像背景用のオーバーレイ */}
      {background.type === "image" && (
        <div
          className={`absolute inset-0 ${background.overlay ?? "bg-black/40"}`}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 mx-auto px-6">
        <h1 className="font-bold tracking-tight text-white text-3xl sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 text-white/90 text-sm sm:text-base">{subtitle}</p>}

        {/* パンくず/タグなど任意で差し込める */}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </section>
  );
}
