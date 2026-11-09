# Architecture Design Document (ADD) — TREASIBOX

## 1. High-Level Architecture
TREASIBOX dibangun di atas arsitektur full-stack modern menggunakan Next.js App Router (React Server Components + Client Boundary) yang terintegrasi langsung dengan database PostgreSQL di Supabase melalui Prisma ORM.

```
[ Client Browser ]
        │  (Next.js Client Components: HLS Player, Interactive Carousels, Search)
        ▼
[ Next.js Edge / Node Runtime ]
        │
   ┌────┴───────────────────────────┐
   ▼                                ▼
[ Server Components ]        [ API Route Handlers ]
(Fast Initial Render)        (/api/v1/movies, /watch, /admin)
   │                                │
   └───────────────┬────────────────┘
                   ▼
         [ Prisma ORM Client ]
                   │
                   ▼
      [ Supabase PostgreSQL DB ]
```

## 2. Design Tokens & Styling Architecture
Menggunakan Tailwind CSS v4 dengan variabel custom:
- `--bg-canvas`: `#09090B`
- `--bg-secondary`: `#111114`
- `--surface-card`: `#18181B`
- `--surface-elevated`: `#222228`
- `--accent-primary`: `#7C5CFC`
- `--accent-secondary`: `#A78BFA`
- `--border-subtle`: `rgba(255, 255, 255, 0.08)`

## 3. Streaming & Player Architecture
Player dibangun menggunakan HLS.js dengan fallback native HTML5 video untuk kompatibilitas Safari/iOS. Player menyimpan state playback (detik pemutaran) secara debounced ke `/api/v1/watch/progress` setiap 5 detik dan saat pause/leave.
