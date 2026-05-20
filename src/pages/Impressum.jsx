import './Legal.css'

export default function Impressum() {
  return (
    <>
      <div className="page-hero" style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="container page-hero-inner">
          <span className="badge">Rechtliches</span>
          <h1 className="section-title">Impressum</h1>
        </div>
      </div>
      <section className="section">
        <div className="container legal-content">
          <h2>Angaben gemäß § 5 TMG</h2>
          <address>
            Dr. med. [Vorname] Brandelik<br />
            Hausarztpraxis Dr. Brandelik<br />
            Musterstraße 12<br />
            12345 Musterstadt
          </address>

          <h2>Kontakt</h2>
          <p>
            Telefon: 01234 / 56789<br />
            Fax: 01234 / 56780<br />
            E-Mail: info@praxis-brandelik.de
          </p>

          <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
          <p>
            Berufsbezeichnung: Arzt<br />
            Zuständige Kammer: Ärztekammer [Bundesland]<br />
            Zuständige Aufsichtsbehörde: Kassenärztliche Vereinigung [Bundesland]<br />
            Verliehen in: Deutschland
          </p>
          <p>
            Es gelten folgende berufsrechtliche Regelungen:
          </p>
          <ul>
            <li>Bundesärzteordnung (BÄO)</li>
            <li>Berufsordnung der Ärztekammer [Bundesland]</li>
            <li>Gebührenordnung für Ärzte (GOÄ)</li>
          </ul>

          <h2>Umsatzsteuer-ID</h2>
          <p>
            Ärztliche Leistungen sind gemäß § 4 Nr. 14 UStG von der Umsatzsteuer befreit.
          </p>

          <h2>Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            https://ec.europa.eu/consumers/odr/. Wir sind nicht verpflichtet und nicht bereit, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h2>Haftung für Inhalte</h2>
          <p>
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
            Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            Die medizinischen Informationen auf dieser Website ersetzen keine ärztliche Beratung
            oder Behandlung.
          </p>
        </div>
      </section>
    </>
  )
}
