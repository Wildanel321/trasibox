# TREASIBOX — Project Context & Engineering Standards

## 1. Project Purpose
TREASIBOX adalah platform streaming film dan serial TV modern berkualitas bioskop (*cinematic streaming platform*) yang berfokus pada kemudahan akses, visual gelap elegan, integrasi data streaming nyata (HLS), serta sistem kurasi dan hak distribusi konten (*distribution rights management*) yang transparan dan legal.

## 2. Key Architecture
- **Framework:** Next.js 15 (App Router, React 19, TypeScript strict mode)
- **Styling & Design System:** Tailwind CSS v4, Lucide React, Custom Dark Cinematic Tokens
- **Database:** Supabase PostgreSQL via Prisma ORM
- **Streaming Engine:** HLS.js custom player with adaptive bitrate, multi-subtitle, playback memory, and keyboard navigation
- **Admin System:** Content ingest, TMDB metadata import, processing queue monitoring, and rights review workflow

## 3. Directory Structure
```
trasibox/
├── docs/                   # Full engineering & requirements documentation
├── prisma/                 # Prisma schema & seed scripts (Supabase PostgreSQL)
├── public/                 # Static assets & sample media
├── src/
│   ├── app/                # Next.js App Router (User & Admin routes, API v1)
│   ├── components/         # Design System (layout, player, cards, admin, UI)
│   ├── lib/                # Database client, Supabase helpers, utils, types
│   └── hooks/              # Custom reusable React hooks
├── GEMINI.md               # Project-specific operating context
├── LEARNINGS.gemini.md     # Learning and PRAR reflection log
└── README.md               # User & developer guide
```

## 4. Local Setup
1. Copy `.env.example` to `.env` and set `DATABASE_URL` (Supabase Connection Pooler / Direct URL).
2. Install dependencies: `npm install`
3. Generate Prisma client & sync schema: `npx prisma db push` / `npx prisma generate`
4. Seed mock & verified public-domain films: `npm run seed`
5. Run dev server: `npm run dev`

