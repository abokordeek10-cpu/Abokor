// Inhalte, die auf mehreren Seiten vorkommen.

export const BAUSTEINE = [
  {
    id: 'anfragen',
    titel: 'Anfragen',
    icon: 'anfrage',
    kurz: 'Anrufe, WhatsApp, E-Mails und Website-Anfragen landen an einem Ort und werden sofort beantwortet. Auch wenn du auf der Baustelle bist.',
    ohne: 'Das Handy klingelt, während du auf der Leiter stehst. Die WhatsApp liest du abends um zehn. Bis du zurückrufst, hat der Kunde schon den Nächsten gefragt.',
    mit: 'Jede Anfrage bekommt in Minuten eine freundliche Antwort, egal ob per Telefon, WhatsApp, E-Mail oder über deine Website. Alles landet an einem Ort, nichts geht verloren.',
    meldung: { titel: 'Neue Anfrage', text: 'Automatisch beantwortet: Heizung fällt aus' },
  },
  {
    id: 'vorsortieren',
    titel: 'Vorsortieren',
    icon: 'filter',
    kurz: 'Die KI fragt Ort, Umfang, Budget und Fotos ab und sortiert nach Dringlichkeit. Nur passende Anfragen landen bei dir.',
    ohne: 'Du fährst 40 Minuten raus, und vor Ort stellt sich raus: Der Kunde will nur einen Preis zum Vergleichen, oder der Auftrag ist viel zu klein.',
    mit: 'Bevor eine Anfrage bei dir landet, sind Ort, Umfang, ungefähres Budget und Fotos schon da. Der Rohrbruch kommt nach oben, die Preisanfrage für „irgendwann mal“ nach unten.',
    meldung: { titel: 'Dringend: Rohrbruch', text: 'Fotos und Adresse liegen vor' },
  },
  {
    id: 'termine',
    titel: 'Termine',
    icon: 'kalender',
    kurz: 'Passende Kunden buchen direkt einen Besichtigungstermin in deinem Kalender.',
    ohne: 'Fünf Nachrichten hin und her, bis ein Termin steht. Und dann hast du ihn doch doppelt vergeben.',
    mit: 'Passende Kunden bekommen freie Zeiten aus deinem Kalender angeboten und buchen selbst. Am Vortag geht automatisch eine Erinnerung raus.',
    meldung: { titel: 'Termin gebucht', text: 'Besichtigung Di., 7:30 Uhr – Badsanierung' },
  },
  {
    id: 'angebote',
    titel: 'Angebote',
    icon: 'angebot',
    kurz: 'Aus deiner Sprachnotiz und den Fotos entsteht ein Angebotsentwurf. Du prüfst nur noch und schickst ab.',
    ohne: 'Die Angebote stapeln sich, weil du sie erst am Wochenende schreiben kannst. Bis dahin hat der Kunde längst woanders unterschrieben.',
    mit: 'Nach der Besichtigung sprichst du kurz ins Handy, was gemacht werden muss. Daraus entsteht ein Angebotsentwurf mit deinen Positionen und Preisen. Du prüfst, änderst, schickst ab.',
    meldung: { titel: 'Angebot vorbereitet', text: 'Entwurf aus deiner Sprachnotiz – bitte prüfen' },
  },
  {
    id: 'nachfassen',
    titel: 'Nachfassen',
    icon: 'nachfassen',
    kurz: 'Offene Angebote werden automatisch und freundlich nachverfolgt, damit kein Auftrag einschläft.',
    ohne: 'Das Angebot ist raus, und dann hörst du nichts mehr. Nachhaken fühlt sich komisch an, also lässt du es.',
    mit: 'Nach ein paar Tagen fragt eine freundliche Nachricht nach, ob noch Fragen offen sind. Der Kunde kann direkt zusagen oder einen Rückruf anfordern.',
    meldung: { titel: 'Angebot angenommen ✓', text: 'Kunde hat nach Erinnerung zugesagt' },
  },
  {
    id: 'bewertungen',
    titel: 'Bewertungen',
    icon: 'stern',
    kurz: 'Nach dem Auftrag gehen Rechnung, Zahlungserinnerung und Bewertungsanfrage automatisch raus.',
    ohne: 'Der Kunde war zufrieden, aber eine Bewertung schreibt er nie. Und die Rechnung schreibst du nach Feierabend.',
    mit: 'Ist der Auftrag erledigt, geht die Rechnung raus. Wird nicht gezahlt, kommt eine höfliche Erinnerung. Und zufriedene Kunden werden um eine Bewertung gebeten.',
    meldung: { titel: 'Neue Bewertung', text: 'Ein Kunde hat dich bewertet' },
  },
] as const;

export const ABLAUF_KURZ = [
  {
    titel: 'Erstgespräch',
    text: 'Wir telefonieren kurz. Du erzählst, was im Büro am meisten nervt. Kostenlos und unverbindlich.',
  },
  {
    titel: 'Analyse',
    text: 'Wir schauen uns an, wie Anfragen bei dir heute ankommen, und zeigen dir, was sich am meisten lohnt.',
  },
  {
    titel: 'Aufbau',
    text: 'Wir richten alles ein und verbinden es mit deinem Telefon, deiner E-Mail, WhatsApp und deinem Kalender.',
  },
  {
    titel: 'Start',
    text: 'Nach einer Testphase läuft es automatisch. Wir zeigen dir alles in Ruhe und bleiben dein Ansprechpartner.',
  },
];
