# Technical Design Document (TDD) — TREASIBOX

## 1. REST API Specification (`/api/v1`)
- `GET /api/v1/movies`: Mendapatkan daftar film dengan query filter (`genre`, `year`, `sort`, `search`, `page`, `limit`).
- `GET /api/v1/movies/:id`: Mendapatkan detail film beserta metadata streaming dan film serupa.
- `GET /api/v1/series`: Mendapatkan daftar serial TV dengan season info.
- `GET /api/v1/series/:id`: Mendapatkan detail serial beserta daftar season dan episode.
- `POST /api/v1/watch/progress`: Menyimpan atau mengupdate durasi tontonan pengguna.
- `GET /api/v1/watch/history`: Mengambil riwayat tontonan pengguna aktif.
- `GET /api/v1/watchlist`: Mengambil daftar simpanan pengguna.
- `POST /api/v1/watchlist/toggle`: Menambah/menghapus konten dari daftar simpanan.
- `GET /api/v1/admin/dashboard`: Mendapatkan statistik agregat platform.
- `POST /api/v1/admin/rights/verify`: Mengubah status verifikasi hak lisensi konten.

## 2. Authentication & Authorization Model
- Role: `USER` dan `ADMIN`.
- Admin route (`/admin/*`) dilindungi oleh middleware verifikasi role.
- User session disimpan secara secure dengan cookie token / Supabase auth integration.

