"""Baut den n8n-Workflow „Abora Anfragen-Eingang“.
Aufruf: python3 baue-workflow.py  → anfragen-workflow.json (in n8n importieren)."""
import json, uuid, pathlib

hier = pathlib.Path(__file__).parent
code = lambda f: (hier / f).read_text(encoding='utf-8')
betriebe = code('betriebe.js').split('const BETRIEBE', 1)
betriebe = 'const BETRIEBE' + betriebe[1]
WEBHOOK_PFAD = '8b0fcd17-200f-4859-879c-613198143e88'  # derselbe Pfad wie bisher: die Website muss nicht geändert werden
TABELLE = 'abora_anfragen'
SPALTEN = [('betrieb_id', 'string'), ('kanal', 'string'), ('status', 'string'), ('dringlichkeit', 'string'),
           ('anliegen', 'string'), ('ort', 'string'), ('name', 'string'), ('telefon', 'string'), ('email', 'string'),
           ('firma', 'string'), ('zusammenfassung', 'string'), ('fehlende_angaben', 'string'), ('nachricht', 'string'),
           ('erstantwort_gesendet', 'boolean')]

def node(name, typ, version, pos, params, **extra):
    return {'id': str(uuid.uuid4()), 'name': name, 'type': typ, 'typeVersion': version,
            'position': pos, 'parameters': params, **extra}

def mail(name, pos, prefix, html):
    p = {'fromEmail': f'={{{{ $json.{prefix}.von }}}}', 'toEmail': f'={{{{ $json.{prefix}.an }}}}',
         'subject': f'={{{{ $json.{prefix}.betreff }}}}',
         'options': {'replyTo': f'={{{{ $json.{prefix}.antwortAn }}}}', 'appendAttribution': False}}
    if html:
        p.update({'emailFormat': 'html', 'html': f'={{{{ $json.{prefix}.html }}}}'})
    else:
        p.update({'emailFormat': 'text', 'text': f'={{{{ $json.{prefix}.text }}}}'})
    return node(name, 'n8n-nodes-base.emailSend', 2.1, pos, p)

nodes = [
    node('Formular (Website)', 'n8n-nodes-base.webhook', 2, [0, 200], {
        'httpMethod': 'POST', 'path': WEBHOOK_PFAD, 'responseMode': 'onReceived',
        'options': {'allowedOrigins': 'https://abora-automation.de,https://www.abora-automation.de'}},
        webhookId=str(uuid.uuid4())),
    node('Anfrage annehmen', 'n8n-nodes-base.code', 2, [240, 200],
         {'jsCode': code('1-eingang.js').replace('//@@BETRIEBE@@', betriebe)}),
    node('Claude sortiert vor', 'n8n-nodes-base.httpRequest', 4.2, [480, 200], {
        'method': 'POST', 'url': 'https://api.anthropic.com/v1/messages',
        'authentication': 'genericCredentialType', 'genericAuthType': 'httpHeaderAuth', 'sendHeaders': True,
        'headerParameters': {'parameters': [{'name': 'anthropic-version', 'value': '2026-10-21'},
                                            {'name': 'anthropic-beta', 'value': 'server-side-fallback-2026-07-01'}]},
        'sendBody': True, 'specifyBody': 'json', 'jsonBody': '={{ JSON.stringify($json.claude) }}',
        'options': {'timeout': 120000, 'response': {'response': {'fullResponse': True, 'neverError': True}}},
    }, credentials={'httpHeaderAuth': {'name': 'Anthropic API'}}),
    node('Auswerten', 'n8n-nodes-base.code', 2, [720, 200], {'jsCode': code('2-auswerten.js')}),
    node('Zeile', 'n8n-nodes-base.code', 2, [960, 0], {'jsCode': 'return [{ json: $input.first().json.zeile }];'}),
    node('In Tabelle speichern', 'n8n-nodes-base.dataTable', 1.1, [1200, 0], {
        'resource': 'row', 'operation': 'insert',
        'dataTableId': {'__rl': True, 'mode': 'name', 'value': TABELLE},
        'columns': {'mappingMode': 'autoMapInputData', 'value': {}, 'matchingColumns': [], 'schema': []},
        'options': {}}, onError='continueRegularOutput'),
    mail('E-Mail an Chef', [960, 200], 'chef', True),
    node('Erstantwort?', 'n8n-nodes-base.if', 2, [960, 400], {
        'conditions': {'options': {'caseSensitive': True, 'typeValidation': 'loose'}, 'combinator': 'and',
                       'conditions': [{'id': str(uuid.uuid4()), 'leftValue': '={{ !!$json.kunde }}', 'rightValue': True,
                                       'operator': {'type': 'boolean', 'operation': 'true', 'singleValue': True}}]},
        'options': {}}),
    mail('Erstantwort an Kunden', [1200, 400], 'kunde', False),
    node('Tabelle einmal anlegen', 'n8n-nodes-base.manualTrigger', 1, [0, 600], {}),
    node('Tabelle anlegen', 'n8n-nodes-base.dataTable', 1.1, [240, 600], {
        'resource': 'table', 'operation': 'create', 'tableName': TABELLE,
        'columns': {'column': [{'name': n, 'type': t} for n, t in SPALTEN]},
        'options': {'createIfNotExists': True}}),
]
kanten = [('Formular (Website)', 'Anfrage annehmen'), ('Anfrage annehmen', 'Claude sortiert vor'),
          ('Claude sortiert vor', 'Auswerten'), ('Auswerten', 'Zeile'), ('Auswerten', 'E-Mail an Chef'),
          ('Auswerten', 'Erstantwort?'), ('Zeile', 'In Tabelle speichern'),
          ('Erstantwort?', 'Erstantwort an Kunden'), ('Tabelle einmal anlegen', 'Tabelle anlegen')]
connections = {}
for a, b in kanten:
    ausg = connections.setdefault(a, {'main': [[], []] if a == 'Erstantwort?' else [[]]})['main']
    ausg[0].append({'node': b, 'type': 'main', 'index': 0})

wf = {'name': 'Abora Anfragen-Eingang', 'nodes': nodes, 'connections': connections,
      'settings': {'executionOrder': 'v1', 'timezone': 'Europe/Berlin'}, 'active': False}
ziel = hier / 'anfragen-workflow.json'
ziel.write_text(json.dumps(wf, ensure_ascii=False, indent=2), encoding='utf-8')
print('geschrieben:', ziel)
