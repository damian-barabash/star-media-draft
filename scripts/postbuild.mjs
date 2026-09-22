// Make the SPA indexable on GitHub Pages: copy dist/index.html into
// dist/<route>/index.html for every static route (served with HTTP 200),
// plus dist/404.html as the fallback for unknown paths. Also writes sitemap.xml.
import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import routes from '../src/routes.json' with { type: 'json' }
const SITE_URL = routes.siteUrl
const STATIC_ROUTES = [...routes.pages, ...routes.serviceSlugs.map((s) => '/uslugi/' + s)]

const dist = 'dist'
const html = readFileSync(join(dist, 'index.html'), 'utf8')

for (const route of STATIC_ROUTES) {
  if (route === '/') continue
  const dir = join(dist, route.replace(/^\//, ''))
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}
cpSync(join(dist, 'index.html'), join(dist, '404.html'))

const today = new Date().toISOString().slice(0, 10)
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  STATIC_ROUTES.map((r) => `  <url><loc>${SITE_URL}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
  `\n</urlset>\n`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`)
console.log(`[postbuild] ${STATIC_ROUTES.length} routes, 404.html, sitemap.xml`)
