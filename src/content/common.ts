import { l, type L } from '../i18n/types'

export const SITE = {
  email: 'hello@star-media.pl',
  instagram: '@star_media_pl',
  instagramUrl: 'https://instagram.com/star_media_pl',
  city: l('Warszawa, Polska', 'Warsaw, Poland', 'Varsovia, Polonia'),
  cityShort: l('Warszawa', 'Warsaw', 'Varsovia'),
  partner: l('Oficjalny partner Polska Press', 'Official Polska Press partner', 'Socio oficial de Polska Press'),
  tagline: l(
    'Łączymy ludzi, marki i media. Tworzymy projekty, które zostają.',
    'We connect people, brands and media. We create projects that last.',
    'Unimos personas, marcas y medios. Creamos proyectos que perduran.',
  ),
}

export type NavItem = { to: string; label: L; num: string }

export const NAV: NavItem[] = [
  { to: '/', num: '01', label: l('Strona główna', 'Home', 'Inicio') },
  { to: '/o-nas', num: '02', label: l('O nas', 'About', 'Nosotros') },
  { to: '/talenty', num: '03', label: l('Talenty', 'Talents', 'Talentos') },
  { to: '/uslugi', num: '04', label: l('Usługi', 'Services', 'Servicios') },
  { to: '/influencer-marketing', num: '05', label: l('Influencer Marketing', 'Influencer Marketing', 'Influencer Marketing') },
  { to: '/projekty', num: '06', label: l('Projekty', 'Projects', 'Proyectos') },
  { to: '/kontakt', num: '07', label: l('Kontakt', 'Contact', 'Contacto') },
]

export const UI = {
  menu: l('Menu', 'Menu', 'Menú'),
  close: l('Zamknij', 'Close', 'Cerrar'),
  scroll: l('Przewiń', 'Scroll', 'Desliza'),
  contact: l('Kontakt', 'Contact', 'Contacto'),
  location: l('Lokalizacja', 'Location', 'Ubicación'),
  social: l('Social', 'Social', 'Social'),
  partner: l('Partner', 'Partner', 'Socio'),
  navigation: l('Nawigacja', 'Navigation', 'Navegación'),
  services: l('Usługi', 'Services', 'Servicios'),
  cooperation: l('Współpraca', 'Work with us', 'Colaboración'),
  letsTalk: l('Porozmawiajmy', "Let's talk", 'Hablemos'),
  contactBtn: l('Kontakt', 'Contact', 'Contacto'),
  next: l('Dalej', 'Next', 'Siguiente'),
  meet: l('Poznaj', 'Meet', 'Conoce'),
  see: l('Zobacz', 'See', 'Ver'),
  form: l('Formularz', 'Form', 'Formulario'),
  allServices: l('Wszystkie usługi', 'All services', 'Todos los servicios'),
  seeProjects: l('Zobacz projekty', 'See projects', 'Ver proyectos'),
  meetTalents: l('Poznaj talenty', 'Meet the talents', 'Conoce a los talentos'),
  learnMore: l('Dowiedz się więcej', 'Learn more', 'Saber más'),
  prev: l('Poprzednia', 'Previous', 'Anterior'),
  nextSlide: l('Następna', 'Next', 'Siguiente'),
  dragHint: l('Przeciągnij, kliknij lub użyj strzałek.', 'Drag, click or use the arrows.', 'Arrastra, haz clic o usa las flechas.'),
  notFound: l('Nie ma takiej strony.', 'Page not found.', 'Página no encontrada.'),
  backHome: l('Wróć na stronę główną', 'Back to home', 'Volver al inicio'),
  loading: l('Wczytywanie', 'Loading', 'Cargando'),
  agency: l('Agencja', 'Agency', 'Agencia'),
  year: '2026',
  copyright: '© 2026 Star Media',
  footerBlurb: l(
    'Łączymy ludzi, marki i media. Management, influencer marketing, produkcja, PR, eventy, live, merch, web i AI. Oficjalny partner Polska Press.',
    'We connect people, brands and media. Management, influencer marketing, production, PR, events, live, merch, web and AI. Official Polska Press partner.',
    'Unimos personas, marcas y medios. Management, influencer marketing, producción, PR, eventos, live, merch, web e IA. Socio oficial de Polska Press.',
  ),
}
