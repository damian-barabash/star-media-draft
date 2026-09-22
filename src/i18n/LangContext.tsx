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

function readInitial(): Lang {
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
