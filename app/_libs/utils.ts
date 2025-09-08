import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ja";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");

export const formatDate = (date: string | Date, { pad = false } = {}) => {
  const d = typeof date === "string" ? dayjs.utc(date) : dayjs.utc(date);
  if (!d.isValid()) return ""; // 不正値は空で返す（または null を返してコンポーネント側で非表示）
  // UTC -> JST
  const jst = d.tz("Asia/Tokyo");
  return jst.format(pad ? "YYYY年MM月DD日" : "YYYY年M月D日");
};

// <time> の dateTime 属性用（機械可読 ISO）
export const toIso = (date: string | Date) => {
  const d = dayjs(date);
  return d.isValid() ? d.toISOString() : "";
};
