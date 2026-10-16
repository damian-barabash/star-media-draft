import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LANGS, type L, type Lang } from './types'

const LANG_KEY = 'sm_lang'

type Ctx = {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Resolve a localized string for the active language. */
  t: (value: L | string | undefined) => string
}

const LangContext = createContext<Ctx | null>(null)

/**
 * Language from the link first: `?lang=es` (star-media.es forwards to https://star-media.pl/?lang=es)
 * or a `.es` host; then the saved choice; Polish by default. The param is removed from the address bar.
 */
function fromUrl(): Lang | null {
  try {
    const url = new URL(window.location.href)
    const q = url.searchParams.get('lang')
    if (q && (LANGS as string[]).includes(q)) {
      url.searchParams.delete('lang')
      window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash)
      return q as Lang
    }
    if (url.hostname.endsWith('.es')) return 'es'
  } catch {
    /* no window */
  }
  return null
}

function readInitial(): Lang {
  const linked = fromUrl()
  if (linked) {
    try {
      localStorage.setItem(LANG_KEY, linked)
    } catch {
      /* ignore */
    }
    return linked
  }
  try {
    const stored = localStorage.getItem(LANG_KEY)
    if (stored && (LANGS as string[]).includes(stored)) return stored as Lang
  } catch {
    /* private mode / blocked storage */
  }
  return 'pl'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitial)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(LANG_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('data-lang', lang)
  }, [lang])

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (v) => (v === undefined ? '' : typeof v === 'string' ? v : v[lang] ?? v.pl),
    }),
    [lang, setLang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}
