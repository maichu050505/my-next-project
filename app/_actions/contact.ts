"use server";
import "server-only";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type ActionResult = { status: "success" | "error"; message: string };

if (process.env.NODE_ENV !== "production") {
  console.log("[contact] env", {
    hasPortalId: !!process.env.HUBSPOT_PORTAL_ID,
    hasFormId: !!process.env.HUBSPOT_FORM_ID,
    runtime: process.env.NEXT_RUNTIME, // "nodejs" になるはず
  });
}

export async function createContactData(_prev: unknown, formData: FormData): Promise<ActionResult> {
  // 追加: ハニーポット検証
  const hpWebsite = (formData.get("hp_website") || "").toString().trim();
  const hpTimestamp = Number((formData.get("hp_timestamp") || "").toString());

  if (hpWebsite) {
    // URLや@を含むならより強いボット判定
    // if (/(https?:\/\/|www\.|@)/i.test(hpWebsite)) { ... } ← 任意
    return { status: "error", message: "送信に失敗しました。" };
  }

  const elapsed = Number.isFinite(hpTimestamp) ? Date.now() - hpTimestamp : 0;
  // 2.5秒未満ならボット疑義
  if (!hpTimestamp || elapsed < 2500 || elapsed < 0) {
    return { status: "error", message: "送信に失敗しました。" };
  }

  // --- reCAPTCHA v3 verify（追加） ---
  const token = (formData.get("captcha_token") || "").toString();
  if (!token) {
    return { status: "error", message: "送信に失敗しました。" };
  }
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error("Missing RECAPTCHA_SECRET_KEY");
    return { status: "error", message: "送信設定が未完了です。" };
  }

  const params = new URLSearchParams();
  params.set("secret", secret);
  params.set("response", token);
  // remoteip が取れる場合は params.set("remoteip", ip);

  const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  type ReCaptchaResult = {
    success: boolean;
    score?: number;
    action?: string;
    challenge_ts?: string;
    hostname?: string;
    "error-codes"?: string[];
  };
  const result: ReCaptchaResult = await verifyRes.json();

  if (!result.success) {
    console.error("reCAPTCHA failed:", result["error-codes"]);
    return { status: "error", message: "送信に失敗しました。" };
  }

  // スコアと action をチェック（閾値は 0.5〜0.7 から開始推奨）
  if ((result.score ?? 0) < 0.5 || result.action !== "contact_submit") {
    console.warn("reCAPTCHA low score or wrong action:", result);
    return { status: "error", message: "送信に失敗しました。" };
  }

  const raw = {
    lastname: (formData.get("lastname") || "").toString().trim(),
    firstname: (formData.get("firstname") || "").toString().trim(),
    company: (formData.get("company") || "").toString().trim(), // 任意
    email: (formData.get("email") || "").toString().trim(),
    message: (formData.get("message") || "").toString().trim(),
    website: (formData.get("website") || "").toString().trim(), // ハニーポット
  };

  if (raw.website) return { status: "error", message: "送信に失敗しました。" };

  if (!raw.lastname) return { status: "error", message: "姓を入力してください" };
  if (!raw.firstname) return { status: "error", message: "名を入力してください" };
  // 会社名は任意なので検証しない
  if (!raw.email) return { status: "error", message: "メールアドレスを入力してください" };
  if (!validateEmail(raw.email))
    return { status: "error", message: "メールアドレスの形式が誤っています" };
  if (!raw.message) return { status: "error", message: "メッセージを入力してください" };

  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_FORM_ID;
  if (!portalId || !formId) {
    console.error("HubSpot env missing");
    return { status: "error", message: "送信設定が未完了です。" };
  }

  // HubSpotのフォーム定義に合わせて送信
  const fields: Array<{ objectTypeId: string; name: string; value: string }> = [
    { objectTypeId: "0-1", name: "lastname", value: raw.lastname },
    { objectTypeId: "0-1", name: "firstname", value: raw.firstname },
    { objectTypeId: "0-1", name: "email", value: raw.email },
    { objectTypeId: "0-1", name: "message", value: raw.message },
  ];
  if (raw.company) {
    fields.push({ objectTypeId: "0-1", name: "company", value: raw.company });
  }

  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 10_000);

    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields }),
        cache: "no-store",
        signal: controller.signal,
      }
    );
    clearTimeout(t);

    if (!res.ok) {
      const text = await res.text();
      console.error("HubSpot error:", res.status, text);
      return { status: "error", message: "お問い合わせに失敗しました" };
    }

    try {
      await res.json();
    } catch {
      /* HubSpotが空JSONのこともある */
    }

    return { status: "success", message: "OK" };
  } catch (e) {
    console.error(e);
    return { status: "error", message: "お問い合わせに失敗しました" };
  }
}
