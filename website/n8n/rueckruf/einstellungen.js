// ─────────────────────────────────────────────────────────────
//  Abora Rückruf – EINSTELLUNGEN (hier pflegst du Kunden und Nummern)
//  Diese Datei wird beim Bauen in beide Code-Knoten eingesetzt.
//  Keine Passwörter oder Tokens hier eintragen! Die liegen nur als
//  „Twilio“-Zugang (Credential) in n8n.
// ─────────────────────────────────────────────────────────────
const EINSTELLUNGEN = {
  // Twilio-Konto-ID (beginnt mit AC…). Ist kein Geheimnis, schützt nur vor fremden Aufrufen.
  twilioKonto: 'HIER_ACCOUNT_SID_EINTRAGEN',
  // Die gemeinsame Mobilnummer, von der alle SMS an Anrufer rausgehen (Format +4915…).
  smsNummer: 'HIER_SMS_NUMMER_EINTRAGEN',
  // Wer Fehler und unbekannte Anrufe bekommt (Abokor).
  admin: 'HIER_DEINE_HANDYNUMMER_EINTRAGEN',
  // Ein Eintrag pro Kunde. Schlüssel = die Twilio-Nummer, auf die SEIN Handy weiterleitet.
  kunden: {
    // Beispiel / Demo: auf deine eigene Twilio-Nummer und dein Handy ändern
    '+49HIER_DEMO_NUMMER': {
      betrieb: 'Musterbetrieb Sanitär & Heizung',
      chef: '+49HIER_HANDY_DES_CHEFS',
      gewerk: 'Sanitär und Heizung',
      notfall: 'Wasserrohrbruch, Heizungsausfall im Winter, Gasgeruch',
    },
  },
  // Wie lange wir uns merken, welcher Anrufer zu welchem Betrieb gehört (Tage).
  merkenTage: 14,
};
