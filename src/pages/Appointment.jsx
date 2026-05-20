import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { addDays, format, isWeekend, startOfTomorrow } from 'date-fns'
import { de } from 'date-fns/locale'
import './Appointment.css'

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
]

function getAvailableDates(count = 14) {
  const dates = []
  let d = startOfTomorrow()
  while (dates.length < count) {
    if (!isWeekend(d)) dates.push(new Date(d))
    d = addDays(d, 1)
  }
  return dates
}

export default function Appointment() {
  const [status, setStatus] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const dates = getAvailableDates()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    if (!selectedDate) return
    const payload = { ...data, date: format(selectedDate, 'dd.MM.yyyy') }
    try {
      const res = await fetch('/api/appointment.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setStatus('success')
        reset()
        setSelectedDate(null)
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
          <span className="badge">Online-Terminbuchung</span>
          <h1 className="section-title">Termin vereinbaren</h1>
          <p className="section-subtitle">
            Wählen Sie Ihren Wunschtermin. Wir bestätigen innerhalb eines Werktages per E-Mail.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container appt-layout">

          {/* STEP INFO */}
          <div className="appt-steps">
            <div className="appt-steps-inner card">
              <h2>So läuft die Buchung ab</h2>
              <ol className="steps-list">
                <li><span>1</span><div><strong>Datum wählen</strong><p>Wählen Sie einen freien Termin aus dem Kalender.</p></div></li>
                <li><span>2</span><div><strong>Uhrzeit wählen</strong><p>Wählen Sie Ihre gewünschte Uhrzeit.</p></div></li>
                <li><span>3</span><div><strong>Daten eingeben</strong><p>Geben Sie Ihre Kontaktdaten und den Grund Ihres Besuchs an.</p></div></li>
                <li><span>4</span><div><strong>Bestätigung erhalten</strong><p>Sie erhalten eine Bestätigung per E-Mail innerhalb eines Werktages.</p></div></li>
              </ol>
              <div className="appt-notice">
                <strong>📞 Alternativ anrufen:</strong>
                <p><a href="tel:+4912345678">01234 / 56789</a></p>
                <p>Mo–Fr: 08:00–12:00 Uhr</p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="appt-form-col">
            {status === 'success' ? (
              <div className="appt-success card">
                <div className="appt-success-icon">✓</div>
                <h2>Terminanfrage gesendet!</h2>
                <p>
                  Ihre Anfrage ist eingegangen. Wir bestätigen Ihren Termin innerhalb eines Werktages
                  per E-Mail. Bei Fragen rufen Sie uns gerne an.
                </p>
                <button className="btn btn-primary" onClick={() => setStatus(null)}>
                  Weiteren Termin anfragen
                </button>
              </div>
            ) : (
              <form className="appt-form card" onSubmit={handleSubmit(onSubmit)} noValidate>
                <h2>Termin anfragen</h2>

                {status === 'error' && (
                  <div className="error-box">
                    Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder rufen Sie an.
                  </div>
                )}

                {/* DATE PICKER */}
                <div className="appt-section">
                  <h3>1. Datum wählen *</h3>
                  <div className="date-grid">
                    {dates.map(d => (
                      <button
                        key={d.toISOString()}
                        type="button"
                        className={`date-btn${selectedDate?.toISOString() === d.toISOString() ? ' selected' : ''}`}
                        onClick={() => setSelectedDate(d)}
                      >
                        <span className="date-btn-day">{format(d, 'EEE', { locale: de })}</span>
                        <span className="date-btn-num">{format(d, 'd')}</span>
                        <span className="date-btn-month">{format(d, 'MMM', { locale: de })}</span>
                      </button>
                    ))}
                  </div>
                  {!selectedDate && status === 'error' && (
                    <span className="form-error">Bitte Datum wählen</span>
                  )}
                </div>

                {/* TIME PICKER */}
                <div className="appt-section">
                  <h3>2. Uhrzeit wählen *</h3>
                  <div className="time-grid">
                    {timeSlots.map(t => (
                      <label key={t} className="time-label">
                        <input type="radio" value={t} {...register('time', { required: true })} />
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                  {errors.time && <span className="form-error">Bitte Uhrzeit wählen</span>}
                </div>

                {/* REASON */}
                <div className="appt-section">
                  <h3>3. Anliegen</h3>
                  <div className="form-group">
                    <label htmlFor="reason">Grund des Termins *</label>
                    <select
                      id="reason"
                      className={errors.reason ? 'error' : ''}
                      {...register('reason', { required: 'Pflichtfeld' })}
                    >
                      <option value="">Bitte auswählen …</option>
                      <option value="Erstvorstellung (Neupatient)">Erstvorstellung (Neupatient)</option>
                      <option value="Akute Erkrankung">Akute Erkrankung</option>
                      <option value="Vorsorgeuntersuchung / Check-up">Vorsorgeuntersuchung / Check-up</option>
                      <option value="Chronische Erkrankung (Folgetermin)">Chronische Erkrankung (Folgetermin)</option>
                      <option value="Impfung">Impfung</option>
                      <option value="Laborergebnisse besprechen">Laborergebnisse besprechen</option>
                      <option value="Überweisung / Attest">Überweisung / Attest</option>
                      <option value="Sonstiges">Sonstiges</option>
                    </select>
                    {errors.reason && <span className="form-error">{errors.reason.message}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="notes">Anmerkungen (optional)</label>
                    <textarea id="notes" rows={3} placeholder="Weitere Hinweise für uns…" {...register('notes')} />
                  </div>
                </div>

                {/* PATIENT DATA */}
                <div className="appt-section">
                  <h3>4. Ihre Daten</h3>
                  <div className="grid-2">
                    <div className="form-group">
                      <label htmlFor="firstName">Vorname *</label>
                      <input id="firstName" type="text" className={errors.firstName ? 'error' : ''}
                        {...register('firstName', { required: 'Pflichtfeld' })} />
                      {errors.firstName && <span className="form-error">{errors.firstName.message}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Nachname *</label>
                      <input id="lastName" type="text" className={errors.lastName ? 'error' : ''}
                        {...register('lastName', { required: 'Pflichtfeld' })} />
                      {errors.lastName && <span className="form-error">{errors.lastName.message}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="dob">Geburtsdatum *</label>
                    <input id="dob" type="date" className={errors.dob ? 'error' : ''}
                      {...register('dob', { required: 'Pflichtfeld' })} />
                    {errors.dob && <span className="form-error">{errors.dob.message}</span>}
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label htmlFor="phone">Telefon *</label>
                      <input id="phone" type="tel" className={errors.phone ? 'error' : ''}
                        {...register('phone', { required: 'Pflichtfeld' })} />
                      {errors.phone && <span className="form-error">{errors.phone.message}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">E-Mail *</label>
                      <input id="email" type="email" className={errors.email ? 'error' : ''}
                        {...register('email', {
                          required: 'Pflichtfeld',
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Ungültig' }
                        })} />
                      {errors.email && <span className="form-error">{errors.email.message}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="insurance">Versicherung *</label>
                    <select id="insurance" className={errors.insurance ? 'error' : ''}
                      {...register('insurance', { required: 'Pflichtfeld' })}>
                      <option value="">Bitte auswählen …</option>
                      <option value="Gesetzlich versichert (GKV)">Gesetzlich versichert (GKV)</option>
                      <option value="Privat versichert (PKV)">Privat versichert (PKV)</option>
                      <option value="Selbstzahler">Selbstzahler</option>
                    </select>
                    {errors.insurance && <span className="form-error">{errors.insurance.message}</span>}
                  </div>
                </div>

                {/* PRIVACY */}
                <div className="form-group">
                  <label className="checkbox-label">
                    <input type="checkbox" className={errors.privacy ? 'error' : ''}
                      {...register('privacy', { required: 'Zustimmung erforderlich' })} />
                    <span>
                      Ich habe die <Link to="/datenschutz" target="_blank" rel="noopener">Datenschutzerklärung</Link> gelesen
                      und stimme der Verarbeitung meiner Daten zur Terminverwaltung zu. *
                    </span>
                  </label>
                  {errors.privacy && <span className="form-error">{errors.privacy.message}</span>}
                </div>

                <button type="submit" className="btn btn-accent appt-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Wird gesendet…' : '📅 Termin anfragen'}
                </button>
                <p className="contact-mandatory">* Pflichtfelder</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
