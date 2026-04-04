import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import matter from 'gray-matter'

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

export default defineConfig({
  plugins: [react(), markdownPlugin()],
  // For GitHub Pages with a custom domain keep '/'. For github.io/repo-name set to '/repo-name/'
  base: '/',
})
