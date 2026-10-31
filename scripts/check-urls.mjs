import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { legacyRedirects } from '../src/lib/legacyRedirects.js'
import matter from 'gray-matter'

const base = 'https://www.espanjalainenruoka.com'
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8')
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs')
const homeHtml = fs.readFileSync('dist/index.html', 'utf8')
assert.ok(homeHtml.includes('<main class="seo-fallback">'), 'Homepage has no static content')
for (const url of urls.filter(url => url !== base + '/')) {
  assert.ok(homeHtml.includes(`href="${new URL(url).pathname}"`), `Homepage missing link: ${url}`)
}
for (const url of urls) {
  assert.ok(url.endsWith('/'), `Missing trailing slash: ${url}`)
  const pathname = new URL(url).pathname
  const html = fs.readFileSync(path.join('dist', pathname, 'index.html'), 'utf8')
  assert.ok(html.includes(`<link rel="canonical" href="${url}"`), `Wrong canonical: ${url}`)
  assert.ok(html.includes(`<meta property="og:url" content="${url}"`), `Wrong social URL: ${url}`)
  assert.ok(!html.includes('http-equiv="refresh"'), `Sitemap contains redirect: ${url}`)
  for (const [, href] of html.matchAll(/href="(\/(?:resepti|kategoria)\/[^"?#]+)"/g)) {
    assert.ok(href.endsWith('/'), `Non-final internal link: ${href}`)
    assert.ok(urls.includes(base + href), `Unknown internal link: ${href}`)
  }
}
for (const file of fs.readdirSync('src/content')) {
  const content = fs.readFileSync(path.join('src/content', file), 'utf8')
  const { data, content: body } = matter(content)
  const html = fs.readFileSync(path.join('dist', 'resepti', data.slug, 'index.html'), 'utf8')
  assert.ok(html.includes('href="/"'), `Missing home link: ${data.slug}`)
  for (const [, href] of body.matchAll(/\]\((\/(?:resepti|kategoria)\/[^)]+)\)/g)) {
    assert.ok(html.includes(`href="${href.replaceAll('&', '&amp;')}"`), `Article link stripped: ${data.slug} -> ${href}`)
  }
  for (const [, href] of content.matchAll(/\]\((\/(?:resepti|kategoria)\/[^)#?]+)\)/g)) {
    assert.ok(urls.includes(base + href), `Invalid article link in ${file}: ${href}`)
  }
}
for (const [from, to] of Object.entries(legacyRedirects)) {
  assert.ok(urls.includes(base + to), `Missing redirect destination: ${to}`)
  const html = fs.readFileSync(path.join('dist', from, 'index.html'), 'utf8')
  assert.ok(html.includes(`content="0;url=${base}${to}"`), `Wrong redirect: ${from}`)
  assert.ok(!urls.includes(base + from + '/'), `Legacy URL in sitemap: ${from}`)
}
console.log(`Verified ${urls.length} final sitemap URLs and ${Object.keys(legacyRedirects).length} legacy redirects.`)
