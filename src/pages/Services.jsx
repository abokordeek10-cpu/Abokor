import { Link } from 'react-router-dom'
import './Services.css'

const categories = [
  {
    title: 'Basisversorgung',
    icon: '🩺',
    items: [
      { name: 'Allgemeine Hausarztmedizin', desc: 'Diagnose und Behandlung aller häufigen Erkrankungen.' },
      { name: 'Akutversorgung', desc: 'Schnelle Hilfe bei plötzlichen Erkrankungen und Beschwerden.' },
      { name: 'Chronische Erkrankungen', desc: 'Langzeitbetreuung bei Diabetes, Bluthochdruck, Asthma u.v.m.' },
      { name: 'Notfallversorgung', desc: 'In dringenden Fällen sind wir für Sie da.' },
    ],
  },
  {
    title: 'Vorsorge & Prävention',
    icon: '🛡️',
    items: [
      { name: 'Gesundheits-Check-up 35+', desc: 'Alle 3 Jahre – umfassende Vorsorgeuntersuchung auf Kassenkosten.' },
      { name: 'Krebsfrüherkennung', desc: 'Screening-Untersuchungen für Männer und Frauen.' },
      { name: 'Impfungen', desc: 'Alle Schutzimpfungen nach aktuellem STIKO-Impfplan.' },
      { name: 'Reisemedizin', desc: 'Reiseimpfungen und Beratung für Ihre nächste Reise.' },
    ],
  },
  {
    title: 'Diagnostik',
    icon: '🔬',
    items: [
      { name: 'EKG', desc: 'Elektrokardiogramm zur Herzdiagnostik.' },
      { name: 'Ultraschall (Abdomen)', desc: 'Sonographie der Bauchorgane direkt in der Praxis.' },
      { name: 'Lungenfunktionstest', desc: 'Spirometrie zur Diagnostik von Atemwegserkrankungen.' },
      { name: 'Labordiagnostik', desc: 'Blutentnahme und Auswertung im Praxislabor.' },
    ],
  },
  {
    title: 'Spezialleistungen',
    icon: '⭐',
    items: [
      { name: 'Diabetiker-Schwerpunkt', desc: 'Spezialisierte Betreuung für Typ-1 und Typ-2 Diabetiker.' },
      { name: 'Kardiologische Basisversorgung', desc: 'Blutdruckmessung, EKG, Herzberatung.' },
      { name: 'Geriatrie', desc: 'Medizinische Versorgung älterer Patientinnen und Patienten.' },
      { name: 'Hausbesuche', desc: 'Bei Bedarf kommen wir auch zu Ihnen nach Hause.' },
    ],
  },
]

export default function Services() {
  return (
    <>
      <div className="page-hero" style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="container page-hero-inner">
          <span className="badge">Leistungen</span>
          <h1 className="section-title">Alles unter einem Dach</h1>
          <p className="section-subtitle">
            Von der Allgemeinmedizin bis zur spezialisierten Versorgung – wir bieten Ihnen eine breite Palette medizinischer Leistungen.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="services-categories">
            {categories.map(({ title, icon, items }) => (
              <div key={title} className="services-category">
                <div className="services-cat-header">
                  <span className="services-cat-icon">{icon}</span>
                  <h2>{title}</h2>
                </div>
                <div className="services-items">
                  {items.map(({ name, desc }) => (
                    <div key={name} className="services-item">
                      <div className="services-item-check">✓</div>
                      <div>
                        <h3>{name}</h3>
                        <p>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section services-cta-section">
        <div className="container text-center">
          <h2 className="section-title">Haben Sie Fragen zu unseren Leistungen?</h2>
          <p className="section-subtitle">Wir beraten Sie gerne persönlich in der Praxis oder telefonisch.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/termin" className="btn btn-accent">📅 Termin buchen</Link>
            <Link to="/kontakt" className="btn btn-outline">Kontakt aufnehmen</Link>
          </div>
        </div>
      </section>
    </>
  )
}
