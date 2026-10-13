/**
 * "Lite" mode for weak machines: heavy decorative effects (scroll parallax,
 * drifting hero halo, high-DPR 3D) are switched off via the `lite` class on <html>.
 * It is set up-front from device hints and later by the 3D scene when it
 * measures slow frames (see starScene.ts).
 */
type Nav = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }

export function detectLite(): boolean {
  const nav = navigator as Nav
  const cores = nav.hardwareConcurrency ?? 8
  const mem = nav.deviceMemory ?? 8
  return cores <= 2 || mem <= 2 || !!nav.connection?.saveData || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const isLite = () => document.documentElement.classList.contains('lite')

export function setLite() {
  document.documentElement.classList.add('lite')
}

export function initPerfMode() {
  if (detectLite()) setLite()
}
