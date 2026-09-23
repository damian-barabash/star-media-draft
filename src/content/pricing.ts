import { l, type L } from '../i18n/types'

/**
 * Orientation prices shown on selected service subpages.
 * Source: "Oferta — zakres usług i wycena" (2026-09). Net prices, "od" = starting from.
 */
export type PriceItem = { name: L; price: L }
export type PriceGroup = { title: L; items: PriceItem[] }
export type Pricing = { groups: PriceGroup[]; note: L; extra?: L }

/** "od 3 000 zł" → localized price string */
function price(pl: string): L {
  const num = pl.replace(/\s*zł/, '')
  const base = (n: string) => n.replace('od ', '').replace(' / mies.', '').replace(' / sztuka', '').replace(' / ujęcie', '').replace(' / h', '')
  const from = pl.startsWith('od ')
  const per = pl.includes('/ mies.') ? 'month' : pl.includes('/ sztuka') ? 'piece' : pl.includes('/ ujęcie') ? 'shot' : pl.includes('/ h') ? 'h' : ''
  const n = base(num)
  const perEn = per === 'month' ? ' / month' : per === 'piece' ? ' / piece' : per === 'shot' ? ' / shot' : per === 'h' ? ' / h' : ''
  const perEs = per === 'month' ? ' / mes' : per === 'piece' ? ' / pieza' : per === 'shot' ? ' / toma' : per === 'h' ? ' / h' : ''
  return {
    pl,
    en: `${from ? 'from ' : ''}${n} PLN${perEn}`,
    es: `${from ? 'desde ' : ''}${n} PLN${perEs}`,
  }
}
const individual = l('wycena indywidualna', 'individual quote', 'presupuesto individual')
const p = (pl: string, en: string, es: string, pr: string | L): PriceItem => ({ name: l(pl, en, es), price: typeof pr === 'string' ? price(pr) : pr })

const NOTE = l(
  'Wszystkie ceny netto, orientacyjne. Ostateczna wycena po ustaleniu zakresu.',
  'All prices net and indicative. Final quote after the scope is agreed.',
  'Todos los precios son netos y orientativos. Presupuesto final tras definir el alcance.',
)

const COOPERATION: PriceGroup = {
  title: l('Modele współpracy', 'Cooperation models', 'Modelos de colaboración'),
  items: [
    p('Projekt pod klucz — ustalony zakres, termin i budżet', 'Turnkey project — fixed scope, deadline and budget', 'Proyecto llave en mano — alcance, plazo y presupuesto fijos', l('wycena stała', 'fixed quote', 'presupuesto fijo')),
    p('Sprint MVP — 4–8 tygodni na działającą wersję', 'MVP sprint — 4–8 weeks to a working version', 'Sprint MVP — 4–8 semanas hasta una versión funcional', 'od 25 000 zł'),
    p('Abonament / retainer — stały zespół i strumień zadań', 'Subscription / retainer — a standing team and task stream', 'Suscripción / retainer — equipo fijo y flujo de tareas', 'od 6 000 zł / mies.'),
    p('Outstaffing — specjalista w Waszym zespole', 'Outstaffing — a specialist inside your team', 'Outstaffing — un especialista dentro de tu equipo', 'od 12 000 zł / mies.'),
    p('Konsultacje i audyt', 'Consulting and audit', 'Consultoría y auditoría', l('250 zł / h, audyt od 4 000 zł', '250 PLN / h, audit from 4 000 PLN', '250 PLN / h, auditoría desde 4 000 PLN')),
    p('Opieka i rozwój — monitoring, aktualizacje, kopie zapasowe', 'Care and growth — monitoring, updates, backups', 'Mantenimiento y desarrollo — monitorización, actualizaciones, copias', 'od 500 zł / mies.'),
  ],
}

const PAYMENT = l(
  'Płatność etapami: 40% zaliczki, 30% po akceptacji projektu, 30% przy odbiorze.',
  'Staged payment: 40% deposit, 30% after design approval, 30% on delivery.',
  'Pago por etapas: 40% de anticipo, 30% tras aprobar el diseño, 30% a la entrega.',
)

