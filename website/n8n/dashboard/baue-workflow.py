"""Baut den n8n-Workflow „Abora Dashboard-API“.
Aufruf: python3 baue-workflow.py  → dashboard-workflow.json (in n8n importieren)."""
import json, uuid, pathlib

hier = pathlib.Path(__file__).parent
code = lambda f: (hier / f).read_text(encoding='utf-8')
zugaenge = 'const ZUGAENGE' + code('zugaenge.js').split('const ZUGAENGE', 1)[1]
TABELLE = 'abora_anfragen'
TABELLE_RL = {'__rl': True, 'mode': 'name', 'value': TABELLE}

def node(name, typ, version, pos, params, **extra):
    return {'id': str(uuid.uuid4()), 'name': name, 'type': typ, 'typeVersion': version,
            'position': pos, 'parameters': params, **extra}

def antwort(name, pos, body, status=200):
    return node(name, 'n8n-nodes-base.respondToWebhook', 1.1, [pos[0], pos[1]], {
        'respondWith': 'json', 'responseBody': body, 'options': {'responseCode': status}})

def wenn(name, pos, ausdruck):
    return node(name, 'n8n-nodes-base.if', 2, pos, {
        'conditions': {'options': {'caseSensitive': True, 'typeValidation': 'loose'}, 'combinator': 'and',
                       'conditions': [{'id': str(uuid.uuid4()), 'leftValue': ausdruck, 'rightValue': True,
                                       'operator': {'type': 'boolean', 'operation': 'true', 'singleValue': True}}]},
        'options': {}})

def bedingung(spalte, wert):
    return {'keyName': spalte, 'condition': 'eq', 'keyValue': wert}

nodes = [
    node('Dashboard (Website)', 'n8n-nodes-base.webhook', 2, [0, 200], {
        'httpMethod': 'POST', 'path': 'abora-dashboard', 'responseMode': 'responseNode',
        'options': {'allowedOrigins': 'https://abora-automation.de,https://www.abora-automation.de'}},
        webhookId=str(uuid.uuid4())),
    node('Zugang prüfen', 'n8n-nodes-base.code', 2, [240, 200],
         {'jsCode': code('1-zugang.js').replace('//@@ZUGAENGE_DATEI@@', zugaenge)}),
    wenn('Zugang ok?', [480, 200], '={{ $json.ok }}'),
    antwort('Kein Zugang', [720, 420], '={{ JSON.stringify({ ok: false, fehler: "Der Zugangscode stimmt nicht." }) }}', 401),
    wenn('Status ändern?', [720, 140], "={{ $json.aktion === 'status' }}"),
    node('Neuer Status', 'n8n-nodes-base.code', 2, [960, 0],
         {'jsCode': 'return [{ json: { status: $input.first().json.status } }];'}),
    node('Status speichern', 'n8n-nodes-base.dataTable', 1.1, [1200, 0], {
        'resource': 'row', 'operation': 'update', 'dataTableId': TABELLE_RL,
        'matchType': 'allConditions',
        'filters': {'conditions': [bedingung('id', "={{ $('Zugang prüfen').first().json.id }}"),
                                   bedingung('betrieb_id', "={{ $('Zugang prüfen').first().json.betrieb_id }}")]},
        'columns': {'mappingMode': 'autoMapInputData', 'value': {}, 'matchingColumns': [], 'schema': []},
        'options': {}}),
    antwort('Gespeichert', [1440, 0], '={{ JSON.stringify({ ok: true }) }}'),
    node('Anfragen laden', 'n8n-nodes-base.dataTable', 1.1, [960, 260], {
        'resource': 'row', 'operation': 'get', 'dataTableId': TABELLE_RL,
        'matchType': 'allConditions',
        'filters': {'conditions': [bedingung('betrieb_id', "={{ $('Zugang prüfen').first().json.betrieb_id }}")]},
        'returnAll': False, 'limit': 300,
        'orderBy': True, 'orderByColumn': 'createdAt', 'orderByDirection': 'DESC'}, alwaysOutputData=True),
    node('Liste bauen', 'n8n-nodes-base.code', 2, [1200, 260], {'jsCode': code('2-liste.js')}),
    antwort('Liste senden', [1440, 260], '={{ JSON.stringify($json) }}'),
]
kanten = [('Dashboard (Website)', 'Zugang prüfen', 0), ('Zugang prüfen', 'Zugang ok?', 0),
          ('Zugang ok?', 'Status ändern?', 0), ('Zugang ok?', 'Kein Zugang', 1),
          ('Status ändern?', 'Neuer Status', 0), ('Status ändern?', 'Anfragen laden', 1),
          ('Neuer Status', 'Status speichern', 0), ('Status speichern', 'Gespeichert', 0),
          ('Anfragen laden', 'Liste bauen', 0), ('Liste bauen', 'Liste senden', 0)]
connections = {}
for a, b, i in kanten:
    ausg = connections.setdefault(a, {'main': [[], []] if a.endswith('?') else [[]]})['main']
    ausg[i].append({'node': b, 'type': 'main', 'index': 0})

wf = {'name': 'Abora Dashboard-API', 'nodes': nodes, 'connections': connections,
      'settings': {'executionOrder': 'v1', 'timezone': 'Europe/Berlin'}, 'active': False}
ziel = hier / 'dashboard-workflow.json'
ziel.write_text(json.dumps(wf, ensure_ascii=False, indent=2), encoding='utf-8')
print('geschrieben:', ziel)
