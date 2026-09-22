import { l, type L } from '../i18n/types'

export type ServicePortfolioKind = 'video' | 'events' | 'live' | 'products' | 'tech' | 'ai' | 'design' | 'talents'

export type Service = {
  slug: string
  num: string
  /** name used in lists and menus */
  title: L
  /** one-liner under the name in the /uslugi list */
  short: L
  hero: { title: L; text: L }
  scope: { title: L; items: L[] }
  /** narrative sections (03 / 04 / 05) */
  sections: { title: L; text: L }[]
  portfolio?: { title: L; kind: ServicePortfolioKind; note: L; caption: L }
  process: { title: L; steps: L[]; text: L }
  final: { title: L; text: L; button: L; to?: string }
}

/** Home page list — 9 areas (client copy, "Co i jak 3", section 4). */
export const HOME_SERVICES: { num: string; title: string; desc: L; to: string }[] = [
  { num: '01', title: 'Talent & Artist Management', desc: l('Prowadzimy kariery, budujemy marki i rozwijamy talenty.', 'We run careers, build brands and grow talents.', 'Dirigimos carreras, construimos marcas y desarrollamos talentos.'), to: '/uslugi/management-talentow' },
  { num: '02', title: 'Content & Video Production', desc: l('Programy, teledyski, reklamy i content od pomysłu po realizację.', 'Shows, music videos, ads and content from idea to delivery.', 'Programas, videoclips, anuncios y contenido de la idea a la realización.'), to: '/uslugi/produkcja-video-foto-creative' },
  { num: '03', title: 'Music & Entertainment', desc: l('Rozwijamy artystów i projekty muzyczne.', 'We develop artists and music projects.', 'Desarrollamos artistas y proyectos musicales.'), to: '/uslugi/koncerty-i-live-entertainment' },
  { num: '04', title: 'Live & Events', desc: l('Koncerty, eventy i wydarzenia od pomysłu po scenę.', 'Concerts, events and experiences from idea to stage.', 'Conciertos, eventos y experiencias de la idea al escenario.'), to: '/uslugi/eventy-i-wydarzenia-specjalne' },
  { num: '05', title: 'Influencer & Brand Marketing', desc: l('Łączymy marki z twórcami i tworzymy skuteczne kampanie.', 'We connect brands with creators and build campaigns that work.', 'Conectamos marcas con creadores y creamos campañas eficaces.'), to: '/uslugi/influencer-marketing' },
  { num: '06', title: 'PR & Communication', desc: l('Budujemy wizerunek i komunikację, także w kryzysie.', 'We build image and communication, also in a crisis.', 'Construimos imagen y comunicación, también en crisis.'), to: '/uslugi/pr-i-media' },
  { num: '07', title: 'Creative & Social Media', desc: l('Strategie, pomysły i content dla social mediów.', 'Strategies, ideas and content for social media.', 'Estrategias, ideas y contenido para redes sociales.'), to: '/uslugi/digital-social-media' },
  { num: '08', title: 'Merch & Products', desc: l('Od pomysłu na produkt po jego premierę.', 'From product idea to launch.', 'De la idea del producto a su lanzamiento.'), to: '/uslugi/merch-i-produkty' },
  { num: '09', title: 'Media & Polska Press', desc: l('Łączymy siłę twórców z zasięgiem mediów.', 'We combine the power of creators with the reach of media.', 'Unimos la fuerza de los creadores con el alcance de los medios.'), to: '/influencer-marketing' },
]

const CTA_CONTACT = '/kontakt#formularz'