export const PRICING: Record<string, Pricing> = {
  /* ===== 11 — WWW, e-commerce i aplikacje ===== */
  'www-e-commerce-i-aplikacje': {
    note: NOTE,
    extra: PAYMENT,
    groups: [
      {
        title: l('Strony internetowe i sklepy', 'Websites and shops', 'Sitios web y tiendas'),
        items: [
          p('Landing page', 'Landing page', 'Landing page', 'od 3 000 zł'),
          p('Strona wizytówka — do 5 podstron', 'Brochure site — up to 5 pages', 'Web de presentación — hasta 5 páginas', 'od 6 000 zł'),
          p('Strona firmowa premium', 'Premium corporate site', 'Web corporativa premium', 'od 12 000 zł'),
          p('Strona butikowa — 3D i animacje', 'Boutique site — 3D and animation', 'Web boutique — 3D y animaciones', 'od 20 000 zł'),
          p('Sklep internetowy', 'Online shop', 'Tienda online', 'od 15 000 zł'),
          p('Dodatkowa wersja językowa', 'Additional language version', 'Versión de idioma adicional', 'od 1 500 zł'),
          p('Panel CMS / edycja treści', 'CMS panel / content editing', 'Panel CMS / edición de contenido', 'od 3 000 zł'),
          p('Opieka techniczna', 'Technical care', 'Mantenimiento técnico', 'od 500 zł / mies.'),
        ],
      },
      {
        title: l('Aplikacje webowe i SaaS', 'Web apps and SaaS', 'Aplicaciones web y SaaS'),
        items: [
          p('MVP aplikacji webowej', 'Web app MVP', 'MVP de aplicación web', 'od 25 000 zł'),
          p('Panel klienta / dashboard', 'Client panel / dashboard', 'Panel de cliente / dashboard', 'od 15 000 zł'),
          p('CRM dedykowany', 'Custom CRM', 'CRM a medida', 'od 20 000 zł'),
          p('System rezerwacji', 'Booking system', 'Sistema de reservas', 'od 12 000 zł'),
          p('Pełna platforma SaaS', 'Full SaaS platform', 'Plataforma SaaS completa', 'od 60 000 zł'),
          p('Moduł do istniejącego systemu', 'Module for an existing system', 'Módulo para un sistema existente', 'od 8 000 zł'),
          p('Rozwój i utrzymanie', 'Development and maintenance', 'Desarrollo y mantenimiento', 'od 3 000 zł / mies.'),
        ],
      },
      {
        title: l('Aplikacje mobilne i desktopowe', 'Mobile and desktop apps', 'Aplicaciones móviles y de escritorio'),
        items: [
          p('Aplikacja cross-platform — MVP', 'Cross-platform app — MVP', 'App multiplataforma — MVP', 'od 30 000 zł'),
          p('Aplikacja natywna iOS albo Android', 'Native iOS or Android app', 'App nativa iOS o Android', 'od 45 000 zł'),
          p('iOS + Android natywnie', 'iOS + Android natively', 'iOS + Android nativo', 'od 80 000 zł'),
          p('Aplikacja desktopowa', 'Desktop application', 'Aplicación de escritorio', 'od 25 000 zł'),
          p('Publikacja w sklepach', 'Store publication', 'Publicación en tiendas', 'od 2 000 zł'),
          p('Utrzymanie i aktualizacje', 'Maintenance and updates', 'Mantenimiento y actualizaciones', 'od 2 500 zł / mies.'),
        ],
      },
      {
        title: l('Backend, bazy danych, infrastruktura', 'Backend, databases, infrastructure', 'Backend, bases de datos, infraestructura'),
        items: [
          p('Projekt architektury', 'Architecture design', 'Diseño de arquitectura', 'od 5 000 zł'),
          p('API / backend do istniejącego frontu', 'API / backend for an existing front end', 'API / backend para un front existente', 'od 8 000 zł'),
          p('Projekt i optymalizacja bazy danych', 'Database design and optimization', 'Diseño y optimización de base de datos', 'od 4 000 zł'),
          p('Migracja danych ze starego systemu', 'Data migration from a legacy system', 'Migración de datos desde un sistema antiguo', 'od 5 000 zł'),
          p('Wdrożenie infrastruktury i CI/CD', 'Infrastructure and CI/CD setup', 'Implementación de infraestructura y CI/CD', 'od 6 000 zł'),
          p('Hurtownia danych i pulpity BI', 'Data warehouse and BI dashboards', 'Almacén de datos y paneles BI', 'od 15 000 zł'),
          p('Audyt wydajności i bezpieczeństwa', 'Performance and security audit', 'Auditoría de rendimiento y seguridad', 'od 4 000 zł'),
          p('Utrzymanie infrastruktury', 'Infrastructure maintenance', 'Mantenimiento de infraestructura', 'od 1 200 zł / mies.'),
        ],
      },
      {
        title: l('Integracje', 'Integrations', 'Integraciones'),
        items: [
          p('Integracja płatności', 'Payment integration', 'Integración de pagos', 'od 1 500 zł'),
          p('Integracja z CRM lub ERP', 'CRM or ERP integration', 'Integración con CRM o ERP', 'od 3 000 zł'),
          p('Integracja logistyki', 'Logistics integration', 'Integración logística', 'od 2 000 zł'),
          p('E-mail marketing i automatyzacje', 'E-mail marketing and automations', 'E-mail marketing y automatizaciones', 'od 1 500 zł'),
          p('Konfiguracja analityki i pikseli', 'Analytics and pixel setup', 'Configuración de analítica y píxeles', 'od 1 200 zł'),
          p('Integracja dedykowana z API', 'Custom API integration', 'Integración API a medida', 'od 3 500 zł'),
        ],
      },
      COOPERATION,
    ],
  },

  /* ===== 12 — AI i automatyzacje ===== */
  'ai-i-automatyzacje': {
    note: l(
      'Wszystkie ceny netto, orientacyjne. Ostateczna wycena po ustaleniu zakresu. Do utrzymania AI dochodzą koszty API modeli — rozliczane według zużycia.',
      'All prices net and indicative. Final quote after the scope is agreed. AI maintenance excludes model API costs, billed by usage.',
      'Todos los precios son netos y orientativos. Presupuesto final tras definir el alcance. El mantenimiento de IA no incluye los costes de API de los modelos, facturados por uso.',
    ),
    extra: PAYMENT,
    groups: [
      {
        title: l('Agenci, asystenci, chatboty', 'Agents, assistants, chatbots', 'Agentes, asistentes, chatbots'),
        items: [
          p('Chatbot AI na stronę — RAG', 'AI chatbot for a website — RAG', 'Chatbot IA para la web — RAG', 'od 6 000 zł'),
          p('Bot w komunikatorze', 'Messenger bot', 'Bot en mensajería', 'od 4 000 zł'),
          p('Agent AI dedykowany', 'Custom AI agent', 'Agente IA a medida', 'od 15 000 zł'),
          p('System wieloagentowy', 'Multi-agent system', 'Sistema multiagente', 'od 35 000 zł'),
          p('Serwer MCP do systemów firmy', 'MCP server for company systems', 'Servidor MCP para sistemas de la empresa', 'od 8 000 zł'),
          p('Asystent głosowy / AI na telefonie', 'Voice assistant / AI on the phone', 'Asistente de voz / IA telefónica', 'od 15 000 zł'),
          p('Utrzymanie i rozwój', 'Maintenance and development', 'Mantenimiento y desarrollo', 'od 1 500 zł / mies.'),
        ],
      },
      {
        title: l('Automatyzacja i dane', 'Automation and data', 'Automatización y datos'),
        items: [
          p('Audyt AI — gdzie realnie oszczędza', 'AI audit — where it really saves', 'Auditoría IA — dónde ahorra de verdad', l('4 000 – 8 000 zł', '4 000 – 8 000 PLN', '4 000 – 8 000 PLN')),
          p('Automatyzacja jednego procesu', 'Automation of one process', 'Automatización de un proceso', 'od 3 000 zł'),
          p('Obieg dokumentów z OCR', 'Document workflow with OCR', 'Flujo de documentos con OCR', 'od 10 000 zł'),
          p('System rekomendacji', 'Recommendation system', 'Sistema de recomendaciones', 'od 12 000 zł'),
          p('Wizja komputerowa', 'Computer vision', 'Visión por computador', 'od 15 000 zł'),
          p('Fine-tuning modelu', 'Model fine-tuning', 'Fine-tuning del modelo', 'od 8 000 zł'),
          p('Optymalizacja kosztów i jakości AI', 'AI cost and quality optimization', 'Optimización de costes y calidad de IA', 'od 5 000 zł'),
          p('Szkolenie zespołu z narzędzi AI', 'Team training in AI tools', 'Formación del equipo en herramientas IA', 'od 3 000 zł'),
        ],
      },
      COOPERATION,
    ],
  },

  /* ===== 13 — Branding, design i identyfikacja ===== */
  'branding-design-i-identyfikacja': {
    note: NOTE,
    groups: [
      {
        title: l('Branding i key visual', 'Branding and key visual', 'Branding y key visual'),
        items: [
          p('Logo', 'Logo', 'Logotipo', 'od 2 500 zł'),
          p('Podstawowa identyfikacja', 'Basic identity', 'Identidad básica', 'od 6 000 zł'),
          p('Pełna identyfikacja i brandbook', 'Full identity and brandbook', 'Identidad completa y brandbook', 'od 12 000 zł'),
          p('Key visual kampanii', 'Campaign key visual', 'Key visual de campaña', 'od 4 000 zł'),
          p('Adaptacje KV na wszystkie formaty', 'KV adaptations to all formats', 'Adaptaciones del KV a todos los formatos', 'od 2 000 zł'),
          p('Art direction kampanii', 'Campaign art direction', 'Dirección de arte de campaña', 'od 5 000 zł'),
          p('Rebranding', 'Rebranding', 'Rebranding', 'od 10 000 zł'),
        ],
      },
      {
        title: l('UI / UX i grafika', 'UI / UX and graphics', 'UI / UX y gráfica'),
        items: [
          p('Projekt UI strony', 'Website UI design', 'Diseño UI de web', 'od 5 000 zł'),
          p('Prototyp klikalny', 'Clickable prototype', 'Prototipo clicable', 'od 3 000 zł'),
          p('System projektowy', 'Design system', 'Sistema de diseño', 'od 8 000 zł'),
          p('Projekt aplikacji — UI / UX', 'App design — UI / UX', 'Diseño de aplicación — UI / UX', 'od 12 000 zł'),
          p('Zestaw ikon lub ilustracji', 'Icon or illustration set', 'Set de iconos o ilustraciones', 'od 1 500 zł'),
          p('Infografika', 'Infographic', 'Infografía', 'od 800 zł / sztuka'),
          p('Animowana grafika na stronę', 'Animated graphics for a website', 'Gráfica animada para la web', 'od 2 000 zł'),
          p('Scena 3D / WebGL na stronie', '3D / WebGL scene on a website', 'Escena 3D / WebGL en la web', 'od 5 000 zł'),
        ],
      },
      {
        title: l('Social media i print', 'Social media and print', 'Redes sociales y print'),
        items: [
          p('Stała obsługa graficzna profilu', 'Ongoing graphic support for a profile', 'Gestión gráfica continua del perfil', 'od 2 500 zł / mies.'),
          p('Zestaw bannerów reklamowych', 'Ad banner set', 'Set de banners publicitarios', 'od 1 200 zł'),
          p('Projekt poligraficzny', 'Print design', 'Diseño para imprenta', 'od 800 zł / sztuka'),
          p('Opakowanie lub etykieta', 'Packaging or label', 'Packaging o etiqueta', 'od 3 000 zł'),
          p('Reklama zewnętrzna / billboard', 'Outdoor advertising / billboard', 'Publicidad exterior / valla', 'od 1 500 zł'),
          p('Prezentacja / pitch deck', 'Presentation / pitch deck', 'Presentación / pitch deck', 'od 2 500 zł'),
          p('Oprawa wydarzenia', 'Event branding', 'Imagen de evento', individual),
        ],
      },
    ],
  },

  /* ===== 04 — Produkcja video, foto i creative ===== */
  'produkcja-video-foto-creative': {
    note: NOTE,
    groups: [
      {
        title: l('Wideo i motion', 'Video and motion', 'Vídeo y motion'),
        items: [
          p('Montaż Reels / TikTok', 'Reels / TikTok editing', 'Montaje de Reels / TikTok', 'od 400 zł / sztuka'),
          p('Pakiet 10 formatów pionowych', 'Pack of 10 vertical formats', 'Pack de 10 formatos verticales', 'od 3 000 zł'),
          p('Wideo wizerunkowe / promo', 'Brand / promo video', 'Vídeo de imagen / promo', 'od 4 000 zł'),
          p('Reklama 30 s — pełny cykl', '30 s ad — full cycle', 'Anuncio de 30 s — ciclo completo', 'od 8 000 zł'),
          p('Animacja logo / intro', 'Logo animation / intro', 'Animación de logo / intro', 'od 1 500 zł'),
          p('Animowana infografika', 'Animated infographic', 'Infografía animada', 'od 2 000 zł'),
          p('Grading koloru', 'Colour grading', 'Etalonaje de color', 'od 1 200 zł'),
          p('VFX i kompozycja', 'VFX and compositing', 'VFX y composición', 'od 2 500 zł'),
          p('Napisy i dubbing AI', 'Subtitles and AI dubbing', 'Subtítulos y doblaje IA', 'od 600 zł'),
        ],
      },
      {
        title: l('3D i interaktywne', '3D and interactive', '3D e interactivo'),
        items: [
          p('Model 3D produktu', '3D product model', 'Modelo 3D de producto', 'od 2 000 zł'),
          p('Render produktowy', 'Product render', 'Render de producto', 'od 1 200 zł / ujęcie'),
          p('Animacja 3D', '3D animation', 'Animación 3D', 'od 6 000 zł'),
          p('Wizualizacja wnętrza lub architektury', 'Interior or architectural visualization', 'Visualización de interior o arquitectura', 'od 3 000 zł'),
          p('Optymalizacja modelu pod web', 'Model optimization for the web', 'Optimización del modelo para web', 'od 1 500 zł'),
          p('Konfigurator 3D', '3D configurator', 'Configurador 3D', 'od 15 000 zł'),
          p('Wirtualny spacer 360°', '360° virtual tour', 'Recorrido virtual 360°', 'od 5 000 zł'),
          p('Filtr AR', 'AR filter', 'Filtro AR', 'od 4 000 zł'),
          p('Kalkulator lub quiz na stronie', 'Calculator or quiz on a website', 'Calculadora o quiz en la web', 'od 2 500 zł'),
        ],
      },
    ],
  },
}

export const PRICING_UI = {
  eyebrow: l('Cennik', 'Pricing', 'Precios'),
  title: l('Wycena *orientacyjna.*', 'Indicative *pricing.*', 'Precios *orientativos.*'),
  lead: l('Punkt wyjścia do rozmowy, nie cennik sklepowy. Każdy projekt wyceniamy po ustaleniu zakresu.', 'A starting point for a conversation, not a shop price list. Every project is quoted after the scope is agreed.', 'Un punto de partida para la conversación, no una lista de precios de tienda. Cada proyecto se presupuesta tras definir el alcance.'),
  ask: l('Zapytaj o wycenę', 'Ask for a quote', 'Pide presupuesto'),
}
