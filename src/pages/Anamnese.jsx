import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Anamnese.css'

const conditions = [
  'Bluthochdruck', 'Diabetes mellitus', 'Herzerkrankung', 'Herzrhythmusstörungen',
  'Asthma / COPD', 'Schilddrüsenerkrankung', 'Nierenerkrankung', 'Lebererkrankung',
  'Epilepsie', 'Depression / Angststörung', 'Rheuma / Gelenkerkrankung', 'Osteoporose',
  'Tumorerkrankung (in Behandlung)', 'Tumorerkrankung (abgeschlossen)',
]

const allergies = [
  'Penicillin', 'Sulfonamide', 'Aspirin / NSAIDs', 'Jod', 'Latex',
  'Kontrastmittel', 'Pollen / Heuschnupfen', 'Nahrungsmittel', 'Hausstaub / Milben',
]

export default function Anamnese() {
  const [status, setStatus] = useState(null)
  const [step, setStep] = useState(1)
  const { register, handleSubmit, reset, getValues, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/anamnese.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
        reset()
        setStep(1)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="anamnese-page" style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="container">
          <div className="anamnese-success card">
            <div className="anamnese-success-icon">✓</div>
            <h2>Anamnesebogen übermittelt!</h2>
            <p>
              Vielen Dank. Ihr Anamnesebogen wurde sicher übermittelt. Bitte bringen Sie beim ersten
              Termin noch Ihre Krankenversicherungskarte und ein Ausweisdokument mit.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/termin" className="btn btn-accent">Termin buchen</Link>
              <Link to="/" className="btn btn-outline">Zur Startseite</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="page-hero" style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="container page-hero-inner">
          <span className="badge">Neupatienten</span>
          <h1 className="section-title">Digitaler Anamnesebogen</h1>
          <p className="section-subtitle">
            Füllen Sie diesen Bogen bitte vor Ihrem ersten Besuch aus. Die Informationen helfen uns, Sie optimal zu betreuen.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Progress */}
          <div className="anamnese-progress">
            {[1,2,3].map(s => (
              <div key={s} className={`progress-step${step === s ? ' active' : ''}${step > s ? ' done' : ''}`}>
                <span>{step > s ? '✓' : s}</span>
                <p>{s === 1 ? 'Persönliche Daten' : s === 2 ? 'Medizinische Geschichte' : 'Abschluss'}</p>
              </div>
            ))}
          </div>

          <form className="anamnese-form card" onSubmit={handleSubmit(onSubmit)} noValidate>

            {status === 'error' && (
              <div className="error-box">Senden fehlgeschlagen. Bitte versuchen Sie es erneut.</div>
            )}

            {/* STEP 1: PERSONAL DATA */}
            {step === 1 && (
              <div className="anamnese-step">
                <h2>Persönliche Angaben</h2>
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
                <div className="grid-2">
                  <div className="form-group">
                    <label htmlFor="dob">Geburtsdatum *</label>
                    <input id="dob" type="date" className={errors.dob ? 'error' : ''}
                      {...register('dob', { required: 'Pflichtfeld' })} />
                    {errors.dob && <span className="form-error">{errors.dob.message}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Geschlecht</label>
                    <select id="gender" {...register('gender')}>
                      <option value="">Keine Angabe</option>
                      <option value="m">Männlich</option>
                      <option value="f">Weiblich</option>
                      <option value="d">Divers</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Adresse</label>
                  <input id="address" type="text" placeholder="Straße, Hausnummer, PLZ, Ort" {...register('address')} />
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label htmlFor="phone">Telefon *</label>
                    <input id="phone" type="tel" className={errors.phone ? 'error' : ''}
                      {...register('phone', { required: 'Pflichtfeld' })} />
                    {errors.phone && <span className="form-error">{errors.phone.message}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-Mail</label>
                    <input id="email" type="email" {...register('email')} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="insurance">Krankenkasse *</label>
                  <input id="insurance" type="text" placeholder="z.B. AOK, TK, Barmer, privat …"
                    className={errors.insurance ? 'error' : ''}
                    {...register('insurance', { required: 'Pflichtfeld' })} />
                  {errors.insurance && <span className="form-error">{errors.insurance.message}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="emergencyContact">Notfallkontakt (Name & Telefon)</label>
                  <input id="emergencyContact" type="text" placeholder="z.B. Maria Muster, 0123 456789"
                    {...register('emergencyContact')} />
                </div>
                <button type="button" className="btn btn-primary anamnese-next" onClick={() => setStep(2)}>
                  Weiter → Medizinische Geschichte
                </button>
              </div>
            )}

            {/* STEP 2: MEDICAL HISTORY */}
            {step === 2 && (
              <div className="anamnese-step">
                <h2>Medizinische Vorgeschichte</h2>

                <div className="anamnese-section">
                  <h3>Vorerkrankungen</h3>
                  <p className="anamnese-hint">Bitte markieren Sie alle zutreffenden Erkrankungen:</p>
                  <div className="checkbox-grid">
                    {conditions.map(c => (
                      <label key={c} className="check-item">
                        <input type="checkbox" value={c} {...register('conditions')} />
                        <span>{c}</span>
                      </label>
                    ))}
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="conditionsOther">Weitere Erkrankungen</label>
                    <textarea id="conditionsOther" rows={2} placeholder="Weitere Diagnosen…" {...register('conditionsOther')} />
                  </div>
                </div>

                <div className="anamnese-section">
                  <h3>Allergien & Unverträglichkeiten</h3>
                  <div className="checkbox-grid">
                    {allergies.map(a => (
                      <label key={a} className="check-item">
                        <input type="checkbox" value={a} {...register('allergies')} />
                        <span>{a}</span>
                      </label>
                    ))}
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="allergiesOther">Weitere Allergien</label>
                    <textarea id="allergiesOther" rows={2} placeholder="Sonstige Allergien oder Unverträglichkeiten…" {...register('allergiesOther')} />
                  </div>
                </div>

                <div className="anamnese-section">
                  <h3>Aktuelle Medikamente</h3>
                  <div className="form-group">
                    <label htmlFor="medications">Medikamentenliste</label>
                    <textarea id="medications" rows={4}
                      placeholder="Name, Dosierung, Häufigkeit (z.B. Metformin 500mg 2x täglich)…"
                      {...register('medications')} />
                  </div>
                </div>

                <div className="anamnese-section">
                  <h3>Operationen & Krankenhausaufenthalte</h3>
                  <div className="form-group">
                    <label htmlFor="surgeries">Bisherige Operationen / stationäre Aufenthalte</label>
                    <textarea id="surgeries" rows={3} placeholder="Beschreibung und ungefähres Jahr…" {...register('surgeries')} />
                  </div>
                </div>

                <div className="anamnese-section">
                  <h3>Familienanamnese</h3>
                  <div className="form-group">
                    <label htmlFor="familyHistory">Relevante Erkrankungen in der Familie</label>
                    <textarea id="familyHistory" rows={3}
                      placeholder="z.B. Herzerkrankung (Vater), Diabetes (Mutter)…"
                      {...register('familyHistory')} />
                  </div>
                </div>

                <div className="anamnese-section">
                  <h3>Aktuelle Beschwerden</h3>
                  <div className="form-group">
                    <label htmlFor="currentComplaints">Weshalb kommen Sie zu uns? *</label>
                    <textarea id="currentComplaints" rows={4}
                      className={errors.currentComplaints ? 'error' : ''}
                      placeholder="Beschreiben Sie Ihre aktuellen Beschwerden oder Ihr Anliegen…"
                      {...register('currentComplaints', { required: 'Pflichtfeld' })} />
                    {errors.currentComplaints && <span className="form-error">{errors.currentComplaints.message}</span>}
                  </div>
                </div>

                <div className="anamnese-section">
                  <h3>Lebensstil</h3>
                  <div className="grid-2">
                    <div className="form-group">
                      <label htmlFor="smoking">Rauchen</label>
                      <select id="smoking" {...register('smoking')}>
                        <option value="">Keine Angabe</option>
                        <option value="Nichtraucher">Nichtraucher</option>
                        <option value="Ex-Raucher">Ex-Raucher</option>
                        <option value="Raucher">Raucher</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="alcohol">Alkohol</label>
                      <select id="alcohol" {...register('alcohol')}>
                        <option value="">Keine Angabe</option>
                        <option value="Kein Alkohol">Kein Alkohol</option>
                        <option value="Gelegentlich">Gelegentlich</option>
                        <option value="Regelmäßig">Regelmäßig</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="anamnese-nav">
                  <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>← Zurück</button>
                  <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>Weiter → Abschluss</button>
                </div>
              </div>
            )}

            {/* STEP 3: FINISH */}
            {step === 3 && (
              <div className="anamnese-step">
                <h2>Abschluss & Einwilligung</h2>
                <div className="anamnese-summary">
                  <p>Bitte überprüfen Sie Ihre Angaben und bestätigen Sie die Datenschutzerklärung.</p>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input type="checkbox" className={errors.privacy ? 'error' : ''}
                      {...register('privacy', { required: 'Zustimmung erforderlich' })} />
                    <span>
                      Ich habe die <Link to="/datenschutz" target="_blank" rel="noopener">Datenschutzerklärung</Link> gelesen.
                      Ich stimme zu, dass meine hier angegebenen Daten zur Durchführung der ärztlichen Behandlung
                      gespeichert und verarbeitet werden. Diese Einwilligung kann ich jederzeit widerrufen. *
                    </span>
                  </label>
                  {errors.privacy && <span className="form-error">{errors.privacy.message}</span>}
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input type="checkbox" {...register('accuracy')} />
                    <span>
                      Ich bestätige, dass alle Angaben nach bestem Wissen und Gewissen gemacht wurden.
                    </span>
                  </label>
                </div>

                <div className="anamnese-nav">
                  <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>← Zurück</button>
                  <button type="submit" className="btn btn-accent" disabled={isSubmitting}>
                    {isSubmitting ? 'Wird gesendet…' : '✓ Anamnesebogen absenden'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  )
}
