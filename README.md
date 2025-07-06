# CongKong Matching Dashboard

**Live Demo:** https://cong-kong-assignment.vercel.app/  
**Source Code:** https://github.com/Harshit-Dhundale/CongKong-Assignment

## Overview

This project is a full-stack, real-time KPI dashboard for CongKong Friends’ AI-powered event matching platform. It demonstrates:

- A responsive, mobile-first UI built with Next.js 14, React and Tailwind CSS.
- Real-time data visualization using Supabase subscriptions and Recharts.
- Serverless API routes for AI match generation.
- A clean Postgres schema in Supabase for profiles, metrics, activity logs, matches, and meetings.
- Secure public and service-role Supabase clients with RLS policies.

## Key Deliverables

- **Real-Time KPI Cards**  
  Six metrics (Total Participants, Real-Time Demified, Total Matches, Average Satisfaction, Total Meetings, Peak Concurrency) auto-update via Supabase `kpi_metrics` subscriptions.
- **Activity by Time Chart**  
  Participant login and meeting-start counts plotted over the day, with interactive tooltips, powered by the `activity_logs` table.
- **Insight Cards**  
  Data-driven notifications surfaced by simple business rules (e.g. profile completion alerts).
- **Context Panel**  
  Top 5 AI-generated matches and next 5 scheduled meetings, joined from `matches`, `profiles`, and `meetings` tables with explicit FK aliases and deduplication logic.
- **AI Matching API**  
  A `/api/generate-matches` route that applies a basic scoring algorithm server-side and writes back to Supabase.
- **Full Supabase Integration**  
  - Public (anon) and server-side (service-role) clients  
  - Row-Level Security policies allowing safe reads  
  - Seed scripts and SQL for dummy data population

## Tech Stack

- **Framework:** Next.js 14 (App Router)  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS  
- **Charts:** Recharts  
- **Backend as a Service:** Supabase (Postgres, Auth, Realtime)  
- **Hosting:** Vercel  
- **Icons:** Heroicons

## Getting Started

### Prerequisites

- Node.js ≥ 18  
- npm or yarn  
- A Supabase project (free tier is fine)

### Environment Variables

Create a `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GEMINI_API_KEY=your-google-gemini-key
````

### Install & Run Locally

```bash
git clone https://github.com/Harshit-Dhundale/CongKong-Assignment.git
cd CongKong-Assignment
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
.
├── app/
│   ├── api/
│   │   └── generate-matches/route.ts
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   ├── KPIGrid.tsx
│   │   ├── ActivityChart.tsx
│   │   └── ContextPanel.tsx
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── supabase.ts          # Public client
│   └── supabaseAdmin.ts     # Service-role client
├── scripts/
│   └── seedAll.js
├── .env.local.example
├── next.config.js
├── tailwind.config.js
└── README.md
```

## Challenge & Solution

**Challenge:** Embedding `profiles` into `matches` and `meetings` when both tables have two FKs to `profiles`, causing ambiguous joins and TypeScript type conflicts.
**Solution:** Used explicit column aliases in Supabase `.select()` calls (e.g. `matched_profile:matched_profile_id(id, full_name)`), updated TS interfaces accordingly, and added deduplication logic so each profile appears only once.

