import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { CATEGORIES, SLUG_FOR_CATEGORY, categoryLabel } from '../lib/loadRecipes'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand"><span>ER</span><h2>Espanja kuuluu kaikille aisteille.</h2><p>Espanjalaisen keittiön ja elämän opas suomalaisille.</p></div>
        <div className="footer-nav"><p>Tutustu</p>{CATEGORIES.filter(c => c !== 'Kaikki').map(c => <Link key={c} to={`/kategoria/${SLUG_FOR_CATEGORY[c]}`}>{categoryLabel(c)} <ArrowUpRight size={14} /></Link>)}</div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} EspanjalainenRuoka.com</span><span>Tehty Espanjan auringossa.</span></div>
    </footer>
  )
}
