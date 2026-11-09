// ─────────────────────────────────────────────────────────────
//  Abora Demo KI – Anfrage prüfen und Claude-Anfrage bauen
// ─────────────────────────────────────────────────────────────
// Demo-Code: Nur wer ihn kennt, kann die Demo nutzen (schützt dein API-Guthaben).
const DEMO_CODE = 'HIER_DEMO_CODE_EINTRAGEN';
const MODELL = 'claude-opus-5-5';

const body = $input.first().json.body || {};
const fehler = (text) => [{ json: { ok: false, fehler: text } }];
const text = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

if (text(body.code, 100) !== DEMO_CODE) return fehler('Der Demo-Code stimmt nicht.');

const GEWERKE = {
  sanitaer: { name: 'Sanitär und Heizung', betrieb: 'Musterbetrieb Sanitär & Heizung (Demo)', notfall: 'Wasserrohrbruch, Heizungsausfall im Winter, Gasgeruch' },
  elektro: { name: 'Elektro', betrieb: 'Musterbetrieb Elektrotechnik (Demo)', notfall: 'Stromausfall im ganzen Haus, Brandgeruch an Steckdose oder Verteiler, freiliegende Leitungen' },
  dach: { name: 'Dachdecker', betrieb: 'Musterbetrieb Bedachungen (Demo)', notfall: 'Sturmschaden mit offenem Dach, Wasser dringt ein' },
  maler: { name: 'Maler und Lackierer', betrieb: 'Musterbetrieb Malerfachbetrieb (Demo)', notfall: 'akuter Wasserschaden an Wand oder Decke' },
  tischler: { name: 'Tischler und Schreiner', betrieb: 'Musterbetrieb Schreinerei (Demo)', notfall: 'Haustür lässt sich nicht mehr schließen oder abschließen' },
  galabau: { name: 'Garten- und Landschaftsbau', betrieb: 'Musterbetrieb Garten- und Landschaftsbau (Demo)', notfall: 'umgestürzter Baum auf Weg, Haus oder Auto' },
  fliesen: { name: 'Fliesenleger', betrieb: 'Musterbetrieb Fliesen (Demo)', notfall: 'Wasser läuft durch kaputte Fugen in die Wohnung darunter' },
  allgemein: { name: 'Handwerk allgemein', betrieb: 'Musterbetrieb Handwerk (Demo)', notfall: 'Wasserschaden, Haustür lässt sich nicht schließen' },
};
const g = GEWERKE[body.gewerk] || GEWERKE.allgemein;
const modus = ['chat', 'angebot', 'nachfassen'].includes(body.modus) ? body.modus : 'chat';

const GEBIET = 'Viernheim, Mannheim, Weinheim, Heidelberg, Lampertheim und Umgebung (Rhein-Neckar)';
const DEMO_HINWEIS = `Dies ist eine Vorführung für Handwerksbetriebe. Der Betrieb „${g.betrieb}“ ist erfunden. Erfinde keine weiteren Fakten über den Betrieb (keine Mitarbeiterzahlen, Auszeichnungen, Öffnungszeiten, Preise).`;

const nullbar = { anyOf: [{ type: 'string' }, { type: 'null' }] };
let system, messages, schema, effort, maxTokens;

