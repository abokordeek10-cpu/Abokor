import { Link } from 'react-router-dom'
import './CookieBanner.css'

export default function CookieBanner({ onAccept, onDecline }) {
  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    onAccept()
  }
  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    onDecline()
  }

  return (
    <div className="cookie-overlay" role="dialog" aria-modal="true" aria-label="Cookie-Einstellungen">
      <div className="cookie-banner">
        <div className="cookie-icon">🍪</div>
        <div className="cookie-text">
          <h3>Datenschutz-Einstellungen</h3>
          <p>
            Wir verwenden ausschließlich technisch notwendige Cookies, die für den Betrieb der Website
            erforderlich sind. Es werden keine Tracking- oder Analyse-Cookies gesetzt.{' '}
            <Link to="/datenschutz">Datenschutzerklärung</Link>
          </p>
        </div>
        <div className="cookie-actions">
          <button className="btn btn-primary" onClick={accept}>Verstanden & Akzeptieren</button>
          <button className="btn btn-outline" onClick={decline}>Nur Notwendige</button>
        </div>
      </div>
    </div>
  )
}
