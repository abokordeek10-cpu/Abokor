import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="notfound" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="container notfound-inner">
        <div className="notfound-code">404</div>
        <h1>Seite nicht gefunden</h1>
        <p>Die gesuchte Seite existiert nicht oder wurde verschoben.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">Zur Startseite</Link>
          <Link to="/kontakt" className="btn btn-outline">Kontakt</Link>
        </div>
      </div>
    </div>
  )
}
