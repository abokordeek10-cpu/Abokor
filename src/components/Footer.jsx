import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo-icon">✚</span>
          <span className="footer-logo-text">Dr. <strong>Brandelik</strong></span>
          <p className="footer-tagline">Hausarztpraxis – Medizin mit Herz</p>
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Startseite</Link></li>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/leistungen">Leistungen</Link></li>
            <li><Link to="/termin">Termin buchen</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Patienten</h4>
          <ul>
            <li><Link to="/anamnese">Anamnesebogen</Link></li>
            <li><Link to="/kontakt">Kontakt & Anfragen</Link></li>
            <li><Link to="/datenschutz">Datenschutzerklärung</Link></li>
            <li><Link to="/impressum">Impressum</Link></li>
          </ul>
        </div>

        <div className="footer-col footer-contact">
          <h4>Kontakt</h4>
          <address>
            <p>Musterstraße 12<br />12345 Musterstadt</p>
            <p><a href="tel:+4912345678">📞 01234 / 56789</a></p>
            <p><a href="mailto:info@praxis-brandelik.de">✉ info@praxis-brandelik.de</a></p>
          </address>
          <div className="footer-hours">
            <p><strong>Öffnungszeiten</strong></p>
            <p>Mo–Fr: 8:00–12:00 Uhr<br />Mo, Di, Do: 15:00–18:00 Uhr</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>© {year} Hausarztpraxis Dr. Brandelik. Alle Rechte vorbehalten.</p>
        <p>
          <Link to="/impressum">Impressum</Link>
          &nbsp;·&nbsp;
          <Link to="/datenschutz">Datenschutz</Link>
        </p>
      </div>
    </footer>
  )
}
