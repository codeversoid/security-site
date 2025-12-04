-- Create required extension
create extension if not exists pgcrypto;

-- Site settings: normalize all fields into DB (singleton id=1)
create table if not exists public.site_settings (
  id int primary key default 1,
  "siteName" text,
  "logoUrl" text,
  address text,
  email text,
  phone text,
  "comproUrl" text,
  whatsapp text,
  "faviconUrl" text,
  "homeHeroImageUrl" text,
  "homeAboutImageUrl" text,
  "instagramUrl" text,
  "facebookUrl" text,
  "mapLinkHref" text,
  "mapEmbedSrc" text,
  "mapTitle" text,
  created_at timestamptz default now()
);
insert into public.site_settings (id) values (1)
on conflict (id) do nothing;

-- About settings (singleton id=1)
create table if not exists public.about_settings (
  id int primary key default 1,
  "directorName" text,
  "directorTitle" text,
  "directorPhotoUrl" text,
  "directorMessage" text,
  "aboutLogoUrl" text,
  team jsonb,
  partners jsonb,
  created_at timestamptz default now()
);
insert into public.about_settings (id) values (1)
on conflict (id) do nothing;

-- Normalize columns before seeding (handle legacy lowercase and ensure camelCase columns exist)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='site_settings' AND column_name='sitename') THEN
    EXECUTE 'alter table public.site_settings rename column sitename to "siteName"';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='site_settings' AND column_name='logourl') THEN
    EXECUTE 'alter table public.site_settings rename column logourl to "logoUrl"';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='site_settings' AND column_name='comprourl') THEN
    EXECUTE 'alter table public.site_settings rename column comprourl to "comproUrl"';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='site_settings' AND column_name='faviconurl') THEN
    EXECUTE 'alter table public.site_settings rename column faviconurl to "faviconUrl"';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='site_settings' AND column_name='homeheroimageurl') THEN
    EXECUTE 'alter table public.site_settings rename column homeheroimageurl to "homeHeroImageUrl"';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='site_settings' AND column_name='homeaboutimageurl') THEN
    EXECUTE 'alter table public.site_settings rename column homeaboutimageurl to "homeAboutImageUrl"';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='site_settings' AND column_name='instagramurl') THEN
    EXECUTE 'alter table public.site_settings rename column instagramurl to "instagramUrl"';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='site_settings' AND column_name='facebookurl') THEN
    EXECUTE 'alter table public.site_settings rename column facebookurl to "facebookUrl"';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='site_settings' AND column_name='maplinkhref') THEN
    EXECUTE 'alter table public.site_settings rename column maplinkhref to "mapLinkHref"';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='site_settings' AND column_name='mapembedsrc') THEN
    EXECUTE 'alter table public.site_settings rename column mapembedsrc to "mapEmbedSrc"';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='site_settings' AND column_name='maptitle') THEN
    EXECUTE 'alter table public.site_settings rename column maptitle to "mapTitle"';
  END IF;
END $$;

alter table public.site_settings
  add column if not exists "siteName" text,
  add column if not exists "logoUrl" text,
  add column if not exists "comproUrl" text,
  add column if not exists "faviconUrl" text,
  add column if not exists "homeHeroImageUrl" text,
  add column if not exists "homeAboutImageUrl" text,
  add column if not exists "instagramUrl" text,
  add column if not exists "facebookUrl" text,
  add column if not exists "mapLinkHref" text,
  add column if not exists "mapEmbedSrc" text,
  add column if not exists "mapTitle" text;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='about_settings' AND column_name='directorname') THEN
    EXECUTE 'alter table public.about_settings rename column directorname to "directorName"';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='about_settings' AND column_name='directortitle') THEN
    EXECUTE 'alter table public.about_settings rename column directortitle to "directorTitle"';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='about_settings' AND column_name='directorphotourl') THEN
    EXECUTE 'alter table public.about_settings rename column directorphotourl to "directorPhotoUrl"';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='about_settings' AND column_name='directormessage') THEN
    EXECUTE 'alter table public.about_settings rename column directormessage to "directorMessage"';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='about_settings' AND column_name='aboutlogourl') THEN
    EXECUTE 'alter table public.about_settings rename column aboutlogourl to "aboutLogoUrl"';
  END IF;
