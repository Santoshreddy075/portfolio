// After `vite build`: give every page its own index.html so GitHub Pages serves
// /about, /projects/<slug>, … with a 200, and keep 404.html for unknown URLs.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs'

const slugs = [...readFileSync('src/content/profile.ts', 'utf8').matchAll(/\bslug: '([^']+)'/g)].map((m) => m[1])
const routes = ['about', 'credentials', 'writing', ...slugs.map((slug) => `projects/${slug}`)]

for (const route of routes) {
  mkdirSync(`dist/${route}`, { recursive: true })
  copyFileSync('dist/index.html', `dist/${route}/index.html`)
}
copyFileSync('dist/index.html', 'dist/404.html')

console.log(`page routes: ${routes.join(', ')}`)
