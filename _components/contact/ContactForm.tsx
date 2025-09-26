"use client";

import { useRef, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { useId } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createContactData } from "@/app/_actions/contact";
import Button from "@/_components/ui/Button";

type State = { status: "" | "success" | "error"; message: string };
const initialState: State = { status: "", message: "" };

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;
const RECAPTCHA_ACTION = "contact_submit"; // 任意のアクション名。Server側でも検証

// フォーム内専用の Submit ボタン（送信中はdisabled）
function SubmitInForm({ verifying = false }: { verifying?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <div className="mt-6 flex justify-center">
      <Button
        type="submit" // ← 送信にする
        disabled={pending || verifying} // ← 取得中も無効化
        variant="primary"
        size="lg"
        // fullWidth を true にすれば横幅いっぱい。中央寄せなら false のままでOK
      >
        {pending || verifying ? "送信中…" : "送信する"}
      </Button>
    </div>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(createContactData, initialState);
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const captchaTokenRef = useRef<HTMLInputElement>(null);
  const [armed, setArmed] = useState(false); // 2段階送信用
  const [verifying, setVerifying] = useState(false); // v3トークン取得中

  // 初回マウント時の時刻を固定
  const renderedAtRef = useRef<number>(Date.now());

  const lastId = `${uid}-lastname`;
  const firstId = `${uid}-firstname`;
  const companyId = `${uid}-company`;
  const emailId = `${uid}-email`;
  const messageId = `${uid}-message`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 1回目: reCAPTCHAトークン取得して再送
    if (!armed) {
      e.preventDefault();
      try {
        setVerifying(true);
        await ensureRecaptchaLoaded(RECAPTCHA_SITE_KEY);
        // @ts-ignore
        const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
          action: RECAPTCHA_ACTION,
        });
        if (!token) throw new Error("empty token");
        captchaTokenRef.current!.value = token;
        setArmed(true);
        formRef.current?.requestSubmit(); // 2回目送信
      } catch {
        alert("検証に失敗しました。時間をおいて再度お試しください。");
      } finally {
        setVerifying(false);
      }
      return;
    }
    // 2回目: 実送信
    setArmed(false);
    sendGAEvent({ event: "contact", value: "submit" });
  };

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
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      className="space-y-6"
      autoComplete="off"
    >
      {state.status === "error" && (
        <div
          className="rounded-md border border-red-200 bg-red-50 p-3 text-red-700"
          role="alert"
          aria-live="polite"
        >
          {state.message || "入力内容をご確認ください。"}
        </div>
      )}
      {/* --- HoneyPot（画面外に追い出す） --- */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden"
      >
        <label htmlFor={`${uid}-hp-website`}>あなたのWebサイト</label>
        <input
          id={`${uid}-hp-website`}
          name="hp_website"
          autoComplete="off"
          tabIndex={-1}
          inputMode="text"
        />
        {/* タイムベース罠：フォーム表示からの経過時間を送る */}
        <input type="hidden" name="hp_timestamp" value={String(renderedAtRef.current)} />
      </div>
      {/* reCAPTCHA トークン受け渡し（Server Actionsへ） */}
      <input ref={captchaTokenRef} type="hidden" name="captcha_token" />
      {/* provider 固定不要（v3 only のため） */}
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
      {/* ハニーポット（任意）古いボット対策用 */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <SubmitInForm verifying={verifying} />

      {/* reCAPTCHA 表記 */}
      <p className="recaptcha-notice mt-4 text-center text-xs text-slate-500">
        このサイトは reCAPTCHA によって保護されており、
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-slate-700 ml-1"
        >
          Google プライバシーポリシー
        </a>
        と
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-slate-700 ml-1"
        >
          利用規約
        </a>
        が適用されます。
      </p>
    </form>
  );
}

/** reCAPTCHA スクリプトの遅延ロード & ready */
function ensureRecaptchaLoaded(siteKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject();
    // すでに読み込み済み？
    // @ts-ignore
    if (window.grecaptcha?.execute) {
      // @ts-ignore
      return window.grecaptcha.ready(() => resolve());
    }
    // 動的ロード
    const src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = () => {
        // @ts-ignore
        window.grecaptcha.ready(() => resolve());
      };
      s.onerror = () => reject();
      document.head.appendChild(s);
    } else {
      // @ts-ignore
      window.grecaptcha?.ready ? window.grecaptcha.ready(() => resolve()) : resolve();
    }
  });
}
