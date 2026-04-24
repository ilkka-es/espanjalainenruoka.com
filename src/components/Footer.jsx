import { Link } from 'react-router-dom'
import logoImg from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-wrap">
              <img src={logoImg} alt="EspanjalainenRuoka.com" className="logo-img" />
            </span>
          </Link>
          <p>Espanjalaisen keittiön täydellinen opas suomalaisille.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Espanjalainenruoka.com</span>
      </div>
    </footer>
  )
}
