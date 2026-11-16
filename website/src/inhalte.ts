// Inhalte, die auf mehreren Seiten vorkommen.

export const BAUSTEINE = [
  {
    id: 'anfragen',
    stand: 'start',
    titel: 'Anfragen',
    icon: 'anfrage',
    kurz: 'Anfragen über deine Website und per E-Mail landen an einem Ort und bekommen sofort eine erste Antwort. Auch wenn du auf der Baustelle bist.',
    ohne: 'Das Handy klingelt, während du auf der Leiter stehst. Die WhatsApp liest du abends um zehn. Bis du zurückrufst, hat der Kunde schon den Nächsten gefragt.',
    mit: 'Jede Anfrage über deine Website oder per E-Mail bekommt in Minuten eine freundliche erste Antwort. Alles landet an einem Ort, nichts geht verloren. WhatsApp und Telefon binden wir auf Anfrage an.',
    meldung: { titel: 'Neue Anfrage', text: 'Automatisch beantwortet: Heizung fällt aus' },
  },
  {
    id: 'vorsortieren',
    stand: 'start',
    titel: 'Vorsortieren',
    icon: 'filter',
    kurz: 'Die KI fragt Ort, Umfang und Fotos ab und sortiert nach Dringlichkeit. Du bekommst eine fertige Übersicht statt Zettelwirtschaft.',
    ohne: 'Du fährst 40 Minuten raus, und vor Ort stellt sich raus: Der Kunde will nur einen Preis zum Vergleichen, oder der Auftrag ist viel zu klein.',
    mit: 'Bevor eine Anfrage bei dir landet, sind Ort, Umfang, ungefähres Budget und Fotos schon da. Der Rohrbruch kommt nach oben, die Preisanfrage für „irgendwann mal“ nach unten.',
    meldung: { titel: 'Dringend: Rohrbruch', text: 'Fotos und Adresse liegen vor' },
  },
  {
    id: 'termine',
    stand: 'pilot',
    titel: 'Termine',
    icon: 'kalender',
    kurz: 'Passende Kunden buchen direkt einen Besichtigungstermin in deinem Kalender.',
    ohne: 'Fünf Nachrichten hin und her, bis ein Termin steht. Und dann hast du ihn doch doppelt vergeben.',
    mit: 'Passende Kunden bekommen freie Zeiten aus deinem Kalender angeboten und buchen selbst. Am Vortag geht automatisch eine Erinnerung raus.',
    meldung: { titel: 'Termin gebucht', text: 'Besichtigung Di., 7:30 Uhr – Badsanierung' },
  },
  {
    id: 'angebote',
    stand: 'pilot',
    titel: 'Angebote',
    icon: 'angebot',
    kurz: 'Aus deinen Angaben und den Fotos entsteht ein Angebotsentwurf. Die Freigabe bleibt immer bei dir.',
    ohne: 'Die Angebote stapeln sich, weil du sie erst am Wochenende schreiben kannst. Bis dahin hat der Kunde längst woanders unterschrieben.',
    mit: 'Nach der Besichtigung sprichst du kurz ins Handy, was gemacht werden muss. Daraus entsteht ein Angebotsentwurf mit deinen Positionen und Preisen. Du prüfst, änderst, schickst ab.',
    meldung: { titel: 'Angebot vorbereitet', text: 'Entwurf aus deiner Sprachnotiz – bitte prüfen' },
  },
  {
    id: 'nachfassen',
    stand: 'pilot',
    titel: 'Nachfassen',
    icon: 'nachfassen',
    kurz: 'Offene Angebote werden automatisch und freundlich nachverfolgt, damit kein Auftrag einschläft.',
    ohne: 'Das Angebot ist raus, und dann hörst du nichts mehr. Nachhaken fühlt sich komisch an, also lässt du es.',
    mit: 'Nach ein paar Tagen fragt eine freundliche Nachricht nach, ob noch Fragen offen sind. Der Kunde kann direkt zusagen oder einen Rückruf anfordern.',
    meldung: { titel: 'Angebot angenommen ✓', text: 'Kunde hat nach Erinnerung zugesagt' },
  },
  {
    id: 'bewertungen',
    stand: 'pilot',
    titel: 'Bewertungen',
    icon: 'stern',
    kurz: 'Nach dem Auftrag werden zufriedene Kunden automatisch um eine ehrliche Bewertung gebeten.',
    ohne: 'Der Kunde war zufrieden, aber eine Bewertung schreibt er nie. Und die Rechnung schreibst du nach Feierabend.',
    mit: 'Ist der Auftrag erledigt, bekommt der Kunde eine freundliche Nachricht mit der Bitte um eine ehrliche Bewertung. Rechnung und Zahlungserinnerung können wir auf Wunsch mit anbinden.',
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
    text: 'Wir richten die vereinbarten Bausteine ein und verbinden sie mit dem, was du schon nutzt, zum Beispiel Website, E-Mail und Kalender.',
  },
  {
    titel: 'Start',
    text: 'Wir testen gemeinsam typische Fälle und Ausnahmen. Danach läuft es automatisch, und wir bleiben dein Ansprechpartner.',
  },
];
