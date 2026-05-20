import { Link } from 'react-router-dom'
import './Home.css'

const features = [
  { icon: '📅', title: 'Online-Terminbuchung', desc: 'Buchen Sie Ihren Termin rund um die Uhr – bequem von zu Hause.' },
  { icon: '📋', title: 'Digitaler Anamnesebogen', desc: 'Füllen Sie den Bogen vorab aus und sparen Sie Zeit in der Praxis.' },
  { icon: '👨‍⚕️', title: 'Erfahrenes Team', desc: 'Unser Team betreut Sie mit Erfahrung, Einfühlungsvermögen und modernster Medizin.' },
  { icon: '🔒', title: 'DSGVO-konform', desc: 'Ihre Daten sind bei uns sicher – verschlüsselt und datenschutzkonform.' },
]

const services = [
  { icon: '🩺', title: 'Allgemeinmedizin', desc: 'Ganzheitliche medizinische Versorgung für die ganze Familie.' },
  { icon: '💉', title: 'Impfungen', desc: 'Alle Schutzimpfungen nach STIKO-Empfehlung.' },
  { icon: '🩻', title: 'EKG & Ultraschall', desc: 'Diagnostik direkt in der Praxis, ohne lange Wartezeiten.' },
  { icon: '📝', title: 'Vorsorge & Check-up', desc: 'Gesundheits-Check-up ab 35, Krebsfrüherkennung und mehr.' },
  { icon: '🩸', title: 'Labordiagnostik', desc: 'Blutuntersuchungen und Auswertung im eigenen Labor.' },
  { icon: '🏥', title: 'Überweisung & Koordination', desc: 'Wir koordinieren Ihre Facharzttermine und begleiten Sie.' },
]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="container hero-content">
          <span className="badge hero-badge">Hausarztpraxis Musterstadt</span>
          <h1 className="hero-title">
            Ihre Gesundheit<br />
            <em>in guten Händen</em>
          </h1>
          <p className="hero-desc">
            Herzlich willkommen bei Dr. Brandelik – Ihrer Hausarztpraxis mit persönlicher Betreuung,
            moderner Medizin und kurzen Wartezeiten. Termin jetzt online buchen.
          </p>
          <div className="hero-actions">
            <Link to="/termin" className="btn btn-accent hero-btn">
              📅 Termin online buchen
            </Link>
            <Link to="/leistungen" className="btn btn-white hero-btn">
              Unsere Leistungen
            </Link>
          </div>
          <div className="hero-trust">
            <span>⭐ 4,9 / 5 Bewertungen</span>
            <span>👩‍⚕️ Kassenärztlich zugelassen</span>
            <span>📍 Zentral in Musterstadt</span>
          </div>
        </div>
      </section>

      {/* OPENING HOURS BAR */}
      <section className="hours-bar">
        <div className="container hours-grid">
          <div className="hours-item">
            <span className="hours-label">Montag – Freitag</span>
            <span className="hours-time">08:00 – 12:00 Uhr</span>
          </div>
          <div className="hours-divider" />
          <div className="hours-item">
            <span className="hours-label">Mo, Di, Do Nachmittag</span>
            <span className="hours-time">15:00 – 18:00 Uhr</span>
          </div>
          <div className="hours-divider" />
          <div className="hours-item">
            <span className="hours-label">Telefon</span>
            <span className="hours-time"><a href="tel:+4912345678">01234 / 56789</a></span>
          </div>
          <div className="hours-divider" />
          <div className="hours-item">
            <Link to="/termin" className="btn btn-primary hours-btn">
              Jetzt Termin buchen →
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section features-section">
        <div className="container">
          <div className="text-center mb-3">
            <span className="badge mb-2">Warum Dr. Brandelik?</span>
            <h2 className="section-title">Medizin, die Sie verdienen</h2>
            <p className="section-subtitle">Wir verbinden persönliche Fürsorge mit digitalen Möglichkeiten.</p>
          </div>
          <div className="grid-4 features-grid">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="feature-card card">
                <div className="feature-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section services-preview" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="text-center mb-3">
            <span className="badge mb-2">Leistungen</span>
            <h2 className="section-title">Was wir für Sie tun</h2>
            <p className="section-subtitle">Umfassende hausärztliche Versorgung unter einem Dach.</p>
          </div>
          <div className="grid-3 services-grid">
            {services.map(({ icon, title, desc }) => (
              <div key={title} className="service-item card">
                <span className="service-icon">{icon}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-3">
            <Link to="/leistungen" className="btn btn-primary">Alle Leistungen ansehen →</Link>
          </div>
        </div>
      </section>

      {/* ANAMNESE CTA */}
      <section className="section anamnese-cta-section">
        <div className="container anamnese-cta">
          <div className="anamnese-cta-text">
            <span className="badge">Neupatienten</span>
            <h2>Digitaler Anamnesebogen</h2>
            <p>
              Als Neupatient können Sie unseren digitalen Anamnesebogen bequem von zu Hause ausfüllen.
              So wird Ihr erster Termin noch effizienter – für Sie und für uns.
            </p>
          </div>
          <div className="anamnese-cta-actions">
            <Link to="/anamnese" className="btn btn-primary">
              📋 Anamnesebogen ausfüllen
            </Link>
            <Link to="/termin" className="btn btn-outline">
              Termin vereinbaren
            </Link>
          </div>
        </div>
      </section>

      {/* TEAM TEASER */}
      <section className="section team-teaser" style={{ background: 'var(--gray-50)' }}>
        <div className="container text-center">
          <span className="badge mb-2">Das Team</span>
          <h2 className="section-title">Wir freuen uns auf Sie</h2>
          <p className="section-subtitle">
            Dr. Brandelik und sein Team stehen Ihnen mit Fachkompetenz und Herzlichkeit zur Seite.
          </p>
          <Link to="/team" className="btn btn-primary">Team kennenlernen →</Link>
        </div>
      </section>
    </>
  )
}
