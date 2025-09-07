import express from "express";
import dayjs from "dayjs";
import { groupByBucket } from "./utils/bucketUtils.js";

const app = express();
const PORT = 8000;

// Mock data
const productsData = [
  { date: "2025-09-01", added: 5, removed: 2, total: 120 },
  { date: "2025-09-02", added: 3, removed: 0, total: 123 },
  { date: "2025-09-03", added: 6, removed: 1, total: 128 }
];

const visitorsData = [
  { date: "2025-09-01", visits: 50, total: 50 },
  { date: "2025-09-02", visits: 75, total: 125 },
  { date: "2025-09-03", visits: 40, total: 165 }
];

// -------- PRODUCTS API --------
app.get("/dashboard/products", (req, res) => {
  const { startDate, endDate, bucket = "day" } = req.query;

  const buckets = groupByBucket(productsData, { startDate, endDate, bucket });
  res.json({
    currentTotal: productsData[productsData.length - 1].total,
    buckets
  });
});

// -------- VISITORS API --------
app.get("/dashboard/visitors", (req, res) => {
  const { startDate, endDate, bucket = "day" } = req.query;

  const buckets = groupByBucket(visitorsData, { startDate, endDate, bucket });
  res.json({
    currentTotal: visitorsData[visitorsData.length - 1].total,
    buckets
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
