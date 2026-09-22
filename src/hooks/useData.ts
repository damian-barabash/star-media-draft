import { useEffect, useState } from 'react'
import { fetchProjects, fetchTalents } from '../lib/supabase'
import { PROJECTS, type Project, type ProjectCategory } from '../content/projects'
import { TALENTS, type Talent } from '../content/talents'
import { l } from '../i18n/types'

let projectsCache: Project[] | null = null
let talentsCache: Talent[] | null = null

/** Projects from Supabase, static fallback until loaded (or if the backend is empty / unreachable). */
export function useProjects(): Project[] {
  const [projects, setProjects] = useState<Project[]>(projectsCache ?? PROJECTS)
  useEffect(() => {
    if (projectsCache) return
    let alive = true
    fetchProjects().then((rows) => {
      if (!alive || !rows || rows.length === 0) return
      const mapped: Project[] = rows.map((r) => ({
        slug: r.slug,
        title: r.title,
        category: r.category as ProjectCategory,
        kind: r.kind_label,
        image: r.image_url,
        video: r.video_url,
        featured: r.featured,
      }))
      projectsCache = mapped
      setProjects(mapped)
    })
    return () => {
      alive = false
    }
  }, [])
  return projects
}

export function useTalents(): Talent[] {
  const [talents, setTalents] = useState<Talent[]>(talentsCache ?? TALENTS)
  useEffect(() => {
    if (talentsCache) return
    let alive = true
    fetchTalents().then((rows) => {
      if (!alive || !rows || rows.length === 0) return
      const mapped: Talent[] = rows.map((r) => ({
        slug: r.slug,
        name: r.name,
        role: l(r.role_pl, r.role_en, r.role_es),
        handle: r.handle ?? '',
        image: r.image_url,
        instagram: r.instagram_url ?? undefined,
      }))
      talentsCache = mapped
      setTalents(mapped)
    })
    return () => {
      alive = false
    }
  }, [])
  return talents
}
