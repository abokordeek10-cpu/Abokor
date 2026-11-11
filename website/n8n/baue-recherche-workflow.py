"""Baut den n8n-Workflow „Abora Recherche-Agent“ aus den Code-Dateien in quellcode/.
Aufruf: python3 baue-recherche-workflow.py  → recherche-workflow.json (in n8n importieren)."""
import json, uuid, pathlib

q = pathlib.Path(__file__).parent / 'quellcode'
code = lambda f: (q / f).read_text(encoding='utf-8')
EMAIL = 'abokorosman@abora-automation.de'

def node(name, typ, version, pos, params, **extra):
    return {'id': str(uuid.uuid4()), 'name': name, 'type': typ, 'typeVersion': version,
            'position': pos, 'parameters': params, **extra}

def claude(name, pos, body_expr):
    return node(name, 'n8n-nodes-base.httpRequest', 4.2, pos, {
        'method': 'POST', 'url': 'https://api.anthropic.com/v1/messages',
        'authentication': 'genericCredentialType', 'genericAuthType': 'httpHeaderAuth',
        'sendHeaders': True,
        'headerParameters': {'parameters': [
            {'name': 'anthropic-version', 'value': '2026-10-21'},
            {'name': 'anthropic-beta', 'value': 'server-side-fallback-2026-07-01'}]},
        'sendBody': True, 'specifyBody': 'json', 'jsonBody': body_expr,
        'options': {'timeout': 600000, 'response': {'response': {'fullResponse': True, 'neverError': True}}},
    }, credentials={'httpHeaderAuth': {'name': 'Anthropic API'}})

nodes = [
    node('Jeden Werktag 6:30', 'n8n-nodes-base.scheduleTrigger', 1.2, [0, 0],
         {'rule': {'interval': [{'field': 'cronExpression', 'expression': '30 6 * * 1-5'}]}}),
    node('Zum Testen starten', 'n8n-nodes-base.manualTrigger', 1, [0, 200], {}),
    node('Ziel des Tages', 'n8n-nodes-base.code', 2, [240, 100], {'jsCode': code('recherche-1-auftrag.js')}),
    claude('Claude recherchiert', [480, 100], '={{ JSON.stringify($json.anfrage) }}'),
    node('Pause prüfen', 'n8n-nodes-base.code', 2, [720, 100], {'jsCode': code('recherche-2-pause.js')}),
    node('Pausiert?', 'n8n-nodes-base.if', 2, [960, 100], {
        'conditions': {'options': {'caseSensitive': True, 'typeValidation': 'loose'}, 'combinator': 'and',
                       'conditions': [{'id': str(uuid.uuid4()), 'leftValue': '={{ $json.pausiert }}',
                                       'rightValue': True, 'operator': {'type': 'boolean', 'operation': 'true', 'singleValue': True}}]},
        'options': {}}),
    claude('Claude macht weiter', [1200, 0], '={{ JSON.stringify($json.weiter) }}'),
    node('Liste bauen', 'n8n-nodes-base.code', 2, [1440, 100], {'jsCode': code('recherche-3-auswerten.js')}),
    node('E-Mail an Abokor', 'n8n-nodes-base.emailSend', 2.1, [1680, 100], {
        'fromEmail': EMAIL, 'toEmail': EMAIL, 'subject': '={{ $json.betreff }}',
        'emailFormat': 'html', 'html': '={{ $json.html }}',
        'options': {'attachments': 'liste'}}),
]
verb = lambda a, b, i=0: (a, b, i)
kanten = [verb('Jeden Werktag 6:30', 'Ziel des Tages'), verb('Zum Testen starten', 'Ziel des Tages'),
          verb('Ziel des Tages', 'Claude recherchiert'), verb('Claude recherchiert', 'Pause prüfen'),
          verb('Pause prüfen', 'Pausiert?'), verb('Pausiert?', 'Claude macht weiter', 0),
          verb('Pausiert?', 'Liste bauen', 1), verb('Claude macht weiter', 'Liste bauen')]
connections = {}
for a, b, i in kanten:
    ausg = connections.setdefault(a, {'main': [[], []] if a == 'Pausiert?' else [[]]})['main']
    ausg[i].append({'node': b, 'type': 'main', 'index': 0})

wf = {'name': 'Abora Recherche-Agent', 'nodes': nodes, 'connections': connections,
      'settings': {'executionOrder': 'v1', 'timezone': 'Europe/Berlin'}, 'active': False}
ziel = pathlib.Path(__file__).parent / 'recherche-workflow.json'
ziel.write_text(json.dumps(wf, ensure_ascii=False, indent=2), encoding='utf-8')
print('geschrieben:', ziel)
