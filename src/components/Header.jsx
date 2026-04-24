import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CATEGORIES, SLUG_FOR_CATEGORY } from '../lib/loadRecipes'
import CATEGORY_ICONS from '../lib/categoryIcons'
import logoImg from '../assets/logo.png'

export default function Header() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = e => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/?search=${encodeURIComponent(q)}` : '/')
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <img src={logoImg} alt="EspanjalainenRuoka.com" className="logo-img" />
        </Link>

        <nav className="nav">
          <Link to="/">Kaikki</Link>
          {CATEGORIES.filter(c => c !== 'Kaikki').map(c => (
            <Link key={c} to={`/kategoria/${SLUG_FOR_CATEGORY[c]}`} className="nav-link-icon">
              {CATEGORY_ICONS[c]}{c}
            </Link>
          ))}
        </nav>

        <form className="header-search-form" onSubmit={handleSearch}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="header-search-icon">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Hae reseptejä..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="header-search-input"
          />
        </form>
      </div>
    </header>
  )
}
