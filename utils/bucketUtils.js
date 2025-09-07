import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek.js";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter.js";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";

dayjs.extend(isoWeek);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);


export function groupByBucket(data, { startDate, endDate, bucket }) {
  let filtered = data;

  if (startDate) {
    filtered = filtered.filter(d => dayjs(d.date).isSameOrAfter(startDate));
  }
  if (endDate) {
    filtered = filtered.filter(d => dayjs(d.date).isSameOrBefore(endDate));
  }

  if (bucket === "day") {
    return filtered.map(d => ({
      startDate: d.date,
      endDate: d.date,
      ...d
    }));
  }

  if (bucket === "week") {
    const grouped = {};
    filtered.forEach(d => {
      const weekStart = dayjs(d.date).startOf("week").format("YYYY-MM-DD");
      const weekEnd = dayjs(d.date).endOf("week").format("YYYY-MM-DD");
      const key = `${weekStart}_${weekEnd}`;

      if (!grouped[key]) {
        grouped[key] = { startDate: weekStart, endDate: weekEnd, added: 0, removed: 0, visits: 0, total: 0 };
      }

      if ("added" in d) {
        grouped[key].added += d.added;
        grouped[key].removed += d.removed;
      }
      if ("visits" in d) {
        grouped[key].visits += d.visits;
      }
      grouped[key].total = d.total; // take latest
    });

    return Object.values(grouped);
  }

  if (bucket === "month") {
    const grouped = {};
    filtered.forEach(d => {
      const monthStart = dayjs(d.date).startOf("month").format("YYYY-MM-DD");
      const monthEnd = dayjs(d.date).endOf("month").format("YYYY-MM-DD");
      const key = `${monthStart}_${monthEnd}`;

      if (!grouped[key]) {
        grouped[key] = { startDate: monthStart, endDate: monthEnd, added: 0, removed: 0, visits: 0, total: 0 };
      }

      if ("added" in d) {
        grouped[key].added += d.added;
        grouped[key].removed += d.removed;
      }
      if ("visits" in d) {
        grouped[key].visits += d.visits;
      }
      grouped[key].total = d.total; // take latest
    });

    return Object.values(grouped);
  }

  return filtered;
}
