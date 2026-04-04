// .md files are transformed to JSON by the Vite markdownPlugin at build time
const files = import.meta.glob('../content/*.md', { eager: true })

export const RECIPES = Object.values(files)
  .map(m => m.default)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export const CATEGORIES = ['Kaikki', 'Ruoka ohjeet', 'Viinit & juomat', 'Elämää Espanjassa']
