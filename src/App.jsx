import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import Team from './pages/Team'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import Anamnese from './pages/Anamnese'
import Datenschutz from './pages/Datenschutz'
import Impressum from './pages/Impressum'
import NotFound from './pages/NotFound'

export default function App() {
  const [cookiesAccepted, setCookiesAccepted] = useState(null)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (consent) setCookiesAccepted(consent === 'accepted')
  }, [])

  return (
    <>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/leistungen" element={<Services />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/termin" element={<Appointment />} />
          <Route path="/anamnese" element={<Anamnese />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {cookiesAccepted === null && (
        <CookieBanner onAccept={() => setCookiesAccepted(true)} onDecline={() => setCookiesAccepted(false)} />
      )}
    </>
  )
}
