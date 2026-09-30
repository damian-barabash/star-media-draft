import { l, type L } from '../i18n/types'

export type ProjectCategory = 'video' | 'vlog' | 'youtube' | 'kampanie' | 'podcasty' | 'social' | 'foto' | 'eventy' | 'creative'

export type Project = {
  slug: string
  title: string
  category: ProjectCategory
  /** short caption "Teledysk / Video / ..." */
  kind: L | string
  image?: string | null
  video?: string | null
  featured?: boolean
}

/** Vertical (9:16) covers: reels / TikToks. */
export const isVertical = (p: Pick<Project, 'category'>) => p.category === 'kampanie'

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

const yt = (id: string, shorts = false) => ({ image: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`, video: shorts ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}` })
/** YouTube link with the cover the client picked (public/projects/<file>.webp) */
const ytCover = (id: string, file: string) => ({ image: `/projects/${file}.webp`, video: `https://www.youtube.com/watch?v=${id}` })
const ig = (id: string) => ({ image: `/projects/kampania-${id.toLowerCase()}.webp`, video: `https://www.instagram.com/reel/${id}/` })
const tt = (short: string, url: string) => ({ image: `/projects/kampania-${short.toLowerCase()}.webp`, video: url })

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
  /* VIDEO */
  { slug: 'anna-jurksztowicz-varsovie', title: 'Anna Jurksztowicz feat. Chris Schittulli · Varsovie', category: 'video', kind: MV, ...yt('FB16i1Bzkbc') },
  { slug: 'aria-martelle-rollercoaster', title: 'Aria Martelle · Rollercoaster', category: 'video', kind: MV, featured: true, ...yt('qxRerk_nlbU') },
  { slug: 'aria-martelle-lewa-prawa', title: 'Aria Martelle · Lewa Prawa', category: 'video', kind: MV, ...yt('-kyeBeWX5os') },
  { slug: 'aria-martelle-milosc-roztopi-snieg', title: 'Aria Martelle · Miłość roztopi śnieg', category: 'video', kind: MV, ...ytCover('BW0Sz2ROPKw', 'aria-martelle-milosc-roztopi-snieg') },
  { slug: 'aria-martelle-chce-cie-miec', title: 'Aria Martelle · Chcę Cię mieć', category: 'video', kind: MV, ...ytCover('FyELq6xYVpw', 'aria-martelle-chce-cie-miec') },
  { slug: 'aria-martelle-szkoda-aury', title: 'Aria Martelle x Wiktor Martelle · Szkoda Aury', category: 'video', kind: MV, ...ytCover('klEyvjtES2Y', 'aria-martelle-szkoda-aury') },
  { slug: 'aria-martelle-you-decide', title: 'Aria Martelle · You Decide', category: 'video', kind: MV, ...ytCover('POjBtvIDITg', 'aria-martelle-you-decide') },
  { slug: 'aria-martelle-alarm', title: 'Aria Martelle · Alarm', category: 'video', kind: MV, ...yt('mkiLlrsZXOY') },
  { slug: 'aria-martelle-tancz', title: 'Aria Martelle · Tańcz', category: 'video', kind: MV, ...ytCover('Ee3UTK5oF-4', 'aria-martelle-tancz') },
  { slug: 'aria-martelle-zabawa-z-ogniem', title: 'Aria Martelle · Zabawa z Ogniem', category: 'video', kind: l('Reżyseria', 'Direction', 'Dirección'), featured: true, ...yt('j9vdDPhEMUI') },
  /* VLOG */
  { slug: 'vlog-szkoda-aury-backstage', title: 'Aria Martelle · Backstage teledysku Szkoda Aury', category: 'vlog', kind: VLOG, ...ytCover('ny59syBjXcA', 'vlog-szkoda-aury-backstage') },
  { slug: 'vlog-chce-cie-miec-backstage', title: 'Aria Martelle · Backstage klipu Chcę Cię mieć', category: 'vlog', kind: VLOG, ...ytCover('hi_1KbLKbAw', 'vlog-chce-cie-miec-backstage') },
  /* YOUTUBE (incl. former Podcasty tab) · "Daj się wyczaić" and "Gosia w Warszawie" go last */
  { slug: 'face-off-2-randka-w-ciemno', title: 'Face Off 2 · Randka w ciemno', category: 'youtube', kind: OP, featured: true, ...yt('5F2Vwkzobq4') },
  { slug: 'vlogmas-swiateczne-grzanie', title: 'Vlogmas · Świąteczne grzanie', category: 'youtube', kind: OP, ...yt('c5G9bB4sres') },
  { slug: 'metamorfozy-przyszlosci-helena-deeds', title: 'Metamorfozy Przyszłości · Helena Deeds', category: 'youtube', kind: l('Program / SHOWNEWSPL', 'Show / SHOWNEWSPL', 'Programa / SHOWNEWSPL'), featured: true, ...yt('Ofu7MDWxnBA') },
  { slug: 'majka-jezowska-vlog-kuba-wojewodzki', title: 'Majka Jeżowska Vlog · Kuba Wojewódzki', category: 'youtube', kind: l('Vlog / YouTube', 'Vlog / YouTube', 'Vlog / YouTube'), featured: true, ...yt('D6eYgPmuCRU') },
  { slug: 'oliwia-puchacz-czyj-to-zawod', title: 'Oliwia Puchacz · Dopasuj zawód do osoby', category: 'youtube', kind: OP, ...ytCover('Vck4hHQs98k', 'oliwia-puchacz-czyj-to-zawod') },
  { slug: 'oliwia-puchacz-5-klamcow', title: 'Oliwia Puchacz · 5 kłamców vs ja', category: 'youtube', kind: OP, ...ytCover('tvWxRsfMyPs', 'oliwia-puchacz-5-klamcow') },
  { slug: 'oliwia-puchacz-6-klamcow', title: 'Oliwia Puchacz · 6 kłamców vs ja', category: 'youtube', kind: OP, ...ytCover('NThPC-I5ryM', 'oliwia-puchacz-6-klamcow') },
  { slug: 'oliwia-puchacz-ranking-influencerek', title: 'Oliwia Puchacz · Która influencerka jest najlepsza?', category: 'youtube', kind: OP, ...ytCover('YRsRiboKDIg', 'oliwia-puchacz-ranking-influencerek') },
  { slug: 'oliwia-puchacz-randka-w-ciemno-outfit', title: 'Oliwia Puchacz · Randka w ciemno na bazie outfitu', category: 'youtube', kind: OP, ...ytCover('gEoXXfJal8I', 'oliwia-puchacz-randka-w-ciemno-outfit') },
  { slug: 'legendy-showbiznesu-katarzyna-zak', title: 'Legendy Showbiznesu · Katarzyna Żak', category: 'youtube', kind: l('Podcast / Złota Scena', 'Podcast / Złota Scena', 'Podcast / Złota Scena'), featured: true, ...yt('fuy62dsW8LU') },
  { slug: 'rozmowy-na-plotnie-marzena-rogalska', title: 'Rozmowy na płótnie · Marzena Rogalska', category: 'youtube', kind: l('Podcast', 'Podcast', 'Podcast'), featured: true, ...yt('m7xa0BZkQnA') },
  { slug: 'anna-puslecka-podcast-adam-ferency', title: 'Anna Puślecka Podcast · Adam Ferency', category: 'youtube', kind: l('Rolka / Podcast', 'Reel / Podcast', 'Reel / Podcast'), ...yt('E0DAIhiHDF0', true) },
  { slug: 'anna-puslecka-podcast-dzieci', title: 'Anna Puślecka Podcast · Nie będę mogła mieć dzieci', category: 'youtube', kind: l('Rolka / Podcast', 'Reel / Podcast', 'Reel / Podcast'), ...yt('0PBhRGidvRA', true) },
  { slug: 'swiat-gosi-daj-sie-wyczaic', title: 'Świat Gosi · Daj się wyczaić', category: 'youtube', kind: l('Produkcja YouTube', 'YouTube production', 'Producción de YouTube'), ...yt('oxgrf_u2O4Y') },
  { slug: 'gosia-w-warszawie', title: 'Gosia w Warszawie', category: 'youtube', kind: l('Produkcja YouTube / Świat Gosi', 'YouTube production / Świat Gosi', 'Producción de YouTube / Świat Gosi'), ...yt('s92xjCalMEQ') },
  /* KAMPANIE · client's order (covers: Instagram / TikTok stills, public/projects/kampania-*.webp) */
  { slug: 'kampania-c0l_udxirlg', title: 'Pan Lektor', category: 'kampanie', kind: REEL, ...ig('C0L_UdxIrLG') },
  { slug: 'kampania-dcqmdhxjsnv', title: 'CoolPack × Aria Martelle', category: 'kampanie', kind: REEL, ...ig('DcQmdhxjSnV') },
  { slug: 'kampania-czevvsjolni', title: 'Pan Lektor', category: 'kampanie', kind: REEL, ...ig('CzEVVsjoLNI') },
  { slug: 'kampania-ddi1luoikgi', title: 'Otodom', category: 'kampanie', kind: REEL, ...ig('Ddi1luOIKGI') },
  { slug: 'kampania-ddjfjphoiyf', title: 'Otodom', category: 'kampanie', kind: REEL, ...ig('DdJfjphoiYf') },
  { slug: 'kampania-dalmmsotpgv', title: 'Aria Martelle · Wakacyjny camp na Bali', category: 'kampanie', kind: REEL, ...ig('DaLMMSOtpgV') },
  { slug: 'kampania-dwl4qojsgkx', title: 'Mandoria × Aria Martelle', category: 'kampanie', kind: REEL, ...ig('DWl4QOjsgkX') },
  { slug: 'kampania-dscbzosjyhy', title: 'Aria Martelle', category: 'kampanie', kind: REEL, ...ig('DScbZoSjYhY') },
  { slug: 'kampania-dkjbvpdi-b8', title: 'Mandoria', category: 'kampanie', kind: REEL, ...ig('DKjbVpdI-b8') },
  { slug: 'kampania-zn8mx6vfx', title: 'Chupa Chups × Aria Martelle', category: 'kampanie', kind: TIKTOK, ...tt('ZN8MX6vFx', 'https://www.tiktok.com/@aria.martelle/video/7537310690424409366') },
  { slug: 'kampania-zn8mxy5tv', title: 'Chupa Chups × Aria Martelle · Dzień Lizaka', category: 'kampanie', kind: TIKTOK, ...tt('ZN8MXY5TV', 'https://www.tiktok.com/@aria.martelle/video/7529928551349488918') },
  { slug: 'kampania-zn8mxpbea', title: 'The Voice Comeback Stage × Orange', category: 'kampanie', kind: TIKTOK, ...tt('ZN8MXPBEA', 'https://www.tiktok.com/@aria.martelle/video/7555526943999905046') },
  { slug: 'kampania-zn8mxdo8j', title: 'Chupa Chups × Aria Martelle · Back to School', category: 'kampanie', kind: TIKTOK, ...tt('ZN8MXdo8J', 'https://www.tiktok.com/@aria.martelle/video/7544014907902151958') },
  { slug: 'kampania-zn8mx5taa', title: 'Netflix · XO, Kitty', category: 'kampanie', kind: TIKTOK, ...tt('ZN8MX5taA', 'https://www.tiktok.com/@netflixpl/video/7466883093870234902') },
  { slug: 'kampania-dljrty3i4dx', title: 'Pan Lektor', category: 'kampanie', kind: REEL, ...ig('DLjrty3I4DX') },
  { slug: 'kampania-ddqsjh6t4w0', title: 'Aria Martelle', category: 'kampanie', kind: REEL, ...ig('DdqSJh6t4W0') },
  { slug: 'kampania-drzy01aju05', title: 'Empik · Klub Muzyki', category: 'kampanie', kind: REEL, ...ig('DRzy01AjU05') },
  /* SOCIAL · Instagram reels from "Co i jak 3" (no stills yet) */
  { slug: 'reel-c0egrdgoktv', title: 'Reels · Star Media', category: 'social', kind: SOCIAL, video: 'https://www.instagram.com/reel/C0EGRdGokTV/' },
  { slug: 'reel-dux5rogjblj', title: 'Reels · Star Media', category: 'social', kind: SOCIAL, video: 'https://www.instagram.com/reel/DUX5roGjBLJ/' },
  { slug: 'reel-ddj6vegogwf', title: 'Reels · Star Media', category: 'social', kind: SOCIAL, video: 'https://www.instagram.com/reel/DDJ6veGogWf/' },
  { slug: 'reel-dk9yrwtn5jd', title: 'Reels · Star Media', category: 'social', kind: SOCIAL, video: 'https://www.instagram.com/reel/DK9yRWTN5jd/' },
  { slug: 'reel-c5gncq5mtdn', title: 'Reels · Star Media', category: 'social', kind: SOCIAL, video: 'https://www.instagram.com/reel/C5GNcq5MTDn/' },
  { slug: 'reel-c4nryuev9m', title: 'Reels · Star Media', category: 'social', kind: SOCIAL, video: 'https://www.instagram.com/reel/C4NRyuev9M_/' },
  { slug: 'reel-dvqubOycb7q', title: 'Reels · Star Media', category: 'social', kind: SOCIAL, video: 'https://www.instagram.com/reel/DVqubOYCB7q/' },
  { slug: 'reel-c-nc1izoclz', title: 'Reels · Star Media', category: 'social', kind: SOCIAL, video: 'https://www.instagram.com/reel/C_nC1IzocLz/' },
  { slug: 'reel-c7gqs9ondgb', title: 'Reels · Star Media', category: 'social', kind: SOCIAL, video: 'https://www.instagram.com/reel/C7GqS9oNDgb/' },
  { slug: 'reel-csvt-qwioi', title: 'Reels · Star Media', category: 'social', kind: SOCIAL, video: 'https://www.instagram.com/reel/CsVt-QwIOI_/' },
  /* Placeholders for categories awaiting client materials (Foto: client is preparing subfolders) */
  { slug: 'black-and-gold', title: 'Black & Gold', category: 'eventy', kind: l('Event / Fashion / Special Project', 'Event / Fashion / Special Project', 'Event / Fashion / Special Project') },
  { slug: 'sesja-kampanijna', title: 'Sesja kampanijna', category: 'foto', kind: l('Foto / Kampania', 'Photo / Campaign', 'Foto / Campaña') },
  { slug: 'key-visual', title: 'Key visual', category: 'creative', kind: l('Creative / Key visual', 'Creative / Key visual', 'Creative / Key visual') },
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
