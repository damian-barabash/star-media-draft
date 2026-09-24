import { l, type L } from '../i18n/types'

export type Talent = { slug: string; name: string; role: L; handle: string; image?: string | null; instagram?: string }

/** Static fallback roster (Supabase `talents` table overrides when available). Photos: pending from client. */
export const TALENTS: Talent[] = [
  { slug: 'katarzyna-zdanowicz', name: 'Katarzyna Zdanowicz', role: l('Dziennikarka / Prezenterka', 'Journalist / Presenter', 'Periodista / Presentadora'), handle: '@katarzyna_zdanowicz' },
  { slug: 'aria-martelle', name: 'Aria Martelle', role: l('Artystka / Creator', 'Artist / Creator', 'Artista / Creadora'), handle: '@ariamartelle' },
  { slug: 'przebudzenie-joanny', name: 'Przebudzenie Joanny', role: l('Podcast · Lifestyle', 'Podcast · Lifestyle', 'Podcast · Lifestyle'), handle: '@przebudzenie_joanny' },
  { slug: 'rozmowy-na-plotnie', name: 'Rozmowy na płótnie', role: l('Podcast · Sztuka', 'Podcast · Art', 'Podcast · Arte'), handle: '@rozmowy_na_plotnie' },
  { slug: 'pan-lektor', name: 'Pan Lektor', role: l('Creator / Entertainment', 'Creator / Entertainment', 'Creador / Entretenimiento'), handle: '@pan_lektor_hotelparadise' },
  { slug: 'majeczka', name: 'Majeczka', role: l('Influencerka · Fashion', 'Influencer · Fashion', 'Influencer · Moda'), handle: '@majeczka' },
]

/** 3 featured on the management service page (client: "3 do 5 wybranych osób"). */
export const FEATURED_TALENT_SLUGS = ['aria-martelle', 'katarzyna-zdanowicz', 'pan-lektor']

export const TALENTS_PAGE = {
  eyebrow: l('03 / Talenty', '03 / Talents', '03 / Talentos'),
  meta: ['Roster 2026', l('Selected talents', 'Selected talents', 'Selected talents')],
  title: l('Talent is just\n*the beginning.*', 'Talent is just\n*the beginning.*', 'Talent is just\n*the beginning.*'),
  tagline: l(
    'Reprezentujemy osobowości, które mają coś więcej niż zasięg. Budujemy kariery, rozwijamy marki osobiste i tworzymy projekty, które wychodzą poza social media.',
    'We represent personalities who have more than reach. We build careers, develop personal brands and create projects that go beyond social media.',
    'Representamos personalidades que tienen algo más que alcance. Construimos carreras, desarrollamos marcas personales y creamos proyectos que van más allá de las redes sociales.',
  ),
  scroll: l('Poznaj', 'Meet', 'Conoce'),

  roster: {
    eyebrow: l('Wybrani z rosteru', 'Selected from the roster', 'Seleccionados del roster'),
    title: l('Poznaj *naszych.*', 'Meet *ours.*', 'Conoce a los *nuestros.*'),
    lead: l(
      'Wybrane osobowości reprezentowane przez Star Media. Pełny roster dostępny na zapytanie.',
      'Selected personalities represented by Star Media. Full roster available on request.',
      'Personalidades seleccionadas representadas por Star Media. Roster completo disponible bajo petición.',
    ),
  },

  cta: {
    eyebrow: l('Dla talentów', 'For talents', 'Para talentos'),
    title: l('Masz to coś?\nMy wiemy, co z tym *zrobić.*', 'Got that something?\nWe know what to *do with it.*', '¿Tienes ese algo?\nSabemos qué *hacer con ello.*'),
    lead: l(
      'Nie szukamy każdego. Szukamy osobowości, z którymi można zbudować coś większego.',
      "We're not looking for everyone. We're looking for personalities we can build something bigger with.",
      'No buscamos a cualquiera. Buscamos personalidades con las que construir algo más grande.',
    ),
    button: l('Pokaż się', 'Show yourself', 'Muéstrate'),
  },
}
