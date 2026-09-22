-- Star Media backend — 001 initial schema
create extension if not exists pgcrypto;

-- ===== CONTACT REQUESTS (single business form) =====
create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(btrim(name)) between 2 and 120),
  company text check (company is null or char_length(company) <= 160),
  email text not null check (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' and char_length(email) <= 254),
  phone text check (phone is null or char_length(phone) <= 40),
  service text not null check (service in (
    'management','influencer-marketing','strategia-creative','social-media',
    'video-production','photo-production','events','pr-media','web-digital',
    'ai-automation','branding-design','inne')),
  message text not null check (char_length(btrim(message)) between 5 and 5000),
  budget text check (budget is null or budget in (
    'do-10k','10k-30k','30k-100k','100k-300k','300k-plus','do-ustalenia')),
  lang text not null default 'pl' check (lang in ('pl','en','es')),
  source_url text check (source_url is null or char_length(source_url) <= 2048),
  user_agent text check (user_agent is null or char_length(user_agent) <= 512),
  status text not null default 'new' check (status in ('new','read','replied','archived'))
);
create index if not exists contact_requests_created_at_idx on public.contact_requests (created_at desc);
create index if not exists contact_requests_email_idx on public.contact_requests (lower(email), created_at desc);

alter table public.contact_requests enable row level security;
drop policy if exists "public can submit contact request" on public.contact_requests;
create policy "public can submit contact request"
  on public.contact_requests for insert to anon, authenticated with check (true);
-- no select/update/delete for anon: reading only through dashboard / service role
revoke select, update, delete on public.contact_requests from anon, authenticated;

-- simple flood guard: max 5 requests per e-mail per hour
create or replace function public.contact_requests_flood_guard()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.contact_requests
      where lower(email) = lower(new.email) and created_at > now() - interval '1 hour') >= 5 then
    raise exception 'too many requests' using errcode = 'P0001';
  end if;
  return new;
end $$;
drop trigger if exists contact_requests_flood_guard on public.contact_requests;
create trigger contact_requests_flood_guard before insert on public.contact_requests
  for each row execute function public.contact_requests_flood_guard();

-- ===== TALENTS (public read) =====
create table if not exists public.talents (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  role_pl text not null,
  role_en text not null,
  role_es text not null,
  handle text,
  instagram_url text,
  image_url text,
  featured boolean not null default true,
  sort int not null default 100,
  published boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.talents enable row level security;
drop policy if exists "public can read published talents" on public.talents;
create policy "public can read published talents"
  on public.talents for select to anon, authenticated using (published);
revoke insert, update, delete on public.talents from anon, authenticated;

-- ===== PROJECTS (portfolio, public read) =====
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null check (category in ('video','youtube','podcasty','social','foto','eventy','creative')),
  kind_label text not null,
  image_url text,
  video_url text,
  service_slug text,
  featured boolean not null default false,
  sort int not null default 100,
  published boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists projects_sort_idx on public.projects (sort, created_at);
alter table public.projects enable row level security;
drop policy if exists "public can read published projects" on public.projects;
create policy "public can read published projects"
  on public.projects for select to anon, authenticated using (published);
revoke insert, update, delete on public.projects from anon, authenticated;