END $$;

alter table public.about_settings
  add column if not exists "directorName" text,
  add column if not exists "directorTitle" text,
  add column if not exists "directorPhotoUrl" text,
  add column if not exists "directorMessage" text,
  add column if not exists "aboutLogoUrl" text;

-- News posts
create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text,
  excerpt text,
  date timestamptz,
  image text,
  content text,
  created_at timestamptz default now()
);
create index if not exists idx_news_date on public.news_posts(date desc);

-- Gallery
create table if not exists public.gallery_categories (
  id text primary key,
  name text,
  created_at timestamptz default now()
);
create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  src text not null,
  alt text,
  category text references public.gallery_categories(id),
  created_at timestamptz default now()
);
create unique index if not exists idx_gallery_items_src on public.gallery_items(src);

-- Seed from current JSON files located in public/data

-- Seed site_settings extras
update public.site_settings set
  "faviconUrl" = 'https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/icons/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764657260248-20._LOGO_LEMOS_JAYA_PERKASA-removebg-preview.png',
  "homeHeroImageUrl" = 'https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/home/hero/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764225468817-gadautama.jpg',
  "homeAboutImageUrl" = 'https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/home/about/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764225978841-gadautama2.jpg',
  "instagramUrl" = 'https://www.instagram.com/pt.lemosjayaperkasa86',
  "facebookUrl" = '',
  "mapLinkHref" = 'https://www.google.com/maps/place/PT.+Lemos+Jaya+Perkasa/@-6.7899023,107.1675867,899m/data=!3m2!1e3!4b1!4m6!3m5!1s0x2e6853e506136c8d:0x75e32c39f1c27692!8m2!3d-6.7899023!4d107.1675867!16s%2Fg%2F11fn6mr1bn',
  "mapEmbedSrc" = 'https://www.google.com/maps?q=-6.7899023,107.1675867&z=16&output=embed',
  "mapTitle" = 'PT. Lemos Jaya Perkasa'
where id = 1;

-- Seed about_settings from JSON
update public.about_settings set
  "directorName" = 'RAHMAT SALEH, SH',
  "directorTitle" = 'DIREKTUR',
  "directorPhotoUrl" = 'https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/director/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764643121125-DIREKTUR.jpg',
  "directorMessage" = 'Terima kasih atas kepercayaan Anda. Kami berkomitmen menghadirkan layanan pengamanan yang profesional, responsif, dan terukur, serta pembinaan SDM untuk meningkatkan mutu layanan.',
  "aboutLogoUrl" = 'https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/logo/05afc4c4-246a-4b84-8996-6b4a00579d4d-1762843967922-20._LOGO_LEMOS_JAYA_PERKASA-removebg-preview.png',
  team = '[
    {"name":"WAHYU JATI PERKASA","role":"KOMISARIS","imageUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/team/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764643208104-KOMISARIS.jpg"},
    {"name":"RAHMAT SALEH, SH","role":"DIREKTUR","imageUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/team/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764643198409-DIREKTUR.jpg"},
    {"name":"DWI FURY SYARA LESTARI, SH","role":"WAKIL DIREKTUR","imageUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/team/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764643220757-wakil_DIREKTUR.jpg"},
    {"name":"EDI PURWANTO","role":"ADVISOR","imageUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/team/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764643768141-ADVISOR.jpg"},
    {"name":"RESA LESTARI","role":"MNG HRD","imageUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/team/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764643775362-HRD.jpg"},
    {"name":"DEWI SITI MEGAWATI, SE","role":"KEUANGAN","imageUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/team/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764643783608-KEUANGAN.jpg"},
    {"name":"WAHYU HIDAYAT","role":"MNG OPERASIONAL","imageUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/team/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764643945517-MNG_MARKETING.jpg"},
    {"name":"DEDIH PRIATNO","role":"MNG MARKETING","imageUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/team/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764729474448-MNG_MARKETING.jpg"},
    {"name":"J D SIMARMATA, SH","role":"LEGAL","imageUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/team/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764643888589-LEGAL.jpg"},
    {"name":"M BAIHAKI ABDUL AZIZ, ST","role":"TECHNICAL MNG","imageUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/team/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764729432129-MARKETING.jpg"}
  ]'::jsonb,
  partners = '[
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764310929395-1.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764310933461-2.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764310943412-3.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764310953225-4.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764310959198-5.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311007549-6.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311015141-7.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311023677-8.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311043564-9.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311047973-10.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311052351-11.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311056163-12.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311062335-13.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311066419-14.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311072170-15.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311079213-16.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311084953-17.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311090139-18.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311095411-19.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311100820-20.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311106409-21.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311111336-22.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311115856-23.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311120656-24.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311125731-25.png"},
    {"name":"","logoUrl":"https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/about/partners/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764311129993-26.png"}
  ]'::jsonb
