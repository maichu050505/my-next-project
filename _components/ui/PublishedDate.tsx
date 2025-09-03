type DateProps = {
  date: string; // "2025/09/03" のような形式
  className?: string;
  srLabel?: string; // スクリーンリーダー用ラベル
};

// "2025/09/03" -> "2025-09-03" (<time dateTime> 用)
const normalizeDate = (s: string) => s.replaceAll("/", "-");

// "2025/09/03" → "2025年9月3日"
const formatDate = (s: string) => {
  const [yyyy, mm, dd] = s.split("/");
  return `${yyyy}年${Number(mm)}月${Number(dd)}日`;
};

export default function PublishedDate({ date, className, srLabel }: DateProps) {
  return (
    <time
      dateTime={normalizeDate(date)}
      className={className}
      aria-label={srLabel ? srLabel : `掲載日 ${formatDate(date)}`}
    >
      {formatDate(date)}
    </time>
  );
}
