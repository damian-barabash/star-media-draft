export type Lang = 'pl' | 'en' | 'es'

/** A localized string. Use `*text*` inside to mark a gold italic accent. */
export type L = Record<Lang, string>

export const LANGS: Lang[] = ['pl', 'en', 'es']

/** Shorthand for creating a localized string. */
export const l = (pl: string, en: string, es: string): L => ({ pl, en, es })
