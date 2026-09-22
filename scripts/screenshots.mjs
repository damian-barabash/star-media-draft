// Visual QA: builds are served with `vite preview`, every route is captured
// at desktop (1440) and mobile (390) widths; console errors are reported.
import { createRequire } from 'node:module'
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_PKG || 'playwright')
import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import routes from '../src/routes.json' with { type: 'json' }

const PORT = 4173
const BASE = `http://localhost:${PORT}`
const OUT = process.env.SHOT_DIR || 'shots'
mkdirSync(OUT, { recursive: true })

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' })
await new Promise((r) => setTimeout(r, 1500))

const pages = [...routes.pages, ...routes.serviceSlugs.slice(0, 3).map((s) => '/uslugi/' + s), '/uslugi/ai-i-automatyzacje', '/nie-ma-takiej']
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
]

const browser = await chromium.launch()
const problems = []
for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, hasTouch: vp.hasTouch, deviceScaleFactor: vp.deviceScaleFactor ?? 1 })
  for (const route of pages) {
    const page = await ctx.newPage()
    const errors = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message))
    page.on('requestfailed', (r) => errors.push('REQFAIL ' + r.url()))
    await page.goto(BASE + route, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1800)
    // reveal everything for the full-page capture
    await page.evaluate(async () => {
      document.querySelectorAll('.fade-in, .words-reveal, .reveal, .line-inner').forEach((el) => el.classList.add('in-view'))
      const h = document.body.scrollHeight
      for (let y = 0; y < h; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)) }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(600)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    const name = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '_')
    await page.screenshot({ path: `${OUT}/${vp.name}-${name}.png`, fullPage: true })
    const title = await page.title()
    if (errors.length || overflow > 0) problems.push({ vp: vp.name, route, overflow, errors })
    console.log(`${vp.name.padEnd(7)} ${route.padEnd(40)} ${title.slice(0, 40).padEnd(42)} overflow=${overflow} errors=${errors.length}`)
    await page.close()
  }
  await ctx.close()
}
await browser.close()
server.kill()
if (problems.length) {
  console.log('\nPROBLEMS:')
  for (const p of problems) console.log(JSON.stringify(p))
}
