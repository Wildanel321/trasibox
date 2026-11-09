# Software Requirements Specification (SRS) — TREASIBOX

## 1. Introduction
### 1.1 Purpose
Spesifikasi ini mendefinisikan kebutuhan fungsional dan non-fungsional dari platform streaming **TREASIBOX**, platform streaming film dan serial TV dengan estetika sinematik, tanpa sistem tier berbayar/langganan, dengan akses penuh bagi pengguna terdaftar dan sistem manajemen hak tayang bagi admin.

### 1.2 Scope
- Antarmuka web pengguna akhir (Homepage, Katalog Film, Katalog Serial, Detail Konten, HLS Player, Watchlist, History, Auth, Search).
- Antarmuka web admin (Dashboard, Content Ingestion, Media Processing Queue, Rights Verification, User Management).
- REST API layer (`/api/v1/*`) terhubung ke Supabase PostgreSQL melalui Prisma.

## 2. Functional Requirements
- **FR-01 (Catalog Browsing):** Pengguna dapat mencari, memfilter (genre, tahun rilis, rating), dan menyortir film/serial dengan tata letak grid responsif.
- **FR-02 (Cinematic Playback):** Pengguna dapat menonton video melalui HLS stream dengan kontrol kecepatan, resolusi, multi-bahasa subtitle, fullscreen, dan shortcut keyboard.
- **FR-03 (Continue Watching & History):** Progres tontonan tersimpan otomatis ke database dan ditampilkan di section "Continue Watching" serta halaman `/history`.
- **FR-04 (My List):** Pengguna dapat menambah atau menghapus konten dari daftar tontonan pribadi (`/my-list`).
- **FR-05 (Admin Content Management):** Admin dapat membuat, memperbarui, mempublikasikan, atau menghapus film dan serial.
- **FR-06 (Rights Verification Gate):** Konten tidak dapat berstatus `PUBLISHED` jika belum melewati verifikasi dokumen hak distribusi oleh Admin.
- **FR-07 (Media Processing Queue):** Admin dapat memantau status antrean encoding/transcoding video (Queued, Processing, Completed, Failed).

## 3. Non-Functional Requirements
- **NFR-01 (Performance):** Time to Interactive (TTI) < 1.5 detik pada koneksi standar broadband; poster lazy-loading dengan aspect ratio 2:3 stabil.
- **NFR-02 (Accessibility):** Mematuhi standar WCAG 2.2 AA dengan rasio kontras memadai pada tema gelap, navigasi keyboard penuh, dan ARIA labels.
- **NFR-03 (Responsiveness):** Menyesuaikan secara presisi dari resolusi 360px mobile hingga 1920px widescreen tanpa horizontal overflow.
- **NFR-04 (Data Integrity):** Skema data Prisma yang terdefinisi ketat dengan relasi referensial aman.
