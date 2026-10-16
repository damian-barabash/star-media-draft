import { l, type L } from '../i18n/types'
import { albumCover } from './albums'

export type ProjectCategory = 'video' | 'vlog' | 'youtube' | 'kampanie' | 'podcasty' | 'social' | 'foto' | 'eventy' | 'creative'

export type Project = {
  slug: string
  title: string
  category: ProjectCategory
  /** short caption "Teledysk / Video / ..." */
  kind: L | string
  image?: string | null
  /** portrait (7:10) crop of the cover for the home carousel */
  poster?: string | null
  video?: string | null
  featured?: boolean
  /** photo album in public/foto/<album> (opens in our viewer) */
  album?: string
  /** self-hosted WebM (low-view originals, 2026-10-16) — plays in our viewer, `video` stays as the original link */
  local?: string
}

/** Vertical (9:16) covers: reels / TikToks. */
export const isVertical = (p: Pick<Project, 'category'>) => p.category === 'kampanie' || p.category === 'social'

/* Client (Co i jak 3 · projekty, 2026-09-28): Podcasty tab removed (moved into YouTube), new Vlog and Kampanie tabs. */
export const PROJECT_FILTERS: { key: 'all' | ProjectCategory; label: L }[] = [
  { key: 'all', label: l('Wszystkie', 'All', 'Todos') },
  { key: 'video', label: l('Video', 'Video', 'Vídeo') },
  { key: 'vlog', label: l('Vlog', 'Vlog', 'Vlog') },
  { key: 'youtube', label: l('YouTube', 'YouTube', 'YouTube') },
  { key: 'kampanie', label: l('Kampanie', 'Campaigns', 'Campañas') },
  { key: 'social', label: l('Social', 'Social', 'Social') },
  { key: 'foto', label: l('Foto', 'Photo', 'Foto') },
  { key: 'eventy', label: l('Eventy', 'Events', 'Eventos') },
  { key: 'creative', label: l('Creative', 'Creative', 'Creative') },
]

/**
 * Covers: graded stills taken from the videos themselves (no burned-in titles/subtitles),
 * public/projects/covers/<slug>.webp (4:3, or 9:16 for reels) + <slug>-p.webp (7:10 for the carousel).
 */
