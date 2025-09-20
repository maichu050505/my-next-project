import ContactForm from "@/_components/contact/ContactForm";
import Breadcrumbs from "@/_components/ui/Breadcrumbs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs />
      <p className="leading-relaxed mt-10 mb-10">
        ご質問、ご相談は下記フォームよりお問い合わせください。
        <br />
        内容確認後、担当者より改めてご連絡いたします。
      </p>
      <ContactForm />
    </>
  );
}
