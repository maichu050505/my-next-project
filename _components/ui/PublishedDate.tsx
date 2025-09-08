import { formatDate, toIso } from "@/app/_libs/utils";

type Props = { date: string | Date; className?: string; srLabel?: string };

export default function PublishedDate({ date, className, srLabel }: Props) {
  const label = formatDate(date); // 例: "2025年9月7日"
  const iso = toIso(date);
  if (!label) return null;

  return (
    <time dateTime={iso} className={className} aria-label={srLabel ?? `掲載日 ${label}`}>
      {label}
    </time>
  );
}
