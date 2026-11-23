// ─────────────────────────────────────────────────────────────
//  Abora Anfragen-Eingang – Betriebe
//  Pro Kunde ein Eintrag. Der Schlüssel (z. B. 'abora') ist die
//  Betriebs-Kennung, die das Formular als betrieb_id mitschickt.
//  Ohne betrieb_id gilt 'abora' (unser eigenes Kontaktformular).
// ─────────────────────────────────────────────────────────────
const BETRIEBE = {
  abora: {
    name: 'Abora Automation',
    gewerk: 'Büro-Automatisierung für Handwerksbetriebe',
    chefEmail: 'abokorosman@abora-automation.de',
    absender: 'Abora Automation <abokorosman@abora-automation.de>',
    notfall: 'gibt es hier nicht',
    // Diese Erstantwort hat der Inhaber freigegeben. Platzhalter: {vorname} {rueckruf} {telefon}
    erstantwort: {
      aktiv: true,
      betreff: 'Danke für deine Anfrage – Abora Automation',
      text: 'Hallo {vorname},\n\ndanke für deine Anfrage zum kostenlosen Büro-Check. Sie ist bei mir angekommen. Ich rufe dich {rueckruf} unter {telefon} zurück. Passt es dir dann doch nicht, antworte einfach auf diese E-Mail.\n\nViele Grüße\nAbokor Deek Osman\nAbora Automation · abora-automation.de\n\n(Automatische Nachricht)',
    },
  },
  // Beispiel für einen Kunden (zum Testen mit betrieb_id: 'test-sanitaer'):
  'test-sanitaer': {
    name: 'Sanitär Muster (Test)',
    gewerk: 'Sanitär und Heizung',
    chefEmail: 'abokorosman@abora-automation.de',
    absender: 'Sanitär Muster <abokorosman@abora-automation.de>',
    notfall: 'Rohrbruch, Wasser läuft, Heizung im Winter komplett ausgefallen, Gasgeruch',
    erstantwort: {
      aktiv: true,
      betreff: 'Ihre Anfrage bei Sanitär Muster',
      text: 'Guten Tag {vorname},\n\nvielen Dank für Ihre Anfrage. Sie ist bei uns angekommen. Wir melden uns so schnell wie möglich, in der Regel am selben Werktag.\n\nBei einem Notfall rufen Sie bitte direkt an.\n\nFreundliche Grüße\nSanitär Muster\n\n(Automatische Nachricht)',
    },
  },
};
