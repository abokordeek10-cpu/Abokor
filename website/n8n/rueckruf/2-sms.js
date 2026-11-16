// ─────────────────────────────────────────────────────────────
//  Abora Rückruf – 2. Anrufer antwortet per SMS (Twilio Messaging)
// ─────────────────────────────────────────────────────────────
//@@EINSTELLUNGEN@@
const MODELL = 'claude-opus-5-5';
const b = $input.first().json.body || {};
if (b.AccountSid !== EINSTELLUNGEN.twilioKonto) return []; // fremder Aufruf: nichts tun

const anrufer = String(b.From || '');
const text = String(b.Body || '').trim().slice(0, 1500);
const speicher = $getWorkflowStaticData('global');
const eintrag = (speicher.anrufer || {})[anrufer];
const kunde = eintrag && EINSTELLUNGEN.kunden[eintrag.kunde];

if (!kunde) {
  return [{ json: { ok: false, grund: 'unbekannt', chef: EINSTELLUNGEN.admin, smsVon: EINSTELLUNGEN.smsNummer,
    textChef: `⚠️ Abora: SMS von ${anrufer} ohne vorherigen Anruf: „${text.slice(0, 300)}“` } }];
}
eintrag.antworten = (eintrag.antworten || 0) + 1;
eintrag.zeit = Date.now();

const nullbar = { anyOf: [{ type: 'string' }, { type: 'null' }] };
return [{
  json: {
    ok: true,
    anrufer,
    smsVon: EINSTELLUNGEN.smsNummer,
    chef: kunde.chef,
    betrieb: kunde.betrieb,
    ersteAntwort: eintrag.antworten === 1,
    text,
    textAnrufer: `Danke! Ihre Nachricht ist bei ${kunde.betrieb} angekommen. Wir melden uns so schnell wie möglich. (Automatische Nachricht)`,
    anfrage: {
      model: MODELL,
      max_tokens: 2000,
      system: `Du fasst für „${kunde.betrieb}“ (${kunde.gewerk}) die SMS eines Anrufers zusammen, der den Chef nicht erreicht hat. Der Chef steht auf der Baustelle und liest das auf dem Handy. Schreib knapp und sachlich auf Deutsch. Erfinde nichts; was nicht in der Nachricht steht, bleibt null. Dringlichkeit „notfall“ nur bei echten Notfällen wie: ${kunde.notfall}, oder wenn der Kunde NOTFALL schreibt.`,
      messages: [{ role: 'user', content: `SMS des Anrufers ${anrufer}:\n${text || '(leer)'}` }],
      output_config: {
        effort: 'low',
        format: {
          type: 'json_schema',
          schema: {
            type: 'object',
            additionalProperties: false,
            required: ['dringlichkeit', 'name', 'ort', 'anliegen', 'zusammenfassung'],
            properties: {
              dringlichkeit: { type: 'string', enum: ['notfall', 'hoch', 'normal', 'niedrig'] },
              name: nullbar,
              ort: nullbar,
              anliegen: nullbar,
              zusammenfassung: { type: 'string', description: 'Ein bis zwei kurze Sätze für den Chef' },
            },
          },
        },
      },
      fallbacks: 'default',
    },
  },
}];
