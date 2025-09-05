import { ReactNode } from "react";
import clsx from "clsx";

export function DefinitionList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mt-10 overflow-hidden rounded-2xl bg-white", className)}>
      <dl>{children}</dl>
    </div>
  );
}

type RowProps = {
  term: ReactNode;
  children: ReactNode;
  withBorder?: boolean; // 最終行などで区切り線を消したいとき
};

DefinitionList.Row = function Row({ term, children, withBorder = true }: RowProps) {
  return (
    <div
      className={clsx(
        "px-6 py-4 grid grid-cols-3 sm:grid-cols-4 gap-4",
        withBorder && "border-b border-gray-300"
      )}
    >
      <dt className="font-medium text-gray-500">{term}</dt>
      <dd className="col-span-2 sm:col-span-3">{children}</dd>
    </div>
  );
};
