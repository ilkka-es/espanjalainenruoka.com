import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Leaf, Sun, MapPin, Star } from 'lucide-react'
import { RECIPES, CATEGORIES } from '../lib/loadRecipes'
import CATEGORY_ICONS from '../lib/categoryIcons'

const FEATURES = [
  { label: 'Aitoa makua',  sub: 'Perinteitä kunnioittaen',          icon: <Leaf size={22} />,   color: '#6B7F5E', bg: 'rgba(107,127,94,0.12)'  },
  { label: 'Aurinkoista',  sub: 'Raaka-aineet parhaimmillaan',       icon: <Sun size={22} />,    color: '#E8A400', bg: 'rgba(232,164,0,0.12)'   },
  { label: 'Espanjasta',   sub: 'Tarinoita ja inspiraatiota',        icon: <MapPin size={22} />, color: '#C41E3A', bg: 'rgba(196,30,58,0.10)'   },
  { label: 'Herkullista',  sub: 'Reseptit, joista tulee suosikkeja', icon: <Star size={22} />,   color: '#C41E3A', bg: 'rgba(196,30,58,0.10)'   },
]

export default function Home() {
  const [searchParams] = useSearchParams()
  const [activeFilter, setActiveFilter] = useState(() => searchParams.get('category') || 'Kaikki')
  const [search, setSearch] = useState(() => searchParams.get('search') || '')

  useEffect(() => {
    setActiveFilter(searchParams.get('category') || 'Kaikki')
    setSearch(searchParams.get('search') || '')
  }, [searchParams])

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
          src="/hero-bg.png"
          alt=""
          fetchPriority="high"
        />
        <div className="hero-overlay" />
        <div className="hero-inner">
          <h1 className="hero-title">
            Aitoa makua<br/>Espanjan<br/>sydämestä.
          </h1>
          <div className="hero-divider" />
          <p className="hero-subtitle">
            Reseptit, raaka-aineet ja tarinat suoraan<br/>
            Espanjan sydämestä. Aitoa. Aurinkoista.<br/>
            Herkullista.
          </p>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,32 C240,72 480,0 720,32 C960,64 1200,8 1440,32 L1440,72 L0,72 Z" fill="var(--cream)" />
          </svg>
        </div>
      </section>

      {/* ── Feature strip ── */}
      <div className="feature-strip">
        {FEATURES.map(f => (
          <div key={f.label} className="feature-item">
            <div className="feature-icon" style={{ color: f.color, background: f.bg }}>
              {f.icon}
            </div>
            <div className="feature-text">
              <strong>{f.label}</strong>
              <span>{f.sub}</span>
            </div>
          </div>
        ))}
      </div>

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
                {CATEGORY_ICONS[f]}{f}
              </button>
            ))}
          </div>
          {search && <span className="results-count">&ldquo;{search}&rdquo; — {filtered.length} tulosta</span>}
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
                  <span className="card-badge">{CATEGORY_ICONS[featured.category]}{featured.category}</span>
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
                  <span className="card-badge">{CATEGORY_ICONS[recipe.category]}{recipe.category}</span>
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
