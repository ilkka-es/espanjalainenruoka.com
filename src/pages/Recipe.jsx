import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import CATEGORY_ICONS from '../lib/categoryIcons'
import ReactMarkdown from 'react-markdown'
import { ChevronDown, Printer, Users } from 'lucide-react'
import { RECIPES, SLUG_FOR_CATEGORY, categoryLabel } from '../lib/loadRecipes'
import './Recipe.css'

const WWW_BASE = 'https://www.espanjalainenruoka.com'

function RecipeSEO({ recipe }) {
  useEffect(() => {
    const pageUrl = `${WWW_BASE}/resepti/${recipe.slug}`
    const imageUrl = recipe.heroImage.startsWith('http') ? recipe.heroImage : `${WWW_BASE}${recipe.heroImage}`

    document.title = `${recipe.title} — EspanjalainenRuoka.com`

    let desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', recipe.seoDescription)

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = pageUrl

    // og:url
    let ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', pageUrl)

    // og:title
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', `${recipe.title} — EspanjalainenRuoka.com`)

    // og:description
    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', recipe.seoDescription)

    // og:image
    let ogImage = document.querySelector('meta[property="og:image"]')
    if (ogImage) ogImage.setAttribute('content', imageUrl)

    // JSON-LD structured data
    const allIngredients = (recipe.ingredients || []).flatMap(g => g.items)
    const instructions = recipe.body
      .split('\n')
      .filter(line => /^\d+\.\s/.test(line.trim()))
      .map(line => ({ '@type': 'HowToStep', text: line.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '') }))
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      name: recipe.title,
      description: recipe.seoDescription,
      image: imageUrl,
      recipeCategory: recipe.category,
      inLanguage: 'fi',
      url: pageUrl,
      datePublished: recipe.date,
      publisher: {
        '@type': 'Organization',
        name: 'EspanjalainenRuoka.com',
        url: WWW_BASE,
      },
      recipeIngredient: allIngredients,
      ...(recipe.servings ? { recipeYield: recipe.servings } : {}),
      ...(instructions.length ? { recipeInstructions: instructions } : {}),
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
      if (desc) desc.setAttribute('content', 'Aidot espanjalaiset reseptit suomeksi — selkeät ohjeet ja tarinat Espanjasta.')
      if (canonical) canonical.href = `${WWW_BASE}/`
      if (ogUrl) ogUrl.setAttribute('content', `${WWW_BASE}/`)
      if (ogTitle) ogTitle.setAttribute('content', 'EspanjalainenRuoka.com — Espanjalainen ruoka, viinit ja elämä Espanjassa')
      if (ogDesc) ogDesc.setAttribute('content', 'Aidot espanjalaiset reseptit suomeksi — selkeät ohjeet ja tarinat Espanjasta.')
      if (ogImage) ogImage.setAttribute('content', `${WWW_BASE}/images/hero-v3.jpg`)
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

  const hasIngredients = recipe.ingredients?.some(group => group.items.length)
  const sections = recipe.body.split('\n').flatMap((line, index) =>
    line.startsWith('## ') ? [{ title: line.slice(3).replace(/\*/g, ''), id: `section-${index + 1}` }] : [])
  const method = sections.find(section => /valmistus|ohje/i.test(section.title))

  const toggleIngredient = key => setChecked(prev => ({ ...prev, [key]: !prev[key] }))

  const relatedRecipes = RECIPES
    .filter(r => r.slug !== slug && r.category === recipe.category)
    .slice(0, 3)

  return (
    <article className="recipe-page">
      <RecipeSEO recipe={recipe} />

      {/* Content */}
      <div className="rp-container">

        {/* Breadcrumb */}
        <nav className="rp-breadcrumb" aria-label="Navigaatio">
          <Link to="/">Etusivu</Link>
          <span>/</span>
          <Link to={`/kategoria/${SLUG_FOR_CATEGORY[recipe.category]}`}>{categoryLabel(recipe.category)}</Link>
          <span>/</span>
          <span>{recipe.title}</span>
        </nav>

        {/* Title block */}
        <div className="rp-opening">
        <header className="rp-header">
          <span className="rp-category">{CATEGORY_ICONS[recipe.category]}{categoryLabel(recipe.category)}</span>
          <h1 className="rp-title">{recipe.title}</h1>
          {(recipe.time || recipe.difficulty) && (
          <div className="rp-meta-row">
            {recipe.time && (
            <div className="rp-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <div>
                <span className="rp-meta-label">Aika</span>
                <span className="rp-meta-value">{recipe.time}</span>
              </div>
            </div>
            )}
            {recipe.time && recipe.difficulty && <div className="rp-meta-divider" />}
            {recipe.difficulty && (
            <div className="rp-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <div>
                <span className="rp-meta-label">Vaikeustaso</span>
                <span className="rp-meta-value">{recipe.difficulty}</span>
              </div>
            </div>
            )}
            {recipe.servings && <div className="rp-meta-divider" />}
            {recipe.servings && (
            <div className="rp-meta-item">
              <Users />
              <div><span className="rp-meta-label">Määrä</span><span className="rp-meta-value">{recipe.servings}</span></div>
            </div>
            )}
          </div>
          )}
          <p className="rp-description">{recipe.description}</p>
          <div className="rp-actions">
            {hasIngredients && <a href="#ainekset">Siirry reseptiin <ChevronDown size={16} /></a>}
            {method && <a className="rp-action-secondary" href={`#${method.id}`}>Valmistusohje</a>}
            <button type="button" onClick={() => window.print()}><Printer size={16} /> Tulosta</button>
          </div>
        </header>
        <div className="rp-hero">
          <img src={recipe.heroImage} alt={recipe.title} fetchPriority="high" width="1536" height="1024" />
        </div>
        </div>

        {sections.length > 0 && <details className="rp-contents">
          <summary>Tässä artikkelissa <span>{sections.length} osiota</span></summary>
          <nav aria-label="Artikkelin sisällysluettelo">{sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav>
        </details>}

        {/* Two-column layout */}
        <div className={`rp-body ${hasIngredients ? '' : 'rp-body--article'}`}>

          {/* Ingredients — sticky sidebar */}
          {hasIngredients && <aside className="rp-ingredients" id="ainekset">
            <div className="rp-ingredients-inner">
              <h2 className="rp-section-title">Ainekset</h2>
              <p className="rp-ingredients-hint">{recipe.servings && <>{recipe.servings}<br /></>}Merkitse ainekset sitä mukaa, kun käytät ne.</p>
              {(recipe.ingredients || []).map((group, gi) => (
                <div key={gi} className="rp-ingredient-group">
                  {group.group && <h3 className="rp-group-title">{group.group}</h3>}
                  <ul className="rp-ingredient-list">
                    {group.items.map((item, ii) => {
                      const key = `${slug}-${gi}-${ii}`
                      return (
                        <li
                          key={key}
                          className={`rp-ingredient ${checked[key] ? 'checked' : ''}`}
                        >
                          <label>
                          <input type="checkbox" checked={!!checked[key]} onChange={() => toggleIngredient(key)} />
                          <span className="rp-ingredient-text">{item}</span>
                          </label>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </aside>}

          {/* Body — rendered from markdown */}
          <div className="rp-steps">
            <ReactMarkdown
              components={{
                h2: ({ children, node }) => <h2 id={`section-${node.position.start.line}`} className="rp-section-title">{children}</h2>,
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
                <Link key={r.slug} to={`/resepti/${r.slug}`} className="rp-related-card">
                  <div className="rp-related-img">
                    <img src={r.heroImage} alt={r.title} loading="lazy" />
                  </div>
                  <div className="rp-related-body">
                    <span className="rp-related-category">{CATEGORY_ICONS[r.category]}{r.category}</span>
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
