// ─────────────────────────────────────────────────────────────
//  Zentrale Einstellungen der Website.
//  Alles, was du später ausfüllen musst, steht hier an EINEM Ort.
// ─────────────────────────────────────────────────────────────

// TODO: N8N – URL deines n8n-Webhooks für das Kontaktformular eintragen,
// z. B. 'https://n8n.abora-automation.de/webhook/erstgespraech'
// Solange hier der Platzhalter steht, zeigt das Formular eine Fehlermeldung.
export const N8N_WEBHOOK_URL = '[N8N_WEBHOOK_URL]';

// TODO: KALENDER – Link zur Online-Terminbuchung (z. B. Cal.com).
// Leer lassen, solange es keinen gibt: Dann wird der Kalender-Block ausgeblendet.
export const KALENDER_URL = '';

// TODO: KONTAKT – echte Kontaktdaten eintragen.
export const KONTAKT = {
  email: '[E-MAIL]',
  telefon: '[TELEFON]',
  strasse: '[STRASSE UND HAUSNUMMER]',
  plz: '[PLZ]',
  ort: 'Mannheim',
};

// TODO: PREIS – Preise eintragen, sobald sie feststehen.
export const PREISE = {
  start: { aufbau: 'ab [PREIS] € einmalig', monat: 'ab [PREIS] € / Monat' },
  komplett: { aufbau: 'ab [PREIS] € einmalig', monat: 'ab [PREIS] € / Monat' },
  hinweis: '[netto zzgl. MwSt. / Kleinunternehmer-Hinweis]',
};

export const FIRMA = {
  name: 'Abora Automation',
  domain: 'abora-automation.de',
  url: 'https://abora-automation.de',
  slogan: 'Du machst das Handwerk. Wir machen den Rest.',
};

export const CTA_TEXT = 'Kostenloses Erstgespräch';
export const CTA_LINK = '/kontakt';

export const NAVIGATION = [
  { href: '/leistungen', text: 'Leistungen' },
  { href: '/fuer-wen', text: 'Für wen' },
  { href: '/ablauf', text: 'So arbeiten wir' },
  { href: '/preise', text: 'Preise' },
  { href: '/ueber-uns', text: 'Über uns' },
  { href: '/ratgeber', text: 'Ratgeber' },
];

export const GEWERKE = [
  'Sanitär / Heizung / Klima',
  'Elektro',
  'Dachdecker',
  'Maler / Lackierer',
  'Tischler / Schreiner',
  'Garten- und Landschaftsbau',
  'Fliesenleger',
  'Trockenbau / Innenausbau',
  'Zimmerei',
  'Anderes Gewerk',
];
