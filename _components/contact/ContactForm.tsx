"use client";

import { useId } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createContactData } from "@/app/_actions/contact";
import Button from "@/_components/ui/Button";

type State = { status: "" | "success" | "error"; message: string };
const initialState: State = { status: "", message: "" };

// フォーム内専用の Submit ボタン（送信中はdisabled）
function SubmitInForm() {
  const { pending } = useFormStatus();
  return (
    <div className="mt-6 flex justify-center">
      <Button
        type="submit" // ← 送信にする
        disabled={pending} // ← 送信中は無効化
        variant="primary"
        size="lg"
        // fullWidth を true にすれば横幅いっぱい。中央寄せなら false のままでOK
      >
        {pending ? "送信中…" : "送信する"}
      </Button>
    </div>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(createContactData, initialState);
  const uid = useId();

  const lastId = `${uid}-lastname`;
  const firstId = `${uid}-firstname`;
  const companyId = `${uid}-company`;
  const emailId = `${uid}-email`;
  const messageId = `${uid}-message`;

  if (state.status === "success") {
    return (
      <div
        className="rounded-md border border-green-200 bg-green-50 p-4 text-green-800"
        role="status"
        aria-live="polite"
      >
        <p>
          お問い合わせいただき、ありがとうございます。
          <br />
          担当者より改めてご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.status === "error" && (
        <div
          className="rounded-md border border-red-200 bg-red-50 p-3 text-red-700"
          role="alert"
          aria-live="polite"
        >
          {state.message || "入力内容をご確認ください。"}
        </div>
      )}

      {/* お名前（姓・名：必須） */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={lastId} className="text-md font-medium text-slate-700">
            姓
            <span className="text-white bg-rose-600 px-2 py-1 text-xs ml-2 inline-block">必須</span>
          </label>
          <input
            id={lastId}
            name="lastname"
            required
            autoComplete="family-name"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-base shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
            placeholder="山田"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={firstId} className="text-md font-medium text-slate-700">
            名
            <span className="text-white bg-rose-600 px-2 py-1 text-xs ml-2 inline-block">必須</span>
          </label>
          <input
            id={firstId}
            name="firstname"
            required
            autoComplete="given-name"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-base shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
            placeholder="太郎"
          />
        </div>
      </div>

      {/* 会社名（任意） */}
      <div className="flex flex-col gap-2">
        <label htmlFor={companyId} className="text-md font-medium text-slate-700">
          会社名
          <span className="text-white bg-gray-400 px-2 py-1 text-xs ml-2 inline-block">任意</span>
        </label>
        <input
          id={companyId}
          name="company"
          autoComplete="organization"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-base shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
          placeholder="株式会社〇〇"
        />
      </div>

      {/* メール（必須） */}
      <div className="flex flex-col gap-2">
        <label htmlFor={emailId} className="text-md font-medium text-slate-700">
          メールアドレス
          <span className="text-white bg-rose-600 px-2 py-1 text-xs ml-2 inline-block">必須</span>
        </label>
        <input
          id={emailId}
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-base shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
          placeholder="example@example.com"
        />
      </div>

      {/* お問い合わせ内容（必須） */}
      <div className="flex flex-col gap-2">
        <label htmlFor={messageId} className="text-md font-medium text-slate-700">
          お問い合わせ内容
          <span className="text-white bg-rose-600 px-2 py-1 text-xs ml-2 inline-block">必須</span>
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          rows={6}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-base shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
          placeholder="お問い合わせの詳細をご記入ください。"
        />
      </div>

      {/* ハニーポット（任意） */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <SubmitInForm />
    </form>
  );
}
