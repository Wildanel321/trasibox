# TREASIBOX — Cinematic Streaming Platform

Platform web streaming film dan serial TV dengan pengalaman visual sinematik setara bioskop tanpa tier berlangganan (*zero paywall / zero freemium*). Seluruh pengguna terdaftar memperoleh hak akses penuh dengan sistem administrasi terpisah untuk tata kelola hak siar dan pemrosesan media HLS.

---

## 🎨 Visual Identity & Design System
- **Background Utama:** `#09090B` (Cinematic Deep Canvas)
- **Background Sekunder:** `#111114`
- **Surface / Card:** `#18181B`
- **Surface Elevated:** `#222228`
- **Primary Accent:** `#7C5CFC` (Purple Accent)
- **Secondary Accent:** `#A78BFA`
- **Teks Primer:** `#FAFAFA`
- **Border:** `rgba(255, 255, 255, 0.08)`
- **Poster Ratio:** 2:3 (`aspect-[2/3]`)
- **Backdrop Ratio:** 16:9 (`aspect-video`)

---

## 🚀 Fitur Utama & Halaman

### End-User Experience
1. **Homepage (`/`)**: Cinematic Hero Premiere, Continue Watching carousel, Trending Movies, Popular Series, Genre Collections, dan Footer informatif.
2. **Katalog Film (`/movies`)**: Grid responsif adaptif (5–7 kolom desktop, 3–5 tablet, 2–3 mobile), filter multi-genre, filter tahun, pengurutan (Rating, Popularitas, Tahun), dan debounced live search.
3. **Katalog Serial TV (`/series`)**: Grid serial dengan info jumlah season, episode, dan rating.
4. **Detail Film (`/movies/[id]`)**: Hero backdrop resolusi tinggi, 2:3 poster, rating, sinopsis lengkap, daftar pemeran & kru, tombol putar, dan rekomendasi film serupa.
5. **Detail Serial (`/series/[id]`)**: Tab selektor season, thumbnail episode 16:9, durasi, dan tautan tonton langsung.
6. **Pemutar Video HLS (`/watch/[id]`)**: Player kustom HLS.js dengan adaptive bitrate, pengatur kecepatan (0.5x–2x), multi-subtitle WebVTT, pintasan keyboard (Spasi/K, M, F, Panah Kiri/Kanan 10s), dan auto-sync progres tontonan.
7. **Pencarian Cerdas (`/search`)**: Pencarian instan debounced dengan filter Film vs Serial dan riwayat pencarian.
8. **Daftar Tontonan (`/my-list`)**: Koleksi film/serial yang disimpan secara real-time.
9. **Riwayat Tontonan (`/history`)**: Progres visual playback tontonan dan opsi hapus riwayat.
10. **Autentikasi (`/login`, `/register`, `/forgot-password`)**: Desain minimalis elegan dengan toggle visibilitas sandi dan validasi formulir.

### Admin Back-Office Panel (`/admin`)
1. **Dashboard Operasional (`/admin`)**: Statistik terverifikasi (total film, total serial, total user, utilisasi storage Supabase, antrean encoding aktif).
2. **Katalog Film (`/admin/movies`)**: Tambah judul baru, pratinjau stream, hapus judul, dan tombol toggle publikasi dengan proteksi hak siar.
3. **Serial TV (`/admin/series`)**: Kelola serial, season, dan episode.
4. **TMDB Ingest Engine (`/admin/import`)**: Tarik metadata film langsung dari TMDB dan pratinjau sebelum disimpan ke database.
5. **Antrean Transkoding Media (`/admin/processing`)**: Monitor status job HLS (Queued, Processing, Completed, Failed), progress bar, dan tombol retry.
6. **Audit Hak Siar & Legalitas (`/admin/rights`)**: Verifikasi dokumen bukti lisensi (Public Domain / CC / Kontrak Distributor). Konten tidak dapat dipublikasikan ke publik tanpa persetujuan verifikator legal.
7. **Penyimpanan Media (`/admin/media`)**: Manajemen bucket Supabase Storage dan berkas video master.
8. **Pengguna (`/admin/users`)**: Direktori pengguna dan hak akses role.
9. **Pengaturan Sistem (`/admin/settings`)**: Konfigurasi koneksi Supabase PostgreSQL dan HLS media CDN.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router, Turbopack, React 19)
- **Language:** TypeScript Strict Mode
- **Styling:** Tailwind CSS v4, Lucide React Icons
- **Database & Storage:** Supabase PostgreSQL & Supabase Storage via Prisma ORM
- **Video Engine:** HLS.js dengan fallback native HLS

---

## ⚡ Setup & Menjalankan Proyek

1. **Clone & Install Dependensi:**
   ```bash
   npm install
   ```

2. **Konfigurasi Environment:**
   Salin `.env.example` ke `.env` dan masukkan kredensial Supabase Anda:
   ```env
   DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
   NEXT_PUBLIC_SUPABASE_URL="https://[REF].supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   ```

3. **Sinkronisasi Schema Database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 📜 Lisensi & Kepatuhan Distribusi
Seluruh materi video uji coba menggunakan karya sinematik berlisensi terbuka resmi (*Creative Commons* dan *Public Domain* yang telah diverifikasi) dari Blender Foundation Open Projects dan Arsip Sinema Publik Dunia.
