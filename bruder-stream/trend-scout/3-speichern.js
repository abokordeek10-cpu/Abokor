// Schritt 3: Briefing als Seite speichern (die letzten 7 Tage).
const start = $('Auftrag').first().json;
const r = $json;
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
let text = '';
if (r.statusCode !== 200) text = `Fehler von Claude (HTTP ${r.statusCode}): ${JSON.stringify(r.body).slice(0, 500)}`;
else if (r.body.stop_reason === 'refusal') text = 'Claude hat die Anfrage abgelehnt.';
else text = (r.body.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim() || 'Keine Antwort erhalten.';
const inhalt = esc(text).replace(/(https?:\/\/[^\s)\]]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
const seite = `<section><h2>${esc(start.heute)}</h2><div class="b">${inhalt}</div></section>`;
const speicher = $getWorkflowStaticData('global');
speicher.briefings = [{ datum: start.heute, html: seite }, ...(speicher.briefings || [])].slice(0, 7);
return [{ json: { ok: true, datum: start.heute, zeichen: text.length } }];
