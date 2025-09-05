import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  heightClass?: string; // 例: "h-[30svh] min-h-[240px]"
  background?:
    | { type: "gradient"; from?: string; via?: string; to?: string }
    | { type: "image"; url: string; overlay?: string };
  children?: ReactNode;
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
  className,
}: Props) {
  const isGradient = background.type === "gradient";
  const isImage = background.type === "image";

  const alignWrap = clsx(
    "relative flex",
    align === "center" && "items-center justify-center text-center",
    align === "left" && "items-end justify-start text-left"
  );

  const bgClass = clsx(
    isGradient && "bg-gradient-to-r",
    isGradient && (background.from ?? "from-sky-400"),
    isGradient && (background.via ?? "via-blue-500"),
    isGradient && (background.to ?? "to-indigo-600")
  );

  return (
    <section
      className={clsx(alignWrap, bgClass, heightClass, className)}
      style={
        isImage
          ? {
              backgroundImage: `url(${background.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {isImage && (
        <div
          className={clsx("absolute inset-0", background.overlay ?? "bg-black/40")}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 mx-auto px-6">
        <h1 className="font-bold tracking-tight text-white text-3xl sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 text-white/90 text-sm sm:text-base">{subtitle}</p>}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </section>
  );
}
