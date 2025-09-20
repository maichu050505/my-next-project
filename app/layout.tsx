import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/_components/layout/Header";
import Footer from "@/_components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const PROD_URL = "https://my-next-project-xugx.vercel.app";
const isProd = process.env.VERCEL_ENV === "production"; // 本番デプロイだけ isProd が true になる。

export const metadata: Metadata = {
  metadataBase: new URL(PROD_URL),
  title: {
    template: "%s | コーポレートサイト Sample",
    default: "コーポレートサイト Sample",
  },
  description: "Next.js + microCMS で制作したコーポレートサイト(Sample)です。",
  openGraph: {
    title: "コーポレートサイト Sample",
    description: "Next.js + microCMS で制作したコーポレートサイト(Sample)です。",
    images: ["/ogp.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: isProd ? { index: true, follow: true } : { index: false, follow: false, nocache: true }, // ← 非本番は noindex
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh bg-white text-gray-800">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
