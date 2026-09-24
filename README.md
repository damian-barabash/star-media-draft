# Star Media — strona (React + Vite + Supabase)

Strona agencji Star Media (star-media.pl). Przepisana ze statycznego HTML na **React 19 + Vite + TypeScript**,
z backendem na **Supabase** (formularz kontaktowy, roster, portfolio) i deployem na **GitHub Pages** przez GitHub Actions.

## Stack

- React 19, react-router 7 (BrowserRouter, ładne URL-e `/uslugi/management-talentow`)
- Vite 8, TypeScript 6
- Three.js (lazy chunk): złoty emblemat 3D w hero, `public/3d/star.glb` (meshopt + simplify 0.6, **154 KB**; źródło `raw-assets/star-media-gold-src.glb`, Draco). Materiał metaliczny → `RoomEnvironment` w `starScene.ts`
- Fonty self-hosted (`@fontsource-variable/oswald`, `@fontsource-variable/inter`, `@fontsource/cormorant-garamond`)
- Supabase (`@supabase/supabase-js`, lazy chunk) — projekt **Star Media Back** (`idlqmuvcfvgcblfykbxv`, eu-west-1)
- 3 języki PL / EN / ES — cała treść w `src/content/*.ts` jako obiekty `{ pl, en, es }`

## Skrypty

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc + vite build + scripts/postbuild.mjs (kopie index.html per route, 404.html, sitemap.xml, robots.txt)
npm run preview    # podgląd builda na :4173
npm run shots      # Playwright: zrzuty wszystkich stron desktop+mobile do ./shots (wymaga globalnego playwright: PLAYWRIGHT_PKG=$(npm root -g)/playwright)
```

## Struktura

```
src/
  content/      ← CAŁA treść (PL/EN/ES): home, about, talents, services (14 usług + podstrony), influencer, projects, contact, polskaPress, common
  pages/        ← Home, About, Talents, Services, ServiceDetail (/uslugi/:slug), Influencer, Projects, Contact
  components/   ← Layout (nav, menu, ticker, footer, kursor), Hero, Hero3D, Carousel, sections (ServicesList, ProcessChapter, PPChapter, CTAChapter), ui
  three/        ← starScene.ts (Three.js, ładowany dynamicznie)
  hooks/        ← useReveal (IntersectionObserver), usePlaceholderParallax, useData (Supabase → fallback statyczny)
  lib/          ← supabase.ts (klient + submitContactRequest + fetch), rich.tsx (markup *złoty kursywa*)
  i18n/         ← LangContext (localStorage `sm_lang`), types
  styles/       ← base.css (tokeny, typografia), components.css, pages.css (responsywność)
  routes.json   ← lista route'ów dla postbuild/sitemap
public/         ← CNAME, .nojekyll, 3d/star.glb, logo/{logo.png (białe), logo-black.png, favicon.png}, placeholder.svg
scripts/        ← postbuild.mjs, screenshots.mjs
supabase/       ← 001_schema.sql (tabele + RLS), 002_seed.sql (roster + portfolio)
.github/workflows/deploy.yml ← build + deploy na GitHub Pages
```

### Konwencje treści

- Każdy widoczny tekst = `l('pl', 'en', 'es')`. Brak języka → bug.
- `*tekst*` w stringu → złota kursywa (`<em class="g">`), `\n` → nowa linia w nagłówkach, `\n\n` → akapit.
- Nowa usługa: dodaj obiekt do `SERVICES` w `src/content/services.ts` **i** slug do `src/routes.json` (żeby postbuild wygenerował `/uslugi/<slug>/index.html`).
- Zdjęcia talentów / projektów: `image_url` w tabeli Supabase (lub `image` w `src/content/*.ts` jako fallback). `.ph` = szary placeholder z parallaxem.

## Supabase (backend)

Publiczny URL + klucz publishable siedzą w `.env` (bezpieczne w przeglądarce — dane chroni RLS). Sekrety projektu (service role, PAT) **nigdy** do repo.

| Tabela | Dostęp anon | Do czego |
|---|---|---|
| `contact_requests` | tylko INSERT (+ trigger: max 5/h na e-mail) | formularz kontaktowy; czytać w Supabase Dashboard → Table Editor |
| `talents` | SELECT `published = true` | roster (karuzela /talenty, wyróżnieni na podstronie Management) |
| `projects` | SELECT `published = true` | portfolio /projekty + karuzela na home (`featured = true`) + galerie na podstronach usług |

Front działa też bez backendu: treść statyczna z `src/content`, a formularz pokazuje adres e-mail.
Schemat: `supabase/001_schema.sql`, seed: `supabase/002_seed.sql` (idempotentne, `on conflict do update`).

Powiadomienia e-mail o nowych zgłoszeniach: do zrobienia (Database Webhook / Edge Function + Resend) — patrz TODO.

## Deploy (GitHub Pages)

1. W repo: **Settings → Pages → Build and deployment → Source: GitHub Actions** (raz — wcześniej strona była serwowana z gałęzi `main`).
2. Push na `main` → workflow `Deploy to GitHub Pages` buduje `dist/` i publikuje. Domena z `public/CNAME` (`star-media-draft.barabashflow.pl`).
3. Env do builda: workflow ma domyślne wartości; można nadpisać przez **Settings → Variables → Actions**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`.

SPA na Pages: `postbuild` tworzy `dist/<route>/index.html` dla każdego route'u (HTTP 200, indeksowalne) + `404.html` jako fallback dla nieznanych ścieżek.

## TODO (po stronie klienta / kolejny etap)

- Showreel (video na home), zdjęcia talentów, zdjęcia/wideo eventów, live, merch, branding, portfolio web/AI.
- Powiadomienia e-mail o zgłoszeniach z formularza.
- Weryfikacja tłumaczeń EN/ES przez native speakera (tłumaczenia maszynowe).
