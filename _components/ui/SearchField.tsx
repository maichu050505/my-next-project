"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

type Props = {
  /** 遷移先のベースURL（既定: "/news/search"） */
  baseHref?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  size?: "sm" | "md" | "lg";
  autoFocus?: boolean;
  name?: string; // inputのname
};

const sizeMap = {
  sm: "h-9 text-sm px-9 rounded-lg",
  md: "h-10 text-base px-10 rounded-xl",
  lg: "h-12 text-base px-12 rounded-xl",
} as const;

export default function SearchField({
  baseHref = "/news/search",
  placeholder = "キーワードで検索",
  className,
  defaultValue,
  size = "md",
  autoFocus,
  name = "q",
}: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  // /news/search に配置したときは URL の q を初期値に使える
  const initial = defaultValue ?? sp.get("q") ?? "";
  const [value, setValue] = useState(initial);

  // Enter 送信で /news/search?q=... へ遷移
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const q = value.trim();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    const qs = params.toString();
    router.push(qs ? `${baseHref}?${qs}` : baseHref);
  };

  const onClear = () => {
    setValue("");
    router.push(baseHref); // q を外して検索トップへ
  };

  return (
    <div className="mt-6">
      <form role="search" onSubmit={onSubmit} className={clsx("relative", className)}>
        <label htmlFor="search-input" className="sr-only">
          ニュースを検索
        </label>

        {/* アイコン */}
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-3.5-3.5" />
          </svg>
        </span>

        <input
          id="search-input"
          type="search"
          inputMode="search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={clsx(
            "w-full bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-600",
            "pr-10 pl-10",
            sizeMap[size]
          )}
        />

        {/* クリア */}
        {value && (
          <button
            type="button"
            onClick={onClear}
            aria-label="検索語をクリア"
            className="absolute inset-y-0 right-2 my-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </form>
    </div>
  );
}
