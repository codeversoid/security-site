# Security Site — Instalasi & Fitur

Proyek web perusahaan jasa keamanan dengan halaman publik, admin dashboard, integrasi Supabase untuk data (berita, galeri, konfigurasi situs), serta autentikasi login.

## Stack
- Next.js `16` + React `19`
- Supabase (Auth, Database, Storage)
- Tailwind CSS `v4`
- Framer Motion untuk animasi ringan
- ESLint, Prettier, TypeScript

## Fitur Utama
- Halaman publik:
  - Home, Tentang, Layanan, Diklat, Galeri, Berita, Kontak
  - Timeline “Perjalanan” dengan detail tiap tahun
  - Galeri dengan kategori dan lightbox
  - Diklat dengan schema FAQ SEO
- Berita:
  - Listing dari Supabase
  - Detail ID-only (`/news/{id}`) untuk akurasi konten
- Admin dashboard (`/admin`):
  - Login/Logout (Supabase Auth), dukung “Lupa password”
  - Kelola Site Settings (nama situs, logo, alamat, email, WA, brochure URL)
  - Kelola About (director message, logo, tim, partner)
  - Kelola Galeri (kategori, item)
  - Kelola Berita (judul, ringkasan, gambar, konten)
  - Upload ke Supabase Storage via API
- Middleware proteksi admin dengan redirect ke login
- SEO basic (open graph & twitter)

## Persyaratan
- Node.js `>=18`
- Akun & proyek Supabase

## Environment
Buat file `.env.local` di root:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

Variabel dibaca oleh helper Supabase: `src/lib/supabase.ts:1-11`.

## Supabase Setup
1) Auth
- Aktifkan Email provider untuk reset password.

2) Storage
- Buat bucket `assets` (Public) untuk gambar.
- Struktur folder (contoh): `assets/news/...`, `assets/gallery/...`.

3) Database Tables (SQL contoh)

Site settings (1 baris id=1):
```sql
create table if not exists public.site_settings (
  id int primary key default 1,
  siteName text,
  logoUrl text,
  address text,
  email text,
  phone text,
  comproUrl text,
  whatsapp text
);
insert into public.site_settings (id, siteName) values (1, 'GardaSecurity')
on conflict (id) do nothing;
```

About settings:
```sql
create table if not exists public.about_settings (
  id int primary key default 1,
  directorName text,
  directorTitle text,
  directorPhotoUrl text,
  directorMessage text,
  aboutLogoUrl text,
  team jsonb,
  partners jsonb
);
insert into public.about_settings (id) values (1)
on conflict (id) do nothing;
```

News posts (ID-only routing):
```sql
create extension if not exists pgcrypto;
create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text,
  excerpt text,
  date timestamptz,
  image text,
  content text
);
create index if not exists idx_news_date on public.news_posts(date desc);
```

Gallery:
```sql
create table if not exists public.gallery_categories (
  id text primary key,
  name text
);
create table if not exists public.gallery_items (
  src text primary key,
  alt text,
  category text references public.gallery_categories(id)
);
```

## Menjalankan
- Instal deps: `npm install`
- Dev: `npm run dev` → buka `http://localhost:3000`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Build: `npm run build`
- Start (prod): `npm run start`

## Rute Penting
- Publik:
  - `/` Home
  - `/about` Tentang
  - `/services` Layanan
  - `/training` Diklat
  - `/gallery` Galeri
  - `/news` Berita (daftar)
  - `/news/{id}` Detail berita ID-only
  - `/contact` Kontak
  - `/download/compro` Unduh brochure (redirect sesuai `site_settings`)
- Admin:
  - `/admin` Dashboard (butuh login)
  - API publik/admin:
    - Site: `GET /api/site`, Admin: `GET/POST /api/admin/site`
    - About: `GET /api/about`, Admin: `GET/POST /api/admin/about`
    - News: `GET /api/news`, `GET /api/news/id/{id}`, `GET /api/news/{slug}` (opsional)
      Admin list: `GET /api/admin/news`
    - Galeri: `GET /api/gallery`, Admin: `GET/POST /api/admin/gallery`
    - Upload: `POST /api/upload` (auth wajib)
    - Storage cleanup: `DELETE /api/storage` (auth wajib)
    - Login: `POST /api/login`, Logout: `POST /api/logout`

Middleware proteksi admin: `src/middleware.ts:1-40`.

## Alur Login & Reset Password
- Login halaman: `/login`
- Lupa password: kirim tautan reset; setelah klik email, halaman login beralih ke mode pemulihan untuk ganti password.

## Catatan Berita (ID-only)
- Tautan kartu & sidebar menuju `/news/{id}`.
- Detail memuat berdasarkan `id` terlebih dulu, fallback slug jika diperlukan.
- Pastikan kolom `content` atau `excerpt` terisi; jika keduanya kosong, halaman menampilkan “Konten belum tersedia”.

## Tips & Troubleshooting
- Gambar 404: cek bucket `assets` dan path, pastikan public.
- Env hilang: helper akan melempar error — pastikan `.env.local` terisi.
- Admin redirect ke login: itu normal jika belum ada sesi Supabase.

## Lisensi
Internal project.
