// ─────────────────────────────────────────────────────────────
//  Abora Rückruf – 3. Zusammenfassung für den Chef bauen
// ─────────────────────────────────────────────────────────────
const r = $input.first().json;
const v = $('Antwort zuordnen').first().json;
const roh = `„${v.text.slice(0, 300)}“`;
let d = null;
if (r.statusCode === 200 && r.body && r.body.stop_reason !== 'refusal') {
  try {
    d = JSON.parse((r.body.content || []).filter((c) => c.type === 'text').map((c) => c.text).join(''));
  } catch (e) { d = null; }
}
const symbol = { notfall: '🔴 NOTFALL', hoch: '🟠 dringend', normal: '🟢 normal', niedrig: '⚪ kann warten' };
const textChef = d
  ? [`${symbol[d.dringlichkeit] || ''} · ${d.anliegen || 'Anfrage'}`, d.ort ? `📍 ${d.ort}` : null, d.name ? `👤 ${d.name}` : null,
     d.zusammenfassung, `📞 ${v.anrufer}`].filter(Boolean).join('\n')
  : `Neue Nachricht von ${v.anrufer}: ${roh}`; // Falls die KI nicht antwortet: Originaltext weiterleiten
return [{ json: { chef: v.chef, smsVon: v.smsVon, textChef } }];