where id = 1;



-- Seed gallery categories
insert into public.gallery_categories (id, name) values
  ('diklat','Diklat'),
  ('event','Event'),
  ('semua','Semua')
on conflict (id) do update set name = excluded.name;

-- Seed gallery items
insert into public.gallery_items (src, alt, category) values
  ('https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/gallery/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764231019586-page29_img03.png','diklat','diklat'),
  ('https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/gallery/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764229038975-gadautama2.jpg','diklat','diklat'),
  ('https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/gallery/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764229185398-gadautama1.jpg','diklat','diklat'),
  ('https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/gallery/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764229338635-WhatsApp-Image-2025-05-05-at-13.37.29_e8e59ec6-770x390.jpg','diklat','diklat'),
  ('https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/gallery/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764230849997-page26_img03.png','diklat','diklat'),
  ('https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/gallery/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764230891722-page29_img04.png','diklat','diklat'),
  ('https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/gallery/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764230909378-page26_img05.png','diklat','diklat'),
  ('https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/gallery/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764229018004-gadautama.jpg','diklat','diklat'),
  ('https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/gallery/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764230766504-event.png','event 1','event'),
  ('https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/gallery/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764230778567-event2.png','event 2','event'),
  ('https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/gallery/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764230788592-enent3.png','event 3','event'),
  ('https://qncuvkaxslksfxnqwsjf.supabase.co/storage/v1/object/public/assets/gallery/05afc4c4-246a-4b84-8996-6b4a00579d4d-1764230801948-event4.png','event 4','event')
on conflict (src) do update set alt = excluded.alt, category = excluded.category;

-- Row Level Security and Policies
alter table public.site_settings enable row level security;
alter table public.about_settings enable row level security;
alter table public.news_posts enable row level security;
alter table public.gallery_categories enable row level security;
alter table public.gallery_items enable row level security;

-- Public read policies
drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read" on public.site_settings
  for select using (true);
drop policy if exists "about_settings_public_read" on public.about_settings;
create policy "about_settings_public_read" on public.about_settings
  for select using (true);
drop policy if exists "news_posts_public_read" on public.news_posts;
create policy "news_posts_public_read" on public.news_posts
  for select using (true);
drop policy if exists "gallery_categories_public_read" on public.gallery_categories;
create policy "gallery_categories_public_read" on public.gallery_categories
  for select using (true);
drop policy if exists "gallery_items_public_read" on public.gallery_items;
create policy "gallery_items_public_read" on public.gallery_items
  for select using (true);

-- Authenticated write policies (admin dashboard uses authenticated Supabase session)
drop policy if exists "site_settings_admin_write" on public.site_settings;
create policy "site_settings_admin_write" on public.site_settings
  for all
  using (auth.uid() is not null)
  with check (auth.uid() is not null);
drop policy if exists "about_settings_admin_write" on public.about_settings;
create policy "about_settings_admin_write" on public.about_settings
  for all
  using (auth.uid() is not null)
  with check (auth.uid() is not null);
drop policy if exists "news_posts_admin_write" on public.news_posts;
create policy "news_posts_admin_write" on public.news_posts
  for all
  using (auth.uid() is not null)
  with check (auth.uid() is not null);
drop policy if exists "gallery_categories_admin_write" on public.gallery_categories;
create policy "gallery_categories_admin_write" on public.gallery_categories
  for all
  using (auth.uid() is not null)
  with check (auth.uid() is not null);
drop policy if exists "gallery_items_admin_write" on public.gallery_items;
create policy "gallery_items_admin_write" on public.gallery_items
  for all
  using (auth.uid() is not null)
  with check (auth.uid() is not null);
