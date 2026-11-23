// ─────────────────────────────────────────────────────────────
//  Abora Anfragen-Eingang – 2. Ergebnis auswerten, Nachrichten bauen
// ─────────────────────────────────────────────────────────────
const r = $input.first().json;
const { anfrage: a, betrieb } = $('Anfrage annehmen').first().json;

let d = null;
if (r.statusCode === 200 && r.body && r.body.stop_reason !== 'refusal') {
  try {
    d = JSON.parse((r.body.content || []).filter((c) => c.type === 'text').map((c) => c.text).join(''));
  } catch (e) { d = null; }
}
// Falls Claude nicht antwortet: Anfrage trotzdem weitergeben, nur ohne Einordnung.
d = d || { dringlichkeit: 'normal', anliegen: 'Neue Anfrage', ort: null,
  zusammenfassung: 'Automatische Einordnung nicht verfügbar. Originaltext siehe unten.', fehlende_angaben: [] };

const symbol = { notfall: '🔴 NOTFALL', hoch: '🟠 dringend', normal: '🟢 normal', niedrig: '⚪ kann warten' };
const esc = (t) => String(t ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const vorname = (a.name || '').split(/\s+/)[0] || '';
const ersetze = (t) => t.replace('{vorname}', vorname).replace('{rueckruf}', (a.rueckruf || 'zeitnah').replace(/\s*\(.*\)/, '').toLowerCase()).replace('{telefon}', a.telefon || 'deiner Nummer');

const zeilen = [
  ['Dringlichkeit', symbol[d.dringlichkeit] || d.dringlichkeit],
  ['Anliegen', d.anliegen], ['Ort', d.ort], ['Name', a.name], ['Firma', a.firma], ['Gewerk', a.gewerk_kunde],
  ['Telefon', a.telefon ? `<a href="tel:${esc(a.telefon)}">${esc(a.telefon)}</a>` : null],
  ['E-Mail', a.email ? `<a href="mailto:${esc(a.email)}">${esc(a.email)}</a>` : null],
  ['Rückruf', a.rueckruf], ['Kanal', a.kanal],
].filter(([, v]) => v);
const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5">
<p style="font-size:17px"><strong>${esc(d.zusammenfassung)}</strong></p>
<table cellpadding="4">${zeilen.map(([k, v]) => `<tr><td style="color:#666">${k}</td><td>${k === 'Telefon' || k === 'E-Mail' ? v : esc(v)}</td></tr>`).join('')}</table>
${d.fehlende_angaben.length ? `<p><strong>Fehlt noch:</strong> ${esc(d.fehlende_angaben.join(', '))}</p>` : ''}
<p style="color:#666"><strong>Originaltext:</strong><br>${esc(a.nachricht || '(kein Text)').replace(/\n/g, '<br>')}</p>
</div>`;

const erst = betrieb.erstantwort || {};
const erstantwortSenden = Boolean(erst.aktiv && a.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email));

return [{
  json: {
    // Zeile für die Tabelle „abora_anfragen“ (Grundlage für Übersicht und Dashboard)
    zeile: {
      betrieb_id: a.betrieb_id, kanal: a.kanal, status: 'neu', dringlichkeit: d.dringlichkeit,
      anliegen: d.anliegen || '', ort: d.ort || '', name: a.name, telefon: a.telefon, email: a.email,
      firma: a.firma, zusammenfassung: d.zusammenfassung, fehlende_angaben: d.fehlende_angaben.join(', '),
      nachricht: a.nachricht, erstantwort_gesendet: erstantwortSenden,
    },
    chef: {
      an: betrieb.chefEmail,
      von: betrieb.absender,
      betreff: `${symbol[d.dringlichkeit] || ''} · ${d.anliegen || 'Neue Anfrage'}${a.name ? ' – ' + a.name : ''}`,
      html,
      antwortAn: a.email || betrieb.chefEmail,
    },
    kunde: erstantwortSenden ? { an: a.email, von: betrieb.absender, antwortAn: betrieb.chefEmail, betreff: erst.betreff, text: ersetze(erst.text) } : null,
  },
}];
