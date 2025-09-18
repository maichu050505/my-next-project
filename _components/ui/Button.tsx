import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string; // ある場合は <Link>、なければ <button>
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  arrow?: boolean; // 右端の矢印を出すか
  fullWidth?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// クラス名を安全に結合する
function cn(...classes: (string | false | null | undefined)[]) {
  // falsy 値（false, null, undefined, ""）を全部削除、truthy なもの（文字列）は残す、残ったクラス名を空白区切りで結合
  return classes.filter(Boolean).join(" ");
}

export default function Button({
  children,
  href,
  variant = "secondary",
  size = "md",
  arrow = true,
  fullWidth = false,
  className,
  ...buttonProps
}: ButtonProps) {
  const base =
    "group inline-grid grid-cols-[1fr_auto_1fr] items-center rounded-full " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 transition " +
    "disabled:opacity-60 disabled:cursor-not-allowed";

  const sizing =
    size === "lg"
      ? "px-6 py-3 min-w-[300px] min-h-[56px] text-[16px]"
      : "px-6 py-3 min-w-[270px] min-h-[47px] text-[14px]";

  const width = fullWidth ? "w-full" : "w-auto";

  const variantClass =
    variant === "primary"
      ? // ▼ 単色の青ボタン（グラデ削除）
        "text-white font-semibold shadow border border-transparent " +
        "bg-sky-600 hover:bg-sky-700 active:bg-sky-800"
      : // 一覧ボタン：白ベース・水色の枠
        "border border-sky-300 bg-white text-sky-600 font-semibold shadow-sm " + "hover:bg-sky-50";

  const contentLeftSpacer = (
    <span className="w-5 h-5 justify-self-start opacity-0" aria-hidden="true" />
  );

  const Arrow = arrow ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-5 h-5 justify-self-end transition-transform group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  ) : (
    <span className="w-5 h-5 justify-self-end opacity-0" aria-hidden="true" />
  );

  const classes = cn(base, sizing, width, variantClass, className);

  const content = (
    <>
      {contentLeftSpacer}
      <span className="text-center">{children}</span>
      {Arrow}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
