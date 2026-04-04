import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <span className="logo-badge">ER</span>
          <span className="logo-text">EspanjalainenRuoka</span>
        </Link>
        <nav className="nav">
          <Link to="/">Reseptit</Link>
          <Link to="/">Viinit</Link>
          <Link to="/">Elämää Espanjassa</Link>
        </nav>
        <Link to="/" className="nav-cta">Tutustu →</Link>
      </div>
    </header>
  )
}
