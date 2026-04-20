import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

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
    name: 'sitemap',
    closeBundle() {
      const baseUrl = 'https://www.espanjalainenruoka.com'
      const contentDir = path.resolve(__dirname, 'src/content')
      const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'))

      const postUrls = files.map(file => {
        const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8')
        const { data } = matter(raw)
        const lastmod = data.date ? new Date(data.date).toISOString().split('T')[0] : ''
        return `  <url>\n    <loc>${baseUrl}/resepti/${data.slug}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`
      })

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
  </url>
${postUrls.join('\n')}
</urlset>`

      fs.writeFileSync(path.resolve(__dirname, 'dist/sitemap.xml'), sitemap)
      console.log(`✓ sitemap.xml generated (${files.length} posts)`)
    }
  }
}

export default defineConfig({
  plugins: [react(), markdownPlugin(), sitemapPlugin()],
  // For GitHub Pages with a custom domain keep '/'. For github.io/repo-name set to '/repo-name/'
  base: '/',
})