const cover = (slug: string) => `/projects/covers/${slug}.webp`
const yt = (slug: string, id: string, shorts = false) => ({ ...local(slug), image: cover(slug), poster: `/projects/covers/${slug}-p.webp`, video: shorts ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}` })
const ig = (slug: string, id: string) => ({ ...local(slug), image: cover(slug), video: `https://www.instagram.com/reel/${id}/` })
/** low-view originals we host ourselves (WebM VP9 + Opus in public/video/projects, 2026-10-16); >20 min stays a link (Rozmowy na płótnie, Empik) — GitHub 100 MB file limit */
const LOCAL = new Set(['metamorfozy-przyszlosci-helena-deeds', 'vlog-chce-cie-miec-backstage', 'vlog-szkoda-aury-backstage', 'kampania-dalmmsotpgv', 'kampania-dcqmdhxjsnv', 'kampania-ddi1luoikgi', 'kampania-ddjfjphoiyf', 'kampania-ddqsjh6t4w0', 'kampania-dljrty3i4dx', 'kampania-dscbzosjyhy', 'kampania-dwl4qojsgkx', 'reel-c4nryuev9m', 'reel-c5gncq5mtdn', 'reel-csvt-qwioi', 'reel-dux5rogjblj', 'reel-dvqubOycb7q'])
const local = (slug: string) => (LOCAL.has(slug) ? { local: `/video/projects/${slug}.webm` } : {})
const tt = (slug: string, url: string) => ({ image: cover(slug), video: url })

const MV = l('Teledysk', 'Music video', 'Videoclip')
const VLOG = l('Vlog / Kulisy teledysku', 'Vlog / Behind the scenes', 'Vlog / Detrás de cámaras')
const OP = l('Produkcja YouTube / Oliwia Puchacz', 'YouTube production / Oliwia Puchacz', 'Producción de YouTube / Oliwia Puchacz')
const REEL = l('Kampania / Reels', 'Campaign / Reels', 'Campaña / Reels')
const TIKTOK = l('Kampania / TikTok', 'Campaign / TikTok', 'Campaña / TikTok')
const SOCIAL = l('Reels / Social', 'Reels / Social', 'Reels / Social')

/**
 * Static fallback portfolio (Supabase `projects` table overrides when available · keep both in sync,
 * see supabase/003_projects_2026-09-30.sql). Order = client's order within each tab.
 */
export const PROJECTS: Project[] = [
  /* Client 2026-10-16 (voice note): premium first — Colibra black jewellery, Chanel, Kasia Zdanowicz; photo albums from the client
     (public/foto) mixed between videos; Aria Martelle still at the very end of every list. */
  { slug: 'foto-colibra', title: 'Colibra · Black & Gold', category: 'foto', kind: l('Sesja / Biżuteria', 'Shoot / Jewellery', 'Sesión / Joyería'), ...albumCover('colibra') },
  { slug: 'foto-chanel', title: 'Chanel · Eventy i warsztaty', category: 'eventy', kind: l('Fotografia eventowa', 'Event photography', 'Fotografía de eventos'), ...albumCover('chanel') },
  { slug: 'foto-kasia-zdanowicz', title: 'Kasia Zdanowicz · Sesja wizerunkowa', category: 'foto', kind: l('Sesja wizerunkowa', 'Image shoot', 'Sesión de imagen'), ...albumCover('kasia-zdanowicz') },
  { slug: 'anna-jurksztowicz-varsovie', title: 'Anna Jurksztowicz feat. Chris Schittulli · Varsovie', category: 'video', kind: MV, ...yt('anna-jurksztowicz-varsovie', 'FB16i1Bzkbc') },
  { slug: 'face-off-2-randka-w-ciemno', title: 'Face Off 2 · Randka w ciemno', category: 'youtube', kind: OP, ...yt('face-off-2-randka-w-ciemno', '5F2Vwkzobq4') },
  { slug: 'kampania-ddi1luoikgi', title: 'Otodom', category: 'kampanie', kind: REEL, ...ig('kampania-ddi1luoikgi', 'Ddi1luOIKGI') },
  { slug: 'vlogmas-swiateczne-grzanie', title: 'Vlogmas · Świąteczne grzanie', category: 'youtube', kind: OP, ...yt('vlogmas-swiateczne-grzanie', 'c5G9bB4sres') },
  { slug: 'foto-koncerty', title: 'Majka Jeżowska i Rock&Roll · Progresja', category: 'eventy', kind: l('Fotografia koncertowa', 'Concert photography', 'Fotografía de conciertos'), ...albumCover('koncerty') },
  { slug: 'creative-spidersys', title: 'Spidersys · Brand book i identyfikacja', category: 'creative', kind: l('Branding / Identyfikacja', 'Branding / Identity', 'Branding / Identidad'), ...albumCover('spidersys') },
  { slug: 'kampania-czevvsjolni', title: 'Pan Lektor', category: 'kampanie', kind: REEL, ...ig('kampania-czevvsjolni', 'CzEVVsjoLNI') },
  { slug: 'metamorfozy-przyszlosci-helena-deeds', title: 'Metamorfozy Przyszłości · Helena Deeds', category: 'youtube', kind: l('Program / SHOWNEWSPL', 'Show / SHOWNEWSPL', 'Programa / SHOWNEWSPL'), ...yt('metamorfozy-przyszlosci-helena-deeds', 'Ofu7MDWxnBA') },
  { slug: 'kampania-ddjfjphoiyf', title: 'Otodom', category: 'kampanie', kind: REEL, ...ig('kampania-ddjfjphoiyf', 'DdJfjphoiYf') },
  { slug: 'foto-beauty', title: 'Magda Atkins · Beauty Day', category: 'foto', kind: l('Sesja beauty', 'Beauty shoot', 'Sesión beauty'), ...albumCover('beauty') },
  { slug: 'creative-juvio', title: 'JUVIO · Prezentacja marki i opakowanie', category: 'creative', kind: l('Prezentacja / Packaging', 'Pitch deck / Packaging', 'Presentación / Packaging'), ...albumCover('juvio') },
  { slug: 'majka-jezowska-vlog-kuba-wojewodzki', title: 'Majka Jeżowska Vlog · Kuba Wojewódzki', category: 'youtube', kind: l('Vlog / YouTube', 'Vlog / YouTube', 'Vlog / YouTube'), ...yt('majka-jezowska-vlog-kuba-wojewodzki', 'D6eYgPmuCRU') },
  { slug: 'kampania-dljrty3i4dx', title: 'Pan Lektor', category: 'kampanie', kind: REEL, ...ig('kampania-dljrty3i4dx', 'DLjrty3I4DX') },
  { slug: 'oliwia-puchacz-czyj-to-zawod', title: 'Oliwia Puchacz · Dopasuj zawód do osoby', category: 'youtube', kind: OP, ...yt('oliwia-puchacz-czyj-to-zawod', 'Vck4hHQs98k') },
  { slug: 'foto-eventy', title: 'Chanel Chance, EIT Health, pokaz Colibra', category: 'eventy', kind: l('Fotografia eventowa', 'Event photography', 'Fotografía de eventos'), ...albumCover('eventy') },
  { slug: 'creative-nask', title: 'NASK · Kampania edukacyjna i Bezpieczne Wybory', category: 'creative', kind: l('Kampania / Grafika', 'Campaign / Design', 'Campaña / Diseño'), ...albumCover('nask') },
  { slug: 'kampania-c0l_udxirlg', title: 'Pan Lektor', category: 'kampanie', kind: REEL, ...ig('kampania-c0l_udxirlg', 'C0L_UdxIrLG') },
  { slug: 'oliwia-puchacz-5-klamcow', title: 'Oliwia Puchacz · 5 kłamców vs ja', category: 'youtube', kind: OP, ...yt('oliwia-puchacz-5-klamcow', 'tvWxRsfMyPs') },
  { slug: 'reel-c0egrdgoktv', title: 'Pan Lektor', category: 'social', kind: SOCIAL, ...ig('reel-c0egrdgoktv', 'C0EGRdGokTV') },
  { slug: 'foto-wizerunek', title: 'Majka Jeżowska, Sober Polish Girl, Oh Blair', category: 'foto', kind: l('Sesje wizerunkowe', 'Image shoots', 'Sesiones de imagen'), ...albumCover('wizerunek') },
  { slug: 'creative-marlena-olszewska', title: 'Marlena Olszewska PMU · Logo i wizytówki', category: 'creative', kind: l('Branding / Identyfikacja', 'Branding / Identity', 'Branding / Identidad'), ...albumCover('marlena-olszewska') },
  { slug: 'oliwia-puchacz-6-klamcow', title: 'Oliwia Puchacz · 6 kłamców vs ja', category: 'youtube', kind: OP, ...yt('oliwia-puchacz-6-klamcow', 'NThPC-I5ryM') },
  { slug: 'reel-dux5rogjblj', title: 'Havana Events Space', category: 'social', kind: SOCIAL, ...ig('reel-dux5rogjblj', 'DUX5roGjBLJ') },
  { slug: 'oliwia-puchacz-ranking-influencerek', title: 'Oliwia Puchacz · Która influencerka jest najlepsza?', category: 'youtube', kind: OP, ...yt('oliwia-puchacz-ranking-influencerek', 'YRsRiboKDIg') },
  { slug: 'foto-produktowe', title: 'Colibra, Oh Blair, Byoli · Produkty', category: 'foto', kind: l('Fotografia produktowa', 'Product photography', 'Fotografía de producto'), ...albumCover('produktowe') },
  { slug: 'creative-vr-health-champions', title: 'VR Health Champions · Kampania Open Call', category: 'creative', kind: l('Grafika social media', 'Social media design', 'Diseño para redes sociales'), ...albumCover('vr-health-champions') },
  { slug: 'reel-ddj6vegogwf', title: 'Pan Lektor', category: 'social', kind: SOCIAL, ...ig('reel-ddj6vegogwf', 'DDJ6veGogWf') },
  { slug: 'oliwia-puchacz-randka-w-ciemno-outfit', title: 'Oliwia Puchacz · Randka w ciemno na bazie outfitu', category: 'youtube', kind: OP, ...yt('oliwia-puchacz-randka-w-ciemno-outfit', 'gEoXXfJal8I') },
  { slug: 'reel-c5gncq5mtdn', title: 'Colibra · Emirates Fashion Week Dubai', category: 'social', kind: SOCIAL, ...ig('reel-c5gncq5mtdn', 'C5GNcq5MTDn') },
  { slug: 'foto-social-media', title: 'Majka & Malik, Pan Lektor, Stifler', category: 'foto', kind: l('Sesje do social media', 'Social media shoots', 'Sesiones para redes sociales'), ...albumCover('social-media') },
  { slug: 'creative-muzeum-polin', title: 'Muzeum POLIN · Przypinki do sklepu', category: 'creative', kind: l('Merch / Projekt', 'Merch / Design', 'Merch / Diseño'), ...albumCover('muzeum-polin') },
  { slug: 'legendy-showbiznesu-katarzyna-zak', title: 'Legendy Showbiznesu · Katarzyna Żak', category: 'youtube', kind: l('Podcast / Złota Scena', 'Podcast / Złota Scena', 'Podcast / Złota Scena'), ...yt('legendy-showbiznesu-katarzyna-zak', 'fuy62dsW8LU') },
  { slug: 'reel-c4nryuev9m', title: 'Colibra · Dubai', category: 'social', kind: SOCIAL, ...ig('reel-c4nryuev9m', 'C4NRyuev9M_') },
  { slug: 'rozmowy-na-plotnie-marzena-rogalska', title: 'Rozmowy na płótnie · Marzena Rogalska', category: 'youtube', kind: l('Podcast', 'Podcast', 'Podcast'), ...yt('rozmowy-na-plotnie-marzena-rogalska', 'm7xa0BZkQnA') },
  { slug: 'foto-portrety', title: 'Portrety · Majka Jeżowska, Helena Deeds', category: 'foto', kind: l('Portret', 'Portrait', 'Retrato'), ...albumCover('portrety') },
  { slug: 'creative-dr-gumkowski', title: 'dr Gumkowski · Social media kliniki', category: 'creative', kind: l('Grafika social media', 'Social media design', 'Diseño para redes sociales'), ...albumCover('dr-gumkowski') },
  { slug: 'reel-dvqubOycb7q', title: 'Rozmowy na płótnie', category: 'social', kind: SOCIAL, ...ig('reel-dvqubOycb7q', 'DVqubOYCB7q') },
  { slug: 'anna-puslecka-podcast-adam-ferency', title: 'Anna Puślecka Podcast · Adam Ferency', category: 'youtube', kind: l('Rolka / Podcast', 'Reel / Podcast', 'Reel / Podcast'), ...yt('anna-puslecka-podcast-adam-ferency', 'E0DAIhiHDF0', true) },
  { slug: 'reel-c-nc1izoclz', title: 'AGklinik · dr Adam Gumkowski', category: 'social', kind: SOCIAL, ...ig('reel-c-nc1izoclz', 'C_nC1IzocLz') },
  { slug: 'foto-reportaze', title: 'Pokojowa Nagroda Nobla · Oslo', category: 'foto', kind: l('Reportaż', 'Reportage', 'Reportaje'), ...albumCover('reportaze') },
  { slug: 'creative-dermokosmetyki', title: 'Dermokosmetyki · Reklama produktu', category: 'creative', kind: l('Reklama / Key visual', 'Ad / Key visual', 'Anuncio / Key visual'), ...albumCover('dermokosmetyki') },
  { slug: 'anna-puslecka-podcast-dzieci', title: 'Anna Puślecka Podcast · Nie będę mogła mieć dzieci', category: 'youtube', kind: l('Rolka / Podcast', 'Reel / Podcast', 'Reel / Podcast'), ...yt('anna-puslecka-podcast-dzieci', '0PBhRGidvRA', true) },
  { slug: 'reel-c7gqs9ondgb', title: 'AGklinik · Paweł Tyburski', category: 'social', kind: SOCIAL, ...ig('reel-c7gqs9ondgb', 'C7GqS9oNDgb') },
  { slug: 'swiat-gosi-daj-sie-wyczaic', title: 'Świat Gosi · Daj się wyczaić', category: 'youtube', kind: l('Produkcja YouTube', 'YouTube production', 'Producción de YouTube'), ...yt('swiat-gosi-daj-sie-wyczaic', 'oxgrf_u2O4Y') },
  { slug: 'foto-wnetrza', title: 'Sesje wnętrz · Lauda, Soho Praga, Nugat Studio', category: 'foto', kind: l('Fotografia wnętrz', 'Interior photography', 'Fotografía de interiores'), ...albumCover('wnetrza') },
  { slug: 'creative-dni-morza', title: 'Dni Morza 2024 · Plakat', category: 'creative', kind: l('Plakat', 'Poster', 'Póster'), ...albumCover('dni-morza') },
  { slug: 'reel-csvt-qwioi', title: 'Magda Atkins · Bobbi Brown', category: 'social', kind: SOCIAL, ...ig('reel-csvt-qwioi', 'CsVt-QwIOI_') },
  { slug: 'gosia-w-warszawie', title: 'Gosia w Warszawie', category: 'youtube', kind: l('Produkcja YouTube / Świat Gosi', 'YouTube production / Świat Gosi', 'Producción de YouTube / Świat Gosi'), ...yt('gosia-w-warszawie', 's92xjCalMEQ') },
  { slug: 'foto-nieruchomosci', title: 'Ipanema · Nieruchomości', category: 'foto', kind: l('Fotografia nieruchomości', 'Real estate photography', 'Fotografía inmobiliaria'), ...albumCover('nieruchomosci') },
  { slug: 'creative-logo-i-grafika', title: 'Majka Jeżowska, Rozmowy na płótnie, EIT Health · Logo i merch', category: 'creative', kind: l('Logo / Merch', 'Logo / Merch', 'Logo / Merch'), ...albumCover('logo-i-grafika') },
  /* ARIA MARTELLE · always last (music videos, backstage vlogs, her campaigns and reels) */
  { slug: 'aria-martelle-rollercoaster', title: 'Aria Martelle · Rollercoaster', category: 'video', kind: MV, ...yt('aria-martelle-rollercoaster', 'qxRerk_nlbU') },
  { slug: 'aria-martelle-lewa-prawa', title: 'Aria Martelle · Lewa Prawa', category: 'video', kind: MV, ...yt('aria-martelle-lewa-prawa', '-kyeBeWX5os') },
  { slug: 'aria-martelle-milosc-roztopi-snieg', title: 'Aria Martelle · Miłość roztopi śnieg', category: 'video', kind: MV, ...yt('aria-martelle-milosc-roztopi-snieg', 'BW0Sz2ROPKw') },
  { slug: 'aria-martelle-chce-cie-miec', title: 'Aria Martelle · Chcę Cię mieć', category: 'video', kind: MV, ...yt('aria-martelle-chce-cie-miec', 'FyELq6xYVpw') },
  { slug: 'aria-martelle-szkoda-aury', title: 'Aria Martelle x Wiktor Martelle · Szkoda Aury', category: 'video', kind: MV, ...yt('aria-martelle-szkoda-aury', 'klEyvjtES2Y') },
  { slug: 'aria-martelle-you-decide', title: 'Aria Martelle · You Decide', category: 'video', kind: MV, ...yt('aria-martelle-you-decide', 'POjBtvIDITg') },
  { slug: 'aria-martelle-alarm', title: 'Aria Martelle · Alarm', category: 'video', kind: MV, ...yt('aria-martelle-alarm', 'mkiLlrsZXOY') },
  { slug: 'aria-martelle-tancz', title: 'Aria Martelle · Tańcz', category: 'video', kind: MV, ...yt('aria-martelle-tancz', 'Ee3UTK5oF-4') },
  { slug: 'aria-martelle-zabawa-z-ogniem', title: 'Aria Martelle · Zabawa z Ogniem', category: 'video', kind: l('Reżyseria', 'Direction', 'Dirección'), ...yt('aria-martelle-zabawa-z-ogniem', 'j9vdDPhEMUI') },
  { slug: 'vlog-szkoda-aury-backstage', title: 'Aria Martelle · Backstage teledysku Szkoda Aury', category: 'vlog', kind: VLOG, ...yt('vlog-szkoda-aury-backstage', 'ny59syBjXcA') },
  { slug: 'vlog-chce-cie-miec-backstage', title: 'Aria Martelle · Backstage klipu Chcę Cię mieć', category: 'vlog', kind: VLOG, ...yt('vlog-chce-cie-miec-backstage', 'hi_1KbLKbAw') },
  { slug: 'kampania-dcqmdhxjsnv', title: 'CoolPack × Aria Martelle', category: 'kampanie', kind: REEL, ...ig('kampania-dcqmdhxjsnv', 'DcQmdhxjSnV') },
  { slug: 'kampania-dalmmsotpgv', title: 'Aria Martelle · Wakacyjny camp na Bali', category: 'kampanie', kind: REEL, ...ig('kampania-dalmmsotpgv', 'DaLMMSOtpgV') },
  { slug: 'kampania-dwl4qojsgkx', title: 'Mandoria × Aria Martelle', category: 'kampanie', kind: REEL, ...ig('kampania-dwl4qojsgkx', 'DWl4QOjsgkX') },
  { slug: 'kampania-dscbzosjyhy', title: 'Aria Martelle', category: 'kampanie', kind: REEL, ...ig('kampania-dscbzosjyhy', 'DScbZoSjYhY') },
  { slug: 'kampania-dkjbvpdi-b8', title: 'Mandoria', category: 'kampanie', kind: REEL, ...ig('kampania-dkjbvpdi-b8', 'DKjbVpdI-b8') },
  { slug: 'kampania-zn8mx6vfx', title: 'Chupa Chups × Aria Martelle', category: 'kampanie', kind: TIKTOK, ...tt('kampania-zn8mx6vfx', 'https://www.tiktok.com/@aria.martelle/video/7537310690424409366') },
  { slug: 'kampania-zn8mxy5tv', title: 'Chupa Chups × Aria Martelle · Dzień Lizaka', category: 'kampanie', kind: TIKTOK, ...tt('kampania-zn8mxy5tv', 'https://www.tiktok.com/@aria.martelle/video/7529928551349488918') },
  { slug: 'kampania-zn8mxpbea', title: 'The Voice Comeback Stage × Orange', category: 'kampanie', kind: TIKTOK, ...tt('kampania-zn8mxpbea', 'https://www.tiktok.com/@aria.martelle/video/7555526943999905046') },
  { slug: 'kampania-zn8mxdo8j', title: 'Chupa Chups × Aria Martelle · Back to School', category: 'kampanie', kind: TIKTOK, ...tt('kampania-zn8mxdo8j', 'https://www.tiktok.com/@aria.martelle/video/7544014907902151958') },
  { slug: 'kampania-zn8mx5taa', title: 'Netflix · XO, Kitty', category: 'kampanie', kind: TIKTOK, ...tt('kampania-zn8mx5taa', 'https://www.tiktok.com/@netflixpl/video/7466883093870234902') },
  { slug: 'kampania-ddqsjh6t4w0', title: 'Aria Martelle', category: 'kampanie', kind: REEL, ...ig('kampania-ddqsjh6t4w0', 'DdqSJh6t4W0') },
  { slug: 'kampania-drzy01aju05', title: 'Empik · Klub Muzyki', category: 'kampanie', kind: REEL, ...ig('kampania-drzy01aju05', 'DRzy01AjU05') },
  { slug: 'reel-dk9yrwtn5jd', title: 'Aria Martelle · Rockstar Birthday Party', category: 'social', kind: SOCIAL, ...ig('reel-dk9yrwtn5jd', 'DK9yRWTN5jd') },
  { slug: 'creative-aria-merch', title: 'Aria Martelle · Merch, plakaty trasy i okładki', category: 'creative', kind: l('Merch / Plakaty', 'Merch / Posters', 'Merch / Pósters'), ...albumCover('aria-merch') },
]

export const PROJECTS_PAGE = {
  eyebrow: l('Projekty', 'Projects', 'Proyectos'),
  meta: ['Selected works', '2018 / 2026'],
  title: l('Selected\n*works.*', 'Selected\n*works.*', 'Selected\n*works.*'),
  tagline: l(
    'Wybrane projekty, które pokazują, co potrafimy zrobić, kiedy strategia, kreacja i produkcja spotykają się w jednym miejscu.',
    'Selected projects that show what we can do when strategy, creative and production meet in one place.',
    'Proyectos seleccionados que muestran lo que podemos hacer cuando estrategia, creatividad y producción se encuentran en un mismo lugar.',
  ),
  scroll: l('Zobacz', 'See', 'Ver'),
  gridEyebrow: l('Selected works', 'Selected works', 'Selected works'),
  gridTitle: l('Projekty, które *zostają.*', 'Projects that *last.*', 'Proyectos que *perduran.*'),
  empty: l('W tej kategorii materiały są w przygotowaniu.', 'Materials in this category are being prepared.', 'Los materiales de esta categoría están en preparación.'),
  cta: {
    eyebrow: l('Twój projekt', 'Your project', 'Tu proyecto'),
    title: l('Teraz zróbmy\ncoś, co warto\nbędzie *pokazać.*', 'Now let\'s make\nsomething worth\n*showing.*', 'Ahora hagamos\nalgo que valga la pena\n*mostrar.*'),
    lead: l(
      'Masz pomysł, brief albo dopiero punkt wyjścia?\nPorozmawiajmy o tym, co możemy z niego zrobić.',
      'Got an idea, a brief or just a starting point?\nLet\'s talk about what we can make of it.',
      '¿Tienes una idea, un brief o solo un punto de partida?\nHablemos de lo que podemos hacer con ello.',
    ),
    button: l('Porozmawiajmy', "Let's talk", 'Hablemos'),
  },
}

/**
 * Home carousel "Ludzie. Marki. Historie." — explicit order from the client's voice note (2026-10-16):
 * premium first (Colibra black jewellery, Chanel), Kasia Zdanowicz, Pan Lektor, one Aria (Rollercoaster — client 2026-10-16: not Zabawa z ogniem), one Oliwia (Face Off),
 * Rozmowy na płótnie only as a reel. Supabase `featured` mirrors this list.
 */
export const HOME_FEATURED = [
  'foto-colibra',
  'foto-chanel',
  'foto-kasia-zdanowicz',
  'kampania-czevvsjolni',
  'anna-jurksztowicz-varsovie',
  'aria-martelle-rollercoaster',
  'face-off-2-randka-w-ciemno',
  'metamorfozy-przyszlosci-helena-deeds',
  'majka-jezowska-vlog-kuba-wojewodzki',
  'legendy-showbiznesu-katarzyna-zak',
  'kampania-ddi1luoikgi',
  'reel-dvqubOycb7q',
]
