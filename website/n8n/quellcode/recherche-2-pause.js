// Recherche-Agent, Schritt 2: Hat Claude die Websuche pausiert (stop_reason "pause_turn")?
// Dann dieselbe Unterhaltung noch einmal schicken, der Server macht dort weiter.
const antwort = $json.body || {};
const start = $('Ziel des Tages').first().json;
const pausiert = $json.statusCode === 200 && antwort.stop_reason === 'pause_turn';
let weiter = null;
if (pausiert) {
  weiter = { ...start.anfrage, messages: [
    ...start.anfrage.messages,
    { role: 'assistant', content: antwort.content },
  ] };
}
return [{ json: { pausiert, weiter, statusCode: $json.statusCode, body: antwort } }];
