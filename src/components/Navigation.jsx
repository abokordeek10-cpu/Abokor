import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Navigation.css'

const navLinks = [
  { to: '/', label: 'Startseite' },
  { to: '/team', label: 'Team' },
  { to: '/leistungen', label: 'Leistungen' },
  { to: '/kontakt', label: 'Kontakt' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`nav-header${scrolled ? ' scrolled' : ''}`}>
      <nav className="nav-inner container" aria-label="Hauptnavigation">
        <Link to="/" className="nav-logo" aria-label="Startseite">
          <span className="nav-logo-icon">✚</span>
          <span className="nav-logo-text">
            Dr. <strong>Brandelik</strong>
          </span>
        </Link>

        <ul className={`nav-links${open ? ' open' : ''}`} role="list">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li className="nav-cta-item">
            <Link to="/termin" className="btn btn-accent nav-cta">
              Termin buchen
            </Link>
          </li>
        </ul>

        <button
          className={`nav-burger${open ? ' open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
        >
          <span /><span /><span />
        </button>
      </nav>
    </header>
  )
}
