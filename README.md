# Next.js × microCMS Corporate Site

このリポジトリは、Next.js と microCMS を利用して構築した  
デザイン会社を想定したコーポレートサイトのポートフォリオです。

## 使用技術

- **Framework**: Next.js v15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: microCMS
- **Deployment**: Vercel

## 実装機能

- トップページ／会社概要／メンバー／ニュース／お問い合わせページ
- microCMS 管理画面から編集可能：
  - **メンバー**ページ（メンバー情報を CMS から取得して表示）
  - **ニュース**ページ（一覧・詳細・カテゴリ絞り込み・ページネーション・検索対応）
- meta タグ・OGP・サイトマップなどの SEO 最適化
- お問い合わせフォーム（HubSpot 連携 + Honeypot + reCAPTCHA）
- Lighthouse パフォーマンス・SEO・アクセシビリティ 90 点以上達成
- アクセシビリティ考慮（aria 属性、カラーコントラスト対応）

## スクリーンショット

（ここに `public/screenshots/` に保存したスクショを貼る）

例:
![トップページ](./public/screenshots/top.png)
![記事一覧](./public/screenshots/blog.png)
![お問い合わせフォーム](./public/screenshots/contact.png)

## デモサイト

https://my-next-project-xugx.vercel.app/

## 学習ポイント

- Next.js の App Router によるルーティング・サーバーコンポーネント設計
- microCMS REST API とのデータ取得
- 問い合わせフォームでの外部サービス連携とセキュリティ対策
- Lighthouse 監査を通じたパフォーマンス・SEO・アクセシビリティ改善
