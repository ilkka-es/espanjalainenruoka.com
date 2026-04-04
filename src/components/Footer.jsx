import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <Link to="/" className="footer-logo">
            <span className="logo-badge">ER</span>
            <span className="logo-text">EspanjalainenRuoka</span>
          </Link>
          <p>Espanjalaisen keittiön täydellinen opas suomalaisille.</p>
        </div>
        <div className="footer-links">
          <Link to="/">Reseptit</Link>
          <a href="#">Meistä</a>
          <a href="#">Yhteystiedot</a>
          <a href="#">Tietosuoja</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2024 EspanjalainenRuoka.com</span>
      </div>
    </footer>
  )
}
