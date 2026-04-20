import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RECIPES, CATEGORIES } from '../lib/loadRecipes'

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('Kaikki')
  const [search, setSearch] = useState('')

  const filtered = RECIPES.filter(r => {
    const matchesFilter = activeFilter === 'Kaikki' || r.category === activeFilter
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const [featured, ...rest] = filtered

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <img
          className="hero-img"
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1800&h=900&fit=crop&q=80&fm=webp"
          alt=""
          fetchPriority="high"
          width="1800"
          height="900"
        />
        <div className="hero-overlay" />
        <div className="hero-inner">
          <div className="hero-tag">
            <span className="hero-tag-dot" />
            Espanjalainen Gastronomia
          </div>
          <h1 className="hero-title">
            <span className="hero-line1">Espanjalainen</span>
            <span className="hero-line2"><em>ruoka, viinit</em></span>
            <span className="hero-line3">ja elämä Espanjassa</span>
          </h1>
          <div className="search-wrap">
            <div className="search-bar">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Etsi reseptiä tai ainesosaa..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button className="search-btn">Etsi</button>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat"><strong>500+</strong><span>Reseptiä</span></div>
            <div className="stat-divider" aria-hidden="true" />
            <div className="stat"><strong>17</strong><span>Aluetta</span></div>
            <div className="stat-divider" aria-hidden="true" />
            <div className="stat"><strong>80+</strong><span>Kokkia</span></div>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <main className="main">
        <div className="filters-row">
          <div className="filters">
            {CATEGORIES.map(f => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <span className="results-count">{filtered.length} reseptiä</span>
        </div>

        {filtered.length === 0 ? (
          <div className="no-results">
            <span className="no-results-icon">🍷</span>
            <p>Ei tuloksia haulle &ldquo;{search}&rdquo;</p>
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
    </>
  )
}
