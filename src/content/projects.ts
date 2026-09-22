import { l, type L } from '../i18n/types'

export type ProjectCategory = 'video' | 'youtube' | 'podcasty' | 'social' | 'foto' | 'eventy' | 'creative'

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

export const PROJECT_FILTERS: { key: 'all' | ProjectCategory; label: L }[] = [
  { key: 'all', label: l('Wszystkie', 'All', 'Todos') },
  { key: 'video', label: l('Video', 'Video', 'Vídeo') },
  { key: 'youtube', label: l('YouTube', 'YouTube', 'YouTube') },
  { key: 'podcasty', label: l('Podcasty', 'Podcasts', 'Podcasts') },
  { key: 'social', label: l('Social', 'Social', 'Social') },
  { key: 'foto', label: l('Foto', 'Photo', 'Foto') },
  { key: 'eventy', label: l('Eventy', 'Events', 'Eventos') },
  { key: 'creative', label: l('Creative', 'Creative', 'Creative') },
]

const yt = (id: string, shorts = false) => ({ image: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`, video: shorts ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}` })

/**
 * Static fallback portfolio (Supabase `projects` table overrides when available).
 * Built from the YouTube links the client sent in "Co i jak 3" — thumbnails come from YouTube,
 * so the grid is visual without hosting any images yet. Instagram reels need photos from the client.
 */
