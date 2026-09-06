import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, ChefHat, Clock, Search, Sparkles } from 'lucide-react'
import { CATEGORIES, RECIPES, SLUG_FOR_CATEGORY, categoryLabel } from '../lib/loadRecipes'

const FEATURED_SLUGS = [
  'tapas-ilta-kotona',
  'baskilainen-juustokakku',
  'albondigas-espanjalaiset-lihapullat',
]

const CATEGORY_COPY = {
  'Ruoka ohjeet': 'Tapakset, klassikot ja arkiruoat Espanjan eri alueilta.',
  'Jälkiruoat': 'Churrot ja muut makeat hetket café con lechen seuraksi.',
  'Viinit & juomat': 'Sangria, cava ja viinit ilman turhaa pönötystä.',
  'Elämää Espanjassa': 'Paikalliset tavat, kaupungit ja parhaat pöydät.',
}

export function RecipeCard({ recipe, featured = false }) {
  return (
    <Link to={`/resepti/${recipe.slug}`} className={`story-card ${featured ? 'story-card--featured' : ''}`}>
      <div className="story-card__image">
        <img src={recipe.heroImage} alt="" loading={featured ? 'eager' : 'lazy'} />
        <span className="story-card__category">{categoryLabel(recipe.category)}</span>
      </div>
      <div className="story-card__body">
        <div className="story-card__meta">
          <span><Clock size={14} /> {recipe.time}</span>
          {recipe.difficulty && <span>{recipe.difficulty}</span>}
        </div>
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <span className="story-card__link">Katso ohje <ArrowRight size={16} /></span>
      </div>
    </Link>
  )
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeFilter = searchParams.get('category') || 'Kaikki'
  const search = searchParams.get('search') || ''

  const featured = FEATURED_SLUGS.map(slug => RECIPES.find(r => r.slug === slug)).filter(Boolean)
  const filtered = useMemo(() => RECIPES.filter(recipe => {
    const ingredients = (recipe.ingredients || []).flatMap(group => group.items).join(' ')
    const haystack = `${recipe.title} ${recipe.description} ${recipe.category} ${ingredients}`.toLocaleLowerCase('fi')
    return (activeFilter === 'Kaikki' || recipe.category === activeFilter)
      && haystack.includes(search.toLocaleLowerCase('fi'))
  }), [activeFilter, search])

  const updateFilter = category => {
    const next = new URLSearchParams(searchParams)
    category === 'Kaikki' ? next.delete('category') : next.set('category', category)
    setSearchParams(next, { replace: true })
  }

  const updateSearch = value => {
    const next = new URLSearchParams(searchParams)
    value ? next.set('search', value) : next.delete('search')
    setSearchParams(next, { replace: true })
  }

  const handleSearch = event => {
    event.preventDefault()
    const next = new URLSearchParams(searchParams)
    search.trim() ? next.set('search', search.trim()) : next.delete('search')
    setSearchParams(next, { replace: true })
    document.querySelector('#reseptit')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section className="hero">
        <img className="hero-img" src="/images/hero-v3.jpg" alt="Espanjalainen tapas-pöytä aurinkoisessa kodissa" fetchPriority="high" />
        <div className="hero-overlay" />
        <div className="hero-inner">
          <p className="eyebrow eyebrow--light"><Sparkles size={14} /> Aidot maut · selkeät ohjeet</p>
          <h1 className="hero-title">Espanja<br /><em>pöytään.</em></h1>
          <p className="hero-subtitle">Aitoja reseptejä, käytännön vinkkejä ja tarinoita paikallisesta elämästä — suomalaisen kotikokin aineksilla.</p>
          <form className="hero-search" onSubmit={handleSearch}>
            <Search size={20} aria-hidden="true" />
            <input value={search} onChange={event => updateSearch(event.target.value)} placeholder="Mitä tekisit tänään?" aria-label="Hae reseptejä" />
            <button type="submit">Hae</button>
          </form>
          <div className="hero-quicklinks"><span>Suositut:</span><Link to="/resepti/tapas-ilta-kotona">tapas-ilta</Link><Link to="/resepti/aioli-valkosipulimajoneesi">aioli</Link><Link to="/resepti/baskilainen-juustokakku">juustokakku</Link></div>
        </div>
        <div className="hero-note" aria-hidden="true"><span>01</span><p>Hyvä ruoka ei kaipaa kiirettä.</p></div>
      </section>

      <main>
        <section className="intro-band">
          <div><p className="eyebrow">¡Bienvenidos!</p><h2>Keittiöstä alkaa paras matka Espanjaan.</h2></div>
          <p>Ei oikoteitä eikä turhaa hienostelua. Vain toimivia reseptejä, hyviä raaka-aineita ja pieniä niksejä, joilla saat aidon espanjalaisen maun omaan keittiöösi.</p>
          <div className="intro-stat"><strong>{RECIPES.length}</strong><span>reseptiä ja opasta</span></div>
        </section>

        {featured.length > 0 && (
          <section className="section-shell picks-section">
            <div className="section-heading"><div><p className="eyebrow">Aloita näistä</p><h2>Rakastetuimmat klassikot</h2></div><a href="#reseptit" className="text-link">Kaikki reseptit <ArrowRight size={17} /></a></div>
            <div className="picks-grid"><RecipeCard recipe={featured[0]} featured /><div className="picks-stack">{featured.slice(1).map(recipe => <RecipeCard key={recipe.slug} recipe={recipe} />)}</div></div>
          </section>
        )}

        <section className="category-section">
          <div className="section-shell">
            <div className="section-heading"><div><p className="eyebrow">Löydä oma makusi</p><h2>Tutki aiheita</h2></div></div>
            <div className="category-grid">
              {CATEGORIES.filter(category => category !== 'Kaikki').map((category, index) => (
                <Link className="category-tile" to={`/kategoria/${SLUG_FOR_CATEGORY[category]}`} key={category}>
                  <span className="category-tile__number">0{index + 1}</span><ChefHat size={22} /><h3>{categoryLabel(category)}</h3><p>{CATEGORY_COPY[category]}</p><span>{RECIPES.filter(recipe => recipe.category === category).length} juttua <ArrowRight size={16} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell recipe-index" id="reseptit">
          <div className="section-heading section-heading--recipes">
            <div><p className="eyebrow">Keittiön uudet</p><h2>Reseptit ja tarinat</h2></div>
            <form className="inline-search" onSubmit={handleSearch}><Search size={18} /><input value={search} onChange={event => updateSearch(event.target.value)} placeholder="Hae nimellä tai raaka-aineella" aria-label="Hae artikkeleista" /></form>
          </div>
          <div className="filter-tabs" role="group" aria-label="Suodata kategorian mukaan">{CATEGORIES.map(category => <button key={category} className={activeFilter === category ? 'active' : ''} onClick={() => updateFilter(category)}>{categoryLabel(category)}</button>)}</div>
          {filtered.length ? <div className="latest-grid">{filtered.map(recipe => <RecipeCard key={recipe.slug} recipe={recipe} />)}</div> : <div className="no-results"><span>Ei osumia.</span><p>Kokeile toista hakusanaa tai näytä kaikki jutut.</p><button onClick={() => { updateSearch(''); updateFilter('Kaikki') }}>Tyhjennä haku</button></div>}
        </section>

        <section className="manifesto">
          <div className="manifesto__mark">ER</div><div><p className="eyebrow eyebrow--light">Pala Espanjaa kotona</p><h2>Ruoka maistuu paremmalta, kun tunnet sen tarinan.</h2></div><p>Täällä resepti ei ole vain lista aineksia. Kerromme myös, mistä ruoka tulee, miten sitä syödään Espanjassa ja mikä yksityiskohta ratkaisee lopputuloksen.</p>
        </section>
      </main>
    </>
  )
}
