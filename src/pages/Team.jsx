import './Team.css'

const team = [
  {
    name: 'Dr. med. [Vorname] Brandelik',
    role: 'Facharzt für Allgemeinmedizin',
    qual: 'Ärztliche Leitung',
    desc: 'Dr. Brandelik ist seit über 20 Jahren als Hausarzt tätig und legt besonderen Wert auf eine persönliche, ganzheitliche Betreuung seiner Patienten.',
    skills: ['Allgemeinmedizin', 'Diabetologie', 'Kardiologie', 'Geriatrie'],
    initials: 'DB',
  },
  {
    name: 'Dr. med. [Vorname] Mustermann',
    role: 'Fachärztin für Allgemeinmedizin',
    qual: 'Stellvertretende Leitung',
    desc: 'Mit einem Schwerpunkt auf Präventivmedizin und Frauengesundheit ergänzt sie das Team optimal.',
    skills: ['Frauengesundheit', 'Prävention', 'Ernährungsmedizin'],
    initials: 'MM',
  },
  {
    name: 'Stefanie Berger, MFA',
    role: 'Medizinische Fachangestellte',
    qual: 'Praxismanagement',
    desc: 'Als Praxismanagerin sorgt Stefanie dafür, dass Ihre Besuche reibungslos verlaufen und alle Abläufe effizient sind.',
    skills: ['Praxisorganisation', 'Blutentnahme', 'EKG', 'Patientenbetreuung'],
    initials: 'SB',
  },
  {
    name: 'Julia Wagner, MFA',
    role: 'Medizinische Fachangestellte',
    qual: 'Empfang & Verwaltung',
    desc: 'Julia ist Ihre erste Ansprechpartnerin am Empfang und kümmert sich um Terminbuchungen und Anfragen.',
    skills: ['Empfang', 'Terminplanung', 'Abrechnung'],
    initials: 'JW',
  },
]

const colors = ['#1a5276', '#27ae60', '#2980b9', '#8e44ad']

export default function Team() {
  return (
    <>
      <div className="page-hero" style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="container page-hero-inner">
          <span className="badge">Unser Team</span>
          <h1 className="section-title">Menschen, denen Sie vertrauen können</h1>
          <p className="section-subtitle">
            Unser Team aus erfahrenen Ärzten und qualifizierten Fachkräften steht Ihnen mit Kompetenz und Herzlichkeit zur Seite.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="team-grid">
            {team.map(({ name, role, qual, desc, skills, initials }, i) => (
              <div key={name} className="team-card card">
                <div className="team-avatar" style={{ background: colors[i % colors.length] }}>
                  {initials}
                </div>
                <div className="team-card-body">
                  <span className="team-qual">{qual}</span>
                  <h2 className="team-name">{name}</h2>
                  <p className="team-role">{role}</p>
                  <p className="team-desc">{desc}</p>
                  <div className="team-skills">
                    {skills.map(s => (
                      <span key={s} className="team-skill-tag">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container text-center">
          <h2 className="section-title">Wir suchen Verstärkung</h2>
          <p className="section-subtitle">
            Interessieren Sie sich für eine Stelle in unserer Praxis? Wir freuen uns auf Ihre Bewerbung.
          </p>
          <a href="mailto:bewerbung@praxis-brandelik.de" className="btn btn-primary">
            Initiativbewerbung senden
          </a>
        </div>
      </section>
    </>
  )
}
