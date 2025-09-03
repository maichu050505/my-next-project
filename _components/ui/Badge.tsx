type BadgeVariant = "sky" | "indigo" | "gray" | "rose" | "emerald";
type BadgeTone = "solid" | "soft" | "outline";
type BadgeSize = "xs" | "sm";

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant; // ← rose/emerald 追加
  tone?: BadgeTone;
  size?: BadgeSize;
  className?: string;
};

const base = "inline-flex items-center rounded-full font-medium whitespace-nowrap";
const sizes: Record<BadgeSize, string> = {
  xs: "text-[11px] px-2 py-0.5",
  sm: "text-xs px-2.5 py-0.5",
};

const variants: Record<BadgeVariant, Record<BadgeTone, string>> = {
  sky: {
    solid: "bg-sky-600 text-white",
    soft: "bg-sky-50 text-sky-700",
    outline: "border border-sky-300 text-sky-700",
  },
  indigo: {
    solid: "bg-indigo-600 text-white",
    soft: "bg-indigo-50 text-indigo-700",
    outline: "border border-indigo-300 text-indigo-700",
  },
  gray: {
    solid: "bg-gray-700 text-white",
    soft: "bg-gray-100 text-gray-700",
    outline: "border border-gray-300 text-gray-700",
  },
  // ★ 追加カラー
  rose: {
    solid: "bg-rose-600 text-white",
    soft: "bg-rose-100 text-rose-700",
    outline: "border border-rose-300 text-rose-700",
  },
  emerald: {
    solid: "bg-emerald-600 text-white",
    soft: "bg-emerald-100 text-emerald-700",
    outline: "border border-emerald-300 text-emerald-700",
  },
};

export default function Badge({
  children,
  variant = "sky",
  tone = "soft",
  size = "xs",
  className,
}: BadgeProps) {
  return (
    <span
      className={[base, sizes[size], variants[variant][tone], className].filter(Boolean).join(" ")}
    >
      {children}
    </span>
  );
}
