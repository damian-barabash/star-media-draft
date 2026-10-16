import { l, type L } from '../i18n/types'

/**
 * Photo bands (2026-10-16): the client's own photos (Foto_od_klienta/client_bands.py) or graded stills from our videos
 * (Zdjecia_strony/make_photos.py) — no stock, no AI.
 * Wide 2400x1030 + mobile 4:5 864x1080 in public/photos (source: PROJEKTY/Star-Media/Zdjecia_strony/make_photos.py).
 */
export type Photo = { image: string; mobile: string; caption: L; alt: string }

const from = (work: string) => l(`Z naszych realizacji — ${work}`, `From our work — ${work}`, `De nuestros trabajos — ${work}`)
const band = (path: string, work: string, alt: string): Photo => ({ image: `/photos/${path}.webp`, mobile: `/photos/${path}-m.webp`, caption: from(work), alt })

const COLIBRA = 'Colibra · Black & Gold Fashion Runway'
const VARSOVIE = 'Anna Jurksztowicz feat. Chris Schittulli · Varsovie'
const METAMORFOZY = 'Metamorfozy Przyszłości · Helena Deeds'

export const PAGE_PHOTOS = {
  services: band('uslugi-strona', COLIBRA, 'Pokaz biżuterii Colibra, modelka na wybiegu'),
  influencer: band('influencer-marketing', 'Rozmowy na płótnie · Marzena Rogalska', 'Nagranie podcastu Rozmowy na płótnie'),
  contact: band('kontakt', VARSOVIE, 'Most Świętokrzyski w Warszawie, plan teledysku Varsovie'),
}

/** Story photo on /o-nas (4:5). */
export const ABOUT_PHOTO = { image: '/photos/about.webp', alt: 'Scena pokazu z logo star-media.pl i miejscami Star Media VIP' }

export const SERVICE_PHOTOS: Record<string, Photo> = {
  'management-talentow': band('uslugi/management-talentow', 'Majka Jeżowska · sesja wizerunkowa', 'Majka Jeżowska z zespołem, sesja wizerunkowa'),
  'influencer-marketing': band('uslugi/influencer-marketing', 'Face Off 2 · Randka w ciemno', 'Nagranie formatu Face Off 2'),
  'digital-social-media': band('uslugi/digital-social-media', 'Vlogmas · Świąteczne grzanie', 'Nagranie odcinka Vlogmas'),
  'produkcja-video-foto-creative': band('uslugi/produkcja-video-foto-creative', VARSOVIE, 'Kadr z teledysku Varsovie'),
  'formaty-i-zasieg-organiczny': band('uslugi/formaty-i-zasieg-organiczny', 'Legendy Showbiznesu · Katarzyna Żak', 'Studio podcastu Legendy Showbiznesu'),
  'pr-i-media': band('uslugi/pr-i-media', 'Pokojowa Nagroda Nobla · Oslo', 'Konferencja prasowa laureatów Pokojowej Nagrody Nobla'),
  'eventy-i-wydarzenia-specjalne': band('uslugi/eventy-i-wydarzenia-specjalne', 'Chanel Chance Event', 'Goście eventu Chanel Chance'),
  'koncerty-i-live-entertainment': band('uslugi/koncerty-i-live-entertainment', 'Rock&Roll · Progresja', 'Publiczność koncertu w Progresji'),
  'merch-i-produkty': band('uslugi/merch-i-produkty', 'Byoli Store', 'Bluzy Byoli Store'),
  'budowa-marek-i-projekty-specjalne': band('uslugi/budowa-marek-i-projekty-specjalne', 'Colibra · Black & Gold', 'Pokaz Colibra Black & Gold'),
  'www-e-commerce-i-aplikacje': band('uslugi/www-e-commerce-i-aplikacje', METAMORFOZY, 'Helena Deeds z telefonem'),
  'ai-i-automatyzacje': band('uslugi/ai-i-automatyzacje', METAMORFOZY, 'Skan twarzy na tablecie'),
  'branding-design-i-identyfikacja': band('uslugi/branding-design-i-identyfikacja', 'Spidersys · Brand book', 'Wizytówki i identyfikacja Spidersys'),
  'strategia-i-kreacja': band('uslugi/strategia-i-kreacja', METAMORFOZY, 'Konsultacja w programie Metamorfozy Przyszłości'),
}
