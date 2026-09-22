import { useState, type FormEvent } from 'react'
import { CONTACT } from '../content/contact'
import { SITE } from '../content/common'
import { Hero } from '../components/Hero'
import { Btn, Chapter, Eyebrow, T, useDocumentTitle } from '../components/ui'
import { useLang } from '../i18n/LangContext'
import { submitContactRequest } from '../lib/supabase'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const { t, lang } = useLang()
  useDocumentTitle({ pl: 'Kontakt', en: 'Contact', es: 'Contacto' }, CONTACT.tagline)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string>('')
  const [invalid, setInvalid] = useState<string[]>([])
  const F = CONTACT.form

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    if ((fd.get('website') as string)?.length) return // honeypot
    const name = String(fd.get('name') ?? '').trim()
    const company = String(fd.get('company') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const phone = String(fd.get('phone') ?? '').trim()
    const service = String(fd.get('service') ?? '')
    const message = String(fd.get('message') ?? '').trim()
    const budget = String(fd.get('budget') ?? '')

    const bad: string[] = []
    if (name.length < 2) bad.push('name')
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) bad.push('email')
    if (!service) bad.push('service')
    if (message.length < 5) bad.push('message')
    setInvalid(bad)
    if (bad.length) {
      setError(t(bad.includes('email') && bad.length === 1 ? F.errors.email : F.errors.required))
      setStatus('error')
      return
    }

    setStatus('sending')
    setError('')
    const res = await submitContactRequest({
      name,
      company: company || null,
      email,
      phone: phone || null,
      service,
      message,
      budget: budget || null,
      lang,
      source_url: window.location.href,
      user_agent: navigator.userAgent.slice(0, 500),
    })
    if (res.ok) {
      setStatus('sent')
      form.reset()
      return
    }
    setStatus('error')
    if (res.reason === 'flood') setError(t(F.errors.flood))
    else if (res.reason === 'invalid') setError(t(F.errors.required))
    else setError(`${t(F.errors.network)} ${SITE.email}`)
  }

  const cls = (k: string) => `field ${invalid.includes(k) ? 'error' : ''}`.trim()

  return (
    <>
      <Hero eyebrow={CONTACT.eyebrow} meta={CONTACT.meta} title={CONTACT.title} tagline={CONTACT.tagline} scrollLabel={CONTACT.scroll} scrollTarget="#formularz" />

      <Chapter dark={false} id="formularz" className="contact-chapter">
        <div className="chapter-inner">
          <Eyebrow text={CONTACT.info.eyebrow} dark={false} />
          <div className="contact-cols">
            <aside>
              <dl className="contact-info">
                <dt>{t(CONTACT.info.email)}</dt>
                <dd>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </dd>
                <dt>{CONTACT.info.instagram}</dt>
                <dd>
                  <a href={SITE.instagramUrl} target="_blank" rel="noopener">
                    {SITE.instagram}
                  </a>
                </dd>
                <dt>{t(CONTACT.info.location)}</dt>
                <dd>{t(SITE.city)}</dd>
                <dt>{t(CONTACT.info.partner)}</dt>
                <dd>{t(SITE.partner)}</dd>
              </dl>
            </aside>

            <div>
              {status === 'sent' ? (
                <div className="form-success" role="status" aria-live="polite">
                  <h3>
                    <T text={F.successTitle} />
                  </h3>
                  <p>{t(F.successText)}</p>
                </div>
              ) : (
                <form className="form" onSubmit={onSubmit} noValidate>
                  <div className="form-row">
                    <div className={cls('name')}>
                      <label htmlFor="f-name">{t(F.name)}</label>
                      <input id="f-name" name="name" type="text" autoComplete="name" required maxLength={120} />
                    </div>
                    <div className={cls('company')}>
                      <label htmlFor="f-company">{t(F.company)}</label>
                      <input id="f-company" name="company" type="text" autoComplete="organization" maxLength={160} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className={cls('email')}>
                      <label htmlFor="f-email">{F.email}</label>
                      <input id="f-email" name="email" type="email" autoComplete="email" required inputMode="email" maxLength={254} />
                    </div>
                    <div className={cls('phone')}>
                      <label htmlFor="f-phone">
                        {t(F.phone)} <small>({t(F.optional)})</small>
                      </label>
                      <input id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={40} />
                    </div>
                  </div>
                  <div className={cls('service')}>
                    <label htmlFor="f-service">{t(F.service)}</label>
                    <select id="f-service" name="service" required defaultValue="">
                      <option value="" disabled>
                        {t(F.choose)}
                      </option>
                      {F.services.map((s) => (
                        <option key={s.value} value={s.value}>
                          {t(s.label)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={cls('message')}>
                    <label htmlFor="f-message">{t(F.about)}</label>
                    <textarea id="f-message" name="message" placeholder={t(F.aboutPlaceholder)} required maxLength={5000} />
                  </div>
                  <div className={cls('budget')}>
                    <label htmlFor="f-budget">
                      {t(F.budget)} <small>({t(F.optional)})</small>
                    </label>
                    <select id="f-budget" name="budget" defaultValue="">
                      <option value="">—</option>
                      {F.budgets.map((b) => (
                        <option key={b.value} value={b.value}>
                          {t(b.label)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="hp" aria-hidden="true">
                    <label>
                      Website <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>
                  <div className="form-actions">
                    <Btn type="submit" gold disabled={status === 'sending'}>
                      {status === 'sending' ? t(F.sending) : t(F.submit)}
                    </Btn>
                    <span className="form-note">{t(F.consent)}</span>
                  </div>
                  {status === 'error' && error && (
                    <p className="form-error" role="alert">
                      {error}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </Chapter>
    </>
  )
}
