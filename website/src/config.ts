// ─────────────────────────────────────────────────────────────
//  Zentrale Einstellungen der Website.
//  Alles, was du später ausfüllen musst, steht hier an EINEM Ort.
// ─────────────────────────────────────────────────────────────

// URL des n8n-Webhooks für das Kontaktformular.
export const N8N_WEBHOOK_URL = 'https://n8n.abora-automation.de/webhook/8b0fcd17-200f-4859-879c-613198143e88';

// Live-Demo: n8n-Webhook des Workflows „Abora Demo KI“ (siehe n8n/abora-demo-workflow.json)
export const DEMO_WEBHOOK_URL = 'https://n8n.abora-automation.de/webhook/abora-demo';

// TODO: KALENDER – Link zur Online-Terminbuchung (z. B. Cal.com).
// Leer lassen, solange es keinen gibt: Dann wird der Kalender-Block ausgeblendet.
export const KALENDER_URL = '';

export const KONTAKT = {
  inhaber: 'Abokor Deek Osman',
  email: 'abokorosman@abora-automation.de',
  telefon: '0176 87823235',
  telefonLink: '+4917687823235',
  strasse: 'Werkstraße 29',
  plz: '68519',
  ort: 'Viernheim',
};

export const PREISE = {
  start: { aufbau: 'ab 990 € einmalig', monat: 'ab 149 € / Monat' },
  komplett: { aufbau: 'ab 2.490 € einmalig', monat: 'ab 299 € / Monat' },
  hinweis: 'Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.',
};

export const PILOTANGEBOT =
  'Die ersten 3 Betriebe bekommen den Aufbau zum halben Preis. Dafür gibst du uns ehrliches Feedback und wir dürfen dich als Referenz nennen, wenn du zufrieden bist.';

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
