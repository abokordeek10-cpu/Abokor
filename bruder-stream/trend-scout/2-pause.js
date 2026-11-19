// Schritt 2: Hat Claude die Websuche pausiert (stop_reason "pause_turn")? Dann weitermachen lassen.
const antwort = $json.body || {};
const start = $('Auftrag').first().json;
const pausiert = $json.statusCode === 200 && antwort.stop_reason === 'pause_turn';
const weiter = pausiert ? { ...start.anfrage, messages: [...start.anfrage.messages, { role: 'assistant', content: antwort.content }] } : null;
return [{ json: { pausiert, weiter, statusCode: $json.statusCode, body: antwort } }];
