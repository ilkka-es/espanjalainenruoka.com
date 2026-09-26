import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const base = 'https://www.espanjalainenruoka.com'
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8')
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs')
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
  for (const [, href] of content.matchAll(/\]\((\/(?:resepti|kategoria)\/[^)#?]+)\)/g)) {
    assert.ok(urls.includes(base + href), `Invalid article link in ${file}: ${href}`)
  }
}
console.log(`Verified ${urls.length} final sitemap URLs, canonical tags, social URLs and article links.`)
