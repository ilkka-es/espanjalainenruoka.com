// .md files are transformed to JSON by the Vite markdownPlugin at build time
const files = import.meta.glob('../content/*.md', { eager: true })

export const RECIPES = Object.values(files)
  .map(m => m.default)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export const CATEGORIES = ['Kaikki', 'Ruoka ohjeet', 'Jälkiruoat', 'Viinit & juomat', 'Elämää Espanjassa']

export const CATEGORY_SLUGS = {
  'ruoka-ohjeet':      'Ruoka ohjeet',
  'jalkiruoat':         'Jälkiruoat',
  'viinit-ja-juomat':  'Viinit & juomat',
  'elamaa-espanjassa': 'Elämää Espanjassa',
}

export const SLUG_FOR_CATEGORY = Object.fromEntries(
  Object.entries(CATEGORY_SLUGS).map(([slug, name]) => [name, slug])
)

export const categoryLabel = category => ({
  'Kaikki': 'Kaikki',
  'Ruoka ohjeet': 'Reseptit',
  'Jälkiruoat': 'Jälkiruoat',
  'Viinit & juomat': 'Viinit & juomat',
  'Elämää Espanjassa': 'Elämä Espanjassa',
}[category] || category)
