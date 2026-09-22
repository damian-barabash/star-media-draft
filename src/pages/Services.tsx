import { SERVICES, SERVICES_PAGE } from '../content/services'
import { Hero } from '../components/Hero'
import { Chapter, Eyebrow, WordsReveal, useDocumentTitle } from '../components/ui'
import { CTAChapter, PPChapter, ProcessChapter, ServicesList } from '../components/sections'

export default function Services() {
  useDocumentTitle({ pl: 'Usługi', en: 'Services', es: 'Servicios' }, SERVICES_PAGE.tagline)

  return (
    <>
      <Hero eyebrow={SERVICES_PAGE.eyebrow} meta={SERVICES_PAGE.meta} title={SERVICES_PAGE.title} tagline={SERVICES_PAGE.tagline} scrollLabel={{ pl: 'Dalej', en: 'Next', es: 'Siguiente' }} scrollTarget="#zakres" />

      <Chapter dark={false} id="zakres">
        <div className="chapter-inner">
          <Eyebrow text={SERVICES_PAGE.listEyebrow} dark={false} />
          <WordsReveal text={SERVICES_PAGE.listTitle} className="large" style={{ maxWidth: '20ch' }} />
          <ServicesList items={SERVICES.map((s) => ({ num: s.num, title: s.title, desc: s.short, to: `/uslugi/${s.slug}` }))} />
        </div>
      </Chapter>

      <ProcessChapter dark eyebrow={SERVICES_PAGE.processEyebrow} title={SERVICES_PAGE.processTitle} lead={SERVICES_PAGE.processLead} steps={SERVICES_PAGE.steps.map((s) => ({ num: s.num, title: s.title, sub: s.sub, desc: s.desc }))} />

      <PPChapter dark={false} />

      <CTAChapter dark eyebrow={SERVICES_PAGE.ctaEyebrow} title={SERVICES_PAGE.ctaTitle} lead={SERVICES_PAGE.ctaLead} button={SERVICES_PAGE.ctaButton} />
    </>
  )
}
