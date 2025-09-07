Implementation.md
  Project Overview

This project implements a backend-only Node.js case study for a Dashboard API.
It exposes two endpoints:

Products Dashboard API – /dashboard/products

Visitors Dashboard API – /dashboard/visitors

The APIs support date range queries and bucket-based grouping (day, week, month).
The backend is built with Express.js and tested using Postman.
No frontend is required.

⚙️ Tech Stack

Node.js (v18+)

Express.js for HTTP server

Day.js for date manipulation

Mock dataset for demo purposes ( replaced with DB integration later)


📂 Project Structure
dashboard-api/
├── package.json
├── server.js              # Express server & API routes
├── utils/
│   └── bucketUtils.js     # Utility for bucket-based grouping
├── Implementation.md      
├── .gitignore


Products
[
  { "date": "2025-09-01", "added": 5, "removed": 2, "total": 120 },
  { "date": "2025-09-02", "added": 3, "removed": 0, "total": 123 },
  { "date": "2025-09-03", "added": 6, "removed": 1, "total": 128 }
]


Visitors
[
  { "date": "2025-09-01", "visits": 50, "total": 50 },
  { "date": "2025-09-02", "visits": 75, "total": 125 },
  { "date": "2025-09-03", "visits": 40, "total": 165 }

]

tilities – bucketUtils.js

The utility file is responsible for grouping raw data into buckets (day, week, month).
It uses Day.js with plugins (isoWeek, isSameOrAfter, isSameOrBefore) for date handling.

🔧 How It Works
Date Filtering
If startDate is provided → keeps only records on/after that date.
If endDate is provided → keeps only records on/before that date.
Day Bucket
Returns records one per day, with exact date as startDate and endDate.
Week Bucket
Groups all entries from the same ISO week.
Calculates totals (added, removed, visits).
Sets startDate to week start and endDate to week end.
Month Bucket
Groups all entries from the same month.
Aggregates totals and sets startDate/endDate to the first and last day of the month.




1. Products Dashboard
Endpoint:
GET /dashboard/products

Sample Response (bucket=day):

{
  "currentTotal": 128,
  "buckets": [
    {
      "startDate": "2025-09-01",
      "endDate": "2025-09-01",
      "added": 5,
      "removed": 2,
      "total": 120
    },
    {
      "startDate": "2025-09-02",
      "endDate": "2025-09-02",
      "added": 3,
      "removed": 0,
      "total": 123
    }
  ]
}


2. Visitors Dashboard
Endpoint:
GET /dashboard/visitors


Sample Response (bucket=week):

{
  "currentTotal": 165,
  "buckets": [
    {
      "startDate": "2025-09-01",
      "endDate": "2025-09-07",
      "visits": 165,
      "total": 165
    }
  ]
}

Bucket Logic

Implemented in utils/bucketUtils.js.
Day bucket → groups per day.
Week bucket → groups per week (Monday–Sunday).
Month bucket → groups per calendar month.
Each bucket response includes startDate and endDate.

How to Run

Install dependencies:
npm install


Start server:
npm start


Server will run at:
http://localhost:8000

5. How to Test
Use Postman or Browser:
Products by day:
GET http://localhost:8000/dashboard/products?bucket=day

Visitors by week (with range):
GET http://localhost:8000/dashboard/visitors?bucket=week&startDate=2025-09-01&endDate=2025-09-07

Products by month:
GET http://localhost:8000/dashboard/products?bucket=month
