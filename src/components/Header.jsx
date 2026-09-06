import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, Search, X } from 'lucide-react'
import { CATEGORIES, SLUG_FOR_CATEGORY, categoryLabel } from '../lib/loadRecipes'

export default function Header() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const submit = event => {
    event.preventDefault()
    navigate(query.trim() ? `/?search=${encodeURIComponent(query.trim())}#reseptit` : '/#reseptit')
    setOpen(false)
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo" aria-label="EspanjalainenRuoka.com etusivu">
          <span><strong>espanjalainen</strong><em>ruoka<span className="logo-dot" aria-hidden="true">.</span></em></span>
        </Link>
        <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Päänavigaatio">
          <NavLink to="/" end onClick={() => setOpen(false)}>Etusivu</NavLink>
          {CATEGORIES.filter(c => c !== 'Kaikki').map(category => (
            <NavLink key={category} to={`/kategoria/${SLUG_FOR_CATEGORY[category]}`} onClick={() => setOpen(false)}>{categoryLabel(category)}</NavLink>
          ))}
          <form className="mobile-search" onSubmit={submit}><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Hae sivustolta" aria-label="Hae sivustolta" /><button aria-label="Hae"><Search size={18} /></button></form>
        </nav>
        <form className="header-search" onSubmit={submit}><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Hae" aria-label="Hae sivustolta" /><button aria-label="Hae"><Search size={18} /></button></form>
        <button className="menu-toggle" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-label={open ? 'Sulje valikko' : 'Avaa valikko'}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  )
}
