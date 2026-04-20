import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import CookieConsentBanner from './components/CookieConsent'
import Home from './pages/Home'
import Recipe from './pages/Recipe'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CookieConsentBanner />
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resepti/:slug" element={<Recipe />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
