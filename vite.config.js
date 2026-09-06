import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Transforms .md files into JSON modules at build time (Node.js only, no browser Buffer needed)
function markdownPlugin() {
  return {
    name: 'md-to-json',
    transform(code, id) {
      if (!id.endsWith('.md')) return null
      const { data, content } = matter(code)
      return {
        code: `export default ${JSON.stringify({ ...data, body: content.trim() })}`,
        map: null,
      }
    },
  }
}

function sitemapPlugin() {
  return {
    name: 'static-seo-pages',
    closeBundle() {
      const baseUrl = 'https://www.espanjalainenruoka.com'
      const contentDir = path.resolve(__dirname, 'src/content')
      const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'))

      const posts = files.map(file => {
        const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8')
        const { data, content } = matter(raw)
        return { ...data, body: content.trim() }
      })

      const escapeHtml = value => String(value || '')
        .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;').replaceAll("'", '&#039;')
      const plainText = value => String(value || '')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/[#*_>`~-]/g, ' ')
        .replace(/^\d+\.\s*/gm, '')
        .replace(/\s+/g, ' ')
        .trim()
      const pageTemplate = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8')

      const writePage = (route, { title, description, image, body, schema }) => {
        const canonical = `${baseUrl}${route}`
        let html = pageTemplate
          .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
          .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(description)}" />`)
          .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
          .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
          .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
          .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${escapeHtml(image)}" />`)
          .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
        if (schema) html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>\n  </head>`)
        html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
        const output = path.resolve(__dirname, `dist${route}/index.html`)
        fs.mkdirSync(path.dirname(output), { recursive: true })
        fs.writeFileSync(output, html)
      }

      for (const post of posts) {
        const imageUrl = post.heroImage.startsWith('http') ? post.heroImage : `${baseUrl}${post.heroImage}`
        const allIngredients = (post.ingredients || []).flatMap(group => group.items)
        const instructions = post.body.split('\n').filter(line => /^\d+\.\s/.test(line.trim())).map(line => ({
          '@type': 'HowToStep',
          text: plainText(line),
        }))
        const fallback = `<article class="seo-fallback"><p>${escapeHtml(post.category)}</p><h1>${escapeHtml(post.title)}</h1><p>${escapeHtml(post.description)}</p>${allIngredients.length ? `<h2>Ainekset</h2><ul>${allIngredients.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}<h2>Ohje ja vinkit</h2><p>${escapeHtml(plainText(post.body))}</p></article>`
        writePage(`/resepti/${post.slug}`, {
          title: `${post.title} — EspanjalainenRuoka.com`,
          description: post.seoDescription || post.description,
          image: imageUrl,
          body: fallback,
          schema: {
            '@context': 'https://schema.org', '@type': 'Recipe', name: post.title,
            description: post.seoDescription || post.description, image: imageUrl,
            datePublished: post.date, recipeCategory: post.category, inLanguage: 'fi',
            recipeIngredient: allIngredients,
            ...(post.servings ? { recipeYield: post.servings } : {}),
            ...(instructions.length ? { recipeInstructions: instructions } : {}),
            publisher: { '@type': 'Organization', name: 'EspanjalainenRuoka.com', url: baseUrl },
          },
        })
      }

      const categories = {
        'ruoka-ohjeet': 'Ruoka ohjeet', 'jalkiruoat': 'Jälkiruoat',
        'viinit-ja-juomat': 'Viinit & juomat', 'elamaa-espanjassa': 'Elämää Espanjassa',
      }
      for (const [slug, category] of Object.entries(categories)) {
        const matches = posts.filter(post => post.category === category)
        writePage(`/kategoria/${slug}`, {
          title: `${category} — EspanjalainenRuoka.com`,
          description: `${category}: aidot espanjalaiset reseptit, oppaat ja vinkit suomeksi.`,
          image: `${baseUrl}/images/hero-v3.jpg`,
          body: `<main class="seo-fallback"><h1>${escapeHtml(category)}</h1><ul>${matches.map(post => `<li><a href="/resepti/${post.slug}">${escapeHtml(post.title)}</a></li>`).join('')}</ul></main>`,
        })
      }

      const redirects = {
        '/paella': '/resepti/paella-valenciana',
        '/tortilla-de-patatas-peruna-munakas': '/resepti/tortilla-espanola',
        '/paras-sangria-ohje': '/resepti/paras-sangria-ohje',
      }
      for (const [from, to] of Object.entries(redirects)) {
        const target = `${baseUrl}${to}`
        const output = path.resolve(__dirname, `dist${from}/index.html`)
        fs.mkdirSync(path.dirname(output), { recursive: true })
        fs.writeFileSync(output, `<!doctype html><html lang="fi"><head><meta charset="UTF-8"><meta name="robots" content="noindex"><link rel="canonical" href="${target}"><meta http-equiv="refresh" content="0;url=${target}"><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script><title>Sivu on siirtynyt</title></head><body><p>Sivu on siirtynyt: <a href="${target}">${target}</a></p></body></html>`)
      }

      const postUrls = posts.map(post => {
        const lastmod = post.date ? new Date(post.date).toISOString().split('T')[0] : ''
        return `  <url>\n    <loc>${baseUrl}/resepti/${post.slug}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`
      })

      const categoryUrls = Object.keys(categories).map(slug => `  <url>\n    <loc>${baseUrl}/kategoria/${slug}</loc>\n  </url>`)

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
  </url>
${postUrls.join('\n')}
${categoryUrls.join('\n')}
</urlset>`

      fs.writeFileSync(path.resolve(__dirname, 'dist/sitemap.xml'), sitemap)
      fs.writeFileSync(path.resolve(__dirname, 'dist/robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`)
      console.log(`✓ static SEO pages and sitemap generated (${posts.length} posts)`)
    }
  }
}

export default defineConfig({
  plugins: [react(), markdownPlugin(), sitemapPlugin()],
  // For GitHub Pages with a custom domain keep '/'. For github.io/repo-name set to '/repo-name/'
  base: '/',
})