export const PROJECTS: Project[] = [
  { slug: 'aria-martelle-zabawa-z-ogniem', title: 'Aria Martelle — Zabawa z Ogniem', category: 'video', kind: l('Teledysk', 'Music video', 'Videoclip'), featured: true, ...yt('j9vdDPhEMUI') },
  { slug: 'aria-martelle-rollercoaster', title: 'Aria Martelle — Rollercoaster', category: 'video', kind: l('Teledysk', 'Music video', 'Videoclip'), featured: true, ...yt('qxRerk_nlbU') },
  { slug: 'aria-martelle-lewa-prawa', title: 'Aria Martelle — Lewa Prawa', category: 'video', kind: l('Teledysk', 'Music video', 'Videoclip'), ...yt('-kyeBeWX5os') },
  { slug: 'aria-martelle-alarm', title: 'Aria Martelle — Alarm', category: 'video', kind: l('Teledysk', 'Music video', 'Videoclip'), ...yt('mkiLlrsZXOY') },
  { slug: 'legendy-showbiznesu-katarzyna-zak', title: 'Legendy Showbiznesu — Katarzyna Żak', category: 'podcasty', kind: l('Podcast / Złota Scena', 'Podcast / Złota Scena', 'Podcast / Złota Scena'), featured: true, ...yt('fuy62dsW8LU') },
  { slug: 'rozmowy-na-plotnie-marzena-rogalska', title: 'Rozmowy na płótnie — Marzena Rogalska', category: 'podcasty', kind: l('Podcast', 'Podcast', 'Podcast'), featured: true, ...yt('m7xa0BZkQnA') },
  { slug: 'anna-puslecka-podcast-adam-ferency', title: 'Anna Puślecka Podcast — Adam Ferency', category: 'podcasty', kind: l('Rolka / Podcast', 'Reel / Podcast', 'Reel / Podcast'), ...yt('E0DAIhiHDF0', true) },
  { slug: 'anna-puslecka-podcast-dzieci', title: 'Anna Puślecka Podcast — Nie będę mogła mieć dzieci', category: 'podcasty', kind: l('Rolka / Podcast', 'Reel / Podcast', 'Reel / Podcast'), ...yt('0PBhRGidvRA', true) },
  { slug: 'face-off-2-randka-w-ciemno', title: 'Face Off 2 — Randka w ciemno', category: 'youtube', kind: l('Produkcja YouTube / Oliwia Puchacz', 'YouTube production / Oliwia Puchacz', 'Producción de YouTube / Oliwia Puchacz'), featured: true, ...yt('5F2Vwkzobq4') },
  { slug: 'swiat-gosi-daj-sie-wyczaic', title: 'Świat Gosi — Daj się wyczaić', category: 'youtube', kind: l('Produkcja YouTube', 'YouTube production', 'Producción de YouTube'), ...yt('oxgrf_u2O4Y') },
  { slug: 'gosia-w-warszawie', title: 'Gosia w Warszawie', category: 'youtube', kind: l('Produkcja YouTube / Świat Gosi', 'YouTube production / Świat Gosi', 'Producción de YouTube / Świat Gosi'), ...yt('s92xjCalMEQ') },
  { slug: 'vlogmas-swiateczne-grzanie', title: 'Vlogmas — Świąteczne grzanie', category: 'youtube', kind: l('Produkcja YouTube / Oliwia Puchacz', 'YouTube production / Oliwia Puchacz', 'Producción de YouTube / Oliwia Puchacz'), ...yt('c5G9bB4sres') },
  { slug: 'metamorfozy-przyszlosci-helena-deeds', title: 'Metamorfozy Przyszłości — Helena Deeds', category: 'youtube', kind: l('Program / SHOWNEWSPL', 'Show / SHOWNEWSPL', 'Programa / SHOWNEWSPL'), featured: true, ...yt('Ofu7MDWxnBA') },
  { slug: 'majka-jezowska-vlog-kuba-wojewodzki', title: 'Majka Jeżowska Vlog — Kuba Wojewódzki', category: 'youtube', kind: l('Vlog / YouTube', 'Vlog / YouTube', 'Vlog / YouTube'), featured: true, ...yt('D6eYgPmuCRU') },
  /* Instagram reels sent by the client — need stills from the client (no public thumbnail API) */
  { slug: 'reel-c0egrdgoktv', title: 'Reels · Star Media', category: 'social', kind: l('Reels / Social', 'Reels / Social', 'Reels / Social'), video: 'https://www.instagram.com/reel/C0EGRdGokTV/' },
  { slug: 'reel-dux5rogjblj', title: 'Reels · Star Media', category: 'social', kind: l('Reels / Social', 'Reels / Social', 'Reels / Social'), video: 'https://www.instagram.com/reel/DUX5roGjBLJ/' },
  { slug: 'reel-ddj6vegogwf', title: 'Reels · Star Media', category: 'social', kind: l('Reels / Social', 'Reels / Social', 'Reels / Social'), video: 'https://www.instagram.com/reel/DDJ6veGogWf/' },
  { slug: 'reel-dk9yrwtn5jd', title: 'Reels · Star Media', category: 'social', kind: l('Reels / Social', 'Reels / Social', 'Reels / Social'), video: 'https://www.instagram.com/reel/DK9yRWTN5jd/' },
  { slug: 'reel-c5gncq5mtdn', title: 'Reels · Star Media', category: 'social', kind: l('Reels / Social', 'Reels / Social', 'Reels / Social'), video: 'https://www.instagram.com/reel/C5GNcq5MTDn/' },
  { slug: 'reel-c4nryuev9m', title: 'Reels · Star Media', category: 'social', kind: l('Reels / Social', 'Reels / Social', 'Reels / Social'), video: 'https://www.instagram.com/reel/C4NRyuev9M_/' },
  { slug: 'reel-dvqubOycb7q', title: 'Reels · Star Media', category: 'social', kind: l('Reels / Social', 'Reels / Social', 'Reels / Social'), video: 'https://www.instagram.com/reel/DVqubOYCB7q/' },
  { slug: 'reel-c-nc1izoclz', title: 'Reels · Star Media', category: 'social', kind: l('Reels / Social', 'Reels / Social', 'Reels / Social'), video: 'https://www.instagram.com/reel/C_nC1IzocLz/' },
  { slug: 'reel-c7gqs9ondgb', title: 'Reels · Star Media', category: 'social', kind: l('Reels / Social', 'Reels / Social', 'Reels / Social'), video: 'https://www.instagram.com/reel/C7GqS9oNDgb/' },
  { slug: 'reel-csvt-qwioi', title: 'Reels · Star Media', category: 'social', kind: l('Reels / Social', 'Reels / Social', 'Reels / Social'), video: 'https://www.instagram.com/reel/CsVt-QwIOI_/' },
  /* Placeholders for categories awaiting client materials */
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
