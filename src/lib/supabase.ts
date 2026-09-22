import type { SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined

let clientPromise: Promise<SupabaseClient | null> | null = null

/**
 * Lazily created client — supabase-js is a separate chunk that loads on first use,
 * so the initial page load does not pay for it. Returns null when env is missing
 * (site still works: static content, form falls back to a mailto hint).
 */
export function getSupabase(): Promise<SupabaseClient | null> {
  if (clientPromise) return clientPromise
  if (!url || !key) return Promise.resolve(null)
  clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
    createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } }),
  )
  return clientPromise
}

export type ContactRequest = {
  name: string
  company?: string | null
  email: string
  phone?: string | null
  service: string
  message: string
  budget?: string | null
  lang: string
  source_url?: string | null
  user_agent?: string | null
}

export type SubmitResult = { ok: true } | { ok: false; reason: 'no-backend' | 'flood' | 'invalid' | 'network' }

export async function submitContactRequest(payload: ContactRequest): Promise<SubmitResult> {
  const sb = await getSupabase()
  if (!sb) return { ok: false, reason: 'no-backend' }
  const { error } = await sb.from('contact_requests').insert(payload)
  if (!error) return { ok: true }
  const msg = (error.message || '').toLowerCase()
  if (msg.includes('too many')) return { ok: false, reason: 'flood' }
  if (error.code === '23514' || msg.includes('check constraint')) return { ok: false, reason: 'invalid' }
  return { ok: false, reason: 'network' }
}

export type DbProject = {
  slug: string
  title: string
  category: string
  kind_label: string
  image_url: string | null
  video_url: string | null
  featured: boolean
  sort: number
}

export type DbTalent = {
  slug: string
  name: string
  role_pl: string
  role_en: string
  role_es: string
  handle: string | null
  instagram_url: string | null
  image_url: string | null
  featured: boolean
  sort: number
}

export async function fetchProjects(): Promise<DbProject[] | null> {
  const sb = await getSupabase()
  if (!sb) return null
  const { data, error } = await sb
    .from('projects')
    .select('slug,title,category,kind_label,image_url,video_url,featured,sort')
    .order('sort', { ascending: true })
  if (error || !data) return null
  return data as DbProject[]
}

export async function fetchTalents(): Promise<DbTalent[] | null> {
  const sb = await getSupabase()
  if (!sb) return null
  const { data, error } = await sb
    .from('talents')
    .select('slug,name,role_pl,role_en,role_es,handle,instagram_url,image_url,featured,sort')
    .order('sort', { ascending: true })
  if (error || !data) return null
  return data as DbTalent[]
}
