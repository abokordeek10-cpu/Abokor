// ─────────────────────────────────────────────────────────────
//  Abora Demo KI – Antwort von Claude auswerten
// ─────────────────────────────────────────────────────────────
const r = $input.first().json;
const b = r.body;
const modus = $('Anfrage prüfen').first().json.modus;

if (r.statusCode !== 200 || !b || typeof b !== 'object') {
  const detail = b && b.error && b.error.message ? b.error.message : 'HTTP ' + r.statusCode;
  return [{ json: { ok: false, fehler: 'Die KI ist gerade nicht erreichbar.', detail } }];
}
if (b.stop_reason === 'refusal') {
  return [{ json: { ok: false, fehler: 'Die KI hat diese Anfrage abgelehnt. Bitte anders formulieren.' } }];
}
const roh = (b.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('');
let daten;
try {
  daten = JSON.parse(roh);
} catch (e) {
  return [{ json: { ok: false, fehler: 'Die Antwort der KI war unvollständig. Bitte nochmal versuchen.', detail: b.stop_reason } }];
}
return [{ json: { ok: true, modus, daten, modell: b.model, nutzung: b.usage } }];