export const SERVICES: Service[] = [
  /* ============ 01 ============ */
  {
    slug: 'management-talentow',
    num: '01',
    title: l('Management talentów', 'Talent management', 'Management de talentos'),
    short: l(
      'Strategia kariery, negocjacje, kontrakty, współprace komercyjne i rozwój marek osobistych.',
      'Career strategy, negotiations, contracts, commercial partnerships and personal brand development.',
      'Estrategia de carrera, negociaciones, contratos, colaboraciones comerciales y desarrollo de marcas personales.',
    ),
    hero: {
      title: l('Talent to\ndopiero *początek.*', 'Talent is just\nthe *beginning.*', 'El talento es solo\nel *comienzo.*'),
      text: l(
        'Management nie polega na odpisywaniu na maile.\n\nDobry manager powinien być zawsze kilka kroków przed talentem. Widzieć możliwości, zanim staną się oczywiste. Przewidywać kolejny ruch, budować strategię i otwierać drzwi, do których talent jeszcze nawet nie zapukał.\n\nNie zarządzamy kalendarzem. Budujemy kariery.',
        "Management is not about answering e-mails.\n\nA good manager should always be a few steps ahead of the talent. Seeing opportunities before they become obvious. Anticipating the next move, building strategy and opening doors the talent hasn't even knocked on yet.\n\nWe don't manage calendars. We build careers.",
        'El management no consiste en responder correos.\n\nUn buen manager siempre debe ir varios pasos por delante del talento. Ver oportunidades antes de que sean obvias. Anticipar el siguiente movimiento, construir estrategia y abrir puertas a las que el talento aún ni ha llamado.\n\nNo gestionamos calendarios. Construimos carreras.',
      ),
    },
    scope: {
      title: l('Od kariery\ndo *marki.*', 'From career\nto *brand.*', 'De la carrera\na la *marca.*'),
      items: [
        l('Strategia kariery', 'Career strategy', 'Estrategia de carrera'),
        l('Management i reprezentacja', 'Management and representation', 'Management y representación'),
        l('Negocjacje i kontrakty', 'Negotiations and contracts', 'Negociaciones y contratos'),
        l('Współprace komercyjne', 'Commercial partnerships', 'Colaboraciones comerciales'),
        l('Strategia wizerunkowa', 'Image strategy', 'Estrategia de imagen'),
        l('PR i media', 'PR and media', 'PR y medios'),
        l('Social media i content', 'Social media and content', 'Redes sociales y contenido'),
        l('Rozwój projektów własnych', 'Development of own projects', 'Desarrollo de proyectos propios'),
        l('Merch i produkty', 'Merch and products', 'Merch y productos'),
        l('Muzyka, koncerty i projekty live', 'Music, concerts and live projects', 'Música, conciertos y proyectos live'),
        l('Produkcja foto i video', 'Photo and video production', 'Producción de foto y vídeo'),
        l('Budowanie długofalowych partnerstw', 'Building long-term partnerships', 'Construcción de alianzas a largo plazo'),
      ],
    },
    sections: [
      {
        title: l('Zawsze kilka kroków\ndo *przodu.*', 'Always a few steps\n*ahead.*', 'Siempre varios pasos\npor *delante.*'),
        text: l(
          'Reagować to za mało. Planujemy, przewidujemy i tworzymy kolejne możliwości.\n\nŁączymy biznes, media, wizerunek, content, projekty własne i relacje tak, żeby każdy ruch prowadził do następnego.\n\nNie ma jednego modelu kariery. Strategię budujemy wokół konkretnego człowieka, jego potencjału i celu.',
          "Reacting is not enough. We plan, anticipate and create the next opportunities.\n\nWe connect business, media, image, content, own projects and relationships so that every move leads to the next one.\n\nThere is no single career model. We build the strategy around a specific person, their potential and their goal.",
          'Reaccionar no basta. Planificamos, anticipamos y creamos nuevas oportunidades.\n\nConectamos negocio, medios, imagen, contenido, proyectos propios y relaciones para que cada movimiento lleve al siguiente.\n\nNo hay un único modelo de carrera. Construimos la estrategia en torno a una persona concreta, su potencial y su objetivo.',
        ),
      },
      {
        title: l('Nie o wszystkim\nmożemy *opowiadać.*', "We can't talk\nabout *everything.*", 'No podemos contar\n*todo.*'),
        text: l(
          'Część projektów, negocjacji i współprac realizujemy w ramach umów poufności. Dyskrecja jest częścią dobrego managementu.\n\nNie publikujemy realizacji ani informacji tylko po to, żeby powiększyć portfolio.',
          'Some projects, negotiations and partnerships are carried out under confidentiality agreements. Discretion is part of good management.\n\nWe do not publish work or information just to make the portfolio bigger.',
          'Parte de los proyectos, negociaciones y colaboraciones se realizan bajo acuerdos de confidencialidad. La discreción forma parte de un buen management.\n\nNo publicamos trabajos ni información solo para engordar el portfolio.',
        ),
      },
    ],
    portfolio: {
      title: l('Wybrane *talenty.*', 'Selected *talents.*', 'Talentos *seleccionados.*'),
      kind: 'talents',
      note: l(
        'Wybrane osobowości reprezentowane przez Star Media. Pełny roster dostępny na zapytanie.',
        'Selected personalities represented by Star Media. Full roster available on request.',
        'Personalidades seleccionadas representadas por Star Media. Roster completo disponible bajo petición.',
      ),
      caption: l('Poznaj talenty', 'Meet the talents', 'Conoce a los talentos'),
    },
    process: {
      title: l('Kariera nie dzieje się\n*przypadkiem.*', "A career doesn't happen\n*by accident.*", 'Una carrera no ocurre\n*por casualidad.*'),
      steps: [l('Poznajemy', 'We get to know', 'Conocemos'), l('Planujemy', 'We plan', 'Planificamos'), l('Budujemy', 'We build', 'Construimos'), l('Negocjujemy', 'We negotiate', 'Negociamos'), l('Rozwijamy', 'We grow', 'Desarrollamos')],
      text: l(
        'Każdy talent jest inny. Dlatego nie pracujemy według jednego schematu. Budujemy strategię wokół człowieka i rozwijamy ją razem z jego karierą.',
        "Every talent is different. That's why we don't work by one template. We build the strategy around the person and develop it along with their career.",
        'Cada talento es distinto. Por eso no trabajamos con un único esquema. Construimos la estrategia en torno a la persona y la desarrollamos junto con su carrera.',
      ),
    },
    final: {
      title: l('Dobry management\nwidać w *efektach.*', 'Good management\nshows in the *results.*', 'El buen management\nse ve en los *resultados.*'),
      text: l(
        'Za każdą dobrze poprowadzoną karierą stoją decyzje, których publiczność nigdy nie zobaczy.',
        'Behind every well-managed career are decisions the audience will never see.',
        'Detrás de cada carrera bien dirigida hay decisiones que el público nunca verá.',
      ),
      button: l('Poznaj nasze talenty', 'Meet our talents', 'Conoce a nuestros talentos'),
      to: '/talenty',
    },
  },

  /* ============ 02 ============ */
  {
    slug: 'influencer-marketing',
    num: '02',
    title: l('Influencer marketing', 'Influencer marketing', 'Influencer marketing'),
    short: l(
      'Strategia, dobór twórców, negocjacje, realizacja i koordynacja kampanii. Influencer marketing łączymy z siłą mediów Polska Press.',
      'Strategy, creator selection, negotiations, execution and campaign coordination. We combine influencer marketing with the power of Polska Press media.',
      'Estrategia, selección de creadores, negociaciones, ejecución y coordinación de campañas. Unimos el influencer marketing con la fuerza de los medios de Polska Press.',
    ),
    hero: {
      title: l('Zasięg to liczba.\nWpływ to *coś więcej.*', 'Reach is a number.\nInfluence is *something more.*', 'El alcance es un número.\nLa influencia es *algo más.*'),
      text: l(
        'Nie dobieramy twórców z tabelki. Łączymy marki z osobowościami, które pasują do nich wizerunkowo, komunikacyjnie i biznesowo.\n\nOd strategii i pomysłu, przez negocjacje i produkcję, po publikację i koordynację całej kampanii.',
        "We don't pick creators from a spreadsheet. We match brands with personalities that fit them in image, communication and business.\n\nFrom strategy and idea, through negotiations and production, to publication and coordination of the whole campaign.",
        'No elegimos creadores de una tabla. Unimos marcas con personalidades que encajan con ellas en imagen, comunicación y negocio.\n\nDesde la estrategia y la idea, pasando por negociaciones y producción, hasta la publicación y coordinación de toda la campaña.',
      ),
    },
    scope: {
      title: l('Od briefu\ndo *publikacji.*', 'From brief\nto *publication.*', 'Del brief\na la *publicación.*'),
      items: [
        l('Strategia influencer marketingowa', 'Influencer marketing strategy', 'Estrategia de influencer marketing'),
        l('Dobór twórców', 'Creator selection', 'Selección de creadores'),
        l('Koncepcje kreatywne', 'Creative concepts', 'Conceptos creativos'),
        l('Negocjacje i wyceny', 'Negotiations and pricing', 'Negociaciones y presupuestos'),
        l('Kontrakty i koordynacja', 'Contracts and coordination', 'Contratos y coordinación'),
        l('Ambasadorstwa długoterminowe', 'Long-term ambassadorships', 'Embajadas de marca a largo plazo'),
        l('Reels, TikTok, Stories, YouTube', 'Reels, TikTok, Stories, YouTube', 'Reels, TikTok, Stories, YouTube'),
        l('Produkcja contentu', 'Content production', 'Producción de contenido'),
        l('Akcje specjalne i eventy z twórcami', 'Special actions and events with creators', 'Acciones especiales y eventos con creadores'),
        l('Koordynacja publikacji', 'Publication coordination', 'Coordinación de publicaciones'),
        l('Raportowanie kampanii', 'Campaign reporting', 'Reporting de campañas'),
        l('Kampanie cross media', 'Cross-media campaigns', 'Campañas cross media'),
      ],
    },
    sections: [
      {
        title: l('Nie każdy zasięg\nma taką samą *wartość.*', 'Not every reach\nhas the same *value.*', 'No todo alcance\ntiene el mismo *valor.*'),
        text: l(
          'Duża liczba obserwujących nie wystarczy. Patrzymy na społeczność, wiarygodność twórcy, format, kontekst i cel marki.\n\nTwórca ma być częścią pomysłu, a nie powierzchnią reklamową.',
          "A large number of followers isn't enough. We look at the community, the creator's credibility, the format, the context and the brand's goal.\n\nThe creator should be part of the idea, not an advertising surface.",
          'Un gran número de seguidores no basta. Miramos la comunidad, la credibilidad del creador, el formato, el contexto y el objetivo de la marca.\n\nEl creador debe ser parte de la idea, no una superficie publicitaria.',
        ),
      },
      {
        title: l('Influencer marketing\nspotyka *media.*', 'Influencer marketing\nmeets *media.*', 'El influencer marketing\nse encuentra con los *medios.*'),
        text: l(
          'Star Media × Polska Press\n\nStar Media jest partnerem Polska Press w obszarze influencer marketingu.\n\nŁączymy świat twórców internetowych z zapleczem jednej z największych grup medialnych w Polsce, otwierając kampanie na działania wykraczające poza same social media.',
          'Star Media × Polska Press\n\nStar Media is a Polska Press partner in the area of influencer marketing.\n\nWe connect the world of online creators with the resources of one of the largest media groups in Poland, opening campaigns to activities that go beyond social media alone.',
          'Star Media × Polska Press\n\nStar Media es socio de Polska Press en el ámbito del influencer marketing.\n\nUnimos el mundo de los creadores online con los recursos de uno de los mayores grupos de medios de Polonia, abriendo las campañas a acciones que van más allá de las redes sociales.',
        ),
      },
      {
        title: l('Nie wszystko\ntrafia do *portfolio.*', 'Not everything\nends up in the *portfolio.*', 'No todo\nacaba en el *portfolio.*'),
        text: l(
          'Realizujemy kampanie i współprace, których szczegółów nie publikujemy. Część projektów objęta jest umowami poufności i dokładnie tak pozostanie.\n\nPortfolio pokazujemy tam, gdzie możemy. Kompetencji nie budujemy liczbą logotypów.',
          "We run campaigns and partnerships whose details we don't publish. Some projects are covered by confidentiality agreements and that's exactly how it will stay.\n\nWe show the portfolio where we can. We don't build competence with the number of logos.",
          'Realizamos campañas y colaboraciones cuyos detalles no publicamos. Parte de los proyectos están bajo acuerdos de confidencialidad y así seguirá siendo.\n\nMostramos el portfolio donde podemos. No construimos competencia con el número de logotipos.',
        ),
      },
    ],
    process: {
      title: l('Jeden proces.\n*Wiele kanałów.*', 'One process.\n*Many channels.*', 'Un proceso.\n*Muchos canales.*'),
      steps: [l('Brief', 'Brief', 'Brief'), l('Strategia', 'Strategy', 'Estrategia'), l('Twórcy', 'Creators', 'Creadores'), l('Kreacja', 'Creative', 'Creatividad'), l('Realizacja', 'Execution', 'Ejecución'), l('Publikacja', 'Publication', 'Publicación'), l('Raport', 'Report', 'Informe')],
      text: l(
        'Prowadzimy kampanię od pierwszej rozmowy do ostatniej publikacji. Marka nie musi koordynować kilku podmiotów, twórców i produkcji osobno.',
        "We run the campaign from the first conversation to the last publication. The brand doesn't need to coordinate several parties, creators and production separately.",
        'Llevamos la campaña desde la primera conversación hasta la última publicación. La marca no tiene que coordinar por separado a varias entidades, creadores y producción.',
      ),
    },
    final: {
      title: l('Nie potrzebujesz\nwięcej twórców.\nPotrzebujesz *właściwych.*', "You don't need\nmore creators.\nYou need the *right ones.*", 'No necesitas\nmás creadores.\nNecesitas los *adecuados.*'),
      text: l(
        'Zbudujmy kampanię, w której twórca, format i marka mówią jednym językiem.',
        "Let's build a campaign where the creator, the format and the brand speak one language.",
        'Construyamos una campaña en la que creador, formato y marca hablen el mismo idioma.',
      ),
      button: l('Porozmawiajmy o kampanii', "Let's talk about a campaign", 'Hablemos de la campaña'),
    },
  },

  /* ============ 03 ============ */
  {
    slug: 'digital-social-media',
    num: '03',
    title: l('Digital & social media', 'Digital & social media', 'Digital & social media'),
    short: l(
      'Digitalizujemy marki i dajemy im życie w internecie. Strategia, komunikacja, prowadzenie kanałów, content i kampanie digital.',
      'We digitize brands and give them life online. Strategy, communication, channel management, content and digital campaigns.',
      'Digitalizamos marcas y les damos vida en internet. Estrategia, comunicación, gestión de canales, contenido y campañas digitales.',
    ),
    hero: {
      title: l('Dajemy markom\nżycie w *internecie.*', 'We give brands\na life *online.*', 'Damos a las marcas\nvida en *internet.*'),
      text: l(
        'Nie chodzi o to, żeby marka po prostu była w social mediach. Musi mieć własny język, charakter i powód, żeby ktoś chciał ją obserwować.\n\nBudujemy obecność marek w digitalu od strategii po codzienną komunikację.',
        "It's not about a brand simply being on social media. It needs its own language, character and a reason for someone to want to follow it.\n\nWe build brands' digital presence from strategy to everyday communication.",
        'No se trata de que la marca simplemente esté en redes sociales. Debe tener su propio lenguaje, carácter y una razón para que alguien quiera seguirla.\n\nConstruimos la presencia digital de las marcas desde la estrategia hasta la comunicación diaria.',
      ),
    },
    scope: {
      title: l('Od strategii\ndo *publikacji.*', 'From strategy\nto *publication.*', 'De la estrategia\na la *publicación.*'),
      items: [
        l('Strategia digital', 'Digital strategy', 'Estrategia digital'),
        l('Strategia social media', 'Social media strategy', 'Estrategia de redes sociales'),
        l('Prowadzenie kanałów', 'Channel management', 'Gestión de canales'),
        l('Instagram, TikTok, Facebook, YouTube, LinkedIn', 'Instagram, TikTok, Facebook, YouTube, LinkedIn', 'Instagram, TikTok, Facebook, YouTube, LinkedIn'),
        l('Strategia contentowa', 'Content strategy', 'Estrategia de contenido'),
        l('Copywriting', 'Copywriting', 'Copywriting'),
        l('Reels, TikToki i short form', 'Reels, TikToks and short form', 'Reels, TikToks y short form'),
        l('Grafiki, karuzele i Stories', 'Graphics, carousels and Stories', 'Gráficos, carruseles y Stories'),
        l('Foto i video', 'Photo and video', 'Foto y vídeo'),
        l('Community management', 'Community management', 'Community management'),
        l('Kampanie i premiery', 'Campaigns and launches', 'Campañas y lanzamientos'),
        l('Kalendarze komunikacji', 'Communication calendars', 'Calendarios de comunicación'),
        l('Analityka i optymalizacja', 'Analytics and optimization', 'Analítica y optimización'),
        l('Obsługa bieżąca marki', 'Ongoing brand support', 'Gestión continua de la marca'),
      ],
    },
    sections: [
      {
        title: l('Nie prowadzimy profili.\nBudujemy *światy.*', "We don't run profiles.\nWe build *worlds.*", 'No gestionamos perfiles.\nConstruimos *mundos.*'),
        text: l(
          'Dobry digital ma być rozpoznawalny bez patrzenia na nazwę profilu.\n\nTworzymy język, obraz, formaty i rytm komunikacji, dzięki którym marka zaczyna zachowywać się w internecie jak żywa osobowość, a nie tablica ogłoszeniowa.',
          'Good digital should be recognizable without looking at the profile name.\n\nWe create the language, imagery, formats and rhythm of communication that make a brand behave online like a living personality, not a notice board.',
          'Un buen digital debe ser reconocible sin mirar el nombre del perfil.\n\nCreamos el lenguaje, la imagen, los formatos y el ritmo de comunicación que hacen que la marca se comporte en internet como una personalidad viva y no como un tablón de anuncios.',
        ),
      },
      {
        title: l('Content, który\nma powód *istnieć.*', 'Content with\na reason to *exist.*', 'Contenido con\nrazón de *existir.*'),
        text: l(
          'Nie publikujemy dlatego, że „dzisiaj wypada post”. Każdy format powinien mieć zadanie. Budować markę, angażować społeczność, generować zasięg, wspierać sprzedaż albo rozpoczynać rozmowę.\n\nŁączymy strategię z produkcją, dlatego pomysł nie kończy się na prezentacji.',
          "We don't publish because \"today is post day\". Every format should have a job: build the brand, engage the community, generate reach, support sales or start a conversation.\n\nWe combine strategy with production, so the idea doesn't end at the presentation.",
          'No publicamos porque «hoy toca post». Cada formato debe tener una tarea: construir marca, involucrar a la comunidad, generar alcance, apoyar ventas o iniciar una conversación.\n\nUnimos estrategia y producción, por eso la idea no termina en la presentación.',
        ),
      },
      {
        title: l('Nie wszystko\n*pokazujemy.*', "We don't\nshow *everything.*", 'No lo mostramos\n*todo.*'),
        text: l(
          'Część marek i projektów obsługujemy w ramach umów poufności. Pokazujemy realizacje tam, gdzie możemy. Reszta zostaje między nami a klientem.',
          'Some brands and projects are handled under confidentiality agreements. We show the work where we can. The rest stays between us and the client.',
          'Parte de las marcas y proyectos los gestionamos bajo acuerdos de confidencialidad. Mostramos los trabajos donde podemos. El resto queda entre nosotros y el cliente.',
        ),
      },
    ],
    process: {
      title: l('Jedna marka.\n*Wiele formatów.*', 'One brand.\n*Many formats.*', 'Una marca.\n*Muchos formatos.*'),
      steps: [l('Strategia', 'Strategy', 'Estrategia'), l('Język marki', 'Brand language', 'Lenguaje de marca'), l('Content', 'Content', 'Contenido'), l('Produkcja', 'Production', 'Producción'), l('Publikacja', 'Publication', 'Publicación'), l('Analiza', 'Analysis', 'Análisis'), l('Rozwój', 'Growth', 'Desarrollo')],
      text: l(
        'Myślimy o całym ekosystemie marki. Jeden pomysł może żyć jako Reel, TikTok, Stories, YouTube, grafika, kampania, PR albo format specjalny.',
        'We think about the whole brand ecosystem. One idea can live as a Reel, a TikTok, Stories, YouTube, a graphic, a campaign, PR or a special format.',
        'Pensamos en todo el ecosistema de la marca. Una idea puede vivir como Reel, TikTok, Stories, YouTube, gráfico, campaña, PR o formato especial.',
      ),
    },
    final: {
      title: l('Marka nie kończy się\nna *logo.*', "A brand doesn't end\nat the *logo.*", 'Una marca no termina\nen el *logo.*'),
      text: l('Dajemy jej język, charakter i życie w internecie.', 'We give it a language, a character and a life online.', 'Le damos lenguaje, carácter y vida en internet.'),
      button: l('Porozmawiajmy o digitalu', "Let's talk digital", 'Hablemos de digital'),
    },
  },

  /* ============ 04 ============ */
  {
    slug: 'produkcja-video-foto-creative',
    num: '04',
    title: l('Produkcja video, foto i creative', 'Video, photo & creative production', 'Producción de vídeo, foto y creative'),
    short: l(
      'Teledyski, reklamy, sesje zdjęciowe, reelsy, TikToki, podcasty i produkcje YouTube. Także motion design, VFX, animacje i realizacje 3D.',
      'Music videos, ads, photo shoots, reels, TikToks, podcasts and YouTube productions. Also motion design, VFX, animation and 3D.',
      'Videoclips, anuncios, sesiones de fotos, reels, TikToks, podcasts y producciones de YouTube. También motion design, VFX, animación y 3D.',
    ),
    hero: {
      title: l('Pomysł to początek.\nMy robimy *resztę.*', 'The idea is the start.\nWe do *the rest.*', 'La idea es el comienzo.\nNosotros hacemos *el resto.*'),
      text: l(
        'Od pierwszego kadru po finalny montaż. Tworzymy produkcje, które nie tylko dobrze wyglądają, ale mają konkretny cel i są projektowane pod medium, w którym będą żyć.\n\nTeledysk, kampania, sesja, reklama czy content na social media. Prowadzimy cały proces od koncepcji do gotowego materiału.',
        'From the first frame to the final cut. We create productions that not only look good but have a specific purpose and are designed for the medium they will live in.\n\nMusic video, campaign, shoot, ad or social media content. We run the whole process from concept to finished material.',
        'Del primer plano al montaje final. Creamos producciones que no solo se ven bien, sino que tienen un objetivo concreto y están diseñadas para el medio en el que vivirán.\n\nVideoclip, campaña, sesión, anuncio o contenido para redes. Llevamos todo el proceso desde el concepto hasta el material terminado.',
      ),
    },
    scope: {
      title: l('Od koncepcji\ndo finalnego *kadru.*', 'From concept\nto the final *frame.*', 'Del concepto\nal plano *final.*'),
      items: [
        l('Teledyski', 'Music videos', 'Videoclips'),
        l('Reklamy i spoty', 'Ads and spots', 'Anuncios y spots'),
        l('Produkcje wizerunkowe', 'Brand image productions', 'Producciones de imagen'),
        l('Sesje zdjęciowe', 'Photo shoots', 'Sesiones de fotos'),
        l('Reels, TikTok i Shorts', 'Reels, TikTok and Shorts', 'Reels, TikTok y Shorts'),
        l('Programy i formaty YouTube', 'YouTube shows and formats', 'Programas y formatos de YouTube'),
        l('Podcasty i wywiady', 'Podcasts and interviews', 'Podcasts y entrevistas'),
        l('Realizacje wielokamerowe', 'Multi-camera productions', 'Producciones multicámara'),
        l('Scenariusze i koncepcje kreatywne', 'Scripts and creative concepts', 'Guiones y conceptos creativos'),
        l('Produkcja i organizacja planu', 'Production and set organization', 'Producción y organización de rodaje'),
        l('Montaż i postprodukcja', 'Editing and post-production', 'Montaje y postproducción'),
        l('Color grading', 'Color grading', 'Color grading'),
        l('Sound design', 'Sound design', 'Sound design'),
        l('Motion design i animacja 2D', 'Motion design and 2D animation', 'Motion design y animación 2D'),
        l('VFX i compositing', 'VFX and compositing', 'VFX y compositing'),
        l('Animacje i realizacje 3D', '3D animation and productions', 'Animación y producciones 3D'),
        l('Dubbing AI i lip sync', 'AI dubbing and lip sync', 'Doblaje IA y lip sync'),
        l('Adaptacje materiałów na różne formaty', 'Adapting materials to different formats', 'Adaptación de materiales a distintos formatos'),
      ],
    },
    sections: [
      {
        title: l('Nie robimy contentu\ndla samego *contentu.*', "We don't make content\nfor content's *sake.*", 'No hacemos contenido\npor el *contenido.*'),
        text: l(
          'Inaczej projektujemy teledysk, inaczej reklamę, a jeszcze inaczej Reel, który ma zatrzymać scrollowanie w pierwszej sekundzie.\n\nFormat, platforma i odbiorca są częścią pomysłu od samego początku.',
          'We design a music video one way, an ad another way, and a Reel that has to stop the scroll in the first second yet another.\n\nThe format, the platform and the audience are part of the idea from the very beginning.',
          'Diseñamos de forma distinta un videoclip, un anuncio y un Reel que debe detener el scroll en el primer segundo.\n\nFormato, plataforma y audiencia forman parte de la idea desde el principio.',
        ),
      },
      {
        title: l('Jeden plan.\n*Dziesiątki formatów.*', 'One shoot.\n*Dozens of formats.*', 'Un rodaje.\n*Decenas de formatos.*'),
        text: l(
          'Jedna produkcja może pracować znacznie dłużej niż jeden film. Projektujemy materiały tak, żeby z jednego planu mogły powstać główne video, shorty, reelsy, TikToki, zdjęcia, backstage i materiały promocyjne.\n\nMaksymalizujemy to, co można wyciągnąć z każdej produkcji.',
          'One production can work much longer than one film. We design materials so that one shoot can yield the main video, shorts, reels, TikToks, photos, backstage and promotional materials.\n\nWe maximize what can be taken out of every production.',
          'Una producción puede trabajar mucho más que un solo vídeo. Diseñamos los materiales para que de un solo rodaje salgan el vídeo principal, shorts, reels, TikToks, fotos, backstage y materiales promocionales.\n\nMaximizamos lo que se puede sacar de cada producción.',
        ),
      },
    ],
    portfolio: {
      title: l('Zobacz, co *robimy.*', 'See what *we do.*', 'Mira lo que *hacemos.*'),
      kind: 'video',
      note: l(
        'Duże video i zdjęcia, teledyski, YouTube, sesje, produkcje social media, reklamy i backstage.',
        'Big video and photos, music videos, YouTube, shoots, social media productions, ads and backstage.',
        'Grandes vídeos y fotos, videoclips, YouTube, sesiones, producciones para redes, anuncios y backstage.',
      ),
      caption: l('Teledysk / Video / Foto / YouTube / Creative', 'Music video / Video / Photo / YouTube / Creative', 'Videoclip / Vídeo / Foto / YouTube / Creative'),
    },
    process: {
      title: l('Od pierwszego pomysłu\ndo *„mamy to”.*', 'From the first idea\nto *"we got it".*', 'De la primera idea\nal *«lo tenemos».*'),
      steps: [l('Koncepcja', 'Concept', 'Concepto'), l('Scenariusz', 'Script', 'Guion'), l('Preprodukcja', 'Pre-production', 'Preproducción'), l('Plan', 'Shoot', 'Rodaje'), l('Postprodukcja', 'Post-production', 'Postproducción'), l('Publikacja', 'Publication', 'Publicación')],
      text: l(
        'Kreatywny pomysł i produkcja działają u nas razem. Dzięki temu projekt nie ginie pomiędzy prezentacją, ekipą zdjęciową i montażem.',
        "Creative idea and production work together here. That way the project doesn't get lost between the presentation, the crew and the edit.",
        'La idea creativa y la producción trabajan juntas. Así el proyecto no se pierde entre la presentación, el equipo de rodaje y el montaje.',
      ),
    },
    final: {
      title: l('Masz coś\ndo pokazania?\nPokażmy to *dobrze.*', 'Got something\nto show?\nLet\'s show it *well.*', '¿Tienes algo\nque mostrar?\nMostrémoslo *bien.*'),
      text: l(
        'Od kilku sekund w social mediach po pełną produkcję. Dobieramy format do pomysłu, nie odwrotnie.',
        'From a few seconds on social media to a full production. We fit the format to the idea, not the other way round.',
        'Desde unos segundos en redes hasta una producción completa. Adaptamos el formato a la idea, no al revés.',
      ),
      button: l('Zróbmy produkcję', "Let's make a production", 'Hagamos una producción'),
    },
  },

  /* ============ 05 ============ */
  {
    slug: 'formaty-i-zasieg-organiczny',
    num: '05',
    title: l('Formaty i zasięg organiczny', 'Formats & organic reach', 'Formatos y alcance orgánico'),
    short: l(
      'Tworzymy autorskie programy YouTube, serie i short form content projektowany pod zasięg organiczny. Treści, które mają potencjał nieść się bez budżetu reklamowego.',
      'We create original YouTube shows, series and short-form content designed for organic reach. Content with the potential to travel without an ad budget.',
      'Creamos programas originales de YouTube, series y contenido short form diseñado para el alcance orgánico. Contenidos con potencial para difundirse sin presupuesto publicitario.',
    ),
    hero: {
      title: l('Nie kupujemy uwagi.\nTworzymy powód,\nżeby *patrzeć.*', "We don't buy attention.\nWe create a reason\nto *watch.*", 'No compramos atención.\nCreamos una razón\npara *mirar.*'),
      text: l(
        'Tworzymy autorskie formaty i strategie contentowe projektowane z myślą o organicznym zasięgu.\n\nZaczynamy od pomysłu, który ma zatrzymać uwagę. Dopiero później wybieramy, gdzie i jak będzie żył.',
        'We create original formats and content strategies designed with organic reach in mind.\n\nWe start with an idea that has to hold attention. Only then do we decide where and how it will live.',
        'Creamos formatos originales y estrategias de contenido pensadas para el alcance orgánico.\n\nEmpezamos con una idea que debe captar la atención. Solo después elegimos dónde y cómo vivirá.',
      ),
    },
    scope: {
      title: l('Nie film.\n*Format.*', 'Not a film.\n*A format.*', 'No un vídeo.\n*Un formato.*'),
      items: [
        l('Development autorskich formatów', 'Development of original formats', 'Desarrollo de formatos originales'),
        l('Koncepcje programów i serii', 'Show and series concepts', 'Conceptos de programas y series'),
        l('Formaty rozrywkowe', 'Entertainment formats', 'Formatos de entretenimiento'),
        l('Formaty dla marek', 'Formats for brands', 'Formatos para marcas'),
        l('Reality i dating formats', 'Reality and dating formats', 'Formatos reality y dating'),
        l('Mechaniki angażujące społeczność', 'Community-engaging mechanics', 'Mecánicas para involucrar a la comunidad'),
        l('Koncepcje odcinków', 'Episode concepts', 'Conceptos de episodios'),
        l('Storytelling i dramaturgia', 'Storytelling and dramaturgy', 'Storytelling y dramaturgia'),
        l('Hooki i mechanizmy zatrzymujące uwagę', 'Hooks and attention-holding mechanisms', 'Hooks y mecanismos para retener la atención'),
        l('Strategia short form', 'Short-form strategy', 'Estrategia short form'),
        l('Strategia organicznego zasięgu', 'Organic reach strategy', 'Estrategia de alcance orgánico'),
        l('Dystrybucja między platformami', 'Cross-platform distribution', 'Distribución entre plataformas'),
        l('Repurposing contentu', 'Content repurposing', 'Repurposing de contenido'),
        l('Rozwój formatów i kolejnych sezonów', 'Format development and next seasons', 'Desarrollo de formatos y nuevas temporadas'),
      ],
    },
    sections: [
      {
        title: l('Zasięg zaczyna się\nprzed *publikacją.*', 'Reach starts\nbefore *publication.*', 'El alcance empieza\nantes de la *publicación.*'),
        text: l(
          'Nie tworzymy materiału, a później zastanawiamy się, jak zdobyć dla niego widownię.\n\nJuż na etapie pomysłu myślimy o hooku, emocjach, bohaterach, momentach do komentowania i fragmentach, które mogą żyć samodzielnie w short form.',
          "We don't create material and then wonder how to find it an audience.\n\nAlready at the idea stage we think about the hook, emotions, characters, moments worth commenting on and fragments that can live on their own in short form.",
          'No creamos el material y luego pensamos cómo conseguirle audiencia.\n\nYa en la fase de idea pensamos en el hook, las emociones, los protagonistas, los momentos para comentar y los fragmentos que pueden vivir por sí solos en short form.',
        ),
      },
      {
        title: l('Jeden pomysł.\nWiele punktów *styku.*', 'One idea.\nMany *touchpoints.*', 'Una idea.\nMuchos puntos de *contacto.*'),
        text: l(
          'Dobry format nie żyje w jednym miejscu. Projektujemy go tak, żeby jego fragmenty mogły naturalnie funkcjonować na różnych platformach i prowadzić odbiorców do głównego contentu.',
          "A good format doesn't live in one place. We design it so its fragments can naturally work on different platforms and lead audiences to the main content.",
          'Un buen formato no vive en un solo lugar. Lo diseñamos para que sus fragmentos funcionen de forma natural en distintas plataformas y lleven a la audiencia al contenido principal.',
        ),
      },
      {
        title: l('Organicznego zasięgu\nnie da się zaplanować.\nMożna mu *pomóc.*', "Organic reach\ncan't be planned.\nIt can be *helped.*", 'El alcance orgánico\nno se puede planificar.\nSe puede *ayudar.*'),
        text: l(
          'Nie obiecujemy virali. Projektujemy treści tak, żeby zwiększać ich potencjał do organicznego wzrostu.\n\nLiczy się pomysł, timing, pierwsze sekundy, emocja, mechanika i zrozumienie tego, jak ludzie konsumują content.',
          "We don't promise virals. We design content to increase its potential for organic growth.\n\nWhat counts is the idea, timing, the first seconds, emotion, mechanics and understanding how people consume content.",
          'No prometemos virales. Diseñamos contenidos para aumentar su potencial de crecimiento orgánico.\n\nCuentan la idea, el timing, los primeros segundos, la emoción, la mecánica y entender cómo la gente consume contenido.',
        ),
      },
    ],
    process: {
      title: l('Od insightu\ndo *formatu.*', 'From insight\nto *format.*', 'Del insight\nal *formato.*'),
      steps: [l('Insight', 'Insight', 'Insight'), l('Pomysł', 'Idea', 'Idea'), l('Mechanika', 'Mechanics', 'Mecánica'), l('Format', 'Format', 'Formato'), l('Dystrybucja', 'Distribution', 'Distribución'), l('Rozwój', 'Growth', 'Desarrollo')],
      text: l(
        'Nie szukamy jednorazowego strzału. Budujemy pomysły, które można rozwijać, skalować i adaptować wraz ze społecznością.',
        "We're not looking for a one-off hit. We build ideas that can be developed, scaled and adapted together with the community.",
        'No buscamos un golpe de suerte. Construimos ideas que se pueden desarrollar, escalar y adaptar junto con la comunidad.',
      ),
    },
    final: {
      title: l('Nie róbmy\nkolejnego *filmu.*', "Let's not make\nanother *video.*", 'No hagamos\notro *vídeo.*'),
      text: l('Zróbmy format, który może stać się czymś większym.', "Let's make a format that can become something bigger.", 'Hagamos un formato que pueda convertirse en algo más grande.'),
      button: l('Stwórzmy format', "Let's create a format", 'Creemos un formato'),
    },
  },

  /* ============ 06 ============ */
  {
    slug: 'pr-i-media',
    num: '06',
    title: l('PR i media', 'PR & media', 'PR y medios'),
    short: l(
      'Strategia PR, premiery, komunikacja, media relations i publikacje. Łączymy digital z mediami tradycyjnymi.',
      'PR strategy, launches, communication, media relations and publications. We combine digital with traditional media.',
      'Estrategia de PR, lanzamientos, comunicación, media relations y publicaciones. Unimos digital con medios tradicionales.',
    ),
    hero: {
      title: l('Dobra historia\npowinna pójść *dalej.*', 'A good story\nshould go *further.*', 'Una buena historia\ndebe llegar *más lejos.*'),
      text: l(
        'Budujemy komunikację, która daje markom, talentom i projektom przestrzeń w mediach.\n\nOd strategii i narracji po premiery, wywiady, publikacje i działania medialne. Wiemy, jak znaleźć temat, który warto opowiedzieć.',
        'We build communication that gives brands, talents and projects space in the media.\n\nFrom strategy and narrative to launches, interviews, publications and media activities. We know how to find a story worth telling.',
        'Construimos comunicación que da a marcas, talentos y proyectos espacio en los medios.\n\nDesde la estrategia y la narrativa hasta lanzamientos, entrevistas, publicaciones y acciones mediáticas. Sabemos encontrar el tema que merece ser contado.',
      ),
    },
    scope: {
      title: l('Nie wysyłamy\ntylko *informacji prasowych.*', "We don't just\nsend *press releases.*", 'No solo enviamos\n*notas de prensa.*'),
      items: [
        l('Strategia PR', 'PR strategy', 'Estrategia de PR'),
        l('Media relations', 'Media relations', 'Media relations'),
        l('Komunikacja wizerunkowa', 'Image communication', 'Comunicación de imagen'),
        l('Biura prasowe', 'Press offices', 'Gabinetes de prensa'),
        l('Informacje i materiały prasowe', 'Press releases and materials', 'Notas y materiales de prensa'),
        l('Premiery i launch PR', 'Launch PR', 'PR de lanzamientos'),
        l('Wywiady i wystąpienia medialne', 'Interviews and media appearances', 'Entrevistas y apariciones en medios'),
        l('Lokowanie tematów w mediach', 'Media placements', 'Colocación de temas en medios'),
        l('PR talentów i marek', 'Talent and brand PR', 'PR de talentos y marcas'),
        l('PR wydarzeń i projektów', 'Event and project PR', 'PR de eventos y proyectos'),
        l('Komunikacja kryzysowa', 'Crisis communication', 'Comunicación de crisis'),
        l('Monitoring mediów', 'Media monitoring', 'Monitorización de medios'),
        l('Koordynacja obecności medialnej', 'Media presence coordination', 'Coordinación de presencia mediática'),
        l('Kampanie cross media', 'Cross-media campaigns', 'Campañas cross media'),
      ],
    },
    sections: [
      {
        title: l('Media potrzebują\ntematu. Nie *reklamy.*', 'Media need\na story. Not an *ad.*', 'Los medios necesitan\nun tema. No un *anuncio.*'),
        text: l(
          'Samo wysłanie komunikatu nie sprawia, że ktoś chce o nim napisać.\n\nSzukamy historii, kontekstu i właściwego momentu. Budujemy narrację tak, żeby była interesująca nie tylko dla klienta, ale przede wszystkim dla odbiorcy i redakcji.',
          "Sending a release doesn't make anyone want to write about it.\n\nWe look for the story, the context and the right moment. We build the narrative so that it's interesting not only for the client, but above all for the audience and the newsroom.",
          'Enviar un comunicado no hace que alguien quiera escribir sobre él.\n\nBuscamos la historia, el contexto y el momento adecuado. Construimos la narrativa para que sea interesante no solo para el cliente, sino sobre todo para el público y las redacciones.',
        ),
      },
      {
        title: l('Digital spotyka\ntradycyjne *media.*', 'Digital meets\ntraditional *media.*', 'Lo digital se encuentra\ncon los medios *tradicionales.*'),
        text: l(
          'Łączymy social media, influencerów, portale, prasę, radio i inne kanały komunikacji w jeden ekosystem.\n\nDzięki temu historia nie musi kończyć się na jednej publikacji. Może żyć równolegle w wielu miejscach i docierać do różnych grup odbiorców.',
          "We connect social media, influencers, portals, press, radio and other channels into one ecosystem.\n\nThat way the story doesn't have to end with one publication. It can live in many places at once and reach different audiences.",
          'Unimos redes sociales, influencers, portales, prensa, radio y otros canales en un solo ecosistema.\n\nAsí la historia no tiene que terminar en una publicación. Puede vivir en paralelo en muchos lugares y llegar a distintos públicos.',
        ),
      },
      {
        title: l('540+ serwisów.\nJedno *zaplecze.*', '540+ services.\nOne *backbone.*', '540+ portales.\nUna *infraestructura.*'),
        text: l(
          'Dzięki współpracy z Polska Press możemy rozszerzać wybrane działania o szeroką sieć serwisów lokalnych i regionalnych w całej Polsce.\n\nPR łączymy z realnym zapleczem dystrybucji medialnej.',
          'Thanks to our partnership with Polska Press we can extend selected activities to a wide network of local and regional services across Poland.\n\nWe combine PR with real media distribution resources.',
          'Gracias a la colaboración con Polska Press podemos ampliar determinadas acciones a una amplia red de portales locales y regionales en toda Polonia.\n\nUnimos el PR con una infraestructura real de distribución mediática.',
        ),
      },
    ],
    process: {
      title: l('Od historii\ndo *zasięgu.*', 'From story\nto *reach.*', 'De la historia\nal *alcance.*'),
      steps: [l('Strategia', 'Strategy', 'Estrategia'), l('Narracja', 'Narrative', 'Narrativa'), l('Media', 'Media', 'Medios'), l('Publikacje', 'Publications', 'Publicaciones'), l('Amplifikacja', 'Amplification', 'Amplificación'), l('Monitoring', 'Monitoring', 'Monitorización')],
      text: l(
        'Dobieramy kanały do historii, a nie historię do kanału. PR może działać samodzielnie albo być częścią większej kampanii, premiery, eventu czy launchu.',
        'We match channels to the story, not the story to the channel. PR can work on its own or be part of a bigger campaign, premiere, event or launch.',
        'Adaptamos los canales a la historia, no la historia al canal. El PR puede funcionar solo o ser parte de una campaña mayor, un estreno, un evento o un lanzamiento.',
      ),
    },
    final: {
      title: l('Masz historię?\nSprawmy, żeby było\no niej *głośno.*', 'Got a story?\nLet\'s make it\n*heard.*', '¿Tienes una historia?\nHagamos que se hable\n*de ella.*'),
      text: l('Znajdziemy właściwy język, moment i media.', "We'll find the right language, moment and media.", 'Encontraremos el lenguaje, el momento y los medios adecuados.'),
      button: l('Porozmawiajmy o PR', "Let's talk PR", 'Hablemos de PR'),
    },
  },

  /* ============ 07 ============ */
  {
    slug: 'eventy-i-wydarzenia-specjalne',
    num: '07',
    title: l('Eventy i wydarzenia specjalne', 'Events & special occasions', 'Eventos y ocasiones especiales'),
    short: l(
      'Eventy, premiery, pokazy, aktywacje, wernisaże i wydarzenia specjalne. Projektujemy całe doświadczenie wokół marki.',
      'Events, launches, shows, activations, openings and special occasions. We design the whole experience around the brand.',
      'Eventos, estrenos, desfiles, activaciones, inauguraciones y ocasiones especiales. Diseñamos toda la experiencia en torno a la marca.',
    ),
    hero: {
      title: l('Nie robimy eventów.\nTworzymy *momenty.*', "We don't do events.\nWe create *moments.*", 'No hacemos eventos.\nCreamos *momentos.*'),
      text: l(
        'Od pierwszego pomysłu po ostatniego gościa. Tworzymy wydarzenia, które mają charakter, budują markę i zostawiają po sobie coś więcej niż zdjęcia.\n\nPremiery, pokazy, wydarzenia dla marek, aktywacje i projekty specjalne. Każdy event zaczynamy od pytania: po co ludzie mają go zapamiętać?',
        'From the first idea to the last guest. We create events with character, that build the brand and leave behind more than photos.\n\nLaunches, shows, brand events, activations and special projects. We start every event with the question: what should people remember it for?',
        'De la primera idea al último invitado. Creamos eventos con carácter, que construyen marca y dejan algo más que fotos.\n\nEstrenos, desfiles, eventos de marca, activaciones y proyectos especiales. Cada evento empieza con una pregunta: ¿por qué la gente debería recordarlo?',
      ),
    },
    scope: {
      title: l('Od pomysłu\ndo ostatniego *światła.*', 'From the idea\nto the last *light.*', 'De la idea\na la última *luz.*'),
      items: [
        l('Koncepcja kreatywna wydarzenia', 'Creative event concept', 'Concepto creativo del evento'),
        l('Produkcja eventów', 'Event production', 'Producción de eventos'),
        l('Premiery', 'Launches', 'Estrenos'),
        l('Pokazy mody', 'Fashion shows', 'Desfiles de moda'),
        l('Gale i wydarzenia specjalne', 'Galas and special occasions', 'Galas y ocasiones especiales'),
        l('Eventy dla marek', 'Brand events', 'Eventos de marca'),
        l('Launch produktów', 'Product launches', 'Lanzamientos de producto'),
        l('Aktywacje konsumenckie', 'Consumer activations', 'Activaciones de consumidor'),
        l('Eventy z influencerami i talentami', 'Events with influencers and talents', 'Eventos con influencers y talentos'),
        l('Scenografia i branding przestrzeni', 'Set design and space branding', 'Escenografía y branding del espacio'),
        l('Technika, światło i multimedia', 'Technology, lighting and multimedia', 'Técnica, iluminación y multimedia'),
        l('Casting i booking', 'Casting and booking', 'Casting y booking'),
        l('Oprawa artystyczna', 'Artistic programme', 'Programa artístico'),
        l('Foto i video eventowe', 'Event photo and video', 'Foto y vídeo de eventos'),
        l('PR i media', 'PR and media', 'PR y medios'),
        l('Koordynacja partnerów i podwykonawców', 'Partner and subcontractor coordination', 'Coordinación de socios y proveedores'),
        l('Obsługa produkcyjna wydarzenia', 'Production management of the event', 'Gestión de producción del evento'),
      ],
    },
    sections: [
      {
        title: l('Event zaczyna się\nprzed wejściem *gości.*', 'The event starts\nbefore the guests *arrive.*', 'El evento empieza\nantes de que lleguen los *invitados.*'),
        text: l(
          'Zaproszenie, miejsce, scenografia, światło, muzyka, ludzie i komunikacja muszą opowiadać tę samą historię.\n\nProjektujemy całe doświadczenie, a nie tylko to, co dzieje się na scenie.',
          'The invitation, the venue, the set, the light, the music, the people and the communication must tell the same story.\n\nWe design the whole experience, not just what happens on stage.',
          'La invitación, el lugar, la escenografía, la luz, la música, la gente y la comunicación deben contar la misma historia.\n\nDiseñamos toda la experiencia, no solo lo que pasa en el escenario.',
        ),
      },
      {
        title: l('Event nie musi kończyć się\nwraz z ostatnim *gościem.*', "An event doesn't have to end\nwith the last *guest.*", 'Un evento no tiene que terminar\ncon el último *invitado.*'),
        text: l(
          'Myślimy o wydarzeniu również jak o źródle komunikacji. Foto, video, social media, twórcy, media i PR mogą sprawić, że jeden wieczór pracuje dla marki jeszcze długo po jego zakończeniu.',
          'We also think of the event as a source of communication. Photo, video, social media, creators, media and PR can make one evening work for the brand long after it ends.',
          'También pensamos en el evento como fuente de comunicación. Foto, vídeo, redes sociales, creadores, medios y PR pueden hacer que una sola noche trabaje para la marca mucho después de terminar.',
        ),
      },
    ],
    portfolio: {
      title: l('Na żywo\nwygląda jeszcze *lepiej.*', 'Live it looks\neven *better.*', 'En vivo se ve\naún *mejor.*'),
      kind: 'events',
      note: l(
        'Przestrzenie i scenografie, branding wydarzeń, goście i atmosfera, pokazy i scena, aktywacje marek, strefy partnerów, backstage, detale produkcyjne, aftermovie i krótkie formy video z eventów.',
        'Spaces and sets, event branding, guests and atmosphere, shows and stage, brand activations, partner zones, backstage, production details, aftermovies and short-form video from events.',
        'Espacios y escenografías, branding de eventos, invitados y ambiente, desfiles y escenario, activaciones de marca, zonas de socios, backstage, detalles de producción, aftermovies y vídeos cortos de eventos.',
      ),
      caption: l('Event / Premiere / Fashion / Activation / Special Project', 'Event / Premiere / Fashion / Activation / Special Project', 'Event / Premiere / Fashion / Activation / Special Project'),
    },
    process: {
      title: l('Od koncepcji\ndo *realizacji.*', 'From concept\nto *execution.*', 'Del concepto\na la *realización.*'),
      steps: [l('Koncept', 'Concept', 'Concepto'), l('Produkcja', 'Production', 'Producción'), l('Goście', 'Guests', 'Invitados'), l('Experience', 'Experience', 'Experiencia'), l('Content', 'Content', 'Contenido'), l('Media', 'Media', 'Medios')],
      text: l(
        'Spinamy kreatywność, produkcję, ludzi, media i komunikację w jeden projekt. Klient widzi wydarzenie. My widzimy wszystkie elementy, które muszą zadziałać, żeby wyglądało na proste.',
        'We bring creativity, production, people, media and communication together into one project. The client sees the event. We see every element that has to work for it to look simple.',
        'Unimos creatividad, producción, personas, medios y comunicación en un solo proyecto. El cliente ve el evento. Nosotros vemos todos los elementos que deben funcionar para que parezca sencillo.',
      ),
    },
    final: {
      title: l('Zróbmy coś,\no czym będzie się *mówić.*', "Let's do something\npeople will *talk about.*", 'Hagamos algo\nde lo que se *hable.*'),
      text: l('Od kameralnej premiery po duże wydarzenie. Skala się zmienia. Podejście nie.', 'From an intimate launch to a big event. The scale changes. The approach does not.', 'De un estreno íntimo a un gran evento. La escala cambia. El enfoque no.'),
      button: l('Zróbmy event', "Let's make an event", 'Hagamos un evento'),
    },
  },

  /* ============ 08 ============ */
  {
    slug: 'koncerty-i-live-entertainment',
    num: '08',
    title: l('Koncerty i live entertainment', 'Concerts & live entertainment', 'Conciertos y live entertainment'),
    short: l(
      'Koncerty, trasy, booking i produkcja live. Realizujemy projekty wspólnie z partnerami z wieloletnim doświadczeniem koncertowym.',
      'Concerts, tours, booking and live production. We deliver projects together with partners with years of concert experience.',
      'Conciertos, giras, booking y producción live. Realizamos proyectos junto a socios con años de experiencia en conciertos.',
    ),
    hero: {
      title: l('Scena to nie miejsce.\nTo *emocja.*', 'The stage is not a place.\nIt\'s an *emotion.*', 'El escenario no es un lugar.\nEs una *emoción.*'),
      text: l(
        'Tworzymy i rozwijamy projekty live od pierwszej koncepcji po moment, w którym gasną światła.\n\nKoncerty, trasy, booking, produkcja i oprawa. Łączymy artystów, scenę, technologię i doświadczenie w jeden projekt.',
        'We create and develop live projects from the first concept to the moment the lights go out.\n\nConcerts, tours, booking, production and show design. We bring artists, stage, technology and experience together into one project.',
        'Creamos y desarrollamos proyectos live desde el primer concepto hasta el momento en que se apagan las luces.\n\nConciertos, giras, booking, producción y puesta en escena. Unimos artistas, escenario, tecnología y experiencia en un solo proyecto.',
      ),
    },
    scope: {
      title: l('Od pierwszej próby\ndo ostatniego *bisu.*', 'From the first rehearsal\nto the last *encore.*', 'Del primer ensayo\nal último *bis.*'),
      items: [
        l('Produkcja koncertów', 'Concert production', 'Producción de conciertos'),
        l('Trasy koncertowe', 'Tours', 'Giras'),
        l('Booking artystów', 'Artist booking', 'Booking de artistas'),
        l('Koncepcja show', 'Show concept', 'Concepto del show'),
        l('Produkcja techniczna', 'Technical production', 'Producción técnica'),
        l('Scenografia', 'Set design', 'Escenografía'),
        l('Multimedia i ekrany', 'Multimedia and screens', 'Multimedia y pantallas'),
        l('Światło i oprawa wizualna', 'Lighting and visual design', 'Iluminación y diseño visual'),
        l('Nagłośnienie', 'Sound', 'Sonido'),
        l('Reżyseria show', 'Show direction', 'Dirección del show'),
        l('Oprawa artystyczna', 'Artistic programme', 'Programa artístico'),
        l('Koordynacja ekip', 'Crew coordination', 'Coordinación de equipos'),
        l('Backstage i logistyka', 'Backstage and logistics', 'Backstage y logística'),
        l('Foto i video koncertowe', 'Concert photo and video', 'Foto y vídeo de conciertos'),
        l('Content koncertowy', 'Concert content', 'Contenido de conciertos'),
        l('Promocja i komunikacja', 'Promotion and communication', 'Promoción y comunicación'),
        l('PR i media', 'PR and media', 'PR y medios'),
      ],
    },
    sections: [
      {
        title: l('Koncert zaczyna się\ndługo przed wyjściem\nna *scenę.*', 'A concert starts\nlong before\nthe *stage.*', 'Un concierto empieza\nmucho antes de salir\nal *escenario.*'),
        text: l(
          'Publiczność widzi kilkadziesiąt minut show. Za nimi stoją miesiące decyzji, produkcji i przygotowań.\n\nŁączymy wszystkie elementy tak, żeby na scenie zostało już tylko jedno: emocja.',
          'The audience sees a few dozen minutes of show. Behind them stand months of decisions, production and preparation.\n\nWe bring all the elements together so that only one thing is left on stage: emotion.',
          'El público ve unas decenas de minutos de show. Detrás hay meses de decisiones, producción y preparación.\n\nUnimos todos los elementos para que en el escenario solo quede una cosa: la emoción.',
        ),
      },
      {
        title: l('Live, który żyje\nrównież *online.*', 'Live that lives\n*online* too.', 'Un live que vive\ntambién *online.*'),
        text: l(
          'Scena jest początkiem, nie końcem komunikacji. Projektujemy koncerty również z myślą o contencie, który może później żyć w social mediach, video, PR i digitalu.\n\nJeden moment na scenie może dotrzeć znacznie dalej niż publiczność pod nią.',
          "The stage is the beginning, not the end of communication. We also design concerts with the content in mind that can later live in social media, video, PR and digital.\n\nOne moment on stage can reach much further than the audience in front of it.",
          'El escenario es el principio, no el fin de la comunicación. Diseñamos los conciertos pensando también en el contenido que luego puede vivir en redes, vídeo, PR y digital.\n\nUn momento en el escenario puede llegar mucho más lejos que el público que está delante.',
        ),
      },
    ],
    portfolio: {
      title: l('Światła. Scena.\n*Publiczność.*', 'Lights. Stage.\n*Audience.*', 'Luces. Escenario.\n*Público.*'),
      kind: 'live',
      note: l(
        'Scena i show, artyści podczas koncertów, publiczność, scenografia, światło i multimedia, backstage, próby, produkcja za kulisami, materiały koncertowe video i short form ze sceny.',
        'Stage and show, artists in concert, audience, set design, lighting and multimedia, backstage, rehearsals, behind-the-scenes production, concert video and short form from the stage.',
        'Escenario y show, artistas en concierto, público, escenografía, luz y multimedia, backstage, ensayos, producción entre bastidores, vídeos de conciertos y short form desde el escenario.',
      ),
      caption: l('Koncert / Trasa / Show / Live', 'Concert / Tour / Show / Live', 'Concierto / Gira / Show / Live'),
    },
    process: {
      title: l('Show to\nsuma *detali.*', 'A show is\nthe sum of *details.*', 'Un show es\nla suma de *detalles.*'),
      steps: [l('Koncept', 'Concept', 'Concepto'), l('Booking', 'Booking', 'Booking'), l('Preprodukcja', 'Pre-production', 'Preproducción'), l('Próby', 'Rehearsals', 'Ensayos'), l('Scena', 'Stage', 'Escenario'), l('Content', 'Content', 'Contenido'), l('Promocja', 'Promotion', 'Promoción')],
      text: l(
        'Artysta, muzyka, światło, scena, technika i komunikacja muszą pracować razem. Spinamy je w jeden projekt.',
        'Artist, music, light, stage, technology and communication must work together. We bring them into one project.',
        'Artista, música, luz, escenario, técnica y comunicación deben trabajar juntos. Los unimos en un solo proyecto.',
      ),
    },
    final: {
      title: l('Niech to\nwybrzmi *na żywo.*', 'Let it\nsound *live.*', 'Que suene\n*en vivo.*'),
      text: l('Od pojedynczego koncertu po trasę i pełne show.', 'From a single concert to a tour and a full show.', 'De un solo concierto a una gira y un show completo.'),
      button: l('Porozmawiajmy o live', "Let's talk live", 'Hablemos de live'),
    },
  },

  /* ============ 09 ============ */
  {
    slug: 'merch-i-produkty',
    num: '09',
    title: l('Merch i produkty', 'Merch & products', 'Merch y productos'),
    short: l(
      'Od pomysłu i designu po produkcję, launch i komunikację. Odzież, biżuteria, produkty i kolekcje tworzone wokół talentów i marek.',
      'From idea and design to production, launch and communication. Apparel, jewellery, products and collections built around talents and brands.',
      'De la idea y el diseño a la producción, el lanzamiento y la comunicación. Ropa, joyería, productos y colecciones creados en torno a talentos y marcas.',
    ),
    hero: {
      title: l('Nie robimy gadżetów.\nTworzymy produkty,\nktóre chcesz *mieć.*', "We don't make gadgets.\nWe create products\nyou want to *own.*", 'No hacemos gadgets.\nCreamos productos\nque quieres *tener.*'),
      text: l(
        'Merch może być czymś więcej niż logo nadrukowanym na bluzie.\n\nTworzymy produkty i kolekcje, które są naturalnym przedłużeniem talentu, marki albo społeczności. Od pierwszego pomysłu po moment, w którym produkt trafia do klienta.',
        'Merch can be more than a logo printed on a hoodie.\n\nWe create products and collections that are a natural extension of a talent, a brand or a community. From the first idea to the moment the product reaches the customer.',
        'El merch puede ser algo más que un logo impreso en una sudadera.\n\nCreamos productos y colecciones que son la extensión natural de un talento, una marca o una comunidad. Desde la primera idea hasta el momento en que el producto llega al cliente.',
      ),
    },
    scope: {
      title: l('Od pomysłu\ndo *produktu.*', 'From idea\nto *product.*', 'De la idea\nal *producto.*'),
      items: [
        l('Koncepcja produktu', 'Product concept', 'Concepto de producto'),
        l('Strategia kolekcji', 'Collection strategy', 'Estrategia de colección'),
        l('Merch dla talentów i marek', 'Merch for talents and brands', 'Merch para talentos y marcas'),
        l('Odzież i akcesoria', 'Apparel and accessories', 'Ropa y accesorios'),
        l('Biżuteria', 'Jewellery', 'Joyería'),
        l('Produkty lifestyle', 'Lifestyle products', 'Productos lifestyle'),
        l('Kolekcje limitowane', 'Limited collections', 'Colecciones limitadas'),
        l('Design i identyfikacja kolekcji', 'Collection design and identity', 'Diseño e identidad de la colección'),
        l('Opakowania', 'Packaging', 'Packaging'),
        l('Sourcing i dobór producentów', 'Sourcing and manufacturer selection', 'Sourcing y selección de fabricantes'),
        l('Prototypy i sample', 'Prototypes and samples', 'Prototipos y muestras'),
        l('Koordynacja produkcji', 'Production coordination', 'Coordinación de producción'),
        l('Sesje produktowe', 'Product shoots', 'Sesiones de producto'),
        l('Content i kampania launchowa', 'Content and launch campaign', 'Contenido y campaña de lanzamiento'),
        l('Influencer marketing', 'Influencer marketing', 'Influencer marketing'),
        l('E-commerce', 'E-commerce', 'E-commerce'),
        l('Premiery i dropy', 'Launches and drops', 'Lanzamientos y drops'),
        l('Komunikacja sprzedażowa', 'Sales communication', 'Comunicación de ventas'),
      ],
    },
    sections: [
      {
        title: l('Najpierw powód.\nPotem *produkt.*', 'First the reason.\nThen the *product.*', 'Primero la razón.\nLuego el *producto.*'),
        text: l(
          'Nie zaczynamy od pytania, co można nadrukować.\n\nZaczynamy od marki, jej odbiorców i tego, co naprawdę mogliby chcieć kupić. Produkt powinien mieć własny charakter i sens, nawet kiedy zdejmiesz z niego nazwisko czy logo.',
          "We don't start with the question of what can be printed.\n\nWe start with the brand, its audience and what they might genuinely want to buy. The product should have its own character and meaning, even when you take the name or the logo off it.",
          'No empezamos preguntando qué se puede imprimir.\n\nEmpezamos por la marca, su público y lo que realmente querrían comprar. El producto debe tener carácter y sentido propios, incluso cuando le quitas el nombre o el logo.',
        ),
      },
      {
        title: l('Produkt to dopiero\npołowa *historii.*', 'The product is only\nhalf the *story.*', 'El producto es solo\nla mitad de la *historia.*'),
        text: l(
          'Dobry produkt potrzebuje odpowiedniej premiery. Budujemy wokół niego identyfikację, zdjęcia, video, content, komunikację, social media i launch.\n\nDzięki temu nie wypuszczamy rzeczy. Wypuszczamy marki i kolekcje.',
          "A good product needs the right launch. We build identity, photos, video, content, communication, social media and the launch around it.\n\nThat way we don't release things. We release brands and collections.",
          'Un buen producto necesita el lanzamiento adecuado. Construimos a su alrededor identidad, fotos, vídeo, contenido, comunicación, redes y launch.\n\nAsí no lanzamos cosas. Lanzamos marcas y colecciones.',
        ),
      },
    ],
    portfolio: {
      title: l('Od ekranu\ndo prawdziwego *świata.*', 'From the screen\nto the real *world.*', 'De la pantalla\nal mundo *real.*'),
      kind: 'products',
      note: l(
        'Odzież, biżuteria, opakowania, produkty lifestyle, sesje kampanijne i detale produktu.',
        'Apparel, jewellery, packaging, lifestyle products, campaign shoots and product details.',
        'Ropa, joyería, packaging, productos lifestyle, sesiones de campaña y detalles de producto.',
      ),
      caption: l('Merch / Kolekcja / Produkt / Launch', 'Merch / Collection / Product / Launch', 'Merch / Colección / Producto / Launch'),
    },
    process: {
      title: l('Od idei\ndo *dropu.*', 'From idea\nto *drop.*', 'De la idea\nal *drop.*'),
      steps: [l('Pomysł', 'Idea', 'Idea'), l('Design', 'Design', 'Diseño'), l('Prototyp', 'Prototype', 'Prototipo'), l('Produkcja', 'Production', 'Producción'), l('Content', 'Content', 'Contenido'), l('Launch', 'Launch', 'Launch'), l('Sprzedaż', 'Sales', 'Ventas')],
      text: l(
        'Możemy wejść w projekt na jednym etapie albo przeprowadzić cały proces od pierwszego szkicu po premierę i komunikację sprzedażową.',
        'We can join the project at one stage or run the whole process from the first sketch to the launch and sales communication.',
        'Podemos entrar en el proyecto en una fase o llevar todo el proceso desde el primer boceto hasta el lanzamiento y la comunicación de ventas.',
      ),
    },
    final: {
      title: l('Niech marka\nwyjdzie poza *ekran.*', 'Let the brand\nstep off the *screen.*', 'Que la marca\nsalga de la *pantalla.*'),
      text: l('Zamieńmy pomysł, społeczność albo osobowość w produkt, który można naprawdę mieć.', "Let's turn an idea, a community or a personality into a product you can actually own.", 'Convirtamos una idea, una comunidad o una personalidad en un producto que se pueda tener de verdad.'),
      button: l('Stwórzmy produkt', "Let's create a product", 'Creemos un producto'),
    },
  },

  /* ============ 10 ============ */
  {
    slug: 'budowa-marek-i-projekty-specjalne',
    num: '10',
    title: l('Budowa marek i projekty specjalne', 'Brand building & special projects', 'Construcción de marcas y proyectos especiales'),
    short: l(
      'Budujemy marki i projekty od zera. Pozycjonowanie, koncept, storytelling, komunikacja i wejście na rynek.',
      'We build brands and projects from scratch. Positioning, concept, storytelling, communication and market entry.',
      'Construimos marcas y proyectos desde cero. Posicionamiento, concepto, storytelling, comunicación y entrada en el mercado.',
    ),
    hero: {
      title: l('Zaczynamy tam,\ngdzie jeszcze *nic nie ma.*', 'We start where\nthere is *nothing yet.*', 'Empezamos donde\naún *no hay nada.*'),
      text: l(
        'Pomysł to za mało. Budujemy wokół niego markę, charakter, język i świat, który można rozwijać.\n\nOd nowej marki i produktu po projekt specjalny, którego nie da się zamknąć w jednej kategorii.',
        "An idea isn't enough. We build a brand, a character, a language and a world around it that can grow.\n\nFrom a new brand and product to a special project that can't be locked into a single category.",
        'Una idea no basta. Construimos a su alrededor una marca, un carácter, un lenguaje y un mundo que pueda crecer.\n\nDesde una nueva marca y producto hasta un proyecto especial que no cabe en una sola categoría.',
      ),
    },
    scope: {
      title: l('Od pustej kartki\ndo gotowej *marki.*', 'From a blank page\nto a finished *brand.*', 'De la hoja en blanco\na la marca *terminada.*'),
      items: [
        l('Koncepcja marki', 'Brand concept', 'Concepto de marca'),
        l('Pozycjonowanie', 'Positioning', 'Posicionamiento'),
        l('Strategia marki', 'Brand strategy', 'Estrategia de marca'),
        l('Osobowość i język marki', 'Brand personality and language', 'Personalidad y lenguaje de marca'),
        l('Storytelling', 'Storytelling', 'Storytelling'),
        l('Architektura komunikacji', 'Communication architecture', 'Arquitectura de comunicación'),
        l('Koncepcja produktu lub usługi', 'Product or service concept', 'Concepto de producto o servicio'),
        l('Strategia wejścia na rynek', 'Go-to-market strategy', 'Estrategia de entrada al mercado'),
        l('Launch marki', 'Brand launch', 'Lanzamiento de marca'),
        l('Digital i social media', 'Digital and social media', 'Digital y redes sociales'),
        l('Content i produkcja', 'Content and production', 'Contenido y producción'),
        l('PR i media', 'PR and media', 'PR y medios'),
        l('Influencer marketing', 'Influencer marketing', 'Influencer marketing'),
        l('Eventy i aktywacje', 'Events and activations', 'Eventos y activaciones'),
        l('Merch i produkty', 'Merch and products', 'Merch y productos'),
        l('Projekty niestandardowe', 'Non-standard projects', 'Proyectos no convencionales'),
        l('Rozwój istniejących marek', 'Growing existing brands', 'Desarrollo de marcas existentes'),
        l('Rebranding', 'Rebranding', 'Rebranding'),
      ],
    },
    sections: [
      {
        title: l('Logo nie robi *marki.*', 'A logo doesn\'t make\na *brand.*', 'Un logo no hace\nuna *marca.*'),
        text: l(
          'Marka zaczyna się dużo wcześniej niż identyfikacja wizualna.\n\nNajpierw odpowiadamy na pytania: kim jesteśmy, do kogo mówimy, dlaczego ktoś ma nas wybrać i co sprawi, że zostaniemy zapamiętani.\n\nDopiero później budujemy wszystko, co odbiorca zobaczy.',
          'A brand starts long before the visual identity.\n\nFirst we answer the questions: who are we, who are we talking to, why should someone choose us and what will make us memorable.\n\nOnly then do we build everything the audience will see.',
          'Una marca empieza mucho antes que la identidad visual.\n\nPrimero respondemos a las preguntas: quiénes somos, a quién hablamos, por qué alguien debería elegirnos y qué hará que nos recuerden.\n\nSolo después construimos todo lo que el público verá.',
        ),
      },
      {
        title: l('Nie wszystko\nmieści się w *briefie.*', 'Not everything\nfits in a *brief.*', 'No todo\ncabe en un *brief.*'),
        text: l(
          'Niektóre projekty wymagają połączenia strategii, creative, technologii, produkcji, mediów, influencerów i wydarzeń.\n\nWłaśnie dlatego realizujemy projekty specjalne. Zamiast dopasowywać pomysł do gotowej usługi, dobieramy kompetencje do pomysłu.',
          "Some projects require combining strategy, creative, technology, production, media, influencers and events.\n\nThat's exactly why we do special projects. Instead of fitting the idea to a ready-made service, we fit the competences to the idea.",
          'Algunos proyectos requieren combinar estrategia, creatividad, tecnología, producción, medios, influencers y eventos.\n\nPor eso realizamos proyectos especiales. En lugar de adaptar la idea a un servicio ya hecho, adaptamos las competencias a la idea.',
        ),
      },
      {
        title: l('Jeden pomysł.\nCały *ekosystem.*', 'One idea.\nA whole *ecosystem.*', 'Una idea.\nTodo un *ecosistema.*'),
        text: l(
          'Możemy zbudować projekt od początku albo wejść w markę, która potrzebuje nowego kierunku.\n\nŁączymy kompetencje Star Media tak, żeby strategia, wizerunek, digital, content, PR, produkt i doświadczenie odbiorcy mówiły jednym językiem.',
          "We can build a project from the start or step into a brand that needs a new direction.\n\nWe combine Star Media's competences so that strategy, image, digital, content, PR, product and audience experience speak one language.",
          'Podemos construir un proyecto desde el principio o entrar en una marca que necesita una nueva dirección.\n\nUnimos las competencias de Star Media para que estrategia, imagen, digital, contenido, PR, producto y experiencia del público hablen el mismo idioma.',
        ),
      },
    ],
    process: {
      title: l('Od idei\ndo *rynku.*', 'From idea\nto *market.*', 'De la idea\nal *mercado.*'),
      steps: [l('Idea', 'Idea', 'Idea'), l('Strategia', 'Strategy', 'Estrategia'), l('Marka', 'Brand', 'Marca'), l('Produkt', 'Product', 'Producto'), l('Komunikacja', 'Communication', 'Comunicación'), l('Launch', 'Launch', 'Launch'), l('Rozwój', 'Growth', 'Desarrollo')],
      text: l(
        'Nie kończymy pracy w momencie stworzenia koncepcji. Pomagamy przełożyć ją na rzeczywisty projekt, wprowadzić na rynek i rozwijać dalej.',
        "We don't stop when the concept is created. We help translate it into a real project, bring it to market and keep growing it.",
        'No terminamos el trabajo al crear el concepto. Ayudamos a convertirlo en un proyecto real, llevarlo al mercado y seguir desarrollándolo.',
      ),
    },
    final: {
      title: l('Masz pomysł,\nktóry nie mieści się\nw *szufladzie?*', 'Got an idea\nthat doesn\'t fit\nin a *drawer?*', '¿Tienes una idea\nque no cabe\nen un *cajón?*'),
      text: l('Idealnie. Najciekawsze projekty zwykle się nie mieszczą.', "Perfect. The most interesting projects usually don't.", 'Perfecto. Los proyectos más interesantes normalmente no caben.'),
      button: l('Zbudujmy to', "Let's build it", 'Construyámoslo'),
    },
  },

  /* ============ 11 ============ */
  {
    slug: 'www-e-commerce-i-aplikacje',
    num: '11',
    title: l('WWW, e-commerce i aplikacje', 'Web, e-commerce & apps', 'Web, e-commerce y aplicaciones'),
    short: l(
      'Strony internetowe, sklepy, landing page\'e, aplikacje webowe i mobilne oraz dedykowane systemy. Od UX/UI po wdrożenie i rozwój.',
      'Websites, shops, landing pages, web and mobile apps and custom systems. From UX/UI to launch and growth.',
      'Sitios web, tiendas, landing pages, aplicaciones web y móviles y sistemas a medida. Del UX/UI a la implementación y el desarrollo.',
    ),
    hero: {
      title: l('Nie tylko ładne.\nPrzede wszystkim *użyteczne.*', 'Not just pretty.\nAbove all *useful.*', 'No solo bonito.\nSobre todo *útil.*'),
      text: l(
        'Projektujemy i budujemy rozwiązania cyfrowe, które mają konkretną funkcję biznesową.\n\nOd strony marki i sklepu internetowego po aplikację, platformę SaaS czy dedykowany system. Design, technologia i doświadczenie użytkownika powstają jako jeden produkt.',
        'We design and build digital solutions with a specific business function.\n\nFrom a brand website and online shop to an app, a SaaS platform or a custom system. Design, technology and user experience are created as one product.',
        'Diseñamos y construimos soluciones digitales con una función de negocio concreta.\n\nDesde la web de marca y la tienda online hasta una aplicación, una plataforma SaaS o un sistema a medida. Diseño, tecnología y experiencia de usuario nacen como un solo producto.',
      ),
    },
    scope: {
      title: l('Od pomysłu\ndo działającego *produktu.*', 'From idea\nto a working *product.*', 'De la idea\nal producto *que funciona.*'),
      items: [
        l('Strony internetowe', 'Websites', 'Sitios web'),
        l('Landing page\'e', 'Landing pages', 'Landing pages'),
        l('Serwisy korporacyjne', 'Corporate websites', 'Webs corporativas'),
        l('E-commerce i sklepy internetowe', 'E-commerce and online shops', 'E-commerce y tiendas online'),
        l('Aplikacje webowe', 'Web applications', 'Aplicaciones web'),
        l('Aplikacje mobilne iOS i Android', 'iOS and Android mobile apps', 'Aplicaciones móviles iOS y Android'),
        l('Platformy SaaS', 'SaaS platforms', 'Plataformas SaaS'),
        l('Systemy rezerwacyjne', 'Booking systems', 'Sistemas de reservas'),
        l('Panele administracyjne', 'Admin panels', 'Paneles de administración'),
        l('Systemy CRM i ERP', 'CRM and ERP systems', 'Sistemas CRM y ERP'),
        l('Aplikacje desktopowe', 'Desktop applications', 'Aplicaciones de escritorio'),
        l('UX/UI Design', 'UX/UI design', 'Diseño UX/UI'),
        l('Integracje API', 'API integrations', 'Integraciones API'),
        l('Systemy płatności', 'Payment systems', 'Sistemas de pago'),
        l('Integracje z systemami zewnętrznymi', 'Integrations with external systems', 'Integraciones con sistemas externos'),
        l('Backend i bazy danych', 'Backend and databases', 'Backend y bases de datos'),
        l('Utrzymanie i rozwój produktów cyfrowych', 'Maintenance and growth of digital products', 'Mantenimiento y desarrollo de productos digitales'),
      ],
    },
    sections: [
      {
        title: l('Design ma wyglądać.\nTechnologia ma *działać.*', 'Design should look good.\nTechnology should *work.*', 'El diseño debe verse.\nLa tecnología debe *funcionar.*'),
        text: l(
          'Dobry produkt cyfrowy potrzebuje obu.\n\nŁączymy UX/UI, technologię i cele biznesowe tak, żeby użytkownik dostał intuicyjne doświadczenie, a marka narzędzie, które można rozwijać razem z biznesem.',
          'A good digital product needs both.\n\nWe combine UX/UI, technology and business goals so that the user gets an intuitive experience and the brand gets a tool that can grow with the business.',
          'Un buen producto digital necesita ambas.\n\nUnimos UX/UI, tecnología y objetivos de negocio para que el usuario tenga una experiencia intuitiva y la marca una herramienta que crezca con el negocio.',
        ),
      },
      {
        title: l('Nie każdy biznes\npotrzebuje *tego samego.*', 'Not every business\nneeds *the same thing.*', 'No todo negocio\nnecesita *lo mismo.*'),
        text: l(
          'Czasem wystarczy dobry landing page. Innym razem potrzebny jest sklep, aplikacja, system rezerwacji albo rozwiązanie napisane od podstaw.\n\nDobieramy technologię do problemu, zamiast budować technologię dla samej technologii.',
          "Sometimes a good landing page is enough. Other times you need a shop, an app, a booking system or a solution written from scratch.\n\nWe match the technology to the problem instead of building technology for technology's sake.",
          'A veces basta con un buen landing page. Otras veces hace falta una tienda, una aplicación, un sistema de reservas o una solución escrita desde cero.\n\nAdaptamos la tecnología al problema en lugar de construir tecnología por la tecnología.',
        ),
      },
      {
        title: l('Front to tylko\nto, co *widać.*', 'The front end is only\nwhat you *see.*', 'El front es solo\nlo que *se ve.*'),
        text: l(
          'Za produktem może stać cały ekosystem: backend, baza danych, płatności, CRM, system mailingowy, logowanie, analityka i zewnętrzne API.\n\nProjektujemy rozwiązania tak, żeby wszystkie elementy działały razem.',
          'Behind the product there can be a whole ecosystem: backend, database, payments, CRM, mailing system, login, analytics and external APIs.\n\nWe design solutions so that all the elements work together.',
          'Detrás del producto puede haber todo un ecosistema: backend, base de datos, pagos, CRM, sistema de mailing, login, analítica y APIs externas.\n\nDiseñamos soluciones para que todos los elementos funcionen juntos.',
        ),
      },
    ],
    portfolio: {
      title: l('Wybrane *realizacje.*', 'Selected *work.*', 'Trabajos *seleccionados.*'),
      kind: 'tech',
      note: l(
        'Strony, sklepy, aplikacje webowe i mobilne oraz systemy — duże mockupy urządzeń i screeny produktów.',
        'Websites, shops, web and mobile apps and systems — large device mockups and product screens.',
        'Webs, tiendas, aplicaciones web y móviles y sistemas — grandes mockups de dispositivos y pantallas de producto.',
      ),
      caption: l('WWW / E-commerce / Web app / Mobile app / SaaS', 'Web / E-commerce / Web app / Mobile app / SaaS', 'Web / E-commerce / Web app / Mobile app / SaaS'),
    },
    process: {
      title: l('Od briefu\ndo *wdrożenia.*', 'From brief\nto *launch.*', 'Del brief\na la *implementación.*'),
      steps: [l('Analiza', 'Analysis', 'Análisis'), l('UX/UI', 'UX/UI', 'UX/UI'), l('Development', 'Development', 'Desarrollo'), l('Testy', 'Testing', 'Pruebas'), l('Wdrożenie', 'Launch', 'Implementación'), l('Rozwój', 'Growth', 'Evolución')],
      text: l(
        'Możemy stworzyć cały produkt od początku albo wejść w istniejący projekt i rozwinąć jego kolejne funkcje.',
        'We can create the whole product from scratch or step into an existing project and develop its next features.',
        'Podemos crear todo el producto desde cero o entrar en un proyecto existente y desarrollar sus siguientes funciones.',
      ),
    },
    final: {
      title: l('Masz pomysł?\nZbudujmy mu *technologię.*', 'Got an idea?\nLet\'s build it the *technology.*', '¿Tienes una idea?\nConstruyámosle la *tecnología.*'),
      text: l('Od pierwszego ekranu po działający produkt.', 'From the first screen to a working product.', 'De la primera pantalla al producto que funciona.'),
      button: l('Porozmawiajmy o projekcie', "Let's talk about the project", 'Hablemos del proyecto'),
    },
  },

  /* ============ 12 ============ */
  {
    slug: 'ai-i-automatyzacje',
    num: '12',
    title: l('AI i automatyzacje', 'AI & automation', 'IA y automatizaciones'),
    short: l(
      'Agenci i asystenci AI, chatboty, automatyzacja procesów, rozwiązania głosowe, analiza danych i dedykowane narzędzia AI dla biznesu.',
      'AI agents and assistants, chatbots, process automation, voice solutions, data analysis and custom AI tools for business.',
      'Agentes y asistentes de IA, chatbots, automatización de procesos, soluciones de voz, análisis de datos y herramientas de IA a medida para empresas.',
    ),
    hero: {
      title: l('Nie dodajemy AI.\nSzukamy, gdzie ma *sens.*', "We don't add AI.\nWe find where it makes *sense.*", 'No añadimos IA.\nBuscamos dónde tiene *sentido.*'),
      text: l(
        'Projektujemy rozwiązania AI, które rozwiązują konkretne problemy biznesowe, automatyzują procesy i oszczędzają czas.\n\nOd agentów i chatbotów po analizę danych, głos, dokumenty i dedykowane systemy wykorzystujące sztuczną inteligencję.',
        'We design AI solutions that solve specific business problems, automate processes and save time.\n\nFrom agents and chatbots to data analysis, voice, documents and custom systems using artificial intelligence.',
        'Diseñamos soluciones de IA que resuelven problemas de negocio concretos, automatizan procesos y ahorran tiempo.\n\nDesde agentes y chatbots hasta análisis de datos, voz, documentos y sistemas a medida que usan inteligencia artificial.',
      ),
    },
    scope: {
      title: l('AI, które\nnaprawdę *pracuje.*', 'AI that\nactually *works.*', 'IA que\nrealmente *trabaja.*'),
      items: [
        l('Agenci AI', 'AI agents', 'Agentes de IA'),
        l('Systemy wieloagentowe', 'Multi-agent systems', 'Sistemas multiagente'),
        l('Asystenci AI', 'AI assistants', 'Asistentes de IA'),
        l('Chatboty', 'Chatbots', 'Chatbots'),
        l('Voiceboty i asystenci głosowi', 'Voicebots and voice assistants', 'Voicebots y asistentes de voz'),
        l('Automatyzacja procesów biznesowych', 'Business process automation', 'Automatización de procesos de negocio'),
        l('Automatyczne generowanie raportów', 'Automated report generation', 'Generación automática de informes'),
        l('Analiza i klasyfikacja dokumentów', 'Document analysis and classification', 'Análisis y clasificación de documentos'),
        l('OCR i ekstrakcja danych', 'OCR and data extraction', 'OCR y extracción de datos'),
        l('Systemy RAG i wyszukiwanie semantyczne', 'RAG systems and semantic search', 'Sistemas RAG y búsqueda semántica'),
        l('Rekomendacje i personalizacja', 'Recommendations and personalization', 'Recomendaciones y personalización'),
        l('Analiza danych', 'Data analysis', 'Análisis de datos'),
        l('Computer Vision', 'Computer vision', 'Computer vision'),
        l('Rozpoznawanie i analiza obrazu', 'Image recognition and analysis', 'Reconocimiento y análisis de imagen'),
        l('Transkrypcja audio i video', 'Audio and video transcription', 'Transcripción de audio y vídeo'),
        l('Dubbing AI i lip sync', 'AI dubbing and lip sync', 'Doblaje IA y lip sync'),
        l('Generowanie treści', 'Content generation', 'Generación de contenidos'),
        l('Integracje AI z istniejącymi systemami', 'AI integrations with existing systems', 'Integración de IA con sistemas existentes'),
      ],
    },
    sections: [
      {
        title: l('Automatyzujemy to,\nczego nie musi\nrobić *człowiek.*', 'We automate what\na *human* doesn\'t\nneed to do.', 'Automatizamos lo que\nno tiene que hacer\nuna *persona.*'),
        text: l(
          'Powtarzalne zadania zabierają czas, który można wykorzystać lepiej.\n\nSzukamy procesów, które można uprościć, połączyć albo zautomatyzować. AI ma zdejmować pracę z ludzi, a nie dokładać kolejne narzędzie do obsługi.',
          'Repetitive tasks take up time that could be used better.\n\nWe look for processes that can be simplified, connected or automated. AI should take work off people, not add another tool to operate.',
          'Las tareas repetitivas consumen tiempo que puede aprovecharse mejor.\n\nBuscamos procesos que se puedan simplificar, conectar o automatizar. La IA debe quitar trabajo a las personas, no añadir otra herramienta que gestionar.',
        ),
      },
      {
        title: l('AI może czytać.\nSłuchać. Widzieć.\n*Odpowiadać.*', 'AI can read.\nListen. See.\n*Answer.*', 'La IA puede leer.\nEscuchar. Ver.\n*Responder.*'),
        text: l(
          'Łączymy modele językowe z głosem, obrazem, dokumentami, bazami danych i systemami firmy.\n\nDzięki temu rozwiązanie może korzystać z wiedzy organizacji, analizować materiały, prowadzić rozmowy i wykonywać konkretne zadania.',
          "We connect language models with voice, image, documents, databases and the company's systems.\n\nThat way the solution can use the organization's knowledge, analyze materials, hold conversations and perform specific tasks.",
          'Conectamos modelos de lenguaje con voz, imagen, documentos, bases de datos y los sistemas de la empresa.\n\nAsí la solución puede usar el conocimiento de la organización, analizar materiales, mantener conversaciones y ejecutar tareas concretas.',
        ),
      },
      {
        title: l('Nie musisz zmieniać\ncałego *biznesu.*', "You don't have to change\nthe whole *business.*", 'No tienes que cambiar\ntodo el *negocio.*'),
        text: l(
          'AI może zostać zintegrowane z narzędziami i procesami, które już działają.\n\nZaczynamy od konkretnego problemu, projektujemy rozwiązanie i dopiero wtedy dobieramy odpowiednią technologię.',
          'AI can be integrated with the tools and processes that already work.\n\nWe start with a specific problem, design the solution and only then choose the right technology.',
          'La IA puede integrarse con las herramientas y procesos que ya funcionan.\n\nEmpezamos por un problema concreto, diseñamos la solución y solo entonces elegimos la tecnología adecuada.',
        ),
      },
    ],
    portfolio: {
      title: l('AI w *praktyce.*', 'AI in *practice.*', 'IA en la *práctica.*'),
      kind: 'ai',
      note: l(
        'Wybrane wdrożenia AI i automatyzacji: duże ekrany, krótkie demo, animacje działania systemów i mockupy interfejsów.',
        'Selected AI and automation deployments: large screens, short demos, animations of systems in action and interface mockups.',
        'Implementaciones seleccionadas de IA y automatización: grandes pantallas, demos cortas, animaciones de los sistemas en funcionamiento y mockups de interfaces.',
      ),
      caption: l('AI Agent / Automation / Voice / RAG / Computer Vision / Data', 'AI Agent / Automation / Voice / RAG / Computer Vision / Data', 'AI Agent / Automation / Voice / RAG / Computer Vision / Data'),
    },
    process: {
      title: l('Od problemu\ndo *automatyzacji.*', 'From problem\nto *automation.*', 'Del problema\na la *automatización.*'),
      steps: [l('Problem', 'Problem', 'Problema'), l('Analiza', 'Analysis', 'Análisis'), l('Koncepcja', 'Concept', 'Concepto'), l('Prototyp', 'Prototype', 'Prototipo'), l('Integracja', 'Integration', 'Integración'), l('Automatyzacja', 'Automation', 'Automatización'), l('Rozwój', 'Growth', 'Evolución')],
      text: l(
        'Nie zaczynamy od technologii. Zaczynamy od rzeczy, którą można zrobić szybciej, lepiej albo bez wykonywania jej ręcznie.',
        "We don't start with technology. We start with the thing that can be done faster, better or without doing it by hand.",
        'No empezamos por la tecnología. Empezamos por aquello que se puede hacer más rápido, mejor o sin hacerlo a mano.',
      ),
    },
    final: {
      title: l('Nie pytajmy,\nco potrafi *AI.*', "Let's not ask\nwhat *AI* can do.", 'No preguntemos\nqué sabe hacer la *IA.*'),
      text: l('Sprawdźmy, co może zrobić dla Twojego biznesu.', "Let's find out what it can do for your business.", 'Veamos qué puede hacer por tu negocio.'),
      button: l('Porozmawiajmy o AI', "Let's talk AI", 'Hablemos de IA'),
    },
  },

  /* ============ 13 ============ */
  {
    slug: 'branding-design-i-identyfikacja',
    num: '13',
    title: l('Branding, design i identyfikacja', 'Branding, design & identity', 'Branding, diseño e identidad'),
    short: l(
      'Logo, identyfikacja wizualna, brandbooki, key visuale, art direction, UI/UX, grafika reklamowa i kompleksowa oprawa marek oraz kampanii.',
      'Logos, visual identity, brandbooks, key visuals, art direction, UI/UX, advertising graphics and the complete visual world of brands and campaigns.',
      'Logotipos, identidad visual, brandbooks, key visuals, dirección de arte, UI/UX, gráfica publicitaria y el universo visual completo de marcas y campañas.',
    ),
    hero: {
      title: l('Marka powinna być\nrozpoznawalna *bez logo.*', 'A brand should be\nrecognizable *without a logo.*', 'Una marca debe ser\nreconocible *sin logo.*'),
      text: l(
        'Budujemy język wizualny marek od pierwszej idei po każdy punkt styku z odbiorcą.\n\nIdentyfikacja, design, art direction i digital tworzą jeden spójny świat, który da się rozpoznać, zanim jeszcze pojawi się nazwa.',
        'We build the visual language of brands from the first idea to every touchpoint with the audience.\n\nIdentity, design, art direction and digital form one coherent world that can be recognized before the name even appears.',
        'Construimos el lenguaje visual de las marcas desde la primera idea hasta cada punto de contacto con el público.\n\nIdentidad, diseño, dirección de arte y digital forman un mundo coherente que se reconoce antes de que aparezca el nombre.',
      ),
    },
    scope: {
      title: l('Od pierwszej kreski\ndo całego świata *marki.*', 'From the first stroke\nto the whole *brand world.*', 'Del primer trazo\nal mundo entero de la *marca.*'),
      items: [
        l('Logo i systemy znaków', 'Logos and mark systems', 'Logotipos y sistemas de marca'),
        l('Identyfikacja wizualna', 'Visual identity', 'Identidad visual'),
        l('Brandbook i księga znaku', 'Brandbook and logo manual', 'Brandbook y manual de marca'),
        l('Rebranding', 'Rebranding', 'Rebranding'),
        l('Key visual', 'Key visual', 'Key visual'),
        l('Art direction', 'Art direction', 'Dirección de arte'),
        l('Typografia i kolorystyka', 'Typography and colour', 'Tipografía y color'),
        l('Materiały digital', 'Digital materials', 'Materiales digitales'),
        l('Social media design', 'Social media design', 'Diseño para redes sociales'),
        l('UI/UX Design', 'UI/UX design', 'Diseño UI/UX'),
        l('Grafika reklamowa', 'Advertising graphics', 'Gráfica publicitaria'),
        l('Materiały drukowane', 'Print materials', 'Materiales impresos'),
        l('Opakowania', 'Packaging', 'Packaging'),
        l('Materiały POS', 'POS materials', 'Materiales POS'),
        l('Billboardy i outdoor', 'Billboards and outdoor', 'Vallas y exterior'),
        l('Prezentacje i pitch decki', 'Presentations and pitch decks', 'Presentaciones y pitch decks'),
        l('Ilustracje', 'Illustrations', 'Ilustraciones'),
        l('Motion design', 'Motion design', 'Motion design'),
        l('Design systemy', 'Design systems', 'Sistemas de diseño'),
      ],
    },
    sections: [
      {
        title: l('Logo to znak.\nMarka to *system.*', 'A logo is a mark.\nA brand is a *system.*', 'Un logo es un signo.\nUna marca es un *sistema.*'),
        text: l(
          'Dobra identyfikacja nie kończy się na pliku z logo.\n\nProjektujemy zasady, dzięki którym marka pozostaje spójna na stronie internetowej, w social mediach, kampanii, opakowaniu, prezentacji czy przestrzeni fizycznej.',
          "A good identity doesn't end with a logo file.\n\nWe design the rules that keep the brand consistent on the website, in social media, in a campaign, on packaging, in a presentation or in a physical space.",
          'Una buena identidad no termina en un archivo con el logo.\n\nDiseñamos las reglas que mantienen la marca coherente en la web, en redes sociales, en campañas, en el packaging, en presentaciones o en el espacio físico.',
        ),
      },
      {
        title: l('Design ma nie tylko\ndobrze *wyglądać.*', 'Design should do more\nthan look *good.*', 'El diseño no solo\ndebe verse *bien.*'),
        text: l(
          'Powinien coś komunikować.\n\nKażda decyzja wizualna wynika z charakteru marki, jej odbiorcy i miejsca, które chce zajmować. Estetyka jest narzędziem, nie celem samym w sobie.',
          "It should communicate something.\n\nEvery visual decision comes from the brand's character, its audience and the place it wants to occupy. Aesthetics are a tool, not an end in themselves.",
          'Debe comunicar algo.\n\nCada decisión visual nace del carácter de la marca, su público y el lugar que quiere ocupar. La estética es una herramienta, no un fin en sí mismo.',
        ),
      },
    ],
    portfolio: {
      title: l('To, co *widać.*', 'What you *see.*', 'Lo que *se ve.*'),
      kind: 'design',
      note: l(
        'Identyfikacje, logo, key visuale, opakowania, digital, social media design, materiały reklamowe i UI/UX — duże realizacje, mockupy, detale i animacje.',
        'Identities, logos, key visuals, packaging, digital, social media design, advertising materials and UI/UX — big pieces, mockups, details and animations.',
        'Identidades, logos, key visuals, packaging, digital, diseño para redes, materiales publicitarios y UI/UX — grandes piezas, mockups, detalles y animaciones.',
      ),
      caption: l('Branding / Identity / Design / UI/UX / Key visual', 'Branding / Identity / Design / UI/UX / Key visual', 'Branding / Identity / Design / UI/UX / Key visual'),
    },
    process: {
      title: l('Od strategii\ndo ostatniego *piksela.*', 'From strategy\nto the last *pixel.*', 'De la estrategia\nal último *píxel.*'),
      steps: [l('Kierunek', 'Direction', 'Dirección'), l('Koncept', 'Concept', 'Concepto'), l('Identyfikacja', 'Identity', 'Identidad'), l('System', 'System', 'Sistema'), l('Wdrożenie', 'Rollout', 'Implementación'), l('Rozwój', 'Growth', 'Evolución')],
      text: l(
        'Tworzymy system, który może rosnąć razem z marką i działać spójnie niezależnie od kanału, formatu czy skali.',
        'We create a system that can grow with the brand and work consistently regardless of channel, format or scale.',
        'Creamos un sistema que puede crecer con la marca y funcionar de forma coherente sin importar el canal, el formato o la escala.',
      ),
    },
    final: {
      title: l('Niech marka\nwygląda *jak ona.*', 'Let the brand\nlook like *itself.*', 'Que la marca\nse vea *como ella.*'),
      text: l('Nie jak trend. Nie jak konkurencja. Jak marka, którą można rozpoznać.', 'Not like a trend. Not like the competition. Like a brand you can recognize.', 'No como una tendencia. No como la competencia. Como una marca que se reconoce.'),
      button: l('Zbudujmy identyfikację', "Let's build an identity", 'Construyamos la identidad'),
    },
  },

  /* ============ 14 ============ */
  {
    slug: 'strategia-i-kreacja',
    num: '14',
    title: l('Strategia i kreacja', 'Strategy & creative', 'Estrategia y creatividad'),
    short: l(
      'Strategie komunikacji, koncepty kreatywne, kampanie 360°, big idee i niestandardowe aktywacje. Łączymy media, twórców, content, PR i technologię w jeden spójny pomysł.',
      'Communication strategies, creative concepts, 360° campaigns, big ideas and non-standard activations. We combine media, creators, content, PR and technology into one coherent idea.',
      'Estrategias de comunicación, conceptos creativos, campañas 360°, big ideas y activaciones no convencionales. Unimos medios, creadores, contenido, PR y tecnología en una sola idea coherente.',
    ),
    hero: {
      title: l('Najpierw pomysł.\nPotem cała *reszta.*', 'First the idea.\nThen all *the rest.*', 'Primero la idea.\nLuego todo *lo demás.*'),
      text: l(
        'Zanim powstanie kampania, film, event czy post, musi istnieć pomysł, który ma sens.\n\nŁączymy strategię z kreacją. Szukamy idei, która odpowiada na cel biznesowy, pasuje do marki i daje przestrzeń do stworzenia czegoś, co ludzie zauważą.',
        'Before a campaign, a film, an event or a post is created, there has to be an idea that makes sense.\n\nWe combine strategy with creative. We look for an idea that answers the business goal, fits the brand and gives room to create something people will notice.',
        'Antes de que exista una campaña, un vídeo, un evento o un post, debe existir una idea con sentido.\n\nUnimos estrategia y creatividad. Buscamos la idea que responde al objetivo de negocio, encaja con la marca y da espacio para crear algo que la gente note.',
      ),
    },
    scope: {
      title: l('Od problemu\ndo *big idei.*', 'From problem\nto *big idea.*', 'Del problema\na la *big idea.*'),
      items: [
        l('Strategie komunikacji', 'Communication strategies', 'Estrategias de comunicación'),
        l('Strategie kreatywne', 'Creative strategies', 'Estrategias creativas'),
        l('Koncepty kampanii', 'Campaign concepts', 'Conceptos de campaña'),
        l('Big idea', 'Big idea', 'Big idea'),
        l('Kampanie 360°', '360° campaigns', 'Campañas 360°'),
        l('Koncepcje launchy', 'Launch concepts', 'Conceptos de lanzamiento'),
        l('Koncepcje aktywacji', 'Activation concepts', 'Conceptos de activación'),
        l('Storytelling', 'Storytelling', 'Storytelling'),
        l('Platformy komunikacji', 'Communication platforms', 'Plataformas de comunicación'),
        l('Creative direction', 'Creative direction', 'Dirección creativa'),
        l('Koncepcje contentowe', 'Content concepts', 'Conceptos de contenido'),
        l('Koncepcje digital i social media', 'Digital and social media concepts', 'Conceptos digitales y de redes sociales'),
        l('Koncepcje influencer marketingowe', 'Influencer marketing concepts', 'Conceptos de influencer marketing'),
        l('Koncepcje eventów', 'Event concepts', 'Conceptos de eventos'),
        l('Koncepcje projektów specjalnych', 'Special project concepts', 'Conceptos de proyectos especiales'),
        l('Warsztaty strategiczne', 'Strategy workshops', 'Talleres estratégicos'),
        l('Development pomysłów', 'Idea development', 'Desarrollo de ideas'),
      ],
    },
    sections: [
      {
        title: l('Nie zaczynamy\nod *formatu.*', "We don't start\nwith the *format.*", 'No empezamos\npor el *formato.*'),
        text: l(
          'Nie zaczynamy od pytania, czy zrobić Reels, event, kampanię z influencerami albo billboard.\n\nNajpierw ustalamy, co marka chce osiągnąć, do kogo mówi i dlaczego ktoś miałby zwrócić na nią uwagę. Dopiero potem wybieramy narzędzia.',
          "We don't start with the question of whether to do Reels, an event, an influencer campaign or a billboard.\n\nFirst we establish what the brand wants to achieve, who it speaks to and why anyone should pay attention to it. Only then do we choose the tools.",
          'No empezamos preguntando si hacer Reels, un evento, una campaña con influencers o una valla.\n\nPrimero definimos qué quiere lograr la marca, a quién habla y por qué alguien debería prestarle atención. Solo después elegimos las herramientas.',
        ),
      },
      {
        title: l('Jeden pomysł.\nWiele *możliwości.*', 'One idea.\nMany *possibilities.*', 'Una idea.\nMuchas *posibilidades.*'),
        text: l(
          'Dobra idea nie powinna być przywiązana do jednego medium.\n\nMoże zacząć się w social mediach, przejść do influencerów, wydarzenia, PR, video, technologii albo przestrzeni fizycznej. Budujemy pomysły, które można rozwijać w całym ekosystemie komunikacji.',
          "A good idea shouldn't be tied to a single medium.\n\nIt can start in social media, move to influencers, an event, PR, video, technology or a physical space. We build ideas that can be developed across the whole communication ecosystem.",
          'Una buena idea no debería estar atada a un solo medio.\n\nPuede empezar en redes sociales, pasar a influencers, un evento, PR, vídeo, tecnología o un espacio físico. Construimos ideas que se pueden desarrollar en todo el ecosistema de comunicación.',
        ),
      },
      {
        title: l('Kreatywność\nma mieć *cel.*', 'Creativity\nneeds a *purpose.*', 'La creatividad\ndebe tener un *objetivo.*'),
        text: l(
          'Nie szukamy pomysłów tylko dlatego, że są efektowne.\n\nKreacja ma rozwiązywać problem, budować markę, uruchamiać emocje, generować zainteresowanie albo prowadzić do konkretnego działania.\n\nŁadne to za mało. Musi działać.',
          "We don't look for ideas just because they're flashy.\n\nCreative should solve a problem, build the brand, trigger emotions, generate interest or lead to a specific action.\n\nPretty isn't enough. It has to work.",
          'No buscamos ideas solo porque sean llamativas.\n\nLa creatividad debe resolver un problema, construir marca, activar emociones, generar interés o llevar a una acción concreta.\n\nBonito no basta. Tiene que funcionar.',
        ),
      },
    ],
    process: {
      title: l('Od pytania\ndo *odpowiedzi.*', 'From question\nto *answer.*', 'De la pregunta\na la *respuesta.*'),
      steps: [l('Problem', 'Problem', 'Problema'), l('Insight', 'Insight', 'Insight'), l('Strategia', 'Strategy', 'Estrategia'), l('Big idea', 'Big idea', 'Big idea'), l('Kreacja', 'Creative', 'Creatividad'), l('Realizacja', 'Execution', 'Ejecución')],
      text: l(
        'Możemy stworzyć samą strategię i koncept albo przejąć również realizację, wykorzystując pozostałe kompetencje Star Media.',
        "We can create just the strategy and the concept, or take on the execution as well, using Star Media's other competences.",
        'Podemos crear solo la estrategia y el concepto o encargarnos también de la ejecución, usando el resto de competencias de Star Media.',
      ),
    },
    final: {
      title: l('Nie wiesz jeszcze,\nco *zrobić?*', "Don't know yet\nwhat to *do?*", '¿Aún no sabes\nqué *hacer?*'),
      text: l('To dobry moment, żeby zacząć od strategii.', "It's a good moment to start with strategy.", 'Es un buen momento para empezar por la estrategia.'),
      button: l('Zacznijmy od pomysłu', "Let's start with an idea", 'Empecemos por la idea'),
    },
  },
]

