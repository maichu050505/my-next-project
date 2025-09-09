import { DefinitionList } from "@/_components/ui/DefinitionList";
import Breadcrumbs from "@/_components/ui/Breadcrumbs";

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs />
      <DefinitionList>
        <DefinitionList.Row term="会社名">株式会社 Sample</DefinitionList.Row>
        <DefinitionList.Row term="所在地">東京都渋谷区◯◯ 1-2-3</DefinitionList.Row>
        <DefinitionList.Row term="設立">2020年4月1日</DefinitionList.Row>
        <DefinitionList.Row term="代表者">代表取締役 山田 太郎</DefinitionList.Row>
        <DefinitionList.Row term="事業内容" withBorder={false}>
          Webサイト制作 / フロントエンド開発 / パフォーマンス最適化
        </DefinitionList.Row>
      </DefinitionList>
    </>
  );
}
