import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Contact.css'

export default function Contact() {
  const [status, setStatus] = useState(null)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <div className="page-hero" style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="container page-hero-inner">
          <span className="badge">Kontakt</span>
          <h1 className="section-title">So erreichen Sie uns</h1>
          <p className="section-subtitle">
            Wir freuen uns auf Ihre Nachricht. Für dringende Anliegen rufen Sie uns bitte direkt an.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container contact-layout">

          {/* INFO COLUMN */}
          <div className="contact-info">
            <div className="contact-info-card card">
              <h2>Praxisdaten</h2>
              <div className="contact-info-item">
                <span className="contact-info-icon">📍</span>
                <div>
                  <strong>Adresse</strong>
                  <p>Musterstraße 12<br />12345 Musterstadt</p>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-icon">📞</span>
                <div>
                  <strong>Telefon</strong>
                  <p><a href="tel:+4912345678">01234 / 56789</a></p>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-icon">✉</span>
                <div>
                  <strong>E-Mail</strong>
                  <p><a href="mailto:info@praxis-brandelik.de">info@praxis-brandelik.de</a></p>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-icon">🕐</span>
                <div>
                  <strong>Öffnungszeiten</strong>
                  <table className="hours-table">
                    <tbody>
                      <tr><td>Montag</td><td>08:00–12:00, 15:00–18:00</td></tr>
                      <tr><td>Dienstag</td><td>08:00–12:00, 15:00–18:00</td></tr>
                      <tr><td>Mittwoch</td><td>08:00–12:00</td></tr>
                      <tr><td>Donnerstag</td><td>08:00–12:00, 15:00–18:00</td></tr>
                      <tr><td>Freitag</td><td>08:00–12:00</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="contact-notice">
              <strong>⚠️ Notfall?</strong>
              <p>
                Bei medizinischen Notfällen wählen Sie <strong>112</strong> oder den
                ärztlichen Bereitschaftsdienst unter <strong>116 117</strong>.
              </p>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="contact-form-col">
            <div className="contact-form-card card">
              <h2>Nachricht senden</h2>
              <p className="contact-form-note">
                Bitte beachten Sie: Senden Sie keine medizinisch sensiblen Informationen über
                dieses Formular. Für Befunde oder Rezeptanfragen rufen Sie uns an.
              </p>

              {status === 'success' && (
                <div className="success-box">
                  ✓ Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns zeitnah.
                </div>
              )}
              {status === 'error' && (
                <div className="error-box">
                  Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns an.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid-2">
                  <div className="form-group">
                    <label htmlFor="firstName">Vorname *</label>
                    <input
                      id="firstName"
                      type="text"
                      className={errors.firstName ? 'error' : ''}
                      {...register('firstName', { required: 'Pflichtfeld' })}
                    />
                    {errors.firstName && <span className="form-error">{errors.firstName.message}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Nachname *</label>
                    <input
                      id="lastName"
                      type="text"
                      className={errors.lastName ? 'error' : ''}
                      {...register('lastName', { required: 'Pflichtfeld' })}
                    />
                    {errors.lastName && <span className="form-error">{errors.lastName.message}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-Mail-Adresse *</label>
                  <input
                    id="email"
                    type="email"
                    className={errors.email ? 'error' : ''}
                    {...register('email', {
                      required: 'Pflichtfeld',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Ungültige E-Mail-Adresse' }
                    })}
                  />
                  {errors.email && <span className="form-error">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Telefonnummer (optional)</label>
                  <input id="phone" type="tel" {...register('phone')} />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Betreff *</label>
                  <select
                    id="subject"
                    className={errors.subject ? 'error' : ''}
                    {...register('subject', { required: 'Bitte wählen' })}
                  >
                    <option value="">Bitte auswählen …</option>
                    <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
                    <option value="Rezeptanfrage">Rezeptanfrage</option>
                    <option value="Überweisungsanfrage">Überweisungsanfrage</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Sonstiges">Sonstiges</option>
                  </select>
                  {errors.subject && <span className="form-error">{errors.subject.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Nachricht *</label>
                  <textarea
                    id="message"
                    rows={5}
                    className={errors.message ? 'error' : ''}
                    placeholder="Ihr Anliegen…"
                    {...register('message', { required: 'Pflichtfeld', minLength: { value: 10, message: 'Mindestens 10 Zeichen' } })}
                  />
                  {errors.message && <span className="form-error">{errors.message.message}</span>}
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      className={errors.privacy ? 'error' : ''}
                      {...register('privacy', { required: 'Zustimmung erforderlich' })}
                    />
                    <span>
                      Ich habe die <Link to="/datenschutz" target="_blank" rel="noopener">Datenschutzerklärung</Link> gelesen
                      und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu. *
                    </span>
                  </label>
                  {errors.privacy && <span className="form-error">{errors.privacy.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary contact-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Wird gesendet…' : '✉ Nachricht senden'}
                </button>
                <p className="contact-mandatory">* Pflichtfelder</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