export const CTA_CONTACT_PATH = CTA_CONTACT

export const SERVICES_PAGE = {
  eyebrow: l('04 — Co robimy', '04 — What we do', '04 — Qué hacemos'),
  meta: [l('Full service', 'Full service', 'Full service'), '360°'],
  title: l('Od pomysłu\n*do efektu.*', 'From idea\n*to effect.*', 'De la idea\n*al efecto.*'),
  tagline: l(
    'Strategia, management, digital, PR, produkcja, video, muzyka, eventy, koncerty i merch. Łączymy kompetencje, zamiast przerzucać projekt między agencjami.',
    'Strategy, management, digital, PR, production, video, music, events, concerts and merch. We combine competences instead of passing the project between agencies.',
    'Estrategia, management, digital, PR, producción, vídeo, música, eventos, conciertos y merch. Unimos competencias en lugar de pasar el proyecto de agencia en agencia.',
  ),
  listEyebrow: l('Pełen zakres', 'Full scope', 'Alcance completo'),
  listTitle: l('Wszystko, czego\n*potrzebuje* Twoja marka.', 'Everything\nyour brand *needs.*', 'Todo lo que\ntu marca *necesita.*'),
  processEyebrow: l('Jak pracujemy', 'How we work', 'Cómo trabajamos'),
  processTitle: l('Cztery kroki\nod *pomysłu* do *efektu*', 'Four steps\nfrom *idea* to *effect*', 'Cuatro pasos\nde la *idea* al *efecto*'),
  processLead: l(
    'Strategia, kreacja, produkcja i realizacja. Jeden zespół prowadzi projekt od pierwszej rozmowy do momentu, w którym zaczyna działać.',
    'Strategy, creative, production and execution. One team runs the project from the first conversation to the moment it starts working.',
    'Estrategia, creatividad, producción y ejecución. Un solo equipo lleva el proyecto desde la primera conversación hasta el momento en que empieza a funcionar.',
  ),
  steps: [
    { num: '01', title: l('Poznajemy', 'We get to know', 'Conocemos'), sub: 'Brief & Insight', desc: l('Zaczynamy od celu. Poznajemy markę, odbiorców, wyzwanie i kontekst.', 'We start with the goal. We get to know the brand, the audience, the challenge and the context.', 'Empezamos por el objetivo. Conocemos la marca, el público, el reto y el contexto.') },
    { num: '02', title: l('Wymyślamy', 'We think it up', 'Ideamos'), sub: 'Strategy & Creative', desc: l('Budujemy kierunek, strategię i pomysł, który odpowiada na realną potrzebę.', 'We build the direction, the strategy and the idea that answers a real need.', 'Construimos la dirección, la estrategia y la idea que responde a una necesidad real.') },
    { num: '03', title: l('Robimy', 'We make it', 'Hacemos'), sub: 'Production & Execution', desc: l('Łączymy właściwych ludzi, kompetencje i narzędzia. Produkujemy i wdrażamy.', 'We bring together the right people, competences and tools. We produce and deliver.', 'Unimos a las personas, competencias y herramientas adecuadas. Producimos e implementamos.') },
    { num: '04', title: l('Rozwijamy', 'We grow it', 'Desarrollamos'), sub: 'Launch & Growth', desc: l('Wypuszczamy projekt w świat, analizujemy efekty i szukamy kolejnego ruchu.', 'We release the project into the world, analyze the results and look for the next move.', 'Lanzamos el proyecto al mundo, analizamos los resultados y buscamos el siguiente movimiento.') },
  ],
  ctaEyebrow: l('Zacznijmy', "Let's begin", 'Empecemos'),
  ctaTitle: l('Masz pomysł.\nMy wiemy, *co dalej.*', 'You have an idea.\nWe know *what\'s next.*', 'Tienes una idea.\nNosotros sabemos *qué sigue.*'),
  ctaLead: l('Porozmawiajmy o Twoim projekcie.\nOd pierwszego pomysłu po realizację.', "Let's talk about your project.\nFrom the first idea to execution.", 'Hablemos de tu proyecto.\nDe la primera idea a la realización.'),
  ctaButton: l('Porozmawiajmy', "Let's talk", 'Hablemos'),
  /* subpage shared labels */
  scopeEyebrow: l('Zakres', 'Scope', 'Alcance'),
  portfolioEyebrow: l('Wybrane realizacje', 'Selected work', 'Trabajos seleccionados'),
  portfolioSoon: l('Materiały do tej sekcji są w przygotowaniu.', 'Materials for this section are being prepared.', 'Los materiales de esta sección están en preparación.'),
  processEyebrowSub: l('Proces', 'Process', 'Proceso'),
  prevService: l('Poprzednia usługa', 'Previous service', 'Servicio anterior'),
  nextService: l('Następna usługa', 'Next service', 'Siguiente servicio'),
  backToServices: l('Wszystkie usługi', 'All services', 'Todos los servicios'),
}