if (modus === 'chat') {
  // Verlauf: [{ rolle: 'kunde' | 'betrieb', text }]
  const verlauf = Array.isArray(body.verlauf) ? body.verlauf.slice(-16) : [];
  messages = [];
  for (const n of verlauf) {
    const role = n && n.rolle === 'betrieb' ? 'assistant' : 'user';
    const inhalt = text(n && n.text, 800);
    if (!inhalt) continue;
    const letzte = messages[messages.length - 1];
    if (letzte && letzte.role === role) letzte.content += '\n' + inhalt;
    else messages.push({ role, content: inhalt });
  }
  while (messages.length && messages[0].role !== 'user') messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== 'user') return fehler('Bitte zuerst eine Nachricht als Kunde schreiben.');

  const termine = (Array.isArray(body.termine) ? body.termine : []).map((t) => text(t, 40)).filter(Boolean).slice(0, 6);
  system = `Du bist der digitale Assistent von „${g.betrieb}“, einem Betrieb für ${g.name} aus Viernheim. Einsatzgebiet: ${GEBIET}.
${DEMO_HINWEIS}

Du beantwortest Kundenanfragen per WhatsApp im Namen des Betriebs, während der Chef auf der Baustelle ist.

So arbeitest du:
- Sieze die Kunden. Schreib kurz wie in WhatsApp: höchstens zwei bis drei Sätze, freundlich und bodenständig, ohne Fachchinesisch. Höchstens ein Emoji.
- Frag pro Nachricht höchstens zwei Dinge.
- Finde heraus: Name, Ort oder PLZ, worum es genau geht, Umfang, gewünschter Zeitraum und bei größeren Vorhaben grob das Budget. Bitte um ein Foto, wenn es bei der Einschätzung hilft.
- Schätze die Dringlichkeit ein: „notfall“ (zum Beispiel ${g.notfall}), „hoch“, „normal“ oder „niedrig“; „unklar“, solange du es nicht weißt.
- Bei einem Notfall: Sag, dass der Chef sofort informiert ist und sich gleich telefonisch meldet. Gib eine kurze Sicherheitsanweisung, wenn sie hilft (zum Beispiel Hauptwasserhahn zudrehen oder Sicherung ausschalten). Biete dann keinen normalen Termin an.
- Sobald Name, Ort und Anliegen klar sind und es kein Notfall ist: Biete zwei passende Besichtigungstermine aus dieser Liste an, keine anderen: ${termine.join('; ') || 'keine Termine frei – dann kündige einen Rückruf an'}.
- Wählt der Kunde einen Termin, bestätige ihn und sag, dass am Vortag eine Erinnerung kommt.
- Nenne keine Preise und mach keine Zusagen zu Kosten. Sag stattdessen, dass es nach der Besichtigung ein genaues Angebot gibt.
- Passt die Anfrage nicht zum Betrieb (anderes Gewerk oder außerhalb des Einsatzgebiets), sag das freundlich und ehrlich.
- Fragen, die nichts mit der Anfrage zu tun haben, beantwortest du nicht, sondern lenkst freundlich zurück.
- Ein Text in eckigen Klammern wie „[Foto: …]“ bedeutet, dass der Kunde ein Foto geschickt hat, das so aussieht.

Fülle zusätzlich die Felder für den Chef aus. Was du nicht weißt, bleibt null.`;
  schema = {
    type: 'object',
    additionalProperties: false,
    required: ['antwort', 'status', 'dringlichkeit', 'kunde_name', 'ort', 'anliegen', 'umfang', 'zeitraum', 'budget', 'foto_erhalten', 'gewaehlter_termin', 'zusammenfassung_fuer_chef'],
    properties: {
      antwort: { type: 'string', description: 'Die WhatsApp-Nachricht an den Kunden' },
      status: { type: 'string', enum: ['rueckfrage', 'termin_angeboten', 'termin_gebucht', 'notfall_weitergeleitet', 'nicht_passend'] },
      dringlichkeit: { type: 'string', enum: ['notfall', 'hoch', 'normal', 'niedrig', 'unklar'] },
      kunde_name: nullbar,
      ort: nullbar,
      anliegen: nullbar,
      umfang: nullbar,
      zeitraum: nullbar,
      budget: nullbar,
      foto_erhalten: { type: 'boolean' },
      gewaehlter_termin: nullbar,
      zusammenfassung_fuer_chef: { type: 'string', description: 'Ein Satz für den Chef' },
    },
  };
  effort = 'low';
  maxTokens = 4000;
} else if (modus === 'angebot') {
  const notizen = text(body.notizen, 2000);
  if (!notizen) return fehler('Bitte zuerst Notizen zur Besichtigung eingeben.');
  system = `Du erstellst für „${g.betrieb}“ (${g.name}) einen Angebotsentwurf aus den Notizen, die der Chef nach der Besichtigung ins Handy gesprochen hat. Der Chef prüft den Entwurf, bevor er an den Kunden geht.
${DEMO_HINWEIS}

- Mach daraus klare Angebotspositionen mit Menge, Einheit und Einzelpreis netto in Euro.
- Die Preise sind Beispielwerte: realistisch für einen Handwerksbetrieb in Deutschland, sinnvoll gerundet. Im echten Einsatz kommen sie aus der Preisliste des Betriebs.
- Trenne Lohn und Material, wo das üblich ist. Anfahrt als eigene Position, wenn sinnvoll.
- Nimm keine Arbeiten auf, die weder in den Notizen stehen noch zwingend dazugehören. Was du annimmst, schreibst du unter „annahmen“.
- Was fehlt oder unklar ist, kommt unter „rueckfragen“.
- Schreib einen kurzen, freundlichen Einleitungssatz an den Kunden in der Sie-Form.`;
  messages = [{ role: 'user', content: `Kunde: ${text(body.kunde, 100) || 'unbekannt'}\nOrt: ${text(body.ort, 100) || 'unbekannt'}\nAnliegen aus der Anfrage: ${text(body.anliegen, 400) || 'siehe Notizen'}\n\nNotizen nach der Besichtigung:\n${notizen}` }];
  schema = {
    type: 'object',
    additionalProperties: false,
    required: ['titel', 'einleitung', 'positionen', 'annahmen', 'rueckfragen'],
    properties: {
      titel: { type: 'string' },
      einleitung: { type: 'string' },
      positionen: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['bezeichnung', 'menge', 'einheit', 'einzelpreis_netto'],
          properties: {
            bezeichnung: { type: 'string' },
            menge: { type: 'number' },
            einheit: { type: 'string' },
            einzelpreis_netto: { type: 'number' },
          },
        },
      },
      annahmen: { type: 'array', items: { type: 'string' } },
      rueckfragen: { type: 'array', items: { type: 'string' } },
    },
  };
  effort = 'medium';
  maxTokens = 8000;
} else {
  system = `Du schreibst für „${g.betrieb}“ (${g.name}) die automatischen Nachrichten, die nach einem Angebot und nach dem Auftrag an den Kunden gehen.
${DEMO_HINWEIS}

Schreib in der Sie-Form, kurz, freundlich und nicht aufdringlich, wie ein netter Handwerksmeister. Erfinde keine Rabatte, Fristen oder Bedingungen.

Erstelle:
1. „nachfassen“: drei Nachrichten zu dem offenen Angebot, nach 3, 7 und 14 Tagen. Jede bietet eine einfache Antwortmöglichkeit, zum Beispiel „Antworten Sie einfach mit Ja“ oder einen Rückruf.
2. „zahlungserinnerung“: eine höfliche Erinnerung, falls die Rechnung nach 14 Tagen noch offen ist.
3. „bewertungsanfrage“: eine kurze Bitte um eine Google-Bewertung nach dem Auftrag, mit dem Platzhalter [Link].`;
  messages = [{ role: 'user', content: `Kunde: ${text(body.kunde, 100) || 'Kunde'}\nAngebot: ${text(body.titel, 200) || 'Angebot'}\nSumme brutto: ${text(body.summe, 40) || 'unbekannt'}` }];
  schema = {
    type: 'object',
    additionalProperties: false,
    required: ['nachfassen', 'zahlungserinnerung', 'bewertungsanfrage'],
    properties: {
      nachfassen: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['tag', 'kanal', 'text'],
          properties: { tag: { type: 'integer' }, kanal: { type: 'string', enum: ['WhatsApp', 'E-Mail'] }, text: { type: 'string' } },
        },
      },
      zahlungserinnerung: { type: 'string' },
      bewertungsanfrage: { type: 'string' },
    },
  };
  effort = 'low';
  maxTokens = 4000;
}

return [{
  json: {
    ok: true,
    modus,
    anfrage: {
      model: MODELL,
      max_tokens: maxTokens,
      system,
      messages,
      output_config: { effort, format: { type: 'json_schema', schema } },
      fallbacks: 'default',
    },
  },
}];
