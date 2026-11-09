# Erzeugt abora-demo-workflow.json aus den Quelldateien in quellcode/.
# Aufruf: python3 baue-workflow.py [DEMO-CODE] [Zieldatei]
import json, sys, uuid, pathlib
hier = pathlib.Path(__file__).parent
code = sys.argv[1] if len(sys.argv) > 1 else None
ziel = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else hier / 'abora-demo-workflow.json'
pruefen = (hier / 'quellcode/1-anfrage-pruefen.js').read_text()
if code:
    pruefen = pruefen.replace("'HIER_DEMO_CODE_EINTRAGEN'", json.dumps(code).replace('"', "'"))
auswerten = (hier / 'quellcode/4-antwort-auswerten.js').read_text()
u = lambda: str(uuid.uuid4())
wf = {
  "name": "Abora Demo KI",
  "nodes": [
    {"id": u(), "name": "Demo-Webhook", "type": "n8n-nodes-base.webhook", "typeVersion": 2, "position": [0, 0],
     "webhookId": u(),
     "parameters": {"httpMethod": "POST", "path": "abora-demo", "responseMode": "responseNode",
                    "options": {"allowedOrigins": "https://abora-automation.de,https://www.abora-automation.de"}}},
    {"id": u(), "name": "Anfrage prüfen", "type": "n8n-nodes-base.code", "typeVersion": 2, "position": [240, 0],
     "parameters": {"jsCode": pruefen}},
    {"id": u(), "name": "Code ok?", "type": "n8n-nodes-base.if", "typeVersion": 2, "position": [480, 0],
     "parameters": {"conditions": {"options": {"caseSensitive": True, "leftValue": "", "typeValidation": "strict"},
                                   "conditions": [{"id": u(), "leftValue": "={{ $json.ok }}", "rightValue": True,
                                                   "operator": {"type": "boolean", "operation": "true", "singleValue": True}}],
                                   "combinator": "and"},
                    "options": {}}},
    {"id": u(), "name": "Claude fragen", "type": "n8n-nodes-base.httpRequest", "typeVersion": 4.2, "position": [720, -100],
     "parameters": {"method": "POST", "url": "https://api.anthropic.com/v1/messages",
                    "authentication": "genericCredentialType", "genericAuthType": "httpHeaderAuth",
                    "sendHeaders": True,
                    "headerParameters": {"parameters": [
                        {"name": "anthropic-version", "value": "2026-10-21"},
                        {"name": "anthropic-beta", "value": "server-side-fallback-2026-07-01"}]},
                    "sendBody": True, "specifyBody": "json",
                    "jsonBody": "={{ JSON.stringify($json.anfrage) }}",
                    "options": {"timeout": 90000,
                                "response": {"response": {"fullResponse": True, "neverError": True}}}},
     "credentials": {"httpHeaderAuth": {"name": "Anthropic API"}}},
    {"id": u(), "name": "Antwort auswerten", "type": "n8n-nodes-base.code", "typeVersion": 2, "position": [960, -100],
     "parameters": {"jsCode": auswerten}},
    {"id": u(), "name": "Antworten", "type": "n8n-nodes-base.respondToWebhook", "typeVersion": 1.1, "position": [1200, 0],
     "parameters": {"respondWith": "firstIncomingItem", "options": {}}},
  ],
  "connections": {
    "Demo-Webhook": {"main": [[{"node": "Anfrage prüfen", "type": "main", "index": 0}]]},
    "Anfrage prüfen": {"main": [[{"node": "Code ok?", "type": "main", "index": 0}]]},
    "Code ok?": {"main": [[{"node": "Claude fragen", "type": "main", "index": 0}],
                          [{"node": "Antworten", "type": "main", "index": 0}]]},
    "Claude fragen": {"main": [[{"node": "Antwort auswerten", "type": "main", "index": 0}]]},
    "Antwort auswerten": {"main": [[{"node": "Antworten", "type": "main", "index": 0}]]},
  },
  "settings": {"executionOrder": "v1"},
  "pinData": {},
}
ziel.write_text(json.dumps(wf, ensure_ascii=False, indent=2))
print('geschrieben:', ziel)
