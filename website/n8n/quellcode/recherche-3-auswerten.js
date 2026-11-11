// Recherche-Agent, Schritt 3: Antwort auswerten und die E-Mail bauen.
const start = $('Ziel des Tages').first().json;
const status = $json.statusCode;
const antwort = $json.body || {};
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

let fehler = '';
let daten = null;
if (status !== 200) {
  fehler = `Claude-Fehler (HTTP ${status}): ${esc(JSON.stringify(antwort).slice(0, 500))}`;
} else if (antwort.stop_reason === 'refusal') {
  fehler = 'Claude hat die Anfrage abgelehnt.';
} else {
  const text = (antwort.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n');
  const m = text.match(/<json>([\s\S]*?)<\/json>/);
  try { daten = JSON.parse(m ? m[1] : text); } catch (e) { fehler = 'Antwort war kein gültiges JSON.'; }
}

const betriebe = (daten?.betriebe || []).filter((b) => b && b.name);
betriebe.sort((a, b) => (a.prioritaet || 3) - (b.prioritaet || 3));

// Bereits vorgeschlagene Betriebe merken (nur bei echten Ausführungen gespeichert)
const speicher = $getWorkflowStaticData('global');
speicher.bekannt = [...(speicher.bekannt || []), ...betriebe.map((b) => `${b.name} (${b.ort})`)].slice(-500);

const s = daten?.strategie || {};
const zeilen = betriebe.map((b, i) => `
  <tr style="border-top:1px solid #ddd;vertical-align:top">
    <td style="padding:8px">${i + 1}<br><b style="color:${b.prioritaet === 1 ? '#c78a00' : '#666'}">P${esc(b.prioritaet)}</b></td>
    <td style="padding:8px"><b>${esc(b.name)}</b><br>${esc(b.gewerk)} · ${esc(b.ort)}<br>
      ${b.telefon ? `<a href="tel:${esc(String(b.telefon).replace(/[^+\d]/g, ''))}">${esc(b.telefon)}</a>` : '<i>Nummer selbst prüfen</i>'}<br>
      ${b.website ? `<a href="${esc(b.website)}">${esc(b.website)}</a>` : ''}</td>
    <td style="padding:8px"><b>Grund:</b> ${esc(b.grund)}<br><b>Einstieg:</b> „${esc(b.einstiegssatz)}“</td>
  </tr>`).join('');

const html = `<div style="font-family:Arial,sans-serif;max-width:900px">
<h2 style="color:#14202e">Anrufliste ${esc(start.datum)}: ${esc(start.ort)}</h2>
<p style="color:#555">Gewerke: ${esc(start.gewerke)} · ${betriebe.length} Betriebe</p>
${fehler ? `<p style="color:#b42318"><b>${fehler}</b></p>` : ''}
<div style="background:#fff8e1;border-left:4px solid #ffc83d;padding:12px 16px;margin:16px 0">
<b>Strategie für heute</b><br>
<b>Fokus:</b> ${esc(s.fokus)}<br><b>Warum:</b> ${esc(s.warum)}<br>
<b>Beste Anrufzeit:</b> ${esc(s.beste_anrufzeit)}<br><b>Tipp:</b> ${esc(s.tipp)}</div>
<table style="border-collapse:collapse;width:100%;font-size:14px">${zeilen}</table>
<p style="color:#888;font-size:12px;margin-top:20px">Automatisch recherchiert. Angaben vor dem Anruf kurz prüfen.
Nur anrufen, wenn der Grund passt. Bei „Kein Interesse“ nicht mehr anrufen.</p></div>`;

const csv = ['Prioritaet;Betrieb;Gewerk;Ort;Telefon;Website;Grund;Einstiegssatz',
  ...betriebe.map((b) => [b.prioritaet, b.name, b.gewerk, b.ort, b.telefon, b.website, b.grund, b.einstiegssatz]
    .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(';'))].join('\n');

return [{
  json: { betreff: `Anrufliste ${start.datum}: ${start.ort} (${betriebe.length} Betriebe)`, html, anzahl: betriebe.length },
  binary: { liste: { data: Buffer.from('﻿' + csv, 'utf8').toString('base64'), mimeType: 'text/csv', fileName: `anrufliste-${start.datum}.csv` } },
}];
