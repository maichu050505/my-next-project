import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  title?: string;
  description?: string;
  align?: "center" | "left";
  maxWidthClass?: string; // 既定: max-w-4xl
  paddingXClass?: string; // 既定: px-5 sm:px-6
  paddingYClass?: string; // 既定: py-16 sm:py-20
  className?: string;
  children?: ReactNode;
};

export default function PageContentsSection({
  title,
  description,
  align = "center",
  maxWidthClass = "max-w-4xl",
  paddingXClass = "px-5 sm:px-6",
  paddingYClass = "",
  className,
  children,
}: Props) {
  return (
    <section className={clsx("mx-auto", maxWidthClass, paddingXClass, paddingYClass, className)}>
      {(title || description) && (
        <header className={clsx(align === "center" ? "text-center" : "text-left")}>
          {title && <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">{title}</h2>}
          {description && <p className="mt-4 text-gray-600">{description}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
