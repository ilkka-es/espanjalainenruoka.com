import { Link, Navigate, useParams } from 'react-router-dom'
import { CATEGORY_SLUGS, RECIPES, categoryLabel } from '../lib/loadRecipes'
import { RecipeCard } from './Home'

export default function Category() {
  const { slug } = useParams()
  const category = CATEGORY_SLUGS[slug]
  if (!category) return <Navigate to="/" replace />

  const recipes = RECIPES.filter(recipe => recipe.category === category)
  return (
    <main className="section-shell">
      <header className="category-header">
        <Link to="/#reseptit" className="text-link">← Kaikki aiheet</Link>
        <p className="eyebrow">EspanjalainenRuoka.com</p>
        <h1 className="category-title">{categoryLabel(category)}</h1>
        <p className="category-count">{recipes.length} {recipes.length === 1 ? 'juttu' : 'juttua'}</p>
      </header>
      {recipes.length ? <div className="latest-grid" style={{ paddingBottom: '104px' }}>{recipes.map(recipe => <RecipeCard key={recipe.slug} recipe={recipe} />)}</div> : <div className="no-results">Ei vielä artikkeleita tässä aiheessa.</div>}
    </main>
  )
}
