import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import CookieConsentBanner from './components/CookieConsent'
import Home from './pages/Home'

const Recipe = lazy(() => import('./pages/Recipe'))

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
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
