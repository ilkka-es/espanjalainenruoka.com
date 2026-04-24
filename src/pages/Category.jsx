import { Link, useParams, Navigate } from 'react-router-dom'
import { RECIPES, CATEGORY_SLUGS } from '../lib/loadRecipes'

export default function Category() {
  const { slug } = useParams()
  const category = CATEGORY_SLUGS[slug]

  if (!category) return <Navigate to="/" replace />

  const recipes = RECIPES.filter(r => r.category === category)
  const [featured, ...rest] = recipes

  return (
    <main className="main" style={{ marginTop: '72px' }}>
      <div className="category-header">
        <Link to="/" className="rp-breadcrumb" style={{ paddingBottom: 0 }}>
          ← Kaikki kategoriat
        </Link>
        <h1 className="category-title">{category}</h1>
        <p className="category-count">{recipes.length} artikkelia</p>
      </div>

      {recipes.length === 0 ? (
        <div className="no-results">
          <span className="no-results-icon">🍷</span>
          <p>Ei artikkeleita tässä kategoriassa.</p>
        </div>
      ) : (
        <div className="recipe-grid">
          {featured && (
            <Link to={`/resepti/${featured.slug}`} className="recipe-card card-featured">
              <div className="card-image">
                <img src={featured.heroImage} alt={featured.title} fetchPriority="high" />
                <div className="card-overlay" />
                <span className="card-badge">{featured.category}</span>
                <div className="card-text-overlay">
                  <h2 className="card-title-lg">{featured.title}</h2>
                  <div className="card-meta">
                    <span className="meta-pill">⏱ {featured.time}</span>
                  </div>
                </div>
              </div>
            </Link>
          )}
          {rest.map(recipe => (
            <Link key={recipe.id} to={`/resepti/${recipe.slug}`} className="recipe-card">
              <div className="card-image">
                <img src={recipe.heroImage} alt={recipe.title} loading="lazy" />
                <div className="card-overlay" />
                <span className="card-badge">{recipe.category}</span>
              </div>
              <div className="card-body">
                <h3 className="card-title">{recipe.title}</h3>
                <div className="card-meta">
                  <span className="meta-pill">⏱ {recipe.time}</span>
                </div>
                <div className="card-arrow">→</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
