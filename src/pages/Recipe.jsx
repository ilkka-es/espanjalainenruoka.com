import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { RECIPES } from '../lib/loadRecipes'
import './Recipe.css'

function RecipeSEO({ recipe }) {
  useEffect(() => {
    document.title = `${recipe.title} — EspanjalainenRuoka.com`

    let desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', recipe.seoDescription)

    // JSON-LD structured data
    const allIngredients = (recipe.ingredients || []).flatMap(g => g.items)
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      name: recipe.title,
      description: recipe.seoDescription,
      image: recipe.heroImage,
      cookTime: recipe.time,
      recipeCategory: recipe.category,
      inLanguage: 'fi',
      publisher: {
        '@type': 'Organization',
        name: 'EspanjalainenRuoka.com',
        url: 'https://www.espanjalainenruoka.com',
      },
      recipeIngredient: allIngredients,
    }

    let existing = document.getElementById('recipe-jsonld')
    if (existing) existing.remove()
    const script = document.createElement('script')
    script.id = 'recipe-jsonld'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      document.title = 'EspanjalainenRuoka.com — Espanjalainen ruoka, viinit ja elämä Espanjassa'
      if (desc) desc.setAttribute('content', 'Yli 500 espanjalaista reseptiä, viinisuosituksia ja vinkkejä elämään Espanjassa.')
      document.getElementById('recipe-jsonld')?.remove()
    }
  }, [recipe])

  return null
}

export default function Recipe() {
  const { slug } = useParams()
  const recipe = RECIPES.find(r => r.slug === slug)
  const [checked, setChecked] = useState({})

  if (!recipe) return <Navigate to="/" replace />

  const toggleIngredient = key => setChecked(prev => ({ ...prev, [key]: !prev[key] }))

  const relatedRecipes = RECIPES
    .filter(r => r.slug !== slug && r.category === recipe.category)
    .slice(0, 3)

  return (
    <article className="recipe-page">
      <RecipeSEO recipe={recipe} />

      {/* Hero image */}
      <div className="rp-hero">
        <img src={recipe.heroImage} alt={recipe.title} />
        <div className="rp-hero-overlay" />
      </div>

      {/* Content */}
      <div className="rp-container">

        {/* Breadcrumb */}
        <nav className="rp-breadcrumb" aria-label="Navigaatio">
          <Link to="/">Etusivu</Link>
          <span>/</span>
          <Link to={`/?kategoria=${encodeURIComponent(recipe.category)}`}>{recipe.category}</Link>
          <span>/</span>
          <span>{recipe.title}</span>
        </nav>

        {/* Title block */}
        <header className="rp-header">
          <span className="rp-category">{recipe.category}</span>
          <h1 className="rp-title">{recipe.title}</h1>
          <div className="rp-meta-row">
            <div className="rp-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <div>
                <span className="rp-meta-label">Aika</span>
                <span className="rp-meta-value">{recipe.time}</span>
              </div>
            </div>
            <div className="rp-meta-divider" />
            <div className="rp-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <div>
                <span className="rp-meta-label">Vaikeustaso</span>
                <span className="rp-meta-value">{recipe.difficulty}</span>
              </div>
            </div>
          </div>
          <p className="rp-description">{recipe.description}</p>
        </header>

        {/* Two-column layout */}
        <div className="rp-body">

          {/* Ingredients — sticky sidebar */}
          <aside className="rp-ingredients">
            <div className="rp-ingredients-inner">
              <h2 className="rp-section-title">Muistilista</h2>
              <p className="rp-ingredients-hint">Tarvitset nämä!</p>
              {recipe.ingredients.map((group, gi) => (
                <div key={gi} className="rp-ingredient-group">
                  {group.group && <h3 className="rp-group-title">{group.group}</h3>}
                  <ul className="rp-ingredient-list">
                    {group.items.map((item, ii) => {
                      const key = `${gi}-${ii}`
                      return (
                        <li
                          key={key}
                          className={`rp-ingredient ${checked[key] ? 'checked' : ''}`}
                          onClick={() => toggleIngredient(key)}
                        >
                          <span className="rp-checkbox">
                            {checked[key] && (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M20 6 9 17l-5-5"/>
                              </svg>
                            )}
                          </span>
                          <span className="rp-ingredient-text">{item}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          {/* Body — rendered from markdown */}
          <div className="rp-steps">
            <ReactMarkdown
              components={{
                h2: ({ children }) => <h2 className="rp-section-title">{children}</h2>,
                h3: ({ children }) => <h3 className="rp-md-h3">{children}</h3>,
                ol: ({ children }) => <ol className="rp-step-list">{children}</ol>,
                li: ({ children }) => (
                  <li className="rp-step">
                    <div className="rp-step-number" />
                    <div className="rp-step-content">{children}</div>
                  </li>
                ),
                p: ({ children }) => <p className="rp-step-text">{children}</p>,
                img: ({ src, alt }) => (
                  <div className="rp-step-image">
                    <img src={src} alt={alt} loading="lazy" />
                  </div>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="rp-blockquote">{children}</blockquote>
                ),
                ul: ({ children }) => <ul className="rp-md-ul">{children}</ul>,
                strong: ({ children }) => <strong className="rp-strong">{children}</strong>,
              }}
            >
              {recipe.body}
            </ReactMarkdown>
          </div>
        </div>

        {/* Related recipes */}
        {relatedRecipes.length > 0 && (
          <section className="rp-related">
            <h2 className="rp-related-title">Samasta kategoriasta</h2>
            <div className="rp-related-grid">
              {relatedRecipes.map(r => (
                <Link key={r.id} to={`/resepti/${r.slug}`} className="rp-related-card">
                  <div className="rp-related-img">
                    <img src={r.heroImage} alt={r.title} loading="lazy" />
                  </div>
                  <div className="rp-related-body">
                    <span className="rp-related-category">{r.category}</span>
                    <h3>{r.title}</h3>
                    <span className="rp-related-time">⏱ {r.time}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}
