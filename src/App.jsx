import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import CookieConsentBanner from './components/CookieConsent'
import Home from './pages/Home'

const Recipe = lazy(() => import('./pages/Recipe'))
const Category = lazy(() => import('./pages/Category'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CookieConsentBanner />
      <div className="app">
        <Header />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resepti/:slug" element={<Recipe />} />
            <Route path="/kategoria/:slug" element={<Category />} />
            <Route path="/tortilla-de-patatas-peruna-munakas/" element={<Navigate to="/resepti/tortilla-espanola" replace />} />
            <Route path="/paras-sangria-ohje/" element={<Navigate to="/resepti/paras-sangria-ohje" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
