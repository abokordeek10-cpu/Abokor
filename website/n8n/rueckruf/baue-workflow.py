# Baut rueckruf-workflow.json aus den Quelldateien in diesem Ordner.
# Aufruf: python3 baue-workflow.py
import json, uuid, pathlib, secrets
hier = pathlib.Path(__file__).parent
einst = (hier / 'einstellungen.js').read_text()
lies = lambda n: (hier / n).read_text().replace('//@@EINSTELLUNGEN@@', einst)
u = lambda: str(uuid.uuid4())
# zufälliger Teil im Webhook-Pfad, damit niemand die Adresse errät (bleibt beim Neubauen gleich)
pfad_datei = hier / '.webhook-pfad'
if not pfad_datei.exists():
    pfad_datei.write_text(secrets.token_hex(8))
geheim = pfad_datei.read_text().strip()

def code(name, js, pos): return {"id": u(), "name": name, "type": "n8n-nodes-base.code", "typeVersion": 2, "position": pos, "parameters": {"jsCode": js}}
def sms(name, an, text, pos):
    return {"id": u(), "name": name, "type": "n8n-nodes-base.twilio", "typeVersion": 1, "position": pos,
            "parameters": {"from": "={{ $('%s').first().json.smsVon }}" % an[0], "to": "={{ $('%s').first().json.%s }}" % an,
                           "message": "={{ $('%s').first().json.%s }}" % (an[0], text), "options": {}},
            "credentials": {"twilioApi": {"name": "Twilio"}}}
def wenn(name, ausdruck, pos):
    return {"id": u(), "name": name, "type": "n8n-nodes-base.if", "typeVersion": 2, "position": pos,
            "parameters": {"conditions": {"options": {"caseSensitive": True, "leftValue": "", "typeValidation": "loose"},
                                          "conditions": [{"id": u(), "leftValue": ausdruck, "rightValue": True,
                                                          "operator": {"type": "boolean", "operation": "true", "singleValue": True}}],
                                          "combinator": "and"}, "options": {}}}
def antwort(name, ausdruck, pos):
    return {"id": u(), "name": name, "type": "n8n-nodes-base.respondToWebhook", "typeVersion": 1.1, "position": pos,
            "parameters": {"respondWith": "text", "responseBody": ausdruck,
                           "options": {"responseHeaders": {"entries": [{"name": "Content-Type", "value": "text/xml"}]}}}}
def webhook(name, pfad, pos):
    return {"id": u(), "name": name, "type": "n8n-nodes-base.webhook", "typeVersion": 2, "position": pos, "webhookId": u(),
            "parameters": {"httpMethod": "POST", "path": f"abora-rueckruf-{pfad}-{geheim}", "responseMode": "responseNode", "options": {}}}

A = ('Anruf verarbeiten',)
S = ('Antwort zuordnen',)
nodes = [
  webhook("Anruf (Twilio)", "anruf", [0, 0]),
  code("Anruf verarbeiten", lies('1-anruf.js'), [220, 0]),
  antwort("Ansage abspielen", "={{ $json.twiml }}", [440, 0]),
  wenn("Bekannter Kunde?", "={{ $('Anruf verarbeiten').first().json.ok }}", [660, 0]),
  sms("SMS an Chef (Anruf)", ('Anruf verarbeiten', 'chef'), 'textChef', [880, -80]),
  wenn("Handy-Anrufer?", "={{ $('Anruf verarbeiten').first().json.smsAnAnrufer }}", [1100, -80]),
  sms("SMS an Anrufer", ('Anruf verarbeiten', 'anrufer'), 'textAnrufer', [1320, -160]),

  webhook("SMS-Antwort (Twilio)", "sms", [0, 400]),
  code("Antwort zuordnen", lies('2-sms.js'), [220, 400]),
  antwort("Twilio bestätigen", '<?xml version="1.0" encoding="UTF-8"?><Response></Response>', [440, 400]),
  wenn("Zugeordnet?", "={{ $('Antwort zuordnen').first().json.ok }}", [660, 400]),
  {"id": u(), "name": "Claude fasst zusammen", "type": "n8n-nodes-base.httpRequest", "typeVersion": 4.2, "position": [880, 320],
   "parameters": {"method": "POST", "url": "https://api.anthropic.com/v1/messages",
                  "authentication": "genericCredentialType", "genericAuthType": "httpHeaderAuth", "sendHeaders": True,
                  "headerParameters": {"parameters": [{"name": "anthropic-version", "value": "2026-10-21"},
                                                      {"name": "anthropic-beta", "value": "server-side-fallback-2026-07-01"}]},
                  "sendBody": True, "specifyBody": "json", "jsonBody": "={{ JSON.stringify($('Antwort zuordnen').first().json.anfrage) }}",
                  "options": {"timeout": 60000, "response": {"response": {"fullResponse": True, "neverError": True}}}},
   "credentials": {"httpHeaderAuth": {"name": "Anthropic API"}}},
  code("Für Chef aufbereiten", (hier / '3-auswerten.js').read_text(), [1100, 320]),
  sms("SMS an Chef (Zusammenfassung)", ('Für Chef aufbereiten', 'chef'), 'textChef', [1320, 320]),
  wenn("Erste Antwort?", "={{ $('Antwort zuordnen').first().json.ersteAntwort }}", [1540, 320]),
  sms("Danke an Anrufer", ('Antwort zuordnen', 'anrufer'), 'textAnrufer', [1760, 240]),
  sms("Hinweis an Abokor", ('Antwort zuordnen', 'chef'), 'textChef', [880, 520]),
]
c = lambda *n: {"main": [[{"node": x, "type": "main", "index": 0}] if x else [] for x in n]}
wf = {"name": "Abora Rückruf (verpasster Anruf → SMS)", "nodes": nodes, "connections": {
  "Anruf (Twilio)": c("Anruf verarbeiten"), "Anruf verarbeiten": c("Ansage abspielen"), "Ansage abspielen": c("Bekannter Kunde?"),
  "Bekannter Kunde?": c("SMS an Chef (Anruf)", None), "SMS an Chef (Anruf)": c("Handy-Anrufer?"), "Handy-Anrufer?": c("SMS an Anrufer", None),
  "SMS-Antwort (Twilio)": c("Antwort zuordnen"), "Antwort zuordnen": c("Twilio bestätigen"), "Twilio bestätigen": c("Zugeordnet?"),
  "Zugeordnet?": c("Claude fasst zusammen", "Hinweis an Abokor"), "Claude fasst zusammen": c("Für Chef aufbereiten"),
  "Für Chef aufbereiten": c("SMS an Chef (Zusammenfassung)"), "SMS an Chef (Zusammenfassung)": c("Erste Antwort?"), "Erste Antwort?": c("Danke an Anrufer", None)},
  "settings": {"executionOrder": "v1"}, "pinData": {}}
(hier / 'rueckruf-workflow.json').write_text(json.dumps(wf, ensure_ascii=False, indent=2))
print('geschrieben: rueckruf-workflow.json')
print('Anruf-Adresse:  https://n8n.abora-automation.de/webhook/abora-rueckruf-anruf-' + geheim)
print('SMS-Adresse:    https://n8n.abora-automation.de/webhook/abora-rueckruf-sms-' + geheim)
