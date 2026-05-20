import './Legal.css'

export default function Datenschutz() {
  return (
    <>
      <div className="page-hero" style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="container page-hero-inner">
          <span className="badge">DSGVO</span>
          <h1 className="section-title">Datenschutzerklärung</h1>
          <p className="section-subtitle">Stand: Mai 2025</p>
        </div>
      </div>
      <section className="section">
        <div className="container legal-content">

          <h2>1. Verantwortlicher</h2>
          <p>
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und anderer nationaler
            Datenschutzgesetze sowie sonstiger datenschutzrechtlicher Bestimmungen ist:
          </p>
          <address>
            Dr. med. [Vorname] Brandelik<br />
            Hausarztpraxis Dr. Brandelik<br />
            Musterstraße 12, 12345 Musterstadt<br />
            Telefon: 01234 / 56789<br />
            E-Mail: info@praxis-brandelik.de
          </address>

          <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
          <p>
            Beim Besuch unserer Website werden durch den Webserver automatisch Informationen
            (sogenannte Server-Logfiles) gespeichert, die Ihr Browser automatisch übermittelt.
            Dies sind: Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL,
            Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage sowie die IP-Adresse.
            Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser
            Daten mit anderen Datenquellen wird nicht vorgenommen.
          </p>

          <h2>3. Kontaktformular & Terminbuchung</h2>
          <p>
            Wenn Sie uns per Kontaktformular oder Terminbuchungsformular Anfragen zukommen lassen,
            werden Ihre Angaben zur Bearbeitung der Anfrage und für den Fall von Anschlussfragen
            bei uns gespeichert. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
            DSGVO (Vertragserfüllung) bzw. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
          </p>
          <p>
            Die von Ihnen eingegebenen Daten werden nach vollständiger Bearbeitung Ihrer Anfrage
            gelöscht, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>

          <h2>4. Anamnesebogen</h2>
          <p>
            Daten, die Sie über den digitalen Anamnesebogen übermitteln, werden als Gesundheitsdaten
            gemäß Art. 9 DSGVO besonders geschützt behandelt. Die Verarbeitung erfolgt ausschließlich
            zum Zweck der Durchführung der ärztlichen Behandlung auf Grundlage von Art. 9 Abs. 2 lit.
            h DSGVO. Die Übertragung erfolgt verschlüsselt (HTTPS/TLS).
          </p>

          <h2>5. Cookies</h2>
          <p>
            Unsere Website verwendet ausschließlich technisch notwendige Cookies zur Speicherung
            Ihrer Cookie-Präferenz. Es werden keine Tracking-, Analyse- oder Werbe-Cookies eingesetzt.
            Für die technisch notwendigen Cookies ist keine gesonderte Einwilligung erforderlich
            (§ 25 Abs. 2 TTDSG).
          </p>

          <h2>6. Ihre Rechte</h2>
          <p>Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
          <ul>
            <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
            <li>Recht auf Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
          </ul>
          <p>
            Sie haben außerdem das Recht, sich bei einer Datenschutzaufsichtsbehörde über die
            Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
          </p>

          <h2>7. Datensicherheit</h2>
          <p>
            Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten
            gegen Manipulation, Verlust, Zerstörung oder den Zugriff unberechtigter Personen zu
            schützen. Die Übertragung erfolgt über eine HTTPS-verschlüsselte Verbindung (TLS).
          </p>

          <h2>8. Keine Weitergabe an Dritte</h2>
          <p>
            Ihre personenbezogenen Daten werden nicht an Dritte weitergegeben, sofern dies nicht
            zur Vertragserfüllung erforderlich ist oder Sie ausdrücklich eingewilligt haben.
            Eine Übermittlung an Drittstaaten (außerhalb der EU/EWR) findet nicht statt.
          </p>
        </div>
      </section>
    </>
  )
}
