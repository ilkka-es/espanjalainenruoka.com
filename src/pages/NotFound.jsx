import { Link, Navigate, useLocation } from 'react-router-dom'

const REDIRECTS = {
  '/paella/': '/resepti/paella-valenciana',
  '/paella':  '/resepti/paella-valenciana',
}

export default function NotFound() {
  const { pathname } = useLocation()
  const target = REDIRECTS[pathname]
  if (target) return <Navigate to={target} replace />

  return (
    <main style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      padding: '4rem 1rem',
      textAlign: 'center',
      background: 'var(--cream)',
    }}>
      <span style={{ fontSize: '4rem', lineHeight: 1 }}>🍷</span>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: '3rem', color: 'var(--red)' }}>
        404
      </h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--muted)', maxWidth: '36ch' }}>
        Sivua ei löydy. Se on ehkä poistettu tai osoite on kirjoitettu väärin.
      </p>
      <Link
        to="/"
        style={{
          background: 'var(--red)',
          color: '#fff',
          padding: '0.75rem 2rem',
          borderRadius: '4px',
          fontWeight: 600,
          letterSpacing: '0.04em',
          transition: 'background 0.2s',
        }}
      >
        Takaisin etusivulle
      </Link>
    </main>
  )
}
